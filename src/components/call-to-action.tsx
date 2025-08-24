import React from 'react';
import BackgroundImage from './background-image';
import CTAButton from './ui/cta-button';

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
        <section className={`text-white mb-8 max-w-7xl mx-auto ${className} rounded-2xl`}>
            <BackgroundImage className="rounded-2xl mx-4" imgClassName="rounded-2xl" src="/nova.jpeg" alt='nova background' overlay={false}>
                <div className="relative flex flex-col md:flex-row items-center justify-between mx-auto max-w-7xl text-left rounded-2xl py-8 px-8 gap-8 overflow-hidden transition duration-200 bg-black/50 hover:bg-black/30">
                    <div className="flex-1 relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-panchang">{title}</h2>
                        <p className="text-lg md:text-xl max-w-2xl text-gray-200 font-supreme">{subtitle}</p>
                    </div>
                    <div className="flex items-center md:items-end md:w-auto relative z-10">
                        <CTAButton buttonText={buttonText} buttonLink={buttonLink} />
                    </div>
                </div>
            </BackgroundImage>
        </section>
    );
};

export default CallToAction;