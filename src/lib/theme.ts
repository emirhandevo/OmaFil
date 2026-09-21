/** Kullanıcının seçtiği tema tercihi */
export type ThemePreference = "light" | "dark" | "auto";

const STORAGE_KEY = "theme";

/** Gündüz: 07:00–18:59 light, gece dark (yerel saat) */
export function resolveAutoTheme(date = new Date()): "light" | "dark" {
  const hour = date.getHours();
  return hour >= 7 && hour < 19 ? "light" : "dark";
}

/** Tercih → gerçek light/dark */
export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "auto") return resolveAutoTheme();
  return preference;
}

export function readThemePreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "auto") {
      return stored;
    }
  } catch {
    // private mode vb.
  }
  // Kayıt yoksa saate göre
  return "auto";
}

export function writeThemePreference(preference: ThemePreference) {
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // ignore
  }
}

/** html.dark class’ını uygular */
export function applyResolvedTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function cycleThemePreference(
  current: ThemePreference,
): ThemePreference {
  if (current === "light") return "dark";
  if (current === "dark") return "auto";
  return "light";
}
