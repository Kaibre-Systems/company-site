import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { withBrand } from "@/components/visuals";

/* ==========================================================================
   Layout primitives
   ========================================================================== */

type Surface = "ink" | "paper";

interface SectionProps {
  children: ReactNode;
  /** Which surface tokens apply inside. Drives colour, borders and shadows. */
  surface?: Surface;
  id?: string;
  /** Vertical rhythm. `tight` is for supporting sections, `flush` removes it. */
  space?: "default" | "tight" | "flush";
  className?: string;
  /** Accessible name, when the section has no visible heading. */
  label?: string;
}

/**
 * A page section. Renders `<section>` — never `<main>`, so landmark nesting
 * cannot regress.
 */
export function Section({
  children,
  surface = "ink",
  id,
  space = "default",
  className,
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-label={label}
      className={cn(
        "bg-surface text-fg",
        space === "default" && "py-[clamp(4.5rem,10vh,8rem)]",
        space === "tight" && "py-[clamp(3rem,6vh,4.5rem)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Page gutter. `size` narrows the *reading measure* while keeping the page
 * gutter and left edge aligned with every other section — centring a narrow
 * column inside the shell reads as a mistake next to left-aligned neighbours.
 */
export function Container({
  children,
  size = "shell",
  className,
}: {
  children: ReactNode;
  size?: "shell" | "prose" | "narrow";
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-5 sm:px-6 lg:px-8", className)}>
      <div
        className={cn(
          size === "prose" && "max-w-prose",
          size === "narrow" && "max-w-narrow",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ==========================================================================
   Typography primitives
   ========================================================================== */

/**
 * Heading with semantic level and visual size decoupled, so heading order is
 * always correct regardless of how large the text needs to look.
 */
export function Heading({
  children,
  level = 2,
  size = "display-2",
  className,
  id,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: "display-1" | "display-2" | "heading-1" | "heading-2";
  className?: string;
  id?: string;
}) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      id={id}
      className={cn(
        size === "display-1" && "text-display-1",
        size === "display-2" && "text-display-2",
        size === "heading-1" && "text-heading-1",
        size === "heading-2" && "text-heading-2",
        "text-fg",
        className,
      )}
    >
      {typeof children === "string" ? withBrand(children) : children}
    </Tag>
  );
}

export function Text({
  children,
  size = "body",
  tone = "muted",
  className,
}: {
  children: ReactNode;
  size?: "lead" | "body" | "small";
  tone?: "default" | "muted" | "subtle";
  className?: string;
}) {
  return (
    <p
      className={cn(
        size === "lead" && "text-lead",
        size === "body" && "text-body",
        size === "small" && "text-small",
        tone === "default" && "text-fg",
        tone === "muted" && "text-fg-muted",
        tone === "subtle" && "text-fg-subtle",
        className,
      )}
    >
      {typeof children === "string" ? withBrand(children) : children}
    </p>
  );
}

/** Stacked paragraphs at a readable measure. */
export function Prose({
  paragraphs,
  size = "lead",
  className,
}: {
  paragraphs: readonly string[];
  size?: "lead" | "body";
  className?: string;
}) {
  return (
    <div className={cn("max-w-prose space-y-4", className)}>
      {paragraphs.map((p) => (
        <Text key={p} size={size}>
          {p}
        </Text>
      ))}
    </div>
  );
}

/** Section header: heading + optional lead copy. No kicker labels — the
 *  heading carries the meaning on its own. */
export function SectionHeader({
  heading,
  headingLevel = 2,
  headingSize = "display-2",
  body,
  className,
  id,
}: {
  heading: string;
  headingLevel?: 1 | 2 | 3;
  headingSize?: "display-1" | "display-2" | "heading-1";
  body?: string | readonly string[];
  className?: string;
  id?: string;
}) {
  const paragraphs = typeof body === "string" ? [body] : body;
  return (
    <div className={cn("max-w-[46rem]", className)}>
      <Heading level={headingLevel} size={headingSize} id={id}>
        {heading}
      </Heading>
      {paragraphs?.length ? (
        <Prose paragraphs={paragraphs} className="mt-6" />
      ) : null}
    </div>
  );
}

/**
 * A qualifying aside — scope limits, confidentiality notes, the small print
 * that narrows a claim. One treatment everywhere: a left rule, fine type,
 * indented off the main column so the eye can skip it or find it deliberately.
 */
export function Note({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-[62ch] border-l-2 border-border-strong pl-5 text-fine text-fg-subtle",
        className,
      )}
    >
      {typeof children === "string" ? withBrand(children) : children}
    </p>
  );
}

/** Hairline divider. Decorative by default. */
export function Rule({ className }: { className?: string }) {
  return <hr aria-hidden className={cn("border-0 h-px bg-border", className)} />;
}

/* ==========================================================================
   Card
   ========================================================================== */

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface-raised",
        interactive &&
          "transition-[border-color,transform] duration-150 ease-out group-hover:border-accent group-focus-visible:border-accent motion-safe:group-hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
