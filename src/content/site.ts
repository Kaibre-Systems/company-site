export const SITE = {
  name: "Kaibre",
  legalName: "Kaibre Systems Ltd.",
  domain: "https://www.kaibresystems.com",
  positioning: "Kaibre builds and operates software for work that has to be right.",
  signature: "Great code makes great companies.",
  shortDescription:
    "Kaibre is a software company. We build and operate our own products, build products with partners, and take on commissioned production systems.",
  email: "operations@kaibresystems.com",
  linkedin: "https://www.linkedin.com/company/kaibre-systems-limited/",
  address: {
    line: "SE45 05 Masdar City Incubator Building, Smart Station, First Floor",
    city: "Abu Dhabi",
    country: "AE",
  },
} as const;

export const NAV = {
  commissioned: {
    label: "Commissioned Systems",
    href: "/commissioned-systems",
  },
  products: [
    {
      label: "Tuntas",
      href: "/tuntas",
      note: "Regulatory change, for Indonesian financial institutions",
      mark: "tuntas",
    },
    {
      label: "SecurePulse",
      href: "/securepulse",
      note: "Physical security assessment",
    },
    { label: "kAI", href: "/kai", note: "Outbound voice agent" },
  ],
  primary: [
    { label: "Work", href: "/work" },
    { label: "Company", href: "/company" },
  ],
  cta: { label: "Describe your workflow", href: "/contact" },
} as const;

export const FOOTER_GROUPS = [
  {
    title: "Products",
    links: [
      { label: "Tuntas", href: "/tuntas" },
      { label: "Tuntas (Bahasa Indonesia)", href: "/id/tuntas" },
      { label: "SecurePulse", href: "/securepulse" },
      { label: "kAI", href: "/kai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Commissioned Systems", href: "/commissioned-systems" },
      { label: "About Kaibre", href: "/company" },
      { label: "How we work", href: "/company#how-we-work" },
      { label: "Handling your data", href: "/company#data" },
      { label: "Selected work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

