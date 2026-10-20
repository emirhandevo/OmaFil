"""Keystatic dil gruplarını mevcut TR içerikten doldurur."""
from __future__ import annotations

import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
LOCALES = ["tr", "en", "de", "fr", "es", "it", "pt", "nl", "ru", "ar", "zh"]

TAGLINE = {
    "tr": "Endüstriyel iplik üretiminde güvenilir çözüm ortağınız.",
    "en": "A reliable partner in industrial yarn production.",
    "de": "Ein verlässlicher Partner in der industriellen Garnproduktion.",
    "fr": "Un partenaire fiable dans la production de fil industriel.",
    "es": "Un socio fiable en la producción de hilo industrial.",
    "it": "Un partner affidabile nella produzione di filato industriale.",
    "pt": "Um parceiro fiável na produção de fio industrial.",
    "nl": "Een betrouwbare partner in industriële garenproductie.",
    "ru": "Надежный партнер в промышленном производстве пряжи.",
    "ar": "شريك موثوق في إنتاج الخيط الصناعي.",
    "zh": "工业纱线生产中的可靠伙伴。",
}

HOME_DESC = {
    "tr": "Endüstriyel iplik üretimi. Kurumsal katalog ve ürün portföyü.",
    "en": "Industrial yarn production. Company profile and yarn portfolio.",
    "de": "Industrielle Garnproduktion. Unternehmensprofil und Garnportfolio.",
    "fr": "Production de fil industriel. Présentation de l’entreprise et portefeuille de fils.",
    "es": "Producción de hilo industrial. Perfil de la empresa y portafolio de hilos.",
    "it": "Produzione di filato industriale. Profilo aziendale e portafoglio filati.",
    "pt": "Produção de fio industrial. Perfil da empresa e portefólio de fios.",
    "nl": "Industriële garenproductie. Bedrijfsprofiel en garenportfolio.",
    "ru": "Промышленное производство пряжи. Профиль компании и портфель пряжи.",
    "ar": "إنتاج خيط صناعي. ملف الشركة ومحفظة الخيوط.",
    "zh": "工业纱线生产。公司介绍与纱线组合。",
}

PLACES = {
    "tr": ["Genel Merkez", "Fabrika / Üretim Tesisi", "Fabrika Satış Noktası"],
    "en": ["Head office", "Factory / production plant", "Factory sales point"],
    "de": ["Hauptsitz", "Fabrik / Produktionswerk", "Fabrik-Verkaufsstelle"],
    "fr": ["Siège", "Usine / site de production", "Point de vente usine"],
    "es": ["Sede", "Fábrica / planta de producción", "Punto de venta de fábrica"],
    "it": ["Sede", "Fabbrica / stabilimento", "Punto vendita di fabbrica"],
    "pt": ["Sede", "Fábrica / unidade de produção", "Ponto de venda da fábrica"],
    "nl": ["Hoofdkantoor", "Fabriek / productielocatie", "Fabrieksverkooppunt"],
    "ru": ["Головной офис", "Фабрика / производство", "Точка продаж фабрики"],
    "ar": ["المقر", "المصنع / منشأة الإنتاج", "نقطة بيع المصنع"],
    "zh": ["总部", "工厂 / 生产厂", "工厂销售点"],
}


def ystr(value: str, indent: int) -> str:
    pad = " " * indent
    text = value.rstrip("\n")
    if "\n" not in text and len(text) < 88:
        return json.dumps(text, ensure_ascii=False)
    lines = "\n".join(f"{pad}  {line}" for line in text.split("\n"))
    return f">-\n{lines}"


def write_copy(copy: dict[str, dict[str, str]], indent: int) -> str:
    pad = " " * indent
    chunks = []
    for loc in LOCALES:
        row = copy.get(loc) or {}
        chunks.append(f"{pad}{loc}:")
        if not row:
            chunks.append(f"{pad}  title: \"\"")
            continue
        for key, val in row.items():
            chunks.append(f"{pad}  {key}: {ystr(val, indent + 2)}")
    return "\n".join(chunks) + "\n"


def fill_site() -> None:
    copy = {
        loc: {"description": HOME_DESC[loc], "footerTagline": TAGLINE[loc]}
        for loc in LOCALES
    }
    (ROOT / "content/settings/site.yaml").write_text(
        "copy:\n" + write_copy(copy, 2), encoding="utf-8"
    )
    print("site")


def fill_contact() -> None:
    def labels(i: int) -> str:
        lines = ["    labels:"]
        for loc in LOCALES:
            lines.append(f"      {loc}:")
            lines.append(f"        name: {ystr(PLACES[loc][i], 8)}")
        return "\n".join(lines) + "\n"

    yaml = f"""email: info@omafil.com
phones:
  - +90 212 438 72 20
  - +90 549 177 50 10
locations:
  - label: Genel Merkez
{labels(0)}    address: >-
      Oruçreis Mh. Tekstilkent Cd. Koza Plaza B-Blok 36.Kat Esenler - İSTANBUL -
      TÜRKİYE
    mapsUrl: https://maps.app.goo.gl/noytgx1FN82zjusr7
  - label: Fabrika / Üretim Tesisi
{labels(1)}    address: >-
      Kelkit Osb Mah. Beylikbükü Caddesi No:32/B Erbaa / TOKAT - TÜRKİYE
    mapsUrl: https://maps.app.goo.gl/BKCaFoiqjJ1MrKA57
  - label: Fabrika Satış Noktası
{labels(2)}    address: >-
      Terazidere Mah. Güneş Caddesi No:47 Bayrampaşa / İSTANBUL - TÜRKİYE
    mapsUrl: https://maps.app.goo.gl/Td8FrTfHGKjXswuZ8
instagram: https://www.instagram.com/omapolimer/
linkedin: https://www.linkedin.com/company/oma-iplik-a-s/posts/
youtube: https://www.youtube.com/@omaiplikanonimsirketiomafi8939
"""
    (ROOT / "content/settings/contact.yaml").write_text(yaml, encoding="utf-8")
    print("contact")


def parse_mdoc(path: pathlib.Path) -> tuple[str, str, str]:
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
    if not m:
        raise SystemExit(f"mdoc yok: {path}")
    fm, body = m.group(1), m.group(2).strip()
    title = re.search(r"^title: (.+)$", fm, re.M)
    desc_m = re.search(r"description: >-\n((?:  .+\n)+)", fm)
    desc = ""
    if desc_m:
        desc = " ".join(line.strip() for line in desc_m.group(1).splitlines())
    return (title.group(1).strip() if title else path.stem, desc, body)


def fill_pages() -> None:
    names = {
        "hakkimizda": "Hakkımızda",
        "fabrikamiz": "Fabrikamız",
        "surdurulebilirlik": "Sürdürülebilirlik",
        "insan-kaynaklari": "İnsan Kaynakları",
    }
    folder = ROOT / "content/pages"
    for slug, panel in names.items():
        mdoc = folder / f"{slug}.mdoc"
        title, desc, body = parse_mdoc(mdoc)
        copy = {loc: {} for loc in LOCALES}
        copy["tr"] = {"title": title, "description": desc, "body": body}
        yaml = f"title: {panel}\ncopy:\n{write_copy(copy, 2)}"
        (folder / f"{slug}.yaml").write_text(yaml, encoding="utf-8")
        mdoc.unlink()
        print("page", slug)


def fill_products() -> None:
    folder = ROOT / "content/products"
    for path in sorted(folder.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        data["copy"] = {
            "tr": {"label": data["label"], "summary": data["summary"]},
        }
        for loc in LOCALES:
            if loc == "tr":
                continue
            data["copy"][loc] = {"label": "", "summary": ""}
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("product", path.stem)


if __name__ == "__main__":
    fill_site()
    fill_contact()
    fill_pages()
    fill_products()
    print("ok")
