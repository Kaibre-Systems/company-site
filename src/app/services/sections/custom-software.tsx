import type React from "react"
import { Code, Globe, Smartphone, Workflow, Layers, Zap } from "lucide-react"
import ServiceSection, { SubserviceCard, SubserviceTitle, SubserviceDescription } from "../components/service-section"

export default function CustomSoftwareSection(): React.ReactElement {
  const subservices = [
    {
      title: "Application Development",
      description: "Create intuitive and robust digital tools to serve users and stakeholders.",
      skeleton: <AppDevSkeleton />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-[#ce4710]/20",
    },
    {
      title: "Process Automation",
      description: "Streamline workflows and reduce manual effort through smart automation.",
      skeleton: <AutomationSkeleton />,
      className: "border-b col-span-1 lg:col-span-2 border-[#ce4710]/20",
    },
    {
      title: "Systems Integration",
      description: "Connect your tools and platforms to work together smoothly.",
      skeleton: <IntegrationSkeleton />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-[#ce4710]/20",
    },
    {
      title: "Platform Modernization",
      description: "Refresh legacy systems to improve performance, usability, and supportability.",
      skeleton: <ModernizationSkeleton />,
      className: "col-span-1 lg:col-span-3 border-[#ce4710]/20",
    },
  ];

  return (
    <ServiceSection
      icon={<Code className="h-8 w-8 text-[#ce4710]" />}
      iconColor="#ce4710"
      title="CUSTOM SOFTWARE"
      description="Tailored solutions for your unique business needs, from web apps to automation."
    >
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:border rounded-md border-[#ce4710]/20">
        {subservices.map((subservice) => (
          <SubserviceCard key={subservice.title} className={subservice.className}>
            <SubserviceTitle>{subservice.title}</SubserviceTitle>
            <SubserviceDescription>{subservice.description}</SubserviceDescription>
            <div className="h-full w-full">{subservice.skeleton}</div>
          </SubserviceCard>
        ))}
      </div>
    </ServiceSection>
  );
}


const AppDevSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="grid grid-cols-2 gap-4 w-full p-4">
        <div className="flex flex-col items-center p-3 bg-blue-500/20 rounded border border-blue-500/40">
          <Globe className="h-6 w-6 text-blue-400 mb-1" />
          <span className="text-xs text-white">Web</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-green-500/20 rounded border border-green-500/40">
          <Smartphone className="h-6 w-6 text-green-400 mb-1" />
          <span className="text-xs text-white">Mobile</span>
        </div>
      </div>
    </div>
  )
}

const AutomationSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="flex items-center gap-2">
        <Workflow className="h-8 w-8 text-[#ce4710]" />
        <div className="flex flex-col gap-1">
          <div className="w-16 h-2 bg-[#ce4710]/60 rounded animate-pulse"></div>
          <div className="w-12 h-2 bg-[#ce4710]/40 rounded animate-pulse"></div>
          <div className="w-20 h-2 bg-[#ce4710]/80 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

const IntegrationSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-500 rounded"></div>
          <div className="w-8 h-8 bg-green-500 rounded"></div>
          <div className="w-8 h-8 bg-purple-500 rounded"></div>
        </div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#ce4710]"></div>
        <Layers className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-[#ce4710] bg-black" />
      </div>
    </div>
  )
}

const ModernizationSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-600 rounded mb-2"></div>
          <span className="text-xs text-gray-400">Legacy</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-0.5 bg-[#ce4710] mb-2"></div>
          <Zap className="h-4 w-4 text-[#ce4710]" />
          <div className="w-8 h-0.5 bg-[#ce4710] mt-2"></div>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-[#ce4710] rounded mb-2"></div>
          <span className="text-xs text-white">Modern</span>
        </div>
      </div>
    </div>
  )
}
