/**
 * Hero şeritleri — tek kaynak.
 * label: kart altında görünen ürün/alan adı.
 * yarnTestSrc:
 *   null   → her kart kendi görseli
 *   string → tüm üst şerit bu görseli gösterir (test modu)
 */

export type MarqueeItem = {
  src: string;
  label: string;
};

// Test modu: okeylendi mi? → null yap, her kart kendi görselini alır.
export const yarnTestSrc: string | null = null;

export const yarnImages: MarqueeItem[] = [
  { src: "/images/hero/iplik/pes-dcy.png", label: "PES DCY Gipe" },
  { src: "/images/hero/iplik/poy-n6.png", label: "Naylon 6 POY" },
  { src: "/images/hero/iplik/scy-n6-gipe.png", label: "SCY N6 Gipe" },
  { src: "/images/hero/iplik/scy-n66-gipe.png", label: "SCY N66 Gipe" },
  { src: "/images/hero/iplik/n6-fdy.png", label: "N6 FDY" },
  { src: "/images/hero/iplik/dty-n66.png", label: "DTY N66" },
  { src: "/images/hero/iplik/scy-pes-gipe.png", label: "PES SCY Gipe" },
  { src: "/images/hero/iplik/acy-n6.png", label: "ACY N6" },
  { src: "/images/hero/iplik/ac-pes.png", label: "PES ACC" },
  { src: "/images/hero/iplik/acy-n66.png", label: "ACY N66" },
];

export const plantImages: MarqueeItem[] = [
  { src: "/images/hero/tesis/01.webp", label: "Üretim Tesisi Giriş" },
  { src: "/images/hero/tesis/02.webp", label: "Fabrika Kuş Bakışı" },
  { src: "/images/hero/tesis/03.webp", label: "Chips Makineleri" },
  { src: "/images/hero/tesis/04.webp", label: "Kalite Kontrol" },
  { src: "/images/hero/tesis/05.webp", label: "Fabrika / İç Kısım" },
  { src: "/images/hero/tesis/06.webp", label: "Fabrika / İç Kısım" },
  { src: "/images/hero/tesis/07.webp", label: "Sarma Ünitesi" },
  { src: "/images/hero/tesis/08.webp", label: "Depo & Lojistik" },
];