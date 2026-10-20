"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MP4 yalnızca hydrate sonrası DOM’a girer.
 * muted / playsInline sunucu HTML’i ile tarayıcı öznitelikleri
 * uyuşmazsa Next “hydration attributes” uyarısı basar.
 */
export function HeroVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const arm = () => window.setTimeout(() => setStart(true), 400);
    if (document.readyState === "complete") {
      const id = arm();
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", arm, { once: true });
    return () => window.removeEventListener("load", arm);
  }, [mounted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!start || !video) return;
    video.src = src;
    const play = () => {
      video.play().catch(() => {});
    };
    video.addEventListener("canplay", play, { once: true });
    video.load();
    return () => video.removeEventListener("canplay", play);
  }, [start, src]);

  if (!mounted) {
    return (
      <div
        className="pointer-events-none absolute inset-0 size-full bg-black"
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 size-full bg-black object-cover object-[60%_center] lg:origin-right lg:scale-[1.047] lg:object-center"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
    />
  );
}
