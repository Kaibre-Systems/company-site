import React from "react";
import Link from "next/link";

interface SecondaryCTAButtonProps {
  buttonText: string;
  buttonLink: string;
  className?: string;
}

const SecondaryCTAButton: React.FC<SecondaryCTAButtonProps> = ({
  buttonText,
  buttonLink,
  className = "",
}) => {
  return (
    <Link
      href={buttonLink}
      className={`inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-base md:text-lg font-bold text-white font-supreme backdrop-blur-sm transition-colors duration-200 hover:border-[#ce4710] hover:bg-[#ce4710]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ce4710] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer ${className}`}
    >
      {buttonText}
    </Link>
  );
};

export default SecondaryCTAButton;
