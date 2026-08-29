import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

const canonicalUrl = "https://davidni0729.github.io/Qiddiya/en/";

export const metadata: Metadata = {
  title: { absolute: "Qiddiya | The city enters a new frequency" },
  description: "A future light and music experience initiated by TianYen. Receive the Qiddiya city signal and pre-register for the first event.",
  alternates: { canonical: canonicalUrl, languages: { "zh-Hant": "https://davidni0729.github.io/Qiddiya/", en: canonicalUrl } },
  openGraph: {
    title: "Qiddiya | The city enters a new frequency",
    description: "Future city, eco avant-garde and radical imagination. Receive the first Qiddiya signal.",
    type: "website",
    locale: "en_US",
    url: canonicalUrl,
    siteName: "Qiddiya",
  },
};

export default function EnglishHome() {
  return <HomePage locale="en" />;
}
