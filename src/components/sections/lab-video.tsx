"use client";

import { useEffect, useRef } from "react";

/**
 * Laboratuvar videosu. Ses 0.5 (%50) ile açılır.
 * volume HTML attribute değil; sadece element üzerinde JS ile yazılır.
 * Kullanıcı kontrollerden yükseltirse bir daha ezilmez.
 */
export function LabVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = 0.5;
  }, []);

  return (
    <video
      ref={videoRef}
      className="aspect-video w-4/5 shrink-0 rounded-2xl border border-border bg-black lg:w-1/2"
      controls
      playsInline
      preload="none"
      poster="/images/factory/fab-lab-poster.webp"
    >
      <source src="/videos/fab-lab.mp4" type="video/mp4" />
    </video>
  );
}
