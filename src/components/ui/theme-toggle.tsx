"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import {
  applyResolvedTheme,
  cycleThemePreference,
  readThemePreference,
  resolveTheme,
  writeThemePreference,
  type ThemePreference,
} from "@/lib/theme";

const labels: Record<ThemePreference, string> = {
  light: "Açık tema (tıkla: koyu)",
  dark: "Koyu tema (tıkla: saate göre)",
  auto: "Saate göre tema (tıkla: açık)",
};

/**
 * light → dark → auto → light
 * auto: 07–19 açık, diğer saatler koyu
 */
export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  // İlk mount + tercih değişince uygula
  useEffect(() => {
    const pref = readThemePreference();
    const next = resolveTheme(pref);
    applyResolvedTheme(next);
    setPreference(pref);
    setResolved(next);
  }, []);

  // Auto modundayken saat sınırı geçince güncelle (sekme açık kalırsa)
  useEffect(() => {
    if (preference !== "auto") return;

    function syncAuto() {
      const next = resolveTheme("auto");
      applyResolvedTheme(next);
      setResolved(next);
    }

    const id = window.setInterval(syncAuto, 60_000);
    document.addEventListener("visibilitychange", syncAuto);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", syncAuto);
    };
  }, [preference]);

  function cycle() {
    const nextPref = cycleThemePreference(preference);
    const nextResolved = resolveTheme(nextPref);
    writeThemePreference(nextPref);
    applyResolvedTheme(nextResolved);
    setPreference(nextPref);
    setResolved(nextResolved);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={labels[preference]}
      title={labels[preference]}
      className="flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
    >
      {preference === "auto" ? (
        <SunMoon className="size-5" aria-hidden="true" />
      ) : resolved === "dark" ? (
        <Moon className="size-5" aria-hidden="true" />
      ) : (
        <Sun className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
