/**
 * Homepage copy.
 *
 * Claim discipline: no customer names, no logos, no testimonials, no headcount,
 * no certifications, no metrics, no percentages, no unsigned partnerships.
 * The two dollar figures in `proof` are founder-approved for publication.
 */

export const HERO = {
  headline: "Software for work that has to be right.",
  body: "Kaibre is a software company. We build our own products, we build products with partners, and we take on a small number of commissioned systems — all of it in production, all of it still ours to run.",
  primary: { label: "Start a conversation", href: "/contact" },
  secondary: { label: "See what we've built", href: "/work" },
  modes: [
    { label: "Products", note: "Software we own and operate" },
    { label: "Partnerships", note: "Products built with domain partners" },
    { label: "Commissioned", note: "Production systems built by request" },
  ],
} as const;

export const THESIS = {
  heading: "Expert judgment, spent on volume.",
  body: [
    "Something valuable depends on a person's judgment — an assessor's, an operator's, a closer's — and most of their day goes to the volume around it. We build the system that carries the volume.",
  ],
  flow: [
    {
      label: "Volume arrives",
      note: "Hundreds of documents, calls, or records — all of it needing attention.",
    },
    {
      label: "The system carries it",
      note: "Reads, checks, classifies, and prepares, consistently and at pace.",
    },
    {
      label: "A person decides",
      note: "The judgment that carries consequence stays with the person.",
      accent: true,
    },
  ],
  examples: [
    {
      label: "Inspecting",
      note: "Walking a site against a regulatory standard, then writing it up.",
    },
    {
      label: "Calling",
      note: "Working a list to find the few conversations worth having.",
    },
    {
      label: "Record-keeping",
      note: "Holding thousands of records accurate when each one carries money.",
    },
  ],
} as const;

export const PROOF = {
  heading: "A catalogue where a single record is worth five or six figures.",
  body: [
    "Kaibre built the production software a luxury-commerce business runs on: individual products valued from approximately US$10,000 to US$500,000, across a catalogue worth tens of millions of dollars.",
    "At those values accuracy is not a quality-of-life feature. A record that is wrong, stale, or mispriced is a commercial event. The system is live in commercial use, and Kaibre continues to support and operate it.",
  ],
  figures: [
    { value: "$10k – $500k", label: "Individual product value" },
    { value: "Tens of millions", label: "Catalogue value" },
  ],
  confidentiality: "Client and implementation details are withheld under confidentiality.",
  link: { label: "Read the full snapshot", href: "/work" },
} as const;

export const PRODUCTS = {
  heading: "Software we own and operate.",
  body: "Two products in market, built on the same discipline. Both keep a person in the decision.",
  items: [
    {
      name: "SecurePuls",
      category: "Physical security assessment",
      headline: "Site assessments that show their working.",
      body: "SecurePuls turns a physical security inspection into a structured assessment: a checklist built for the site's emirate and sector, photo evidence captured on the walk, and findings graded by severity. Every regulatory reference carries an evidence label, and a named assessor signs the report off.",
      href: "/securepuls",
      accent: true,
    },
    {
      name: "kAI",
      category: "Outbound voice agent",
      headline: "Calls the list. Flags the ones worth your time.",
      body: "kAI runs outbound qualification calls on your own number, follows the script your team agreed, and classifies each conversation so your people spend their hours on the leads that justify them.",
      href: "/kai",
      accent: false,
    },
  ],
} as const;

export const COMMISSIONED = {
  id: "commissioned",
  heading: "We take on a few commissioned builds a year.",
  body: [
    "Some organisations have one workflow that matters more than the rest of the business combined, and nothing on the market fits it. Those are the ones we take on.",
    "We build the system, put it into production, and keep operating it. The people who designed it are the ones running it a year later.",
  ],
  fit: {
    title: "A good fit",
    items: [
      "The workflow is central to how the business makes money.",
      "It is expensive because it depends on people who are hard to replace.",
      "Being wrong has a real financial, regulatory, or reputational cost.",
    ],
  },
  notFit: {
    title: "Not a fit",
    items: [
      "Topping up an existing team with engineers.",
      "Executing a specification someone else has already written.",
      "Building the cheapest possible version of something.",
    ],
  },
  cta: { label: "Tell us about the workflow", href: "/contact?topic=commissioned" },
} as const;

export const PARTNERSHIPS = {
  heading: "Some products need a partner who knows the room.",
  body: [
    "We build software. We do not pretend to have thirty years inside a regulator, an audit practice, or a trading floor.",
    "For some products the strongest structure is a partnership: Kaibre contributes product strategy, engineering, and technical delivery; the partner contributes domain expertise, market access, and commercial execution. Both sides are building a durable product rather than billing a project.",
  ],
  cta: { label: "Explore a partnership", href: "/contact?topic=partnership" },
} as const;

export const HOW_WE_WORK = {
  id: "how-we-work",
  heading: "We stay responsible for what we build.",
  steps: [
    {
      title: "Start with the work, not the technology.",
      body: "The first conversations are about how the work is done now, who does it, what it costs, and what happens when it goes wrong. Architecture comes after that.",
    },
    {
      title: "Build for production from the first week.",
      body: "Isolation, data handling, failure behaviour, and review steps are design decisions — not a hardening phase bolted on at the end.",
    },
    {
      title: "Keep the person in the decision.",
      body: "Our systems draft, classify, retrieve, and prepare. Where the outcome carries consequence, a person reviews and approves it. We design for that explicitly rather than treating it as a disclaimer.",
    },
    {
      title: "Stay after launch.",
      body: "We operate what we build. Ongoing responsibility is the normal arrangement, not an upsell.",
    },
  ],
} as const;

export const COMPANY = {
  id: "company",
  heading: "Small, founder-led, and deliberate about what we take on.",
  body: [
    "We are deliberately small. That is why we take on a limited number of builds, and why the person you talk to first is the person responsible for the work.",
  ],
  /** Scannable facts rather than a third paragraph. */
  facts: [
    { label: "Registered", value: "Abu Dhabi, UAE" },
    { label: "Working across", value: "UAE, Canada, United States" },
    { label: "Commissioned builds", value: "A few a year" },
  ],
  /**
   * Founder background only. This describes where the founders have worked —
   * it must never be phrased so that those organisations read as Kaibre
   * customers, partners, or endorsers. No logos, ever.
   */
  credibility: {
    label: "Where this comes from",
    body: "Our founders have built and run systems where being wrong is expensive — designing the data schemas behind them, and running the migrations that moved live patient and claims data.",
    domains: [
      "Fortune 500 companies",
      "Government environments",
      "Healthcare and prescription insurance",
    ],
  },
} as const;

export const FINAL_CTA = {
  heading: "Tell us about the work.",
  body: "If something in your operation is expensive, slow, and important, describe it in a paragraph. It reaches the person who would be responsible for building it.",
  cta: { label: "Start a conversation", href: "/contact" },
} as const;
