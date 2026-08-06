import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";
import { countries } from "@/data/countries";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RBI Solutions — Global Residency & Citizenship Advisory",
    template: "%s — RBI Solutions",
  },
  description: `Helping investors and families secure international residency and citizenship through carefully selected investment migration programs across ${countries.length} countries.`,
  keywords: [
    "residency by investment",
    "citizenship by investment",
    "golden visa",
    "investment migration",
    "second passport",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
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
  alternates: { canonical: SITE_URL },
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
  url: SITE_URL,
  email: CONTACT_EMAIL,
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
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-transform focus:translate-y-0 focus-visible:outline-none"
        >
          Skip to main content
        </a>
        <div className="grain-overlay" />
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
        <ChatWidget />
      </body>
    </html>
  );
}
