"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PrefetchOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLocale } from "@/components/i18n/locale-provider";
import { navLinks } from "@/config/site";
import { localizePath } from "@/i18n/locales";

// Menüde olmayan ama sık açılan sayfalar.
const extraHrefs = ["/omafil-color-pro", "/kvkk"] as const;

// kind: "full" — dinamik sayfanın tamamı iner. "auto" yalnız kabuğu alır, tıklayınca yine beklenir.
const fullPage = { kind: "full" } as PrefetchOptions;

function menuHrefs(): string[] {
  const hrefs = new Set<string>(extraHrefs);
  for (const item of navLinks) {
    hrefs.add(item.href);
    if ("children" in item) {
      for (const child of item.children) hrefs.add(child.href);
    }
  }
  return [...hrefs];
}

/**
 * Sayfa oturunca menü adreslerini sırayla önceden çeker.
 * Telefonda hamburger kapalıyken link DOM'da yok; tıklama anında çekmek geç kalır.
 */
export function PrefetchNav() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const here = window.location.pathname;
    const hrefs = menuHrefs()
      .map((href) => localizePath(href, locale))
      .filter((href) => href !== here);

    let index = 0;
    let stepTimer = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const href = hrefs[index];
      if (!href) return;
      index += 1;
      router.prefetch(href, fullPage);
      // Hepsi birden değil. Açık sayfanın resmi ve yazısı önce gelsin.
      stepTimer = window.setTimeout(step, 220);
    };

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => step(), { timeout: 1200 })
        : 0;
    const startTimer = idleId === 0 ? window.setTimeout(step, 500) : 0;

    return () => {
      cancelled = true;
      window.clearTimeout(stepTimer);
      window.clearTimeout(startTimer);
      if (idleId !== 0) window.cancelIdleCallback(idleId);
    };
  }, [locale, router]);

  return null;
}
