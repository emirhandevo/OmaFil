/** Grup kimliği. Canlı, sıcak veya soğuk ile örtüşebilir. */
export type ColorGroup = "warm" | "cool" | "vivid" | "neutral";

export type YarnColor = {
  code: string;
  /** Fotoğraftan yaklaşık hex. Üretim rengi değildir. */
  hex: string;
  groups: ColorGroup[];
};

/**
 * Referanstaki 29 kod. Sıra, “Tümü” dışındaki filtrelerin sırasıdır.
 * Hex değerleri fotoğrafa göredir; pantone veya boya reçetesi değildir.
 */
export const yarnColors: YarnColor[] = [
  { code: "1110", hex: "#eeefea", groups: ["neutral"] },
  { code: "9010", hex: "#b9b7a9", groups: ["neutral"] },
  { code: "9120", hex: "#626e78", groups: ["neutral"] },
  { code: "9230", hex: "#263b3d", groups: ["neutral"] },
  { code: "9121", hex: "#42453f", groups: ["neutral"] },
  { code: "BLACK", hex: "#080c0b", groups: ["neutral"] },
  { code: "7320", hex: "#e7dfbc", groups: ["warm"] },
  { code: "7121", hex: "#c5b28c", groups: ["warm"] },
  { code: "7000", hex: "#c6bbab", groups: ["warm"] },
  { code: "7019", hex: "#d1b59c", groups: ["warm"] },
  { code: "7210", hex: "#bf9f8b", groups: ["warm"] },
  { code: "7220", hex: "#8e856b", groups: ["warm"] },
  { code: "5120", hex: "#76add0", groups: ["cool"] },
  { code: "5220", hex: "#079fb6", groups: ["cool", "vivid"] },
  { code: "5221", hex: "#407b8c", groups: ["cool"] },
  { code: "5140", hex: "#56647f", groups: ["cool"] },
  { code: "5230", hex: "#007dbb", groups: ["cool", "vivid"] },
  { code: "5540", hex: "#0b1828", groups: ["cool"] },
  { code: "3240", hex: "#f66b14", groups: ["warm", "vivid"] },
  { code: "4580", hex: "#f12d72", groups: ["warm", "vivid"] },
  { code: "3150", hex: "#f90827", groups: ["warm", "vivid"] },
  { code: "4340", hex: "#704283", groups: ["cool", "vivid"] },
  { code: "8450", hex: "#6b202d", groups: ["warm"] },
  { code: "7340", hex: "#30271c", groups: ["warm"] },
  { code: "1140", hex: "#f1f0ed", groups: ["neutral"] },
  { code: "2220", hex: "#efcd20", groups: ["warm", "vivid"] },
  { code: "5231", hex: "#0576ba", groups: ["cool", "vivid"] },
  { code: "6320", hex: "#79bf40", groups: ["cool", "vivid"] },
  { code: "6310", hex: "#123b2e", groups: ["cool"] },
];

/** WCAG göreli parlaklık. Açık renk 1’e, koyu renk 0’a yakındır. */
export function relativeLuminance(hex: string): number {
  const channels = hex.slice(1).match(/../g);
  if (!channels || channels.length < 3) return 0;
  const [red, green, blue] = channels.slice(0, 3).map((part) => {
    const value = Number.parseInt(part, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/** Tümü açıktan koyuya. Diğer gruplar listedeki sırayı korur. */
export function colorsFor(group: "all" | ColorGroup): YarnColor[] {
  if (group === "all") {
    return [...yarnColors].sort(
      (a, b) => relativeLuminance(b.hex) - relativeLuminance(a.hex),
    );
  }
  return yarnColors.filter((color) => color.groups.includes(group));
}
