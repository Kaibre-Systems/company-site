
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Code, Users, Server, Rocket, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

const services = [
    {
        area: "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/6]",
        icon: <Shield className="h-6 w-6 text-black dark:text-neutral-400" />,
        title: "Security & Compliance",
        description: "Protect your business with best-in-class security practices and compliance support.",
        href: "/services#security-compliance",
    },
    {
        area: "md:[grid-area:2/7/3/13] xl:[grid-area:2/6/3/10]",
        icon: <Users className="h-6 w-6 text-black dark:text-neutral-400" />,
        title: "Team Augmentation",
        description: "Embed elite engineers into your teams to accelerate delivery and scale.",
        href: "/services#team-augmentation",
    },
    {
        area: "md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/5]",
        icon: <Code className="h-6 w-6 text-black dark:text-neutral-400" />,
        title: "Custom Software",
        description: "Tailored solutions for your unique business needs, from web apps to automation.",
        href: "/services#custom-software",
    },
    {
        area: "md:[grid-area:3/1/4/13] xl:[grid-area:1/10/3/13]",
        icon: <Rocket className="h-6 w-6 text-black dark:text-neutral-400" />,
        title: "AI & Data",
        description: "Unlock insights and automation with advanced data engineering and AI/ML solutions.",
        href: "/services#ai-data",
    },
    {
        area: "md:[grid-area:1/5/2/13] xl:[grid-area:1/5/2/10]",
        icon: <Server className="h-6 w-6 text-black dark:text-neutral-400" />,
        title: "Cloud & DevOps",
        description: "Modern infrastructure, CI/CD, and cloud-native deployments for reliability and speed.",
        href: "/services#cloud-devops",
    },
];

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    href: string;
}

const GridItem = ({ area, icon, title, description, href }: GridItemProps) => {
    return (
        <li className={`min-h-[10rem] md:min-h-[14rem] list-none ${area}`}>
            <Link href={href} >
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-black/90">
                <GlowingEffect
                    blur={1}
                    borderWidth={4}
                    spread={90}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col md:justify-between md:gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2 mx-auto">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        </li>
    );
};

const Services = () => {
    return (
        <section className="py-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 font-panchang">Our Services</h2>
                <p className="text-lg text-foreground max-w-2xl mx-auto">From custom software to embedded talent, we deliver the full spectrum of modern technology solutions.</p>
            </div>
            <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 max-w-6xl mx-auto">
                {services.map((service, idx) => (
                    <GridItem key={idx} {...service} />
                ))}
            </ul>
        </section>
    );
};

export default Services;
