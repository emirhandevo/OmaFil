"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/i18n/locales";

type Role = "user" | "assistant";
type ChatMessage = { role: Role; text: string };

type PanelCopy = {
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
};

/**
 * Pencere metinleri. Butondaki kısa etiketler yarn-chat.tsx içinde kalır.
 * Bu dosya ilk tıklamadan önce inmez.
 */
const chatUi: Record<Locale, PanelCopy> = {
  tr: {
    close: "Sohbeti kapat",
    title: "OmaFil AI",
    welcome:
      "Merhaba. Ben OmaFil AI. Size hangi konuda yardımcı olmamı istersiniz?",
    placeholder: "Sorunu yaz",
    send: "Gönder",
    sending: "Yazıyor",
    rate: "Bu sohbet için 20 mesaj hakkın doldu.",
    config: "OmaFil AI şu an kapalı. info@omafil.com adresine yaz.",
    busy: "Cevap gelemedi. info@omafil.com adresine yaz.",
    bad: "Mesaj gönderilemedi. Daha kısa yazıp tekrar dene.",
  },
  en: {
    close: "Close chat",
    title: "OmaFil AI",
    welcome: "Hello. I am OmaFil AI. How may I help you?",
    placeholder: "Type your question",
    send: "Send",
    sending: "Writing",
    rate: "You have used the 20 messages for this chat.",
    config: "OmaFil AI is off right now. Email info@omafil.com.",
    busy: "No answer came back. Email info@omafil.com.",
    bad: "The message could not be sent. Try a shorter one.",
  },
  de: {
    close: "Chat schließen",
    title: "OmaFil AI",
    welcome: "Guten Tag. Ich bin OmaFil AI. Wobei darf ich Ihnen helfen?",
    placeholder: "Frage schreiben",
    send: "Senden",
    sending: "Schreibt",
    rate: "Die 20 Nachrichten für diesen Chat sind aufgebraucht.",
    config: "OmaFil AI ist gerade aus. Schreib an info@omafil.com.",
    busy: "Keine Antwort. Schreib an info@omafil.com.",
    bad: "Nachricht nicht gesendet. Kürzer schreiben und erneut versuchen.",
  },
  fr: {
    close: "Fermer le chat",
    title: "OmaFil AI",
    welcome: "Bonjour. Je suis OmaFil AI. En quoi puis-je vous aider ?",
    placeholder: "Écris ta question",
    send: "Envoyer",
    sending: "Écrit",
    rate: "Les 20 messages de ce chat sont utilisés.",
    config: "OmaFil AI est fermé. Écris à info@omafil.com.",
    busy: "Pas de réponse. Écris à info@omafil.com.",
    bad: "Message non envoyé. Écris plus court et réessaie.",
  },
  es: {
    close: "Cerrar chat",
    title: "OmaFil AI",
    welcome: "Buenos días. Soy OmaFil AI. ¿En qué puedo ayudarle?",
    placeholder: "Escribe tu pregunta",
    send: "Enviar",
    sending: "Escribiendo",
    rate: "Se agotaron los 20 mensajes de este chat.",
    config: "OmaFil AI está cerrado. Escribe a info@omafil.com.",
    busy: "No llegó respuesta. Escribe a info@omafil.com.",
    bad: "No se envió el mensaje. Escríbelo más corto.",
  },
  it: {
    close: "Chiudi chat",
    title: "OmaFil AI",
    welcome: "Buongiorno. Sono OmaFil AI. Come posso aiutarla?",
    placeholder: "Scrivi la domanda",
    send: "Invia",
    sending: "Scrive",
    rate: "Hai usato i 20 messaggi di questa chat.",
    config: "OmaFil AI è spento. Scrivi a info@omafil.com.",
    busy: "Nessuna risposta. Scrivi a info@omafil.com.",
    bad: "Messaggio non inviato. Scrivilo più corto.",
  },
  pt: {
    close: "Fechar chat",
    title: "OmaFil AI",
    welcome: "Olá. Sou o OmaFil AI. Em que posso ajudá-lo?",
    placeholder: "Escreve a pergunta",
    send: "Enviar",
    sending: "A escrever",
    rate: "Os 20 recados deste chat acabaram.",
    config: "OmaFil AI está fechado. Escreve para info@omafil.com.",
    busy: "Não veio resposta. Escreve para info@omafil.com.",
    bad: "A mensagem não foi enviada. Escreve mais curta.",
  },
  nl: {
    close: "Chat sluiten",
    title: "OmaFil AI",
    welcome: "Goedendag. Ik ben OmaFil AI. Waarmee kan ik u helpen?",
    placeholder: "Schrijf je vraag",
    send: "Verstuur",
    sending: "Schrijft",
    rate: "De 20 berichten voor deze chat zijn op.",
    config: "OmaFil AI is dicht. Mail info@omafil.com.",
    busy: "Geen antwoord. Mail info@omafil.com.",
    bad: "Bericht niet verstuurd. Schrijf het korter.",
  },
  ru: {
    close: "Закрыть чат",
    title: "OmaFil AI",
    welcome: "Здравствуйте. Я OmaFil AI. Чем я могу вам помочь?",
    placeholder: "Напишите вопрос",
    send: "Отправить",
    sending: "Пишет",
    rate: "Лимит в 20 сообщений для этого чата исчерпан.",
    config: "OmaFil AI выключен. Напишите на info@omafil.com.",
    busy: "Ответ не пришёл. Напишите на info@omafil.com.",
    bad: "Сообщение не ушло. Напишите короче.",
  },
  ar: {
    close: "إغلاق الدردشة",
    title: "OmaFil AI",
    welcome: "مرحبا. أنا OmaFil AI. في أي موضوع تودون أن أساعدكم؟",
    placeholder: "اكتب سؤالك",
    send: "إرسال",
    sending: "يكتب",
    rate: "انتهت رسائل هذه الدردشة العشرون.",
    config: "OmaFil AI مغلق الآن. راسل info@omafil.com.",
    busy: "لم يصل رد. راسل info@omafil.com.",
    bad: "لم تُرسل الرسالة. اكتبها أقصر.",
  },
  zh: {
    close: "关闭对话",
    title: "OmaFil AI",
    welcome: "您好。我是 OmaFil AI。请问需要我在哪方面协助您？",
    placeholder: "写下问题",
    send: "发送",
    sending: "正在写",
    rate: "本次对话的 20 条消息已用完。",
    config: "OmaFil AI 暂时关闭。请写信到 info@omafil.com。",
    busy: "没有收到回答。请写信到 info@omafil.com。",
    bad: "消息没发出去。写短一点再试。",
  },
};

type YarnChatPanelProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Sohbet penceresi. Üst bileşen ilk açılıştan sonra bunu bellekte tutar,
 * böylece kapatınca yazılanlar silinmez.
 */
export function YarnChatPanel({ open, onClose }: YarnChatPanelProps) {
  const locale = useLocale();
  const ui = chatUi[locale];
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Sayfa açıkken tek kod. Yenileme yeni sohbet açar. IP aynı ofisteki kişileri ayıramaz.
  const chatIdRef = useRef("");

  function currentChatId() {
    if (chatIdRef.current) return chatIdRef.current;
    const raw = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
    chatIdRef.current = raw;
    return raw;
  }

  // Masaüstünde pencere açılınca yazı kutusuna geç.
  // Telefonda focus klavyeyi hemen açar; ziyaretçi inputa kendisi tıklasın.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    inputRef.current?.focus();
  }, [open]);

  // Bot açıkken Esc pencereyi kapatır. Kapalıyken dinleyici yok.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending]);

  async function send(event: FormEvent) {
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
        body: JSON.stringify({
          messages: next,
          locale,
          chatId: currentChatId(),
        }),
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

  // Kapalıyken DOM'da kutu yok. State bu bileşende durur.
  if (!open) return null;

  return (
    <section
      role="dialog"
      aria-label={ui.title}
      className="pointer-events-auto mb-3 flex h-[min(32rem,70dvh)] w-full max-w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
    >
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">{ui.title}</p>
        <button
          type="button"
          onClick={onClose}
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
                ? "ms-8 whitespace-pre-wrap rounded-xl bg-brand-orange px-3 py-2 text-sm leading-6 text-white"
                : "me-8 whitespace-pre-wrap rounded-xl bg-muted px-3 py-2 text-sm leading-6 text-foreground"
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
          {/* text-base = 16px. iOS, daha küçük inputa tıklayınca sayfayı yakınlaştırır. */}
          <input
            ref={inputRef}
            value={input}
            maxLength={500}
            onChange={(event) => setInput(event.target.value)}
            placeholder={ui.placeholder}
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-base"
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
  );
}
