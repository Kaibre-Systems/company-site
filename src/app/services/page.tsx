import BackgroundImage from "@/components/background-image";
import AIDataSection from "./sections/ai-data";
import CloudDevOpsSection from "./sections/cloud-devops";
import CustomSoftwareSection from "./sections/custom-software";
import SecurityComplianceSection from "./sections/security-compliance";
import TeamAugmentationSection from "./sections/team-augmentation";
import ServiceHero from "./sections/service-hero";

export default function ServicesPage() {
    return (
        <BackgroundImage
                    src="/gradient_background2.jpg"
                    alt="Hero background"
                    priority={true}
                    overlay={true}
                    overlayOpacity={40}
                    className="w-full"
                >
        <main className="flex flex-col gap-12 max-w-7xl mx-auto px-4 lg:px-8 w-full">
            <ServiceHero/>
            <AIDataSection/>
            <CloudDevOpsSection/>
            <CustomSoftwareSection/>
            <SecurityComplianceSection/>
            <TeamAugmentationSection/>
        </main>
        </BackgroundImage>
    );
}
