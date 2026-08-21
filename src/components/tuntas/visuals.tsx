import type { ComponentType, CSSProperties } from "react";
import {
  ClipboardCheck,
  FileCheck2,
  FileOutput,
  FileText,
  FolderOpen,
  GitCompareArrows,
  History,
  Layers,
  Link2,
  ListChecks,
  Scale,
  ScanSearch,
  SearchX,
  Stamp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ChainNodeContent,
  TuntasContent,
  TuntasIcon,
} from "@/content/tuntas/types";
import { PulseDot } from "@/components/visuals";
import { FindingDocument, ReportContents } from "@/components/visuals/document";

/* ==========================================================================
   Regulatory-change visual vocabulary
   --------------------------------------------------------------------------
   Everything here draws a piece of the work itself — one obligation from the
   register, the chain from a provision to a conclusion, the action centre,
   the memo to the Board — rather than a generic interface rectangle. Same grammar as the rest of the site:
   thin rules, small nodes, one accent, tokens only. Content always comes
   from the locale dictionaries, so every illustration localises with the
   page, and anything with figures carries the dictionary's "Illustrative"
   tag.
   ========================================================================== */

/** Dictionary icon keys → lucide marks, kept in one place so the content
 *  files stay plain data. */
const ICONS: Record<TuntasIcon, ComponentType<{ className?: string }>> = {
  corpus: Scale,
  policy: FileText,
  evidence: FolderOpen,
  history: History,
  /** The register's first move: the new provision beside the one it
   *  replaces. */
  assessment: GitCompareArrows,
  map: Link2,
  gap: SearchX,
  /** Two of the company's own documents disagreeing. A balance rather than a
   *  warning triangle: the product declines to pick a side, it does not
   *  raise an alarm. */
  severity: ClipboardCheck,
  remediation: ListChecks,
  report: FileOutput,
  ground: Layers,
  assess: ScanSearch,
  review: FileCheck2,
  conclude: Stamp,
};

/* ==========================================================================
   DocumentPanel — one page of the actual work product
   --------------------------------------------------------------------------
   The hero visual is one obligation from the register, for an obviously
   fictional Indonesian company: paper, a document header, and the
   requirement → what the documents show → what is still needed → reviewer
   record. It shows what Tuntas produces rather than a dashboard about it.
   The corner tag is the only illustrative marker; the accessible label
   states the fiction outright. Secondary rows drop out below the sm
   breakpoint so a phone reads three short rows, not four.
   ========================================================================== */

export function DocumentPanel({
  panel,
}: {
  panel: TuntasContent["hero"]["panel"];
}) {
  return <FindingDocument doc={panel} />;
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
  items: readonly { icon: TuntasIcon; label: string; note?: string }[];
  /** Outputs carry the accent; inputs stay quiet. */
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3 sm:space-y-3.5", className)}>
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li
            key={item.label}
            className={cn(
              "flex gap-3 sm:gap-3.5",
              emphasis ? "items-center" : "items-start",
            )}
          >
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
            <span className={cn("min-w-0", !emphasis && "pt-1.5")}>
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
   StageGrid — the workflow, stage by stage
   --------------------------------------------------------------------------
   Icon, name, one sentence. It must read correctly from those three alone.
   The track count follows the content rather than a constant: the workflow
   is five stages today and was four before it, and a hardcoded `grid-cols-4`
   silently orphaned the fifth onto a row of its own.
   ========================================================================== */

export function StageGrid({
  stages,
}: {
  stages: TuntasContent["workflow"]["stages"];
}) {
  return (
    <ol
      style={{ "--stages": stages.length } as CSSProperties}
      className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-x-7 gap-y-8 sm:mt-12 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-[repeat(var(--stages),minmax(0,1fr))]">
      {stages.map((stage) => {
        const Icon = ICONS[stage.icon];
        return (
          <li key={stage.n}>
            {/* Icon, name, one sentence — three things, no numbering row. */}
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-control border border-border-strong text-fg-muted"
            >
              <Icon className="size-5" />
            </span>
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

              <div className={cn(!last && "pb-4 sm:pb-5")}>
                <p className="text-small text-fg-subtle">{node.label}</p>
                <p className="mt-1 text-body text-fg">{node.text}</p>
                {/* Mono reference line. Quiet by default — the accented node
                    halo already marks where the meaning sits, and a page of
                    orange metadata reads as noise. */}
                <p
                  className={cn(
                    "mt-1.5 font-mono text-label tracking-[0.02em]",
                    node.accent ? "text-accent" : "text-fg-subtle",
                    !node.meta && "hidden",
                  )}
                >
                  {node.meta}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 border-t border-border pt-3.5 text-fine text-fg-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   ActionTable — the action centre, as the officer reads it
   --------------------------------------------------------------------------
   Deadline | what has to change and where | owner | state. Three
   illustrative rows, the passed deadline first, because that is the order
   the product itself puts them in. A real table from `sm` up; stacked cards
   below it, because four columns do not survive 320px.
   ========================================================================== */

export function ActionTable({
  content,
}: {
  content: TuntasContent["deliverables"]["actions"];
}) {
  const { columns, rows, title, tag } = content;

  return (
    <div>
      {/* Flat: the deliverable's own name, one small illustrative marker,
          then the table. No "extract", no caption row, no footer. */}
      <h3 className="flex items-baseline gap-3">
        <span className="text-heading-2 text-fg">{title}</span>
        <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          {tag}
        </span>
      </h3>
      <div className="mt-4 overflow-hidden rounded-card border border-border bg-surface-raised shadow-[var(--shadow-card)]">
        {/* Table layout from `sm` up — the action centre's own columns:
            deadline, what has to change and where, owner, state. */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)_minmax(0,0.8fr)_auto] gap-x-5 border-b border-border px-5 py-3">
            {[columns.when, columns.action, columns.owner, columns.state].map(
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
              key={row.when}
              className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)_minmax(0,0.8fr)_auto] items-baseline gap-x-5 border-b border-border px-5 py-3.5 last:border-b-0"
            >
              <span className="font-mono text-label text-fg">{row.when}</span>
              <span className="text-small text-fg-muted">{row.action}</span>
              <span className="text-small text-fg-muted">{row.owner}</span>
              <span className="text-small text-fg">{row.state}</span>
            </div>
          ))}
        </div>

        {/* Stacked below `sm`: the deadline leads, owner and state share a
            line. */}
        <ul className="sm:hidden">
          {rows.map((row) => (
            <li
              key={row.when}
              className="space-y-1.5 border-b border-border p-4 last:border-b-0"
            >
              <p className="font-mono text-label text-fg">{row.when}</p>
              <p className="text-small text-fg-muted">{row.action}</p>
              <p className="text-fine text-fg-subtle">
                {row.owner} {"·"} {row.state}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ==========================================================================
   ReportPreview — the deliverable, as a document
   --------------------------------------------------------------------------
   A table of contents rather than a fake page: the sections the memo to the
   Board carries, in order, ending where the decision sits.
   ========================================================================== */

export function ReportPreview({
  content,
}: {
  content: TuntasContent["deliverables"]["report"];
}) {
  /* The document explains itself: its own title, its contents, and — because
     the memo's standing is the whole question — the rows that put "your
     officer decides" inside the deliverable rather than beside it. */
  return (
    <ReportContents
      title={content.title}
      sections={content.sections}
      signoff={content.signoff}
    />
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
  note,
}: {
  flow: { title: string; steps: readonly string[]; outcome: string };
  emphasis: boolean;
  /** Rendered under the outcome in fine type — the timing qualification
   *  travels inside the card instead of occupying its own row. */
  note?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border p-5 sm:p-7",
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
              <p className={cn("text-body", last ? "pb-0" : "pb-3 sm:pb-3.5", emphasis ? "text-fg" : "text-fg-muted")}>
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
      {note ? <p className="mt-1.5 text-fine text-fg-subtle">{note}</p> : null}
    </div>
  );
}

export function FlowCompare({
  comparison,
}: {
  comparison: TuntasContent["comparison"];
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
      <FlowColumn flow={comparison.before} emphasis={false} />
      <FlowColumn flow={comparison.after} emphasis note={comparison.note} />
    </div>
  );
}
