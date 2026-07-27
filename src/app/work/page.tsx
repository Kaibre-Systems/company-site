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
import { FitList } from "@/components/modules";
import { Flow } from "@/components/visuals";
import { WORK_COMMISSIONED, WORK_HERO, WORK_LUXURY } from "@/content/work";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Production systems Kaibre designed, built, and continues to operate — including software running a luxury-commerce catalogue worth tens of millions of dollars.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected work | Kaibre",
    description:
      "Production systems Kaibre designed, built, and continues to operate. Client details withheld under confidentiality.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <Section surface="ink" space="flush" className="pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Container>
          <SectionHeader
            heading={WORK_HERO.headline}
            headingLevel={1}
            headingSize="display-1"
            body={WORK_HERO.body}
          />
        </Container>
      </Section>

      {/* Luxury commerce — the anonymised snapshot (light surface) */}
      <Section surface="paper">
        <Container>
          <SectionHeader
            heading={WORK_LUXURY.heading}
            body={WORK_LUXURY.intro}
          />

          <dl className="mt-14 grid gap-x-10 gap-y-8 border-t border-border-strong pt-10 sm:grid-cols-3">
            {WORK_LUXURY.figures.map((f) => (
              <div key={f.label}>
                <dt className="text-small text-fg-subtle">{f.label}</dt>
                <dd className="mt-2 font-mono text-heading-1 text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Scope */}
      <Section surface="ink">
        <Container>
          <>
            <Heading level={2} size="display-2" className="max-w-[20ch]">
              {WORK_LUXURY.scopeTitle}
            </Heading>
            <Text size="lead" className="mt-6 max-w-prose">
              {WORK_LUXURY.scopeIntro}
            </Text>
          </>

          <div className="mt-12">
            <h3 className="text-heading-2 font-medium text-fg">
              {WORK_LUXURY.lifecycleTitle}
            </h3>
            <Flow className="mt-7" stages={WORK_LUXURY.lifecycle} />
          </div>

          <ul className="mt-14 grid gap-x-12 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {WORK_LUXURY.scope.map((item) => (
              <li
                key={item.title}
                className="border-b border-border py-3.5 text-body text-fg-muted"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Why it mattered */}
      <Section surface="ink" className="border-t border-border">
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
        </Container>
      </Section>

      {/* Commissioned systems (light) */}
      <Section surface="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <SectionHeader
                heading={WORK_COMMISSIONED.heading}
                body={WORK_COMMISSIONED.body}
              />
              <div className="mt-9">
                <Button href={WORK_COMMISSIONED.cta.href}>
                  {WORK_COMMISSIONED.cta.label}
                </Button>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <FitList
                title={WORK_COMMISSIONED.fit.title}
                items={WORK_COMMISSIONED.fit.items}
                tone="yes"
              />
              <FitList
                title={WORK_COMMISSIONED.notFit.title}
                items={WORK_COMMISSIONED.notFit.items}
                tone="no"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
