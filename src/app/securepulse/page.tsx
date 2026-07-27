import type { Metadata } from "next";
import {
  Container,
  Eyebrow,
  Heading,
  Prose,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { Button } from "@/components/primitives/button";
import { Callout, IllustrationFrame, WorkflowSteps } from "@/components/modules";
import { AssessmentPanel } from "@/components/visuals";
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
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>{SP_HERO.eyebrow}</Eyebrow>
              <p className="mt-4 font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
                {SP_HERO.category}
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

            <IllustrationFrame label="A list of draft assessment findings, each with a reference, a severity grade and an evidence label, awaiting reviewer sign-off.">
              <AssessmentPanel />
            </IllustrationFrame>
          </div>
        </Container>
      </Section>

      {/* Jurisdiction (light) */}
      <Section surface="paper">
        <Container>
          <>
            <SectionHeader
              eyebrow={SP_JURISDICTION.eyebrow}
              heading={SP_JURISDICTION.heading}
              body={SP_JURISDICTION.body}
            />
            <Text size="small" tone="subtle" className="mt-8 max-w-[56ch]">
              {SP_JURISDICTION.note}
            </Text>
          </>
        </Container>
      </Section>

      {/* Workflow */}
      <Section surface="ink">
        <Container>
          <>
            <SectionHeader
              eyebrow={SP_WORKFLOW.eyebrow}
              heading={SP_WORKFLOW.heading}
            />
          </>
          <WorkflowSteps steps={SP_WORKFLOW.steps} />
        </Container>
      </Section>

      {/* Domains */}
      <Section surface="ink" className="border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeader
                eyebrow={SP_DOMAINS.eyebrow}
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
              eyebrow={SP_EVIDENCE.eyebrow}
              heading={SP_EVIDENCE.heading}
              body={SP_EVIDENCE.body}
            />
          </>

          <>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
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
              <Callout eyebrow={SP_HUMAN.eyebrow} heading={SP_HUMAN.heading}>
                {SP_HUMAN.body.map((p) => (
                  <Text key={p}>{p}</Text>
                ))}
              </Callout>
            </div>

            <div>
              <Eyebrow>{SP_REPORT.eyebrow}</Eyebrow>
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
