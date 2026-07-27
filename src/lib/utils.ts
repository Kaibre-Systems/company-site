import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about the custom scale, otherwise it treats
 * `text-display-1` (a size) and `text-fg` (a colour) as the same `text-*`
 * group and silently drops whichever comes first — which quietly disables the
 * whole type scale.
 */
const FONT_SIZES = [
  "display-1",
  "display-2",
  "heading-1",
  "heading-2",
  "lead",
  "body",
  "small",
  "label",
] as const;

const TEXT_COLORS = [
  "fg",
  "fg-muted",
  "fg-subtle",
  "accent",
  "accent-hover",
  "accent-contrast",
  "accent-quiet",
  "surface",
  "surface-raised",
  "surface-inset",
  "border",
  "border-strong",
  "focus",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
      "text-color": [{ text: [...TEXT_COLORS] }],
      "bg-color": [{ bg: [...TEXT_COLORS] }],
      "border-color": [{ border: [...TEXT_COLORS] }],
      rounded: [{ rounded: ["control", "card", "pill"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
