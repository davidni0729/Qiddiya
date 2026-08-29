import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: { absolute: "Privacy Statement | Qiddiya" },
  alternates: {
    canonical: "https://davidni0729.github.io/Qiddiya/en/privacy/",
    languages: { "zh-Hant": "https://davidni0729.github.io/Qiddiya/privacy/", en: "https://davidni0729.github.io/Qiddiya/en/privacy/" },
  },
};

export default function EnglishPrivacyPage() {
  return (
    <LegalLayout locale="en" eyebrow="PRIVACY SIGNAL" title="Privacy Statement" updated="August 27, 2026" zhHref="/privacy" enHref="/en/privacy">
      <section><h2>1. Why we collect data</h2><p>Qiddiya is initiated by TianYen. Pre-registration data is collected for event notifications, guest-list management, participation-preference analysis and, where additional consent is provided, future brand-event communications.</p></section>
      <section><h2>2. Data we collect</h2><p>Required information includes your name, email, phone number, city, party size, experience interests, collaboration intent, discovery source, age confirmation and privacy consent. LINE ID, Instagram, company information, invitation code, additional requests and marketing consent are optional.</p></section>
      <section><h2>3. How data is used</h2><p>Data is used only by TianYen and service partners necessary to deliver this event. It will not be sold to third parties. When information must be shared for ticketing, venue operations or notifications, only the minimum information needed for that purpose will be processed.</p></section>
      <section><h2>4. Retention and security</h2><p>Data is retained during event planning, delivery and any necessary follow-up. Reasonable technical and administrative safeguards are used to prevent unauthorized access, loss or disclosure. Once the purpose is complete, data will be deleted or de-identified in line with operational and legal requirements.</p></section>
      <section><h2>5. Your rights</h2><p>You may request access, correction, suspension of use or deletion of your personal data through an official Qiddiya or TianYen contact channel. The team will process the request after confirming your identity.</p></section>
      <section><h2>6. Changes to this statement</h2><p>This statement may be updated when event operations, services or legal requirements change. Material changes will be reflected in the date on this page and communicated through an appropriate channel.</p></section>
    </LegalLayout>
  );
}
