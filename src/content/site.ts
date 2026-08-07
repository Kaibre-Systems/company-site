/**
 * Single source of truth for site-wide identity, navigation and contact.
 *
 * Copy lives in `src/content/*` so it can be reviewed without reading JSX.
 * Every public claim here is either verifiable from Kaibre's own systems or
 * deliberately unfalsifiable (descriptions of intent, not of outcomes).
 */

export const SITE = {
  name: "Kaibre",
  legalName: "Kaibre Systems Ltd.",
  /**
   * The host that actually serves. The apex redirects to `www`, so naming the
   * apex here pointed every canonical, `og:url`, sitemap entry and the
   * structured-data URL at a URL that answers 307 rather than 200. Search
   * engines follow it, but a canonical should name the page it is the
   * canonical of. Everything absolute on the site derives from this one value.
   */
  domain: "https://www.kaibresystems.com",
  positioning: "Kaibre builds and operates software for work that has to be right.",
  shortDescription:
    "Kaibre is a software company. We build and operate our own products, build products with partners, and take on a small number of commissioned production systems.",
  email: "systemskaibre@gmail.com",
  linkedin: "https://www.linkedin.com/company/kaibre-systems-limited/",
  address: {
    line: "SE45 05 Masdar City Incubator Building, Smart Station, First Floor",
    city: "Abu Dhabi",
    country: "AE",
  },
} as const;

export const NAV = {
  products: [
    {
      label: "SecurePuls",
      href: "/securepuls",
      note: "Physical security assessment",
    },
    { label: "kAI", href: "/kai", note: "Outbound voice agent" },
  ],
  primary: [
    { label: "Work", href: "/work" },
    { label: "Company", href: "/#company" },
  ],
  cta: { label: "Start a conversation", href: "/contact" },
} as const;

export const FOOTER_GROUPS = [
  {
    title: "Products",
    links: [
      { label: "SecurePuls", href: "/securepuls" },
      { label: "SecurePuls Indonesia", href: "/securepuls/indonesia" },
      { label: "kAI", href: "/kai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Selected work", href: "/work" },
      { label: "How we work", href: "/#how-we-work" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

/** Kept for the kAI sales motion only. Not the parent-company CTA. */
export const CALENDLY_URL = "https://calendly.com/systemskaibre/30min";
