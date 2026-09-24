"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/locale-provider";
import {
  localeLabels,
  locales,
  localizePath,
  stripLocale,
  type Locale,
} from "@/i18n/locales";

/** Ekran görüntüsündeki dil kodları. Bayrak emoji, metin asıl etiket. */
const flags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  it: "🇮🇹",
  pt: "🇵🇹",
  nl: "🇳🇱",
  ru: "🇷🇺",
  ar: "🇸🇦",
  zh: "🇨🇳",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const bare = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={localeLabels[locale]}
        onClick={() => setOpen((value) => !value)}
        className={
          open
            ? "flex h-10 shrink-0 items-center gap-1 rounded-md bg-brand-orange/10 px-1.5 text-sm font-semibold text-brand-orange transition-colors"
            : "flex h-10 shrink-0 items-center gap-1 rounded-md px-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
        }
      >
        <span aria-hidden="true">{flags[locale]}</span>
        {localeLabels[locale]}
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={localeLabels[locale]}
          className="absolute top-full left-1/2 z-50 mt-2 grid w-44 -translate-x-1/2 grid-cols-1 rounded-xl border border-border bg-background p-2 shadow-lg"
        >
          {locales.map((item) => {
            const active = item === locale;
            return (
              <li key={item}>
                <a
                  href={localizePath(bare, item)}
                  hrefLang={item === "zh" ? "zh-CN" : item}
                  data-no-transition
                  aria-current={active ? "true" : undefined}
                  className={
                    active
                      ? "flex items-center gap-2 rounded-md bg-brand-orange/10 px-3 py-2 text-sm font-semibold text-brand-orange"
                      : "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-brand-orange/10 hover:text-brand-orange"
                  }
                  onClick={(event) => {
                    // Aynı dil: menüyü kapat. Başka dil: tam sayfa yükle.
                    // Soft geçiş locale header'ını yenilemez; link kalkarsa tarayıcı ilk tıklamayı da yutar.
                    if (active) {
                      event.preventDefault();
                      setOpen(false);
                      return;
                    }
                    event.preventDefault();
                    window.location.assign(localizePath(bare, item));
                  }}
                >
                  <span aria-hidden="true">{flags[item]}</span>
                  {localeLabels[item]}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
