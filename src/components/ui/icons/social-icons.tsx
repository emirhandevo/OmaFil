// lucide-react marka ikonlarını kaldırdığı için (Instagram/LinkedIn/YouTube)
// bu üçünü inline SVG olarak kendimiz tanımlıyoruz.
// className prop'u lucide ikonlarıyla aynı şekilde çalışsın diye eklendi.

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12c0-2.4-.2-3.7-.5-4.4a3 3 0 0 0-2.1-2.1C18 5 12 5 12 5s-6 0-7.4.5A3 3 0 0 0 2.5 7.6C2.2 8.3 2 9.6 2 12s.2 3.7.5 4.4a3 3 0 0 0 2.1 2.1C6 19 12 19 12 19s6 0 7.4-.5a3 3 0 0 0 2.1-2.1c.3-.7.5-2 .5-4.4Zm-12 3V9l5 3-5 3Z" />
    </svg>
  );
}