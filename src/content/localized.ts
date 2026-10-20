import { defaultLocale, locales, type Locale } from "@/i18n/locales";

/** Paneldeki dil grupları — Keystatic label’ları. */
export const localeFieldLabels: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  ru: "Русский",
  ar: "العربية",
  zh: "中文",
};

type StringRecord = Record<string, string>;

/**
 * İstenen dilin metnini al. Boş alan TR’ye düşer.
 * copy yoksa null — çağıran eski alana bakar.
 */
export function pickLocale<T extends StringRecord>(
  copy: Partial<Record<Locale, T>> | undefined,
  locale: Locale,
): T | null {
  if (!copy) return null;
  const tr = copy[defaultLocale];
  const row = copy[locale] ?? tr;
  if (!row && !tr) return null;
  if (!tr) return row as T;
  const out = { ...tr } as T;
  if (row) {
    for (const key of Object.keys(tr) as (keyof T)[]) {
      const value = row[key];
      if (typeof value === "string" && value.trim()) {
        out[key] = value;
      }
    }
  }
  return out;
}

/** Sadece bu dilde doldurulmuş alanlar. Boşsa sözlük/inner kullanılır. */
export function pickFilled<T extends StringRecord>(
  copy: Partial<Record<Locale, T>> | undefined,
  locale: Locale,
): Partial<T> {
  const row = copy?.[locale];
  if (!row) return {};
  const out: Partial<T> = {};
  for (const key of Object.keys(row) as (keyof T)[]) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) {
      out[key] = value.trim() as T[keyof T];
    }
  }
  return out;
}

/** CMS dolu string sözlük alanını ezer. */
export function overlayStrings<T extends Record<string, string>>(
  base: T,
  over?: Partial<Record<string, string | undefined>> | null,
): T {
  if (!over) return base;
  const out = { ...base };
  for (const key of Object.keys(base) as (keyof T)[]) {
    const value = over[key as string];
    if (typeof value === "string" && value.trim()) {
      out[key] = value.trim() as T[keyof T];
    }
  }
  return out;
}

export { locales, defaultLocale };
export type { Locale };
