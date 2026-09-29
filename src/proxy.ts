import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/locales";
import {KEYSTATIC_COOKIE, panelAllows} from "@/lib/keystatic-gate";

/** panel arayüzü ve içerik yazma adresi. ikisi de aynı kilit */
function isKeystaticPath(pathname:string): boolean {
  return (
    pathname === "/keystatic" || 
    pathname.startsWith("/keystatic/") || 
    pathname === "/api/keystatic" || 
    pathname.startsWith("/api/keystatic/") 
  );
}

/**
 * önce panel kilidi, sonra dil yönlendirmesi
 * /en/urunlerimiz gibi önekli URL’yi mevcut Türkçe rotaya rewrite eder.
 * Sayfa dosyaları taşınmaz. Dil, x-locale header’ı ile layout’a gider
 */

export function proxy(request:NextRequest) {
  const {pathname} = request.nextUrl;
  
  if (isKeystaticPath(pathname)) {
    const token = request.cookies.get(KEYSTATIC_COOKIE)?.value;
    if(!panelAllows(token)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({error: "Giriş gerekli"}, {status: 401});
      }
      const login = request.nextUrl.clone();
      login.pathname = "/panel-giris";
      login.search = "";
      return NextResponse.redirect(login);
    }
  }

  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) && segment !== defaultLocale ? segment : defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  if (locale === defaultLocale) {
    return NextResponse.next({request: {headers: requestHeaders}});
  }
  
  const url = request.nextUrl.clone();
  const rest = pathname.replace(new RegExp(`^/${segment}`), "") || "/";
  url.pathname = rest;
  return NextResponse.rewrite(url, {request: {headers: requestHeaders }});
}

export const config = {
  matcher: [
    "/((?!api|keystatic|_next|images|videos|masks|favicon|icon|opengraph|twitter|.*\\..*).*)",
    "/keystatic",
    "/keystatic/:path*",
    "/api/keystatic",
    "/api/keystatic/:path*",
  ],
};
