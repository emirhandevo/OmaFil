"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BatteryCharging, Leaf, Sun } from "lucide-react";
import {
  computeGesMetrics,
  gesCapacity,
  gesMetrics,
} from "@/content/ges";

/** TR sayı formatı: 19.729.964,00 */
function formatTr(value: number, decimals: number): string {
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

type MetricId = (typeof gesMetrics)[number]["id"];

/**
 * Patron örneği: yeşil özet + 3 fotoğraflı canlı sayaç.
 * Sayılar sabit değil — her ~200ms kümülatif üretim artışıyla güncellenir.
 */
export function GesImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(() => computeGesMetrics());

  // Bölüm görünür olunca sayaçları başlat
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Canlı tick — görünürken sürekli artar
  useEffect(() => {
    if (!visible) return;

    setValues(computeGesMetrics());
    const id = window.setInterval(() => {
      setValues(computeGesMetrics());
    }, 200);

    return () => window.clearInterval(id);
  }, [visible]);

  function valueFor(id: MetricId): number {
    if (id === "energy") return values.energy;
    if (id === "carbon") return values.carbon;
    return values.trees;
  }

  return (
    <section ref={sectionRef} aria-labelledby="ges-impact-title">
      <div className="bg-emerald-50 dark:bg-emerald-950/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-16">
          <div>
            <h2
              id="ges-impact-title"
              className="text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300 sm:text-3xl"
            >
              {gesCapacity.title}
            </h2>
            <p className="text-body mt-5 max-w-xl text-base leading-8">
              {gesCapacity.text}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto flex h-44 w-full max-w-sm items-center justify-center gap-3"
          >
            <span className="flex size-20 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-card">
              <Sun className="size-10 text-amber-500" strokeWidth={1.5} />
            </span>
            <span className="flex size-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <BatteryCharging className="size-8" strokeWidth={1.5} />
            </span>
            <span className="flex size-16 items-center justify-center rounded-2xl bg-lime-500/20 text-emerald-700 shadow-sm dark:text-emerald-300">
              <Leaf className="size-8" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </div>

      {/* Her kart: mobilde başlık üstte, desktop’ta görselin üst ortasında */}
      <div className="grid md:grid-cols-3">
        {gesMetrics.map((m) => (
          <article key={m.id} className="flex flex-col">
            <p className="bg-emerald-50 px-4 py-3 text-center text-[11px] font-bold tracking-[0.12em] text-emerald-800 uppercase dark:bg-emerald-950/40 dark:text-emerald-300 sm:text-xs md:hidden">
              {m.label}
            </p>

            <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px]">
              <Image
                src={m.image}
                alt={m.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                quality={80}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/55" />

              <p className="absolute top-4 left-1/2 z-10 hidden w-[calc(100%-2rem)] -translate-x-1/2 text-center text-[11px] font-bold tracking-[0.12em] text-white uppercase drop-shadow sm:text-xs md:block">
                {m.label}
              </p>

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-8 text-center md:pt-6">
                <p
                  className="text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl lg:text-4xl"
                  aria-live="polite"
                >
                  {formatTr(valueFor(m.id), m.decimals)}
                  {m.suffix ? (
                    <span className="ml-1 text-base font-semibold sm:text-lg">
                      {m.suffix}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
