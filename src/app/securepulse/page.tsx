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
import { Button } from "@/components/primitives/button";
import { Callout, WorkflowSteps } from "@/components/modules";
import {
  AssessmentPanel,
  EvidenceLink,
  SecurePulseName,
  VisualFrame,
} from "@/components/visuals";
import {
  SP_DOMAINS,
  SP_EVIDENCE,
  SP_HERO,
  SP_HUMAN,
  SP_JURISDICTION,
  SP_REPORT,
  SP_STATUS,
  SP_WORKFLOW,
} from "@/content/securepulse";

export const metadata: Metadata = {
  title: "SecurePulse — Physical security assessment",
  description:
    "SecurePulse turns a physical security inspection into a structured, evidence-backed assessment: a checklist built for the site's emirate and sector, photo evidence captured on the walk, and findings a named assessor signs off.",
  alternates: { canonical: "/securepulse" },
  openGraph: {
    title: "SecurePulse — Physical security assessment | Kaibre",
    description:
      "Structured, evidence-backed physical security assessments for UAE and Gulf sites. SecurePulse drafts; qualified people decide.",
    url: "/securepulse",
  },
};

export default function SecurePulsePage() {
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
                <SecurePulseName animate />
                <span className="ml-3 text-body font-normal text-fg-subtle">
                  {SP_HERO.category}
                </span>
              </p>
              <Heading level={1} size="display-1" className="mt-5 max-w-[18ch]">
                {SP_HERO.headline}
              </Heading>
              <Text size="lead" className="mt-6 max-w-[56ch]">
                {SP_HERO.body}
              </Text>
              <div className="mt-9">
                <Button href={SP_HERO.cta.href}>{SP_HERO.cta.label}</Button>
              </div>
            </div>

            <div>
              <VisualFrame label="Draft assessment findings, each carrying the confidence behind it, awaiting sign-off.">
                <AssessmentPanel />
              </VisualFrame>
<p className="mt-3 text-fine text-fg-subtle">Interface illustration.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Jurisdiction (light) */}
      <Section surface="paper">
        <Container>
          <>
            <SectionHeader
              heading={SP_JURISDICTION.heading}
              body={SP_JURISDICTION.body}
            />
            <Note className="mt-8">{SP_JURISDICTION.note}</Note>
          </>
        </Container>
      </Section>

      {/* Workflow */}
      <Section surface="ink">
        <Container>
          <>
            <SectionHeader
              heading={SP_WORKFLOW.heading}
            />
          </>
          <WorkflowSteps steps={SP_WORKFLOW.steps} />
        </Container>
      </Section>

      {/* Domains */}
      <Section surface="ink" className="border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <SectionHeader
                heading={SP_DOMAINS.heading}
                body={SP_DOMAINS.body}
              />
            </div>
            <div>
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {SP_DOMAINS.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-border py-3.5"
                  >
                    <span className="font-mono text-label text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-fg-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Evidence discipline (light) — the product's core differentiator */}
      <Section surface="paper">
        <Container>
          <>
            <SectionHeader
              heading={SP_EVIDENCE.heading}
              body={SP_EVIDENCE.body}
            />
          </>

          <EvidenceLink className="mt-12" />

          <>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
              {SP_EVIDENCE.labels.map((label) => (
                <div key={label.code} className="bg-surface-raised p-6">
                  <dt className="font-mono text-label uppercase tracking-[0.085em] text-accent">
                    {label.code}
                  </dt>
                  <dd className="mt-3 text-small text-fg-muted">{label.note}</dd>
                </div>
              ))}
            </dl>
          </>
        </Container>
      </Section>

      {/* Human review — above the CTA, by design */}
      <Section surface="ink">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Callout heading={SP_HUMAN.heading}>
                {SP_HUMAN.body.map((p) => (
                  <Text key={p}>{p}</Text>
                ))}
              </Callout>
            </div>

            <div>
              <Heading level={2} size="heading-1" className="mt-4">
                {SP_REPORT.heading}
              </Heading>
              <Text className="mt-4">{SP_REPORT.body}</Text>
              <ul className="mt-6 space-y-2.5">
                {SP_REPORT.sections.map((s) => (
                  <li key={s} className="flex gap-3 text-body text-fg-muted">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Status + CTA */}
      <Section surface="ink" className="border-t border-border">
        <Container size="prose">
          <Heading level={2} size="heading-1">
            {SP_STATUS.heading}
          </Heading>
          <Prose paragraphs={[SP_STATUS.body]} size="body" className="mt-5" />
          <div className="mt-8">
            <Button href={SP_STATUS.cta.href}>{SP_STATUS.cta.label}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
