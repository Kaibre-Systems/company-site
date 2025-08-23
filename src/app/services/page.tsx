'use client'
import CustomSoftwareSection from "./sections/custom-software";
import AIDataSection from "./sections/ai-data";
import TeamAugmentationSection from "./sections/team-augmentation";
import SecurityComplianceSection from "./sections/security-compliance";
import CloudDevOpsSection from "./sections/cloud-devops";
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import CallToAction from "@/components/call-to-action";
import { useSearchParams } from "next/navigation";
import HeroSection from "@/components/hero-section";

interface ServiceCategoryMeta {
    id: string
    title: string
    description: string
}

function ServicesContent() {
    const searchParams = useSearchParams()
    const sectionParam = searchParams.get("section")
    const categories: ServiceCategoryMeta[] = useMemo(() => ([
        {
            id: "software",
            title: "Custom Software",
            description: "Tailored solutions for your unique business needs, from web apps to automation.",
        },
        {
            id: "ai",
            title: "AI & Data",
            description: "Unlock insights and automation with advanced data engineering and AI/ML solutions.",
        },
        {
            id: "team",
            title: "Team Augmentation",
            description: "Embed elite engineers into your teams to accelerate delivery and scale.",
        },
        {
            id: "security",
            title: "Security & Compliance",
            description: "Protect your business with best-in-class security practices and compliance support.",
        },
        {
            id: "cloud",
            title: "Cloud & DevOps",
            description: "Modern infrastructure, CI/CD, and cloud-native deployments for reliability and speed.",
        },
    ]), [])

    const componentsById: Record<string, React.ComponentType> = useMemo(() => ({
        software: CustomSoftwareSection,
        ai: AIDataSection,
        team: TeamAugmentationSection,
        security: SecurityComplianceSection,
        cloud: CloudDevOpsSection,
    }), [])

    const defaultId = categories[0]?.id ?? "software"
    const initialId = (sectionParam && componentsById[sectionParam]) ? sectionParam : defaultId
    const [selectedId, setSelectedId] = useState<string>(initialId)
    const [isPending, startTransition] = useTransition()

    // Sync URL param to selection and gently scroll to list
    useEffect(() => {
        if (!sectionParam) return;
        if (componentsById[sectionParam]) {
            setSelectedId(sectionParam);
        }
        const listElement = document.getElementById("list");
        if (listElement) {
            requestAnimationFrame(() => {
                const offset = listElement.offsetTop - 200;
                window.scrollTo({ top: offset, behavior: "smooth" });
            });
        }
    }, [sectionParam, componentsById]);

    const SelectedComponent = componentsById[selectedId]

    return (
        
            <main className="flex flex-col gap-6 max-w-7xl mx-auto px-4 lg:px-8 w-full">
                <HeroSection title="EVERY STEP OF THE WAY" subtitle="Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we&apos;re your technology force multiplier." />
                <div className="flex gap-6 pb-12" id="list" aria-live="polite">
                    {/* Left Sidebar - Service Categories */}
                    <div className="w-80">
                        <div className="p-4 space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => startTransition(() => setSelectedId(category.id))}
                                    aria-current={selectedId === category.id}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 text-left",
                                        selectedId === category.id
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
                        {SelectedComponent ? (
                            <div>
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
                <CallToAction
                    title="READY TO BUILD?"
                    subtitle="Get in touch with us and unlock your potential"
                    buttonText="Get Started"
                    buttonLink="https://www.linkedin.com/company/kaibre-systems-limited/"
                />
            </main>
       
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={<div />}> 
            <ServicesContent />
        </Suspense>
    );
}
