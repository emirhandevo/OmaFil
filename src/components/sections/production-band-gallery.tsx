"use client";

import { useState } from "react";
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
}: {
  photos: Photo[];
  moreLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const visible = open ? photos : photos.slice(0, OPEN_COUNT);
  const rest = photos.length - OPEN_COUNT;

  return (
    <>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((photo, index) => (
          <div
            key={photo.src}
            className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={80}
              // İlk 4 kaydırınca iner. Sonrakiler ancak butonla DOM'a girince iner.
              loading={index < OPEN_COUNT ? "lazy" : "eager"}
              className="object-cover transition-transform duration-500 hover:scale-105 active:scale-105"
            />
          </div>
        ))}
      </div>

      {!open && rest > 0 ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-brand-orange hover:text-brand-orange active:border-brand-orange active:text-brand-orange"
          >
            {moreLabel}
          </button>
        </div>
      ) : null}
    </>
  );
}
