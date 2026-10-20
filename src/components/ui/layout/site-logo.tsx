import Image from "next/image";
import { site } from "@/config/site";

type SiteLogoProps = {
  className: string;
  /** Header'da ilk boyamada logo gecikmesin. Footer'da gerekmez. */
  priority?: boolean;
  /** Keystatic Site ayarları. Yoksa site.ts. */
  src?: string;
  srcDark?: string;
};

/**
 * Açık temada mevcut logo, dark temada renkli dark logo.
 * İkisi de DOM'da durur. html.dark sınıfı hangisinin görüneceğini seçer.
 * Böylece tema ilk boyamada doğru logo ile gelir.
 */
export function SiteLogo({
  className,
  priority = false,
  src,
  srcDark,
}: SiteLogoProps) {
  return (
    <>
      <Image
        src={src || site.logo}
        alt={site.name}
        width={270}
        height={50}
        priority={priority}
        className={`${className} dark:hidden`}
      />
      <Image
        src={srcDark || site.logoDark}
        alt={site.name}
        width={1874}
        height={462}
        priority={priority}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
