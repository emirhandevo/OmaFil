"use server";

import { render } from "@react-email/render";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";
import { ContactNotificationEmail } from "@/emails/contact-notification";
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
  createContactFormSchema,
  type ContactFormValues,
  type ContactPayload,
} from "@/lib/schemas/contact";

export type ContactActionResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function toPayload(values: ContactFormValues): ContactPayload {
  return {
    name: values.name,
    email: values.email,
    phone: values.phone,
    company: values.company,
    productGroup: values.productGroup,
    message: values.message,
  };
}

/**
 * İletişim formu server action.
 * Zod validasyon → rate limit → Turnstile → Resend (bildirim + onay).
 */
export async function submitContact(
  raw: unknown,
): Promise<ContactActionResult> {
  const locale = await getLocale();
  const form = getUi(locale).form;
  const parsed = createContactFormSchema(form).safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: form.fix,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  const ip = await getClientIp();

  const limited = rateLimit(`contact:${ip}`, 3, 60_000);
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
    console.error("RESEND_API_KEY veya CONTACT_EMAIL_TO eksik");
    return {
      ok: false,
      error: form.mailDown,
    };
  }

  const payload = toPayload(parsed.data);
  const resend = createResend(mail.apiKey);

  try {
    const notifyHtml = await render(ContactNotificationEmail(payload));
    const confirmHtml = await render(
      ContactConfirmationEmail({ name: payload.name }),
    );

    const notify = await resend.emails.send({
      from: mail.from,
      to: mail.to,
      replyTo: payload.email,
      subject: `OmaFil iletişim — ${payload.name} (${payload.productGroup})`,
      html: notifyHtml,
    });

    if (notify.error) {
      console.error("Resend notify error:", notify.error);
      return { ok: false, error: friendlyResendError(notify.error, locale) };
    }

    const confirm = await resend.emails.send({
      from: mail.from,
      to: payload.email,
      subject: "Talebiniz alındı — OmaFil",
      html: confirmHtml,
    });

    if (confirm.error) {
      console.error("Resend confirmation error:", confirm.error);
    }

    return { ok: true };
  } catch (err) {
    console.error("submitContact error:", err);
    const message =
      err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.";
    return { ok: false, error: friendlyResendError({ message }, locale) };
  }
}
