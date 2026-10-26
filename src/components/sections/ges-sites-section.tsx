"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { useInner, useLocale } from "@/components/i18n/locale-provider";
import { gesErbaaRoof, gesSites, type GesSite } from "@/content/ges-sites";
import { htmlLang } from "@/i18n/locales";

/**
 * Dört GES tesisi — Elazığ Arazi + Erbaa Çatı.
 * Arazi: alt thumb’lar + lightbox okları. Çatı: tek hero, thumb yok.
 */
export function GesSitesSection({
  sitesTitle,
  sitesLead,
  fieldHeading,
  roofHeading,
}: {
  sitesTitle?: string;
  sitesLead?: string;
  fieldHeading?: string;
  roofHeading?: string;
}) {
  const locale = useLocale();
  const t = useInner();
  const num = htmlLang(locale);
  const saha = gesSites.filter((s) => s.kind === "saha");
  const cati = gesSites.filter((s) => s.kind === "cati");

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
      aria-labelledby="ges-sites-title"
    >
      <h2
        id="ges-sites-title"
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {sitesTitle || t?.ges.sitesTitle || "Tesislerimiz"}
      </h2>
      <p className="text-body mt-3 max-w-2xl text-base leading-8">
        {sitesLead ||
          t?.ges.sitesLead ||
          "Elazığ Kovancılar’da iki Arazi GES; Tokat Erbaa fabrika çatısında iki ayrı Çatı Üstü GES. Toplam kurulu güç 6,76 MWp."}
      </p>

      <h3 className="mt-12 text-lg font-semibold tracking-tight text-brand-navy dark:text-foreground">
        {fieldHeading || t?.ges.fieldHeading || "Elazığ — Arazi GES"}
      </h3>
      <ul className="mt-6 grid gap-8 lg:grid-cols-2">
        {saha.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </ul>

      <h3 className="mt-14 text-lg font-semibold tracking-tight text-brand-navy dark:text-foreground">
        {roofHeading || t?.ges.roofHeading || "Erbaa — Çatı Üstü GES"}
      </h3>
      <p className="text-body mt-2 max-w-2xl text-sm leading-7">
        {t
          ? t.ges.roofLead({
              mwp: String(gesErbaaRoof.capacityMwp),
              kw: gesErbaaRoof.capacityKw.toLocaleString(num),
              min: gesErbaaRoof.dailyKwhMin.toLocaleString(num),
              max: gesErbaaRoof.dailyKwhMax.toLocaleString(num),
            })
          : `Oma Polimer Çatı Üstü GES toplam ${gesErbaaRoof.capacityMwp} MWp (${gesErbaaRoof.capacityKw.toLocaleString("tr-TR")} kW). Günlük ortalama ${gesErbaaRoof.dailyKwhMin.toLocaleString("tr-TR")}–${gesErbaaRoof.dailyKwhMax.toLocaleString("tr-TR")} kWh. Aynı çatıda iki ayrı sistem: GES 1 ve GES 2.`}
      </p>
      <ul className="mt-6 grid gap-8 lg:grid-cols-2">
        {cati.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </ul>
    </section>
  );
}

function SiteCard({ site }: { site: GesSite }) {
  const locale = useLocale();
  const t = useInner();
  const num = htmlLang(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hero = site.images[0];
  // Çatı kartlarında alt satır yok; arazide 2–4. foto thumb
  const thumbs = site.kind === "saha" ? site.images.slice(1) : [];

  return (
    <li className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {hero ? (
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="relative block aspect-16/10 w-full cursor-zoom-in bg-muted text-left transition active:ring-2 active:ring-brand-orange"
          aria-label={`${site.name} — büyük görsel`}
        >
          <Image
            src={hero}
            alt={`${site.name} — genel görünüm`}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </button>
      ) : null}

      <div className="p-5 sm:p-6">
        <p className="text-xs font-bold tracking-[0.18em] text-brand-orange">
          {site.shortName}
        </p>
        <h4 className="mt-2 text-xl font-semibold tracking-tight">{site.name}</h4>
        <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {site.location}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-muted/60 px-3 py-2">
            <dt className="text-xs text-muted-foreground">
              {t?.ges.capacityLabel ?? "Kurulu güç"}
            </dt>
            <dd className="mt-0.5 font-semibold tabular-nums">
              {site.capacityMwp.toLocaleString(num)} MWp
            </dd>
          </div>
          <div className="rounded-xl bg-muted/60 px-3 py-2">
            <dt className="text-xs text-muted-foreground">
              {t?.ges.panelLabel ?? "Panel"}
            </dt>
            <dd className="mt-0.5 font-semibold tabular-nums">
              {site.panelCount.toLocaleString(num)}
            </dd>
          </div>
          {site.dailyKwhMin != null && site.dailyKwhMax != null ? (
            <div className="col-span-2 rounded-xl bg-muted/60 px-3 py-2">
              <dt className="text-xs text-muted-foreground">
                {t?.ges.daily ?? "Günlük üretim"}
              </dt>
              <dd className="mt-0.5 font-semibold tabular-nums">
                {site.dailyKwhMin.toLocaleString(num)}–
                {site.dailyKwhMax.toLocaleString(num)} kWh
              </dd>
            </div>
          ) : null}
          {site.productionStart ? (
            <div className="col-span-2 rounded-xl bg-muted/60 px-3 py-2">
              <dt className="text-xs text-muted-foreground">
                {site.kind === "cati"
                  ? (t?.ges.roofStatus ?? "Geçici kabul / işletme")
                  : (t?.ges.fieldStatus ?? "Üretime başlangıç")}
              </dt>
              <dd className="mt-0.5 font-semibold">
                {new Date(site.productionStart).toLocaleDateString(num, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
          ) : null}
        </dl>

        {thumbs.length > 0 ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {thumbs.map((src, i) => {
              const fullIndex = i + 1;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setOpenIndex(fullIndex)}
                  className="relative aspect-4/3 cursor-zoom-in overflow-hidden rounded-xl bg-muted ring-offset-background transition hover:ring-2 hover:ring-brand-orange active:ring-2 active:ring-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-none"
                  aria-label={`${site.shortName} ${t?.ges.photo ?? "fotoğraf"} ${fullIndex + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${site.name} — ${t?.ges.photo ?? "fotoğraf"} ${fullIndex + 1}`}
                    fill
                    sizes="(min-width: 1024px) 200px, 33vw"
                    quality={92}
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {openIndex != null ? (
        <GesLightbox
          images={site.images}
          index={openIndex}
          title={site.name}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      ) : null}
    </li>
  );
}

function GesLightbox({
  images,
  index,
  title,
  onClose,
  onIndexChange,
}: {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const t = useInner();
  const titleId = useId();
  const src = images[index];
  const hasNav = images.length > 1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (!hasNav) return;
      if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [hasNav, index, images.length, onClose, onIndexChange]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 active:bg-white/20"
        aria-label={t?.ges.close ?? "Kapat"}
      >
        <X className="size-5" />
      </button>

      <p id={titleId} className="sr-only">
        {title} — {t?.ges.photo ?? "fotoğraf"} {index + 1} / {images.length}
      </p>

      {hasNav ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
            className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 active:bg-white/30 sm:left-6"
            aria-label={t?.ges.prev ?? "Önceki fotoğraf"}
          >
            <ChevronLeft className="size-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
            className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 active:bg-white/30 sm:right-6"
            aria-label={t?.ges.next ?? "Sonraki fotoğraf"}
          >
            <ChevronRight className="size-7" />
          </button>
        </>
      ) : null}

      <div
        className="relative h-[min(80vh,720px)] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={`${title} — ${t?.ges.photo ?? "fotoğraf"} ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          quality={95}
          className="object-contain"
          priority
        />
      </div>

      {hasNav ? (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(i);
              }}
              className={
                i === index
                  ? "size-2.5 rounded-full bg-brand-orange"
                  : "size-2.5 rounded-full bg-white/40 hover:bg-white/70 active:bg-white/70"
              }
              aria-label={`${t?.ges.photo ?? "Fotoğraf"} ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
