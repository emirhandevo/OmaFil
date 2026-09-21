"use client";

import { useRef, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { KvkkModal } from "@/components/sections/kvkk-modal";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  contactFormSchema,
  productGroups,
  type ContactFormValues,
} from "@/lib/schemas/contact";
import { sanitizePhoneInput } from "@/lib/phone";

/** Gerçek Cloudflare key’i yoksa (boş / örnek placeholder) widget gösterme */
function resolveTurnstileSiteKey(): string {
  const raw = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
  if (!raw) return "";
  if (/site_key|AAAAAAA|xxxxxxxx|your_/i.test(raw)) return "";
  return raw;
}

const turnstileSiteKey = resolveTurnstileSiteKey();
const turnstileEnabled = turnstileSiteKey.length > 0;

const fieldClass =
  "w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 aria-invalid:border-destructive dark:bg-input/30";

/**
 * İletişim formu — RHF + Zod → server action (Resend).
 * Turnstile + honeypot spam koruması.
 */
export function ContactForm() {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [kvkkOpen, setKvkkOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      kvkk: false,
      website: "",
      // Turnstile yokken token zorunluluğunu bypass et
      turnstileToken: turnstileEnabled ? "" : "dev-bypass",
    },
  });

  function onSubmit(values: ContactFormValues) {
    setFormError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await submitContact(values);

      if (!result.ok) {
        if (result.fieldErrors) {
          for (const [key, messages] of Object.entries(result.fieldErrors)) {
            const message = messages?.[0];
            if (message) {
              setError(key as keyof ContactFormValues, { message });
            }
          }
        }
        setFormError(result.error);
        turnstileRef.current?.reset();
        setValue("turnstileToken", turnstileEnabled ? "" : "dev-bypass");
        return;
      }

      setSuccess(true);
      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        // select “Seçiniz” için boş string (submit’te zod yakalar)
        productGroup: "" as ContactFormValues["productGroup"],
        message: "",
        kvkk: false,
        website: "",
        turnstileToken: turnstileEnabled ? "" : "dev-bypass",
      });
      turnstileRef.current?.reset();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative space-y-4"
      noValidate
    >
      {/* Honeypot — ekran okuyucu ve kullanıcı görmez */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Ad Soyad</span>
          <Input
            required
            autoComplete="name"
            className="h-11 px-3"
            placeholder="Adınız"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <span className="block text-xs text-destructive">{errors.name.message}</span>
          )}
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">E-posta</span>
          <Input
            required
            type="email"
            autoComplete="email"
            className="h-11 px-3"
            placeholder="ornek@firma.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="block text-xs text-destructive">{errors.email.message}</span>
          )}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">
            Telefon <span className="font-normal text-muted-foreground">(opsiyonel)</span>
          </span>
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="h-11 px-3"
            placeholder="+90 (212) 555 0000"
            aria-invalid={!!errors.phone}
            {...register("phone", {
              onChange: (e) => {
                e.target.value = sanitizePhoneInput(e.target.value);
              },
            })}
          />
          {errors.phone && (
            <span className="block text-xs text-destructive">{errors.phone.message}</span>
          )}
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">
            Firma Adı <span className="font-normal text-muted-foreground">(opsiyonel)</span>
          </span>
          <Input
            autoComplete="organization"
            className="h-11 px-3"
            placeholder="Firma adınız"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
          {errors.company && (
            <span className="block text-xs text-destructive">{errors.company.message}</span>
          )}
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Talep türü</span>
        <select
          className={`${fieldClass} h-11`}
          aria-invalid={!!errors.productGroup}
          defaultValue=""
          {...register("productGroup")}
        >
          <option value="" disabled>
            Seçiniz
          </option>
          {productGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        {errors.productGroup && (
          <span className="block text-xs text-destructive">
            {errors.productGroup.message}
          </span>
        )}
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Mesajınız</span>
        <textarea
          required
          rows={5}
          placeholder="Sipariş, numune veya genel soru…"
          className={fieldClass}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <span className="block text-xs text-destructive">{errors.message.message}</span>
        )}
      </label>

      <Controller
        name="kvkk"
        control={control}
        render={({ field }) => (
          <div className="flex items-start gap-3 text-sm leading-6">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              ref={field.ref}
              id="kvkk-consent"
              className="mt-1 size-4 shrink-0 cursor-pointer rounded border-input accent-[var(--brand-orange,#f19000)]"
            />
            <p className="text-muted-foreground">
              <button
                type="button"
                onClick={() => setKvkkOpen(true)}
                className="font-medium text-foreground underline decoration-brand-orange/60 underline-offset-2 transition-colors hover:text-brand-orange hover:decoration-brand-orange"
              >
                KVKK Aydınlatma Metni
              </button>
              <label htmlFor="kvkk-consent" className="cursor-pointer">
                ’ni okudum ve kişisel verilerimin iletişim talebim kapsamında
                işlenmesini kabul ediyorum.
              </label>
            </p>
          </div>
        )}
      />
      {errors.kvkk && (
        <span className="block text-xs text-destructive">{errors.kvkk.message}</span>
      )}

      <KvkkModal open={kvkkOpen} onClose={() => setKvkkOpen(false)} />

      {/* Turnstile — gerçek key yoksa (DNS/Cloudflare sonra) atlanır */}
      {turnstileEnabled ? (
        <div className="pt-1">
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            options={{ theme: "auto", size: "flexible" }}
            onSuccess={(token) =>
              setValue("turnstileToken", token, { shouldValidate: true })
            }
            onExpire={() => setValue("turnstileToken", "")}
            onError={() => setValue("turnstileToken", "")}
          />
          {errors.turnstileToken && (
            <span className="mt-2 block text-xs text-destructive">
              {errors.turnstileToken.message}
            </span>
          )}
        </div>
      ) : null}

      {success && (
        <p
          role="status"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
        >
          Mesajınız alındı, en kısa sürede dönüş yapacağız.
        </p>
      )}

      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={buttonVariants({
          size: "lg",
          className: "h-11 w-full sm:w-auto",
        })}
      >
        {pending ? (
          <>
            Gönderiliyor
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          </>
        ) : (
          <>
            Mesajı Gönder
            <ArrowRight aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs leading-5 text-muted-foreground">
        Gönder’e basınca mesajınız doğrudan OmaFil’e iletilir; ayrıca size kısa
        bir onay e-postası gider.
      </p>
    </form>
  );
}
