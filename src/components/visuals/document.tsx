import { cn } from "@/lib/utils";

/* ==========================================================================
   Document artifacts — the SecurePulse work product, on paper
   --------------------------------------------------------------------------
   Everything here is an excerpt of the report the product actually produces,
   structured after the real deliverable: a severity-headed detailed finding,
   a table of contents, a severity scorecard, a sign-off block. They are the
   product's own grammar, so they carry the argument a generic interface
   panel cannot: this is what your team receives.

   All content arrives as props — the components never invent copy, and any
   panel carrying figures is tagged "Illustrative" by its content.
   ========================================================================== */

export interface FindingDocumentContent {
  /** The one illustrative marker, set where a classification would sit. */
  tag: string;
  institution: string;
  title: string;
  /** Version and standing line, in the report's voice. */
  docMeta: string;
  finding: {
    id: string;
    severity: string;
    title: string;
    /** Category · points line, in the report's own scoring vocabulary. */
    meta: string;
  };
  /** Run-in paragraphs, exactly as the report writes a finding:
   *  "What we observed: …". `secondary` items fold away on phones. */
  body: readonly { label: string; text: string; secondary?: boolean }[];
  /** The document's own footer — section name and page position. */
  pageLine: string;
}

/**
 * One page of the actual work product: paper, a document header, and a
 * detailed finding in the report's own anatomy. Rendered inside a
 * `VisualFrame`, which carries the accessible description.
 *
 * `compact` is the product-card excerpt: the context line, the
 * severity-headed finding, and the reviewer state — the material without
 * the document's own subtitle, version line or scoring metadata, so the
 * card reads in a glance and the product page keeps the full page to
 * itself.
 */
export function FindingDocument({
  doc,
  compact = false,
}: {
  doc: FindingDocumentContent;
  compact?: boolean;
}) {
  const rows = compact ? doc.body.slice(-1) : doc.body;
  return (
    <div className="bg-cream-50 p-5 text-ink-950 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b-2 border-ink-950/80 pb-3">
        <div className="min-w-0">
          <p className="font-mono text-label uppercase tracking-[0.085em] text-ink-600">
            {doc.institution}
          </p>
          {!compact ? (
            <>
              <p className="mt-1 font-display text-body font-bold">{doc.title}</p>
              <p className="mt-0.5 hidden font-mono text-label text-ink-500 sm:block">
                {doc.docMeta}
              </p>
            </>
          ) : null}
        </div>
        <p className="shrink-0 font-mono text-label uppercase tracking-[0.085em] text-ink-500">
          {doc.tag}
        </p>
      </div>

      <div className="border-b border-ink-200 py-3">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="font-mono text-label tracking-[0.085em] text-ink-600">
            {doc.finding.id}
          </span>
          <span aria-hidden className="size-1.5 rounded-full bg-brand-700" />
          <span className="font-mono text-label uppercase tracking-[0.085em] text-brand-700">
            {doc.finding.severity}
          </span>
          {!compact ? (
            <span className="hidden font-mono text-label text-ink-500 sm:inline">
              {doc.finding.meta}
            </span>
          ) : null}
        </p>
        <p className="mt-1.5 font-display text-small font-bold leading-snug">
          {doc.finding.title}
        </p>
      </div>

      <div className="space-y-2.5 pt-3">
        {rows.map((item) => (
          <p
            key={item.label}
            className={cn(
              "text-fine leading-relaxed text-ink-700",
              item.secondary && "hidden sm:block",
            )}
          >
            <strong className="font-medium text-ink-950">{item.label}: </strong>
            {item.text}
          </p>
        ))}
      </div>

      <p className="mt-4 flex items-center justify-between border-t border-ink-200 pt-2.5 font-mono text-label text-ink-500">
        <span className="hidden sm:inline">SecurePulse</span>
        <span>{doc.pageLine}</span>
      </p>
    </div>
  );
}

/**
 * The deliverable as a document: its own title, then its contents in order,
 * ending wherever the content ends — for SecurePulse that is always the
 * sign-off. Optional attestation rows put the review posture *inside* the
 * document instead of beside it.
 */
export function ReportContents({
  title,
  sections,
  signoff,
  className,
}: {
  title: string;
  sections: readonly string[];
  /** Role → state rows, in document-control grammar. */
  signoff?: {
    heading: string;
    rows: readonly { role: string; state: string }[];
  };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface-raised p-5 shadow-[var(--shadow-card)] sm:p-7",
        className,
      )}
    >
      <p className="border-b border-border-strong pb-3.5 text-heading-2 text-fg sm:pb-4">
        {title}
      </p>
      <ol className="mt-4 space-y-2.5">
        {sections.map((section, i) => (
          <li key={section} className="flex items-baseline gap-3">
            <span className="font-mono text-label text-fg-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* `min-w-0` zeroes the flex floor: at a 200% default font size on
                a 320px screen, "Recommendations" alone is wider than the row,
                and without the zero it sets the row's width instead of
                breaking. */}
            <span className="min-w-0 text-body text-fg-muted">{section}</span>
            <span
              aria-hidden
              className="mb-1 flex-1 self-end border-b border-dotted border-border"
            />
          </li>
        ))}
      </ol>

      {signoff ? (
        <div className="mt-5 border-t border-border-strong pt-4">
          <p className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
            {signoff.heading}
          </p>
          {/* Wrapping flex rather than a two-column grid: at a raised default
              font size the state ("Your compliance lead") is wider than the
              card and a rigid column would squeeze the role into vertical
              rubble — wrapped, it simply takes its own line. */}
          <dl className="mt-3 space-y-2">
            {signoff.rows.map((row) => (
              <div
                key={row.role}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
              >
                <dt className="text-small text-fg-muted">{row.role}</dt>
                <dd className="text-small text-fg">{row.state}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The assessment summary a report opens with: severity rows and their counts.
 * The counts are illustrative and the content says so; the shape is the
 * point — after everything is assessed, leadership receives a scorecard,
 * not a pile of prose.
 */
export function RiskScorecard({
  title,
  tag,
  columns,
  rows,
  totals,
  className,
}: {
  title: string;
  tag: string;
  columns: { severity: string; count: string };
  rows: readonly { severity: string; count: string; accent?: boolean }[];
  totals?: { label: string; value: string };
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="flex items-baseline gap-3">
        <span className="text-heading-2 text-fg">{title}</span>
        <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          {tag}
        </span>
      </h3>
      <div className="mt-4 overflow-hidden rounded-card border border-border bg-surface-raised shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 border-b border-border px-5 py-3">
          <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
            {columns.severity}
          </span>
          <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
            {columns.count}
          </span>
        </div>
        {rows.map((row) => (
          <div
            key={row.severity}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 border-b border-border px-5 py-2.5 last:border-b-0"
          >
            <span
              className={cn(
                "text-small",
                row.accent ? "font-medium text-accent" : "text-fg-muted",
              )}
            >
              {row.severity}
            </span>
            <span className="font-mono text-small text-fg">{row.count}</span>
          </div>
        ))}
        {totals ? (
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 border-t border-border-strong px-5 py-2.5">
            <span className="text-small font-medium text-fg">{totals.label}</span>
            <span className="font-mono text-small text-fg">{totals.value}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ==========================================================================
   RequirementMap — compliance-mapping grammar, three rows
   --------------------------------------------------------------------------
   The report maps every requirement to an authority, an evidence label, its
   applicability, and a priority. Three rows are enough to show the
   discipline: one confirmed, one partial, one honest gap — escalated, never
   assumed. A table from `sm` up; stacked below it.
   ========================================================================== */

export interface RequirementMapContent {
  title: string;
  tag: string;
  columns: { requirement: string; evidence: string; status: string; priority: string };
  rows: readonly {
    requirement: string;
    evidence: string;
    status: string;
    priority: string;
  }[];
}

export function RequirementMap({
  content,
  className,
}: {
  content: RequirementMapContent;
  className?: string;
}) {
  const { title, tag, columns, rows } = content;
  return (
    <div className={className}>
      <h3 className="flex items-baseline gap-3">
        <span className="text-heading-2 text-fg">{title}</span>
        <span className="font-mono text-label uppercase tracking-[0.085em] text-fg-subtle">
          {tag}
        </span>
      </h3>
      <div className="mt-4 overflow-hidden rounded-card border border-border bg-surface-raised shadow-[var(--shadow-card)]">
        <div className="hidden sm:block">
          <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,1.3fr)_auto] gap-x-5 border-b border-border px-5 py-3">
            {[columns.requirement, columns.evidence, columns.status, columns.priority].map(
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
              key={row.requirement}
              className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,1.3fr)_auto] items-baseline gap-x-5 border-b border-border px-5 py-3.5 last:border-b-0"
            >
              <span className="text-small text-fg">{row.requirement}</span>
              <span className="font-mono text-label uppercase tracking-[0.085em] text-accent">
                {row.evidence}
              </span>
              <span className="text-small text-fg-muted">{row.status}</span>
              <span className="text-small text-fg">{row.priority}</span>
            </div>
          ))}
        </div>

        {/* Stacked below `sm`: requirement leads, evidence label and priority
            share the meta line, status follows. */}
        <ul className="sm:hidden">
          {rows.map((row) => (
            <li
              key={row.requirement}
              className="space-y-1.5 border-b border-border p-4 last:border-b-0"
            >
              <p className="text-small text-fg">{row.requirement}</p>
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-label uppercase tracking-[0.085em] text-accent">
                  {row.evidence}
                </span>
                <span className="text-fine text-fg-subtle">{row.priority}</span>
              </p>
              <p className="text-fine text-fg-muted">{row.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
