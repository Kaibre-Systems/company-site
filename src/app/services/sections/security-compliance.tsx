import { Shield, CheckCircle, Lock, Database, AlertTriangle, UserCheck } from "lucide-react"
import ServiceSection, { SubserviceCard, SubserviceTitle, SubserviceDescription } from "../components/service-section"

export default function SecurityComplianceSection() {
  const subservices = [
    {
      title: "Security Assessments",
      description: "Evaluate systems to uncover vulnerabilities and improve overall protection.",
      skeleton: <SecurityAssessmentSkeleton />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-[#ce4710]/30",
    },
    {
      title: "Regulatory Compliance Support",
      description: "Ensure your operations meet industry and government compliance standards.",
      skeleton: <ComplianceSkeleton />,
      className: "border-b col-span-1 lg:col-span-3 border-[#ce4710]/30",
    },
    {
      title: "Access Control & Identity Management",
      description: "Define and enforce who can access what, and under what conditions.",
      skeleton: <AccessControlSkeleton />,
      className: "col-span-1 lg:col-span-2 lg:border-r border-[#ce4710]/30",
    },
    {
      title: "Data Protection",
      description: "Safeguard sensitive data through secure handling, storage, and transmission practices.",
      skeleton: <DataProtectionSkeleton />,
      className: "col-span-1 lg:col-span-2 lg:border-r border-[#ce4710]/30",
    },
    {
      title: "Incident Preparedness",
      description: "Develop response plans to quickly detect, contain, and recover from security threats.",
      skeleton: <IncidentSkeleton />,
      className: "col-span-1 lg:col-span-2 border-[#ce4710]/30",
    },
  ];

  return (
    <ServiceSection
      icon={<Shield className="h-8 w-8 text-[#ce4710]" />}
      iconColor="#ce4710"
      title="SECURITY & COMPLIANCE"
      id="security-compliance"
    >
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:border rounded-md border-[#ce4710]/30">
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


const SecurityAssessmentSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <div className="relative">
        <Shield className="h-12 w-12 text-[#ce4710] mb-4" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-[#ce4710] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#ce4710] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-[#ce4710] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}

const ComplianceSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <div className="grid grid-cols-2 gap-4 w-full p-4">
        <div className="flex items-center gap-2 p-2 rounded bg-green-500/20 border border-green-500/40">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-xs text-white">SOC2</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-green-500/20 border border-green-500/40">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-xs text-white">HIPAA</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-green-500/20 border border-green-500/40">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-xs text-white">GDPR</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-green-500/20 border border-green-500/40">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-xs text-white">PCI DSS</span>
        </div>
      </div>
    </div>
  )
}

const AccessControlSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <Lock className="h-10 w-10 text-[#ce4710] mb-4" />
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-green-400" />
        <span className="text-white text-sm">Authorized Access</span>
      </div>
    </div>
  )
}

const DataProtectionSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <div className="relative">
        <Database className="h-12 w-12 text-[#ce4710]" />
        <div className="absolute inset-0 border-2 border-[#ce4710] rounded-full animate-ping"></div>
      </div>
    </div>
  )
}

const IncidentSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <AlertTriangle className="h-10 w-10 text-yellow-500 mb-2" />
      <div className="text-center">
        <p className="text-white text-sm font-medium">Response Ready</p>
        <p className="text-neutral-400 text-xs">24/7 Monitoring</p>
      </div>
    </div>
  )
}
