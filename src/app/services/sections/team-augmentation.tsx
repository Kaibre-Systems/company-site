import type React from "react"
import { Users, TrendingUp } from "lucide-react"
import ServiceSection, { SubserviceCard, SubserviceTitle, SubserviceDescription } from "../components/service-section"

export default function TeamAugmentationSection() {
  const subservices = [
    {
      title: "Specialized Talent Placement",
      description: "Access skilled professionals who integrate seamlessly with your teams and goals.",
      skeleton: <TalentSkeleton />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-[#ce4710]/30",
    },
    {
      title: "Project-Based Teams",
      description: "Form dedicated groups to take ownership of initiatives from start to finish.",
      skeleton: <ProjectTeamsSkeleton />,
      className: "border-b col-span-1 lg:col-span-3 border-[#ce4710]/30",
    },
    {
      title: "Scalable Resourcing",
      description: "Adjust team size and skillsets as your project evolves.",
      skeleton: <ScalableSkeleton />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-[#ce4710]/30",
    },
    {
      title: "Mentorship & Technical Guidance",
      description: "Bring in senior contributors to elevate your team's capabilities.",
      skeleton: <MentorshipSkeleton />,
      className: "col-span-1 lg:col-span-3 border-[#ce4710]/30",
    },
  ]

  return (
    <ServiceSection
      icon={<Users className="h-8 w-8 text-[#ce4710]" />}
      title="TEAM AUGMENTATION"
      id="team-augmentation"
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
  )
}


const TalentSkeleton = () => {
  const skills = ["React", "Node.js", "Python", "AWS", "Docker"]
  return (
    <div className="relative flex flex-col p-4 h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <Users className="h-8 w-8 text-[#ce4710] mb-4" />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className="px-2 py-1 bg-[#ce4710]/20 text-[#ce4710] text-xs rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const ProjectTeamsSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-10 h-10 bg-[#ce4710] rounded-full border-2 border-black flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ScalableSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <div className="flex items-center gap-2">
        <div className="w-4 h-8 bg-[#ce4710]/40 rounded"></div>
        <div className="w-4 h-12 bg-[#ce4710]/60 rounded"></div>
        <div className="w-4 h-16 bg-[#ce4710]/80 rounded"></div>
        <div className="w-4 h-20 bg-[#ce4710] rounded"></div>
        <TrendingUp className="h-6 w-6 text-[#ce4710] ml-2" />
      </div>
    </div>
  )
}

const MentorshipSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-40 bg-gray-900/30 rounded-lg border border-[#ce4710]/30">
      <div className="relative mb-4">
        <div className="w-12 h-12 bg-[#ce4710] rounded-full flex items-center justify-center">
          <span className="text-white font-bold">Sr</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
      </div>
      <p className="text-white text-sm">Senior Guidance</p>
    </div>
  )
}
