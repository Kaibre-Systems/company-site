import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  cta?: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function HeroSection({
  title,
  subtitle,
  cta,
  className = "",
  innerClassName = "",
}: HeroSectionProps) {
  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      <AuroraBackground className="w-full h-auto min-h-screen md:h-[100vh] w-[100vw] py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full z-30">
          <div className={`text-left gap-6 w-full md:max-w-3xl lg:max-w-2/3 mt-12 md:mt-20 z-20 ${innerClassName}`}>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold font-panchang text-white leading-snug md:leading-tight tracking-tight">
              {title}
            </h1>
            <p className="mt-4 md:mt-6 text-lg sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-supreme text-white leading-relaxed">
              {subtitle}
            </p>
            {cta && (
              <div className="mt-8 md:mt-12">
                {cta}
              </div>
            )}
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}