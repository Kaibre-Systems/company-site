/**
 * Content contract for the SecurePuls Indonesia experience.
 *
 * One interface, two dictionaries (`en.ts`, `id.ts`). The type is the
 * synchronisation guarantee: a section, item or label added to one locale
 * fails the build until the other carries it too. Components never contain
 * copy and never branch on locale — they render whichever dictionary the
 * route hands them. Icons are referenced by key so the dictionaries stay
 * plain data; the key → icon map lives in the visuals module.
 */

export type IndoLocale = "en" | "id";

/** Icon vocabulary for the reads/produces and workflow visuals. */
export type IndoIcon =
  | "corpus"
  | "policy"
  | "evidence"
  | "history"
  | "assessment"
  | "map"
  | "gap"
  | "severity"
  | "remediation"
  | "report"
  | "ground"
  | "assess"
  | "review";

export interface ChainNodeContent {
  /** What kind of thing this node is — "Regulatory requirement", "Gap", … */
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
    kaibreHome: string;
    marketLabel: string;
    toggle: { navLabel: string; en: string; id: string };
    cta: { label: string; href: string };
  };
  hero: {
    /** The one line above the headline: AI-assisted + who it is for. */
    kicker: string;
    headline: string;
    body: string;
    /** The restrained qualification of the timing claim. */
    timingNote: string;
    cta: { label: string; href: string };
    secondary: { label: string; href: string };
    panel: {
      alt: string;
      /** Corner tag marking the figures as illustrative. */
      tag: string;
      caption: string;
      /** The headline figure — "42" + "requirements assessed". */
      headline: { value: string; label: string };
      /** Stacked distribution bar with its legend. */
      bar: readonly {
        label: string;
        count: number;
        tone: "positive" | "neutral" | "attention";
      }[];
      /** Compact status rows under the bar. */
      rows: readonly {
        label: string;
        tone: "positive" | "attention" | "neutral";
      }[];
      footnote: string;
    };
    illustrationNote: string;
  };
  inOut: {
    heading: string;
    reads: {
      title: string;
      items: readonly { icon: IndoIcon; label: string; note?: string }[];
    };
    produces: {
      title: string;
      items: readonly { icon: IndoIcon; label: string }[];
    };
  };
  workflow: {
    heading: string;
    stages: readonly {
      n: string;
      icon: IndoIcon;
      title: string;
      body: string;
    }[];
  };
  trace: {
    heading: string;
    body: string;
    chain: readonly ChainNodeContent[];
    caption: string;
    labelsHeading: string;
    labels: readonly { code: string; note: string }[];
  };
  deliverables: {
    heading: string;
    remediation: {
      caption: string;
      columns: { finding: string; severity: string; action: string; target: string };
      rows: readonly {
        finding: string;
        severity: string;
        tone: "attention" | "neutral" | "positive";
        action: string;
        target: string;
      }[];
    };
    report: {
      caption: string;
      title: string;
      sections: readonly string[];
    };
  };
  comparison: {
    heading: string;
    before: { title: string; steps: readonly string[]; outcome: string };
    after: { title: string; steps: readonly string[]; outcome: string };
    /** The timing qualification, set once, beside the boldest claim. */
    note: string;
    review: { heading: string; body: readonly string[] };
  };
  useCases: {
    heading: string;
    groups: readonly { title: string; items: readonly string[] }[];
  };
  indonesia: {
    heading: string;
    items: readonly { title: string; note: string }[];
    note: string;
  };
  contact: {
    heading: string;
    body: string;
    form: {
      name: { label: string; error: string };
      email: { label: string; errorMissing: string; errorInvalid: string };
      company: { label: string; error: string };
      role: { label: string };
      orgType: {
        label: string;
        options: readonly { value: string; label: string }[];
      };
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
    languageLink: { label: string; href: string };
  };
}
