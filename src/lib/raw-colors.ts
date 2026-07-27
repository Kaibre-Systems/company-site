/**
 * Literal colour values — the ONLY file in `src/` permitted to contain hex.
 *
 * A handful of contexts cannot read CSS custom properties:
 *   - `viewport.themeColor`, which the browser reads from a meta tag
 *   - `next/og` images, rendered by Satori with no CSS variable resolution
 *
 * These mirror the tokens in `globals.css`. If a token changes there, change
 * it here too. Everything else in the codebase must use the semantic tokens
 * (`bg-surface`, `text-fg`, `border-border`, `text-accent`, ...), which the
 * `no-restricted-syntax` lint rule enforces.
 */
export const RAW = {
  /** --color-ink-950 */
  ink950: "#0B0A08",
  /** --color-ink-100 */
  ink100: "#F0EEEB",
  /** --color-ink-400, muted text on ink */
  ink400: "#A8A29B",
  /** --color-brand-500 */
  brand500: "#D4531A",
} as const;
