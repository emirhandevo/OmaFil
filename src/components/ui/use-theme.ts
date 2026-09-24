"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import {
  applyResolvedTheme,
  cycleThemePreference,
  readAppliedTheme,
  readThemePreference,
  writeThemePreference,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

/**
 * Tema durumu. İlk boyamayı <head> scripti yapar.
 * Bu hook o sınıfı hydration silerse, boyamadan önce geri yazar.
 */
export function useTheme() {
  const [mode, setMode] = useState<ThemePreference>("auto");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");

  useLayoutEffect(() => {
    const pref = readThemePreference();
    const applied = readAppliedTheme();
    applyResolvedTheme(applied);
    setMode(pref);
    setResolved(applied);
  }, []);

  const setPreference = useCallback((preference: ThemePreference) => {
    const next = writeThemePreference(preference);
    applyResolvedTheme(next);
    setMode(preference);
    setResolved(next);
  }, []);

  const cycle = useCallback(() => {
    setPreference(cycleThemePreference(mode));
  }, [mode, setPreference]);

  return { mode, resolved, setPreference, cycle };
}
