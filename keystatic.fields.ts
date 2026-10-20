import { fields } from "@keystatic/core";
import { localeFieldLabels, locales } from "./src/content/localized";

/** Aynı alanlar 11 dilde. Boş dil sitede sözlüğe, o da yoksa TR’ye düşer. */
export function localeGroups(makeFields: () => Parameters<typeof fields.object>[0]) {
  const shape: Record<string, ReturnType<typeof fields.object>> = {};
  for (const id of locales) {
    shape[id] = fields.object(makeFields(), { label: localeFieldLabels[id] });
  }
  return fields.object(shape, { label: "Metinler — her dil ayrı" });
}

export function t(label: string, multiline = false) {
  return fields.text({
    label,
    ...(multiline ? { multiline: true } : {}),
  });
}

export function titledText() {
  return fields.object({
    title: t("Başlık"),
    text: t("Metin", true),
  });
}
