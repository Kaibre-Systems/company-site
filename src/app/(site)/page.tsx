import type { Metadata } from "next";
import {
  Container,
  Heading,
  Note,
  Section,
  SectionHeader,
  Text,
} from "@/components/primitives";
import { ArrowLink, Button } from "@/components/primitives/button";
import {
  Callout,
  FitList,
  ProductCard,
} from "@/components/modules";
import {
  Flow,
  IndonesiaFlag,
  PulseDot,
  MonitoredSignal,
  VisualFrame,
} from "@/components/visuals";
import { CallPanel } from "@/components/visuals/call";
import { FindingDocument } from "@/components/visuals/document";
import { TuntasWordmark } from "@/components/brand/tuntas";
import { ObligationPanel, RegulationCard } from "@/components/tuntas/screens";
import { KAI_CALL_PANEL } from "@/content/kai";
import { SP_HERO_PANEL } from "@/content/securepulse";
import { EN as TUNTAS } from "@/content/tuntas/en";
import {
  COMMISSIONED,
  COMPANY,
  FEATURED,
  FINAL_CTA,
  HERO,
  PRODUCTS,
  PROOF,
  THESIS,
} from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero -------------------------------------------------------- */}
      <Section surface="ink" space="flush" className="pb-16 pt-24 sm:pb-24 sm:pt-32">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-6 sm:gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-y-14">
            <div>
              <Heading level={1} size="display-1" className="max-w-[46rem]">
                {HERO.headline}
              </Heading>
              <Text size="lead" className="mt-7 max-w-[52ch]">
                {HERO.body}
              </Text>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={HERO.primary.href}>{HERO.primary.label}</Button>
                <Button href={HERO.secondary.href} variant="secondary">
                  {HERO.secondary.label}
                </Button>
              </div>
            </div>

            <MonitoredSignal className="mx-auto max-w-[26rem] lg:max-w-none" />
          </div>

          {/* The three modes, stated plainly under the fold line.
              The rule separates a wide two-column composition on a desktop and
              a ~90px chart on a phone, so it cannot carry one spacing value:
              at desktop width it is a section break, at phone width the same
              gap is larger than the graphic above it. Symmetric on a phone,
              so the rule reads as a divider between two blocks rather than as
              a lid on the one above it. */}
          <dl className="mt-6 grid gap-x-10 gap-y-8 border-t border-border pt-6 sm:mt-16 sm:grid-cols-3 sm:pt-10">
            {HERO.modes.map((m) => (
              <div key={m.label}>
                <dt className="text-heading-2 font-medium text-fg">{m.label}</dt>
                <dd className="mt-2 text-small text-fg-muted">{m.note}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 2 — Tuntas, featured ---------------------------------------------
          The one section of this site drawn in another product's identity.
          `data-theme="tuntas"` re-resolves every token underneath it, so a
          visitor scrolling out of the hero lands on a white sheet set in a
          serif — the product's own register, before a word of it is read.
          Every component in here is the site's own; none of them knows. */}
      {/* No border on either edge. Between a near-black section and a white
          one the tonal change is the seam already, and the section below this
          carries its own top rule — two lines at the same y read as a
          mistake. */}
      <Section surface="paper" theme="tuntas">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              {/* The mark, at reading size and drawn from the identity's own
                  paths — the first thing the section says is the product's
                  name in its own letterforms, with nothing above it. */}
              <TuntasWordmark className="h-5 w-auto text-fg sm:h-6" />

              <Heading level={2} size="display-2" className="mt-6 max-w-[20ch]">
                {FEATURED.headline}
              </Heading>
              <Text size="lead" className="mt-6 max-w-[54ch]">
                {FEATURED.body}
              </Text>

              <dl className="mt-9 grid gap-y-5 border-t border-border pt-7">
                {FEATURED.points.map((point) => (
                  <div key={point.label} className="grid gap-1">
                    <dt className="text-body font-medium text-fg">
                      {point.label}
                    </dt>
                    <dd className="max-w-[58ch] text-small text-fg-muted">
                      {point.note}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                {/* No halo here. The glow is designed for a dark ground,
                    where it reads as light coming off the action; on a
                    white sheet the same blur is a smudge under the
                    button. */}
                <Button href={FEATURED.cta.href} halo={false}>
                  {FEATURED.cta.label}
                </Button>
                <ArrowLink href={FEATURED.secondary.href}>
                  <span className="inline-flex items-center gap-2.5">
                    <IndonesiaFlag />
                    {FEATURED.secondary.label}
                  </span>
                </ArrowLink>
              </div>

              <Note className="mt-9">{FEATURED.disclaimer}</Note>
            </div>

            {/* One obligation, opened — the product's own panel, block for
                block. The sheet is the argument: a visitor should be able to
                tell what Tuntas hands back without reading the copy beside
                it. */}
            <figure>
              <VisualFrame
                label={TUNTAS.screens.obligation.alt}
                className="shadow-[var(--shadow-card)]"
              >
                <ObligationPanel
                  content={TUNTAS.screens.obligation}
                  clip="max-h-[34rem] lg:max-h-[40rem]"
                />
              </VisualFrame>
              <figcaption className="mt-3 text-fine text-fg-subtle">
                {FEATURED.panelNote}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* 3 — Operating thesis --------------------------------------------- */}
      <Section surface="ink" className="border-t border-border">
        <Container>
          <>
            <SectionHeader
              heading={THESIS.heading}
              body={THESIS.body}
            />
          </>

          <Flow className="mt-14 border-t border-border pt-10" stages={THESIS.flow} />

          {/* Grounded in three real shapes of that work — one line, not a
              second three-column block competing with the diagram above. */}
          <Note className="mt-10 max-w-[70ch]">
            {THESIS.examples.map((e) => e.note).join(" ")}
          </Note>
        </Container>
      </Section>

      {/* 4 — Production proof (ember surface) ------------------------------ */}
      <Section surface="ember">
        <Container>
          <SectionHeader
            heading={PROOF.heading}
            body={PROOF.body}
          />

          {/* The figures are the proof. They carry the section on their own —
              no illustration is needed, and an abstract one would only read
              as a placeholder. */}
          <dl className="mt-14 grid gap-x-10 gap-y-8 border-t border-border-strong pt-10 sm:grid-cols-3">
            {PROOF.figures.map((f) => (
              <div key={f.label}>
                <dt className="text-small text-fg-subtle">{f.label}</dt>
                <dd className="mt-2 font-mono text-heading-1 text-fg">{f.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-small text-fg-subtle">Status</dt>
              {/* The one figure describing something running right now. */}
              <dd className="mt-2 flex items-center gap-2.5 font-mono text-heading-1 text-fg">
                <PulseDot tone="live" size="md" halo />
                Live
              </dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Note className="max-w-[52ch]">{PROOF.confidentiality}</Note>
            <ArrowLink href={PROOF.link.href} className="shrink-0">
              {PROOF.link.label}
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* 5 — Products (coal) ----------------------------------------------
          The products get their own room: warm charcoal rather than a third
          ink slab, and each panel carries its product's own material — the
          contents of a Tuntas memo to the Board, a page of the SecurePulse
          report, a kAI call mid-conversation. A visitor should be able to
          tell the three apart with the labels covered.

          Tuntas leads, and its panel is drawn in its own theme: it is the
          product in front of customers now, and the one that is not a Kaibre
          sub-brand. The artifact here is deliberately not the one in the
          featured section above — the obligation sheet is up there, the memo
          is down here, and neither is shown twice. */}
      <Section surface="coal" id="products" className="relative overflow-hidden">
        <Container className="relative">
          <>
            <SectionHeader
              heading={PRODUCTS.heading}
              body={PRODUCTS.body}
            />
          </>

          <div className="relative mt-12">
            {/* Warmth radiating from behind the pair. Centred low, on the
                panels rather than the copy, and faint by design — it should
                register as atmosphere, never as a tint over text. */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[-4rem] left-1/2 h-[34rem] w-[70rem] max-w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,var(--color-brand-500),transparent)] blur-2xl motion-safe:animate-[glowSection_7s_ease-in-out_infinite]"
            />
            <div className="relative grid gap-x-6 gap-y-12 lg:grid-cols-3">
              <div>
                <ProductCard
                  {...PRODUCTS.items[0]}
                  visual={
                    /* The screen a matter opens on — the other end of the
                       product from the obligation panel in the featured
                       section above, so neither artifact appears twice. It
                       carries its own theme, which is the point of the row:
                       each panel is its own product's material. */
                    <div data-theme="tuntas">
                      <VisualFrame
                        label={TUNTAS.screens.regulation.alt}
                        className="border-0 bg-transparent"
                      >
                        <RegulationCard content={TUNTAS.screens.regulation} />
                      </VisualFrame>
                    </div>
                  }
                />
                {/* The buyer's own language, one line under the product —
                    outside the card link, so the two destinations stay two
                    targets. */}
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-fg-subtle">
                  <span className="inline-flex items-center gap-2">
                    <IndonesiaFlag />
                    <span>{PRODUCTS.tuntasMarket.note}</span>
                  </span>
                  <ArrowLink
                    href={PRODUCTS.tuntasMarket.href}
                    className="text-small"
                  >
                    {PRODUCTS.tuntasMarket.label}
                  </ArrowLink>
                </p>
              </div>

              <div>
                <ProductCard
                  {...PRODUCTS.items[1]}
                  visual={
                    <VisualFrame label={SP_HERO_PANEL.cardAlt}>
                      <FindingDocument doc={SP_HERO_PANEL} compact />
                    </VisualFrame>
                  }
                />
              </div>

              <div>
                <ProductCard
                  {...PRODUCTS.items[2]}
                  visual={
                    <VisualFrame label={KAI_CALL_PANEL.cardAlt}>
                      <CallPanel content={KAI_CALL_PANEL} compact />
                    </VisualFrame>
                  }
                />
              </div>
            </div>
          </div>

          {/* One caption for all three panels rather than the same line
              three times. The Tuntas panel is a reproduction of a screen the
              product actually renders, so "illustrations" would be wrong for
              a third of the row; what is true of all three is that the
              material in them is not a real customer's. */}
          <p className="mt-5 text-fine text-fg-subtle">
            Product screens. No real customer, engagement or campaign appears
            in any of them.
          </p>
        </Container>
      </Section>

      {/* 6 — Commissioned systems ------------------------------------------
          The surface change out of coal is the seam; a border would double it. */}
      <Section surface="ink" id={COMMISSIONED.id}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SectionHeader
                heading={COMMISSIONED.heading}
                body={COMMISSIONED.body}
              />
              <div className="mt-8">
                <ArrowLink href={COMMISSIONED.cta.href}>
                  {COMMISSIONED.cta.label}
                </ArrowLink>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <FitList
                title={COMMISSIONED.fit.title}
                items={COMMISSIONED.fit.items}
                tone="yes"
              />
              <FitList
                title={COMMISSIONED.notFit.title}
                items={COMMISSIONED.notFit.items}
                tone="no"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 7 — Company (coal) — the second charcoal room, so the page steps
          ink → ember → coal on its way out instead of falling back to black.

          Short, and pointing at the page. The founder background, the four
          working principles, the partnership position and the data-handling
          answers are all on /company now; repeating them here made the
          homepage the longest page on the site and still left "Company" as a
          fragment. The `#company` id stays so older links land here. */}
      <Section surface="coal" id={COMPANY.id}>
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <SectionHeader heading={COMPANY.heading} body={COMPANY.body} />
              <div className="mt-8">
                <ArrowLink href={COMPANY.cta.href}>{COMPANY.cta.label}</ArrowLink>
              </div>
            </div>

            {/* Facts, not a third paragraph. */}
            <dl className="grid content-start gap-y-5 self-center">
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

      {/* 8 — Conversion ------------------------------------------------------ */}
      <Section surface="ink">
        <Container>
          <Callout className="text-center">
            <Heading level={2} size="display-2" className="mx-auto max-w-[18ch]">
              {FINAL_CTA.heading}
            </Heading>
            <Text size="lead" className="mx-auto max-w-[52ch]">
              {FINAL_CTA.body}
            </Text>
            <div className="flex justify-center pt-2">
              <Button href={FINAL_CTA.cta.href}>{FINAL_CTA.cta.label}</Button>
            </div>
          </Callout>
        </Container>
      </Section>
    </>
  );
}
