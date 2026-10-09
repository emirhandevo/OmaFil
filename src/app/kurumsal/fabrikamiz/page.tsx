import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { FactoryMissionTabs } from "@/components/sections/factory-mission-tabs";
import { LabVideo } from "@/components/sections/lab-video";
import { ProductionBandGallery } from "@/components/sections/production-band-gallery";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { getContact } from "@/content/cms";
import { getProductLines } from "@/content/catalog";
import type { ProcessCode, ProductLine } from "@/content/catalog";
import { getCmsPage } from "@/content/pages";
import { site } from "@/config/site";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import { pageAlternates } from "@/i18n/locales";
import { placeLabel } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const [page, { locale }] = await Promise.all([
    getCmsPage("fabrikamiz"),
    getCopy(),
  ]);
  const t = getInner(locale);
  return {
    title: t?.factory.title ?? page?.title ?? "Fabrikamız",
    description:
      t?.factory.description ??
      page?.description ??
      "OmaFil gipe iplik üretim tesisi Tokat Erbaa’da. Avrupa’nın en büyük polimer / gipe üretim tesisi.",
    alternates: pageAlternates("/kurumsal/fabrikamiz", locale),
  };
}

/** Türkçe kart gövdesi. Markdoc ağacı yerine düz string: dil değişince de kaybolmasın. */
const factoryIntroTr = [
  "Tokat Erbaa Organize Sanayi Bölgesi'nde faaliyet gösteren tesisimiz, yıllık 13.000 ton üretim kapasitesiyle Avrupa'nın en büyük gipe iplik üretim tesisi unvanını taşıyor. Naylon 6, Naylon 66 ve polyester gipe iplik hatlarında ürettiğimiz yüksek katma değerli ürünlerle global tekstil endüstrisine hizmet veriyoruz.",
  "Bünyesinde barındırdığı Ar-Ge merkeziyle sadece üretmekle kalmıyor, geleceğin iplik teknolojilerini de geliştiriyoruz. Tesisimiz bölgeye önemli bir istihdam kaynağı oluştururken, çatımıza kurduğumuz güneş enerjisi sistemiyle üretimimizin enerji ihtiyacının bir kısmını temiz kaynaklardan karşılıyoruz.",
];

/** Karttaki kısa ad. Kaplama kodları ürünler sayfasındaki ACY / SCY / DCY ile aynı hat. */
const processName: Record<ProcessCode, string> = {
  POY: "POY",
  FDY: "FDY",
  DTY: "DTY",
  ATY: "ATY",
  ACY: "AIR COVERED YARNS",
  SCY: "SINGLE COVERED YARNS",
  DCY: "DOUBLE COVERED YARNS",
};

const familyRank = { nylon6: 0, nylon66: 1, polyester: 2 } as const;
const codeRank: Record<ProcessCode, number> = {
  POY: 0,
  FDY: 1,
  DTY: 2,
  ATY: 3,
  ACY: 4,
  SCY: 5,
  DCY: 6,
};

/** Ürünler sayfasındaki hatlar, karttaki PA6 / PA66 / PES yazımıyla. */
function factoryProductLabel(line: ProductLine) {
  const polymer =
    line.polymer === "pa6" ? "PA6" : line.polymer === "pa66" ? "PA66" : "PES";
  return `${polymer} ${processName[line.code]}`;
}

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

/**
 * Üretim bandı dosya sırası. İlk 4 kart seçilen kareler.
 * Eski ilk 4 (01–04), bu karelerin eski yerine gider. Aynı dosya iki kez yok.
 * 21 salon, 24 renkli bobin, 14 turkuaz hat, 25 mor UV.
 */
const bandOrder = [
  "21", "24", "14", "25",
  "05", "06", "07", "08", "09", "10", "11", "12", "13",
  "03",
  "15", "16", "17", "18", "19", "20",
  "01",
  "22", "23",
  "02",
  "04",
  "26", "27", "28",
] as const;

const productionBandGallery = bandOrder.map((file, index) => {
  // Alt metindeki numara ekrandaki sıra. Dosya adı değil.
  const label = String(index + 1).padStart(2, "0");
  return {
    src: `/images/factory/band/${file}.webp`,
    alt: `OmaFil üretim bandı ${label}`,
  };
});

export default async function FabrikamizPage() {
  const [page, contact, lines, { locale }] = await Promise.all([
    getCmsPage("fabrikamiz"),
    getContact(),
    getProductLines(),
    getCopy(),
  ]);
  // Ürünler sayfasıyla aynı aile sırası: Naylon 6, Naylon 66, polyester.
  const productLines = [...lines].sort(
    (a, b) =>
      familyRank[a.family] - familyRank[b.family] ||
      codeRank[a.code] - codeRank[b.code],
  );
  const t = getInner(locale);
  const plant = contact.locations.find((place) =>
    place.label.startsWith("Fabrika /"),
  );
  const gallery = factoryGallery.map((photo, i) => ({
    ...photo,
    alt: t?.factory.alts[i] ?? photo.alt,
  }));
  const band = productionBandGallery.map((photo) => ({
    ...photo,
    alt: t ? `${t.factory.bandAlt} ${photo.alt.slice(-2)}` : photo.alt,
  }));

  return (
    <CorporateFrame
      path="/kurumsal/fabrikamiz"
      title={t?.factory.title ?? page?.title ?? "Fabrikamız"}
      description={
        t?.factory.description ??
        page?.description ??
        "Avrupa’nın en büyük polimer / gipe iplik üretim tesisi Tokat–Erbaa’da."
      }
    >
      {/* Giriş: metin + ürün listesi kartı */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-brand-navy dark:text-foreground sm:text-3xl">
          {t?.factory.headline ??
            "Yıllık 13.000 Ton Kapasiteyle Avrupa'nın Zirvesinde"}
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="text-body space-y-4 text-base leading-8">
              {(t?.factory.paragraphs ?? factoryIntroTr).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
                <li key={line.slug} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-brand-orange"
                  />
                  {factoryProductLabel(line)}
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
              1999
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-brand-navy uppercase dark:text-foreground sm:text-2xl">
              {t?.factory.since ?? "Yılından beri sektörde öncülük ediyoruz"}
            </h2>
            <p className="text-body mt-5 text-base leading-8">
              {t?.factory.sinceBody ??
                "Oma Polimer A.Ş.’nin çeyrek asra yaklaşan tecrübesini arkasına alan OmaFil, polimer üretiminde yenilikçi ve sürdürülebilir çözümler sunarak sektörün geleceğini inşa ediyor. Modern tesislerimizde, küresel standartlarda kalite ve süreklilik sağlıyoruz."}
            </p>
          </div>
          <FactoryMissionTabs labels={t?.factory.tabs} aria={t?.factory.tabsAria} />
        </div>
      </section>

      {/* Fabrikamız galerisi */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16" aria-labelledby="factory-gallery-title">
        <h2
          id="factory-gallery-title"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {t?.factory.galleryTitle ?? "Fabrikamız"}
        </h2>
        <p className="text-body mt-4 max-w-3xl text-base leading-8">
          {t?.factory.galleryBody ??
            "Modern teknoloji ve global standartlarla inşa edilen tesisimiz, yüksek üretim kapasitesiyle tekstil sektörünün güvenilir tedarik noktasıdır. Geniş altyapımız ve çevre dostu enerji politikalarımızla, sürdürülebilir büyümeyi destekliyoruz."}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {gallery.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-muted"
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

      {/* Üretim bandı — ilk 4 açık, gerisi butonla yüklenir */}
      <section
        className="border-y border-border bg-muted py-14 sm:py-16"
        aria-labelledby="production-band-title"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="production-band-title"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {t?.factory.bandTitle ?? "Üretim Bandı"}
          </h2>
          <p className="text-body mt-4 max-w-3xl text-base leading-8">
            {t?.factory.bandBody ??
              "Naylon 6 ve 66 iplik üretiminde son teknoloji makine parkurumuzla hata payını minimize ediyoruz. Her aşamada uyguladığımız hassas kalite kontrol süreçleri sayesinde, yüksek mukavemetli ve uzun ömürlü iplikler üretiyoruz."}
          </p>
          <ProductionBandGallery
            photos={band}
            moreLabel={t?.factory.bandMore ?? "Daha fazlasını göster"}
            lessLabel={t?.factory.bandLess ?? "Daha az göster"}
          />
        </div>
      </section>

      {/* Laboratuvar videosu ve metin. Diğer diller onaydan sonra çevrilecek. */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
        aria-labelledby="lab-tests-title"
      >
        <h2
          id="lab-tests-title"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Kalitenin Ölçüldüğü Yer: Laboratuvarımız
        </h2>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center">
          <LabVideo />
          <p className="text-body text-base leading-8">
            Fabrikamızdaki laboratuvarda, gelen POY filamentten bitmiş ipliğe
            kadar her aşamayı ölçümle doğruluyoruz. Denye, büküm, mukavemet ve
            uzama değerlerini kontrol ediyor, filament düzgünlüğünü analiz
            ediyoruz. Viskozite ölçümüyle polimer kalitesini, yağ testiyle iplik
            üzerindeki finish oranını takip ediyoruz. Numuneleri boyama
            testlerine alıyor, UV ışık kabinimizde bobinleri ışık altındaki
            performansları açısından sınıyoruz. Sonuç: her partide aynı kalite,
            her bobinde aynı performans.
          </p>
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
                  {placeLabel(plant.label, locale)}
                </h2>
                <p className="text-body mt-2 max-w-2xl text-base leading-8">
                  {plant.address}
                </p>
                <a
                  href={plant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-brand-orange hover:underline active:underline"
                >
                  {t?.factory.map ?? "Tesisi haritada aç"} →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </CorporateFrame>
  );
}
