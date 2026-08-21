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
import { TuntasHeader } from "@/components/tuntas/chrome";
import { TuntasFooter } from "@/components/tuntas/footer";
import { TuntasContactForm } from "@/components/tuntas/contact-form";
import { LangSync } from "@/components/tuntas/lang-sync";
import { FlowCompare, IconList, StageGrid } from "@/components/tuntas/visuals";
import {
  MemoSheet,
  ObligationPanel,
  RegisterStrip,
  RegulationCard,
} from "@/components/tuntas/screens";
import type { TuntasContent } from "@/content/tuntas/types";

/**
 * The Tuntas experience — one component, two dictionaries.
 *
 * Ordered so a reader who stops early still has the whole argument: the event
 * and the outcome in the headline; the work as it is done today, so they
 * recognise their own desk before any mechanism; what they hand over and what
 * comes back; the five stages of one regulation; the register and the five
 * conclusions it can reach; the two screens they receive; then the before and
 * after, which summarises all of it in two columns. Everything past that is
 * depth — pricing, who it serves, what a deployment includes — and one
 * conversion path at the end.
 *
 * The page renders its own chrome: the company-site header is English and
 * Kaibre-branded, and neither an Indonesian-language page nor a separate
 * product should open under it.
 *
 * `data-theme="tuntas"` on the root is the whole of the visual difference.
 * Every layout component below is the company site's own, unmodified; the
 * theme re-resolves the semantic tokens against the product's palette and
 * display face, so the page comes out in Tuntas's identity — ink on paper,
 * no brand colour — rather than Kaibre's, without a conditional in the tree.
 *
 * The panels are not illustrations of the product. They are its screens,
 * rebuilt block for block, carrying the sentences the engine actually wrote
 * about a real regulation read against the demo's fictional company. The
 * product's readers understood those screens on sight; a page that
 * paraphrased them into marketing language would be throwing away the one
 * version already known to work.
 */
export function TuntasExperience({ content }: { content: TuntasContent }) {
  const c = content;

  return (
    <div
      data-theme="tuntas"
      lang={c.locale}
      /* The root paints its own ground: `body` carries Kaibre's near-black,
         and the page below is a different product's ink. Without this, an
         overscroll at either end shows the parent company's colour behind
         it. */
      className="min-h-dvh bg-surface"
    >
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

      <TuntasHeader content={c} />

      <main id="main" tabIndex={-1}>
        {/* Hero — the event, the outcome, and one obligation from the
            register so the work product is visible above the fold. */}
        <Section surface="ink" space="flush" className="pb-16 pt-10 sm:pb-24 sm:pt-20">
          <Container>
            <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-9 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Heading level={1} size="display-1" className="max-w-[26ch]">
                  {c.hero.headline}
                </Heading>
                <Text size="lead" className="mt-6 max-w-[58ch]">
                  {c.hero.body}
                </Text>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                  {/* No halo anywhere in this theme. The glow is light coming
                      off an action on a dark ground; on paper the same blur
                      is a smudge under the button. */}
                  <Button href={c.hero.cta.href} halo={false}>
                    {c.hero.cta.label}
                  </Button>
                  <ArrowLink href={c.hero.secondary.href}>
                    {c.hero.secondary.label}
                  </ArrowLink>
                </div>

                {/* The product's own footer line, in the product's own words,
                    where a visitor meets it before anything else. */}
                <Note className="mt-9">{c.hero.note}</Note>
              </div>

              {/* One obligation, opened — the product's own panel. It is the
                  argument: a reader should be able to tell what Tuntas hands
                  back without reading the copy beside it. */}
              <VisualFrame
                label={c.screens.obligation.alt}
                className="shadow-[var(--shadow-card)]"
              >
                <ObligationPanel
                  content={c.screens.obligation}
                  clip="max-h-[38rem] lg:max-h-[46rem]"
                />
              </VisualFrame>
            </div>
          </Container>
        </Section>

        {/* The work as it is done today. Before any mechanism: the reader has
            to recognise their own desk, and the three facts under it are why
            being late is expensive. */}
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

        {/* The pivot: that was the work, this is what Tuntas takes on. The
            heading has to carry the turn — a reader who has just recognised
            their own desk needs the next line to be about the way out of it,
            not about a data flow. */}
        <Section surface="ink">
          <Container>
            <SectionHeader heading={c.inOut.heading} />
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <h3 className="text-heading-2 text-fg">{c.inOut.reads.title}</h3>
                <IconList items={c.inOut.reads.items} className="mt-6" />
              </div>
              <Card className="p-7 sm:p-8">
                <h3 className="text-heading-2 text-fg">{c.inOut.produces.title}</h3>
                <IconList items={c.inOut.produces.items} emphasis className="mt-6" />
              </Card>
            </div>
          </Container>
        </Section>

        {/* The workflow — five stages, icon-led, glanceable. */}
        <Section surface="coal" id="workflow">
          <Container>
            <SectionHeader heading={c.workflow.heading} />
            <StageGrid stages={c.workflow.stages} />
          </Container>
        </Section>

        {/* The register, and the five conclusions it can reach. The
            discipline the product is actually sold on: nothing concluded that
            is not traced, and nothing guessed where the documents are
            silent. */}
        <Section surface="ink">
          <Container>
            <SectionHeader heading={c.trace.heading} body={c.trace.body} />

            {/* The register at full width. It is a table of long legal
                sentences, and the product gives it the whole screen for the
                same reason: squeezed into half a column, every obligation
                broke into fifteen lines and stopped being readable. */}
            <VisualFrame
              label={c.screens.register.alt}
              className="mt-8 border-0 bg-transparent sm:mt-12"
            >
              <RegisterStrip content={c.screens.register} />
            </VisualFrame>

            <div className="mt-12 sm:mt-16">
              <Heading level={3} size="heading-1">
                {c.trace.labelsHeading}
              </Heading>
              <dl className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
                {c.trace.labels.map((label) => (
                  <div key={label.code} className="bg-surface-raised p-5">
                    <dt className="font-mono text-label uppercase tracking-[0.085em] text-fg">
                      {label.code}
                    </dt>
                    <dd className="mt-2 text-small text-fg-muted">{label.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>

        {/* Deliverables — the two screens themselves, on the wash, so each
            one reads as a sheet lying on a desk rather than as part of the
            page. */}
        <Section surface="paper">
          <Container>
            <SectionHeader
              heading={c.deliverables.heading}
              body={c.deliverables.body}
            />
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-2 lg:gap-12">
              <figure>
                <VisualFrame
                  label={c.screens.regulation.alt}
                  className="border-0 bg-transparent shadow-[var(--shadow-card)]"
                >
                  <RegulationCard content={c.screens.regulation} />
                </VisualFrame>
                <figcaption className="mt-3 text-fine text-fg-subtle">
                  {c.deliverables.captions.regulation}
                </figcaption>
              </figure>
              <figure>
                <VisualFrame
                  label={c.screens.memo.alt}
                  className="border-0 bg-transparent"
                >
                  <MemoSheet content={c.screens.memo} />
                </VisualFrame>
                <figcaption className="mt-3 text-fine text-fg-subtle">
                  {c.deliverables.captions.memo}
                </figcaption>
              </figure>
            </div>
          </Container>
        </Section>

        {/* Before / after, and who decides. */}
        <Section surface="ink">
          <Container>
            <SectionHeader heading={c.comparison.heading} />
            <div className="mt-8 sm:mt-12">
              <FlowCompare comparison={c.comparison} />
            </div>
            <Callout heading={c.comparison.review.heading} className="mt-8 p-5 sm:mt-12 sm:p-9">
              {c.comparison.review.body.map((p) => (
                <Text key={p}>{p}</Text>
              ))}
            </Callout>
          </Container>
        </Section>

        {/* The two packages. What each one does, never what it costs — the
            price is a conversation, and the founder's rule keeps numbers off
            the page. */}
        <Section surface="coal">
          <Container>
            <SectionHeader heading={c.packages.heading} />
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6">
              {c.packages.items.map((item, i) => (
                <Card key={item.name} className="p-6 sm:p-8">
                  <p className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-heading-1 text-fg">{item.name}</h3>
                  <Text size="small" className="mt-3">
                    {item.body}
                  </Text>
                </Card>
              ))}
            </div>
            <Note className="mt-8">{c.packages.note}</Note>
          </Container>
        </Section>

        {/* Who it serves — banks, fintech and multifinance, insurers. */}
        <Section surface="ink">
          <Container>
            <SectionHeader heading={c.useCases.heading} />
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8">
              {c.useCases.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-heading-2 text-fg">{group.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body text-fg-muted">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-border-strong"
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

        {/* What the deployment includes — the corpus and its standing, the
            documents, the record, the language. */}
        <Section surface="coal">
          <Container>
            <SectionHeader heading={c.indonesia.heading} />
            <dl className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-card border border-border bg-border sm:mt-12 sm:grid-cols-2">
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

        {/* Contact — the one conversion path, and the only dark field on the
            page: `#1c231f`, the ink of the mark, at full size. */}
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
                <TuntasContactForm form={c.contact.form} locale={c.locale} />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <TuntasFooter content={c} />
    </div>
  );
}
