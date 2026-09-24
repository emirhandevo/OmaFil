import { buildCopy, type Copy } from "@/i18n/build-copy";
import { getLocale } from "@/i18n/get-locale";
import type { Locale } from "@/i18n/locales";

export type { Copy };

export async function getCopy(): Promise<{ locale: Locale; copy: Copy }> {
  const locale = await getLocale();
  return { locale, copy: buildCopy(locale) };
}
