import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Qiddiya 奇地亞｜城市，進入下一個頻率",
    template: "%s｜Qiddiya 奇地亞",
  },
  description:
    "TianYen 發起的未來光影音樂體驗。接收 Qiddiya 城市訊號，預先登記首場活動資訊。",
  openGraph: {
    title: "Qiddiya 奇地亞｜城市，進入下一個頻率",
    description: "未來城市、永續前衛、奇幻創想。接收首場未來光影音樂派對訊號。",
    type: "website",
    locale: "zh_TW",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Qiddiya 奇地亞未來光影音樂派對" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
