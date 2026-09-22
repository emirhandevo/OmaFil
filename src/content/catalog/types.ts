/**
 * OmaFil ürün kataloğu — tipler.
 * Kaynak: Omafil Product Catalogue + NEW PRODUCT LIST (birleşik).
 */

export type ProductFamily = "all" | "nylon6" | "nylon66" | "polyester";

export type Polymer = "pa6" | "pa66" | "pes" | "pesLatex";

/** Proses / hat kodu */
export type ProcessCode =
  | "POY"
  | "FDY"
  | "DTY"
  | "ATY"
  | "ACY"
  | "SCY"
  | "DCY"
  | "RUBBERCOVER";

export type ProductKind = "filament" | "covered";

/** Grid kartı — ürün hattı (detay sayfasına gider) */
export type ProductLine = {
  slug: string;
  label: string;
  summary: string;
  family: Exclude<ProductFamily, "all">;
  polymer: Polymer;
  code: ProcessCode;
  kind: ProductKind;
  src: string;
  /** NEW PRODUCT LIST renkleri */
  colors?: string[];
  recycled?: boolean;
  /** Yeni portföyde öne çıkan */
  featured?: boolean;
};

/** Filament satırı (POY / FDY / DTY / ATY) */
export type FilamentSku = {
  line: string;
  /** Örn. 44/12 veya 44D/12F */
  spec: string;
  lustre?: string[];
  colors?: string[];
  /** Softel, Nicolite, kullanım alanları vb. */
  features?: string[];
  /** N66 POY → final DTY / ATY */
  finalDty?: string;
  finalAty?: string;
};

/** Kaplama / gipe satırı (ACY / SCY / DCY / Rubbercover) */
export type CoveredSku = {
  line: string;
  /** Katalogdaki üretim tipi: ACY, SC, DC, RUBBERCOVER */
  productionType: string;
  spandexDtex: number;
  yarnDtex: number;
  filament?: number;
  floor: 1 | 2;
  yarnType: string;
};
