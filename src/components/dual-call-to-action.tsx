import React from "react";
import Link from "next/link";
import BackgroundImage from "./background-image";
import CTAButtonVisual from "./ui/cta-button-visual";

interface CtaCard {
  eyebrow?: string;
  title: string;
  body: string;
  buttonText: string;
  buttonLink: string;
}

interface DualCallToActionProps {
  left: CtaCard;
  right: CtaCard;
  className?: string;
}

const DualCallToAction: React.FC<DualCallToActionProps> = ({
  left,
  right,
  className = "",
}) => {
  return (
    <section
      aria-label="Get in touch with Kaibre"
      className={`relative py-20 md:py-28 ${className}`}
    >
      {/* Top accent line — pulls the eye into the conversion block */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ce4710]/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs tracking-[0.2em] text-[#ce4710] font-panchang uppercase">
            Talk to us
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold font-panchang text-white leading-[1.05] tracking-tight">
            Two ways forward.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Card card={left} />
          <Card card={right} />
        </div>
      </div>
    </section>
  );
};

function Card({ card }: { card: CtaCard }) {
  return (
    <Link
      href={card.buttonLink}
      aria-label={card.buttonText}
      className="group block rounded-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ce4710] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <BackgroundImage
        className="rounded-2xl"
        imgClassName="rounded-2xl"
        src="/nova.jpeg"
        alt=""
        overlay={false}
      >
        <div className="relative flex flex-col h-full justify-between gap-8 rounded-2xl py-10 md:py-12 px-7 md:px-10 bg-black/55 group-hover:bg-black/40 transition-colors duration-200 overflow-hidden border border-white/10 group-hover:border-[#ce4710]/50">
          <div className="relative z-10">
            {card.eyebrow && (
              <p className="text-xs tracking-[0.2em] text-[#ce4710] font-panchang uppercase">
                {card.eyebrow}
              </p>
            )}
            <h3 className="mt-3 text-3xl md:text-4xl font-bold font-panchang text-white leading-tight">
              {card.title}
            </h3>
            <p className="mt-4 text-lg md:text-xl text-white/85 font-supreme leading-relaxed">
              {card.body}
            </p>
          </div>
          <div className="relative z-10">
            <CTAButtonVisual buttonText={card.buttonText} />
          </div>
        </div>
      </BackgroundImage>
    </Link>
  );
}

export default DualCallToAction;
