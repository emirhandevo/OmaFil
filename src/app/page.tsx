import type { Metadata } from "next";
import {Hero} from "@/components/sections/hero";
import { HeroMarquee } from "@/components/sections/hero-marquee";
import {CorporateIntro} from "@/components/sections/corporate-intro";
import { BrandStatement} from "@/components/sections/brand-statement";
import {CompanyStats} from "@/components/sections/company-stats";
import {SustainabilitySection} from "@/components/sections/sustainability-section";
import { getLocale } from "@/i18n/get-locale";
import { pageAlternates } from "@/i18n/locales";

/** Başlık ve açıklama layout’ta kalır. Burada yalnız 11 dilin ana sayfa adresi. */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    alternates: pageAlternates("/", locale),
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      {/* Şerit başlığın altında. İlk ekranın dışında kaldığı için görseller lazy iner. */}
      <HeroMarquee />
      <CorporateIntro />
      <CompanyStats />
      <SustainabilitySection />
    </>
  );
}
