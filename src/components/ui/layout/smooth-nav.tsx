"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  isProductDetailPath,
  isProductListPath,
} from "@/components/sections/products-browse";

/**
 * İç link tıklamalarını yakalar; destekleyen tarayıcıda
 * document.startViewTransition ile soft sayfa geçişi yapar.
 * Header/footer view-transition-name ile sabit kalır (globals.css).
 */
export function SmoothNav() {
  const router = useRouter();

  useEffect(() => {
    // VT destekliyorsa template enter’ı kapat (çift animasyon olmasın)
    if (typeof document.startViewTransition === "function") {
      document.documentElement.classList.add("omafil-vt");
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (anchor.dataset.noTransition !== undefined) return;

      // mailto ve tel sayfa değil. Mail / arama uygulamasına bırak.
      const protocol = anchor.protocol;
      if (protocol === "mailto:" || protocol === "tel:") return;

      const hrefAttr = anchor.getAttribute("href");
      if (!hrefAttr || hrefAttr.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(hrefAttr, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const next = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next === current) return;

      // VT yoksa Next Link kendi işini yapsın
      if (typeof document.startViewTransition !== "function") return;

      event.preventDefault();
      event.stopPropagation();

      // Detaydan listeye dönüşte Next tepeye kaydırmasın. Konumu provider yazar.
      const backToList =
        isProductDetailPath(window.location.pathname) &&
        isProductListPath(url.pathname);
      const go = () =>
        router.push(next, backToList ? { scroll: false } : undefined);
      try {
        document.startViewTransition(() => go());
      } catch {
        window.location.assign(url.href);
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
