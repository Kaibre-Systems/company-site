"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { TuntasMark, TuntasWordmark } from "@/components/brand/tuntas";
import { IndonesiaFlag } from "@/components/visuals";
import { PATH_BY_LOCALE } from "@/content/tuntas/locale";
import type { TuntasContent } from "@/content/tuntas/types";
import { cn } from "@/lib/utils";

/**
 * Microsite header for the Tuntas experience.
 *
 * The mark that leads is Tuntas's, not Kaibre's. That is the split stated in
 * chrome: Tuntas is its own product with its own identity, and customer-facing
 * Tuntas material carries no parent-company endorsement lockup (product
 * direction, 17 August 2026). The route back to Kaibre is a plain link at the
 * end of the bar and an attribution line in the footer — present, named, and
 * not part of the identity.
 *
 * Deliberately simpler than the company-site header: one page, so there is no
 * menu to manage — the chrome carries the mark, the market designation, the
 * language toggle and the one action. Sticky rather than fixed, so it needs no
 * padding compensation and the toggle stays reachable on a long sales page.
 */
export function TuntasHeader({ content }: { content: TuntasContent }) {
  const { chrome, locale } = content;

  return (
    <header
      data-surface="ink"
      className="sticky top-0 z-50 border-b border-border bg-surface text-fg"
    >
      <div className="mx-auto flex h-16 max-w-shell items-center gap-4 px-5 sm:px-6 lg:px-8">
        {/* The lockup, at the geometry the identity specifies: the mark at
            1.4x cap height, half a cap height of gap, the wordmark centred on
            it. Drawn as two paths rather than assembled by hand. */}
        <Link
          href={PATH_BY_LOCALE[locale]}
          aria-label={chrome.home}
          className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-control"
        >
          <TuntasMark aria-hidden className="size-6 shrink-0 text-fg" />
          <TuntasWordmark aria-hidden className="h-[13px] w-auto text-fg" />
        </Link>

        {/* The market designation, on the wordmark's own centreline. The flag
            is drawn as CSS bands rather than the 🇮🇩 emoji, which Windows
            renders as the letters "ID"; the visible word "Indonesia" is the
            accessible name, so the mark itself stays decorative. Hidden on
            the narrowest screens — the lockup and toggle already fill
            320px. */}
        <span className="hidden items-center gap-3 sm:flex">
          <span aria-hidden className="h-6 w-px shrink-0 bg-border-strong" />
          <span className="flex items-center gap-1.5 leading-none text-small text-fg-subtle">
            <IndonesiaFlag />
            {chrome.marketLabel}
          </span>
        </span>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {/* The route back to the parent company. Quiet, and last — a
              visitor who wants it finds it, and nobody is sold to twice. */}
          <Link
            href="/"
            className="hidden min-h-11 shrink-0 items-center text-small text-fg-subtle transition-colors duration-150 hover:text-fg sm:inline-flex"
          >
            {chrome.kaibreHome}
          </Link>

          <LocaleToggle
            navLabel={chrome.toggle.navLabel}
            enLabel={chrome.toggle.en}
            idLabel={chrome.toggle.id}
            current={locale}
          />

          <a
            href={chrome.cta.href}
            className="hidden min-h-11 shrink-0 items-center rounded-control bg-accent-solid px-4 text-small font-medium text-accent-contrast transition-colors duration-150 hover:bg-accent-solid-hover md:inline-flex"
          >
            {chrome.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * EN | ID, as a segmented pair. The active locale is text, not a link — a
 * link to the page you are on is a dead control. The inactive one preserves
 * the visitor's place: if they are reading a section, the same section opens
 * in the other language.
 */
function LocaleToggle({
  navLabel,
  enLabel,
  idLabel,
  current,
}: {
  navLabel: string;
  enLabel: string;
  idLabel: string;
  current: "en" | "id";
}) {
  function follow(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = window.location.hash;
    if (!hash) return; // let the plain Link navigation run
    event.preventDefault();
    // A full navigation, deliberately: the browser scrolls to the anchor
    // natively on load (client-side router.push does not reliably), so the
    // visitor lands on the same section in the other language.
    window.location.assign(href + hash);
  }

  const segments = [
    { code: "en" as const, short: "EN", label: enLabel },
    { code: "id" as const, short: "ID", label: idLabel },
  ];

  return (
    <nav aria-label={navLabel} className="shrink-0">
      <ul className="flex items-center overflow-hidden rounded-control border border-border-strong">
        {segments.map((segment) => {
          const active = segment.code === current;
          const base =
            "inline-flex min-h-11 min-w-11 items-center justify-center px-3 font-mono text-label tracking-[0.085em]";
          return (
            <li key={segment.code} className="flex">
              {active ? (
                <span
                  aria-current="true"
                  aria-label={segment.label}
                  className={cn(base, "bg-surface-raised text-fg")}
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
