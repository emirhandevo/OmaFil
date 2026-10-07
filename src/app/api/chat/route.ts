import {getClientIp} from "@/lib/mail";
import {messageCap} from "@/lib/rate-limit";
import {buildYarnChatPrompt} from "@/lib/yarn-chat";

// AQ. anahtar native generateContent'te x-goog-api-key ile gider. Doğrulanan model:
const MODEL = "gemini-3.5-flash-lite";


type Turn = {role: "user" | "assistant"; text:string};

export const runtime = "nodejs";
// model geç cevapp verirse hobby fonksiyonu erken kesilmesin
export const maxDuration = 20;

/** istekte en fazla 8 mesaj, her biri 500 karakter. son mesaj ziyaretçiden olmalı. */
function parseTurn(body:unknown): Turn[] | null {
    if(!body || typeof body !== "object") return null;
    const messages = (body as {messages?: unknown}).messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 8) {
        return null;
    }

    const turns: Turn[] = [];
    for (const item of messages) {
        if (!item || typeof item !== "object") return null;
        const role = (item as {role?: unknown}).role;
        const text = (item as {text?: unknown}).text;
        if ((role !== "user" && role !== "assistant") || typeof text !== "string") {return null;}

        const clean = text.trim().slice(0, 500);
        if (!clean) return null;
        turns.push({role, text: clean});
    }

    if (turns[turns.length - 1]?.role !== "user") return null;
    return turns;
}

/** rakam + para birimi varsa cevabı sil, iletişimi koy.  */
function scrubPrice(reply:string, email: string, phones: string[]) {
    const hasPrice = 
    /(\d[\d.,\s]{0,12}\s?(?:tl|try|usd|eur|€|\$|₺))|((?:€|\$|₺|usd|eur|try|tl)\s?\d)/i.test(
      reply,
    );
    if (!hasPrice) return reply;
    return `Fiyat ve teklif için: ${email} - ${phones.join(", ")}. For a quote, use the same contacts.`;
}

export async function POST(request: Request) {
    const ip = await getClientIp();
    // sohbet: IP başına 20 mesaj. saat penceresi yok
    const limited = messageCap(`chat:${ip}`, 20);
    if (!limited.ok) {
        return Response.json({error: "rate"}, {status: 429});
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return Response.json({error: "bad"}, {status: 400});
    }

    const turns = parseTurn(body);
    if (!turns) {
        return Response.json({error: "bad"}, {status: 400});
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
        return Response.json({error: "config"}, {status: 503});
    }

    const {system, email, phones} = await buildYarnChatPrompt();

    let gemini: Response;
    try {
        gemini = await fetch(
             `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
             {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
                },
                           // 3.7 varsayılanı medium. 15 sn dolunca kesilip busy döner.
            signal: AbortSignal.timeout(18_000),
            body: JSON.stringify({
                systemInstruction: {parts: [{text: system}]},
                // gemini geçmişte assistant değil model rolü bekler
                contents: turns.map((turn) => ({
                    role: turn.role === "assistant" ? "model" : "user",
                    parts: [{text: turn.text}],
                })),
                // low kısa cevap içindir. 400 düşünmeye gider, kutu boş kalır.
                generationConfig: {
                    maxOutputTokens: 1024,
                    thinkingConfig: {thinkingLevel: "low"},
                },
            }),
         },
    );
} catch (error) {
    // süre dolunca Google gövdesi gelmez. durum kodu da yazılmaz.
    console.error("gemini", error instanceof Error ? error.name : "abort");
    return Response.json({error: "busy"}, {status: 502});
}

    // if(!gemini.ok) {
    //     return Response.json({error: "busy"}, {status: 502});
    // }
      if (!gemini.ok) {
  const detail = await gemini.text();
  console.error("gemini", gemini.status, detail.slice(0, 300));
  return Response.json({ error: "busy" }, { status: 502 });
}

    const data = (await gemini.json()) as {
        candidates?: {content?: {parts?: {text?: string} [] }}[];
    };

    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();

    if (!reply) {
        return Response.json({error: "busy"}, {status: 502});
    }
    return Response.json({reply: scrubPrice(reply, email, phones)});
}