'use client'
import BackgroundImage from "@/components/background-image";
import AIDataSection from "./sections/ai-data";
import CloudDevOpsSection from "./sections/cloud-devops";
import CustomSoftwareSection from "./sections/custom-software";
import SecurityComplianceSection from "./sections/security-compliance";
import TeamAugmentationSection from "./sections/team-augmentation";
import ServiceHero from "./sections/service-hero";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceCategory {
    id: string
    title: string
    description: string
    component: React.ComponentType
}

export default function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>({
        id: "software",
        title: "Custom Software",
        description: "Tailored solutions for your unique business needs, from web apps to automation.",
        component: CustomSoftwareSection,
    })

    const categories: ServiceCategory[] = [
        {
            id: "software",
            title: "Custom Software",
            description: "Tailored solutions for your unique business needs, from web apps to automation.",

            component: CustomSoftwareSection,
        },
        {
            id: "ai",
            title: "AI & Data",
            description: "Unlock insights and automation with advanced data engineering and AI/ML solutions.",

            component: AIDataSection,
        },
        {
            id: "team",
            title: "Team Augmentation",
            description: "Embed elite engineers into your teams to accelerate delivery and scale.",

            component: TeamAugmentationSection,
        },
        {
            id: "security",
            title: "Security & Compliance",
            description: "Protect your business with best-in-class security practices and compliance support.",

            component: SecurityComplianceSection,
        },

        {
            id: "cloud",
            title: "Cloud & DevOps",
            description: "Modern infrastructure, CI/CD, and cloud-native deployments for reliability and speed.",

            component: CloudDevOpsSection,
        },
    ]

    const SelectedComponent = selectedCategory?.component

    return (
        <BackgroundImage
            src="/gradient_background2.jpg"
            alt="Hero background"
            priority={true}
            overlay={true}
            overlayOpacity={40}
            className="w-full"
        >
            <main className="flex flex-col gap-6 max-w-7xl mx-auto px-4 lg:px-8 w-full">
                <ServiceHero />
                <div className="flex gap-6 pb-12">
                    {/* Left Sidebar - Service Categories */}
                    <div className="w-80">
                        <div className="p-4 space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 text-left",
                                        selectedCategory?.id === category.id
                                            ? "text-white bg-black/50"
                                            : "hover:bg-black/20 text-gray-300 hover:text-white",
                                    )}
                                >
                                    <div className="flex-1">
                                        <div className="font-medium font-panchang">{category.title}</div>
                                        <div className="text-sm opacity-75 mt-1 font-supreme">{category.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1">
                        {selectedCategory && SelectedComponent ? (
                            <div >
                                <SelectedComponent />
                            </div>
                        ) : (
                            <div className=" text-center min-h-[600px] flex items-center justify-center">
                                <div className="max-w-md mx-auto">
                                    <h3 className="text-xl font-semibold text-white mb-2 font-panchang">EXPLORE OUR SERVICES</h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </BackgroundImage>
    );
}
