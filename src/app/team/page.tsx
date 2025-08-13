import BackgroundImage from "@/components/background-image";
import CallToAction from "@/components/call-to-action";

export default function TeamPage() {
    return (
        <BackgroundImage
            src="/gradient_background1.jpg"
            alt="Hero background"
            priority={true}
            overlay={true}
            overlayOpacity={40}
            className="w-full"
        >
            <main className="min-h-screen text-white">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0  z-10"></div>
                        <div className="absolute inset-0 bg-cover bg-center opacity-60"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="text-4xl md:text-4xl lg:text-5xl font-panchang font-bold text-center mb-6">INNOVATING FOR THE FUTURE</h1>
                        <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
                            Meet the experts behind Kaibre's innovative solutions
                        </p>
                    </div>
                </section>

                {/* Team Background Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-panchang font-bold mb-8">Who We Are</h2>
                            <p className="text-lg text-gray-300 mb-6">
                                Kaibre brings together elite technologists with diverse expertise from startups,
                                Fortune 500 companies, and governments. Our team members are united by a passion for solving complex
                                technical challenges and delivering exceptional results.
                            </p>
                            <p className="text-lg text-gray-300 mb-6">
                                With backgrounds spanning AI, cloud architecture, security, and software engineering,
                                we offer a unique blend of specialized knowledge and practical implementation experience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Values Section */}
                <section className="py-20 bg-black">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-panchang font-bold mb-12 text-center">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                            <div className="text-center">
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#ce4710]/20 border border-[#ce4710]/40 mx-auto mb-6">
                                    <span className="text-2xl text-[#CD4813]">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Technical Excellence</h3>
                                <p className="text-gray-300">We believe in deep expertise, continuous improvement, and maintaining the highest standards in our work.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#ce4710]/20 border border-[#ce4710]/40 mx-auto mb-6">
                                    <span className="text-2xl text-[#CD4813]">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Client Synergy</h3>
                                <p className="text-gray-300">We work as an extension of our clients' teams, prioritizing transparent communication and shared success.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#ce4710]/20 border border-[#ce4710]/40 mx-auto mb-6">
                                    <span className="text-2xl text-[#CD4813]">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Adaptability</h3>
                                <p className="text-gray-300">We thrive in dynamic environments, embracing new technologies and approaches to solve evolving challenges.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-10 flex justify-center max-w-7xl mx-auto">

                    <CallToAction
                        title="WANT TO LEARN MORE?"
                        subtitle="Get in touch with us and unlock your potential"
                        buttonText="Get Started"
                        buttonLink="https://www.linkedin.com/company/kaibre-systems-limited/"
                    />
                </section>
            </main>
        </BackgroundImage>
    );
}
