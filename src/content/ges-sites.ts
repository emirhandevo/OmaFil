/**
 * GES tesisleri — gerçek veriler (Excel + müdür + OSB yazısı + uygulama).
 * Excel / app screenshot siteye konmaz — sadece rakamlar.
 */

export type GesSite = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  kind: "saha" | "cati";
  /** Kurulu güç MWp */
  capacityMwp: number;
  /** İnvertör nominal MW (uygulama), varsa */
  inverterMw?: number;
  panelCount: number;
  dailyKwhMin?: number;
  dailyKwhMax?: number;
  annualKwhMin: number;
  annualKwhMax: number;
  sharePercent: number;
  /** Üretime / geçici kabul (ISO) */
  productionStart?: string;
  monitor?: {
    measuredAt: string;
    totalGwh: number;
    todayMwh?: number;
    coalTonsSaved?: number;
    co2TonsAvoided?: number;
    treesEquivalent?: number;
  };
  images: string[];
};

export const gesSites: GesSite[] = [
  {
    id: "elazig-hacisam",
    name: "Elazığ GES 1 — Hacısam",
    shortName: "OMA 1",
    location: "Elazığ / Kovancılar / Hacısam Köyü",
    kind: "saha",
    capacityMwp: 3.2,
    inverterMw: 3.0,
    panelCount: 7098,
    dailyKwhMin: 26_000,
    dailyKwhMax: 27_000,
    annualKwhMin: 4_800_000,
    annualKwhMax: 5_760_000,
    sharePercent: 47,
    productionStart: "2026-06-10",
    monitor: {
      measuredAt: "2026-09-22T10:15:00+03:00",
      totalGwh: 2.69,
      todayMwh: 3.63,
      coalTonsSaved: 1080,
      co2TonsAvoided: 1280,
      treesEquivalent: 1750,
    },
    images: [
      "/images/ges/elazig-hacisam/01.webp",
      "/images/ges/elazig-hacisam/02.webp",
      "/images/ges/elazig-hacisam/03.webp",
      "/images/ges/elazig-hacisam/04.webp",
    ],
  },
  {
    id: "elazig-kavak",
    name: "Elazığ GES 2 — Kavak",
    shortName: "OMA 2",
    location: "Elazığ / Kovancılar / Kavak Köyü",
    kind: "saha",
    capacityMwp: 2.0,
    inverterMw: 2.1,
    panelCount: 4056,
    dailyKwhMin: 15_000,
    dailyKwhMax: 17_000,
    annualKwhMin: 3_000_000,
    annualKwhMax: 3_600_000,
    sharePercent: 30,
    productionStart: "2026-06-10",
    monitor: {
      measuredAt: "2026-09-22T10:15:00+03:00",
      totalGwh: 1.62,
      todayMwh: 2.25,
      coalTonsSaved: 648.73,
      co2TonsAvoided: 770.37,
      treesEquivalent: 1050,
    },
    images: [
      "/images/ges/elazig-kavak/01.webp",
      "/images/ges/elazig-kavak/02.webp",
      "/images/ges/elazig-kavak/03.webp",
      "/images/ges/elazig-kavak/04.webp",
    ],
  },
  {
    id: "erbaa-cati-1",
    name: "Erbaa Çatı Üstü GES 1",
    shortName: "Çatı Üstü GES 1",
    location: "Tokat / Erbaa OSB — Oma Polimer üretim tesisi",
    kind: "cati",
    capacityMwp: 0.96,
    panelCount: 2856,
    // Toplam çatı günlük 9–10 bin; GES1 payı ~960/1560
    dailyKwhMin: Math.round(9000 * (960 / 1560)),
    dailyKwhMax: Math.round(10000 * (960 / 1560)),
    annualKwhMin: 1_440_000,
    annualKwhMax: 1_728_000,
    sharePercent: 14,
    productionStart: "2023-06-22",
    images: ["/images/ges/erbaa-cati-1/aerial.webp"],
  },
  {
    id: "erbaa-cati-2",
    name: "Erbaa Çatı Üstü GES 2",
    shortName: "Çatı Üstü GES 2",
    location: "Tokat / Erbaa OSB — Oma Polimer üretim tesisi",
    kind: "cati",
    capacityMwp: 0.6,
    panelCount: 1296,
    dailyKwhMin: Math.round(9000 * (600 / 1560)),
    dailyKwhMax: Math.round(10000 * (600 / 1560)),
    annualKwhMin: 900_000,
    annualKwhMax: 1_080_000,
    sharePercent: 9,
    productionStart: "2024-12-27",
    images: ["/images/ges/erbaa-cati-2/01.webp"],
  },
];

/** Erbaa çatı birleşik (müdür notu) */
export const gesErbaaRoof = {
  capacityMwp: 1.56,
  capacityKw: 1560,
  dailyKwhMin: 9000,
  dailyKwhMax: 10_000,
  ges1Start: "2023-06-22",
  ges2Start: "2024-12-27",
} as const;

export const gesPortfolioTotals = {
  kwhPerKwpYearMin: 1500,
  kwhPerKwpYearMax: 1800,
  elazig: {
    panels: 11_154,
    capacityMwp: 5.2,
    annualKwhMin: 7_800_000,
    annualKwhMax: 9_360_000,
    sharePercent: 77,
  },
  erbaa: {
    panels: 4152,
    capacityMwp: 1.56,
    annualKwhMin: 2_340_000,
    annualKwhMax: 2_808_000,
    sharePercent: 23,
  },
  all: {
    panels: 11_154 + 4152,
    capacityMwp: 5.2 + 1.56,
    annualKwhMin: 7_800_000 + 2_340_000,
    annualKwhMax: 9_360_000 + 2_808_000,
  },
} as const;

/** Elazığ uygulama anlık toplamı (22.09.2026 ~10:15) */
export const gesElazigMonitorSnapshot = {
  measuredAt: "2026-09-22T10:15:00+03:00",
  totalGwh: 2.69 + 1.62,
  totalKwh: (2.69 + 1.62) * 1_000_000,
  co2Tons: 1280 + 770.37,
  trees: 1750 + 1050,
  coalTons: 1080 + 648.73,
} as const;

/** Ortalama günlük üretim (kWh) — sayaç tick hızı */
export function gesAverageDailyKwh(): number {
  const oma1 = (26_000 + 27_000) / 2;
  const oma2 = (15_000 + 17_000) / 2;
  const erbaa = (9000 + 10_000) / 2;
  return oma1 + oma2 + erbaa;
}
