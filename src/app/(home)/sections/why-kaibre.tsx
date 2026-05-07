const bullets = [
  {
    title: "Built like a product, not a demo.",
    body:
      "kAI is Kaibre's flagship AI phone agent platform, designed for sales-led deployments where workflow, qualification logic, and escalation rules need to be configured before calls go live.",
  },
  {
    title: "Tenant-grade isolation by default.",
    body:
      "Per-customer database. Per-customer phone number. Per-customer agent. The same posture we'd architect for an enterprise engagement.",
  },
  {
    title: "Built across Dubai, Kelowna, and Atlanta.",
    body:
      "Kaibre brings product engineering, AI implementation, and deployment discipline to teams operating across Canada, the UAE, and the US.",
  },
];

interface WhyKaibreProps {
  // Slot reserved for a future operator headshot. When provided, renders a
  // small avatar block under bullet 3. Left null in PR 1 — no layout impact.
  headshot?: {
    src: string;
    alt: string;
    name: string;
    role: string;
  } | null;
}

export default function WhyKaibre({ headshot = null }: WhyKaibreProps) {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a0807] via-black to-black overflow-hidden">
      {/* Cool top-right wash — visual cooldown after the warm Custom-builds chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)] blur-3xl"
      />
      {/* Subtle low-left counterweight — keeps the section from feeling top-heavy */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-40 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest text-[#ce4710] font-panchang uppercase">
            Why Kaibre
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl font-bold font-panchang text-white leading-tight">
            We don&apos;t just demo it. We run it.
          </h2>
        </div>

        <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {bullets.map((b) => (
            <li key={b.title} className="font-supreme">
              <h3 className="text-lg font-panchang font-semibold text-white">
                {b.title}
              </h3>
              <p className="mt-3 text-base text-white/75 leading-relaxed max-w-prose">
                {b.body}
              </p>
            </li>
          ))}
        </ul>

        {headshot && (
          <div className="mt-12 flex items-center gap-4 font-supreme">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={headshot.src}
              alt={headshot.alt}
              width={96}
              height={96}
              className="w-24 h-24 rounded-2xl object-cover border border-white/15"
            />
            <div>
              <p className="text-base text-white">{headshot.name}</p>
              <p className="text-sm text-white/60">{headshot.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
