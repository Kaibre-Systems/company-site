# Kaibre — company site

Marketing site for Kaibre Systems Ltd. Next.js 16 (App Router) + Tailwind CSS v4, statically rendered.

**Positioning:** Kaibre builds and operates software for work that has to be right.

## Running it

```bash
pnpm install
pnpm dev
```

`pnpm` is the package manager for this repository — `pnpm-lock.yaml` is authoritative and `package.json` pins the version via `packageManager`. Do not add a `package-lock.json`.

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server (Turbopack) on :3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (flat config) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test:e2e` | Mobile E2E, WebKit + Chromium (needs `pnpm build` first) |
| `pnpm test:e2e:safari` | The same suite, WebKit only |

## Mobile

`tests/mobile.spec.ts` runs every route across the phone matrix in **two
engines**. Chromium mobile emulation gets the viewport, touch flags and user
agent right and the layout engine wrong in exactly the places iOS bugs live, so
`mobile-safari` runs real WebKit — the engine Safari is built on. Nothing is
"verified on Safari" unless it ran there.

The suite starts its own production server. Run `pnpm build` first, and rebuild
before re-running: `next start` serves `.next` live, so a rebuild underneath a
running server hands out stale chunk hashes and the failures are noise.

Two things the assertions encode, because both have been real bugs:

- **Dead space is measured from ink, not from boxes.** An SVG is measured by its
  artwork rather than the box it reserves, so a `viewBox` taller than its drawing
  is caught rather than averaged away.
- **The fold is Safari's *small* viewport.** `vh` on iOS is the *large*
  viewport, so the CSS viewport height is not what a visitor can see; a fold
  check against it passes on content sitting under the toolbar.

`qa-mobile/` holds the review tooling — `audit.mjs` sweeps the matrix and writes
screenshots plus every measurement, `behaviour.mjs` covers the menu, anchors,
software keyboard and toolbar collapse, `crops.mjs` frames the parts a full-page
capture makes too small to judge. Their output is gitignored.

## Structure

```
src/
├─ app/                    routes — all static
│  ├─ page.tsx             home
│  ├─ securepulse/         product page
│  ├─ kai/                 product page
│  ├─ work/                selected work + commissioned systems
│  ├─ contact/             contact form
│  ├─ robots.ts · sitemap.ts · opengraph-image.tsx
│  └─ globals.css          the design system (tokens only)
├─ content/                ALL copy lives here, as typed objects
├─ components/
│  ├─ primitives/          Section · Container · Heading · Text · Button · Card
│  ├─ modules/             WorkflowSteps · ProductCard · FitList · Callout
│  ├─ visuals/             constructed interface illustrations
│  ├─ layout/              header · footer
│  ├─ forms/               contact form
│  └─ brand/               wordmark
└─ lib/                    utils · raw-colors
```

### Copy

Every user-facing string lives in `src/content/*.ts`. Components never contain copy. Review the words without reading JSX, and add a product without touching layout.

### Design system

Two surfaces, one token vocabulary. Each section declares `data-surface="ink" | "paper"`, and the semantic tokens (`--surface`, `--fg`, `--border`, `--accent`, …) resolve per surface — so `bg-surface text-fg` is correct on both without conditional classes.

**Components must not contain raw hex.** ESLint enforces this. The single exception is `src/lib/raw-colors.ts`, for the two contexts that cannot read CSS variables: the `themeColor` meta tag and `next/og` image generation.

`cn()` in `src/lib/utils.ts` extends `tailwind-merge` with the custom scale. Without that, `text-display-1` and `text-fg` are treated as the same class group and the type scale is silently dropped.

### Labels

There are no eyebrow labels. Small uppercase kickers above every heading added
reading load without adding information — headings carry their own meaning, and
supporting labels are sentence case at body weight.

### Typography

Three Google variable families via `next/font/google`, self-hosted at build time
(no runtime request to Google): **Space Grotesk** display, **Inter** text,
**JetBrains Mono** for labels, references and figures. `adjustFontFallback`
keeps CLS at zero. There are no local font files.

### Motion

Deliberately minimal. No scroll-triggered section entrances — content is present the moment the page paints. The only motion is the hero datum rule drawing once, plus hover/focus/expand transitions. All of it is suppressed under `prefers-reduced-motion`.

## Claim discipline

This site is written for regulated and high-value buyers. The following must never appear:

- Customer names, logos, testimonials, or case-study outcomes without written approval
- Certifications, accreditations, or regulatory endorsement (Kaibre holds none)
- Former employers as customers. The founder-background line in `COMPANY.credibility`
  refers to where the founders have worked and must never imply that those
  organisations are Kaibre clients, partners, or endorsers. No logos, ever.
- Headcount, offices, revenue, customer counts, or performance metrics
- Fabricated interface data — product illustrations show structure, never numbers
- The luxury-commerce client's identity, product category beyond "luxury goods", stack, or commercial terms

The two dollar figures on the home and work pages (US$10,000–US$500,000 per item; tens of millions catalogue) are founder-approved for publication. Interface illustrations are captioned as illustrations, structurally, via `IllustrationFrame`.

## Contact delivery

Three layers, each catching the one before it:

1. **`POST /api/contact`** sends via Resend when `RESEND_API_KEY` is set.
2. If that fails for any reason — no key, network, Resend error — the client
   hands a pre-filled message to the visitor's mail app.
3. The address is shown in plain text regardless, because a mail app that does
   not open is silent. The visitor is never left with nothing.

Copy `.env.example` to `.env.local` and set the same values in Vercel. Without a
key nothing breaks; the form simply falls through to layers 2 and 3.

Spam handling: honeypot field, minimum time-on-form, server-side validation, and
an in-memory per-IP rate limit (5/hour). No CAPTCHA.

## Redirects

`/services` and `/projects` → `/work`; `/team` → `/`; `/careers` → `/contact`. Configured in `next.config.ts`. These pages existed before the redesign and may still be linked externally.

## Deployment

Vercel. Analytics and Speed Insights are mounted in the root layout; their scripts 404 in local development because Vercel injects them at the edge — that is expected and not a bug.
