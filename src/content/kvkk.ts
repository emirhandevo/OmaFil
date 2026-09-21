import { contact, site } from "@/config/site";

export type KvkkNoticeContent = {
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
  companyLine: string;
};

/**
 * İletişim formu KVKK aydınlatma metni.
 * Popup’ta gösterilir; hukuki metin ileride avukat ile güncellenebilir.
 */
export const kvkkNotice: KvkkNoticeContent = {
  title: "KVKK Aydınlatma Metni",
  subtitle: "İletişim formu kapsamında kişisel verilerin işlenmesi",
  paragraphs: [
    `${site.legalName} (“OmaFil”, “Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla, iletişim formunu doldurmanız halinde paylaştığınız kişisel verilerinizi aşağıda belirtilen amaçlarla işlemekteyiz.`,
    "İşlenen kişisel veriler: ad soyad, e-posta adresi, telefon numarası (paylaşılması halinde), firma adı (paylaşılması halinde), talep türü ve mesaj içeriği.",
    "İşleme amacı: ilettiğiniz talebi, soruyu veya teklif/numune isteğini değerlendirmek, size geri dönüş sağlamak, gerektiğinde ticari iletişimi yürütmek ve kayıtları tutmak.",
    "Hukuki sebepler: KVKK m.5/2 (c) bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması; m.5/2 (f) meşru menfaatimiz kapsamında talep yönetiminin yürütülmesi; açık rızanızın bulunduğu hallerde m.5/1.",
    "Aktarım: Verileriniz, yalnızca hizmetin ifası için gerekli olduğu ölçüde barındırma / e-posta altyapı sağlayıcılarımıza ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılabilir. Yurt dışına aktarım söz konusu olduğunda KVKK’daki şartlara uyulur.",
    "Saklama süresi: Talebinizin sonuçlandırılması ve olası hukuki uyuşmazlıkların takibi için gerekli süre boyunca; ardından silinir, yok edilir veya anonim hale getirilir.",
    "Haklarınız (KVKK m.11): Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK’daki şartlar çerçevesinde silinmesini veya yok edilmesini isteme, otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
    `Başvuru: Yukarıdaki haklarınızı kullanmak için ${contact.email} adresine veya ${contact.locations[0]?.address ?? "genel merkez adresimize"} yazılı olarak başvurabilirsiniz.`,
  ],
  companyLine: `${site.legalName} — ${site.url.replace("https://", "")}`,
};

/** İş başvurusu / CV formu için aydınlatma */
export const kvkkCareersNotice: KvkkNoticeContent = {
  title: "KVKK Aydınlatma Metni",
  subtitle: "İş başvurusu kapsamında kişisel verilerin işlenmesi",
  paragraphs: [
    `${site.legalName} (“OmaFil”, “Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla, insan kaynakları başvuru formunu doldurmanız ve CV yüklemeniz halinde paylaştığınız kişisel verilerinizi aşağıda belirtilen amaçlarla işlemekteyiz.`,
    "İşlenen kişisel veriler: ad soyad, e-posta, telefon (paylaşılması halinde), başvulan pozisyon, ön yazı / not ve yüklediğiniz CV dosyasındaki bilgiler.",
    "İşleme amacı: işe alım sürecini yürütmek, başvurunuzu değerlendirmek, sizinle iletişime geçmek ve başvuru kayıtlarını tutmak.",
    "Hukuki sebepler: KVKK m.5/2 (c) bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması; m.5/2 (f) meşru menfaatimiz kapsamında işe alım süreçlerinin yürütülmesi; açık rızanızın bulunduğu hallerde m.5/1.",
    "Aktarım: Verileriniz, yalnızca sürecin yürütülmesi için gerekli olduğu ölçüde barındırma / e-posta altyapı sağlayıcılarımıza ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılabilir.",
    "Saklama süresi: İşe alım sürecinin tamamlanması ve olası hukuki uyuşmazlıkların takibi için gerekli süre boyunca; ardından silinir, yok edilir veya anonim hale getirilir.",
    "Haklarınız (KVKK m.11): Kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve kanundaki diğer haklarınızı kullanma hakkına sahipsiniz.",
    `Başvuru: Haklarınız için ${contact.email} adresine veya ${contact.locations[0]?.address ?? "genel merkez adresimize"} yazılı başvurabilirsiniz.`,
  ],
  companyLine: `${site.legalName} — ${site.url.replace("https://", "")}`,
};
