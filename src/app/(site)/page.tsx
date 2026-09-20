import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  Container,
  Heading,
  Note,
  Section,
  Text,
} from "@/components/primitives";
import { ArrowLink, Button } from "@/components/primitives/button";
import { ContactForm } from "@/components/forms/contact-form";
import { HomeAnalytics } from "@/components/analytics/home-analytics";
import { cn } from "@/lib/utils";
import {
  CONTACT,
  DOORS,
  HERO,
  PROOF,
  SENIORITY,
  STATS,
} from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** The mono kicker reintroduced by the review — a label, never a paragraph. */
function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-label uppercase tracking-[0.16em] text-accent">
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeAnalytics />

      {/* 1 — Hero + two doors + proof strip ------------------------------- */}
      <Section surface="ink" space="flush" className="pb-16 pt-24 sm:pb-24 sm:pt-32">
        <Container>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          <Heading level={1} size="display-1" className="mt-6 max-w-[24ch]">
            {HERO.headline}
          </Heading>
          <Text size="lead" className="mt-6 max-w-[56ch]">
            {HERO.body}
          </Text>

          {/* Two doors, equal weight. Custom is first — it is the revenue. */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {/* Door one:commissioned systems */}
            <Card className="flex h-full flex-col gap-4 p-7 sm:p-8">
              <Eyebrow>{DOORS.commissioned.eyebrow}</Eyebrow>
              <Heading level={2} size="heading-1" className="max-w-[20ch]">
                {DOORS.commissioned.headline}
              </Heading>
              <Text size="small" className="max-w-[46ch]">
                {DOORS.commissioned.body}
              </Text>
              <div
                data-analytics="home_door_commissioned"
                className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-4"
              >
                <Button href={DOORS.commissioned.cta.href} halo={false}>
                  {DOORS.commissioned.cta.label}
                </Button>
                <ArrowLink href={DOORS.commissioned.secondary.href}>
                  {DOORS.commissioned.secondary.label}
                </ArrowLink>
              </div>
            </Card>

            {/* Door two: products */}
            <Card className="flex h-full flex-col gap-4 p-7 sm:p-8">
              <Eyebrow>{DOORS.products.eyebrow}</Eyebrow>
              <Heading level={2} size="heading-1" className="max-w-[20ch]">
                {DOORS.products.headline}
              </Heading>
              <ul className="mt-1" data-analytics="home_door_products">
                {DOORS.products.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between gap-4 border-t border-border py-3.5 transition-colors duration-150 hover:border-border-strong"
                    >
                      <span className="text-body font-medium text-fg">
                        <span
                          className={cn(
                            "mark" in item &&
                              item.mark &&
                              "tuntas-mark whitespace-nowrap [overflow-wrap:normal]",
                          )}
                        >
                          {item.name}
                        </span>
                      </span>
                      <span className="flex items-baseline gap-2 text-right text-small text-fg-subtle">
                        {item.note}
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 shrink-0 self-center text-fg-subtle transition-[color,transform] duration-150 group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Proof strip — approved figures, stated flat under the doors. */}
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface p-5 sm:p-6">
                <dt className="text-heading-1 font-medium text-fg">{s.value}</dt>
                <dd className="mt-2 font-mono text-fine text-fg-subtle">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section surface="ember">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:items-start">
            <div>
              <Eyebrow>{PROOF.eyebrow}</Eyebrow>
              <Heading level={2} size="display-2" className="mt-5 max-w-[22ch]">
                {PROOF.heading}
              </Heading>
              <Text size="lead" className="mt-6 max-w-[52ch]">
                {PROOF.body}
              </Text>
              <div className="mt-8">
                <ArrowLink href={PROOF.link.href}>{PROOF.link.label}</ArrowLink>
              </div>
            </div>

            <Card className="p-6 sm:p-7">
              <dl className="grid gap-4 font-mono text-small">
                {PROOF.panel.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-fg-subtle">{row.label}</dt>
                    <dd className="text-right text-fg">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <Note className="mt-6 border-0 p-0 text-fine">
                {PROOF.confidentiality}
              </Note>
            </Card>
          </div>
        </Container>
      </Section>
   
      <Section surface="coal">
        <Container>
          <Heading level={2} size="display-2">
            {SENIORITY.heading}
          </Heading>
          <Text size="lead" className="mt-5 max-w-[58ch]">
            {SENIORITY.body}
          </Text>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SENIORITY.cards.map((card) => (
              <Card key={card.title} className="p-6 sm:p-7">
                <h3 className="text-heading-1 font-medium text-fg">{card.title}</h3>
                <Text size="small" className="mt-3">
                  {card.body}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="ink" id={CONTACT.id}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
            <div>
              <Heading level={2} size="display-2" className="max-w-[16ch]">
                {CONTACT.heading}
              </Heading>
              <Text size="lead" className="mt-5 max-w-[46ch]">
                {CONTACT.body}
              </Text>
            </div>
            <div className="max-w-xl">
              <Suspense
                fallback={<div className="min-h-[41rem]" aria-hidden />}
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
