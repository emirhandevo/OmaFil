"use client";

import { createContext, useContext, type ReactNode } from "react";
import { buildCopy, type Copy } from "@/i18n/build-copy";
import { getInner, type Inner } from "@/i18n/inner";
import type { Locale } from "@/i18n/locales";

const LocaleContext = createContext<Locale>("tr");
const CopyContext = createContext<Copy | null>(null);

/** Sunucu layout dili buradan client bileşenlere iner. */
export function LocaleProvider({
  locale,
  copy,
  children,
}: {
  locale: Locale;
  copy?: Copy;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      <CopyContext.Provider value={copy ?? buildCopy(locale)}>
        {children}
      </CopyContext.Provider>
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useCopy(): Copy {
  const copy = useContext(CopyContext);
  if (!copy) {
    throw new Error("useCopy, LocaleProvider içinde kullanılmalı");
  }
  return copy;
}

/** tr için null. Client sayfalar Türkçe kaynağa düşer. */
export function useInner(): Inner | null {
  return getInner(useLocale());
}
