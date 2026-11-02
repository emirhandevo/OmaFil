import { reader } from "@/content/keystatic";
import {
  contact as contactFallback,
  site,
  socialLinks as socialFallback,
} from "@/config/site";
import { dictionaries } from "@/i18n/dictionary";
import { defaultLocale, type Locale } from "@/i18n/locales";
import { pickLocale } from "@/content/localized";
import { resolveAsset } from "@/lib/resolve-asset";

export type ContactLocation = {
  label: string;
  address: string;
  mapsUrl: string;
};

/** Client shell’e geçmek için serileştirilebilir (ikon yok) */
export type SocialNetwork = "instagram" | "linkedin" | "youtube";

export type SocialLinkData = {
  href: string;
  label: string;
  network: SocialNetwork;
};

export type ContactData = {
  email: string;
  phone: string[];
  locations: ContactLocation[];
  socialLinks: SocialLinkData[];
};

export type SiteSettingsData = {
  description: string;
  footerTagline: string;
  logo: string;
  logoDark: string;
  ogImage: string;
};

/** Ana sayfa hero. Video veya tek görsel. */
export type HeroMedia =
  | { kind: "video"; videoSrc: string; posterSrc: string }
  | { kind: "image"; imageSrc: string };

export type HeroData = {
  media: HeroMedia;
  eyebrow: string;
  title: string;
  body: string;
  productsCta: string;
  aboutCta: string;
};

const heroFallback: HeroData = {
  media: {
    kind: "video",
    videoSrc: resolveAsset("/videos/hero-web.mp4"),
    posterSrc: resolveAsset("/images/hero-lcp-black.webp"),
  },
  eyebrow: dictionaries.tr.hero.eyebrow,
  title: dictionaries.tr.hero.title,
  body: dictionaries.tr.hero.body,
  productsCta: dictionaries.tr.hero.productsCta,
  aboutCta: dictionaries.tr.hero.aboutCta,
};

function networkFromLabel(label: string): SocialNetwork | null {
  const n = label.toLowerCase();
  if (n.includes("instagram")) return "instagram";
  if (n.includes("linkedin")) return "linkedin";
  if (n.includes("youtube") || n.includes("youtu")) return "youtube";
  return null;
}

/**
 * İletişim singleton — yoksa site.ts fallback.
 * Footer / iletişim / kurumsal adresler buradan okur.
 */
export async function getContact(
  locale: Locale = defaultLocale,
): Promise<ContactData> {
  const data = await reader.singletons.contact.read().catch(() => null);
  if (!data) {
    return {
      email: contactFallback.email,
      phone: [...contactFallback.phone],
      locations: contactFallback.locations.map((l) => ({ ...l })),
      socialLinks: socialFallback.flatMap((s) => {
        const network = networkFromLabel(s.label);
        if (!network) return [];
        return [{ href: s.href, label: s.label, network }];
      }),
    };
  }

  const socialLinks: SocialLinkData[] = [];
  if (data.instagram) {
    socialLinks.push({
      href: data.instagram,
      label: "Instagram",
      network: "instagram",
    });
  }
  if (data.linkedin) {
    socialLinks.push({
      href: data.linkedin,
      label: "LinkedIn",
      network: "linkedin",
    });
  }
  if (data.youtube) {
    socialLinks.push({
      href: data.youtube,
      label: "Youtube",
      network: "youtube",
    });
  }

  return {
    email: data.email,
    phone: data.phones.length
      ? [...data.phones]
      : [...contactFallback.phone],
    locations: data.locations.length
      ? data.locations.map((l) => {
          const names = pickLocale(
            l.labels as Parameters<typeof pickLocale>[0],
            locale,
          );
          return {
            label: names?.name?.trim() || l.label,
            address: l.address,
            mapsUrl: l.mapsUrl,
          };
        })
      : contactFallback.locations.map((l) => ({ ...l })),
    socialLinks: socialLinks.length
      ? socialLinks
      : socialFallback.flatMap((s) => {
          const network = networkFromLabel(s.label);
          if (!network) return [];
          return [{ href: s.href, label: s.label, network }];
        }),
  };
}

/** Ana sayfa hero. Metin dil bloğundan; boş alan TR’ye düşer. */
export async function getHero(locale: Locale = defaultLocale): Promise<HeroData> {
  const data = await reader.singletons.hero.read().catch(() => null);
  if (!data) return heroFallback;

  const text = pickLocale(data.copy, locale);

  const copy = {
    eyebrow: text?.eyebrow?.trim() || heroFallback.eyebrow,
    title: text?.title?.trim() || heroFallback.title,
    body: text?.body?.trim() || heroFallback.body,
    productsCta: text?.productsCta?.trim() || heroFallback.productsCta,
    aboutCta: text?.aboutCta?.trim() || heroFallback.aboutCta,
  };

  if (data.media.discriminant === "video") {
    return {
      ...copy,
      media: {
        kind: "video",
        videoSrc: resolveAsset(
          data.media.value.videoSrc.trim() || "/videos/hero-web.mp4",
        ),
        posterSrc: resolveAsset(
          data.media.value.posterSrc.trim() || "/images/hero-lcp-black.webp",
        ),
      },
    };
  }

  return {
    ...copy,
    media: {
      kind: "image",
      imageSrc: resolveAsset(
        data.media.value.imageSrc.trim() || "/images/hero-lcp-black.webp",
      ),
    },
  };
}

/** Site ayarları singleton — SEO + footer sloganı, dil dil. */
export async function getSiteSettings(
  locale: Locale = defaultLocale,
): Promise<SiteSettingsData> {
  const data = await reader.singletons.siteSettings.read().catch(() => null);
  const text = pickLocale(data?.copy, locale);
  return {
    description: text?.description?.trim() || site.description,
    footerTagline:
      text?.footerTagline?.trim() ||
      "Endüstriyel iplik üretiminde güvenilir çözüm ortağınız.",
    logo: resolveAsset(data?.logo?.trim() || site.logo),
    logoDark: resolveAsset(data?.logoDark?.trim() || site.logoDark),
    ogImage: resolveAsset(data?.ogImage?.trim() || "/images/og.webp"),
  };
}
