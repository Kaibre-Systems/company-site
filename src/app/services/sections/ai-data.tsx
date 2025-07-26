import type React from "react"
import { Brain, TrendingUp, Cpu, BarChart3 } from "lucide-react"
import ServiceSection, { SubserviceCard, SubserviceTitle, SubserviceDescription } from "../components/service-section"

export default function AIDataSection() {
  const subservices = [
    {
      title: "Predictive Intelligence",
      description: "Use data to anticipate trends, behaviors, and outcomes.",
      skeleton: <PredictiveSkeleton />, 
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-[#ce4710]/20",
    },
    {
      title: "Data Infrastructure",
      description: "Organize and optimize data for accessibility and analysis.",
      skeleton: <DataInfraSkeleton />, 
      className: "border-b col-span-1 lg:col-span-3 border-[#ce4710]/20",
    },
    {
      title: "Intelligent Automation",
      description: "Apply AI to simplify complex tasks and enhance decision-making.",
      skeleton: <IntelligentAutoSkeleton />, 
      className: "col-span-1 lg:col-span-2 lg:border-r border-[#ce4710]/20",
    },
    {
      title: "Data Visualization & Insights",
      description: "Translate raw data into actionable business intelligence.",
      skeleton: <DataVizSkeleton />, 
      className: "col-span-1 lg:col-span-4 border-[#ce4710]/20",
    },
  ];

  return (
    <div className="snap-start">
    <ServiceSection
      icon={<Brain className="h-8 w-8 text-[#ce4710]" />}
      iconColor="#ce4710"
      title="AI & DATA"
      description="Unlock insights and automation with advanced data engineering and AI/ML solutions."
      id="ai-data"
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
    </div>
  );
}


const PredictiveSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="relative">
        <TrendingUp className="h-12 w-12 text-[#ce4710]" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        <br />
        <div className="absolute -bottom-2 -left-2 text-xs text-neutral-400">AI Powered</div>
      </div>
    </div>
  )
}

const DataInfraSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="grid grid-cols-3 gap-2 w-full p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-8 bg-[#ce4710]/20 rounded animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

const IntelligentAutoSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <Brain className="h-10 w-10 text-[#ce4710] mb-2" />
      <div className="flex items-center gap-1">
        <Cpu className="h-4 w-4 text-[#ce4710]" />
        <span className="text-white text-sm">Processing...</span>
      </div>
    </div>
  )
}

const DataVizSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="flex items-end gap-2">
        <div className="w-4 h-8 bg-blue-500 rounded-t"></div>
        <div className="w-4 h-12 bg-green-500 rounded-t"></div>
        <div className="w-4 h-6 bg-yellow-500 rounded-t"></div>
        <div className="w-4 h-16 bg-[#ce4710] rounded-t"></div>
        <div className="w-4 h-10 bg-purple-500 rounded-t"></div>
        <BarChart3 className="h-6 w-6 text-[#ce4710] ml-2" />
      </div>
    </div>
  )
}
