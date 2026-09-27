import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
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
          {/* One grid, two arrangements. Small: the mark sits beside the
              headline in its own narrow column, with the eyebrow above and
              the body below running the full width. Large: the mark moves to
              a column of its own and fills the space the copy leaves.

              Placement is explicit at both sizes rather than left to
              auto-flow, because the desktop arrangement puts three children
              in column one and auto-flow would drop the headline into column
              two. The mark is decorative: the header already announces the
              company, and the h1 carries the message. */}
          <div
            className={cn(
              "grid grid-cols-[minmax(0,1fr)_minmax(0,7rem)] items-center gap-x-5 gap-y-6",
              "sm:grid-cols-[minmax(0,1fr)_minmax(0,10rem)]",
              "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-x-16",
            )}
          >
            <div className="col-start-1 col-end-3 row-start-1 lg:col-end-2">
              <Eyebrow>{HERO.eyebrow}</Eyebrow>
            </div>

            <Heading
              level={1}
              size="display-1"
              className="col-start-1 row-start-2 max-w-[24ch]"
            >
              {HERO.headline}
            </Heading>

            <Image
              src="/transparent_logo.png"
              alt=""
              width={496}
              height={428}
              priority
              className={cn(
                "col-start-2 row-start-2 h-auto w-full",
                "lg:row-start-1 lg:row-end-4 lg:self-center",
              )}
            />

            <Text
              size="lead"
              className="col-start-1 col-end-3 row-start-3 max-w-[56ch] lg:col-end-2"
            >
              {HERO.body}
            </Text>
          </div>

          {/* Two doors, equal weight. Custom is first — it is the revenue. */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {/* Door one: commissioned systems */}
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
          {/* Three columns, not four: a fourth cell would sit empty, and the
              gap-px border trick renders an empty cell as a dark square. */}
          <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
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
