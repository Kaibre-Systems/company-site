"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The one manual override for the site's light/dark theme.
 *
 * Three states, cycled: System (follow the OS), Light, Dark. The choice is
 * remembered in `localStorage` and applied before first paint by the inline
 * script in the root layout, so there is no flash; this control only reflects
 * and changes it. The actual palette switch is pure CSS — every token is a
 * `light-dark()` pair gated by `color-scheme`, which `data-theme` on <html>
 * drives.
 *
 * The persisted choice is an external store, so it is read through
 * `useSyncExternalStore`: the server snapshot is always "system" (matching the
 * pre-hydration markup), the client snapshot comes from `localStorage`, and a
 * click re-reads it after writing — no state-in-effect, no hydration mismatch.
 */
type Mode = "system" | "light" | "dark";

const ORDER = ["system", "light", "dark"] as const;
const LABEL: Record<Mode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function readMode(): Mode {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private mode / blocked storage: fall through to system */
  }
  return "system";
}

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  // Cross-tab changes arrive as storage events.
  window.addEventListener("storage", callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", callback);
  };
}

function setMode(mode: Mode) {
  const el = document.documentElement;
  if (mode === "system") delete el.dataset.theme;
  else el.dataset.theme = mode;
  try {
    if (mode === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", mode);
  } catch {
    /* nothing to persist to; the attribute above still took effect */
  }
  for (const l of listeners) l();
}

export function ThemeToggle({ className }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, readMode, (): Mode => "system");
  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={`Theme: ${LABEL[mode]}. Switch to ${LABEL[next]}.`}
      title={`Theme: ${LABEL[mode]}`}
      className={cn(
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-control text-fg-muted transition-colors duration-150 hover:text-fg",
        className,
      )}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
