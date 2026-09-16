"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  yarnImages,
  yarnTestSrc,
  plantImages,
  type MarqueeItem,
} from "@/config/hero-marquee";

type GroupProps = {
  items: MarqueeItem[];
  altPrefix: string;
  duplicate?: boolean;
  overrideSrc?: string | null;
  /** yarn: beyaz panel. plant: alttaki isim şeridi */
  variant: "yarn" | "plant";
  /** Sürükleme bitince gelen tıklamayı yutar, karta gitmesin */
  skipClickRef: React.RefObject<boolean>;
};

function ImageGroup({
  items,
  altPrefix,
  duplicate = false,
  overrideSrc = null,
  variant,
  skipClickRef,
}: GroupProps) {
  return (
    <div
      className="flex shrink-0 items-start gap-4 pr-5"
      aria-hidden={duplicate || undefined}
    >
      {items.map((item, index) => {
        const src = overrideSrc ?? item.src;
        const alt = duplicate ? "" : `${altPrefix} ${index + 1} — ${item.label}`;

        // Üst şerit: görsel tam kart, ad üstte beyaz panelde
        if (variant === "yarn") {
          return (
            <Link
              key={`${item.src}-${index}`}
              href={item.href ?? "/urunlerimiz"}
              tabIndex={duplicate ? -1 : undefined}
              draggable={false}
              onClick={(e) => {
                // Kaydırma hareketiyse linke gitme
                if (skipClickRef.current) {
                  e.preventDefault();
                  skipClickRef.current = false;
                }
              }}
                  className="group flex w-72 shrink-0 flex-col sm:w-80"
>
  {/* İsim görselin dışında. Açılınca görsel kutusuna girmez, onu aşağı iter. */}
  <div className="z-10 shrink-0 rounded-t-2xl rounded-b-none bg-white px-4 pt-3 shadow-sm">
    <div className="flex items-center justify-between gap-3 pb-3">
      <p className="text-sm font-semibold text-zinc-900">{item.label}</p>
      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-zinc-900" />
    </div>

    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:transition-none">
      <div className="overflow-hidden">
        <p className="text-xs leading-5 text-zinc-600">{item.summary}</p>
        <p className="mt-2 flex items-center gap-1 pb-3 text-xs font-medium text-zinc-900">
          Detaylı Bilgi
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </p>
      </div>
    </div>
  </div>

  {/* Görselin kendi kutusu. Yükseklik sabit, panel bunu küçültemez. */}
  <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-b-2xl sm:h-52">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 640px) 320px, 288px"
      quality={75}
      draggable={false}
      className="object-cover"
    />
  </div>
</Link>
          );
        }

        // Alt şerit: tesis, isim altta kalır
        return (
          <div
            key={`${item.src}-${index}`}
            className="group relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl bg-[#171a1f] sm:h-52 sm:w-80"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 640px) 320px, 288px"
              quality={75}
              className="object-cover transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-10">
              <p className="text-sm font-semibold text-white">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type RowProps = {
  items: MarqueeItem[];
  altPrefix: string;
  direction: "left" | "right";
  overrideSrc?: string | null;
  variant: "yarn" | "plant";
};

const STEP_PX = 320;

function MarqueeRow({
  items,
  altPrefix,
  direction,
  overrideSrc,
  variant,
}: RowProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const isHovering = useRef(false);
  const isTransitioning = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  // true ise bir sonraki tıklama navigasyon değildir
  const skipClickRef = useRef(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const speed = direction === "right" ? -40 : 40;

    let rafId: number;
    let lastTime = performance.now();

    function tick(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isHovering.current && !isTransitioning.current && !isDragging.current && !prefersReducedMotion) {
        offset.current += speed * delta;
        const half = inner!.scrollWidth / 2;
        if (half > 0) {
          if (offset.current >= half) offset.current -= half;
          if (offset.current < 0) offset.current += half;
        }
        inner!.style.transform = `translateX(${-offset.current}px)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [direction]);

  function scrollByStep(dir: "left" | "right") {
    const inner = innerRef.current;
    if (!inner) return;

    const half = inner.scrollWidth / 2;
    offset.current += dir === "left" ? -STEP_PX : STEP_PX;
    if (offset.current < 0) offset.current += half;
    if (offset.current >= half) offset.current -= half;

    isTransitioning.current = true;
    inner.style.transition = "transform 0.4s ease";
    inner.style.transform = `translateX(${-offset.current}px)`;

    window.setTimeout(() => {
      if (inner) inner.style.transition = "";
      isTransitioning.current = false;
    }, 400);
  }

  function handleDragStart(clientX: number) {
    isDragging.current = true;
    dragStartX.current = clientX;
    dragStartOffset.current = offset.current;
    const inner = innerRef.current;
    if (inner) inner.style.transition = "";
  }

  function handleDragMove(clientX: number) {
    if (!isDragging.current) return;
    const inner = innerRef.current;
    if (!inner) return;

    const delta = clientX - dragStartX.current;
    let next = dragStartOffset.current - delta;
    const half = inner.scrollWidth / 2;
    if (half > 0) next = ((next % half) + half) % half;

    offset.current = next;
    inner.style.transform = `translateX(${-offset.current}px)`;
  }

  function handleDragEnd() {
    // 8 px’den fazla kaydıysa bunu tıklama sayma
    skipClickRef.current = Math.abs(offset.current - dragStartOffset.current) > 8;
    isDragging.current = false;
  }

  return (
    <div className="group/row relative">
      <button
        type="button"
        aria-label="Geriye kaydır"
        onClick={() => scrollByStep("left")}
        className="absolute left-1 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-300 hover:bg-black/80 group-hover/row:opacity-100"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="İleriye kaydır"
        onClick={() => scrollByStep("right")}
        className="absolute right-1 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-300 hover:bg-black/80 group-hover/row:opacity-100"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div
        ref={outerRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        onPointerDown={(e) => handleDragStart(e.clientX)}
        onPointerMove={(e) => handleDragMove(e.clientX)}
        onPointerUp={handleDragEnd}
        onPointerLeave={handleDragEnd}
        onPointerCancel={handleDragEnd}
        className="cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
      >
        <div ref={innerRef} className="flex w-max">
          <ImageGroup
            items={items}
            altPrefix={altPrefix}
            overrideSrc={overrideSrc}
            variant={variant}
            skipClickRef={skipClickRef}
          />
          <ImageGroup
            items={items}
            altPrefix={altPrefix}
            overrideSrc={overrideSrc}
            variant={variant}
            skipClickRef={skipClickRef}
            duplicate
          />
        </div>
      </div>
    </div>
  );
}

export function HeroMarquee() {
  return (
    <div className="mt-10 w-full space-y-5">
  {/* Üstte tesis — eski genişlik */}
  <div className="mx-auto w-full max-w-5xl px-4">
    <MarqueeRow
      items={plantImages}
      altPrefix="Tesis"
      direction="left"
      variant="plant"
    />
  </div>

  {/* Altta ürünler — sadece desktop’ta daha geniş */}
  <div className="mx-auto w-full max-w-5xl px-4 lg:max-w-7xl">
    <MarqueeRow
      items={yarnImages}
      altPrefix="İplik"
      direction="right"
      overrideSrc={yarnTestSrc}
      variant="yarn"
    />
  </div>
</div>
  );
}