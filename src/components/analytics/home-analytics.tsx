"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Homepage instrumentation, per the September 2026 review: you cannot diagnose
 * a bounce rate you cannot segment.
 *
 * Two signals, both fired at most once:
 *  - which of the two hero doors a visitor took, via delegation on any element
 *    carrying `data-analytics` (so it works with the server-rendered links and
 *    buttons without turning the page into a client component);
 *  - how far down the page they read, at 25 / 50 / 75 / 100 percent.
 *
 * Renders nothing. Analytics itself is mounted once in the root layout.
 */
export function HomeAnalytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest?.("[data-analytics]");
      const name = el?.getAttribute("data-analytics");
      if (name) track(name);
    }
    document.addEventListener("click", onClick);

    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();
    let ticking = false;

    function measure() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = (doc.scrollTop / scrollable) * 100;
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track("home_scroll_depth", { depth: t });
        }
      }
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
