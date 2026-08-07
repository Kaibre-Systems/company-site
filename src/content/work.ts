/**
 * Selected work page copy.
 *
 * The luxury-commerce system is anonymised. Grounded in read-only inspection
 * of the production codebase, then generalised until nothing identifies the
 * client.
 *
 * Never publish: the client name, the product name, the item category beyond
 * "luxury goods", geography, stack, integrations, contract values, or any
 * outcome metric.
 */

export const WORK_HERO = {
  headline: "Systems that were expensive to get wrong.",
  body: "Most of what Kaibre builds is covered by confidentiality. What we can describe is the shape of the problem, the responsibility that came with it, and the fact that we are still running it.",
} as const;

export const WORK_LUXURY = {
  heading: "A catalogue where a single record is worth five or six figures.",
  intro: [
    "Kaibre built the production software a luxury-commerce business runs on: individual products valued from approximately US$10,000 to US$500,000, across a catalogue worth tens of millions of dollars.",
    "At those values, accuracy is not a quality-of-life feature. A record that is wrong, stale, or mispriced is a commercial event — not a support ticket. The system is live in commercial use, and Kaibre continues to support and operate it.",
  ],
  figures: [
    { value: "$10k – $500k", label: "Individual product value" },
    { value: "Tens of millions", label: "Catalogue value" },
    { value: "Live", label: "In commercial use" },
  ],
  lifecycleTitle: "How a trade moves through it",
  /** Labels only: the topology above already describes each subsystem, so
   *  the lifecycle reads as one clean line rather than repeating the notes. */
  lifecycle: [
    { label: "Listed" },
    { label: "Bid or offered" },
    { label: "Parties verified" },
    { label: "Paid" },
    { label: "Fulfilled", accent: true },
  ],
  scopeTitle: "What the system does",
  scopeIntro:
    "Described at the level of structure rather than implementation — nothing here identifies the client, and everything here runs in production.",
  /**
   * The anonymised shape of the platform. Truthful at the level of
   * structure — a trade spine, a verification gate in front of trading, an
   * operator console under everything — with nothing that identifies the
   * client or the category.
   */
  topology: {
    alt: "System structure: a verification gate admits participants into a trade path running from catalogue through auctions and offers to orders, ledger and fulfilment — with the operator console connected beneath every stage.",
    gate: {
      label: "Verified participants",
      note: "Identity and trade licence checked before a trade opens.",
    },
    stages: [
      { label: "Catalogue", note: "Unique items, each priced on its own merits." },
      { label: "Auctions & offers", note: "Timed bidding and private negotiation." },
      { label: "Orders & ledger", note: "Money movement recorded, not inferred." },
      { label: "Fulfilment", note: "Tracked to delivery and after-sale service." },
    ],
    console: {
      label: "Operator console",
      note: "The administrative seat where accuracy is maintained day to day — connected to every stage above.",
    },
  },
  responsibilityTitle: "Why it mattered",
  responsibility: [
    "A platform like this has more than one way to be expensive. A pricing or availability error is visible to a buyer immediately. A failed payment path strands a transaction worth more than most annual salaries. A weak verification step lets the wrong counterparty into a trade.",
    "Those constraints shaped the build from the start rather than being hardened in afterwards — and they are the reason the engagement did not end at launch.",
  ],
  confidentiality:
    "Client and implementation details are withheld under confidentiality. No customer data, credentials, infrastructure detail, or commercial terms are described here.",
} as const;

export const WORK_COMMISSIONED = {
  heading: "What we take on.",
  body: [
    "We take on a small number of commissioned builds a year. They tend to look alike: the work is central to how the business makes money, it is expensive because it depends on people who are hard to replace, and the off-the-shelf options solve an adjacent problem rather than this one.",
    "We build the system, put it into production, and keep operating it. The people who designed it are the ones running it a year later.",
  ],
  fit: {
    title: "A good fit",
    items: [
      "A workflow central to how the business makes money.",
      "Cost driven by people who are hard to replace.",
      "Real consequence — financial, regulatory, or reputational — when it goes wrong.",
      "An owner who can describe the process as it actually runs today.",
    ],
  },
  notFit: {
    title: "Not a fit",
    items: [
      "Topping up an existing team with engineers.",
      "Executing a specification someone else has already written.",
      "Fixed-price brochure sites and generic app builds.",
      "Building the cheapest possible version of something.",
    ],
  },
  cta: { label: "Tell us about the workflow", href: "/contact?topic=commissioned" },
} as const;
