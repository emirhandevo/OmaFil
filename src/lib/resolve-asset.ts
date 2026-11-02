import { assetMap } from "@/generated/asset-map";

/**
 * Panel ve kod /images/... yazar.
 * Ekrana giden adres, dosyanın içeriğinden üretilmiş kopyadır.
 * İçerik değişince adres değişir. ?v= tutmaya gerek kalmaz.
 */
export function resolveAsset(src: string): string {
  const bare = src.split("?")[0]?.trim() ?? "";
  if (!bare) return src;
  return assetMap[bare] ?? src;
}
