import { Header } from "@/components/ui/layout/header";
import {Footer} from "@/components/ui/layout/footer";
import {Hero} from "@/components/sections/hero";
import {CorporateIntro} from "@/components/sections/corporate-intro";
import { BrandStatement} from "@/components/sections/brand-statement";
import {CompanyStats} from "@/components/sections/company-stats";
import {SustainabilitySection} from "@/components/sections/sustainability-section.tsx";

export default function Home() {
  return (
    <>
    <Header />

    <main>
    <Hero />
    <BrandStatement />
    <CorporateIntro/>
    </main>
    <CompanyStats />
    <SustainabilitySection />

    <Footer />
    

    </>
  );
}


