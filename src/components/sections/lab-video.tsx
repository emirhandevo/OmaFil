"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { resolveAsset } from "@/lib/resolve-asset";

type SubtitleChoice = "tr" | "en" | "off";

/** İngilizce sayfada English. Diğer dillerde Türkçe altyazı açık başlar. */
function defaultSubtitle(locale: string): SubtitleChoice {
  return locale === "en" ? "en" : "tr";
}

/** Altyazı kutusunun alt kenarını videonun altının biraz üstüne sabitler. Zaman değişmez. */
function placeCues(video: HTMLVideoElement) {
  for (let i = 0; i < video.textTracks.length; i++) {
    const cues = video.textTracks[i].cues;
    if (!cues) continue;
    for (let j = 0; j < cues.length; j++) {
      const cue = cues[j];
      if (!(cue instanceof VTTCue)) continue;
      if (cue.line === 72 && cue.snapToLines === false && cue.lineAlign === "end") continue;
      cue.snapToLines = false;
      cue.lineAlign = "end";
      // 72: yazının altı kontrol çubuğunun üstünde, ortaya kaçmadan durur.
      cue.line = 72;
      cue.size = 92;
      cue.position = 50;
      cue.align = "center";
    }
  }
}

/**
 * Kapak durur. Play'e basılınca mp4 iner.
 * YouTube iframe'i Rusya'da açılmaz. Dosya kendi sitemizden geldiği için orada da izlenir.
 * Ses 0.5 ile başlar. volume HTML attribute değil, tıklanınca yazılır.
 * Altyazı videoya gömülü değil. Dil değişince yalnızca track.mode güncellenir.
 * src / poster Keystatic → Fabrikamız bölümleri.
 */
export function LabVideo({
  src,
  poster,
  duration = "00:31",
  locale = "tr",
}: {
  src: string;
  poster: string;
  duration?: string;
  locale?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [choice, setChoice] = useState<SubtitleChoice>(() => defaultSubtitle(locale));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // currentTime ve oynatma durumuna dokunma. Aksi halde dil değişince video başa sarar.
    const apply = () => {
      const tracks = video.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        track.mode = track.language === choice ? "showing" : "disabled";
        track.removeEventListener("cuechange", place);
        track.addEventListener("cuechange", place);
      }
      place();
    };
    const place = () => placeCues(video);

    apply();
    video.textTracks.addEventListener("addtrack", apply);
    video.addEventListener("loadedmetadata", apply);
    video.addEventListener("loadeddata", apply);
    document.addEventListener("fullscreenchange", apply);
    return () => {
      video.textTracks.removeEventListener("addtrack", apply);
      video.removeEventListener("loadedmetadata", apply);
      video.removeEventListener("loadeddata", apply);
      document.removeEventListener("fullscreenchange", apply);
      const tracks = video.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].removeEventListener("cuechange", place);
      }
    };
  }, [choice]);

  function start() {
    const video = videoRef.current;
    if (!video || started) return;
    // src tıklamadan yazılmaz. Sayfa açılışında ağır mp4 inmesin.
    video.src = src;
    video.volume = 0.5;
    void video.play();
    setStarted(true);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_22px_48px_-14px_rgba(0,0,0,0.72)]">
      <style>{`
        .lab-video-el::cue {
          color: #fff;
          background-color: rgba(0, 0, 0, 0.78);
          font-size: 15px;
          line-height: 1.35;
        }
        @media (max-width: 640px) {
          .lab-video-el::cue {
            font-size: 14px;
          }
        }
        .lab-video-el:fullscreen::cue,
        .lab-video-el:-webkit-full-screen::cue {
          font-size: 32px;
          line-height: 1.4;
        }
        .lab-sub-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: none;
        }
      `}</style>
      {/* Gölge videoyu halenin üstünde, biraz önde tutar. */}
      <video
        ref={videoRef}
        className="lab-video-el size-full object-cover"
        controls={started}
        playsInline
        preload="none"
        poster={poster}
      >
        <track
          kind="subtitles"
          src={resolveAsset("/videos/omafil-tr.vtt")}
          srcLang="tr"
          label="Türkçe"
        />
        <track
          kind="subtitles"
          src={resolveAsset("/videos/omafil-en.vtt")}
          srcLang="en"
          label="English"
        />
      </video>
      {started ? null : (
        <button
          type="button"
          onClick={start}
          aria-label="Videoyu oynat"
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
          <span className="relative flex size-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg ring-4 ring-white/25">
            <Play className="ms-0.5 size-7 fill-current" aria-hidden="true" />
          </span>
          <span className="absolute bottom-3 start-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
            <Play className="size-3 fill-current" aria-hidden="true" />
            {duration}
          </span>
        </button>
      )}
      <label className="absolute end-3 top-3 z-20">
        <span className="sr-only">Altyazı</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 py-1.5 ps-3 pe-3 text-white focus-within:ring-2 focus-within:ring-white">
          <select
            value={choice}
            onChange={(event) => setChoice(event.target.value as SubtitleChoice)}
            className="lab-sub-select max-w-[42vw] bg-transparent text-xs font-medium text-white outline-none sm:max-w-none sm:text-sm"
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="off">Altyazı kapalı</option>
          </select>
          <ChevronDown className="size-3.5 shrink-0" aria-hidden="true" />
        </span>
      </label>
    </div>
  );
}
