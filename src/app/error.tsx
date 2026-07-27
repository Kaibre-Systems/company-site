"use client";

import { useEffect } from "react";
import { Container, Heading, Section, Text } from "@/components/primitives";
import { Button } from "@/components/primitives/button";
import { SITE } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section surface="ink" space="flush" className="pb-32 pt-40">
      <Container size="prose">
        <Heading level={1} size="display-2" className="mt-4">
          Something went wrong on our side.
        </Heading>
        <Text size="lead" className="mt-5">
          Try again — and if it keeps happening, tell us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </Text>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="min-h-12 cursor-pointer rounded-control bg-accent-solid px-6 text-body font-medium text-accent-contrast transition-colors duration-150 hover:bg-accent-solid-hover"
          >
            Try again
          </button>
          <Button href="/" variant="secondary">
            Go to the homepage
          </Button>
        </div>
      </Container>
    </Section>
  );
}
