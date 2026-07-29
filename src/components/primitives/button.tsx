import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-control font-sans text-body font-medium " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out " +
  "min-h-12 px-6 cursor-pointer select-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent-solid text-accent-contrast hover:bg-accent-solid-hover motion-safe:hover:-translate-y-px active:translate-y-0",
  secondary:
    "border border-border-strong text-fg hover:border-accent hover:text-fg motion-safe:hover:-translate-y-px active:translate-y-0",
  quiet: "text-fg-muted hover:text-fg px-0 min-h-0",
};

/** Internal or external action. Renders `<a>` for external, `<Link>` otherwise. */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  fullWidth = false,
  halo = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
  /** Primary actions glow by default; chrome (the navbar) does not. */
  halo?: boolean;
}) {
  const haloed = variant === "primary" && halo;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    "relative",
    fullWidth && "w-full",
    /**
     * The aura wrapper below is a flex item. In a stacked CTA group
     * (`flex-col`, so `align-items: stretch`) it is stretched to the full
     * column, while the action inside keeps its content width — which left a
     * full-bleed glow beside a button that no longer matched the secondary
     * one next to it. Growing the action into whatever width the wrapper is
     * given keeps the two the same size and the glow on the button, without
     * either of them having to know which direction the group is stacked.
     */
    haloed && "grow",
    className,
  );
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const action = external ? (
    <a
      href={href}
      className={classes}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );

  if (!haloed) return action;

  /**
   * The aura sits in a wrapper rather than inside the button.
   *
   * A negatively-stacked child of an un-stacked positioned element escapes
   * past its parent and paints behind the section background, where it is
   * invisible. Painting order does the job instead: the aura is emitted
   * first, the button after, so light shows around the edge and never over
   * the face. The button's own colour is untouched.
   */
  return (
    <span
      className={cn("relative inline-flex isolate", fullWidth && "w-full")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-control bg-accent blur-lg motion-safe:animate-[glowButton_4.5s_ease-in-out_infinite]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-control motion-safe:animate-[auraRing_4.5s_cubic-bezier(0.16,1,0.3,1)_infinite]"
      />
      {action}
    </span>
  );
}

/** Text link with a trailing arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-2 font-sans text-body text-accent",
        "underline-offset-4 hover:underline",
        // `w-fit` rather than `self-start`: these sit in groups that are
        // stacked on a phone and centred in a row on a desktop, and only the
        // stretch needs undoing. `min-h-11` makes the target 44px on touch
        // without moving the text, since the label is centred in it.
        "min-h-11 w-fit",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-150 ease-out motion-safe:group-hover/arrow:translate-x-0.5"
      />
    </Link>
  );
}
