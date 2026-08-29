import type { Metadata } from "next";
import { DocumentLanguage } from "@/components/document-language";
import "./globals.css";

const canonicalUrl = "https://davidni0729.github.io/Qiddiya/";

export const metadata: Metadata = {
  title: {
    default: "Qiddiya 奇地亞｜城市，進入下一個頻率",
    template: "%s｜Qiddiya 奇地亞",
  },
  description:
    "TianYen 發起的未來光影音樂體驗。接收 Qiddiya 城市訊號，預先登記首場活動資訊。",
  metadataBase: new URL(canonicalUrl),
  alternates: { canonical: canonicalUrl, languages: { "zh-Hant": canonicalUrl, en: `${canonicalUrl}en/` } },
  icons: { icon: "/Qiddiya/favicon.svg" },
  openGraph: {
    title: "Qiddiya 奇地亞｜城市，進入下一個頻率",
    description: "未來城市、永續前衛、奇幻創想。接收首場未來光影音樂派對訊號。",
    type: "website",
    locale: "zh_TW",
    url: canonicalUrl,
    siteName: "Qiddiya 奇地亞",
    images: [{ url: `${canonicalUrl}og.jpg`, width: 1200, height: 630, alt: "Qiddiya 奇地亞未來光影音樂派對" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qiddiya 奇地亞｜城市，進入下一個頻率",
    description: "未來城市、永續前衛、奇幻創想。接收首場未來光影音樂派對訊號。",
    images: [`${canonicalUrl}og.jpg`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body><DocumentLanguage />{children}</body>
    </html>
  );
}
