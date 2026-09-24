import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/locales";

/**
 * /en/urunlerimiz gibi önekli URL’yi mevcut Türkçe rotaya rewrite eder.
 * Sayfa dosyaları taşınmaz. Dil, x-locale header’ı ile layout’a gider.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) && segment !== defaultLocale ? segment : defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  if (locale === defaultLocale) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  const rest = pathname.replace(new RegExp(`^/${segment}`), "") || "/";
  url.pathname = rest;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!api|keystatic|_next|images|videos|masks|favicon|icon|opengraph|twitter|.*\\..*).*)",
  ],
};
