import {
  Card,
  Container,
  Heading,
  Note,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { Button, ArrowLink } from "@/components/primitives/button";
import { Callout } from "@/components/modules";
import { VisualFrame, withBrand } from "@/components/visuals";
import { IndoHeader } from "@/components/indonesia/chrome";
import { IndoFooter } from "@/components/indonesia/footer";
import { IndoContactForm } from "@/components/indonesia/contact-form";
import { LangSync } from "@/components/indonesia/lang-sync";
import {
  AssessmentOverview,
  FlowCompare,
  IconList,
  RemediationTable,
  ReportPreview,
  StageGrid,
  TraceChain,
} from "@/components/indonesia/visuals";
import type { IndoContent } from "@/content/indonesia/types";

/**
 * The SecurePuls Indonesia experience — one component, two dictionaries.
 *
 * Ordered for a two-to-three-minute executive read: outcome and time
 * compression in the headline; inputs and deliverables before any concept;
 * the workflow in four icon-led stages; then the depth — gap analysis with
 * its evidence trail, the remediation plan and report a buyer actually
 * receives, the before/after, who decides, who it serves, and what an
 * Indonesian deployment includes. One conversion path at the end.
 *
 * The page renders its own chrome: the company-site header is English, and an
 * Indonesian-language page must not open under it.
 */
export function IndonesiaExperience({ content }: { content: IndoContent }) {
  const c = content;

  return (
    <div lang={c.locale}>
      {/* The root layout stamps `lang="en"` on <html>. The inline script
          corrects it before paint on a full load; React does not re-execute
          scripts on a soft navigation, so `LangSync` repeats the correction
          from an effect when the visitor toggles locale in place. The `lang`
          on the wrapper above covers assistive tech without any script. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(c.locale)}`,
        }}
      />
      <LangSync lang={c.locale} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-accent-solid focus:px-4 focus:py-3 focus:text-body focus:text-accent-contrast"
      >
        {c.chrome.skip}
      </a>

      <IndoHeader content={c} />

      <main id="main" tabIndex={-1}>
        {/* Hero — outcome, time compression, and what the software is. */}
        <Section surface="ink" space="flush" className="pb-20 pt-14 sm:pb-24 sm:pt-20">
          <Container>
            <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="max-w-[52ch] text-body text-fg-subtle">{c.hero.kicker}</p>
                <Heading level={1} size="display-1" className="mt-4 max-w-[26ch]">
                  {c.hero.headline}
                </Heading>
                <Text size="lead" className="mt-6 max-w-[58ch]">
                  {c.hero.body}
                </Text>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                  <Button href={c.hero.cta.href}>{c.hero.cta.label}</Button>
                  <ArrowLink href={c.hero.secondary.href}>
                    {c.hero.secondary.label}
                  </ArrowLink>
                </div>
                <p className="mt-5 max-w-[52ch] text-fine text-fg-subtle">
                  {c.hero.timingNote}
                </p>
              </div>

              <div>
                <VisualFrame label={c.hero.panel.alt}>
                  <AssessmentOverview panel={c.hero.panel} />
                </VisualFrame>
                <p className="mt-3 text-fine text-fg-subtle">
                  {c.hero.illustrationNote}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* In / out — the concrete inputs and deliverables. */}
        <Section surface="ember">
          <Container>
            <SectionHeader heading={c.inOut.heading} />
            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <h3 className="text-heading-2 text-fg">{withBrand(c.inOut.reads.title)}</h3>
                <IconList items={c.inOut.reads.items} className="mt-6" />
              </div>
              <Card className="p-7 sm:p-8">
                <h3 className="text-heading-2 text-fg">{withBrand(c.inOut.produces.title)}</h3>
                <IconList items={c.inOut.produces.items} emphasis className="mt-6" />
              </Card>
            </div>
          </Container>
        </Section>

        {/* Workflow — four stages, icon-led, glanceable. */}
        <Section surface="ink" id="workflow">
          <Container>
            <SectionHeader heading={c.workflow.heading} />
            <StageGrid stages={c.workflow.stages} />
          </Container>
        </Section>

        {/* Gap analysis and the evidence trail. */}
        <Section surface="ember">
          <Container>
            <SectionHeader heading={c.trace.heading} body={c.trace.body} />
            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
              <TraceChain nodes={c.trace.chain} caption={c.trace.caption} />
              <div>
                <Heading level={3} size="heading-1">
                  {c.trace.labelsHeading}
                </Heading>
                <dl className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border">
                  {c.trace.labels.map((label) => (
                    <div key={label.code} className="bg-surface-raised p-5">
                      <dt className="font-mono text-label uppercase tracking-[0.085em] text-accent">
                        {label.code}
                      </dt>
                      <dd className="mt-2 text-small text-fg-muted">{label.note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Container>
        </Section>

        {/* Deliverables — the remediation plan and the report, shown. */}
        <Section surface="ink">
          <Container>
            <SectionHeader heading={c.deliverables.heading} />
            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
              <RemediationTable content={c.deliverables.remediation} />
              <ReportPreview content={c.deliverables.report} />
            </div>
          </Container>
        </Section>

        {/* Before / after, and who decides. */}
        <Section surface="ember">
          <Container>
            <SectionHeader heading={c.comparison.heading} />
            <div className="mt-12">
              <FlowCompare comparison={c.comparison} />
            </div>
            <Note className="mt-6">{c.comparison.note}</Note>
            <Callout heading={c.comparison.review.heading} className="mt-12">
              {c.comparison.review.body.map((p) => (
                <Text key={p}>{p}</Text>
              ))}
            </Callout>
          </Container>
        </Section>

        {/* Use cases — banks, fintechs, insurers. */}
        <Section surface="ink">
          <Container>
            <SectionHeader heading={c.useCases.heading} />
            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {c.useCases.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-heading-2 text-fg">{group.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body text-fg-muted">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* The Indonesian deployment — corpus, ingestion, environment. */}
        <Section surface="ink" className="border-t border-border">
          <Container>
            <SectionHeader heading={c.indonesia.heading} />
            <dl className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
              {c.indonesia.items.map((item) => (
                <div key={item.title} className="bg-surface-raised p-6">
                  <dt className="text-body font-medium text-fg">{item.title}</dt>
                  <dd className="mt-2 text-small text-fg-muted">{item.note}</dd>
                </div>
              ))}
            </dl>
            <Note className="mt-8">{c.indonesia.note}</Note>
          </Container>
        </Section>

        {/* Contact — the one conversion path. */}
        <Section surface="ember" id="contact">
          <Container>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-16">
              <div>
                <Heading level={2} size="display-2" className="max-w-[16ch]">
                  {c.contact.heading}
                </Heading>
                <Text className="mt-5 max-w-[44ch]">{c.contact.body}</Text>
              </div>
              <div className="max-w-xl">
                <IndoContactForm form={c.contact.form} locale={c.locale} />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <IndoFooter content={c} />
    </div>
  );
}
