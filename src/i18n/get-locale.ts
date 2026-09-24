import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/i18n/locales";

/** Proxy’nin yazdığı x-locale. Yoksa site Türkçe kalır. */
export async function getLocale(): Promise<Locale> {
  const headerList = await headers();
  const value = headerList.get("x-locale") ?? "";
  return isLocale(value) ? value : defaultLocale;
}
