"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";
import { useCopy, useLocale } from "@/components/i18n/locale-provider";
import { WhatsAppIcon } from "@/components/ui/icons/social-icons";
import { contact } from "@/config/site";
import type { Locale } from "@/i18n/locales";

/**
 * Pencere metinleri yarn-chat-panel.tsx içinde.
 * ssr:false o dosyanın sayfa açılışında önceden inmesini keser.
 * Bileşen ancak ilk tıklamada çizilir, o zaman chunk gelir.
 */
const YarnChatPanel = dynamic(
  () =>
    import("@/components/sections/yarn-chat-panel").then(
      (mod) => mod.YarnChatPanel,
    ),
  { ssr: false, loading: () => null },
);

/** Buton yazısı. Açık etiket her dilde aynı. Kapatma kısa kalsın diye burada. */
const closeLabel: Record<Locale, string> = {
  tr: "Sohbeti kapat",
  en: "Close chat",
  de: "Chat schließen",
  fr: "Fermer le chat",
  es: "Cerrar chat",
  it: "Chiudi chat",
  pt: "Fechar chat",
  nl: "Chat sluiten",
  ru: "Закрыть чат",
  ar: "إغلاق الدردشة",
  zh: "关闭对话",
};

export function YarnChat() {
  const locale = useLocale();
  const copy = useCopy();
  const [open, setOpen] = useState(false);
  // İlk açılıştan sonra panel bellekte kalır. Kapatınca mesaj silinmez.
  const [panelReady, setPanelReady] = useState(false);

  function toggle() {
    setOpen((value) => !value);
    setPanelReady(true);
  }

  // Sabit referans. Paneldeki Esc dinleyicisi her çizimde yeniden bağlanmasın.
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex w-full flex-col items-center px-4 print:hidden md:inset-x-auto md:end-4 md:w-[22rem] md:items-stretch md:px-0">
      {panelReady ? <YarnChatPanel open={open} onClose={close} /> : null}

      <div className="pointer-events-auto flex flex-col items-end gap-3 self-end">
        {/* Numara boşsa buton yok. Sohbet açıkken de gizlenir. */}
        {!open && contact.whatsapp ? (
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.chrome.whatsapp}
            className="group relative flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-[#32E070] hover:shadow-[0_0_8px_rgba(124,255,178,0.5),0_0_18px_rgba(37,211,102,0.4)] active:scale-[1.03] active:bg-[#32E070] active:shadow-[0_0_8px_rgba(124,255,178,0.5),0_0_18px_rgba(37,211,102,0.4)]"
          >
            {/* Hover’da yeşil neon hale — düşük opaklık */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[#7CFFB2] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-35 group-active:opacity-35"
            />
            <WhatsAppIcon className="relative size-6" />
          </a>
        ) : null}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="group relative flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-[#FF9A1F] hover:shadow-[0_0_8px_rgba(255,176,80,0.5),0_0_18px_rgba(241,144,0,0.45)] active:scale-[1.03] active:bg-[#FF9A1F] active:shadow-[0_0_8px_rgba(255,176,80,0.5),0_0_18px_rgba(241,144,0,0.45)]"
        >
          {/* Aynı neon, marka turuncusu */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-[#FFB347] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-35 group-active:opacity-35"
          />
          <MessageCircle className="relative size-5" aria-hidden="true" />
          <span className="relative">
            {open ? closeLabel[locale] : "OmaFil AI"}
          </span>
        </button>
      </div>
    </div>
  );
}
