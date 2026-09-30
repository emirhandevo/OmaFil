"use client";

import {useEffect, useRef, useState} from "react";

/**
 * MP4 sayfa yüklenince bağlanır. İlk an siyah kalır; poster dosyası yok.
 * autoPlay baştan açık olursa tarayıcı 1.3 MB'ı hemen indirir.
 */
export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
      const arm = () => window.setTimeout(() => setStart(true), 400);
      if (document.readyState === "complete") {
        const id = arm();
        return () => window.clearTimeout(id);
      }
      window.addEventListener("load", arm, {once: true});
      return () => window.removeEventListener("load", arm);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!start || !video) return;
        video.src = "/videos/hero-web.mp4";
        const play = () => {
            video.play().catch(() => {});
        };
        video.addEventListener("canplay", play, {once:true});
        video.load();
        return () => video.removeEventListener("canplay", play);
    }, [start]);

    return (
        <video 
        ref={videoRef}
        className="pointer-events-none absolute inset-0 size-full bg-black object-cover object-[60%_center] lg:origin-right lg:scale-[1.047] lg:object-center"
        muted
        loop
        playsInline
        preload="none"
        />
    );
}