import type { Locale } from "@/i18n/locales";

/**
 * Kısa arayüz cümleleri. Sözlükteki ana bloklara sonradan eklendi.
 * Ürün adı, tablo başlığı ve yasal metin burada yok.
 */
export type Chrome = {
  introAlt: string;
  sustainAlt: string;
  formSelect: string;
  kvkk: string;
  kvkkConsent: string;
  sentNote: string;
  familyAria: string;
  backProducts: string;
  noPhoto: string;
  recycled: string;
  featured: string;
  quoteSample: string;
  specsTitle: string;
  specsLead: string;
  specsEmpty: string;
  customNote: string;
  blogBack: string;
  view: string;
  scrollPrev: string;
  scrollNext: string;
  themeLight: string;
  themeDark: string;
  themeAuto: string;
  aboutSummary: string;
  factorySummary: string;
  sustainSummary: string;
  careersSummary: string;
  position: string;
  positionPh: string;
  coverNote: string;
  coverNotePh: string;
  cv: string;
  cvHint: string;
  cvSelected: string;
  cvRequired: string;
  cvPdfOnly: string;
  cvTooBig: string;
  careersKvkk: string;
  careersSent: string;
  careersSend: string;
  applyTitle: string;
  applyLead: string;
  principles: [string, string, string, string];
};

const tr: Chrome = {
  introAlt: "OmaFil üretim tesisi",
  sustainAlt: "Güneş panelleriyle kaplı OmaFil üretim tesisi",
  formSelect: "Seçiniz",
  kvkk: "KVKK Aydınlatma Metni",
  kvkkConsent:
    "’ni okudum ve kişisel verilerimin iletişim talebim kapsamında işlenmesini kabul ediyorum.",
  sentNote:
    "Gönder’e basınca mesajınız doğrudan OmaFil’e iletilir; ayrıca size kısa bir onay e-postası gider.",
  familyAria: "Ürün ailesi",
  backProducts: "Ürünlere dön",
  noPhoto: "Üretim görseli eklenecek — placeholder değil, henüz fotoğraf yok.",
  recycled: "Recycled seçenek",
  featured: "Portföy öne çıkan",
  quoteSample: "Teklif / numune al",
  specsTitle: "Teknik spesifikasyonlar",
  specsLead: "Katalog satırları. Detay veya özel denier için iletişime geçin.",
  specsEmpty:
    "Bu hat için satır listesi yakında eklenecek. Custom üretim için teklif alın.",
  customNote: "Bu grupta custom üretim seçenekleri mevcuttur.",
  blogBack: "Yazılara dön",
  view: "İncele",
  scrollPrev: "Geriye kaydır",
  scrollNext: "İleriye kaydır",
  themeLight: "Açık tema (tıkla: koyu)",
  themeDark: "Koyu tema (tıkla: gündoğumu)",
  themeAuto: "Gündoğumu–günbatımı (enlem ve saat optimizasyonlu)",
  aboutSummary: "Kuruluş hikâyesi ve şirket yapısı.",
  factorySummary: "Tokat–Erbaa gipe iplik üretim tesisi.",
  sustainSummary: "Enerji, geri dönüşüm ve sorumlu üretim.",
  careersSummary: "Çalışma anlayışı ve başvuru.",
  position: "Pozisyon",
  positionPh: "Örn. Üretim operatörü",
  coverNote: "Ön yazı / not",
  coverNotePh: "Kısa bir not ekleyebilirsiniz…",
  cv: "CV (PDF)",
  cvHint: "En fazla 4 MB, yalnızca PDF.",
  cvSelected: "Seçilen:",
  cvRequired: "CV PDF yükleyin",
  cvPdfOnly: "Yalnızca PDF kabul edilir",
  cvTooBig: "Dosya en fazla 4 MB olabilir",
  careersKvkk:
    "’ni okudum; CV ve kişisel verilerimin işe alım sürecinde işlenmesini kabul ediyorum.",
  careersSent: "Başvurunuz alındı. En kısa sürede değerlendireceğiz.",
  careersSend: "Başvuruyu Gönder",
  applyTitle: "Başvuru",
  applyLead:
    "Formu doldurun, CV’nizi PDF yükleyin. Başvurunuz doğrudan İK ekibine iletilir; size kısa bir onay e-postası gider.",
  principles: [
    "Adil ve şeffaf işe alım",
    "İş sağlığı ve güvenliği",
    "Eğitim ve kariyer gelişimi",
    "Eşitlik ve etik çalışma",
  ],
};

const en: Chrome = {
  introAlt: "OmaFil production plant",
  sustainAlt: "OmaFil production plant with rooftop solar panels",
  formSelect: "Select",
  kvkk: "KVKK privacy notice",
  kvkkConsent:
    " I have read it and accept that my personal data will be processed for this contact request.",
  sentNote:
    "When you send, your message goes straight to OmaFil and you also receive a short confirmation email.",
  familyAria: "Product family",
  backProducts: "Back to products",
  noPhoto: "A production photo will be added. There is no photo yet.",
  recycled: "Recycled option",
  featured: "Featured",
  quoteSample: "Request a quote / sample",
  specsTitle: "Technical specifications",
  specsLead: "Catalogue rows. Contact us for details or a special denier.",
  specsEmpty:
    "The row list for this line will be added soon. Request a quote for custom production.",
  customNote: "Custom production options are available in this group.",
  blogBack: "Back to articles",
  view: "View",
  scrollPrev: "Scroll back",
  scrollNext: "Scroll forward",
  themeLight: "Light theme (click: dark)",
  themeDark: "Dark theme (click: sunrise)",
  themeAuto: "Sunrise to sunset (latitude and time optimized)",
  aboutSummary: "Founding story and company structure.",
  factorySummary: "Gipe yarn plant in Tokat–Erbaa.",
  sustainSummary: "Energy, recycling and responsible production.",
  careersSummary: "How we work, and how to apply.",
  position: "Position",
  positionPh: "e.g. Production operator",
  coverNote: "Cover note",
  coverNotePh: "You can add a short note…",
  cv: "CV (PDF)",
  cvHint: "Up to 4 MB, PDF only.",
  cvSelected: "Selected:",
  cvRequired: "Upload a PDF CV",
  cvPdfOnly: "Only PDF is accepted",
  cvTooBig: "The file can be at most 4 MB",
  careersKvkk:
    " I have read it and accept that my CV and personal data will be processed for recruitment.",
  careersSent: "We received your application and will review it shortly.",
  careersSend: "Send application",
  applyTitle: "Application",
  applyLead:
    "Fill in the form and upload your CV as a PDF. It goes straight to the HR team, and you receive a short confirmation email.",
  principles: [
    "Fair and transparent hiring",
    "Occupational health and safety",
    "Training and career development",
    "Equality and ethical work",
  ],
};

const de: Chrome = {
  ...en,
  introAlt: "OmaFil Produktionswerk",
  sustainAlt: "OmaFil Werk mit Dach-Solaranlage",
  formSelect: "Bitte wählen",
  kvkk: "KVKK-Hinweis",
  kvkkConsent:
    " Ich habe ihn gelesen und akzeptiere, dass meine Daten für diese Anfrage verarbeitet werden.",
  sentNote:
    "Mit dem Senden geht Ihre Nachricht direkt an OmaFil. Sie erhalten außerdem eine kurze Bestätigung per E-Mail.",
  familyAria: "Produktfamilie",
  backProducts: "Zurück zu den Produkten",
  noPhoto: "Ein Produktionsfoto folgt. Es gibt noch kein Foto.",
  recycled: "Recycled-Option",
  featured: "Hervorgehoben",
  quoteSample: "Angebot / Muster anfragen",
  specsTitle: "Technische Spezifikationen",
  specsLead: "Katalogzeilen. Für Details oder einen besonderen Denier schreiben Sie uns.",
  specsEmpty:
    "Die Zeilenliste dieser Linie folgt in Kürze. Für Custom-Produktion ein Angebot anfragen.",
  customNote: "In dieser Gruppe gibt es Custom-Produktionsoptionen.",
  blogBack: "Zurück zu den Beiträgen",
  view: "Ansehen",
  scrollPrev: "Zurück",
  scrollNext: "Weiter",
  themeLight: "Helles Thema (Klick: dunkel)",
  themeDark: "Dunkles Thema (Klick: Sonnenaufgang)",
  themeAuto: "Sonnenaufgang bis Sonnenuntergang (nach Breite und Uhrzeit)",
  aboutSummary: "Gründungsgeschichte und Unternehmensstruktur.",
  factorySummary: "Gipe-Garnwerk in Tokat–Erbaa.",
  sustainSummary: "Energie, Recycling und verantwortungsvolle Produktion.",
  careersSummary: "Arbeitsweise und Bewerbung.",
  position: "Position",
  positionPh: "z. B. Produktionsmitarbeiter",
  coverNote: "Anschreiben / Notiz",
  coverNotePh: "Sie können eine kurze Notiz hinzufügen…",
  cv: "Lebenslauf (PDF)",
  cvHint: "Höchstens 4 MB, nur PDF.",
  cvSelected: "Ausgewählt:",
  cvRequired: "Bitte einen PDF-Lebenslauf hochladen",
  cvPdfOnly: "Nur PDF wird akzeptiert",
  cvTooBig: "Die Datei darf höchstens 4 MB haben",
  careersKvkk:
    " Ich habe ihn gelesen und akzeptiere, dass Lebenslauf und Daten im Bewerbungsprozess verarbeitet werden.",
  careersSent: "Bewerbung erhalten. Wir prüfen sie in Kürze.",
  careersSend: "Bewerbung senden",
  applyTitle: "Bewerbung",
  applyLead:
    "Füllen Sie das Formular aus und laden Sie den Lebenslauf als PDF hoch. Er geht direkt an die Personalabteilung; Sie erhalten eine kurze Bestätigung.",
  principles: [
    "Faire und transparente Einstellung",
    "Arbeitsschutz",
    "Schulung und Entwicklung",
    "Gleichheit und ethisches Arbeiten",
  ],
};

const fr: Chrome = {
  ...en,
  introAlt: "Usine de production OmaFil",
  sustainAlt: "Usine OmaFil avec panneaux solaires en toiture",
  formSelect: "Choisir",
  kvkk: "Notice KVKK",
  kvkkConsent:
    " Je l’ai lue et j’accepte que mes données soient traitées pour cette demande de contact.",
  sentNote:
    "En envoyant, votre message arrive directement chez OmaFil et vous recevez aussi un court e-mail de confirmation.",
  familyAria: "Famille de produits",
  backProducts: "Retour aux produits",
  noPhoto: "Une photo de production sera ajoutée. Il n’y a pas encore de photo.",
  recycled: "Option Recycled",
  featured: "En avant",
  quoteSample: "Demander un devis / un échantillon",
  specsTitle: "Spécifications techniques",
  specsLead: "Lignes du catalogue. Contactez-nous pour un détail ou un denier particulier.",
  specsEmpty:
    "La liste de cette ligne sera ajoutée bientôt. Demandez un devis pour une production custom.",
  customNote: "Des options de production custom existent dans ce groupe.",
  blogBack: "Retour aux articles",
  view: "Voir",
  scrollPrev: "Défiler en arrière",
  scrollNext: "Défiler en avant",
  themeLight: "Thème clair (clic : sombre)",
  themeDark: "Thème sombre (clic : lever du soleil)",
  themeAuto: "Du lever au coucher du soleil (selon latitude et heure)",
  aboutSummary: "Histoire de la fondation et structure de l’entreprise.",
  factorySummary: "Usine de fil gipe à Tokat–Erbaa.",
  sustainSummary: "Énergie, recyclage et production responsable.",
  careersSummary: "Façon de travailler et candidature.",
  position: "Poste",
  positionPh: "ex. Opérateur de production",
  coverNote: "Lettre / note",
  coverNotePh: "Vous pouvez ajouter une courte note…",
  cv: "CV (PDF)",
  cvHint: "4 Mo maximum, PDF uniquement.",
  cvSelected: "Sélectionné :",
  cvRequired: "Téléversez un CV PDF",
  cvPdfOnly: "Seul le PDF est accepté",
  cvTooBig: "Le fichier ne peut pas dépasser 4 Mo",
  careersKvkk:
    " Je l’ai lue et j’accepte que mon CV et mes données soient traités pour le recrutement.",
  careersSent: "Candidature reçue. Nous l’examinerons rapidement.",
  careersSend: "Envoyer la candidature",
  applyTitle: "Candidature",
  applyLead:
    "Remplissez le formulaire et téléversez votre CV en PDF. Il arrive directement aux RH, et vous recevez un court e-mail de confirmation.",
  principles: [
    "Recrutement juste et transparent",
    "Santé et sécurité au travail",
    "Formation et évolution",
    "Égalité et travail éthique",
  ],
};

const es: Chrome = {
  ...en,
  introAlt: "Planta de producción OmaFil",
  sustainAlt: "Planta OmaFil con paneles solares en cubierta",
  formSelect: "Seleccione",
  kvkk: "Aviso KVKK",
  kvkkConsent:
    " Lo he leído y acepto que mis datos se traten para esta consulta.",
  sentNote:
    "Al enviar, su mensaje llega directamente a OmaFil y también recibe un breve correo de confirmación.",
  familyAria: "Familia de producto",
  backProducts: "Volver a productos",
  noPhoto: "Se añadirá una foto de producción. Aún no hay foto.",
  recycled: "Opción Recycled",
  featured: "Destacado",
  quoteSample: "Pedir oferta / muestra",
  specsTitle: "Especificaciones técnicas",
  specsLead: "Filas del catálogo. Contáctenos para un detalle o un denier especial.",
  specsEmpty:
    "La lista de esta línea se añadirá pronto. Pida una oferta para producción custom.",
  customNote: "En este grupo hay opciones de producción custom.",
  blogBack: "Volver a artículos",
  view: "Ver",
  scrollPrev: "Desplazar atrás",
  scrollNext: "Desplazar adelante",
  themeLight: "Tema claro (clic: oscuro)",
  themeDark: "Tema oscuro (clic: amanecer)",
  themeAuto: "Del amanecer al anochecer (según latitud y hora)",
  aboutSummary: "Historia de la fundación y estructura de la empresa.",
  factorySummary: "Planta de hilo gipe en Tokat–Erbaa.",
  sustainSummary: "Energía, reciclaje y producción responsable.",
  careersSummary: "Forma de trabajar y candidatura.",
  position: "Puesto",
  positionPh: "p. ej. Operario de producción",
  coverNote: "Carta / nota",
  coverNotePh: "Puede añadir una nota breve…",
  cv: "CV (PDF)",
  cvHint: "Máximo 4 MB, solo PDF.",
  cvSelected: "Seleccionado:",
  cvRequired: "Suba un CV en PDF",
  cvPdfOnly: "Solo se acepta PDF",
  cvTooBig: "El archivo puede tener como máximo 4 MB",
  careersKvkk:
    " Lo he leído y acepto que mi CV y mis datos se traten en el proceso de selección.",
  careersSent: "Candidatura recibida. La revisaremos en breve.",
  careersSend: "Enviar candidatura",
  applyTitle: "Candidatura",
  applyLead:
    "Complete el formulario y suba su CV en PDF. Llega directamente a RR. HH. y usted recibe un breve correo de confirmación.",
  principles: [
    "Contratación justa y transparente",
    "Salud y seguridad laboral",
    "Formación y desarrollo",
    "Igualdad y trabajo ético",
  ],
};

const it: Chrome = {
  ...en,
  introAlt: "Stabilimento di produzione OmaFil",
  sustainAlt: "Stabilimento OmaFil con pannelli solari sul tetto",
  formSelect: "Seleziona",
  kvkk: "Informativa KVKK",
  kvkkConsent:
    " L’ho letta e accetto che i miei dati siano trattati per questa richiesta.",
  sentNote:
    "All’invio il messaggio arriva direttamente a OmaFil e ricevi anche una breve e-mail di conferma.",
  familyAria: "Famiglia di prodotto",
  backProducts: "Torna ai prodotti",
  noPhoto: "Sarà aggiunta una foto di produzione. Non c’è ancora una foto.",
  recycled: "Opzione Recycled",
  featured: "In evidenza",
  quoteSample: "Richiedi offerta / campione",
  specsTitle: "Specifiche tecniche",
  specsLead: "Righe di catalogo. Contattaci per un dettaglio o un denier particolare.",
  specsEmpty:
    "L’elenco di questa linea sarà aggiunto a breve. Richiedi un’offerta per la produzione custom.",
  customNote: "In questo gruppo sono disponibili opzioni di produzione custom.",
  blogBack: "Torna agli articoli",
  view: "Vedi",
  scrollPrev: "Scorri indietro",
  scrollNext: "Scorri avanti",
  themeLight: "Tema chiaro (clic: scuro)",
  themeDark: "Tema scuro (clic: alba)",
  themeAuto: "Dall’alba al tramonto (secondo latitudine e ora)",
  aboutSummary: "Storia della fondazione e struttura aziendale.",
  factorySummary: "Stabilimento di filato gipe a Tokat–Erbaa.",
  sustainSummary: "Energia, riciclo e produzione responsabile.",
  careersSummary: "Modo di lavorare e candidatura.",
  position: "Posizione",
  positionPh: "es. Operatore di produzione",
  coverNote: "Lettera / nota",
  coverNotePh: "Puoi aggiungere una breve nota…",
  cv: "CV (PDF)",
  cvHint: "Massimo 4 MB, solo PDF.",
  cvSelected: "Selezionato:",
  cvRequired: "Carica un CV in PDF",
  cvPdfOnly: "È accettato solo il PDF",
  cvTooBig: "Il file può essere al massimo di 4 MB",
  careersKvkk:
    " L’ho letta e accetto che CV e dati siano trattati per la selezione.",
  careersSent: "Candidatura ricevuta. La valuteremo a breve.",
  careersSend: "Invia candidatura",
  applyTitle: "Candidatura",
  applyLead:
    "Compila il modulo e carica il CV in PDF. Arriva direttamente alle Risorse umane e ricevi una breve e-mail di conferma.",
  principles: [
    "Selezione equa e trasparente",
    "Salute e sicurezza sul lavoro",
    "Formazione e sviluppo",
    "Uguaglianza e lavoro etico",
  ],
};

const pt: Chrome = {
  ...en,
  introAlt: "Unidade de produção OmaFil",
  sustainAlt: "Unidade OmaFil com painéis solares na cobertura",
  formSelect: "Selecione",
  kvkk: "Aviso KVKK",
  kvkkConsent:
    " Li o aviso e aceito que os meus dados sejam tratados para este contacto.",
  sentNote:
    "Ao enviar, a mensagem chega diretamente à OmaFil e também recebe um breve e-mail de confirmação.",
  familyAria: "Família de produto",
  backProducts: "Voltar aos produtos",
  noPhoto: "Será adicionada uma foto de produção. Ainda não há foto.",
  recycled: "Opção Recycled",
  featured: "Em destaque",
  quoteSample: "Pedir orçamento / amostra",
  specsTitle: "Especificações técnicas",
  specsLead: "Linhas do catálogo. Contacte-nos para um detalhe ou um denier especial.",
  specsEmpty:
    "A lista desta linha será adicionada em breve. Peça um orçamento para produção custom.",
  customNote: "Neste grupo há opções de produção custom.",
  blogBack: "Voltar aos artigos",
  view: "Ver",
  scrollPrev: "Recuar",
  scrollNext: "Avançar",
  themeLight: "Tema claro (clique: escuro)",
  themeDark: "Tema escuro (clique: nascer do sol)",
  themeAuto: "Do nascer ao pôr do sol (segundo latitude e hora)",
  aboutSummary: "História da fundação e estrutura da empresa.",
  factorySummary: "Unidade de fio gipe em Tokat–Erbaa.",
  sustainSummary: "Energia, reciclagem e produção responsável.",
  careersSummary: "Forma de trabalhar e candidatura.",
  position: "Cargo",
  positionPh: "ex. Operador de produção",
  coverNote: "Carta / nota",
  coverNotePh: "Pode acrescentar uma nota curta…",
  cv: "CV (PDF)",
  cvHint: "Até 4 MB, apenas PDF.",
  cvSelected: "Selecionado:",
  cvRequired: "Carregue um CV em PDF",
  cvPdfOnly: "Só é aceite PDF",
  cvTooBig: "O ficheiro pode ter no máximo 4 MB",
  careersKvkk:
    " Li o aviso e aceito que o CV e os dados sejam tratados no recrutamento.",
  careersSent: "Candidatura recebida. Vamos analisá-la em breve.",
  careersSend: "Enviar candidatura",
  applyTitle: "Candidatura",
  applyLead:
    "Preencha o formulário e carregue o CV em PDF. Segue diretamente para a equipa de RH e recebe um breve e-mail de confirmação.",
  principles: [
    "Recrutamento justo e transparente",
    "Saúde e segurança no trabalho",
    "Formação e desenvolvimento",
    "Igualdade e trabalho ético",
  ],
};

const nl: Chrome = {
  ...en,
  introAlt: "OmaFil productiefabriek",
  sustainAlt: "OmaFil fabriek met zonnepanelen op het dak",
  formSelect: "Kies",
  kvkk: "KVKK-mededeling",
  kvkkConsent:
    " Ik heb deze gelezen en accepteer dat mijn gegevens voor dit contact worden verwerkt.",
  sentNote:
    "Bij verzenden gaat uw bericht direct naar OmaFil en ontvangt u ook een korte bevestiging per e-mail.",
  familyAria: "Productfamilie",
  backProducts: "Terug naar producten",
  noPhoto: "Een productiefoto volgt. Er is nog geen foto.",
  recycled: "Recycled-optie",
  featured: "Uitgelicht",
  quoteSample: "Offerte / monster aanvragen",
  specsTitle: "Technische specificaties",
  specsLead: "Catalogusregels. Neem contact op voor een detail of een speciale denier.",
  specsEmpty:
    "De regellijst van deze lijn volgt binnenkort. Vraag een offerte voor custom productie.",
  customNote: "In deze groep zijn custom productieopties beschikbaar.",
  blogBack: "Terug naar artikelen",
  view: "Bekijk",
  scrollPrev: "Terug",
  scrollNext: "Verder",
  themeLight: "Licht thema (klik: donker)",
  themeDark: "Donker thema (klik: zonsopkomst)",
  themeAuto: "Van zonsopkomst tot zonsondergang (op breedtegraad en tijd)",
  aboutSummary: "Oprichtingsverhaal en bedrijfsstructuur.",
  factorySummary: "Gipe-garenfabriek in Tokat–Erbaa.",
  sustainSummary: "Energie, recycling en verantwoorde productie.",
  careersSummary: "Werkwijze en sollicitatie.",
  position: "Functie",
  positionPh: "bijv. Productieoperator",
  coverNote: "Brief / notitie",
  coverNotePh: "U kunt een korte notitie toevoegen…",
  cv: "CV (PDF)",
  cvHint: "Maximaal 4 MB, alleen PDF.",
  cvSelected: "Gekozen:",
  cvRequired: "Upload een PDF-cv",
  cvPdfOnly: "Alleen PDF wordt geaccepteerd",
  cvTooBig: "Het bestand mag maximaal 4 MB zijn",
  careersKvkk:
    " Ik heb deze gelezen en accepteer dat mijn cv en gegevens voor werving worden verwerkt.",
  careersSent: "Sollicitatie ontvangen. We beoordelen deze snel.",
  careersSend: "Sollicitatie versturen",
  applyTitle: "Sollicitatie",
  applyLead:
    "Vul het formulier in en upload uw cv als PDF. Het gaat direct naar HR en u ontvangt een korte bevestiging.",
  principles: [
    "Eerlijke en transparante werving",
    "Arbo en veiligheid",
    "Opleiding en ontwikkeling",
    "Gelijkheid en ethisch werken",
  ],
};

const ru: Chrome = {
  ...en,
  introAlt: "Производственный завод OmaFil",
  sustainAlt: "Завод OmaFil с солнечными панелями на крыше",
  formSelect: "Выберите",
  kvkk: "Уведомление KVKK",
  kvkkConsent:
    " Я прочитал(а) его и соглашаюсь на обработку моих данных для этого обращения.",
  sentNote:
    "После отправки сообщение идет напрямую в OmaFil, и вы также получаете короткое письмо-подтверждение.",
  familyAria: "Семейство продукции",
  backProducts: "Назад к продукции",
  noPhoto: "Производственное фото будет добавлено. Фото пока нет.",
  recycled: "Вариант Recycled",
  featured: "Избранное",
  quoteSample: "Запросить предложение / образец",
  specsTitle: "Технические спецификации",
  specsLead: "Строки каталога. Напишите нам для деталей или особого denier.",
  specsEmpty:
    "Список строк этой линии скоро появится. Запросите предложение для custom-производства.",
  customNote: "В этой группе есть варианты custom-производства.",
  blogBack: "Назад к статьям",
  view: "Смотреть",
  scrollPrev: "Назад",
  scrollNext: "Вперёд",
  themeLight: "Светлая тема (нажмите: тёмная)",
  themeDark: "Тёмная тема (нажмите: рассвет)",
  themeAuto: "От рассвета до заката (по широте и времени)",
  aboutSummary: "История основания и структура компании.",
  factorySummary: "Завод gipe-пряжи в Токат–Эрбаа.",
  sustainSummary: "Энергия, переработка и ответственное производство.",
  careersSummary: "Подход к работе и отклик.",
  position: "Должность",
  positionPh: "напр. Оператор производства",
  coverNote: "Сопроводительная заметка",
  coverNotePh: "Можно добавить короткое примечание…",
  cv: "Резюме (PDF)",
  cvHint: "Не более 4 МБ, только PDF.",
  cvSelected: "Выбран:",
  cvRequired: "Загрузите резюме в PDF",
  cvPdfOnly: "Принимается только PDF",
  cvTooBig: "Файл не больше 4 МБ",
  careersKvkk:
    " Я прочитал(а) его и соглашаюсь на обработку резюме и данных для подбора.",
  careersSent: "Отклик получен. Мы рассмотрим его в ближайшее время.",
  careersSend: "Отправить отклик",
  applyTitle: "Отклик",
  applyLead:
    "Заполните форму и загрузите резюме в PDF. Оно идет напрямую в отдел кадров, и вы получаете короткое письмо-подтверждение.",
  principles: [
    "Честный и прозрачный подбор",
    "Охрана труда",
    "Обучение и развитие",
    "Равенство и этичная работа",
  ],
};

const ar: Chrome = {
  ...en,
  introAlt: "منشأة إنتاج OmaFil",
  sustainAlt: "منشأة OmaFil مع ألواح شمسية على السطح",
  formSelect: "اختر",
  kvkk: "إشعار KVKK",
  kvkkConsent: " قرأته وأوافق على معالجة بياناتي لهذا الطلب.",
  sentNote:
    "عند الإرسال تصل رسالتك مباشرة إلى OmaFil وتصلك أيضاً رسالة تأكيد قصيرة.",
  familyAria: "عائلة المنتج",
  backProducts: "العودة إلى المنتجات",
  noPhoto: "ستُضاف صورة الإنتاج. لا توجد صورة بعد.",
  recycled: "خيار Recycled",
  featured: "مميز",
  quoteSample: "اطلب عرضاً / عينة",
  specsTitle: "المواصفات الفنية",
  specsLead: "صفوف الكتالوج. تواصل معنا لتفاصيل أو denier خاص.",
  specsEmpty: "ستُضاف قائمة هذا الخط قريباً. اطلب عرضاً للإنتاج المخصص.",
  customNote: "تتوفر في هذه المجموعة خيارات إنتاج مخصص.",
  blogBack: "العودة إلى المقالات",
  view: "عرض",
  scrollPrev: "للخلف",
  scrollNext: "للأمام",
  themeLight: "سمة فاتحة (انقر: داكنة)",
  themeDark: "سمة داكنة (انقر: الشروق)",
  themeAuto: "من الشروق إلى الغروب (حسب خط العرض والوقت)",
  aboutSummary: "قصة التأسيس وهيكل الشركة.",
  factorySummary: "مصنع خيوط gipe في توكات–إربا.",
  sustainSummary: "الطاقة وإعادة التدوير والإنتاج المسؤول.",
  careersSummary: "أسلوب العمل والتقديم.",
  position: "الوظيفة",
  positionPh: "مثال: مشغّل إنتاج",
  coverNote: "ملاحظة تعريفية",
  coverNotePh: "يمكنك إضافة ملاحظة قصيرة…",
  cv: "السيرة (PDF)",
  cvHint: "حتى 4 ميغابايت، PDF فقط.",
  cvSelected: "المحدد:",
  cvRequired: "ارفع سيرة بصيغة PDF",
  cvPdfOnly: "يُقبل PDF فقط",
  cvTooBig: "الحد الأقصى للملف 4 ميغابايت",
  careersKvkk: " قرأته وأوافق على معالجة سيرتي وبياناتي لأغراض التوظيف.",
  careersSent: "استلمنا طلبك وسنراجعه قريباً.",
  careersSend: "إرسال الطلب",
  applyTitle: "التقديم",
  applyLead:
    "املأ النموذج وارفع سيرتك بصيغة PDF. يصل مباشرة إلى فريق الموارد البشرية وتصلك رسالة تأكيد قصيرة.",
  principles: [
    "توظيف عادل وشفاف",
    "الصحة والسلامة المهنية",
    "التدريب والتطوير",
    "المساواة والعمل الأخلاقي",
  ],
};

const zh: Chrome = {
  ...en,
  introAlt: "OmaFil 生产工厂",
  sustainAlt: "带屋顶太阳能板的 OmaFil 工厂",
  formSelect: "请选择",
  kvkk: "KVKK 说明",
  kvkkConsent: "。我已阅读，并同意为本次联系处理我的个人数据。",
  sentNote: "发送后，消息会直接到达 OmaFil，您也会收到一封简短的确认邮件。",
  familyAria: "产品系列",
  backProducts: "返回产品",
  noPhoto: "生产照片稍后添加。目前还没有照片。",
  recycled: "Recycled 选项",
  featured: "精选",
  quoteSample: "索取报价 / 样品",
  specsTitle: "技术规格",
  specsLead: "目录行。如需细节或特殊 denier，请联系我们。",
  specsEmpty: "该系列的行清单即将添加。定制生产请索取报价。",
  customNote: "本组提供定制生产选项。",
  blogBack: "返回文章",
  view: "查看",
  scrollPrev: "向后",
  scrollNext: "向前",
  themeLight: "浅色主题（点击：深色）",
  themeDark: "深色主题（点击：日出）",
  themeAuto: "日出到日落（按纬度和时间）",
  aboutSummary: "创立历程与公司结构。",
  factorySummary: "托卡特–埃尔巴的 gipe 纱线工厂。",
  sustainSummary: "能源、回收与负责任生产。",
  careersSummary: "工作方式与申请。",
  position: "职位",
  positionPh: "例如：生产操作员",
  coverNote: "附言",
  coverNotePh: "可以写一句简短说明…",
  cv: "简历 (PDF)",
  cvHint: "最大 4 MB，仅限 PDF。",
  cvSelected: "已选：",
  cvRequired: "请上传 PDF 简历",
  cvPdfOnly: "只接受 PDF",
  cvTooBig: "文件最大 4 MB",
  careersKvkk: "。我已阅读，并同意在招聘中处理我的简历和个人数据。",
  careersSent: "已收到申请，我们会尽快查看。",
  careersSend: "提交申请",
  applyTitle: "申请",
  applyLead: "填写表单并上传 PDF 简历。申请会直接到达人力资源团队，您也会收到一封简短确认邮件。",
  principles: ["公平透明的招聘", "职业健康与安全", "培训与发展", "平等与合乎道德的工作"],
};

export const chrome: Record<Locale, Chrome> = {
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
