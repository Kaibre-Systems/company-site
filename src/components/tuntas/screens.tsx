import { CalendarClock, FileText, Landmark, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TuntasContent } from "@/content/tuntas/types";

/* ==========================================================================
   The product's own screens
   --------------------------------------------------------------------------
   Every panel here is a faithful reproduction of a screen in the Tuntas
   application, not an illustration inspired by one: the same blocks in the
   same order, the same labels, and the same sentences the engine actually
   wrote about a real regulation read against the demo's fictional company.
   The strings live in the locale dictionaries and are transcribed from
   `apps/regulatory-web` and its analysis snapshot; the English ones are that
   text translated, nothing more.

   That is the whole point of the section. The people this product is for
   understood the application on sight — the standard the founder set for it
   is whether a compliance officer could read it as if for the first time and
   still know what to do. A marketing page that paraphrases it into product
   language throws away the one thing already known to work, so the page shows
   the screens instead.

   Colour is the application's, and it is semantic: red where an obligation is
   not met, blue where Tuntas is asking for a document, green where the
   documents satisfy it. Nothing here is coloured for emphasis.
   ========================================================================== */

/** Status tone → the product's own pair of colours. */
const TONE = {
  gap: "border-st-gap/35 bg-st-gap-bg text-st-gap",
  supported: "border-st-supported/35 bg-st-supported-bg text-st-supported",
  partial: "border-st-partial/35 bg-st-partial-bg text-st-partial",
  info: "border-st-info/35 bg-st-info-bg text-st-info",
  na: "border-st-na/30 bg-st-na-bg text-st-na",
} as const;

export type Tone = keyof typeof TONE;

/**
 * The action chip. In the application this is the first thing on a row and
 * the answer to the register's first question — do I have to do something?
 */
export function ActionChip({
  label,
  tone,
  className,
}: {
  label: string;
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-control border px-2 py-0.5 text-fine leading-snug",
        TONE[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

/** A citation chip: the article a statement rests on, in the mono face. */
function Cite({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-control border border-border bg-surface-inset px-2 py-0.5 font-mono text-label text-fg-muted">
      <Landmark aria-hidden className="size-3 shrink-0" />
      {children}
    </span>
  );
}

/** A company-document chip. In the product it opens the document. */
function DocChip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-control border border-border bg-surface-raised px-2 py-1 text-fine text-fg-muted">
      <FileText aria-hidden className="size-3.5 shrink-0" />
      {children}
    </span>
  );
}

/** The application's small block label: mono, uppercase, quiet. */
function Label({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-label uppercase tracking-[0.085em] text-fg-subtle",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** A neutral inset inside the tinted conclusion: the state colours the
 *  conclusion, not everything under it. Straight from the product. */
function Inset({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-fg/10 bg-surface-raised/80 p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   ObligationPanel — one obligation, opened
   --------------------------------------------------------------------------
   The detail panel: obligation, the article it comes from, the rule it
   replaced, then Tuntas's conclusion with the documents it rests on, what the
   company has to do, and by when. Blocks fold away below `sm` in the order
   the product itself drops them.
   ========================================================================== */

export function ObligationPanel({
  content,
  clip,
  className,
}: {
  content: TuntasContent["screens"]["obligation"];
  /**
   * Cap the panel and fade its last inch out.
   *
   * A real obligation runs longer than any column beside it — that is part of
   * what the panel is showing — so beside body copy it is cut off rather than
   * shortened. Cutting is honest about there being more; editing it down to
   * fit would quietly turn the product's own page into a marketing summary of
   * itself, which is the one thing this panel exists to avoid.
   */
  clip?: string;
  className?: string;
}) {
  const c = content;
  return (
    <div
      data-surface="ink"
      className={cn(
        "relative flex flex-col bg-surface text-fg",
        clip && "overflow-hidden",
        clip,
        className,
      )}
    >
      {/* The panel's own header bar. */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-border px-4 py-2.5">
        <span className="whitespace-nowrap font-mono text-label text-fg-subtle">
          {c.no}
        </span>
        <ActionChip label={c.chip} tone={c.chipTone} />
      </div>

      <div className="space-y-4 px-4 py-4 sm:px-5">
        <div>
          <Label>{c.label}</Label>
          <p className="mt-1.5 font-display text-small leading-relaxed text-fg">
            {c.text}
          </p>
          <p className="mt-2">
            <Cite>{c.cite}</Cite>
          </p>
        </div>

        <div className="hidden rounded-card border border-border bg-surface-inset p-3 sm:block">
          <Label>{c.oldLabel}</Label>
          <p className="mt-1.5 text-fine leading-relaxed text-fg-muted">
            {c.oldText}
          </p>
          <p className="mt-2">
            <Cite>{c.oldCite}</Cite>
          </p>
        </div>

        {/* The conclusion, in the product's own tinted block. */}
        <div
          className={cn(
            "rounded-card border p-3.5 sm:p-4",
            TONE[c.conclusion.tone],
          )}
        >
          <p className="flex items-start gap-2 text-small font-medium">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {c.conclusion.title}
          </p>

          <div className="mt-3 text-fg">
            <Label>{c.conclusion.basisLabel}</Label>
            <ul className="mt-1.5 space-y-1.5">
              {c.conclusion.basis.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-fine leading-relaxed text-fg-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-fg-subtle"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-fine text-fg-subtle">{c.conclusion.docsLabel}</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {c.conclusion.docs.map((doc) => (
                <li key={doc}>
                  <DocChip>{doc}</DocChip>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Inset>
          <Label>{c.action.label}</Label>
          <p className="mt-1.5 text-small leading-relaxed text-fg">
            {c.action.text}
          </p>
          <p className="mt-2 text-fine text-fg-subtle">{c.action.unit}</p>
        </Inset>

        <Inset className="hidden sm:block">
          <Label>{c.deadline.label}</Label>
          <p className="mt-1.5 flex items-start gap-2 text-small leading-relaxed text-fg">
            <CalendarClock
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-fg-subtle"
            />
            {c.deadline.text}
          </p>
        </Inset>
      </div>

      <p className="mt-auto flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 font-mono text-label text-fg-subtle">
        <span>{c.mark}</span>
        <span>{c.tag}</span>
      </p>

      {clip ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface"
        />
      ) : null}
    </div>
  );
}

/* ==========================================================================
   RegulationCard — the screen a matter opens on
   --------------------------------------------------------------------------
   One regulation, what it replaces, and the three lines that decide whether
   today is the day you deal with it: how much is unreviewed, how many
   deadlines have already gone, and when the next one is.
   ========================================================================== */

export function RegulationCard({
  content,
  className,
}: {
  content: TuntasContent["screens"]["regulation"];
  className?: string;
}) {
  const c = content;
  return (
    <div
      data-surface="ink"
      className={cn(
        "rounded-card border border-border bg-surface p-5 text-fg sm:p-6",
        className,
      )}
    >
      <p className="font-mono text-label text-fg-subtle">{c.meta}</p>
      <p className="mt-2 font-display text-heading-1 font-bold leading-tight text-fg">
        {c.title}
      </p>
      <p className="mt-2.5 text-small leading-relaxed text-fg-muted">{c.replaces}</p>

      <dl className="mt-5 space-y-2 border-t border-border pt-4">
        {c.lines.map((line) => (
          <div key={line.text} className="flex items-start gap-2">
            {line.tone === "gap" ? (
              <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-st-gap" />
            ) : (
              <CalendarClock
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-fg-subtle"
              />
            )}
            <dd
              className={cn(
                "text-small",
                line.tone === "gap" ? "text-st-gap" : "text-fg",
              )}
            >
              {line.text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ==========================================================================
   RegisterStrip — the register, as it is read
   --------------------------------------------------------------------------
   A few rows of "what changed": the obligation, the article, and the one
   thing the reader wants first — whether they have to act. Grouped under the
   chapter of the regulation they come from, exactly as the product groups
   them. A table from `sm` up; stacked below it.
   ========================================================================== */

export function RegisterStrip({
  content,
  className,
}: {
  content: TuntasContent["screens"]["register"];
  className?: string;
}) {
  const { columns, chapter, rows, note } = content;
  return (
    <div
      data-surface="ink"
      className={cn(
        "overflow-hidden rounded-card border border-border bg-surface text-fg",
        className,
      )}
    >
      <div className="hidden grid-cols-[2.5rem_minmax(0,1fr)_8rem_13rem] gap-x-4 border-b border-border px-4 py-2.5 sm:grid">
        {[columns.no, columns.obligation, columns.article, columns.action].map(
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

      <p className="flex flex-wrap items-baseline gap-x-2.5 border-b border-border bg-surface-inset px-4 py-2 font-mono text-label uppercase tracking-[0.085em] text-fg-muted">
        {chapter.title}
        <span className="font-sans normal-case tracking-normal text-fg-subtle">
          {chapter.count}
        </span>
      </p>

      <ul>
        {rows.map((row) => (
          <li
            key={row.no}
            className="grid gap-x-4 gap-y-2 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[2.5rem_minmax(0,1fr)_8rem_13rem] sm:items-start"
          >
            <span className="font-mono text-label text-fg-subtle">{row.no}</span>
            <span className="text-small leading-relaxed text-fg">{row.obligation}</span>
            <span className="font-mono text-label text-fg-muted">{row.article}</span>
            <span>
              <ActionChip label={row.action} tone={row.tone} />
            </span>
          </li>
        ))}
      </ul>

      <p className="px-4 py-2.5 text-fine text-fg-subtle">{note}</p>
    </div>
  );
}

/* ==========================================================================
   MemoSheet — the memorandum, as it is printed
   --------------------------------------------------------------------------
   The first thing the product writes and the first thing the reviewer reads:
   a memorandum to the Board, addressed, dated, and opening on what the
   regulation is and what it revokes. Set in the serif, on a sheet, because
   that is what it is.
   ========================================================================== */

export function MemoSheet({
  content,
  className,
}: {
  content: TuntasContent["screens"]["memo"];
  className?: string;
}) {
  const c = content;
  return (
    <div
      data-surface="ink"
      className={cn(
        "rounded-card border border-border bg-surface p-6 text-fg shadow-[var(--shadow-card)] sm:p-8",
        className,
      )}
    >
      <p className="font-display text-heading-2 font-bold tracking-wide text-fg">
        {c.title}
      </p>

      <dl className="mt-4 space-y-1.5">
        {c.head.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 text-fine"
          >
            <dt className="text-fg-subtle">{row.label}</dt>
            <dd className="leading-relaxed text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 space-y-3 border-t border-border pt-4">
        {c.body.map((para) => (
          <p
            key={para.lead}
            className="font-display text-small leading-relaxed text-fg-muted"
          >
            <span className="font-bold text-fg">{para.lead} </span>
            {para.text}
          </p>
        ))}
      </div>

      <p className="mt-5 border-t border-border pt-3 text-fine text-fg-subtle">
        {c.footnote}
      </p>
    </div>
  );
}
