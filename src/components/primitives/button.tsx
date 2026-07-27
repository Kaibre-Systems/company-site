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
  const classes = cn(
    BASE,
    VARIANTS[variant],
    variant === "primary" && "relative",
    fullWidth && "w-full",
    className,
  );
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const inner = (
    <>
      {/* Primary actions carry a slow halo — visible once, never blinking.
          The navbar action deliberately opts out via `halo={false}`. */}
      {variant === "primary" && halo ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-control bg-accent blur-lg motion-safe:animate-[glowButton_5s_ease-in-out_infinite]"
        />
      ) : null}
      {children}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
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
