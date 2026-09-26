export const COMPANY_HERO = {
  headline: "Software for work that has to be right.",
  body: "Kaibre builds and operates its own products, builds products with domain partners, and takes on commissioned systems. All of it is in production, and all of it is still ours to run.",
} as const;

export const DATA = {
  id: "data",
  heading: "What happens to the documents you give us.",
  body: [
    "Our customers hand us the material their business runs on: internal procedures, policies, evidence, and in some systems customer records. How that material is held, and where, is a design decision we make before the first line of code rather than a policy we write afterwards.",
  ],
  items: [
    {
      title: "Your data is yours",
      note: "Stored encrypted, visible to your organisation only, used for nothing else, and deleted on request.",
    },
    {
      title: "Isolation by default",
      note: "Each deployment has its own database and administrator-created accounts. There is no public sign-up, and no shared tenancy between customers unless a customer asks for it.",
    },
    {
      title: "Where it runs is a decision",
      note: "Some of our customers work under rules about which jurisdiction their data may sit in. Which region a deployment runs in is scoped with you before anything is uploaded, rather than assumed.",
    },
    {
      title: "No integration required",
      note: "Our systems are designed to be useful without touching yours. Where an integration is wanted it is scoped and agreed; it is never a precondition.",
    },
    {
      title: "A record of who decided what",
      note: "Where a person approves something, the approval is logged with a name and a time. That record is part of the product, not an add-on.",
    },
  ],
  note: "These describe how we build and operate. They are not a certification, and we do not present them as one.",
} as const;

export const COMPANY_CTA = {
  heading: "Tell us about the work.",
  body: "If something in your operation is expensive, slow, and important, describe it in a paragraph. It reaches the person who would be responsible for building it.",
  cta: { label: "Start a conversation", href: "/contact" },
} as const;
