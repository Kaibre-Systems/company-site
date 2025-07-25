
import Description from "./components/description";
import HeroSection from "./components/hero-section";
import BackgroundImage from "@/components/background-image";
import Services from "./components/services";
import CallToAction from "@/components/call-to-action";

export default function Home() {
    return (
        <BackgroundImage
            src="/gradient_background1.jpg"
            alt="Hero background"
            priority={true}
            overlay={true}
            overlayOpacity={50}
            className="w-full"
        >
            <main className="flex flex-col gap-12 max-w-7xl mx-auto px-4 lg:px-8 w-full mt-20">
                {/* Hero Section with CTA */}
                <HeroSection />
                <Description />
                <Services />
                <CallToAction
                    title="ARE YOU READY?"
                    subtitle="Join us today and unlock your potential."
                    buttonText="Get Started"
                    buttonLink="/contact"
                />
            </main>
        </BackgroundImage>
    );
}
