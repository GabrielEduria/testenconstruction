import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/data/site";

export const viewport: Viewport = { themeColor: "#16171a" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "EN Construction | Construction, Electrical Works & Solar", template: "%s | EN Construction" },
  description: site.description,
  openGraph: {
    type: "website", siteName: site.name, locale: "en_PH",
    images: [{ url: "/images/hero-render.jpg", width: 1492, height: 834, alt: "EN Construction" }],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <noscript><style>{`.reveal{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
