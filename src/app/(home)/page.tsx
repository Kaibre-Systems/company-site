import CTAButton from "@/components/ui/cta-button";
import Description from "./sections/description";
import HeroSection from "../../components/hero-section";

import Services from "./sections/services";
import CallToAction from "@/components/call-to-action";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with CTA */}
      <HeroSection title="FROM GREAT CODE TO GREAT COMPANIES" subtitle="Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we&apos;re your technology force multiplier." cta={<CTAButton buttonText="Let's Innovate" buttonLink="https://www.linkedin.com/company/kaibre-systems-limited/" />} />
      <Description />
      <Services />
      <CallToAction
        title="ARE YOU READY?"
        subtitle="Get in touch with us and unlock your potential"
        buttonText="Get Started"
        buttonLink="https://www.linkedin.com/company/kaibre-systems-limited/"
      />
    </main>
  );
}
