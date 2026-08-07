import type { IndoContent } from "./types";
import { ID_PATH } from "./locale";

/**
 * SecurePuls Indonesia — English.
 *
 * Written to the executive standard: a CCO, GC, CRO or audit executive gives
 * this page two to three minutes. The headline carries the outcome and the
 * time compression; the first sections carry the concrete inputs and
 * deliverables; everything else is depth.
 *
 * Claim discipline:
 *  - The ~30-minute figure is founder/practitioner-supplied evidence from the
 *    working SecurePuls workflow, reviewed by a senior regulatory lawyer. It
 *    is always qualified ("about", "for a configured assessment") and never
 *    an SLA. The qualification line appears with the claim, once per claim
 *    cluster, and stays short.
 *  - OJK, Bank Indonesia and insurance-sector requirements are named only as
 *    target corpus categories configured per engagement — never as approved,
 *    certified or completely covered.
 *  - Illustrative figures appear only inside mockups tagged "Illustrative".
 *  - "Review-ready", never "audit-ready" — SecurePuls does not confer audit
 *    assurance.
 */
export const EN: IndoContent = {
  locale: "en",
  meta: {
    title: "SecurePuls Indonesia — AI-assisted compliance assessment",
    description:
      "Gap analysis, severity-ranked findings, a remediation plan and a review-ready draft report in about 30 minutes — grounded in the regulatory corpus configured for the engagement, traced to sources, and verified by your reviewers.",
    ogLocale: "en_GB",
  },
  chrome: {
    skip: "Skip to content",
    kaibreHome: "Kaibre — company site",
    marketLabel: "Indonesia",
    toggle: { navLabel: "Language", en: "English", id: "Bahasa Indonesia" },
    cta: { label: "Discuss an assessment", href: "#contact" },
  },
  hero: {
    kicker: "AI-assisted compliance assessment, for banks, fintechs and insurers in Indonesia",
    headline: "Compliance assessment drafts in about 30 minutes, not weeks.",
    body: "SecurePuls reads the regulatory corpus configured for the engagement alongside your policies and evidence, maps each requirement to its evidence, drafts the gap analysis — severity-ranked findings, remediation plan — and produces a review-ready draft report. Your reviewers verify and sign off.",
    timingNote:
      "Timing varies with assessment scope, evidence volume, and configuration.",
    cta: { label: "Discuss an assessment", href: "#contact" },
    secondary: { label: "See the workflow", href: "#workflow" },
    panel: {
      alt: "Illustrative assessment overview: requirements assessed, their status distribution, open findings, and review state.",
      tag: "Illustrative",
      caption: "Regulatory assessment — banking",
      headline: { value: "42", label: "requirements assessed" },
      bar: [
        { label: "Compliant", count: 31, tone: "positive" },
        { label: "Partial", count: 6, tone: "neutral" },
        { label: "Gap", count: 5, tone: "attention" },
      ],
      rows: [
        { label: "5 findings — 1 critical, 2 high", tone: "attention" },
        { label: "Evidence mapped to sources", tone: "positive" },
        { label: "Awaiting reviewer verification", tone: "neutral" },
      ],
      footnote: "Findings stay drafts until the designated reviewer signs off.",
    },
    illustrationNote: "Interface illustration.",
  },
  inOut: {
    heading: "What goes in. What comes out.",
    reads: {
      title: "SecurePuls reads",
      items: [
        {
          icon: "corpus",
          label: "The applicable regulatory corpus",
          note: "curated and configured for the engagement",
        },
        { icon: "policy", label: "Internal policies and procedures" },
        { icon: "evidence", label: "Supporting evidence and documentation" },
        { icon: "history", label: "Previous findings, where relevant" },
      ],
    },
    produces: {
      title: "SecurePuls produces",
      items: [
        { icon: "assessment", label: "Requirement-by-requirement control assessment" },
        { icon: "map", label: "Evidence map with exact source references" },
        { icon: "gap", label: "Gap analysis" },
        { icon: "severity", label: "Findings ranked by severity" },
        { icon: "remediation", label: "Remediation plan with recommendations" },
        { icon: "report", label: "Review-ready draft report — PDF or Word" },
      ],
    },
  },
  workflow: {
    heading: "Four stages. One evidence trail.",
    stages: [
      {
        n: "01",
        icon: "ground",
        title: "Ground",
        body: "The regulatory corpus, your policies, and your evidence — in one place.",
      },
      {
        n: "02",
        icon: "assess",
        title: "Assess",
        body: "AI maps requirements to evidence and drafts the gap analysis.",
      },
      {
        n: "03",
        icon: "remediation",
        title: "Remediate",
        body: "Findings ranked by severity, each with a remediation action.",
      },
      {
        n: "04",
        icon: "review",
        title: "Review & report",
        body: "Your reviewer verifies the conclusions. SecurePuls produces the report.",
      },
    ],
  },
  trace: {
    heading: "No finding without a source.",
    body: "Every finding stays linked to its evidence, the source behind it, and the reviewer who verified it.",
    chain: [
      {
        label: "Regulatory requirement",
        text: "Access rights to customer data are reviewed on a defined schedule.",
      },
      {
        label: "Evidence found",
        text: "Policy requires quarterly reviews — no review records for the two most recent quarters.",
        meta: "Source: access-management policy, review section",
      },
      {
        label: "Gap",
        text: "Periodic access reviews not evidenced.",
        meta: "Severity: High",
        accent: true,
      },
      {
        label: "Remediation",
        text: "Reinstate the review cycle and retain sign-off records.",
      },
      {
        label: "Reviewer verification",
        text: "Confirmed by the designated reviewer.",
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
  deliverables: {
    heading: "What you receive.",
    remediation: {
      caption: "Remediation plan — extract. Illustrative.",
      columns: {
        finding: "Finding",
        severity: "Severity",
        action: "Remediation",
        target: "Target",
      },
      rows: [
        {
          finding: "Access reviews not evidenced",
          severity: "High",
          tone: "attention",
          action: "Reinstate the quarterly review cycle",
          target: "30 days",
        },
        {
          finding: "Incident escalation untested",
          severity: "Medium",
          tone: "neutral",
          action: "Run and document an escalation exercise",
          target: "60 days",
        },
        {
          finding: "Retention schedule out of date",
          severity: "Low",
          tone: "positive",
          action: "Align the schedule with current policy",
          target: "90 days",
        },
      ],
    },
    report: {
      caption: "Draft report — structure",
      title: "Compliance assessment report",
      sections: [
        "Executive summary",
        "Gap analysis",
        "Findings and severity",
        "Remediation plan",
        "Source references",
        "Reviewer sign-off",
      ],
    },
  },
  comparison: {
    heading: "What changes.",
    before: {
      title: "Manual assessment",
      steps: [
        "Reading the regulations",
        "Spreadsheets and trackers",
        "Chasing evidence",
        "Manual gap analysis",
        "Writing the report",
      ],
      outcome: "Days to weeks",
    },
    after: {
      title: "With SecurePuls",
      steps: [
        "Corpus, policies and evidence in one place",
        "AI-assisted assessment",
        "Gap analysis and remediation plan",
        "Reviewer verification",
        "Review-ready draft report",
      ],
      outcome: "About 30 minutes to a first draft",
    },
    note: "Timing varies with assessment scope, evidence volume, and configuration.",
    review: {
      heading: "SecurePuls drafts. Your team decides.",
      body: [
        "AI accelerates the reading, mapping and cross-referencing — and every conclusion stays visible, challengeable, and traceable to its evidence.",
        "SecurePuls is professional tooling — not a legal opinion, an audit, or a certification. Findings remain drafts until a qualified reviewer verifies them, and every report carries that sign-off.",
      ],
    },
  },
  useCases: {
    heading: "Built for regulated work.",
    groups: [
      {
        title: "Banks",
        items: [
          "Recurring regulatory and internal control assessments",
          "Policy-to-requirement mapping with control gap analysis",
          "Evidence-backed findings and remediation tracking",
        ],
      },
      {
        title: "Fintechs",
        items: [
          "Regulatory readiness ahead of a licensing step or review",
          "Evidence kept current through rapid product change",
          "Policy and control assessment with gap remediation",
        ],
      },
      {
        title: "Insurers",
        items: [
          "Regulatory obligation assessment",
          "Governance and policy review",
          "Recurring compliance reporting with findings and remediation",
        ],
      },
    ],
  },
  indonesia: {
    heading: "Built around the regulations that apply to your institution.",
    items: [
      {
        title: "Curated Indonesian regulatory knowledge base",
        note: "Indonesian deployments are configured with the regulatory corpus for the engagement — OJK, Bank Indonesia and insurance-sector requirements as applicable — with source references.",
      },
      {
        title: "Document ingestion for the engagement",
        note: "SecurePuls can be configured to ingest the applicable corpus alongside your policies, procedures and evidence.",
      },
      {
        title: "Self-contained deployment",
        note: "Its own database, administrator-created accounts, no public sign-up — and it can be operated inside your environment.",
      },
      {
        title: "Configurable model endpoint",
        note: "Analysis can run against an approved, OpenAI-compatible endpoint.",
      },
    ],
    note: "SecurePuls does not claim regulator approval. Corpus coverage is scoped and verified per engagement.",
  },
  contact: {
    heading: "Discuss an assessment.",
    body: "Tell us which requirements your team assesses against and who reviews the result. It reaches the people building SecurePuls.",
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
