import { expect, test, type Page } from "@playwright/test";

/* ==========================================================================
   Text resizing
   --------------------------------------------------------------------------
   A visitor who raises their browser's default font size scales every `rem` in
   the sheet. Before this suite existed that meant a 40px page gutter, a 240px
   wordmark, an 88px hamburger and 96px of padding inside each button — the
   viewport was consumed by interface geometry before a word had reflowed, and
   all five routes scrolled sideways at 320px.

   The design-system position these tests hold to:
     - text scales and reflows;
     - interface geometry does not scale with it (the spacing scale is px);
     - hit targets stay >= 44px, they do not grow;
     - nothing is clipped, and the page never scrolls horizontally at 320px.
   ========================================================================== */

const ROUTES = [
  "/",
  "/securepulse",
  "/tuntas",
  "/id/tuntas",
  "/kai",
  "/work",
  "/contact",
] as const;

const CASES = [
  { w: 320, h: 568, zoom: 100 },
  { w: 320, h: 568, zoom: 150 },
  { w: 320, h: 568, zoom: 200 },
  { w: 375, h: 812, zoom: 200 },
  { w: 390, h: 844, zoom: 200 },
  { w: 430, h: 932, zoom: 200 },
] as const;

/**
 * Applies the zoom and waits for the layout to settle.
 *
 * `document.fonts.ready` is the load-bearing part. These assertions measure
 * where text lands, and the display face is a webfont — until it has swapped in,
 * lines are laid out in the fallback and every measurement is of a page that no
 * longer exists a frame later. Under a loaded machine that window is wide enough
 * to have produced a false failure once, at 320px and 150%, on a run that had
 * passed minutes earlier. The wait removes the race rather than papering over it
 * with a longer timeout.
 */
async function settle(page: Page, zoom: number) {
  if (zoom !== 100) await page.addStyleTag({ content: `html { font-size: ${zoom}% }` });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

/** Kept for call sites that read better as "set the zoom". */
const setZoom = settle;

test.describe("text resizing", () => {
  for (const c of CASES) {
    for (const route of ROUTES) {
      test(`${route} at ${c.w}x${c.h} and ${c.zoom}% text`, async ({ page }) => {
        await page.setViewportSize({ width: c.w, height: c.h });
        await page.goto(route);
        await setZoom(page, c.zoom);

        const m = await page.evaluate(`(() => {
          const de = document.documentElement;
          const vw = de.clientWidth;
          const box = (el) => { const b = el.getBoundingClientRect();
            return { w: Math.round(b.width), h: Math.round(b.height), right: Math.round(b.right), left: Math.round(b.left) }; };

          // Text painting past the viewport. An element's own rect misses this:
          // a long word overflows its block without widening the block, so the
          // text runs themselves have to be measured.
          const spilling = [];
          const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let n;
          while ((n = walk.nextNode())) {
            if (!n.textContent.trim()) continue;
            const parent = n.parentElement;
            if (parent.closest(".sr-only")) continue;
            let clipped = false;
            for (let a = parent; a; a = a.parentElement) {
              const cs = getComputedStyle(a);
              if (cs.overflowX !== "visible" || cs.overflowY !== "visible") { clipped = true; break; }
            }
            if (clipped) continue;
            const r = document.createRange();
            r.selectNodeContents(n);
            for (const b of r.getClientRects()) {
              if (b.right > vw + 1) { spilling.push(n.textContent.trim().slice(0, 40)); break; }
            }
          }

          // Text cut off by its own box rather than wrapped.
          const clippedText = [];
          for (const el of document.querySelectorAll("h1,h2,h3,p,a,button,dt,dd,li,label,span")) {
            if (el.children.length || el.closest(".sr-only")) continue;
            if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "visible")
              clippedText.push((el.textContent ?? "").trim().slice(0, 30));
          }

          // Diagrams must stay inside the column that holds them.
          const diagrams = [...document.querySelectorAll('[role="img"]')]
            .map((d) => ({
              over: Math.round(d.getBoundingClientRect().right - d.parentElement.getBoundingClientRect().right),
              label: (d.getAttribute("aria-label") ?? "").slice(0, 28),
            }))
            .filter((d) => d.over > 1);

          const h1 = document.querySelector("h1");
          // The SecurePulse Indonesia chrome has no hamburger — its operable
          // control is the language toggle link. Measure whichever exists.
          const toggleEl = document.querySelector("header button");
          const langEl = document.querySelector("header nav a");
          return {
            vw, docW: de.scrollWidth,
            rootFontSize: parseFloat(getComputedStyle(de).fontSize),
            toggle: toggleEl ? box(toggleEl) : null,
            langLink: langEl ? box(langEl) : null,
            // The brand link, not its first <svg>: the Tuntas chrome leads
            // with the square mark and the wordmark follows it, so measuring
            // one child measured a 24px glyph and called it the wordmark.
            logo: box(document.querySelector("header a")),
            h1: h1 ? { ...box(h1), fontSize: parseFloat(getComputedStyle(h1).fontSize) } : null,
            spilling: spilling.slice(0, 5), clippedText: clippedText.slice(0, 5), diagrams,
          };
        })()`) as {
          vw: number; docW: number; rootFontSize: number;
          toggle: { w: number; h: number; right: number; left: number } | null;
          langLink: { w: number; h: number; right: number; left: number } | null;
          logo: { w: number; h: number; right: number; left: number };
          h1: { w: number; h: number; right: number; fontSize: number } | null;
          spilling: string[]; clippedText: string[]; diagrams: { over: number; label: string }[];
        };

        // No horizontal page scrolling, ever.
        expect(m.docW, `document is wider than the viewport`).toBeLessThanOrEqual(m.vw + 1);
        expect(m.spilling, `text painting past the right edge`).toEqual([]);
        expect(m.clippedText, `text cut off by its own box`).toEqual([]);
        expect(m.diagrams, `diagram wider than its container`).toEqual([]);

        // Navigation stays visible and operable. The target does not need to
        // grow with the text — it does need to stay at least 44px. On the
        // Tuntas pages the operable control is the language toggle rather
        // than a hamburger.
        if (m.toggle) {
          expect(m.toggle.w, "hamburger width").toBeGreaterThanOrEqual(44);
          expect(m.toggle.h, "hamburger height").toBeGreaterThanOrEqual(44);
          expect(m.toggle.right, "hamburger off screen").toBeLessThanOrEqual(m.vw + 1);
          await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
        } else {
          expect(m.langLink, "no operable control in the header").not.toBeNull();
          expect(m.langLink!.w, "language toggle width").toBeGreaterThanOrEqual(44);
          expect(m.langLink!.h, "language toggle height").toBeGreaterThanOrEqual(44);
          expect(m.langLink!.right, "language toggle off screen").toBeLessThanOrEqual(m.vw + 1);
        }

        // The identity stays whole and recognisable rather than shrinking
        // away or growing until it crowds the bar out.
        expect(m.logo.w, "wordmark too small to read").toBeGreaterThanOrEqual(80);
        expect(m.logo.right, "wordmark off screen").toBeLessThanOrEqual(m.vw + 1);
        expect(m.logo.w, "wordmark crowding the bar").toBeLessThanOrEqual(m.vw * 0.6);

        // Text *did* scale — a fix that quietly capped the type would pass every
        // check above while failing the visitor.
        expect(m.rootFontSize).toBeCloseTo(16 * (c.zoom / 100), 1);
        if (m.h1) expect(m.h1.fontSize).toBeGreaterThan(0);

        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      });
    }
  }

  test("navigation opens and the contact form works at 200%", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    await setZoom(page, 200);

    await page.getByRole("button", { name: /open menu/i }).tap();
    await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
    const reach = await page.evaluate(`(async () => {
      const header = document.querySelector("header");
      const panel = header.querySelector("[id]:not([hidden])");
      const last = [...header.querySelectorAll("a")].pop();
      panel.scrollTop = panel.scrollHeight;
      await new Promise((r) => requestAnimationFrame(r));
      const b = last.getBoundingClientRect();
      return { bottom: b.bottom, top: b.top, innerH: innerHeight };
    })()`) as { bottom: number; top: number; innerH: number };
    expect(reach.bottom, "menu CTA unreachable at 200%").toBeLessThanOrEqual(reach.innerH + 1);
    await page.keyboard.press("Escape");

    await page.goto("/contact");
    await setZoom(page, 200);
    for (const name of ["name", "email", "company"]) {
      const field = page.locator(`input[name="${name}"]`);
      await expect(field).toBeVisible();
      const b = await page.evaluate(
        (n) => {
          const el = document.querySelector(`input[name="${n}"]`)!;
          const r = el.getBoundingClientRect();
          return { right: r.right, h: r.height };
        },
        name,
      );
      expect(b.right).toBeLessThanOrEqual(320 + 1);
      expect(b.h).toBeGreaterThanOrEqual(44);
    }

    // Validation messages must appear without widening the page.
    await page.waitForTimeout(2600);
    await page.locator('textarea[name="work"]').fill("too short");
    await page.getByRole("button", { name: /send it/i }).tap();
    await expect(page.locator('[id$="-error"]').first()).toBeVisible();
    const after = await page.evaluate(() => ({
      docW: document.documentElement.scrollWidth,
      vw: document.documentElement.clientWidth,
    }));
    expect(after.docW).toBeLessThanOrEqual(after.vw + 1);
  });

  /**
   * The contact form is a client island behind Suspense, so the server ships
   * only its fallback — the state every visitor sees before hydration, and the
   * only state a visitor with JavaScript off ever sees. That fallback carries
   * the contact address, one unbreakable run, and it sat in a grid track whose
   * `auto` minimum is min-content: at a raised font size the address set the
   * width of the column and pushed the page sideways. The hydrated form does
   * not reproduce it, so it has to be measured in this state deliberately.
   */
  test("the un-hydrated contact fallback does not widen the page", async ({ page }) => {
    // Application chunks blocked, so React never hydrates and the fallback
    // stays. JavaScript itself is left on so the harness can measure.
    await page.route("**/_next/static/chunks/**.js", (r) => r.abort());

    for (const [w, zoom] of [[320, 100], [320, 150], [320, 200], [390, 200]] as const) {
      await page.setViewportSize({ width: w, height: 568 });
      await page.goto("/contact");
      await setZoom(page, zoom);

      const m = await page.evaluate(() => {
        const de = document.documentElement;
        return {
          docW: de.scrollWidth,
          vw: de.clientWidth,
          hydrated: !!document.querySelector("form"),
          fallbackVisible: /Loading the form/.test(document.body.innerText),
          address: !!document.querySelector('a[href^="mailto:"]'),
        };
      });

      expect(m.hydrated, "the form hydrated; this test needs the fallback").toBe(false);
      expect(m.fallbackVisible, "fallback copy missing").toBe(true);
      // The address must stay reachable — it is the whole point of the fallback.
      expect(m.address, "no mailto in the fallback").toBe(true);
      expect(m.docW, `fallback overflows at ${w}px and ${zoom}%`).toBeLessThanOrEqual(m.vw + 1);
    }
  });

  test("focus outlines are not clipped at 200%", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    await setZoom(page, 200);
    const cta = page.getByRole("link", { name: "Start a conversation" }).first();
    await cta.focus();
    const m = await page.evaluate(() => {
      const el = document.activeElement!;
      const cs = getComputedStyle(el);
      const b = el.getBoundingClientRect();
      const grow = parseFloat(cs.outlineWidth) + parseFloat(cs.outlineOffset);
      let clipped = false;
      for (let a = el.parentElement; a; a = a.parentElement) {
        const cs2 = getComputedStyle(a);
        if (cs2.overflowX !== "visible" || cs2.overflowY !== "visible") { clipped = true; break; }
      }
      return { left: b.left - grow, right: b.right + grow, vw: document.documentElement.clientWidth, clipped, outline: cs.outlineWidth };
    });
    expect(parseFloat(m.outline)).toBeGreaterThan(0);
    expect(m.clipped, "focus ring sits inside a clipping ancestor").toBe(false);
    expect(m.left).toBeGreaterThanOrEqual(-1);
    expect(m.right).toBeLessThanOrEqual(m.vw + 1);
  });
});
