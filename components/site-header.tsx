"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitch } from "@/components/language-switch";
import { localePath, siteContent, type Locale } from "@/lib/site-content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const content = siteContent[locale];
  const homePath = localePath(locale);
  const registerPath = localePath(locale, "register");

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href={homePath} aria-label={content.header.homeLabel}>
          <span className="wordmark-symbol" aria-hidden="true">Q</span>
          <span><strong>QIDDIYA</strong><small>奇地亞</small></span>
        </Link>
        <nav className="desktop-nav" aria-label={content.header.navLabel}>
          {content.navigation.map((item) => <Link key={item.href} href={localePath(locale, `#${item.href}`)}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitch locale={locale} zhHref="/" enHref="/en" />
          <Link className="header-register" href={registerPath}>
            {content.header.register} <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? content.header.close : content.header.open}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="mobile-nav" aria-label={content.header.mobileNavLabel}>
          {content.navigation.map((item) => (
            <Link key={item.href} href={localePath(locale, `#${item.href}`)} onClick={() => setIsOpen(false)}>
              {item.label}<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
          <Link className="mobile-register" href={registerPath} onClick={() => setIsOpen(false)}>
            {content.header.receive}<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
