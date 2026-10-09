import {site} from "@/config/site";
import {defaultLocale, isLocale, localizePath, type Locale} from "@/i18n/locales";
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

/** Çorap, hosiery, seamless ve dokuma katalog özetinde var. Bunlarda iplik adı verilir. */
function listedUse(text: string): boolean {
    return /(çorap|corap|\bsocks?\b|hosiery|seamless|dikişsiz|dikissiz|dokuma|weaving)/i.test(text);
}

/** Selam ve teşekkür. Bu cümlelerde iletişim yok. */
function smallTalk(text: string): boolean {
    return /^(merhaba|selam|selamlar|hello|hi|hey|hallo|bonjour|hola|ciao|ol[aá]|goedendag|привет|مرحبا|您好|nasılsın|nasilsin|teşekkürler|tesekkurler|thanks|thank you|günaydın|gunaydin)[\s!.?,]*$/i.test(
        text.trim(),
    );
}

/** “Hangi iplikleriniz var” katalog sorusudur. İletişime atılmaz. */
function asksCatalog(text: string): boolean {
    return /(katalog|ürünleriniz|urunleriniz|hangi iplikler|which yarns|product range)/i.test(text);
}

/**
 * Sitede özeti olmayan kullanım: ayakkabı bağcığı, havlu, halı ve benzeri.
 * Burada iplik adı yok. “Uygun ipliğimiz yok” da yok. İletişim var.
 */
function offListUse(text: string): boolean {
    if (smallTalk(text) || asksCatalog(text)) return false;
    if (
        /(bağcık|bagcik|shoelace|shoe\s*lace|ayakkab|havlu|towel|laptop|halı|hali|\bcarpet\b|\brug\b|perde|curtain|çanta|canta|handbag|lastik|\btire\b|\btyre\b)/i.test(
            text,
        )
    ) {
        return true;
    }
    if (listedUse(text)) return false;
    // iplik + -iniz = ipliğiniz. k harfi ğ olur, "iplik" alt dizgi olarak durmaz.
    return /(için|icin).{0,80}(ipli[kğ]|ipili[kğ]|yarn)|(ipli[kğ]|ipili[kğ]|yarn).{0,40}(için|icin)/i.test(
        text,
    );
}

/** Model yine “listede yok” derse bu cümle silinir, iletişim konur. */
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

const redirectLead: Record<Locale, string> = {
    tr: "Bu kullanım için uygun iplik modellerimiz vardır. Detaylı bilgi, fiyat teklifi ve numune için bizlerle iletişime geçiniz lütfen.",
    en: "We have suitable yarn models for this use. For detailed information, a quotation and a sample, please contact us.",
    de: "Für diese Anwendung haben wir passende Garnmodelle. Für ausführliche Information, ein Angebot und ein Muster kontaktieren Sie uns bitte.",
    fr: "Nous avons des modèles de fil adaptés à cet usage. Pour une information détaillée, un devis et un échantillon, veuillez nous contacter.",
    es: "Tenemos modelos de hilo adecuados para este uso. Para información detallada, una oferta y una muestra, póngase en contacto con nosotros.",
    it: "Abbiamo modelli di filato adatti a questo uso. Per informazioni dettagliate, un’offerta e un campione, contattateci.",
    pt: "Temos modelos de fio adequados para este uso. Para informação detalhada, uma proposta e uma amostra, contacte-nos.",
    nl: "Voor dit gebruik hebben wij passende garenmodellen. Voor uitgebreide informatie, een offerte en een monster kunt u contact met ons opnemen.",
    ru: "Для этого применения у нас есть подходящие модели нити. Для подробной информации, предложения и образца свяжитесь с нами.",
    ar: "لدينا نماذج خيوط مناسبة لهذا الاستخدام. للمعلومات التفصيلية وعرض السعر والعينة يرجى التواصل معنا.",
    zh: "我们有适用于这一用途的纱线型号。如需详细资料、报价和样品，请与我们联系。",
};

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

/** Özeti olmayan iş için sabit cevap: uygun modeller var, sonra iletişim. */
function offListReply(text: string, hint: Locale, email: string, phones: string[]): string {
    const locale = languageOf(text, hint);
    const labels = redirectLabels[locale];
    const page = `${site.url}${localizePath("/iletisim", locale)}`;
    return [
        redirectLead[locale],
        `${labels.page}: ${page}`,
        `${labels.email}: ${email}`,
        `${labels.phone}: ${phones.join(", ")}`,
    ].join("\n");
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

    const hint = readLocale(body);
    const last = turns[turns.length - 1]?.text ?? "";
    const {system, email, phones} = await buildYarnChatPrompt();

    // Özeti olmayan iş modeli beklemez. “Yok” cümlesi burada hiç kurulmaz.
    if (offListUse(last)) {
        return Response.json({
            reply: scrubPrice(offListReply(last, hint, email, phones), email, phones),
        });
    }

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

    // Model yine “listede yok” derse o cümle düşer, iletişim kalır.
    if (!listedUse(last) && !smallTalk(last) && isRefusal(reply)) {
        return Response.json({
            reply: scrubPrice(offListReply(last, hint, email, phones), email, phones),
        });
    }

    const asked = visitorWantsContact(last);
    const spoken = hideContact(reply, asked, email, phones);
    return Response.json({reply: scrubPrice(spoken, email, phones)});
}