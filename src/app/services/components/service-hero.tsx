"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";

export default function ServiceHero() {
    return (
        <section className="relative flex flex-col items-center justify-center flex-grow snap-start">
            <AuroraBackground className="w-screen h-full py-40 items-center">
                <div className="text-left gap-6 w-full max-w-6xl mt-20 z-20">
                    <h1 className="text-3xl lg:text-4xl font-bold font-panchang text-white leading-tight">
                        EVERY STEP OF THE WAY
                    </h1>
                    <p className="mt-6 text-xl lg:text-2xl font-supreme text-gray-300 leading-relaxed">
                        Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we&apos;re your technology force multiplier.
                    </p>
                </div>
            </AuroraBackground>
        </section>
    );
}