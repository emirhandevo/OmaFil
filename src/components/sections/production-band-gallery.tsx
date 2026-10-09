"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Açıkta duran kare sayısı. Geri kalanı butona kadar render edilmez, o yüzden inmez. */
const OPEN_COUNT = 4;

type Photo = {
  src: string;
  alt: string;
};

export function ProductionBandGallery({
  photos,
  moreLabel,
  lessLabel,
}: {
  photos: Photo[];
  moreLabel: string;
  lessLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const visible = open ? photos : photos.slice(0, OPEN_COUNT);
  const rest = photos.length - OPEN_COUNT;

  // Kapanınca sayfa alta boşalır. Izgaranın başına dön ki buton görünsün.
  useEffect(() => {
    if (wasOpen.current && !open) {
      gridRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    wasOpen.current = open;
  }, [open]);

  if (rest <= 0) {
    return (
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo) => (
          <BandPhoto key={photo.src} photo={photo} eager={false} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div ref={gridRef} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((photo, index) => (
          <BandPhoto key={photo.src} photo={photo} eager={index >= OPEN_COUNT} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-brand-orange hover:text-brand-orange active:border-brand-orange active:text-brand-orange"
        >
          {open ? lessLabel : moreLabel}
        </button>
      </div>
    </>
  );
}

function BandPhoto({ photo, eager }: { photo: Photo; eager: boolean }) {
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-muted">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        quality={80}
        // İlk 4 kaydırınca iner. Sonrakiler ancak butonla DOM'a girince iner.
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-500 hover:scale-105 active:scale-105"
      />
    </div>
  );
}
