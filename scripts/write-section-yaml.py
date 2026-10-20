#!/usr/bin/env python3
"""Keystatic section YAML: TR dolu, diğer diller boş (sözlük fallback)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "content" / "settings"
LOCALES = ["tr", "en", "de", "fr", "es", "it", "pt", "nl", "ru", "ar", "zh"]


def q(value: str) -> str:
    if "\n" in value or ": " in value or value.startswith(" ") or '"' in value:
        lines = value.split("\n")
        out = [">-"]
        for i, line in enumerate(lines):
            out.append(f"      {line}" if line else "")
        return "\n".join(out)
    return f'"{value}"'


def dump_value(value, indent: int) -> str:
    pad = "  " * indent
    if isinstance(value, list):
        if not value:
            return "[]\n"
        chunks = []
        for item in value:
            if isinstance(item, dict):
                chunks.append(f"{pad}-")
                first = True
                for k, v in item.items():
                    prefix = f"{pad}  {k}: "
                    if isinstance(v, str) and ("\n" in v or len(v) > 90):
                        body = "\n".join(
                            f"{pad}    {line}" if line else f"{pad}    "
                            for line in v.split("\n")
                        )
                        chunks.append(f"{prefix}>-\n{body}")
                    else:
                        chunks.append(f"{prefix}{yaml_scalar(v)}")
                    first = False
            else:
                if isinstance(item, str) and ("\n" in item or len(item) > 90):
                    body = "\n".join(
                        f"{pad}    {line}" if line else f"{pad}    "
                        for line in item.split("\n")
                    )
                    chunks.append(f"{pad}- >-\n{body}")
                else:
                    chunks.append(f"{pad}- {yaml_scalar(item)}")
        return "\n".join(chunks) + "\n"
    if isinstance(value, str) and ("\n" in value or len(value) > 90):
        body = "\n".join(
            f"{pad}  {line}" if line else f"{pad}  " for line in value.split("\n")
        )
        return f">-\n{body}\n"
    return f"{yaml_scalar(value)}\n"


def yaml_scalar(value) -> str:
    if not isinstance(value, str):
        return str(value)
    if value == "":
        return '""'
    special = any(c in value for c in ":#{}[]&*?|>!%@`'\"") or value.startswith("-")
    if special or "\n" in value:
        return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return value


def empty_like(value):
    if isinstance(value, list):
        return []
    if isinstance(value, dict):
        return {k: empty_like(v) for k, v in value.items()}
    return ""


def write_copy_block(copy_tr: dict) -> str:
    lines = ["copy:"]
    for loc in LOCALES:
        lines.append(f"  {loc}:")
        data = copy_tr if loc == "tr" else empty_like(copy_tr)
        for key, value in data.items():
            if isinstance(value, list):
                if not value:
                    lines.append(f"    {key}: []")
                else:
                    lines.append(f"    {key}:")
                    dumped = dump_value(value, 3).rstrip("\n")
                    lines.append(dumped)
            elif isinstance(value, str) and ("\n" in value or len(value) > 90):
                lines.append(f"    {key}: >-")
                for part in value.split("\n"):
                    lines.append(f"      {part}" if part else "")
            else:
                lines.append(f"    {key}: {yaml_scalar(value)}")
    return "\n".join(lines) + "\n"


home_copy = {
    "brandKicker": "OmaFil",
    "brandTitleBefore": "Yüksek Kalite ve Yenilikçilikte",
    "brandTitleAccent": "Dünyaya Dokunuyoruz",
    "introKicker": "Kurumsal",
    "introTitle": "Global Tekstile Poliamid İplik",
    "introP1": "Poliamid (Naylon 6 ve Naylon 6,6), yüksek mukavemeti, esnekliği ve aşınma dayanımıyla tekstilin en kritik hammaddelerinden biridir. 1999’dan bu yana biriken deneyimimizi ileri teknolojiyle birleştirerek POY, FDY, DTY, ACY, SCY ve DCY formlarında poliamid iplik üretiyor; çorap, iç giyim, spor giyim, halı ve teknik tekstil sektörlerine yüksek performanslı çözümler sunuyoruz.",
    "introP2": "Avrupa’nın en büyük gipe iplik tesisiyle, global tekstil endüstrisinin ihtiyaçlarına kalite ve güvenilirlikle cevap veriyoruz.",
    "introCta": "Kurumsal Yapımız",
    "introAlt": "OmaFil üretim tesisi",
    "statsKicker": "Üretim Gücümüz",
    "statsTitle": "Rakamlarla OmaFil",
    "statsLead": "Yıllık üretimimiz, modern tesislerimiz ve küresel ticaret ağımızla tekstil sektörüne değer katıyoruz.",
    "statsItems": [
        {"value": "13.000", "unit": "Ton/Yıl", "label": "Üretim"},
        {"value": "40.000+", "unit": "m²", "label": "Üretim Alanı"},
        {"value": "1.000+", "unit": "Mutlu", "label": "Müşteri"},
        {"value": "61+", "unit": "Ülkeye", "label": "İhracat"},
    ],
    "sustainKicker": "Geleceğe Karşı Sorumluluğumuz",
    "sustainTitle": "Sürdürülebilir Endüstriyel İplik Üretimi",
    "sustainLead": "Üretimimizin merkezinde sürdürülebilirlik var: çatı üstü güneş enerjisi, geri dönüştürülmüş iplik ve kaynak verimli süreçlerle çevresel etkimizi azaltıyoruz.",
    "energyTitle": "Yenilenebilir Enerji",
    "energyText": "Çatı üstü GES ile temiz enerji.",
    "productionTitle": "Sorumlu Üretim",
    "productionText": "Kaynak verimli, çevreye duyarlı süreçler.",
    "sustainCta": "Sürdürülebilirlik Yaklaşımımız",
    "plant": "OmaFil Üretim Tesisi",
    "plantText": "Üretimde kaliteyi yenilenebilir enerji yatırımlarıyla destekliyoruz.",
    "techKicker": "Çevreci Teknolojiler",
    "techTitle": "Sürdürülebilir İplik Çözümlerimiz",
    "recycleTitle": "Recycle İplikler",
    "recycleText": "Geri dönüştürülmüş kaynaklardan geliştirilen çevre dostu iplik çözümleri.",
    "biobased": "Bio-bazlı Polyamid İplik",
    "biobasedText": "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik.",
    "dopeDyed": "Dope Dyed",
    "waterlessText": "Su tüketimini azaltmaya odaklanan yenilikçi susuz boyama teknolojisi.",
    "sustainAlt": "Güneş panelleriyle kaplı OmaFil üretim tesisi",
}

hubs_copy = {
    "productsKicker": "Ürünlerimiz",
    "productsTitle": "İplik portföyümüz",
    "productsLead": "Naylon 6, Naylon 6,6 ve polyester filament + gipe hatları. Specs için ürüne tıklayın; teklif veya numune için iletişime geçin.",
    "productsAll": "Tümü",
    "productsSoon": "Görsel yakında",
    "productsQuote": "Teklif al",
    "productsQuoteLine": "Teklif veya numune için",
    "blogTitle": "Yazılar",
    "blogLead": "Tesis, ürün ve üretim üzerine yazılar.",
    "blogEmpty": "Yazılar yakında burada yayınlanacak.",
    "corporateKicker": "Kurumsal",
    "corporateNav": "Kurumsal sayfalar",
    "corporateHubTitle": "Kurumsal",
    "corporateHubLead": "Şirketimiz, tesisimiz, sürdürülebilirlik yaklaşımımız ve insan kaynakları.",
    "aboutSummary": "Kuruluş hikâyesi ve şirket yapısı.",
    "factorySummary": "Tokat–Erbaa gipe iplik üretim tesisi.",
    "sustainSummary": "Enerji, geri dönüşüm ve sorumlu üretim.",
    "careersSummary": "Çalışma anlayışı ve başvuru.",
    "view": "İncele",
}

about_copy = {
    "growthBefore": "Büyüme",
    "growthAccent": "hikâyemiz",
    "offices": "İletişim noktalarımız",
    "map": "Haritada aç",
    "statsAria": "OmaFil rakamları",
    "stats": [
        {"title": "40.000 m² Üretim Alanı", "subtitle": "Tokat–Erbaa üretim tesisi"},
        {"title": "13.000 Ton", "subtitle": "Yıllık üretim"},
        {"title": "#1 Avrupa’da En Büyük", "subtitle": "Gipe iplik üretim tesisi"},
        {"title": "%100 Yenilenebilir Enerji", "subtitle": "Sürdürülebilir üretim hedefi"},
    ],
    "focus": ["GRS Sertifikalı", "Yenilenebilir Enerji", "Sıfır Atık Hedefi"],
    "sustainKicker": "Sürdürülebilirlik",
    "sustainBefore": "Geleceğe",
    "sustainAccent": "Sorumlu",
    "sustainAfter": "Yaklaşım",
    "sustainP1": "Üretim süreçlerimizin merkezine sürdürülebilirliği koyuyoruz. Çatı üstü güneş enerjisi yatırımlarımız ve GRS sertifikalı geri dönüştürülmüş iplik çözümlerimizle çevresel etkimizi azaltmayı hedefliyoruz.",
    "sustainP2": "Kaynak verimliliği, sorumlu üretim ve döngüsel ekonomi ilkeleri; OmaFil’in kurumsal kimliğinin ayrılmaz parçasıdır.",
    "sustainLink": "Sürdürülebilirlik sayfasına git",
    "gesLink": "GES — güneş enerji sistemi",
    "recycledTitle": "Recycled İplik",
    "recycledText": "Geri dönüştürülmüş kaynaklardan geliştirilen iplik çözümlerimizle döngüsel ekonomiyi üretimimize taşıyoruz. Kalite standartlarımızdan ödün vermeden çevre dostu alternatifler sunuyoruz.",
    "grs": "GRS uyumlu üretim",
    "certs": "Sertifikalar",
    "milestones": [
        {"year": "1999", "title": "Kuruluş", "text": "İstanbul Sultanhamam’da iplik ticaretiyle başladık."},
        {"year": "2000", "title": "İhracat Başlangıcı", "text": "Yurtdışı bağlantılarımızı kurduk."},
        {"year": "2013", "title": "İlk Tesis", "text": "İlk üretim tesisimizi kurduk."},
        {"year": "2021", "title": "Gipe Tesisi", "text": "Tokat–Erbaa’da gipe iplik tesisini hayata geçirdik."},
        {"year": "2025", "title": "Tekstüre Tesisi", "text": "Tekstüre üretim tesisini devreye aldık."},
        {"year": "2026", "title": "POY - FDY Tesisi", "text": "POY ve FDY üretim tesisini kurduk."},
        {"year": "2026", "title": "Gipe Tesisi Kapasite Artışı", "text": "Gipe tesisinde kapasiteyi artırdık."},
    ],
}

factory_copy = {
    "headline": "Yıllık 13.000 Ton Kapasiteyle Avrupa'nın Zirvesinde",
    "intro": "Tokat Erbaa Organize Sanayi Bölgesi'nde faaliyet gösteren tesisimiz, yıllık 13.000 ton üretim kapasitesiyle Avrupa'nın en büyük gipe iplik üretim tesisi unvanını taşıyor. Naylon 6, Naylon 6,6 ve polyester gipe iplik hatlarında ürettiğimiz yüksek katma değerli ürünlerle global tekstil endüstrisine hizmet veriyoruz.\n\nBünyesinde barındırdığı Ar-Ge merkeziyle sadece üretmekle kalmıyor, geleceğin iplik teknolojilerini de geliştiriyoruz. Tesisimiz bölgeye önemli bir istihdam kaynağı oluştururken, çatımıza kurduğumuz güneş enerjisi sistemiyle üretimimizin enerji ihtiyacının bir kısmını temiz kaynaklardan karşılıyoruz.",
    "sinceYear": "1999",
    "since": "Yılından beri sektörde öncülük ediyoruz",
    "sinceBody": "Oma Polimer A.Ş.’nin çeyrek asra yaklaşan tecrübesini arkasına alan OmaFil, polimer üretiminde yenilikçi ve sürdürülebilir çözümler sunarak sektörün geleceğini inşa ediyor. Modern tesislerimizde, küresel standartlarda kalite ve süreklilik sağlıyoruz.",
    "tabsAria": "Kurumsal yön",
    "tabs": [
        {"title": "Misyon", "text": "Polimer endüstrisinin ihtiyaç duyduğu yüksek kaliteli ve teknik iplikleri, çevre dostu üretim yöntemleriyle sunmak. Müşterilerimizin üretim süreçlerine değer katan, sürdürülebilir ve inovatif çözümler geliştirmek."},
        {"title": "Tarihçe", "text": "1999 yılında tekstil dünyasına adım atan grubumuz, geçen yıllar içinde teknolojiye ve insana yatırım yaparak istikrarlı bir şekilde büyüdü. OMA Tekstil bünyesinde edinilen derin bilgi birikimi, bugün OmaFil’in üretim gücüne dönüşüyor."},
        {"title": "Vizyon", "text": "Sentetik iplik üretiminde teknolojiyi ve sürdürülebilirliği odağına alan, dünya çapında tercih edilen lider bir marka olmak. İnovatif Ar-Ge çalışmalarımızla tekstilin geleceğine yön veren çözümler üretmek."},
    ],
    "galleryTitle": "Fabrikamız",
    "galleryBody": "Modern teknoloji ve global standartlarla inşa edilen tesisimiz, yüksek üretim kapasitesiyle tekstil sektörünün güvenilir tedarik noktasıdır. Geniş altyapımız ve çevre dostu enerji politikalarımızla, sürdürülebilir büyümeyi destekliyoruz.",
    "bandTitle": "Üretim Bandı",
    "bandBody": "Naylon 6 ve 6,6 iplik üretiminde son teknoloji makine parkurumuzla hata payını minimize ediyoruz. Her aşamada uyguladığımız hassas kalite kontrol süreçleri sayesinde, yüksek mukavemetli ve uzun ömürlü iplikler üretiyoruz.",
    "bandMore": "Daha fazlasını göster",
    "bandLess": "Daha az göster",
    "map": "Tesisi haritada aç",
    "labKicker": "Kalite Kontrol",
    "labTitleBefore": "Kalitenin Ölçüldüğü Yer:",
    "labTitleAccent": "Laboratuvarımız",
    "labBody": "Fabrikamızdaki laboratuvarda, gelen POY filamentten bitmiş ipliğe kadar her aşamayı ölçümle doğruluyoruz. Denye, büküm, mukavemet ve uzama değerlerini kontrol ediyor, filament düzgünlüğünü analiz ediyoruz.\n\nViskozite ölçümüyle polimer kalitesini, yağ testiyle iplik üzerindeki finish oranını takip ediyoruz. Numuneleri boyama testlerine alıyor, UV ışık kabinimizde bobinleri ışık altındaki performansları açısından sınıyoruz.\n\nSonuç: her partide aynı kalite, her bobinde aynı performans.",
    "labMarks": [
        {"title": "Hassas", "text": "Analiz"},
        {"title": "Modern", "text": "Laboratuvar"},
        {"title": "Sürekli", "text": "Kalite"},
    ],
}

sustain_copy = {
    "worldAlt": "Orman kaplı dünya görseli",
    "whyBefore": "Neden",
    "whyAccent": "sürdürülebilirlik önemli",
    "why": [
        "Sanayi devrimiyle büyüyen enerji talebi, petrol ve kömür gibi yenilenemeyen kaynakların yoğun kullanımına yol açtı. Hızlı sanayileşme ve kentleşme hava, su ve toprak kirliliğini artırdı; biyoçeşitlilik kaybı, toprak kaybı ve çölleşmeyi derinleştirdi.",
        "Her canlı, diğer canlı ve cansızlarla alışveriş içindeki bir ekosistemin parçasıdır. Bir parça zarar görürse etki başka yerde görünür. Doğanın yenilenme hızını aşmadan, dengeyi bozmadan hareket etmek zorundayız.",
    ],
    "principles": [
        {"title": "Kaynakları akılcı kullanmak", "text": "Çevre ve doğadaki kaynakların tükenebilir olduğu bilinciyle üretimde verimliliği esas alırız. Ekosistemlerin bütünlüğü ve esnekliği korunur."},
        {"title": "Ekonomik büyüme + çevre dengesi", "text": "Çevreye zarar vermeden, toplumları refaha kavuşturacak ekonomik büyümeyi hedefleriz. Mal ve hizmet üretimi artarken insan refahı yükselir."},
        {"title": "Şirket ve toplumsal çıkar birliği", "text": "Sadece ekonomik büyüme değil; sosyal ve çevre konuları da yönetim anlayışımızın parçasıdır. Şirket çıkarları toplumsal çıkarlarla çatışmaz."},
    ],
    "yarnKicker": "Çevreci teknolojiler",
    "yarnTitle": "Sürdürülebilir iplikler",
    "yarnLead": "Daha iyi bir dünya için sosyal ve çevresel sürdürülebilirliği tüm üretim süreçlerine dahil eder.",
    "yarns": [
        {"title": "Recycle İplikler", "text": "Geri dönüştürülmüş kaynaklardan geliştirilen çevre dostu iplik çözümleri. 2023’te GRS belgesi ile üretim süreçlerimiz belgelendi."},
        {"title": "Bio-bazlı Polyamid İplik", "text": "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik. Performanstan ödün vermeden daha düşük çevresel etki."},
        {"title": "Dope Dyed", "text": "Su tüketimini azaltmaya odaklanan yenilikçi susuz boyama teknolojisi. Kaynak tasarrufu üretim hattının içinde başlar."},
    ],
    "certs": "Sertifikalar",
    "gesKicker": "Güneş enerji sistemi",
    "gesTitle": "Geleceğe değer katıyor, üretim enerjisini güneşten alıyoruz",
    "gesP": "Bugünün ihtiyaçları için kalite üretmenin yanında daha temiz bir dünya bırakmayı sorumluluk görüyoruz. Bu vizyonla tesis çatılarını güneş enerji sistemi (GES) ile donattık.\n\nFabrikada her üretim koşusunun arkasında artık güneşin temiz enerjisi var.",
    "gesItems": [
        {"title": "%100 temiz enerji hedefi", "text": "Üretim hatlarımızda kullanılan elektriğin büyük bir kısmını, doğrudan çatımızdaki yüksek verimli güneş panellerinden elde ediyoruz."},
        {"title": "Daha az karbon ayak izi", "text": "Fosil yakıtlara bağımlılığı azaltarak her yıl binlerce ağacın doğaya sağladığı oksijene eşdeğer karbon tasarrufu sağlamayı hedefliyoruz."},
        {"title": "Yeşil sanayi öncülüğü", "text": "Sektörümüzde sürdürülebilir enerji dönüşümüne öncülük ederek gelecek nesillere daha yaşanabilir bir dünya bırakmayı amaçlıyoruz."},
    ],
    "gesLink": "GES sayfasına git",
    "plantKicker": "OmaFil üretim tesisi",
    "plantText": "Üretim kalitesini yenilenebilir enerji yatırımıyla destekliyoruz.",
    "plantAlt": "Güneş panelleriyle kaplı OmaFil üretim tesisi",
}

careers_copy = {
    "applyTitle": "Başvuru",
    "applyLead": "Formu doldurun, CV’nizi PDF yükleyin. Başvurunuz doğrudan İK ekibine iletilir; size kısa bir onay e-postası gider.",
    "principles": [
        "Adil ve şeffaf işe alım",
        "İş sağlığı ve güvenliği",
        "Eğitim ve kariyer gelişimi",
        "Eşitlik ve etik çalışma",
    ],
}

ges_copy = {
    "kicker": "Güneş enerji sistemi",
    "title": "Güneş Enerji Sistemimiz",
    "subtitle": "Elazığ arazi GES ve Erbaa çatı üstü GES ile üretimi güneşten besliyoruz",
    "paragraphs": "OmaFil olarak yalnızca kaliteli iplik üretmiyoruz; enerjiyi de yenilenebilir kaynaklardan sağlıyoruz. Portföyümüzde Elazığ Kovancılar’da iki arazi GES (OMA 1 Hacısam, OMA 2 Kavak) ve Tokat Erbaa üretim tesisimizde iki çatı üstü GES bulunuyor.\n\nToplam kurulu gücümüz 6,76 MWp. Günlük üretimimiz arazi ve çatı üstü sistemleriyle birlikte onlarca megawatt-saat bandında; karbon ayak izimizi azaltarak yeşil sanayiye katkı sunuyoruz.",
    "total": "Toplam",
    "panels": "panel",
    "imageAlt": "OmaFil Erbaa çatı üstü GES — Oma Polimer tesisi",
    "respectTitle": "Doğaya saygılı, sürdürülebilir üretim",
    "respectText": "Teknolojiyi ve yenilikçi yatırımları işimizin merkezine koyarken çevre sorumluluğumuzu unutmuyoruz. Arazi ve çatı üstü GES yatırımlarımızla karbon salınımını azaltıyor, ekolojik dengeye katkı sağlıyoruz.",
    "pillars": [
        {"title": "Arazi + çatı üstü GES", "text": "Elazığ’da 5,2 MWp arazi santrali; Erbaa fabrika çatısında 1,56 MWp. İki coğrafyada, aynı sürdürülebilirlik hedefi."},
        {"title": "Daha az karbon ayak izi", "text": "Ürettiğimiz her kilowatt-saat, fosil kaynaklı emisyonu azaltır. Sayaçlarımız uygulama ve tesis verilerine dayanır."},
        {"title": "Yeşil sanayi öncülüğü", "text": "Kendi enerjimizi üreterek tekstil üretiminde temiz enerji dönüşümüne örnek olmayı hedefliyoruz."},
    ],
    "ctaTitle": "Sürdürülebilir üretim yaklaşımımız",
    "ctaText": "GES yatırımlarımız; recycle iplik ve sorumlu üretim anlayışımızın parçasıdır.",
    "sustainCta": "Sürdürülebilirlik",
    "contactCta": "İletişim",
    "sitesTitle": "Tesislerimiz",
    "sitesLead": "Elazığ Kovancılar’da iki arazi GES ve Tokat Erbaa fabrika çatısında iki çatı üstü GES. Toplam kurulu güç 6,76 MWp.",
    "fieldHeading": "Elazığ — arazi GES",
    "roofHeading": "Erbaa — çatı üstü GES",
}

contact_page = {
    "kicker": "İletişim",
    "title": "Bize ulaşın",
    "lead": "Numune, teklif veya genel sorularınız için mail atabilir ya da bizi arayabilirsiniz.",
    "formTitle": "Mesaj gönderin",
    "formLead": "Formu doldurun; mesajınız doğrudan bize ulaşır.",
    "quick": "Hızlı iletişim",
    "quickLead": "Doğrudan arayın veya e-posta atın.",
    "phone": "Telefon",
    "email": "E-posta",
    "social": "Sosyal",
    "socialLead": "Güncel üretim ve marka paylaşımları.",
    "addresses": "Adreslerimiz",
    "mapsNote": "Her konum Google Maps’te açılır.",
    "openMap": "Haritada aç",
}


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "home.yaml").write_text(
        "introImage: /images/corporate/factory.webp\n"
        "sustainImage: /images/ges/erbaa-cati-1/aerial.webp\n"
        + write_copy_block(home_copy),
        encoding="utf-8",
    )
    (ROOT / "hubs.yaml").write_text(write_copy_block(hubs_copy), encoding="utf-8")
    (ROOT / "about-sections.yaml").write_text(
        write_copy_block(about_copy), encoding="utf-8"
    )
    (ROOT / "factory-sections.yaml").write_text(
        write_copy_block(factory_copy), encoding="utf-8"
    )
    (ROOT / "sustain-sections.yaml").write_text(
        write_copy_block(sustain_copy), encoding="utf-8"
    )
    (ROOT / "careers-sections.yaml").write_text(
        write_copy_block(careers_copy), encoding="utf-8"
    )
    (ROOT / "ges.yaml").write_text(
        "heroImage: /images/ges/ges-hero.webp\n"
        "bodyImage: /images/ges/erbaa-cati-1/aerial.webp\n"
        + write_copy_block(ges_copy),
        encoding="utf-8",
    )
    print("ok")


if __name__ == "__main__":
    main()
