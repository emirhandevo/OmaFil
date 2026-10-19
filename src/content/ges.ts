/**
 * GES sayfası — metin + canlı sayaç (gerçek tesis verileri).
 * Tesis listesi: @/content/ges-sites
 */

import {
  gesAverageDailyKwh,
  gesElazigMonitorSnapshot,
  gesPortfolioTotals,
} from "@/content/ges-sites";

export const gesIntro = {
  title: "Güneş Enerji Sistemimiz",
  subtitle:
    "Elazığ arazi GES ve Erbaa çatı üstü GES ile üretimi güneşten besliyoruz",
  paragraphs: [
    "OmaFil olarak yalnızca kaliteli iplik üretmiyoruz; enerjiyi de yenilenebilir kaynaklardan sağlıyoruz. Portföyümüzde Elazığ Kovancılar’da iki arazi GES (OMA 1 Hacısam, OMA 2 Kavak) ve Tokat Erbaa üretim tesisimizde iki çatı üstü GES bulunuyor.",
    "Toplam kurulu gücümüz 6,76 MWp. Günlük üretimimiz arazi ve çatı üstü sistemleriyle birlikte onlarca megawatt-saat bandında; karbon ayak izimizi azaltarak yeşil sanayiye katkı sunuyoruz.",
  ],
} as const;

export const gesPillars = [
  {
    title: "Arazi + çatı üstü GES",
    text: "Elazığ’da 5,2 MWp arazi santrali; Erbaa fabrika çatısında 1,56 MWp. İki coğrafyada, aynı sürdürülebilirlik hedefi.",
  },
  {
    title: "Daha az karbon ayak izi",
    text: "Ürettiğimiz her kilowatt-saat, fosil kaynaklı emisyonu azaltır. Sayaçlarımız uygulama ve tesis verilerine dayanır.",
  },
  {
    title: "Yeşil sanayi öncülüğü",
    text: "Kendi enerjimizi üreterek tekstil üretiminde temiz enerji dönüşümüne örnek olmayı hedefliyoruz.",
  },
] as const;

export const gesRespectBlock = {
  title: "Doğaya saygılı, sürdürülebilir üretim",
  text: "Teknolojiyi ve yenilikçi yatırımları işimizin merkezine koyarken çevre sorumluluğumuzu unutmuyoruz. Arazi ve çatı üstü GES yatırımlarımızla karbon salınımını azaltıyor, ekolojik dengeye katkı sağlıyoruz.",
} as const;

export const gesCapacity = {
  title: "Yeşil enerjimizle üretiyoruz",
  text: `Toplam ${gesPortfolioTotals.all.capacityMwp.toLocaleString("tr-TR")} MWp kurulu gücümüzle (Elazığ ${gesPortfolioTotals.elazig.capacityMwp} MWp arazi + Erbaa ${gesPortfolioTotals.erbaa.capacityMwp} MWp çatı üstü) yıllık yaklaşık ${(gesPortfolioTotals.all.annualKwhMin / 1_000_000).toLocaleString("tr-TR")}–${(gesPortfolioTotals.all.annualKwhMax / 1_000_000).toLocaleString("tr-TR")} GWh üretim kapasitesine sahibiz.`,
} as const;

/**
 * Erbaa kümülatif tahmini (OSB kabul tarihleri + günlük ortalama).
 * Elazığ rakamları uygulama ekranından net; Erbaa için henüz SCADA yok.
 */
function estimateErbaaKwhAt(isoDate: string): number {
  const at = Date.parse(isoDate);
  const midDaily = (9000 + 10_000) / 2;
  const ges1Share = 960 / 1560;
  const ges2Share = 600 / 1560;
  const dayMs = 86_400_000;

  const ges1Days = Math.max(
    0,
    (at - Date.parse("2023-06-22T00:00:00+03:00")) / dayMs,
  );
  const ges2Days = Math.max(
    0,
    (at - Date.parse("2024-12-27T00:00:00+03:00")) / dayMs,
  );

  return ges1Days * midDaily * ges1Share + ges2Days * midDaily * ges2Share;
}

const MEASURED_AT = gesElazigMonitorSnapshot.measuredAt;
const ELAZIG_KWH = gesElazigMonitorSnapshot.totalKwh;
const ERBAA_KWH = estimateErbaaKwhAt(MEASURED_AT);
const TOTAL_KWH = ELAZIG_KWH + ERBAA_KWH;

/** CO₂ / ağaç oranları — Elazığ uygulama özetinden */
const CO2_PER_KWH =
  gesElazigMonitorSnapshot.co2Tons / gesElazigMonitorSnapshot.totalKwh;
const TREES_PER_TON =
  gesElazigMonitorSnapshot.trees / gesElazigMonitorSnapshot.co2Tons;

/**
 * Canlı kümülatif sayaç.
 * Ölçüm anı: Elazığ app (OMA 1+2) + Erbaa tahmini (kabul tarihi × günlük ort.).
 * Tick: tüm tesislerin ortalama günlük üretimi / 86400.
 */
export const gesLiveCounter = {
  measuredAt: MEASURED_AT,
  energyKwhAtMeasure: TOTAL_KWH,
  kwhPerSecond: gesAverageDailyKwh() / 86_400,
  tonsCo2PerKwh: CO2_PER_KWH,
  treesPerTonCo2: TREES_PER_TON,
} as const;

export const gesMetrics = [
  {
    id: "energy" as const,
    label: "Ürettiğimiz güneş enerjisi (kWh)",
    decimals: 0,
    suffix: "",
    image: "/images/ges/elazig-hacisam/01.webp",
    imageAlt: "Elazığ Hacısam GES — OMA 1",
  },
  {
    id: "carbon" as const,
    label: "Tasarruf edilen karbon emisyonu (ton)",
    decimals: 2,
    suffix: "CO₂",
    image: "/images/ges/elazig-kavak/01.webp",
    imageAlt: "Elazığ Kavak GES — OMA 2",
  },
  {
    id: "trees" as const,
    label: "Denk ağaç sayısı (ad)",
    decimals: 0,
    suffix: "",
    image: "/images/ges/erbaa-cati-1/aerial.webp",
    imageAlt: "Erbaa çatı üstü GES — Oma Polimer tesisi",
  },
] as const;

export function computeGesMetrics(nowMs = Date.now()) {
  const epoch = Date.parse(gesLiveCounter.measuredAt);
  const elapsedSec = Math.max(0, (nowMs - epoch) / 1000);
  const energyKwh =
    gesLiveCounter.energyKwhAtMeasure +
    elapsedSec * gesLiveCounter.kwhPerSecond;
  const carbonTons = energyKwh * gesLiveCounter.tonsCo2PerKwh;
  const trees = carbonTons * gesLiveCounter.treesPerTonCo2;

  return {
    energy: energyKwh,
    carbon: carbonTons,
    trees,
  };
}
