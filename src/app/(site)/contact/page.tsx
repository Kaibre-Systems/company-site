import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Heading, Section, Text } from "@/components/primitives";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Tell us about a workflow that is expensive, slow, and important. It reaches the person who would be responsible for building it.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a conversation | Kaibre",
    description:
      "Tell us about a workflow that is expensive, slow, and important.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Section surface="ember" space="flush" className="pb-16 pt-24 sm:pb-20 sm:pt-28">
      <Container>
        {/* Two columns from `md`, not `lg`: a half-width tab on a 1080p
            monitor is around 960px, which stacked the form below the fold.

            The mobile track needs its floor pinned to zero like the `md` ones.
            An `auto` track's minimum is min-content, and the Suspense fallback
            below carries the contact address — a single unbreakable run — so at
            a raised default font size that one string set the width of the
            column and pushed the page sideways. It is the state every visitor
            sees before the form hydrates, and the only state a visitor with
            JavaScript off ever sees. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-16">
          <div>
            <Heading level={1} size="display-2" className="max-w-[14ch]">
              Tell us about the work.
            </Heading>
            <Text className="mt-5 max-w-[42ch]">
              Kaibre is small enough that this reaches the person who would be
              responsible for building it. Whatever detail you have is enough to
              start.
            </Text>
            {/* The address and email are in the footer of every page, and the
                email is repeated in the form's fallback state. Repeating them
                here only pushed the form off the screen. */}
          </div>

          {/* The form is a client island behind Suspense (it reads ?topic).
              The reservation that keeps the fallback-to-form swap from
              shifting the page belongs on the fallback, not on this wrapper:
              on the wrapper it also applied to the sent and mail-app states,
              which are a short card, and left ~465px of empty column under
              them on a phone. */}
          <div className="max-w-xl">
            <Suspense
              fallback={
                <p className="min-h-[41rem] text-body text-fg-muted">
                  Loading the form — or write to{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-accent underline underline-offset-4"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </Section>
  );
}
