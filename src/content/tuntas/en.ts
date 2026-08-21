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
    marketLabel: "Indonesia",
    toggle: { navLabel: "Language", en: "English", id: "Bahasa Indonesia" },
    cta: { label: "Walk through an example", href: "#contact" },
  },
  hero: {
    headline: "A new regulation arrives. Tuntas works out what it changes here.",
    body: "For Compliance and Legal at Indonesian financial institutions. You name the regulation and upload the documents you have. Tuntas returns the complete picture — obligation by obligation, with every conclusion pointing to the article and the company document it rests on.",
    cta: { label: "Walk through an example", href: "#contact" },
    secondary: { label: "How the work moves", href: "#workflow" },
    panel: {
      alt: "Illustrative obligation from a Tuntas register: a real OJK regulation analysed against a fictional company's documents. Obligation 45 requires directors and commissioners to hold competency certification; the company's documents cover the directors only, so the obligation is partly met, the missing document is requested by name, and the reviewer has not yet decided.",
      tag: "Illustrative",
      mark: "Tuntas",
      institution: "PT Benderang Dana Teknologi — fictional",
      title: "Obligation register — POJK 40 of 2024",
      docMeta: "Draft · a real regulation, a fictional company, 18 documents",
      finding: {
        id: "No. 45",
        severity: "Partly met",
        tone: "neutral",
        title:
          "Directors and members of the Board of Commissioners must hold competency certification from a professional certification institution",
        meta: "Art. 51(1) · action needed from you",
      },
      body: [
        {
          label: "What the regulation requires",
          text: "Every member of the Board of Directors and the Board of Commissioners holds a valid competency certificate issued by a professional certification institution in the financial-technology field.",
        },
        {
          label: "What your documents show",
          text: "The competency SOP covers the Board of Directors and names the certifying institution. No document covers the Board of Commissioners, and no certificates are attached for its three members.",
          secondary: true,
        },
        {
          label: "What Tuntas needs",
          text: "The certificates for the three commissioners, or the clause that extends the requirement to them. Until then the obligation is partly met — Tuntas does not conclude on documents it has not seen.",
        },
        {
          label: "Reviewer",
          text: "Not yet reviewed.",
        },
      ],
      pageLine: "What changed · 45 / 49",
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
    chain: [
      {
        label: "Obligation in the new regulation",
        text: "The company must hold a written policy on the handling of user complaints, reviewed at least annually.",
        meta: "POJK 40/2024, Art. 62(1)",
      },
      {
        label: "What the documents show",
        text: "The complaint-handling SOP exists and names an owner. It records no review cycle.",
        meta: "Source: SOP Penanganan Pengaduan, §4",
      },
      {
        label: "Conclusion",
        text: "Partly met — the policy is in place; the annual review is not evidenced.",
        meta: "Action needed from you",
        accent: true,
      },
      {
        label: "What to change, where",
        text: "Add the annual review cycle and its named owner to §4 of the complaint-handling SOP.",
      },
      {
        label: "Reviewer",
        text: "Not yet reviewed. Nothing closes on a click; the status moves when the evidence does.",
      },
    ],
    caption: "Illustrative example.",
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
    actions: {
      title: "Action centre",
      tag: "Illustrative",
      columns: {
        when: "Deadline",
        action: "What has to change, and where",
        owner: "Owner",
        state: "State",
      },
      rows: [
        {
          when: "Passed",
          action: "Extend the competency-certification clause to the Board of Commissioners — competency SOP §2",
          owner: "Human Capital",
          state: "Open",
        },
        {
          when: "10 Sep 2026",
          action: "Add the monthly report to OJK to the reporting calendar — reporting SOP §7",
          owner: "Finance",
          state: "In revision",
        },
        {
          when: "31 Dec 2026",
          action: "Add the annual review cycle to the complaint-handling SOP — §4",
          owner: "Operations",
          state: "Awaiting review",
        },
      ],
    },
    report: {
      title: "Memorandum to the Board of Directors and Board of Commissioners",
      sections: [
        "What the regulation is, and what it revokes",
        "What changed, and what it means for this company",
        "Obligations not met, and partly met",
        "What cannot be assessed yet, and what is needed to assess it",
        "Deadlines, passed ones first",
        "What has to change, in which document, and who owns it",
      ],
      signoff: {
        heading: "Standing",
        rows: [
          { role: "Prepared by", state: "Tuntas — draft" },
          { role: "Reviewed by", state: "Your compliance officer" },
          { role: "Decided by", state: "Your compliance function" },
        ],
      },
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
