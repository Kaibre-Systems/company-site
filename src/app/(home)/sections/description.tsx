import { Separator } from '@radix-ui/react-separator';
import React from 'react';


const Description = () => {
    const features = [
        {
            title: "End-to-End Data and AI",
            description: "With deep expertise in AI and data engineering, we focus on transforming your business across the full pipeline.",
        },
        {
            title: "Precision Engineering",
            description: "We combine your needs with rigorous engineering standards and cutting edge innovation to drive your business forward in a scalable and responsible manner.",
        },
        {
            title: "Global Vision",
            description: "Our international team wields knowledge and experience from diverse global markets, ensuring your local solutions are backed by a world-class perspective.",
        },
    ];
    return (
        <section className="py-16 bg-black w-screen relative left-1/2 right-1/2 -mx-[50vw] px-4 ">
            <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold mb-4 font-panchang text-center">BRINGING <span className="text-[#ce4710]">EVERYONE</span> TO THE FOREFRONT</h2>
                <p className="text-foreground font-supreme leading-relaxed md:text-center text-xl md:text-2xl max-w-2xl mx-auto">
                    Businesses of every size deserve world-class technology. We&apos;re the precision team that delivers it.
                </p>
            </div>

            <Separator className="my-8 w-1/2 mx-auto bg-[#ff5713] h-[1px] shadow-[0_0_8px_2px_#ce4710] relative " />

            <div className="grid grid-cols-1 md:grid-cols-3 md:max-w-4xl md:mx-auto gap-10 font-supreme">
                {features.map((feature, idx) => (
                    <div className="md:text-center" key={idx}>
                        <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                        <p className="text-foreground leading-relaxed text-lg">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Description;