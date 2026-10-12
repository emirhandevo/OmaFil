"use client";

import { LocaleLink } from "@/components/i18n/locale-link";

type StatusScreenProps = {
  code: string;
  title: string;
  text: string;
  homeLabel: string;
  retryLabel?: string;
  onRetry?: () => void;
};

/** 404 ve hata ekranı aynı yerleşimi kullanır. */
export function StatusScreen({
  code,
  title,
  text,
  homeLabel,
  retryLabel,
  onRetry,
}: StatusScreenProps) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.22em] text-brand-orange">{code}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-5 leading-7 text-muted-foreground">{text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {onRetry && retryLabel ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            {retryLabel}
          </button>
        ) : null}
        <LocaleLink
          href="/"
          className="inline-flex rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
        >
          {homeLabel}
        </LocaleLink>
      </div>
    </section>
  );
}
