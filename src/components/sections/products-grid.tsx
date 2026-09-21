"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  productFamilies,
  products,
  type ProductFamily,
} from "@/content/products";
import { contact } from "@/config/site";

type Phase = "idle" | "out" | "in";

/**
 * Glass ürün grid’i — filtre değişince fade-out → içerik → stagger fade-in.
 */
export function ProductsGrid() {
  const [family, setFamily] = useState<ProductFamily>("all");
  const [phase, setPhase] = useState<Phase>("idle");
  const lockRef = useRef(false);

  const visible = useMemo(
    () =>
      family === "all"
        ? products
        : products.filter((p) => p.family === family),
    [family],
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

      // stagger’ın bitmesini bekle, sonra idle
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
        aria-label="Ürün ailesi"
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
                  : "rounded-full border border-white/15 bg-[#1e355d]/80 px-4 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#f19000]/50 hover:bg-[#1e355d] disabled:opacity-60"
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <ul
        key={family}
        className={`mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 ${listClass}`}
      >
        {visible.map((item) => (
          <li key={item.src} className="group">
            <article
              className="
                relative flex h-full flex-col overflow-hidden rounded-3xl
                border border-white/15 bg-[#1e355d]/75
                shadow-[0_4px_6px_-1px_rgba(0,0,0,0.35),0_20px_48px_-12px_rgba(0,0,0,0.55)]
                ring-1 ring-white/10
                backdrop-blur-xl
                transition-all duration-300 ease-out
                hover:-translate-y-2
                hover:border-[#f19000]/55
                hover:bg-[#1e355d]/90
                hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4),0_32px_64px_-16px_rgba(0,0,0,0.65)]
              "
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12243c]/70 via-transparent to-transparent opacity-90" />
                <span className="absolute top-3 left-3 rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md">
                  {item.code}
                </span>
              </div>

              {/* Light + dark aynı: navy glass panel */}
              <div className="flex flex-1 flex-col border-t border-white/10 bg-[#12243c]/45 p-5 backdrop-blur-md sm:p-6">
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  {item.label}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-white/70">
                  {item.summary}
                </p>
                <Link
                  href="/iletisim"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f19000] transition-colors hover:text-[#e84e1c]"
                >
                  Teklif al
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="text-body mt-12 text-sm">
        Teklif veya numune için{" "}
        <a
          href={`mailto:${contact.email}`}
          className="font-semibold text-brand-orange hover:underline"
        >
          {contact.email}
        </a>
        .
      </p>
    </div>
  );
}
