import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitch } from "@/components/language-switch";
import { localePath, type Locale } from "@/lib/site-content";

export function LegalLayout({ locale, eyebrow, title, updated, zhHref, enHref, children }: { locale: Locale; eyebrow: string; title: string; updated: string; zhHref: string; enHref: string; children: React.ReactNode }) {
  const backLabel = locale === "en" ? "Back to Qiddiya" : "返回 Qiddiya";
  const updatedLabel = locale === "en" ? "Last updated" : "最後更新";

  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href={localePath(locale)}><ArrowLeft size={18} aria-hidden="true" />{backLabel}</Link>
        <div className="legal-header-actions"><LanguageSwitch locale={locale} zhHref={zhHref} enHref={enHref} tone="light" /><strong>QIDDIYA <span>奇地亞</span></strong></div>
      </header>
      <article className="legal-content">
        <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="legal-updated">{updatedLabel}: {updated}</p>
        <div className="legal-body">{children}</div>
      </article>
      <footer className="legal-footer">TIANYEN ORIGINAL FUTURE LIGHT & MUSIC IP</footer>
    </main>
  );
}
