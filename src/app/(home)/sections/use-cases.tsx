"use client";

import { useState } from "react";

const cases = [
  {
    id: "real-estate",
    label: "Real Estate",
    body:
      "Real estate teams collect more buyer and renter enquiries than agents can return. kAI calls each lead back, qualifies them on budget and timeline, and only books an agent's time when the lead is real.",
  },
  {
    id: "clinics",
    label: "Clinics & Service Businesses",
    body:
      "Confirm appointments, reach no-shows, and run intake calls on a private line. Front desk only sees the patients who answered yes.",
  },
  {
    id: "smb-sales",
    label: "SMB Sales Teams",
    body:
      "Outbound qualification at SDR scale without the SDR headcount. Hand the warm calls to your closers; everything else stays out of the inbox.",
  },
  {
    id: "insurance",
    label: "Insurance & Dealerships",
    body:
      "Re-engage cold lists at a fraction of human-dialer cost. kAI runs the script, captures intent, and respects DNC on every call.",
  },
];

export default function UseCases() {
  const [active, setActive] = useState(cases[0].id);
  const activeCase = cases.find((c) => c.id === active) ?? cases[0];

  function onTabKey(e: React.KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive(cases[(idx + 1) % cases.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(cases[(idx - 1 + cases.length) % cases.length].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(cases[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(cases[cases.length - 1].id);
    }
  }

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-black via-[#0a0807] to-black border-t border-white/5 overflow-hidden">
      {/* Bottom-left cool accent — visual breath after the warm How-it-works section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_70%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] text-[#ce4710] font-panchang uppercase">
            Who it&apos;s for
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold font-panchang text-white leading-[1.05] tracking-tight">
            Built for teams that live on the phone.
          </h2>
        </div>

        {/* Desktop tablist */}
        <div
          role="tablist"
          aria-label="Use cases"
          className="hidden md:flex mt-12 gap-1 border-b border-white/10 flex-wrap"
        >
          {cases.map((c, idx) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(c.id)}
                onKeyDown={(e) => onTabKey(e, idx)}
                className={`px-5 py-3 font-supreme text-base transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ce4710] rounded-t-md ${
                  selected
                    ? "text-white border-b-2 border-[#ce4710] -mb-px"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeCase.id}`}
          aria-labelledby={`tab-${activeCase.id}`}
          className="hidden md:block mt-10 max-w-3xl font-supreme text-lg md:text-xl text-white/85 leading-relaxed"
        >
          {activeCase.body}
        </div>

        {/* Mobile accordion — no JS-state dependency, uses native disclosure */}
        <ul className="md:hidden mt-10 space-y-3">
          {cases.map((c, idx) => (
            <li
              key={c.id}
              className="rounded-lg border border-white/10 bg-black/40"
            >
              <details className="group" open={idx === 0}>
                <summary className="flex items-center justify-between gap-3 px-4 py-4 cursor-pointer font-supreme text-base text-white list-none">
                  <span>{c.label}</span>
                  <span
                    aria-hidden
                    className="text-[#ce4710] transition-transform duration-200 group-open:rotate-45 text-xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 font-supreme text-base text-white/80 leading-relaxed">
                  {c.body}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
