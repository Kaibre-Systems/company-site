const faqs = [
  {
    q: "What does kAI actually do today?",
    a: "kAI is an AI phone agent that places outbound qualification calls on your own phone line, transcribes and scores every call, and opens cases for hot leads.",
  },
  {
    q: "Can it answer inbound calls?",
    a: "Today, kAI runs outbound qualification calls. Inbound is on the roadmap.",
  },
  {
    q: "Which languages?",
    a: "English in Canada. English and Arabic in the UAE.",
  },
  {
    q: "Where does call data live?",
    a: "Every engagement gets its own database. Recordings and transcripts are retained per your agreement.",
  },
  {
    q: "How do we get started?",
    a: "We start with a demo and a workflow-mapping conversation. Once your script, qualification rules, and escalation flow are agreed, we configure your workspace and go live.",
  },
  {
    q: "Do you do custom builds outside kAI?",
    a: "Yes — see Beyond kAI above.",
  },
];

export default function Faq() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-black via-[#0a0807] to-black overflow-hidden">
      {/* Soft cool centre glow — keeps FAQ visually quieter than the chapter sections it sits between */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
        <p className="text-xs tracking-widest text-[#ce4710] font-panchang uppercase">
          FAQ
        </p>
        <h2 className="mt-3 text-2xl md:text-4xl font-bold font-panchang text-white leading-tight">
          Common questions, answered.
        </h2>

        <ul className="mt-10 md:mt-12 space-y-3">
          {faqs.map((f) => (
            <li
              key={f.q}
              className="rounded-lg border border-white/10 bg-black/40 hover:border-white/20 transition-colors duration-200"
            >
              <details className="group">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-panchang text-base text-white list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ce4710] rounded-lg">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="text-[#ce4710] text-2xl leading-none transition-transform duration-200 group-open:rotate-45 shrink-0"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 font-supreme text-base text-white/80 leading-relaxed">
                  {f.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
