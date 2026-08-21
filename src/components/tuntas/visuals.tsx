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
  PenLine,
  Scale,
  ScanSearch,
  SearchX,
  Stamp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TuntasContent, TuntasIcon } from "@/content/tuntas/types";

/* ==========================================================================
   The page's own diagram vocabulary
   --------------------------------------------------------------------------
   What is left here is the marketing page's furniture — the reads/produces
   lists, the stages, the before/after — drawn in the same grammar as the
   rest of the site: thin rules, small nodes, tokens only, copy always from
   the locale dictionaries.

   The product's *screens* are not here. They live in `screens.tsx`, and they
   are reproductions rather than diagrams: the same blocks, labels and
   sentences the application shows. Anything that illustrates the work should
   be built there, from the application, rather than invented here.
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
  /** Tuntas writing the revision itself, rather than checking one. */
  draft: PenLine,
  report: FileOutput,
  ground: Layers,
  assess: ScanSearch,
  review: FileCheck2,
  conclude: Stamp,
};

/* ==========================================================================
   IconList — what you give it, what comes back
   --------------------------------------------------------------------------
   The executive question this answers is "what do I hand over, and what do I
   get" — so each item is an icon, a short label, and at most one line under
   it.

   The icon is centred on the *block* of text beside it, not on its first
   line. What the eye pairs the icon with is one object: a label that may wrap
   to two lines and may carry a note under it. Centring on the label alone
   leaves the icon visibly high on any row that has a note, and a hand-tuned
   top padding only lines up while the label happens to fit on one line.

   A flex row with `items-center` and the text in its own column does exactly
   that. The grid this replaces tried to span the icon across both rows, but
   `grid-row: 1 / -1` resolves against the *explicit* grid — and the rows here
   are implicit, so the span collapsed to the first row and the icon sat back
   on the label. Nothing about the rendering said so; only measuring did.
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
          <li key={item.label} className="flex items-center gap-3 sm:gap-3.5">
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
            <span className="min-w-0">
              <span
                className={cn(
                  "block text-body",
                  emphasis ? "text-fg" : "text-fg-muted",
                )}
              >
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
