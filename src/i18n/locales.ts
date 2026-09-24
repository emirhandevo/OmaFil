/** Site dilleri. tr kök URL’de kalır, diğerleri /en /de … öneki alır. */
export const locales = [
  "tr",
  "en",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "ru",
  "ar",
  "zh",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

/** Menüde görünen kısa kod. zh = ZH-CN. */
export const localeLabels: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
  fr: "FR",
  es: "ES",
  it: "IT",
  pt: "PT",
  nl: "NL",
  ru: "RU",
  ar: "AR",
  zh: "ZH-CN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** /en/urunlerimiz → /urunlerimiz. Türkçe önek yok. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (parts[1] && isLocale(parts[1]) && parts[1] !== defaultLocale) {
    const rest = parts.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  const bare = stripLocale(pathname);
  if (locale === defaultLocale) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}

export function htmlLang(locale: Locale): string {
  if (locale === "zh") return "zh-CN";
  return locale;
}

/** Open Graph locale kodu. Marka adı değişmez. */
export function ogLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    tr: "tr_TR",
    en: "en_US",
    de: "de_DE",
    fr: "fr_FR",
    es: "es_ES",
    it: "it_IT",
    pt: "pt_PT",
    nl: "nl_NL",
    ru: "ru_RU",
    ar: "ar_SA",
    zh: "zh_CN",
  };
  return map[locale];
}

/**
 * Her dil kendi URL’sini canonical saysın.
 * hreflang, Google’a aynı sayfanın dil kopyalarını gösterir.
 */
export function pageAlternates(path: string, locale: Locale) {
  const languages: Record<string, string> = {
    "x-default": localizePath(path, defaultLocale),
  };
  for (const item of locales) {
    languages[htmlLang(item)] = localizePath(path, item);
  }
  return {
    canonical: localizePath(path, locale),
    languages,
  };
}
