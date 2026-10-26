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
import { getAboutBlocks } from "@/content/sections";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import { pageAlternates } from "@/i18n/locales";
import { placeLabel } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const page = await getCmsPage("hakkimizda", locale);
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
  const { locale } = await getCopy();
  const [page, contact, cms] = await Promise.all([
    getCmsPage("hakkimizda", locale),
    getContact(locale),
    getAboutBlocks(locale),
  ]);
  // tr: Keystatic. Diğer diller: CMS doluysa o, değilse inner.
  const t = getInner(locale);
  const f = cms.filled;
  const story = milestones.map((item, i) => ({
    ...item,
    year: cms.milestones[i]?.year || item.year,
    title: cms.milestones[i]?.title || t?.about.milestones[i]?.title || item.title,
    text: cms.milestones[i]?.text || t?.about.milestones[i]?.text || item.text,
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

        {/* Büyüme hikâyesi — lab videosundaki gibi kesilen halkalar + cam kartlar */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-muted px-4 py-14 shadow-sm sm:px-8 sm:py-16">
          {/* overflow-hidden kenarı yayı keser; köşede kavis kalır. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -start-20 aspect-square w-80 rounded-full border border-brand-orange/45 shadow-[0_0_28px_rgba(241,144,0,0.2)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -start-4 size-36 rounded-full bg-brand-orange/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -end-14 aspect-square w-72 rounded-full border border-brand-orange/45 shadow-[0_0_28px_rgba(241,144,0,0.2)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -end-4 size-32 rounded-full bg-brand-orange/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[38%] left-[6%] aspect-square w-64 rounded-full border border-brand-orange/40 shadow-[0_0_28px_rgba(241,144,0,0.16)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[8%] aspect-square w-56 -translate-y-1/2 rounded-full border border-brand-orange/35 shadow-[0_0_28px_rgba(241,144,0,0.15)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1/4 left-1/3 size-44 rounded-full bg-brand-navy/14 blur-3xl dark:bg-brand-orange/14"
          />

          <h2 className="relative z-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            {f.growthBefore || t?.about.growthBefore || "Büyüme"}{" "}
            <span className="text-brand-orange">
              {f.growthAccent || t?.about.growthAccent || "Hikayemiz"}
            </span>
          </h2>

          <ol className="relative z-10 mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {story.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={`${item.year}-${item.title}`}
                  className="relative pt-8 lg:last:col-start-2"
                >
                  {/* Cam sadece kartta. Daha opak = muted zeminle kontrast. */}
                  <article className="relative flex h-full min-h-[13.5rem] flex-col items-center rounded-2xl border border-white/80 bg-background/85 px-5 pb-7 pt-12 text-center shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:border-brand-orange/45 hover:shadow-md dark:border-white/15 dark:bg-card/75">
                    <span className="absolute top-0 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy text-white shadow-md ring-4 ring-background/90 dark:ring-card/80">
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
          {f.offices || t?.about.offices || "İletişim noktalarımız"}
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
                {f.map || t?.about.map || "Haritada aç"}
              </a>
            </article>
          ))}
        </div>
      </section>
    </CorporateFrame>
  );
}
