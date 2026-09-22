/**
 * Geriye uyumluluk — eski `@/content/products` import’ları.
 * Yeni kod: `@/content/catalog`
 */
export {
  getCoveredSkus,
  getFilamentSkus,
  getProductLine,
  getProductLines,
  getProductLinesByFamily,
  productFamilies,
  type CoveredSku,
  type FilamentSku,
  type Product,
  type ProductFamily,
  type ProductLine,
} from "./catalog";
