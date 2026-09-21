import { z } from "zod";
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
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı"),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta girin"),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Telefon: rakam, +, () kullanabilirsiniz"),
  company: z.string().trim(),
  productGroup: z.enum(productGroups, {
    message: "Ürün grubu seçin",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olmalı"),
  kvkk: z.boolean().refine((value) => value === true, {
    message: "Devam etmek için KVKK metnini onaylayın",
  }),
  /**
   * Honeypot — şemada reddetme; server action doluysa sessizce “ok” döner.
   * (Bot’a validasyon hatası göstermemek için)
   */
  website: z.string(),
  turnstileToken: z
    .string()
    .min(1, "Güvenlik doğrulamasını tamamlayın"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Mail / aksiyon için honeypot ve token olmadan temiz veri */
export type ContactPayload = Omit<
  ContactFormValues,
  "website" | "turnstileToken" | "kvkk"
>;
