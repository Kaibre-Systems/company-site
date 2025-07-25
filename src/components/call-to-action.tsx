import React from 'react';
import Link from 'next/link';

interface CallToActionProps {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
    title,
    subtitle,
    buttonText,
    buttonLink,
    className = '',
}) => {
    return (
        <section className={`text-white my-8 max-w-7xl ${className} rounded-2xl`}>
            <div className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-7xl text-left bg-black rounded-2xl py-8 px-8 gap-8">
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-panchang">{title}</h2>
                    <p className="text-lg md:text-xl max-w-2xl text-gray-200">{subtitle}</p>
                </div>
                <div className="flex items-center md:items-end  md:w-auto">
                    <Link href={buttonLink}>
                        <button className="relative inline-flex h-12 w-64 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-0 md:mt-0 md:self-center">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#CD4813_50%,#E2CBFF_100%)] rounded-xl" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-lg font-bold text-white backdrop-blur-3xl font-supreme">
                                {buttonText}
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;