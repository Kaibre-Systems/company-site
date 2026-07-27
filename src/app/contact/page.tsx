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
    <Section surface="paper" space="flush" className="pb-24 pt-32 sm:pt-40">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-start lg:gap-20">
          <div>
            <Heading level={1} size="display-1" className="max-w-[14ch]">
              Tell us about the work.
            </Heading>
            <Text size="lead" className="mt-6 max-w-[46ch]">
              The more specific you are, the more useful the reply. Kaibre is small
              enough that this reaches the person who would be responsible for
              building it.
            </Text>

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="text-small font-medium text-fg-subtle">
                  Prefer email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex min-h-6 items-center text-body text-accent underline underline-offset-4"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-small font-medium text-fg-subtle">
                  Registered office
                </dt>
                <dd className="mt-2">
                  <address className="max-w-[32ch] not-italic text-small text-fg-muted">
                    {SITE.address.line}
                    <br />
                    {SITE.address.city}, {SITE.address.country}
                  </address>
                </dd>
              </div>
            </dl>
          </div>

          {/* The form is a client island behind Suspense (it reads ?topic).
              Reserving its measured height keeps the fallback-to-form swap
              from shifting the page on hydration. */}
          <div className="min-h-[782px] max-w-xl">
            <Suspense
              fallback={
                <p className="text-body text-fg-muted">
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
