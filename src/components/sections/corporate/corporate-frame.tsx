import Link from "next/link";
import { corporateLinks, site } from "@/config/site";

type CorporateFrameProps = {
  // Hangi alt sayfa açık. Hub'da "/kurumsal".
  path: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

/**
 * Kurumsal alt sayfalarının ortak başlığı.
 * H1 tek. Menü ve breadcrumb her sayfada tekrar yazılmaz.
 */
export function CorporateFrame({ path, title, description, children }: CorporateFrameProps) {
  const crumbs = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Kurumsal", href: "/kurumsal" },
    ...(path === "/kurumsal" ? [] : [{ name: title, href: path }]),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:pt-20">
        <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
          Kurumsal
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="text-body mt-5 max-w-2xl text-lg leading-8">{description}</p>

        <nav aria-label="Kurumsal sayfalar" className="mt-8 flex flex-wrap gap-2">
          {corporateLinks.map((item) => {
            const active = item.href === path;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-sm"
                    : "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:border-brand-orange hover:text-brand-orange"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </section>

      {children}
    </>
  );
}
