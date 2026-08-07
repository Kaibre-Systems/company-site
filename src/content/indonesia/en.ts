import type { IndoContent } from "./types";
import { ID_PATH } from "./locale";

/**
 * SecurePuls Indonesia — English.
 *
 * Written to the executive standard: a time-constrained compliance, legal,
 * risk or audit decision-maker should know what the product is, what goes in,
 * what comes out, and where human review sits within two to three minutes.
 *
 * Claim discipline (audited against the product repositories):
 *  - Every capability stated is implemented in the SecurePuls product today.
 *  - No named Indonesian regulation, regulator, framework or law. The
 *    regulatory corpus is configured per engagement; this page names no
 *    framework until support for it is verified.
 *  - No certifications, endorsements, percentages, time savings, customer
 *    names or counts. The worked example in the traceability section is
 *    labelled illustrative.
 */
export const EN: IndoContent = {
  locale: "en",
  meta: {
    title: "SecurePuls Indonesia — compliance assessment with the evidence attached",
    description:
      "SecurePuls structures compliance assessment for Indonesian banks, fintechs and insurers: every requirement answered, findings graded and traced to their sources, and a report your own reviewers sign off.",
    ogLocale: "en_GB",
  },
  chrome: {
    skip: "Skip to content",
    kaibreHome: "Kaibre — company site",
    marketLabel: "Indonesia",
    toggle: {
      navLabel: "Language",
      en: "English",
      id: "Bahasa Indonesia",
    },
    cta: { label: "Discuss an assessment", href: "#contact" },
  },
  hero: {
    audience: "For banks, fintechs and insurers in Indonesia",
    headline: "Compliance assessment, with the evidence attached.",
    body: "SecurePuls turns a set of requirements and your organisation's evidence into a structured, review-ready assessment: every requirement answered, findings graded by severity and traced to their sources, and a report your own reviewers sign off.",
    cta: { label: "Discuss an assessment", href: "#contact" },
    secondary: { label: "See the workflow", href: "#workflow" },
    panel: {
      alt: "Draft assessment findings for an internal control review, each row carrying its evidence status, awaiting reviewer sign-off.",
      caption: "Draft findings — internal control assessment",
      rows: [
        { label: "Access management", status: "Verified", tone: "positive" },
        { label: "Business continuity", status: "Partial", tone: "neutral" },
        { label: "Third-party oversight", status: "Gap", tone: "attention" },
      ],
      footnote: "Findings stay drafts until a designated reviewer signs off.",
    },
    illustrationNote: "Interface illustration.",
  },
  inOut: {
    heading: "What goes in. What comes out.",
    give: {
      title: "You provide",
      items: [
        "The requirement set the assessment runs against — regulatory provisions and internal policy, configured per engagement",
        "Evidence against each requirement: your team's answers, notes and supporting attachments",
        "A reviewer who owns the sign-off",
      ],
    },
    get: {
      title: "SecurePuls produces",
      items: [
        "A structured assessment across consistent domains — each requirement phrased as a question your team can verify",
        "Findings only where there is a genuine gap or uncertainty, graded Critical to Informational",
        "Every regulatory reference labelled by the strength of the evidence behind it",
        "Recommendations attached to each finding — immediate, short-term and long-term actions",
        "A review-ready report — findings, risk matrix, roadmap — exported to PDF or Word",
      ],
    },
  },
  workflow: {
    heading: "From requirement set to signed report.",
    steps: [
      {
        n: "01",
        title: "Configure the engagement",
        body: "The applicable requirement set is configured for the engagement, drawn from a maintained knowledge base rather than generated freely.",
      },
      {
        n: "02",
        title: "Generate the assessment",
        body: "SecurePuls structures the requirements into consistent domains, each one phrased as a question your team can verify.",
      },
      {
        n: "03",
        title: "Record the evidence",
        body: "Status, notes and supporting attachments are captured against each requirement as your team works through it.",
      },
      {
        n: "04",
        title: "Draft the findings",
        body: "Findings are raised only where there is a genuine gap or uncertainty — graded by severity, with recommendations attached.",
      },
      {
        n: "05",
        title: "Review and sign off",
        body: "Your reviewer accepts or corrects every finding. Nothing becomes final without sign-off from a designated reviewer.",
      },
      {
        n: "06",
        title: "Export the report",
        body: "A structured report carrying the findings, risk matrix and roadmap, exported to PDF or Word.",
      },
    ],
  },
  trace: {
    heading: "No finding without a source.",
    body: "A conclusion you cannot trace is a conclusion you cannot defend. SecurePuls keeps the chain intact — from the requirement, to the evidence recorded against it, to the source behind it, to the reviewer who signed it off.",
    chain: [
      {
        label: "Requirement",
        text: "Access rights to customer data are reviewed on a defined schedule.",
      },
      {
        label: "Evidence recorded",
        text: "Status: gap — no review record for the two most recent cycles.",
      },
      {
        label: "Source",
        text: "Internal access-management policy, review section.",
        meta: "Evidence label: VERIFIED",
      },
      {
        label: "Draft finding",
        text: "Periodic access reviews not evidenced.",
        meta: "Severity: High",
        accent: true,
      },
      {
        label: "Reviewer decision",
        text: "Confirmed and signed off by the designated reviewer.",
      },
    ],
    caption: "Illustrative example — not drawn from any specific regulation.",
    labelsHeading: "Every regulatory reference carries its confidence.",
    labels: [
      {
        code: "VERIFIED",
        note: "Confirmed from enacted legislation, an official authority source, or a standards body.",
      },
      {
        code: "PARTIAL",
        note: "Supported by reputable secondary sources; the primary source not independently confirmed.",
      },
      {
        code: "INFERRED",
        note: "Derived from consistent cross-referencing; no single primary source.",
      },
      {
        code: "GAP",
        note: "Unresolved. Stated as unresolved and escalated — never presented as a likely requirement.",
      },
    ],
  },
  comparison: {
    heading: "The same assessment, without the fragmentation.",
    before: {
      title: "The manual process",
      items: [
        "Requirements tracked in spreadsheets",
        "Evidence chased over email and shared folders",
        "Findings copied between documents",
        "Sources re-checked by hand at review",
        "The report assembled last, under deadline",
      ],
    },
    after: {
      title: "With SecurePuls",
      items: [
        "One structure holds requirements, evidence and findings",
        "Evidence is recorded where the requirement lives",
        "Sources stay attached as findings move",
        "Review happens inside the same workflow",
        "The report is generated from what was already reviewed",
      ],
    },
    review: {
      heading: "SecurePuls drafts. Your team decides.",
      body: [
        "SecurePuls is professional tooling for compliance work — not a legal opinion, not an audit, and not a certification. AI-assisted analysis accelerates the reading, structuring and cross-referencing; judgment stays with your team.",
        "Findings remain drafts until a qualified reviewer accepts them, and every report carries that sign-off.",
      ],
    },
  },
  useCases: {
    heading: "Built for regulated work.",
    body: "The same assessment structure carries the recurring, evidence-heavy work each institution already does.",
    groups: [
      {
        title: "Banks",
        items: [
          "Recurring regulatory and internal control assessments",
          "Policy-to-requirement mapping ahead of a regulatory review",
          "Evidence collection that stays attached to the requirement",
        ],
      },
      {
        title: "Fintechs",
        items: [
          "Preparing evidence for a regulatory review",
          "Keeping compliance documentation current through rapid product change",
          "Repeating control assessments without rebuilding them",
        ],
      },
      {
        title: "Insurers",
        items: [
          "Tracking regulatory obligations and internal policy in one structure",
          "Recurring governance and compliance reporting",
          "Assessment evidence reviewed before it reaches the report",
        ],
      },
    ],
  },
  trust: {
    heading: "Ready for your environment.",
    items: [
      {
        title: "Self-contained deployment",
        note: "SecurePuls runs as its own deployment with its own database, and can be operated inside your environment.",
      },
      {
        title: "Controlled access",
        note: "Accounts are created by your administrator. There is no public sign-up.",
      },
      {
        title: "Configurable model endpoint",
        note: "The analysis model is configured per deployment and can point at an approved, OpenAI-compatible endpoint.",
      },
      {
        title: "Traceable assessment content",
        note: "Every finding stays linked to the evidence and answers it came from.",
      },
    ],
    status: {
      heading: "Where SecurePuls stands in Indonesia",
      body: [
        "SecurePuls is built and operated by Kaibre, and is in active development and demonstration with regulated organisations. The requirement sets an assessment runs against are configured per engagement — and this page will name Indonesian frameworks only once support for them is verified.",
        "If your team assesses against regulatory or internal requirements in Indonesia, we would like to walk you through the current build.",
      ],
    },
  },
  contact: {
    heading: "Discuss an assessment.",
    body: "Tell us about the assessment work your team does — which requirements, how often, and who reviews it. It reaches the people building SecurePuls.",
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
          { value: "fintech", label: "Fintech" },
          { value: "insurer", label: "Insurer" },
          { value: "regulated-other", label: "Other regulated institution" },
          { value: "other", label: "Something else" },
        ],
      },
      need: {
        label: "Tell us about the assessment need",
        hint: "Which requirements does your team assess against, how often, and who reviews the result?",
        placeholder:
          "e.g. We run recurring internal control assessments across several entities. Requirements live in spreadsheets, evidence in shared folders, and two reviewers assemble the report by hand each cycle.",
        error: "A sentence or two more, so we can give you a useful reply.",
      },
      submit: "Send it",
      sending: "Sending…",
      sent: {
        heading: "Thanks — that reached us.",
        body: "Your message is in our inbox. You will hear back from the people building SecurePuls.",
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
    tagline: "SecurePuls is a Kaibre product.",
    links: [
      { label: "Kaibre", href: "/" },
      { label: "SecurePuls — product overview", href: "/securepuls" },
      { label: "Contact", href: "#contact" },
    ],
    languageLink: { label: "Baca dalam Bahasa Indonesia", href: ID_PATH },
  },
};
