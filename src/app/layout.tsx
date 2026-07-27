import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { SITE } from "@/content/site";
import { RAW } from "@/lib/raw-colors";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const panchang = localFont({
  src: "../../public/fonts/Panchang-Bold.woff2",
  variable: "--font-panchang",
  display: "swap",
  weight: "700",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

const supreme = localFont({
  src: "../../public/fonts/Supreme-Regular.woff2",
  variable: "--font-supreme",
  display: "swap",
  weight: "400",
  preload: true,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Software for work that has to be right`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    url: SITE.domain,
    title: `${SITE.name} — Software for work that has to be right`,
    description: SITE.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Software for work that has to be right`,
    description: SITE.shortDescription,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: RAW.ink950,
  colorScheme: "dark",
};

const ORGANISATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.domain,
  description: SITE.shortDescription,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  sameAs: [SITE.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${panchang.variable} ${supreme.variable}`}>
      <head>
        {/* Flags scripting so `.reveal` can hide content. Without JS nothing
            is ever hidden, so content can never be lost to a failed hydrate. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="true"`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATION_LD) }}
        />
      </head>
      <body className="min-h-dvh bg-ink-950 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-accent focus:px-4 focus:py-3 focus:text-body focus:text-accent-contrast"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <SiteFooter />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
