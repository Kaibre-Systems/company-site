/**
 * Content contract for the SecurePulse Indonesia experience.
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
    headline: string;
    /** One mechanism line. Carries the audience, the AI, the deliverables,
     *  the human gate, and the timing qualification — one hierarchy level. */
    body: string;
    cta: { label: string; href: string };
    secondary: { label: string; href: string };
    /** The hero visual: one page of a fictional compliance assessment for an
     *  obviously fictional Indonesian institution, structured after the real
     *  SecurePulse report's detailed-finding anatomy — a severity-headed
     *  finding, then requirement → observed → remediation → reviewer.
     *  `secondary` items hide on the narrowest screens; the corner tag is the
     *  only illustrative marker. */
    panel: {
      alt: string;
      tag: string;
      institution: string;
      title: string;
      /** Document meta line — version and standing, in the report's voice. */
      docMeta: string;
      finding: {
        id: string;
        severity: string;
        title: string;
        /** Category · points line, in the report's own scoring vocabulary. */
        meta: string;
      };
      /** Run-in paragraphs, exactly as the report writes a finding:
       *  "What we observed: …". `secondary` items fold away on phones. */
      body: readonly {
        label: string;
        text: string;
        secondary?: boolean;
      }[];
      /** The document's own footer — section name and page position. */
      pageLine: string;
    };
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
    roadmap: {
      title: string;
      /** Small inline "Illustrative" marker beside the title. */
      tag: string;
      columns: { phase: string; action: string; owner: string; reduction: string };
      rows: readonly {
        phase: string;
        action: string;
        owner: string;
        reduction: string;
      }[];
    };
    report: {
      title: string;
      sections: readonly string[];
      /** Attestation rows, in the report's own document-control grammar:
       *  the draft is SecurePulse's, the verification is the customer's. */
      signoff: {
        heading: string;
        rows: readonly { role: string; state: string }[];
      };
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
