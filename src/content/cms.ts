import { reader } from "@/content/keystatic";
import {
  contact as contactFallback,
  site,
  socialLinks as socialFallback,
} from "@/config/site";
import { dictionaries } from "@/i18n/dictionary";

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
    videoSrc: "/videos/hero-web.mp4",
    posterSrc: "/images/hero-lcp-black.webp",
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
export async function getContact(): Promise<ContactData> {
  const data = await reader.singletons.contact.read();
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
      ? data.locations.map((l) => ({
          label: l.label,
          address: l.address,
          mapsUrl: l.mapsUrl,
        }))
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

/** Ana sayfa hero — yoksa mevcut TR sözlük + varsayılan video. */
export async function getHero(): Promise<HeroData> {
  const data = await reader.singletons.hero.read();
  if (!data) return heroFallback;

  const text = {
    eyebrow: data.eyebrow.trim() || heroFallback.eyebrow,
    title: data.title.trim() || heroFallback.title,
    body: data.body.trim() || heroFallback.body,
    productsCta: data.productsCta.trim() || heroFallback.productsCta,
    aboutCta: data.aboutCta.trim() || heroFallback.aboutCta,
  };

  if (data.media.discriminant === "video") {
    return {
      ...text,
      media: {
        kind: "video",
        videoSrc: data.media.value.videoSrc.trim() || "/videos/hero-web.mp4",
        posterSrc: data.media.value.posterSrc.trim() || "/images/hero-lcp-black.webp",
      },
    };
  }

  return {
    ...text,
    media: {
      kind: "image",
      imageSrc: data.media.value.imageSrc.trim() || "/images/hero-lcp-black.webp",
    },
  };
}

/** Site ayarları singleton — SEO + footer sloganı */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  const data = await reader.singletons.siteSettings.read();
  return {
    description: data?.description ?? site.description,
    footerTagline:
      data?.footerTagline ??
      "Endüstriyel iplik üretiminde güvenilir çözüm ortağınız.",
  };
}
