
export default function HeroSection() {
    return (
        <section className="relative flex items-center justify-start flex-grow mt-32">
            <div className="text-left gap-6 w-full max-w-2xl md:max-w-3xl lg:max-w-2/3">
                <h1 className="text-4xl lg:text-5xl font-bold font-panchang text-white leading-tight">
                    From Great Code<br />
                    to Great Companies
                </h1>
                <p className="mt-6 text-xl lg:text-2xl font-supreme text-gray-300 leading-relaxed">
                    Whether you need flawless software, strategic guidance, or want to build a high-performance tech team, we're your technology force multiplier.
                </p>
                <button className="relative inline-flex h-12 overflow-hidden rounded-[6px] p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-12">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#CD4813_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[6px] bg-slate-950 px-3 py-1 text-lg font-bold text-white backdrop-blur-3xl font-supreme">
                        Let's Innovate
                    </span>
                </button>
            </div>



        </section>
    );
}
