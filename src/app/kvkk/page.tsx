import type { Metadata } from "next";
import { getLocale } from "@/i18n/get-locale";
import { pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

/** Footer’daki kalıcı aydınlatma. Form pencereleri aynı metni açar. */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const notice = getUi(locale).kvkkContact;
  return {
    title: notice.title,
    description: notice.subtitle,
    alternates: pageAlternates("/kvkk", locale),
  };
}

export default async function KvkkPage() {
  const locale = await getLocale();
  const ui = getUi(locale);
  const notices = [ui.kvkkContact, ui.kvkkCareers];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
        KVKK
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{ui.kvkkContact.title}</h1>
      <div className="mt-12 space-y-14">
        {notices.map((notice) => (
          <section key={notice.subtitle}>
            <h2 className="text-xl font-semibold">{notice.subtitle}</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              {notice.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
