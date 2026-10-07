"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/i18n/locales";

type Role = "user" | "assistant";
type ChatMessage = { role: Role; text: string };

/** Pencere yazıları sitenin dilinde. Model cevabı, ziyaretçinin yazdığı dilde gelir. */
const chatUi: Record<
  Locale,
  {
    open: string;
    close: string;
    title: string;
    welcome: string;
    placeholder: string;
    send: string;
    sending: string;
    rate: string;
    config: string;
    busy: string;
    bad: string;
  }
> = {
  tr: {
    open: "İplik danışmanı",
    close: "Sohbeti kapat",
    title: "İplik danışmanı",
    welcome:
      "Hangi ürün için iplik arıyorsun? Çorap, dokuma veya kaplama yazabilirsin. Fiyat yazmam; teklif için mail ve telefonu veririm.",
    placeholder: "Sorunu yaz",
    send: "Gönder",
    sending: "Yazıyor",
    rate: "Bu sohbet için 20 mesaj hakkın doldu.",
    config: "Danışman şu an kapalı. info@omafil.com adresine yaz.",
    busy: "Cevap gelemedi. info@omafil.com adresine yaz.",
    bad: "Mesaj gönderilemedi. Daha kısa yazıp tekrar dene.",
  },
  en: {
    open: "Yarn advisor",
    close: "Close chat",
    title: "Yarn advisor",
    welcome:
      "Which product are you making? Ask about socks, weaving or covering. I do not quote prices; I will give our email and phone.",
    placeholder: "Type your question",
    send: "Send",
    sending: "Writing",
    rate: "You have used the 20 messages for this chat.",
    config: "The advisor is off right now. Email info@omafil.com.",
    busy: "No answer came back. Email info@omafil.com.",
    bad: "The message could not be sent. Try a shorter one.",
  },
  de: {
    open: "Garnberater",
    close: "Chat schließen",
    title: "Garnberater",
    welcome:
      "Wofür suchst du Garn? Frage nach Socken, Webware oder Umspinnung. Preise nenne ich nicht; ich gebe E-Mail und Telefon.",
    placeholder: "Frage schreiben",
    send: "Senden",
    sending: "Schreibt",
    rate: "Die 20 Nachrichten für diesen Chat sind aufgebraucht.",
    config: "Der Berater ist gerade aus. Schreib an info@omafil.com.",
    busy: "Keine Antwort. Schreib an info@omafil.com.",
    bad: "Nachricht nicht gesendet. Kürzer schreiben und erneut versuchen.",
  },
  fr: {
    open: "Conseil fil",
    close: "Fermer le chat",
    title: "Conseil fil",
    welcome:
      "Pour quel produit cherches-tu un fil ? Chaussettes, tissage ou guipage. Je ne donne pas de prix ; je donne l’e-mail et le téléphone.",
    placeholder: "Écris ta question",
    send: "Envoyer",
    sending: "Écrit",
    rate: "Les 20 messages de ce chat sont utilisés.",
    config: "Le conseil est fermé. Écris à info@omafil.com.",
    busy: "Pas de réponse. Écris à info@omafil.com.",
    bad: "Message non envoyé. Écris plus court et réessaie.",
  },
  es: {
    open: "Asesor de hilo",
    close: "Cerrar chat",
    title: "Asesor de hilo",
    welcome:
      "¿Para qué producto buscas hilo? Calcetines, tejido o recubrimiento. No doy precios; doy el correo y el teléfono.",
    placeholder: "Escribe tu pregunta",
    send: "Enviar",
    sending: "Escribiendo",
    rate: "Se agotaron los 20 mensajes de este chat.",
    config: "El asesor está cerrado. Escribe a info@omafil.com.",
    busy: "No llegó respuesta. Escribe a info@omafil.com.",
    bad: "No se envió el mensaje. Escríbelo más corto.",
  },
  it: {
    open: "Consulente filato",
    close: "Chiudi chat",
    title: "Consulente filato",
    welcome:
      "Per quale prodotto cerchi il filato? Calze, tessitura o copertura. Non do prezzi; do e-mail e telefono.",
    placeholder: "Scrivi la domanda",
    send: "Invia",
    sending: "Scrive",
    rate: "Hai usato i 20 messaggi di questa chat.",
    config: "Il consulente è spento. Scrivi a info@omafil.com.",
    busy: "Nessuna risposta. Scrivi a info@omafil.com.",
    bad: "Messaggio non inviato. Scrivilo più corto.",
  },
  pt: {
    open: "Consultor de fio",
    close: "Fechar chat",
    title: "Consultor de fio",
    welcome:
      "Para que produto procuras fio? Meias, tecelagem ou cobertura. Não dou preços; dou o e-mail e o telefone.",
    placeholder: "Escreve a pergunta",
    send: "Enviar",
    sending: "A escrever",
    rate: "Os 20 recados deste chat acabaram.",
    config: "O consultor está fechado. Escreve para info@omafil.com.",
    busy: "Não veio resposta. Escreve para info@omafil.com.",
    bad: "A mensagem não foi enviada. Escreve mais curta.",
  },
  nl: {
    open: "Garenadvies",
    close: "Chat sluiten",
    title: "Garenadvies",
    welcome:
      "Voor welk product zoek je garen? Sokken, weven of covering. Ik noem geen prijzen; ik geef e-mail en telefoon.",
    placeholder: "Schrijf je vraag",
    send: "Verstuur",
    sending: "Schrijft",
    rate: "De 20 berichten voor deze chat zijn op.",
    config: "De adviseur is dicht. Mail info@omafil.com.",
    busy: "Geen antwoord. Mail info@omafil.com.",
    bad: "Bericht niet verstuurd. Schrijf het korter.",
  },
  ru: {
    open: "Подбор пряжи",
    close: "Закрыть чат",
    title: "Подбор пряжи",
    welcome:
      "Для какого изделия нужна пряжа? Носки, ткачество или покрытие. Цены не называю; дам почту и телефон.",
    placeholder: "Напишите вопрос",
    send: "Отправить",
    sending: "Пишет",
    rate: "Лимит в 20 сообщений для этого чата исчерпан.",
    config: "Советчик выключен. Напишите на info@omafil.com.",
    busy: "Ответ не пришёл. Напишите на info@omafil.com.",
    bad: "Сообщение не ушло. Напишите короче.",
  },
  ar: {
    open: "مستشار الخيط",
    close: "إغلاق الدردشة",
    title: "مستشار الخيط",
    welcome:
      "لأي منتج تبحث عن خيط؟ جوارب أو نسيج أو تغطية. لا أذكر الأسعار؛ أعطيك البريد والهاتف.",
    placeholder: "اكتب سؤالك",
    send: "إرسال",
    sending: "يكتب",
    rate: "انتهت رسائل هذه الدردشة العشرون.",
    config: "المستشار مغلق الآن. راسل info@omafil.com.",
    busy: "لم يصل رد. راسل info@omafil.com.",
    bad: "لم تُرسل الرسالة. اكتبها أقصر.",
  },
  zh: {
    open: "纱线顾问",
    close: "关闭对话",
    title: "纱线顾问",
    welcome:
      "你在做哪种产品？可以问袜子、机织或包覆。我不报价；我会给你邮箱和电话。",
    placeholder: "写下问题",
    send: "发送",
    sending: "正在写",
    rate: "本次对话的 20 条消息已用完。",
    config: "顾问暂时关闭。请写信到 info@omafil.com。",
    busy: "没有收到回答。请写信到 info@omafil.com。",
    bad: "消息没发出去。写短一点再试。",
  },
};

export function YarnChat() {
  const locale = useLocale();
  const ui = chatUi[locale];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pencere açılınca yazı kutusuna geç. Yeni mesaj gelince alta kay.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setError("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: "rate" | "config" | "busy" | "bad";
      };

      if (!res.ok || !data.reply) {
        // Hata olursa ziyaretçinin cümlesi kutuya geri gelsin, kaybolmasın.
        setMessages(messages);
        setInput(text);
        const code = data.error ?? "busy";
        setError(ui[code] ?? ui.busy);
        return;
      }

      setMessages([...next, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages(messages);
      setInput(text);
      setError(ui.busy);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed end-4 bottom-4 z-[60] print:hidden">
      {open ? (
        <section
          role="dialog"
          aria-label={ui.title}
          className="mb-3 flex h-[min(32rem,70dvh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
        >
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">{ui.title}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={ui.close}
              className="flex size-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <p className="rounded-xl bg-muted px-3 py-2 text-sm leading-6 text-foreground">
              {ui.welcome}
            </p>
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ms-8 rounded-xl bg-brand-orange px-3 py-2 text-sm leading-6 text-white"
                    : "me-8 rounded-xl bg-muted px-3 py-2 text-sm leading-6 text-foreground"
                }
              >
                {message.text}
              </p>
            ))}
            {pending ? (
              <p className="text-sm text-muted-foreground">{ui.sending}</p>
            ) : null}
          </div>

          <form onSubmit={send} className="border-t border-border p-3">
            {error ? (
              <p className="mb-2 text-xs leading-5 text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                maxLength={500}
                onChange={(event) => setInput(event.target.value)}
                placeholder={ui.placeholder}
                className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={pending || input.trim().length === 0}
                className="rounded-lg bg-brand-orange px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 active:bg-brand-orange/90 disabled:opacity-50"
              >
                {ui.send}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="ms-auto flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-orange/90 active:bg-brand-orange/90"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        {open ? ui.close : ui.open}
      </button>
    </div>
  );
}