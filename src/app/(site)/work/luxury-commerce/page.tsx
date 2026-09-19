import type { Metadata } from "next";
import {
  Container,
  Heading,
  Prose,
  Note,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { ArrowLink, Button } from "@/components/primitives/button";
import { Flow, PulseDot } from "@/components/visuals";
import { SystemTopology } from "@/components/visuals/topology";
import { WORK_LUXURY } from "@/content/work";

export const metadata: Metadata = {
  title: "Luxury commerce — a catalogue worth tens of millions",
  description:
    "An anonymised snapshot of production software Kaibre built and still operates for a luxury-commerce business: individual products from $10,000 to $500,000, where a wrong record is a commercial event, not a support ticket.",
  alternates: { canonical: "/work/luxury-commerce" },
  openGraph: {
    title: "Luxury commerce — production software Kaibre operates | Kaibre",
    description:
      "Where a wrong record is a commercial event, not a support ticket. Client details withheld under confidentiality.",
    url: "/work/luxury-commerce",
  },
};

export default function LuxuryCommercePage() {
  return (
    <>
      {/* Hero + figures (ember) — the anonymised snapshot leads on its own. */}
      <Section surface="ember" space="flush" className="pb-16 pt-28 sm:pb-24 sm:pt-36">
        <Container>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-accent">
            {WORK_CASE_CARD_EYEBROW}
          </p>
          <SectionHeader
            className="mt-5"
            heading={WORK_LUXURY.heading}
            headingLevel={1}
            headingSize="display-1"
            body={WORK_LUXURY.intro}
          />

          <dl className="mt-14 grid gap-x-10 gap-y-8 border-t border-border-strong pt-10 sm:grid-cols-3">
            {WORK_LUXURY.figures.map((f) => (
              <div key={f.label}>
                <dt className="text-small text-fg-subtle">{f.label}</dt>
                <dd className="mt-2 flex items-center gap-2.5 font-mono text-heading-1 text-fg">
                  {f.value === "Live" ? <PulseDot tone="live" size="md" halo /> : null}
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Scope (coal) — the system's shape, then how a trade moves through it. */}
      <Section surface="coal">
        <Container>
          <>
            <Heading level={2} size="display-2" className="max-w-[20ch]">
              {WORK_LUXURY.scopeTitle}
            </Heading>
            <Text size="lead" className="mt-6 max-w-prose">
              {WORK_LUXURY.scopeIntro}
            </Text>
          </>

          <SystemTopology content={WORK_LUXURY.topology} className="mt-12" />

          <div className="mt-14 border-t border-border pt-10">
            <h3 className="text-heading-2 font-medium text-fg">
              {WORK_LUXURY.lifecycleTitle}
            </h3>
            <Flow className="mt-7" stages={WORK_LUXURY.lifecycle} />
          </div>
        </Container>
      </Section>

      {/* Why it mattered */}
      <Section surface="ink">
        <Container size="prose">
          <>
            <Heading level={2} size="heading-1">
              {WORK_LUXURY.responsibilityTitle}
            </Heading>
            <Prose
              paragraphs={WORK_LUXURY.responsibility}
              size="body"
              className="mt-5"
            />
            <Note className="mt-10">{WORK_LUXURY.confidentiality}</Note>
          </>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/commissioned-systems">A system like this, for you</Button>
            <ArrowLink href="/work">All work</ArrowLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** The one string not carried by WORK_LUXURY, kept beside the page that uses it. */
const WORK_CASE_CARD_EYEBROW = "Luxury commerce · live in commercial use";
