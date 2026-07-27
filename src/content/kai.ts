/**
 * kAI page copy.
 *
 * kAI is one product within Kaibre — not the company. No operating metrics,
 * no lead volumes, no call counts, no minute balances, no cost comparisons.
 * Capability descriptions only.
 */

export const KAI_HERO = {
  category: "Outbound voice agent",
  headline: "Calls the list. Flags the ones worth your time.",
  body: "kAI places outbound qualification calls on your own number, holds a natural conversation from the script your team agreed, collects the answers that decide whether a lead is real, and classifies each call so your people spend their hours on the opportunities that justify them.",
  primary: { label: "Book a kAI demo", href: "" },
  secondary: { label: "Start a conversation", href: "/contact?topic=kai" },
} as const;

export const KAI_WORKFLOW = {
  heading: "Your process, before a single call goes out.",
  steps: [
    {
      n: "01",
      title: "Map the workflow",
      body: "Your lead sources, the script, the qualification criteria, the escalation rules, and the things the agent must never say.",
    },
    {
      n: "02",
      title: "Configure the agent",
      body: "We set up the number, the call flow, the questions, and how leads reach kAI in the first place.",
    },
    {
      n: "03",
      title: "kAI calls",
      body: "Outbound qualification calls run on your configured number, holding a natural-language conversation and asking the structured questions in order.",
    },
    {
      n: "04",
      title: "Your team takes the warm ones",
      body: "Each conversation is classified and prioritised against your rules. Your team picks up the leads that came back positive; the rest stay out of the queue.",
    },
  ],
} as const;

export const KAI_VALUE = {
  heading: "The expensive part of outbound is the calls before the good one.",
  body: "A qualification call is cheap to hold and expensive to skip. kAI carries the volume of the list so that the conversations reaching your team have already answered the questions that decide whether they are worth having.",
  flow: [
    { label: "Your list" },
    { label: "kAI calls, on your number" },
    { label: "Classified against your rules", accent: true },
  ],
  outcomes: ["Qualified", "Callback", "Not qualified", "No answer"],
  columns: [
    {
      title: "Engages every lead",
      body: "Each lead on the list gets a call rather than the first forty getting one and the rest going cold.",
    },
    {
      title: "Asks the same questions",
      body: "Structured qualification questions are asked consistently, so the answers are comparable rather than dependent on who dialled.",
    },
    {
      title: "Classifies the outcome",
      body: "Conversations are classified and prioritised against your criteria, so the handover to a person is a decision rather than a queue.",
    },
  ],
} as const;

export const KAI_FAQ = {
  heading: "Common questions.",
  items: [
    {
      q: "What does kAI do today?",
      a: "kAI runs outbound qualification calls on your own phone line, holds a natural-language conversation from your script, collects structured answers, and classifies each conversation so your team can prioritise.",
    },
    {
      q: "Can it answer inbound calls?",
      a: "Not today. kAI runs outbound qualification calls. Inbound is on the roadmap and we would rather say so than imply otherwise.",
    },
    {
      q: "Which languages?",
      a: "English in Canada. English and Arabic in the UAE.",
    },
    {
      q: "Whose phone number does it call from?",
      a: "Yours. kAI runs on a number configured for your engagement, not a shared line.",
    },
    {
      q: "How does an engagement start?",
      a: "With a demo and a workflow-mapping conversation. Your script, qualification criteria, and escalation rules are agreed before anything is configured and before any call goes out.",
    },
    {
      q: "Does Kaibre build things other than kAI?",
      a: "Yes. Kaibre is a software company — kAI is one of its products. We also build SecurePulse, and take on a small number of commissioned production systems each year.",
    },
  ],
} as const;
