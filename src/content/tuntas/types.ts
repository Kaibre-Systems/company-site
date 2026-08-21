/**
 * Content contract for the Tuntas experience.
 *
 * One interface, two dictionaries (`en.ts`, `id.ts`). The type is the
 * synchronisation guarantee: a section, item or label added to one locale
 * fails the build until the other carries it too. Components never contain
 * copy and never branch on locale — they render whichever dictionary the
 * route hands them. Icons are referenced by key so the dictionaries stay
 * plain data; the key → icon map lives in the visuals module.
 */

export type TuntasLocale = "en" | "id";

/** Icon vocabulary for the reads/produces and workflow visuals. */
export type TuntasIcon =
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
  | "review"
  | "conclude";

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

export interface TuntasContent {
  locale: TuntasLocale;
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  chrome: {
    skip: string;
    /** Accessible name for the Tuntas lockup, which links to the page root. */
    home: string;
    /** Visible label on the quiet link back to the parent company. */
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
    /** The hero visual: one obligation from the register, exactly as the
     *  product sets it — a real regulation read against an obviously
     *  fictional company's documents, headed by its conclusion, then
     *  requirement → what the documents show → what is still needed →
     *  reviewer. `secondary` items hide on the narrowest screens; the corner
     *  tag is the only illustrative marker. */
    panel: {
      alt: string;
      tag: string;
      /** The product name in the sheet's footer — the document says whose
       *  it is, so the component never hardcodes a brand. */
      mark: string;
      institution: string;
      title: string;
      /** Document meta line — version and standing, in the report's voice. */
      docMeta: string;
      finding: {
        id: string;
        severity: string;
        /** See `FindingDocumentContent` — Tuntas conclusions are neutral. */
        tone?: "accent" | "neutral";
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
  /** The pain, before any mechanism: the work as the officer does it today,
   *  and the three facts that make it expensive to get wrong. */
  problem: {
    heading: string;
    body: readonly string[];
    facts: readonly { title: string; note: string }[];
  };
  inOut: {
    heading: string;
    reads: {
      title: string;
      items: readonly { icon: TuntasIcon; label: string; note?: string }[];
    };
    produces: {
      title: string;
      items: readonly { icon: TuntasIcon; label: string }[];
    };
  };
  workflow: {
    heading: string;
    stages: readonly {
      n: string;
      icon: TuntasIcon;
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
    /** The action centre: what remains, who acts next, and by when. */
    actions: {
      title: string;
      /** Small inline "Illustrative" marker beside the title. */
      tag: string;
      columns: { when: string; action: string; owner: string; state: string };
      rows: readonly {
        when: string;
        action: string;
        owner: string;
        state: string;
      }[];
    };
    report: {
      title: string;
      sections: readonly string[];
      /** Standing rows, in the document's own control grammar: the draft is
       *  Tuntas's, the review and the decision are the customer's. */
      signoff: {
        heading: string;
        rows: readonly { role: string; state: string }[];
      };
    };
  };
  /** The two commercial packages, described by what they do rather than by
   *  what they cost — prices are a conversation, never a web page. */
  packages: {
    heading: string;
    items: readonly { name: string; body: string }[];
    note: string;
  };
  comparison: {
    heading: string;
    before: { title: string; steps: readonly string[]; outcome: string };
    after: { title: string; steps: readonly string[]; outcome: string };
    /** The scope qualification, set once, beside the boldest claim. */
    note: string;
    review: { heading: string; body: readonly string[] };
  };
  useCases: {
    heading: string;
    groups: readonly { title: string; items: readonly string[] }[];
  };
  /** What a deployment includes — corpus standing, document handling, the
   *  record, and the language the work comes back in. */
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
