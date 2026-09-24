/**
 * Gündoğumu / günbatımı. ABD Deniz Gözlemevi formülü.
 * suncalc ile aynı iş; ana bundle'a paket girmesin diye burada duruyor.
 * İlk boyama scripti (theme-calculator) bu hesabın kısa kopyasını taşır.
 */
const RAD = Math.PI / 180;
/** Resmî gün doğumu / batımı eşiği (derece). */
const ZENITH = 90.833;

export type SunSpan = { sunrise: number; sunset: number };

/** "day" = güneş batmıyor, "night" = güneş doğmuyor. */
export function getSunTimes(
  lat: number,
  lon: number,
  date = new Date(),
): SunSpan | "day" | "night" {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // Yılın günü (USNO).
  const n1 = Math.floor((275 * month) / 9);
  const n2 = Math.floor((month + 9) / 12);
  const n3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
  const n = n1 - n2 * n3 + day - 30;
  const lngHour = lon / 15;

  function utcHours(rising: boolean): number | "day" | "night" {
    const t = n + ((rising ? 6 : 18) - lngHour) / 24;
    const meanAnomaly = 0.9856 * t - 3.289;
    let sunLon =
      meanAnomaly +
      1.916 * Math.sin(meanAnomaly * RAD) +
      0.02 * Math.sin(2 * meanAnomaly * RAD) +
      282.634;
    sunLon = ((sunLon % 360) + 360) % 360;

    let rightAsc = Math.atan(0.91764 * Math.tan(sunLon * RAD)) / RAD;
    rightAsc = ((rightAsc % 360) + 360) % 360;
    const lonQuad = Math.floor(sunLon / 90) * 90;
    const raQuad = Math.floor(rightAsc / 90) * 90;
    rightAsc = (rightAsc + (lonQuad - raQuad)) / 15;

    const sinDec = 0.39782 * Math.sin(sunLon * RAD);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH =
      (Math.cos(ZENITH * RAD) - sinDec * Math.sin(lat * RAD)) /
      (cosDec * Math.cos(lat * RAD));
    if (cosH > 1) return "night";
    if (cosH < -1) return "day";

    const hourAngle = (rising ? 360 - Math.acos(cosH) / RAD : Math.acos(cosH) / RAD) / 15;
    let ut = hourAngle + rightAsc - 0.06571 * t - 6.622 - lngHour;
    ut = ((ut % 24) + 24) % 24;
    return ut;
  }

  const rise = utcHours(true);
  const set = utcHours(false);
  if (rise === "day" || set === "day") return "day";
  if (rise === "night" || set === "night") return "night";

  // Aynı takvim günü, saat UTC. Tema için dakika hassasiyeti yeter.
  const base = Date.UTC(year, month - 1, day);
  return {
    sunrise: base + rise * 3_600_000,
    sunset: base + set * 3_600_000,
  };
}

/** Şu an gündüz mü, gece mi. */
export function themeFromSun(
  lat: number,
  lon: number,
  now = new Date(),
): "light" | "dark" {
  const times = getSunTimes(lat, lon, now);
  if (times === "day") return "light";
  if (times === "night") return "dark";
  const t = now.getTime();
  return t >= times.sunrise && t < times.sunset ? "light" : "dark";
}
