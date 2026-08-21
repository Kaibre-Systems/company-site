import type { TuntasContent } from "./types";
import { ID_PATH } from "./locale";

/**
 * Tuntas — English.
 *
 * Written to the executive standard: a compliance director, GC or head of
 * legal at an Indonesian financial institution gives this page two to three
 * minutes. The headline carries the event (a regulation arrives) and the
 * outcome (what it changes here); the first sections carry the concrete
 * inputs and deliverables; everything after that is depth.
 *
 * Source of copy: `docs/indonesia/commercial/TUNTAS_PRODUCT_INFORMATION.html`
 * in the product repository — the founder-approved prospect document — and
 * the practitioner interviews behind it. Where this page describes the work
 * itself (what the officer does today, what the regulator examines, what a
 * finding costs), the vocabulary is the practitioner's, not marketing's.
 *
 * Claim discipline, carried over from the product's own rules:
 *  - Never "compliant", "audit-ready", or any formulation implying Tuntas
 *    certifies a position. Tuntas concludes according to the documents; the
 *    officer decides.
 *  - Never legal advice. The disclaimer travels with the product rather than
 *    sitting in a footnote — it appears twice in the page body, in the
 *    product's own words.
 *  - No time claims, no hour counts, no prices. The founder's rule is to
 *    lead with the pain, never with AI or minutes. The one duration on the
 *    page is how long a walkthrough takes, which is a meeting, not a result.
 *  - Regulator names appear only as the source of a regulation a customer
 *    names — never as approvers, certifiers or partners.
 *  - Illustrative figures appear only inside mockups tagged "Illustrative",
 *    on a company that is stated to be fictional.
 *  - No customer names, no testimonials, no quotes attributed to a
 *    practitioner. The interviews inform the writing; they are not evidence
 *    to publish.
 */
export const EN: TuntasContent = {
  locale: "en",
  meta: {
    title: "Tuntas — regulatory change, obligation by obligation",
    description:
      "A new regulation arrives. Tuntas maps what changed against your company's documents and tells you what to do — obligation by obligation, with every conclusion pointing to the article and the document it rests on.",
    ogLocale: "en_GB",
  },
  chrome: {
    skip: "Skip to content",
    home: "Tuntas — home",
    kaibreHome: "Kaibre",
    tagline: "Regulatory change",
    marketLabel: "Indonesia",
    toggle: { navLabel: "Language", en: "English", id: "Bahasa Indonesia" },
    cta: { label: "Walk through an example", href: "#contact" },
  },
  hero: {
    headline: "A new regulation arrives. Tuntas works out what it changes here.",
    body: "For Compliance and Legal at Indonesian financial institutions. You name the regulation and upload the documents you have. Tuntas returns the complete picture — obligation by obligation, with every conclusion pointing to the article and the company document it rests on.",
    cta: { label: "Walk through an example", href: "#contact" },
    secondary: { label: "How the work moves", href: "#workflow" },
    note: "Tuntas is an analysis tool, not legal advice.",
  },
  screens: {
    regulation: {
      alt: "The screen a matter opens on in Tuntas: POJK 40 of 2024, received from OJK on 14 August 2026, replacing POJK 10/POJK.05/2022, analysed against 18 documents belonging to a fictional company. 49 obligations are unreviewed, 4 deadlines have already passed, and the next one falls on 10 September 2026.",
      meta: "OJK · Received 14 August 2026",
      title: "POJK 40 of 2024: Layanan Pendanaan Bersama Berbasis Teknologi Informasi",
      replaces:
        "Replaces POJK 10/POJK.05/2022. A wholesale replacement of the LPBBTI (peer-to-peer lending) regime, analysed against 18 company documents.",
      lines: [
        { text: "49 obligations you have not reviewed" },
        { text: "4 deadlines have already passed", tone: "gap" },
        { text: "Next deadline 10 September 2026" },
      ],
    },
    obligation: {
      alt: "One obligation opened in Tuntas: obligation 4 of POJK 40 of 2024 requires the company to ensure that members of its Board of Directors and Board of Commissioners hold a competency certificate. Tuntas concludes the obligation is not met, names the company documents the conclusion rests on, states what the company has to do, and gives the deadline. The company is fictional; the regulation is real.",
      tag: "Illustrative",
      mark: "Tuntas",
      no: "Obligation no. 4",
      chip: "Action needed from you",
      chipTone: "gap",
      label: "Obligation (new regulation)",
      text: "The company must ensure that members of the Board of Directors and members of the Board of Commissioners hold a competency certificate from a professional certification institution in the financial-technology field registered with the Financial Services Authority.",
      cite: "POJK 40/2024 · Art. 51(1)",
      oldLabel: "Old rule (POJK 10/2022, revoked)",
      oldText: "Amended — the obligation already existed, and its content has changed. The old wording placed the duty on each officer individually; the new one places it on the company, which must ensure they hold it.",
      oldCite: "POJK 10/2022 · Art. 16(1)",
      conclusion: {
        tone: "gap",
        title: "Not met.",
        basisLabel: "Basis for the conclusion",
        basis: [
          "Memo SDM Sertifikasi (2025) records the certificates of the President Commissioner and the Independent Commissioner as valid until 22 August 2025, and the Technology Director's until 9 March 2026; no document supplied evidences a renewal after those dates.",
          "Register Kepatuhan (2025), row R-06, itself marks this obligation's status as Partial.",
          "The missing renewal is evidenced by the company's own documents rather than merely absent from them.",
        ],
        docsLabel: "Company documents checked for this conclusion:",
        docs: [
          "Memo SDM Sertifikasi (2025)",
          "Register Kepatuhan (2025)",
          "Struktur Organisasi (2026)",
        ],
      },
      action: {
        label: "What the company has to do",
        text: "Update the certification status memo, complete the outstanding renewals, and put validity monitoring into the compliance calendar with a reminder before each expiry.",
        unit: "Suggested unit: Divisi SDM & Umum, monitored by Divisi Kepatuhan & Legal (the company decides — this suggestion is open to discussion).",
      },
      deadline: {
        label: "Deadline",
        text: "Immediately; the certificates of the President Commissioner and the Independent Commissioner are recorded as expiring on 22 August 2025, and the Technology Director's on 9 March 2026.",
      },
    },
    register: {
      alt: "The obligation register in Tuntas: three obligations from Chapter VI of POJK 40 of 2024, each with its number, the obligation itself, its article, and one action label — two marked as needing action from you, one marked as not applicable.",
      columns: {
        no: "No.",
        obligation: "Obligation (new regulation)",
        article: "Article",
        action: "Action",
      },
      chapter: { title: "CHAPTER VI — HUMAN RESOURCES", count: "3 obligations" },
      rows: [
        {
          no: "4",
          obligation:
            "The company must ensure that members of the Board of Directors and members of the Board of Commissioners hold a competency certificate from a professional certification institution in the financial-technology field registered with the Financial Services Authority.",
          article: "Art. 51(1)",
          action: "Action needed from you",
          tone: "gap",
        },
        {
          no: "5",
          obligation:
            "The company must ensure that officers one level below the Board of Directors hold a competency certificate from a professional certification institution in the financial-technology field registered with the Financial Services Authority.",
          article: "Art. 51(1)",
          action: "Action needed from you",
          tone: "gap",
        },
        {
          no: "6",
          obligation:
            "A member of the Board of Directors who is a foreign national must hold Indonesian-language certification no later than one year from the date the Financial Services Authority approves the appointment.",
          article: "Art. 51(2)",
          action: "Not applicable",
          tone: "na",
        },
      ],
      note: "Tuntas is an analysis tool, not legal advice.",
    },
    memo: {
      alt: "The memorandum Tuntas prepared for the Board of Directors and Board of Commissioners of a fictional company, dated 14 August 2026, on the impact of POJK 40 of 2024, which revokes POJK 10/POJK.05/2022.",
      title: "MEMORANDUM",
      head: [
        { label: "To", value: "Board of Directors and Board of Commissioners" },
        { label: "From", value: "Compliance function" },
        { label: "Date", value: "14 August 2026" },
        {
          label: "Subject",
          value:
            "Initial summary of the impact of POJK 40 of 2024, which revokes POJK 10/POJK.05/2022, on the regulatory obligations of PT Benderang Dana Teknologi as a licensed conventional LPBBTI operator.",
        },
      ],
      body: [
        {
          lead: "The regulation.",
          text: "POJK 40 of 2024 has been in force since its promulgation on 27 December 2024 and revokes POJK 10/POJK.05/2022 by Article 236; the revoked regulation is referred to solely as a comparison.",
        },
        {
          lead: "What the analysis found.",
          text: "The analysis dated 14 August 2026 covers 50 obligations: 18 evidenced gaps, 13 obligations only partly met, 15 that cannot be assessed yet because the evidence supplied is insufficient, 1 supported by evidence, 1 contradiction between company documents, and 2 provisions that do not apply to the company.",
        },
      ],
      footnote:
        "Prepared by Tuntas for the Board of Directors and Board of Commissioners. A draft — reviewed, edited and decided by your compliance function.",
    },
  },
  problem: {
    heading: "The work you already know.",
    body: [
      "A new OJK regulation can run to two hundred articles or more. Someone has to work out what changed, what it means for this company, which SOPs, policies, agreements and terms have to be updated, who has to update them, and by when.",
      "It is done by hand, in between everything else, by the person who is answerable if something is missed. Then it is done again: the units revise their documents, and every revision has to be read back against the article it was meant to satisfy.",
    ],
    facts: [
      {
        title: "The examiner reads the documents.",
        note: "The SOPs against the regulation, then the practice against the SOPs. Each gap between them is written up as a finding.",
      },
      {
        title: "Findings carry consequences.",
        note: "Administrative sanctions, reputational cost, suspension of business activities — and a supervisory record the Board of Commissioners answers for.",
      },
      {
        title: "The deadline does not wait for capacity.",
        note: "The regulation sets the date. Business as usual takes the weeks in between, and the work surfaces when there is a month left.",
      },
    ],
  },
  inOut: {
    heading: "What goes in. What comes back.",
    reads: {
      title: "You give Tuntas",
      items: [
        {
          icon: "corpus",
          label: "The regulation you name",
          note: "with the one it replaces, and the official source record for both",
        },
        { icon: "policy", label: "Your SOPs, policies and internal procedures" },
        { icon: "evidence", label: "Agreements, terms, product documents, evidence" },
        {
          icon: "history",
          label: "Whatever exists today",
          note: "what is missing becomes a request, not a blocker",
        },
      ],
    },
    produces: {
      title: "Tuntas returns",
      items: [
        {
          icon: "assessment",
          label: "Every obligation of the new regulation, beside the provision it replaces",
        },
        {
          icon: "map",
          label: "A conclusion for each one, according to your documents, with its reason",
        },
        {
          icon: "gap",
          label: "Named requests where the evidence is not in the documents",
        },
        {
          icon: "severity",
          label: "Contradictions between your own documents, with both sources",
        },
        {
          icon: "remediation",
          label: "The specific change, in the specific document, with an owner",
        },
        {
          icon: "report",
          label: "Deadlines, passed ones first — and a Board memo you can edit and send",
        },
      ],
    },
  },
  workflow: {
    heading: "How the work moves.",
    stages: [
      {
        n: "01",
        icon: "ground",
        title: "Name the regulation",
        body: "Tuntas lists the documents it expects to need. Upload what exists.",
      },
      {
        n: "02",
        icon: "assess",
        title: "Tuntas analyses",
        body: "The obligation register, the Board memo, the document requests, the actions, the deadlines.",
      },
      {
        n: "03",
        icon: "review",
        title: "Your team reviews",
        body: "Approve, edit the wording, or send it back. Supply what was asked for and the affected obligations are re-analysed.",
      },
      {
        n: "04",
        icon: "remediation",
        title: "Fix the documents",
        body: "Your units revise; Tuntas checks each revision point by point against the article it was meant to satisfy.",
      },
      {
        n: "05",
        icon: "conclude",
        title: "Conclude",
        body: "What remains, who acts next, by when. The conclusion records the position, open items included.",
      },
    ],
  },
  trace: {
    heading: "No conclusion without its article and its document.",
    body: "Every conclusion stays linked to the provision it rests on, the company document it was read from, and the reviewer who accepted it. Where the documents do not answer, Tuntas says so and asks — it does not guess, and it does not pick a side between two of your own documents.",
    labelsHeading: "Five conclusions, and no sixth.",
    labels: [
      {
        code: "MET",
        note: "The documents show how the obligation is satisfied, and name where.",
      },
      {
        code: "NOT MET",
        note: "The documents show it is not satisfied. The specific change and the specific document follow.",
      },
      {
        code: "PARTLY MET",
        note: "Part of it is evidenced; the rest is not, and is carried as an open item.",
      },
      {
        code: "CANNOT BE ASSESSED YET",
        note: "The evidence is not in the documents supplied. Tuntas asks for what it needs, by name, and says why. It is never read as a breach.",
      },
      {
        code: "DOES NOT APPLY",
        note: "The obligation does not bind this company, and the reason is always stated.",
      },
    ],
  },
  deliverables: {
    heading: "What you receive.",
    body: "The same two screens your team works in: the matter itself, and the memorandum to the Board that you can edit and send.",
    captions: {
      regulation: "The screen a matter opens on.",
      memo: "The Board memo — editable, downloadable as Word, printable as PDF.",
    },
  },
  packages: {
    heading: "Two packages, priced per regulation.",
    items: [
      {
        name: "Analysis",
        body: "Everything above. Your teams revise the documents themselves, and Tuntas checks every revision they submit, point by point: satisfied, still open, wrong article cited, new problems introduced.",
      },
      {
        name: "Analysis + Drafting",
        body: "Tuntas also drafts each revision — old text, new text, the article it rests on. Review it, edit it, download it as Word. If the analysis or the document changes, the draft is flagged and redone.",
      },
    ],
    note: "One regulation is one matter, from the day it arrives to the day the position is recorded.",
  },
  comparison: {
    heading: "What changes.",
    before: {
      title: "By hand, today",
      steps: [
        "Read two hundred articles",
        "Build the comparison table",
        "Chase the documents",
        "Distribute to the units",
        "Read every revision back",
      ],
      outcome: "The deadline arrives before the work does",
    },
    after: {
      title: "With Tuntas",
      steps: [
        "Name the regulation, upload what exists",
        "Every obligation, with its conclusion and its source",
        "Missing documents requested by name",
        "The specific change, in the specific document",
        "Each revision checked point by point",
      ],
      outcome: "Every obligation has a position, an owner and a date",
    },
    note: "Scope and effort vary with the regulation, the number of documents, and the package.",
    review: {
      heading: "Tuntas concludes according to the documents. Your officer decides.",
      body: [
        "The judgment stays with Compliance. Tuntas states a position and the evidence under it; your officer reviews each conclusion, edits it, and decides. Nothing closes by a click alone — statuses move on evidence.",
        "Tuntas is an analysis tool. It does not certify compliance and it does not give legal advice. Every decision is logged with a name and a time, so the record shows who accepted what, and on what.",
      ],
    },
  },
  useCases: {
    heading: "Built for the institutions the rules land on.",
    groups: [
      {
        title: "Banks",
        items: [
          "A new regulation arriving most months",
          "SOPs, product terms and agreements to keep in step",
          "A supervisory record the Board of Commissioners answers for",
        ],
      },
      {
        title: "Fintech and multifinance",
        items: [
          "Regimes replaced wholesale rather than amended",
          "Rapid product change against fixed statutory dates",
          "A compliance function of one or two people",
        ],
      },
      {
        title: "Insurers",
        items: [
          "Obligations spread across policies, agreements and terms",
          "Recurring and event-triggered reporting duties",
          "Revisions to re-check across several units",
        ],
      },
    ],
  },
  indonesia: {
    heading: "What the deployment includes.",
    items: [
      {
        title: "The regulation, and the one it revokes",
        note: "Tuntas holds both, with the official source record for each, and states which is in force. No conclusion is drawn on a revoked provision — the old regulation appears only as the thing the new one is compared against.",
      },
      {
        title: "Your documents, and nothing else",
        note: "Stored encrypted, visible to your organisation only, used for nothing else, deleted on request. No IT integration: a login for your compliance officer, the regulation, and your documents.",
      },
      {
        title: "A record that holds up",
        note: "Every decision logged with a name and a time. The conclusion records the position with its open items included, rather than closing over them.",
      },
      {
        title: "Bahasa Indonesia, end to end",
        note: "The register, the memo and the document requests are written in Bahasa Indonesia — the language the work is reviewed and filed in.",
      },
    ],
    note: "Tuntas claims no regulator approval, and coverage is scoped per regulation. It is an analysis tool: it does not certify compliance and it does not give legal advice.",
  },
  contact: {
    heading: "Walk through a completed example.",
    body: "A real regulation, analysed end to end against a fictional company's documents — the register, the requests, the contradiction, the memo. About twenty minutes, and you will know whether it resembles the work your team does.",
    form: {
      name: { label: "Name", error: "Please add your name." },
      email: {
        label: "Work email",
        errorMissing: "Please add an email address.",
        errorInvalid: "That does not look like an email address.",
      },
      company: { label: "Company", error: "Please add your company." },
      role: { label: "Role" },
      orgType: {
        label: "Organisation type",
        options: [
          { value: "bank", label: "Bank" },
          { value: "fintech", label: "Fintech or multifinance" },
          { value: "insurer", label: "Insurer" },
          { value: "regulated-other", label: "Other regulated institution" },
          { value: "other", label: "Something else" },
        ],
      },
      need: {
        label: "Which regulatory change is on your desk?",
        hint: "One line is enough.",
        placeholder:
          "e.g. a new OJK regulation replacing the one our SOPs were written against",
        error: "A few words about the change, so the walkthrough is a relevant one.",
      },
      submit: "Send it",
      sending: "Sending…",
      sent: {
        heading: "Thanks — that reached us.",
        body: "Your message is in our inbox. The people building Tuntas will come back to you to arrange the walkthrough.",
      },
      fallback: {
        heading: "One more step.",
        body: "We tried to send that for you and could not, so we have handed a pre-filled message to your email app. Press send there and it reaches us.",
        noMail:
          "If nothing opened, your browser may not have an email app registered. Write to us directly — the same details are all we need.",
        back: "Back to the form",
      },
    },
  },
  footer: {
    tagline: "Tuntas is built and operated by Kaibre.",
    links: [
      { label: "Kaibre", href: "/" },
      { label: "Kaibre — other products", href: "/#products" },
      { label: "Contact", href: "#contact" },
    ],
    languageLink: { label: "Baca dalam Bahasa Indonesia", href: ID_PATH },
  },
};
