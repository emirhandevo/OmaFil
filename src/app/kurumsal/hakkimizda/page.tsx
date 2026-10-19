import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Cog,
  Factory,
  Globe2,
  Layers,
  MapPin,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import { AboutHighlights } from "@/components/sections/about-highlights";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { getContact } from "@/content/cms";
import { getCmsPage } from "@/content/pages";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import { pageAlternates } from "@/i18n/locales";
import { placeLabel } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const [page, { locale }] = await Promise.all([
    getCmsPage("hakkimizda"),
    getCopy(),
  ]);
  const t = getInner(locale);
  return {
    title: t?.about.title ?? page?.title ?? "Hakkımızda",
    description:
      t?.about.description ??
      page?.description ??
      "OMA POLİMER A.Ş. kuruluş hikâyesi. Sultanhamam’dan iplik ithalatı, üretimi ve ihracatına.",
    alternates: pageAlternates("/kurumsal/hakkimizda", locale),
  };
}

const milestones: {
  year: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    year: "1999",
    title: "Kuruluş",
    text: "İstanbul Sultanhamam’da iplik ticaretiyle başladık.",
    icon: Building2,
  },
  {
    year: "2000",
    title: "İhracat Başlangıcı",
    text: "Yurtdışı bağlantılarımızı kurduk.",
    icon: Globe2,
  },
  {
    year: "2013",
    title: "İlk Tesis",
    text: "İlk üretim tesisimizi kurduk.",
    icon: Factory,
  },
  {
    year: "2021",
    title: "Gipe Tesisi",
    text: "Tokat–Erbaa’da gipe iplik tesisini hayata geçirdik.",
    icon: Warehouse,
  },
  {
    year: "2025",
    title: "Tekstüre Tesisi",
    text: "Tekstüre üretim tesisini devreye aldık.",
    icon: Layers,
  },
  {
    year: "2026",
    title: "POY - FDY Tesisi",
    text: "POY ve FDY üretim tesisini kurduk.",
    icon: Cog,
  },
  {
    year: "2026",
    title: "Gipe Tesisi Kapasite Artışı",
    text: "Gipe tesisinde kapasiteyi artırdık.",
    icon: TrendingUp,
  },
];

export default async function HakkimizdaPage() {
  const [page, contact, { locale }] = await Promise.all([
    getCmsPage("hakkimizda"),
    getContact(),
    getCopy(),
  ]);
  // tr: Keystatic metni. Diğer diller: inner sözlük.
  const t = getInner(locale);
  const story = milestones.map((item, i) => ({
    ...item,
    title: t?.about.milestones[i]?.title ?? item.title,
    text: t?.about.milestones[i]?.text ?? item.text,
  }));

  return (
    <CorporateFrame
      path="/kurumsal/hakkimizda"
      title={t?.about.title ?? page?.title ?? "Hakkımızda"}
      description={
        t?.about.description ??
        page?.description ??
        "İplik ticaretinden üretime uzanan yolculuk, sürekli gelişim ilkesiyle devam ediyor."
      }
    >
      <section className="mx-auto max-w-6xl px-4 pb-4">
        {/* Keystatic: Kurumsal sayfalar → hakkimizda */}
        {t ? (
          <div className="prose-omafil text-body max-w-3xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : page?.body ? (
          <div className="prose-omafil text-body max-w-3xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {page.body}
          </div>
        ) : null}

        {/* Büyüme hikâyesi — canlı sitedeki yüzen ikonlu kartlar */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-muted px-4 py-14 shadow-sm sm:px-8 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 size-56 rotate-12 bg-brand-navy/10"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 right-1/4 size-64 bg-brand-navy/8"
            style={{ clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" }}
          />

          <h2 className="relative text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            {t ? t.about.growthBefore : "Büyüme"}{" "}
            <span className="text-brand-orange">
              {t ? t.about.growthAccent : "Hikayemiz"}
            </span>
          </h2>

          <ol className="relative mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {story.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={`${item.year}-${item.title}`}
                  className="relative pt-8 sm:last:col-span-2 sm:last:w-1/2 sm:last:justify-self-center lg:last:col-span-1 lg:last:col-start-2 lg:last:w-auto"
                >
                  <article className="relative flex h-full flex-col items-center rounded-2xl border border-border/80 bg-card px-5 pb-7 pt-12 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="absolute top-0 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy text-white shadow-md ring-4 ring-muted/50 dark:ring-background">
                      <Icon
                        aria-hidden="true"
                        className="size-7"
                        strokeWidth={1.75}
                      />
                    </span>
                    <p className="text-2xl font-bold tracking-tight text-brand-navy dark:text-brand-orange">
                      {item.year}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-body mt-3 text-sm leading-7">
                      {item.text}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <div className="mt-12">
        <AboutHighlights />
      </div>

      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:py-20"
        aria-labelledby="offices-title"
      >
        <h2
          id="offices-title"
          className="text-2xl font-semibold tracking-tight"
        >
          {t?.about.offices ?? "İletişim noktalarımız"}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contact.locations.map((place) => (
            <article
              key={place.label}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-brand-orange active:border-brand-orange"
            >
              <MapPin aria-hidden="true" className="size-5 text-brand-orange" />
              <h3 className="mt-4 font-semibold">
                {placeLabel(place.label, locale)}
              </h3>
              <p className="text-body mt-2 text-sm leading-7">
                {place.address}
              </p>
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-brand-orange hover:underline active:underline"
              >
                {t?.about.map ?? "Haritada aç"}
              </a>
            </article>
          ))}
        </div>
      </section>
    </CorporateFrame>
  );
}
