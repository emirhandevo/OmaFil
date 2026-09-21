/**
 * Ürünler sayfası — katalog verisi.
 * Görseller hero marquee ile ortak; aile filtresi burada.
 */

export type ProductFamily = "all" | "nylon6" | "nylon66" | "polyester";

export type Product = {
  src: string;
  label: string;
  summary: string;
  family: Exclude<ProductFamily, "all">;
  code: string;
};

export const productFamilies: {
  id: ProductFamily;
  label: string;
}[] = [
  { id: "all", label: "Tümü" },
  { id: "nylon6", label: "Naylon 6" },
  { id: "nylon66", label: "Naylon 66" },
  { id: "polyester", label: "Polyester" },
];

export const products: Product[] = [
  {
    src: "/images/hero/iplik/dcy-pes.webp",
    label: "PES DCY Gipe",
    summary: "Çift kaplama polyester gipe iplik.",
    family: "polyester",
    code: "DCY",
  },
  {
    src: "/images/hero/iplik/poy-n6.webp",
    label: "Naylon 6 POY",
    summary: "Naylon 6 kısmi oryante iplik.",
    family: "nylon6",
    code: "POY",
  },
  {
    src: "/images/hero/iplik/fdy-n6.webp",
    label: "N6 FDY",
    summary: "Naylon 6 tam çekimli iplik.",
    family: "nylon6",
    code: "FDY",
  },
  {
    src: "/images/hero/iplik/dty-n6.webp",
    label: "DTY N6",
    summary: "Naylon 6 tekstüre iplik.",
    family: "nylon6",
    code: "DTY",
  },
  {
    src: "/images/hero/iplik/dty-n66.webp",
    label: "DTY N66",
    summary: "Naylon 66 tekstüre iplik.",
    family: "nylon66",
    code: "DTY",
  },
  {
    src: "/images/hero/iplik/acy-n6.webp",
    label: "ACY N6",
    summary: "Naylon 6 hava jetli kaplama iplik.",
    family: "nylon6",
    code: "ACY",
  },
  {
    src: "/images/hero/iplik/acy-n66.webp",
    label: "ACY N66",
    summary: "Naylon 66 hava jetli kaplama iplik.",
    family: "nylon66",
    code: "ACY",
  },
  {
    src: "/images/hero/iplik/scy-n6.webp",
    label: "SCY N6 Gipe",
    summary: "Naylon 6 tek kaplama gipe iplik.",
    family: "nylon6",
    code: "SCY",
  },
  {
    src: "/images/hero/iplik/scy-n66.webp",
    label: "SCY N66 Gipe",
    summary: "Naylon 66 tek kaplama gipe iplik.",
    family: "nylon66",
    code: "SCY",
  },
  {
    src: "/images/hero/iplik/scy-pes.webp",
    label: "PES SCY Gipe",
    summary: "Polyester tek kaplama gipe iplik.",
    family: "polyester",
    code: "SCY",
  },
  {
    src: "/images/hero/iplik/acc-pes.webp",
    label: "PES ACC",
    summary: "Polyester hava jetli kompozit iplik.",
    family: "polyester",
    code: "ACC",
  },
];
