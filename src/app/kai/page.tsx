import type { Metadata } from "next";
import {
  Container,
  Heading,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { Button } from "@/components/primitives/button";
import { WorkflowSteps } from "@/components/modules";
import { CallOutcomeList, Flow, VisualFrame } from "@/components/visuals";
import { KAI_FAQ, KAI_HERO, KAI_VALUE, KAI_WORKFLOW } from "@/content/kai";
import { CALENDLY_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "kAI — Outbound voice agent for lead qualification",
  description:
    "kAI places outbound qualification calls on your own number, follows your script, and classifies each conversation so your team spends its hours on the leads that justify them.",
  alternates: { canonical: "/kai" },
  openGraph: {
    title: "kAI — Outbound voice agent | Kaibre",
    description:
      "kAI runs outbound qualification calls on your own number and classifies each conversation, so your team focuses on the leads worth their time.",
    url: "/kai",
  },
};

/** kAI is the one product where a booking link matches how it is actually sold. */
const DEMO_URL = `${CALENDLY_URL}?utm_source=kaibresystems.com&utm_medium=kai-page&utm_content=demo`;

export default function KaiPage() {
  return (
    <>
      {/* Hero */}
      <Section surface="ink" space="flush" className="pb-20 pt-32 sm:pb-24 sm:pt-40">
        <Container>
          {/* Centred, not bottom-aligned. The panel is about half the height of
                the column beside it, so pinning it to the baseline banked the
                whole difference as one ~320px void in the top right — the
                largest unexplained empty region on the site. Centring splits it
                into two margins that read as composition. */}
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="text-heading-1 font-medium text-fg">
                kAI
                <span className="ml-3 text-body font-normal text-fg-subtle">
                  {KAI_HERO.category}
                </span>
              </p>
              <Heading level={1} size="display-1" className="mt-5 max-w-[16ch]">
                {KAI_HERO.headline}
              </Heading>
              <Text size="lead" className="mt-6 max-w-[56ch]">
                {KAI_HERO.body}
              </Text>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={DEMO_URL}>{KAI_HERO.primary.label}</Button>
                <Button href={KAI_HERO.secondary.href} variant="secondary">
                  {KAI_HERO.secondary.label}
                </Button>
              </div>
            </div>

            <div>
              <VisualFrame label="Call outcomes, each tagged with a qualification classification.">
                <CallOutcomeList />
              </VisualFrame>
<p className="mt-3 text-fine text-fg-subtle">Interface illustration.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Value (light) */}
      <Section surface="paper">
        <Container>
          <>
            <SectionHeader
              heading={KAI_VALUE.heading}
              body={KAI_VALUE.body}
            />
          </>

          <Flow
            className="mt-12 border-t border-border pt-10"
            stages={KAI_VALUE.flow}
            outcomes={KAI_VALUE.outcomes}
          />

        </Container>
      </Section>

      {/* Workflow */}
      <Section surface="ink">
        <Container>
          <>
            <SectionHeader
              heading={KAI_WORKFLOW.heading}
            />
          </>
          <WorkflowSteps steps={KAI_WORKFLOW.steps} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section surface="ink" className="border-t border-border">
        <Container size="prose">
          <Heading level={2} size="display-2" className="mt-4">
            {KAI_FAQ.heading}
          </Heading>

          <ul className="mt-10 space-y-3">
            {KAI_FAQ.items.map((item) => (
              <li
                key={item.q}
                className="rounded-card border border-border bg-surface-raised"
              >
                <details className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-body font-medium text-fg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden
                      className="shrink-0 text-accent transition-transform duration-150 group-open:rotate-45"
                    >
                      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-body text-fg-muted">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={DEMO_URL}>Book a kAI demo</Button>
            <Button href="/contact?topic=kai" variant="secondary">
              Start a conversation
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
