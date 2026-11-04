"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Copy } from "@/i18n/build-copy";
import type { Locale } from "@/i18n/locales";

const LocaleContext = createContext<Locale>("tr");
const CopyContext = createContext<Copy | null>(null);
// Yalnız bu dilin ürün özetleri. Sözlüğün tamamı client paketine girmez.
const ProductsContext = createContext<Record<string, string> | null>(null);

/**
 * Dil ve metin sunucudan gelir. Client buildCopy / getInner çağırmaz;
 * yoksa 11 dilin sözlüğü ilk JS ile iner.
 */
export function LocaleProvider({
  locale,
  copy,
  products,
  children,
}: {
  locale: Locale;
  copy: Copy;
  products: Record<string, string> | null;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      <CopyContext.Provider value={copy}>
        <ProductsContext.Provider value={products}>
          {children}
        </ProductsContext.Provider>
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

/** tr için null. Kartlar kendi Türkçe özetine düşer. */
export function useProductSummaries(): Record<string, string> | null {
  return useContext(ProductsContext);
}
