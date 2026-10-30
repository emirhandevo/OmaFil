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
    let dead = false;
    let timer = 0;
    let poll = 0;
    let obs: PerformanceObserver | null = null;

    function startNow() {
      if (!dead) setStart(true);
    }

    // Masaüstü: load'dan 400ms sonra. Telefon: görseller susunca.
    function arm() {
      const phone = window.matchMedia("(max-width: 1023px)").matches;
      if (!phone) {
        timer = window.setTimeout(startNow, 400);
        return;
      }

      // Yeni img bitene kadar video src'si yazılmaz. 4 sn'de yine başlar.
      let lastImageAt = performance.now();
      const begun = lastImageAt;
      try {
        obs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // resource gözlemi PerformanceResourceTiming döner. Düz PerformanceEntry'de bu alan yok.
            if (!(entry instanceof PerformanceResourceTiming)) continue;
            if (entry.initiatorType === "img") lastImageAt = performance.now();
          }
        });
        obs.observe({ type: "resource" });
      } catch {
        obs = null;
      }

      poll = window.setInterval(() => {
        const now = performance.now();
        const quiet = now - lastImageAt >= 700;
        const capped = now - begun >= 4000;
        if (!quiet && !capped) return;
        window.clearInterval(poll);
        obs?.disconnect();
        startNow();
      }, 200);
    }

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      dead = true;
      window.removeEventListener("load", arm);
      window.clearTimeout(timer);
      window.clearInterval(poll);
      obs?.disconnect();
    };
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
