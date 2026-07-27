/**
 * SecurePulse page copy.
 *
 * Grounded in the SecurePulse product repositories (read-only inspection).
 * Every capability below is implemented today. Roadmap items are excluded.
 *
 * Hard constraints:
 *  - SecurePulse assesses PHYSICAL security in the UAE/GCC. Not infosec, not cyber.
 *  - No certification, accreditation, regulatory approval, or endorsement is claimed.
 *  - No named customers, institutions, or sectors-as-customers.
 *  - No metrics, percentages, or time savings.
 *  - The product does not claim per-customer tenancy — that is not built yet.
 */

export const SP_HERO = {
  eyebrow: "SecurePulse — a Kaibre product",
  category: "Physical security assessment",
  headline: "Site assessments that show their working.",
  body: "SecurePulse turns a physical security inspection into a structured, evidence-backed assessment. It builds the checklist for the site's emirate and sector, captures photo evidence on the walk, grades findings by severity, and produces a consulting-standard report that a named assessor signs off.",
  cta: { label: "Talk to us about SecurePulse", href: "/contact?topic=securepulse" },
} as const;

export const SP_JURISDICTION = {
  eyebrow: "Why it is built this way",
  heading: "In the UAE, location decides the rulebook.",
  body: [
    "Physical security requirements in the UAE are set per emirate, not federally. A site in Dubai answers to a different authority stack than the same operator's site in Abu Dhabi or Sharjah, and critical infrastructure adds another layer again.",
    "SecurePulse starts from the site's emirate and sector, and builds the assessment from there. Regulatory references are drawn from a maintained knowledge base rather than generated freely.",
  ],
  note: "SecurePulse currently supports assessments for energy (oil and gas) sites and government buildings.",
} as const;

export const SP_WORKFLOW = {
  eyebrow: "The workflow",
  heading: "From site walk to signed report.",
  steps: [
    {
      n: "01",
      title: "Scope the assessment",
      body: "Capture the site's emirate, sector, and operating context. That intake decides which authorities and requirements apply.",
    },
    {
      n: "02",
      title: "Generate the checklist",
      body: "SecurePulse produces an assessment checklist organised across ten physical security domains and tailored to the site rather than pulled from a generic template.",
    },
    {
      n: "03",
      title: "Walk the site",
      body: "Assessors work the checklist on a phone or tablet, recording status and notes, and attaching photo evidence against individual items.",
    },
    {
      n: "04",
      title: "Draft findings",
      body: "Findings are raised only where there is a genuine gap or uncertainty, categorised by domain, numbered, and graded Critical, High, Medium, Low, or Informational.",
    },
    {
      n: "05",
      title: "Review, sign off, export",
      body: "A lead assessor and reviewer approve the assessment before it becomes a report. The output exports to PDF or Word for the client file.",
    },
  ],
} as const;

export const SP_DOMAINS = {
  eyebrow: "Coverage",
  heading: "Ten domains, assessed consistently.",
  body: "Every assessment is organised across the same domains, so findings can be compared between sites and across time.",
  items: [
    "Perimeter security",
    "Access control",
    "Surveillance & monitoring",
    "Intrusion detection",
    "Security personnel",
    "Environmental & physical controls",
    "Internal zones & segregation",
    "Policies & procedures",
    "Supply chain & delivery",
    "Incident response & recovery",
  ],
} as const;

export const SP_EVIDENCE = {
  eyebrow: "Evidence discipline",
  heading: "Every regulatory claim carries its confidence.",
  body: [
    "UAE physical security guidance is unevenly published. Some requirements are set out in enacted law; some are only visible through approved installers and industry sources; some are genuinely unresolved.",
    "SecurePulse labels each regulatory reference with the strength of the evidence behind it, and it is not permitted to present an unresolved item as a probable requirement. Where the answer is not established, the assessment says so and escalates it to the competent authority.",
  ],
  labels: [
    {
      code: "VERIFIED",
      note: "Confirmed from enacted legislation, an official authority portal, or a standards body.",
    },
    {
      code: "PARTIAL",
      note: "Supported by reputable secondary sources, but the primary source was not independently confirmed.",
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
} as const;

export const SP_HUMAN = {
  eyebrow: "Responsibility",
  heading: "SecurePulse drafts. People decide.",
  body: [
    "SecurePulse is professional advisory tooling. It is not a regulatory audit, a legal opinion, or a certification, and it does not replace a qualified security assessor.",
    "Findings are drafts until a lead assessor and a reviewer accept them. Every report carries a named sign-off, records that it is a point-in-time assessment, and instructs the reader to verify regulatory references with the competent authority.",
  ],
} as const;

export const SP_REPORT = {
  eyebrow: "The deliverable",
  heading: "A report a consultant would recognise.",
  body: "SecurePulse produces the sections an assessment report is expected to contain, in a consistent structure, exportable to PDF or Word.",
  sections: [
    "Assessment summary and risk scorecard",
    "Findings by domain",
    "Detailed findings with severity",
    "Risk matrix",
    "Compensating controls for critical and high findings",
    "Indicative compliance mapping",
    "Prioritised recommendations roadmap",
    "Assumptions, information gaps, and appendices",
    "Named sign-off and attestation",
  ],
} as const;

export const SP_STATUS = {
  heading: "Where SecurePulse is today",
  body: "SecurePulse is in active development and demonstration with organisations in the UAE and the wider Gulf. We are not claiming certification, regulatory endorsement, or completed institutional adoption. If you assess physical security for regulated or high-consequence sites, we would like to show you the current build and hear where it breaks.",
  cta: { label: "Talk to us about SecurePulse", href: "/contact?topic=securepulse" },
} as const;
