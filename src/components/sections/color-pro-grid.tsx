"use client";

import { useMemo, useRef, useState } from "react";
import { colorsFor, type ColorGroup } from "@/content/color-pro";
import type { ColorProCopy } from "@/i18n/color-pro-copy";

type FilterId = "all" | ColorGroup;

const filterIds: FilterId[] = ["all", "warm", "cool", "vivid", "neutral"];

type Phase = "idle" | "out" | "in";

/**
 * Cam yalnızca kart kutusunda. Renk örneği düz hex; tema onu değiştirmez.
 * Filtre: buton rengi kayar, kartlar solar, sonra yeni grup belirir.
 */
export function ColorProGrid({ copy }: { copy: ColorProCopy }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [shown, setShown] = useState<FilterId>("all");
  const [phase, setPhase] = useState<Phase>("idle");
  const lockRef = useRef(false);
  const colors = useMemo(() => colorsFor(shown), [shown]);
  const labels: Record<FilterId, string> = {
    all: copy.all,
    warm: copy.warm,
    cool: copy.cool,
    vivid: copy.vivid,
    neutral: copy.neutral,
  };

  function select(next: FilterId) {
    if (next === filter || lockRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Buton hemen kayar. Kart listesi solma bitince değişir.
    setFilter(next);

    if (reduceMotion) {
      setShown(next);
      return;
    }

    lockRef.current = true;
    setPhase("out");

    window.setTimeout(() => {
      setShown(next);
      setPhase("in");
      window.setTimeout(() => {
        setPhase("idle");
        lockRef.current = false;
      }, 440);
    }, 280);
  }

  const listClass =
    phase === "out" ? "omafil-color-out" : phase === "in" ? "omafil-color-in" : "";

  return (
    <div>
      <div className="mb-[17px] flex items-center justify-between gap-4">
        <h2 className="text-base font-medium">{copy.catalog}</h2>
        <span className="text-xs font-semibold text-[#163a6d] dark:text-[#f19000]">
          {copy.count}
        </span>
      </div>

      <div
        role="group"
        aria-label={copy.filtersAria}
        className="mb-[22px] flex w-full max-w-full flex-wrap gap-[3px] sm:w-fit sm:gap-[7px]"
      >
        {filterIds.map((id) => {
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => select(id)}
              className={
                active
                  ? "min-h-11 flex-1 rounded-[11px] border border-[#163a6d]/20 bg-[#163a6d]/6 px-2.5 text-xs font-semibold text-[#163a6d] transition-[color,background-color,border-color] duration-300 ease-out sm:flex-none sm:px-[17px] dark:border-[#f19000]/25 dark:bg-[#f19000]/10 dark:text-[#f19000]"
                  : "min-h-11 flex-1 rounded-[11px] border border-transparent px-2.5 text-xs text-[#596678] transition-[color,background-color,border-color] duration-300 ease-out sm:flex-none sm:px-[17px] dark:text-[#b2becd]"
              }
            >
              {labels[id]}
            </button>
          );
        })}
      </div>

      <ul
        key={shown}
        role="list"
        aria-label={copy.gridAria}
        className={`grid grid-cols-2 gap-[9px] min-[480px]:grid-cols-4 min-[480px]:gap-[14px] xl:grid-cols-6 ${listClass}`}
      >
        {colors.map((color) => (
          <li key={color.code} className="min-w-0">
            {/* Bulanıklık bu kutuda kalır. İçindeki örnek ve kod nettir. */}
            {/* Açıkta gece mavisi: beyaz zeminle karışmasın. Koyuda cam aynı kalır. */}
            <figure className="relative m-0 min-w-0 rounded-[13px] border border-[#1e355d] bg-gradient-to-br from-[#1e355d] to-[#12243c] p-[5px] pb-[9px] shadow-[0_10px_28px_rgba(18,36,60,0.22)] min-[480px]:rounded-[18px] min-[480px]:p-[7px] min-[480px]:pb-[11px] dark:border-white/20 dark:from-white/[0.07] dark:to-white/[0.024] dark:shadow-[0_10px_30px_rgba(0,0,0,0.21),inset_0_1px_1px_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(255,255,255,0.06)] dark:backdrop-blur-[38px] dark:backdrop-saturate-150">
              <div
                role="img"
                aria-label={`${color.code} ${copy.swatch}`}
                className="h-[78px] rounded-lg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.047)] min-[480px]:h-[102px] min-[480px]:rounded-[11px]"
                style={{ backgroundColor: color.hex }}
              />
              <figcaption className="px-0.5 pt-2 text-[11px] font-semibold tracking-[0.7px] text-white min-[480px]:px-[5px] min-[480px]:pt-2.5 min-[480px]:text-xs min-[480px]:tracking-[1.2px] dark:text-[#f19000]">
                {color.code}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
