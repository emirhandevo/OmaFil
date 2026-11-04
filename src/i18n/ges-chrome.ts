import { gesErbaaRoof, gesPortfolioTotals } from "@/content/ges-sites";
import { getInner } from "@/i18n/inner";
import { htmlLang, type Locale } from "@/i18n/locales";

/**
 * GES client bileşenlerinin ihtiyacı olan düz metinler.
 * capacity ve roofLead fonksiyon; RSC onları client'a taşıyamaz.
 * Sunucu sayılarla cümleyi kurar, client sadece string alır.
 * tr için null: ekran Türkçe yedeğe düşer.
 */
export type GesChrome = {
  capacityTitle: string;
  capacityText: string;
  metrics: string[];
  metricAlts: string[];
  sitesTitle: string;
  sitesLead: string;
  fieldHeading: string;
  roofHeading: string;
  roofLead: string;
  capacityLabel: string;
  panelLabel: string;
  daily: string;
  roofStatus: string;
  fieldStatus: string;
  photo: string;
  close: string;
  prev: string;
  next: string;
};

export function buildGesChrome(locale: Locale): GesChrome | null {
  const t = getInner(locale);
  if (!t) return null;

  const num = htmlLang(locale);
  const ges = t.ges;

  return {
    capacityTitle: ges.capacityTitle,
    capacityText: ges.capacity({
      total: gesPortfolioTotals.all.capacityMwp.toLocaleString(num),
      elazig: String(gesPortfolioTotals.elazig.capacityMwp),
      erbaa: String(gesPortfolioTotals.erbaa.capacityMwp),
      min: (gesPortfolioTotals.all.annualKwhMin / 1_000_000).toLocaleString(num),
      max: (gesPortfolioTotals.all.annualKwhMax / 1_000_000).toLocaleString(num),
    }),
    metrics: ges.metrics,
    metricAlts: ges.metricAlts,
    sitesTitle: ges.sitesTitle,
    sitesLead: ges.sitesLead,
    fieldHeading: ges.fieldHeading,
    roofHeading: ges.roofHeading,
    roofLead: ges.roofLead({
      mwp: String(gesErbaaRoof.capacityMwp),
      kw: gesErbaaRoof.capacityKw.toLocaleString(num),
      min: gesErbaaRoof.dailyKwhMin.toLocaleString(num),
      max: gesErbaaRoof.dailyKwhMax.toLocaleString(num),
    }),
    capacityLabel: ges.capacityLabel,
    panelLabel: ges.panelLabel,
    daily: ges.daily,
    roofStatus: ges.roofStatus,
    fieldStatus: ges.fieldStatus,
    photo: ges.photo,
    close: ges.close,
    prev: ges.prev,
    next: ges.next,
  };
}
