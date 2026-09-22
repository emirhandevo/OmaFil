import React from "react";
import Markdoc from "@markdoc/markdoc";
import { reader } from "@/content/keystatic";

export type CmsPage = {
  slug: string;
  title: string;
  description: string;
  /** Markdoc render edilmiş React ağacı */
  body: React.ReactNode;
};

/**
 * Kurumsal sayfa (content/pages/*.mdoc)
 * slug örn: hakkimizda, fabrikamiz
 */
export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  const page = await reader.collections.pages.read(slug);
  if (!page) return null;

  const { node } = await page.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error(`Sayfa içeriği geçersiz: ${slug}`);
  }
  const renderable = Markdoc.transform(node);

  return {
    slug,
    title: page.title,
    description: page.description,
    body: Markdoc.renderers.react(renderable, React),
  };
}
