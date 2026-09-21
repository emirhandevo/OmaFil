"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contact } from "@/config/site";

/**
 * API yok. Gönder mail istemcisini açar (mailto).
 * Formspree / kendi API gelince burası değişir.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const subject = encodeURIComponent(`OmaFil iletişim — ${name || "Ziyaretçi"}`);
    const body = encodeURIComponent(
      [
        `Ad Soyad: ${name}`,
        `E-posta: ${email}`,
        `Telefon: ${phone || "—"}`,
        "",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Ad Soyad</span>
          <Input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 px-3"
            placeholder="Adınız"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">E-posta</span>
          <Input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 px-3"
            placeholder="ornek@firma.com"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Telefon</span>
        <Input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-11 px-3"
          placeholder="+90 …"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Mesajınız</span>
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Sipariş, numune veya genel soru…"
          className="w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
      </label>

      <button
        type="submit"
        className={buttonVariants({
          size: "lg",
          className: "h-11 w-full sm:w-auto",
        })}
      >
        Mesajı Gönder
        <ArrowRight aria-hidden="true" />
      </button>

      <p className="text-xs leading-5 text-muted-foreground">
        Gönder’e basınca e-posta uygulamanız açılır. Mesaj {contact.email}{" "}
        adresine gider.
      </p>
    </form>
  );
}
