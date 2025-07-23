import Footer from "../components/footer";
import HeroSection from "./components/hero-section";
import BackgroundImage from "@/components/background-image";

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
                <section className="text-xl pt-20 flex justify-center w-full">
                    <div className="backdrop-blur-lg bg-black/20 rounded-2xl shadow-lg px-4 lg:px-8 py-6 max-w-7xl w-full mx-auto">
                        <p className="text-gray-100">
                            Businesses of every size deserve world-class technology. We're the precision team that delivers it. Our international team combines rigorous engineering standards with cutting-edge innovation to transform your business from the inside out. Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we're your technology force multiplier.
                        </p>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center text-center py-12">
                    <button className="mt-8 px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg hover:bg-blue-700 transition">
                        See the Transformation
                    </button>
                </section>

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
