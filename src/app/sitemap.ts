import type { MetadataRoute } from "next";
import { getProductLines } from "@/content/catalog";
import { corporateLinks, site } from "@/config/site";

// Sadece yayında olan sayfalar. 404 link sitemap’e girmez.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productLines = await getProductLines();
  const paths = [
    "/",
    "/kurumsal",
    "/urunlerimiz",
    ...productLines.map((line) => `/urunlerimiz/${line.slug}`),
    "/ges",
    "/iletisim",
    "/blog",
    ...corporateLinks.map((item) => item.href),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
