import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
    buttonText: string;
    buttonLink: string;
    className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
    buttonText,
    buttonLink,
    className = '',
}) => {
    return (
        <Link href={buttonLink}>
            <button className={`relative inline-flex h-12 w-64 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-0 md:mt-0 md:self-center ${className}`}>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#CD4813_50%,#E2CBFF_100%)] rounded-xl" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-lg font-bold text-white backdrop-blur-3xl font-supreme">
                    {buttonText}
                </span>
            </button>
        </Link>
    );
};

export default CTAButton;
