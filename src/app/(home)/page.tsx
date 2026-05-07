import HeroSection from "@/components/hero-section";
import CTAButton from "@/components/ui/cta-button";
import SecondaryCTAButton from "@/components/ui/secondary-cta-button";
import DualCallToAction from "@/components/dual-call-to-action";
import { CALENDLY_URL, withUtm } from "@/lib/links";

import PathSelection from "./sections/path-selection";
import TrustStrip from "./sections/trust-strip";
import KaiProduct from "./sections/kai-product";
import HowItWorks from "./sections/how-it-works";
import UseCases from "./sections/use-cases";
import CustomBuilds from "./sections/custom-builds";
import WhyKaibre from "./sections/why-kaibre";
import Faq from "./sections/faq";

export default function Home() {
  const heroPrimary = withUtm(CALENDLY_URL, {
    source: "kaibre.com",
    medium: "hero",
    content: "primary",
  });
  const finalKai = withUtm(CALENDLY_URL, {
    source: "kaibre.com",
    medium: "final-cta",
    content: "kai",
  });
  const finalCustom = withUtm(CALENDLY_URL, {
    source: "kaibre.com",
    medium: "final-cta",
    content: "custom",
  });

  return (
    <main className="min-h-screen">
      <HeroSection
        title="The AI phone agent that qualifies your leads."
        subtitle={
          <>
            kAI calls your leads on your number, follows your script, scores
            intent, and escalates the warm ones to your team. Built and
            operated by Kaibre.
          </>
        }
        cta={<CTAButton buttonText="Book a kAI demo" buttonLink={heroPrimary} />}
        secondaryCta={
          <SecondaryCTAButton
            buttonText="See how kAI works"
            buttonLink="#how-it-works"
          />
        }
        microLink={
          <a
            href="#custom"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors duration-200"
          >
            Need a custom build instead?
            <span aria-hidden>&rarr;</span>
          </a>
        }
        chips={<PathSelection />}
      />

      <TrustStrip />
      <KaiProduct />
      <HowItWorks />
      <UseCases />
      <CustomBuilds />
      <WhyKaibre />
      <Faq />

      <DualCallToAction
        left={{
          eyebrow: "kAI",
          title: "Book a kAI demo.",
          body:
            "See how kAI would qualify leads for your workflow before anything goes live.",
          buttonText: "Book a kAI demo",
          buttonLink: finalKai,
        }}
        right={{
          eyebrow: "Custom builds",
          title: "Need a custom build?",
          body:
            "Talk to our engineering team about a workflow, internal tool, or AI system that does not fit an off-the-shelf product.",
          buttonText: "Book a discovery call",
          buttonLink: finalCustom,
        }}
      />
    </main>
  );
}
