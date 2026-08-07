import type { IndoContent } from "./types";
import { ID_PATH } from "./locale";

/**
 * SecurePulse Indonesia — English.
 *
 * Written to the executive standard: a CCO, GC, CRO or audit executive gives
 * this page two to three minutes. The headline carries the outcome and the
 * time compression; the first sections carry the concrete inputs and
 * deliverables; everything else is depth.
 *
 * Claim discipline:
 *  - The ~30-minute figure is founder/practitioner-supplied evidence from the
 *    working SecurePulse workflow, reviewed by a senior regulatory lawyer. It
 *    is always qualified ("about", "for a configured assessment") and never
 *    an SLA. The qualification line appears with the claim, once per claim
 *    cluster, and stays short.
 *  - OJK, Bank Indonesia and insurance-sector requirements are named only as
 *    target corpus categories configured per engagement — never as approved,
 *    certified or completely covered.
 *  - Illustrative figures appear only inside mockups tagged "Illustrative".
 *  - "Review-ready", never "audit-ready" — SecurePulse does not confer audit
 *    assurance.
 */
export const EN: IndoContent = {
  locale: "en",
  meta: {
    title: "SecurePulse Indonesia — AI-assisted compliance assessment",
    description:
      "Gap analysis, severity-ranked findings, a remediation plan and a review-ready draft report in about 30 minutes — grounded in the regulatory corpus configured for the engagement, traced to sources, and verified by your reviewers.",
    ogLocale: "en_GB",
  },
  chrome: {
    skip: "Skip to content",
    kaibreHome: "Kaibre — company site",
    marketLabel: "Indonesia",
    toggle: { navLabel: "Language", en: "English", id: "Bahasa Indonesia" },
    cta: { label: "Show us a workflow", href: "#contact" },
  },
  hero: {
    headline: "Compliance assessment drafts in about 30 minutes, not weeks.",
    body: "SecurePulse AI turns the regulatory requirements, policies and evidence of an Indonesian financial institution into a gap analysis, remediation plan and a polished, review-ready draft — verified and signed off by your reviewers. Timing varies with scope, evidence volume and configuration.",
    cta: { label: "Show us a workflow", href: "#contact" },
    secondary: { label: "How it works", href: "#workflow" },
    panel: {
      alt: "Illustrative detailed-finding page from a SecurePulse compliance assessment for a fictional Indonesian bank: a high-severity finding that privileged-access recertification left three accounts unattested, with what was observed, the risk, the immediate remediation, and the reviewer state.",
      tag: "Illustrative",
      institution: "PT Bank Selat Biru",
      title: "Regulatory compliance assessment",
      docMeta: "Draft 1.0 · For management review",
      finding: {
        id: "F-01",
        severity: "High",
        title: "Privileged-access recertification asserted, but three accounts unattested",
        meta: "Access governance · 8 points",
      },
      body: [
        {
          label: "What we observed",
          text: "The IAM entitlement export lists 14 privileged accounts on production customer-data systems; the Q2 recertification attestation covers 11. Two shared service accounts and one dormant administrator account are unattested, and no deactivation records were supplied.",
        },
        {
          label: "Risk",
          text: "Unattested privileged access to customer data cannot support management reliance or an examination response.",
          secondary: true,
        },
        {
          label: "Remediation",
          text: "Immediate — recertify or suspend the three accounts; retain attestations and deactivation records.",
        },
        {
          label: "Reviewer",
          text: "Pending verification.",
        },
      ],
      pageLine: "Detailed findings · 5 / 12",
    },
  },
  inOut: {
    heading: "What goes in. What comes out.",
    reads: {
      title: "SecurePulse reads",
      items: [
        {
          icon: "corpus",
          label: "The applicable regulatory corpus",
          note: "curated and maintained by Kaibre — not rebuilt by your team",
        },
        { icon: "policy", label: "Internal policies and procedures" },
        { icon: "evidence", label: "Supporting evidence and documentation" },
        { icon: "history", label: "Previous findings, where relevant" },
      ],
    },
    produces: {
      title: "SecurePulse produces",
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
        body: "SecurePulse AI maps requirements to evidence and drafts the gap analysis.",
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
        body: "Your reviewer verifies the conclusions. SecurePulse produces the report.",
      },
    ],
  },
  trace: {
    heading: "No finding without a source.",
    body: "Every finding stays linked to its evidence, the source behind it, and the reviewer who verified it.",
    chain: [
      {
        label: "Regulatory requirement",
        text: "Access to customer data must be restricted to authorised roles.",
      },
      {
        label: "Evidence found",
        text: "Policy defines role-based access — periodic access-review records are incomplete.",
        meta: "Source: access-management policy",
      },
      {
        label: "Assessment",
        text: "Partial — access reviews not evidenced.",
        meta: "Severity: High",
        accent: true,
      },
      {
        label: "Remediation",
        text: "Implement periodic access reviews with named ownership and retained records.",
      },
      {
        label: "Reviewer",
        text: "Pending verification.",
      },
    ],
    caption: "Illustrative example.",
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
    roadmap: {
      title: "Remediation roadmap",
      tag: "Illustrative",
      columns: {
        phase: "Phase",
        action: "Recommendation",
        owner: "Owner",
        reduction: "Risk reduction",
      },
      rows: [
        {
          phase: "Immediate (0‑30d)",
          action: "Recertify or suspend the unattested privileged accounts; retain attestations",
          owner: "Security manager",
          reduction: "High",
        },
        {
          phase: "Short‑term (1‑6m)",
          action: "Sampled evidence validation across access and change controls",
          owner: "Lead reviewer",
          reduction: "High",
        },
        {
          phase: "Long‑term (6‑12m+)",
          action: "Evidence-led annual assessment with mandatory artefact capture",
          owner: "Governance",
          reduction: "Medium",
        },
      ],
    },
    report: {
      title: "Compliance assessment report",
      sections: [
        "Executive summary",
        "Risk scorecard",
        "Detailed findings",
        "Risk matrix",
        "Remediation roadmap",
        "Compliance mapping",
        "Reviewer sign-off",
      ],
      signoff: {
        heading: "Sign-off",
        rows: [
          { role: "Prepared by", state: "SecurePulse — draft" },
          { role: "Verified by", state: "Your reviewer" },
          { role: "Approved by", state: "Your compliance lead" },
        ],
      },
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
      title: "With SecurePulse",
      steps: [
        "Corpus, policies and evidence in one place",
        "SecurePulse AI drafts the assessment",
        "Gap analysis and remediation plan",
        "Reviewer verification",
        "Polished, review-ready draft report",
      ],
      outcome: "About 30 minutes to a polished draft",
    },
    note: "Timing varies with assessment scope, evidence volume, and configuration.",
    review: {
      heading: "SecurePulse drafts. Your team decides.",
      body: [
        "AI accelerates the reading, mapping and cross-referencing — and every conclusion stays visible, challengeable, and traceable to its evidence.",
        "SecurePulse is professional tooling — not a legal opinion, an audit, or a certification. Findings remain drafts until a qualified reviewer verifies them, and every report carries that sign-off.",
      ],
    },
  },
  useCases: {
    heading: "Built for regulated work.",
    groups: [
      {
        title: "Banks",
        items: [
          "Recurring regulatory assessments",
          "Control gap analysis",
          "Evidence-backed findings",
        ],
      },
      {
        title: "Fintechs",
        items: [
          "Regulatory readiness",
          "Policy and control assessment",
          "Remediation during rapid product change",
        ],
      },
      {
        title: "Insurers",
        items: [
          "Regulatory obligation assessment",
          "Governance and policy review",
          "Recurring findings and remediation reporting",
        ],
      },
    ],
  },
  indonesia: {
    heading: "Built around the regulations that apply to your institution.",
    items: [
      {
        title: "Curated Indonesian regulatory knowledge base",
        note: "Configured with the corpus applicable to the institution and assessment scope — OJK, Bank Indonesia, PPATK and insurance-sector requirements as relevant — curated, verified and maintained as part of the deployment.",
      },
      {
        title: "Document ingestion for the engagement",
        note: "SecurePulse can be configured to ingest the applicable corpus alongside your policies, procedures and evidence.",
      },
      {
        title: "Self-contained deployment",
        note: "Its own database, administrator-created accounts, no public sign-up — and it can be operated inside your environment.",
      },
      {
        title: "Configurable AI model deployment",
        note: "Analysis runs on a model deployment your institution approves and controls.",
      },
    ],
    note: "SecurePulse does not claim regulator approval. Corpus coverage is scoped and verified per engagement.",
  },
  contact: {
    heading: "Bring us one compliance workflow.",
    body: "Show us one assessment your team handles manually — we will demonstrate how SecurePulse structures the evidence, gap analysis, remediation plan and review-ready draft. The initial demonstration costs nothing.",
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
        label: "What compliance workflow would you like to test?",
        hint: "One line is enough.",
        placeholder:
          "e.g. a recurring regulatory assessment, a policy review, a control gap analysis",
        error: "A few words about the workflow, so we can prepare a relevant demonstration.",
      },
      submit: "Send it",
      sending: "Sending…",
      sent: {
        heading: "Thanks — that reached us.",
        body: "Your message is in our inbox. The people building SecurePulse will come back to you to arrange the demonstration.",
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
    tagline: "SecurePulse is a Kaibre product.",
    links: [
      { label: "Kaibre", href: "/" },
      { label: "SecurePulse — product overview", href: "/securepulse" },
      { label: "Contact", href: "#contact" },
    ],
    languageLink: { label: "Baca dalam Bahasa Indonesia", href: ID_PATH },
  },
};
