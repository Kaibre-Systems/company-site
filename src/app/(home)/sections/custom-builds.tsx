import Link from "next/link";
import { Sparkles, Layers, Lock, ArrowUpRight } from "lucide-react";
import { CALENDLY_URL, withUtm } from "@/lib/links";

const tiles = [
  {
    id: undefined,
    icon: Sparkles,
    title: "Applied AI",
    body:
      "RAG, agents, automation, and data pipelines built around your domain — not a generic copilot wrapper.",
    utm: "applied-ai",
  },
  {
    id: undefined,
    icon: Layers,
    title: "Custom Software",
    body:
      "Web apps, internal tools, and platform modernisation when off-the-shelf falls short.",
    utm: "custom-software",
  },
  {
    id: "security",
    icon: Lock,
    title: "Security & Specialised Workflows",
    body: (
      <>
        We work on engagements where data residency, isolation, or compliance posture is the constraint, not an afterthought. Implementations are delivered under NDA. We help clients meet recognised standards (SOC&nbsp;2, ISO&nbsp;27001, GDPR, PCI&nbsp;DSS) — Kaibre does not claim certifications it does not hold.
      </>
    ),
    utm: "security",
  },
];

export default function CustomBuilds() {
  return (
    <section
      id="custom"
      className="relative scroll-mt-24 py-28 md:py-40 bg-gradient-to-b from-[#0c0604] via-[#16100c] to-[#0a0807] overflow-hidden"
    >
      {/* Layered top divider — reads as a chapter break, not just a hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ce4710] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#ce4710]/[0.08] to-transparent"
      />

      {/* Soft warm radial behind the heading area — anchors the chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/4 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(circle,rgba(206,71,16,0.14),transparent_65%)] blur-3xl"
      />
      {/* Quieter warm bottom-right accent — keeps the section grounded */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(206,71,16,0.08),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          {/* Chapter-marker eyebrow — small line + label, harder to miss than a single text row */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="block h-px w-10 bg-[#ce4710]"
            />
            <p className="text-xs tracking-[0.2em] text-[#ce4710] font-panchang uppercase">
              Beyond kAI
            </p>
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold font-panchang text-white leading-[1.05] tracking-tight">
            When the problem doesn&apos;t fit a product, we build it.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/80 font-supreme leading-relaxed">
            Some teams need a phone agent. Others need an internal tool, an applied-AI system, or a workflow that has to live behind their own walls. Kaibre&apos;s engineering team takes those builds end-to-end &mdash; design, ship, run.
          </p>
        </div>

        <ul className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {tiles.map(({ id, icon: Icon, title, body, utm }) => {
            const href = withUtm(CALENDLY_URL, {
              source: "kaibre.com",
              medium: "custom-builds",
              content: utm,
            });
            return (
              <li key={title} {...(id ? { id } : {})} className="scroll-mt-24">
                <Link
                  href={href}
                  className="group block h-full rounded-2xl border border-[#ce4710]/15 bg-gradient-to-br from-[#1a0e08]/85 via-[#0f0805]/85 to-black/85 p-6 md:p-8 backdrop-blur-sm transition-all duration-200 hover:border-[#ce4710]/60 hover:from-[#241108]/90 hover:via-[#160a06]/90 hover:to-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ce4710] cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-md bg-[#ce4710]/20 border border-[#ce4710]/40 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#ce4710]" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-panchang font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-base text-white/75 font-supreme leading-relaxed">
                    {body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-supreme text-sm text-[#ce4710] group-hover:gap-2 transition-all duration-200">
                    Talk to engineering
                    <ArrowUpRight className="w-4 h-4" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
