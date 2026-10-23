import { cache } from "react";
import { reader } from "@/content/keystatic";
import { overlayStrings, pickFilled } from "@/content/localized";
import type { Copy } from "@/i18n/build-copy";
import type { Locale } from "@/i18n/locales";

type Pair = { title: string; text: string };
type StatItem = { value: string; unit: string; label: string };
type Highlight = { title: string; subtitle: string };
type Milestone = { year: string; title: string; text: string };
type Mark = { title: string; text: string };
type Photo = { src: string; alt: string };

const factoryGalleryFallback: Photo[] = [
  {
    src: "/images/factory/gallery/01-solar.webp",
    alt: "OmaFil tesisi — güneş panelli havadan görünüm",
  },
  {
    src: "/images/factory/gallery/02.webp",
    alt: "OmaFil fabrika girişi",
  },
  {
    src: "/images/factory/gallery/03.webp",
    alt: "OmaFil üretim tesisi",
  },
  {
    src: "/images/factory/gallery/04.webp",
    alt: "OmaFil fabrika cephesi",
  },
];

const factoryBandOrder = [
  "06", "07", "08", "09", "10", "11", "12", "13",
  "03",
  "15", "16", "17", "18", "19", "20",
  "01",
  "22", "23",
  "02",
  "04",
  "26", "27", "28",
] as const;

const factoryBandFallback: Photo[] = factoryBandOrder.map((file, index) => ({
  src: `/images/factory/band/${file}.webp`,
  alt: `OmaFil üretim bandı ${String(index + 1).padStart(2, "0")}`,
}));

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function mapPhotos(
  rows: readonly { src?: string; alt?: string }[] | undefined,
  fallback: Photo[],
): Photo[] {
  if (!rows?.length) return fallback;
  const photos = rows
    .map((row, index) => ({
      src: asText(row.src),
      alt: asText(row.alt) || fallback[index]?.alt || "",
    }))
    .filter((photo) => photo.src);
  return photos.length ? photos : fallback;
}

function asCopy(
  value: unknown,
): Parameters<typeof pickFilled>[0] | undefined {
  return value as Parameters<typeof pickFilled>[0] | undefined;
}

function filledPairs(items: Pair[] | undefined): Pair[] {
  if (!items?.length) return [];
  return items
    .map((item) => ({
      title: item.title?.trim() ?? "",
      text: item.text?.trim() ?? "",
    }))
    .filter((item) => item.title || item.text);
}

function splitParagraphs(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Dictionary + chrome üzerine Keystatic section metinleri. */
export const overlayCopyFromCms = cache(async function overlayCopyFromCms(
  copy: Copy,
  locale: Locale,
): Promise<Copy> {
  const [home, hubs, contact, careers] = await Promise.all([
    reader.singletons.home.read().catch(() => null),
    reader.singletons.hubs.read().catch(() => null),
    reader.singletons.contact.read().catch(() => null),
    reader.singletons.careersSections.read().catch(() => null),
  ]);

  const h = pickFilled(asCopy(home?.copy), locale);
  const u = pickFilled(asCopy(hubs?.copy), locale);
  const c = pickFilled(asCopy(contact?.pageCopy), locale);
  const k = pickFilled(asCopy(careers?.copy), locale);

  const careerRow = careers?.copy?.[locale];
  const principles = (careerRow?.principles ?? [])
    .map((item: string) => item.trim())
    .filter(Boolean);

  return {
    ...copy,
    brand: overlayStrings(copy.brand, {
      titleBefore: h.brandTitleBefore,
      titleAccent: h.brandTitleAccent,
    }),
    intro: overlayStrings(copy.intro, {
      kicker: h.introKicker,
      title: h.introTitle,
      p1: h.introP1,
      p2: h.introP2,
      cta: h.introCta,
    }),
    stats: overlayStrings(copy.stats, {
      kicker: h.statsKicker,
      title: h.statsTitle,
      lead: h.statsLead,
    }),
    sustain: overlayStrings(copy.sustain, {
      kicker: h.sustainKicker,
      title: h.sustainTitle,
      lead: h.sustainLead,
      energyTitle: h.energyTitle,
      energyText: h.energyText,
      productionTitle: h.productionTitle,
      productionText: h.productionText,
      cta: h.sustainCta,
      plant: h.plant,
      plantText: h.plantText,
      techKicker: h.techKicker,
      techTitle: h.techTitle,
      recycleTitle: h.recycleTitle,
      recycleText: h.recycleText,
      biobased: h.biobased,
      biobasedText: h.biobasedText,
      dopeDyed: h.dopeDyed,
      waterlessText: h.waterlessText,
    }),
    products: overlayStrings(copy.products, {
      kicker: u.productsKicker,
      title: u.productsTitle,
      lead: u.productsLead,
      all: u.productsAll,
      soon: u.productsSoon,
      quote: u.productsQuote,
      quoteLine: u.productsQuoteLine,
    }),
    blog: overlayStrings(copy.blog, {
      title: u.blogTitle,
      lead: u.blogLead,
      empty: u.blogEmpty,
    }),
    corporate: overlayStrings(copy.corporate, {
      kicker: u.corporateKicker,
      nav: u.corporateNav,
      hubTitle: u.corporateHubTitle,
      hubLead: u.corporateHubLead,
    }),
    contact: overlayStrings(copy.contact, c),
    chrome: {
      ...copy.chrome,
      ...overlayStrings(
        {
          introAlt: copy.chrome.introAlt,
          sustainAlt: copy.chrome.sustainAlt,
          aboutSummary: copy.chrome.aboutSummary,
          factorySummary: copy.chrome.factorySummary,
          sustainSummary: copy.chrome.sustainSummary,
          careersSummary: copy.chrome.careersSummary,
          view: copy.chrome.view,
          applyTitle: copy.chrome.applyTitle,
          applyLead: copy.chrome.applyLead,
        },
        {
          introAlt: h.introAlt,
          sustainAlt: h.sustainAlt,
          aboutSummary: u.aboutSummary,
          factorySummary: u.factorySummary,
          sustainSummary: u.sustainSummary,
          careersSummary: u.careersSummary,
          view: u.view,
          applyTitle: k.applyTitle,
          applyLead: k.applyLead,
        },
      ),
      principles:
        principles.length === 4
          ? (principles as Copy["chrome"]["principles"])
          : copy.chrome.principles,
    },
  };
});

export const getHomeMedia = cache(async function getHomeMedia() {
  const data = await reader.singletons.home.read().catch(() => null);
  return {
    introImage:
      data?.introImage?.trim() || "/images/corporate/factory.webp",
    sustainImage:
      data?.sustainImage?.trim() || "/images/ges/erbaa-cati-1/aerial.webp",
  };
});

export const getBrandKicker = cache(async function getBrandKicker(
  locale: Locale,
) {
  const data = await reader.singletons.home.read().catch(() => null);
  return pickFilled(asCopy(data?.copy), locale).brandKicker?.trim() || "OmaFil";
});

export const getHomeStats = cache(async function getHomeStats(
  locale: Locale,
): Promise<StatItem[]> {
  const data = await reader.singletons.home.read().catch(() => null);
  const items = (data?.copy?.[locale]?.statsItems ?? []) as StatItem[];
  return items
    .map((item: StatItem) => ({
      value: asText(item.value),
      unit: asText(item.unit),
      label: asText(item.label),
    }))
    .filter((item) => item.value || item.label);
});

export const getAboutBlocks = cache(async function getAboutBlocks(
  locale: Locale,
) {
  const data = await reader.singletons.aboutSections.read().catch(() => null);
  const row = data?.copy?.[locale];
  const filled = pickFilled(asCopy(data?.copy), locale);
  const stats = ((row?.stats ?? []) as Highlight[])
    .map((item) => ({
      title: item.title?.trim() ?? "",
      subtitle: item.subtitle?.trim() ?? "",
    }))
    .filter((item) => item.title || item.subtitle);
  const focus = (row?.focus ?? []).map((item: string) => item.trim()).filter(Boolean);
  const milestones = ((row?.milestones ?? []) as Milestone[])
    .map((item) => ({
      year: item.year?.trim() ?? "",
      title: item.title?.trim() ?? "",
      text: item.text?.trim() ?? "",
    }))
    .filter((item) => item.year || item.title);
  return { filled, stats, focus, milestones };
});

export const getFactoryBlocks = cache(async function getFactoryBlocks(
  locale: Locale,
) {
  const data = await reader.singletons.factorySections.read().catch(() => null);
  const row = data?.copy?.[locale];
  const filled = pickFilled(asCopy(data?.copy), locale);
  return {
    filled,
    intro: splitParagraphs(row?.intro),
    tabs: filledPairs(row?.tabs as Pair[] | undefined).map((item) => ({
      label: item.title,
      body: item.text,
    })),
    labBody: splitParagraphs(row?.labBody),
    labMarks: ((row?.labMarks ?? []) as Mark[])
      .map((item) => ({
        title: item.title?.trim() ?? "",
        text: item.text?.trim() ?? "",
      }))
      .filter((item) => item.title || item.text),
    listCardImage:
      data?.listCardImage?.trim() || "/images/factory/band/14.webp",
    labVideo: data?.labVideo?.trim() || "/videos/omafil-tanitim.mp4",
    labPoster: data?.labPoster?.trim() || "/images/factory/fab-lab-poster.webp",
    labDuration: data?.labDuration?.trim() || "00:31",
    gallery: mapPhotos(data?.gallery, factoryGalleryFallback),
    band: mapPhotos(data?.band, factoryBandFallback),
  };
});

export const getSustainBlocks = cache(async function getSustainBlocks(
  locale: Locale,
) {
  const data = await reader.singletons.sustainSections.read().catch(() => null);
  const row = data?.copy?.[locale];
  const filled = pickFilled(asCopy(data?.copy), locale);
  return {
    filled,
    worldImage: data?.worldImage?.trim() || "/images/sustainability/dunya.webp",
    plantImage:
      data?.plantImage?.trim() || "/images/ges/erbaa-cati-1/aerial.webp",
    why: (row?.why ?? []).map((item: string) => item.trim()).filter(Boolean),
    principles: filledPairs(row?.principles as Pair[] | undefined),
    yarns: filledPairs(row?.yarns as Pair[] | undefined),
    gesP: splitParagraphs(row?.gesP),
    gesItems: filledPairs(row?.gesItems as Pair[] | undefined),
  };
});

export const getGesBlocks = cache(async function getGesBlocks(locale: Locale) {
  const data = await reader.singletons.gesPage.read().catch(() => null);
  const row = data?.copy?.[locale];
  const filled = pickFilled(asCopy(data?.copy), locale);
  return {
    filled,
    heroImage: data?.heroImage?.trim() || "/images/ges/ges-hero.webp",
    bodyImage:
      data?.bodyImage?.trim() || "/images/ges/erbaa-cati-1/aerial.webp",
    paragraphs: splitParagraphs(row?.paragraphs),
    pillars: filledPairs(row?.pillars as Pair[] | undefined),
  };
});
