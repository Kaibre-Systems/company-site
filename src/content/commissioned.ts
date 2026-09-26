/**
 * /commissioned-systems copy.
 *
 * The custom offer, given a page of its own. Its job is to convert a stranger
 * into a described workflow in the inbox: what we take, what we refuse, how an
 * engagement runs, what the first two weeks produce, and what it costs to
 * start. One case card at the bottom, no more.
 *
 * Voice: one assertion per sentence, subject first, no em dashes. Pricing
 * specifics are deliberately withheld until the founders set them — the shape
 * of the commercial arrangement is stated, the numbers are not invented.
 */

export const CM_HERO = {
  eyebrow: "Commissioned systems",
  headline: "One workflow carries your business. We build the software it runs on.",
  body: "Then we put it into production and keep operating it. Most of what we build replaces a spreadsheet that three people understand and nobody can afford to lose.",
  cta: { label: "Describe your workflow", href: "#start" },
  note: "Reply from an engineer, usually the same day.",
} as const;

export const CM_ENGAGEMENT = {
  heading: "How an engagement runs.",
  body: "Four stages. You can stop after the first and keep everything it produced.",
  stages: [
    {
      n: "01",
      title: "Two weeks, fixed price, no commitment",
      body: "We sit with the people doing the work and map what actually happens, including the parts nobody documented. You get a written specification, a build estimate, and an honest answer about whether software is the right fix. It is yours whether or not you continue with us.",
      duration: "2 weeks",
    },
    {
      n: "02",
      title: "Build the narrow version first",
      body: "We build the smallest system that carries real work, and put it in front of the people who will use it in weeks rather than quarters. You see working software every fortnight, not status reports.",
      duration: "6 to 14 weeks",
    },
    {
      n: "03",
      title: "Into production, with the old process still standing",
      body: "We migrate deliberately and run both in parallel until the numbers agree. Nothing goes live on a Friday, and nothing goes live because a date said so.",
      duration: "2 to 4 weeks",
    },
    {
      n: "04",
      title: "We keep running it",
      body: "The engineers who built it stay responsible for it: monitoring, changes, and the call at eleven at night. This is the part most studios do not offer, and it is the reason the systems we ship are still in production years later.",
      duration: "ongoing",
      /** The one stage drawn on the rust tint — the differentiator. */
      accent: true,
    },
  ],
} as const;

export const CM_PRICING = {
  eyebrow: "What it costs to start",
  heading: "The specification is fixed price. The build is quoted against it.",
  body: "We do not quote a build before we understand the work, and we do not bill by the hour for discovery. If the specification says do not build this, that is a result, and it cost you two weeks.",
  rows: [
    { label: "Specification, 2 weeks", value: "fixed fee" },
    { label: "Build", value: "quoted, staged" },
    { label: "Operate and support", value: "monthly" },
  ],
} as const;

export const CM_CASE = {
  heading: "A system we still run.",
  eyebrow: "Luxury commerce · live in commercial use",
  headline: "A wrong record here is a commercial event, not a support ticket.",
  body: "Individual products from $10,000 to $500,000 and a catalogue worth tens of millions, run on a system we built and still operate.",
  panel: [
    { label: "individual product value", value: "$10k – $500k" },
    { label: "catalogue value", value: "Tens of millions" },
    { label: "operated by", value: "the team that built it" },
  ],
  confidentiality: "Client withheld under confidentiality. Figures published with sign-off.",
  link: { label: "Read the snapshot", href: "/work/luxury-commerce" },
  allWork: { label: "All work", href: "/work" },
} as const;

export const CM_CONTACT = {
  id: "start",
  heading: "Describe the workflow.",
  body: "A paragraph is enough: what happens today, who does it, and what it costs when it goes wrong. It reaches the engineer who would be responsible for building it.",
} as const;
