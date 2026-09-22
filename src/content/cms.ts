import { reader } from "@/content/keystatic";
import {
  contact as contactFallback,
  site,
  socialLinks as socialFallback,
} from "@/config/site";

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
