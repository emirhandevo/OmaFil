import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact, navLinks, site, socialLinks } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marka - mobilde ortalı, sm ve üstünde sola yaslı */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <Image
            src={site.logo}
            alt={site.name}
            width={160}
            height={30}
            className="h-auto w-36"
          />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Endüstriyel iplik üretiminde güvenilir çözüm ortağınız.
          </p>

          {/* Sosyal linkler — sadece ikon, isim ekran okuyucu için aria-label'da */}
<div className="mt-5 flex gap-3">
  {socialLinks.map((s) => {
    const Icon = s.icon;
    return (
      <a
        key={s.href}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.label}
        className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-brand-orange hover:text-brand-orange"
      >
        <Icon aria-hidden="true" className="size-4" />
      </a>
    );
  })}
</div>
         
        </div>

        {/* Menü - mobilde ortalı, sm ve üstünde sola yaslı */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-white">Menü</p>
          <ul className="mt-4 space-y-3">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim, telefon ve mail - mobilde ortalı  */}
<div className="flex flex-col items-center sm:items-start sm:text-left">
  <p className="text-sm font-semibold text-white">İletişim</p>
  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
    {contact.phone.map((phone) => (
      <li key={phone} className="flex items-center gap-2">
        <Phone aria-hidden="true" className="size-4 shrink-0 text-brand-orange" />
        <a href={`tel:${phone}`} className="hover:text-brand-orange">
          {phone}
        </a>
      </li>
    ))}
    <li className="flex items-center gap-2">
      <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-orange" />
      <a href={`mailto:${contact.email}`} className="hover:text-brand-orange">
        {contact.email}
      </a>
    </li>
  </ul>
</div>

{/* Adresler — ayrı kolon, her biri Maps'e link */}
<div>
  <p className="text-center text-sm font-semibold text-white">Adreslerimiz</p>
  <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
    {contact.locations.map((loc) => (
      <li key={loc.label} className="flex items-start gap-2">
        <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-orange" />
        <a
          href={loc.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-orange"
        >
          <span className="block font-medium text-white">{loc.label}</span>
          {loc.address}
        </a>
      </li>
    ))}
  </ul>
</div>
      </div>

      {/* Alt bar — telif hakkı */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}