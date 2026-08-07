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
  category: "Physical security assessment",
  headline: "Site assessments that show their working.",
  body: "SecurePulse turns a physical security inspection into a structured, evidence-backed assessment. It builds the checklist for the site's emirate and sector, captures photo evidence on the walk, grades findings by severity, and produces a consulting-standard report that a named assessor signs off.",
  cta: { label: "Talk to us about SecurePulse", href: "/contact?topic=securepulse" },
} as const;

/**
 * The hero visual: one page of the report SecurePulse actually produces,
 * structured after the real deliverable's detailed-finding anatomy. The
 * facility is anonymised the way a published excerpt would be — no client,
 * no authority named inside the mockup — and the corner tag marks it
 * illustrative.
 */
export const SP_HERO_PANEL = {
  alt: "Illustrative detailed-finding page from a SecurePulse physical security assessment of an anonymised Dubai energy-sector facility: a high-severity finding that perimeter CCTV was asserted as operational without retention or test evidence, with what was observed, the risk, the immediate remediation, and the reviewer state.",
  tag: "Illustrative",
  institution: "Energy-sector facility · Dubai",
  title: "Physical security assessment",
  docMeta: "Draft 1.0 · For management review",
  finding: {
    id: "F-07",
    severity: "High",
    title: "Perimeter CCTV asserted as operational, but retention and test records not evidenced",
    meta: "Surveillance & monitoring · 8 points",
  },
  body: [
    {
      label: "What we observed",
      text: "The checklist records continuous perimeter coverage across twelve cameras on the north boundary; no retention settings, alarm-test reports, or maintenance records were attached to evidence it.",
    },
    {
      label: "Risk",
      text: "Unevidenced surveillance cannot support management reliance — or an incident investigation.",
      secondary: true,
    },
    {
      label: "Remediation",
      text: "Immediate — attach retention settings and the latest alarm-test report; re-verify within 30 days.",
    },
    {
      label: "Reviewer",
      text: "Pending sign-off.",
    },
  ],
  pageLine: "Detailed findings · 6 / 14",
} as const;

export const SP_JURISDICTION = {
  heading: "In the UAE, location decides the rulebook.",
  body: [
    "Physical security requirements in the UAE are set per emirate, not federally. A site in Dubai answers to a different authority stack than the same operator's site in Abu Dhabi or Sharjah, and critical infrastructure adds another layer again.",
    "SecurePulse starts from the site's emirate and sector, and builds the assessment from there. Regulatory references are drawn from a maintained knowledge base rather than generated freely.",
  ],
  note: "SecurePulse currently supports assessments for energy (oil and gas) sites and government buildings.",
} as const;

export const SP_WORKFLOW = {
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

/**
 * The compliance-mapping grammar from the report itself: requirement,
 * evidence label, where it stands, and its priority. Three rows show the
 * discipline — one confirmed, one partial, one honest gap. Anonymised:
 * authorities are described, never named, inside a mockup.
 */
export const SP_MAPPING = {
  title: "Requirement mapping",
  tag: "Illustrative",
  columns: {
    requirement: "Requirement",
    evidence: "Evidence",
    status: "Standing",
    priority: "Priority",
  },
  rows: [
    {
      requirement: "Continuous perimeter lighting at the site boundary",
      evidence: "VERIFIED",
      status: "Applies to the site — confirmed from the authority's enacted framework",
      priority: "High",
    },
    {
      requirement: "CCTV retention minimums for restricted areas",
      evidence: "PARTIAL",
      status: "Applies — technical minimums to be confirmed against the current manual",
      priority: "Medium",
    },
    {
      requirement: "Operator-specific design standards",
      evidence: "GAP",
      status: "Unresolved — escalated to the competent authority, not assumed",
      priority: "High",
    },
  ],
} as const;

export const SP_HUMAN = {
  heading: "SecurePulse drafts. People decide.",
  body: [
    "SecurePulse is professional advisory tooling. It is not a regulatory audit, a legal opinion, or a certification, and it does not replace a qualified security assessor.",
    "Findings are drafts until a lead assessor and a reviewer accept them. Every report carries a named sign-off, records that it is a point-in-time assessment, and instructs the reader to verify regulatory references with the competent authority.",
  ],
} as const;

export const SP_REPORT = {
  heading: "A report a consultant would recognise.",
  body: "After the walk, the checklist, and the review, leadership receives a document — the sections an assessment report is expected to contain, in a consistent structure, exportable to PDF or Word.",
  contents: {
    title: "Physical security assessment report",
    sections: [
      "Assessment summary and risk scorecard",
      "Findings by domain",
      "Detailed findings with severity",
      "Risk matrix",
      "Compensating controls",
      "Indicative compliance mapping",
      "Recommendations roadmap",
      "Assumptions and information gaps",
      "Sign-off and attestation",
    ],
    signoff: {
      heading: "Sign-off",
      rows: [
        { role: "Prepared by", state: "SecurePulse — draft" },
        { role: "Lead assessor", state: "Named sign-off" },
        { role: "Reviewer", state: "Approved for issue" },
      ],
    },
  },
  scorecard: {
    title: "Risk scorecard",
    tag: "Illustrative",
    columns: { severity: "Severity", count: "Findings" },
    rows: [
      { severity: "Critical", count: "0" },
      { severity: "High", count: "2", accent: true },
      { severity: "Medium", count: "1" },
      { severity: "Low", count: "0" },
      { severity: "Informational", count: "1" },
    ],
    totals: { label: "Weighted risk points", value: "21" },
  },
} as const;

/**
 * Where SecurePulse runs. The UAE positioning stays this page's claim; the
 * Indonesian financial-sector deployment is a separate experience and the
 * two must not blur into one — but a buyer on this page should discover it
 * without already knowing the URL.
 */
export const SP_MARKETS = {
  heading: "Two markets, one discipline.",
  markets: [
    {
      name: "UAE & Gulf",
      domain: "Physical security assessment",
      note: "Emirate- and sector-aware site assessments for energy and government facilities. This page.",
    },
    {
      name: "Indonesia",
      domain: "Financial-institution compliance",
      note: "AI-assisted regulatory compliance assessment for banks, fintechs and insurers — in English and Bahasa Indonesia.",
      href: "/securepulse/indonesia",
      cta: "SecurePulse Indonesia",
      flag: true,
    },
  ],
} as const;

export const SP_STATUS = {
  heading: "Where SecurePulse is today",
  body: "SecurePulse is in active development and demonstration with organisations in the UAE and the wider Gulf. If you assess physical security for regulated or high-consequence sites, we would like to show you the current build and hear where it breaks.",
  cta: { label: "Talk to us about SecurePulse", href: "/contact?topic=securepulse" },
} as const;
