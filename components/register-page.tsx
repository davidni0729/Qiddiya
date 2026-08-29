import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Radio, ShieldCheck } from "lucide-react";
import { LanguageSwitch } from "@/components/language-switch";
import { registrationFields, registrationFormUrl } from "@/lib/registration";
import { localePath, type Locale } from "@/lib/site-content";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const content = {
  zh: {
    alt: "光纖鯨魚穿越未來台北城市",
    back: "返回 Qiddiya",
    heading: ["加入第一批", "城市訊號接收者。"],
    visualLine: "未來城市 × 永續前衛 × 奇幻創想",
    title: ["預先登記", "第一道城市訊號。"],
    lead: "登記後，你將優先收到活動日期、場域、票務與限定體驗公告。整個流程約需 2 分鐘，送出後可隨時關閉表單頁面。",
    dataLabel: "表單蒐集項目",
    openForm: "開啟預先登記表單",
    duration: "約 2 分鐘",
    privacy: "資料不公開",
    disclaimer: "預先登記不等同門票、訂位或保證入場。正式日期、票務與 VVIP 資格將另行通知。送出即表示同意表單內的個人資料蒐集與使用說明。",
  },
  en: {
    alt: "A fiber-optic whale crossing a futuristic Taipei skyline",
    back: "Back to Qiddiya",
    heading: ["Join the first wave", "of city signal receivers."],
    visualLine: "FUTURE CITY × ECO AVANT-GARDE × RADICAL IMAGINATION",
    title: ["Pre-register for", "the first city signal."],
    lead: "Be among the first to receive the confirmed date, venue, ticketing and limited-experience announcements. The form takes about two minutes to complete.",
    dataLabel: "Information collected by the form",
    openForm: "Open the pre-registration form",
    duration: "About 2 minutes",
    privacy: "Responses stay private",
    disclaimer: "Pre-registration is not a ticket, reservation or guarantee of admission. The confirmed date, ticketing and VVIP eligibility will be announced separately. By submitting, you agree to the personal-data notice in the form.",
  },
} as const;

export function RegisterPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const fields = registrationFields[locale];
  const homePath = localePath(locale);
  const formUrl = locale === "en" ? `${registrationFormUrl}?hl=en` : registrationFormUrl;

  return (
    <main className={`register-page locale-${locale}`}>
      <aside className="register-visual">
        <div className="register-visual-media">
          <Image src={`${publicBasePath}/images/qiddiya-hero.jpg`} alt={copy.alt} fill priority sizes="(max-width: 900px) 100vw, 42vw" />
        </div>
        <div className="register-visual-shade" />
        <Link className="register-home" href={homePath}><ArrowLeft size={18} aria-hidden="true" />{copy.back}</Link>
        <div className="register-language"><LanguageSwitch locale={locale} zhHref="/register" enHref="/en/register" /></div>
        <div className="register-visual-copy">
          <span><Radio size={16} aria-hidden="true" /> SIGNAL REGISTRATION</span>
          <h1>{copy.heading[0]}<br />{copy.heading[1]}</h1>
          <p>{copy.visualLine}</p>
        </div>
        <small className="register-credit">TIANYEN PRESENTS / MCLUB FIRST VENUE PARTNER</small>
      </aside>
      <section className="register-panel">
        <div className="register-panel-inner">
          <div className="register-brand"><strong>QIDDIYA</strong><span>奇地亞</span><i>COMING SOON</i></div>
          <div className="registration-brief">
            <p className="registration-kicker">FIRST SIGNAL ACCESS</p>
            <h2>{copy.title[0]}<br />{copy.title[1]}</h2>
            <p className="registration-lead">{copy.lead}</p>

            <div className="registration-data" aria-label={copy.dataLabel}>
              {fields.map((field, index) => <span key={field}><b>{String(index + 1).padStart(2, "0")}</b>{field}</span>)}
            </div>

            <a className="google-form-button" href={formUrl} target="_blank" rel="noreferrer">
              {copy.openForm}<ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <div className="registration-assurance">
              <div><Clock3 size={19} strokeWidth={1.5} aria-hidden="true" /><span><strong>{copy.duration}</strong><small>GOOGLE FORM</small></span></div>
              <div><ShieldCheck size={19} strokeWidth={1.5} aria-hidden="true" /><span><strong>{copy.privacy}</strong><small>PRIVATE RESPONSE SHEET</small></span></div>
            </div>

            <p className="registration-disclaimer">{copy.disclaimer}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
