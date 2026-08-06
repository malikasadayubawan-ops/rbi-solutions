import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://www.rbisolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RBI Solutions — Global Residency & Citizenship Advisory",
    template: "%s — RBI Solutions",
  },
  description:
    "Helping investors and families secure international residency and citizenship through carefully selected investment migration programs across 17 countries.",
  keywords: [
    "residency by investment",
    "citizenship by investment",
    "golden visa",
    "investment migration",
    "second passport",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "RBI Solutions",
    title: "RBI Solutions — Global Residency & Citizenship Advisory",
    description:
      "Helping investors and families secure international residency and citizenship through carefully selected investment migration programs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RBI Solutions — Global Residency & Citizenship Advisory",
    description:
      "Helping investors and families secure international residency and citizenship through carefully selected investment migration programs.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "RBI Solutions",
  description:
    "Global residency and citizenship advisory helping investors and families secure international residency through investment migration programs.",
  url: siteUrl,
  areaServed: "Worldwide",
  serviceType: "Investment Migration Advisory",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-parchment antialiased">
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain-overlay" />
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
