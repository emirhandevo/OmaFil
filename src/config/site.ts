import { Phone } from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/icons/social-icons";
/** 
 * Site genel sabitleri - isim, URL, nav, tek yerde
 * Header/Footer/metadata buradan okur; 10 dosyada arama yok
*/
export const site = {
    name: "OmaFil İplik - İplik Üretim Sanayi",
    // SEO başlığında marka kalsın. Yasal unvan footer ve kurumsal metinde.
    legalName: "OMA POLİMER A.Ş.",
    // canlı domain; metadata ve canonical bunun üstünden üretilir.
    url: "https://omafil.com",
    description:
    "Endüstriyel iplik üretimi. Kurumsal katalog ve ürün portföyü.",
    locale: "tr_TR",
    // public/ klasörüne göre yol; Header buradan okur
    logo: "/images/omafil_logo.svg",
} as const;

export const navLinks = [
    {href: "/", label: "Ana Sayfa"},
    {href: "/kurumsal", label: "Kurumsal"},
    {href: "/urunlerimiz", label: "Ürünlerimiz"},
    {href: "/surdurulebilirlik", label: "Sürdürülebilirlik"},
    {href: "/iletisim", label: "İletişim"},
] as const;



// Footer / iletişim sayfası için tek kaynak
// birden telefon numarası footer hepsini alt alta listeler
export const contact = {
  phone: ["+90 212 438 72 20", "+90 356 502 60 61"],
  email: "info@omafil.com",
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