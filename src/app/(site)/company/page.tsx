import type { Metadata } from "next";
import {
  Container,
  Heading,
  Note,
  Prose,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { ArrowLink, Button } from "@/components/primitives/button";
import { Callout } from "@/components/modules";
import { PulseDot } from "@/components/visuals";
import { COMPANY_CTA, COMPANY_HERO, DATA } from "@/content/company";
import { COMPANY, HOW_WE_WORK, PARTNERSHIPS } from "@/content/home";

export const metadata: Metadata = {
  title: "Company — who builds and operates Kaibre's systems",
  description:
    "Kaibre is founder-led, registered in Abu Dhabi, and working across the UAE, Indonesia, Canada and the United States. How we work, how we handle the documents customers give us, and who is responsible for the result.",
  alternates: { canonical: "/company" },
  openGraph: {
    title: "Company | Kaibre",
    description:
      "Founder-led, still running what we built. How we work, and what happens to the documents you give us.",
    url: "/company",
  },
};

/**
 * The company page.
 *
 * A destination rather than a homepage fragment: the visitor who opens this is
 * usually doing vendor diligence before trusting a system with material they
 * are answerable for, so it answers in their order — who you are, where you
 * are, how you work, what happens to their documents, and who is accountable
 * when it matters.
 *
 * The identity, the four working principles and the partnership position are
 * shared with the homepage's content module rather than restated here: one
 * source, so the two can never drift into two different companies.
 */
export default function CompanyPage() {
  return (
    <>
      {/* 1 — Who we are, and the facts a buyer checks first. --------------- */}
      <Section surface="ink" space="flush" className="pb-16 pt-28 sm:pb-20 sm:pt-36">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <Heading level={1} size="display-1" className="max-w-[18ch]">
                {COMPANY_HERO.headline}
              </Heading>
              <Text size="lead" className="mt-7 max-w-[54ch]">
                {COMPANY_HERO.body}
              </Text>
            </div>

            {/* The facts, where a reader doing diligence looks for them:
                above the fold, not under three paragraphs. */}
            <dl className="grid content-start gap-y-5 self-end">
              {COMPANY.facts.map((f) => (
                <div
                  key={f.label}
                  /* Wrapping flex, not a two-column grid. The `auto` column
                     could not shrink, so at a 200% default font size on a
                     320px screen a value like "UAE, Indonesia, Canada, United
                     States" set the row's width and pushed the whole document
                     sideways. Wrapped, a long value simply takes its own
                     line. */
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-border pb-4"
                >
                  <dt className="min-w-0 text-small text-fg-subtle">{f.label}</dt>
                  <dd className="min-w-0 text-body text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* 2 — Founder-led, and where the standards come from. --------------- */}
      <Section surface="coal" id={COMPANY.id}>
        <Container>
          <SectionHeader heading={COMPANY.heading} body={COMPANY.body} />

          <div className="mt-12 border-t border-border pt-10">
            <h2 className="text-small font-medium text-fg-subtle">
              {COMPANY.credibility.label}
            </h2>
            <Text className="mt-4 max-w-prose">{COMPANY.credibility.body}</Text>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {COMPANY.credibility.domains.map((d, i) => (
                <li key={d} className="flex items-center gap-2.5 text-body text-fg">
                  <PulseDot delay={i * 400} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 3 — How we work (ember). ----------------------------------------- */}
      <Section surface="ember" id={HOW_WE_WORK.id}>
        <Container>
          <SectionHeader heading={HOW_WE_WORK.heading} headingLevel={2} />
          <ol className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {HOW_WE_WORK.steps.map((step, i) => (
              <li key={step.title}>
                <p className="font-mono text-label text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <Heading level={3} size="heading-1" className="mt-3">
                  {step.title}
                </Heading>
                <Text className="mt-3 max-w-[46ch]">{step.body}</Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 4 — What happens to the documents you give us. --------------------
          The question a regulated buyer asks second, and until now it was
          answered only inside one product page. */}
      <Section surface="ink" id={DATA.id}>
        <Container>
          <SectionHeader heading={DATA.heading} body={DATA.body} headingLevel={2} />
          <dl className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border sm:mt-12 sm:grid-cols-2">
            {DATA.items.map((item) => (
              <div key={item.title} className="bg-surface-raised p-6">
                <dt className="text-body font-medium text-fg">{item.title}</dt>
                <dd className="mt-2 text-small text-fg-muted">{item.note}</dd>
              </div>
            ))}
          </dl>
          <Note className="mt-8">{DATA.note}</Note>
        </Container>
      </Section>

      {/* 5 — Partnerships. ------------------------------------------------- */}
      <Section surface="coal" space="tight">
        <Container size="prose">
          <Heading level={2} size="heading-1">
            {PARTNERSHIPS.heading}
          </Heading>
          <Prose paragraphs={PARTNERSHIPS.body} size="body" className="mt-5" />
          <div className="mt-7">
            <ArrowLink href={PARTNERSHIPS.cta.href}>
              {PARTNERSHIPS.cta.label}
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* 6 — Conversion. ---------------------------------------------------- */}
      <Section surface="ink">
        <Container>
          <Callout className="text-center">
            <Heading level={2} size="display-2" className="mx-auto max-w-[18ch]">
              {COMPANY_CTA.heading}
            </Heading>
            <Text size="lead" className="mx-auto max-w-[52ch]">
              {COMPANY_CTA.body}
            </Text>
            <div className="flex justify-center pt-2">
              <Button href={COMPANY_CTA.cta.href}>{COMPANY_CTA.cta.label}</Button>
            </div>
          </Callout>
        </Container>
      </Section>
    </>
  );
}
