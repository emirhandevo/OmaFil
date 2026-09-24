import { z } from "zod";
import type { Ui } from "@/i18n/ui";
import { getUi } from "@/i18n/ui";
import { phonePattern } from "@/lib/phone";

/** Dropdown — talep tipi (OmaFil: nylon / polyester iplik) */
export const productGroups = [
  "Numune talebi",
  "İplik teklifi",
  "Genel bilgi",
  "Diğer",
] as const;

export type ProductGroup = (typeof productGroups)[number];

/**
 * Client + server aynı şemayı kullanır.
 * website = honeypot (bot doldurursa reddedilir)
 * turnstileToken = Cloudflare Turnstile yanıtı
 */
export function createContactFormSchema(m: Ui["form"]) {
  return z.object({
  name: z.string().trim().min(2, m.name),
  email: z.string().trim().email(m.email),
  phone: z.string().trim().regex(phonePattern, m.phone),
  company: z.string().trim(),
  productGroup: z.enum(productGroups, {
    message: m.group,
  }),
  message: z.string().trim().min(10, m.message),
  kvkk: z.boolean().refine((value) => value === true, {
    message: m.kvkk,
  }),
  /**
   * Honeypot — şemada reddetme; server action doluysa sessizce “ok” döner.
   * (Bot’a validasyon hatası göstermemek için)
   */
  website: z.string(),
  turnstileToken: z.string().min(1, m.turnstile),
});
}

export const contactFormSchema = createContactFormSchema(getUi("tr").form);

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Mail / aksiyon için honeypot ve token olmadan temiz veri */
export type ContactPayload = Omit<
  ContactFormValues,
  "website" | "turnstileToken" | "kvkk"
>;
