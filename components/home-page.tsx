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
import { localePath, siteContent, type Locale } from "@/lib/site-content";

const chapterIcons = [Radio, ScanLine, Waves, AudioLines, Sparkles];
const principleIcons = [CircleDot, Leaf, GalleryVerticalEnd];
const sceneClasses = ["scene scene-dark", "scene scene-light scene-reverse", "scene scene-acid"];
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function MultilineTitle({ lines }: { lines: readonly string[] }) {
  return <>{lines.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const registerPath = localePath(locale, "register");
  const privacyPath = localePath(locale, "privacy");
  const termsPath = localePath(locale, "terms");

  return (
    <main className={`locale-${locale}`}>
      <SiteHeader locale={locale} />

      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src={`${publicBasePath}/images/qiddiya-hero.jpg`} alt={content.hero.alt} fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content page-shell">
          <div className="hero-meta">
            <span className="signal-chip"><i /> {content.hero.status}</span>
            <span>{content.hero.comingSoon}</span>
          </div>
          <div className="hero-title-group">
            <p className="presented-by">{content.hero.presentedBy}</p>
            <h1 id="hero-title"><span className="outline-title">QIDDIYA</span><span>FUTURE SIGNAL</span></h1>
            <div className="hero-cn"><strong>{content.hero.chineseName}</strong><span /><p>{content.hero.eventName}</p></div>
            <p className="hero-tagline">{content.hero.tagline}</p>
          </div>
          <div className="hero-footer">
            <div className="hero-actions">
              <Link className="button button-primary" href={registerPath}>{content.hero.register}<ArrowRight size={19} aria-hidden="true" /></Link>
              <Link className="button button-ghost" href="#experience">{content.hero.explore}<ArrowDown size={18} aria-hidden="true" /></Link>
            </div>
            <div className="venue-credit"><span>MCLUB</span><small>{content.hero.venue}</small></div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label={content.principlesLabel}>
        <div className="page-shell signal-strip-inner">
          {content.principles.map(({ title, label }, index) => {
            const Icon = principleIcons[index];
            return <div key={title} className="principle"><Icon size={20} strokeWidth={1.4} aria-hidden="true" /><span><strong>{title}</strong><small>{label}</small></span></div>;
          })}
          <div className="frequency">FREQ. 22:00 / SIGNAL ACTIVE</div>
        </div>
      </section>

      <section className="manifesto section-pad" id="signal">
        <div className="page-shell manifesto-grid">
          <div className="section-index"><span>01 / SIGNAL</span><i /></div>
          <div className="manifesto-copy">
            <p className="eyebrow">{content.manifesto.eyebrow}</p>
            <h2><MultilineTitle lines={content.manifesto.title} /></h2>
            <p>{content.manifesto.copy}</p>
          </div>
        </div>
      </section>

      <section className="journey section-pad" id="experience">
        <div className="page-shell">
          <div className="section-heading">
            <div><p className="eyebrow">{content.journey.eyebrow}</p><h2>{content.journey.title}</h2></div>
            <p>{content.journey.intro}</p>
          </div>
          <ol className="chapter-list">
            {content.journey.chapters.map(({ title, english, copy }, index) => {
              const Icon = chapterIcons[index];
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={number}>
                  <span className="chapter-number">{number}</span><Icon className="chapter-icon" size={24} strokeWidth={1.3} aria-hidden="true" />
                  <div className="chapter-title"><strong>{title}</strong><small>{english}</small></div><p>{copy}</p>
                  <ArrowRight className="chapter-arrow" size={20} strokeWidth={1.3} aria-hidden="true" />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="world" id="world">
        {content.scenes.map((scene, index) => (
          <article className={sceneClasses[index]} key={scene.code}>
            <div className="scene-media"><Image src={`${publicBasePath}/images/${scene.image}`} alt={scene.alt} fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
            <div className="scene-copy">
              <span className="scene-code">{scene.code}</span><p className="eyebrow">{scene.eyebrow}</p><h2><MultilineTitle lines={scene.title} /></h2>
              <p>{scene.copy}</p>
              <ul className="scene-tags" aria-label={content.experienceTagsLabel}>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </article>
        ))}
      </section>

      <section className="future-system section-pad">
        <div className="page-shell system-layout">
          <div className="system-visual"><Image src={`${publicBasePath}/images/modular-system.jpg`} alt={content.system.alt} fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <div className="system-copy">
            <p className="eyebrow">{content.system.eyebrow}</p><h2>{content.system.title}</h2>
            <p>{content.system.copy}</p>
            <div className="system-specs">{content.system.specs.map((spec, index) => <span key={spec}><b>{String(index + 1).padStart(2, "0")}</b> {spec}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="register-cta" id="register">
        <Image src={`${publicBasePath}/images/vvip-deck.jpg`} alt={content.cta.alt} fill sizes="100vw" /><div className="register-overlay" />
        <div className="page-shell register-cta-content">
          <div><p className="eyebrow">{content.cta.eyebrow}</p><h2>{content.cta.title}</h2><p>{content.cta.copy}</p></div>
          <Link className="button button-acid" href={registerPath}><TicketCheck size={20} strokeWidth={1.6} aria-hidden="true" />{content.cta.button}<ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="page-shell faq-grid">
          <div><p className="eyebrow">{content.faq.eyebrow}</p><h2>{content.faq.title}</h2></div>
          <div className="faq-list">
            {content.faq.items.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-main"><div><strong>QIDDIYA</strong><span>奇地亞</span></div><p>LIGHT × SOUND × CITY × COLLECTIVE MEMORY</p><Link href={registerPath}>{content.footer.receive} <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="page-shell footer-legal"><span>TIANYEN ORIGINAL FUTURE LIGHT & MUSIC IP</span><nav aria-label={content.footer.legalLabel}><Link href={privacyPath}>{content.footer.privacy}</Link><Link href={termsPath}>{content.footer.terms}</Link></nav><span>TAIPEI / 2026</span></div>
      </footer>
    </main>
  );
}
