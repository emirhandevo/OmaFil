import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Leaf, Sun, TreePine } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { buttonVariants } from "@/components/ui/button";
import { GesImpactStats } from "@/components/sections/ges-impact-stats";
import { GesSitesSection } from "@/components/sections/ges-sites-section";
import {
  gesGallery,
  gesIntro,
  gesPillars,
  gesRespectBlock,
} from "@/content/ges";
import { gesPortfolioTotals } from "@/content/ges-sites";
import { site } from "@/config/site";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import { htmlLang, pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const seo = getUi(locale).seo;
  return {
    title: seo.gesTitle,
    description: seo.ges,
    alternates: pageAlternates("/ges", locale),
  };
}

const pillarIcons = [Sun, TreePine, Leaf] as const;

export default async function GesPage() {
  const { locale } = await getCopy();
  const t = getInner(locale);
  const num = htmlLang(locale);
  const fmt = (value: number) => value.toLocaleString(num);
  const paragraphs = t?.ges.paragraphs ?? gesIntro.paragraphs;
  const pillars = gesPillars.map((item, i) => ({
    title: t?.ges.pillars[i]?.title ?? item.title,
    text: t?.ges.pillars[i]?.text ?? item.text,
  }));

  return (
    <>
      <section className="relative isolate min-h-[52vh] overflow-hidden sm:min-h-[60vh]">
        <Image
          src="/images/ges/elazig-hacisam/01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/92 via-brand-navy/75 to-brand-navy/40" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 py-16 sm:min-h-[60vh] sm:py-20">
          <p className="text-xs font-bold tracking-[0.22em] text-[#f19000] uppercase">
            {t?.ges.kicker ?? "Güneş enerji sistemi"}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t?.ges.title ?? gesIntro.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            {t?.ges.subtitle ?? gesIntro.subtitle}
          </p>
          <p className="mt-4 text-sm font-medium text-white/75">
            {t?.ges.total ?? "Toplam"} {fmt(gesPortfolioTotals.all.capacityMwp)}{" "}
            MWp · {fmt(gesPortfolioTotals.all.panels)}{" "}
            {t?.ges.panels ?? "panel"}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="text-body space-y-5 text-base leading-8">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-sm font-semibold tracking-wide text-brand-navy uppercase dark:text-brand-orange">
            {site.legalName}
          </p>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border shadow-sm sm:min-h-[380px]">
          <Image
            src="/images/ges/erbaa-cati-1/01.jpg"
            alt={t?.ges.imageAlt ?? "OmaFil Erbaa çatı GES — Oma Polimer tesisi"}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={82}
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t?.ges.respectTitle ?? gesRespectBlock.title}
          </h2>
          <p className="text-body mt-5 max-w-3xl text-base leading-8">
            {t?.ges.respectText ?? gesRespectBlock.text}
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((item, i) => {
              const Icon = pillarIcons[i] ?? Sun;
              return (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-brand-navy dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-body mt-3 text-sm leading-7">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <GesImpactStats />

      <GesSitesSection />

      <section
        className="border-t border-border bg-muted/40 py-14 sm:py-16"
        aria-labelledby="ges-gallery-title"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="ges-gallery-title"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {t?.ges.galleryTitle ?? "Galeri"}
          </h2>
          <p className="text-body mt-3 max-w-2xl text-base leading-8">
            {t?.ges.galleryLead ?? "Hacısam, Kavak ve Erbaa çatı GES görselleri."}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gesGallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  quality={80}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-brand-navy py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t?.ges.ctaTitle ?? "Sürdürülebilir üretim yaklaşımımız"}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-8 text-white/85">
              {t?.ges.ctaText ??
                "GES yatırımlarımız; recycle iplik ve sorumlu üretim anlayışımızın parçasıdır."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LocaleLink
              href="/kurumsal/surdurulebilirlik"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "bg-brand-orange hover:bg-brand-orange/90",
              })}
            >
              {t?.ges.sustainCta ?? "Sürdürülebilirlik"}
              <ArrowRight aria-hidden="true" />
            </LocaleLink>
            <LocaleLink
              href="/iletisim"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
              })}
            >
              {t?.ges.contactCta ?? "İletişim"}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
