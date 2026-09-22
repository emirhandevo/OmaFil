"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { kvkkNotice, type KvkkNoticeContent } from "@/content/kvkk";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Varsayılan: iletişim formu metni */
  notice?: KvkkNoticeContent;
};

/**
 * KVKK aydınlatma metni popup’ı.
 * Escape / overlay tıklama / kapat butonu ile kapanır.
 */
export function KvkkModal({ open, onClose, notice = kvkkNotice }: Props) {
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
        aria-label="Kapat"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl mt-20"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} className="text-lg font-semibold tracking-tight">
              {notice.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {notice.subtitle}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-orange hover:text-brand-orange"
            aria-label="Kapat"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 py-5 text-sm leading-6 text-muted-foreground sm:px-6">
          {notice.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p className="pt-2 text-xs font-medium text-foreground">
            {notice.companyLine}
          </p>
        </div>

        <div className="border-t border-border px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded-lg bg-brand-orange text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
}
