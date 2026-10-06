"use client";

import { useRef, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitCareerApplication } from "@/app/actions/careers";
import { KvkkModal } from "@/components/sections/kvkk-modal";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createCareersFormSchema,
  CV_MAX_BYTES,
  type CareersFormValues,
} from "@/lib/schemas/careers";
import { useCopy, useLocale } from "@/components/i18n/locale-provider";
import { getUi } from "@/i18n/ui";
import { sanitizePhoneInput } from "@/lib/phone";

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
 * İK başvuru formu — PDF CV + Resend attachment.
 */
export function CareersApplicationForm() {
  const copy = useCopy();
  const locale = useLocale();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [kvkkOpen, setKvkkOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<CareersFormValues>({
    resolver: zodResolver(createCareersFormSchema(getUi(locale).form)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
      kvkk: false,
      website: "",
      turnstileToken: turnstileEnabled ? "" : "dev-bypass",
    },
  });

  function onSubmit(values: CareersFormValues) {
    setFormError(null);
    setCvError(null);
    setSuccess(false);

    if (!cvFile) {
      setCvError(copy.chrome.cvRequired);
      return;
    }
    if (!cvFile.name.toLowerCase().endsWith(".pdf")) {
      setCvError(copy.chrome.cvPdfOnly);
      return;
    }
    if (cvFile.size > CV_MAX_BYTES) {
      setCvError(copy.chrome.cvTooBig);
      return;
    }

    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("email", values.email);
    fd.set("phone", values.phone);
    fd.set("position", values.position);
    fd.set("message", values.message);
    fd.set("kvkk", values.kvkk ? "true" : "false");
    fd.set("website", values.website);
    fd.set("turnstileToken", values.turnstileToken);
    fd.set("cv", cvFile);

    startTransition(async () => {
      const result = await submitCareerApplication(fd);

      if (!result.ok) {
        if (result.fieldErrors) {
          for (const [key, messages] of Object.entries(result.fieldErrors)) {
            const message = messages?.[0];
            if (!message) continue;
            if (key === "cv") {
              setCvError(message);
              continue;
            }
            setError(key as keyof CareersFormValues, { message });
          }
        }
        setFormError(result.error);
        turnstileRef.current?.reset();
        setValue("turnstileToken", turnstileEnabled ? "" : "dev-bypass");
        return;
      }

      setSuccess(true);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      reset({
        name: "",
        email: "",
        phone: "",
        position: "",
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
      <div
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
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
          <span className="font-medium text-foreground">{copy.form.name}</span>
          <Input
            required
            autoComplete="name"
            className="h-11 px-3"
            placeholder={copy.form.namePh}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <span className="block text-xs text-destructive">
              {errors.name.message}
            </span>
          )}
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">{copy.form.email}</span>
          <Input
            required
            type="email"
            autoComplete="email"
            className="h-11 px-3"
            placeholder="ornek@mail.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="block text-xs text-destructive">
              {errors.email.message}
            </span>
          )}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">
            {copy.form.phone}{" "}
            <span className="font-normal text-muted-foreground">{copy.form.optional}</span>
          </span>
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="h-11 px-3"
            placeholder="+90 (212) 555 0000"
            {...register("phone", {
              onChange: (e) => {
                e.target.value = sanitizePhoneInput(e.target.value);
              },
            })}
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">
            {copy.chrome.position}{" "}
            <span className="font-normal text-muted-foreground">{copy.form.optional}</span>
          </span>
          <Input
            className="h-11 px-3"
            placeholder={copy.chrome.positionPh}
            {...register("position")}
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">
          {copy.chrome.coverNote}{" "}
          <span className="font-normal text-muted-foreground">{copy.form.optional}</span>
        </span>
        <textarea
          rows={4}
          placeholder={copy.chrome.coverNotePh}
          className={fieldClass}
          {...register("message")}
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">{copy.chrome.cv}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          className={`${fieldClass} cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-brand-orange/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-orange`}
          aria-invalid={!!cvError}
          onChange={(e) => {
            setCvError(null);
            setCvFile(e.target.files?.[0] ?? null);
          }}
        />
        <span className="block text-xs text-muted-foreground">
          {copy.chrome.cvHint}
          {cvFile ? ` ${copy.chrome.cvSelected} ${cvFile.name}` : ""}
        </span>
        {cvError && (
          <span className="block text-xs text-destructive">{cvError}</span>
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
              id="kvkk-careers"
              className="mt-1 size-4 shrink-0 cursor-pointer rounded border-input accent-[var(--brand-orange,#f19000)]"
            />
            <p className="text-muted-foreground">
              <button
                type="button"
                onClick={() => setKvkkOpen(true)}
                className="font-medium text-foreground underline decoration-brand-orange/60 underline-offset-2 transition-colors hover:text-brand-orange hover:decoration-brand-orange active:text-brand-orange active:decoration-brand-orange"
              >
                {copy.chrome.kvkk}
              </button>
              <label htmlFor="kvkk-careers" className="cursor-pointer">
                {copy.chrome.careersKvkk}
              </label>
            </p>
          </div>
        )}
      />
      {errors.kvkk && (
        <span className="block text-xs text-destructive">
          {errors.kvkk.message}
        </span>
      )}

      <KvkkModal
        open={kvkkOpen}
        onClose={() => setKvkkOpen(false)}
        notice={getUi(locale).kvkkCareers}
      />

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
        </div>
      ) : null}

      {success && (
        <p
          role="status"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
        >
          {copy.chrome.careersSent}
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
            {copy.form.sending}
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          </>
        ) : (
          <>
            {copy.chrome.careersSend}
            <ArrowRight aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
