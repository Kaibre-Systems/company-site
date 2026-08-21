import type { Metadata, Viewport } from "next";
import {
  Inter,
  JetBrains_Mono,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { SITE } from "@/content/site";
import { RAW } from "@/lib/raw-colors";

/**
 * Three variable families, each with a job.
 *
 *  Space Grotesk — display. Geometric grotesque with a technical edge; holds
 *                  up at 64px without reading as a startup template.
 *  Inter         — text. The most legible neutral available at body sizes, so
 *                  it never competes with the display face.
 *  JetBrains Mono— data. Eyebrows, references, and the commercial figures,
 *                  where a monospaced register signals "measured", not "code".
 *  Source Serif 4— documents. Loaded for the Tuntas theme only, where it
 *                  replaces the display face: the product sets regulation
 *                  titles and memoranda in it, and the page describing that
 *                  product should read in the same voice.
 *
 * All three are variable, so weight is a real design axis rather than the two
 * static cuts the previous local fonts allowed.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
  weight: ["500", "600", "700"],
  adjustFontFallback: true,
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
  adjustFontFallback: true,
});

/** The Tuntas display face. Same family the product ships. */
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-family",
  display: "swap",
  weight: ["400", "600", "700"],
  adjustFontFallback: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
  display: "swap",
  weight: ["400", "500"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name}: Software for work that has to be right`,
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
    title: `${SITE.name}: Software for work that has to be right`,
    description: SITE.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: Software for work that has to be right`,
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
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
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
      {/* Chrome lives in the route groups rather than here: the company site
          renders the English shell via `(site)/layout.tsx`, and the SecurePulse
          Indonesia experience renders its own localised shell. The root
          `not-found` and `error` pages compose `SiteChrome` themselves. */}
      <body className="min-h-dvh bg-ink-950 antialiased">
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
