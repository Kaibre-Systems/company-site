export const CM_HERO = {
  eyebrow: "Commissioned systems",
  headline: "One workflow carries your business. We build the software it runs on.",
  body: "Then we put it into production and keep operating it. Most of what we build replaces a spreadsheet that three people understand and nobody can afford to lose.",
  cta: { label: "Describe your workflow", href: "#start" },
  note: "Reply from an engineer, usually the same day.",
} as const;

export const CM_ENGAGEMENT = {
  heading: "How an engagement runs.",
  body: "Five stages. You can stop after the specification and keep everything it produced.",
  stages: [
    {
      n: "01",
      title: "Consult",
      body: "We sit with the people doing the work and map what actually happens, including the parts nobody documented. You get an honest answer about whether software is the right fix, and we will say so when it is not.",
    },
    {
      n: "02",
      title: "Design",
      body: "We write the specification: what the system does, where it sits in the work, and what it must never get wrong. It is yours whether or not you continue with us, and it is the document the build is quoted against.",
    },
    {
      n: "03",
      title: "Build",
      body: "We build the smallest system that carries real work and put it in front of the people who will use it. You see working software, not status reports.",
    },
    {
      n: "04",
      title: "Validate",
      body: "The old process stays standing. We migrate deliberately and run both in parallel until the numbers agree. Nothing goes live on a Friday, and nothing goes live because a date said so.",
    },
    {
      n: "05",
      title: "Maintain",
      body: "The engineers who built it stay responsible for it: monitoring, changes, and the call at eleven at night. This is the part most studios do not offer, and it is the reason the systems we ship are still in production years later.",
      accent: true,
    },
  ],
} as const;

export const CM_PRICING = {
  eyebrow: "How we arrive at a number",
  heading: "We gather the specification first, and quote against it.",
  body: "We do not quote a build before we understand the work. The specification is what makes a number mean anything: it is written with the people doing the work, it says what the system must do, and the build is priced against that document rather than against a conversation. If the specification says do not build this, that is a result, and you keep it.",
  rows: [
    { label: "Specification", value: "gathered with the people doing the work" },
    { label: "Build", value: "quoted against the specification" },
    { label: "Operate and support", value: "agreed once the scope is fixed" },
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
