"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import { site } from "@/config/site";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/locales";

type Notice = {
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
};

const closeLabel: Record<Locale, string> = {
  tr: "Kapat",
  en: "Close",
  de: "Schließen",
  fr: "Fermer",
  es: "Cerrar",
  it: "Chiudi",
  pt: "Fechar",
  nl: "Sluiten",
  ru: "Закрыть",
  ar: "إغلاق",
  zh: "关闭",
};

const okLabel: Record<Locale, string> = {
  tr: "Anladım",
  en: "Understood",
  de: "Verstanden",
  fr: "Compris",
  es: "Entendido",
  it: "Ho capito",
  pt: "Compreendi",
  nl: "Begrepen",
  ru: "Понятно",
  ar: "فهمت",
  zh: "知道了",
};

type Props = {
  open: boolean;
  onClose: () => void;
  /** Varsayılan: iletişim formu metni */
  notice?: Notice;
};

/**
 * KVKK aydınlatma metni popup’ı.
 * Escape / overlay tıklama / kapat butonu ile kapanır.
 */
export function KvkkModal({ open, onClose, notice }: Props) {
  const locale = useLocale();
  const text = notice ?? getUi(locale).kvkkContact;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label={closeLabel[locale]}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-30 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl mt-20"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6 max-sm:mt-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold tracking-tight">
              {text.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {text.subtitle}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-orange hover:text-brand-orange"
            aria-label={closeLabel[locale]}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 py-5 text-sm leading-6 text-muted-foreground sm:px-6">
          {text.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p className="pt-2 text-xs font-medium text-foreground">
            {site.legalName} — {site.url.replace("https://", "")}
          </p>
        </div>

        <div className="border-t border-border px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded-lg bg-brand-orange text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {okLabel[locale]}
          </button>
        </div>
      </div>
    </div>
  );
}
