import { resolveAsset } from "@/lib/resolve-asset";

/**
 * Hero şeritleri — tek kaynak.
 * Geniş ekran: üst N6 + PES DCY, alt N6,6 + PES SCY + PES ACY.
 * Dar ekran (lg altı): önce üst sıra, sonra alt sıra, tek şeritte.
 * İlk kart N6 POY. Yalnız o eager + yüksek öncelik (LCP). Geri kalan lazy.
 * Kart yazısı katalogdaki label. Hover metni ürün özetinden gelir (çeviriler inner.products).
 * src yoksa başka ürünün görseli konmaz; kartta yer tutucu kalır.
 */

export type MarqueeItem = {
  slug: string;
  label: string;
  summary: string;
  href: string;
  /** Görsel yoksa boş bırakılır */
  src?: string;
  code: string;
};

const products: MarqueeItem[] = [
  {
    slug: "n6-poy",
    label: "Naylon 6 POY",
    summary: "PA6. SD / BR / FD seçenekleri.",
    href: "/urunlerimiz/n6-poy",
    src: "/images/hero/iplik/poy-n6.webp",
    code: "POY",
  },
  {
    slug: "n6-fdy",
    label: "Naylon 6 FDY",
    summary: "Tam çekimli PA6. Round ve trilobal kesit.",
    href: "/urunlerimiz/n6-fdy",
    src: "/images/hero/iplik/fdy-n6.webp",
    code: "FDY",
  },
  {
    slug: "n6-dty",
    label: "Naylon 6 DTY",
    summary: "Tekstüre PA6. Ecru, siyah ve renkli seçenekler.",
    href: "/urunlerimiz/n6-dty",
    src: "/images/hero/iplik/dty-n6.webp",
    code: "DTY",
  },
  {
    slug: "n6-acy",
    label: "Naylon 6 ACY",
    summary: "Hava jetli kaplama PA6 + elastan. Ecru / siyah / renkli.",
    href: "/urunlerimiz/n6-acy",
    src: "/images/hero/iplik/acy-n6.webp",
    code: "ACY",
  },
  {
    slug: "n6-scy",
    label: "Naylon 6 SCY",
    summary: "Tek kaplama (single covered) PA6 + elastan.",
    href: "/urunlerimiz/n6-scy",
    src: "/images/hero/iplik/scy-n6.webp",
    code: "SCY",
  },
  {
    slug: "n6-dcy",
    label: "Naylon 6 DCY",
    summary: "Çift kaplama (double covered) PA6 + elastan.",
    href: "/urunlerimiz/n6-dcy",
    src: "/images/hero/iplik/dcy-n6.webp",
    code: "DCY",
  },
  {
    slug: "n66-poy",
    label: "Naylon 6,6 POY",
    summary: "PA66 POY; final DTY dönüşümü. Softel / Nicolite.",
    href: "/urunlerimiz/n66-poy",
    src: "/images/hero/iplik/poy-n66.webp",
    code: "POY",
  },
  {
    slug: "n66-fdy",
    label: "Naylon 6,6 FDY",
    summary: "PA66 tam çekimli.",
    href: "/urunlerimiz/n66-fdy",
    src: "/images/hero/iplik/fdy-n66.webp",
    code: "FDY",
  },
  {
    slug: "n66-dty",
    label: "Naylon 6,6 DTY",
    summary: "PA66 tekstüre. Seamless, hosiery ve dokuma uygulamaları.",
    href: "/urunlerimiz/n66-dty",
    src: "/images/hero/iplik/dty-n66.webp",
    code: "DTY",
  },
  {
    slug: "n66-acy",
    label: "Naylon 6,6 ACY",
    summary: "Hava jetli kaplama PA66 + elastan. Custom üretim.",
    href: "/urunlerimiz/n66-acy",
    src: "/images/hero/iplik/acy-n66.webp",
    code: "ACY",
  },
  {
    slug: "n66-scy",
    label: "Naylon 6,6 SCY",
    summary: "Tek kaplama PA66 + elastan. Flat seçenekler dahil.",
    href: "/urunlerimiz/n66-scy",
    src: "/images/hero/iplik/scy-n66.webp",
    code: "SCY",
  },
  {
    slug: "n66-dcy",
    label: "Naylon 6,6 DCY",
    summary: "Çift kaplama PA66 + elastan. Custom üretim.",
    href: "/urunlerimiz/n66-dcy",
    src: "/images/hero/iplik/dcy-n66.webp",
    code: "DCY",
  },
  {
    slug: "pes-acy",
    label: "PES ACY",
    summary: "Polyester hava jetli kaplama + elastan.",
    href: "/urunlerimiz/pes-acy",
    src: "/images/hero/iplik/acc-pes.webp",
    code: "ACY",
  },
  {
    slug: "pes-scy",
    label: "PES SCY",
    summary: "Polyester tek kaplama + elastan. Custom seçenekler.",
    href: "/urunlerimiz/pes-scy",
    src: "/images/hero/iplik/scy-pes.webp",
    code: "SCY",
  },
  {
    slug: "pes-dcy",
    label: "PES DCY",
    summary: "Polyester çift kaplama + elastan.",
    href: "/urunlerimiz/pes-dcy",
    src: "/images/hero/iplik/dcy-pes.webp",
    code: "DCY",
  },
].map((item) => ({
  ...item,
  src: item.src ? resolveAsset(item.src) : undefined,
}));

/** Üst şerit: Naylon 6, sonda PES DCY. İlk kart LCP. */
export const yarnImages = products.filter(
  (item) => item.slug.startsWith("n6-") || item.slug === "pes-dcy",
);

/** Alt şerit: Naylon 6,6, sonra PES SCY, en sonda PES ACY. */
const bottomPesOrder = ["pes-scy", "pes-acy"] as const;
export const yarnImagesBottom = [
  ...products.filter((item) => item.slug.startsWith("n66-")),
  ...bottomPesOrder.map((slug) => {
    const item = products.find((entry) => entry.slug === slug);
    if (!item) throw new Error(`marquee kartı yok: ${slug}`);
    return item;
  }),
];

/** Mobil tek şerit: üst sıra, ardından alt sıra. */
export const yarnImagesAll = [...yarnImages, ...yarnImagesBottom];
