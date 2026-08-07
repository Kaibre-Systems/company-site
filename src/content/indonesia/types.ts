/**
 * Content contract for the SecurePuls Indonesia experience.
 *
 * One interface, two dictionaries (`en.ts`, `id.ts`). The type is the
 * synchronisation guarantee: a section, item or label added to one locale
 * fails the build until the other carries it too. Components never contain
 * copy and never branch on locale — they render whichever dictionary the
 * route hands them.
 */

export type IndoLocale = "en" | "id";

export interface StatusRowContent {
  label: string;
  status: string;
  tone: "positive" | "attention" | "neutral";
}

export interface ChainNodeContent {
  /** What kind of thing this node is — "Requirement", "Evidence", … */
  label: string;
  /** The illustrative content itself. */
  text: string;
  /** A supporting reference line, set in the mono face. */
  meta?: string;
  /** The node the accent lands on — where the meaning sits. */
  accent?: boolean;
}

export interface IndoContent {
  locale: IndoLocale;
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  chrome: {
    skip: string;
    /** Accessible name for the wordmark link back to the Kaibre site. */
    kaibreHome: string;
    /** Shown beside the product name in the header. */
    marketLabel: string;
    toggle: {
      navLabel: string;
      en: string;
      id: string;
    };
    cta: { label: string; href: string };
  };
  hero: {
    audience: string;
    headline: string;
    body: string;
    cta: { label: string; href: string };
    secondary: { label: string; href: string };
    panel: {
      /** Accessible description of the illustration as a whole. */
      alt: string;
      caption: string;
      rows: readonly StatusRowContent[];
      footnote: string;
    };
    illustrationNote: string;
  };
  inOut: {
    heading: string;
    give: { title: string; items: readonly string[] };
    get: { title: string; items: readonly string[] };
  };
  workflow: {
    heading: string;
    steps: readonly { n: string; title: string; body: string }[];
  };
  trace: {
    heading: string;
    body: string;
    chain: readonly ChainNodeContent[];
    caption: string;
    labelsHeading: string;
    labels: readonly { code: string; note: string }[];
  };
  comparison: {
    heading: string;
    before: { title: string; items: readonly string[] };
    after: { title: string; items: readonly string[] };
    review: { heading: string; body: readonly string[] };
  };
  useCases: {
    heading: string;
    body: string;
    groups: readonly { title: string; items: readonly string[] }[];
  };
  trust: {
    heading: string;
    items: readonly { title: string; note: string }[];
    status: { heading: string; body: readonly string[] };
  };
  contact: {
    heading: string;
    body: string;
    form: {
      name: { label: string; error: string };
      email: { label: string; errorMissing: string; errorInvalid: string };
      company: { label: string; error: string };
      role: { label: string };
      orgType: { label: string; options: readonly { value: string; label: string }[] };
      need: { label: string; hint: string; placeholder: string; error: string };
      submit: string;
      sending: string;
      sent: { heading: string; body: string };
      fallback: { heading: string; body: string; noMail: string; back: string };
    };
  };
  footer: {
    tagline: string;
    links: readonly { label: string; href: string }[];
    /** The counterpart page, offered in its own language. */
    languageLink: { label: string; href: string };
  };
}
