import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChainNodeContent } from "@/content/indonesia/types";
import { PulseDot } from "@/components/visuals";

/* ==========================================================================
   TraceChain — the traceability argument, drawn
   --------------------------------------------------------------------------
   Requirement → evidence → source → finding → reviewer, joined by one
   continuous rail. The rail is the point: a visitor should see that nothing
   on it stands alone. Same visual grammar as the rest of the site — thin
   rules, small nodes, one accent, no boxes inside boxes. All content comes
   from the locale dictionary, so the illustration localises with the page.
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
              {/* The rail: a node, and the line carrying it to the next one. */}
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
   DeliverableList — the outputs, made unmistakable
   --------------------------------------------------------------------------
   The executive question this answers is "what do I actually get?", so the
   outputs carry check marks and a raised card while the inputs stay plain.
   ========================================================================== */

export function DeliverableList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
          <span className="min-w-0 text-body text-fg">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function InputList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-fg-subtle"
          />
          <span className="min-w-0 text-body text-fg-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}
