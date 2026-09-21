import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { FactoryMissionTabs } from "@/components/sections/factory-mission-tabs";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { contact, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Fabrikamız",
  description:
    "OmaFil gipe iplik üretim tesisi Tokat Erbaa’da. Avrupa’nın en büyük polimer / gipe üretim tesisi.",
  alternates: { canonical: "/kurumsal/fabrikamiz" },
};

/** Üretim hattında çıkan ürün grupları (canlı site listesi) */
const productLines = [
  "PA6 POY",
  "PA6 FDY",
  "PA6 DTY",
  "PA6 AIR COVERED YARNS",
  "PA6 SINGLE COVERED YARNS",
  "PA6 DOUBLE COVERED YARNS",
  "PA66 DTY",
  "PA66 AIR COVERED YARNS",
  "PA66 SINGLE COVERED YARNS",
  "PA66 DOUBLE COVERED YARNS",
  "PES AIR COVERED YARNS",
  "PES SINGLE COVERED YARNS",
  "PES DOUBLE COVERED YARNS",
] as const;

/**
 * Fabrika galerisi — 01 güneş panelli havadan çekim;
 * 02–04 canlı siteden giriş / tesis fotoları.
 */
const factoryGallery = [
  {
    src: "/images/factory/gallery/01-solar.webp",
    alt: "OmaFil tesisi — güneş panelli havadan görünüm",
  },
  {
    src: "/images/factory/gallery/02.webp",
    alt: "OmaFil fabrika girişi",
  },
  {
    src: "/images/factory/gallery/03.webp",
    alt: "OmaFil üretim tesisi",
  },
  {
    src: "/images/factory/gallery/04.webp",
    alt: "OmaFil fabrika cephesi",
  },
] as const;

/** Üretim bandı — canlı siteden optimize WebP (01–24) */
const productionBandGallery = Array.from({ length: 24 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/factory/band/${n}.webp`,
    alt: `OmaFil üretim bandı ${n}`,
  };
});

export default function FabrikamizPage() {
  const plant = contact.locations.find((place) =>
    place.label.startsWith("Fabrika /"),
  );

  return (
    <CorporateFrame
      path="/kurumsal/fabrikamiz"
      title="Fabrikamız"
      description="Avrupa’nın en büyük polimer / gipe iplik üretim tesisi Tokat–Erbaa’da."
    >
      {/* Giriş: metin + ürün listesi kartı */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-brand-navy dark:text-foreground sm:text-3xl">
          Avrupa’nın En Büyük Polimer Üretim Tesisi Tokat Erbaa’da Açıldı
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="text-body space-y-4 text-base leading-8">
              <p>
                Yıllık 5 bin tona yakın rekor üretimle yaklaşık 10 milyon
                dolarlık bir ihracatı ekonomimize kazandıracak olan projemiz,
                bu yetkinliğiyle Avrupa’nın en büyüğü olma özelliğini taşıyor.
              </p>
              <p>
                Projemiz ilk etabı 15.000 m² kapalı olmak üzere; tam kapasiteye
                ulaşmasıyla birlikte toplam 50.000 m² kapalı alana
                ulaşacaktır. Büyük bir Ar-Ge merkezini de içerisinde
                barındıracak olan tesisimiz, Tokat Erbaa Organize Sanayi
                Bölgesi’nde ilk etapta 400 kişiye, ilerleyen dönemde ise 1.000
                kişiye istihdam sağlayacaktır.
              </p>
              <p>
                Sürdürülebilir enerji kaynaklarını kullanarak çevre
                duyarlılığımızı artırmak ve gelecek nesillere daha yaşanabilir
                bir dünya bırakmayı ilke edindik.
              </p>
              <p>
                Bu ilkeyle fabrikamızın birçok alanına güneş enerji panelleri
                inşa ederek karbon ayak izimizi azaltmayı hedeflemekteyiz.
              </p>
              <p>
                Bu yatırım sayesinde ithalatın önüne geçecek, cari açığa önemli
                etki sağlayacağız.
              </p>
            </div>
            <p className="mt-8 text-sm font-bold tracking-wide text-brand-navy uppercase dark:text-brand-orange">
              {site.legalName}
            </p>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-border shadow-sm min-h-[320px]">
            <Image
              src="/images/factory/band/14.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-35 grayscale dark:opacity-25"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-card/75 dark:bg-background/80" />
            <ul className="relative z-10 grid gap-2 px-6 py-7 text-sm font-semibold text-brand-navy dark:text-foreground sm:py-8">
              {productLines.map((line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-brand-orange"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 2000 + sekmeler */}
      <section className="border-y border-border bg-muted py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-6xl font-bold tracking-tight text-brand-blue/45 sm:text-7xl dark:text-brand-blue/50">
              2000
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-brand-navy uppercase dark:text-foreground sm:text-2xl">
              Yılından beri sektörde öncülük ediyoruz
            </h2>
            <p className="text-body mt-5 text-base leading-8">
              Oma Polimer A.Ş.’nin çeyrek asra yaklaşan tecrübesini arkasına
              alan OmaFil, polimer üretiminde yenilikçi ve sürdürülebilir
              çözümler sunarak sektörün geleceğini inşa ediyor. Modern
              tesislerimizde, küresel standartlarda kalite ve süreklilik
              sağlıyoruz.
            </p>
          </div>
          <FactoryMissionTabs />
        </div>
      </section>

      {/* Fabrikamız galerisi */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16" aria-labelledby="factory-gallery-title">
        <h2
          id="factory-gallery-title"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Fabrikamız
        </h2>
        <p className="text-body mt-4 max-w-3xl text-base leading-8">
          Modern teknoloji ve global standartlarla inşa edilen tesisimiz,
          yüksek üretim kapasitesiyle tekstil sektörünün güvenilir tedarik
          noktasıdır. Geniş altyapımız ve çevre dostu enerji
          politikalarımızla, sürdürülebilir büyümeyi destekliyoruz.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {factoryGallery.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                quality={82}
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Üretim bandı — görselleri sen ekleyeceksin */}
      <section
        className="border-y border-border bg-muted py-14 sm:py-16"
        aria-labelledby="production-band-title"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="production-band-title"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Üretim Bandı
          </h2>
          <p className="text-body mt-4 max-w-3xl text-base leading-8">
            Naylon 6 ve 66 iplik üretiminde son teknoloji makine parkurumuzla
            hata payını minimize ediyoruz. Her aşamada uyguladığımız hassas
            kalite kontrol süreçleri sayesinde, yüksek mukavemetli ve uzun
            ömürlü iplikler üretiyoruz.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productionBandGallery.map((photo) => (
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
                  loading="lazy"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {plant && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {plant.label}
                </h2>
                <p className="text-body mt-2 max-w-2xl text-base leading-8">
                  {plant.address}
                </p>
                <a
                  href={plant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-brand-orange hover:underline"
                >
                  Tesisi haritada aç →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </CorporateFrame>
  );
}
