import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://moerita-ai.github.io/game-anniversary-calendar/";
const siteTitle = "スクエニ作品 発売記念日カレンダー（非公式）｜ゲームの周年情報";
const siteDescription = "FINAL FANTASY、ドラゴンクエスト、サガ、聖剣伝説など、スクエニ作品の発売日と周年を日本時間で確認できる非公式ファン向けカレンダー。今日の記念日、月間カレンダー、掲載作品一覧を収録しています。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "スクエニ作品 発売記念日カレンダー",
  authors: [{ name: "MoeLINE4", url: "https://x.com/MoeLINE4" }],
  creator: "MoeLINE4",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "スクエニ作品 発売記念日カレンダー",
    title: siteTitle,
    description: siteDescription,
    images: [{
      url: `${siteUrl}icons/cake-512.png`,
      width: 512,
      height: 512,
      alt: "3本のろうそくを立てた記念日ケーキのアイコン",
    }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}icons/cake-512.png`],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/cake-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6f2e9" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
