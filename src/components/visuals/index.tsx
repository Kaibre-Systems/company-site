import { cn } from "@/lib/utils";

/* ==========================================================================
   HeroMark
   --------------------------------------------------------------------------
   The brand's own spark glyph, lifted from the wordmark and set at scale over
   a measurement field. Brand-native rather than decorative, and it needs no
   caption: precision, focus, a point of resolution.

   Pure SVG, a couple of kilobytes, crisp at every density.
   ========================================================================== */

/** The spark, verbatim from `full_logo_white.svg`. Local bbox ~ x34-88, y151-207. */
const SPARK = "m 60.69,207.23 c -0.26,-1.35 -0.51,-2.7 -0.78,-4.05 -0.74,-3.62 -1.58,-7.2 -2.98,-10.62 -1.95,-4.75 -5.33,-7.9 -9.96,-9.73 -2.85,-1.12 -5.79,-1.89 -8.76,-2.55 -1.51,-0.33 -3.02,-0.63 -4.54,-1 0.48,-0.09 1.19,-0.23 2.04,-0.41 5.44,-1.14 8.26,-1.9 11.33,-3.1 5.33,-2.08 8.74,-5.97 10.58,-11.46 1.19,-3.53 1.97,-7.16 2.68,-10.82 0.13,-0.69 0.26,-1.38 0.47,-2.08 0.17,0.91 0.34,1.83 0.52,2.74 0.73,3.74 1.52,7.45 2.87,11.01 1.31,3.45 3.24,6.43 6.3,8.51 2.2,1.5 4.61,2.53 7.15,3.2 3.22,0.85 6.47,1.55 9.71,2.31 0.15,0.04 0.31,0.07 0.59,0.14 -1.32,0.27 -2.53,0.5 -3.72,0.76 -3.58,0.77 -7.14,1.64 -10.53,3.11 -4.63,2 -7.71,5.48 -9.5,10.27 -1.21,3.26 -2,6.64 -2.68,10.05 -0.25,1.24 -0.47,2.48 -0.71,3.72 -0.02,0 -0.04,0 -0.06,0 z";

export function HeroMark({ className }: { className?: string }) {
  const dots = [];
  for (let x = 0; x <= 12; x++) {
    for (let y = 0; y <= 12; y++) {
      dots.push(
        <circle key={`${x}-${y}`} cx={20 + x * 30} cy={20 + y * 30} r={1} />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <defs>
        {/* Field fades outward so the grid never competes with the mark. */}
        <radialGradient id="km-fade" cx="50%" cy="50%" r="52%">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="55%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="km-mask">
          <rect width="400" height="400" fill="url(#km-fade)" />
        </mask>
      </defs>

      {/* Measurement field */}
      <g mask="url(#km-mask)" className="fill-fg-subtle/70">{dots}</g>

      {/* Datum lines through the centre */}
      <g mask="url(#km-mask)" className="stroke-border-strong" strokeWidth="1">
        <line x1="0" y1="200" x2="400" y2="200" />
        <line x1="200" y1="0" x2="200" y2="400" />
      </g>

      {/* Registration ring */}
      <circle
        cx="200"
        cy="200"
        r="104"
        fill="none"
        strokeWidth="1"
        className="stroke-border-strong"
      />
      <circle
        cx="200"
        cy="200"
        r="104"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="34 619"
        strokeDashoffset="-17"
        transform="rotate(-90 200 200)"
        className="stroke-accent"
      />

      {/* The spark, scaled and centred on the datum crossing. */}
      <g transform="translate(200 200) scale(2.55) translate(-61.2 -179.2)">
        <path d={SPARK} className="fill-fg" />
      </g>
    </svg>
  );
}

/* ==========================================================================
   StatusList
   --------------------------------------------------------------------------
   One grammar for every product illustration: a quiet caption, then rows of
   "what it is" and "where it stands". No nested boxes, no borders on the
   rows, no chips — a dot carries the state and the word names it, so the
   meaning never depends on colour alone.
   ========================================================================== */

const TONE = {
  positive: "bg-signal-400",
  attention: "bg-accent",
  neutral: "bg-fg-subtle",
} as const;

export interface StatusRow {
  label: string;
  status: string;
  tone: keyof typeof TONE;
}

export function StatusList({
  caption,
  rows,
  footnote,
}: {
  caption: string;
  rows: readonly StatusRow[];
  footnote?: string;
}) {
  return (
    <div className="p-6">
      <p className="text-small text-fg-subtle">{caption}</p>

      <ul className="mt-5 space-y-4">
        {rows.map((row) => (
          <li
            key={row.label}
            className="grid grid-cols-[1fr_auto] items-baseline gap-4"
          >
            <span className="text-body text-fg">{row.label}</span>
            <span className="flex w-[7.5rem] items-center gap-2 text-small text-fg-muted">
              <span
                aria-hidden
                className={cn("size-1.5 shrink-0 rounded-full", TONE[row.tone])}
              />
              {row.status}
            </span>
          </li>
        ))}
      </ul>

      {footnote ? (
        <p className="mt-6 border-t border-border pt-4 text-small text-fg-subtle">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}

/* --- SecurePulse: findings and the confidence behind each one ------------- */

export function AssessmentPanel() {
  return (
    <StatusList
      caption="Draft findings"
      rows={[
        { label: "Perimeter security", status: "Verified", tone: "positive" },
        { label: "Access control", status: "Partial", tone: "neutral" },
        { label: "Supply chain & delivery", status: "Gap", tone: "attention" },
      ]}
      footnote="Signed off by a named assessor before it becomes a report."
    />
  );
}

/* --- kAI: what each conversation came back as ---------------------------- */

export function CallOutcomeList() {
  return (
    <StatusList
      caption="Call outcomes"
      rows={[
        { label: "Budget confirmed", status: "Qualified", tone: "positive" },
        { label: "Call back next week", status: "Callback", tone: "attention" },
        { label: "Outside the area", status: "Not qualified", tone: "neutral" },
      ]}
      footnote="Only the qualified conversations reach your team."
    />
  );
}
