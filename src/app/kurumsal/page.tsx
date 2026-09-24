import type { Metadata } from "next";
import {
  Building2,
  Factory,
  Leaf,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { corporateLinks } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { getCopy } from "@/i18n/get-copy";
import { navLabel } from "@/i18n/labels";
import { pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const seo = getUi(locale).seo;
  return {
    title: seo.corporateTitle,
    description: seo.corporate,
    alternates: pageAlternates("/kurumsal", locale),
  };
}

const iconsByHref: Record<string, LucideIcon> = {
  "/kurumsal/hakkimizda": Building2,
  "/kurumsal/fabrikamiz": Factory,
  "/kurumsal/surdurulebilirlik": Leaf,
  "/kurumsal/insan-kaynaklari": Users,
};

export default async function KurumsalPage() {
  const { copy } = await getCopy();
  const summaries: Record<string, string> = {
    "/kurumsal/hakkimizda": copy.chrome.aboutSummary,
    "/kurumsal/fabrikamiz": copy.chrome.factorySummary,
    "/kurumsal/surdurulebilirlik": copy.chrome.sustainSummary,
    "/kurumsal/insan-kaynaklari": copy.chrome.careersSummary,
  };

  return (
    <CorporateFrame
      path="/kurumsal"
      title={copy.corporate.hubTitle}
      description={copy.corporate.hubLead}
    >
      <section className="mx-auto grid max-w-6xl gap-x-5 gap-y-12 px-4 pb-20 pt-4 sm:grid-cols-2">
        {corporateLinks.map((item) => {
          const Icon = iconsByHref[item.href] ?? Building2;
          return (
            <LocaleLink
              key={item.href}
              href={item.href}
              className="group relative pt-8"
            >
              <article className="relative flex h-full flex-col items-center rounded-2xl border border-border/80 bg-card px-6 pb-8 pt-12 text-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-orange group-hover:shadow-md">
                <span className="absolute top-0 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy text-white shadow-md ring-4 ring-background transition-transform group-hover:scale-105">
                  <Icon aria-hidden="true" className="size-7" strokeWidth={1.75} />
                </span>
                <h2 className="text-xl font-semibold tracking-tight">
                  {navLabel(item.href, copy)}
                </h2>
                <p className="text-body mt-3 text-sm leading-7">
                  {summaries[item.href]}
                </p>
                <span className="mt-5 text-sm font-medium text-brand-orange">
                  {copy.chrome.view} →
                </span>
              </article>
            </LocaleLink>
          );
        })}
      </section>
    </CorporateFrame>
  );
}
