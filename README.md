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

No mail provider is configured. The form validates client-side and then hands a pre-filled message to the visitor's mail client via `mailto:`; the address is also shown in plain text and repeated in the confirmation state.

To move to server-side delivery: post the same fields to a route handler and replace `buildMailto` in `src/components/forms/contact-form.tsx`. The markup does not need to change.

## Redirects

`/services` and `/projects` → `/work`; `/team` → `/`; `/careers` → `/contact`. Configured in `next.config.ts`. These pages existed before the redesign and may still be linked externally.

## Deployment

Vercel. Analytics and Speed Insights are mounted in the root layout; their scripts 404 in local development because Vercel injects them at the edge — that is expected and not a bug.
