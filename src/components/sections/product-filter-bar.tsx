"use client";

import { useRouter } from "next/navigation";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy, useLocale } from "@/components/i18n/locale-provider";
import { productFamilies } from "@/content/catalog/families";
import type { ProductFamily } from "@/content/catalog/types";
import { localizePath } from "@/i18n/locales";
import { storeProductFamily } from "@/components/sections/products-browse";

// Geniş ekranda text-sm / px-4. Daraldıkça cqw ile küçülür, satır taşmaz.
const chipSize =
  "whitespace-nowrap px-[clamp(0.35rem,1.5cqw,1rem)] py-[clamp(0.28rem,0.85cqw,0.5rem)] text-[clamp(0.65rem,2.45cqw,0.875rem)] leading-tight";

const chipIdle = `${chipSize} rounded-full border border-white/15 bg-[#1e355d]/80 font-medium text-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#f19000]/50 hover:bg-[#1e355d] active:border-[#f19000]/50 active:bg-[#1e355d] disabled:opacity-60`;

const chipOn = `${chipSize} rounded-full bg-[#f19000] font-semibold text-white shadow-md shadow-[#f19000]/30 transition-all duration-300`;

const pipe =
  "shrink-0 select-none text-[clamp(0.9rem,2.8cqw,1.25rem)] leading-none text-[#1e355d] dark:text-white/85";

/**
 * Ürün ailesi şeridi. Color Pro seçiliyken aileler listeye geri götürür.
 */
export function ProductFilterBar({
  activeFamily,
  colorProActive = false,
  disabled = false,
  onFamily,
}: {
  activeFamily: ProductFamily | null;
  colorProActive?: boolean;
  disabled?: boolean;
  onFamily?: (next: ProductFamily) => void;
}) {
  const copy = useCopy();
  const locale = useLocale();
  const router = useRouter();

  function pickFamily(next: ProductFamily) {
    if (onFamily) {
      onFamily(next);
      return;
    }
    storeProductFamily(next);
    router.push(localizePath("/urunlerimiz", locale));
  }

  return (
    // Tek satır, kaydırma yok. @container yazı boyutunu şerit genişliğine bağlar.
    <div className="@container w-full min-w-0">
      <div className="flex w-full min-w-0 flex-nowrap items-center gap-[clamp(0.2rem,0.9cqw,0.5rem)]">
        <div
          className="flex min-w-0 flex-nowrap items-center gap-[clamp(0.2rem,0.9cqw,0.5rem)]"
          role="tablist"
          aria-label={copy.chrome.familyAria}
        >
          {productFamilies.map((family) => {
            const active = !colorProActive && activeFamily === family.id;
            return (
              <button
                key={family.id}
                type="button"
                role="tab"
                aria-selected={active}
                disabled={disabled}
                onClick={() => pickFamily(family.id)}
                className={active ? chipOn : chipIdle}
              >
                {family.id === "all" ? copy.products.all : family.label}
              </button>
            );
          })}
        </div>
        <span aria-hidden="true" className={pipe}>
          |
        </span>
        <LocaleLink
          href="/omafil-color-pro"
          aria-current={colorProActive ? "page" : undefined}
          className={colorProActive ? chipOn : chipIdle}
        >
          OmaFil Color Pro
        </LocaleLink>
        <span aria-hidden="true" className={pipe}>
          |
        </span>
      </div>
    </div>
  );
}
