import { Container, Heading, Section, Text } from "@/components/primitives";
import { Button } from "@/components/primitives/button";

export default function NotFound() {
  return (
    <Section surface="ink" space="flush" className="pb-32 pt-40">
      <Container size="prose">
        <Heading level={1} size="display-2" className="mt-4">
          That page isn&apos;t here.
        </Heading>
        <Text size="lead" className="mt-5">
          The link may be out of date. Everything Kaibre publishes lives on five
          pages — the products, the work, and a way to get in touch.
        </Text>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Go to the homepage</Button>
          <Button href="/work" variant="secondary">
            See what we&apos;ve built
          </Button>
        </div>
      </Container>
    </Section>
  );
}
