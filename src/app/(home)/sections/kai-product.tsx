import { Phone, LineChart, ShieldCheck } from "lucide-react";

const columns = [
  {
    icon: Phone,
    title: "Calls at scale.",
    body:
      "Submit a batch of leads and kAI dials each one through your workspace's configured agent and number. Per-lead status updates land in your dashboard within minutes.",
  },
  {
    icon: LineChart,
    title: "Qualifies automatically.",
    body:
      "Every transcript is scored for hotness and sentiment. Above your threshold, a case opens for your team. Below it, the lead stays out of your inbox.",
  },
  {
    icon: ShieldCheck,
    title: "Your workspace, isolated.",
    body:
      "Every engagement runs in its own private subdomain, database, and configured agent. No shared bot, no cross-talk. Sales-led setup, Google sign-in only.",
  },
];

export default function KaiProduct() {
  return (
    <section
      id="kai"
      className="relative scroll-mt-24 py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Subtle off-axis warm accent — keeps the product surface from being a flat slab */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle,rgba(206,71,16,0.08),transparent_70%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest text-[#ce4710] font-panchang uppercase">
            Meet kAI
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl font-bold font-panchang text-white leading-tight">
            An AI phone agent that earns its keep on the first call.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/80 font-supreme leading-relaxed">
            Upload a list. kAI calls every number on your own phone line, runs your script, scores intent 0&ndash;100, and only opens cases for the leads worth a human&apos;s time.
          </p>
        </div>

        {/* Polished product preview frame — real screenshot drops in a follow-up PR. */}
        <ProductPreview />
        <p className="mt-3 text-center font-supreme text-xs text-white/45 italic">
          Illustrative preview &mdash; your dashboard, your data.
        </p>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {columns.map(({ icon: Icon, title, body }) => (
            <div key={title} className="font-supreme">
              <div className="w-10 h-10 rounded-md bg-[#ce4710]/15 border border-[#ce4710]/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#ce4710]" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-panchang font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 text-base text-white/75 leading-relaxed max-w-prose">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div
      role="img"
      aria-label="Preview of the kAI operator dashboard — full screenshot in an upcoming release."
      className="mt-12 md:mt-16 relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-2xl shadow-[#ce4710]/10 overflow-hidden"
    >
      {/* Browser-chrome cue — keeps the frame from looking like an empty box without faking a screenshot. */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-black/40">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-supreme text-xs text-white/40">
          your-workspace.kai.kaibresystems.com / dashboard
        </span>
      </div>

      <div className="p-6 md:p-10">
        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: "1,284" },
            { label: "Hot Leads", value: "146" },
            { label: "Calls This Week", value: "612" },
            { label: "Minutes Used", value: "3,419" },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-white/10 bg-black/30 p-4"
            >
              <p className="font-supreme text-xs text-white/50 uppercase tracking-wide">
                {k.label}
              </p>
              <p className="mt-2 font-panchang text-2xl text-white">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Lower split — left: lead-temperature bars; right: minutes progress */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <p className="font-supreme text-xs text-white/50 uppercase tracking-wide">
                Lead temperature (last 30 days)
              </p>
              <p className="font-supreme text-xs text-white/40">
                Total qualified: 612
              </p>
            </div>
            <div className="mt-6 flex items-end gap-4 h-36">
              <Bar value={148} max={400} label="Cold" />
              <Bar value={232} max={400} label="Warm" />
              <Bar value={340} max={400} label="Hot" hot />
              <Bar value={84} max={400} label="Unqualified" />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col justify-between">
            <div>
              <p className="font-supreme text-xs text-white/50 uppercase tracking-wide">
                Plan minutes
              </p>
              <p className="mt-3 font-panchang text-2xl text-white">3,419 / 5,000</p>
            </div>
            <div className="mt-6">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[68%] bg-gradient-to-r from-[#ce4710] to-[#fd682d]" />
              </div>
              <p className="mt-3 font-supreme text-xs text-white/50">
                1,581 minutes left this cycle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bar({
  value,
  max,
  label,
  hot = false,
}: {
  value: number;
  max: number;
  label: string;
  hot?: boolean;
}) {
  const heightPct = Math.max(4, Math.min(100, (value / max) * 100));
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 h-full">
      <span className="font-panchang text-xs text-white/70 leading-none">
        {value}
      </span>
      <div className="flex-1 w-full flex items-end">
        <div
          className={`w-full rounded-t-md ${
            hot
              ? "bg-gradient-to-t from-[#ce4710] to-[#fd682d] shadow-[0_-8px_24px_-8px_#ce4710]"
              : "bg-white/15"
          }`}
          style={{ height: `${heightPct}%` }}
          aria-hidden
        />
      </div>
      <span className="font-supreme text-[11px] text-white/55 leading-none">
        {label}
      </span>
    </div>
  );
}
