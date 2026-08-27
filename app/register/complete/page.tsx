import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Radio, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "登記完成", robots: { index: false, follow: false } };

export default async function CompletePage({ searchParams }: { searchParams: Promise<{ ref?: string; duplicate?: string }> }) {
  const { ref = "", duplicate = "0" } = await searchParams;
  const reference = /^QD-26-[A-Z0-9]{8}$/.test(ref) ? ref : "QD-SIGNAL-RECEIVED";
  const isDuplicate = duplicate === "1";

  return (
    <main className="complete-page">
      <div className="complete-grid" aria-hidden="true" />
      <section className="complete-content">
        <div className="complete-mark"><Check size={34} strokeWidth={1.5} aria-hidden="true" /></div>
        <p className="eyebrow">SIGNAL RECEIVED</p>
        <h1>{isDuplicate ? "你的訊號已在名單中。" : "訊號已成功接收。"}</h1>
        <p className="complete-lead">我們已保存你的預先登記。活動日期、場域、票務與正式參與方式確認後，將透過登記信箱通知。</p>
        <div className="reference-block"><small>REFERENCE CODE</small><strong>{reference}</strong><span><Radio size={15} aria-hidden="true" /> STATUS / REGISTERED</span></div>
        <div className="complete-note"><ShieldCheck size={20} strokeWidth={1.4} aria-hidden="true" /><p><strong>預先登記不等同門票或保證入場。</strong><br />請保留此參考編號，正式辦法以後續公告為準。</p></div>
        <Link className="button button-primary" href="/">返回 Qiddiya<ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
      <footer className="complete-footer"><span>TIANYEN PRESENTS</span><span>MCLUB / FIRST VENUE SPONSOR</span></footer>
    </main>
  );
}
