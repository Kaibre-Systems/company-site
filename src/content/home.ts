export const HERO = {
  eyebrow: "Abu Dhabi · A compact team of dedicated experts",
  headline: "Great code makes great companies. We write the code yours runs on.",
  body: "We build the software that high-consequence work depends on, put it into production, and keep operating it. The people who design your system are the ones running it in year three.",
} as const;

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

export const STATS = [
  { value: "$10k – $500k", label: "Individual unit value handled" },
  { value: "Tens of millions", label: "Catalogue value in production" },
  { value: "4 markets", label: "UAE, Indonesia, Canada, US" },
] as const;

export const PROOF = {
  eyebrow: "Case study · Luxury commerce",
  heading: "A wrong record here is a commercial event, not a support ticket.",
  body: "Individual products from $10,000 to $500,000, a catalogue worth tens of millions, and a business that cannot absorb a mispriced line. We built the production system it runs on, and we still operate it.",
  panel: [
    { label: "individual product value", value: "$10k – $500k" },
    { label: "catalogue value", value: "Tens of millions" },
    { label: "status", value: "Live, in commercial use" },
    { label: "operated by", value: "the team that built it" },
  ],
  confidentiality: "Client withheld under confidentiality. Figures published with sign-off.",
  link: { label: "Read the snapshot", href: "/work/luxury-commerce" },
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
      body: "Isolation, data handling, failure behaviour, and review steps are design decisions, not a hardening phase bolted on at the end.",
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
  heading: "Founder-led, and still running what we built.",
  body: [
    "The person you talk to first is the person responsible for the work, and the people who designed a system are the ones operating it a year later.",
  ],
  facts: [
    { label: "Registered", value: "Abu Dhabi, UAE" },
    {
      label: "Working across",
      value: "UAE, Indonesia, Canada, United States",
    },
    { label: "Systems in production", value: "Built, operated, and supported by us" },
  ],
  credibility: {
    label: "Where this comes from",
    body: "Our founders have built and run systems where being wrong is expensive. They have experience in designing the data schemas behind them, and running the migrations that moved live patient and claims data.",
    domains: [
      "Fortune 500 companies",
      "Government environments",
      "Healthcare and prescription insurance",
    ],
  },
  cta: { label: "About Kaibre", href: "/company" },
} as const;

export const CONTACT = {
  id: "start",
  heading: "Tell us about the work.",
  body: "If something in your operation is expensive, slow, and important, describe it in a paragraph. It reaches the engineer who would be responsible for building it.",
} as const;
