import { reader } from "@/content/keystatic";
import type {
  CoveredSku,
  FilamentSku,
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
    // Boş string = görsel yok (başka üründen kopya kullanma)
    // ?v=3: aynı dosya adı tarayıcıda eski görseli tutmasın.
    src: entry.imageSrc?.trim()
      ? `${entry.imageSrc.trim()}?v=4`
      : undefined,
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
    luster: sku.luster.length ? [...sku.luster] : undefined,
    colors: sku.colors.length ? [...sku.colors] : undefined,
    features: sku.features.length ? [...sku.features] : undefined,
    kesit: sku.kesit || "—",
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
    yarnType: sku.yarnType,
    kesit: sku.kesit || "—",
  }));
}

/** Tüm ürün hatları (grid + sitemap) */
export async function getProductLines(): Promise<ProductLine[]> {
  const slugs = await reader.collections.productLines.list();
  const lines: ProductLine[] = [];
  for (const slug of slugs) {
    try {
      const entry = await reader.collections.productLines.read(slug);
      if (entry) lines.push(mapLine(slug, entry));
    } catch (error) {
      console.error("ürün hattı okunamadı", slug, error);
    }
  }
  return lines;
}

export async function getProductLine(
  slug: string,
): Promise<ProductLine | null> {
  try {
    const entry = await reader.collections.productLines.read(slug);
    if (!entry) return null;
    return mapLine(slug, entry);
  } catch (error) {
    console.error("ürün hattı okunamadı", slug, error);
    return null;
  }
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
