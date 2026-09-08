/** 
 * Site genel sabitleri - isim, URL, nav, tek yerde
 * Header/Footer/metadata buradan okur; 10 dosyada arama yok
*/
export const site = {
    name: "Omafil İplik - İplik Üretim Sanayi",
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
