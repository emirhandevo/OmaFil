import {site} from "@/config/site";
import {defaultLocale, isLocale, localizePath, type Locale} from "@/i18n/locales";
import {getClientIp} from "@/lib/mail";
import {messageCap} from "@/lib/rate-limit";
import {buildYarnChatPrompt, priceReply, unknownReply} from "@/lib/yarn-chat";
import { saveChatLog  } from "@/lib/chat-log";

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

/** Sekme kodu. 8 karakter hex. Bozuksa boş döner; satır yine yazılır. */
function readChatId(body: unknown): string {
    if (!body || typeof body !== "object") return "";
    const value = (body as {chatId?: unknown}).chatId;
    if (typeof value !== "string") return "";
    const clean = value.trim().toLowerCase();
    return /^[a-f0-9]{8}$/.test(clean) ? clean : "";
}

/** Sayfa dili ipucu. Cümlenin dili, ziyaretçinin yazdığı metinden seçilir. */
function readLocale(body: unknown): Locale {
    if (!body || typeof body !== "object") return defaultLocale;
    const value = (body as {locale?: unknown}).locale;
    return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

/**
 * Fiyat, teklif, numune, link veya iletişim sorulunca mail ve telefon kalır.
 * "hani link nerde" de buraya girer. Sadece selam ve katalog cevabında silinir.
 */
function visitorWantsContact(text: string): boolean {
    return /(fiyat|teklif|iskonto|numune|price|quote|sample|iletişim|iletisim|telefon|e-?posta|\bmail\b|link|url|adres|numara|ulaş|ulas|kaç\s*para|kac\s*para)/i.test(
        text,
    );
}

/** Selam ve teşekkür. Bu cümlelerde iletişim yok. */
function smallTalk(text: string): boolean {
    return /^(merhaba|selamlar|selam|slm|hello|hi|hey|hallo|bonjour|hola|ciao|ol[aá]|goedendag|привет|مرحبا|您好|nasılsın|nasilsin|teşekkürler|tesekkurler|thanks|thank you|günaydın|gunaydin|selam[uü]n?\s*aleyk[uü]m|aleyk[uü]m\s*selam)[\s!.?,]*$/i.test(
        text.trim(),
    );
}

/** Saf selam modele gitmez. "Aleyküm selam" kurmasın diye sabit cümle. */
const helloReply: Record<Locale, string> = {
    tr: "Merhaba. OmaFil olarak size nasıl yardımcı olabiliriz?",
    en: "Hello. How can OmaFil help you?",
    de: "Guten Tag. Wie kann OmaFil Ihnen helfen?",
    fr: "Bonjour. Comment OmaFil peut-il vous aider ?",
    es: "Hola. ¿En qué puede ayudarle OmaFil?",
    it: "Buongiorno. Come può aiutarla OmaFil?",
    pt: "Olá. Em que pode a OmaFil ajudar?",
    nl: "Goedendag. Hoe kan OmaFil u helpen?",
    ru: "Здравствуйте. Чем OmaFil может вам помочь?",
    ar: "مرحباً. كيف يمكن لـ OmaFil مساعدتكم؟",
    zh: "您好。OmaFil 可以如何协助您？",
};

const thanksReply: Record<Locale, string> = {
    tr: "Rica ederiz. Başka bir sorunuz olursa yazabilirsiniz.",
    en: "You're welcome. Please write if you have another question.",
    de: "Gern geschehen. Schreiben Sie uns, wenn Sie eine weitere Frage haben.",
    fr: "Je vous en prie. Écrivez-nous si vous avez une autre question.",
    es: "De nada. Escríbanos si tiene otra consulta.",
    it: "Prego. Scriveteci se avete un’altra domanda.",
    pt: "De nada. Escreva-nos se tiver outra questão.",
    nl: "Graag gedaan. Schrijf ons als u nog een vraag heeft.",
    ru: "Пожалуйста. Напишите, если появится ещё вопрос.",
    ar: "على الرحب والسعة. راسلونا إن كان لديكم سؤال آخر.",
    zh: "不客气。如有其他问题，请继续留言。",
};

const howReply: Record<Locale, string> = {
    tr: "Teşekkür ederiz, iyiyiz. Size nasıl yardımcı olabiliriz?",
    en: "Thank you, we are well. How can we help you?",
    de: "Danke, uns geht es gut. Wie können wir Ihnen helfen?",
    fr: "Merci, nous allons bien. Comment pouvons-nous vous aider ?",
    es: "Gracias, estamos bien. ¿En qué podemos ayudarle?",
    it: "Grazie, stiamo bene. Come possiamo aiutarla?",
    pt: "Obrigado, estamos bem. Em que podemos ajudar?",
    nl: "Dank u, het gaat goed. Hoe kunnen wij u helpen?",
    ru: "Спасибо, у нас всё хорошо. Чем мы можем помочь?",
    ar: "شكراً، نحن بخير. كيف يمكننا مساعدتكم؟",
    zh: "谢谢，我们很好。请问需要什么帮助？",
};

function greetingReply(text: string, hint: Locale): string {
    const locale = languageOf(text, hint);
    // Teşekkür ve hal hatır, selamdan ayrı cümle ister.
    if (/teşekkür|tesekkur|thanks|thank you/i.test(text)) return thanksReply[locale];
    if (/nasılsın|nasilsin/i.test(text)) return howReply[locale];
    return helloReply[locale];
}

/** Model “listede yok” derse ya da BILMIYORUM yazarsa adres eklenir. */
function isRefusal(reply: string): boolean {
    return /(listemizde|bulunmamaktadır|bulunmuyor|öneremiyoruz|öneremiyorum|uygun bir iplik|uygun ipliğimiz yok|uygun ipligimiz yok|no suitable|cannot recommend|can't recommend|not in our)/i.test(
        reply,
    );
}

/** Yazıdaki harfler sayfa dilinden önce gelir. Türkçe soru Türkçe cevap alır. */
function languageOf(text: string, hint: Locale): Locale {
    if (/[\u0600-\u06FF]/.test(text)) return "ar";
    if (/[\u0400-\u04FF]/.test(text)) return "ru";
    if (/[\u4e00-\u9fff]/.test(text)) return "zh";
    if (
        /[ğüşıöçĞÜŞİÖÇ]/.test(text) ||
        /\b(için|icin|hangi|ipilik|bağcık|bagcik|ayakkabı|ayakkabi|lütfen|lutfen)\b/i.test(text)
    ) {
        return "tr";
    }
    if (/\b(für|welche|garn|schuhband)\b/i.test(text)) return "de";
    if (/\b(pour|lacets|quel)\b/i.test(text)) return "fr";
    if (/\b(cordones|cuál|cual)\b/i.test(text)) return "es";
    if (/\b(lacci|filato|quale)\b/i.test(text)) return "it";
    if (/\b(cadarços|cadarcos)\b/i.test(text)) return "pt";
    if (/\b(veters|welke)\b/i.test(text)) return "nl";
    if (/\b(yarn|lace|which|shoe)\b/i.test(text)) return "en";
    return hint;
}

const redirectLabels: Record<Locale, {page: string; email: string; phone: string}> = {
    tr: {page: "İletişim sayfası", email: "E-posta", phone: "Telefon"},
    en: {page: "Contact page", email: "Email", phone: "Phone"},
    de: {page: "Kontaktseite", email: "E-Mail", phone: "Telefon"},
    fr: {page: "Page contact", email: "E-mail", phone: "Téléphone"},
    es: {page: "Página de contacto", email: "Correo", phone: "Teléfono"},
    it: {page: "Pagina contatti", email: "E-mail", phone: "Telefono"},
    pt: {page: "Página de contacto", email: "E-mail", phone: "Telefone"},
    nl: {page: "Contactpagina", email: "E-mail", phone: "Telefoon"},
    ru: {page: "Страница контактов", email: "Эл. почта", phone: "Телефон"},
    ar: {page: "صفحة الاتصال", email: "البريد", phone: "الهاتف"},
    zh: {page: "联系页面", email: "邮箱", phone: "电话"},
};

type Place = { label: string; address: string };

/** Link, e-posta, telefon ve adresler. Numaralar alt alta. */
function contactBlock(
    locale: Locale,
    email: string,
    phones: string[],
    locations: Place[],
): string {
    const labels = redirectLabels[locale];
    const page = `${site.url}${localizePath("/iletisim", locale)}`;
    const places = locations
        .filter((place) => place.address.trim())
        .map((place) => `${place.label}: ${place.address}`);
    return [
        `${labels.page}: ${page}`,
        `${labels.email}: ${email}`,
        `${labels.phone}:`,
        ...phones,
        ...places,
    ].join("\n");
}

/**
 * İletişim sorulduysa link ve bütün numaralar cevabın sonunda durur.
 * Model numarayı virgülle yazsa da burada alt alta kurulur.
 */
function ensureContact(
    reply: string,
    text: string,
    hint: Locale,
    email: string,
    phones: string[],
    locations: Place[],
): string {
    if (!visitorWantsContact(text)) return reply;
    const locale = languageOf(text, hint);
    const page = `${site.url}${localizePath("/iletisim", locale)}`;
    let next = reply.split(email).join("").split(page).join("");
    for (const phone of phones) next = next.split(phone).join("");
    next = next
        .split("\n")
        .map((line) => line.replace(/\s{2,}/g, " ").replace(/[,;]\s*$/, "").trim())
        .filter((line) => {
            // İ harfi düz "i" süzgecine takılmaz. Türkçe küçültme bunu düzeltir.
            const folded = line.toLocaleLowerCase("tr");
            return (
                folded.length > 0 &&
                !/^(?:e-?posta|e-mail|email|telefon|phone|tel|iletişim sayfası|contact page)\s*:?\s*$/i.test(
                    folded,
                )
            );
        })
        .join("\n")
        .trim();
    return `${next}\n${contactBlock(locale, email, phones, locations)}`.trim();
}

/**
 * Selam ve katalog cevabına yapışan maili siler.
 * Değer gidince "E-posta: ," kalmasın diye ardı boş olan etiketi de siler.
 * İletişim sorulduysa fonksiyon hiç dokunmaz.
 */
function hideContact(reply: string, asked: boolean, email: string, phones: string[]): string {
    if (asked) return reply;
    let next = reply.split(email).join("");
    for (const phone of phones) next = next.split(phone).join("");
    next = next
        .replace(
            /(?:^|[\s,])(?:e-?posta|e-mail|email|telefon|phone|tel)\s*:\s*(?=[,.\s]|$)/gim,
            " ",
        )
        // "E-posta: ," silinince kalan ,, . yığınını da al. 13.000 gibi rakama dokunma.
        .replace(/(?<!\d)[,.]+(?:\s*[,.]+)+(?!\d)/g, "")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{2,}/g, "\n")
        .trim();
    return next.length >= 12 ? next : reply;
}

/** Rakam + para birimi varsa cevabı sil, ziyaretçinin dilinde iletişimi koy. */
function scrubPrice(
    reply: string,
    locale: Locale,
    email: string,
    phones: string[],
    locations: Place[],
) {
    const hasPrice =
    /(\d[\d.,\s]{0,12}\s?(?:tl|try|usd|eur|€|\$|₺))|((?:€|\$|₺|usd|eur|try|tl)\s?\d)/i.test(
      reply,
    );
    if (!hasPrice) return reply;
    return [priceReply[locale], contactBlock(locale, email, phones, locations)].join("\n");
}

/** İlk satır BILMIYORUM ise ya da model kısa bir red yazdıysa site dışı sayılır. */
function modelDoesNotKnow(reply: string): boolean {
    return /^\s*BILMIYORUM\b/i.test(reply) || (isRefusal(reply) && reply.length < 400);
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

    const hint = readLocale(body);
    const sessionId = readChatId(body);
    const last = turns[turns.length - 1]?.text ?? "";
    // cevap ziyaretçiye gitmeden önce bir satır yazar
    async function logged(reply:string) {
        await saveChatLog({
            ip,
            locale: hint,
            question: last,
            answer: reply,
            sessionId,
        });
        return Response.json({reply});
    }
    // Saf selam katalog beklemez. Model aleyküm selam kurmasın.
    if (smallTalk(last)) {
        return logged(greetingReply(last, hint));

    }
    const {system, email, phones, locations} = await buildYarnChatPrompt(hint);

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
        return Response.json({error: "config"}, {status: 503});
    }

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

    const locale = languageOf(last, hint);
    // Sitede yoksa modelin cümlesi düşer. Adresler route tarafından eklenir.
    if (modelDoesNotKnow(reply)) {
        return logged(
            [unknownReply[locale], contactBlock(locale, email, phones, locations)].join("\n"),
        );
    }

    const asked = visitorWantsContact(last);
    const spoken = hideContact(reply, asked, email, phones);
    const priced = scrubPrice(spoken, locale, email, phones, locations);
    return logged(ensureContact(priced, last, hint, email, phones, locations));
}