import { reader } from "@/content/keystatic";
import type {
  CoveredSku,
  FilamentSku,
  ProductFamily,
  ProductLine,
} from "./types";

export type { ProductFamily, ProductLine } from "./types";
export { productFamilies } from "./families";

type LineEntry = NonNullable<
  Awaited<ReturnType<typeof reader.collections.productLines.read>>
>;

function mapLine(slug: string, entry: LineEntry): ProductLine {
  const kind = entry.details.discriminant;
  return {
    slug,
    label: entry.label,
    summary: entry.summary,
    family: entry.family,
    polymer: entry.polymer,
    code: entry.code,
    kind,
    src: entry.imageSrc,
    colors: entry.colors.length ? [...entry.colors] : undefined,
    recycled: entry.recycled || undefined,
    featured: entry.featured || undefined,
  };
}

function mapFilamentSkus(slug: string, entry: LineEntry): FilamentSku[] {
  if (entry.details.discriminant !== "filament") return [];
  return entry.details.value.skus.map((sku) => ({
    line: slug,
    spec: sku.spec,
    lustre: sku.lustre.length ? [...sku.lustre] : undefined,
    colors: sku.colors.length ? [...sku.colors] : undefined,
    features: sku.features.length ? [...sku.features] : undefined,
    finalDty: sku.finalDty || undefined,
    finalAty: sku.finalAty || undefined,
  }));
}

function mapCoveredSkus(slug: string, entry: LineEntry): CoveredSku[] {
  if (entry.details.discriminant !== "covered") return [];
  return entry.details.value.skus.map((sku) => ({
    line: slug,
    productionType: sku.productionType,
    spandexDtex: sku.spandexDtex,
    yarnDtex: sku.yarnDtex,
    filament: sku.filament ?? undefined,
    floor: sku.floor === "2" ? 2 : 1,
    yarnType: sku.yarnType,
  }));
}

/** Tüm ürün hatları (grid + sitemap) */
export async function getProductLines(): Promise<ProductLine[]> {
  const all = await reader.collections.productLines.all();
  return all.map((item) => mapLine(item.slug, item.entry));
}

export async function getProductLine(
  slug: string,
): Promise<ProductLine | null> {
  const entry = await reader.collections.productLines.read(slug);
  if (!entry) return null;
  return mapLine(slug, entry);
}

export async function getProductLinesByFamily(
  family: ProductFamily,
): Promise<ProductLine[]> {
  const lines = await getProductLines();
  if (family === "all") return lines;
  return lines.filter((line) => line.family === family);
}

export async function getFilamentSkus(lineSlug: string): Promise<FilamentSku[]> {
  const entry = await reader.collections.productLines.read(lineSlug);
  if (!entry) return [];
  return mapFilamentSkus(lineSlug, entry);
}

export async function getCoveredSkus(lineSlug: string): Promise<CoveredSku[]> {
  const entry = await reader.collections.productLines.read(lineSlug);
  if (!entry) return [];
  return mapCoveredSkus(lineSlug, entry);
}
