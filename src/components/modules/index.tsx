import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { Heading, Text } from "@/components/primitives";
import { SecurePulsName } from "@/components/visuals";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Numbered workflow
   ========================================================================== */

export interface Step {
  n: string;
  title: string;
  body: string;
}

export function WorkflowSteps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <li key={step.n}>
          <p className="text-small font-medium text-accent">{step.n}</p>
          <Heading level={3} size="heading-1" className="mt-3">
            {step.title}
          </Heading>
          <Text className="mt-3 max-w-[40ch]">{step.body}</Text>
        </li>
      ))}
    </ol>
  );
}

/* ==========================================================================
   Fit / not-fit definition lists
   ========================================================================== */

export function FitList({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "yes" | "no";
}) {
  const Icon = tone === "yes" ? Check : Minus;
  return (
    <div>
      <h3 className="text-small font-medium text-fg-subtle">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon
              aria-hidden
              className={cn(
                "mt-1 size-4 shrink-0",
                tone === "yes" ? "text-success" : "text-fg-subtle",
              )}
            />
            <span className="text-body text-fg-muted">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   Product card
   ========================================================================== */

export function ProductCard({
  name,
  category,
  headline,
  body,
  href,
  visual,
  className,
}: {
  name: string;
  category: string;
  headline: string;
  body: string;
  href: string;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group block", className)}>
      {/* No outer card. The visual inside carries the only border on the item,
          so the eye counts one edge instead of two. */}
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            {/* The product name is the thing being introduced, so it is the
                largest type here — the tagline supports it, not the reverse. */}
            <h3 className="text-heading-1 font-medium text-fg">
              {name === "SecurePuls" ? <SecurePulsName animate /> : name}
            </h3>
            <p className="mt-1 text-small text-fg-subtle">{category}</p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-5 shrink-0 text-fg-subtle transition-[color,transform] duration-150 group-hover:text-accent motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          />
        </div>

        <p className="mt-6 text-lead font-medium text-fg">{headline}</p>
        <Text size="small" className="mt-3 max-w-prose">
          {body}
        </Text>

        {visual ? <div className="mt-8 grow">{visual}</div> : null}
      </div>
    </Link>
  );
}

/* ==========================================================================
   Callout — used for the human-review posture and confidentiality notes
   ========================================================================== */

export function Callout({
  heading,
  children,
  className,
}: {
  heading?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface-raised p-7 sm:p-9",
        className,
      )}
    >
      {heading ? (
        <Heading level={2} size="heading-1">
          {heading}
        </Heading>
      ) : null}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
