import { contact, site } from "@/config/site";
import type { Locale } from "@/i18n/locales";

/** Form, footer, adres etiketi, SEO ve KVKK. Ürün tablo başlıkları burada yok. */
export type Ui = {
  tagline: string;
  places: [string, string, string];
  ogAlt: string;
  homeDescription: string;
  form: {
    name: string;
    email: string;
    phone: string;
    group: string;
    message: string;
    kvkk: string;
    turnstile: string;
    fix: string;
    rate: (sec: number) => string;
    captcha: string;
    mailDown: string;
    mailFail: string;
    mailDomain: string;
    cvRequired: string;
    cvPdf: string;
    cvSize: string;
    cvMissing: string;
  };
  seo: {
    contactTitle: string;
    contact: string;
    blogTitle: string;
    blog: string;
    productsTitle: string;
    products: string;
    corporateTitle: string;
    corporate: string;
    gesTitle: string;
    ges: string;
    postMissing: string;
  };
  kvkkContact: { title: string; subtitle: string; paragraphs: string[] };
  kvkkCareers: { title: string; subtitle: string; paragraphs: string[] };
};

const email = contact.email;
const address = contact.locations[0]?.address ?? "";

function kvkk(
  title: string,
  subtitle: string,
  paragraphs: string[],
): Ui["kvkkContact"] {
  return { title, subtitle, paragraphs };
}

const tr: Ui = {
  tagline: "Endüstriyel iplik üretiminde güvenilir çözüm ortağınız.",
  places: ["Genel Merkez", "Fabrika / Üretim Tesisi", "Fabrika Satış Noktası"],
  ogAlt: "OmaFil üretim tesisi",
  homeDescription: site.description,
  form: {
    name: "Ad soyad en az 2 ve 80 karakter arasında olmalı",
    email: "Geçerli bir e-posta girin",
    phone: "Telefon: rakam, +, () kullanabilirsiniz",
    group: "Ürün grubu seçin",
    message: "Mesaj en az 10 ile 1000 karakter arasında olmalı",
    kvkk: "Devam etmek için KVKK metnini onaylayın",
    turnstile: "Güvenlik doğrulamasını tamamlayın",
    fix: "Lütfen formdaki hataları düzeltin.",
    rate: (sec) => `Çok fazla deneme. Lütfen ${sec} sn sonra tekrar deneyin.`,
    captcha: "Güvenlik doğrulaması başarısız. Lütfen tekrar deneyin.",
    mailDown: "Mail servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.",
    mailFail: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
    mailDomain:
      "Mesaj şu an iletilemedi. Lütfen doğrudan info@omafil.com adresine yazın veya bizi arayın.",
    cvRequired: "CV dosyası (PDF) zorunludur.",
    cvPdf: "Yalnızca PDF dosyası kabul edilir.",
    cvSize: "CV en fazla 4 MB olabilir.",
    cvMissing: "CV PDF yükleyin",
  },
  seo: {
    contactTitle: "İletişim",
    contact:
      "OmaFil iletişim: telefon, e-posta, genel merkez, fabrika ve satış noktası adresleri.",
    blogTitle: "Blog",
    blog: "OmaFil iplik üretimi, tesis ve sürdürülebilirlik yazıları.",
    productsTitle: "Ürünlerimiz",
    products:
      "OmaFil iplik ürünleri: Naylon 6, Naylon 66 ve polyester gipe, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Kurumsal",
    corporate:
      "OmaFil kurumsal sayfaları: hakkımızda, fabrikamız, sürdürülebilirlik ve insan kaynakları.",
    gesTitle: "GES — Güneş Enerji Sistemi",
    ges: "OmaFil GES: Elazığ Hacısam & Kavak saha santralleri ve Erbaa çatı GES. Toplam 6,76 MWp kurulu güç.",
    postMissing: "Yazı bulunamadı",
  },
  kvkkContact: kvkk(
    "KVKK Aydınlatma Metni",
    "İletişim formu kapsamında kişisel verilerin işlenmesi",
    [
      `${site.legalName} (“OmaFil”, “Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla, iletişim formunu doldurmanız halinde paylaştığınız kişisel verilerinizi aşağıda belirtilen amaçlarla işlemekteyiz.`,
      "İşlenen kişisel veriler: ad soyad, e-posta adresi, telefon numarası (paylaşılması halinde), firma adı (paylaşılması halinde), talep türü ve mesaj içeriği.",
      "İşleme amacı: ilettiğiniz talebi, soruyu veya teklif/numune isteğini değerlendirmek, size geri dönüş sağlamak, gerektiğinde ticari iletişimi yürütmek ve kayıtları tutmak.",
      "Hukuki sebepler: KVKK m.5/2 (c) bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması; m.5/2 (f) meşru menfaatimiz kapsamında talep yönetiminin yürütülmesi; açık rızanızın bulunduğu hallerde m.5/1.",
      "Aktarım: Verileriniz, yalnızca hizmetin ifası için gerekli olduğu ölçüde barındırma / e-posta altyapı sağlayıcılarımıza ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılabilir. Yurt dışına aktarım söz konusu olduğunda KVKK’daki şartlara uyulur.",
      "Saklama süresi: Talebinizin sonuçlandırılması ve olası hukuki uyuşmazlıkların takibi için gerekli süre boyunca; ardından silinir, yok edilir veya anonim hale getirilir.",
      "Haklarınız (KVKK m.11): Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK’daki şartlar çerçevesinde silinmesini veya yok edilmesini isteme, otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
      `Başvuru: Yukarıdaki haklarınızı kullanmak için ${email} adresine veya ${address} yazılı olarak başvurabilirsiniz.`,
    ],
  ),
  kvkkCareers: kvkk(
    "KVKK Aydınlatma Metni",
    "İş başvurusu kapsamında kişisel verilerin işlenmesi",
    [
      `${site.legalName} (“OmaFil”, “Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla, insan kaynakları başvuru formunu doldurmanız ve CV yüklemeniz halinde paylaştığınız kişisel verilerinizi aşağıda belirtilen amaçlarla işlemekteyiz.`,
      "İşlenen kişisel veriler: ad soyad, e-posta, telefon (paylaşılması halinde), başvulan pozisyon, ön yazı / not ve yüklediğiniz CV dosyasındaki bilgiler.",
      "İşleme amacı: işe alım sürecini yürütmek, başvurunuzu değerlendirmek, sizinle iletişime geçmek ve başvuru kayıtlarını tutmak.",
      "Hukuki sebepler: KVKK m.5/2 (c) bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması; m.5/2 (f) meşru menfaatimiz kapsamında işe alım süreçlerinin yürütülmesi; açık rızanızın bulunduğu hallerde m.5/1.",
      "Aktarım: Verileriniz, yalnızca sürecin yürütülmesi için gerekli olduğu ölçüde barındırma / e-posta altyapı sağlayıcılarımıza ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılabilir.",
      "Saklama süresi: İşe alım sürecinin tamamlanması ve olası hukuki uyuşmazlıkların takibi için gerekli süre boyunca; ardından silinir, yok edilir veya anonim hale getirilir.",
      "Haklarınız (KVKK m.11): Kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve kanundaki diğer haklarınızı kullanma hakkına sahipsiniz.",
      `Başvuru: Haklarınız için ${email} adresine veya ${address} yazılı başvurabilirsiniz.`,
    ],
  ),
};

function pack(
  partial: Pick<Ui, "tagline" | "places" | "ogAlt" | "homeDescription" | "form" | "seo"> & {
    contactBody: string[];
    contactSub: string;
    careersBody: string[];
    careersSub: string;
    kvkkTitle: string;
  },
): Ui {
  return {
    tagline: partial.tagline,
    places: partial.places,
    ogAlt: partial.ogAlt,
    homeDescription: partial.homeDescription,
    form: partial.form,
    seo: partial.seo,
    kvkkContact: kvkk(partial.kvkkTitle, partial.contactSub, partial.contactBody),
    kvkkCareers: kvkk(partial.kvkkTitle, partial.careersSub, partial.careersBody),
  };
}

const en = pack({
  tagline: "A reliable partner in industrial yarn production.",
  places: ["Head office", "Factory / production plant", "Factory sales point"],
  ogAlt: "OmaFil production plant",
  homeDescription: "Industrial yarn production. Company profile and yarn portfolio.",
  kvkkTitle: "KVKK privacy notice",
  contactSub: "Processing of personal data in the contact form",
  careersSub: "Processing of personal data in a job application",
  form: {
    name: "Full name must be between 2 and 80 characters",
    email: "Enter a valid email",
    phone: "Phone: digits, +, () are allowed",
    group: "Choose a request type",
    message: "Message must be between 10 and 1000 characters",
    kvkk: "Accept the KVKK notice to continue",
    turnstile: "Complete the security check",
    fix: "Please correct the errors in the form.",
    rate: (sec) => `Too many attempts. Please try again in ${sec} seconds.`,
    captcha: "Security check failed. Please try again.",
    mailDown: "Mail service is not configured. Please try again later.",
    mailFail: "The message could not be sent. Please try again later.",
    mailDomain: "The message could not be delivered. Please write to info@omafil.com or call us.",
    cvRequired: "A CV file (PDF) is required.",
    cvPdf: "Only a PDF file is accepted.",
    cvSize: "The CV can be at most 4 MB.",
    cvMissing: "Upload a CV PDF",
  },
  seo: {
    contactTitle: "Contact",
    contact: "OmaFil contact: phone, email, head office, factory and sales point.",
    blogTitle: "Blog",
    blog: "OmaFil notes on yarn production, the plant and sustainability.",
    productsTitle: "Products",
    products: "OmaFil yarns: Naylon 6, Naylon 66 and polyester gipe, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Company",
    corporate: "OmaFil company pages: about, factory, sustainability and careers.",
    gesTitle: "GES — solar power system",
    ges: "OmaFil GES: Elazığ Hacısam and Kavak field plants and the Erbaa rooftop GES. 6.76 MWp installed.",
    postMissing: "Post not found",
  },
  contactBody: [
    `As ${site.legalName} (“OmaFil”, “the Company”), data controller under Turkish Law No. 6698 on the Protection of Personal Data (“KVKK”), we process the personal data you share in the contact form for the purposes below.`,
    "Data processed: full name, email, phone number (if you share it), company name (if you share it), request type and message.",
    "Purpose: to review your request, question or quote/sample ask, reply to you, carry on commercial communication when needed, and keep records.",
    "Legal grounds: KVKK art. 5/2 (c) where processing is directly related to forming or performing a contract; art. 5/2 (f) our legitimate interest in handling the request; art. 5/1 where we have your explicit consent.",
    "Transfer: only as far as needed for hosting and email, and to public authorities when the law requires it. If data is transferred abroad, the KVKK conditions apply.",
    "Retention: for as long as needed to close your request and to follow a possible dispute; then deleted, destroyed or anonymised.",
    "Your rights (KVKK art. 11): to learn whether your data is processed, to request information, to learn whether it is used for its purpose, to know the third parties it is transferred to in Turkey or abroad, to ask for correction, to ask for deletion or destruction under the KVKK conditions, to object to a result against you from automated analysis, and to claim compensation for damage from unlawful processing.",
    `How to apply: write to ${email} or to ${address}.`,
  ],
  careersBody: [
    `As ${site.legalName} (“OmaFil”, “the Company”), data controller under Law No. 6698 (“KVKK”), we process the personal data you share in the careers form and in your CV for the purposes below.`,
    "Data processed: full name, email, phone (if shared), position applied for, cover note and the information in the CV file.",
    "Purpose: to run recruitment, review your application, contact you and keep application records.",
    "Legal grounds: KVKK art. 5/2 (c) where processing is directly related to forming or performing a contract; art. 5/2 (f) our legitimate interest in recruitment; art. 5/1 where we have your explicit consent.",
    "Transfer: only as far as needed to run the process, to hosting and email providers, and to public authorities when the law requires it.",
    "Retention: for as long as needed to finish recruitment and to follow a possible dispute; then deleted, destroyed or anonymised.",
    "Your rights (KVKK art. 11): to learn whether your data is processed, to request information, to ask for correction or deletion, and to use the other rights in the law.",
    `How to apply: write to ${email} or to ${address}.`,
  ],
});

const de = pack({
  tagline: "Ein verlässlicher Partner in der industriellen Garnproduktion.",
  places: ["Hauptsitz", "Fabrik / Produktionswerk", "Fabrik-Verkaufsstelle"],
  ogAlt: "OmaFil Produktionswerk",
  homeDescription: "Industrielle Garnproduktion. Unternehmensprofil und Garnportfolio.",
  kvkkTitle: "KVKK-Hinweis",
  contactSub: "Verarbeitung personenbezogener Daten im Kontaktformular",
  careersSub: "Verarbeitung personenbezogener Daten in der Bewerbung",
  form: {
    name: "Der Name muss zwischen 2 und 80 Zeichen lang sein",
    email: "Geben Sie eine gültige E-Mail ein",
    phone: "Telefon: Ziffern, + und () sind erlaubt",
    group: "Wählen Sie eine Anfrageart",
    message: "Die Nachricht muss zwischen 10 und 1000 Zeichen lang sein",
    kvkk: "Bitte den KVKK-Hinweis akzeptieren",
    turnstile: "Schließen Sie die Sicherheitsprüfung ab",
    fix: "Bitte korrigieren Sie die Fehler im Formular.",
    rate: (sec) => `Zu viele Versuche. Bitte in ${sec} Sekunden erneut versuchen.`,
    captcha: "Sicherheitsprüfung fehlgeschlagen. Bitte erneut versuchen.",
    mailDown: "Der Maildienst ist nicht eingerichtet. Bitte später erneut versuchen.",
    mailFail: "Die Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.",
    mailDomain: "Die Nachricht kam nicht an. Bitte schreiben Sie an info@omafil.com oder rufen Sie uns an.",
    cvRequired: "Ein Lebenslauf (PDF) ist erforderlich.",
    cvPdf: "Nur eine PDF-Datei wird akzeptiert.",
    cvSize: "Der Lebenslauf darf höchstens 4 MB groß sein.",
    cvMissing: "Laden Sie einen Lebenslauf als PDF hoch",
  },
  seo: {
    contactTitle: "Kontakt",
    contact: "OmaFil Kontakt: Telefon, E-Mail, Hauptsitz, Werk und Verkaufsstelle.",
    blogTitle: "Blog",
    blog: "OmaFil Texte zu Garnproduktion, Werk und Nachhaltigkeit.",
    productsTitle: "Produkte",
    products: "OmaFil Garne: Naylon 6, Naylon 66 und Polyester-Gipe, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Unternehmen",
    corporate: "OmaFil Unternehmensseiten: Über uns, Werk, Nachhaltigkeit und Karriere.",
    gesTitle: "GES — Solarstromsystem",
    ges: "OmaFil GES: Feldanlagen Elazığ Hacısam und Kavak sowie Dach-GES Erbaa. 6,76 MWp installiert.",
    postMissing: "Beitrag nicht gefunden",
  },
  contactBody: [
    `Als ${site.legalName} („OmaFil“, „das Unternehmen“), Verantwortlicher nach dem türkischen Gesetz Nr. 6698 zum Schutz personenbezogener Daten („KVKK“), verarbeiten wir die Daten aus dem Kontaktformular zu den folgenden Zwecken.`,
    "Verarbeitete Daten: Name, E-Mail, Telefon (falls angegeben), Firmenname (falls angegeben), Art der Anfrage und Nachricht.",
    "Zweck: Ihre Anfrage, Frage oder Angebots-/Musterbitte zu prüfen, zu antworten, bei Bedarf geschäftlich zu kommunizieren und Aufzeichnungen zu führen.",
    "Rechtsgrundlagen: KVKK Art. 5/2 (c), wenn die Verarbeitung unmittelbar mit Vertragsschluss oder Erfüllung zusammenhängt; Art. 5/2 (f) unser berechtigtes Interesse an der Bearbeitung; Art. 5/1 bei Ihrer ausdrücklichen Einwilligung.",
    "Übermittlung: nur soweit für Hosting und E-Mail nötig, und an Behörden, wenn das Gesetz es verlangt. Bei einer Übermittlung ins Ausland gelten die KVKK-Bedingungen.",
    "Speicherdauer: solange nötig, um die Anfrage abzuschließen und einen möglichen Streit zu verfolgen; danach Löschung, Vernichtung oder Anonymisierung.",
    "Ihre Rechte (KVKK Art. 11): zu erfahren, ob Daten verarbeitet werden, Auskunft zu verlangen, den Zweck zu prüfen, die Empfänger in der Türkei oder im Ausland zu kennen, Berichtigung oder Löschung zu verlangen, einem nachteiligen automatisierten Ergebnis zu widersprechen und Schadenersatz bei rechtswidriger Verarbeitung zu fordern.",
    `Antrag: Schreiben Sie an ${email} oder an ${address}.`,
  ],
  careersBody: [
    `Als ${site.legalName} („OmaFil“, „das Unternehmen“), Verantwortlicher nach Gesetz Nr. 6698 („KVKK“), verarbeiten wir die Daten aus dem Bewerbungsformular und dem Lebenslauf zu den folgenden Zwecken.`,
    "Verarbeitete Daten: Name, E-Mail, Telefon (falls angegeben), Stelle, Anschreiben und die Angaben in der PDF.",
    "Zweck: die Einstellung zu führen, die Bewerbung zu prüfen, Sie zu kontaktieren und Unterlagen zu speichern.",
    "Rechtsgrundlagen: KVKK Art. 5/2 (c) bei unmittelbarem Vertragsbezug; Art. 5/2 (f) unser berechtigtes Interesse an der Einstellung; Art. 5/1 bei ausdrücklicher Einwilligung.",
    "Übermittlung: nur soweit für den Prozess nötig, an Hosting- und E-Mail-Anbieter und bei gesetzlicher Pflicht an Behörden.",
    "Speicherdauer: bis der Einstellungsprozess endet und ein möglicher Streit verfolgt ist; danach Löschung, Vernichtung oder Anonymisierung.",
    "Ihre Rechte (KVKK Art. 11): Auskunft, Berichtigung, Löschung und die übrigen Rechte im Gesetz.",
    `Antrag: Schreiben Sie an ${email} oder an ${address}.`,
  ],
});

const fr = pack({
  tagline: "Un partenaire fiable dans la production de fil industriel.",
  places: ["Siège", "Usine / site de production", "Point de vente usine"],
  ogAlt: "Usine de production OmaFil",
  homeDescription: "Production de fil industriel. Présentation de l’entreprise et portefeuille de fils.",
  kvkkTitle: "Notice KVKK",
  contactSub: "Traitement des données personnelles du formulaire de contact",
  careersSub: "Traitement des données personnelles d’une candidature",
  form: {
    name: "Le nom complet doit contenir entre 2 et 80 caractères",
    email: "Saisissez un e-mail valide",
    phone: "Téléphone : chiffres, + et () sont acceptés",
    group: "Choisissez un type de demande",
    message: "Le message doit contenir entre 10 et 1000 caractères",
    kvkk: "Acceptez la notice KVKK pour continuer",
    turnstile: "Terminez le contrôle de sécurité",
    fix: "Corrigez les erreurs du formulaire.",
    rate: (sec) => `Trop de tentatives. Réessayez dans ${sec} secondes.`,
    captcha: "Le contrôle de sécurité a échoué. Réessayez.",
    mailDown: "Le service mail n’est pas configuré. Réessayez plus tard.",
    mailFail: "Le message n’a pas pu être envoyé. Réessayez plus tard.",
    mailDomain: "Le message n’a pas été remis. Écrivez à info@omafil.com ou appelez-nous.",
    cvRequired: "Un CV (PDF) est obligatoire.",
    cvPdf: "Seul un fichier PDF est accepté.",
    cvSize: "Le CV ne peut pas dépasser 4 Mo.",
    cvMissing: "Téléversez un CV en PDF",
  },
  seo: {
    contactTitle: "Contact",
    contact: "Contact OmaFil : téléphone, e-mail, siège, usine et point de vente.",
    blogTitle: "Blog",
    blog: "Textes OmaFil sur la production de fil, l’usine et la durabilité.",
    productsTitle: "Produits",
    products: "Fils OmaFil : Naylon 6, Naylon 66 et gipe polyester, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Entreprise",
    corporate: "Pages entreprise OmaFil : à propos, usine, durabilité et carrières.",
    gesTitle: "GES — système solaire",
    ges: "GES OmaFil : centrales au sol Elazığ Hacısam et Kavak, toiture Erbaa. 6,76 MWp installés.",
    postMissing: "Article introuvable",
  },
  contactBody: [
    `En qualité de ${site.legalName} (« OmaFil », « la Société »), responsable de traitement au titre de la loi turque n° 6698 (« KVKK »), nous traitons les données du formulaire de contact pour les finalités ci-dessous.`,
    "Données traitées : nom, e-mail, téléphone (s’il est donné), société (si elle est donnée), type de demande et message.",
    "Finalité : examiner votre demande, question ou demande de devis/échantillon, vous répondre, mener la communication commerciale si besoin et tenir les registres.",
    "Bases : KVKK art. 5/2 (c) lorsque le traitement est directement lié à un contrat ; art. 5/2 (f) notre intérêt légitime à traiter la demande ; art. 5/1 en cas de consentement explicite.",
    "Transfert : seulement dans la mesure utile à l’hébergement et à l’e-mail, et aux autorités si la loi l’exige. Un transfert à l’étranger respecte les conditions du KVKK.",
    "Durée : le temps nécessaire pour clore la demande et suivre un éventuel litige ; ensuite suppression, destruction ou anonymisation.",
    "Vos droits (KVKK art. 11) : savoir si vos données sont traitées, obtenir une information, vérifier la finalité, connaître les destinataires en Turquie ou à l’étranger, demander une rectification ou une suppression, vous opposer à un résultat automatisé défavorable et demander réparation d’un traitement illicite.",
    `Demande : écrivez à ${email} ou à ${address}.`,
  ],
  careersBody: [
    `En qualité de ${site.legalName} (« OmaFil », « la Société »), responsable au titre de la loi n° 6698 (« KVKK »), nous traitons les données du formulaire et du CV pour les finalités ci-dessous.`,
    "Données : nom, e-mail, téléphone (s’il est donné), poste, note et informations du fichier CV.",
    "Finalité : mener le recrutement, examiner la candidature, vous contacter et conserver le dossier.",
    "Bases : KVKK art. 5/2 (c) en lien direct avec un contrat ; art. 5/2 (f) intérêt légitime du recrutement ; art. 5/1 en cas de consentement explicite.",
    "Transfert : seulement pour conduire le processus, vers l’hébergement et l’e-mail, et vers les autorités si la loi l’exige.",
    "Durée : jusqu’à la fin du recrutement et le suivi d’un éventuel litige ; ensuite suppression, destruction ou anonymisation.",
    "Vos droits (KVKK art. 11) : information, rectification, suppression et les autres droits de la loi.",
    `Demande : écrivez à ${email} ou à ${address}.`,
  ],
});

const es = pack({
  tagline: "Un socio fiable en la producción de hilo industrial.",
  places: ["Sede", "Fábrica / planta de producción", "Punto de venta de fábrica"],
  ogAlt: "Planta de producción OmaFil",
  homeDescription: "Producción de hilo industrial. Perfil de la empresa y portafolio de hilos.",
  kvkkTitle: "Aviso KVKK",
  contactSub: "Tratamiento de datos personales del formulario de contacto",
  careersSub: "Tratamiento de datos personales de una candidatura",
  form: {
    name: "El nombre debe tener entre 2 y 80 caracteres",
    email: "Escriba un correo válido",
    phone: "Teléfono: se permiten dígitos, + y ()",
    group: "Elija un tipo de solicitud",
    message: "El mensaje debe tener entre 10 y 1000 caracteres",
    kvkk: "Acepte el aviso KVKK para continuar",
    turnstile: "Complete la comprobación de seguridad",
    fix: "Corrija los errores del formulario.",
    rate: (sec) => `Demasiados intentos. Espere ${sec} segundos.`,
    captcha: "La comprobación de seguridad falló. Inténtelo de nuevo.",
    mailDown: "El servicio de correo no está configurado. Inténtelo más tarde.",
    mailFail: "No se pudo enviar el mensaje. Inténtelo más tarde.",
    mailDomain: "El mensaje no se entregó. Escriba a info@omafil.com o llámenos.",
    cvRequired: "El CV (PDF) es obligatorio.",
    cvPdf: "Solo se acepta un archivo PDF.",
    cvSize: "El CV puede tener como máximo 4 MB.",
    cvMissing: "Suba un CV en PDF",
  },
  seo: {
    contactTitle: "Contacto",
    contact: "Contacto OmaFil: teléfono, correo, sede, fábrica y punto de venta.",
    blogTitle: "Blog",
    blog: "Textos de OmaFil sobre producción de hilo, planta y sostenibilidad.",
    productsTitle: "Productos",
    products: "Hilos OmaFil: Naylon 6, Naylon 66 y gipe de poliéster, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Empresa",
    corporate: "Páginas de empresa OmaFil: sobre nosotros, fábrica, sostenibilidad y empleo.",
    gesTitle: "GES — sistema solar",
    ges: "GES OmaFil: plantas de campo Elazığ Hacısam y Kavak, y cubierta Erbaa. 6,76 MWp instalados.",
    postMissing: "Artículo no encontrado",
  },
  contactBody: [
    `Como ${site.legalName} («OmaFil», «la Empresa»), responsable según la Ley turca n.º 6698 («KVKK»), tratamos los datos del formulario de contacto para los fines siguientes.`,
    "Datos: nombre, correo, teléfono (si lo indica), empresa (si la indica), tipo de solicitud y mensaje.",
    "Fin: revisar su solicitud, pregunta o petición de oferta/muestra, responderle, mantener la comunicación comercial cuando haga falta y guardar registros.",
    "Bases: KVKK art. 5/2 (c) si el tratamiento está ligado de forma directa a un contrato; art. 5/2 (f) nuestro interés legítimo; art. 5/1 si hay consentimiento explícito.",
    "Cesión: solo en la medida necesaria para el alojamiento y el correo, y a autoridades si la ley lo exige. Una transferencia al extranjero cumple las condiciones del KVKK.",
    "Conservación: el tiempo necesario para cerrar la solicitud y seguir un posible litigio; después se borra, destruye o anonimiza.",
    "Sus derechos (KVKK art. 11): saber si se tratan sus datos, pedir información, comprobar el fin, conocer los destinatarios en Turquía o en el extranjero, pedir rectificación o supresión, oponerse a un resultado automatizado en su contra y reclamar el daño de un tratamiento ilícito.",
    `Solicitud: escriba a ${email} o a ${address}.`,
  ],
  careersBody: [
    `Como ${site.legalName} («OmaFil», «la Empresa»), responsable según la Ley n.º 6698 («KVKK»), tratamos los datos del formulario y del CV para los fines siguientes.`,
    "Datos: nombre, correo, teléfono (si lo indica), puesto, nota y la información del PDF.",
    "Fin: llevar la selección, valorar la candidatura, contactarle y guardar el expediente.",
    "Bases: KVKK art. 5/2 (c) en relación directa con un contrato; art. 5/2 (f) interés legítimo de la selección; art. 5/1 con consentimiento explícito.",
    "Cesión: solo lo necesario para el proceso, a proveedores de alojamiento y correo, y a autoridades si la ley lo exige.",
    "Conservación: hasta terminar la selección y seguir un posible litigio; después se borra, destruye o anonimiza.",
    "Sus derechos (KVKK art. 11): información, rectificación, supresión y los demás derechos de la ley.",
    `Solicitud: escriba a ${email} o a ${address}.`,
  ],
});

const it = pack({
  tagline: "Un partner affidabile nella produzione di filato industriale.",
  places: ["Sede", "Fabbrica / stabilimento", "Punto vendita di fabbrica"],
  ogAlt: "Stabilimento di produzione OmaFil",
  homeDescription: "Produzione di filato industriale. Profilo aziendale e portafoglio filati.",
  kvkkTitle: "Informativa KVKK",
  contactSub: "Trattamento dei dati personali del modulo di contatto",
  careersSub: "Trattamento dei dati personali di una candidatura",
  form: {
    name: "Il nome deve contenere tra 2 e 80 caratteri",
    email: "Inserisci un’e-mail valida",
    phone: "Telefono: sono ammessi numeri, + e ()",
    group: "Scegli un tipo di richiesta",
    message: "Il messaggio deve contenere tra 10 e 1000 caratteri",
    kvkk: "Accetta l’informativa KVKK per continuare",
    turnstile: "Completa il controllo di sicurezza",
    fix: "Correggi gli errori nel modulo.",
    rate: (sec) => `Troppi tentativi. Riprova tra ${sec} secondi.`,
    captcha: "Controllo di sicurezza non riuscito. Riprova.",
    mailDown: "Il servizio mail non è configurato. Riprova più tardi.",
    mailFail: "Il messaggio non è stato inviato. Riprova più tardi.",
    mailDomain: "Il messaggio non è stato recapitato. Scrivi a info@omafil.com o chiamaci.",
    cvRequired: "Il CV (PDF) è obbligatorio.",
    cvPdf: "È accettato solo un file PDF.",
    cvSize: "Il CV può essere al massimo di 4 MB.",
    cvMissing: "Carica un CV in PDF",
  },
  seo: {
    contactTitle: "Contatti",
    contact: "Contatti OmaFil: telefono, e-mail, sede, stabilimento e punto vendita.",
    blogTitle: "Blog",
    blog: "Testi OmaFil su produzione di filato, stabilimento e sostenibilità.",
    productsTitle: "Prodotti",
    products: "Filati OmaFil: Naylon 6, Naylon 66 e gipe poliestere, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Azienda",
    corporate: "Pagine aziendali OmaFil: chi siamo, stabilimento, sostenibilità e carriere.",
    gesTitle: "GES — sistema solare",
    ges: "GES OmaFil: impianti a terra Elazığ Hacısam e Kavak, tetto Erbaa. 6,76 MWp installati.",
    postMissing: "Articolo non trovato",
  },
  contactBody: [
    `In qualità di ${site.legalName} («OmaFil», «la Società»), titolare ai sensi della legge turca n. 6698 («KVKK»), trattiamo i dati del modulo di contatto per le finalità seguenti.`,
    "Dati: nome, e-mail, telefono (se indicato), azienda (se indicata), tipo di richiesta e messaggio.",
    "Finalità: valutare la richiesta, la domanda o la richiesta di offerta/campione, rispondere, svolgere la comunicazione commerciale se serve e tenere i registri.",
    "Basi: KVKK art. 5/2 (c) se il trattamento è collegato in modo diretto a un contratto; art. 5/2 (f) nostro interesse legittimo; art. 5/1 con consenso esplicito.",
    "Comunicazione: solo per quanto serve a hosting e e-mail, e alle autorità se la legge lo richiede. Un trasferimento all’estero rispetta le condizioni del KVKK.",
    "Conservazione: per il tempo necessario a chiudere la richiesta e seguire una possibile controversia; poi cancellazione, distruzione o anonimizzazione.",
    "I tuoi diritti (KVKK art. 11): sapere se i dati sono trattati, chiedere informazioni, verificare la finalità, conoscere i destinatari in Turchia o all’estero, chiedere rettifica o cancellazione, opporti a un risultato automatizzato sfavorevole e chiedere il risarcimento di un trattamento illecito.",
    `Richiesta: scrivi a ${email} o a ${address}.`,
  ],
  careersBody: [
    `In qualità di ${site.legalName} («OmaFil», «la Società»), titolare ai sensi della legge n. 6698 («KVKK»), trattiamo i dati del modulo e del CV per le finalità seguenti.`,
    "Dati: nome, e-mail, telefono (se indicato), posizione, nota e informazioni del PDF.",
    "Finalità: gestire la selezione, valutare la candidatura, contattarti e conservare il fascicolo.",
    "Basi: KVKK art. 5/2 (c) in rapporto diretto con un contratto; art. 5/2 (f) interesse legittimo della selezione; art. 5/1 con consenso esplicito.",
    "Comunicazione: solo quanto serve al processo, a hosting e e-mail, e alle autorità se la legge lo richiede.",
    "Conservazione: fino alla fine della selezione e al seguito di una possibile controversia; poi cancellazione, distruzione o anonimizzazione.",
    "I tuoi diritti (KVKK art. 11): informazione, rettifica, cancellazione e gli altri diritti di legge.",
    `Richiesta: scrivi a ${email} o a ${address}.`,
  ],
});

const pt = pack({
  tagline: "Um parceiro fiável na produção de fio industrial.",
  places: ["Sede", "Fábrica / unidade de produção", "Ponto de venda da fábrica"],
  ogAlt: "Unidade de produção OmaFil",
  homeDescription: "Produção de fio industrial. Perfil da empresa e portefólio de fios.",
  kvkkTitle: "Aviso KVKK",
  contactSub: "Tratamento de dados pessoais do formulário de contacto",
  careersSub: "Tratamento de dados pessoais de uma candidatura",
  form: {
    name: "O nome deve ter entre 2 e 80 caracteres",
    email: "Introduza um e-mail válido",
    phone: "Telefone: são permitidos dígitos, + e ()",
    group: "Escolha um tipo de pedido",
    message: "A mensagem deve ter entre 10 e 1000 caracteres",
    kvkk: "Aceite o aviso KVKK para continuar",
    turnstile: "Conclua a verificação de segurança",
    fix: "Corrija os erros do formulário.",
    rate: (sec) => `Demasiadas tentativas. Tente de novo em ${sec} segundos.`,
    captcha: "A verificação de segurança falhou. Tente de novo.",
    mailDown: "O serviço de e-mail não está configurado. Tente mais tarde.",
    mailFail: "A mensagem não foi enviada. Tente mais tarde.",
    mailDomain: "A mensagem não foi entregue. Escreva para info@omafil.com ou ligue-nos.",
    cvRequired: "O CV (PDF) é obrigatório.",
    cvPdf: "Só é aceite um ficheiro PDF.",
    cvSize: "O CV pode ter no máximo 4 MB.",
    cvMissing: "Carregue um CV em PDF",
  },
  seo: {
    contactTitle: "Contacto",
    contact: "Contacto OmaFil: telefone, e-mail, sede, fábrica e ponto de venda.",
    blogTitle: "Blog",
    blog: "Textos OmaFil sobre produção de fio, fábrica e sustentabilidade.",
    productsTitle: "Produtos",
    products: "Fios OmaFil: Naylon 6, Naylon 66 e gipe de poliéster, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Empresa",
    corporate: "Páginas da empresa OmaFil: sobre nós, fábrica, sustentabilidade e carreiras.",
    gesTitle: "GES — sistema solar",
    ges: "GES OmaFil: centrais de campo Elazığ Hacısam e Kavak, e cobertura Erbaa. 6,76 MWp instalados.",
    postMissing: "Artigo não encontrado",
  },
  contactBody: [
    `Na qualidade de ${site.legalName} («OmaFil», «a Empresa»), responsável pelo tratamento ao abrigo da Lei turca n.º 6698 («KVKK»), tratamos os dados do formulário de contacto para as finalidades abaixo.`,
    "Dados: nome, e-mail, telefone (se o indicar), empresa (se a indicar), tipo de pedido e mensagem.",
    "Finalidade: analisar o pedido, a pergunta ou o pedido de proposta/amostra, responder, manter a comunicação comercial quando for preciso e guardar registos.",
    "Fundamentos: KVKK art. 5/2 (c) quando o tratamento está ligado de forma direta a um contrato; art. 5/2 (f) o nosso interesse legítimo; art. 5/1 com consentimento explícito.",
    "Transmissão: apenas o necessário para alojamento e e-mail, e a autoridades se a lei o exigir. Uma transferência para o estrangeiro cumpre as condições do KVKK.",
    "Conservação: o tempo necessário para fechar o pedido e acompanhar um eventual litígio; depois apagamos, destruímos ou anonimizamos.",
    "Os seus direitos (KVKK art. 11): saber se os dados são tratados, pedir informação, verificar a finalidade, conhecer os destinatários na Turquia ou no estrangeiro, pedir retificação ou apagamento, opor-se a um resultado automatizado desfavorável e pedir indemnização por tratamento ilícito.",
    `Pedido: escreva para ${email} ou para ${address}.`,
  ],
  careersBody: [
    `Na qualidade de ${site.legalName} («OmaFil», «a Empresa»), responsável ao abrigo da Lei n.º 6698 («KVKK»), tratamos os dados do formulário e do CV para as finalidades abaixo.`,
    "Dados: nome, e-mail, telefone (se o indicar), função, nota e a informação do PDF.",
    "Finalidade: conduzir o recrutamento, avaliar a candidatura, contactá-lo e guardar o processo.",
    "Fundamentos: KVKK art. 5/2 (c) em ligação direta com um contrato; art. 5/2 (f) interesse legítimo do recrutamento; art. 5/1 com consentimento explícito.",
    "Transmissão: apenas o necessário ao processo, a fornecedores de alojamento e e-mail, e a autoridades se a lei o exigir.",
    "Conservação: até terminar o recrutamento e acompanhar um eventual litígio; depois apagamos, destruímos ou anonimizamos.",
    "Os seus direitos (KVKK art. 11): informação, retificação, apagamento e os demais direitos da lei.",
    `Pedido: escreva para ${email} ou para ${address}.`,
  ],
});

const nl = pack({
  tagline: "Een betrouwbare partner in industriële garenproductie.",
  places: ["Hoofdkantoor", "Fabriek / productielocatie", "Fabrieksverkooppunt"],
  ogAlt: "OmaFil productiefabriek",
  homeDescription: "Industriële garenproductie. Bedrijfsprofiel en garenportfolio.",
  kvkkTitle: "KVKK-mededeling",
  contactSub: "Verwerking van persoonsgegevens in het contactformulier",
  careersSub: "Verwerking van persoonsgegevens bij een sollicitatie",
  form: {
    name: "De naam moet tussen 2 en 80 tekens lang zijn",
    email: "Vul een geldig e-mailadres in",
    phone: "Telefoon: cijfers, + en () zijn toegestaan",
    group: "Kies een type aanvraag",
    message: "Het bericht moet tussen 10 en 1000 tekens lang zijn",
    kvkk: "Accepteer de KVKK-mededeling om verder te gaan",
    turnstile: "Rond de veiligheidscontrole af",
    fix: "Corrigeer de fouten in het formulier.",
    rate: (sec) => `Te veel pogingen. Probeer het over ${sec} seconden opnieuw.`,
    captcha: "Veiligheidscontrole mislukt. Probeer het opnieuw.",
    mailDown: "De maildienst is niet ingesteld. Probeer het later opnieuw.",
    mailFail: "Het bericht is niet verzonden. Probeer het later opnieuw.",
    mailDomain: "Het bericht is niet aangekomen. Mail info@omafil.com of bel ons.",
    cvRequired: "Een cv (PDF) is verplicht.",
    cvPdf: "Alleen een PDF-bestand wordt geaccepteerd.",
    cvSize: "Het cv mag maximaal 4 MB zijn.",
    cvMissing: "Upload een cv als PDF",
  },
  seo: {
    contactTitle: "Contact",
    contact: "OmaFil contact: telefoon, e-mail, hoofdkantoor, fabriek en verkooppunt.",
    blogTitle: "Blog",
    blog: "OmaFil-teksten over garenproductie, de fabriek en duurzaamheid.",
    productsTitle: "Producten",
    products: "OmaFil-garens: Naylon 6, Naylon 66 en polyester gipe, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Bedrijf",
    corporate: "OmaFil-bedrijfspagina’s: over ons, fabriek, duurzaamheid en werken bij.",
    gesTitle: "GES — zonnestroomsysteem",
    ges: "OmaFil GES: veldcentrales Elazığ Hacısam en Kavak, en dak-GES Erbaa. 6,76 MWp geïnstalleerd.",
    postMissing: "Bericht niet gevonden",
  },
  contactBody: [
    `Als ${site.legalName} (“OmaFil”, “het Bedrijf”), verwerkingsverantwoordelijke onder Turkse wet nr. 6698 (“KVKK”), verwerken wij de gegevens uit het contactformulier voor de doelen hieronder.`,
    "Gegevens: naam, e-mail, telefoon (als u die deelt), bedrijfsnaam (als u die deelt), type aanvraag en bericht.",
    "Doel: uw aanvraag, vraag of offerte-/monsterverzoek beoordelen, antwoorden, zo nodig zakelijk communiceren en registraties bijhouden.",
    "Gronden: KVKK art. 5/2 (c) als de verwerking direct met een overeenkomst samenhangt; art. 5/2 (f) ons gerechtvaardigd belang; art. 5/1 bij uitdrukkelijke toestemming.",
    "Doorgifte: alleen voor zover nodig voor hosting en e-mail, en aan overheden als de wet dat vraagt. Doorgifte naar het buitenland volgt de KVKK-voorwaarden.",
    "Bewaartermijn: zolang nodig om de aanvraag af te ronden en een mogelijk geschil te volgen; daarna wissen, vernietigen of anonimiseren.",
    "Uw rechten (KVKK art. 11): weten of gegevens worden verwerkt, informatie vragen, het doel controleren, de ontvangers in Turkije of in het buitenland kennen, correctie of wissing vragen, bezwaar maken tegen een nadelig geautomatiseerd resultaat en schadevergoeding vragen bij onrechtmatige verwerking.",
    `Verzoek: schrijf naar ${email} of naar ${address}.`,
  ],
  careersBody: [
    `Als ${site.legalName} (“OmaFil”, “het Bedrijf”), verantwoordelijke onder wet nr. 6698 (“KVKK”), verwerken wij de gegevens uit het sollicitatieformulier en het cv voor de doelen hieronder.`,
    "Gegevens: naam, e-mail, telefoon (als u die deelt), functie, notitie en de informatie in het PDF-bestand.",
    "Doel: werving uitvoeren, de sollicitatie beoordelen, contact opnemen en het dossier bewaren.",
    "Gronden: KVKK art. 5/2 (c) in direct verband met een overeenkomst; art. 5/2 (f) gerechtvaardigd belang bij werving; art. 5/1 bij uitdrukkelijke toestemming.",
    "Doorgifte: alleen wat nodig is voor het proces, naar hosting en e-mail, en naar overheden als de wet dat vraagt.",
    "Bewaartermijn: tot de werving klaar is en een mogelijk geschil is gevolgd; daarna wissen, vernietigen of anonimiseren.",
    "Uw rechten (KVKK art. 11): informatie, correctie, wissing en de overige rechten in de wet.",
    `Verzoek: schrijf naar ${email} of naar ${address}.`,
  ],
});

const ru = pack({
  tagline: "Надежный партнер в промышленном производстве пряжи.",
  places: ["Головной офис", "Фабрика / производство", "Точка продаж фабрики"],
  ogAlt: "Производственный завод OmaFil",
  homeDescription: "Промышленное производство пряжи. Профиль компании и портфель пряжи.",
  kvkkTitle: "Уведомление KVKK",
  contactSub: "Обработка персональных данных в форме контакта",
  careersSub: "Обработка персональных данных в заявке на работу",
  form: {
    name: "Имя должно содержать от 2 до 80 символов",
    email: "Введите действительный e-mail",
    phone: "Телефон: можно цифры, + и ()",
    group: "Выберите тип запроса",
    message: "Сообщение должно содержать от 10 до 1000 символов",
    kvkk: "Чтобы продолжить, примите уведомление KVKK",
    turnstile: "Пройдите проверку безопасности",
    fix: "Исправьте ошибки в форме.",
    rate: (sec) => `Слишком много попыток. Повторите через ${sec} с.`,
    captcha: "Проверка безопасности не пройдена. Повторите.",
    mailDown: "Почтовый сервис не настроен. Повторите позже.",
    mailFail: "Сообщение не отправлено. Повторите позже.",
    mailDomain: "Сообщение не доставлено. Напишите на info@omafil.com или позвоните нам.",
    cvRequired: "Нужен файл резюме (PDF).",
    cvPdf: "Принимается только PDF.",
    cvSize: "Резюме не больше 4 МБ.",
    cvMissing: "Загрузите резюме в PDF",
  },
  seo: {
    contactTitle: "Контакты",
    contact: "Контакты OmaFil: телефон, почта, офис, завод и точка продаж.",
    blogTitle: "Блог",
    blog: "Тексты OmaFil о производстве пряжи, заводе и устойчивости.",
    productsTitle: "Продукция",
    products: "Пряжа OmaFil: Naylon 6, Naylon 66 и полиэстер gipe, POY, FDY, DTY, ACY, SCY.",
    corporateTitle: "Компания",
    corporate: "Страницы компании OmaFil: о нас, завод, устойчивость и карьера.",
    gesTitle: "GES — солнечная система",
    ges: "GES OmaFil: полевые станции Элязыг Hacısam и Kavak и крыша Эрбаа. 6,76 MWp.",
    postMissing: "Запись не найдена",
  },
  contactBody: [
    `Как ${site.legalName} («OmaFil», «Компания»), оператор по турецкому закону № 6698 («KVKK»), мы обрабатываем данные контактной формы в целях ниже.`,
    "Данные: имя, e-mail, телефон (если указан), компания (если указана), тип запроса и текст.",
    "Цель: рассмотреть запрос, вопрос или просьбу о предложении/образце, ответить, при необходимости вести деловую переписку и хранить записи.",
    "Основания: KVKK ст. 5/2 (c), если обработка прямо связана с договором; ст. 5/2 (f) наш законный интерес; ст. 5/1 при явном согласии.",
    "Передача: только в мере, нужной для хостинга и почты, и госорганам, если закон требует. Передача за границу идет по условиям KVKK.",
    "Срок: пока нужно закрыть запрос и вести возможный спор; затем удаление, уничтожение или обезличивание.",
    "Ваши права (KVKK ст. 11): узнать, обрабатываются ли данные, запросить сведения, проверить цель, знать получателей в Турции или за рубежом, требовать исправления или удаления, возразить против неблагоприятного автоматического результата и требовать возмещения вреда от незаконной обработки.",
    `Заявление: напишите на ${email} или по адресу ${address}.`,
  ],
  careersBody: [
    `Как ${site.legalName} («OmaFil», «Компания»), оператор по закону № 6698 («KVKK»), мы обрабатываем данные формы и резюме в целях ниже.`,
    "Данные: имя, e-mail, телефон (если указан), должность, сопроводительная заметка и сведения из PDF.",
    "Цель: вести подбор, оценить заявку, связаться с вами и хранить досье.",
    "Основания: KVKK ст. 5/2 (c) при прямой связи с договором; ст. 5/2 (f) законный интерес подбора; ст. 5/1 при явном согласии.",
    "Передача: только насколько нужно для процесса, хостингу и почте, и госорганам, если закон требует.",
    "Срок: до конца подбора и ведения возможного спора; затем удаление, уничтожение или обезличивание.",
    "Ваши права (KVKK ст. 11): сведения, исправление, удаление и иные права по закону.",
    `Заявление: напишите на ${email} или по адресу ${address}.`,
  ],
});

const ar = pack({
  tagline: "شريك موثوق في إنتاج الخيط الصناعي.",
  places: ["المقر", "المصنع / منشأة الإنتاج", "نقطة بيع المصنع"],
  ogAlt: "منشأة إنتاج OmaFil",
  homeDescription: "إنتاج خيط صناعي. ملف الشركة ومحفظة الخيوط.",
  kvkkTitle: "إشعار KVKK",
  contactSub: "معالجة البيانات الشخصية في نموذج الاتصال",
  careersSub: "معالجة البيانات الشخصية في طلب التوظيف",
  form: {
    name: "يجب أن يكون الاسم بين 2 و 80 حرفًا",
    email: "أدخل بريداً صالحاً",
    phone: "الهاتف: الأرقام و + و () مسموحة",
    group: "اختر نوع الطلب",
    message: "يجب أن تكون الرسالة بين 10 و 1000 حرف",
    kvkk: "للمتابعة وافق على إشعار KVKK",
    turnstile: "أكمل التحقق الأمني",
    fix: "صحّح أخطاء النموذج.",
    rate: (sec) => `محاولات كثيرة. أعد المحاولة بعد ${sec} ثانية.`,
    captcha: "فشل التحقق الأمني. أعد المحاولة.",
    mailDown: "خدمة البريد غير مهيأة. حاول لاحقاً.",
    mailFail: "لم تُرسل الرسالة. حاول لاحقاً.",
    mailDomain: "لم تصل الرسالة. اكتب إلى info@omafil.com أو اتصل بنا.",
    cvRequired: "ملف السيرة (PDF) إلزامي.",
    cvPdf: "يُقبل ملف PDF فقط.",
    cvSize: "حجم السيرة 4 ميغابايت كحد أقصى.",
    cvMissing: "ارفع السيرة بصيغة PDF",
  },
  seo: {
    contactTitle: "اتصل بنا",
    contact: "اتصال OmaFil: هاتف وبريد والمقر والمصنع ونقطة البيع.",
    blogTitle: "المدونة",
    blog: "نصوص OmaFil عن إنتاج الخيط والمصنع والاستدامة.",
    productsTitle: "المنتجات",
    products: "خيوط OmaFil: Naylon 6 وNaylon 66 وgipe بوليستر، POY وFDY وDTY وACY وSCY.",
    corporateTitle: "الشركة",
    corporate: "صفحات الشركة: من نحن والمصنع والاستدامة والوظائف.",
    gesTitle: "GES — نظام شمسي",
    ges: "GES لدى OmaFil: محطتا حقل إلازيغ Hacısam وKavak وسطح إربا. 6.76 MWp.",
    postMissing: "المقال غير موجود",
  },
  contactBody: [
    `بصفتنا ${site.legalName} («OmaFil»، «الشركة»)، مسؤول البيانات بموجب القانون التركي رقم 6698 («KVKK»)، نعالج بيانات نموذج الاتصال للأغراض أدناه.`,
    "البيانات: الاسم والبريد والهاتف (إن ذُكر) واسم الشركة (إن ذُكر) ونوع الطلب ونص الرسالة.",
    "الغرض: مراجعة الطلب أو السؤال أو طلب العرض/العينة، والرد، وإجراء التواصل التجاري عند الحاجة، وحفظ السجلات.",
    "الأسس: KVKK م.5/2 (c) إذا كانت المعالجة مرتبطة مباشرة بعقد؛ م.5/2 (f) مصلحتنا المشروعة؛ م.5/1 عند الموافقة الصريحة.",
    "النقل: بالقدر اللازم للاستضافة والبريد، وإلى الجهات العامة إذا أوجب القانون. النقل إلى الخارج يلتزم بشروط KVKK.",
    "المدة: ما يلزم لإنهاء الطلب ومتابعة نزاع محتمل؛ ثم الحذف أو الإتلاف أو إخفاء الهوية.",
    "حقوقكم (KVKK م.11): معرفة ما إذا كانت البيانات تُعالج، وطلب المعلومات، والتحقق من الغرض، ومعرفة الأطراف في تركيا أو الخارج، وطلب التصحيح أو الحذف، والاعتراض على نتيجة آلية ضدكم، والمطالبة بالتعويض عن معالجة مخالفة للقانون.",
    `الطلب: اكتبوا إلى ${email} أو إلى ${address}.`,
  ],
  careersBody: [
    `بصفتنا ${site.legalName} («OmaFil»، «الشركة»)، مسؤول البيانات بموجب القانون رقم 6698 («KVKK»)، نعالج بيانات نموذج التوظيف والسيرة للأغراض أدناه.`,
    "البيانات: الاسم والبريد والهاتف (إن ذُكر) والوظيفة والملاحظة ومحتوى ملف السيرة.",
    "الغرض: إدارة التوظيف وتقييم الطلب والتواصل معكم وحفظ السجلات.",
    "الأسس: KVKK م.5/2 (c) عند الارتباط المباشر بعقد؛ م.5/2 (f) المصلحة المشروعة في التوظيف؛ م.5/1 عند الموافقة الصريحة.",
    "النقل: بالقدر اللازم للعملية، إلى مزودي الاستضافة والبريد، وإلى الجهات العامة إذا أوجب القانون.",
    "المدة: حتى انتهاء التوظيف ومتابعة نزاع محتمل؛ ثم الحذف أو الإتلاف أو إخفاء الهوية.",
    "حقوقكم (KVKK م.11): الاطلاع والتصحيح والحذف وبقية الحقوق في القانون.",
    `الطلب: اكتبوا إلى ${email} أو إلى ${address}.`,
  ],
});

const zh = pack({
  tagline: "工业纱线生产中的可靠伙伴。",
  places: ["总部", "工厂 / 生产厂", "工厂销售点"],
  ogAlt: "OmaFil 生产工厂",
  homeDescription: "工业纱线生产。公司介绍与纱线组合。",
  kvkkTitle: "KVKK 说明",
  contactSub: "联系表单中的个人数据处理",
  careersSub: "求职申请中的个人数据处理",
  form: {
    name: "姓名须为 2 到 80 个字符",
    email: "请输入有效邮箱",
    phone: "电话可使用数字、+ 和 ()",
    group: "请选择请求类型",
    message: "留言须为 10 到 1000 个字符",
    kvkk: "继续前请同意 KVKK 说明",
    turnstile: "请完成安全验证",
    fix: "请修正表单中的错误。",
    rate: (sec) => `尝试次数过多。请在 ${sec} 秒后重试。`,
    captcha: "安全验证失败。请重试。",
    mailDown: "邮件服务未配置。请稍后再试。",
    mailFail: "消息未能发送。请稍后再试。",
    mailDomain: "消息未能送达。请写信至 info@omafil.com 或致电我们。",
    cvRequired: "必须上传简历（PDF）。",
    cvPdf: "只接受 PDF 文件。",
    cvSize: "简历最大 4 MB。",
    cvMissing: "请上传 PDF 简历",
  },
  seo: {
    contactTitle: "联系我们",
    contact: "OmaFil 联系方式：电话、邮箱、总部、工厂和销售点。",
    blogTitle: "博客",
    blog: "OmaFil 关于纱线生产、工厂与可持续发展的文章。",
    productsTitle: "产品",
    products: "OmaFil 纱线：Naylon 6、Naylon 66 与涤纶 gipe，POY、FDY、DTY、ACY、SCY。",
    corporateTitle: "公司",
    corporate: "OmaFil 公司页面：关于我们、工厂、可持续发展与招聘。",
    gesTitle: "GES — 太阳能系统",
    ges: "OmaFil GES：埃拉泽 Hacısam 与 Kavak 地面电站，以及埃尔巴屋顶。装机 6.76 MWp。",
    postMissing: "文章未找到",
  },
  contactBody: [
    `作为 ${site.legalName}（“OmaFil”，“本公司”），我们是土耳其第 6698 号个人数据保护法（“KVKK”）下的数据控制者，并按下列目的处理您在联系表单中提供的个人数据。`,
    "处理的数据：姓名、邮箱、电话（如提供）、公司名称（如提供）、请求类型和留言内容。",
    "目的：评估您的请求、问题或报价/样品需求，回复您，在需要时进行商务沟通，并保存记录。",
    "法律依据：KVKK 第 5/2 (c) 条，处理与订立或履行合同直接相关；第 5/2 (f) 条，我们处理请求的正当利益；在您明确同意时适用第 5/1 条。",
    "传输：仅在托管和发送邮件所需范围内，以及法律要求时向主管公共机构传输。向境外传输时遵守 KVKK 的条件。",
    "保存期限：完成您的请求并跟进可能争议所需的时间；之后删除、销毁或匿名化。",
    "您的权利（KVKK 第 11 条）：了解数据是否被处理、请求信息、了解是否按目的使用、了解在土耳其境内外的接收方、要求更正或删除、反对自动化分析产生的不利结果，并在违法处理造成损害时要求赔偿。",
    `申请：请写信至 ${email}，或寄至 ${address}。`,
  ],
  careersBody: [
    `作为 ${site.legalName}（“OmaFil”，“本公司”），我们是第 6698 号法律（“KVKK”）下的数据控制者，并按下列目的处理招聘表单和简历中的个人数据。`,
    "处理的数据：姓名、邮箱、电话（如提供）、申请职位、附言以及简历文件中的信息。",
    "目的：开展招聘、评估申请、与您联系并保存申请记录。",
    "法律依据：KVKK 第 5/2 (c) 条，与合同直接相关；第 5/2 (f) 条，招聘中的正当利益；明确同意时适用第 5/1 条。",
    "传输：仅在推进流程所需范围内，向托管和邮件服务商传输，并在法律要求时向主管公共机构传输。",
    "保存期限：直至招聘结束并跟进可能的争议；之后删除、销毁或匿名化。",
    "您的权利（KVKK 第 11 条）：知情、更正、删除以及法律中的其他权利。",
    `申请：请写信至 ${email}，或寄至 ${address}。`,
  ],
});

const byLocale: Record<Locale, Ui> = {
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

export function getUi(locale: Locale): Ui {
  return byLocale[locale] ?? tr;
}

const placeKeys = [
  "Genel Merkez",
  "Fabrika / Üretim Tesisi",
  "Fabrika Satış Noktası",
] as const;

/** Sokak metni aynı kalır. Sadece bilinen üç etiket çevrilir. */
export function placeLabel(label: string, locale: Locale): string {
  const index = placeKeys.indexOf(label as (typeof placeKeys)[number]);
  if (index < 0) return label;
  return getUi(locale).places[index];
}
