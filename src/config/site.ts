import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/icons/social-icons";
import { resolveAsset } from "@/lib/resolve-asset";
/**
 * Site genel sabitleri. İsim, URL, menü adresleri tek yerde.
 * Görünen menü yazısı burada değil. Header sözlükten navLabel ile basar.
 */
export const site = {
    name: "OmaFil - İplik Üretim Sanayi",
    // SEO başlığında marka kalsın. Yasal unvan footer ve kurumsal metinde.
    legalName: "OMA POLİMER A.Ş.",
    // Canlı domain. Sitemap ve robots bunu kullanır. Sekme başlığı layout’ta üretilir.
    url: "https://omafil.com",
    description:
    "Endüstriyel iplik üretimi. Kurumsal katalog ve ürün portföyü.",
    // Header ve footer buradan okur. Adres içerik hash'ine gider.
    logo: resolveAsset("/images/omafil_logo.svg"),
    // Dark temada aynı yerler bu dosyayı basar. Açık tema logo'da kalır.
    logoDark: resolveAsset("/images/omafil_logo_dark.svg"),
} as const;

// Yalnız adres. Yazı sözlükte: navLabel ve chrome özetleri.
export const corporateLinks = [
    { href: "/kurumsal/hakkimizda" },
    { href: "/kurumsal/fabrikamiz" },
    { href: "/kurumsal/surdurulebilirlik" },
    { href: "/kurumsal/insan-kaynaklari" },
] as const;

export const navLinks = [
    { href: "/" },
    { href: "/kurumsal", children: corporateLinks },
    { href: "/urunlerimiz" },
    { href: "/ges" },
    { href: "/blog" },
    { href: "/iletisim" },
] as const;



// Footer / iletişim sayfası için tek kaynak
// birden telefon numarası footer hepsini alt alta listeler
export const contact = {
  phone: ["+90 212 438 72 20", "+90 549 177 50 10"],
  // Sabit hat ile aynı numara, sonu 21. Sadece footer basar.
  fax: "+90 212 438 72 21",
  email: "info@omafil.com",
  // Cep hattı → wa.me (ülke kodu, boşluksuz).
  whatsapp: "https://wa.me/905491775010",
  // her adres: başlık + görünen metin + google maps linki
  locations: [
    {
        label: "Genel Merkez",
        address: "Oruçreis Mh. Tekstilkent Cd. Koza Plaza B-Blok 36.Kat Esenler - İSTANBUL - TÜRKİYE",
        mapsUrl: "https://maps.app.goo.gl/noytgx1FN82zjusr7",
    },
    {
        label: "Fabrika / Üretim Tesisi",
        address: "Kelkit Osb Mah. Beylikbükü Caddesi No:32/B Erbaa / TOKAT - TÜRKİYE",
        mapsUrl: "https://maps.app.goo.gl/BKCaFoiqjJ1MrKA57",
    },
    {
        label: "Fabrika Satış Noktası",
        address: "Terazidere Mah. Güneş Caddesi No:47 Bayrampaşa / İSTANBUL - TÜRKİYE",
        mapsUrl: "https://maps.app.goo.gl/Td8FrTfHGKjXswuZ8",
    }
  ]
} as const;

// Sosyal medya 
export const socialLinks = [
  { href: "https://www.instagram.com/omapolimer/", label: "Instagram", icon: InstagramIcon},
  { href: "https://www.linkedin.com/company/oma-iplik-a-s/posts/", label: "LinkedIn", icon: LinkedinIcon},
  { href: "https://www.youtube.com/@omaiplikanonimsirketiomafi8939", label: "Youtube", icon: YoutubeIcon },
] as const;