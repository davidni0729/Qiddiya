import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = { title: "使用條款" };

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="TERMS OF SIGNAL" title="使用條款" updated="2026 年 8 月 27 日">
      <section><h2>一、網站用途</h2><p>本網站提供 Qiddiya 奇地亞之概念介紹、活動資訊與預先登記服務。首波預告期間的日期、場域、內容、演出與參與辦法均可能調整，以正式公告為準。</p></section>
      <section><h2>二、預先登記</h2><p>完成預先登記僅代表加入優先通知名單，不構成門票、訂位、免費入場資格或保證參與。正式票務、邀請與入場規則將另行公布。</p></section>
      <section><h2>三、資料正確性</h2><p>登記者應提供可供聯繫的正確資料，不得冒用他人身分、提交惡意內容或以自動化方式干擾服務。重複 Email 將視為同一筆登記訊號。</p></section>
      <section><h2>四、智慧財產</h2><p>網站中的品牌名稱、文字、光影概念、視覺與圖像，除另有標示外，均為 TianYen 或合法權利人所有；未經同意不得重製、改作或作商業使用。</p></section>
      <section><h2>五、服務調整</h2><p>團隊得因活動規劃、場域安全、技術維護或不可抗力調整、暫停或終止網站與登記服務。若有影響參與者權益的重大變動，將以適當方式公告。</p></section>
    </LegalLayout>
  );
}
