"use client";

import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy, useLocale } from "@/components/i18n/locale-provider";
import { contact as siteContact, navLinks, site } from "@/config/site";
import { SiteLogo } from "@/components/ui/layout/site-logo";
import { MailLink } from "@/components/ui/mail-link";
import type { ContactData, SocialNetwork } from "@/content/cms";
import { localizePath } from "@/i18n/locales";
import { navLabel } from "@/i18n/labels";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/icons/social-icons";

// CMS etiketleri Türkçe kalır. Sıra ui.ts placeKeys ile aynı olmalı.
const placeKeys = [
  "Genel Merkez",
  "Fabrika / Üretim Tesisi",
  "Fabrika Satış Noktası",
] as const;

function placeName(label: string, places: readonly [string, string, string]) {
  const index = placeKeys.indexOf(label as (typeof placeKeys)[number]);
  if (index < 0) return label;
  return places[index];
}

type FooterProps = {
  contact: ContactData;
  footerTagline: string;
  logo: string;
  logoDark: string;
  places: readonly [string, string, string];
};

const socialIcons: Record<
  SocialNetwork,
  typeof InstagramIcon
> = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

export function Footer({
  contact,
  footerTagline,
  logo,
  logoDark,
  places,
}: FooterProps) {
  const copy = useCopy();
  const locale = useLocale();

  return (
    <footer className="site-footer mt-auto border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marka - mobilde ortalı, sm ve üstünde sola yaslı */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          {/* Header ile aynı: logo ana sayfaya gider. Dil öneki LocaleLink'te eklenir. */}
          <LocaleLink href="/" className="inline-flex">
            <SiteLogo className="h-auto w-36" src={logo} srcDark={logoDark} />
          </LocaleLink>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {footerTagline}
          </p>

          {/* Sosyal linkler — sadece ikon, isim ekran okuyucu için aria-label'da */}
          <div className="mt-5 flex gap-3">
            {contact.socialLinks.map((s) => {
              const Icon = socialIcons[s.network];
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange active:border-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Menü - mobilde ortalı, sm ve üstünde sola yaslı */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-foreground">{copy.footer.menu}</p>
          <ul className="mt-4 space-y-3">
            {navLinks.map((item) => (
              <li key={item.href}>
                <LocaleLink
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand-orange hover:underline hover:underline-offset-2 active:text-brand-orange active:underline active:underline-offset-2"
                >
                  {navLabel(item.href, copy)}
                </LocaleLink>
              </li>
            ))}
            <li>
              {/* Düz <a>: sayfa geçişi bu tıklamayı yutmasın, /kvkk tam açılsın. */}
              <a
                href={localizePath("/kvkk", locale)}
                data-no-transition=""
                className="block py-1 text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-brand-orange active:text-brand-orange"
              >
                {copy.chrome.kvkk}
              </a>
            </li>
          </ul>
        </div>

        {/* Başlık sütunun sol kenarında kalır. Telefon ve mail, başlık yazısının ortasına hizalanır. */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="relative w-fit">
            <p className="text-sm font-semibold text-foreground">{copy.footer.contact}</p>
            {/* lg’de liste sütundan taşıyor. z-10: alttaki kolon tıklamayı yutmasın. */}
            <ul className="relative z-10 mt-4 flex w-max flex-col items-center space-y-3 text-sm text-muted-foreground lg:absolute lg:left-1/2 lg:top-full lg:-translate-x-1/2">
              {contact.phone.map((phone) => (
                <li key={phone} className="flex items-center justify-center gap-2">
                  <Phone
                    aria-hidden="true"
                    className="size-4 shrink-0 text-brand-orange"
                  />
                  <a
                    href={`tel:${phone}`}
                    className="text-foreground/80 transition-colors hover:text-brand-orange hover:underline hover:underline-offset-2 active:text-brand-orange active:underline active:underline-offset-2"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              {/* Telefonun altı, e-postanın üstü. */}
              <li className="flex items-center justify-center gap-2">
                <Printer
                  aria-hidden="true"
                  className="size-4 shrink-0 text-brand-orange"
                />
                <a
                  href={`tel:${siteContact.fax}`}
                  aria-label={`Faks ${siteContact.fax}`}
                  className="text-foreground/80 transition-colors hover:text-brand-orange hover:underline hover:underline-offset-2 active:text-brand-orange active:underline active:underline-offset-2"
                >
                  {siteContact.fax}
                </a>
              </li>
              <li>
                <MailLink
                  email={contact.email}
                  subject={copy.footer.contact}
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-brand-orange hover:underline hover:underline-offset-2 active:text-brand-orange active:underline active:underline-offset-2"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4 shrink-0 text-brand-orange"
                  />
                  {contact.email}
                </MailLink>
              </li>
            </ul>
          </div>
          {/* lg’de liste akışın dışında. Telefon, faks ve mail için üç satırlık yer. */}
          <div className="hidden h-[calc(1rem+3*1.25rem+2*0.75rem)] lg:block" aria-hidden="true" />
        </div>

        {/* Adresler — ayrı kolon, her biri Maps'e link */}
        <div>
          <p className="text-center text-sm font-semibold text-foreground">
            {copy.footer.addresses}
          </p>
          <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
            {contact.locations.map((loc) => (
              <li key={loc.label} className="flex items-start gap-2">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-brand-orange"
                />
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/75 transition-colors hover:text-brand-orange active:text-brand-orange"
                >
                  <span className="block font-medium text-foreground">
                    {placeName(loc.label, places)}
                  </span>
                  {loc.address}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alt bar — telif hakkı */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.legalName}. {copy.footer.rights}
        </div>
      </div>
    </footer>
  );
}
