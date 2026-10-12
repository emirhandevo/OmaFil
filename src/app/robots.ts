import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Arama motoruna hangi adreslerin açık olduğunu söyler.
 * Sitemap satırı /sitemap.xml dosyasını işaret eder.
 * Panel ve API taranmasın. Bu bir kilit değildir, yalnızca ricadır.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic", "/api/", "/panel-giris", "/sohbet-kayitlari"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
