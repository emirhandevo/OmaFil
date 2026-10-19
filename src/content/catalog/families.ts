import type { ProductFamily } from "./types";

/** Filtre chip’leri — sabit UI (client-safe, Keystatic yok) */
export const productFamilies: { id: ProductFamily; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "nylon6", label: "Naylon 6" },
  { id: "nylon66", label: "Naylon 6,6" },
  { id: "polyester", label: "Polyester" },
];
