"use server";

import { render } from "@react-email/render";
import { CareersApplicationEmail } from "@/emails/careers-application";
import { CareersConfirmationEmail } from "@/emails/careers-confirmation";
import {
  createResend,
  friendlyResendError,
  getClientIp,
  getMailConfig,
  verifyTurnstile,
} from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { getLocale } from "@/i18n/get-locale";
import { getUi } from "@/i18n/ui";
import {
  createCareersFormSchema,
  CV_MAX_BYTES,
  type CareersPayload,
} from "@/lib/schemas/careers";

export type CareersActionResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function sanitizeFileName(name: string): string {
  const base = name.replace(/[^\w.\-ğıüşöçİĞÜŞÖÇ\s]/gi, "_").trim();
  return base.length > 0 ? base.slice(0, 120) : "cv.pdf";
}

function isPdfFile(file: File): boolean {
  const typeOk =
    file.type === "application/pdf" ||
    file.type === "application/x-pdf" ||
    file.type === "";
  const nameOk = file.name.toLowerCase().endsWith(".pdf");
  return nameOk && (typeOk || file.type === "");
}

/**
 * İK başvurusu — FormData (PDF ekli) → Resend attachment.
 */
export async function submitCareerApplication(
  formData: FormData,
): Promise<CareersActionResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    position: String(formData.get("position") ?? ""),
    message: String(formData.get("message") ?? ""),
    kvkk: formData.get("kvkk") === "true",
    website: String(formData.get("website") ?? ""),
    turnstileToken: String(formData.get("turnstileToken") ?? ""),
  };

  const locale = await getLocale();
  const form = getUi(locale).form;
  const parsed = createCareersFormSchema(form).safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: form.fix,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website.length > 0) {
    return { ok: true };
  }

  const cv = formData.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    return {
      ok: false,
      error: form.cvRequired,
      fieldErrors: { cv: [form.cvMissing] },
    };
  }

  if (!isPdfFile(cv)) {
    return {
      ok: false,
      error: form.cvPdf,
      fieldErrors: { cv: [form.cvPdf] },
    };
  }

  if (cv.size > CV_MAX_BYTES) {
    return {
      ok: false,
      error: form.cvSize,
      fieldErrors: { cv: [form.cvSize] },
    };
  }

  const ip = await getClientIp();
  const limited = rateLimit(`careers:${ip}`, 3, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      error: form.rate(limited.retryAfterSec),
    };
  }

  const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!turnstileOk) {
    return {
      ok: false,
      error: form.captcha,
    };
  }

  const mail = getMailConfig();
  if (!mail.ok) {
    return {
      ok: false,
      error: form.mailDown,
    };
  }

  const payload: CareersPayload = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    position: parsed.data.position,
    message: parsed.data.message,
  };

  const fileName = sanitizeFileName(cv.name);
  const finalName = fileName.toLowerCase().endsWith(".pdf")
    ? fileName
    : `${fileName}.pdf`;
  // Resend dokümantasyonu: local dosya için base64 string
  const contentBase64 = Buffer.from(await cv.arrayBuffer()).toString("base64");
  const resend = createResend(mail.apiKey);

  try {
    const notifyHtml = await render(
      CareersApplicationEmail({ ...payload, fileName: finalName }),
    );
    const confirmHtml = await render(
      CareersConfirmationEmail({ name: payload.name }),
    );

    const notify = await resend.emails.send({
      from: mail.from,
      to: mail.to,
      replyTo: payload.email,
      subject: `OmaFil iş başvurusu — ${payload.name}${
        payload.position ? ` (${payload.position})` : ""
      }`,
      html: notifyHtml,
      attachments: [
        {
          filename: finalName,
          content: contentBase64,
        },
      ],
    });

    if (notify.error) {
      console.error("Resend careers notify error:", notify.error);
      return { ok: false, error: friendlyResendError(notify.error, locale) };
    }

    const confirm = await resend.emails.send({
      from: mail.from,
      to: payload.email,
      subject: "Başvurunuz alındı — OmaFil",
      html: confirmHtml,
    });

    if (confirm.error) {
      console.error("Resend careers confirmation error:", confirm.error);
    }

    return { ok: true };
  } catch (err) {
    console.error("submitCareerApplication error:", err);
    const message =
      err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.";
    return { ok: false, error: friendlyResendError({ message }, locale) };
  }
}
