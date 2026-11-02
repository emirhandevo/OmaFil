"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy, useInner } from "@/components/i18n/locale-provider";
import { productFamilies } from "@/content/catalog/families";
import type { ProductFamily, ProductLine } from "@/content/catalog/types";
import { useProductsBrowse } from "@/components/sections/products-browse";

type Phase = "idle" | "out" | "in";

type ProductsGridProps = {
  lines: ProductLine[];
  contactEmail: string;
};

/**
 * Glass ürün grid’i — filtre değişince fade-out → içerik → stagger fade-in.
 * Veri Keystatic’ten sunucu sayfasında gelir.
 */
export function ProductsGrid({ lines, contactEmail }: ProductsGridProps) {
  const copy = useCopy();
  const inner = useInner();
  // Filtre layout provider’da: detay sayfasına gidince sıfırlanmaz.
  const { family, setFamily } = useProductsBrowse();
  const [phase, setPhase] = useState<Phase>("idle");
  const lockRef = useRef(false);

  const visible = useMemo(
    () =>
      family === "all" ? lines : lines.filter((p) => p.family === family),
    [family, lines],
  );

  function selectFamily(next: ProductFamily) {
    if (next === family || lockRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setFamily(next);
      return;
    }

    lockRef.current = true;
    setPhase("out");

    window.setTimeout(() => {
      setFamily(next);
      setPhase("in");

      window.setTimeout(() => {
        setPhase("idle");
        lockRef.current = false;
      }, 700);
    }, 220);
  }

  const listClass =
    phase === "out"
      ? "omafil-products-out"
      : phase === "in"
        ? "omafil-products-in"
        : "";

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={copy.chrome.familyAria}
      >
        {productFamilies.map((f) => {
          const active = family === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={phase !== "idle"}
              onClick={() => selectFamily(f.id)}
              className={
                active
                  ? "rounded-full bg-[#f19000] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#f19000]/30 transition-all duration-300"
                  : "rounded-full border border-white/15 bg-[#1e355d]/80 px-4 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#f19000]/50 hover:bg-[#1e355d] active:border-[#f19000]/50 active:bg-[#1e355d] disabled:opacity-60"
              }
            >
              {f.id === "all" ? copy.products.all : f.label}
            </button>
          );
        })}
      </div>

      <ul
        key={family}
        className={`mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 ${listClass}`}
      >
        {visible.map((item, index) => (
          <li key={item.slug} className="group relative min-w-0 lg:hover:z-10">
            {/* overflow-hidden kart gölgeyi keser; ışıma li’de, üst kenara yakın */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute -inset-x-2 top-0 -bottom-2 z-0
                rounded-[1.85rem] bg-[#f19000]/50 blur-sm
                opacity-0 transition-opacity duration-[400ms]
                ease-[cubic-bezier(0.37,0,0.63,1)]
                motion-safe:lg:group-hover:opacity-100
              "
            />
            {/* Görsel, başlık, özet ve link satırı sabit yükseklik: her kart aynı boy */}
            {/* Süzülme: 16px, 1.8s, iki uçta yavaş. Süre köşeli parantezle yazılır: duration-[1800ms]. */}
            <article
              className="
                relative z-10 flex w-full flex-col overflow-hidden rounded-3xl
                border border-white/15 bg-[#1e355d]
                shadow-[0_4px_6px_-1px_rgba(0,0,0,0.35),0_20px_48px_-12px_rgba(0,0,0,0.55)]
                ring-1 ring-white/10
                transition-[border-color,box-shadow,background-color,translate] duration-[500ms]
                ease-[cubic-bezier(0.37,0,0.63,1)]
                hover:border-[#f19000]/70
                hover:bg-[#243f6e]
                hover:shadow-[0_28px_44px_-12px_rgba(0,0,0,0.45),0_46px_72px_-18px_rgba(0,0,0,0.62)]
                motion-safe:lg:hover:-translate-y-4
                active:border-[#f19000]/70
                active:bg-[#243f6e]
                active:shadow-[0_28px_44px_-12px_rgba(0,0,0,0.45),0_46px_72px_-18px_rgba(0,0,0,0.62)]
              "
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              <LocaleLink
                href={`/urunlerimiz/${item.slug}`}
                className="relative block aspect-4/3 w-full shrink-0 overflow-hidden"
              >
                {item.src ? (
                  <>
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      // fill görseli absolute yapar. lazy, ilk ekrandakini uzakta sanıp tıklayana kadar bekletir.
                      // İlk 6 kart (iki sıra) hemen gelsin. Altta kalanlar kaydırınca.
                      loading={index < 6 ? "eager" : "lazy"}
                      className="object-cover transition-[scale] duration-[1800ms] ease-[cubic-bezier(0.37,0,0.63,1)] group-hover:scale-[1.04] group-active:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12243c]/70 via-transparent to-transparent opacity-90" />
                  </>
                ) : (
                  /* Görsel yok — başka üründen kopya yok; nötr placeholder */
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#12243c] px-4 text-center">
                    <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
                      {copy.products.soon}
                    </span>
                    <span className="text-sm font-semibold text-white/70">
                      {item.code}
                    </span>
                  </div>
                )}
                <span className="absolute top-3 left-3 rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md">
                  {item.code}
                </span>
              </LocaleLink>

              <div className="flex flex-col border-t border-white/10 bg-[#162a4a] p-5 sm:p-6">
                <LocaleLink href={`/urunlerimiz/${item.slug}`}>
                  <h2 className="line-clamp-1 h-7 text-lg leading-7 font-semibold tracking-tight text-white transition-colors group-hover:text-[#f19000] group-active:text-[#f19000]">
                    {item.label}
                  </h2>
                </LocaleLink>
                <p className="mt-2 line-clamp-3 h-[4.5rem] text-sm leading-6 text-white/70">
                  {inner?.products[item.slug] ?? item.summary}
                </p>
                <div className="mt-5 flex h-6 shrink-0 flex-nowrap items-center gap-3">
                  <LocaleLink
                    href={`/urunlerimiz/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-white active:text-white"
                  >
                    {/* Specs her dilde aynı kelime. Sözlükteki ürün giriş cümlesi de böyle. */}
                    Specs
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5"
                    />
                  </LocaleLink>
                  <LocaleLink
                    href="/iletisim"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f19000] transition-colors hover:text-[#e84e1c] active:text-[#e84e1c]"
                  >
                    {copy.products.quote}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </LocaleLink>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="text-body mt-12 text-sm">
        {copy.products.quoteLine}{" "}
        {/* mailto + konu: tıklanınca mail uygulamasında bu adrese yeni ileti açılır */}
        <a
          href={`mailto:${contactEmail}?subject=${encodeURIComponent(copy.products.quoteLine)}`}
          className="font-semibold text-brand-orange hover:underline active:underline"
        >
          {contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
