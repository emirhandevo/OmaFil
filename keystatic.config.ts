import { collection, config, fields, singleton } from "@keystatic/core";

/** Ortak select seçenekleri — ürün kataloğu */
const familyOptions = [
  { label: "Naylon 6", value: "nylon6" },
  { label: "Naylon 66", value: "nylon66" },
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
  { label: "ATY", value: "ATY" },
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
  lustre: fields.array(fields.text({ label: "Lustre" }), {
    label: "Lustre",
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
  finalDty: fields.text({ label: "Final DTY (opsiyonel)" }),
  finalAty: fields.text({ label: "Final ATY (opsiyonel)" }),
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
  floor: fields.select({
    label: "Floor",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
    ],
    defaultValue: "1",
  }),
  yarnType: fields.text({
    label: "İplik tipi",
    description: "PA6, PA66, PES…",
    validation: { isRequired: true },
  }),
});

/**
 * Yerelde dosyaya yazar. Canlıda omafil/omafil deposuna commit atar.
 * Site o commit’i bir sonraki yayında okur. VPS de aynı dosyayı git pull ile alır.
 */
const storage =
  process.env.NODE_ENV === "development"
    ? { kind: "local" as const }
    : { kind: "github" as const, repo: "omafil/omafil" };

export default config({
  storage,
  collections: {
    posts: collection({
      label: "Blog yazıları",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Başlık",
            validation: { isRequired: true },
          },
        }),
        excerpt: fields.text({
          label: "Özet",
          description: "Liste ve SEO açıklaması (kısa).",
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: "Yayın tarihi",
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: "İçerik",
        }),
      },
    }),
    pages: collection({
      label: "Kurumsal sayfalar",
      slugField: "title",
      path: "content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Başlık",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Üst açıklama",
          description: "Sayfa çerçevesindeki kısa metin + SEO.",
          multiline: true,
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: "İçerik",
          description: "Sayfanın düzenlenebilir metin gövdesi.",
        }),
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
            label: "Ürün adı",
            validation: { isRequired: true },
          },
        }),
        summary: fields.text({
          label: "Kısa özet",
          multiline: true,
          validation: { isRequired: true },
        }),
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
              { label: "Filament (POY / FDY / DTY / ATY)", value: "filament" },
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
    siteSettings: singleton({
      label: "Site ayarları",
      path: "content/settings/site",
      schema: {
        description: fields.text({
          label: "SEO açıklaması",
          description: "Ana sayfa / paylaşım meta description.",
          multiline: true,
          validation: { isRequired: true },
        }),
        footerTagline: fields.text({
          label: "Footer sloganı",
          description: "Logo altındaki kısa cümle.",
          validation: { isRequired: true },
        }),
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
              label: "Başlık",
              validation: { isRequired: true },
            }),
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
      },
    }),
  },
});
