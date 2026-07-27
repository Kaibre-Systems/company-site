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
   ResolutionField — hero
   --------------------------------------------------------------------------
   A measurement readout: a lot of signal, one reading that clears the bar.
   That is the company's thesis stated without a word of copy.

   Ticks rise once, left to right, then rest. Nothing loops — a hero should
   settle, not fidget.
   ========================================================================== */

// Deterministic profile: identical on server and client, no hydration drift.
const FIELD = [
  0.4, 0.403, 0.419, 0.43, 0.423, 0.402, 0.384, 0.382, 0.392, 0.397, 0.381,
  0.346, 0.315, 0.312, 0.348, 0.402, 0.435, 0.417, 0.342, 0.242, 0.161, 0.131,
  0.152, 0.2, 0.242, 0.262, 0.268, 0.253, 0.235, 0.2, 1.0, 0.241, 0.338, 0.412,
  0.474, 0.498, 0.51, 0.485, 0.418, 0.33, 0.26, 0.241, 0.279, 0.345, 0.397,
  0.403,
].map((v) => (v === 1 ? 0.86 : Math.min(0.62, v * 1.18)));
const PEAK = FIELD.indexOf(Math.max(...FIELD));

const W = 560;
const H = 300;
const BASE = 252;
const PAD = 26;
const SPAN = 214;
const THRESHOLD = BASE - SPAN * 0.7;
const STEP = (W - PAD * 2) / (FIELD.length - 1);

export function ResolutionField({ className }: { className?: string }) {
  const peakX = PAD + PEAK * STEP;
  const peakY = BASE - SPAN * FIELD[PEAK];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A field of readings in which a single measurement rises above the threshold."
      className={cn("h-auto w-full", className)}
    >
      {/* The bar to clear. */}
      <line
        x1={PAD}
        y1={THRESHOLD}
        x2={W - PAD}
        y2={THRESHOLD}
        strokeWidth="1"
        strokeDasharray="2 7"
        className="stroke-border-strong"
      />
      {/* Baseline. */}
      <line
        x1={PAD}
        y1={BASE}
        x2={W - PAD}
        y2={BASE}
        strokeWidth="1"
        className="stroke-border-strong"
      />

      {FIELD.map((v, i) => (
        <rect
          key={i}
          x={PAD + i * STEP - (i === PEAK ? 2.5 : 1.5)}
          y={BASE - SPAN * v}
          width={i === PEAK ? 5 : 3}
          height={SPAN * v}
          rx={i === PEAK ? 2.5 : 1.5}
          style={{ animationDelay: `${i * 26}ms` }}
          className={cn(
            "[transform-box:fill-box] [transform-origin:bottom]",
            "motion-safe:animate-[tick_620ms_cubic-bezier(0.16,1,0.3,1)_both]",
            i === PEAK ? "fill-accent" : "fill-fg-subtle/55",
          )}
        />
      ))}

      {/* The reading that matters, marked. */}
      <g
        style={{ animationDelay: `${PEAK * 26 + 340}ms` }}
        className="[transform-box:fill-box] [transform-origin:center] motion-safe:animate-[markIn_520ms_ease-out_both]"
      >
        <circle cx={peakX} cy={peakY} r="3.5" className="fill-accent" />
        <circle
          cx={peakX}
          cy={peakY}
          r="11"
          fill="none"
          strokeWidth="1"
          className="stroke-accent/40"
        />
      </g>
    </svg>
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
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  s.accent ? "bg-accent" : "bg-border-strong",
                )}
              />
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
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full",
                  i === 0 ? "bg-signal-400" : "bg-fg-subtle",
                )}
              />
              {o}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   EvidenceLink — SecurePulse
   --------------------------------------------------------------------------
   The product's differentiator in one picture: a finding, and the source it
   is tied back to. Placeholder text only — never real regulation.
   ========================================================================== */

export function EvidenceLink({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A draft finding joined by a link to the site photo and authority reference it was drawn from."
      className={cn(
        "grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]",
        className,
      )}
    >
      <div className="rounded-card border border-border bg-surface-raised p-5">
        <p className="text-small text-fg-subtle">Finding</p>
        <p className="mt-2 text-body text-fg">Perimeter lighting not continuous</p>
        <p className="mt-3 text-small text-fg-muted">Severity: high</p>
      </div>

      <div aria-hidden className="flex items-center justify-center gap-1 sm:flex-col">
        <span className="h-px w-8 bg-accent sm:h-8 sm:w-px" />
        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
        <span className="h-px w-8 bg-accent sm:h-8 sm:w-px" />
      </div>

      <div className="rounded-card border border-border bg-surface-raised p-5">
        <p className="text-small text-fg-subtle">Traced back to</p>
        <p className="mt-2 text-body text-fg">Site photo, north boundary</p>
        <p className="mt-3 text-small text-fg-muted">
          Authority reference, with its evidence label
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   StatusList — product panels
   --------------------------------------------------------------------------
   A caption, then rows of "what it is" and "where it stands". A dot carries
   the state and the word names it, so meaning never rests on colour alone.
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
