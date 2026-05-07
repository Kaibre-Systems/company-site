const steps = [
  {
    n: "01",
    title: "Map your workflow",
    body:
      "We learn your business, lead sources, script, qualification criteria, escalation rules, and what the agent should never say.",
  },
  {
    n: "02",
    title: "Configure kAI",
    body:
      "We set up your workspace, phone line, agent, call flow, and lead intake process.",
  },
  {
    n: "03",
    title: "kAI calls",
    body:
      "kAI runs outbound qualification calls on your configured number, with recordings and transcripts captured.",
  },
  {
    n: "04",
    title: "Your team picks up the warm ones",
    body:
      "Qualified leads and cases are escalated to your team based on your rules.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 relative py-28 md:py-40 overflow-hidden border-t border-[#ce4710]/20 bg-gradient-to-b from-[#1a0d08] via-black to-black"
    >
      {/* Soft warm radial glow at the top — subtle visual cue this is its own act */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(206,71,16,0.15),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] text-[#ce4710] font-panchang uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold font-panchang text-white leading-[1.05] tracking-tight">
            From workflow to qualified leads.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 font-supreme leading-relaxed max-w-2xl">
            kAI is a sales-led implementation. Before a single call goes out, we sit with your team and turn your process into the agent&apos;s playbook.
          </p>
        </div>

        <ol className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, idx) => (
            <li
              key={step.n}
              className="relative font-supreme rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="font-panchang text-5xl md:text-6xl text-[#ce4710] leading-none"
                >
                  {step.n}
                </span>
                {idx < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gradient-to-r from-[#ce4710]/50 to-transparent"
                  />
                )}
              </div>
              <h3 className="mt-6 text-xl md:text-2xl font-panchang font-semibold text-white leading-snug">
                {step.title}
              </h3>
              <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
