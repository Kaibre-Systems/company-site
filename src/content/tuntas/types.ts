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
  | "draft"
  | "report"
  | "ground"
  | "assess"
  | "review"
  | "conclude";

/**
 * One obligation, opened.
 *
 * The same panel serves an evidenced gap and a contradiction between company
 * documents; what differs is the tone, the conclusion, and which of the two
 * optional blocks at the foot is present. A gap ends in a deadline. A
 * contradiction ends in a request, because until the company answers it there
 * is nothing to be on time for.
 */
export interface TuntasObligationScreen {
  alt: string;
  /** The illustrative marker, in the panel's own footer. */
  tag: string;
  mark: string;
  no: string;
  chip: string;
  chipTone: TuntasTone;
  label: string;
  text: string;
  cite: string;
  oldLabel: string;
  oldText: string;
  oldCite: string;
  conclusion: {
    tone: TuntasTone;
    title: string;
    basisLabel: string;
    basis: readonly string[];
    docsLabel: string;
    docs: readonly string[];
  };
  action: { label: string; text: string; unit: string };
  /** Present where the regulation sets a date. */
  deadline?: { label: string; text: string };
  /** Present where Tuntas cannot conclude until the company answers. */
  request?: { label: string; items: readonly string[]; why: string };
}

/** The product's own evidence semantics. Colour follows from these. */
export type TuntasTone =
  | "gap"
  | "supported"
  | "partial"
  | "info"
  | "conflict"
  | "na";

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
    /** What the product's own header puts beside the wordmark. */
    tagline: string;
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
    /** The line the product itself puts at the foot of every screen. */
    note: string;
    /**
     * What the reproduced screens are, said once, under the first of them,
     * in the four words the demo's own header uses. It carries the fiction
     * disclosure for the whole page: the panels are the product's, and the
     * product tags them in Bahasa.
     */
    panelNote: string;
  };

  /**
   * Reproductions of the product's own screens.
   *
   * Every string here is transcribed from the Tuntas application and the
   * analysis it produced for the public demo — a real OJK regulation read
   * against an openly fictional company's documents. The English dictionary
   * translates that text and changes nothing else: no summarising, no
   * marketing register, no invented figures. The screens are the argument,
   * and they are already the version the product's readers understood.
   */
  screens: {
    /** The screen a matter opens on. */
    regulation: {
      alt: string;
      /** Authority and receipt date, in the mono meta line. */
      meta: string;
      title: string;
      replaces: string;
      /** The three lines that decide whether today is the day. */
      lines: readonly { text: string; tone?: "gap" }[];
    };
    /** One obligation, opened: the detail panel. */
    obligation: TuntasObligationScreen;
    /**
     * A second obligation, opened, where two of the company's own documents
     * disagree. It is the behaviour the practitioner reacted to hardest —
     * Tuntas states the conflict, names both sides, refuses to pick one, and
     * asks the company which is right — so it is shown rather than described.
     */
    contradiction: TuntasObligationScreen;
    /** A few rows of the register, grouped by chapter as the product groups
     *  them. */
    register: {
      alt: string;
      columns: { no: string; obligation: string; article: string; action: string };
      chapter: { title: string; count: string };
      rows: readonly {
        no: string;
        obligation: string;
        article: string;
        action: string;
        tone: TuntasTone;
      }[];
      note: string;
    };
    /**
     * What is still open, on one page.
     *
     * The practitioner asked for this twice in one session — "show me the
     * button which shows the entire follow-up actions that I need to do", and
     * a summary of every document still needed — so the page shows the screen
     * rather than promising it in a list.
     */
    followUp: {
      alt: string;
      heading: string;
      /** The one line under it that splits the number into its parts. */
      summary: string;
      sectionLabel: string;
      /** "4 already passed", in the product's own mono badge. */
      badge: string;
      note: string;
      groups: readonly {
        date: string;
        late: string;
        items: readonly { no: string; text: string; status: string }[];
        cites: readonly string[];
      }[];
    };
    /** The memorandum to the Board, as it is printed. */
    memo: {
      alt: string;
      title: string;
      head: readonly { label: string; value: string }[];
      body: readonly { lead: string; text: string }[];
      footnote: string;
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
      /** The memo carries a note; it is the one output whose *purpose* the
       *  reader has to be told, because it is the first thing they send. */
      items: readonly { icon: TuntasIcon; label: string; note?: string }[];
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
    labelsHeading: string;
    labels: readonly { code: string; note: string }[];
  };
  deliverables: {
    heading: string;
    body: string;
    /** Caption under each reproduced screen, in the page's own language. */
    captions: { memo: string; regulation: string; followUp: string };
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
