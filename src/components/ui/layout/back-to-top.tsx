"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useCopy } from "@/components/i18n/locale-provider";

/** Kaç px aşağı inince buton çıksın. */
const SHOW_AFTER = 320;

/**
 * Sol alt: kaydırınca görünür, tıklanınca sayfa başına gider.
 * Sağdaki WhatsApp / AI yığınına çarpmasın diye fiziksel left.
 */
export function BackToTop() {
  const copy = useCopy();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label={copy.chrome.backToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={[
        "pointer-events-auto fixed bottom-4 left-4 z-[60] flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all print:hidden",
        "hover:border-brand-orange hover:text-brand-orange active:border-brand-orange active:text-brand-orange",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
    >
      <ChevronUp className="size-6" aria-hidden="true" />
    </button>
  );
}
