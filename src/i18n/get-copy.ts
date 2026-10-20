import { cache } from "react";
import { overlayCopyFromCms } from "@/content/sections";
import { buildCopy, type Copy } from "@/i18n/build-copy";
import { getLocale } from "@/i18n/get-locale";
import type { Locale } from "@/i18n/locales";

export type { Copy };

/** İstek başına bir kez. Keystatic section metinleri sözlüğün üstüne biner. */
export const getCopy = cache(async function getCopy(): Promise<{
  locale: Locale;
  copy: Copy;
}> {
  const locale = await getLocale();
  const copy = await overlayCopyFromCms(buildCopy(locale), locale);
  return { locale, copy };
});
