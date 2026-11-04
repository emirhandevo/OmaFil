import type { Locale } from "@/i18n/locales";
import { sustainOverlay } from "@/i18n/sustain-overlay";

/**
 * Arayüz metinleri. Ürün adı, hat kodu ve teknik İngilizce alanlar burada yok.
 */
export type Dictionary = {
  nav: {
    home: string;
    corporate: string;
    about: string;
    factory: string;
    sustainability: string;
    careers: string;
    products: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    main: string;
    mobile: string;
  };
  footer: {
    menu: string;
    contact: string;
    addresses: string;
    rights: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    productsCta: string;
    aboutCta: string;
    details: string;
  };
  brand: { titleBefore: string; titleAccent: string };
  intro: { kicker: string; title: string; p1: string; p2: string; cta: string };
  stats: {
    kicker: string;
    title: string;
    lead: string;
    perYear: string;
    production: string;
    area: string;
    happy: string;
    customers: string;
    toCountries: string;
    exportLabel: string;
  };
  sustain: {
    kicker: string;
    title: string;
    lead: string;
    energyTitle: string;
    energyText: string;
    productionTitle: string;
    productionText: string;
    cta: string;
    plant: string;
    plantText: string;
    techKicker: string;
    techTitle: string;
    recycleTitle: string;
    biobased: string;
    biobasedText: string;
    dopeDyed: string;
    waterlessText: string;
    recycleText: string;
  };
  products: {
    kicker: string;
    title: string;
    lead: string;
    all: string;
    soon: string;
    quote: string;
    quoteLine: string;
  };
  blog: { title: string; lead: string; empty: string };
  corporate: { kicker: string; nav: string; hubTitle: string; hubLead: string };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    formTitle: string;
    formLead: string;
    quick: string;
    quickLead: string;
    phone: string;
    email: string;
    social: string;
    socialLead: string;
    addresses: string;
    mapsNote: string;
    openMap: string;
  };
  form: {
    name: string;
    namePh: string;
    email: string;
    phone: string;
    optional: string;
    company: string;
    companyPh: string;
    request: string;
    message: string;
    messagePh: string;
    send: string;
    sending: string;
    sent: string;
    groups: {
      "Numune talebi": string;
      "İplik teklifi": string;
      "Genel bilgi": string;
      Diğer: string;
    };
  };
};

const tr: Dictionary = {
  nav: {
    home: "Ana Sayfa",
    corporate: "Kurumsal",
    about: "Hakkımızda",
    factory: "Fabrikamız",
    sustainability: "Sürdürülebilirlik",
    careers: "İnsan Kaynakları",
    products: "Ürünlerimiz",
    contact: "İletişim",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    main: "Ana menü",
    mobile: "Mobil menü",
  },
  footer: {
    menu: "Menü",
    contact: "İletişim",
    addresses: "Adreslerimiz",
    rights: "Tüm hakları saklıdır.",
  },
  hero: {
    eyebrow: "Türkiye’den Dünyaya Endüstriyel İplik",
    title: "AVRUPA'NIN EN BÜYÜK TAM ENTEGRE GİPE İPLİK FABRİKASI",
    body: "Naylon 6 ve Naylon 6,6 POY, FDY, DTY, ACY, SCY, DCY ile özel tip iplik çözümlerini yüksek kalite standartlarında üretiyor ve dünya pazarlarına sunuyoruz.",
    productsCta: "İplik Ürünlerimizi İnceleyin",
    aboutCta: "OmaFil’i Tanıyın",
    details: "Detaylı Bilgi",
  },
  brand: {
    titleBefore: "Yüksek Kalite ve Yenilikçilikte",
    titleAccent: "Dünyaya Dokunuyoruz",
  },
  intro: {
    kicker: "Kurumsal",
    title: "Global Tekstile Poliamid İplik",
    p1: "Poliamid (Naylon 6 ve Naylon 6,6), yüksek mukavemeti, esnekliği ve aşınma dayanımıyla tekstilin en kritik hammaddelerinden biridir. 1999’dan bu yana biriken deneyimimizi ileri teknolojiyle birleştirerek POY, FDY, DTY, ACY, SCY ve DCY formlarında poliamid iplik üretiyor; çorap, iç giyim, spor giyim, halı ve teknik tekstil sektörlerine yüksek performanslı çözümler sunuyoruz.",
    p2: "Avrupa’nın en büyük gipe iplik tesisiyle, global tekstil endüstrisinin ihtiyaçlarına kalite ve güvenilirlikle cevap veriyoruz.",
    cta: "Kurumsal Yapımız",
  },
  stats: {
    kicker: "Üretim Gücümüz",
    title: "Rakamlarla OmaFil",
    lead: "Yıllık üretimimiz, modern tesislerimiz ve küresel ticaret ağımızla tekstil sektörüne değer katıyoruz.",
    perYear: "Ton/Yıl",
    production: "Üretim",
    area: "Üretim Alanı",
    happy: "Mutlu",
    customers: "Müşteri",
    toCountries: "Ülkeye",
    exportLabel: "İhracat",
  },
  sustain: {
    kicker: "Geleceğe Karşı Sorumluluğumuz",
    title: "Sürdürülebilir Endüstriyel İplik Üretimi",
    lead: "Üretimimizin merkezinde sürdürülebilirlik var: çatı üstü güneş enerjisi, geri dönüştürülmüş iplik ve kaynak verimli süreçlerle çevresel etkimizi azaltıyoruz.",
    energyTitle: "Yenilenebilir Enerji",
    energyText: "Çatı üstü GES ile temiz enerji.",
    productionTitle: "Sorumlu Üretim",
    productionText: "Kaynak verimli, çevreye duyarlı süreçler.",
    cta: "Sürdürülebilirlik Yaklaşımımız",
    plant: "OmaFil Üretim Tesisi",
    plantText: "Üretimde kaliteyi yenilenebilir enerji yatırımlarıyla destekliyoruz.",
    techKicker: "Çevreci Teknolojiler",
    techTitle: "Sürdürülebilir İplik Çözümlerimiz",
    recycleTitle: "Recycle İplikler",
    biobased: "Bio-bazlı Polyamid İplik",
    biobasedText:
      "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik.",
    dopeDyed: "Dope Dyed",
    waterlessText:
      "Su tüketimini azaltmaya odaklanan yenilikçi susuz boyama teknolojisi.",
    recycleText: "Geri dönüştürülmüş kaynaklardan geliştirilen çevre dostu iplik çözümleri.",
  },
  products: {
    kicker: "Ürünlerimiz",
    title: "İplik portföyümüz",
    lead: "Naylon 6, Naylon 6,6 ve polyester filament + gipe hatları. Specs için ürüne tıklayın; teklif veya numune için iletişime geçin.",
    all: "Tümü",
    soon: "Görsel yakında",
    quote: "Teklif al",
    quoteLine: "Teklif veya numune için",
  },
  blog: {
    title: "Yazılar",
    lead: "Tesis, ürün ve üretim üzerine yazılar.",
    empty: "Yazılar yakında burada yayınlanacak.",
  },
  corporate: {
    kicker: "Kurumsal",
    nav: "Kurumsal sayfalar",
    hubTitle: "Kurumsal",
    hubLead: "Şirketimiz, tesisimiz, sürdürülebilirlik yaklaşımımız ve insan kaynakları.",
  },
  contact: {
    kicker: "İletişim",
    title: "Bize ulaşın",
    lead: "Numune, teklif veya genel sorularınız için mail atabilir ya da bizi arayabilirsiniz.",
    formTitle: "Mesaj gönderin",
    formLead: "Formu doldurun; mesajınız doğrudan bize ulaşır.",
    quick: "Hızlı iletişim",
    quickLead: "Doğrudan arayın veya e-posta atın.",
    phone: "Telefon",
    email: "E-posta",
    social: "Sosyal",
    socialLead: "Güncel üretim ve marka paylaşımları.",
    addresses: "Adreslerimiz",
    mapsNote: "Her konum Google Maps’te açılır.",
    openMap: "Haritada aç",
  },
  form: {
    name: "Ad Soyad",
    namePh: "Adınız",
    email: "E-posta",
    phone: "Telefon",
    optional: "(opsiyonel)",
    company: "Firma Adı",
    companyPh: "Firma adınız",
    request: "Talep türü",
    message: "Mesajınız",
    messagePh: "Sipariş, numune veya genel soru…",
    send: "Mesajı Gönder",
    sending: "Gönderiliyor",
    sent: "Mesajınız alındı, en kısa sürede dönüş yapacağız.",
    groups: {
      "Numune talebi": "Numune talebi",
      "İplik teklifi": "İplik teklifi",
      "Genel bilgi": "Genel bilgi",
      Diğer: "Diğer",
    },
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    corporate: "Company",
    about: "About us",
    factory: "Our factory",
    sustainability: "Sustainability",
    careers: "Careers",
    products: "Products",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    main: "Main menu",
    mobile: "Mobile menu",
  },
  footer: {
    menu: "Menu",
    contact: "Contact",
    addresses: "Addresses",
    rights: "All rights reserved.",
  },
  hero: {
    eyebrow: "Industrial yarn from Türkiye to the world",
    title: "EUROPE’S LARGEST FULLY INTEGRATED COVERED YARN FACTORY",
    body: "We produce Naylon 6 and Naylon 6,6 POY, FDY, DTY, ACY, SCY, DCY and specialty yarn solutions to high quality standards and supply them to world markets.",
    productsCta: "View our yarn products",
    aboutCta: "Discover OmaFil",
    details: "More details",
  },
  brand: {
    titleBefore: "In quality and innovation",
    titleAccent: "we reach the world",
  },
  intro: {
    kicker: "Company",
    title: "Polyamide Yarn for Global Textile",
    p1: "Polyamide (Naylon 6 and Naylon 6,6) is one of textile’s most critical raw materials, thanks to its strength, elasticity and abrasion resistance. Combining experience since 1999 with advanced technology, we produce polyamide yarn as POY, FDY, DTY, ACY, SCY and DCY, and supply high-performance solutions for hosiery, underwear, sportswear, carpet and technical textile.",
    p2: "With Europe’s largest covered yarn plant, we meet the global textile industry’s needs with quality and reliability.",
    cta: "Our company",
  },
  stats: {
    kicker: "Our production",
    title: "OmaFil in figures",
    lead: "With our annual output, modern plants and global trade network, we add value to the textile industry.",
    perYear: "Tonnes/year",
    production: "Output",
    area: "Production area",
    happy: "Happy",
    customers: "Customers",
    toCountries: "Countries",
    exportLabel: "Export",
  },
  sustain: {
    kicker: "Our responsibility to the future",
    title: "Sustainable industrial yarn production",
    lead: "Sustainability sits at the centre of our production: rooftop solar, recycled yarn and resource-efficient processes reduce our environmental impact.",
    energyTitle: "Renewable energy",
    energyText: "Clean energy from on-roof GES.",
    productionTitle: "Responsible production",
    productionText: "Resource-efficient, environmentally aware processes.",
    cta: "Our sustainability approach",
    plant: "OmaFil production plant",
    plantText: "We support production quality with renewable energy investment.",
    techKicker: "Cleaner technologies",
    techTitle: "Our sustainable yarn solutions",
    recycleTitle: "Recycled yarns",
    biobased: "Bio-based polyamide yarn",
    biobasedText: "A bio-based polyamide yarn aimed at reducing fossil feedstock use.",
    dopeDyed: "Dope Dyed",
    waterlessText: "Dope dyed yarn focused on reducing water use.",
    recycleText: "Environmentally minded yarn solutions developed from recycled sources.",
  },
  products: {
    kicker: "Products",
    title: "Our yarn portfolio",
    lead: "Naylon 6, Naylon 6,6 and polyester filament + covered yarn lines. Open a product for specs; contact us for a quote or sample.",
    all: "All",
    soon: "Image coming soon",
    quote: "Request a quote",
    quoteLine: "For a quote or sample",
  },
  blog: {
    title: "Articles",
    lead: "Articles on the plant, products and production.",
    empty: "Articles will be published here soon.",
  },
  corporate: {
    kicker: "Company",
    nav: "Company pages",
    hubTitle: "Company",
    hubLead: "Our company, plant, sustainability approach and careers.",
  },
  contact: {
    kicker: "Contact",
    title: "Get in touch",
    lead: "Email or call us for samples, quotes or general questions.",
    formTitle: "Send a message",
    formLead: "Fill in the form. Your message comes straight to us.",
    quick: "Quick contact",
    quickLead: "Call or email us directly.",
    phone: "Phone",
    email: "Email",
    social: "Social",
    socialLead: "Production and brand updates.",
    addresses: "Our addresses",
    mapsNote: "Each location opens in Google Maps.",
    openMap: "Open in Maps",
  },
  form: {
    name: "Full name",
    namePh: "Your name",
    email: "Email",
    phone: "Phone",
    optional: "(optional)",
    company: "Company",
    companyPh: "Company name",
    request: "Request type",
    message: "Your message",
    messagePh: "Order, sample or a general question…",
    send: "Send message",
    sending: "Sending",
    sent: "We received your message and will reply shortly.",
    groups: {
      "Numune talebi": "Sample request",
      "İplik teklifi": "Yarn quote",
      "Genel bilgi": "General information",
      Diğer: "Other",
    },
  },
};

const de: Dictionary = {
  ...en,
  nav: {
    home: "Startseite",
    corporate: "Unternehmen",
    about: "Über uns",
    factory: "Unser Werk",
    sustainability: "Nachhaltigkeit",
    careers: "Karriere",
    products: "Produkte",
    contact: "Kontakt",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    main: "Hauptmenü",
    mobile: "Mobilmenü",
  },
  footer: {
    menu: "Menü",
    contact: "Kontakt",
    addresses: "Adressen",
    rights: "Alle Rechte vorbehalten.",
  },
  hero: {
    eyebrow: "Industriegarne aus der Türkei in die Welt",
    title: "EUROPAS GRÖSSTE VOLLINTEGRIERTE FABRIK FÜR UMWUNDENES GARN",
    body: "Wir produzieren Naylon 6 und Naylon 6,6 als POY, FDY, DTY, ACY, SCY, DCY sowie Spezialgarne nach hohen Qualitätsstandards und liefern sie an die Weltmärkte.",
    productsCta: "Unsere Garne ansehen",
    aboutCta: "OmaFil kennenlernen",
    details: "Mehr erfahren",
  },
  brand: {
    titleBefore: "Mit Qualität und Innovation",
    titleAccent: "erreichen wir die Welt",
  },
  intro: {
    kicker: "Unternehmen",
    title: "Polyamidgarn für die globale Textilindustrie",
    p1: "Polyamid (Naylon 6 und Naylon 6,6) gehört wegen Festigkeit, Elastizität und Abriebfestigkeit zu den wichtigsten textilen Rohstoffen. Erfahrung seit 1999 verbinden wir mit moderner Technik und produzieren Polyamidgarn als POY, FDY, DTY, ACY, SCY und DCY für Strümpfe, Unterwäsche, Sportbekleidung, Teppiche und technische Textilien.",
    p2: "Mit Europas größtem Werk für umwundenes Garn beantworten wir die Anforderungen der globalen Textilindustrie mit Qualität und Verlässlichkeit.",
    cta: "Unser Unternehmen",
  },
  stats: {
    kicker: "Unsere Produktion",
    title: "OmaFil in Zahlen",
    lead: "Mit unserer Jahresproduktion, modernen Werken und unserem Handelsnetz schaffen wir Wert für die Textilindustrie.",
    perYear: "Tonnen/Jahr",
    production: "Produktion",
    area: "Produktionsfläche",
    happy: "Zufriedene",
    customers: "Kunden",
    toCountries: "Länder",
    exportLabel: "Export",
  },
  sustain: {
    ...en.sustain,
    kicker: "Verantwortung für die Zukunft",
    title: "Nachhaltige Industriegarnproduktion",
    lead: "Nachhaltigkeit steht im Zentrum der Produktion: Dach-Solaranlagen, Recyclinggarn und ressourcenschonende Prozesse senken unsere Umweltwirkung.",
    energyTitle: "Erneuerbare Energie",
    energyText: "Saubere Energie durch Aufdach-GES.",
    productionTitle: "Verantwortungsvolle Produktion",
    productionText: "Ressourcenschonende, umweltbewusste Prozesse.",
    cta: "Unser Nachhaltigkeitsansatz",
    plant: "OmaFil Produktionswerk",
    plantText: "Wir stützen Produktionsqualität mit Investitionen in erneuerbare Energie.",
    techKicker: "Umweltfreundlichere Technologien",
    techTitle: "Unsere nachhaltigen Garnlösungen",
    recycleTitle: "Recyclinggarne",
    biobased: "Biobasiertes Polyamidgarn",
    biobasedText: "Biobasiertes Polyamidgarn mit dem Ziel, fossile Rohstoffe zu reduzieren.",
    dopeDyed: "Dope Dyed",
    waterlessText: "Dope-Dyed-Garn mit Fokus auf weniger Wasserverbrauch.",
    recycleText: "Umweltorientierte Garnlösungen aus recycelten Quellen.",
  },
  products: {
    kicker: "Produkte",
    title: "Unser Garnportfolio",
    lead: "Naylon 6, Naylon 6,6 und Polyester-Filament sowie Linien für umwundenes Garn. Für Specs das Produkt öffnen; für Angebot oder Muster schreiben Sie uns.",
    all: "Alle",
    soon: "Bild folgt",
    quote: "Angebot anfragen",
    quoteLine: "Für Angebot oder Muster",
  },
  blog: {
    title: "Beiträge",
    lead: "Beiträge zu Werk, Produkten und Produktion.",
    empty: "Beiträge werden hier in Kürze veröffentlicht.",
  },
  corporate: {
    kicker: "Unternehmen",
    nav: "Unternehmensseiten",
    hubTitle: "Unternehmen",
    hubLead: "Unser Unternehmen, das Werk, Nachhaltigkeit und Karriere.",
  },
  contact: {
    kicker: "Kontakt",
    title: "Kontaktieren Sie uns",
    lead: "Schreiben oder rufen Sie uns für Muster, Angebote oder allgemeine Fragen an.",
    formTitle: "Nachricht senden",
    formLead: "Füllen Sie das Formular aus. Ihre Nachricht erreicht uns direkt.",
    quick: "Schneller Kontakt",
    quickLead: "Rufen Sie an oder schreiben Sie eine E-Mail.",
    phone: "Telefon",
    email: "E-Mail",
    social: "Social",
    socialLead: "Aktuelle Produktion und Marke.",
    addresses: "Unsere Adressen",
    mapsNote: "Jeder Standort öffnet sich in Google Maps.",
    openMap: "In Karte öffnen",
  },
  form: {
    name: "Name",
    namePh: "Ihr Name",
    email: "E-Mail",
    phone: "Telefon",
    optional: "(optional)",
    company: "Firma",
    companyPh: "Firmenname",
    request: "Art der Anfrage",
    message: "Ihre Nachricht",
    messagePh: "Bestellung, Muster oder eine allgemeine Frage…",
    send: "Nachricht senden",
    sending: "Wird gesendet",
    sent: "Wir haben Ihre Nachricht erhalten und antworten in Kürze.",
    groups: {
      "Numune talebi": "Musteranfrage",
      "İplik teklifi": "Garnangebot",
      "Genel bilgi": "Allgemeine Information",
      Diğer: "Sonstiges",
    },
  },
};

const fr: Dictionary = {
  ...en,
  nav: {
    home: "Accueil",
    corporate: "Entreprise",
    about: "À propos",
    factory: "Notre usine",
    sustainability: "Durabilité",
    careers: "Carrières",
    products: "Produits",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    main: "Menu principal",
    mobile: "Menu mobile",
  },
  footer: {
    menu: "Menu",
    contact: "Contact",
    addresses: "Adresses",
    rights: "Tous droits réservés.",
  },
  hero: {
    eyebrow: "Fil industriel de la Turquie vers le monde",
    title: "LA PLUS GRANDE USINE DE FIL GUIPÉ ENTIÈREMENT INTÉGRÉE D’EUROPE",
    body: "Nous produisons le Naylon 6 et le Naylon 6,6 en POY, FDY, DTY, ACY, SCY, DCY ainsi que des fils spéciaux, selon des standards de qualité élevés, pour les marchés mondiaux.",
    productsCta: "Voir nos fils",
    aboutCta: "Découvrir OmaFil",
    details: "En savoir plus",
  },
  brand: {
    titleBefore: "Par la qualité et l’innovation",
    titleAccent: "nous touchons le monde",
  },
  intro: {
    kicker: "Entreprise",
    title: "Fil polyamide pour le textile mondial",
    p1: "Le polyamide (Naylon 6 et Naylon 6,6) est l’une des matières premières les plus critiques du textile, pour sa résistance, son élasticité et sa tenue à l’abrasion. Depuis 1999, nous associons cette expérience à une technologie avancée et produisons du fil polyamide en POY, FDY, DTY, ACY, SCY et DCY pour la chaussette, la lingerie, le sport, le tapis et le textile technique.",
    p2: "Avec la plus grande usine de fil guipé d’Europe, nous répondons aux besoins de l’industrie textile mondiale par la qualité et la fiabilité.",
    cta: "Notre entreprise",
  },
  stats: {
    kicker: "Notre production",
    title: "OmaFil en chiffres",
    lead: "Avec notre production annuelle, nos usines modernes et notre réseau commercial, nous apportons de la valeur au textile.",
    perYear: "Tonnes/an",
    production: "Production",
    area: "Surface de production",
    happy: "Satisfaits",
    customers: "Clients",
    toCountries: "Pays",
    exportLabel: "Export",
  },
  products: {
    kicker: "Produits",
    title: "Notre portefeuille de fils",
    lead: "Lignes filament et fil guipé Naylon 6, Naylon 6,6 et polyester. Ouvrez un produit pour les specs ; contactez-nous pour un devis ou un échantillon.",
    all: "Tous",
    soon: "Image à venir",
    quote: "Demander un devis",
    quoteLine: "Pour un devis ou un échantillon",
  },
  blog: {
    title: "Articles",
    lead: "Articles sur l’usine, les produits et la production.",
    empty: "Les articles seront publiés ici prochainement.",
  },
  corporate: {
    kicker: "Entreprise",
    nav: "Pages entreprise",
    hubTitle: "Entreprise",
    hubLead: "Notre société, l’usine, la durabilité et les carrières.",
  },
  contact: {
    kicker: "Contact",
    title: "Contactez-nous",
    lead: "Écrivez-nous ou appelez-nous pour un échantillon, un devis ou une question générale.",
    formTitle: "Envoyer un message",
    formLead: "Remplissez le formulaire. Votre message nous parvient directement.",
    quick: "Contact rapide",
    quickLead: "Appelez ou écrivez directement.",
    phone: "Téléphone",
    email: "E-mail",
    social: "Réseaux",
    socialLead: "Actualités production et marque.",
    addresses: "Nos adresses",
    mapsNote: "Chaque site s’ouvre dans Google Maps.",
    openMap: "Ouvrir la carte",
  },
  form: {
    name: "Nom et prénom",
    namePh: "Votre nom",
    email: "E-mail",
    phone: "Téléphone",
    optional: "(facultatif)",
    company: "Société",
    companyPh: "Nom de la société",
    request: "Type de demande",
    message: "Votre message",
    messagePh: "Commande, échantillon ou question générale…",
    send: "Envoyer",
    sending: "Envoi",
    sent: "Message reçu. Nous vous répondrons rapidement.",
    groups: {
      "Numune talebi": "Demande d’échantillon",
      "İplik teklifi": "Devis fil",
      "Genel bilgi": "Information générale",
      Diğer: "Autre",
    },
  },
};

const es: Dictionary = {
  ...en,
  nav: {
    home: "Inicio",
    corporate: "Empresa",
    about: "Sobre nosotros",
    factory: "Nuestra fábrica",
    sustainability: "Sostenibilidad",
    careers: "Empleo",
    products: "Productos",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    main: "Menú principal",
    mobile: "Menú móvil",
  },
  footer: {
    menu: "Menú",
    contact: "Contacto",
    addresses: "Direcciones",
    rights: "Todos los derechos reservados.",
  },
  hero: {
    eyebrow: "Hilo industrial de Turquía al mundo",
    title: "LA MAYOR FÁBRICA DE HILO RECUBIERTO TOTALMENTE INTEGRADA DE EUROPA",
    body: "Producimos Naylon 6 y Naylon 6,6 en POY, FDY, DTY, ACY, SCY, DCY y soluciones de hilo especial con altos estándares de calidad para los mercados mundiales.",
    productsCta: "Ver nuestros hilos",
    aboutCta: "Conocer OmaFil",
    details: "Más información",
  },
  brand: {
    titleBefore: "Con calidad e innovación",
    titleAccent: "llegamos al mundo",
  },
  intro: {
    kicker: "Empresa",
    title: "Hilo de poliamida para el textil global",
    p1: "La poliamida (Naylon 6 y Naylon 6,6) es una de las materias primas más críticas del textil por su resistencia, elasticidad y resistencia a la abrasión. Desde 1999 unimos esa experiencia con tecnología avanzada y producimos hilo de poliamida en POY, FDY, DTY, ACY, SCY y DCY para calcetería, ropa interior, deporte, alfombra y textil técnico.",
    p2: "Con la mayor planta de hilo recubierto de Europa respondemos a la industria textil global con calidad y fiabilidad.",
    cta: "Nuestra empresa",
  },
  stats: {
    kicker: "Nuestra producción",
    title: "OmaFil en cifras",
    lead: "Con nuestra producción anual, plantas modernas y red comercial aportamos valor al textil.",
    perYear: "Toneladas/año",
    production: "Producción",
    area: "Superficie de producción",
    happy: "Satisfechos",
    customers: "Clientes",
    toCountries: "Países",
    exportLabel: "Exportación",
  },
  products: {
    kicker: "Productos",
    title: "Nuestro portafolio de hilos",
    lead: "Líneas de filamento y hilo recubierto de Naylon 6, Naylon 6,6 y poliéster. Abra un producto para las specs; contáctenos para oferta o muestra.",
    all: "Todos",
    soon: "Imagen próximamente",
    quote: "Pedir oferta",
    quoteLine: "Para oferta o muestra",
  },
  blog: {
    title: "Artículos",
    lead: "Artículos sobre la planta, los productos y la producción.",
    empty: "Los artículos se publicarán aquí pronto.",
  },
  corporate: {
    kicker: "Empresa",
    nav: "Páginas de empresa",
    hubTitle: "Empresa",
    hubLead: "Nuestra empresa, la planta, la sostenibilidad y el empleo.",
  },
  contact: {
    kicker: "Contacto",
    title: "Contáctenos",
    lead: "Escríbanos o llámenos para muestras, ofertas o consultas generales.",
    formTitle: "Enviar un mensaje",
    formLead: "Complete el formulario. Su mensaje nos llega directamente.",
    quick: "Contacto rápido",
    quickLead: "Llame o escriba directamente.",
    phone: "Teléfono",
    email: "Correo",
    social: "Redes",
    socialLead: "Novedades de producción y marca.",
    addresses: "Nuestras direcciones",
    mapsNote: "Cada sede se abre en Google Maps.",
    openMap: "Abrir mapa",
  },
  form: {
    name: "Nombre y apellidos",
    namePh: "Su nombre",
    email: "Correo",
    phone: "Teléfono",
    optional: "(opcional)",
    company: "Empresa",
    companyPh: "Nombre de la empresa",
    request: "Tipo de solicitud",
    message: "Su mensaje",
    messagePh: "Pedido, muestra o consulta general…",
    send: "Enviar mensaje",
    sending: "Enviando",
    sent: "Mensaje recibido. Responderemos en breve.",
    groups: {
      "Numune talebi": "Solicitud de muestra",
      "İplik teklifi": "Oferta de hilo",
      "Genel bilgi": "Información general",
      Diğer: "Otro",
    },
  },
};

const it: Dictionary = {
  ...en,
  nav: {
    home: "Home",
    corporate: "Azienda",
    about: "Chi siamo",
    factory: "Il nostro stabilimento",
    sustainability: "Sostenibilità",
    careers: "Lavora con noi",
    products: "Prodotti",
    contact: "Contatti",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    main: "Menu principale",
    mobile: "Menu mobile",
  },
  footer: {
    menu: "Menu",
    contact: "Contatti",
    addresses: "Indirizzi",
    rights: "Tutti i diritti riservati.",
  },
  hero: {
    eyebrow: "Filo industriale dalla Turchia al mondo",
    title: "IL PIÙ GRANDE STABILIMENTO DI FILATO RICOPERTO COMPLETAMENTE INTEGRATO D’EUROPA",
    body: "Produciamo Naylon 6 e Naylon 6,6 in POY, FDY, DTY, ACY, SCY, DCY e filati speciali con elevati standard qualitativi per i mercati mondiali.",
    productsCta: "Vedi i nostri filati",
    aboutCta: "Scopri OmaFil",
    details: "Dettagli",
  },
  brand: {
    titleBefore: "Con qualità e innovazione",
    titleAccent: "raggiungiamo il mondo",
  },
  intro: {
    kicker: "Azienda",
    title: "Filato di poliammide per il tessile globale",
    p1: "La poliammide (Naylon 6 e Naylon 6,6) è una delle materie prime più critiche del tessile per resistenza, elasticità e resistenza all’abrasione. Dal 1999 uniamo questa esperienza alla tecnologia e produciamo filato di poliammide in POY, FDY, DTY, ACY, SCY e DCY per calzetteria, intimo, sport, tappeti e tessile tecnico.",
    p2: "Con il più grande stabilimento di filato ricoperto d’Europa rispondiamo all’industria tessile globale con qualità e affidabilità.",
    cta: "La nostra azienda",
  },
  stats: {
    kicker: "La nostra produzione",
    title: "OmaFil in cifre",
    lead: "Con la produzione annuale, gli stabilimenti moderni e la rete commerciale creiamo valore per il tessile.",
    perYear: "Tonnellate/anno",
    production: "Produzione",
    area: "Superficie di produzione",
    happy: "Soddisfatti",
    customers: "Clienti",
    toCountries: "Paesi",
    exportLabel: "Export",
  },
  products: {
    kicker: "Prodotti",
    title: "Il nostro portafoglio filati",
    lead: "Linee filament e filato ricoperto Naylon 6, Naylon 6,6 e poliestere. Apri un prodotto per le specs; contattaci per offerta o campione.",
    all: "Tutti",
    soon: "Immagine in arrivo",
    quote: "Richiedi un’offerta",
    quoteLine: "Per offerta o campione",
  },
  blog: {
    title: "Articoli",
    lead: "Articoli su stabilimento, prodotti e produzione.",
    empty: "Gli articoli saranno pubblicati qui a breve.",
  },
  corporate: {
    kicker: "Azienda",
    nav: "Pagine aziendali",
    hubTitle: "Azienda",
    hubLead: "La società, lo stabilimento, la sostenibilità e il lavoro.",
  },
  contact: {
    kicker: "Contatti",
    title: "Contattaci",
    lead: "Scrivi o chiama per campioni, offerte o domande generali.",
    formTitle: "Invia un messaggio",
    formLead: "Compila il modulo. Il messaggio arriva direttamente a noi.",
    quick: "Contatto rapido",
    quickLead: "Chiama o scrivi direttamente.",
    phone: "Telefono",
    email: "Email",
    social: "Social",
    socialLead: "Aggiornamenti su produzione e marchio.",
    addresses: "I nostri indirizzi",
    mapsNote: "Ogni sede si apre in Google Maps.",
    openMap: "Apri la mappa",
  },
  form: {
    name: "Nome e cognome",
    namePh: "Il tuo nome",
    email: "Email",
    phone: "Telefono",
    optional: "(facoltativo)",
    company: "Azienda",
    companyPh: "Nome azienda",
    request: "Tipo di richiesta",
    message: "Il tuo messaggio",
    messagePh: "Ordine, campione o domanda generale…",
    send: "Invia messaggio",
    sending: "Invio",
    sent: "Messaggio ricevuto. Risponderemo a breve.",
    groups: {
      "Numune talebi": "Richiesta campione",
      "İplik teklifi": "Offerta filato",
      "Genel bilgi": "Informazione generale",
      Diğer: "Altro",
    },
  },
};

const pt: Dictionary = {
  ...en,
  nav: {
    home: "Início",
    corporate: "Empresa",
    about: "Sobre nós",
    factory: "A nossa fábrica",
    sustainability: "Sustentabilidade",
    careers: "Carreiras",
    products: "Produtos",
    contact: "Contacto",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    main: "Menu principal",
    mobile: "Menu móvel",
  },
  footer: {
    menu: "Menu",
    contact: "Contacto",
    addresses: "Moradas",
    rights: "Todos os direitos reservados.",
  },
  hero: {
    eyebrow: "Fio industrial da Turquia para o mundo",
    title: "A MAIOR FÁBRICA DE FIO RECOBERTO TOTALMENTE INTEGRADA DA EUROPA",
    body: "Produzimos Naylon 6 e Naylon 6,6 em POY, FDY, DTY, ACY, SCY, DCY e fios especiais com elevados padrões de qualidade para os mercados mundiais.",
    productsCta: "Ver os nossos fios",
    aboutCta: "Conhecer a OmaFil",
    details: "Mais informação",
  },
  brand: {
    titleBefore: "Com qualidade e inovação",
    titleAccent: "chegamos ao mundo",
  },
  intro: {
    kicker: "Empresa",
    title: "Fio de poliamida para o têxtil global",
    p1: "A poliamida (Naylon 6 e Naylon 6,6) é uma das matérias-primas mais críticas do têxtil pela resistência, elasticidade e resistência à abrasão. Desde 1999 juntamos essa experiência à tecnologia e produzimos fio de poliamida em POY, FDY, DTY, ACY, SCY e DCY para meias, lingerie, desporto, alcatifa e têxtil técnico.",
    p2: "Com a maior unidade de fio recoberto da Europa respondemos à indústria têxtil global com qualidade e fiabilidade.",
    cta: "A nossa empresa",
  },
  stats: {
    kicker: "A nossa produção",
    title: "A OmaFil em números",
    lead: "Com a produção anual, fábricas modernas e a rede comercial criamos valor para o têxtil.",
    perYear: "Toneladas/ano",
    production: "Produção",
    area: "Área de produção",
    happy: "Satisfeitos",
    customers: "Clientes",
    toCountries: "Países",
    exportLabel: "Exportação",
  },
  products: {
    kicker: "Produtos",
    title: "O nosso portefólio de fios",
    lead: "Linhas de filamento e fio recoberto Naylon 6, Naylon 6,6 e poliéster. Abra um produto para as specs; contacte-nos para orçamento ou amostra.",
    all: "Todos",
    soon: "Imagem em breve",
    quote: "Pedir orçamento",
    quoteLine: "Para orçamento ou amostra",
  },
  blog: {
    title: "Artigos",
    lead: "Artigos sobre a fábrica, os produtos e a produção.",
    empty: "Os artigos serão publicados aqui em breve.",
  },
  corporate: {
    kicker: "Empresa",
    nav: "Páginas da empresa",
    hubTitle: "Empresa",
    hubLead: "A empresa, a fábrica, a sustentabilidade e as carreiras.",
  },
  contact: {
    kicker: "Contacto",
    title: "Fale connosco",
    lead: "Escreva ou ligue para amostras, orçamentos ou questões gerais.",
    formTitle: "Enviar mensagem",
    formLead: "Preencha o formulário. A mensagem chega-nos diretamente.",
    quick: "Contacto rápido",
    quickLead: "Ligue ou escreva diretamente.",
    phone: "Telefone",
    email: "E-mail",
    social: "Redes",
    socialLead: "Novidades de produção e marca.",
    addresses: "As nossas moradas",
    mapsNote: "Cada local abre no Google Maps.",
    openMap: "Abrir mapa",
  },
  form: {
    name: "Nome completo",
    namePh: "O seu nome",
    email: "E-mail",
    phone: "Telefone",
    optional: "(opcional)",
    company: "Empresa",
    companyPh: "Nome da empresa",
    request: "Tipo de pedido",
    message: "A sua mensagem",
    messagePh: "Encomenda, amostra ou questão geral…",
    send: "Enviar mensagem",
    sending: "A enviar",
    sent: "Mensagem recebida. Responderemos em breve.",
    groups: {
      "Numune talebi": "Pedido de amostra",
      "İplik teklifi": "Orçamento de fio",
      "Genel bilgi": "Informação geral",
      Diğer: "Outro",
    },
  },
};

const nl: Dictionary = {
  ...en,
  nav: {
    home: "Home",
    corporate: "Bedrijf",
    about: "Over ons",
    factory: "Onze fabriek",
    sustainability: "Duurzaamheid",
    careers: "Werken bij",
    products: "Producten",
    contact: "Contact",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    main: "Hoofdmenu",
    mobile: "Mobiel menu",
  },
  footer: {
    menu: "Menu",
    contact: "Contact",
    addresses: "Adressen",
    rights: "Alle rechten voorbehouden.",
  },
  hero: {
    eyebrow: "Industrieel garen van Turkije naar de wereld",
    title: "EUROPA’S GROOTSTE VOLLEDIG GEÏNTEGREERDE FABRIEK VOOR OMWONDEN GAREN",
    body: "Wij produceren Naylon 6 en Naylon 6,6 als POY, FDY, DTY, ACY, SCY, DCY en speciale garens volgens hoge kwaliteitsnormen voor de wereldmarkt.",
    productsCta: "Bekijk onze garens",
    aboutCta: "Ontdek OmaFil",
    details: "Meer info",
  },
  brand: {
    titleBefore: "Met kwaliteit en innovatie",
    titleAccent: "bereiken we de wereld",
  },
  intro: {
    kicker: "Bedrijf",
    title: "Polyamidegaren voor de wereldwijde textielindustrie",
    p1: "Polyamide (Naylon 6 en Naylon 6,6) is door sterkte, elasticiteit en slijtvastheid een van de belangrijkste textielgrondstoffen. Sinds 1999 combineren we die ervaring met technologie en produceren we polyamidegaren als POY, FDY, DTY, ACY, SCY en DCY voor kousen, ondergoed, sport, tapijt en technisch textiel.",
    p2: "Met de grootste fabriek voor omwonden garen van Europa beantwoorden we de wereldwijde textielindustrie met kwaliteit en betrouwbaarheid.",
    cta: "Ons bedrijf",
  },
  stats: {
    kicker: "Onze productie",
    title: "OmaFil in cijfers",
    lead: "Met onze jaarproductie, moderne fabrieken en handelsnetwerk voegen we waarde toe aan textiel.",
    perYear: "Ton/jaar",
    production: "Productie",
    area: "Productieoppervlakte",
    happy: "Tevreden",
    customers: "klanten",
    toCountries: "Landen",
    exportLabel: "Export",
  },
  products: {
    kicker: "Producten",
    title: "Ons garenportfolio",
    lead: "Lijnen voor filament en omwonden garen: Naylon 6, Naylon 6,6 en polyester. Open een product voor specs; neem contact op voor offerte of monster.",
    all: "Alles",
    soon: "Afbeelding volgt",
    quote: "Offerte aanvragen",
    quoteLine: "Voor offerte of monster",
  },
  blog: {
    title: "Artikelen",
    lead: "Artikelen over de fabriek, producten en productie.",
    empty: "Artikelen worden hier binnenkort geplaatst.",
  },
  corporate: {
    kicker: "Bedrijf",
    nav: "Bedrijfspagina’s",
    hubTitle: "Bedrijf",
    hubLead: "Ons bedrijf, de fabriek, duurzaamheid en werken bij ons.",
  },
  contact: {
    kicker: "Contact",
    title: "Neem contact op",
    lead: "Mail of bel voor monsters, offertes of algemene vragen.",
    formTitle: "Bericht sturen",
    formLead: "Vul het formulier in. Uw bericht komt direct bij ons.",
    quick: "Snel contact",
    quickLead: "Bel of mail direct.",
    phone: "Telefoon",
    email: "E-mail",
    social: "Social",
    socialLead: "Nieuws over productie en merk.",
    addresses: "Onze adressen",
    mapsNote: "Elke locatie opent in Google Maps.",
    openMap: "Open kaart",
  },
  form: {
    name: "Naam",
    namePh: "Uw naam",
    email: "E-mail",
    phone: "Telefoon",
    optional: "(optioneel)",
    company: "Bedrijf",
    companyPh: "Bedrijfsnaam",
    request: "Type aanvraag",
    message: "Uw bericht",
    messagePh: "Order, monster of een algemene vraag…",
    send: "Bericht versturen",
    sending: "Verzenden",
    sent: "Bericht ontvangen. We reageren snel.",
    groups: {
      "Numune talebi": "Monsterverzoek",
      "İplik teklifi": "Garenofferte",
      "Genel bilgi": "Algemene informatie",
      Diğer: "Overig",
    },
  },
};

const ru: Dictionary = {
  ...en,
  nav: {
    home: "Главная",
    corporate: "Компания",
    about: "О нас",
    factory: "Наш завод",
    sustainability: "Устойчивость",
    careers: "Карьера",
    products: "Продукция",
    contact: "Контакты",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    main: "Главное меню",
    mobile: "Мобильное меню",
  },
  footer: {
    menu: "Меню",
    contact: "Контакты",
    addresses: "Адреса",
    rights: "Все права защищены.",
  },
  hero: {
    eyebrow: "Промышленная пряжа из Турции в мир",
    title: "КРУПНЕЙШАЯ В ЕВРОПЕ ПОЛНОСТЬЮ ИНТЕГРИРОВАННАЯ ФАБРИКА ОБКРУЧЕННОЙ ПРЯЖИ",
    body: "Мы производим Naylon 6 и Naylon 6,6 в формах POY, FDY, DTY, ACY, SCY, DCY и специальные пряжи по высоким стандартам качества для мировых рынков.",
    productsCta: "Смотреть пряжу",
    aboutCta: "Узнать OmaFil",
    details: "Подробнее",
  },
  brand: {
    titleBefore: "Качеством и инновациями",
    titleAccent: "мы выходим в мир",
  },
  intro: {
    kicker: "Компания",
    title: "Полиамидная пряжа для мирового текстиля",
    p1: "Полиамид (Naylon 6 и Naylon 6,6) — одно из ключевых сырьевых материалов текстиля благодаря прочности, эластичности и стойкости к истиранию. С 1999 года мы соединяем этот опыт с технологиями и производим полиамидную пряжу POY, FDY, DTY, ACY, SCY и DCY для чулочно-носочных изделий, белья, спорта, ковров и технического текстиля.",
    p2: "Крупнейший в Европе завод обкрученной пряжи отвечает потребностям мировой текстильной индустрии качеством и надежностью.",
    cta: "Наша компания",
  },
  stats: {
    kicker: "Наше производство",
    title: "OmaFil в цифрах",
    lead: "Годовым выпуском, современными заводами и торговой сетью мы создаем ценность для текстиля.",
    perYear: "Тонн/год",
    production: "Производство",
    area: "Производственная площадь",
    happy: "Довольных",
    customers: "клиентов",
    toCountries: "Стран",
    exportLabel: "Экспорт",
  },
  products: {
    kicker: "Продукция",
    title: "Наш ассортимент пряжи",
    lead: "Линии filament и обкрученной пряжи: Naylon 6, Naylon 6,6 и полиэстер. Откройте продукт для specs; напишите нам для предложения или образца.",
    all: "Все",
    soon: "Изображение скоро",
    quote: "Запросить предложение",
    quoteLine: "Для предложения или образца",
  },
  blog: {
    title: "Статьи",
    lead: "Статьи о заводе, продукции и производстве.",
    empty: "Статьи скоро появятся здесь.",
  },
  corporate: {
    kicker: "Компания",
    nav: "Страницы компании",
    hubTitle: "Компания",
    hubLead: "Компания, завод, устойчивость и карьера.",
  },
  contact: {
    kicker: "Контакты",
    title: "Свяжитесь с нами",
    lead: "Напишите или позвоните по образцам, предложениям или общим вопросам.",
    formTitle: "Отправить сообщение",
    formLead: "Заполните форму. Сообщение приходит нам напрямую.",
    quick: "Быстрая связь",
    quickLead: "Позвоните или напишите напрямую.",
    phone: "Телефон",
    email: "Эл. почта",
    social: "Соцсети",
    socialLead: "Новости производства и бренда.",
    addresses: "Наши адреса",
    mapsNote: "Каждая точка открывается в Google Maps.",
    openMap: "Открыть карту",
  },
  form: {
    name: "Имя и фамилия",
    namePh: "Ваше имя",
    email: "Эл. почта",
    phone: "Телефон",
    optional: "(необязательно)",
    company: "Компания",
    companyPh: "Название компании",
    request: "Тип запроса",
    message: "Ваше сообщение",
    messagePh: "Заказ, образец или общий вопрос…",
    send: "Отправить",
    sending: "Отправка",
    sent: "Сообщение получено. Мы ответим в ближайшее время.",
    groups: {
      "Numune talebi": "Запрос образца",
      "İplik teklifi": "Предложение по пряже",
      "Genel bilgi": "Общая информация",
      Diğer: "Другое",
    },
  },
};

const ar: Dictionary = {
  ...en,
  nav: {
    home: "الرئيسية",
    corporate: "الشركة",
    about: "من نحن",
    factory: "مصنعنا",
    sustainability: "الاستدامة",
    careers: "الوظائف",
    products: "المنتجات",
    contact: "اتصل بنا",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    main: "القائمة الرئيسية",
    mobile: "قائمة الجوال",
  },
  footer: {
    menu: "القائمة",
    contact: "اتصل بنا",
    addresses: "العناوين",
    rights: "جميع الحقوق محفوظة.",
  },
  hero: {
    eyebrow: "خيوط صناعية من تركيا إلى العالم",
    title: "أكبر مصنع خيوط مغلفة متكامل بالكامل في أوروبا",
    body: "ننتج Naylon 6 وNaylon 6,6 بصيغ POY وFDY وDTY وACY وSCY وDCY وحلولاً خاصة بمعايير جودة عالية للأسواق العالمية.",
    productsCta: "اطلع على خيوطنا",
    aboutCta: "تعرّف على OmaFil",
    details: "مزيد من التفاصيل",
  },
  brand: {
    titleBefore: "بالجودة والابتكار",
    titleAccent: "نصل إلى العالم",
  },
  intro: {
    kicker: "الشركة",
    title: "خيط بولي أميد للنسيج العالمي",
    p1: "البولي أميد (Naylon 6 وNaylon 6,6) من أهم خامات النسيج لقوته ومرونته ومقاومته للتآكل. منذ 1999 نجمع هذه الخبرة مع التقنية وننتج خيط بولي أميد بصيغ POY وFDY وDTY وACY وSCY وDCY للجوارب والملابس الداخلية والرياضة والسجاد والنسيج التقني.",
    p2: "بأكبر مصنع خيوط مغلفة في أوروبا نلبي حاجة صناعة النسيج العالمية بالجودة والموثوقية.",
    cta: "شركتنا",
  },
  stats: {
    kicker: "إنتاجنا",
    title: "OmaFil بالأرقام",
    lead: "بإنتاجنا السنوي ومصانعنا الحديثة وشبكة تجارتنا نضيف قيمة لقطاع النسيج.",
    perYear: "طن/سنة",
    production: "الإنتاج",
    area: "مساحة الإنتاج",
    happy: "راضون",
    customers: "عملاء",
    toCountries: "دول",
    exportLabel: "التصدير",
  },
  products: {
    kicker: "المنتجات",
    title: "مجموعة الخيوط",
    lead: "خطوط filament وخيوط مغلفة من Naylon 6 وNaylon 6,6 والبوليستر. افتح المنتج للاطلاع على Specs، وتواصل معنا للعرض أو العينة.",
    all: "الكل",
    soon: "الصورة قريباً",
    quote: "اطلب عرضاً",
    quoteLine: "للعرض أو العينة",
  },
  blog: {
    title: "مقالات",
    lead: "مقالات عن المصنع والمنتجات والإنتاج.",
    empty: "ستُنشر المقالات هنا قريباً.",
  },
  corporate: {
    kicker: "الشركة",
    nav: "صفحات الشركة",
    hubTitle: "الشركة",
    hubLead: "شركتنا ومصنعنا ونهج الاستدامة والوظائف.",
  },
  contact: {
    kicker: "اتصل بنا",
    title: "تواصل معنا",
    lead: "راسلنا أو اتصل بنا للعينات أو العروض أو الأسئلة العامة.",
    formTitle: "أرسل رسالة",
    formLead: "املأ النموذج. تصل رسالتك إلينا مباشرة.",
    quick: "تواصل سريع",
    quickLead: "اتصل أو راسل مباشرة.",
    phone: "الهاتف",
    email: "البريد",
    social: "التواصل",
    socialLead: "أخبار الإنتاج والعلامة.",
    addresses: "عناويننا",
    mapsNote: "كل موقع يفتح في خرائط Google.",
    openMap: "افتح الخريطة",
  },
  form: {
    name: "الاسم الكامل",
    namePh: "اسمك",
    email: "البريد",
    phone: "الهاتف",
    optional: "(اختياري)",
    company: "الشركة",
    companyPh: "اسم الشركة",
    request: "نوع الطلب",
    message: "رسالتك",
    messagePh: "طلب أو عينة أو سؤال عام…",
    send: "إرسال",
    sending: "جارٍ الإرسال",
    sent: "استلمنا رسالتك وسنرد قريباً.",
    groups: {
      "Numune talebi": "طلب عينة",
      "İplik teklifi": "عرض سعر للخيط",
      "Genel bilgi": "معلومات عامة",
      Diğer: "أخرى",
    },
  },
};

const zh: Dictionary = {
  ...en,
  nav: {
    home: "首页",
    corporate: "公司",
    about: "关于我们",
    factory: "我们的工厂",
    sustainability: "可持续发展",
    careers: "招聘",
    products: "产品",
    contact: "联系我们",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    main: "主菜单",
    mobile: "手机菜单",
  },
  footer: {
    menu: "菜单",
    contact: "联系",
    addresses: "地址",
    rights: "版权所有。",
  },
  hero: {
    eyebrow: "从土耳其走向世界的工业纱线",
    title: "欧洲最大的全整合包覆纱工厂",
    body: "我们按高标准生产 Naylon 6 与 Naylon 6,6 的 POY、FDY、DTY、ACY、SCY、DCY 及特种纱线，供应全球市场。",
    productsCta: "查看纱线产品",
    aboutCta: "了解 OmaFil",
    details: "了解更多",
  },
  brand: {
    titleBefore: "以品质与创新",
    titleAccent: "连接世界",
  },
  intro: {
    kicker: "公司",
    title: "面向全球纺织的聚酰胺纱线",
    p1: "聚酰胺（Naylon 6 与 Naylon 6,6）凭借强度、弹性和耐磨性，是纺织业最关键的原料之一。自 1999 年以来，我们把经验与先进技术结合，以 POY、FDY、DTY、ACY、SCY 和 DCY 形式生产聚酰胺纱线，服务于袜类、内衣、运动、地毯和技术纺织。",
    p2: "凭借欧洲最大的包覆纱工厂，我们以品质和可靠性满足全球纺织业的需求。",
    cta: "我们的公司",
  },
  stats: {
    kicker: "我们的生产",
    title: "OmaFil 数据",
    lead: "凭借年产量、现代化工厂和全球贸易网络，我们为纺织业创造价值。",
    perYear: "吨/年",
    production: "产量",
    area: "生产面积",
    happy: "满意",
    customers: "客户",
    toCountries: "个国家",
    exportLabel: "出口",
  },
  products: {
    kicker: "产品",
    title: "纱线组合",
    lead: "Naylon 6、Naylon 6,6 与涤纶长丝及包覆纱系列。查看产品了解 Specs；联系我们获取报价或样品。",
    all: "全部",
    soon: "图片即将上线",
    quote: "索取报价",
    quoteLine: "报价或样品",
  },
  blog: {
    title: "文章",
    lead: "关于工厂、产品和生产的文章。",
    empty: "文章即将在此发布。",
  },
  corporate: {
    kicker: "公司",
    nav: "公司页面",
    hubTitle: "公司",
    hubLead: "我们的公司、工厂、可持续发展与招聘。",
  },
  contact: {
    kicker: "联系",
    title: "与我们联系",
    lead: "如需样品、报价或一般咨询，请来信或致电。",
    formTitle: "发送消息",
    formLead: "填写表单，消息将直接送达我们。",
    quick: "快速联系",
    quickLead: "直接致电或发送邮件。",
    phone: "电话",
    email: "邮箱",
    social: "社交",
    socialLead: "生产与品牌动态。",
    addresses: "我们的地址",
    mapsNote: "每个地点都会在 Google 地图中打开。",
    openMap: "打开地图",
  },
  form: {
    name: "姓名",
    namePh: "您的姓名",
    email: "邮箱",
    phone: "电话",
    optional: "（选填）",
    company: "公司",
    companyPh: "公司名称",
    request: "需求类型",
    message: "您的留言",
    messagePh: "订单、样品或一般问题…",
    send: "发送",
    sending: "发送中",
    sent: "我们已收到留言，会尽快回复。",
    groups: {
      "Numune talebi": "样品需求",
      "İplik teklifi": "纱线报价",
      "Genel bilgi": "一般信息",
      Diğer: "其他",
    },
  },
};

const baseDictionaries: Record<Locale, Dictionary> = {
  tr,
  en,
  de,
  fr,
  es,
  it,
  pt,
  nl,
  ru,
  ar,
  zh,
};

export const dictionaries: Record<Locale, Dictionary> = {
  tr: baseDictionaries.tr,
  en: baseDictionaries.en,
  de: baseDictionaries.de,
  fr: { ...baseDictionaries.fr, sustain: sustainOverlay.fr! },
  es: { ...baseDictionaries.es, sustain: sustainOverlay.es! },
  it: { ...baseDictionaries.it, sustain: sustainOverlay.it! },
  pt: { ...baseDictionaries.pt, sustain: sustainOverlay.pt! },
  nl: { ...baseDictionaries.nl, sustain: sustainOverlay.nl! },
  ru: { ...baseDictionaries.ru, sustain: sustainOverlay.ru! },
  ar: { ...baseDictionaries.ar, sustain: sustainOverlay.ar! },
  zh: { ...baseDictionaries.zh, sustain: sustainOverlay.zh! },
};
