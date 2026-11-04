import { z } from "zod";
import type { Ui } from "@/i18n/ui";
import { phonePattern } from "@/lib/phone";

/** Doğrulama cümleleri. rate() fonksiyon; client'a sadece bu stringler gider. */
export type FormMessages = Pick<
  Ui["form"],
  "name" | "email" | "phone" | "group" | "message" | "kvkk" | "turnstile"
>;

export function pickFormMessages(form: Ui["form"]): FormMessages {
  return {
    name: form.name,
    email: form.email,
    phone: form.phone,
    group: form.group,
    message: form.message,
    kvkk: form.kvkk,
    turnstile: form.turnstile,
  };
}

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
export function createContactFormSchema(m: FormMessages) {
  return z.object({
  name: z.string().trim().min(2, m.name).max(80, m.name),
  email: z.string().trim().email(m.email),
  phone: z.string().trim().regex(phonePattern, m.phone),
  company: z.string().trim(),
  productGroup: z.enum(productGroups, {
    message: m.group,
  }),
  message: z.string().trim().min(10, m.message).max(1000, m.message),
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

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

/** Mail / aksiyon için honeypot ve token olmadan temiz veri */
export type ContactPayload = Omit<
  ContactFormValues,
  "website" | "turnstileToken" | "kvkk"
>;
