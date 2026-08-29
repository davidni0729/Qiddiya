import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "隱私權聲明",
  alternates: {
    canonical: "https://davidni0729.github.io/Qiddiya/privacy/",
    languages: { "zh-Hant": "https://davidni0729.github.io/Qiddiya/privacy/", en: "https://davidni0729.github.io/Qiddiya/en/privacy/" },
  },
};

export default function PrivacyPage() {
  return (
    <LegalLayout locale="zh" eyebrow="PRIVACY SIGNAL" title="隱私權聲明" updated="2026 年 8 月 27 日" zhHref="/privacy" enHref="/en/privacy">
      <section><h2>一、資料蒐集目的</h2><p>Qiddiya 奇地亞由 TianYen 發起。本網站蒐集預先登記資料，用於活動通知、名單管理、參與偏好分析，以及在取得額外同意時提供後續品牌活動資訊。</p></section>
      <section><h2>二、蒐集的資料</h2><p>必要資料包括姓名、Email、手機、所在城市、同行人數、體驗偏好、合作意向、得知活動的方式、年齡確認與隱私權同意紀錄；LINE ID、Instagram、公司資訊、邀請碼、其他需求與行銷通知同意為選填資料。</p></section>
      <section><h2>三、資料使用方式</h2><p>資料僅供 TianYen 與為執行本活動所必要的合作服務使用，不會出售給第三方。若需為票務、場務或通知交付必要資料，將以完成該目的所需的最小範圍處理。</p></section>
      <section><h2>四、保存與安全</h2><p>資料將於活動籌備、執行及必要的後續聯繫期間保存，並採取合理的技術與管理措施避免未授權存取、遺失或外洩；目的完成後將依營運與法令需求刪除或去識別化。</p></section>
      <section><h2>五、你的權利</h2><p>你可要求查詢、更正、停止使用或刪除個人資料。請透過 Qiddiya 或 TianYen 正式公告的聯絡管道提出，團隊將在確認身分後處理。</p></section>
      <section><h2>六、聲明更新</h2><p>本聲明可能因活動流程、服務或法規要求調整；重大變更將於本頁更新日期並以適當方式告知。</p></section>
    </LegalLayout>
  );
}
