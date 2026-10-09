import type { MetadataRoute } from "next";
import { getProductLines } from "@/content/catalog";
import { corporateLinks, site } from "@/config/site";
import {
  defaultLocale,
  htmlLang,
  locales,
  localizePath,
} from "@/i18n/locales";

/** Sitemap sayfa render'ından ayrı. metadataBase burada uygulanmaz, adres tam yazılır. */
function absoluteUrl(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

/**
 * Aynı sayfanın 11 dil kopyası.
 * tr öneksiz kalır. x-default Türkçe adrese bakar. zh kodu zh-CN olur.
 */
function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(localizePath(path, defaultLocale)),
  };
  for (const locale of locales) {
    languages[htmlLang(locale)] = absoluteUrl(localizePath(path, locale));
  }
  return languages;
}

// Sadece yayında olan sayfalar. 404 link sitemap’e girmez.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productLines = await getProductLines();
  const paths = [
    "/",
    "/kurumsal",
    "/urunlerimiz",
    ...productLines.map((line) => `/urunlerimiz/${line.slug}`),
    "/ges",
    "/iletisim",
    "/blog",
    ...corporateLinks.map((item) => item.href),
  ];

  return paths.flatMap((path) => {
    const languages = languageAlternates(path);
    return locales.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      lastModified: new Date(),
      alternates: { languages },
    }));
  });
}
