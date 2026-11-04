import { z } from "zod";
import { phonePattern } from "@/lib/phone";
import type { FormMessages } from "@/lib/schemas/contact";

/** CV PDF üst sınırı — Vercel body limiti (~4.5MB) altında kalsın */
export const CV_MAX_BYTES = 4 * 1024 * 1024;

export function createCareersFormSchema(m: FormMessages) {
  return z.object({
    name: z.string().trim().min(2, m.name).max(80, m.name),
    email: z.string().trim().email(m.email),
    phone: z.string().trim().regex(phonePattern, m.phone),
    position: z.string().trim(),
    message: z.string().trim().max(1000, m.message),
    kvkk: z.boolean().refine((value) => value === true, {
      message: m.kvkk,
    }),
    website: z.string(),
    turnstileToken: z.string().min(1, m.turnstile),
  });
}

export type CareersFormValues = z.infer<ReturnType<typeof createCareersFormSchema>>;

export type CareersPayload = Omit<
  CareersFormValues,
  "website" | "turnstileToken" | "kvkk"
>;
