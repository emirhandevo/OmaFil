import type { Locale } from "@/i18n/locales";

/** İç sayfa metinleri. tr buradan okunmaz; Keystatic ve mevcut Türkçe kalır. */
export type Inner = {
  about: {
    title: string;
    description: string;
    paragraphs: [string, string];
    growthBefore: string;
    growthAccent: string;
    milestones: { title: string; text: string }[];
    offices: string;
    map: string;
    statsAria: string;
    stats: { title: string; subtitle: string }[];
    focus: [string, string, string];
    sustainKicker: string;
    sustainBefore: string;
    sustainAccent: string;
    sustainAfter: string;
    sustainP1: string;
    sustainP2: string;
    sustainLink: string;
    gesLink: string;
    recycledTitle: string;
    recycledText: string;
    grs: string;
    certs: string;
  };
  factory: {
    title: string;
    description: string;
    headline: string;
    paragraphs: string[];
    since: string;
    sinceBody: string;
    tabsAria: string;
    tabs: { label: string; body: string }[];
    galleryTitle: string;
    galleryBody: string;
    bandTitle: string;
    bandBody: string;
    bandMore: string;
    bandLess: string;
    map: string;
    alts: [string, string, string, string];
    bandAlt: string;
  };
  sustain: {
    title: string;
    description: string;
    paragraphs: string[];
    worldAlt: string;
    whyBefore: string;
    whyAccent: string;
    why: [string, string];
    principles: { title: string; text: string }[];
    yarnKicker: string;
    yarnTitle: string;
    yarnLead: string;
    yarns: { subtitle: string; text: string }[];
    certs: string;
    gesKicker: string;
    gesTitle: string;
    gesP: [string, string];
    gesItems: { title: string; text: string }[];
    gesLink: string;
    plantKicker: string;
    plantText: string;
    plantAlt: string;
  };
  careers: {
    title: string;
    description: string;
    paragraphs: [string, string];
  };
  ges: {
    kicker: string;
    title: string;
    subtitle: string;
    paragraphs: [string, string];
    total: string;
    panels: string;
    imageAlt: string;
    pillars: { title: string; text: string }[];
    respectTitle: string;
    respectText: string;
    capacityTitle: string;
    capacity: (p: {
      total: string;
      elazig: string;
      erbaa: string;
      min: string;
      max: string;
    }) => string;
    metrics: [string, string, string];
    metricAlts: [string, string, string];
    daily: string;
    roofStatus: string;
    fieldStatus: string;
    photo: string;
    capacityLabel: string;
    panelLabel: string;
    close: string;
    prev: string;
    next: string;
    sitesTitle: string;
    sitesLead: string;
    fieldHeading: string;
    roofHeading: string;
    roofLead: (p: { mwp: string; kw: string; min: string; max: string }) => string;
    galleryTitle: string;
    galleryLead: string;
    ctaTitle: string;
    ctaText: string;
    sustainCta: string;
    contactCta: string;
  };
  products: Record<string, string>;
  marquee: Record<string, string>;
};

const productsEn: Inner["products"] = {
  "n6-acy": "Air-jet covered PA6 + elastane. Ecru / black / coloured.",
  "n6-scy": "Single covered PA6 + elastane.",
  "n6-dcy": "Double covered PA6 + elastane.",
  "n6-poy": "PA6. SD / BR / FD options.",
  "n6-fdy": "Fully drawn PA6. Wide denier / filament range.",
  "n6-dty": "Textured PA6. Ecru, black and coloured options.",
  "n66-acy": "Air-jet covered PA66 + elastane. Custom production.",
  "n66-scy": "Single covered PA66 + elastane, including flat options.",
  "n66-dcy": "Double covered PA66 + elastane. Custom production.",
  "n66-poy": "PA66 POY for final DTY. Softel / Nicolite.",
  "n66-fdy": "Fully drawn PA66.",
  "n66-dty": "Textured PA66. Seamless, hosiery and weaving.",
  "pes-acy": "Polyester air-jet cover + elastane.",
  "pes-scy": "Polyester single cover + elastane. Custom options.",
  "pes-dcy": "Polyester double cover + elastane.",
};

const marqueeEn: Inner["marquee"] = {
  "PES DCY Gipe": "Double-covered polyester gipe yarn.",
  "Naylon 6 POY": "Naylon 6 POY yarn.",
  "N6 FDY": "Fully drawn Naylon 6 yarn.",
  "DTY N6": "Textured Naylon 6 yarn.",
  "DTY N66": "Textured Naylon 66 yarn.",
  "ACY N6": "Air-jet covered Naylon 6 yarn.",
  "ACY N66": "Air-jet covered Naylon 66 yarn.",
  "SCY N6 Gipe": "Single-covered Naylon 6 gipe yarn.",
  "SCY N66 Gipe": "Single-covered Naylon 66 gipe yarn.",
  "PES SCY Gipe": "Single-covered polyester gipe yarn.",
  "PES ACY": "Air-jet covered polyester yarn.",
};

function page(
  partial: Omit<Inner, "products" | "marquee"> & {
    products?: Inner["products"];
    marquee?: Inner["marquee"];
  },
): Inner {
  return {
    ...partial,
    // Her dil kendi kopyası. Yoksa en.products aynı nesne olur, bir dil diğerini ezer.
    products: { ...(partial.products ?? productsEn) },
    marquee: { ...(partial.marquee ?? marqueeEn) },
  };
}

const en: Inner = page({
  about: {
    title: "About us",
    description:
      "The path from yarn trading to production continues with a principle of constant development.",
    paragraphs: [
      "Our business began with yarn sales in Sultanhamam, for years the heart of Istanbul’s textile market, and continued with our principle of constant development. In the 2000s we founded OMA POLİMER A.Ş. to adapt to a changing trade.",
      "We strengthened our links abroad, because strength in foreign trade matters as much as in the domestic market. Today we carry on yarn import, production and export together.",
    ],
    growthBefore: "Our growth",
    growthAccent: "story",
    milestones: [
      { title: "Founded", text: "We started with yarn trading in Sultanhamam, Istanbul." },
      { title: "Export begins", text: "We built our links abroad." },
      { title: "First plant", text: "We set up our first production plant." },
      { title: "Capacity increase", text: "We expanded the machine park." },
      { title: "Gipe plant", text: "We brought the gipe yarn plant in Tokat–Erbaa into operation." },
      { title: "GRS certificate", text: "We documented recycled yarn production with GRS." },
    ],
    offices: "Our contact points",
    map: "Open in Maps",
    statsAria: "OmaFil figures",
    stats: [
      { title: "40,000 m² production area", subtitle: "Tokat–Erbaa production plant" },
      { title: "13,000 tonnes/year output", subtitle: "Naylon + polyester gipe" },
      { title: "#1 Largest in Europe", subtitle: "Gipe yarn production plant" },
      { title: "100% renewable energy", subtitle: "Sustainable production target" },
    ],
    focus: ["GRS certified", "Renewable energy", "Zero-waste target"],
    sustainKicker: "Sustainability",
    sustainBefore: "A",
    sustainAccent: "responsible",
    sustainAfter: "approach to the future",
    sustainP1:
      "We put sustainability at the centre of production. With rooftop solar and GRS-certified recycled yarn, we aim to reduce our environmental impact.",
    sustainP2:
      "Resource efficiency, responsible production and circular-economy principles are part of OmaFil’s identity.",
    sustainLink: "Go to the sustainability page",
    gesLink: "GES — solar power system",
    recycledTitle: "Recycled yarn",
    recycledText:
      "With yarn developed from recycled sources we bring the circular economy into production. We offer lower-impact alternatives without dropping our quality standards.",
    grs: "GRS-aligned production",
    certs: "Certificates",
  },
  factory: {
    title: "Our factory",
    description:
      "Europe’s largest polymer / gipe yarn plant is in Tokat–Erbaa.",
    headline: "At Europe’s peak with 13,000 tonnes of annual capacity",
    paragraphs: [
      "Our plant in the Tokat Erbaa Organised Industrial Zone holds the title of Europe’s largest gipe yarn plant, with an annual production capacity of 13,000 tonnes. We serve the global textile industry with high value-added products from our Naylon 6, Naylon 66 and polyester gipe yarn lines.",
      "With the R&D centre it houses, we do more than produce: we also develop the yarn technologies of the future. The plant is an important source of jobs for the region, and the solar power system on our roof covers part of our production’s energy need from clean sources.",
    ],
    since: "Leading the sector since 1999",
    sinceBody:
      "OmaFil builds on nearly a quarter-century of experience at Oma Polimer A.Ş. and offers innovative, sustainable solutions in polymer production. In our modern plants we hold quality and continuity to global standards.",
    tabsAria: "Company direction",
    tabs: [
      {
        label: "Mission",
        body: "To supply the high-quality technical yarns the polymer industry needs, with environmentally minded production. To develop sustainable, innovative solutions that add value to our customers’ processes.",
      },
      {
        label: "History",
        body: "Our group entered textiles in 1999 and grew steadily by investing in technology and people. The deep know-how built inside OMA Tekstil is now OmaFil’s production strength.",
      },
      {
        label: "Vision",
        body: "To be a leading brand chosen worldwide, with technology and sustainability at the centre of synthetic yarn production. To shape the future of textiles through innovative R&D.",
      },
    ],
    galleryTitle: "Our factory",
    galleryBody:
      "Built with modern technology and global standards, the plant is a reliable supply point for textiles, with high output. Our infrastructure and cleaner energy policy support sustainable growth.",
    bandTitle: "Production line",
    bandBody:
      "With a latest-generation machine park for Naylon 6 and 66, we keep error margins low. Precise quality control at every stage produces high-tenacity, long-life yarn.",
    bandMore: "Show more",
    bandLess: "Show less",
    map: "Open the plant in Maps",
    alts: [
      "OmaFil plant — aerial view with solar panels",
      "OmaFil factory entrance",
      "OmaFil production plant",
      "OmaFil factory front",
    ],
    bandAlt: "OmaFil production line",
  },
  sustain: {
    title: "Sustainability",
    description:
      "OMA POLİMER A.Ş. is committed to including social and environmental sustainability in every production process.",
    paragraphs: [
      "For a better world, OMA POLİMER A.Ş. is committed to including social and environmental sustainability in every production process.",
      "Sustainability means keeping production and diversity going while keeping human life viable. It means meeting our needs without taking away the needs of future generations.",
      "For us sustainability is not a slogan. It means using resources efficiently and developing the product accordingly. Solar energy, recycled yarn and dyeing that uses less water are concrete parts of this approach.",
    ],
    worldAlt: "Image of a forested globe",
    whyBefore: "Why",
    whyAccent: "sustainability matters",
    why: [
      "The energy demand that grew with the industrial revolution led to heavy use of non-renewable sources such as oil and coal. Fast industrialisation and urbanisation increased air, water and soil pollution, and deepened loss of biodiversity, soil loss and desertification.",
      "Every living thing is part of an ecosystem in exchange with other living and non-living things. If one part is damaged, the effect shows up elsewhere. We have to act without outrunning nature’s ability to recover, and without breaking that balance.",
    ],
    principles: [
      {
        title: "Use resources wisely",
        text: "We treat efficiency as the rule in production, knowing that environmental resources can run out. The integrity and resilience of ecosystems are protected.",
      },
      {
        title: "Economic growth and environmental balance",
        text: "We aim for economic growth that raises welfare without harming the environment. As output of goods and services rises, human welfare rises with it.",
      },
      {
        title: "Company interest and public interest together",
        text: "Social and environmental issues are part of how we manage, not only economic growth. Company interests do not conflict with public interests.",
      },
    ],
    yarnKicker: "Cleaner technologies",
    yarnTitle: "Sustainable yarns",
    yarnLead:
      "includes social and environmental sustainability in every production process, for a better world.",
    yarns: [
      {
        subtitle: "UNIFI partnership",
        text: "Yarn solutions developed from recycled sources. In 2023 our processes were documented with a GRS certificate.",
      },
      {
        subtitle: "Bio-based polyamide yarn",
        text: "A bio-based polyamide yarn aimed at using less fossil feedstock, with a lower environmental impact and without giving up performance.",
      },
      {
        subtitle: "Waterless dyeing",
        text: "Innovative waterless dyeing focused on using less water. Resource saving starts inside the production line.",
      },
    ],
    certs: "Certificates",
    gesKicker: "Solar power system",
    gesTitle: "We add value for the future and take production energy from the sun",
    gesP: [
      "We see it as our responsibility not only to produce quality for today’s needs, but also to leave a cleaner world. With that vision we fitted the roofs of our plants with a solar power system (GES).",
      "Behind every production run in the factory there is now the clean energy of the sun.",
    ],
    gesItems: [
      {
        title: "100% clean-energy target",
        text: "A large share of the electricity used on our lines comes directly from the high-efficiency solar panels on our roof.",
      },
      {
        title: "A smaller carbon footprint",
        text: "By relying less on fossil fuels, we aim each year for a carbon saving comparable to the oxygen provided by thousands of trees.",
      },
      {
        title: "Leadership in greener industry",
        text: "We aim to lead the shift to sustainable energy in our sector and leave a more livable world to the next generations.",
      },
    ],
    gesLink: "View the GES page",
    plantKicker: "OmaFil production plant",
    plantText: "We support production quality with renewable-energy investment.",
    plantAlt: "OmaFil production plant covered with solar panels",
  },
  careers: {
    title: "Careers",
    description: "The plant is the centre of production. People are managed with the same care.",
    paragraphs: [
      "From hiring to daily work, equal opportunity, a safe place and development come first. Cooperation between departments and safe work inside the plant are how the policy is applied.",
      "For open roles, or a general application, you can send your CV as a PDF.",
    ],
  },
  ges: {
    kicker: "Solar power system",
    title: "Our solar power system",
    subtitle: "We feed production from the sun with the Elazığ field plants and the Erbaa rooftop plants",
    paragraphs: [
      "OmaFil does not only produce quality yarn. We also take energy from renewable sources. The portfolio has two field plants in Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) and two rooftop plants at our Tokat Erbaa factory.",
      "Total installed capacity is 6.76 MWp. Daily output from the fields and the roofs sits in the tens of megawatt-hours, and we reduce our carbon footprint for a greener industry.",
    ],
    total: "Total",
    panels: "panels",
    imageAlt: "OmaFil Erbaa rooftop GES — Oma Polimer plant",
    pillars: [
      {
        title: "Field + rooftop GES",
        text: "5.2 MWp of field plant in Elazığ; 1.56 MWp on the Erbaa factory roof. Two regions, the same sustainability aim.",
      },
      {
        title: "A smaller carbon footprint",
        text: "Every kilowatt-hour we generate cuts fossil-based emissions. Our meters follow the app and plant data.",
      },
      {
        title: "Leadership in greener industry",
        text: "By generating our own energy we aim to be an example of the clean-energy shift in textile production.",
      },
    ],
    respectTitle: "Production that respects nature",
    respectText:
      "We keep technology and new investment at the centre of the work, and we do not set aside our environmental responsibility. Field and rooftop GES investments cut carbon emissions and support ecological balance.",
    capacityTitle: "We produce with our green energy",
    capacity: ({ total, elazig, erbaa, min, max }) =>
      `With ${total} MWp installed (Elazığ ${elazig} MWp field + Erbaa ${erbaa} MWp rooftop) we have about ${min}–${max} GWh of annual generation capacity.`,
    metrics: [
      "Solar energy generated (kWh)",
      "Carbon emissions avoided (tonnes)",
      "Equivalent number of trees",
    ],
    metricAlts: [
      "Elazığ Hacısam GES — OMA 1",
      "Elazığ Kavak GES — OMA 2",
      "Erbaa rooftop GES — Oma Polimer plant",
    ],
    daily: "Daily output",
    roofStatus: "Provisional acceptance / operation",
    fieldStatus: "Production start",
    photo: "photo",
    capacityLabel: "Installed capacity",
    panelLabel: "Panels",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    sitesTitle: "Our plants",
    sitesLead:
      "Two field plants in Elazığ Kovancılar and two rooftop plants on the Tokat Erbaa factory. Total installed capacity is 6.76 MWp.",
    fieldHeading: "Elazığ — field GES",
    roofHeading: "Erbaa — rooftop GES",
    roofLead: ({ mwp, kw, min, max }) =>
      `Oma Polimer rooftop GES totals ${mwp} MWp (${kw} kW). Daily average ${min}–${max} kWh. Two separate systems on the same roof: GES 1 and GES 2.`,
    galleryTitle: "Gallery",
    galleryLead: "Photos of the Hacısam, Kavak and Erbaa rooftop plants.",
    ctaTitle: "Our approach to sustainable production",
    ctaText: "Our GES investment is part of recycled yarn and responsible production.",
    sustainCta: "Sustainability",
    contactCta: "Contact",
  },
});

const de: Inner = page({
  ...en,
  about: {
    ...en.about,
    title: "Über uns",
    description:
      "Der Weg vom Garnhandel zur Produktion geht mit dem Grundsatz ständiger Entwicklung weiter.",
    paragraphs: [
      "Unser Geschäft begann mit dem Garnverkauf in Sultanhamam, jahrelang das Herz des Istanbuler Textilmarkts, und setzte sich mit dem Grundsatz ständiger Entwicklung fort. In den 2000er Jahren gründeten wir OMA POLİMER A.Ş., um uns dem veränderten Handel anzupassen.",
      "Wir festigten unsere Auslandsverbindungen, weil Stärke im Außenhandel ebenso zählt wie im Inland. Heute führen wir Garnimport, Produktion und Export zusammen.",
    ],
    growthBefore: "Unsere",
    growthAccent: "Wachstumsgeschichte",
    milestones: [
      { title: "Gründung", text: "Wir begannen mit dem Garnhandel in Sultanhamam, Istanbul." },
      { title: "Exportbeginn", text: "Wir bauten unsere Auslandsverbindungen auf." },
      { title: "Erstes Werk", text: "Wir errichteten unser erstes Produktionswerk." },
      { title: "Kapazitätsausbau", text: "Wir erweiterten den Maschinenpark." },
      { title: "Gipe-Werk", text: "Wir nahmen das Gipe-Garnwerk in Tokat–Erbaa in Betrieb." },
      { title: "GRS-Zertifikat", text: "Wir belegten die Recyclinggarn-Produktion mit GRS." },
    ],
    offices: "Unsere Kontaktstellen",
    map: "In Karte öffnen",
    statsAria: "OmaFil Zahlen",
    stats: [
      { title: "40.000 m² Produktionsfläche", subtitle: "Produktionswerk Tokat–Erbaa" },
      { title: "13.000 Tonnen/Jahr", subtitle: "Naylon + Polyester-Gipe" },
      { title: "#1 Größtes in Europa", subtitle: "Gipe-Garnwerk" },
      { title: "100 % erneuerbare Energie", subtitle: "Ziel nachhaltiger Produktion" },
    ],
    focus: ["GRS-zertifiziert", "Erneuerbare Energie", "Null-Abfall-Ziel"],
    sustainKicker: "Nachhaltigkeit",
    sustainBefore: "Ein",
    sustainAccent: "verantwortlicher",
    sustainAfter: "Blick in die Zukunft",
    sustainP1:
      "Nachhaltigkeit steht im Zentrum der Produktion. Mit Dach-Solaranlagen und GRS-zertifiziertem Recyclinggarn wollen wir unsere Umweltwirkung senken.",
    sustainP2:
      "Ressourceneffizienz, verantwortungsvolle Produktion und Kreislaufwirtschaft gehören zur Identität von OmaFil.",
    sustainLink: "Zur Nachhaltigkeitsseite",
    gesLink: "GES — Solarstromsystem",
    recycledTitle: "Recyclinggarn",
    recycledText:
      "Mit Garn aus recycelten Quellen bringen wir die Kreislaufwirtschaft in die Produktion. Wir bieten umweltnähere Alternativen, ohne den Qualitätsstandard zu senken.",
    grs: "GRS-gerechte Produktion",
    certs: "Zertifikate",
  },
  factory: {
    ...en.factory,
    title: "Unser Werk",
    description: "Europas größtes Polymer- / Gipe-Garnwerk steht in Tokat–Erbaa.",
    headline: "An Europas Spitze mit 13.000 Tonnen Jahreskapazität",
    paragraphs: [
      "Unser Werk im organisierten Industriegebiet Tokat Erbaa trägt mit einer Jahreskapazität von 13.000 Tonnen den Titel der größten Gipe-Garnfabrik Europas. Mit hochwertigen Produkten aus den Linien für Naylon 6, Naylon 66 und Polyester-Gipe beliefern wir die globale Textilindustrie.",
      "Mit dem eigenen F&E-Zentrum produzieren wir nicht nur: wir entwickeln auch die Garntechnologien der Zukunft. Das Werk ist eine wichtige Beschäftigungsquelle für die Region, und die Solaranlage auf unserem Dach deckt einen Teil des Energiebedarfs der Produktion aus sauberen Quellen.",
    ],
    since: "Seit 1999 führend in der Branche",
    sinceBody:
      "OmaFil stützt sich auf fast ein Vierteljahrhundert Erfahrung von Oma Polimer A.Ş. und bietet innovative, nachhaltige Lösungen in der Polymerproduktion. In modernen Werken halten wir Qualität und Kontinuität auf globalem Niveau.",
    tabsAria: "Unternehmensrichtung",
    tabs: [
      {
        label: "Mission",
        body: "Die hochwertigen technischen Garne liefern, die die Polymerindustrie braucht, mit umweltbewusster Produktion. Nachhaltige, innovative Lösungen entwickeln, die den Prozessen unserer Kunden Wert geben.",
      },
      {
        label: "Geschichte",
        body: "Unsere Gruppe trat 1999 in die Textilwelt ein und wuchs stetig durch Investitionen in Technik und Menschen. Das Wissen aus OMA Tekstil ist heute die Produktionskraft von OmaFil.",
      },
      {
        label: "Vision",
        body: "Eine weltweit gewählte führende Marke sein, mit Technik und Nachhaltigkeit im Zentrum der Synthetikgarnproduktion. Mit innovativer F&E die Zukunft der Textilindustrie mitgestalten.",
      },
    ],
    galleryTitle: "Unser Werk",
    galleryBody:
      "Mit moderner Technik und globalen Standards gebaut, ist das Werk mit hoher Produktion ein verlässlicher Lieferpunkt der Textilindustrie. Infrastruktur und saubere Energiepolitik stützen nachhaltiges Wachstum.",
    bandTitle: "Produktionslinie",
    bandBody:
      "Mit einem Maschinenpark der neuesten Generation für Naylon 6 und 66 halten wir die Fehlerspanne klein. Genaue Qualitätskontrolle in jeder Stufe ergibt hochfeste, langlebige Garne.",
    map: "Werk in der Karte öffnen",
    alts: [
      "OmaFil Werk — Luftbild mit Solarpaneelen",
      "OmaFil Werkseingang",
      "OmaFil Produktionswerk",
      "OmaFil Werksfront",
    ],
    bandMore: "Mehr anzeigen",
    bandLess: "Weniger anzeigen",
    bandAlt: "OmaFil Produktionslinie",
  },
  sustain: {
    ...en.sustain,
    title: "Nachhaltigkeit",
    description:
      "OMA POLİMER A.Ş. verpflichtet sich, soziale und ökologische Nachhaltigkeit in alle Produktionsprozesse einzubeziehen.",
    paragraphs: [
      "Für eine bessere Welt verpflichtet sich OMA POLİMER A.Ş., soziale und ökologische Nachhaltigkeit in alle Produktionsprozesse einzubeziehen.",
      "Nachhaltigkeit heißt, Produktion und Vielfalt zu erhalten und zugleich menschliches Leben dauerhaft zu machen. Unsere Bedürfnisse decken, ohne die Bedürfnisse künftiger Generationen zu nehmen.",
      "Für uns ist Nachhaltigkeit kein Slogan. Sie heißt, Ressourcen effizient zu nutzen und das Produkt danach zu entwickeln. Solarenergie, Recyclinggarn und Färben mit weniger Wasser sind konkrete Teile dieses Ansatzes.",
    ],
    worldAlt: "Bild einer bewaldeten Erde",
    whyBefore: "Warum",
    whyAccent: "Nachhaltigkeit wichtig ist",
    why: [
      "Der mit der industriellen Revolution gewachsene Energiebedarf führte zu starker Nutzung nicht erneuerbarer Quellen wie Öl und Kohle. Schnelle Industrialisierung und Verstädterung vergrößerten Luft-, Wasser- und Bodenverschmutzung und vertieften Biodiversitätsverlust, Bodenverlust und Wüstenbildung.",
      "Jedes Lebewesen ist Teil eines Ökosystems im Austausch mit anderen lebenden und unbelebten Dingen. Wird ein Teil geschädigt, zeigen sich Folgen anderswo. Wir müssen handeln, ohne die Erholungsgeschwindigkeit der Natur zu überholen und ohne das Gleichgewicht zu brechen.",
    ],
    principles: [
      {
        title: "Ressourcen klug nutzen",
        text: "Wir stellen Effizienz in der Produktion voran, weil Umweltressourcen endlich sind. Die Ganzheit und Belastbarkeit der Ökosysteme wird geschützt.",
      },
      {
        title: "Wirtschaftswachstum und Umweltbalance",
        text: "Wir zielen auf Wachstum, das Wohlstand hebt, ohne die Umwelt zu schädigen. Steigt die Produktion, steigt auch der menschliche Wohlstand.",
      },
      {
        title: "Unternehmens- und Gemeinwohl zusammen",
        text: "Soziale und Umweltthemen gehören zur Führung, nicht nur das Wachstum. Unternehmensinteressen stehen nicht gegen das Gemeinwohl.",
      },
    ],
    yarnKicker: "Umweltfreundlichere Technologien",
    yarnTitle: "Nachhaltige Garne",
    yarnLead:
      "bezieht für eine bessere Welt soziale und ökologische Nachhaltigkeit in alle Produktionsprozesse ein.",
    yarns: [
      {
        subtitle: "UNIFI-Partnerschaft",
        text: "Garnlösungen aus recycelten Quellen. 2023 wurden unsere Prozesse mit einem GRS-Zertifikat belegt.",
      },
      {
        subtitle: "Biobasiertes Polyamidgarn",
        text: "Biobasiertes Polyamidgarn, das fossile Rohstoffe senken soll, bei geringerer Umweltwirkung und ohne Leistungsverzicht.",
      },
      {
        subtitle: "Wasserloses Färben",
        text: "Innovatives wasserloses Färben mit Fokus auf weniger Wasser. Ressourcensparen beginnt in der Linie.",
      },
    ],
    certs: "Zertifikate",
    gesKicker: "Solarstromsystem",
    gesTitle: "Wir geben der Zukunft Wert und nehmen Produktionsenergie von der Sonne",
    gesP: [
      "Unsere Verantwortung ist nicht nur Qualität für den Bedarf von heute, sondern auch eine sauberere Welt für morgen. Mit dieser Sicht haben wir die Dächer unserer Werke mit einem Solarstromsystem (GES) ausgestattet.",
      "Hinter jeder Produktion in der Fabrik steht jetzt die saubere Energie der Sonne.",
    ],
    gesItems: [
      {
        title: "Ziel 100 % saubere Energie",
        text: "Ein großer Teil des Stroms unserer Linien kommt direkt von den hocheffizienten Solarpaneelen auf dem Dach.",
      },
      {
        title: "Kleinerer CO₂-Fußabdruck",
        text: "Mit weniger Abhängigkeit von fossilen Brennstoffen zielen wir jedes Jahr auf eine CO₂-Ersparnis, die dem Sauerstoff tausender Bäume entspricht.",
      },
      {
        title: "Vorreiter einer grüneren Industrie",
        text: "Wir wollen die Energiewende in unserer Branche anführen und kommenden Generationen eine lebenswertere Welt lassen.",
      },
    ],
    gesLink: "GES-Seite ansehen",
    plantKicker: "OmaFil Produktionswerk",
    plantText: "Wir stützen Produktionsqualität mit Investitionen in erneuerbare Energie.",
    plantAlt: "OmaFil Werk mit Solarpaneelen",
  },
  careers: {
    title: "Karriere",
    description: "Das Werk ist das Zentrum der Produktion. Menschen werden mit derselben Sorgfalt geführt.",
    paragraphs: [
      "Von der Einstellung bis zur täglichen Arbeit gelten Chancengleichheit, ein sicherer Ort und Entwicklung. Zusammenarbeit der Abteilungen und sicheres Arbeiten im Werk sind die gelebte Politik.",
      "Für offene Stellen oder eine allgemeine Bewerbung können Sie Ihren Lebenslauf als PDF senden.",
    ],
  },
  ges: {
    ...en.ges,
    kicker: "Solarstromsystem",
    title: "Unser Solarstromsystem",
    subtitle: "Wir speisen die Produktion mit den Feldanlagen in Elazığ und den Dachanlagen in Erbaa aus der Sonne",
    paragraphs: [
      "OmaFil produziert nicht nur Qualitätsgarn. Wir beziehen Energie auch aus erneuerbaren Quellen. Im Portfolio sind zwei Feldanlagen in Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) und zwei Dachanlagen in unserem Werk Tokat Erbaa.",
      "Die installierte Gesamtleistung beträgt 6,76 MWp. Die Tagesproduktion aus Feldern und Dächern liegt im Bereich von mehreren zehn Megawattstunden; wir senken unseren CO₂-Fußabdruck für eine grünere Industrie.",
    ],
    total: "Gesamt",
    panels: "Module",
    imageAlt: "OmaFil Erbaa Dach-GES — Werk Oma Polimer",
    pillars: [
      {
        title: "Feld + Dach-GES",
        text: "5,2 MWp Feldanlage in Elazığ; 1,56 MWp auf dem Fabrikdach in Erbaa. Zwei Regionen, dasselbe Nachhaltigkeitsziel.",
      },
      {
        title: "Kleinerer CO₂-Fußabdruck",
        text: "Jede erzeugte Kilowattstunde senkt fossile Emissionen. Unsere Zähler folgen App- und Anlagendaten.",
      },
      {
        title: "Vorreiter einer grüneren Industrie",
        text: "Mit eigener Energie wollen wir ein Beispiel für die saubere Energiewende in der Textilproduktion sein.",
      },
    ],
    respectTitle: "Produktion mit Respekt vor der Natur",
    respectText:
      "Technik und neue Investitionen stehen im Zentrum, und wir lassen die Umweltverantwortung nicht weg. Feld- und Dach-GES senken CO₂-Emissionen und stützen das ökologische Gleichgewicht.",
    capacityTitle: "Wir produzieren mit unserer grünen Energie",
    capacity: ({ total, elazig, erbaa, min, max }) =>
      `Mit ${total} MWp installierter Leistung (Elazığ ${elazig} MWp Feld + Erbaa ${erbaa} MWp Dach) haben wir etwa ${min}–${max} GWh jährliche Erzeugungskapazität.`,
    metrics: [
      "Erzeugte Solarenergie (kWh)",
      "Vermiedene CO₂-Emission (Tonnen)",
      "Entspricht einer Baumzahl",
    ],
    metricAlts: [
      "Elazığ Hacısam GES — OMA 1",
      "Elazığ Kavak GES — OMA 2",
      "Erbaa Dach-GES — Werk Oma Polimer",
    ],
    daily: "Tagesproduktion",
    roofStatus: "Vorläufige Abnahme / Betrieb",
    fieldStatus: "Produktionsbeginn",
    photo: "Foto",
    galleryTitle: "Galerie",
    galleryLead: "Bilder der Anlagen Hacısam, Kavak und Erbaa Dach.",
    ctaTitle: "Unser Ansatz nachhaltiger Produktion",
    ctaText: "Die GES-Investition ist Teil von Recyclinggarn und verantwortungsvoller Produktion.",
    sustainCta: "Nachhaltigkeit",
    contactCta: "Kontakt",
  },
  products: {
    "n6-acy": "Luftumhülltes PA6 + Elastan. Ecru / schwarz / farbig.",
    "n6-scy": "Einfach umhülltes PA6 + Elastan.",
    "n6-dcy": "Doppelt umhülltes PA6 + Elastan.",
    "n6-poy": "PA6. SD / BR / FD Optionen.",
    "n6-fdy": "Vollverstrecktes PA6. Breiter Denier- / Filamentbereich.",
    "n6-dty": "Texturiertes PA6. Ecru, schwarz und farbig.",
    "n66-acy": "Luftumhülltes PA66 + Elastan. Custom-Produktion.",
    "n66-scy": "Einfach umhülltes PA66 + Elastan, inklusive Flat.",
    "n66-dcy": "Doppelt umhülltes PA66 + Elastan. Custom-Produktion.",
    "n66-poy": "PA66 POY für finales DTY. Softel / Nicolite.",
    "n66-fdy": "Vollverstrecktes PA66.",
    "n66-dty": "Texturiertes PA66. Seamless, Hosiery und Weben.",
    "pes-acy": "Polyester-Luftumhüllung + Elastan.",
    "pes-scy": "Polyester einfach umhüllt + Elastan. Custom-Optionen.",
    "pes-dcy": "Polyester doppelt umhüllt + Elastan.",
  },
  marquee: {
    "PES DCY Gipe": "Doppelt umhülltes Polyester-Gipe-Garn.",
    "Naylon 6 POY": "Naylon-6-POY-Garn.",
    "N6 FDY": "Vollverstrecktes Naylon-6-Garn.",
    "DTY N6": "Texturiertes Naylon-6-Garn.",
    "DTY N66": "Texturiertes Naylon-66-Garn.",
    "ACY N6": "Luftumhülltes Naylon-6-Garn.",
    "ACY N66": "Luftumhülltes Naylon-66-Garn.",
    "SCY N6 Gipe": "Einfach umhülltes Naylon-6-Gipe-Garn.",
    "SCY N66 Gipe": "Einfach umhülltes Naylon-66-Gipe-Garn.",
    "PES SCY Gipe": "Einfach umhülltes Polyester-Gipe-Garn.",
    "PES ACY": "Luftumhülltes Polyestergarn.",
  },
});

/** Diğer diller İngilizce iskeletten başlar; aşağıda sayfa metni ezilir. */
const fr: Inner = page({
  ...en,
  about: {
    ...en.about,
    title: "À propos",
    description:
      "Le chemin du négoce de fil vers la production continue avec un principe de développement constant.",
    paragraphs: [
      "Notre activité a commencé par la vente de fil à Sultanhamam, longtemps le cœur du marché textile d’Istanbul, et s’est poursuivie avec notre principe de développement constant. Dans les années 2000 nous avons fondé OMA POLİMER A.Ş. pour suivre un commerce qui changeait.",
      "Nous avons renforcé nos liens à l’étranger, parce que la force à l’export compte autant que sur le marché intérieur. Aujourd’hui nous menons ensemble l’import, la production et l’export de fil.",
    ],
    growthBefore: "Notre histoire",
    growthAccent: "de croissance",
    milestones: [
      { title: "Création", text: "Nous avons commencé par le négoce de fil à Sultanhamam, Istanbul." },
      { title: "Début de l’export", text: "Nous avons créé nos liens à l’étranger." },
      { title: "Première usine", text: "Nous avons monté notre première usine." },
      { title: "Hausse de capacité", text: "Nous avons élargi le parc machines." },
      { title: "Usine gipe", text: "Nous avons mis en service l’usine de fil gipe à Tokat–Erbaa." },
      { title: "Certificat GRS", text: "Nous avons documenté le fil recyclé avec le GRS." },
    ],
    offices: "Nos points de contact",
    map: "Ouvrir la carte",
    stats: [
      { title: "40 000 m² de surface de production", subtitle: "Usine de Tokat–Erbaa" },
      { title: "13 000 tonnes/an", subtitle: "Gipe Naylon + polyester" },
      { title: "N°1 en Europe", subtitle: "Usine de fil gipe" },
      { title: "100 % énergie renouvelable", subtitle: "Objectif de production durable" },
    ],
    focus: ["Certifié GRS", "Énergie renouvelable", "Objectif zéro déchet"],
    sustainKicker: "Durabilité",
    sustainBefore: "Une approche",
    sustainAccent: "responsable",
    sustainAfter: "pour l’avenir",
    sustainP1:
      "Nous plaçons la durabilité au centre de la production. Avec le solaire en toiture et le fil recyclé certifié GRS, nous visons à réduire notre impact.",
    sustainP2:
      "L’efficacité des ressources, la production responsable et l’économie circulaire font partie de l’identité d’OmaFil.",
    sustainLink: "Aller à la page durabilité",
    gesLink: "GES — système solaire",
    recycledTitle: "Fil recyclé",
    recycledText:
      "Avec des fils issus de sources recyclées, nous amenons l’économie circulaire dans la production, sans baisser nos standards de qualité.",
    grs: "Production alignée GRS",
    certs: "Certificats",
  },
  factory: {
    ...en.factory,
    title: "Notre usine",
    description: "La plus grande usine européenne de fil polymère / gipe est à Tokat–Erbaa.",
    headline: "Au sommet de l’Europe avec 13 000 tonnes de capacité annuelle",
    paragraphs: [
      "Notre usine, dans la zone industrielle organisée de Tokat Erbaa, porte le titre de plus grande usine européenne de fil gipe, avec une capacité annuelle de 13 000 tonnes. Nous servons l’industrie textile mondiale avec des produits à forte valeur ajoutée issus de nos lignes Naylon 6, Naylon 66 et gipe polyester.",
      "Avec le centre de R&D qu’elle abrite, nous ne faisons pas que produire : nous développons aussi les technologies du fil de demain. L’usine est une source d’emploi importante pour la région, et le système solaire installé sur notre toit couvre une partie du besoin énergétique de la production à partir de sources propres.",
    ],
    since: "Leaders du secteur depuis 1999",
    sinceBody:
      "OmaFil s’appuie sur près d’un quart de siècle d’expérience d’Oma Polimer A.Ş. et propose des solutions innovantes et durables en polymère. Dans nos usines modernes, nous tenons qualité et continuité aux standards mondiaux.",
    tabsAria: "Cap de l’entreprise",
    tabs: [
      {
        label: "Mission",
        body: "Fournir les fils techniques de haute qualité dont l’industrie du polymère a besoin, avec une production attentive à l’environnement. Développer des solutions durables et innovantes qui ajoutent de la valeur aux processus de nos clients.",
      },
      {
        label: "Histoire",
        body: "Notre groupe est entré dans le textile en 1999 et a grandi en investissant dans la technique et les personnes. Le savoir d’OMA Tekstil est aujourd’hui la force de production d’OmaFil.",
      },
      {
        label: "Vision",
        body: "Être une marque leader choisie dans le monde, avec la technique et la durabilité au centre du fil synthétique. Orienter l’avenir du textile par une R&D innovante.",
      },
    ],
    galleryTitle: "Notre usine",
    galleryBody:
      "Construite avec une technique moderne et des standards mondiaux, l’usine est un point d’approvisionnement fiable, avec une production élevée. Notre infrastructure et notre politique d’énergie plus propre soutiennent une croissance durable.",
    bandTitle: "Ligne de production",
    bandBody:
      "Avec un parc machines de dernière génération pour le Naylon 6 et 66, nous gardons la marge d’erreur basse. Un contrôle précis à chaque étape produit des fils à haute ténacité et longue durée.",
    map: "Ouvrir l’usine sur la carte",
    alts: [
      "Usine OmaFil — vue aérienne avec panneaux solaires",
      "Entrée de l’usine OmaFil",
      "Usine de production OmaFil",
      "Façade de l’usine OmaFil",
    ],
    bandMore: "Voir plus",
    bandLess: "Voir moins",
    bandAlt: "Ligne de production OmaFil",
  },
  sustain: {
    ...en.sustain,
    title: "Durabilité",
    description:
      "OMA POLİMER A.Ş. s’engage à inclure la durabilité sociale et environnementale dans tous les processus de production.",
    paragraphs: [
      "Pour un monde meilleur, OMA POLİMER A.Ş. s’engage à inclure la durabilité sociale et environnementale dans tous les processus.",
      "La durabilité, c’est maintenir la production et la diversité tout en rendant la vie humaine durable. Répondre à nos besoins sans prendre ceux des générations futures.",
      "Pour nous, la durabilité n’est pas un slogan. C’est utiliser les ressources avec efficacité et développer le produit en conséquence. L’énergie solaire, le fil recyclé et la teinture qui consomme moins d’eau en sont des parties concrètes.",
    ],
    worldAlt: "Image d’un globe forestier",
    whyBefore: "Pourquoi",
    whyAccent: "la durabilité compte",
    why: [
      "Le besoin d’énergie né avec la révolution industrielle a mené à un usage intense de sources non renouvelables comme le pétrole et le charbon. L’industrialisation et l’urbanisation rapides ont accru la pollution de l’air, de l’eau et des sols, et ont approfondi la perte de biodiversité, la perte de sols et la désertification.",
      "Chaque être vivant fait partie d’un écosystème en échange avec le vivant et le non-vivant. Si une partie est abîmée, l’effet se voit ailleurs. Il faut agir sans dépasser la vitesse de récupération de la nature et sans rompre l’équilibre.",
    ],
    principles: [
      {
        title: "Utiliser les ressources avec raison",
        text: "Nous prenons l’efficacité comme règle, sachant que les ressources naturelles peuvent s’épuiser. L’intégrité et la résilience des écosystèmes sont protégées.",
      },
      {
        title: "Croissance et équilibre environnemental",
        text: "Nous visons une croissance qui élève le bien-être sans nuire à l’environnement. Quand la production augmente, le bien-être humain augmente avec elle.",
      },
      {
        title: "Intérêt de l’entreprise et intérêt public",
        text: "Les sujets sociaux et environnementaux font partie de la gestion, pas seulement la croissance. L’intérêt de l’entreprise ne s’oppose pas à l’intérêt public.",
      },
    ],
    yarnKicker: "Technologies plus propres",
    yarnTitle: "Fils durables",
    yarnLead:
      "inclut la durabilité sociale et environnementale dans tous les processus, pour un monde meilleur.",
    yarns: [
      {
        subtitle: "Partenariat UNIFI",
        text: "Solutions de fil issues de sources recyclées. En 2023 nos processus ont été documentés par un certificat GRS.",
      },
      {
        subtitle: "Fil polyamide biosourcé",
        text: "Fil polyamide biosourcé visant moins de matière fossile, avec un impact plus bas et sans abandonner la performance.",
      },
      {
        subtitle: "Teinture sans eau",
        text: "Teinture sans eau innovante, centrée sur moins d’eau. L’économie de ressources commence dans la ligne.",
      },
    ],
    certs: "Certificats",
    gesKicker: "Système solaire",
    gesTitle: "Nous donnons de la valeur à l’avenir et prenons l’énergie de production au soleil",
    gesP: [
      "Notre responsabilité n’est pas seulement une production de qualité pour les besoins d’aujourd’hui, mais aussi un monde plus propre. Avec cette vision, nous avons équipé les toits de nos usines d’un système solaire (GES).",
      "Derrière chaque production de l’usine, il y a maintenant l’énergie propre du soleil.",
    ],
    gesItems: [
      {
        title: "Objectif 100 % énergie propre",
        text: "Une grande part de l’électricité de nos lignes vient directement des panneaux solaires à haut rendement sur le toit.",
      },
      {
        title: "Une empreinte carbone plus faible",
        text: "En dépendant moins des combustibles fossiles, nous visons chaque année une économie de carbone comparable à l’oxygène de milliers d’arbres.",
      },
      {
        title: "Avancer une industrie plus verte",
        text: "Nous voulons mener la transition énergétique de notre secteur et laisser un monde plus vivable.",
      },
    ],
    gesLink: "Voir la page GES",
    plantKicker: "Usine de production OmaFil",
    plantText: "Nous soutenons la qualité de production par l’énergie renouvelable.",
    plantAlt: "Usine OmaFil couverte de panneaux solaires",
  },
  careers: {
    title: "Carrières",
    description: "L’usine est le centre de la production. Les personnes sont suivies avec le même sérieux.",
    paragraphs: [
      "Du recrutement au travail quotidien, l’égalité des chances, un lieu sûr et le développement passent d’abord. La coopération entre services et le travail sûr dans l’usine sont la politique appliquée.",
      "Pour un poste ouvert ou une candidature générale, vous pouvez envoyer votre CV en PDF.",
    ],
  },
  ges: {
    ...en.ges,
    kicker: "Système solaire",
    title: "Notre système solaire",
    subtitle: "Nous alimentons la production par le soleil avec les centrales au sol d’Elazığ et les toitures d’Erbaa",
    paragraphs: [
      "OmaFil ne produit pas seulement du fil de qualité. Nous prenons aussi l’énergie de sources renouvelables. Le portefeuille compte deux centrales au sol à Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) et deux centrales en toiture à notre usine de Tokat Erbaa.",
      "La puissance installée totale est de 6,76 MWp. La production quotidienne des sols et des toits se situe dans les dizaines de mégawattheures ; nous réduisons notre empreinte pour une industrie plus verte.",
    ],
    total: "Total",
    panels: "panneaux",
    imageAlt: "GES en toiture OmaFil Erbaa — usine Oma Polimer",
    pillars: [
      {
        title: "GES au sol + en toiture",
        text: "5,2 MWp au sol à Elazığ ; 1,56 MWp sur le toit de l’usine d’Erbaa. Deux géographies, le même objectif.",
      },
      {
        title: "Une empreinte plus faible",
        text: "Chaque kilowattheure produit réduit les émissions fossiles. Nos compteurs suivent l’application et les données d’usine.",
      },
      {
        title: "Exemple d’industrie plus verte",
        text: "En produisant notre énergie, nous voulons être un exemple de la transition propre dans le textile.",
      },
    ],
    respectTitle: "Une production qui respecte la nature",
    respectText:
      "La technique et les investissements restent au centre, et nous n’écartons pas la responsabilité environnementale. Les GES au sol et en toiture réduisent les émissions et soutiennent l’équilibre écologique.",
    capacityTitle: "Nous produisons avec notre énergie verte",
    capacity: ({ total, elazig, erbaa, min, max }) =>
      `Avec ${total} MWp installés (Elazığ ${elazig} MWp au sol + Erbaa ${erbaa} MWp en toiture), nous avons environ ${min}–${max} GWh de capacité annuelle.`,
    metrics: [
      "Énergie solaire produite (kWh)",
      "Émissions de carbone évitées (tonnes)",
      "Nombre d’arbres équivalent",
    ],
    metricAlts: [
      "GES Elazığ Hacısam — OMA 1",
      "GES Elazığ Kavak — OMA 2",
      "GES toiture Erbaa — usine Oma Polimer",
    ],
    daily: "Production journalière",
    roofStatus: "Réception provisoire / exploitation",
    fieldStatus: "Début de production",
    photo: "photo",
    galleryTitle: "Galerie",
    galleryLead: "Photos des sites Hacısam, Kavak et de la toiture d’Erbaa.",
    ctaTitle: "Notre approche de production durable",
    ctaText: "L’investissement GES fait partie du fil recyclé et de la production responsable.",
    sustainCta: "Durabilité",
    contactCta: "Contact",
  },
  products: {
    "n6-acy": "PA6 guipé air-jet + élasthanne. Ecru / noir / coloré.",
    "n6-scy": "PA6 simple couverture + élasthanne.",
    "n6-dcy": "PA6 double couverture + élasthanne.",
    "n6-poy": "PA6. Options SD / BR / FD.",
    "n6-fdy": "PA6 entièrement étiré. Large plage denier / filament.",
    "n6-dty": "PA6 texturé. Ecru, noir et coloré.",
    "n66-acy": "PA66 guipé air-jet + élasthanne. Production custom.",
    "n66-scy": "PA66 simple couverture + élasthanne, options flat incluses.",
    "n66-dcy": "PA66 double couverture + élasthanne. Production custom.",
    "n66-poy": "PA66 POY pour DTY finaux. Softel / Nicolite.",
    "n66-fdy": "PA66 entièrement étiré.",
    "n66-dty": "PA66 texturé. Seamless, bonneterie et tissage.",
    "pes-acy": "Polyester guipé air-jet + élasthanne.",
    "pes-scy": "Polyester simple couverture + élasthanne. Options custom.",
    "pes-dcy": "Polyester double couverture + élasthanne.",
  },
  marquee: {
    "PES DCY Gipe": "Fil gipe polyester double couverture.",
    "Naylon 6 POY": "Fil Naylon 6 POY.",
    "N6 FDY": "Fil Naylon 6 entièrement étiré.",
    "DTY N6": "Fil Naylon 6 texturé.",
    "DTY N66": "Fil Naylon 66 texturé.",
    "ACY N6": "Fil Naylon 6 guipé air-jet.",
    "ACY N66": "Fil Naylon 66 guipé air-jet.",
    "SCY N6 Gipe": "Fil gipe Naylon 6 simple couverture.",
    "SCY N66 Gipe": "Fil gipe Naylon 66 simple couverture.",
    "PES SCY Gipe": "Fil gipe polyester simple couverture.",
    "PES ACY": "Fil polyester guipé air-jet.",
  },
});

const es: Inner = page({
  ...en,
  about: { ...en.about, title: "Sobre nosotros", description: "El camino del comercio de hilo a la producción sigue con un principio de desarrollo constante.", paragraphs: ["Nuestro negocio empezó con la venta de hilo en Sultanhamam, durante años el corazón del mercado textil de Estambul, y siguió con el principio de desarrollo constante. En los años 2000 fundamos OMA POLİMER A.Ş. para adaptarnos a un comercio que cambiaba.", "Reforzamos los vínculos en el exterior, porque la fuerza en el comercio exterior importa tanto como en el interior. Hoy seguimos juntos la importación, la producción y la exportación de hilo."], growthBefore: "Nuestra historia", growthAccent: "de crecimiento", milestones: [{ title: "Fundación", text: "Empezamos con el comercio de hilo en Sultanhamam, Estambul." }, { title: "Inicio de la exportación", text: "Creamos nuestros vínculos en el exterior." }, { title: "Primera planta", text: "Montamos nuestra primera planta." }, { title: "Aumento de capacidad", text: "Ampliamos el parque de máquinas." }, { title: "Planta gipe", text: "Pusimos en marcha la planta de hilo gipe en Tokat–Erbaa." }, { title: "Certificado GRS", text: "Documentamos el hilo reciclado con GRS." }], offices: "Nuestros puntos de contacto", map: "Abrir mapa", stats: [{ title: "40.000 m² de superficie de producción", subtitle: "Planta de Tokat–Erbaa" }, { title: "13.000 toneladas/año", subtitle: "Gipe Naylon + poliéster" }, { title: "N.º 1 en Europa", subtitle: "Planta de hilo gipe" }, { title: "100 % energía renovable", subtitle: "Objetivo de producción sostenible" }], focus: ["Certificado GRS", "Energía renovable", "Objetivo de cero residuos"], sustainKicker: "Sostenibilidad", sustainBefore: "Un enfoque", sustainAccent: "responsable", sustainAfter: "hacia el futuro", sustainP1: "Ponemos la sostenibilidad en el centro de la producción. Con solar en cubierta e hilo reciclado con GRS buscamos reducir nuestro impacto.", sustainP2: "La eficiencia de recursos, la producción responsable y la economía circular forman parte de la identidad de OmaFil.", sustainLink: "Ir a sostenibilidad", gesLink: "GES — sistema solar", recycledTitle: "Hilo reciclado", recycledText: "Con hilos de fuentes recicladas llevamos la economía circular a la producción, sin bajar nuestros estándares de calidad.", grs: "Producción alineada con GRS", certs: "Certificados" },
  factory: { ...en.factory, title: "Nuestra fábrica", description: "La mayor planta europea de hilo de polímero / gipe está en Tokat–Erbaa.", headline: "En la cima de Europa con 13.000 toneladas de capacidad anual", paragraphs: ["Nuestra planta, en la zona industrial organizada de Tokat Erbaa, ostenta el título de la mayor planta europea de hilo gipe, con una capacidad anual de 13.000 toneladas. Servimos a la industria textil global con productos de alto valor añadido de nuestras líneas de hilo gipe de Naylon 6, Naylon 66 y poliéster.", "Con el centro de I+D que alberga, no solo producimos: también desarrollamos las tecnologías de hilo del futuro. La planta es una fuente importante de empleo para la región y, con el sistema solar instalado en el tejado, cubrimos parte de la energía de la producción con fuentes limpias."], since: "Lideramos el sector desde 1999", sinceBody: "OmaFil se apoya en casi un cuarto de siglo de experiencia de Oma Polimer A.Ş. y ofrece soluciones innovadoras y sostenibles en polímero. En plantas modernas mantenemos calidad y continuidad a estándar global.", tabsAria: "Rumbo de la empresa", tabs: [{ label: "Misión", body: "Ofrecer los hilos técnicos de alta calidad que necesita la industria del polímero, con una producción atenta al medio. Desarrollar soluciones sostenibles e innovadoras que aporten valor a los procesos de nuestros clientes." }, { label: "Historia", body: "Nuestro grupo entró en el textil en 1999 y creció invirtiendo en tecnología y personas. El conocimiento de OMA Tekstil es hoy la fuerza de producción de OmaFil." }, { label: "Visión", body: "Ser una marca líder elegida en el mundo, con la tecnología y la sostenibilidad en el centro del hilo sintético. Orientar el futuro del textil con I+D innovadora." }], galleryTitle: "Nuestra fábrica", galleryBody: "Construida con tecnología moderna y estándares globales, la planta es un punto de suministro fiable, con alta producción. Nuestra infraestructura y la política de energía más limpia apoyan un crecimiento sostenible.", bandTitle: "Línea de producción", bandBody: "Con un parque de última generación para Naylon 6 y 66 mantenemos bajo el margen de error. Un control preciso en cada etapa produce hilos de alta tenacidad y larga vida.", map: "Abrir la planta en el mapa", alts: ["Planta OmaFil — vista aérea con paneles solares", "Entrada de la fábrica OmaFil", "Planta de producción OmaFil", "Fachada de la fábrica OmaFil"], bandAlt: "Línea de producción OmaFil", bandMore: "Ver más", bandLess: "Ver menos" },
  sustain: { ...en.sustain, title: "Sostenibilidad", description: "OMA POLİMER A.Ş. se compromete a incluir la sostenibilidad social y ambiental en todos los procesos.", paragraphs: ["Para un mundo mejor, OMA POLİMER A.Ş. se compromete a incluir la sostenibilidad social y ambiental en todos los procesos de producción.", "Sostenibilidad es mantener la producción y la diversidad y, a la vez, hacer viable la vida humana. Cubrir nuestras necesidades sin quitar las de las generaciones futuras.", "Para nosotros la sostenibilidad no es un eslogan. Es usar los recursos con eficiencia y desarrollar el producto en consecuencia. La energía solar, el hilo reciclado y el teñido que usa menos agua son partes concretas."], worldAlt: "Imagen de un globo con bosque", whyBefore: "Por qué", whyAccent: "importa la sostenibilidad", why: ["La demanda de energía crecida con la revolución industrial llevó a un uso intenso de fuentes no renovables como el petróleo y el carbón. La industrialización y la urbanización rápidas aumentaron la contaminación del aire, el agua y el suelo, y profundizaron la pérdida de biodiversidad, de suelo y la desertificación.", "Todo ser vivo es parte de un ecosistema en intercambio con lo vivo y lo no vivo. Si una parte se daña, el efecto se ve en otra. Hay que actuar sin superar la velocidad de recuperación de la naturaleza y sin romper el equilibrio."], principles: [{ title: "Usar los recursos con criterio", text: "Tomamos la eficiencia como regla, sabiendo que los recursos naturales pueden agotarse. Se protege la integridad y la resiliencia de los ecosistemas." }, { title: "Crecimiento y equilibrio ambiental", text: "Buscamos un crecimiento que eleve el bienestar sin dañar el medio. Cuando sube la producción, sube el bienestar humano." }, { title: "Interés de la empresa y del público", text: "Los temas sociales y ambientales forman parte de la gestión, no solo el crecimiento. El interés de la empresa no choca con el interés público." }], yarnKicker: "Tecnologías más limpias", yarnTitle: "Hilos sostenibles", yarnLead: "incluye la sostenibilidad social y ambiental en todos los procesos, para un mundo mejor.", yarns: [{ subtitle: "Colaboración UNIFI", text: "Soluciones de hilo de fuentes recicladas. En 2023 nuestros procesos quedaron documentados con un certificado GRS." }, { subtitle: "Hilo de poliamida de base biológica", text: "Hilo de poliamida de base biológica para usar menos materia fósil, con menor impacto y sin dejar el rendimiento." }, { subtitle: "Tintura sin agua", text: "Tintura sin agua innovadora, centrada en usar menos agua. El ahorro de recursos empieza en la línea." }], certs: "Certificados", gesKicker: "Sistema solar", gesTitle: "Aportamos valor al futuro y tomamos la energía de producción del sol", gesP: ["Nuestra responsabilidad no es solo producir calidad para las necesidades de hoy, sino dejar un mundo más limpio. Con esa visión equipamos los techos de las plantas con un sistema solar (GES).", "Detrás de cada producción de la fábrica está ahora la energía limpia del sol."], gesItems: [{ title: "Objetivo de 100 % energía limpia", text: "Una gran parte de la electricidad de las líneas viene directamente de los paneles solares de alta eficiencia del techo." }, { title: "Una huella de carbono menor", text: "Al depender menos de combustibles fósiles, buscamos cada año un ahorro de carbono comparable al oxígeno de miles de árboles." }, { title: "Liderar una industria más verde", text: "Queremos liderar la transición energética del sector y dejar un mundo más habitable." }], gesLink: "Ver la página GES", plantKicker: "Planta de producción OmaFil", plantText: "Apoyamos la calidad de producción con energía renovable.", plantAlt: "Planta OmaFil cubierta de paneles solares" },
  careers: { title: "Empleo", description: "La planta es el centro de la producción. Las personas se gestionan con la misma seriedad.", paragraphs: ["Desde la contratación hasta el trabajo diario, primero van la igualdad de oportunidades, un lugar seguro y el desarrollo. La cooperación entre departamentos y el trabajo seguro en la planta son la política aplicada.", "Para un puesto abierto o una candidatura general, puede enviar su CV en PDF."] },
  ges: { ...en.ges, kicker: "Sistema solar", title: "Nuestro sistema solar", subtitle: "Alimentamos la producción con el sol mediante las plantas de campo de Elazığ y las de cubierta de Erbaa", paragraphs: ["OmaFil no solo produce hilo de calidad. También tomamos energía de fuentes renovables. El portafolio tiene dos plantas de campo en Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) y dos plantas de cubierta en nuestra fábrica de Tokat Erbaa.", "La potencia instalada total es 6,76 MWp. La producción diaria de campos y cubiertas está en decenas de megavatios-hora; reducimos la huella de carbono para una industria más verde."], total: "Total", panels: "paneles", imageAlt: "GES de cubierta OmaFil Erbaa — planta Oma Polimer", pillars: [{ title: "GES de campo + cubierta", text: "5,2 MWp de campo en Elazığ; 1,56 MWp en el techo de la fábrica de Erbaa. Dos geografías, el mismo objetivo." }, { title: "Una huella menor", text: "Cada kilovatio-hora generado reduce emisiones fósiles. Nuestros contadores siguen la aplicación y los datos de planta." }, { title: "Ejemplo de industria más verde", text: "Al generar nuestra energía queremos ser un ejemplo de la transición limpia en el textil." }], respectTitle: "Producción que respeta la naturaleza", respectText: "La tecnología y la inversión siguen en el centro, y no dejamos de lado la responsabilidad ambiental. Las GES de campo y de cubierta reducen emisiones y apoyan el equilibrio ecológico.", capacityTitle: "Producimos con nuestra energía verde", capacity: ({ total, elazig, erbaa, min, max }) => `Con ${total} MWp instalados (Elazığ ${elazig} MWp de campo + Erbaa ${erbaa} MWp de cubierta) tenemos unos ${min}–${max} GWh de capacidad anual.`, metrics: ["Energía solar generada (kWh)", "Emisiones de carbono evitadas (toneladas)", "Número equivalente de árboles"], metricAlts: ["GES Elazığ Hacısam — OMA 1", "GES Elazığ Kavak — OMA 2", "GES de cubierta Erbaa — planta Oma Polimer"], daily: "Producción diaria", roofStatus: "Aceptación provisional / operación", fieldStatus: "Inicio de producción", photo: "foto", galleryTitle: "Galería", galleryLead: "Fotos de Hacısam, Kavak y la cubierta de Erbaa.", ctaTitle: "Nuestro enfoque de producción sostenible", ctaText: "La inversión GES forma parte del hilo reciclado y de la producción responsable.", sustainCta: "Sostenibilidad", contactCta: "Contacto" },
});

const it: Inner = page({
  ...en,
  about: { ...en.about, title: "Chi siamo", description: "Il percorso dal commercio del filato alla produzione continua con un principio di sviluppo costante.", paragraphs: ["La nostra attività è iniziata con la vendita di filato a Sultanhamam, a lungo il cuore del mercato tessile di Istanbul, e è proseguita con il principio di sviluppo costante. Negli anni 2000 abbiamo fondato OMA POLİMER A.Ş. per adattarci a un commercio che cambiava.", "Abbiamo rafforzato i legami all’estero, perché la forza nel commercio estero conta quanto nel mercato interno. Oggi portiamo avanti insieme import, produzione ed export di filato."], growthBefore: "La nostra storia", growthAccent: "di crescita", milestones: [{ title: "Fondazione", text: "Abbiamo iniziato con il commercio di filato a Sultanhamam, Istanbul." }, { title: "Inizio dell’export", text: "Abbiamo creato i legami all’estero." }, { title: "Primo stabilimento", text: "Abbiamo costruito il primo stabilimento." }, { title: "Aumento di capacità", text: "Abbiamo ampliato il parco macchine." }, { title: "Stabilimento gipe", text: "Abbiamo avviato lo stabilimento di filato gipe a Tokat–Erbaa." }, { title: "Certificato GRS", text: "Abbiamo documentato il filato riciclato con il GRS." }], offices: "I nostri punti di contatto", map: "Apri la mappa", stats: [{ title: "40.000 m² di superficie di produzione", subtitle: "Stabilimento di Tokat–Erbaa" }, { title: "13.000 tonnellate/anno", subtitle: "Gipe Naylon + poliestere" }, { title: "N. 1 in Europa", subtitle: "Stabilimento di filato gipe" }, { title: "100% energia rinnovabile", subtitle: "Obiettivo di produzione sostenibile" }], focus: ["Certificato GRS", "Energia rinnovabile", "Obiettivo zero rifiuti"], sustainKicker: "Sostenibilità", sustainBefore: "Un approccio", sustainAccent: "responsabile", sustainAfter: "verso il futuro", sustainP1: "Mettiamo la sostenibilità al centro della produzione. Con il solare sul tetto e il filato riciclato GRS puntiamo a ridurre l’impatto.", sustainP2: "Efficienza delle risorse, produzione responsabile ed economia circolare fanno parte dell’identità di OmaFil.", sustainLink: "Vai alla sostenibilità", gesLink: "GES — sistema solare", recycledTitle: "Filato riciclato", recycledText: "Con filati da fonti riciclate portiamo l’economia circolare in produzione, senza abbassare gli standard di qualità.", grs: "Produzione allineata al GRS", certs: "Certificati" },
  factory: { ...en.factory, title: "Il nostro stabilimento", description: "Il più grande stabilimento europeo di filato polimerico / gipe è a Tokat–Erbaa.", headline: "Al vertice d’Europa con 13.000 tonnellate di capacità annua", paragraphs: ["Il nostro stabilimento, nella zona industriale organizzata di Tokat Erbaa, detiene il titolo di più grande stabilimento europeo di filato gipe, con una capacità annua di 13.000 tonnellate. Serviamo l’industria tessile globale con prodotti ad alto valore aggiunto dalle linee di filato gipe Naylon 6, Naylon 66 e poliestere.", "Con il centro di R&S che ospita, non ci limitiamo a produrre: sviluppiamo anche le tecnologie del filato di domani. Lo stabilimento è un’importante fonte di occupazione per la zona e, con l’impianto solare sul tetto, copriamo parte del fabbisogno energetico della produzione da fonti pulite."], since: "Leader del settore dal 1999", sinceBody: "OmaFil si appoggia a quasi un quarto di secolo di esperienza di Oma Polimer A.Ş. e offre soluzioni innovative e sostenibili nel polimero. Negli stabilimenti moderni teniamo qualità e continuità a standard globali.", tabsAria: "Direzione aziendale", tabs: [{ label: "Missione", body: "Fornire i filati tecnici di alta qualità di cui l’industria del polimero ha bisogno, con una produzione attenta all’ambiente. Sviluppare soluzioni sostenibili e innovative che diano valore ai processi dei clienti." }, { label: "Storia", body: "Il nostro gruppo è entrato nel tessile nel 1999 ed è cresciuto investendo in tecnologia e persone. Il sapere di OMA Tekstil è oggi la forza produttiva di OmaFil." }, { label: "Visione", body: "Essere un marchio leader scelto nel mondo, con tecnologia e sostenibilità al centro del filato sintetico. Orientare il futuro del tessile con R&S innovativa." }], galleryTitle: "Il nostro stabilimento", galleryBody: "Costruito con tecnologia moderna e standard globali, lo stabilimento è un punto di fornitura affidabile, con alta produzione. Infrastruttura e politica energetica più pulita sostengono una crescita sostenibile.", bandTitle: "Linea di produzione", bandBody: "Con un parco macchine di ultima generazione per Naylon 6 e 66 teniamo basso il margine di errore. Un controllo preciso in ogni fase produce filati ad alta tenacità e lunga durata.", map: "Apri lo stabilimento sulla mappa", alts: ["Stabilimento OmaFil — vista aerea con pannelli solari", "Ingresso fabbrica OmaFil", "Stabilimento di produzione OmaFil", "Facciata fabbrica OmaFil"], bandAlt: "Linea di produzione OmaFil", bandMore: "Mostra di più", bandLess: "Mostra di meno" },
  sustain: { ...en.sustain, title: "Sostenibilità", description: "OMA POLİMER A.Ş. si impegna a includere la sostenibilità sociale e ambientale in tutti i processi.", paragraphs: ["Per un mondo migliore, OMA POLİMER A.Ş. si impegna a includere la sostenibilità sociale e ambientale in tutti i processi di produzione.", "Sostenibilità significa tenere viva la produzione e la diversità e, insieme, rendere durevole la vita umana. Soddisfare i nostri bisogni senza togliere quelli delle generazioni future.", "Per noi la sostenibilità non è uno slogan. È usare le risorse con efficienza e sviluppare il prodotto di conseguenza. Energia solare, filato riciclato e tintura che usa meno acqua ne sono parti concrete."], worldAlt: "Immagine di un globo boscoso", whyBefore: "Perché", whyAccent: "la sostenibilità conta", why: ["Il fabbisogno di energia cresciuto con la rivoluzione industriale ha portato a un uso intenso di fonti non rinnovabili come petrolio e carbone. Industrializzazione e urbanizzazione rapide hanno aumentato l’inquinamento di aria, acqua e suolo e hanno approfondito perdita di biodiversità, perdita di suolo e desertificazione.", "Ogni essere vivente è parte di un ecosistema in scambio con il vivo e il non vivo. Se una parte si danneggia, l’effetto si vede altrove. Bisogna agire senza superare la velocità di recupero della natura e senza rompere l’equilibrio."], principles: [{ title: "Usare le risorse con criterio", text: "Prendiamo l’efficienza come regola, sapendo che le risorse naturali possono esaurirsi. Si protegge l’integrità e la resilienza degli ecosistemi." }, { title: "Crescita ed equilibrio ambientale", text: "Puntiamo a una crescita che alzi il benessere senza danneggiare l’ambiente. Se sale la produzione, sale il benessere umano." }, { title: "Interesse aziendale e pubblico insieme", text: "I temi sociali e ambientali fanno parte della gestione, non solo la crescita. L’interesse aziendale non contrasta l’interesse pubblico." }], yarnKicker: "Tecnologie più pulite", yarnTitle: "Filati sostenibili", yarnLead: "include la sostenibilità sociale e ambientale in tutti i processi, per un mondo migliore.", yarns: [{ subtitle: "Collaborazione UNIFI", text: "Soluzioni di filato da fonti riciclate. Nel 2023 i nostri processi sono stati documentati con un certificato GRS." }, { subtitle: "Filato di poliammide bio-based", text: "Filato di poliammide bio-based per usare meno materia fossile, con un impatto più basso e senza rinunciare alla prestazione." }, { subtitle: "Tintura senz’acqua", text: "Tintura senz’acqua innovativa, centrata su meno acqua. Il risparmio di risorse inizia in linea." }], certs: "Certificati", gesKicker: "Sistema solare", gesTitle: "Diamo valore al futuro e prendiamo l’energia di produzione dal sole", gesP: ["La nostra responsabilità non è solo produrre qualità per i bisogni di oggi, ma lasciare un mondo più pulito. Con questa visione abbiamo dotato i tetti degli stabilimenti di un sistema solare (GES).", "Dietro ogni produzione in fabbrica c’è ora l’energia pulita del sole."], gesItems: [{ title: "Obiettivo 100% energia pulita", text: "Una grande parte dell’elettricità delle linee arriva direttamente dai pannelli solari ad alta efficienza sul tetto." }, { title: "Un’impronta di carbonio più bassa", text: "Dipendendo meno dai combustibili fossili, puntiamo ogni anno a un risparmio di carbonio paragonabile all’ossigeno di migliaia di alberi." }, { title: "Guidare un’industria più verde", text: "Vogliamo guidare la transizione energetica del settore e lasciare un mondo più vivibile." }], gesLink: "Vedi la pagina GES", plantKicker: "Stabilimento di produzione OmaFil", plantText: "Sosteniamo la qualità di produzione con energia rinnovabile.", plantAlt: "Stabilimento OmaFil coperto di pannelli solari" },
  careers: { title: "Lavora con noi", description: "Lo stabilimento è il centro della produzione. Le persone sono gestite con la stessa serietà.", paragraphs: ["Dalla selezione al lavoro quotidiano, prima vengono pari opportunità, un luogo sicuro e lo sviluppo. La collaborazione tra reparti e il lavoro sicuro in stabilimento sono la politica applicata.", "Per un ruolo aperto o una candidatura generale puoi inviare il CV in PDF."] },
  ges: { ...en.ges, kicker: "Sistema solare", title: "Il nostro sistema solare", subtitle: "Alimentiamo la produzione con il sole tramite gli impianti a terra di Elazığ e quelli sul tetto di Erbaa", paragraphs: ["OmaFil non produce solo filato di qualità. Prendiamo energia anche da fonti rinnovabili. Il portafoglio ha due impianti a terra a Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) e due impianti sul tetto nella fabbrica di Tokat Erbaa.", "La potenza installata totale è 6,76 MWp. La produzione giornaliera di campi e tetti sta nelle decine di megawattora; riduciamo l’impronta di carbonio per un’industria più verde."], total: "Totale", panels: "pannelli", imageAlt: "GES sul tetto OmaFil Erbaa — stabilimento Oma Polimer", pillars: [{ title: "GES a terra + sul tetto", text: "5,2 MWp a terra a Elazığ; 1,56 MWp sul tetto della fabbrica di Erbaa. Due geografie, lo stesso obiettivo." }, { title: "Un’impronta più bassa", text: "Ogni chilowattora generato riduce le emissioni fossili. I nostri contatori seguono l’app e i dati di impianto." }, { title: "Esempio di industria più verde", text: "Generando la nostra energia vogliamo essere un esempio della transizione pulita nel tessile." }], respectTitle: "Produzione che rispetta la natura", respectText: "Tecnologia e investimenti restano al centro, e non mettiamo da parte la responsabilità ambientale. I GES a terra e sul tetto riducono le emissioni e sostengono l’equilibrio ecologico.", capacityTitle: "Produciamo con la nostra energia verde", capacity: ({ total, elazig, erbaa, min, max }) => `Con ${total} MWp installati (Elazığ ${elazig} MWp a terra + Erbaa ${erbaa} MWp sul tetto) abbiamo circa ${min}–${max} GWh di capacità annua.`, metrics: ["Energia solare generata (kWh)", "Emissioni di carbonio evitate (tonnellate)", "Numero equivalente di alberi"], metricAlts: ["GES Elazığ Hacısam — OMA 1", "GES Elazığ Kavak — OMA 2", "GES sul tetto Erbaa — stabilimento Oma Polimer"], daily: "Produzione giornaliera", roofStatus: "Collaudo provvisorio / esercizio", fieldStatus: "Inizio produzione", photo: "foto", galleryTitle: "Galleria", galleryLead: "Foto di Hacısam, Kavak e del tetto di Erbaa.", ctaTitle: "Il nostro approccio alla produzione sostenibile", ctaText: "L’investimento GES fa parte del filato riciclato e della produzione responsabile.", sustainCta: "Sostenibilità", contactCta: "Contatti" },
});

const pt: Inner = page({
  ...en,
  about: { ...en.about, title: "Sobre nós", description: "O caminho do comércio de fio até à produção continua com um princípio de desenvolvimento constante.", paragraphs: ["O nosso negócio começou com a venda de fio em Sultanhamam, durante anos o coração do mercado têxtil de Istambul, e continuou com o princípio de desenvolvimento constante. Nos anos 2000 fundámos a OMA POLİMER A.Ş. para acompanhar um comércio em mudança.", "Reforçámos as ligações no exterior, porque a força no comércio externo importa tanto como no mercado interno. Hoje mantemos juntos a importação, a produção e a exportação de fio."], growthBefore: "A nossa história", growthAccent: "de crescimento", milestones: [{ title: "Fundação", text: "Começámos com o comércio de fio em Sultanhamam, Istambul." }, { title: "Início da exportação", text: "Criámos as ligações no exterior." }, { title: "Primeira fábrica", text: "Montámos a primeira fábrica." }, { title: "Aumento de capacidade", text: "Alargámos o parque de máquinas." }, { title: "Fábrica gipe", text: "Pusemos em marcha a fábrica de fio gipe em Tokat–Erbaa." }, { title: "Certificado GRS", text: "Documentámos o fio reciclado com o GRS." }], offices: "Os nossos pontos de contacto", map: "Abrir mapa", stats: [{ title: "40.000 m² de área de produção", subtitle: "Fábrica de Tokat–Erbaa" }, { title: "13.000 toneladas/ano", subtitle: "Gipe Naylon + poliéster" }, { title: "N.º 1 na Europa", subtitle: "Fábrica de fio gipe" }, { title: "100% energia renovável", subtitle: "Objetivo de produção sustentável" }], focus: ["Certificado GRS", "Energia renovável", "Objetivo de zero resíduos"], sustainKicker: "Sustentabilidade", sustainBefore: "Uma abordagem", sustainAccent: "responsável", sustainAfter: "para o futuro", sustainP1: "Colocamos a sustentabilidade no centro da produção. Com solar na cobertura e fio reciclado GRS procuramos reduzir o impacto.", sustainP2: "Eficiência de recursos, produção responsável e economia circular fazem parte da identidade da OmaFil.", sustainLink: "Ir à sustentabilidade", gesLink: "GES — sistema solar", recycledTitle: "Fio reciclado", recycledText: "Com fios de fontes recicladas trazemos a economia circular para a produção, sem baixar os padrões de qualidade.", grs: "Produção alinhada com o GRS", certs: "Certificados" },
  factory: { ...en.factory, title: "A nossa fábrica", description: "A maior fábrica europeia de fio de polímero / gipe está em Tokat–Erbaa.", headline: "No topo da Europa com 13.000 toneladas de capacidade anual", paragraphs: ["A nossa fábrica, na zona industrial organizada de Tokat Erbaa, detém o título de maior fábrica europeia de fio gipe, com uma capacidade anual de 13.000 toneladas. Servimos a indústria têxtil global com produtos de alto valor acrescentado das linhas de fio gipe Naylon 6, Naylon 66 e poliéster.", "Com o centro de I&D que alberga, não nos limitamos a produzir: também desenvolvemos as tecnologias de fio do futuro. A fábrica é uma fonte importante de emprego para a região e, com o sistema solar no telhado, cobrimos parte da energia da produção com fontes limpas."], since: "Lideramos o setor desde 1999", sinceBody: "A OmaFil apoia-se em quase um quarto de século de experiência da Oma Polimer A.Ş. e oferece soluções inovadoras e sustentáveis em polímero. Em fábricas modernas mantemos qualidade e continuidade a padrão global.", tabsAria: "Rumo da empresa", tabs: [{ label: "Missão", body: "Fornecer os fios técnicos de alta qualidade de que a indústria do polímero precisa, com uma produção atenta ao ambiente. Desenvolver soluções sustentáveis e inovadoras que acrescentem valor aos processos dos clientes." }, { label: "História", body: "O nosso grupo entrou no têxtil em 1999 e cresceu a investir em tecnologia e pessoas. O saber da OMA Tekstil é hoje a força de produção da OmaFil." }, { label: "Visão", body: "Ser uma marca líder escolhida no mundo, com tecnologia e sustentabilidade no centro do fio sintético. Orientar o futuro do têxtil com I&D inovadora." }], galleryTitle: "A nossa fábrica", galleryBody: "Construída com tecnologia moderna e padrões globais, a fábrica é um ponto de fornecimento fiável, com alta produção. A infraestrutura e a política de energia mais limpa apoiam um crescimento sustentável.", bandTitle: "Linha de produção", bandBody: "Com um parque de última geração para Naylon 6 e 66 mantemos baixa a margem de erro. Um controlo preciso em cada etapa produz fios de alta tenacidade e longa vida.", map: "Abrir a fábrica no mapa", alts: ["Fábrica OmaFil — vista aérea com painéis solares", "Entrada da fábrica OmaFil", "Unidade de produção OmaFil", "Fachada da fábrica OmaFil"], bandAlt: "Linha de produção OmaFil", bandMore: "Ver mais", bandLess: "Ver menos" },
  sustain: { ...en.sustain, title: "Sustentabilidade", description: "A OMA POLİMER A.Ş. compromete-se a incluir a sustentabilidade social e ambiental em todos os processos.", paragraphs: ["Para um mundo melhor, a OMA POLİMER A.Ş. compromete-se a incluir a sustentabilidade social e ambiental em todos os processos de produção.", "Sustentabilidade é manter a produção e a diversidade e, ao mesmo tempo, tornar viável a vida humana. Responder às nossas necessidades sem tirar as das gerações futuras.", "Para nós a sustentabilidade não é um slogan. É usar os recursos com eficiência e desenvolver o produto em conformidade. Energia solar, fio reciclado e tingimento que usa menos água são partes concretas."], worldAlt: "Imagem de um globo florestado", whyBefore: "Porque", whyAccent: "a sustentabilidade importa", why: ["A procura de energia crescida com a revolução industrial levou a um uso intenso de fontes não renováveis como petróleo e carvão. A industrialização e a urbanização rápidas aumentaram a poluição do ar, da água e do solo e aprofundaram a perda de biodiversidade, a perda de solo e a desertificação.", "Todo o ser vivo faz parte de um ecossistema em troca com o vivo e o não vivo. Se uma parte se danifica, o efeito aparece noutro lado. É preciso agir sem ultrapassar a velocidade de recuperação da natureza e sem quebrar o equilíbrio."], principles: [{ title: "Usar os recursos com critério", text: "Tomamos a eficiência como regra, sabendo que os recursos naturais podem esgotar-se. Protege-se a integridade e a resiliência dos ecossistemas." }, { title: "Crescimento e equilíbrio ambiental", text: "Procuramos um crescimento que eleve o bem-estar sem prejudicar o ambiente. Quando a produção sobe, sobe o bem-estar humano." }, { title: "Interesse da empresa e do público", text: "Os temas sociais e ambientais fazem parte da gestão, não só o crescimento. O interesse da empresa não choca com o interesse público." }], yarnKicker: "Tecnologias mais limpas", yarnTitle: "Fios sustentáveis", yarnLead: "inclui a sustentabilidade social e ambiental em todos os processos, para um mundo melhor.", yarns: [{ subtitle: "Parceria UNIFI", text: "Soluções de fio de fontes recicladas. Em 2023 os nossos processos ficaram documentados com um certificado GRS." }, { subtitle: "Fio de poliamida de base biológica", text: "Fio de poliamida de base biológica para usar menos matéria fóssil, com menor impacto e sem abdicar do desempenho." }, { subtitle: "Tingimento sem água", text: "Tingimento sem água inovador, centrado em usar menos água. A poupança de recursos começa na linha." }], certs: "Certificados", gesKicker: "Sistema solar", gesTitle: "Damos valor ao futuro e tiramos a energia de produção do sol", gesP: ["A nossa responsabilidade não é só produzir qualidade para as necessidades de hoje, mas deixar um mundo mais limpo. Com essa visão equipámos os telhados das fábricas com um sistema solar (GES).", "Por trás de cada produção na fábrica está agora a energia limpa do sol."], gesItems: [{ title: "Objetivo de 100% energia limpa", text: "Uma grande parte da eletricidade das linhas vem diretamente dos painéis solares de alta eficiência no telhado." }, { title: "Uma pegada de carbono menor", text: "Ao depender menos de combustíveis fósseis, procuramos todos os anos uma poupança de carbono comparável ao oxigénio de milhares de árvores." }, { title: "Liderar uma indústria mais verde", text: "Queremos liderar a transição energética do setor e deixar um mundo mais habitável." }], gesLink: "Ver a página GES", plantKicker: "Unidade de produção OmaFil", plantText: "Apoiamos a qualidade da produção com energia renovável.", plantAlt: "Fábrica OmaFil coberta de painéis solares" },
  careers: { title: "Carreiras", description: "A fábrica é o centro da produção. As pessoas são geridas com a mesma seriedade.", paragraphs: ["Da contratação ao trabalho diário, primeiro vão a igualdade de oportunidades, um lugar seguro e o desenvolvimento. A cooperação entre departamentos e o trabalho seguro na fábrica são a política aplicada.", "Para uma vaga aberta ou uma candidatura geral, pode enviar o CV em PDF."] },
  ges: { ...en.ges, kicker: "Sistema solar", title: "O nosso sistema solar", subtitle: "Alimentamos a produção com o sol através das centrais de campo de Elazığ e das coberturas de Erbaa", paragraphs: ["A OmaFil não produz apenas fio de qualidade. Também retiramos energia de fontes renováveis. O portefólio tem duas centrais de campo em Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) e duas centrais de cobertura na nossa fábrica de Tokat Erbaa.", "A potência instalada total é 6,76 MWp. A produção diária de campos e coberturas está nas dezenas de megawatts-hora; reduzimos a pegada de carbono para uma indústria mais verde."], total: "Total", panels: "painéis", imageAlt: "GES de cobertura OmaFil Erbaa — fábrica Oma Polimer", pillars: [{ title: "GES de campo + cobertura", text: "5,2 MWp de campo em Elazığ; 1,56 MWp no telhado da fábrica de Erbaa. Duas geografias, o mesmo objetivo." }, { title: "Uma pegada menor", text: "Cada quilowatt-hora gerado reduz emissões fósseis. Os nossos contadores seguem a aplicação e os dados da central." }, { title: "Exemplo de indústria mais verde", text: "Ao gerar a nossa energia queremos ser um exemplo da transição limpa no têxtil." }], respectTitle: "Produção que respeita a natureza", respectText: "A tecnologia e o investimento ficam no centro, e não pomos de lado a responsabilidade ambiental. As GES de campo e de cobertura reduzem emissões e apoiam o equilíbrio ecológico.", capacityTitle: "Produzimos com a nossa energia verde", capacity: ({ total, elazig, erbaa, min, max }) => `Com ${total} MWp instalados (Elazığ ${elazig} MWp de campo + Erbaa ${erbaa} MWp de cobertura) temos cerca de ${min}–${max} GWh de capacidade anual.`, metrics: ["Energia solar gerada (kWh)", "Emissões de carbono evitadas (toneladas)", "Número equivalente de árvores"], metricAlts: ["GES Elazığ Hacısam — OMA 1", "GES Elazığ Kavak — OMA 2", "GES de cobertura Erbaa — fábrica Oma Polimer"], daily: "Produção diária", roofStatus: "Aceitação provisória / exploração", fieldStatus: "Início de produção", photo: "foto", galleryTitle: "Galeria", galleryLead: "Fotos de Hacısam, Kavak e da cobertura de Erbaa.", ctaTitle: "A nossa abordagem de produção sustentável", ctaText: "O investimento GES faz parte do fio reciclado e da produção responsável.", sustainCta: "Sustentabilidade", contactCta: "Contacto" },
});

const nl: Inner = page({
  ...en,
  about: { ...en.about, title: "Over ons", description: "De weg van garenhandel naar productie gaat door met een beginsel van voortdurende ontwikkeling.", paragraphs: ["Ons werk begon met garenverkoop in Sultanhamam, jarenlang het hart van de textielmarkt van Istanbul, en ging door met ons beginsel van voortdurende ontwikkeling. In de jaren 2000 richtten we OMA POLİMER A.Ş. op om mee te gaan met een veranderende handel.", "We versterkten onze banden in het buitenland, omdat kracht in de buitenlandse handel even zwaar telt als op de binnenlandse markt. Vandaag doen we garenimport, productie en export samen."], growthBefore: "Ons", growthAccent: "groeiverhaal", milestones: [{ title: "Oprichting", text: "We begonnen met garenhandel in Sultanhamam, Istanbul." }, { title: "Start van export", text: "We bouwden onze banden in het buitenland." }, { title: "Eerste fabriek", text: "We zetten onze eerste fabriek op." }, { title: "Capaciteitsgroei", text: "We breidden het machinepark uit." }, { title: "Gipe-fabriek", text: "We namen de gipe-garenfabriek in Tokat–Erbaa in gebruik." }, { title: "GRS-certificaat", text: "We documenteerden gerecycled garen met GRS." }], offices: "Onze contactpunten", map: "Open kaart", stats: [{ title: "40.000 m² productieoppervlakte", subtitle: "Productiefabriek Tokat–Erbaa" }, { title: "13.000 ton/jaar", subtitle: "Naylon + polyester gipe" }, { title: "Nr. 1 in Europa", subtitle: "Gipe-garenfabriek" }, { title: "100% hernieuwbare energie", subtitle: "Doel van duurzame productie" }], focus: ["GRS-gecertificeerd", "Hernieuwbare energie", "Nul-afvaldoel"], sustainKicker: "Duurzaamheid", sustainBefore: "Een", sustainAccent: "verantwoorde", sustainAfter: "blik op de toekomst", sustainP1: "We zetten duurzaamheid in het midden van de productie. Met zonne-energie op het dak en GRS-gecertificeerd gerecycled garen willen we onze impact verlagen.", sustainP2: "Grondstofefficiëntie, verantwoorde productie en circulaire economie horen bij de identiteit van OmaFil.", sustainLink: "Naar de duurzaamheidspagina", gesLink: "GES — zonnestroomsysteem", recycledTitle: "Gerecycled garen", recycledText: "Met garen uit gerecyclede bronnen brengen we de circulaire economie in de productie, zonder de kwaliteitsstandaard te laten zakken.", grs: "GRS-gerichte productie", certs: "Certificaten" },
  factory: { ...en.factory, title: "Onze fabriek", description: "Europa’s grootste polymeer- / gipe-garenfabriek staat in Tokat–Erbaa.", headline: "Aan de top van Europa met 13.000 ton jaarcapaciteit", paragraphs: ["Onze fabriek in de georganiseerde industriezone Tokat Erbaa draagt met een jaarcapaciteit van 13.000 ton de titel van Europa’s grootste gipe-garenfabriek. Met hoogwaardige producten uit de lijnen voor Naylon 6, Naylon 66 en polyester-gipe bedienen we de wereldwijde textielindustrie.", "Met het R&D-centrum dat ze huisvest, produceren we niet alleen: we ontwikkelen ook de garentechnologie van de toekomst. De fabriek is een belangrijke bron van werkgelegenheid voor de regio, en het zonnesysteem op ons dak dekt een deel van de energiebehoefte van de productie uit schone bronnen."], since: "Sinds 1999 toonaangevend in de sector", sinceBody: "OmaFil steunt op bijna een kwart eeuw ervaring van Oma Polimer A.Ş. en biedt innovatieve, duurzame oplossingen in polymeer. In moderne fabrieken houden we kwaliteit en continuïteit op wereldniveau.", tabsAria: "Bedrijfsrichting", tabs: [{ label: "Missie", body: "De hoogwaardige technische garens leveren die de polymeerindustrie nodig heeft, met milieubewuste productie. Duurzame, innovatieve oplossingen ontwikkelen die waarde toevoegen aan de processen van klanten." }, { label: "Geschiedenis", body: "Onze groep stapte in 1999 in textiel en groeide door te investeren in techniek en mensen. De kennis uit OMA Tekstil is nu de productiekracht van OmaFil." }, { label: "Visie", body: "Een wereldwijd gekozen leidend merk zijn, met techniek en duurzaamheid in het midden van synthetisch garen. De toekomst van textiel mee vormgeven met innovatieve R&D." }], galleryTitle: "Onze fabriek", galleryBody: "Gebouwd met moderne techniek en wereldstandaarden is de fabriek een betrouwbaar leverpunt, met hoge productie. Onze infrastructuur en schonere energiepolitiek steunen duurzame groei.", bandTitle: "Productielijn", bandBody: "Met een machinepark van de laatste generatie voor Naylon 6 en 66 houden we de foutmarge laag. Nauwkeurige kwaliteitscontrole in elke stap levert garen met hoge treksterkte en lange levensduur.", map: "Open de fabriek op de kaart", alts: ["OmaFil fabriek — luchtfoto met zonnepanelen", "Ingang OmaFil fabriek", "OmaFil productiefabriek", "Voorkant OmaFil fabriek"], bandAlt: "OmaFil productielijn", bandMore: "Meer tonen", bandLess: "Minder tonen" },
  sustain: { ...en.sustain, title: "Duurzaamheid", description: "OMA POLİMER A.Ş. verbindt zich ertoe sociale en ecologische duurzaamheid in alle processen op te nemen.", paragraphs: ["Voor een betere wereld neemt OMA POLİMER A.Ş. sociale en ecologische duurzaamheid op in alle productieprocessen.", "Duurzaamheid is productie en verscheidenheid in stand houden en tegelijk menselijk leven houdbaar maken. Onze behoeften dekken zonder die van volgende generaties weg te nemen.", "Voor ons is duurzaamheid geen slogan. Het is grondstoffen efficiënt gebruiken en het product daarop ontwikkelen. Zonne-energie, gerecycled garen en verven met minder water zijn concrete delen."], worldAlt: "Beeld van een beboste aardbol", whyBefore: "Waarom", whyAccent: "duurzaamheid telt", why: ["De energievraag die met de industriële revolutie groeide, leidde tot zwaar gebruik van niet-hernieuwbare bronnen zoals olie en kolen. Snelle industrialisatie en verstedelijking vergrootten lucht-, water- en bodemvervuiling en verdiepten verlies van biodiversiteit, bodemverlies en verwoestijning.", "Elk levend wezen is deel van een ecosysteem in uitwisseling met levend en niet-levend. Raakt één deel beschadigd, dan is het effect elders zichtbaar. We moeten handelen zonder het hersteltempo van de natuur te overschrijden en zonder het evenwicht te breken."], principles: [{ title: "Grondstoffen verstandig gebruiken", text: "We nemen efficiëntie als regel, omdat natuurlijke bronnen opraken. De samenhang en veerkracht van ecosystemen worden beschermd." }, { title: "Groei en milieubalans", text: "We streven naar groei die welvaart verhoogt zonder het milieu te schaden. Stijgt de productie, dan stijgt ook de menselijke welvaart." }, { title: "Bedrijfsbelang en algemeen belang samen", text: "Sociale en milieuthema’s horen bij het bestuur, niet alleen groei. Het bedrijfsbelang staat niet tegenover het algemeen belang." }], yarnKicker: "Schonere technologieën", yarnTitle: "Duurzame garens", yarnLead: "neemt voor een betere wereld sociale en ecologische duurzaamheid op in alle processen.", yarns: [{ subtitle: "UNIFI-samenwerking", text: "Garenoplossingen uit gerecyclede bronnen. In 2023 werden onze processen vastgelegd met een GRS-certificaat." }, { subtitle: "Biobased polyamidegaren", text: "Biobased polyamidegaren om fossiele grondstof te verminderen, met lagere impact en zonder prestatie in te leveren." }, { subtitle: "Waterloos verven", text: "Innovatief waterloos verven, gericht op minder water. Grondstofbesparing begint in de lijn." }], certs: "Certificaten", gesKicker: "Zonnestroomsysteem", gesTitle: "We geven de toekomst waarde en halen productie-energie uit de zon", gesP: ["Onze verantwoordelijkheid is niet alleen kwaliteit voor de behoefte van vandaag, maar ook een schonere wereld. Met die visie hebben we de daken van onze fabrieken met een zonnestroomsysteem (GES) uitgerust.", "Achter elke productie in de fabriek staat nu de schone energie van de zon."], gesItems: [{ title: "Doel 100% schone energie", text: "Een groot deel van de stroom van onze lijnen komt rechtstreeks van de hoogrendement-zonnepanelen op het dak." }, { title: "Een kleinere CO₂-voetafdruk", text: "Door minder afhankelijk te zijn van fossiele brandstof streven we elk jaar naar een CO₂-besparing vergelijkbaar met de zuurstof van duizenden bomen." }, { title: "Voorop in een groenere industrie", text: "We willen de energietransitie in onze sector leiden en een leefbaardere wereld achterlaten." }], gesLink: "Bekijk de GES-pagina", plantKicker: "OmaFil productiefabriek", plantText: "We ondersteunen productiekwaliteit met hernieuwbare energie.", plantAlt: "OmaFil fabriek met zonnepanelen" },
  careers: { title: "Werken bij", description: "De fabriek is het centrum van de productie. Mensen worden met dezelfde zorg geleid.", paragraphs: ["Van werving tot dagelijks werk komen gelijke kansen, een veilige plek en ontwikkeling eerst. Samenwerking tussen afdelingen en veilig werken in de fabriek zijn het toegepaste beleid.", "Voor een open functie of een algemene sollicitatie kunt u uw cv als PDF sturen."] },
  ges: { ...en.ges, kicker: "Zonnestroomsysteem", title: "Ons zonnestroomsysteem", subtitle: "We voeden de productie met de zon via de veldcentrales in Elazığ en de dakcentrales in Erbaa", paragraphs: ["OmaFil produceert niet alleen kwaliteitsgaren. We halen energie ook uit hernieuwbare bronnen. De portefeuille heeft twee veldcentrales in Elazığ Kovancılar (OMA 1 Hacısam, OMA 2 Kavak) en twee dakcentrales in onze fabriek in Tokat Erbaa.", "Het totale geïnstalleerde vermogen is 6,76 MWp. De dagproductie van velden en daken ligt in de tientallen megawattuur; we verlagen onze CO₂-voetafdruk voor een groenere industrie."], total: "Totaal", panels: "panelen", imageAlt: "OmaFil Erbaa dak-GES — fabriek Oma Polimer", pillars: [{ title: "Veld + dak-GES", text: "5,2 MWp veldcentrale in Elazığ; 1,56 MWp op het fabrieksdak in Erbaa. Twee regio’s, hetzelfde doel." }, { title: "Een kleinere voetafdruk", text: "Elke opgewekte kilowattuur verlaagt fossiele emissies. Onze meters volgen de app en de installatiegegevens." }, { title: "Voorbeeld van een groenere industrie", text: "Door onze eigen energie op te wekken willen we een voorbeeld zijn van de schone transitie in textiel." }], respectTitle: "Productie met respect voor de natuur", respectText: "Techniek en investeringen blijven in het midden, en we laten de milieuverantwoordelijkheid niet weg. Veld- en dak-GES verlagen emissies en steunen het ecologische evenwicht.", capacityTitle: "We produceren met onze groene energie", capacity: ({ total, elazig, erbaa, min, max }) => `Met ${total} MWp geïnstalleerd (Elazığ ${elazig} MWp veld + Erbaa ${erbaa} MWp dak) hebben we ongeveer ${min}–${max} GWh jaarlijkse opwekkingscapaciteit.`, metrics: ["Opgewekte zonne-energie (kWh)", "Vermeden koolstofemissie (ton)", "Vergelijkbaar aantal bomen"], metricAlts: ["Elazığ Hacısam GES — OMA 1", "Elazığ Kavak GES — OMA 2", "Erbaa dak-GES — fabriek Oma Polimer"], daily: "Dagproductie", roofStatus: "Voorlopige oplevering / bedrijf", fieldStatus: "Start van productie", photo: "foto", galleryTitle: "Galerij", galleryLead: "Foto’s van Hacısam, Kavak en het dak in Erbaa.", ctaTitle: "Onze aanpak van duurzame productie", ctaText: "De GES-investering hoort bij gerecycled garen en verantwoorde productie.", sustainCta: "Duurzaamheid", contactCta: "Contact" },
});

const ru: Inner = page({
  ...en,
  about: { ...en.about, title: "О нас", description: "Путь от торговли пряжей к производству продолжается с принципом постоянного развития.", paragraphs: ["Наше дело началось с продажи пряжи в Султанхамаме, долгие годы сердце текстильного рынка Стамбула, и шло с принципом постоянного развития. В 2000-х мы основали OMA POLİMER A.Ş., чтобы идти за меняющейся торговлей.", "Мы укрепили зарубежные связи, потому что сила во внешней торговле важна так же, как на внутреннем рынке. Сегодня мы вместе ведем импорт, производство и экспорт пряжи."], growthBefore: "Наша история", growthAccent: "роста", milestones: [{ title: "Основание", text: "Мы начали с торговли пряжей в Султанхамаме, Стамбул." }, { title: "Начало экспорта", text: "Мы выстроили зарубежные связи." }, { title: "Первый завод", text: "Мы построили первый завод." }, { title: "Рост мощности", text: "Мы расширили парк машин." }, { title: "Завод gipe", text: "Мы запустили завод gipe-пряжи в Токат–Эрбаа." }, { title: "Сертификат GRS", text: "Мы подтвердили производство переработанной пряжи сертификатом GRS." }], offices: "Наши точки связи", map: "Открыть карту", stats: [{ title: "40 000 м² производственной площади", subtitle: "Завод в Токат–Эрбаа" }, { title: "13 000 тонн/год", subtitle: "Gipe Naylon + полиэстер" }, { title: "№1 в Европе", subtitle: "Завод gipe-пряжи" }, { title: "100% возобновляемая энергия", subtitle: "Цель устойчивого производства" }], focus: ["Сертификат GRS", "Возобновляемая энергия", "Цель нулевых отходов"], sustainKicker: "Устойчивость", sustainBefore: "Ответственный", sustainAccent: "подход", sustainAfter: "к будущему", sustainP1: "Мы ставим устойчивость в центр производства. Крышной солнечной энергией и переработанной пряжей с GRS мы снижаем воздействие на среду.", sustainP2: "Эффективность ресурсов, ответственное производство и круговая экономика — часть характера OmaFil.", sustainLink: "На страницу устойчивости", gesLink: "GES — солнечная система", recycledTitle: "Переработанная пряжа", recycledText: "Пряжей из переработанных источников мы вносим круговую экономику в производство, не снижая стандарты качества.", grs: "Производство в линии GRS", certs: "Сертификаты" },
  factory: { ...en.factory, title: "Наш завод", description: "Крупнейший в Европе завод полимерной / gipe-пряжи находится в Токат–Эрбаа.", headline: "На вершине Европы с годовой мощностью 13 000 тонн", paragraphs: ["Наш завод в организованной промзоне Токат Эрбаа с годовой мощностью 13 000 тонн носит звание крупнейшего в Европе производства пряжи gipe. Продукцией с высокой добавленной стоимостью с линий Naylon 6, Naylon 66 и полиэстер gipe мы обслуживаем мировую текстильную индустрию.", "Имея собственный центр НИОКР, мы не только производим: мы также разрабатываем технологии пряжи будущего. Завод — важный источник занятости для региона, а солнечная система на крыше покрывает часть потребности производства в энергии из чистых источников."], since: "Лидируем в отрасли с 1999 года", sinceBody: "OmaFil опирается на почти четверть века опыта Oma Polimer A.Ş. и дает инновационные, устойчивые решения в полимере. На современных заводах мы держим качество и непрерывность на мировом уровне.", tabsAria: "Направление компании", tabs: [{ label: "Миссия", body: "Поставлять высококачественную техническую пряжу, нужную полимерной отрасли, экологически внимательным производством. Развивать устойчивые инновационные решения, которые добавляют ценность процессам клиентов." }, { label: "История", body: "Наша группа вошла в текстиль в 1999 году и росла, вкладываясь в технологии и людей. Знание OMA Tekstil сегодня — производственная сила OmaFil." }, { label: "Видение", body: "Быть ведущим брендом, который выбирают в мире, с технологией и устойчивостью в центре синтетической пряжи. Направлять будущее текстиля инновационными НИОКР." }], galleryTitle: "Наш завод", galleryBody: "Построенный по современной технике и мировым стандартам, завод — надежная точка поставки с высоким выпуском. Инфраструктура и более чистая энергетическая политика поддерживают устойчивый рост.", bandTitle: "Производственная линия", bandBody: "Парком машин последнего поколения для Naylon 6 и 66 мы держим долю ошибки низкой. Точный контроль на каждом этапе дает пряжу высокой прочности и долгого срока.", map: "Открыть завод на карте", alts: ["Завод OmaFil — аэрофото с солнечными панелями", "Вход на завод OmaFil", "Производственный завод OmaFil", "Фасад завода OmaFil"], bandAlt: "Производственная линия OmaFil", bandMore: "Показать ещё", bandLess: "Показать меньше" },
  sustain: { ...en.sustain, title: "Устойчивость", description: "OMA POLİMER A.Ş. обязуется включать социальную и экологическую устойчивость во все процессы.", paragraphs: ["Ради лучшего мира OMA POLİMER A.Ş. обязуется включать социальную и экологическую устойчивость во все производственные процессы.", "Устойчивость — это сохранять производство и разнообразие и вместе с тем делать человеческую жизнь длительной. Закрывать наши потребности, не отнимая потребности будущих поколений.", "Для нас устойчивость не лозунг. Это эффективно использовать ресурс и развивать продукт соответственно. Солнечная энергия, переработанная пряжа и крашение с меньшим расходом воды — конкретные части этого подхода."], worldAlt: "Изображение лесного земного шара", whyBefore: "Почему", whyAccent: "устойчивость важна", why: ["Рост потребности в энергии с промышленной революцией привел к тяжелому использованию невозобновляемых источников, таких как нефть и уголь. Быстрая индустриализация и урбанизация усилили загрязнение воздуха, воды и почвы и углубили потерю биоразнообразия, потерю почв и опустынивание.", "Каждое живое существо — часть экосистемы в обмене с живым и неживым. Если повреждена одна часть, следствие видно в другой. Нужно действовать, не обгоняя скорость восстановления природы и не ломая равновесие."], principles: [{ title: "Разумно использовать ресурсы", text: "Мы берем эффективность за правило, зная, что природные ресурсы конечны. Целостность и устойчивость экосистем защищаются." }, { title: "Рост и экологический баланс", text: "Мы целимся в рост, который поднимает благосостояние без вреда среде. Когда растет выпуск, растет и благосостояние людей." }, { title: "Интерес компании и общества вместе", text: "Социальные и экологические темы — часть управления, не только рост. Интерес компании не спорит с общественным интересом." }], yarnKicker: "Более чистые технологии", yarnTitle: "Устойчивая пряжа", yarnLead: "включает социальную и экологическую устойчивость во все процессы ради лучшего мира.", yarns: [{ subtitle: "Партнерство UNIFI", text: "Решения по пряже из переработанных источников. В 2023 году процессы подтверждены сертификатом GRS." }, { subtitle: "Полиамидная пряжа на биооснове", text: "Полиамидная пряжа на биооснове, чтобы снизить ископаемое сырье, с меньшим воздействием и без потери свойств." }, { subtitle: "Безводное крашение", text: "Инновационное безводное крашение с фокусом на меньший расход воды. Экономия ресурса начинается на линии." }], certs: "Сертификаты", gesKicker: "Солнечная система", gesTitle: "Мы даем ценность будущему и берем энергию производства от солнца", gesP: ["Наша ответственность — не только качественное производство для нужд сегодняшнего дня, но и более чистый мир. С этим видением мы оснастили крыши заводов солнечной системой (GES).", "За каждым производством на заводе теперь стоит чистая энергия солнца."], gesItems: [{ title: "Цель 100% чистой энергии", text: "Большая доля электричества линий приходит прямо с высокоэффективных солнечных панелей на крыше." }, { title: "Меньший углеродный след", text: "Меньше завися от ископаемого топлива, мы каждый год целимся в углеродную экономию, сопоставимую с кислородом тысяч деревьев." }, { title: "Лидерство более зеленой промышленности", text: "Мы хотим вести энергетический переход отрасли и оставить более пригодный для жизни мир." }], gesLink: "Смотреть страницу GES", plantKicker: "Производственный завод OmaFil", plantText: "Мы поддерживаем качество производства инвестициями в возобновляемую энергию.", plantAlt: "Завод OmaFil с солнечными панелями" },
  careers: { title: "Карьера", description: "Завод — центр производства. Людьми управляют с той же серьезностью.", paragraphs: ["От найма до ежедневной работы сначала равные возможности, безопасное место и развитие. Сотрудничество отделов и безопасная работа на заводе — это применяемая политика.", "На открытую должность или как общую заявку можно отправить резюме в PDF."] },
  ges: { ...en.ges, kicker: "Солнечная система", title: "Наша солнечная система", subtitle: "Мы питаем производство от солнца полевыми станциями Элязыга и крышными станциями Эрбаа", paragraphs: ["OmaFil производит не только качественную пряжу. Мы также берем энергию из возобновляемых источников. В портфеле две полевые станции в Элязыг Кованджилар (OMA 1 Hacısam, OMA 2 Kavak) и две крышные на заводе в Токат Эрбаа.", "Общая установленная мощность 6,76 MWp. Суточная выработка полей и крыш — в диапазоне десятков мегаватт-часов; мы снижаем углеродный след ради более зеленой промышленности."], total: "Всего", panels: "панелей", imageAlt: "Крышная GES OmaFil Эрбаа — завод Oma Polimer", pillars: [{ title: "Полевая + крышная GES", text: "5,2 MWp полевой станции в Элязыге; 1,56 MWp на крыше завода в Эрбаа. Два региона, одна цель." }, { title: "Меньший углеродный след", text: "Каждый выработанный киловатт-час снижает ископаемые выбросы. Счетчики следуют приложению и данным станций." }, { title: "Пример более зеленой промышленности", text: "Вырабатывая свою энергию, мы хотим быть примером чистого перехода в текстиле." }], respectTitle: "Производство с уважением к природе", respectText: "Технология и инвестиции остаются в центре, и мы не откладываем экологическую ответственность. Полевые и крышные GES снижают выбросы и поддерживают экологический баланс.", capacityTitle: "Мы производим на своей зеленой энергии", capacity: ({ total, elazig, erbaa, min, max }) => `При установленных ${total} MWp (Элязыг ${elazig} MWp поле + Эрбаа ${erbaa} MWp крыша) у нас около ${min}–${max} GWh годовой мощности выработки.`, metrics: ["Выработанная солнечная энергия (кВт·ч)", "Предотвращенные выбросы углерода (тонн)", "Эквивалентное число деревьев"], metricAlts: ["GES Элязыг Хаджысам — OMA 1", "GES Элязыг Кавак — OMA 2", "Крышная GES Эрбаа — завод Oma Polimer"], daily: "Суточная выработка", roofStatus: "Временная приемка / эксплуатация", fieldStatus: "Начало производства", photo: "фото", galleryTitle: "Галерея", galleryLead: "Фото Хаджысам, Кавак и крыши Эрбаа.", ctaTitle: "Наш подход к устойчивому производству", ctaText: "Инвестиция GES — часть переработанной пряжи и ответственного производства.", sustainCta: "Устойчивость", contactCta: "Контакты" },
});

const ar: Inner = page({
  ...en,
  about: { ...en.about, title: "من نحن", description: "الطريق من تجارة الخيط إلى الإنتاج مستمر بمبدأ التطور الدائم.", paragraphs: ["بدأ عملنا ببيع الخيط في سلطان حمام، الذي كان سنوات قلب سوق النسيج في إسطنبول، واستمر بمبدأ التطور الدائم. في الألفية أسسنا OMA POLİMER A.Ş. لنواكب تجارة متغيرة.", "قوّينا روابطنا في الخارج، لأن القوة في التجارة الخارجية تهم بقدر السوق المحلي. اليوم نواصل معاً استيراد الخيط وإنتاجه وتصديره."], growthBefore: "قصة", growthAccent: "نمونا", milestones: [{ title: "التأسيس", text: "بدأنا بتجارة الخيط في سلطان حمام، إسطنبول." }, { title: "بداية التصدير", text: "بنينا روابطنا في الخارج." }, { title: "أول مصنع", text: "أنشأنا أول مصنع إنتاج." }, { title: "زيادة الطاقة", text: "وسّعنا مجموعة الآلات." }, { title: "مصنع gipe", text: "شغّلنا مصنع خيط gipe في توكات–إربا." }, { title: "شهادة GRS", text: "وثّقنا إنتاج الخيط المعاد تدويره بشهادة GRS." }], offices: "نقاط التواصل", map: "افتح الخريطة", stats: [{ title: "40.000 م² مساحة الإنتاج", subtitle: "مصنع توكات–إربا" }, { title: "13.000 طن/سنة", subtitle: "gipe نايلون + بوليستر" }, { title: "الأكبر في أوروبا", subtitle: "مصنع خيط gipe" }, { title: "100% طاقة متجددة", subtitle: "هدف إنتاج مستدام" }], focus: ["معتمد GRS", "طاقة متجددة", "هدف صفر نفايات"], sustainKicker: "الاستدامة", sustainBefore: "نهج", sustainAccent: "مسؤول", sustainAfter: "تجاه المستقبل", sustainP1: "نضع الاستدامة في قلب الإنتاج. بالطاقة الشمسية على السطح والخيط المعاد تدويره بشهادة GRS نهدف إلى خفض أثرنا.", sustainP2: "كفاءة الموارد والإنتاج المسؤول والاقتصاد الدائري جزء من هوية OmaFil.", sustainLink: "إلى صفحة الاستدامة", gesLink: "GES — نظام شمسي", recycledTitle: "خيط معاد تدويره", recycledText: "بخيوط من مصادر معاد تدويرها ندخل الاقتصاد الدائري في الإنتاج من دون خفض معايير الجودة.", grs: "إنتاج متوافق مع GRS", certs: "الشهادات" },
  factory: { ...en.factory, title: "مصنعنا", description: "أكبر مصنع خيط بوليمر / gipe في أوروبا يقع في توكات–إربا.", headline: "في قمة أوروبا بطاقة 13.000 طن سنوياً", paragraphs: ["مصنعنا في المنطقة الصناعية المنظمة في توكات إربا يحمل لقب أكبر مصنع خيط gipe في أوروبا، بطاقة إنتاج سنوية قدرها 13.000 طن. نخدم صناعة النسيج العالمية بمنتجات عالية القيمة من خطوط خيط gipe لـ Naylon 6 وNaylon 66 والبوليستر.", "بمركز البحث والتطوير الذي يضمه، لا نكتفي بالإنتاج: نطوّر أيضاً تقنيات الخيط المستقبلية. المصنع مصدر توظيف مهم للمنطقة، وبنظام الطاقة الشمسية على السطح نغطي جزءاً من حاجة الإنتاج إلى الطاقة من مصادر نظيفة."], since: "نقود القطاع منذ 1999", sinceBody: "تستند OmaFil إلى نحو ربع قرن من خبرة Oma Polimer A.Ş. وتقدم حلولاً مبتكرة ومستدامة في البوليمر. في مصانع حديثة نحافظ على الجودة والاستمرار بمعايير عالمية.", tabsAria: "اتجاه الشركة", tabs: [{ label: "المهمة", body: "تقديم الخيوط التقنية عالية الجودة التي تحتاجها صناعة البوليمر، بإنتاج يراعي البيئة. تطوير حلول مستدامة ومبتكرة تضيف قيمة إلى عمليات عملائنا." }, { label: "التاريخ", body: "دخلت مجموعتنا النسيج عام 1999 ونمت بالاستثمار في التقنية والناس. المعرفة المتراكمة في OMA Tekstil هي اليوم قوة إنتاج OmaFil." }, { label: "الرؤية", body: "أن نكون علامة رائدة يختارها العالم، والتقنية والاستدامة في قلب خيط الاصطناع. توجيه مستقبل النسيج ببحث وتطوير مبتكر." }], galleryTitle: "مصنعنا", galleryBody: "بُني بتقنية حديثة ومعايير عالمية، والمصنع نقطة توريد موثوقة بإنتاج مرتفع. بنيتنا وسياسة الطاقة الأنظف تدعمان نمواً مستداماً.", bandTitle: "خط الإنتاج", bandBody: "بمجموعة آلات من الجيل الأخير لـ Naylon 6 و66 نبقي هامش الخطأ منخفضاً. الرقابة الدقيقة في كل مرحلة تنتج خيطاً عالي المتانة وطويل العمر.", map: "افتح المصنع على الخريطة", alts: ["مصنع OmaFil — منظر جوي مع ألواح شمسية", "مدخل مصنع OmaFil", "منشأة إنتاج OmaFil", "واجهة مصنع OmaFil"], bandAlt: "خط إنتاج OmaFil", bandMore: "عرض المزيد", bandLess: "عرض أقل" },
  sustain: { ...en.sustain, title: "الاستدامة", description: "تلتزم OMA POLİMER A.Ş. بإدخال الاستدامة الاجتماعية والبيئية في كل العمليات.", paragraphs: ["من أجل عالم أفضل تلتزم OMA POLİMER A.Ş. بإدخال الاستدامة الاجتماعية والبيئية في كل عمليات الإنتاج.", "الاستدامة هي استمرار الإنتاج والتنوع مع إبقاء حياة الإنسان ممكنة. تلبية حاجاتنا من دون أخذ حاجات الأجيال القادمة.", "الاستدامة عندنا ليست شعاراً. هي استخدام المورد بكفاءة وتطوير المنتج على هذا الأساس. الطاقة الشمسية والخيط المعاد تدويره والصباغة التي تستهلك ماءً أقل أجزاء ملموسة."], worldAlt: "صورة كرة أرضية مغطاة بالغابة", whyBefore: "لماذا", whyAccent: "تهم الاستدامة", why: ["أدت حاجة الطاقة التي نمت مع الثورة الصناعية إلى استخدام كثيف لمصادر غير متجددة مثل النفط والفحم. سرّعت الصناعة والمدن تلوث الهواء والماء والتربة، وعمّقت فقدان التنوع الحيوي وفقدان التربة والتصحر.", "كل كائن حي جزء من منظومة يتبادل فيها مع الحي وغير الحي. إذا تضرر جزء ظهرت النتيجة في أجزاء أخرى. يجب أن نتحرك من دون تجاوز سرعة تعافي الطبيعة ومن دون كسر التوازن."], principles: [{ title: "استخدام الموارد بحكمة", text: "نجعل الكفاءة قاعدة في الإنتاج لأن موارد البيئة قابلة للنفاد. تُصان سلامة المنظومات ومرونتها." }, { title: "النمو والتوازن البيئي", text: "نستهدف نمواً يرفع الرفاه من دون الإضرار بالبيئة. حين يزيد الإنتاج يرتفع رفاه الإنسان." }, { title: "مصلحة الشركة والمصلحة العامة معاً", text: "القضايا الاجتماعية والبيئية جزء من الإدارة، لا النمو الاقتصادي وحده. مصلحة الشركة لا تتعارض مع المصلحة العامة." }], yarnKicker: "تقنيات أنظف", yarnTitle: "خيوط مستدامة", yarnLead: "تُدخل الاستدامة الاجتماعية والبيئية في كل العمليات من أجل عالم أفضل.", yarns: [{ subtitle: "شراكة UNIFI", text: "حلول خيوط من مصادر معاد تدويرها. في 2023 وُثّقت عملياتنا بشهادة GRS." }, { subtitle: "خيط بولي أميد حيوي الأساس", text: "خيط بولي أميد حيوي الأساس لخفض الخام الأحفوري، بأثر أقل ومن دون التخلي عن الأداء." }, { subtitle: "صباغة بلا ماء", text: "صباغة بلا ماء مبتكرة تركز على خفض استهلاك الماء. توفير المورد يبدأ داخل الخط." }], certs: "الشهادات", gesKicker: "نظام شمسي", gesTitle: "نضيف قيمة للمستقبل ونأخذ طاقة الإنتاج من الشمس", gesP: ["مسؤوليتنا ليست إنتاجاً جيداً لحاجات اليوم فقط، بل ترك عالم أنظف. بهذه الرؤية جهّزنا أسطح المصانع بنظام طاقة شمسية (GES).", "خلف كل إنتاج في المصنع الآن طاقة الشمس النظيفة."], gesItems: [{ title: "هدف 100% طاقة نظيفة", text: "جزء كبير من كهرباء الخطوط يأتي مباشرة من الألواح الشمسية عالية الكفاءة على السطح." }, { title: "بصمة كربون أقل", text: "بالاعتماد الأقل على الوقود الأحفوري نستهدف كل سنة توفيراً كربونياً يقارب أكسجين آلاف الأشجار." }, { title: "ريادة صناعة أكثر اخضراراً", text: "نريد قيادة تحول الطاقة في قطاعنا وترك عالم أكثر قابلية للعيش." }], gesLink: "اعرض صفحة GES", plantKicker: "منشأة إنتاج OmaFil", plantText: "ندعم جودة الإنتاج باستثمار في الطاقة المتجددة.", plantAlt: "مصنع OmaFil مغطى بألواح شمسية" },
  careers: { title: "الوظائف", description: "المصنع مركز الإنتاج. تُدار الموارد البشرية بالجدية نفسها.", paragraphs: ["من التوظيف إلى العمل اليومي تأتي تكافؤ الفرص والبيئة الآمنة والتطوير أولاً. التعاون بين الأقسام والعمل الآمن داخل المصنع هما السياسة المطبَّقة.", "للوظائف المفتوحة أو لطلب عام يمكنكم إرسال السيرة بصيغة PDF."] },
  ges: { ...en.ges, kicker: "نظام شمسي", title: "نظامنا الشمسي", subtitle: "نغذي الإنتاج من الشمس بمحطات الحقل في إلازيغ ومحطات السطح في إربا", paragraphs: ["OmaFil لا تنتج خيطاً عالي الجودة فقط. نأخذ الطاقة أيضاً من مصادر متجددة. في المحفظة محطتان حقليتان في إلازيغ كوفانجيلار (OMA 1 Hacısam وOMA 2 Kavak) ومحطتان على سطح مصنعنا في توكات إربا.", "إجمالي القدرة المركبة 6.76 MWp. الإنتاج اليومي من الحقول والأسطح في نطاق عشرات الميغاواط-ساعة، ونخفض البصمة الكربونية من أجل صناعة أكثر اخضراراً."], total: "الإجمالي", panels: "ألواح", imageAlt: "GES سطح OmaFil إربا — مصنع Oma Polimer", pillars: [{ title: "GES حقل + سطح", text: "5.2 MWp محطة حقلية في إلازيغ؛ 1.56 MWp على سطح مصنع إربا. جغرافيتان وهدف استدامة واحد." }, { title: "بصمة أقل", text: "كل كيلوواط-ساعة نولّده يخفض الانبعاث الأحفوري. عداداتنا تتبع التطبيق وبيانات المحطة." }, { title: "مثال لصناعة أكثر اخضراراً", text: "بتوليد طاقتنا نريد أن نكون مثالاً للتحول النظيف في إنتاج النسيج." }], respectTitle: "إنتاج يحترم الطبيعة", respectText: "تبقى التقنية والاستثمار في المركز، ولا نترك المسؤولية البيئية. استثمارات GES الحقلية والسطحية تخفض الانبعاث وتدعم التوازن البيئي.", capacityTitle: "ننتج بطاقتنا الخضراء", capacity: ({ total, elazig, erbaa, min, max }) => `بقدرة مركبة ${total} MWp (إلازيغ ${elazig} MWp حقل + إربا ${erbaa} MWp سطح) لدينا نحو ${min}–${max} GWh قدرة توليد سنوية.`, metrics: ["الطاقة الشمسية المولَّدة (kWh)", "انبعاث الكربون المتجنب (طن)", "عدد الأشجار المكافئ"], metricAlts: ["GES إلازيغ حاجي سام — OMA 1", "GES إلازيغ كافاك — OMA 2", "GES سطح إربا — مصنع Oma Polimer"], daily: "الإنتاج اليومي", roofStatus: "قبول مؤقت / تشغيل", fieldStatus: "بداية الإنتاج", photo: "صورة", galleryTitle: "المعرض", galleryLead: "صور حاجي سام وكافاك وسطح إربا.", ctaTitle: "نهجنا في الإنتاج المستدام", ctaText: "استثمار GES جزء من الخيط المعاد تدويره والإنتاج المسؤول.", sustainCta: "الاستدامة", contactCta: "اتصل بنا" },
});

const zh: Inner = page({
  ...en,
  about: { ...en.about, title: "关于我们", description: "从纱线贸易到生产的路程，以持续发展的原则继续。", paragraphs: ["我们的业务从伊斯坦布尔纺织市场多年的中心苏丹哈马姆卖纱开始，并以持续发展的原则延续。2000 年代我们成立 OMA POLİMER A.Ş.，以适应变化中的贸易。", "我们巩固了海外联系，因为外贸中的实力与国内市场同样重要。今天我们同时进行纱线进口、生产和出口。"], growthBefore: "我们的", growthAccent: "成长故事", milestones: [{ title: "创立", text: "我们在伊斯坦布尔苏丹哈马姆从纱线贸易起步。" }, { title: "开始出口", text: "我们建立了海外联系。" }, { title: "第一座工厂", text: "我们建立了第一座生产厂。" }, { title: "产能提升", text: "我们扩大了机器规模。" }, { title: "gipe 工厂", text: "我们在托卡特–埃尔巴投产 gipe 纱线工厂。" }, { title: "GRS 证书", text: "我们以 GRS 证明再生纱线生产。" }], offices: "我们的联系点", map: "打开地图", stats: [{ title: "40,000 平方米生产面积", subtitle: "托卡特–埃尔巴生产厂" }, { title: "年产 13,000 吨", subtitle: "尼龙 + 涤纶 gipe" }, { title: "欧洲最大", subtitle: "gipe 纱线工厂" }, { title: "100% 可再生能源", subtitle: "可持续生产目标" }], focus: ["GRS 认证", "可再生能源", "零废弃目标"], sustainKicker: "可持续发展", sustainBefore: "对未来", sustainAccent: "负责", sustainAfter: "的方式", sustainP1: "我们把可持续性放在生产中心。以屋顶太阳能和 GRS 认证的再生纱线，降低环境影响。", sustainP2: "资源效率、负责任的生产和循环经济，是 OmaFil 的一部分。", sustainLink: "前往可持续发展页面", gesLink: "GES — 太阳能系统", recycledTitle: "再生纱线", recycledText: "用来自再生来源的纱线把循环经济带入生产，同时保持质量标准。", grs: "符合 GRS 的生产", certs: "证书" },
  factory: { ...en.factory, title: "我们的工厂", description: "欧洲最大的聚合物 / gipe 纱线工厂位于托卡特–埃尔巴。", headline: "以年产 13,000 吨的产能站在欧洲之巅", paragraphs: ["我们位于托卡特埃尔巴有组织工业区的工厂，以年产 13,000 吨的产能，拥有欧洲最大 gipe 纱线工厂的称号。我们以 Naylon 6、Naylon 66 和涤纶 gipe 纱线产线的高附加值产品服务全球纺织业。", "凭借厂内的研发中心，我们不只是生产，也在开发未来的纱线技术。工厂为当地提供重要就业，屋顶太阳能系统则用清洁能源满足生产用电需求的一部分。"], since: "自 1999 年起引领行业", sinceBody: "OmaFil 依托 Oma Polimer A.Ş. 近四分之一世纪的经验，在聚合物生产中提供创新、可持续的方案。在现代化工厂里，我们按全球标准保持质量与连续性。", tabsAria: "公司方向", tabs: [{ label: "使命", body: "以关注环境的生产方式，提供聚合物行业需要的高品质技术纱线。开发为客户生产过程增加价值的可持续、创新方案。" }, { label: "历程", body: "我们的集团于 1999 年进入纺织，通过对技术和人的投入稳步成长。在 OMA Tekstil 积累的经验，今天成为 OmaFil 的生产能力。" }, { label: "愿景", body: "成为全球选择的领先品牌，把技术与可持续性放在合成纱线生产的中心。以创新研发影响纺织的未来。" }], galleryTitle: "我们的工厂", galleryBody: "工厂以现代技术和全球标准建造，以较高产量成为纺织业可靠的供应点。基础设施和更清洁的能源政策支持可持续增长。", bandTitle: "生产线", bandBody: "以 Naylon 6 与 66 的新一代机器，我们把误差保持在低位。每个阶段的精密质量控制，生产出高强度、长寿命的纱线。", map: "在地图上打开工厂", alts: ["OmaFil 工厂 — 带太阳能板的航拍", "OmaFil 工厂入口", "OmaFil 生产工厂", "OmaFil 工厂正面"], bandAlt: "OmaFil 生产线", bandMore: "显示更多", bandLess: "显示更少" },
  sustain: { ...en.sustain, title: "可持续发展", description: "OMA POLİMER A.Ş. 承诺把社会与环境可持续性纳入全部生产过程。", paragraphs: ["为了更好的世界，OMA POLİMER A.Ş. 承诺把社会与环境可持续性纳入全部生产过程。", "可持续性是在维持生产与多样性的同时，使人类生活得以延续。满足我们的需要，而不拿走后代的需要。", "对我们来说，可持续性不是口号。它意味着高效使用资源，并据此开发产品。太阳能、再生纱线和更少用水的染色，是这一方式的具体部分。"], worldAlt: "森林覆盖的地球图像", whyBefore: "为什么", whyAccent: "可持续性重要", why: ["工业革命带来的能源需求，导致石油和煤炭等不可再生资源被大量使用。快速工业化和城市化加剧了空气、水和土壤污染，并加深了生物多样性丧失、土壤流失和荒漠化。", "每个生物都是与其他生命和非生命相互影响的生态系统的一部分。一个部分受损，其他部分也会看到结果。因此必须在不超过自然恢复速度、不破坏平衡的前提下行动。"], principles: [{ title: "合理地使用资源", text: "我们把效率作为生产原则，因为环境资源会耗尽。生态系统的完整与韧性受到保护。" }, { title: "经济增长与环境平衡", text: "我们追求在不伤害环境的前提下提高福祉的增长。产品与服务增加时，人的福祉也随之提高。" }, { title: "公司利益与公共利益一致", text: "社会与环境议题是管理方式的一部分，不只是经济增长。公司利益不与公共利益冲突。" }], yarnKicker: "更清洁的技术", yarnTitle: "可持续纱线", yarnLead: "为了更好的世界，把社会与环境可持续性纳入全部生产过程。", yarns: [{ subtitle: "UNIFI 合作", text: "由再生来源开发的纱线方案。2023 年我们的过程以 GRS 证书得到证明。" }, { subtitle: "生物基聚酰胺纱线", text: "旨在减少化石原料的生物基聚酰胺纱线，在不放弃性能的同时降低环境影响。" }, { subtitle: "无水染色", text: "着眼于减少用水的创新无水染色。资源节约从生产线内部开始。" }], certs: "证书", gesKicker: "太阳能系统", gesTitle: "我们为未来增加价值，并从太阳取得生产能源", gesP: ["我们的责任不只是满足今天需要的优质生产，也包括留下更清洁的世界。基于这一愿景，我们为工厂屋顶配备了太阳能系统（GES）。", "如今工厂里的每一次生产背后，都有太阳的清洁能源。"], gesItems: [{ title: "100% 清洁能源目标", text: "生产线所用电力的很大一部分，直接来自屋顶上的高效太阳能板。" }, { title: "更小的碳足迹", text: "通过降低对化石燃料的依赖，我们每年追求相当于数千棵树所提供氧气的碳节约。" }, { title: "更绿色工业的引领", text: "我们希望引领行业的可持续能源转型，把更宜居的世界留给下一代。" }], gesLink: "查看 GES 页面", plantKicker: "OmaFil 生产工厂", plantText: "我们以可再生能源投资支持生产质量。", plantAlt: "覆盖太阳能板的 OmaFil 工厂" },
  careers: { title: "招聘", description: "工厂是生产的中心。人员也以同样的认真程度管理。", paragraphs: ["从招聘到日常工作，机会平等、安全环境和成长是基础。部门之间的协作和厂内安全作业，是政策真正执行的一面。", "如有空缺或一般申请，可以把简历以 PDF 发送。"] },
  ges: { ...en.ges, kicker: "太阳能系统", title: "我们的太阳能系统", subtitle: "我们以埃拉泽的地面电站和埃尔巴的屋顶电站，用太阳能供给生产", paragraphs: ["OmaFil 不只生产优质纱线。我们也从可再生来源取得能源。组合中有埃拉泽科万吉拉尔的两座地面电站（OMA 1 Hacısam、OMA 2 Kavak），以及托卡特埃尔巴工厂的两座屋顶电站。", "总装机容量 6.76 MWp。地面与屋顶合计的日发电处于数十兆瓦时区间；我们降低碳足迹，为更绿色的工业出力。"], total: "合计", panels: "块组件", imageAlt: "OmaFil 埃尔巴屋顶 GES — Oma Polimer 工厂", pillars: [{ title: "地面 + 屋顶 GES", text: "埃拉泽地面电站 5.2 MWp；埃尔巴厂房屋顶 1.56 MWp。两个地区，同一个可持续目标。" }, { title: "更小的碳足迹", text: "我们发出的每一千瓦时都减少化石排放。计量表依据应用和电站数据。" }, { title: "更绿色工业的例子", text: "通过自己发电，我们希望成为纺织生产中清洁能源转型的例子。" }], respectTitle: "尊重自然的生产", respectText: "我们把技术与创新投资放在工作中心，同时不放下环境责任。地面与屋顶 GES 投资降低碳排放，并支持生态平衡。", capacityTitle: "我们用绿色能源生产", capacity: ({ total, elazig, erbaa, min, max }) => `以 ${total} MWp 装机（埃拉泽地面 ${elazig} MWp + 埃尔巴屋顶 ${erbaa} MWp），我们约有 ${min}–${max} GWh 的年发电能力。`, metrics: ["已发电的太阳能（kWh）", "避免的碳排放（吨）", "相当于的树木数量"], metricAlts: ["埃拉泽 Hacısam GES — OMA 1", "埃拉泽 Kavak GES — OMA 2", "埃尔巴屋顶 GES — Oma Polimer 工厂"], daily: "日发电", roofStatus: "临时验收 / 运行", fieldStatus: "投产", photo: "照片", galleryTitle: "图库", galleryLead: "Hacısam、Kavak 与埃尔巴屋顶电站的照片。", ctaTitle: "我们的可持续生产方式", ctaText: "GES 投资是再生纱线与负责任生产的一部分。", sustainCta: "可持续发展", contactCta: "联系我们" },
  products: {
    "n6-acy": "空气包覆 PA6 + 氨纶。本白 / 黑色 / 彩色。",
    "n6-scy": "单包 PA6 + 氨纶。",
    "n6-dcy": "双包 PA6 + 氨纶。",
    "n6-poy": "PA6。SD / BR / FD 选项。",
    "n6-fdy": "全拉伸 PA6。较宽的 denier / 长丝范围。",
    "n6-dty": "变形 PA6。本白、黑色和彩色。",
    "n66-acy": "空气包覆 PA66 + 氨纶。定制生产。",
    "n66-scy": "单包 PA66 + 氨纶，含 flat 选项。",
    "n66-dcy": "双包 PA66 + 氨纶。定制生产。",
    "n66-poy": "PA66 POY，用于最终 DTY。Softel / Nicolite。",
    "n66-fdy": "全拉伸 PA66。",
    "n66-dty": "变形 PA66。无缝、袜类和织造。",
    "pes-acy": "涤纶空气包覆 + 氨纶。",
    "pes-scy": "涤纶单包 + 氨纶。定制选项。",
    "pes-dcy": "涤纶双包 + 氨纶。",
  },
  marquee: {
    "PES DCY Gipe": "双包涤纶 gipe 纱。",
    "Naylon 6 POY": "Naylon 6 POY 纱。",
    "N6 FDY": "全拉伸 Naylon 6 纱。",
    "DTY N6": "变形 Naylon 6 纱。",
    "DTY N66": "变形 Naylon 66 纱。",
    "ACY N6": "空气包覆 Naylon 6 纱。",
    "ACY N66": "空气包覆 Naylon 66 纱。",
    "SCY N6 Gipe": "单包 Naylon 6 gipe 纱。",
    "SCY N66 Gipe": "单包 Naylon 66 gipe 纱。",
    "PES SCY Gipe": "单包涤纶 gipe 纱。",
    "PES ACY": "空气包覆涤纶纱。",
  },
});

// Kısa GES etiketleri. Sayfa gövdesi yukarıda; bunlar kart ve galeri chrome’u.
Object.assign(de.ges, {
  capacityLabel: "Installierte Leistung",
  panelLabel: "Module",
  close: "Schließen",
  prev: "Vorheriges Foto",
  next: "Nächstes Foto",
  sitesTitle: "Unsere Anlagen",
  sitesLead:
    "Zwei Feldanlagen in Elazığ Kovancılar und zwei Dachanlagen im Werk Tokat Erbaa. Installierte Gesamtleistung 6,76 MWp.",
  fieldHeading: "Elazığ — Feld-GES",
  roofHeading: "Erbaa — Dach-GES",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `Oma Polimer Dach-GES gesamt ${mwp} MWp (${kw} kW). Tagesdurchschnitt ${min}–${max} kWh. Zwei getrennte Systeme auf demselben Dach: GES 1 und GES 2.`,
});
Object.assign(fr.ges, {
  capacityLabel: "Puissance installée",
  panelLabel: "Panneaux",
  close: "Fermer",
  prev: "Photo précédente",
  next: "Photo suivante",
  sitesTitle: "Nos sites",
  sitesLead:
    "Deux centrales au sol à Elazığ Kovancılar et deux centrales en toiture à l’usine de Tokat Erbaa. Puissance installée totale : 6,76 MWp.",
  fieldHeading: "Elazığ — GES au sol",
  roofHeading: "Erbaa — GES en toiture",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `GES en toiture Oma Polimer : ${mwp} MWp au total (${kw} kW). Moyenne journalière ${min}–${max} kWh. Deux systèmes distincts sur le même toit : GES 1 et GES 2.`,
});
Object.assign(es.ges, {
  capacityLabel: "Potencia instalada",
  panelLabel: "Paneles",
  close: "Cerrar",
  prev: "Foto anterior",
  next: "Foto siguiente",
  sitesTitle: "Nuestras plantas",
  sitesLead:
    "Dos plantas de campo en Elazığ Kovancılar y dos de cubierta en la fábrica de Tokat Erbaa. Potencia instalada total: 6,76 MWp.",
  fieldHeading: "Elazığ — GES de campo",
  roofHeading: "Erbaa — GES de cubierta",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `GES de cubierta Oma Polimer: ${mwp} MWp en total (${kw} kW). Media diaria ${min}–${max} kWh. Dos sistemas distintos en el mismo techo: GES 1 y GES 2.`,
});
Object.assign(it.ges, {
  capacityLabel: "Potenza installata",
  panelLabel: "Pannelli",
  close: "Chiudi",
  prev: "Foto precedente",
  next: "Foto successiva",
  sitesTitle: "I nostri impianti",
  sitesLead:
    "Due impianti a terra a Elazığ Kovancılar e due sul tetto nella fabbrica di Tokat Erbaa. Potenza installata totale: 6,76 MWp.",
  fieldHeading: "Elazığ — GES a terra",
  roofHeading: "Erbaa — GES sul tetto",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `GES sul tetto Oma Polimer: ${mwp} MWp in totale (${kw} kW). Media giornaliera ${min}–${max} kWh. Due sistemi distinti sullo stesso tetto: GES 1 e GES 2.`,
});
Object.assign(pt.ges, {
  capacityLabel: "Potência instalada",
  panelLabel: "Painéis",
  close: "Fechar",
  prev: "Foto anterior",
  next: "Foto seguinte",
  sitesTitle: "As nossas centrais",
  sitesLead:
    "Duas centrais de campo em Elazığ Kovancılar e duas de cobertura na fábrica de Tokat Erbaa. Potência instalada total: 6,76 MWp.",
  fieldHeading: "Elazığ — GES de campo",
  roofHeading: "Erbaa — GES de cobertura",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `GES de cobertura Oma Polimer: ${mwp} MWp no total (${kw} kW). Média diária ${min}–${max} kWh. Dois sistemas distintos no mesmo telhado: GES 1 e GES 2.`,
});
Object.assign(nl.ges, {
  capacityLabel: "Geïnstalleerd vermogen",
  panelLabel: "Panelen",
  close: "Sluiten",
  prev: "Vorige foto",
  next: "Volgende foto",
  sitesTitle: "Onze installaties",
  sitesLead:
    "Twee veldcentrales in Elazığ Kovancılar en twee dakcentrales in de fabriek in Tokat Erbaa. Totaal geïnstalleerd vermogen 6,76 MWp.",
  fieldHeading: "Elazığ — veld-GES",
  roofHeading: "Erbaa — dak-GES",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `Oma Polimer dak-GES totaal ${mwp} MWp (${kw} kW). Daggemiddelde ${min}–${max} kWh. Twee aparte systemen op hetzelfde dak: GES 1 en GES 2.`,
});
Object.assign(ru.ges, {
  capacityLabel: "Установленная мощность",
  panelLabel: "Панели",
  close: "Закрыть",
  prev: "Предыдущее фото",
  next: "Следующее фото",
  sitesTitle: "Наши станции",
  sitesLead:
    "Две полевые станции в Элязыг Кованджилар и две крышные на заводе Токат Эрбаа. Общая установленная мощность 6,76 MWp.",
  fieldHeading: "Элязыг — полевая GES",
  roofHeading: "Эрбаа — крышная GES",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `Крышная GES Oma Polimer всего ${mwp} MWp (${kw} kW). Среднесуточно ${min}–${max} kWh. Две отдельные системы на одной крыше: GES 1 и GES 2.`,
});
Object.assign(ar.ges, {
  capacityLabel: "القدرة المركبة",
  panelLabel: "الألواح",
  close: "إغلاق",
  prev: "الصورة السابقة",
  next: "الصورة التالية",
  sitesTitle: "محطاتنا",
  sitesLead:
    "محطتان حقليتان في إلازيغ كوفانجيلار ومحطتان على سطح مصنع توكات إربا. إجمالي القدرة المركبة 6.76 MWp.",
  fieldHeading: "إلازيغ — GES حقلية",
  roofHeading: "إربا — GES سطحية",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `GES سطح Oma Polimer إجمالي ${mwp} MWp (${kw} kW). المتوسط اليومي ${min}–${max} kWh. نظامان منفصلان على السطح نفسه: GES 1 وGES 2.`,
});
Object.assign(es.products, {
  "n6-acy": "PA6 recubierto por aire + elastano. Ecru / negro / color.",
  "n6-scy": "PA6 de cubierta simple + elastano.",
  "n6-dcy": "PA6 de doble cubierta + elastano.",
  "n6-poy": "PA6. Opciones SD / BR / FD.",
  "n6-fdy": "PA6 totalmente estirado. Amplio rango denier / filamento.",
  "n6-dty": "PA6 texturizado. Ecru, negro y color.",
  "n66-acy": "PA66 recubierto por aire + elastano. Producción custom.",
  "n66-scy": "PA66 de cubierta simple + elastano, opciones flat incluidas.",
  "n66-dcy": "PA66 de doble cubierta + elastano. Producción custom.",
  "n66-poy": "PA66 POY para DTY finales. Softel / Nicolite.",
  "n66-fdy": "PA66 totalmente estirado.",
  "n66-dty": "PA66 texturizado. Seamless, calcetería y tisaje.",
  "pes-acy": "Poliéster recubierto por aire + elastano.",
  "pes-scy": "Poliéster de cubierta simple + elastano. Opciones custom.",
  "pes-dcy": "Poliéster de doble cubierta + elastano.",
});
Object.assign(es.marquee, {
  "PES DCY Gipe": "Hilo gipe de poliéster de doble cubierta.",
  "Naylon 6 POY": "Hilo Naylon 6 POY.",
  "N6 FDY": "Hilo Naylon 6 totalmente estirado.",
  "DTY N6": "Hilo Naylon 6 texturizado.",
  "DTY N66": "Hilo Naylon 66 texturizado.",
  "ACY N6": "Hilo Naylon 6 recubierto por aire.",
  "ACY N66": "Hilo Naylon 66 recubierto por aire.",
  "SCY N6 Gipe": "Hilo gipe Naylon 6 de cubierta simple.",
  "SCY N66 Gipe": "Hilo gipe Naylon 66 de cubierta simple.",
  "PES SCY Gipe": "Hilo gipe de poliéster de cubierta simple.",
  "PES ACY": "Hilo de poliéster recubierto por aire.",
});
Object.assign(it.products, {
  "n6-acy": "PA6 ricoperto ad aria + elastan. Ecru / nero / colorato.",
  "n6-scy": "PA6 a copertura singola + elastan.",
  "n6-dcy": "PA6 a doppia copertura + elastan.",
  "n6-poy": "PA6. Opzioni SD / BR / FD.",
  "n6-fdy": "PA6 completamente stirato. Ampio intervallo denier / filamento.",
  "n6-dty": "PA6 testurizzato. Ecru, nero e colorato.",
  "n66-acy": "PA66 ricoperto ad aria + elastan. Produzione custom.",
  "n66-scy": "PA66 a copertura singola + elastan, opzioni flat incluse.",
  "n66-dcy": "PA66 a doppia copertura + elastan. Produzione custom.",
  "n66-poy": "PA66 POY per DTY finali. Softel / Nicolite.",
  "n66-fdy": "PA66 completamente stirato.",
  "n66-dty": "PA66 testurizzato. Seamless, calzetteria e tessitura.",
  "pes-acy": "Poliestere ricoperto ad aria + elastan.",
  "pes-scy": "Poliestere a copertura singola + elastan. Opzioni custom.",
  "pes-dcy": "Poliestere a doppia copertura + elastan.",
});
Object.assign(it.marquee, {
  "PES DCY Gipe": "Filato gipe poliestere a doppia copertura.",
  "Naylon 6 POY": "Filato Naylon 6 POY.",
  "N6 FDY": "Filato Naylon 6 completamente stirato.",
  "DTY N6": "Filato Naylon 6 testurizzato.",
  "DTY N66": "Filato Naylon 66 testurizzato.",
  "ACY N6": "Filato Naylon 6 ricoperto ad aria.",
  "ACY N66": "Filato Naylon 66 ricoperto ad aria.",
  "SCY N6 Gipe": "Filato gipe Naylon 6 a copertura singola.",
  "SCY N66 Gipe": "Filato gipe Naylon 66 a copertura singola.",
  "PES SCY Gipe": "Filato gipe poliestere a copertura singola.",
  "PES ACY": "Filato poliestere ricoperto ad aria.",
});
Object.assign(pt.products, {
  "n6-acy": "PA6 revestido a ar + elastano. Ecru / preto / cor.",
  "n6-scy": "PA6 de cobertura simples + elastano.",
  "n6-dcy": "PA6 de cobertura dupla + elastano.",
  "n6-poy": "PA6. Opções SD / BR / FD.",
  "n6-fdy": "PA6 totalmente estirado. Vasta gama denier / filamento.",
  "n6-dty": "PA6 texturizado. Ecru, preto e cor.",
  "n66-acy": "PA66 revestido a ar + elastano. Produção custom.",
  "n66-scy": "PA66 de cobertura simples + elastano, opções flat incluídas.",
  "n66-dcy": "PA66 de cobertura dupla + elastano. Produção custom.",
  "n66-poy": "PA66 POY para DTY finais. Softel / Nicolite.",
  "n66-fdy": "PA66 totalmente estirado.",
  "n66-dty": "PA66 texturizado. Seamless, meias e tecelagem.",
  "pes-acy": "Poliéster revestido a ar + elastano.",
  "pes-scy": "Poliéster de cobertura simples + elastano. Opções custom.",
  "pes-dcy": "Poliéster de cobertura dupla + elastano.",
});
Object.assign(pt.marquee, {
  "PES DCY Gipe": "Fio gipe de poliéster de cobertura dupla.",
  "Naylon 6 POY": "Fio Naylon 6 POY.",
  "N6 FDY": "Fio Naylon 6 totalmente estirado.",
  "DTY N6": "Fio Naylon 6 texturizado.",
  "DTY N66": "Fio Naylon 66 texturizado.",
  "ACY N6": "Fio Naylon 6 revestido a ar.",
  "ACY N66": "Fio Naylon 66 revestido a ar.",
  "SCY N6 Gipe": "Fio gipe Naylon 6 de cobertura simples.",
  "SCY N66 Gipe": "Fio gipe Naylon 66 de cobertura simples.",
  "PES SCY Gipe": "Fio gipe de poliéster de cobertura simples.",
  "PES ACY": "Fio de poliéster revestido a ar.",
});
Object.assign(nl.products, {
  "n6-acy": "Luchtomhuld PA6 + elastaan. Ecru / zwart / gekleurd.",
  "n6-scy": "Enkel omhuld PA6 + elastaan.",
  "n6-dcy": "Dubbel omhuld PA6 + elastaan.",
  "n6-poy": "PA6. SD / BR / FD opties.",
  "n6-fdy": "Volledig verstrekt PA6. Breed denier- / filamentbereik.",
  "n6-dty": "Getextureerd PA6. Ecru, zwart en gekleurd.",
  "n66-acy": "Luchtomhuld PA66 + elastaan. Custom productie.",
  "n66-scy": "Enkel omhuld PA66 + elastaan, inclusief flat.",
  "n66-dcy": "Dubbel omhuld PA66 + elastaan. Custom productie.",
  "n66-poy": "PA66 POY voor finale DTY. Softel / Nicolite.",
  "n66-fdy": "Volledig verstrekt PA66.",
  "n66-dty": "Getextureerd PA66. Seamless, kousen en weven.",
  "pes-acy": "Polyester luchtomhuld + elastaan.",
  "pes-scy": "Polyester enkel omhuld + elastaan. Custom opties.",
  "pes-dcy": "Polyester dubbel omhuld + elastaan.",
});
Object.assign(nl.marquee, {
  "PES DCY Gipe": "Dubbel omhuld polyester gipe-garen.",
  "Naylon 6 POY": "Naylon 6 POY-garen.",
  "N6 FDY": "Volledig verstrekt Naylon 6-garen.",
  "DTY N6": "Getextureerd Naylon 6-garen.",
  "DTY N66": "Getextureerd Naylon 66-garen.",
  "ACY N6": "Luchtomhuld Naylon 6-garen.",
  "ACY N66": "Luchtomhuld Naylon 66-garen.",
  "SCY N6 Gipe": "Enkel omhuld Naylon 6 gipe-garen.",
  "SCY N66 Gipe": "Enkel omhuld Naylon 66 gipe-garen.",
  "PES SCY Gipe": "Enkel omhuld polyester gipe-garen.",
  "PES ACY": "Luchtomhuld polyestergaren.",
});
Object.assign(ru.products, {
  "n6-acy": "PA6 воздушного покрытия + эластан. Ecru / черный / цветной.",
  "n6-scy": "PA6 одинарного покрытия + эластан.",
  "n6-dcy": "PA6 двойного покрытия + эластан.",
  "n6-poy": "PA6. Варианты SD / BR / FD.",
  "n6-fdy": "Полностью вытянутый PA6. Широкий диапазон denier / филамент.",
  "n6-dty": "Текстурированный PA6. Ecru, черный и цветной.",
  "n66-acy": "PA66 воздушного покрытия + эластан. Custom.",
  "n66-scy": "PA66 одинарного покрытия + эластан, включая flat.",
  "n66-dcy": "PA66 двойного покрытия + эластан. Custom.",
  "n66-poy": "PA66 POY для финальных DTY. Softel / Nicolite.",
  "n66-fdy": "Полностью вытянутый PA66.",
  "n66-dty": "Текстурированный PA66. Seamless, чулочные и ткачество.",
  "pes-acy": "Полиэстер воздушного покрытия + эластан.",
  "pes-scy": "Полиэстер одинарного покрытия + эластан. Custom.",
  "pes-dcy": "Полиэстер двойного покрытия + эластан.",
});
Object.assign(ru.marquee, {
  "PES DCY Gipe": "Двойное покрытие, полиэстер gipe.",
  "Naylon 6 POY": "Пряжа Naylon 6 POY.",
  "N6 FDY": "Полностью вытянутая пряжа Naylon 6.",
  "DTY N6": "Текстурированная пряжа Naylon 6.",
  "DTY N66": "Текстурированная пряжа Naylon 66.",
  "ACY N6": "Воздушное покрытие Naylon 6.",
  "ACY N66": "Воздушное покрытие Naylon 66.",
  "SCY N6 Gipe": "Одинарное покрытие Naylon 6 gipe.",
  "SCY N66 Gipe": "Одинарное покрытие Naylon 66 gipe.",
  "PES SCY Gipe": "Одинарное покрытие, полиэстер gipe.",
  "PES ACY": "Полиэстер воздушного покрытия.",
});
Object.assign(ar.products, {
  "n6-acy": "PA6 تغطية هوائية + إيلاستان. Ecru / أسود / ملوّن.",
  "n6-scy": "PA6 تغطية مفردة + إيلاستان.",
  "n6-dcy": "PA6 تغطية مزدوجة + إيلاستان.",
  "n6-poy": "PA6. خيارات SD / BR / FD.",
  "n6-fdy": "PA6 مسحوب بالكامل. مدى واسع denier / خيوط.",
  "n6-dty": "PA6 محكم. Ecru وأسود وملوّن.",
  "n66-acy": "PA66 تغطية هوائية + إيلاستان. إنتاج custom.",
  "n66-scy": "PA66 تغطية مفردة + إيلاستان، مع خيارات flat.",
  "n66-dcy": "PA66 تغطية مزدوجة + إيلاستان. إنتاج custom.",
  "n66-poy": "PA66 POY لـ DTY النهائي. Softel / Nicolite.",
  "n66-fdy": "PA66 مسحوب بالكامل.",
  "n66-dty": "PA66 محكم. Seamless وجوارب ونسيج.",
  "pes-acy": "بوليستر تغطية هوائية + إيلاستان.",
  "pes-scy": "بوليستر تغطية مفردة + إيلاستان. خيارات custom.",
  "pes-dcy": "بوليستر تغطية مزدوجة + إيلاستان.",
});
Object.assign(ar.marquee, {
  "PES DCY Gipe": "خيط gipe بوليستر بتغطية مزدوجة.",
  "Naylon 6 POY": "خيط Naylon 6 POY.",
  "N6 FDY": "خيط Naylon 6 مسحوب بالكامل.",
  "DTY N6": "خيط Naylon 6 محكم.",
  "DTY N66": "خيط Naylon 66 محكم.",
  "ACY N6": "خيط Naylon 6 بتغطية هوائية.",
  "ACY N66": "خيط Naylon 66 بتغطية هوائية.",
  "SCY N6 Gipe": "خيط gipe Naylon 6 بتغطية مفردة.",
  "SCY N66 Gipe": "خيط gipe Naylon 66 بتغطية مفردة.",
  "PES SCY Gipe": "خيط gipe بوليستر بتغطية مفردة.",
  "PES ACY": "خيط بوليستر بتغطية هوائية.",
});

Object.assign(zh.ges, {
  capacityLabel: "装机容量",
  panelLabel: "组件",
  close: "关闭",
  prev: "上一张",
  next: "下一张",
  sitesTitle: "我们的电站",
  sitesLead:
    "埃拉泽科万吉拉尔两座地面电站，托卡特埃尔巴工厂两座屋顶电站。总装机 6.76 MWp。",
  fieldHeading: "埃拉泽 — 地面 GES",
  roofHeading: "埃尔巴 — 屋顶 GES",
  roofLead: ({ mwp, kw, min, max }: { mwp: string; kw: string; min: string; max: string }) =>
    `Oma Polimer 屋顶 GES 合计 ${mwp} MWp（${kw} kW）。日均 ${min}–${max} kWh。同一屋顶上两套系统：GES 1 与 GES 2。`,
});

const byLocale: Partial<Record<Locale, Inner>> = {
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

/** tr → null, sayfa kendi Türkçe metnini kullanır. */
export function getInner(locale: Locale): Inner | null {
  if (locale === "tr") return null;
  return byLocale[locale] ?? en;
}
