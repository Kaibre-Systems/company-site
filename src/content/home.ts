/**
 * Homepage copy.
 *
 * Claim discipline: no customer names, no logos, no testimonials, no headcount,
 * no certifications, no metrics, no percentages, no unsigned partnerships.
 * The two dollar figures in `proof` are founder-approved for publication.
 */

/**
 * The hero, restructured against the September 2026 site review.
 *
 * The signature belief ("Great code makes great companies") stays, but the
 * second half now points at the buyer rather than at Kaibre — a headline has
 * to be about the reader. The eyebrow names the reader outright: a senior-only
 * team, in Abu Dhabi, with no juniors on any build. The two doors below carry
 * the actual choice, so the hero itself needs no button.
 */
export const HERO = {
  eyebrow: "Abu Dhabi · Senior engineers only · No juniors",
  headline: "Great code makes great companies. We write the code yours runs on.",
  body: "We build the software that high-consequence work depends on, put it into production, and keep operating it. The people who design your system are the ones running it in year three.",
} as const;

/**
 * The two doors, equal weight, both above the fold.
 *
 * Commissioned work is listed first: it is the revenue, and the old page
 * buried it two-thirds of the way down framed as something reluctantly
 * accepted. The custom door's primary action is the on-page form (`#start`);
 * the products door is a plain index into the three product pages.
 */
export const DOORS = {
  commissioned: {
    eyebrow: "Commissioned systems",
    headline: "We build the one system your business runs on.",
    body: "One workflow carries the money, depends on people who are hard to replace, and nothing on the market fits it. That is the work we take, and then keep running.",
    cta: { label: "Describe your workflow", href: "#start" },
    secondary: { label: "How we engage", href: "/commissioned-systems" },
  },
  products: {
    eyebrow: "Products",
    headline: "Or start with one we already run.",
    items: [
      {
        name: "Tuntas",
        note: "Regulatory change, obligation by obligation",
        href: "/tuntas",
        /** Set in its own letterforms — a separate product, not a sub-brand. */
        mark: true,
      },
      {
        name: "SecurePulse",
        note: "Site assessments that show their working",
        href: "/securepulse",
      },
      {
        name: "kAI",
        note: "Calls the list, flags what is worth your time",
        href: "/kai",
      },
    ],
  },
} as const;

/**
 * The stat strip under the doors.
 *
 * The two dollar figures are the founder-approved ones already published in
 * PROOF and on /work. "10 yrs+" states the same senior-only claim the eyebrow
 * makes and the seniority section expands on; it asserts a floor, not a
 * headcount. "4 markets" is COMPANY.facts, restated as a number. Any change to
 * the experience floor should be confirmed with the founders before shipping.
 */
export const STATS = [
  { value: "$10k – $500k", label: "Individual unit value handled" },
  { value: "Tens of millions", label: "Catalogue value in production" },
  { value: "10 yrs+", label: "Minimum engineer experience" },
  { value: "4 markets", label: "UAE, Indonesia, Canada, US" },
] as const;

export const PROOF = {
  /**
   * The case study becomes the proof for custom work, not a late aside, and it
   * carries the page's one rust band. The heading leads with the transferable
   * standard rather than the category: a compliance director would use the
   * same sentence about a register of obligations.
   */
  eyebrow: "Case study · Luxury commerce",
  heading: "A wrong record here is a commercial event, not a support ticket.",
  body: "Individual products from $10,000 to $500,000, a catalogue worth tens of millions, and a business that cannot absorb a mispriced line. We built the production system it runs on, and we still operate it.",
  /** Approved figures only. No invented counts. */
  panel: [
    { label: "individual product value", value: "$10k – $500k" },
    { label: "catalogue value", value: "Tens of millions" },
    { label: "status", value: "Live, in commercial use" },
    { label: "operated by", value: "the team that built it" },
  ],
  confidentiality: "Client withheld under confidentiality. Figures published with sign-off.",
  link: { label: "Read the snapshot", href: "/work/luxury-commerce" },
} as const;

/**
 * The seniority section — the single strongest addition the review identified.
 *
 * Names and faces would be stronger still and are worth revisiting; until
 * then the claim is carried by specifics with a concrete consequence attached,
 * not by adjectives. One assertion per line.
 */
export const SENIORITY = {
  heading: "No juniors. No handoff.",
  body: "The person you speak to first is responsible for the build, and is still on it a year later. No account manager sits between you and the engineer.",
  cards: [
    {
      title: "Senior only",
      body: "Every engineer has run production systems for over a decade. Nobody learns on your build.",
    },
    {
      title: "We stay on it",
      body: "We operate what we build. A system we shipped years ago is still ours to keep running.",
    },
    {
      title: "Small on purpose",
      body: "A handful of commissioned systems at a time. It is why the first answer comes from an engineer.",
    },
  ],
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
  /**
   * Founder-led, without the scarcity reading.
   *
   * The previous version of this section counted: "deliberately small", "a
   * limited number of builds", "a few a year". To one reader that is
   * selectivity; to a regulated institution deciding who will hold its
   * internal procedures, it answers a question they did not ask and raises
   * the one they did — will this vendor still be operating in two years. The
   * "a few a year" fact was scoped to commissioned builds and read as the
   * company's whole output, which also understated it: Tuntas is a product,
   * not a commissioned build.
   *
   * What survives is the part that is both true and reassuring: the person
   * you talk to is the person responsible, and Kaibre operates what it
   * builds rather than handing it over.
   */
  heading: "Founder-led, and still running what we built.",
  body: [
    "The person you talk to first is the person responsible for the work, and the people who designed a system are the ones operating it a year later. That is the arrangement, not an upsell.",
  ],
  /** Scannable facts rather than a third paragraph. */
  facts: [
    { label: "Registered", value: "Abu Dhabi, UAE" },
    {
      label: "Working across",
      value: "UAE, Indonesia, Canada, United States",
    },
    { label: "Systems in production", value: "Built, operated, and supported by us" },
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
  /** The homepage states the position; /company answers the questions. */
  cta: { label: "About Kaibre", href: "/company" },
} as const;

export const CONTACT = {
  id: "start",
  heading: "Tell us about the work.",
  body: "If something in your operation is expensive, slow, and important, describe it in a paragraph. It reaches the engineer who would be responsible for building it, usually the same day.",
} as const;
