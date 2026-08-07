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
import { Callout, WorkflowSteps } from "@/components/modules";
import {
  IndonesiaFlag,
  SecurePulseName,
  VisualFrame,
} from "@/components/visuals";
import {
  FindingDocument,
  ReportContents,
  RequirementMap,
  RiskScorecard,
} from "@/components/visuals/document";
import {
  SP_DOMAINS,
  SP_EVIDENCE,
  SP_HERO,
  SP_HERO_PANEL,
  SP_HUMAN,
  SP_JURISDICTION,
  SP_MAPPING,
  SP_MARKETS,
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
      {/* Hero — the copy beside the work product itself: one page of the
          report, on paper, lit from behind. */}
      <Section surface="ink" space="flush" className="pb-20 pt-28 sm:pb-24 sm:pt-36">
        <Container>
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

            <div className="relative">
              {/* A warm bed of light behind the document, so the paper reads
                  as lit rather than pasted onto the black. Decorative only. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-5 rounded-card bg-accent opacity-[0.14] blur-2xl"
              />
              <VisualFrame label={SP_HERO_PANEL.alt} className="relative">
                <FindingDocument doc={SP_HERO_PANEL} />
              </VisualFrame>
            </div>
          </div>
        </Container>
      </Section>

      {/* Jurisdiction (ember) — the market fact the product is built on. */}
      <Section surface="ember">
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

      {/* Workflow (coal) — a change of register, not another black slab. */}
      <Section surface="coal">
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
      <Section surface="ink">
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

      {/* Evidence discipline (ember) — the differentiator, shown in the
          report's own compliance-mapping grammar rather than asserted. */}
      <Section surface="ember">
        <Container>
          <>
            <SectionHeader
              heading={SP_EVIDENCE.heading}
              body={SP_EVIDENCE.body}
            />
          </>

          <RequirementMap content={SP_MAPPING} className="mt-12" />

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

      {/* The deliverable (paper) — what leadership actually receives, on the
          desk it will land on. */}
      <Section surface="paper">
        <Container>
          <SectionHeader heading={SP_REPORT.heading} body={SP_REPORT.body} />
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
            <ReportContents
              title={SP_REPORT.contents.title}
              sections={SP_REPORT.contents.sections}
              signoff={SP_REPORT.contents.signoff}
            />
            <RiskScorecard
              title={SP_REPORT.scorecard.title}
              tag={SP_REPORT.scorecard.tag}
              columns={SP_REPORT.scorecard.columns}
              rows={SP_REPORT.scorecard.rows}
              totals={SP_REPORT.scorecard.totals}
            />
          </div>
        </Container>
      </Section>

      {/* Human review — above the CTA, by design. */}
      <Section surface="ink">
        <Container>
          <div className="max-w-[46rem]">
            <Callout heading={SP_HUMAN.heading}>
              {SP_HUMAN.body.map((p) => (
                <Text key={p}>{p}</Text>
              ))}
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Markets + status + CTA */}
      <Section surface="ink" className="border-t border-border">
        <Container>
          <Heading level={2} size="display-2">
            {SP_MARKETS.heading}
          </Heading>
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
            {SP_MARKETS.markets.map((market) => (
              <div key={market.name} className="bg-surface-raised p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-heading-2 font-medium text-fg">
                  {"flag" in market && market.flag ? <IndonesiaFlag /> : null}
                  {market.name}
                </h3>
                <p className="mt-1 text-small text-fg-subtle">{market.domain}</p>
                <p className="mt-3 text-small text-fg-muted">{market.note}</p>
                {"href" in market && market.href ? (
                  <ArrowLink href={market.href} className="mt-4">
                    {market.cta}
                  </ArrowLink>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-prose border-t border-border pt-10">
            <Heading level={2} size="heading-1">
              {SP_STATUS.heading}
            </Heading>
            <Prose paragraphs={[SP_STATUS.body]} size="body" className="mt-5" />
            <div className="mt-8">
              <Button href={SP_STATUS.cta.href}>{SP_STATUS.cta.label}</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
