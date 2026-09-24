import { coordinatesForTimezone, TIMEZONE_COORDINATES } from "@/lib/timezone-coordinates";
import { themeFromSun } from "@/lib/sun-times";

/** Çözülmüş tema. localStorage "theme". */
export const THEME_KEY = "theme";
/** Son otomatik hesabın zamanı (ms). */
export const THEME_AT_KEY = "themeCalculatedAt";
/** "1" ise kullanıcı light/dark seçti, otomatik hesap kapalı. */
export const THEME_OVERRIDE_KEY = "themeUserOverride";
/** Butonun gördüğü tercih: light | dark | auto. */
export const THEME_MODE_KEY = "themeMode";
/** Bu süreden yeni kayıt varsa yeniden hesaplama. */
export const THEME_CACHE_MS = 3 * 60 * 60 * 1000;

export type ThemePreference = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // gizli sekme
  }
}

function safeRemove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // gizli sekme
  }
}

/** Eski kayıt: theme = light | dark | auto. Yeni kayıtta themeMode ayrı. */
export function readThemeMode(): ThemePreference {
  const mode = safeGet(THEME_MODE_KEY);
  if (mode === "light" || mode === "dark" || mode === "auto") return mode;

  const legacy = safeGet(THEME_KEY);
  if (legacy === "auto") return "auto";
  if (legacy === "light" || legacy === "dark") return legacy;
  return "auto";
}

export function readResolvedTheme(): ResolvedTheme {
  const stored = safeGet(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  return "light";
}

/** Saat diliminden gündüz/gece. */
export function calculateAutoTheme(now = new Date()): ResolvedTheme {
  let timeZone = "UTC";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    // eski tarayıcı
  }
  const [lat, lon] = coordinatesForTimezone(timeZone);
  return themeFromSun(lat, lon, now);
}

export function isThemeCacheFresh(now = Date.now()): boolean {
  const at = Number(safeGet(THEME_AT_KEY) || 0);
  return at > 0 && now - at < THEME_CACHE_MS;
}

/**
 * Tercihi yazar ve çözülmüş temayı döner.
 * light/dark: otomatik hesap kapanır.
 * auto: gündoğumundan hesaplar, 3 saatlik damgayı yeniler.
 */
export function writeThemePreference(preference: ThemePreference): ResolvedTheme {
  if (preference === "auto") {
    const resolved = calculateAutoTheme();
    safeRemove(THEME_OVERRIDE_KEY);
    safeSet(THEME_MODE_KEY, "auto");
    safeSet(THEME_KEY, resolved);
    safeSet(THEME_AT_KEY, String(Date.now()));
    return resolved;
  }

  safeSet(THEME_OVERRIDE_KEY, "1");
  safeSet(THEME_MODE_KEY, preference);
  safeSet(THEME_KEY, preference);
  return preference;
}

/**
 * <head> içinde React'ten önce çalışır.
 * Tablo ve formül, sunucu bu string'i üretirken gömülür; ek istek yok.
 */
export function buildThemeBootScript(): string {
  const zones = JSON.stringify(TIMEZONE_COORDINATES);
  return `(function(){try{var Z=${zones};var K="${THEME_KEY}",A="${THEME_AT_KEY}",O="${THEME_OVERRIDE_KEY}",M="${THEME_MODE_KEY}",C=${THEME_CACHE_MS};var mode=localStorage.getItem(M);var theme=localStorage.getItem(K);var override=localStorage.getItem(O)==="1";if(!mode){if(theme==="light"||theme==="dark"){override=true;localStorage.setItem(O,"1");localStorage.setItem(M,theme);mode=theme}else{localStorage.setItem(M,"auto");mode="auto"}}var at=Number(localStorage.getItem(A)||0);var fresh=at>0&&(Date.now()-at)<C;var dark;if(override&&(theme==="light"||theme==="dark")){dark=theme==="dark"}else if(mode==="auto"&&fresh&&(theme==="light"||theme==="dark")){dark=theme==="dark"}else{var tz="UTC";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}catch(e){}var c=Z[tz];if(!c){var off=-new Date().getTimezoneOffset()/60;c=[41,off*15]}var lat=c[0],lon=c[1];var now=new Date();var y=now.getFullYear(),mo=now.getMonth()+1,da=now.getDate();var n1=Math.floor(275*mo/9),n2=Math.floor((mo+9)/12),n3=1+Math.floor((y-4*Math.floor(y/4)+2)/3);var n=n1-n2*n3+da-30;var lh=lon/15;var RAD=Math.PI/180;function ut(rising){var t=n+((rising?6:18)-lh)/24;var M=0.9856*t-3.289;var L=M+1.916*Math.sin(M*RAD)+0.02*Math.sin(2*M*RAD)+282.634;L=((L%360)+360)%360;var RA=Math.atan(0.91764*Math.tan(L*RAD))/RAD;RA=((RA%360)+360)%360;var Lq=Math.floor(L/90)*90,RAq=Math.floor(RA/90)*90;RA=(RA+(Lq-RAq))/15;var sinDec=0.39782*Math.sin(L*RAD);var cosDec=Math.cos(Math.asin(sinDec));var cosH=(Math.cos(90.833*RAD)-sinDec*Math.sin(lat*RAD))/(cosDec*Math.cos(lat*RAD));if(cosH>1)return"night";if(cosH<-1)return"day";var H=((rising?360-Math.acos(cosH)/RAD:Math.acos(cosH)/RAD))/15;var u=H+RA-0.06571*t-6.622-lh;return((u%24)+24)%24}var rise=ut(true),set=ut(false);var light;if(rise==="day"||set==="day")light=true;else if(rise==="night"||set==="night")light=false;else{var base=Date.UTC(y,mo-1,da);var tms=now.getTime();light=tms>=base+rise*3600000&&tms<base+set*3600000}dark=!light;localStorage.setItem(K,dark?"dark":"light");localStorage.setItem(A,String(Date.now()));localStorage.setItem(M,"auto");localStorage.removeItem(O)}document.documentElement.classList.toggle("dark",dark)}catch(e){}})();`;
}
