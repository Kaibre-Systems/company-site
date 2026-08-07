import type { ComponentType } from "react";
import {
  ClipboardCheck,
  FileCheck2,
  FileOutput,
  FileText,
  FolderOpen,
  History,
  Layers,
  Library,
  Link2,
  ListChecks,
  ScanSearch,
  SearchX,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ChainNodeContent,
  IndoContent,
  IndoIcon,
} from "@/content/indonesia/types";
import { PulseDot } from "@/components/visuals";

/* ==========================================================================
   Compliance-specific visual vocabulary
   --------------------------------------------------------------------------
   Everything here draws a compliance concept — an assessment overview, a
   gap-analysis chain, a remediation extract, a report structure — rather
   than a generic interface rectangle. Same grammar as the rest of the site:
   thin rules, small nodes, one accent, tokens only. Content always comes
   from the locale dictionaries, so every illustration localises with the
   page, and anything with figures carries the dictionary's "Illustrative"
   tag.
   ========================================================================== */

/** Dictionary icon keys → lucide marks, kept in one place so the content
 *  files stay plain data. */
const ICONS: Record<IndoIcon, ComponentType<{ className?: string }>> = {
  corpus: Library,
  policy: FileText,
  evidence: FolderOpen,
  history: History,
  assessment: ClipboardCheck,
  map: Link2,
  gap: SearchX,
  severity: TriangleAlert,
  remediation: ListChecks,
  report: FileOutput,
  ground: Layers,
  assess: ScanSearch,
  review: FileCheck2,
};

const TONE_FILL = {
  positive: "bg-success",
  neutral: "bg-fg-subtle",
  attention: "bg-accent",
} as const;

/* ==========================================================================
   AssessmentOverview — the hero panel
   --------------------------------------------------------------------------
   What an assessment looks like at a glance: how many requirements, how they
   split across compliant / partial / gap, the open findings, and the review
   state. The figures are illustrative and the panel says so in its corner.
   ========================================================================== */

export function AssessmentOverview({
  panel,
}: {
  panel: IndoContent["hero"]["panel"];
}) {
  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-small text-fg-subtle">{panel.caption}</p>
        <p className="shrink-0 font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          {panel.tag}
        </p>
      </div>

      <p className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-display-2 text-fg">
          {panel.headline.value}
        </span>
        <span className="text-small text-fg-muted">{panel.headline.label}</span>
      </p>

      {/* Status distribution: one stacked bar, then its legend. */}
      <div
        aria-hidden
        className="mt-4 flex h-2 gap-px overflow-hidden rounded-pill"
      >
        {panel.bar.map((seg) => (
          <span
            key={seg.label}
            style={{ flexGrow: seg.count }}
            className={cn("min-w-1", TONE_FILL[seg.tone])}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {panel.bar.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2 text-small text-fg-muted">
            <span aria-hidden className={cn("size-1.5 rounded-full", TONE_FILL[seg.tone])} />
            {seg.label}
            <span className="font-mono text-label text-fg-subtle">{seg.count}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 space-y-3 border-t border-border pt-4">
        {panel.rows.map((row, i) => (
          <li key={row.label} className="flex items-center gap-2.5 text-small text-fg">
            <PulseDot tone={row.tone} delay={i * 320} />
            {row.label}
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-border pt-4 text-fine text-fg-subtle">
        {panel.footnote}
      </p>
    </div>
  );
}

/* ==========================================================================
   IconList — reads / produces
   --------------------------------------------------------------------------
   The executive question this answers is "what goes in, what do I get" — so
   each item is an icon, a short label, and nothing else.
   ========================================================================== */

export function IconList({
  items,
  emphasis = false,
  className,
}: {
  items: readonly { icon: IndoIcon; label: string; note?: string }[];
  /** Outputs carry the accent; inputs stay quiet. */
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3.5", className)}>
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li key={item.label} className="flex items-start gap-3.5">
            <span
              aria-hidden
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-control border",
                emphasis
                  ? "border-accent/40 text-accent"
                  : "border-border-strong text-fg-subtle",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 pt-1.5">
              <span className={cn("block text-body", emphasis ? "text-fg" : "text-fg-muted")}>
                {item.label}
              </span>
              {item.note ? (
                <span className="mt-0.5 block text-small text-fg-subtle">
                  {item.note}
                </span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ==========================================================================
   StageGrid — the four-stage workflow
   --------------------------------------------------------------------------
   Icon, name, one sentence. It must read correctly from those three alone.
   ========================================================================== */

export function StageGrid({
  stages,
}: {
  stages: IndoContent["workflow"]["stages"];
}) {
  return (
    <ol className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((stage) => {
        const Icon = ICONS[stage.icon];
        return (
          <li key={stage.n}>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-control border border-border-strong text-accent"
              >
                <Icon className="size-5" />
              </span>
              <span className="font-mono text-label text-fg-subtle">{stage.n}</span>
            </div>
            <h3 className="mt-4 text-heading-1 text-fg">{stage.title}</h3>
            <p className="mt-2 max-w-[36ch] text-body text-fg-muted">{stage.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

/* ==========================================================================
   TraceChain — gap analysis, one worked example
   --------------------------------------------------------------------------
   Requirement → evidence → gap → remediation → reviewer, joined by one
   continuous rail. The rail is the point: nothing on it stands alone.
   ========================================================================== */

export function TraceChain({
  nodes,
  caption,
  className,
}: {
  nodes: readonly ChainNodeContent[];
  caption: string;
  className?: string;
}) {
  return (
    <figure className={cn("max-w-[36rem]", className)}>
      <ol>
        {nodes.map((node, i) => {
          const last = i === nodes.length - 1;
          return (
            <li key={node.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
              <div aria-hidden className="flex flex-col items-center">
                <span className="flex h-6 items-center">
                  {node.accent ? (
                    <PulseDot tone="accent" size="md" halo />
                  ) : (
                    <span className="size-2 rounded-full bg-border-strong" />
                  )}
                </span>
                {!last ? <span className="w-px flex-1 bg-border-strong" /> : null}
              </div>

              <div className={cn(!last && "pb-5")}>
                <p className="text-small text-fg-subtle">{node.label}</p>
                <p className="mt-1 text-body text-fg">{node.text}</p>
                {node.meta ? (
                  <p className="mt-1.5 font-mono text-label tracking-[0.02em] text-accent">
                    {node.meta}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-5 border-t border-border pt-4 text-fine text-fg-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   RemediationTable — what a remediation plan actually looks like
   --------------------------------------------------------------------------
   Finding | severity | action | target, three illustrative rows. A real
   table from `sm` up; stacked cards below it, because four columns do not
   survive 320px.
   ========================================================================== */

export function RemediationTable({
  content,
}: {
  content: IndoContent["deliverables"]["remediation"];
}) {
  const { columns, rows, caption } = content;

  return (
    <figure>
      <div className="overflow-hidden rounded-card border border-border bg-surface-raised">
        {/* Table layout from `sm` up. */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1.5fr)_auto] gap-x-5 border-b border-border px-5 py-3">
            {[columns.finding, columns.severity, columns.action, columns.target].map(
              (col) => (
                <span
                  key={col}
                  className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle"
                >
                  {col}
                </span>
              ),
            )}
          </div>
          {rows.map((row) => (
            <div
              key={row.finding}
              className="grid grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1.5fr)_auto] items-baseline gap-x-5 border-b border-border px-5 py-3.5 last:border-b-0"
            >
              <span className="text-small text-fg">{row.finding}</span>
              <span className="flex items-center gap-2 text-small text-fg-muted">
                <span aria-hidden className={cn("size-1.5 rounded-full", TONE_FILL[row.tone])} />
                {row.severity}
              </span>
              <span className="text-small text-fg-muted">{row.action}</span>
              <span className="font-mono text-label text-fg-subtle">{row.target}</span>
            </div>
          ))}
        </div>

        {/* Stacked below `sm`. */}
        <ul className="sm:hidden">
          {rows.map((row) => (
            <li
              key={row.finding}
              className="space-y-1.5 border-b border-border p-5 last:border-b-0"
            >
              <p className="flex items-baseline justify-between gap-3">
                <span className="text-small font-medium text-fg">{row.finding}</span>
                <span className="flex shrink-0 items-center gap-2 text-small text-fg-muted">
                  <span aria-hidden className={cn("size-1.5 rounded-full", TONE_FILL[row.tone])} />
                  {row.severity}
                </span>
              </p>
              <p className="text-small text-fg-muted">{row.action}</p>
              <p className="font-mono text-label text-fg-subtle">{row.target}</p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-fine text-fg-subtle">{caption}</figcaption>
    </figure>
  );
}

/* ==========================================================================
   ReportPreview — the deliverable, as a document
   --------------------------------------------------------------------------
   A table of contents rather than a fake page: the sections a SecurePuls
   report carries, in order, ending at the reviewer's sign-off.
   ========================================================================== */

export function ReportPreview({
  content,
}: {
  content: IndoContent["deliverables"]["report"];
}) {
  return (
    <figure>
      <div className="rounded-card border border-border bg-surface-raised p-6 sm:p-7">
        <p className="border-b border-border-strong pb-4 text-heading-2 text-fg">
          {content.title}
        </p>
        <ol className="mt-4 space-y-2.5">
          {content.sections.map((section, i) => (
            <li key={section} className="flex items-baseline gap-3">
              <span className="font-mono text-label text-fg-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-fg-muted">{section}</span>
              <span aria-hidden className="mb-1 flex-1 self-end border-b border-dotted border-border" />
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-fine text-fg-subtle">
        {content.caption}
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   FlowCompare — the before / after, brutally simple
   --------------------------------------------------------------------------
   Two short vertical flows and their outcomes. The outcome lines carry the
   story; everything else is five words per step.
   ========================================================================== */

function FlowColumn({
  flow,
  emphasis,
}: {
  flow: { title: string; steps: readonly string[]; outcome: string };
  emphasis: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border p-6 sm:p-7",
        emphasis ? "border-border-strong bg-surface-raised" : "border-border",
      )}
    >
      <h3 className="text-small font-medium text-fg-subtle">{flow.title}</h3>
      <ol className="mt-5">
        {flow.steps.map((step, i) => {
          const last = i === flow.steps.length - 1;
          return (
            <li key={step} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5">
              <div aria-hidden className="flex flex-col items-center">
                <span className="flex h-5 items-center">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      emphasis ? "bg-accent" : "bg-border-strong",
                    )}
                  />
                </span>
                {!last ? <span className="w-px flex-1 bg-border" /> : null}
              </div>
              <p className={cn("text-body", last ? "pb-0" : "pb-3.5", emphasis ? "text-fg" : "text-fg-muted")}>
                {step}
              </p>
            </li>
          );
        })}
      </ol>
      <p
        className={cn(
          "mt-5 border-t pt-4 text-heading-2",
          emphasis ? "border-border-strong text-accent" : "border-border text-fg-subtle",
        )}
      >
        {flow.outcome}
      </p>
    </div>
  );
}

export function FlowCompare({
  comparison,
}: {
  comparison: IndoContent["comparison"];
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:gap-8">
      <FlowColumn flow={comparison.before} emphasis={false} />
      <FlowColumn flow={comparison.after} emphasis />
    </div>
  );
}
