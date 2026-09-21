import { headers } from "next/headers";
import { Resend } from "resend";

/** İstek IP’si (rate limit için) */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return headerList.get("x-real-ip") ?? "unknown";
}

function isPlaceholderSecret(secret: string): boolean {
  return /secret_key|AAAAAAA|xxxxxxxx|your_/i.test(secret);
}

/** Cloudflare Turnstile siteverify */
export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<boolean> {
  const secret = (process.env.TURNSTILE_SECRET_KEY ?? "").trim();

  if (!secret || isPlaceholderSecret(secret)) {
    if (process.env.NODE_ENV === "development" || token === "dev-bypass") {
      return true;
    }
    return false;
  }

  if (token === "dev-bypass") return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip !== "unknown") body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );

  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
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

/** Resend hata metnini kullanıcıya anlaşılır hale getir */
export function friendlyResendError(error: {
  message?: string;
  name?: string;
}): string {
  const raw = (error.message ?? "").toLowerCase();

  if (
    raw.includes("verify a domain") ||
    raw.includes("only send testing emails") ||
    raw.includes("own email address")
  ) {
    return "Mail henüz test modunda: CONTACT_EMAIL_TO adresini Resend hesap mailiniz yapın (it@omafil.com) veya omafil.com domain’ini Resend’de doğrulayın.";
  }

  if (raw.includes("invalid") && raw.includes("api")) {
    return "Resend API anahtarı geçersiz. RESEND_API_KEY değerini kontrol edin.";
  }

  if (error.message && process.env.NODE_ENV === "development") {
    return error.message;
  }

  return "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.";
}
