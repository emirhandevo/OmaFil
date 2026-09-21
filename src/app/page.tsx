import {Hero} from "@/components/sections/hero";
import {CorporateIntro} from "@/components/sections/corporate-intro";
import { BrandStatement} from "@/components/sections/brand-statement";
import {CompanyStats} from "@/components/sections/company-stats";
import {SustainabilitySection} from "@/components/sections/sustainability-section";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <CorporateIntro />
      <CompanyStats />
      <SustainabilitySection />
    </>
  );
}
