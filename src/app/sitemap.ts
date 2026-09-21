import type { MetadataRoute } from "next";
import { corporateLinks, site } from "@/config/site";

// Sadece yayında olan sayfalar. 404 link sitemap’e girmez.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/kurumsal",
    "/urunlerimiz",
    "/iletisim",
    "/blog",
    ...corporateLinks.map((item) => item.href),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
