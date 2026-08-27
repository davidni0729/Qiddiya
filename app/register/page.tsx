import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";
import { RegistrationForm } from "@/components/registration-form";

export const metadata: Metadata = { title: "預先登記", description: "接收 Qiddiya 奇地亞首場未來光影音樂派對訊號。" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const { invite = "" } = await searchParams;
  const safeInvite = /^[a-zA-Z0-9_-]{4,32}$/.test(invite) ? invite : "";

  return (
    <main className="register-page">
      <aside className="register-visual">
        <Image src="/images/qiddiya-hero.jpg" alt="光纖鯨魚穿越未來台北城市" fill priority sizes="(max-width: 900px) 100vw, 42vw" />
        <div className="register-visual-shade" />
        <Link className="register-home" href="/"><ArrowLeft size={18} aria-hidden="true" />返回 Qiddiya</Link>
        <div className="register-visual-copy">
          <span><Radio size={16} aria-hidden="true" /> SIGNAL REGISTRATION</span>
          <h1>加入第一批<br />城市訊號接收者。</h1>
          <p>未來城市 × 永續前衛 × 奇幻創想</p>
        </div>
        <small className="register-credit">TIANYEN PRESENTS / MCLUB FIRST VENUE SPONSOR</small>
      </aside>
      <section className="register-panel">
        <div className="register-panel-inner">
          <div className="register-brand"><strong>QIDDIYA</strong><span>奇地亞</span><i>COMING SOON</i></div>
          <RegistrationForm inviteCode={safeInvite} />
        </div>
      </section>
    </main>
  );
}
