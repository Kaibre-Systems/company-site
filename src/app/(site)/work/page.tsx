import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  Container,
  Heading,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { Button } from "@/components/primitives/button";
import { FitList } from "@/components/modules";
import { PulseDot } from "@/components/visuals";
import { WORK_CASE_CARD, WORK_COMMISSIONED, WORK_HERO } from "@/content/work";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Production systems Kaibre designed, built, and continues to operate, including software running a luxury-commerce catalogue worth tens of millions of dollars.",
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

      {/* The index — one card per anonymised system, each on its own URL. */}
      <Section surface="coal" space="tight">
        <Container>
          <Link href={WORK_CASE_CARD.href} className="group block">
            <Card interactive className="p-7 sm:p-9">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-label uppercase tracking-[0.16em] text-accent">
                    {WORK_CASE_CARD.eyebrow}
                  </p>
                  <Heading level={2} size="heading-1" className="mt-4 max-w-[26ch]">
                    {WORK_CASE_CARD.headline}
                  </Heading>
                  <Text className="mt-4 max-w-[58ch]">{WORK_CASE_CARD.body}</Text>
                </div>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1 size-6 shrink-0 text-fg-subtle transition-[color,transform] duration-150 group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </div>

              <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-border pt-7 sm:grid-cols-3">
                {WORK_CASE_CARD.figures.map((f) => (
                  <div key={f.label}>
                    <dt className="text-small text-fg-subtle">{f.label}</dt>
                    <dd className="mt-2 flex items-center gap-2.5 font-mono text-heading-1 text-fg">
                      {f.value === "Live" ? <PulseDot tone="live" size="md" halo /> : null}
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-7 text-body font-medium text-accent">
                {WORK_CASE_CARD.cta}
              </p>
            </Card>
          </Link>
        </Container>
      </Section>

      {/* Commissioned systems (ember) */}
      <Section surface="ember">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
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
