import { AuroraBackground } from "@/components/ui/aurora-background";
import CTAButton from "@/components/ui/cta-button";

export default function HeroSection() {
    return (
        <section className="relative flex items-center justify-start flex-grow max-w-7xl mx-auto px-4 lg:px-8">
            <AuroraBackground className="w-screen h-full py-40">
                <div className="text-left gap-6 w-full max-w-2xl md:max-w-3xl lg:max-w-2/3 mt-20">
                    <h1 className="text-3xl lg:text-4xl font-bold font-panchang text-white leading-tight">
                        FROM GREAT CODE<br />
                        TO GREAT COMPANIES
                    </h1>
                    <p className="mt-6 text-xl lg:text-2xl max-w-2xl font-supreme text-gray-300 leading-relaxed">
                        Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we're your technology force multiplier.
                    </p>
                    <div className="mt-12">
                        <CTAButton buttonText="Let's Innovate" buttonLink="/contact" />
                    </div>
                </div>


            </AuroraBackground>
        </section>
    );
}
