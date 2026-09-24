import { chrome } from "@/i18n/chrome";
import type { Chrome } from "@/i18n/chrome";
import { dictionaries } from "@/i18n/dictionary";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

/** Sözlük + kısa arayüz. next/headers yok; client de kullanabilir. */
export type Copy = Dictionary & { chrome: Chrome };

export function buildCopy(locale: Locale): Copy {
  return { ...dictionaries[locale], chrome: chrome[locale] };
}
