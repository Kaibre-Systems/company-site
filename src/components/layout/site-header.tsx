"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/content/site";
import { KaibreWordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils";

const ALL_LINKS = [...NAV.products, ...NAV.primary];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll state via a sentinel rather than a per-frame scroll listener, and
   * written straight to a data attribute — the header's appearance is styled
   * in CSS, so there is no reason to re-render the tree on every scroll.
   */
  useEffect(() => {
    const node = sentinelRef.current;
    const header = headerRef.current;
    if (!node || !header || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        header.dataset.scrolled = entry.isIntersecting ? "false" : "true";
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /**
   * Closing on navigation is handled by the links themselves (`dismiss`)
   * rather than by reacting to `pathname`, so tapping the current page also
   * closes the panel.
   */
  const dismiss = useCallback(() => setOpen(false), []);

  /* Escape to close, with focus returned to the trigger. */
  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-20 w-px" />

      <header
        ref={headerRef}
        data-surface="ink"
        data-scrolled="false"
        data-open={open ? "true" : "false"}
        className={cn(
          // The header always carries its own ink surface. Pages that open on
          // the light surface (/contact) would otherwise render light nav text
          // on light paper — the bar has to be opaque to stay legible.
          "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-surface",
          "transition-[border-color,backdrop-filter] duration-200",
          "data-[scrolled=true]:border-border data-[scrolled=true]:bg-surface/90 data-[scrolled=true]:backdrop-blur-md",
          "data-[open=true]:border-border",
        )}
      >
        <div className="mx-auto flex h-16 max-w-shell items-center gap-6 px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 rounded-control py-2"
            aria-label={`${SITE.name} — home`}
          >
            <KaibreWordmark className="h-8 w-auto text-fg sm:h-9" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {ALL_LINKS.map((item) => {
                const active =
                  item.href.startsWith("/") &&
                  !item.href.includes("#") &&
                  pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-control px-3 py-2 text-small transition-colors duration-150",
                        active
                          ? "text-fg"
                          : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href={NAV.cta.href}
            className="ml-auto hidden min-h-10 shrink-0 items-center rounded-control bg-accent-solid px-4 text-small font-medium text-accent-contrast transition-colors duration-150 hover:bg-accent-solid-hover lg:ml-0 lg:inline-flex"
          >
            {NAV.cta.label}
          </Link>

          {/* Mobile toggle — a real button, 44px target, fully labelled. */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls={menuId}
            className="-mr-2 ml-auto inline-flex size-11 items-center justify-center rounded-control text-fg lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          id={menuId}
          ref={panelRef}
          hidden={!open}
          className="border-t border-border bg-surface lg:hidden"
        >
          <nav aria-label="Main" className="mx-auto max-w-shell px-5 py-6 sm:px-6">
            <p className="text-small font-medium text-fg-subtle">
              Products
            </p>
            <ul className="mt-3 space-y-1">
              {NAV.products.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={dismiss}
                    className="flex min-h-12 flex-col justify-center rounded-control py-2 text-fg"
                  >
                    <span className="text-heading-2">{item.label}</span>
                    <span className="text-small text-fg-subtle">{item.note}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-5 h-px border-0 bg-border" />

            <ul className="space-y-1">
              {NAV.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={dismiss}
                    className="flex min-h-12 items-center rounded-control text-heading-2 text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={NAV.cta.href}
              onClick={dismiss}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-control bg-accent-solid px-6 text-body font-medium text-accent-contrast"
            >
              {NAV.cta.label}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
