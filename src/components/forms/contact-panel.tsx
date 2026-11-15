import { Suspense } from "react";
import { Heading, Text } from "@/components/primitives";
import { ContactForm, type Topic } from "@/components/forms/contact-form";
import { SITE } from "@/content/site";

export const CONTACT_COPY = {
  heading: "Tell us about the work.",
  body: "Your message goes directly to a dedicated member of our team who would be responsible for building your solution. Whatever detail you have is enough to start.",
} as const;

/**
 * The contact block: heading, intro, phone and WhatsApp, and the form.
 *
 * Shared by /contact and the bottom of the homepage so the two can never
 * drift — the homepage previously showed the form without the phone and
 * WhatsApp alternatives. The caller owns the section and container; only the
 * heading level differs (h1 on /contact, h2 on the homepage).
 */
export function ContactPanel({
  headingLevel = 2,
  defaultTopic,
}: {
  headingLevel?: 1 | 2;
  /** Preset the form's topic when the page's CTA implies one. A ?topic= in
      the URL still wins. */
  defaultTopic?: Topic;
}) {
  return (
    /* Two columns from `md`, not `lg`: a half-width tab on a 1080p monitor is
       around 960px, which stacked the form below the fold.

       The mobile track needs its floor pinned to zero like the `md` ones. An
       `auto` track's minimum is min-content, and the Suspense fallback below
       carries the contact address — a single unbreakable run — so at a raised
       default font size that one string set the width of the column and
       pushed the page sideways. It is the state every visitor sees before the
       form hydrates, and the only state a visitor with JavaScript off ever
       sees. */
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:gap-16">
      <div>
        <Heading level={headingLevel} size="display-2" className="max-w-[14ch]">
          {CONTACT_COPY.heading}
        </Heading>
        <Text className="mt-5 max-w-[42ch]">{CONTACT_COPY.body}</Text>
        {/* The address and email are in the footer of every page, and the
            email is repeated in the form's fallback state, so they stay out
            of here. Phone and WhatsApp sit in one sentence so they read as an
            alternative to the form rather than floating links. */}
        <Text className="mt-4 max-w-[42ch]">
          You can also give us a call on{" "}
          <a
            href={`tel:${SITE.phone.href}`}
            className="whitespace-nowrap text-accent underline underline-offset-4"
          >
            {SITE.phone.display}
          </a>{" "}
          or{" "}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent underline underline-offset-4"
          >
            message us on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </Text>
      </div>

      {/* The form is a client island behind Suspense (it reads ?topic). The
          reservation that keeps the fallback-to-form swap from shifting the
          page belongs on the fallback, not on this wrapper: on the wrapper it
          also applied to the sent and mail-app states, which are a short
          card, and left ~465px of empty column under them on a phone. */}
      <div className="max-w-xl">
        <Suspense
          fallback={
            <p className="min-h-[41rem] text-body text-fg-muted">
              Loading the form, or write to{" "}
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
          <ContactForm defaultTopic={defaultTopic} />
        </Suspense>
      </div>
    </div>
  );
}
