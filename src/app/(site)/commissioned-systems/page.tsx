import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Card,
  Container,
  Heading,
  Note,
  Section,
  Text,
} from "@/components/primitives";
import { ArrowLink, Button } from "@/components/primitives/button";
import { FitList } from "@/components/modules";
import { ContactForm } from "@/components/forms/contact-form";
import { cn } from "@/lib/utils";
import {
  CM_CASE,
  CM_CONTACT,
  CM_ENGAGEMENT,
  CM_FIT,
  CM_HERO,
  CM_PRICING,
} from "@/content/commissioned";

export const metadata: Metadata = {
  title: "Commissioned systems",
  description:
    "We build the one system your business runs on, put it into production, and keep operating it. Senior engineers only, no juniors, no handoff.",
  alternates: { canonical: "/commissioned-systems" },
  openGraph: {
    title: "Commissioned systems | Kaibre",
    description:
      "We build the one system your business runs on, put it into production, and keep operating it.",
    url: "/commissioned-systems",
  },
};

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-label uppercase tracking-[0.16em] text-accent">
      {children}
    </p>
  );
}

export default function CommissionedSystemsPage() {
  return (
    <>
      {/* Hero */}
      <Section surface="ink" space="flush" className="pb-16 pt-24 sm:pb-20 sm:pt-32">
        <Container>
          <Eyebrow>{CM_HERO.eyebrow}</Eyebrow>
          <Heading level={1} size="display-1" className="mt-6 max-w-[24ch]">
            {CM_HERO.headline}
          </Heading>
          <Text size="lead" className="mt-6 max-w-[58ch]">
            {CM_HERO.body}
          </Text>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={CM_HERO.cta.href}>{CM_HERO.cta.label}</Button>
            <span className="font-mono text-fine text-fg-subtle">{CM_HERO.note}</span>
          </div>
        </Container>
      </Section>

      {/* Take it on / Not a fit */}
      <Section surface="coal">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:gap-16">
            <FitList
              title={CM_FIT.take.title}
              items={CM_FIT.take.items}
              tone="yes"
            />
            <FitList
              title={CM_FIT.notFit.title}
              items={CM_FIT.notFit.items}
              tone="no"
            />
          </div>
        </Container>
      </Section>

      {/* How an engagement runs */}
      <Section surface="ink">
        <Container>
          <Heading level={2} size="display-2">
            {CM_ENGAGEMENT.heading}
          </Heading>
          <Text size="lead" className="mt-5 max-w-[54ch]">
            {CM_ENGAGEMENT.body}
          </Text>

          <ol className="mt-12 grid gap-4">
            {CM_ENGAGEMENT.stages.map((stage) => {
              const accent = "accent" in stage && stage.accent;
              return (
                <li
                  key={stage.n}
                  className={cn(
                    "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 gap-y-2 rounded-card border p-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-6 sm:p-7",
                    accent
                      ? "border-accent/50 bg-accent/[0.07]"
                      : "border-border bg-surface-raised",
                  )}
                >
                  <span className="pt-1 font-mono text-small text-accent">{stage.n}</span>
                  <div>
                    <h3 className="text-heading-1 font-medium text-fg">{stage.title}</h3>
                    <Text size="small" className="mt-2 max-w-[66ch]">
                      {stage.body}
                    </Text>
                  </div>
                  <span
                    className={cn(
                      "col-start-2 font-mono text-fine sm:col-start-3 sm:text-right",
                      accent ? "text-accent" : "text-fg-subtle",
                    )}
                  >
                    {stage.duration}
                  </span>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* What it costs to start (rust band) */}
      <Section surface="ember">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <Eyebrow>{CM_PRICING.eyebrow}</Eyebrow>
              <Heading level={2} size="display-2" className="mt-5 max-w-[20ch]">
                {CM_PRICING.heading}
              </Heading>
              <Text size="lead" className="mt-6 max-w-[48ch]">
                {CM_PRICING.body}
              </Text>
            </div>
            <Card className="p-6 sm:p-7">
              <dl className="grid gap-4 text-body">
                {CM_PRICING.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-fg">{row.label}</dt>
                    <dd className="text-right font-mono text-small text-fg-muted">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </Container>
      </Section>

      {/* One case card */}
      <Section surface="coal">
        <Container>
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <Heading level={2} size="display-2">
              {CM_CASE.heading}
            </Heading>
            <ArrowLink href={CM_CASE.allWork.href} className="shrink-0">
              {CM_CASE.allWork.label}
            </ArrowLink>
          </div>
          <Card className="grid gap-8 p-7 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
            <div>
              <Eyebrow>{CM_CASE.eyebrow}</Eyebrow>
              <Heading level={3} size="heading-1" className="mt-4 max-w-[24ch]">
                {CM_CASE.headline}
              </Heading>
              <Text size="small" className="mt-4 max-w-[52ch]">
                {CM_CASE.body}
              </Text>
              <div className="mt-6">
                <ArrowLink href={CM_CASE.link.href}>{CM_CASE.link.label}</ArrowLink>
              </div>
            </div>
            <dl className="grid gap-4 font-mono text-small">
              {CM_CASE.panel.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-4"
                >
                  <dt className="text-fg-subtle">{row.label}</dt>
                  <dd className="text-right text-fg">{row.value}</dd>
                </div>
              ))}
              <Note className="border-0 p-0 text-fine">{CM_CASE.confidentiality}</Note>
            </dl>
          </Card>
        </Container>
      </Section>

      {/* The ask, on the page */}
      <Section surface="ink" id={CM_CONTACT.id}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
            <div>
              <Heading level={2} size="display-2" className="max-w-[16ch]">
                {CM_CONTACT.heading}
              </Heading>
              <Text size="lead" className="mt-5 max-w-[46ch]">
                {CM_CONTACT.body}
              </Text>
            </div>
            <div className="max-w-xl">
              <Suspense fallback={<div className="min-h-[41rem]" aria-hidden />}>
                <ContactForm defaultTopic="commissioned" />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
