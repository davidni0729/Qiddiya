import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  CircleDot,
  GalleryVerticalEnd,
  Leaf,
  Radio,
  ScanLine,
  Sparkles,
  TicketCheck,
  Waves,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const chapters = [
  { number: "01", title: "城市異常", english: "ANOMALY", copy: "熟悉的城市表面開始偏移。光沿著建築、水岸與人群流動，揭開另一層感知介面。", Icon: Radio },
  { number: "02", title: "污染顯影", english: "REVEAL", copy: "原本不可見的環境訊號被光雕轉譯，讓工業痕跡成為可被看見、討論與重新想像的城市記憶。", Icon: ScanLine },
  { number: "03", title: "鯨體甦醒", english: "AWAKEN", copy: "巨型生物光體穿越城市天際線，連結河堤、場域與台北的共同視野。", Icon: Waves },
  { number: "04", title: "能量共振", english: "RESONANCE", copy: "電子音樂、即時影像與群眾反應同步，現場不只是被觀看，而是共同生成。", Icon: AudioLines },
  { number: "05", title: "新地景生成", english: "REGENERATE", copy: "裝置、內容與社群留下可持續擴張的模組，讓一次派對成為下一座未來城市的原型。", Icon: Sparkles },
];

const principles = [
  { title: "FUTURE CITY", label: "未來城市", Icon: CircleDot },
  { title: "ECO AVANT-GARDE", label: "永續前衛", Icon: Leaf },
  { title: "FANTASY IMAGINATION", label: "奇幻創想", Icon: GalleryVerticalEnd },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/qiddiya-hero.jpg" alt="光纖結構的巨型未來鯨魚，懸浮於台北城市上空" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content page-shell">
          <div className="hero-meta">
            <span className="signal-chip"><i /> SIGNAL STATUS</span>
            <span>COMING SOON</span>
          </div>
          <div className="hero-title-group">
            <p className="presented-by">TIANYEN PRESENTS</p>
            <h1 id="hero-title"><span className="outline-title">QIDDIYA</span><span>FUTURE SIGNAL</span></h1>
            <div className="hero-cn"><strong>奇地亞</strong><span /><p>未來光影音樂派對</p></div>
            <p className="hero-tagline">城市，進入下一個頻率。</p>
          </div>
          <div className="hero-footer">
            <div className="hero-actions">
              <Link className="button button-primary" href="/register">接收活動訊號<ArrowRight size={19} aria-hidden="true" /></Link>
              <Link className="button button-ghost" href="#experience">探索體驗<ArrowDown size={18} aria-hidden="true" /></Link>
            </div>
            <div className="venue-credit"><span>MCLUB</span><small>FIRST VENUE SPONSOR</small></div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="主題核心">
        <div className="page-shell signal-strip-inner">
          {principles.map(({ title, label, Icon }) => (
            <div key={title} className="principle"><Icon size={20} strokeWidth={1.4} aria-hidden="true" /><span><strong>{title}</strong><small>{label}</small></span></div>
          ))}
          <div className="frequency">FREQ. 22:00 / SIGNAL ACTIVE</div>
        </div>
      </section>

      <section className="manifesto section-pad" id="signal">
        <div className="page-shell manifesto-grid">
          <div className="section-index"><span>01 / SIGNAL</span><i /></div>
          <div className="manifesto-copy">
            <p className="eyebrow">A NEW URBAN FREQUENCY</p>
            <h2>這不是一場派對。<br />這是一座城市短暫醒來的方式。</h2>
            <p>Qiddiya 奇地亞以光影為語言、電子音樂為脈衝、場域為身體，將水岸、建築與群眾編入同一個即時感知系統。我們把永續議題從說明文字中釋放，轉化為可穿越、可共振、也值得被分享的前衛體驗。</p>
          </div>
        </div>
      </section>

      <section className="journey section-pad" id="experience">
        <div className="page-shell">
          <div className="section-heading">
            <div><p className="eyebrow">FIVE-ACT FREQUENCY JOURNEY</p><h2>五幕，進入奇地亞</h2></div>
            <p>音樂、光影、場域與群眾共同構成一條從城市現實走向未來想像的感官路徑。</p>
          </div>
          <ol className="chapter-list">
            {chapters.map(({ number, title, english, copy, Icon }) => (
              <li key={number}>
                <span className="chapter-number">{number}</span><Icon className="chapter-icon" size={24} strokeWidth={1.3} aria-hidden="true" />
                <div className="chapter-title"><strong>{title}</strong><small>{english}</small></div><p>{copy}</p>
                <ArrowRight className="chapter-arrow" size={20} strokeWidth={1.3} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="world" id="world">
        <article className="scene scene-dark">
          <div className="scene-media"><Image src="/images/contamination-corridor.jpg" alt="以投影映出工業污染資料的沉浸式光影廊道" fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
          <div className="scene-copy">
            <span className="scene-code">WORLD / 001</span><p className="eyebrow">THE INVISIBLE BECOMES VISIBLE</p><h2>讓城市看見<br />原本看不見的事。</h2>
            <p>水門、河堤與工業地景不再只是背景。污染數據化為光的紋理，觀眾走進現場，也走進環境變化留下的痕跡。</p>
            <ul className="scene-tags" aria-label="體驗元素"><li>DATA PROJECTION</li><li>URBAN MEMORY</li><li>LIVE VISUAL</li></ul>
          </div>
        </article>
        <article className="scene scene-light scene-reverse">
          <div className="scene-media"><Image src="/images/energy-core.jpg" alt="電子音樂舞台中心發光的生物能量核心裝置" fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
          <div className="scene-copy">
            <span className="scene-code">WORLD / 002</span><p className="eyebrow">SOUND BECOMES ARCHITECTURE</p><h2>聲音不是配樂。<br />它是空間的骨架。</h2>
            <p>電子音樂的頻率驅動光雕、裝置與即時視覺。每一段節奏都改變場域狀態，讓舞池成為持續生成的未來建築。</p>
            <ul className="scene-tags" aria-label="體驗元素"><li>ELECTRONIC MUSIC</li><li>REAL-TIME SIGNAL</li><li>COLLECTIVE ENERGY</li></ul>
          </div>
        </article>
        <article className="scene scene-acid">
          <div className="scene-media"><Image src="/images/eco-avant-garde.jpg" alt="結合植物形態與透明未來材質的永續裝置藝術" fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
          <div className="scene-copy">
            <span className="scene-code">WORLD / 003</span><p className="eyebrow">ECOLOGY AS A FUTURE AESTHETIC</p><h2>永續不是口號。<br />它是新的感官語言。</h2>
            <p>從模組化裝置、循環材料到可延展的內容系統，Qiddiya 將環境意識轉譯成令人著迷的未來美學。</p>
            <ul className="scene-tags" aria-label="體驗元素"><li>MODULAR SYSTEM</li><li>CIRCULAR MATERIAL</li><li>BIOFUTURE</li></ul>
          </div>
        </article>
      </section>

      <section className="future-system section-pad">
        <div className="page-shell system-layout">
          <div className="system-visual"><Image src="/images/modular-system.jpg" alt="可重組與延伸的未來光影裝置模組" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <div className="system-copy">
            <p className="eyebrow">AN EXPANDING CULTURAL IP</p><h2>從一晚活動，長成一套可移動的未來系統。</h2>
            <p>首場由 TianYen 發起，MClub 作為首場贊助場域。未來可依不同城市、建築與環境議題持續重組，延伸為系列活動、裝置展演、品牌共創與城市夜遊內容。</p>
            <div className="system-specs"><span><b>01</b> 場域共創</span><span><b>02</b> 品牌聯名</span><span><b>03</b> 裝置巡迴</span><span><b>04</b> 內容再傳播</span></div>
          </div>
        </div>
      </section>

      <section className="register-cta">
        <Image src="/images/vvip-deck.jpg" alt="未來城市夜景中的高端沉浸式光影音樂空間" fill sizes="100vw" /><div className="register-overlay" />
        <div className="page-shell register-cta-content">
          <div><p className="eyebrow">FIRST SIGNAL ACCESS</p><h2>接收第一道訊號。</h2><p>預先登記首場活動資訊、優先名單與限定體驗公告。登記不等同取得入場資格，正式辦法將另行通知。</p></div>
          <Link className="button button-acid" href="/register"><TicketCheck size={20} strokeWidth={1.6} aria-hidden="true" />預先登記<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="page-shell faq-grid">
          <div><p className="eyebrow">SIGNAL NOTES</p><h2>常見問題</h2></div>
          <div className="faq-list">
            <details><summary>活動日期與地點確定了嗎？<span>+</span></summary><p>目前為首波預告階段，日期與完整場域資訊將於正式公告時同步通知登記者。</p></details>
            <details><summary>完成登記就能入場嗎？<span>+</span></summary><p>預先登記代表加入優先通知名單，不等同門票或保證入場。正式票務與入場辦法將另行公布。</p></details>
            <details><summary>Qiddiya 奇地亞由誰發起？<span>+</span></summary><p>活動由光影品牌 TianYen 發起，MClub 為首場贊助場域。</p></details>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-main"><div><strong>QIDDIYA</strong><span>奇地亞</span></div><p>LIGHT × SOUND × CITY × COLLECTIVE MEMORY</p><Link href="/register">接收訊號 <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="page-shell footer-legal"><span>TIANYEN ORIGINAL FUTURE LIGHT & MUSIC IP</span><nav aria-label="法律資訊"><Link href="/privacy">隱私權</Link><Link href="/terms">使用條款</Link></nav><span>TAIPEI / 2026</span></div>
      </footer>
    </main>
  );
}
