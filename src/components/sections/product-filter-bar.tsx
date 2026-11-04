"use client";

import { useRouter } from "next/navigation";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy, useLocale } from "@/components/i18n/locale-provider";
import { productFamilies } from "@/content/catalog/families";
import type { ProductFamily } from "@/content/catalog/types";
import { localizePath } from "@/i18n/locales";
import { storeProductFamily } from "@/components/sections/products-browse";

const chipIdle =
  "rounded-full border border-white/15 bg-[#1e355d]/80 px-4 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#f19000]/50 hover:bg-[#1e355d] active:border-[#f19000]/50 active:bg-[#1e355d] disabled:opacity-60";

const chipOn =
  "rounded-full bg-[#f19000] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#f19000]/30 transition-all duration-300";

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
    <div className="flex flex-wrap items-center gap-2">
      <div
        className="flex flex-wrap gap-2"
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
      <svg
        viewBox="0 0 16 36"
        aria-hidden="true"
        className="mx-1 h-8 w-3 shrink-0 text-[#1e355d] dark:text-white/85"
      >
        <line
          x1="13"
          y1="2"
          x2="3"
          y2="34"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      </svg>
      <LocaleLink
        href="/omafil-color-pro"
        aria-current={colorProActive ? "page" : undefined}
        className={colorProActive ? chipOn : chipIdle}
      >
        OmaFil Color Pro
      </LocaleLink>
    </div>
  );
}
