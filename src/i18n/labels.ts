import type { Dictionary } from "@/i18n/dictionary";

/** Menü href → sözlük. GES ve Blog kasıtlı olarak aynı kalır. */
export function navLabel(href: string, dict: Dictionary): string {
  switch (href) {
    case "/":
      return dict.nav.home;
    case "/kurumsal":
      return dict.nav.corporate;
    case "/kurumsal/hakkimizda":
      return dict.nav.about;
    case "/kurumsal/fabrikamiz":
      return dict.nav.factory;
    case "/kurumsal/surdurulebilirlik":
      return dict.nav.sustainability;
    case "/kurumsal/insan-kaynaklari":
      return dict.nav.careers;
    case "/urunlerimiz":
      return dict.nav.products;
    case "/iletisim":
      return dict.nav.contact;
    case "/ges":
      return "GES";
    case "/blog":
      return "Blog";
    default:
      return href;
  }
}
