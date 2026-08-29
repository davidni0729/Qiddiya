import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Radio, ShieldCheck } from "lucide-react";
import { registrationFields, registrationFormUrl } from "@/lib/registration";

export const metadata: Metadata = { title: "預先登記", description: "接收 Qiddiya 奇地亞首場未來光影音樂派對訊號。" };

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RegisterPage() {

  return (
    <main className="register-page">
      <aside className="register-visual">
        <div className="register-visual-media">
          <Image src={`${publicBasePath}/images/qiddiya-hero.jpg`} alt="光纖鯨魚穿越未來台北城市" fill priority sizes="(max-width: 900px) 100vw, 42vw" />
        </div>
        <div className="register-visual-shade" />
        <Link className="register-home" href="/"><ArrowLeft size={18} aria-hidden="true" />返回 Qiddiya</Link>
        <div className="register-visual-copy">
          <span><Radio size={16} aria-hidden="true" /> SIGNAL REGISTRATION</span>
          <h1>加入第一批<br />城市訊號接收者。</h1>
          <p>未來城市 × 永續前衛 × 奇幻創想</p>
        </div>
        <small className="register-credit">TIANYEN PRESENTS / MCLUB FIRST VENUE PARTNER</small>
      </aside>
      <section className="register-panel">
        <div className="register-panel-inner">
          <div className="register-brand"><strong>QIDDIYA</strong><span>奇地亞</span><i>COMING SOON</i></div>
          <div className="registration-brief">
            <p className="registration-kicker">FIRST SIGNAL ACCESS</p>
            <h2>預先登記<br />第一道城市訊號。</h2>
            <p className="registration-lead">登記後，你將優先收到活動日期、場域、票務與限定體驗公告。整個流程約需 2 分鐘，送出後可隨時關閉表單頁面。</p>

            <div className="registration-data" aria-label="表單蒐集項目">
              {registrationFields.map((field, index) => (
                <span key={field}><b>{String(index + 1).padStart(2, "0")}</b>{field}</span>
              ))}
            </div>

            <a className="google-form-button" href={registrationFormUrl} target="_blank" rel="noreferrer">
              開啟預先登記表單<ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <div className="registration-assurance">
              <div><Clock3 size={19} strokeWidth={1.5} aria-hidden="true" /><span><strong>約 2 分鐘</strong><small>GOOGLE FORM</small></span></div>
              <div><ShieldCheck size={19} strokeWidth={1.5} aria-hidden="true" /><span><strong>資料不公開</strong><small>PRIVATE RESPONSE SHEET</small></span></div>
            </div>

            <p className="registration-disclaimer">預先登記不等同門票、訂位或保證入場。正式日期、票務與 VVIP 資格將另行通知。送出即表示同意表單內的個人資料蒐集與使用說明。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
