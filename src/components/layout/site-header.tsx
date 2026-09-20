"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/content/site";
import { EN_PATH, ID_PATH, PATH_BY_LOCALE } from "@/content/tuntas/locale";
import { KaibreWordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils";

/**
 * A nav entry that asked to be drawn with its own mark. `NAV` is `as const`,
 * so most members of the union have no `mark` at all — the `in` narrowing is
 * what lets one optional field describe a heterogeneous list.
 */
function hasMark(item: { readonly label: string }): boolean {
  return "mark" in item && item.mark === "tuntas";
}

function isActive(pathname: string, href: string): boolean {
  return href.startsWith("/") && !href.includes("#") && pathname.startsWith(href);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const productsId = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLLIElement>(null);
  const productsBtnRef = useRef<HTMLButtonElement>(null);

  const productActive = NAV.products.some((p) => isActive(pathname, p.href));

  /**
   * Tuntas is bilingual, and it now opens under this shared header rather than
   * its own. The EN | ID toggle is the one Tuntas-specific control in the bar,
   * shown only on the two Tuntas routes; everywhere else the header is
   * identical to every other page.
   */
  const onTuntas = pathname === EN_PATH || pathname === ID_PATH;
  const tuntasLocale: "en" | "id" = pathname === ID_PATH ? "id" : "en";

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

  /**
   * The desktop Products dropdown is a click panel, not a hover menu: hover
   * menus are unusable on touch and hostile to keyboards. It closes on escape
   * (focus returning to the button), on an outside pointer, and whenever the
   * route changes.
   */
  const closeProducts = useCallback((returnFocus = false) => {
    setProductsOpen(false);
    if (returnFocus) productsBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!productsOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProducts(true);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [productsOpen, closeProducts]);

  useEffect(() => {
    if (!open) return;

    /**
     * Both elements, not just `body`: iOS Safari propagates scrolling to the
     * document when only `body` is locked, so the page moved under an open
     * panel. Locking the root as well is the one form that holds everywhere.
     */
    const root = document.documentElement;
    const previous = { root: root.style.overflow, body: document.body.style.overflow };
    root.style.overflow = "hidden";
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
      root.style.overflow = previous.root;
      document.body.style.overflow = previous.body;
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
          // The header always carries its own ink surface, and it is opaque in
          // both scroll states. A frosted bar reads as intended over ink, where
          // what shows through is the same near-black; over the ember surface —
          // which is what /contact opens on — it let the section's own copy
          // ghost up beside the wordmark, and put the nav on a ground it was
          // not coloured for. A blur behind an opaque fill would only cost a
          // compositing layer, so the scrolled state is carried by its border
          // alone.
          "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-surface",
          "transition-[border-color] duration-200",
          "data-[scrolled=true]:border-border",
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
              {/* The custom offer, first and plain. */}
              <li>
                <Link
                  href={NAV.commissioned.href}
                  aria-current={
                    isActive(pathname, NAV.commissioned.href) ? "page" : undefined
                  }
                  className={cn(
                    "rounded-control px-3 py-2 text-small transition-colors duration-150",
                    isActive(pathname, NAV.commissioned.href)
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                  )}
                >
                  {NAV.commissioned.label}
                </Link>
              </li>

              {/* Products — a click panel with a line per product. Closing on
                  navigation is handled by the links themselves (below) rather
                  than by reacting to `pathname`; `onBlur` closes it when focus
                  tabs out of the panel entirely. */}
              <li
                ref={productsRef}
                className="relative"
                onBlur={(e) => {
                  if (!productsRef.current?.contains(e.relatedTarget as Node)) {
                    setProductsOpen(false);
                  }
                }}
              >
                <button
                  ref={productsBtnRef}
                  type="button"
                  onClick={() => setProductsOpen((v) => !v)}
                  aria-expanded={productsOpen}
                  aria-controls={productsId}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-control px-3 py-2 text-small transition-colors duration-150",
                    productActive || productsOpen
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                  )}
                >
                  Products
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-3.5 transition-transform duration-150",
                      productsOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id={productsId}
                  hidden={!productsOpen}
                  className="absolute left-0 top-[calc(100%+0.5rem)] z-10 w-[22rem] rounded-card border border-border bg-surface p-2 shadow-[var(--shadow-card)]"
                >
                  <ul>
                    {NAV.products.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setProductsOpen(false)}
                          aria-current={isActive(pathname, item.href) ? "page" : undefined}
                          className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-x-3 rounded-control px-3 py-3 transition-colors duration-150 hover:bg-surface-raised"
                        >
                          <span className="text-body font-medium text-fg">
                            <span
                              className={cn(
                                hasMark(item) &&
                                  "tuntas-mark whitespace-nowrap [overflow-wrap:normal]",
                              )}
                            >
                              {item.label}
                            </span>
                          </span>
                          <span className="text-small text-fg-subtle">{item.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {NAV.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-control px-3 py-2 text-small transition-colors duration-150",
                      isActive(pathname, item.href)
                        ? "text-fg"
                        : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {onTuntas ? (
            <div className="ml-auto hidden lg:ml-0 lg:block">
              <LocaleToggle current={tuntasLocale} />
            </div>
          ) : null}

          <Link
            href={NAV.cta.href}
            className={cn(
              "hidden min-h-10 shrink-0 items-center rounded-control bg-accent-solid px-4 text-small font-medium text-accent-contrast transition-colors duration-150 hover:bg-accent-solid-hover lg:inline-flex",
              onTuntas ? "lg:ml-2" : "ml-auto lg:ml-0",
            )}
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
            className="-mr-2 ml-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-control text-fg lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>
        </div>

        {/* Mobile panel.
            The panel lives inside a fixed header and page scrolling is locked
            while it is open, so anything past the viewport edge is not merely
            below the fold — it is unreachable. On a 320x568 phone, and in
            landscape on any phone, the final CTA fell past that edge. The
            panel takes whatever height is left under the bar and scrolls
            inside it, and `dvh` is correct here specifically because it should
            track Safari's toolbars as they expand and collapse. */}
        <div
          id={menuId}
          ref={panelRef}
          hidden={!open}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-surface lg:hidden"
        >
          <nav
            aria-label="Main"
            className="mx-auto max-w-shell px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-6"
          >
            {/* The custom offer leads on mobile too. */}
            <Link
              href={NAV.commissioned.href}
              onClick={dismiss}
              className="flex min-h-12 items-center rounded-control text-heading-2 text-fg"
            >
              {NAV.commissioned.label}
            </Link>

            <hr className="my-5 h-px border-0 bg-border" />

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
                    <span className="text-heading-2">
                      <span
                        className={cn(
                          hasMark(item) &&
                            "tuntas-mark whitespace-nowrap [overflow-wrap:normal]",
                        )}
                      >
                        {item.label}
                      </span>
                    </span>
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

            {onTuntas ? (
              <div className="mt-6 flex items-center gap-3">
                <span className="text-small text-fg-subtle">Language</span>
                <LocaleToggle current={tuntasLocale} />
              </div>
            ) : null}

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

/**
 * EN | ID segmented toggle for the Tuntas routes. The active locale is text,
 * not a link — a link to the page you are on is a dead control. When the
 * visitor is deep in a section, the inactive segment preserves the hash so the
 * same section opens in the other language.
 */
function LocaleToggle({ current }: { current: "en" | "id" }) {
  function follow(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = window.location.hash;
    if (!hash) return; // let the plain Link navigation run
    event.preventDefault();
    window.location.assign(href + hash);
  }

  const segments = [
    { code: "en" as const, short: "EN", label: "English" },
    { code: "id" as const, short: "ID", label: "Bahasa Indonesia" },
  ];

  return (
    <nav aria-label="Language" className="shrink-0">
      <ul className="flex items-center overflow-hidden rounded-control border border-border-strong">
        {segments.map((segment) => {
          const active = segment.code === current;
          const base =
            "inline-flex min-h-10 min-w-10 items-center justify-center px-3 font-mono text-label tracking-[0.085em]";
          return (
            <li key={segment.code} className="flex">
              {active ? (
                <span
                  aria-current="true"
                  aria-label={segment.label}
                  className={cn(base, "bg-surface-inset font-medium text-fg")}
                >
                  {segment.short}
                </span>
              ) : (
                <Link
                  href={PATH_BY_LOCALE[segment.code]}
                  aria-label={segment.label}
                  onClick={(e) => follow(e, PATH_BY_LOCALE[segment.code])}
                  className={cn(
                    base,
                    "text-fg-muted transition-colors duration-150 hover:text-fg",
                  )}
                >
                  {segment.short}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
