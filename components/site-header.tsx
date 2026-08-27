"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "/#signal", label: "訊號" },
  { href: "/#experience", label: "體驗" },
  { href: "/#world", label: "視覺世界" },
  { href: "/#faq", label: "常見問題" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Qiddiya 奇地亞首頁">
          <span className="wordmark-symbol" aria-hidden="true">Q</span>
          <span><strong>QIDDIYA</strong><small>奇地亞</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="主要導覽">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="header-register" href="/register">
            預先登記 <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="mobile-nav" aria-label="手機導覽">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
          <Link className="mobile-register" href="/register" onClick={() => setIsOpen(false)}>
            接收活動訊號<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
