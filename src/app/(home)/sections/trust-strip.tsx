export default function TrustStrip() {
  const items = [
    "Built across Dubai, Kelowna, and Atlanta",
    "Sales-led AI implementation",
    "Tenant-isolated by design",
  ];

  return (
    <section
      aria-label="What Kaibre is and where we operate"
      className="relative bg-black/60 border-y border-[#ce4710]/30"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-supreme text-sm md:text-base text-white/75 text-center">
          {items.map((item, idx) => (
            <li key={item} className="flex items-center gap-x-6">
              {idx > 0 && (
                <span aria-hidden className="text-[#ce4710]/60 hidden sm:inline">
                  ·
                </span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
