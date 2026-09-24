"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useCopy } from "@/components/i18n/locale-provider";
import { useTheme } from "@/components/ui/use-theme";
import type { ThemePreference } from "@/lib/theme";

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
      title={labels[mode]}
      className="flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
    >
      {mode === "auto" ? (
        <SunMoon className="size-5" aria-hidden="true" />
      ) : resolved === "dark" ? (
        <Moon className="size-5" aria-hidden="true" />
      ) : (
        <Sun className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
