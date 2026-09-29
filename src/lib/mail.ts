import { headers } from "next/headers";
import { Resend } from "resend";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/locales";

/** İstek IP’si (rate limit için) */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return headerList.get("x-real-ip") ?? "unknown";
}

function isPlaceHolderSecret(secret: string): boolean {
  return /secret_key|AAAAAAA|xxxxxxxx|your_/i.test(secret);
}

/** Cloudflare Turnstile siteverify */
export async function verifyTurnstile(
  token:string,
  ip: string,
): Promise<boolean> {
  const secret = (process.env.TURNSTILE_SECRET_KEY ?? "").trim();

  // Anahtar yoksa yalnızca yerel geliştirmede geç. Canlıda asla
  if (!secret || isPlaceHolderSecret(secret)) {
    return process.env.NODE_ENV === "development";
  }

  if (token === "dev-bypass") return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip !== "unknown") body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {method: "POST", body},
  );

  if (!res.ok) return false;
  const data = (await res.json()) as {success?: boolean};
  return data.success === true;
}

export function getMailConfig():
  | { ok: true; apiKey: string; to: string; from: string }
  | { ok: false } {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "OmaFil <onboarding@resend.dev>";

  if (!apiKey || !to) return { ok: false };
  return { ok: true, apiKey, to, from };
}

export function createResend(apiKey: string) {
  return new Resend(apiKey);
}

/** Resend hata metnini kullanıcıya anlaşılır hale getir (teknik detay yok) */
export function friendlyResendError(
  error: {
    message?: string;
    name?: string;
  },
  locale: Locale = "tr",
): string {
  const copy = getUi(locale).form;
  const raw = (error.message ?? "").toLowerCase();

  // Teknik detay console’da kalsın; kullanıcıya sade mesaj
  if (error.message) {
    console.error("Resend:", error.message);
  }

  if (
    raw.includes("verify a domain") ||
    raw.includes("only send testing emails") ||
    raw.includes("own email address")
  ) {
    return copy.mailDomain;
  }

  if (raw.includes("invalid") && raw.includes("api")) {
    return copy.mailFail;
  }

  return copy.mailFail;
}
