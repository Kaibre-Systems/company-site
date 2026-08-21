/**
 * The company page.
 *
 * This page exists because of who reads it. A regulated institution decides
 * whether to hand over its internal procedures by doing vendor diligence, and
 * "Company" was a link to a fragment halfway down the homepage — a first-class
 * question answered in a footnote. The four things that reader is looking for
 * are here in the order they ask them: who you are, how you work, what happens
 * to their documents, and who is accountable.
 *
 * Claim discipline is the site's: no customer names, no logos, no
 * testimonials, no headcount, no certifications, no metrics, no percentages,
 * no unsigned partnerships. The data-handling section describes how the
 * products are built and operated today; it is not a security certification
 * and must never be written as one.
 */

export const COMPANY_HERO = {
  headline: "Software for work that has to be right.",
  body: "Kaibre builds and operates its own products, builds products with domain partners, and takes on a small number of commissioned systems. All of it is in production, and all of it is still ours to run.",
} as const;

/**
 * How we handle what you give us.
 *
 * Every claim here is a description of how the products are built and
 * operated — the same statements the Tuntas deployment section makes, said
 * once at company level so a buyer does not have to find them on a product
 * page. Nothing here asserts a standard, a certification, or an audit.
 */
export const DATA = {
  id: "data",
  heading: "What happens to the documents you give us.",
  body: [
    "Our customers hand us the material their business runs on — internal procedures, policies, evidence, customer records. How that material is held is a design decision we make before the first line of code, not a policy we write afterwards.",
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
