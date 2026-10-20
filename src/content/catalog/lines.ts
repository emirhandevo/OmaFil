import { reader } from "@/content/keystatic";
import { pickLocale } from "@/content/localized";
import { getInner } from "@/i18n/inner";
import { defaultLocale, type Locale } from "@/i18n/locales";
import type {
  CoveredSku,
  FilamentSku,
  ProductLine,
} from "./types";

type LineEntry = NonNullable<
  Awaited<ReturnType<typeof reader.collections.productLines.read>>
>;

function mapLine(
  slug: string,
  entry: LineEntry,
  locale: Locale = defaultLocale,
): ProductLine {
  const kind = entry.details.discriminant;
  // copy[dil] boşsa TR copy, o da yoksa inner / kök alan
  const text = pickLocale(entry.copy, locale);
  const innerSummary = getInner(locale)?.products[slug];
  return {
    slug,
    label: text?.label?.trim() || entry.label,
    summary: text?.summary?.trim() || innerSummary || entry.summary,
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

/**
 * 22/24/1 gibi üçüncü sayı (ply) gösterilmesin → 22/24.
 * 18D/6F/7F filament seçeneklerine dokunma.
 */
function displayFilamentSpec(spec: string): string {
  const match = spec.match(/^(\d+)\/(\d+)\/\d+$/);
  return match ? `${match[1]}/${match[2]}` : spec;
}

function mapFilamentSkus(slug: string, entry: LineEntry): FilamentSku[] {
  if (entry.details.discriminant !== "filament") return [];
  const rows: FilamentSku[] = [];
  const seen = new Set<string>();
  for (const sku of entry.details.value.skus) {
    const mapped: FilamentSku = {
      line: slug,
      spec: displayFilamentSpec(sku.spec),
      luster: sku.luster.length ? [...sku.luster] : undefined,
      colors: sku.colors.length ? [...sku.colors] : undefined,
      features: sku.features.length ? [...sku.features] : undefined,
      kesit: sku.kesit || "—",
    };
    const key = JSON.stringify(mapped);
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push(mapped);
  }
  return rows;
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
export async function getProductLines(
  locale: Locale = defaultLocale,
): Promise<ProductLine[]> {
  const slugs = await reader.collections.productLines.list().catch(() => [] as string[]);
  const lines: ProductLine[] = [];
  for (const slug of slugs) {
    try {
      const entry = await reader.collections.productLines.read(slug);
      if (entry) lines.push(mapLine(slug, entry, locale));
    } catch (error) {
      console.error("ürün hattı okunamadı", slug, error);
    }
  }
  return lines;
}

export async function getProductLine(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<ProductLine | null> {
  try {
    const entry = await reader.collections.productLines.read(slug);
    if (!entry) return null;
    return mapLine(slug, entry, locale);
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
