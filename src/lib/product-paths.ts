import { stripLocale } from "@/i18n/locales";

/** Liste sayfası. /en/urunlerimiz de aynı sayılır. */
export function isProductListPath(pathname: string) {
  return stripLocale(pathname) === "/urunlerimiz";
}

/** Tek ürün: /urunlerimiz/slug. Dil öneki sayılmaz. */
export function isProductDetailPath(pathname: string) {
  return /^\/urunlerimiz\/[^/]+$/.test(stripLocale(pathname));
}
