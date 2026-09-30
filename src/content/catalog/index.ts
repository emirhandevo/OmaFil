/**
 * Katalog public API — sayfalar ve grid buradan import eder.
 * Veri kaynağı: Keystatic → content/products/*.json
 */
export type {
  CoveredSku,
  FilamentSku,
  Polymer,
  ProcessCode,
  ProductFamily,
  ProductKind,
  ProductLine,
} from "./types";

export {
  getCoveredSkus,
  getFilamentSkus,
  getProductLine,
  getProductLines,
} from "./lines";

export { productFamilies } from "./families";

/** Eski Product tipi uyumu (grid) */
export type { ProductLine as Product } from "./types";
