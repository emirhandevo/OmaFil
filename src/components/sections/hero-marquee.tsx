"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy, useInner, useLocale } from "@/components/i18n/locale-provider";
import {
  yarnImages,
  yarnImagesBottom,
  type MarqueeItem,
} from "@/config/hero-marquee";

const STEP_PX = 320;

type GroupProps = {
  items: MarqueeItem[];
  altPrefix: string;
  duplicate?: boolean;
  skipClickRef: React.RefObject<boolean>;
  openSrc: string | null;
  hoveredSrc: string | null;
  onHover: (src: string | null) => void;
  onYarnClick: (e: React.MouseEvent<HTMLAnchorElement>, src: string) => void;
};

function ImageGroup({
  items,
  altPrefix,
  duplicate = false,
  skipClickRef,
  openSrc,
  hoveredSrc,
  onHover,
  onYarnClick,
}: GroupProps) {
  const copy = useCopy();
  const inner = useInner();
  const locale = useLocale();
  // Şerit LTR kalır. Kart yazısı Arapçada kendi yönünde akar.
  const textDir = locale === "ar" ? "rtl" : "ltr";

  return (
    // Kopya grup görsel döngü için; aria-hidden + tabIndex=-1 yeter.
    // pointer-events-none / inert KOYMA: offset yarım şeride gelince
    // ekranda görünen kartlar kopya olur — tıklama/hover ölürdü.
    <div
      className="flex shrink-0 items-start gap-3 pr-4 sm:gap-4 sm:pr-5"
      aria-hidden={duplicate ? true : undefined}
    >
      {items.map((item, index) => {
        // Test görseli varsa onu bas; yoksa kartın kendi dosyası. İkisi de yoksa yer tutucu.
        const src = item.src;
        const alt = duplicate ? "" : `${altPrefix} ${index + 1} — ${item.label}`;
        // İki kopyada da aynı slug açık kalsın (ekranda görünen hangisiyse)
        const open = openSrc === item.slug || hoveredSrc === item.slug;

        return (
          <LocaleLink
            key={`${item.slug}-${index}`}
            href={item.href}
            tabIndex={duplicate ? -1 : undefined}
            draggable={false}
            data-yarn-card={item.slug}
            data-no-transition
            onMouseEnter={() => onHover(item.slug)}
            onMouseLeave={() => onHover(null)}
            onClick={(e) => {
              onYarnClick(e, item.slug);
              if (skipClickRef.current) {
                e.preventDefault();
                skipClickRef.current = false;
              }
            }}
            className={`flex w-60 shrink-0 flex-col overflow-hidden rounded-2xl border transition-colors sm:w-72 md:w-80 ${
              // Logodaki Oma mavisi. Hover ve açık kart: Fil turuncusu.
              open
                ? "border-[#f19000]"
                : "border-[#265291] hover:border-[#f19000] active:border-[#f19000]"
            }`}
          >
            <div
              dir={textDir}
              className="z-10 shrink-0 bg-white/75 px-3 pt-2.5 shadow-sm backdrop-blur-md sm:px-4 sm:pt-3"
            >
              <div className="flex items-center justify-between gap-2 pb-2.5 sm:gap-3 sm:pb-3">
                <p className="text-xs font-semibold text-zinc-900 sm:text-sm">
                  {item.label}
                </p>
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-zinc-900 sm:size-4"
                />
              </div>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-xs leading-5 text-zinc-600">
                    {inner?.products[item.slug] || item.summary}
                  </p>
                  <p className="mt-2 flex items-center gap-1 pb-3 text-xs font-medium text-zinc-900">
                    {copy.hero.details}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-b-2xl bg-zinc-900 sm:h-44 md:h-52">
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 320px, (min-width: 640px) 288px, 240px"
                  unoptimized
                  draggable={false}
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-1 px-3 text-center">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    {copy.products.soon}
                  </span>
                  <span className="text-sm font-semibold text-white/80">{item.code}</span>
                </div>
              )}
            </div>
          </LocaleLink>
        );
      })}
    </div>
  );
}

function MarqueeRow({
  items,
  altPrefix,
  direction,
}: {
  items: MarqueeItem[];
  altPrefix: string;
  direction: "left" | "right";
}) {
  const copy = useCopy();
  const innerRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const isDragging = useRef(false);
  const dragArmed = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const skipClickRef = useRef(false);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);

  // Kritik: ref’i setState’ten ÖNCE güncelle — yoksa rAF 1-2 kare daha kaydırır, kart kaçar
  function handleHover(src: string | null) {
    if (src) {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      paused.current = true;
    }
    // null’da pause’u kaldırma: satırdan çıkınca onMouseLeave halleder
    setHoveredSrc(src);
  }

  function handleYarnClick(e: React.MouseEvent<HTMLAnchorElement>, src: string) {
    // Sürükleme sonrası sahte click — navigasyon yok
    if (skipClickRef.current) {
      e.preventDefault();
      skipClickRef.current = false;
      return;
    }

    // Mobil / dokunmatik: iki tıklı akış. Masaüstü hover ile açılır, tık doğrudan gider.
    const needsTapExpand =
      window.matchMedia("(max-width: 1023px)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (!needsTapExpand) return;

    // 1. tık (farklı / kapalı kart): bilgiyi aç, marquee dursun
    if (openSrc !== src) {
      e.preventDefault();
      paused.current = true;
      setOpenSrc(src);
      return;
    }

    // 2. tık (aynı kart): ürünler sayfasına git (preventDefault yok → Link)
    paused.current = false;
    setOpenSrc(null);
  }

  useEffect(() => {
    if (!openSrc) return;
    // Closure içinde string | null kalmasın diye sabitlenir
    const activeSrc = openSrc;

    // Kart dışı herhangi bir yere tık → paneli kapat, marquee devam
    function onPointerDown(e: PointerEvent) {
      const t = e.target as HTMLElement | null;
      if (t?.closest(`[data-yarn-card="${CSS.escape(activeSrc)}"]`)) return;
      paused.current = false;
      setOpenSrc(null);
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openSrc]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = direction === "right" ? -40 : 40;
    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      const inner = innerRef.current;

      if (inner && !paused.current && !isDragging.current && !reduce) {
        const half = inner.scrollWidth / 2;
        if (half > 0) {
          offset.current += speed * dt;
          if (offset.current >= half) offset.current -= half;
          if (offset.current < 0) offset.current += half;
          inner.style.transform = `translateX(${-offset.current}px)`;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [direction]);

  function scrollByStep(dir: "left" | "right") {
    const inner = innerRef.current;
    if (!inner) return;
    const half = inner.scrollWidth / 2;
    offset.current += dir === "left" ? -STEP_PX : STEP_PX;
    if (offset.current < 0) offset.current += half;
    if (offset.current >= half) offset.current -= half;
    inner.style.transition = "transform 0.4s ease";
    inner.style.transform = `translateX(${-offset.current}px)`;
    window.setTimeout(() => {
      if (inner) inner.style.transition = "";
    }, 400);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") return;
    dragArmed.current = true;
    isDragging.current = false;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset.current;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" || !dragArmed.current) return;
    const delta = e.clientX - dragStartX.current;
    if (!isDragging.current) {
      if (Math.abs(delta) <= 8) return;
      isDragging.current = true;
    }
    const inner = innerRef.current;
    if (!inner) return;
    let next = dragStartOffset.current - delta;
    const half = inner.scrollWidth / 2;
    if (half > 0) next = ((next % half) + half) % half;
    offset.current = next;
    inner.style.transform = `translateX(${-offset.current}px)`;
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") return;
    skipClickRef.current = Math.abs(offset.current - dragStartOffset.current) > 8;
    isDragging.current = false;
    dragArmed.current = false;
  }

  const groupProps = {
    items,
    altPrefix,
    skipClickRef,
    openSrc,
    hoveredSrc,
    onHover: handleHover,
    onYarnClick: handleYarnClick,
  } as const;

  return (
    <div
      // rtl sayfada flex sağdan başlar, translateX sola kaçırır; şerit boşalır.
      dir="ltr"
      className="group/row relative flex items-center gap-2"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          paused.current = true;
        }
      }}
      onMouseLeave={() => {
        paused.current = openSrc !== null;
        setHoveredSrc(null);
      }}
    >
      <button
        type="button"
        aria-label={copy.chrome.scrollPrev}
        onClick={() => scrollByStep("left")}
        className="z-20 hidden size-9 shrink-0 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 active:bg-black/80 group-hover/row:opacity-100 sm:flex"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="min-w-0 flex-1 cursor-pointer overflow-hidden touch-pan-y [@media(pointer:coarse)]:cursor-grab [@media(pointer:coarse)]:active:cursor-grabbing"
      >
        <div ref={innerRef} className="flex w-max will-change-transform">
          <ImageGroup {...groupProps} />
          <ImageGroup {...groupProps} duplicate />
        </div>
      </div>

      <button
        type="button"
        aria-label={copy.chrome.scrollNext}
        onClick={() => scrollByStep("right")}
        className="z-20 hidden size-9 shrink-0 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 active:bg-black/80 group-hover/row:opacity-100 sm:flex"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function HeroMarquee() {
  return (
    <div className="mt-10 w-full space-y-5">
      <div className="mx-auto w-full max-w-5xl px-4 lg:max-w-7xl">
        <MarqueeRow
          items={yarnImages}
          altPrefix="İplik"
          direction="right"
        />
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 lg:max-w-7xl">
        <MarqueeRow
          items={yarnImagesBottom}
          altPrefix="İplik"
          direction="left"
        />
      </div>
    </div>
  );
}
