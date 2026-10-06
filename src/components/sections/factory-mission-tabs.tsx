"use client";

import { useState } from "react";

const tabs = [
  {
    id: "misyon",
    label: "Misyon",
    body: "Polimer endüstrisinin ihtiyaç duyduğu yüksek kaliteli ve teknik iplikleri, çevre dostu üretim yöntemleriyle sunmak. Müşterilerimizin üretim süreçlerine değer katan, sürdürülebilir ve inovatif çözümler geliştirmek.",
  },
  {
    id: "tarihce",
    label: "Tarihçe",
    body: "1999 yılında tekstil dünyasına adım atan grubumuz, geçen yıllar içinde teknolojiye ve insana yatırım yaparak istikrarlı bir şekilde büyüdü. OMA Tekstil bünyesinde edinilen derin bilgi birikimi, bugün OmaFil’in üretim gücüne dönüşüyor.",
  },
  {
    id: "vizyon",
    label: "Vizyon",
    body: "Sentetik iplik üretiminde teknolojiyi ve sürdürülebilirliği odağına alan, dünya çapında tercih edilen lider bir marka olmak. İnovatif Ar-Ge çalışmalarımızla tekstilin geleceğine yön veren çözümler üretmek.",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

/** Fabrikamız sayfası — Misyon / Tarihçe / Vizyon sekmeleri */
export function FactoryMissionTabs({
  labels,
  aria = "Kurumsal yön",
}: {
  labels?: { label: string; body: string }[];
  aria?: string;
}) {
  const rows = tabs.map((tab, i) => ({
    ...tab,
    label: labels?.[i]?.label ?? tab.label,
    body: labels?.[i]?.body ?? tab.body,
  }));
  const [active, setActive] = useState<TabId>("misyon");
  const current = rows.find((t) => t.id === active) ?? rows[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex border-b border-border" role="tablist" aria-label={aria}>
        {rows.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={`flex-1 px-3 py-3.5 text-sm font-semibold transition-colors sm:px-4 ${
                selected
                  ? "border-t-2 border-t-brand-orange bg-background text-foreground"
                  : "border-t-2 border-t-transparent bg-muted/40 text-muted-foreground hover:text-foreground active:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="px-5 py-6 sm:px-6 sm:py-7">
        <h3 className="text-lg font-semibold text-brand-navy dark:text-brand-orange">
          {current.label}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          {current.body}
        </p>
      </div>
    </div>
  );
}
