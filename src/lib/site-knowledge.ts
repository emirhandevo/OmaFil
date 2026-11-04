import { reader } from "@/content/keystatic";
import { getContact } from "@/content/cms";
import {
  getCoveredSkus,
  getFilamentSkus,
  getProductLines,
} from "@/content/catalog/lines";
import { gesErbaaRoof, gesPortfolioTotals, gesSites } from "@/content/ges-sites";
import {
  getAboutBlocks,
  getFactoryBlocks,
  getGesBlocks,
  getHomeStats,
  getSustainBlocks,
} from "@/content/sections";
import { buildCopy } from "@/i18n/build-copy";
import { getInner } from "@/i18n/inner";
import type { Locale } from "@/i18n/locales";
import { contact as siteContact } from "@/config/site";

const pageSlugs = [
  "hakkimizda",
  "fabrikamiz",
  "surdurulebilirlik",
  "insan-kaynaklari",
] as const;

/** Görsel yolu ve boş metin bilgi sayılmaz. */
function isNoise(value: string): boolean {
  const text = value.trim();
  if (text.length < 2) return true;
  return text.startsWith("/") || text.startsWith("http");
}

/** Nesnedeki yazıları düz metne çevirir. Fonksiyon ve görsel alanlarını atlar. */
function flatten(value: unknown): string[] {
  if (value == null || typeof value === "function") return [];
  if (typeof value === "string") {
    return isNoise(value) ? [] : [value.trim()];
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => flatten(item));
  }
  if (typeof value === "object") {
    const lines: string[] = [];
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (/image|video|poster|src|href|url|gallery|photo|icon/i.test(key)) continue;
      const bits = flatten(item);
      if (!bits.length) continue;
      if (typeof item === "string" || typeof item === "number") {
        lines.push(`${key}: ${bits[0]}`);
      } else {
        lines.push(bits.join("\n"));
      }
    }
    return lines;
  }
  return [];
}

/** Kurumsal sayfanın bu dildeki gövdesi. Boş İngilizce alana Türkçe basılmaz. */
async function pageBody(slug: string, locale: Locale): Promise<string> {
  const page = await reader.collections.pages.read(slug).catch(() => null);
  if (!page) return "";
  const loc = page.copy?.[locale];
  const title = loc?.title?.trim() || (locale === "tr" ? page.title : "");
  const body = loc?.body?.trim() || (locale === "tr" ? page.copy?.tr?.body?.trim() || "" : "");
  if (!title && !body) return "";
  return [title, body].filter(Boolean).join("\n");
}

/** Ürün adı, özeti ve tablodaki denye satırları. */
async function productText(locale: Locale): Promise<string> {
  const lines = await getProductLines(locale);
  const blocks: string[] = [];
  for (const line of lines) {
    const bits = [
      `${line.label} (${line.slug})`,
      `aile: ${line.family}`,
      `polimer: ${line.polymer}`,
      `kod: ${line.code}`,
      line.summary,
    ];
    if (line.colors?.length) bits.push(`renkler: ${line.colors.join(", ")}`);
    if (line.recycled) bits.push("recycled seçenek var");
    if (line.kind === "filament") {
      const skus = await getFilamentSkus(line.slug);
      for (const sku of skus) {
        bits.push(
          [
            sku.spec,
            sku.luster?.length ? `parlaklık ${sku.luster.join("/")}` : "",
            sku.colors?.length ? `renk ${sku.colors.join("/")}` : "",
            sku.features?.length ? sku.features.join("/") : "",
            `kesit ${sku.kesit}`,
          ]
            .filter(Boolean)
            .join(" | "),
        );
      }
    } else {
      const skus = await getCoveredSkus(line.slug);
      for (const sku of skus) {
        bits.push(
          [
            sku.productionType,
            `spandex ${sku.spandexDtex}`,
            `iplik ${sku.yarnDtex}`,
            sku.filament ? `filament ${sku.filament}` : "",
            sku.yarnType,
            `kesit ${sku.kesit}`,
          ]
            .filter(Boolean)
            .join(" | "),
        );
      }
    }
    blocks.push(bits.join("\n"));
  }
  return blocks.join("\n\n");
}

/** GES sayfasındaki tesis adları ve kurulu güç. Canlı sayaç yok. */
function gesFacts(): string {
  const sites = gesSites
    .map(
      (site) =>
        `${site.name}, ${site.location}, ${site.kind}, ${site.capacityMwp} MWp, ${site.panelCount} panel`,
    )
    .join("\n");
  const all = gesPortfolioTotals.all;
  return [
    sites,
    `Erbaa çatı toplam ${gesErbaaRoof.capacityMwp} MWp`,
    `Toplam ${all.capacityMwp} MWp, ${all.panels} panel`,
    `Elazığ ${gesPortfolioTotals.elazig.capacityMwp} MWp`,
  ].join("\n");
}

export type SiteFacts = {
  text: string;
  email: string;
  phones: string[];
  locations: { label: string; address: string }[];
};

/**
 * Sohbetin okuyacağı site metni. Yalnız herkese açık sayfalar.
 * Fiyat yok. Boş WhatsApp numarası yok.
 */
export async function siteKnowledge(locale: Locale): Promise<SiteFacts> {
  const copy = buildCopy(locale);
  const [contact, stats, about, factory, sustain, ges, pages, products] =
    await Promise.all([
      getContact(locale),
      getHomeStats(locale),
      getAboutBlocks(locale),
      getFactoryBlocks(locale),
      getSustainBlocks(locale),
      getGesBlocks(locale),
      Promise.all(pageSlugs.map((slug) => pageBody(slug, locale))),
      productText(locale),
    ]);

  const homeStats = stats.length
    ? stats
    : [
        { value: "13.000", unit: copy.stats.perYear, label: copy.stats.production },
        { value: "40.000+", unit: "m²", label: copy.stats.area },
        { value: "300+", unit: copy.stats.happy, label: copy.stats.customers },
        { value: "61+", unit: copy.stats.toCountries, label: copy.stats.exportLabel },
      ];

  const sections = [
    "İletişim",
    `e-posta: ${contact.email}`,
    `telefon: ${contact.phone.join(", ")}`,
    siteContact.fax ? `faks: ${siteContact.fax}` : "",
    ...contact.locations.map((place) => `${place.label}: ${place.address}`),
    "Ana sayfa",
    ...flatten({
      hero: copy.hero,
      brand: copy.brand,
      intro: copy.intro,
      stats: copy.stats,
      numbers: homeStats,
      sustain: copy.sustain,
      products: copy.products,
    }),
    "Kurumsal özet",
    ...flatten({
      about: copy.chrome.aboutSummary,
      factory: copy.chrome.factorySummary,
      sustain: copy.chrome.sustainSummary,
      careers: copy.chrome.careersSummary,
      principles: copy.chrome.principles,
    }),
    "Sayfalar",
    ...pages.filter(Boolean),
    ...flatten(getInner(locale)),
    locale === "tr" ? flatten(about.filled).join("\n") : "",
    ...flatten({
      aboutStats: about.stats,
      focus: about.focus,
      milestones: about.milestones,
      factoryIntro: factory.intro,
      factoryTabs: factory.tabs,
      lab: factory.labBody,
      labMarks: factory.labMarks,
      sustainWhy: sustain.why,
      sustainPrinciples: sustain.principles,
      yarns: sustain.yarns,
      gesParagraphs: ges.paragraphs,
      gesPillars: ges.pillars,
    }),
    "GES",
    gesFacts(),
    "Ürünler",
    products,
  ];

  return {
    text: sections.filter(Boolean).join("\n"),
    email: contact.email,
    phones: contact.phone,
    locations: contact.locations.map((place) => ({
      label: place.label,
      address: place.address,
    })),
  };
}
