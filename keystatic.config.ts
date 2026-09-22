import { collection, config, fields } from "@keystatic/core";

/**
 * Keystatic Git CMS — yerel geliştirmede dosyaya yazar.
 * Canlıda GitHub storage’a geçilir (commit ile yayın).
 * Panel: /keystatic
 */
export default config({
  storage: {
    kind: "local",
  },
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
  },
});
