import Footer from "../components/footer";
import Description from "./components/description";
import HeroSection from "./components/hero-section";
import BackgroundImage from "@/components/background-image";
import Services from "./components/services";

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
                {/* Trust Signals */}
                <section className="flex flex-col items-center py-8 gap-6">
                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Example logos */}
                        <img src="/full_logo_white.svg" alt="Client Logo" className="h-10" />
                        <img src="/vercel.svg" alt="Client Logo" className="h-10" />
                        {/* Add more logos as needed */}
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-white text-lg">
                        <div>100+ Projects Delivered</div>
                        <div>Global Team</div>
                        <div>99.9% Uptime</div>
                        {/* Add more metrics/testimonials */}
                    </div>
                </section>

                {/* Preview Sections */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
                    <div className="bg-black/30 rounded-xl p-6 text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Services</h2>
                        <p>Elite software delivery & engineering culture.</p>
                    </div>
                    <div className="bg-black/30 rounded-xl p-6 text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Success Stories</h2>
                        <p>Transformative results for global clients.</p>
                    </div>
                    <div className="bg-black/30 rounded-xl p-6 text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Our Team</h2>
                        <p>High-performing, outcome-driven engineers.</p>
                    </div>
                </section>
            </main>
        </BackgroundImage>
    );
}
