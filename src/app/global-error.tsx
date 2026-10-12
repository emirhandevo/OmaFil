"use client";

import { useEffect } from "react";
import "./globals.css";

/** Kök layout da çökerse. Kendi html ve body’si olmak zorunda. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
          <p className="text-sm font-semibold tracking-[0.22em] text-brand-orange">500</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Bir sorun oluştu</h1>
          <p className="mt-5 leading-7 text-muted-foreground">
            Sayfa şu an açılamadı. Yeniden deneyin veya ana sayfaya dönün.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex rounded-xl border border-border px-5 py-3 text-sm font-semibold"
            >
              Yeniden dene
            </button>
            <a
              href="/"
              className="inline-flex rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white"
            >
              Ana sayfaya dön
            </a>
          </div>
        </section>
      </body>
    </html>
  );
}
