"use client";

import type { ReactNode } from "react";

type MailLinkProps = {
  email: string;
  /** Yeni iletinin konu satırı. Boşsa sadece alıcı dolar. */
  subject?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Tıklanınca site içinde sayfa açmaz.
 * İşletim sisteminin mail uygulamasında bu adrese yeni ileti açar.
 */
export function MailLink({ email, subject, className, children }: MailLinkProps) {
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        // Varsayılan tıklama bazı önizleme tarayıcılarında yutuluyor.
        // Adresi elle vermek yeni ileti penceresini açar.
        event.preventDefault();
        window.location.href = href;
      }}
    >
      {children}
    </a>
  );
}
