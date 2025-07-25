import type React from "react"
import { cn } from "@/lib/utils"
import { Cloud, Server, Settings, GitBranch, Monitor, Eye } from "lucide-react"
import ServiceSection, { SubserviceCard, SubserviceTitle, SubserviceDescription } from "../components/service-section"

export default function CloudDevOpsSection() {
  const subservices = [
    {
      title: "Cloud Enablement",
      description: "Design scalable, efficient infrastructure tailored to your business.",
      skeleton: <CloudEnablementSkeleton />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-[#ce4710]/20",
    },
    {
      title: "Continuous Delivery",
      description: "Automate the path from code to production for faster, safer releases.",
      skeleton: <ContinuousDeliverySkeleton />,
      className: "border-b col-span-1 lg:col-span-3 border-[#ce4710]/20",
    },
    {
      title: "Infrastructure Management",
      description: "Use configuration and deployment practices that reduce risk and downtime.",
      skeleton: <InfraManagementSkeleton />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-[#ce4710]/20",
    },
    {
      title: "Operational Monitoring",
      description: "Maintain system health with real-time visibility and proactive alerts.",
      skeleton: <MonitoringSkeleton />,
      className: "col-span-1 lg:col-span-3 border-[#ce4710]/20",
    },
  ]

  return (
    <ServiceSection
      icon={<Cloud className="h-8 w-8 text-[#ce4710]" />}
      iconColor="#ce4710"
      title="CLOUD & DEVOPS"
      description="Optimize your cloud infrastructure and DevOps practices for agility and reliability."
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
  )
}

const CloudEnablementSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="relative">
        <Cloud className="h-12 w-12 text-[#ce4710]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-neutral-400">Scalable</div>
      </div>
    </div>
  )
}

const ContinuousDeliverySkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="flex items-center gap-2">
        <GitBranch className="h-8 w-8 text-[#ce4710]" />
        <div className="flex flex-col gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

const InfraManagementSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1 p-2 bg-green-500/20 rounded">
          <Server className="h-4 w-4 text-green-400" />
          <span className="text-xs text-white">Online</span>
        </div>
        <div className="flex items-center gap-1 p-2 bg-green-500/20 rounded">
          <Settings className="h-4 w-4 text-green-400" />
          <span className="text-xs text-white">Config</span>
        </div>
      </div>
    </div>
  )
}

const MonitoringSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/20">
      <div className="relative">
        <Monitor className="h-12 w-12 text-[#ce4710]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <Eye className="absolute -bottom-2 -right-2 h-4 w-4 text-[#ce4710]" />
      </div>
    </div>
  )
}
