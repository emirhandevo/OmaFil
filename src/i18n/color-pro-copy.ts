import type { Locale } from "@/i18n/locales";

/** Color Pro sayfası. Renk kodları burada yok; onlar karteladadır. */
export type ColorProCopy = {
  kicker: string;
  title: string;
  lead: string;
  catalog: string;
  count: string;
  filtersAria: string;
  gridAria: string;
  all: string;
  warm: string;
  cool: string;
  vivid: string;
  neutral: string;
  /** Örnek rengin erişilebilir adı. Kod bileşende öne yazılır. */
  swatch: string;
  note: string;
  seoTitle: string;
  seoDescription: string;
};

const note =
  "Ekran renkleri temsilidir. Değerler fotoğraflara göre yaklaşıktır; kesin üretim rengi değildir. Nihai renk onayı fiziksel numune üzerinden yapılır.";

export const colorProCopy: Record<Locale, ColorProCopy> = {
  tr: {
    kicker: "Renkli iplik koleksiyonu",
    title: "OmaFil Color Pro",
    lead: "İpliğin dokusunda hayat bulan renkler.",
    catalog: "Renk kartelamız",
    count: "29 renk",
    filtersAria: "Renk grupları",
    gridAria: "29 iplik rengi",
    all: "Tümü",
    warm: "Sıcak",
    cool: "Soğuk",
    vivid: "Canlı",
    neutral: "Nötr",
    swatch: "renk önizlemesi",
    note,
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "OmaFil Color Pro renk kartelası. Ekrandaki 29 renk fotoğrafa göre yaklaşıktır; kesin üretim rengi değildir.",
  },
  en: {
    kicker: "Colored yarn collection",
    title: "OmaFil Color Pro",
    lead: "Colors that come alive in the yarn.",
    catalog: "Our color card",
    count: "29 colors",
    filtersAria: "Color groups",
    gridAria: "29 yarn colors",
    all: "All",
    warm: "Warm",
    cool: "Cool",
    vivid: "Vivid",
    neutral: "Neutral",
    swatch: "color preview",
    note: "On-screen colors are indicative. The values are approximate from photographs and are not exact production colors. Final approval is made from a physical sample.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "OmaFil Color Pro color card. The 29 on-screen colors are approximate from photographs, not exact production colors.",
  },
  de: {
    kicker: "Farbige Garnkollektion",
    title: "OmaFil Color Pro",
    lead: "Farben, die im Garn lebendig werden.",
    catalog: "Unsere Farbkarte",
    count: "29 Farben",
    filtersAria: "Farbgruppen",
    gridAria: "29 Garnfarben",
    all: "Alle",
    warm: "Warm",
    cool: "Kühl",
    vivid: "Lebendig",
    neutral: "Neutral",
    swatch: "Farbvorschau",
    note: "Bildschirmfarben sind Richtwerte. Die Werte sind aus Fotos angenähert und keine exakten Produktionsfarben. Die Freigabe erfolgt am physischen Muster.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "OmaFil Color Pro Farbkarte. Die 29 Bildschirmfarben sind aus Fotos angenähert, keine exakten Produktionsfarben.",
  },
  fr: {
    kicker: "Collection de fils colorés",
    title: "OmaFil Color Pro",
    lead: "Des couleurs qui prennent vie dans le fil.",
    catalog: "Notre carte de couleurs",
    count: "29 couleurs",
    filtersAria: "Groupes de couleurs",
    gridAria: "29 couleurs de fil",
    all: "Tous",
    warm: "Chaud",
    cool: "Froid",
    vivid: "Vif",
    neutral: "Neutre",
    swatch: "aperçu de couleur",
    note: "Les couleurs à l’écran sont indicatives. Les valeurs sont approchées d’après des photos et ne sont pas des couleurs de production exactes. L’accord final se fait sur échantillon physique.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "Carte OmaFil Color Pro. Les 29 couleurs à l’écran sont approchées d’après des photos, pas des couleurs de production exactes.",
  },
  es: {
    kicker: "Colección de hilos de color",
    title: "OmaFil Color Pro",
    lead: "Colores que cobran vida en el hilo.",
    catalog: "Nuestra carta de color",
    count: "29 colores",
    filtersAria: "Grupos de color",
    gridAria: "29 colores de hilo",
    all: "Todos",
    warm: "Cálido",
    cool: "Frío",
    vivid: "Vivo",
    neutral: "Neutro",
    swatch: "vista previa del color",
    note: "Los colores en pantalla son orientativos. Los valores son aproximados a partir de fotografías y no son colores exactos de producción. La aprobación final se hace con una muestra física.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "Carta OmaFil Color Pro. Los 29 colores en pantalla son aproximados a partir de fotografías, no colores exactos de producción.",
  },
  it: {
    kicker: "Collezione di filati colorati",
    title: "OmaFil Color Pro",
    lead: "Colori che prendono vita nel filato.",
    catalog: "La nostra cartella colori",
    count: "29 colori",
    filtersAria: "Gruppi di colore",
    gridAria: "29 colori di filato",
    all: "Tutti",
    warm: "Caldo",
    cool: "Freddo",
    vivid: "Vivace",
    neutral: "Neutro",
    swatch: "anteprima colore",
    note: "I colori a schermo sono indicativi. I valori sono approssimati dalle fotografie e non sono colori esatti di produzione. L’approvazione finale avviene sul campione fisico.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "Cartella OmaFil Color Pro. I 29 colori a schermo sono approssimati dalle fotografie, non colori esatti di produzione.",
  },
  pt: {
    kicker: "Coleção de fios coloridos",
    title: "OmaFil Color Pro",
    lead: "Cores que ganham vida no fio.",
    catalog: "A nossa carta de cores",
    count: "29 cores",
    filtersAria: "Grupos de cor",
    gridAria: "29 cores de fio",
    all: "Todos",
    warm: "Quente",
    cool: "Frio",
    vivid: "Vivo",
    neutral: "Neutro",
    swatch: "pré-visualização da cor",
    note: "As cores no ecrã são indicativas. Os valores são aproximados a partir de fotografias e não são cores exatas de produção. A aprovação final faz-se na amostra física.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "Carta OmaFil Color Pro. As 29 cores no ecrã são aproximadas a partir de fotografias, não cores exatas de produção.",
  },
  nl: {
    kicker: "Gekleurde garencollectie",
    title: "OmaFil Color Pro",
    lead: "Kleuren die tot leven komen in het garen.",
    catalog: "Onze kleurenkaart",
    count: "29 kleuren",
    filtersAria: "Kleurengroepen",
    gridAria: "29 garenkleuren",
    all: "Alles",
    warm: "Warm",
    cool: "Koel",
    vivid: "Levendig",
    neutral: "Neutraal",
    swatch: "kleurvoorbeeld",
    note: "Schermkleuren zijn indicatief. De waarden zijn benaderd vanaf foto’s en zijn geen exacte productkleuren. De definitieve goedkeuring gebeurt op een fysiek monster.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "OmaFil Color Pro kleurenkaart. De 29 schermkleuren zijn benaderd vanaf foto’s, geen exacte productkleuren.",
  },
  ru: {
    kicker: "Коллекция цветной пряжи",
    title: "OmaFil Color Pro",
    lead: "Цвета, которые оживают в пряже.",
    catalog: "Наша карта цветов",
    count: "29 цветов",
    filtersAria: "Группы цветов",
    gridAria: "29 цветов пряжи",
    all: "Все",
    warm: "Тёплые",
    cool: "Холодные",
    vivid: "Яркие",
    neutral: "Нейтральные",
    swatch: "предпросмотр цвета",
    note: "Цвета на экране ориентировочные. Значения приблизительны по фотографиям и не являются точными производственными цветами. Окончательное подтверждение — по физическому образцу.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "Карта OmaFil Color Pro. 29 цветов на экране приблизительны по фотографиям, это не точные производственные цвета.",
  },
  ar: {
    kicker: "مجموعة الخيوط الملونة",
    title: "OmaFil Color Pro",
    lead: "ألوان تنبض في الخيط.",
    catalog: "بطاقة الألوان",
    count: "29 لونًا",
    filtersAria: "مجموعات الألوان",
    gridAria: "29 لون خيط",
    all: "الكل",
    warm: "دافئ",
    cool: "بارد",
    vivid: "حي",
    neutral: "محايد",
    swatch: "معاينة اللون",
    note: "ألوان الشاشة تقريبية. القيم مأخوذة تقريبًا من الصور وليست ألوان إنتاج نهائية. الاعتماد النهائي يتم على عينة فعلية.",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "بطاقة OmaFil Color Pro. الألوان الـ29 على الشاشة تقريبية من الصور، وليست ألوان إنتاج نهائية.",
  },
  zh: {
    kicker: "色纱系列",
    title: "OmaFil Color Pro",
    lead: "在纱线中呈现的色彩。",
    catalog: "色卡",
    count: "29 色",
    filtersAria: "颜色分组",
    gridAria: "29 种纱线颜色",
    all: "全部",
    warm: "暖色",
    cool: "冷色",
    vivid: "鲜艳",
    neutral: "中性",
    swatch: "颜色预览",
    note: "屏幕颜色仅供参考。数值根据照片近似得出，不是精确的生产颜色。最终确认以实物样品为准。",
    seoTitle: "OmaFil Color Pro",
    seoDescription:
      "OmaFil Color Pro 色卡。屏幕上的 29 色根据照片近似，不是精确的生产颜色。",
  },
};
