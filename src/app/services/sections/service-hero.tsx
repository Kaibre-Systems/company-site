"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Brain, Cloud, Code, Shield, Users } from "lucide-react";

export default function ServiceHero() {
    const services = [
        {
            id: "ai-data",
            title: "AI & Data",
            icon: Brain,
            sectionIndex: 1
        },
        {
            id: "cloud-devops",
            title: "Cloud & DevOps",
            icon: Cloud,
            sectionIndex: 2
        },
        {
            id: "custom-software",
            title: "Custom Software",
            icon: Code,
            sectionIndex: 3
        },
        {
            id: "security-compliance",
            title: "Security & Compliance",
            icon: Shield,
            sectionIndex: 4
        },
        {
            id: "team-augmentation",
            title: "Team Augmentation",
            icon: Users,
            sectionIndex: 5
        }
    ];

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative flex flex-col items-center justify-center flex-grow">
            <AuroraBackground className="w-screen h-full py-40 items-center">
            <div className="text-center gap-6 w-full max-w-4xl mb-12 mt-20 z-20">
                <h1 className="text-3xl lg:text-4xl font-bold font-panchang text-white leading-tight">
                    EVERY STEP OF THE WAY
                </h1>
                <p className="mt-6 text-xl lg:text-2xl font-supreme text-gray-300 leading-relaxed">
                    Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we're your technology force multiplier.
                </p>
            </div>

            {/* Horizontal TOC */}
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <button
                                key={service.id}
                                onClick={() => scrollToSection(service.id)}
                                className="group relative p-6 bg-black/30 hover:bg-black/50 border border-[#CD4813]/20 hover:border-[#CD4813]/60 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#CD4813]/20"
                            >
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="p-3 rounded-full bg-[#CD4813]/20 border border-[#CD4813]/40 group-hover:bg-[#CD4813]/40 transition-colors duration-300">
                                        <IconComponent className="w-6 h-6 text-[#CD4813]" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-white font-supreme group-hover:text-[#CD4813] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                </div>
                                
                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#CD4813]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </AuroraBackground>
        </section>
    );
}