import { cn } from "@/lib/utils";
import { PulseDot } from "@/components/visuals";

/* ==========================================================================
   SystemTopology — the shape of the commissioned platform
   --------------------------------------------------------------------------
   An anonymised but truthful structure: the trade path as a spine, the
   verification gate feeding it, and the operator console underneath every
   stage — because that is where the accuracy the page talks about is
   actually maintained. Built from the site's flow grammar (dots, thin
   rules, one accent) so it reads as a system diagram, not a marketing
   graphic. Stacks into a single column on phones.
   ========================================================================== */

export interface TopologyContent {
  /** The admission control that sits in front of trading. */
  gate: { label: string; note: string };
  stages: readonly { label: string; note: string }[];
  /** The judgment seat. Carries the accent. */
  console: { label: string; note: string };
  /** Accessible description of the whole structure. */
  alt: string;
}

function GateChip({ gate }: { gate: TopologyContent["gate"] }) {
  return (
    <>
      <p className="inline-flex items-center rounded-control border border-border-strong px-3 py-1.5 text-small text-fg-muted">
        {gate.label}
      </p>
      <p className="mt-1 max-w-[26ch] text-fine text-fg-subtle">{gate.note}</p>
      {/* A dashed feed line: admission is a check, not a stage. */}
      <span
        aria-hidden
        className="ml-1 mt-2 block h-5 w-px border-l border-dashed border-border-strong"
      />
    </>
  );
}

export function SystemTopology({
  content,
  className,
}: {
  content: TopologyContent;
  className?: string;
}) {
  const cols = content.stages.length;
  return (
    <div role="img" aria-label={content.alt} className={cn("w-full", className)}>
      {/* The gate joins the spine ahead of trading: over its column on a
          desktop, at the top of the single column on a phone. */}
      <div
        className="hidden sm:grid sm:gap-x-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        <div className="col-start-2">
          <GateChip gate={content.gate} />
        </div>
      </div>
      <div className="sm:hidden">
        <GateChip gate={content.gate} />
      </div>

      {/* The trade path. Same grammar as every flow on the site. */}
      <ol
        className="grid gap-x-4 gap-y-6"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {content.stages.map((s, i) => (
          <li key={s.label} className="col-span-full sm:col-span-1">
            <div aria-hidden className="flex items-center">
              <span className="size-2 shrink-0 rounded-full bg-border-strong" />
              <span
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  i === cols - 1 ? "bg-transparent" : "bg-border-strong",
                )}
              />
            </div>
            <p className="mt-3 text-body font-medium text-fg">{s.label}</p>
            <p className="mt-1 max-w-[28ch] text-small text-fg-subtle">{s.note}</p>
          </li>
        ))}
      </ol>

      {/* Risers: every stage reports down into the console. One on a phone. */}
      <div
        className="mt-5 hidden sm:grid sm:gap-x-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {content.stages.map((s) => (
          <span
            key={s.label}
            aria-hidden
            className="ml-1 block h-6 w-px bg-border-strong"
          />
        ))}
      </div>
      <span aria-hidden className="ml-1 mt-4 block h-6 w-px bg-border-strong sm:hidden" />

      {/* The console under all of it — the accented seat. */}
      <div className="rounded-card border border-border-strong bg-surface-raised px-5 py-4 sm:px-6">
        <p className="flex items-center gap-2.5 text-body font-medium text-fg">
          <PulseDot tone="accent" size="md" halo />
          {content.console.label}
        </p>
        <p className="mt-1.5 text-small text-fg-muted">{content.console.note}</p>
      </div>
    </div>
  );
}
