import { Mail, MapPin, Phone } from "lucide-react";
import { contact, site, socialLinks } from "@/config/site";
import { ContactForm } from "@/components/sections/contact-form";

function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/**
 * İletişim sayfası gövdesi.
 * Telefon, mail, adresler site.ts → contact’tan gelir.
 */
export function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    email: contact.email,
    telephone: contact.phone,
    url: site.url,
    address: contact.locations.map((place) => ({
      "@type": "PostalAddress",
      name: place.label,
      streetAddress: place.address,
      addressCountry: "TR",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Üst: marka + kısa giriş */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(241,144,0,0.18),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-brand-navy/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 sm:pt-20 sm:pb-16">
          <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
            İletişim
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Bize ulaşın
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Numune, teklif veya genel sorularınız için mail atabilir ya da bizi
            arayabilirsiniz.
          </p>
        </div>
      </section>

      {/* Orta: form + hızlı kanallar */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Mesaj gönderin</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Formu doldurun; mesajınız doğrudan bize ulaşır.
          </p>
          <div className="mt-8 rounded-3xl border border-border bg-card/60 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Hızlı iletişim</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Doğrudan arayın veya e-posta atın.
            </p>
          </div>

          <ul className="space-y-3">
            {contact.phone.map((phone) => (
              <li key={phone}>
                <a
                  href={telHref(phone)}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-brand-orange hover:bg-brand-orange/[0.04]"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange transition-transform group-hover:scale-105">
                    <Phone aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Telefon
                    </span>
                    <span className="mt-0.5 block font-semibold">{phone}</span>
                  </span>
                </a>
              </li>
            ))}

            <li>
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-brand-orange hover:bg-brand-orange/[0.04]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue transition-transform group-hover:scale-105">
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    E-posta
                  </span>
                  <span className="mt-0.5 block font-semibold">{contact.email}</span>
                </span>
              </a>
            </li>
          </ul>

          <div className="rounded-2xl border border-border bg-brand-navy px-5 py-6 text-white">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
              Sosyal
            </p>
            <p className="mt-2 text-sm text-white/75">
              Güncel üretim ve marka paylaşımları.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand-orange hover:text-brand-orange"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </aside>
      </section>

      {/* Alt: üç adres */}
      <section
        className="border-t border-border bg-muted/30 py-14 sm:py-20"
        aria-labelledby="locations-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="locations-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Adreslerimiz
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Her konum Google Maps’te açılır. Bilgiler footer ile aynı kaynaktan
            gelir.
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {contact.locations.map((place) => (
              <li key={place.label}>
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange hover:bg-brand-orange/[0.03] hover:shadow-sm"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{place.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {place.address}
                  </p>
                  <span className="mt-5 text-sm font-medium text-brand-orange">
                    Haritada aç →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
