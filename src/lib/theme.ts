import {
  calculateAutoTheme,
  readResolvedTheme,
  readThemeMode,
  writeThemePreference as persistThemePreference,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme-calculator";

export type { ResolvedTheme, ThemePreference };

/** html.dark sınıfını yazar. */
export function applyResolvedTheme(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function readThemePreference(): ThemePreference {
  return readThemeMode();
}

/** auto → gündoğumu/günbatımı. light/dark olduğu gibi. */
export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "auto") return calculateAutoTheme();
  return preference;
}

/** Ekranda görünen tema. Script bunu localStorage'a yazmış olur. */
export function readAppliedTheme(): ResolvedTheme {
  return readResolvedTheme();
}

export function writeThemePreference(preference: ThemePreference): ResolvedTheme {
  return persistThemePreference(preference);
}

export function cycleThemePreference(current: ThemePreference): ThemePreference {
  if (current === "light") return "dark";
  if (current === "dark") return "auto";
  return "light";
}
