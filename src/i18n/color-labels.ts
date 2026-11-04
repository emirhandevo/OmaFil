import type { Locale } from "@/i18n/locales";

/**
 * Katalogdaki renk kökü Türkçe kalır (Ekru, Siyah).
 * Ekranda bu dilin karşılığı basılır. Bilinmeyen ad olduğu gibi kalır.
 */
const labels: Record<string, Record<Locale, string>> = {
  Ekru: {
    tr: "Ekru",
    en: "Ecru",
    de: "Ecru",
    fr: "Écru",
    es: "Crudo",
    it: "Ecru",
    pt: "Cru",
    nl: "Ecru",
    ru: "Экрю",
    ar: "إكرو",
    zh: "本白",
  },
  Siyah: {
    tr: "Siyah",
    en: "Black",
    de: "Schwarz",
    fr: "Noir",
    es: "Negro",
    it: "Nero",
    pt: "Preto",
    nl: "Zwart",
    ru: "Чёрный",
    ar: "أسود",
    zh: "黑色",
  },
};

export function colorLabel(locale: Locale, name: string): string {
  return labels[name]?.[locale] ?? name;
}
