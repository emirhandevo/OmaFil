"use client";

import { Moon, Sun } from "lucide-react";
import { useCopy } from "@/components/i18n/locale-provider";
import { useTheme } from "@/components/ui/use-theme";
import type { ThemePreference } from "@/lib/theme";

/**
 * Ufuk çizgisinin üstünde güneş.
 * SunMoon “sistem teması” gibi okunuyordu; bu ikon gündoğumunu anlatır.
 */
function SunriseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 19h16" />
      <path d="M8 19a4 4 0 0 1 8 0" />
      <path d="M12 9v2" />
      <path d="M7.2 13.2 8.6 14.6" />
      <path d="M16.8 13.2 15.4 14.6" />
    </svg>
  );
}

/**
 * light → dark → auto → light
 * auto: gündoğumu–günbatımı. Sabit 07–19 aralığı yok.
 */
export function ThemeToggle() {
  const copy = useCopy();
  const { mode, resolved, cycle } = useTheme();
  const labels: Record<ThemePreference, string> = {
    light: copy.chrome.themeLight,
    dark: copy.chrome.themeDark,
    auto: copy.chrome.themeAuto,
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={labels[mode]}
      className="group relative flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
    >
      {mode === "auto" ? (
        <SunriseIcon />
      ) : resolved === "dark" ? (
        <Moon className="size-5" aria-hidden="true" />
      ) : (
        <Sun className="size-5" aria-hidden="true" />
      )}
      {/* Yerel title gecikmeli. Auto modda cümle hemen görünsün. */}
      {mode === "auto" ? (
        <span
          role="tooltip"
          className="pointer-events-none absolute top-full right-0 z-50 mt-2 hidden w-max max-w-sm rounded-lg bg-brand-navy px-2.5 py-1.5 text-left text-xs leading-5 font-medium text-white shadow-lg group-hover:block group-focus-visible:block"
        >
          {labels.auto}
        </span>
      ) : null}
    </button>
  );
}
