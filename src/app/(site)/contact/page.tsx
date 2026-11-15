import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives";
import { ContactPanel } from "@/components/forms/contact-panel";

export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Tell us about the workflow you want to create or improve. Your message goes straight to the team who would build it.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a conversation | Kaibre",
    description:
      "Tell us about your desired workflow.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Section surface="ember" space="flush" className="pb-16 pt-24 sm:pb-20 sm:pt-28">
      <Container>
        <ContactPanel headingLevel={1} />
      </Container>
    </Section>
  );
}
