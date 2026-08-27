import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalLayout({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/"><ArrowLeft size={18} aria-hidden="true" />返回 Qiddiya</Link>
        <strong>QIDDIYA <span>奇地亞</span></strong>
      </header>
      <article className="legal-content">
        <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="legal-updated">最後更新：{updated}</p>
        <div className="legal-body">{children}</div>
      </article>
      <footer className="legal-footer">TIANYEN ORIGINAL FUTURE LIGHT & MUSIC IP</footer>
    </main>
  );
}
