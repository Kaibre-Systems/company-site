import { cn } from "@/lib/utils";

/* ==========================================================================
   DatumLine — hero
   --------------------------------------------------------------------------
   A measuring datum with three labelled nodes. Previews the three modes of
   work before the visitor has scrolled. No animation loop: the line draws
   once and stops.
   ========================================================================== */

export function DatumLine({
  modes,
  className,
}: {
  modes: readonly { label: string; note: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid w-full gap-x-8 gap-y-8 sm:grid-cols-3",
        // The rule is drawn once, left to right, then stops.
        "motion-safe:animate-[datum_700ms_cubic-bezier(0.16,1,0.3,1)_both] origin-left",
        className,
      )}
    >
      {modes.map((m, i) => (
        <div
          key={m.label}
          // Each column carries its own segment of the datum, so ticks and
          // labels are guaranteed to align at every breakpoint.
          className={cn(
            "border-t pt-4",
            i === 0 ? "border-accent" : "border-border-strong",
          )}
        >
          <dt className="font-mono text-label uppercase tracking-[0.085em] text-fg">
            {m.label}
          </dt>
          <dd className="mt-2 max-w-[30ch] text-small text-fg-subtle">{m.note}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ==========================================================================
   AssessmentPanel — SecurePulse
   --------------------------------------------------------------------------
   A checklist item carrying a status, a severity grade, and an evidence
   label. Structure only — no real regulatory text, no counts, no scores.
   ========================================================================== */

const EVIDENCE_TONE = {
  VERIFIED: "text-signal-400 border-signal-600/50 bg-signal-600/10",
  PARTIAL: "text-fg-muted border-border-strong bg-surface-inset",
  GAP: "text-brand-300 border-brand-600/50 bg-brand-600/10",
} as const;

export function AssessmentPanel() {
  const items = [
    { domain: "Perimeter security", severity: "High", evidence: "VERIFIED" as const },
    { domain: "Access control", severity: "Medium", evidence: "PARTIAL" as const },
    { domain: "Surveillance & monitoring", severity: "Low", evidence: "VERIFIED" as const },
    { domain: "Supply chain & delivery", severity: "—", evidence: "GAP" as const },
  ];

  return (
    <div className="divide-y divide-border">
      <div className="flex items-center gap-3 px-5 py-3">
        <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          Draft findings
        </span>
        <span className="ml-auto font-mono text-label text-fg-subtle">
          Awaiting review
        </span>
      </div>

      {items.map((item, i) => (
        <div key={item.domain} className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-label text-fg-subtle">
              ES-{String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-small text-fg">{item.domain}</span>
            <span
              className={cn(
                "ml-auto rounded-[3px] border px-2 py-0.5 font-mono text-label",
                EVIDENCE_TONE[item.evidence],
              )}
            >
              {item.evidence}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-1 w-full max-w-[9rem] rounded-full bg-border-strong" />
            <span className="font-mono text-label text-fg-subtle">
              Severity: {item.severity}
            </span>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2 px-5 py-3">
        <span className="text-small text-fg-subtle">
          Lead assessor sign-off required before export
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   CallOutcomeList — kAI
   --------------------------------------------------------------------------
   Conversation outcomes with classification tags. No counts, no totals, no
   minutes, no percentages.
   ========================================================================== */

const OUTCOME_TONE = {
  Qualified: "text-signal-400 border-signal-600/50 bg-signal-600/10",
  "Callback requested": "text-brand-300 border-brand-600/50 bg-brand-600/10",
  "Not qualified": "text-fg-subtle border-border-strong bg-surface-inset",
  "No answer": "text-fg-subtle border-border-strong bg-surface-inset",
} as const;

export function CallOutcomeList() {
  const rows = [
    { outcome: "Qualified" as const, note: "Budget and timeline confirmed" },
    { outcome: "Callback requested" as const, note: "Asked to be called next week" },
    { outcome: "Not qualified" as const, note: "Outside the service area" },
    { outcome: "No answer" as const, note: "Queued for a second attempt" },
  ];

  return (
    <div className="divide-y divide-border">
      <div className="flex items-center gap-3 px-5 py-3">
        <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          Call outcomes
        </span>
      </div>
      {rows.map((row) => (
        <div key={row.outcome} className="flex flex-wrap items-center gap-3 px-5 py-4">
          <span className="text-small text-fg-muted">{row.note}</span>
          <span
            className={cn(
              "ml-auto shrink-0 rounded-[3px] border px-2 py-0.5 font-mono text-label",
              OUTCOME_TONE[row.outcome],
            )}
          >
            {row.outcome}
          </span>
        </div>
      ))}
    </div>
  );
}
