import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { SITE } from "@/content/site";
import { RAW } from "@/lib/raw-colors";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Three variable families, each with a job.
 *
 *  Space Grotesk — display. Geometric grotesque with a technical edge; holds
 *                  up at 64px without reading as a startup template.
 *  Inter         — text. The most legible neutral available at body sizes, so
 *                  it never competes with the display face.
 *  JetBrains Mono— data. Eyebrows, references, and the commercial figures,
 *                  where a monospaced register signals "measured", not "code".
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
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
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
      <body className="min-h-dvh bg-ink-950 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-accent-solid focus:px-4 focus:py-3 focus:text-body focus:text-accent-contrast"
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
