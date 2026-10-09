"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

const POSTER = "/images/factory/fab-lab-poster.webp";
const SOURCE = "/videos/fab-lab.mp4";

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
    <div className="relative aspect-video w-4/5 shrink-0 overflow-hidden rounded-2xl border border-border bg-black lg:w-1/2">
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
          <span className="relative flex size-14 items-center justify-center rounded-full bg-brand-orange text-white">
            <Play className="ms-0.5 size-6 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
