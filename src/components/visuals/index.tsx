import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   One visual grammar for the whole site
   --------------------------------------------------------------------------
   Thin rules, small nodes, sentence-case labels, a single accent, no boxes
   inside boxes. Every diagram below is built from those parts, so a visitor
   learns to read them once. Pure SVG and CSS — a few kilobytes, crisp at any
   density, and every animation resolves to its final state under reduced
   motion.
   ========================================================================== */

/* ==========================================================================
   MonitoredSignal — hero
   --------------------------------------------------------------------------
   A reading travelling across a tolerance band. Most of it stays inside;
   once per pass, one excursion breaks the band and is flagged.

   That is the page's headline made visible — software for work that has to
   be right is software that knows when something is not. It is a shape
   people already read (a monitoring chart), so it needs no caption, and the
   trace never stops moving.

   The waveform is drawn twice end to end and translated by exactly one
   period, so the loop has no seam.

   The viewBox is cut to the artwork. Because the element is width-driven
   (`h-auto w-full`), every unused viewBox unit is scaled up with the viewport
   and reserved as layout box the drawing never fills — on a phone, where the
   visual stacks under the copy instead of sitting beside it, that surplus
   reads as a hole under the chart. INK_TOP/INK_BOTTOM below are the real
   extents; the viewBox is those plus one small, deliberate margin.
   ========================================================================== */

const TRACE = "M 0,167.8 L 4,168.5 L 8,168.2 L 12,167.6 L 16,167.3 L 20,167.7 L 24,168.6 L 28,169.7 L 32,170.4 L 36,170.3 L 40,169.2 L 44,167.3 L 48,165.2 L 52,163.5 L 56,163.0 L 60,163.9 L 64,166.3 L 68,169.6 L 72,172.8 L 76,175.1 L 80,175.6 L 84,174.0 L 88,170.4 L 92,165.4 L 96,159.7 L 100,154.5 L 104,150.1 L 108,147.1 L 112,145.1 L 116,143.8 L 120,142.6 L 124,141.2 L 128,139.5 L 132,137.7 L 136,136.5 L 140,136.4 L 144,137.9 L 148,141.2 L 152,145.7 L 156,150.9 L 160,155.7 L 164,159.2 L 168,161.0 L 172,160.8 L 176,159.2 L 180,156.8 L 184,154.6 L 188,153.4 L 192,153.7 L 196,155.3 L 200,158.0 L 204,161.1 L 208,163.8 L 212,165.9 L 216,167.3 L 220,168.2 L 224,169.0 L 228,170.5 L 232,172.6 L 236,175.5 L 240,178.6 L 244,181.1 L 248,182.2 L 252,181.2 L 256,178.1 L 260,173.0 L 264,166.7 L 268,160.2 L 272,154.6 L 276,150.5 L 280,148.2 L 284,147.5 L 288,147.8 L 292,148.4 L 296,148.6 L 300,148.3 L 304,147.4 L 308,146.3 L 312,145.5 L 316,145.6 L 320,146.5 L 324,148.2 L 328,150.0 L 332,151.0 L 336,150.5 L 340,148.0 L 344,143.3 L 348,136.9 L 352,129.3 L 356,121.5 L 360,114.1 L 364,107.7 L 368,102.4 L 372,98.1 L 376,94.6 L 380,91.7 L 384,89.5 L 388,88.4 L 392,88.9 L 396,91.7 L 400,97.0 L 404,104.9 L 408,114.8 L 412,125.7 L 416,136.3 L 420,145.3 L 424,151.8 L 428,155.4 L 432,156.4 L 436,155.6 L 440,154.0 L 444,152.7 L 448,152.5 L 452,153.6 L 456,155.9 L 460,158.7 L 464,161.1 L 468,162.4 L 472,162.3 L 476,160.6 L 480,158.0 L 484,154.9 L 488,152.2 L 492,150.1 L 496,148.7 L 500,147.8 L 504,147.0 L 508,145.5 L 512,143.4 L 516,140.5 L 520,137.4 L 524,134.9 L 528,133.8 L 532,134.8 L 536,137.9 L 540,143.0 L 544,149.3 L 548,155.8 L 552,161.4 L 556,165.5 L 560,167.8 L 564,168.5 L 568,168.2 L 572,167.6 L 576,167.3 L 580,167.7 L 584,168.6 L 588,169.7 L 592,170.4 L 596,170.3 L 600,169.2 L 604,167.3 L 608,165.2 L 612,163.5 L 616,163.0 L 620,163.9 L 624,166.3 L 628,169.6 L 632,172.8 L 636,175.1 L 640,175.6 L 644,174.0 L 648,170.4 L 652,165.4 L 656,159.7 L 660,154.5 L 664,150.1 L 668,147.1 L 672,145.1 L 676,143.8 L 680,142.6 L 684,141.2 L 688,139.5 L 692,137.7 L 696,136.5 L 700,136.4 L 704,137.9 L 708,141.2 L 712,145.7 L 716,150.9 L 720,155.7 L 724,159.2 L 728,161.0 L 732,160.8 L 736,159.2 L 740,156.8 L 744,154.6 L 748,153.4 L 752,153.7 L 756,155.3 L 760,158.0 L 764,161.1 L 768,163.8 L 772,165.9 L 776,167.3 L 780,168.2 L 784,169.0 L 788,170.5 L 792,172.6 L 796,175.5 L 800,178.6 L 804,181.1 L 808,182.2 L 812,181.2 L 816,178.1 L 820,173.0 L 824,166.7 L 828,160.2 L 832,154.6 L 836,150.5 L 840,148.2 L 844,147.5 L 848,147.8 L 852,148.4 L 856,148.6 L 860,148.3 L 864,147.4 L 868,146.3 L 872,145.5 L 876,145.6 L 880,146.5 L 884,148.2 L 888,150.0 L 892,151.0 L 896,150.5 L 900,148.0 L 904,143.3 L 908,136.9 L 912,129.3 L 916,121.5 L 920,114.1 L 924,107.7 L 928,102.4 L 932,98.1 L 936,94.6 L 940,91.7 L 944,89.5 L 948,88.4 L 952,88.9 L 956,91.7 L 960,97.0 L 964,104.9 L 968,114.8 L 972,125.7 L 976,136.3 L 980,145.3 L 984,151.8 L 988,155.4 L 992,156.4 L 996,155.6 L 1000,154.0 L 1004,152.7 L 1008,152.5 L 1012,153.6 L 1016,155.9 L 1020,158.7 L 1024,161.1 L 1028,162.4 L 1032,162.3 L 1036,160.6 L 1040,158.0 L 1044,154.9 L 1048,152.2 L 1052,150.1 L 1056,148.7 L 1060,147.8 L 1064,147.0 L 1068,145.5 L 1072,143.4 L 1076,140.5 L 1080,137.4 L 1084,134.9 L 1088,133.8 L 1092,134.8 L 1096,137.9 L 1100,143.0 L 1104,149.3 L 1108,155.8 L 1112,161.4 L 1116,165.5 L 1120,167.8";
const PERIOD = 560;
const BAND_TOP = 112;
const BAND_BOTTOM = 206;
/** Where the excursion peaks inside the first period. */
const BREACH = { x: 388, y: 88 };

/** Topmost ink: the breach ring, `BREACH.y - r - strokeWidth / 2`. */
const INK_TOP = BREACH.y - 10 - 0.75;
/** Bottommost ink: the lower band rule, `BAND_BOTTOM + strokeWidth / 2`. */
const INK_BOTTOM = BAND_BOTTOM + 0.875;
/** One margin, applied equally, so the chart is centred in the box it takes. */
const MARGIN = 7;
const VIEW_TOP = Math.round(INK_TOP - MARGIN);
const VIEW_HEIGHT = Math.round(INK_BOTTOM + MARGIN) - VIEW_TOP;

export function MonitoredSignal({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 ${VIEW_TOP} 560 ${VIEW_HEIGHT}`}
      role="img"
      aria-label="A live reading traced against a tolerance band, with one excursion outside the band flagged."
      className={cn("h-auto w-full", className)}
    >
      <defs>
        {/* Fades the trace at both edges so it enters and leaves, rather than
            stopping dead at the frame. */}
        <linearGradient id="ms-fade" x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.12" stopColor="white" stopOpacity="1" />
          <stop offset="0.88" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="ms-mask">
          <rect
            y={VIEW_TOP}
            width="560"
            height={VIEW_HEIGHT}
            fill="url(#ms-fade)"
          />
        </mask>
      </defs>

      {/* The band the reading is meant to stay inside. */}
      <g mask="url(#ms-mask)">
        <rect
          x="0"
          y={BAND_TOP}
          width="560"
          height={BAND_BOTTOM - BAND_TOP}
          className="fill-fg-subtle/[0.22]"
        />
        <line
          x1="0"
          y1={BAND_TOP}
          x2="560"
          y2={BAND_TOP}
          strokeWidth="1.75"
          strokeDasharray="6 7"
          strokeLinecap="round"
          className="stroke-fg-subtle"
        />
        <line
          x1="0"
          y1={BAND_BOTTOM}
          x2="560"
          y2={BAND_BOTTOM}
          strokeWidth="1.75"
          strokeDasharray="6 7"
          strokeLinecap="round"
          className="stroke-fg-subtle"
        />
      </g>

      {/* The reading. Drawn twice; translated exactly one period, so it loops
          without a seam. */}
      <g mask="url(#ms-mask)">
        <g className="motion-safe:animate-[trace_16s_linear_infinite]">
          <path
            d={TRACE}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-fg-subtle"
          />

          {/* The breach, flagged in both copies of the trace. */}
          {[0, PERIOD].map((offset) => (
            <g key={offset} transform={`translate(${offset} 0)`}>
              <circle cx={BREACH.x} cy={BREACH.y} r="4" className="fill-accent" />
              <circle
                cx={BREACH.x}
                cy={BREACH.y}
                r="10"
                fill="none"
                strokeWidth="1.5"
                className="stroke-accent"
              />
              <line
                x1={BREACH.x}
                y1={BREACH.y + 12}
                x2={BREACH.x}
                y2={BAND_TOP}
                strokeWidth="1"
                strokeDasharray="2 4"
                className="stroke-accent/70"
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ==========================================================================
   PulseDot — the site's one "this is live" signal
   --------------------------------------------------------------------------
   Used only where a dot stands for state that is genuinely in motion: a
   system's readings, a decision point, a domain we work in. Not for bullets.
   ========================================================================== */

const DOT_TONE = {
  positive: "bg-signal-400",
  attention: "bg-accent",
  neutral: "bg-fg-subtle",
  accent: "bg-accent",
  /** Reserved for something genuinely running right now. */
  live: "bg-success",
} as const;

export function PulseDot({
  tone = "accent",
  halo = false,
  delay = 0,
  size = "sm",
  className,
}: {
  tone?: keyof typeof DOT_TONE;
  /** Adds an expanding ring. Reserve it for the single node that matters. */
  halo?: boolean;
  delay?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "md" ? "size-2" : "size-1.5";
  return (
    <span className={cn("relative inline-flex shrink-0", px, className)} aria-hidden>
      {halo ? (
        <span
          style={{ animationDelay: `${delay}ms` }}
          className={cn(
            "absolute inset-0 rounded-full motion-safe:animate-[haloPulse_3.6s_ease-out_infinite]",
            DOT_TONE[tone],
          )}
        />
      ) : null}
      <span
        style={{ animationDelay: `${delay}ms` }}
        className={cn(
          "relative inline-flex rounded-full motion-safe:animate-[dotPulse_3.6s_ease-in-out_infinite]",
          px,
          DOT_TONE[tone],
        )}
      />
    </span>
  );
}

/* ==========================================================================
   SecurePulseName — the product name, with its pulse
   --------------------------------------------------------------------------
   "Pulse" carries the accent and breathes. Only the large instances animate;
   in nav and footer the colour alone does the work, so the chrome stays
   still. The text remains one continuous string for screen readers.
   ========================================================================== */

export function SecurePulseName({
  animate = true,
  delay = 0,
  className,
}: {
  animate?: boolean;
  /** Offsets the cycle, so several on one page do not beat in lockstep. */
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      Secure
      <span
        style={animate && delay ? { animationDelay: `${delay}ms` } : undefined}
        className={cn(
          "text-accent",
          animate && "motion-safe:animate-[textBreathe_3.6s_ease-in-out_infinite]",
        )}
      >
        Pulse
      </span>
    </span>
  );
}

/**
 * Renders any copy with "SecurePulse" carrying its accent.
 *
 * Body mentions take the colour but stay still — a page of breathing words
 * would be unreadable. Only the display instances animate.
 *
 * Deliberately not applied inside filled buttons: accent-on-accent is
 * invisible, so CTA labels keep the plain name.
 */
export function withBrand(text: string) {
  if (!text.includes("SecurePulse")) return text;
  return text.split("SecurePulse").flatMap((part, i) =>
    i === 0 ? [part] : [<SecurePulseName key={i} delay={i * 420} />, part],
  );
}

/* ==========================================================================
   IndonesiaFlag — the market-designation mark
   --------------------------------------------------------------------------
   Two CSS bands rather than the 🇮🇩 emoji, which Windows renders as the
   letters "ID". Decorative: the visible word "Indonesia" beside it is
   always the accessible name.
   ========================================================================== */

export function IndonesiaFlag() {
  return (
    <span
      aria-hidden
      className="inline-flex h-3 w-[18px] shrink-0 flex-col overflow-hidden rounded-[2px] border border-border-strong"
    >
      <span className="h-1/2 bg-merah" />
      <span className="h-1/2 bg-white" />
    </span>
  );
}

/* ==========================================================================
   Flow — a labelled sequence, optionally splitting at the end
   --------------------------------------------------------------------------
   Used wherever a page describes something moving through stages. One
   component, so every flow on the site reads the same way.
   ========================================================================== */

export interface FlowStage {
  label: string;
  note?: string;
  /** The stage the accent lands on — where the meaning sits. */
  accent?: boolean;
}

export function Flow({
  stages,
  outcomes,
  className,
}: {
  stages: readonly FlowStage[];
  /** Optional terminal branches, listed under the sequence. */
  outcomes?: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <ol
        className="grid gap-x-4 gap-y-7"
        style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
      >
        {stages.map((s, i) => (
          <li key={s.label} className="col-span-full sm:col-span-1">
            <div aria-hidden className="flex items-center">
              {s.accent ? (
                <PulseDot tone="accent" size="md" halo />
              ) : (
                <span className="size-2 shrink-0 rounded-full bg-border-strong" />
              )}
              <span
                className={cn(
                  "h-px flex-1",
                  i === stages.length - 1 ? "bg-transparent" : "bg-border-strong",
                )}
              />
            </div>
            <p className="mt-4 text-body font-medium text-fg">{s.label}</p>
            {s.note ? (
              <p className="mt-1.5 max-w-[30ch] text-small text-fg-subtle">
                {s.note}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      {outcomes?.length ? (
        <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-5">
          {outcomes.map((o, i) => (
            <li key={o} className="flex items-center gap-2 text-small text-fg-muted">
              <PulseDot tone={i === 0 ? "positive" : "neutral"} delay={i * 260} />
              {o}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   Frame — a boundary without a caption
   ========================================================================== */

export function VisualFrame({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "overflow-hidden rounded-card border border-border bg-surface-inset",
        className,
      )}
    >
      {children}
    </div>
  );
}
