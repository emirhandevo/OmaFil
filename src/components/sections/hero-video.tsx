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
    let lcpImg: HTMLImageElement | null = null;
    const begun = performance.now();

    function startNow() {
      if (dead) return;
      dead = true;
      setStart(true);
    }

    // Masaüstü: sayfa yüklenince 400ms. Telefon: LCP kartının load'u.
    function onDesktopLoad() {
      timer = window.setTimeout(startNow, 400);
    }

    function arm() {
      const phone = window.matchMedia("(max-width: 1023px)").matches;
      if (!phone) {
        if (document.readyState === "complete") onDesktopLoad();
        else window.addEventListener("load", onDesktopLoad, { once: true });
        return;
      }

      const found = document.querySelector("img[data-hero-lcp]");
      if (!(found instanceof HTMLImageElement)) {
        // Kart henüz DOM'da yoksa kısa aralıkla tekrar bak. 8 sn'de video yine başlar.
        if (performance.now() - begun >= 8000) {
          startNow();
          return;
        }
        timer = window.setTimeout(arm, 100);
        return;
      }
      lcpImg = found;
      if (found.complete && found.naturalWidth > 0) {
        startNow();
        return;
      }
      found.addEventListener("load", startNow, { once: true });
      found.addEventListener("error", startNow, { once: true });
      timer = window.setTimeout(startNow, 8000);
    }

    arm();

    return () => {
      dead = true;
      window.removeEventListener("load", onDesktopLoad);
      window.clearTimeout(timer);
      lcpImg?.removeEventListener("load", startNow);
      lcpImg?.removeEventListener("error", startNow);
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
