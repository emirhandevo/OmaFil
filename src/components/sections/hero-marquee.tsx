"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  showDetail?: boolean;
  containImage?: boolean;
};

function ImageGroup({
  items,
  altPrefix,
  duplicate = false,
  overrideSrc = null,
  showDetail = true,
  containImage = false,
}: GroupProps) {
  return (
    <div
      className="flex shrink-0 gap-4 pr-5"
      aria-hidden={duplicate || undefined}
    >
      {items.map((item, index) => {
        const src = overrideSrc ?? item.src;

        return (
          <div
            key={`${item.src}-${index}`}
            className={`group relative h-44 w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:h-52 sm:w-80 ${
              containImage ? "bg-black" : "bg-[#171a1f]"
            }`}
          >
            <Image
              src={src}
              alt={duplicate ? "" : `${altPrefix} ${index + 1} — ${item.label}`}
              fill
              sizes="(min-width: 640px) 320px, 288px"
              quality={75}
              className={`transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-105 ${
                containImage ? "object-contain" : "object-cover"
              }`}
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-10">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{item.label}</p>

                {showDetail && (
                  <p className="flex shrink-0 items-center gap-1 text-xs font-medium text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Detayları Gör
                    <span aria-hidden="true">→</span>
                  </p>
                )}
              </div>
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
  /** "left" → otomatik akış sola, "right" → otomatik akış sağa */
  direction: "left" | "right";
  overrideSrc?: string | null;
  showDetail?: boolean;
  containImage?: boolean;
};

// Bir "sayfa" kaydırma miktarı (buton başına px) — kart genişliği + boşluk
const STEP_PX = 320;

function MarqueeRow({
  items,
  altPrefix,
  direction,
  overrideSrc,
  showDetail = true,
  containImage = false,
}: RowProps) {
  // outerRef: sabit genişlikli, overflow-hidden çerçeve (görünen pencere)
  const outerRef = useRef<HTMLDivElement>(null);
  // innerRef: gerçekte hareket eden şerit — transform:translateX ile kaydırılıyor
  const innerRef = useRef<HTMLDivElement>(null);
  // Şu anki kaydırma miktarı (px) — state değil ref, her frame re-render tetiklemesin
  const offset = useRef(0);
  // Hover'da otomatik akışı durdurmak için
  const isHovering = useRef(false);
  // Buton tıklamasında kısa süreliğine yumuşak geçiş açmak için
  const isTransitioning = useRef(false);
  // parmak/mouse ile marquee sürükleme mobil - desktop için
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Otomatik akış hızı: saniyede kaç px (yön işaretiyle)
    const speed = direction === "right" ? -40 : 40;

    let rafId: number;
    let lastTime = performance.now();

    function tick(now: number) {
      const delta = (now - lastTime) / 1000; // saniye cinsinden geçen süre
      lastTime = now;

      // Butonla tetiklenen geçiş sürerken otomatik akışı ekleme (çakışmasın)
      if (!isHovering.current && !isTransitioning.current && !isDragging.current && !prefersReducedMotion) {
        offset.current += speed * delta;

        // İçerik 2 kez basıldığı için toplam genişliğin yarısı = 1 tam tur
        const half = inner.scrollWidth / 2;
        if (half > 0) {
          if (offset.current >= half) offset.current -= half;
          if (offset.current < 0) offset.current += half;
        }

        inner.style.transform = `translateX(${-offset.current}px)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [direction]);

  // Buton tıklaması: offset'i STEP_PX kadar değiştir, kısa geçiş animasyonuyla uygula
  function scrollByStep(dir: "left" | "right") {
  
    const inner = innerRef.current;
    if (!inner) return;

    const half = inner.scrollWidth / 2;
    offset.current += dir === "left" ? -STEP_PX : STEP_PX;

    // Sınırların dışına taşarsa sarmala (sonsuz döngü hissi buton için de geçerli)
    if (offset.current < 0) offset.current += half;
    if (offset.current >= half) offset.current -= half;

    // Kısa süreliğine CSS transition açıp otomatik akışı durdur, sonra devam ettir
    isTransitioning.current = true;
    inner.style.transition = "transform 0.4s ease";
    inner.style.transform = `translateX(${-offset.current}px)`;

    window.setTimeout(() => {
      if (inner) inner.style.transition = "";
      isTransitioning.current = false;
    }, 400);
  }
  // Sürükleme başladı — başlangıç noktasını ve o anki offset'i kaydet
function handleDragStart(clientX: number) {
  isDragging.current = true;
  dragStartX.current = clientX;
  dragStartOffset.current = offset.current;
  const inner = innerRef.current;
  if (inner) inner.style.transition = ""; // sürüklerken anlık takip etsin
}

// Parmak/mouse hareket ederken şeridi anlık kaydır
function handleDragMove(clientX: number) {
  if (!isDragging.current) return;
  const inner = innerRef.current;
  if (!inner) return;

  const delta = clientX - dragStartX.current;
  let next = dragStartOffset.current - delta;

  const half = inner.scrollWidth / 2;
  if (half > 0) {
    next = ((next % half) + half) % half;
  }

  offset.current = next;
  inner.style.transform = `translateX(${-offset.current}px)`;
}

function handleDragEnd() {
  isDragging.current = false;
}

  return (
    <div className="group/row relative">
      <button
        type="button"
        aria-label="Geriye kaydır"
        onClick={() => scrollByStep("left")}
        className="absolute left-1 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-300 hover:bg-black/80 group-hover/row:opacity-100"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="İleriye kaydır"
        onClick={() => scrollByStep("right")}
        className="absolute right-1 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-300 hover:bg-black/80 group-hover/row:opacity-100"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      {/* Sabit genişlikli görünen pencere — taşan kısmı gizler */}
      <div
        ref = {outerRef}
        onMouseEnter = {() => (isHovering.current = true)}
        onMouseLeave = {() => (isHovering.current = false)}
        // pointer events: hem mouse hem dokunmatik için tek API
        onPointerDown={(e) => handleDragStart(e.clientX)}
        onPointerMove={(e) => handleDragMove(e.clientX)}
        onPointerUp={handleDragEnd}
        onPointerLeave={handleDragEnd}
        onPointerCancel={handleDragEnd}
        // pan-y : dikey sayfa scrollu engellemesin, yatayi biz yönetiyoruz
        className="cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
      >
        {/* Gerçekte hareket eden şerit — transform ile kaydırılıyor */}
        <div ref={innerRef} className="flex w-max">
          <ImageGroup
            items={items}
            altPrefix={altPrefix}
            overrideSrc={overrideSrc}
            showDetail={showDetail}
            containImage={containImage}
          />
          {/* İkinci kopya → sonsuz döngü */}
          <ImageGroup
            items={items}
            altPrefix={altPrefix}
            overrideSrc={overrideSrc}
            showDetail={showDetail}
            containImage={containImage}
            duplicate
          />
        </div>
      </div>
    </div>
  );
}

export function HeroMarquee() {
  return (
    <div className="mx-auto mt-10 w-full max-w-5xl space-y-5 px-4">
      <MarqueeRow
        items={yarnImages}
        altPrefix="İplik"
        direction="right"
        overrideSrc={yarnTestSrc}
        showDetail={true}
        containImage={true}
      />
      <MarqueeRow
        items={plantImages}
        altPrefix="Tesis"
        direction="left"
        showDetail={false}
        containImage={false}
      />
    </div>
  );
}