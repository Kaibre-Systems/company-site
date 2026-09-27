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
import { VisualFrame } from "@/components/visuals";
import { TuntasContactForm } from "@/components/tuntas/contact-form";
import { LangSync } from "@/components/tuntas/lang-sync";
import { IconList, StageGrid } from "@/components/tuntas/visuals";
import {
  FollowUpScreen,
  MemoSheet,
  ObligationPanel,
  RegisterStrip,
} from "@/components/tuntas/screens";
import type { TuntasContent } from "@/content/tuntas/types";

/**
 * The Tuntas product page.
 *
 * It now opens under the company site's own chrome — same header, same footer,
 * same dark Kaibre palette and display face as every other product page — so
 * it reads as one site. The route lives inside the `(site)` group, so the
 * shared `SiteChrome` supplies the skip link, header, `<main>` landmark and
 * footer; this component renders only the sections.
 *
 * The one thing kept from the product's own identity is its screens. They are
 * not illustrations: they are the product's real surfaces, rebuilt block for
 * block, carrying the sentences the engine actually wrote about a real
 * regulation read against the demo's fictional company. Each screen is wrapped
 * in `data-theme="tuntas"`, which re-resolves the semantic tokens against the
 * product's own ink-on-paper palette — so the panels read as light documents
 * lying on the dark page, exactly as they do on the homepage.
 *
 * The page is still bilingual: `/tuntas` (English) and `/id/tuntas` (Bahasa
 * Indonesia) render this same component from two dictionaries, and the header's
 * EN | ID toggle moves between them. The root layout stamps `lang="en"`; the
 * inline script corrects it before paint on a full load, and `LangSync`
 * repeats the correction from an effect on a soft locale switch.
 */
export function TuntasExperience({ content }: { content: TuntasContent }) {
  const c = content;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(c.locale)}`,
        }}
      />
      <LangSync lang={c.locale} />

      {/* Hero — the event, the outcome, and one obligation from the register
          so the work product is visible above the fold. */}
      <Section surface="ink" space="flush" className="pb-16 pt-24 sm:pb-24 sm:pt-32">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-9 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="text-heading-1 font-medium text-fg">
                <span className="tuntas-mark whitespace-nowrap [overflow-wrap:normal]">
                  Tuntas
                </span>
                <span className="ml-3 text-body font-normal text-fg-subtle">
                  {c.chrome.tagline} · {c.chrome.marketLabel}
                </span>
              </p>
              <Heading level={1} size="display-1" className="mt-5 max-w-[26ch]">
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

              <Note className="mt-9">{c.hero.note}</Note>
            </div>

            {/* One obligation, opened — the product's own panel, as a light
                document on the dark page. */}
            <figure>
              <div data-theme="tuntas">
                <VisualFrame
                  label={c.screens.obligation.alt}
                  className="shadow-[var(--shadow-card)]"
                >
                  <ObligationPanel
                    content={c.screens.obligation}
                    clip="max-h-[38rem] sm:max-h-[42rem] lg:max-h-[46rem]"
                  />
                </VisualFrame>
              </div>
              <figcaption className="mt-3 text-fine text-fg-subtle">
                {c.hero.panelNote}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* The work as it is done today. Before any mechanism: the reader has to
          recognise their own desk, and the three facts under it are why being
          late is expensive. */}
      <Section surface="coal">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
            <SectionHeader heading={c.problem.heading} body={c.problem.body} />
            <dl className="grid content-start gap-y-6 self-center">
              {c.problem.facts.map((fact) => (
                <div key={fact.title} className="border-l-2 border-border-strong pl-5">
                  <dt className="text-body font-medium text-fg">{fact.title}</dt>
                  <dd className="mt-1.5 max-w-[48ch] text-small text-fg-muted">
                    {fact.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* The pivot: that was the work, this is what Tuntas takes on. */}
      <Section surface="ink">
        <Container>
          <SectionHeader heading={c.inOut.heading} body={c.inOut.reads} />
          <Card className="mt-8 p-6 sm:mt-12 sm:p-8">
            <h3 className="text-heading-2 text-fg">{c.inOut.produces.title}</h3>
            <IconList items={c.inOut.produces.items} emphasis className="mt-6" />
          </Card>
        </Container>
      </Section>

      {/* The workflow — five stages, icon-led, glanceable. */}
      <Section surface="coal" id="workflow">
        <Container>
          <SectionHeader heading={c.workflow.heading} />
          <StageGrid stages={c.workflow.stages} />
        </Container>
      </Section>

      {/* The register, and the five conclusions it can reach. */}
      <Section surface="ink">
        <Container>
          <SectionHeader heading={c.trace.heading} body={c.trace.body} />

          {/* The register at full width, as a light document on the dark page. */}
          <div data-theme="tuntas">
            <VisualFrame
              label={c.screens.register.alt}
              className="mt-8 border-0 bg-transparent sm:mt-12"
            >
              <RegisterStrip content={c.screens.register} />
            </VisualFrame>
          </div>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-12">
            {/* The screen where the product declines to pick a side between two
                of the company's own documents. */}
            <div data-theme="tuntas">
              <VisualFrame
                label={c.screens.contradiction.alt}
                className="border-0 bg-transparent shadow-[var(--shadow-card)]"
              >
                <ObligationPanel
                  content={c.screens.contradiction}
                  clip="max-h-[44rem] lg:max-h-none"
                />
              </VisualFrame>
            </div>

            {/* The five conclusions travel with the panel. */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading level={3} size="heading-1">
                {c.trace.labelsHeading}
              </Heading>
              <dl className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
                {c.trace.labels.map((label) => (
                  <div key={label.code} className="bg-surface-raised px-5 py-3.5">
                    <dt className="font-mono text-label uppercase tracking-[0.085em] text-fg">
                      {label.code}
                    </dt>
                    <dd className="mt-2 text-small text-fg-muted">
                      {label.note}
                    </dd>
                  </div>
                ))}
              </dl>

              <Callout className="mt-6 p-5 sm:p-7">
                <Heading level={3} size="heading-2">
                  {c.review.heading}
                </Heading>
                {c.review.body.map((para) => (
                  <Text key={para} size="small">
                    {para}
                  </Text>
                ))}
              </Callout>
            </div>
          </div>
        </Container>
      </Section>

      {/* Deliverables — the two screens themselves, as light sheets on the
          dark page. */}
      <Section surface="coal">
        <Container>
          <SectionHeader
            heading={c.deliverables.heading}
            body={c.deliverables.body}
          />
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-8 sm:mt-12 sm:gap-10">
            <figure>
              <div data-theme="tuntas">
                <VisualFrame
                  label={c.screens.memo.alt}
                  className="border-0 bg-transparent"
                >
                  <MemoSheet content={c.screens.memo} />
                </VisualFrame>
              </div>
              <figcaption className="mt-3 text-fine text-fg-subtle">
                {c.deliverables.captions.memo}
              </figcaption>
            </figure>
          </div>

          <figure className="mt-8 sm:mt-10">
            <div data-theme="tuntas">
              <VisualFrame
                label={c.screens.followUp.alt}
                className="border-0 bg-transparent shadow-[var(--shadow-card)]"
              >
                <FollowUpScreen
                  content={c.screens.followUp}
                  clip="max-h-[24rem] sm:max-h-none"
                />
              </VisualFrame>
            </div>
            <figcaption className="mt-3 text-fine text-fg-subtle">
              {c.deliverables.captions.followUp}
            </figcaption>
          </figure>

          {/* The two packages, in the section about what arrives. */}
          <div className="mt-10 border-t border-border pt-8 sm:mt-12">
            <Heading level={3} size="heading-1">
              {c.packages.heading}
            </Heading>
            <dl className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-5 sm:grid-cols-2">
              {c.packages.items.map((item) => (
                <div key={item.name}>
                  <dt className="text-body font-medium text-fg">{item.name}</dt>
                  <dd className="mt-1.5 text-small text-fg-muted">{item.body}</dd>
                </div>
              ))}
            </dl>
            <Note className="mt-6">{c.packages.note}</Note>
          </div>
        </Container>
      </Section>

      {/* What the deployment includes. */}
      <Section surface="ink">
        <Container>
          <SectionHeader heading={c.indonesia.heading} />
          <dl className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border sm:mt-12 sm:grid-cols-2">
            {c.indonesia.items.map((item) => (
              <div key={item.title} className="bg-surface-raised px-6 py-4">
                <dt className="text-body font-medium text-fg">{item.title}</dt>
                <dd className="mt-2 text-small text-fg-muted">{item.note}</dd>
              </div>
            ))}
          </dl>
          <Note className="mt-8">{c.indonesia.note}</Note>
        </Container>
      </Section>

      {/* Contact — the one conversion path, on the page, matching the other
          product pages' closing form. */}
      <Section surface="coal" id="contact">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-16">
            <div>
              <Heading level={2} size="display-2" className="max-w-[16ch]">
                {c.contact.heading}
              </Heading>
              <Text className="mt-5 max-w-[44ch]">{c.contact.body}</Text>
            </div>
            <div className="max-w-xl">
              <TuntasContactForm form={c.contact.form} locale={c.locale} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
