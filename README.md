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
| `pnpm smoke:prod` | Read-only checks against the live site |

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
software keyboard and toolbar collapse, `resize.mjs` walks the text-resize
matrix, `crops.mjs` and `desktop.mjs` frame the parts a full-page capture makes
too small to judge. Their output is gitignored.

## Production smoke test

```bash
pnpm smoke:prod                              # the live site
pnpm smoke:prod https://some-preview.vercel.app
```

Read-only, and deliberately so: it never submits the contact form, because a
submission reaches a real inbox. It checks what only a live deployment can
prove — routes, the apex redirect, the legacy redirects, canonical and `og:url`
on the serving host, the wordmark and hamburger at their real sizes, no
horizontal overflow, the mobile menu opening with its CTA reachable, the footer
address as the contact fallback, and no console errors or broken assets.

It also holds the claim discipline below: named certifications, endorsement
language, percentages, multiplier claims and customer counts must not appear in
visible copy. The pre-redesign site carried a panel ticking SOC2, HIPAA and
GDPR, and a kAI panel with invented plan-minute figures. This is what stops
either returning unnoticed.

## Domain

`SITE.domain` in `src/content/site.ts` is the single source for every absolute
URL — canonical tags, `og:url`, the sitemap, `robots.txt` host, and the
structured-data URL. It names **`https://www.kaibresystems.com`**, the host that
actually serves; the apex redirects to it. Two mentions of the bare domain are
deliberate and not URLs: the `utm_source` on the kAI demo link, which is an
analytics identifier whose history should not fragment, and the sign-off line in
the contact email.

## Structure

```
src/
├─ app/                    routes — all static
│  ├─ page.tsx             home
│  ├─ securepuls/          product page
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

Two surfaces, one token vocabulary. Each section declares `data-surface="ink" | "ember"`, and the semantic tokens (`--surface`, `--fg`, `--border`, `--accent`, …) resolve per surface — so `bg-surface text-fg` is correct on both without conditional classes.

Both surfaces are dark: near-black `ink`, and `ember`, a burnt orange struck from the brand hue. The alternating surface used to be a near-white sheet, and full-bleed at that size it read as a flash rather than as a change of register. The one place the two surfaces genuinely diverge is the accent — on ember the ground *is* brand orange, so the accent runs to the light end of the ramp and filled actions reverse out to white with a near-black label.

Entry fields are tokenised apart from the surface (`--field`, `--field-fg`, `--field-placeholder`, `--field-border`, `--field-border-focus`). A card and a text input want the same treatment on ink and emphatically do not on ember: a section is scenery, but a field is a target, and tinted the same as the ground it sits on its edge goes soft and the form reads as one block. On ember a field is a white sheet with near-black type.

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

### Imagery

There is none, and that is a decision rather than an omission. Every visual on
the site is CSS or hand-authored SVG: a few kilobytes, crisp at any density,
themed by the same tokens as the text, and readable by a screen reader.

The alternative was tested rather than assumed. Three candidates were generated
at 2K on the Gemini image line — two physical-security site plans and one
catalogue abstraction — in the site's own palette and register. All three were
rejected: under inspection each had malformed geometry, each was ~85% empty in
a way that would have made the sparsest pages sparser, and each restated a
sentence the copy already carries with more force. A 4MB abstract render next
to a confidential client's section also risks reading as that client's system.

If imagery is revisited, the bar is the one those candidates failed: it must
add comprehension or specificity that the vector language cannot, not
atmosphere.

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
