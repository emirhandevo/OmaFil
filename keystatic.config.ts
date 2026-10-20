import { collection, config, fields, singleton } from "@keystatic/core";
import { localeGroups } from "./keystatic.fields";
import { sectionSingletons } from "./keystatic.sections";

/** Ortak select seçenekleri — ürün kataloğu */
const familyOptions = [
  { label: "Naylon 6", value: "nylon6" },
  { label: "Naylon 6,6", value: "nylon66" },
  { label: "Polyester", value: "polyester" },
] as const;

const polymerOptions = [
  { label: "PA6", value: "pa6" },
  { label: "PA66", value: "pa66" },
  { label: "PES", value: "pes" },
] as const;

const codeOptions = [
  { label: "POY", value: "POY" },
  { label: "FDY", value: "FDY" },
  { label: "DTY", value: "DTY" },
  { label: "ACY", value: "ACY" },
  { label: "SCY", value: "SCY" },
  { label: "DCY", value: "DCY" },
] as const;

const filamentSkuFields = fields.object({
  spec: fields.text({
    label: "Spec",
    description: "Örn. 44/12 veya 44D/12F",
    validation: { isRequired: true },
  }),
  luster: fields.array(fields.text({ label: "Luster" }), {
    label: "Luster",
    itemLabel: (props) => props.value || "—",
  }),
  colors: fields.array(fields.text({ label: "Renk" }), {
    label: "Renkler",
    itemLabel: (props) => props.value || "—",
  }),
  features: fields.array(fields.text({ label: "Özellik" }), {
    label: "Özellikler / kullanım",
    itemLabel: (props) => props.value || "—",
  }),
  kesit: fields.text({
    label: "Kesit",
  }),
});

const coveredSkuFields = fields.object({
  productionType: fields.text({
    label: "Üretim tipi",
    description: "ACY, SC, DC…",
    validation: { isRequired: true },
  }),
  spandexDtex: fields.integer({
    label: "Spandex dtex",
    validation: { isRequired: true },
  }),
  yarnDtex: fields.integer({
    label: "İplik dtex",
    validation: { isRequired: true },
  }),
  filament: fields.integer({ label: "Filament (opsiyonel)" }),
  yarnType: fields.text({
    label: "İplik tipi",
    description: "PA6, PA66, PES…",
    validation: { isRequired: true },
  }),
  kesit: fields.text({
    label: "Kesit",
  }),
});

/**
 * Canlı panel omafil/omafil deposuna yazar.
 * Yerelde anahtar yokken /keystatic kurulum ekranını açar ve .env dosyasına üç değeri yazar.
 * O üç değer Vercel’de yoksa production build düşer.
 */
export default config({
  storage: {
    kind: "github",
    repo: { owner: "omafil", name: "omafil" },
  },
  collections: {
    posts: collection({
      label: "Blog yazıları",
      slugField: "title",
      path: "content/blog/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({
          name: {
            label: "Kayıt adı / slug",
            validation: { isRequired: true },
          },
        }),
        date: fields.date({
          label: "Yayın tarihi",
          validation: { isRequired: true },
        }),
        copy: localeGroups(() => ({
          title: fields.text({ label: "Başlık" }),
          excerpt: fields.text({
            label: "Özet",
            description: "Liste ve SEO.",
            multiline: true,
          }),
          body: fields.text({
            label: "İçerik",
            multiline: true,
          }),
        })),
      },
    }),
    pages: collection({
      label: "Kurumsal sayfalar",
      slugField: "title",
      path: "content/pages/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({
          name: {
            label: "Kayıt adı / slug",
            validation: { isRequired: true },
          },
        }),
        copy: localeGroups(() => ({
          title: fields.text({ label: "Başlık" }),
          description: fields.text({
            label: "Üst açıklama / SEO",
            multiline: true,
          }),
          body: fields.text({
            label: "İçerik",
            description: "Paragraflar. Boş satır yeni paragraf.",
            multiline: true,
          }),
        })),
      },
    }),
    productLines: collection({
      label: "Ürün hatları",
      slugField: "label",
      path: "content/products/*",
      format: { data: "json" },
      schema: {
        label: fields.slug({
          name: {
            label: "Ürün adı (slug / panel)",
            description: "Dosya adı. Çeviriler aşağıdaki Metinler’de.",
            validation: { isRequired: true },
          },
        }),
        summary: fields.text({
          label: "Kısa özet (Türkçe yedek)",
          multiline: true,
          validation: { isRequired: true },
        }),
        copy: localeGroups(() => ({
          label: fields.text({ label: "Ürün adı" }),
          summary: fields.text({
            label: "Kısa özet",
            multiline: true,
          }),
        })),
        family: fields.select({
          label: "Aile",
          options: [...familyOptions],
          defaultValue: "nylon6",
        }),
        polymer: fields.select({
          label: "Polimer",
          options: [...polymerOptions],
          defaultValue: "pa6",
        }),
        code: fields.select({
          label: "Proses / hat kodu",
          options: [...codeOptions],
          defaultValue: "POY",
        }),
        imageSrc: fields.text({
          label: "Görsel yolu",
          description:
            "Örn. /images/hero/iplik/poy-n6.webp — yoksa boş bırak (placeholder).",
        }),
        colors: fields.array(fields.text({ label: "Renk" }), {
          label: "Renkler (kart rozeti)",
          itemLabel: (props) => props.value || "—",
        }),
        recycled: fields.checkbox({
          label: "Recycled seçenek",
          defaultValue: false,
        }),
        featured: fields.checkbox({
          label: "Portföyde öne çıkan",
          defaultValue: false,
        }),
        /** Filament / Covered — tip seçince SKU formu değişir */
        details: fields.conditional(
          fields.select({
            label: "Ürün tipi",
            options: [
              { label: "Filament (POY / FDY / DTY)", value: "filament" },
              { label: "Covered / Gipe (ACY / SCY / DCY…)", value: "covered" },
            ],
            defaultValue: "filament",
          }),
          {
            filament: fields.object({
              skus: fields.array(filamentSkuFields, {
                label: "Filament SKU satırları",
                itemLabel: (props) =>
                  props.fields.spec.value || "Yeni filament SKU",
              }),
            }),
            covered: fields.object({
              skus: fields.array(coveredSkuFields, {
                label: "Covered / gipe SKU satırları",
                itemLabel: (props) => {
                  const t = props.fields.productionType.value;
                  const y = props.fields.yarnDtex.value;
                  return t && y ? `${t} · ${y} dtex` : "Yeni covered SKU";
                },
              }),
            }),
          },
        ),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: "Ana sayfa hero",
      path: "content/settings/hero",
      schema: {
        media: fields.conditional(
          fields.select({
            label: "Arka plan",
            options: [
              { label: "Video", value: "video" },
              { label: "Görsel", value: "image" },
            ],
            defaultValue: "video",
          }),
          {
            video: fields.object({
              videoSrc: fields.text({
                label: "Video yolu",
                description: "public altı yol. Örn. /videos/hero-web.mp4",
                validation: { isRequired: true },
              }),
              posterSrc: fields.text({
                label: "Poster görsel",
                description:
                  "Video gelene kadar duran kare. Örn. /images/hero-lcp-black.webp",
                validation: { isRequired: true },
              }),
            }),
            image: fields.object({
              imageSrc: fields.text({
                label: "Görsel yolu",
                description: "Örn. /images/hero-lcp-black.webp",
                validation: { isRequired: true },
              }),
            }),
          },
        ),
        copy: localeGroups(() => ({
          eyebrow: fields.text({
            label: "Üst kicker",
            description: "Başlığın üstündeki kısa turuncu satır.",
          }),
          title: fields.text({
            label: "Başlık",
            multiline: true,
          }),
          body: fields.text({
            label: "Açıklama",
            multiline: true,
          }),
          productsCta: fields.text({
            label: "Ürünler butonu",
          }),
          aboutCta: fields.text({
            label: "Kurumsal butonu",
          }),
        })),
      },
    }),
    siteSettings: singleton({
      label: "Site ayarları",
      path: "content/settings/site",
      schema: {
        logo: fields.text({
          label: "Logo (açık tema)",
          description: "Örn. /images/omafil_logo.svg",
        }),
        logoDark: fields.text({
          label: "Logo (koyu tema)",
          description: "Örn. /images/omafil_logo_dark.svg",
        }),
        ogImage: fields.text({
          label: "Paylaşım görseli (OG)",
          description: "WhatsApp / LinkedIn kartı. Örn. /images/og.webp — 1200×630 önerilir.",
        }),
        copy: localeGroups(() => ({
          description: fields.text({
            label: "SEO açıklaması",
            description: "Ana sayfa / paylaşım meta.",
            multiline: true,
          }),
          footerTagline: fields.text({
            label: "Footer sloganı",
          }),
        })),
      },
    }),
    contact: singleton({
      label: "İletişim",
      path: "content/settings/contact",
      schema: {
        email: fields.text({
          label: "E-posta",
          validation: { isRequired: true },
        }),
        phones: fields.array(fields.text({ label: "Telefon" }), {
          label: "Telefonlar",
          itemLabel: (props) => props.value || "Telefon",
        }),
        locations: fields.array(
          fields.object({
            label: fields.text({
              label: "Başlık (Türkçe / panel)",
              description: "Liste adı. Çeviriler Metinler’de.",
              validation: { isRequired: true },
            }),
            labels: localeGroups(() => ({
              name: fields.text({ label: "Başlık" }),
            })),
            address: fields.text({
              label: "Adres",
              multiline: true,
              validation: { isRequired: true },
            }),
            mapsUrl: fields.url({
              label: "Google Maps linki",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Adresler",
            itemLabel: (props) => props.fields.label.value || "Adres",
          },
        ),
        instagram: fields.url({ label: "Instagram" }),
        linkedin: fields.url({ label: "LinkedIn" }),
        youtube: fields.url({ label: "YouTube" }),
        pageCopy: localeGroups(() => ({
          kicker: fields.text({ label: "Üst kicker" }),
          title: fields.text({ label: "Başlık" }),
          lead: fields.text({ label: "Giriş", multiline: true }),
          formTitle: fields.text({ label: "Form başlığı" }),
          formLead: fields.text({ label: "Form açıklaması", multiline: true }),
          quick: fields.text({ label: "Hızlı iletişim başlığı" }),
          quickLead: fields.text({ label: "Hızlı iletişim açıklaması" }),
          phone: fields.text({ label: "Telefon etiketi" }),
          email: fields.text({ label: "E-posta etiketi" }),
          social: fields.text({ label: "Sosyal başlık" }),
          socialLead: fields.text({ label: "Sosyal açıklama" }),
          addresses: fields.text({ label: "Adresler başlığı" }),
          mapsNote: fields.text({ label: "Harita notu" }),
          openMap: fields.text({ label: "Haritada aç" }),
        })),
      },
    }),
    ...sectionSingletons,
  },
});
