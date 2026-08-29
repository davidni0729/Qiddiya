import Link from "next/link";
import type { Locale } from "@/lib/site-content";

export function LanguageSwitch({ locale, zhHref, enHref, tone = "dark" }: { locale: Locale; zhHref: string; enHref: string; tone?: "dark" | "light" }) {
  return (
    <nav className={`language-switch language-switch-${tone}`} aria-label={locale === "en" ? "Language" : "語言切換"}>
      <Link href={zhHref} lang="zh-Hant" aria-current={locale === "zh" ? "page" : undefined}>中</Link>
      <span aria-hidden="true" />
      <Link href={enHref} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
    </nav>
  );
}
