/**
 * Hero şeritleri — tek kaynak.
 * label: beyaz panelde duran ürün adı.
 * summary: hover/focus’ta açılan kısa bilgi.
 * href: kartın ve "Detaylı Bilgi"nin gittiği sayfa.
 * yarnTestSrc:
 *   null   → her kart kendi görseli
 *   string → tüm üst şerit bu görseli gösterir (test modu)
 */

export type MarqueeItem = {
  src: string;
  label: string;
  /** Üst şeritte zorunlu, tesis şeridinde yok */
  summary?: string;
  href?: string;
};

export const yarnTestSrc: string | null = null;

// export const plantImages: MarqueeItem[] = [
//   { src: "/images/hero/tesis/denye1.png", label: "Üretim Tesisi Giriş" },
//   { src: "/images/hero/tesis/iplik-bukum-chz.png", label: "Fabrika Kuş Bakışı" },
//   { src: "/images/hero/tesis/03.webp", label: "Chips Makineleri" },
//   { src: "/images/hero/tesis/04.webp", label: "Kalite Kontrol" },
//   { src: "/images/hero/tesis/05.webp", label: "Fabrika / İç Kısım" },
//   { src: "/images/hero/tesis/06.webp", label: "Fabrika / İç Kısım" },
//   { src: "/images/hero/tesis/07.webp", label: "Sarma Ünitesi" },
//   { src: "/images/hero/tesis/08.webp", label: "Depo & Lojistik" },
// ];
export const plantImages: MarqueeItem[] = [
  { src: "/images/hero/lab/denye.webp", label: "" },
  { src: "/images/hero/lab/duzgun.webp", label: "" },
  { src: "/images/hero/lab/iplik-bkm.webp", label: "" },
  { src: "/images/hero/lab/mukavvemet.webp", label: "" },
  { src: "/images/hero/lab/numune.webp", label: "" },
  { src: "/images/hero/lab/orgu-boya.webp", label: "" },
  { src: "/images/hero/lab/viskozite.webp", label: "" },
  { src: "/images/hero/lab/yag-test.webp", label: "" },
];

export const yarnImages: MarqueeItem[] = [
  {
    src: "/images/hero/iplik/dcy-pes.webp",
    label: "PES DCY Gipe",
    summary: "Çift kaplama polyester gipe iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/poy-n6.webp",
    label: "Naylon 6 POY",
    summary: "Naylon 6 kısmi oryante iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/fdy-n6.webp",
    label: "N6 FDY",
    summary: "Naylon 6 tam çekimli iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/dty-n6.webp",
    label: "DTY N6",
    summary: "Naylon 6 tekstüre iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/dty-n66.webp",
    label: "DTY N66",
    summary: "Naylon 66 tekstüre iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/acy-n6.webp",
    label: "ACY N6",
    summary: "Naylon 6 hava jetli kaplama iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/acy-n66.webp",
    label: "ACY N66",
    summary: "Naylon 66 hava jetli kaplama iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/scy-n6.webp",
    label: "SCY N6 Gipe",
    summary: "Naylon 6 tek kaplama gipe iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/scy-n66.webp",
    label: "SCY N66 Gipe",
    summary: "Naylon 66 tek kaplama gipe iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/scy-pes.webp",
    label: "PES SCY Gipe",
    summary: "Polyester tek kaplama gipe iplik.",
    href: "/urunlerimiz",
  },
  {
    src: "/images/hero/iplik/acc-pes.webp",
    label: "PES ACC",
    summary: "Polyester hava jetli kompozit iplik.",
    href: "/urunlerimiz",
  },
];

