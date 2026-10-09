"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

const POSTER = "/images/factory/fab-lab-poster.webp";
const SOURCE = "/videos/fab-lab.mp4";
/** Dosya 28 sn. Kapakta durur, mp4 inmeden de görünür. */
const DURATION = "00:28";

/**
 * Kapak durur. Play'e basılınca mp4 iner.
 * YouTube iframe'i Rusya'da açılmaz. Dosya kendi sitemizden geldiği için orada da izlenir.
 * Ses 0.5 ile başlar. volume HTML attribute değil, tıklanınca yazılır.
 */
export function LabVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    const video = videoRef.current;
    if (!video || started) return;
    // src tıklamadan yazılmaz. Sayfa açılışında 4.1 MB inmesin.
    video.src = SOURCE;
    video.volume = 0.5;
    void video.play();
    setStarted(true);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_22px_48px_-14px_rgba(0,0,0,0.72)]">
      {/* Gölge videoyu halenin üstünde, biraz önde tutar. */}
      <video
        ref={videoRef}
        className="size-full object-cover"
        controls={started}
        playsInline
        preload="none"
        poster={POSTER}
      />
      {started ? null : (
        <button
          type="button"
          onClick={start}
          aria-label="Videoyu oynat"
          className="absolute inset-0 flex items-center justify-center"
        >
          <img src={POSTER} alt="" className="absolute inset-0 size-full object-cover" />
          <span className="relative flex size-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg ring-4 ring-white/25">
            <Play className="ms-0.5 size-7 fill-current" aria-hidden="true" />
          </span>
          <span className="absolute bottom-3 start-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
            <Play className="size-3 fill-current" aria-hidden="true" />
            {DURATION}
          </span>
        </button>
      )}
    </div>
  );
}
