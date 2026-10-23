import { fields, singleton } from "@keystatic/core";
import { localeGroups, t, titledText } from "./keystatic.fields";

const statItem = fields.object({
  value: t("Sayı"),
  unit: t("Birim"),
  label: t("Etiket"),
});

const milestoneItem = fields.object({
  year: t("Yıl"),
  title: t("Başlık"),
  text: t("Metin", true),
});

const highlightItem = fields.object({
  title: t("Başlık"),
  subtitle: t("Alt satır"),
});

/** Sayfa section’ları — hero ayrı singleton. */
export const sectionSingletons = {
  home: singleton({
    label: "Ana sayfa bölümleri",
    path: "content/settings/home",
    schema: {
      introImage: t("Kurumsal intro görseli"),
      sustainImage: t("Sürdürülebilirlik görseli"),
      copy: localeGroups(() => ({
        brandKicker: t("Marka bandı kicker"),
        brandTitleBefore: t("Marka başlığı (ön)"),
        brandTitleAccent: t("Marka başlığı (turuncu)"),
        introKicker: t("Intro kicker"),
        introTitle: t("Intro başlık"),
        introP1: t("Intro paragraf 1", true),
        introP2: t("Intro paragraf 2", true),
        introCta: t("Intro buton"),
        introAlt: t("Intro görsel alt metni"),
        statsKicker: t("Rakamlar kicker"),
        statsTitle: t("Rakamlar başlık"),
        statsLead: t("Rakamlar giriş", true),
        statsItems: fields.array(statItem, {
          label: "Rakam kartları",
          itemLabel: (props) =>
            props.fields.label.value || props.fields.value.value || "Kart",
        }),
        sustainKicker: t("Sürdürülebilirlik kicker"),
        sustainTitle: t("Sürdürülebilirlik başlık"),
        sustainLead: t("Sürdürülebilirlik giriş", true),
        energyTitle: t("Enerji kartı başlık"),
        energyText: t("Enerji kartı metin", true),
        productionTitle: t("Üretim kartı başlık"),
        productionText: t("Üretim kartı metin", true),
        sustainCta: t("Sürdürülebilirlik buton"),
        plant: t("Tesis kicker"),
        plantText: t("Tesis metin", true),
        techKicker: t("Teknoloji kicker"),
        techTitle: t("Teknoloji başlık"),
        recycleTitle: t("Recycle başlık"),
        recycleText: t("Recycle metin", true),
        biobased: t("Bio-bazlı başlık"),
        biobasedText: t("Bio-bazlı metin", true),
        dopeDyed: t("Dope Dyed başlık"),
        waterlessText: t("Dope Dyed metin", true),
        sustainAlt: t("Sürdürülebilirlik görsel alt metni"),
      })),
    },
  }),
  hubs: singleton({
    label: "Liste sayfaları",
    path: "content/settings/hubs",
    schema: {
      copy: localeGroups(() => ({
        productsKicker: t("Ürün kicker"),
        productsTitle: t("Ürün başlık"),
        productsLead: t("Ürün giriş", true),
        productsAll: t("Tümü filtresi"),
        productsSoon: t("Görsel yakında"),
        productsQuote: t("Teklif butonu"),
        productsQuoteLine: t("Teklif satırı"),
        blogTitle: t("Blog başlık"),
        blogLead: t("Blog giriş", true),
        blogEmpty: t("Blog boş mesajı"),
        corporateKicker: t("Kurumsal kicker"),
        corporateNav: t("Kurumsal nav aria"),
        corporateHubTitle: t("Kurumsal hub başlık"),
        corporateHubLead: t("Kurumsal hub giriş", true),
        aboutSummary: t("Hakkımızda kart özeti"),
        factorySummary: t("Fabrika kart özeti"),
        sustainSummary: t("Sürdürülebilirlik kart özeti"),
        careersSummary: t("İK kart özeti"),
        view: t("İncele"),
      })),
    },
  }),
  aboutSections: singleton({
    label: "Hakkımızda bölümleri",
    path: "content/settings/about-sections",
    schema: {
      copy: localeGroups(() => ({
        growthBefore: t("Büyüme başlığı (ön)"),
        growthAccent: t("Büyüme başlığı (turuncu)"),
        offices: t("İletişim noktaları"),
        map: t("Haritada aç"),
        statsAria: t("Rakam şeridi aria"),
        stats: fields.array(highlightItem, {
          label: "Rakam kartları",
          itemLabel: (props) => props.fields.title.value || "Kart",
        }),
        focus: fields.array(t("Madde"), {
          label: "Odak maddeleri",
          itemLabel: (props) => props.value || "Madde",
        }),
        sustainKicker: t("Sürdürülebilirlik kicker"),
        sustainBefore: t("Başlık ön"),
        sustainAccent: t("Başlık turuncu"),
        sustainAfter: t("Başlık son"),
        sustainP1: t("Paragraf 1", true),
        sustainP2: t("Paragraf 2", true),
        sustainLink: t("Sürdürülebilirlik linki"),
        gesLink: t("GES linki"),
        recycledTitle: t("Recycled başlık"),
        recycledText: t("Recycled metin", true),
        grs: t("GRS satırı"),
        certs: t("Sertifikalar"),
        milestones: fields.array(milestoneItem, {
          label: "Kilometre taşları",
          itemLabel: (props) =>
            `${props.fields.year.value} ${props.fields.title.value}`.trim() ||
            "Kilometre",
        }),
      })),
    },
  }),
  factorySections: singleton({
    label: "Fabrikamız bölümleri",
    path: "content/settings/factory-sections",
    schema: {
      // Görseller dil bağımsız. public altı yol; dosyayı repoya koy.
      listCardImage: t("Ürün listesi kart görseli"),
      labVideo: fields.text({
        label: "Laboratuvar videosu",
        description: "Örn. /videos/omafil-tanitim.mp4",
      }),
      labPoster: fields.text({
        label: "Laboratuvar poster görseli",
        description: "Örn. /images/factory/fab-lab-poster.webp",
      }),
      labDuration: fields.text({
        label: "Video süresi (kapak)",
        description: "Örn. 00:28",
      }),
      gallery: fields.array(
        fields.object({
          src: fields.text({
            label: "Görsel yolu",
            description: "Örn. /images/factory/gallery/01-solar.webp",
            validation: { isRequired: true },
          }),
          alt: t("Alt metin (Türkçe yedek)"),
        }),
        {
          label: "Fabrika galerisi",
          itemLabel: (props) => props.fields.src.value || "Görsel",
        },
      ),
      band: fields.array(
        fields.object({
          src: fields.text({
            label: "Görsel yolu",
            description: "Örn. /images/factory/band/06.webp",
            validation: { isRequired: true },
          }),
          alt: t("Alt metin (Türkçe yedek)"),
        }),
        {
          label: "Üretim bandı",
          itemLabel: (props) => props.fields.src.value || "Görsel",
        },
      ),
      copy: localeGroups(() => ({
        headline: t("Üst başlık"),
        intro: t("Giriş paragrafları", true),
        sinceYear: t("Yıl (büyük sayı)"),
        since: t("Yıldan beri başlık"),
        sinceBody: t("Yıldan beri metin", true),
        tabsAria: t("Sekmeler aria"),
        tabs: fields.array(titledText(), {
          label: "Misyon / tarihçe / vizyon",
          itemLabel: (props) => props.fields.title.value || "Sekme",
        }),
        galleryTitle: t("Galeri başlık"),
        galleryBody: t("Galeri metin", true),
        bandTitle: t("Üretim bandı başlık"),
        bandBody: t("Üretim bandı metin", true),
        bandMore: t("Daha fazla"),
        bandLess: t("Daha az"),
        map: t("Tesisi haritada aç"),
        labKicker: t("Laboratuvar kicker"),
        labTitleBefore: t("Laboratuvar başlık (ön)"),
        labTitleAccent: t("Laboratuvar başlık (turuncu)"),
        labBody: t("Laboratuvar metin", true),
        labMarks: fields.array(
          fields.object({
            title: t("Üst satır"),
            text: t("Alt satır"),
          }),
          {
            label: "Laboratuvar işaretleri",
            itemLabel: (props) => props.fields.title.value || "İşaret",
          },
        ),
      })),
    },
  }),
  sustainSections: singleton({
    label: "Sürdürülebilirlik bölümleri",
    path: "content/settings/sustain-sections",
    schema: {
      worldImage: fields.text({
        label: "Dünya görseli",
        description: "Örn. /images/sustainability/dunya.webp",
      }),
      plantImage: fields.text({
        label: "Tesis görseli",
        description: "Örn. /images/ges/erbaa-cati-1/aerial.webp",
      }),
      copy: localeGroups(() => ({
        worldAlt: t("Dünya görseli alt metni"),
        whyBefore: t("Neden başlık (ön)"),
        whyAccent: t("Neden başlık (turuncu)"),
        why: fields.array(t("Paragraf", true), {
          label: "Neden maddeleri",
          itemLabel: () => "Paragraf",
        }),
        principles: fields.array(titledText(), {
          label: "İlkeler",
          itemLabel: (props) => props.fields.title.value || "İlke",
        }),
        yarnKicker: t("İplik kicker"),
        yarnTitle: t("İplik başlık"),
        yarnLead: t("İplik giriş", true),
        yarns: fields.array(titledText(), {
          label: "İplik çözümleri",
          itemLabel: (props) => props.fields.title.value || "Çözüm",
        }),
        certs: t("Sertifikalar"),
        gesKicker: t("GES kicker"),
        gesTitle: t("GES başlık"),
        gesP: t("GES paragrafları", true),
        gesItems: fields.array(titledText(), {
          label: "GES maddeleri",
          itemLabel: (props) => props.fields.title.value || "Madde",
        }),
        gesLink: t("GES linki"),
        plantKicker: t("Tesis kicker"),
        plantText: t("Tesis metin", true),
        plantAlt: t("Tesis görsel alt metni"),
      })),
    },
  }),
  careersSections: singleton({
    label: "İnsan kaynakları bölümleri",
    path: "content/settings/careers-sections",
    schema: {
      copy: localeGroups(() => ({
        applyTitle: t("Başvuru başlık"),
        applyLead: t("Başvuru açıklama", true),
        principles: fields.array(t("Madde"), {
          label: "Çalışma ilkeleri",
          itemLabel: (props) => props.value || "Madde",
        }),
      })),
    },
  }),
  gesPage: singleton({
    label: "GES sayfası",
    path: "content/settings/ges",
    schema: {
      heroImage: t("Hero görseli"),
      bodyImage: t("Gövde görseli"),
      copy: localeGroups(() => ({
        kicker: t("Kicker"),
        title: t("Başlık"),
        subtitle: t("Alt başlık", true),
        paragraphs: t("Paragraflar", true),
        total: t("Toplam"),
        panels: t("Panel birimi"),
        imageAlt: t("Görsel alt metni"),
        respectTitle: t("Doğa başlık"),
        respectText: t("Doğa metin", true),
        pillars: fields.array(titledText(), {
          label: "Üç sütun",
          itemLabel: (props) => props.fields.title.value || "Sütun",
        }),
        ctaTitle: t("Alt CTA başlık"),
        ctaText: t("Alt CTA metin", true),
        sustainCta: t("Sürdürülebilirlik butonu"),
        contactCta: t("İletişim butonu"),
        sitesTitle: t("Tesisler başlık"),
        sitesLead: t("Tesisler giriş", true),
        fieldHeading: t("Arazi başlık"),
        roofHeading: t("Çatı başlık"),
      })),
    },
  }),
};
