import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use | Qiddiya" },
  alternates: {
    canonical: "https://davidni0729.github.io/Qiddiya/en/terms/",
    languages: { "zh-Hant": "https://davidni0729.github.io/Qiddiya/terms/", en: "https://davidni0729.github.io/Qiddiya/en/terms/" },
  },
};

export default function EnglishTermsPage() {
  return (
    <LegalLayout locale="en" eyebrow="TERMS OF SIGNAL" title="Terms of Use" updated="August 27, 2026" zhHref="/terms" enHref="/en/terms">
      <section><h2>1. Purpose of this website</h2><p>This website introduces the Qiddiya concept, event information and pre-registration service. During the initial announcement phase, the date, venue, content, performances and participation arrangements may change. Official announcements take precedence.</p></section>
      <section><h2>2. Pre-registration</h2><p>Pre-registration only adds you to a priority notification list. It is not a ticket, reservation, complimentary admission entitlement or guarantee of participation. Ticketing, invitations and admission rules will be announced separately.</p></section>
      <section><h2>3. Accuracy of information</h2><p>Registrants must provide accurate contact information and may not impersonate another person, submit malicious content or interfere with the service through automated means. Duplicate email addresses may be treated as one registration signal.</p></section>
      <section><h2>4. Intellectual property</h2><p>Unless otherwise stated, the brand names, copy, light-art concepts, visuals and images on this website belong to TianYen or their lawful rights holders. They may not be reproduced, adapted or used commercially without permission.</p></section>
      <section><h2>5. Service changes</h2><p>The team may modify, suspend or discontinue the website or registration service due to event planning, venue safety, technical maintenance or force majeure. Material changes affecting participants will be announced through an appropriate channel.</p></section>
    </LegalLayout>
  );
}
