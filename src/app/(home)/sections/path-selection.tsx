import Link from "next/link";

const chips = [
  { label: "I'm exploring kAI for my team", href: "#kai" },
  { label: "I need a custom AI build", href: "#custom" },
  { label: "I have a security-sensitive workflow", href: "#security" },
];

export default function PathSelection() {
  return (
    <nav
      aria-label="Tell us what you're here for"
      className="-mx-4 lg:mx-0 overflow-x-auto snap-x snap-mandatory lg:overflow-visible"
    >
      <ul className="flex flex-nowrap gap-2 lg:gap-3 px-4 lg:px-0 lg:flex-wrap">
        {chips.map((chip) => (
          <li key={chip.href} className="snap-start shrink-0">
            <Link
              href={chip.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-supreme text-white/90 hover:border-[#ce4710] hover:bg-[#ce4710]/10 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ce4710] cursor-pointer whitespace-nowrap"
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
