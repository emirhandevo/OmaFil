import { z } from "zod";
import { phonePattern } from "@/lib/phone";

/** CV PDF üst sınırı — Vercel body limiti (~4.5MB) altında kalsın */
export const CV_MAX_BYTES = 4 * 1024 * 1024;

export const careersFormSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı"),
  email: z.string().trim().email("Geçerli bir e-posta girin"),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Telefon: rakam, +, () kullanabilirsiniz"),
  position: z.string().trim(),
  message: z.string().trim(),
  kvkk: z.boolean().refine((value) => value === true, {
    message: "Devam etmek için KVKK metnini onaylayın",
  }),
  website: z.string(),
  turnstileToken: z.string().min(1, "Güvenlik doğrulamasını tamamlayın"),
});

export type CareersFormValues = z.infer<typeof careersFormSchema>;

export type CareersPayload = Omit<
  CareersFormValues,
  "website" | "turnstileToken" | "kvkk"
>;
