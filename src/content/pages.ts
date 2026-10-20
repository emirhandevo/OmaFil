import React from "react";
import Markdoc from "@markdoc/markdoc";
import { reader } from "@/content/keystatic";
import { getInner } from "@/i18n/inner";
import { defaultLocale, type Locale } from "@/i18n/locales";

export type CmsPage = {
  slug: string;
  title: string;
  description: string;
  /** Markdoc render edilmiş React ağacı */
  body: React.ReactNode;
};

function innerForPage(slug: string, locale: Locale) {
  const inner = getInner(locale);
  if (!inner) return null;
  if (slug === "hakkimizda") return inner.about;
  if (slug === "fabrikamiz") return inner.factory;
  if (slug === "surdurulebilirlik") return inner.sustain;
  if (slug === "insan-kaynaklari") return inner.careers;
  return null;
}

function renderBody(markdown: string): React.ReactNode {
  const ast = Markdoc.parse(markdown);
  const errors = Markdoc.validate(ast);
  if (errors.length) {
    console.error(errors);
  }
  const renderable = Markdoc.transform(ast);
  return Markdoc.renderers.react(renderable, React);
}

/**
 * Kurumsal sayfa. Metin copy[dil]; boşsa inner, o da yoksa TR.
 */
export async function getCmsPage(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<CmsPage | null> {
  const page = await reader.collections.pages.read(slug).catch(() => null);
  if (!page) return null;

  const loc = page.copy?.[locale];
  const tr = page.copy?.[defaultLocale];
  const inner = innerForPage(slug, locale);
  const title =
    loc?.title?.trim() || inner?.title || tr?.title?.trim() || page.title;
  const description =
    loc?.description?.trim() ||
    inner?.description ||
    tr?.description?.trim() ||
    "";
  const markdown =
    loc?.body?.trim() ||
    inner?.paragraphs.join("\n\n") ||
    tr?.body?.trim() ||
    "";

  return {
    slug,
    title,
    description,
    body: renderBody(markdown),
  };
}
