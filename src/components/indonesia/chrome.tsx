"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { KaibreWordmark } from "@/components/brand/wordmark";
import { SecurePulseName } from "@/components/visuals";
import { PATH_BY_LOCALE } from "@/content/indonesia/locale";
import type { IndoContent } from "@/content/indonesia/types";
import { cn } from "@/lib/utils";

/**
 * Microsite header for the SecurePulse Indonesia experience.
 *
 * Deliberately simpler than the company-site header: one page, so there is no
 * menu to manage — the chrome carries the wordmark, the product identity, the
 * language toggle and the one action. Sticky rather than fixed, so it needs no
 * padding compensation and the toggle stays reachable on a long sales page.
 */
export function IndoHeader({ content }: { content: IndoContent }) {
  const { chrome, locale } = content;

  return (
    <header
      data-surface="ink"
      className="sticky top-0 z-50 border-b border-border bg-surface text-fg"
    >
      <div className="mx-auto flex h-16 max-w-shell items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={chrome.kaibreHome}
          className="inline-flex min-h-11 shrink-0 items-center rounded-control"
        >
          <KaibreWordmark className="h-7 w-auto text-fg" />
        </Link>

        {/* The product and its market, on the wordmark's own centreline: a
            hairline divider, the product name, and the market designation.
            The flag is drawn as CSS bands rather than the 🇮🇩 emoji, which
            Windows renders as the letters "ID"; the visible word "Indonesia"
            is the accessible name, so the mark itself stays decorative.
            Hidden on the narrowest screens — the wordmark and toggle already
            fill 320px. */}
        <span className="hidden items-center gap-3 sm:flex">
          <span aria-hidden className="h-6 w-px shrink-0 bg-border-strong" />
          <span className="text-body font-medium leading-none text-fg">
            <SecurePulseName animate={false} />
          </span>
          <span className="flex items-center gap-1.5 leading-none text-small text-fg-subtle">
            <IndonesiaFlag />
            {chrome.marketLabel}
          </span>
        </span>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
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
 * The Indonesian flag as two CSS bands — deterministic on every platform,
 * unlike the flag emoji, which Windows renders as the letters "ID". Sized to
 * the small-text cap height so it sits on the market label's own line.
 */
function IndonesiaFlag() {
  return (
    <span
      aria-hidden
      className="inline-flex h-3 w-[18px] shrink-0 flex-col overflow-hidden rounded-[2px] border border-border-strong"
    >
      <span className="h-1/2 bg-merah" />
      <span className="h-1/2 bg-white" />
    </span>
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
