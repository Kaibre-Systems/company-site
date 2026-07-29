import { expect, test, type Page } from "@playwright/test";

/* ==========================================================================
   Mobile end-to-end assertions
   --------------------------------------------------------------------------
   Written after a production defect on an iPhone: the hero visualisation
   reserved layout box it never drew into, and the block under it carried a
   desktop divider rhythm, so a phone showed a chart followed by a void and the
   next block landed under Safari's bottom toolbar.

   The checks below are the shape of that bug, generalised — dead space between
   consecutive blocks, boxes larger than their content, and content that a
   visitor can never reach — plus the routine mobile invariants around them.
   ========================================================================== */

const ROUTES = ["/", "/securepulse", "/kai", "/work", "/contact"] as const;

/**
 * The required matrix. `small` is Safari's *small* viewport for the device —
 * the height actually visible with the address bar and tab bar expanded, which
 * is the state a page loads in. `vh` on iOS resolves against the large
 * viewport, so the CSS viewport height is not what a visitor can see and a
 * fold check against it would pass on content sitting under the toolbar.
 */
const PHONES = [
  { name: "320x568", width: 320, height: 568, small: 460 },
  { name: "360x800", width: 360, height: 800, small: 674 },
  { name: "375x667", width: 375, height: 667, small: 553 },
  { name: "375x812", width: 375, height: 812, small: 635 },
  { name: "390x844", width: 390, height: 844, small: 659 },
  { name: "393x852", width: 393, height: 852, small: 667 },
  { name: "430x932", width: 430, height: 932, small: 747 },
] as const;

const LANDSCAPE = [
  { name: "568x320", width: 568, height: 320 },
  { name: "932x430", width: 932, height: 430 },
] as const;

/** Vercel injects these at the edge; they 404 in a local production server. */
const EXPECTED_404 = /_vercel\/(insights|speed-insights)/;

/* --------------------------------------------------------------------------
   Shared page-side helpers
   -------------------------------------------------------------------------- */

/**
 * The bottom of the last *painted* pixel inside an element, and the top of the
 * first. An empty box counts as empty and an SVG is measured by its artwork
 * rather than by the box it reserves — which is the whole point, since the
 * original defect was a box larger than its drawing.
 */
const INK_FNS = `
  const inkEdge = (el, which, contentOnly) => {
    let best = which === "bottom" ? -Infinity : Infinity;
    const take = (v) => { best = which === "bottom" ? Math.max(best, v) : Math.min(best, v); };
    const walk = (n) => {
      if (n.nodeType === 3) {
        if (!n.textContent.trim()) return;
        const r = document.createRange();
        r.selectNodeContents(n);
        for (const b of r.getClientRects()) take(which === "bottom" ? b.bottom + scrollY : b.top + scrollY);
        return;
      }
      if (n.nodeType !== 1) return;
      const cs = getComputedStyle(n);
      if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;
      if (n.tagName === "svg") {
        try {
          const bb = n.getBBox();
          const vb = n.viewBox.baseVal;
          const box = n.getBoundingClientRect();
          if (vb && vb.height) {
            const scale = box.height / vb.height;
            take(which === "bottom"
              ? box.top + scrollY + (bb.y + bb.height - vb.y) * scale
              : box.top + scrollY + (bb.y - vb.y) * scale);
            return;
          }
        } catch {}
      }
      const b = n.getBoundingClientRect();
      // \`contentOnly\` drops surface fills. Adjacent full-bleed sections are
      // contiguous coloured blocks by construction, so counting their own
      // background always reports a gap of zero and says nothing about whether
      // the *content* of one drifted away from the next.
      const paints =
        (!contentOnly && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none")) ||
        parseFloat(which === "bottom" ? cs.borderBottomWidth : cs.borderTopWidth) > 0 ||
        n.tagName === "IMG" || n.tagName === "HR";
      if (paints && b.height > 0) take(which === "bottom" ? b.bottom + scrollY : b.top + scrollY);
      for (const c of n.childNodes) walk(c);
    };
    walk(el);
    return Number.isFinite(best) ? best : null;
  };
`;

/**
 * Geometry in CSS pixels, measured inside the page.
 *
 * `locator.boundingBox()` reports screen pixels, so under a mobile device
 * profile it is multiplied by whatever page scale WebKit applied when the
 * viewport was resized away from the descriptor's own width — a 44px control
 * measures 36.5 at 320px wide and nothing is actually wrong. Every size
 * assertion below is about CSS layout, so it reads the layout directly.
 */
async function cssBox(page: Page, selector: string, text?: string) {
  return page.evaluate(
    ([sel, label]) => {
      const els = [...document.querySelectorAll(sel!)].filter(
        (el) =>
          !label ||
          (el.textContent ?? "").replace(/\s+/g, " ").trim() === label ||
          el.getAttribute("aria-label") === label,
      );
      const el = els.find((e) => (e as HTMLElement).offsetParent !== null || getComputedStyle(e).position === "fixed");
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { w: b.width, h: b.height, top: b.top, left: b.left, right: b.right, bottom: b.bottom };
    },
    [selector, text] as const,
  );
}

/**
 * Waits for the display webfont to swap in and for two frames to pass.
 *
 * Every measurement below is of where text lands, and until the font has
 * loaded, lines are laid out in the fallback — measuring before that is
 * measuring a page that no longer exists a frame later.
 */
async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

async function heroTransition(page: Page) {
  return page.evaluate(`(() => {
    ${INK_FNS}
    const svg = document.querySelector('main svg[role="img"]');
    const next = document.querySelector('main > section:first-of-type dl');
    const box = svg.getBoundingClientRect();
    const inkBottom = inkEdge(svg, "bottom");
    const nextInk = inkEdge(next, "top");
    return {
      svgBoxTop: box.top + scrollY,
      svgBoxBottom: box.bottom + scrollY,
      svgBoxHeight: box.height,
      svgInkBottom: inkBottom,
      svgSlackBelow: box.bottom + scrollY - inkBottom,
      nextInkTop: nextInk,
      deadPx: nextInk - inkBottom,
    };
  })()`) as Promise<{
    svgBoxTop: number;
    svgBoxBottom: number;
    svgBoxHeight: number;
    svgInkBottom: number;
    svgSlackBelow: number;
    nextInkTop: number;
    deadPx: number;
  }>;
}

/* ==========================================================================
   1 — The reported defect, at every required size
   ========================================================================== */

test.describe("home: hero visualisation to the block beneath it", () => {
  for (const vp of PHONES) {
    test(`no viewport-sized void at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await settle(page);
      const m = await heroTransition(page);

      // The bug, stated directly: the empty band between the last pixel the
      // chart draws and the first pixel of the block under it.
      expect(
        m.deadPx,
        `dead space between the hero chart and the modes list at ${vp.name}`,
      ).toBeLessThanOrEqual(72);

      // And its first cause: a viewBox taller than the artwork inside it, all
      // of which is scaled up with the viewport and reserved as empty box.
      expect(
        m.svgSlackBelow,
        `box the hero SVG reserves below its own artwork at ${vp.name}`,
      ).toBeLessThanOrEqual(8);

      // Nothing here may ever approach a viewport of blank.
      expect(m.deadPx).toBeLessThan(vp.small / 4);
    });
  }

  test("the modes list follows the chart, it does not float away from it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const m = await heroTransition(page);
    // Deliberate spacing: present, and smaller than the graphic it follows.
    expect(m.deadPx).toBeGreaterThan(16);
    expect(m.deadPx).toBeLessThan(m.svgBoxHeight);
  });
});

/* ==========================================================================
   2 — Layout invariants, every route, every size
   ========================================================================== */

test.describe("layout", () => {
  for (const vp of [...PHONES, ...LANDSCAPE]) {
    for (const route of ROUTES) {
      test(`${route} at ${vp.name}: no horizontal overflow, every section visible`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route);
        await settle(page);

        const m = await page.evaluate(`(() => {
          const de = document.documentElement;
          const vw = de.clientWidth;
          /**
           * What matters is an element that can widen the page, so the scan
           * skips the three things that look wide but cannot:
           *  - shapes inside an <svg>, which report their geometry rather than
           *    what the viewBox and mask paint (the hero trace is deliberately
           *    drawn two periods wide and clipped to one). The <svg> box itself
           *    is still checked;
           *  - anything a clipping ancestor cuts off, such as the decorative
           *    glow behind the product pair;
           *  - anything positioned off-canvas to the left, which is the
           *    standard idiom for the form's honeypot and never scrolls an
           *    LTR page sideways.
           * The document-width assertion below is the backstop for the rest.
           */
          const wide = [];
          for (const el of document.querySelectorAll("body *")) {
            const b = el.getBoundingClientRect();
            if (!b.width && !b.height) continue;
            if (b.right <= vw + 1) continue;
            if (getComputedStyle(el).position === "fixed") continue;
            if (el.ownerSVGElement) continue;
            let clipped = false;
            for (let a = el.parentElement; a; a = a.parentElement) {
              const cs = getComputedStyle(a);
              if (cs.overflowX !== "visible" || cs.overflowY !== "visible") { clipped = true; break; }
            }
            if (clipped) continue;
            wide.push(
              el.tagName + "." + (el.className.baseVal ?? el.className ?? "").toString().split(/\\s+/).slice(0, 2).join(".") +
              " [" + Math.round(b.left) + ".." + Math.round(b.right) + "]",
            );
          }
          const sections = [...document.querySelectorAll("main > section")].map((s) => ({
            id: s.id || null,
            h: s.getBoundingClientRect().height,
          }));
          return { docW: de.scrollWidth, clientW: de.clientWidth, wide: wide.slice(0, 5), sections };
        })()`) as {
          docW: number;
          clientW: number;
          wide: string[];
          sections: { id: string | null; h: number }[];
        };

        expect(m.wide, `elements past the right edge on ${route} @ ${vp.name}`).toEqual([]);
        expect(m.docW).toBeLessThanOrEqual(m.clientW + 1);

        expect(m.sections.length).toBeGreaterThan(0);
        for (const s of m.sections) {
          expect(s.h, `section ${s.id ?? "(unnamed)"} on ${route} @ ${vp.name}`).toBeGreaterThan(40);
        }
      });
    }
  }

  test("consecutive homepage sections do not drift apart", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const gaps = await page.evaluate(`(() => {
      ${INK_FNS}
      const sections = [...document.querySelectorAll("main > section")];
      const out = [];
      for (let i = 0; i < sections.length - 1; i++) {
        const a = inkEdge(sections[i], "bottom", true);
        const b = inkEdge(sections[i + 1], "top", true);
        out.push({ i, gap: Math.round(b - a), id: sections[i + 1].id || String(i + 1) });
      }
      return out;
    })()`) as { i: number; gap: number; id: string }[];

    for (const g of gaps) {
      expect(g.gap, `content gap before section ${g.id}`).toBeGreaterThan(0);
      // One section's bottom padding plus the next one's top padding, both at
      // the top of their clamp. Anything past that is a hole, not rhythm.
      expect(g.gap, `content gap before section ${g.id}`).toBeLessThanOrEqual(300);
    }
  });

  test("key headings and CTAs are laid out, not collapsed or detached", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    for (const name of ["Software for work that has to be right.", "Software we own and operate."]) {
      await expect(page.getByRole("heading", { name })).toBeVisible();
      const box = (await cssBox(page, "h1, h2", name))!;
      expect(box, `heading "${name}" is not laid out`).not.toBeNull();
      expect(box.h).toBeGreaterThan(0);
      expect(box.top + (await page.evaluate(() => scrollY))).toBeGreaterThanOrEqual(0);
    }
    for (const label of ["Start a conversation", "See what we've built"]) {
      await expect(page.getByRole("link", { name: label }).first()).toBeVisible();
      const box = (await cssBox(page, "main a", label))!;
      expect(box, `CTA "${label}" is not laid out`).not.toBeNull();
      expect(box.h, `CTA "${label}" height`).toBeGreaterThanOrEqual(44);
      expect(box.w).toBeGreaterThan(0);
    }
  });

  test("the fixed header stays opaque over both surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    // /contact opens on the light surface, where anything showing through the
    // bar is dark body text against the wordmark rather than more near-black.
    for (const route of ["/contact", "/"]) {
      await page.goto(route);
      for (const scroll of [0, 300]) {
        await page.evaluate((y) => scrollTo(0, y), scroll);
        await page.waitForTimeout(300);
        const bg = await page.evaluate(
          () => getComputedStyle(document.querySelector("header")!).backgroundColor,
        );
        const alpha = bg.match(/[/,]\s*([\d.]+)\s*\)$/);
        expect(
          alpha ? Number(alpha[1]) : 1,
          `header is see-through on ${route} at scrollY ${scroll} (${bg})`,
        ).toBe(1);
      }
    }
  });

  test("no fixed or sticky element permanently covers the page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const covering = await page.evaluate(`(() => {
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.position !== "fixed" && cs.position !== "sticky") continue;
        if (cs.pointerEvents === "none" || cs.visibility === "hidden" || el.hasAttribute("hidden")) continue;
        const b = el.getBoundingClientRect();
        if (b.height > innerHeight * 0.5 && b.width > innerWidth * 0.5)
          out.push(el.tagName + " " + Math.round(b.width) + "x" + Math.round(b.height));
      }
      return out;
    })()`) as string[];
    expect(covering).toEqual([]);
  });
});

/* ==========================================================================
   3 — Content a visitor must be able to reach
   ========================================================================== */

test.describe("navigation", () => {
  for (const vp of [PHONES[0], PHONES[6], LANDSCAPE[0], LANDSCAPE[1]]) {
    test(`the menu opens, fits and closes at ${vp.name}`, async ({ page }) => {
      // Portrait phones are opened at Safari's small viewport, which is the
      // height the panel actually has to fit inside.
      const height = "small" in vp ? vp.small : vp.height;
      await page.setViewportSize({ width: vp.width, height });
      await page.goto("/");

      const toggle = page.getByRole("button", { name: /open menu/i });
      const box = (await cssBox(page, "header button"))!;
      expect(box.w, "hamburger touch target").toBeGreaterThanOrEqual(44);
      expect(box.h, "hamburger touch target").toBeGreaterThanOrEqual(44);

      await toggle.tap();
      await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();

      // Page scroll is locked while the panel is up, so anything past the
      // viewport edge is unreachable unless the panel itself scrolls.
      const reach = await page.evaluate(`(async () => {
        const header = document.querySelector("header");
        const panel = header.querySelector("[id]:not([hidden])");
        const last = [...header.querySelectorAll("a")].pop();
        panel.scrollTop = panel.scrollHeight;
        await new Promise((r) => requestAnimationFrame(r));
        const b = last.getBoundingClientRect();
        return { bottom: b.bottom, top: b.top, innerH: innerHeight, label: last.textContent.trim() };
      })()`) as { bottom: number; top: number; innerH: number; label: string };

      expect(
        reach.bottom,
        `"${reach.label}" is off screen with the panel scrolled to its end at ${vp.name}`,
      ).toBeLessThanOrEqual(reach.innerH + 1);
      expect(reach.top).toBeGreaterThanOrEqual(0);

      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
      await expect(page.getByRole("button", { name: /open menu/i })).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
    });
  }

  test("in-page anchors land clear of the fixed header", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 659 });
    for (const hash of ["#products", "#commissioned", "#how-we-work", "#company"]) {
      await page.goto("/" + hash);
      await page.waitForTimeout(400);
      const m = await page.evaluate((h) => {
        const heading = document.querySelector(h)!.querySelector("h1,h2,h3")!;
        return {
          headingTop: heading.getBoundingClientRect().top,
          headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom,
        };
      }, hash);
      expect(m.headingTop, `${hash} heading sits under the header`).toBeGreaterThan(m.headerBottom);
    }
  });

  test("back and forward navigation restore each page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("link", { name: "See what we've built" }).first().tap();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: /Software for work/ })).toBeVisible();
    await page.goForward();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("removed routes still redirect", async ({ page }) => {
    for (const [from, to] of [
      ["/services", "/work"],
      ["/projects", "/work"],
      ["/team", "/"],
      ["/careers", "/contact"],
    ]) {
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`${to.replace("/", "\\/")}$`));
    }
  });
});

/* ==========================================================================
   4 — Runtime health
   ========================================================================== */

/* ==========================================================================
   Absolute URLs
   --------------------------------------------------------------------------
   Everything absolute derives from `SITE.domain`, which names the host that
   actually serves. It named the apex once, which answers 307 rather than 200,
   so every canonical pointed at a redirect.
   ========================================================================== */

const CANONICAL_ORIGIN = "https://www.kaibresystems.com";

test.describe("metadata", () => {
  for (const route of ROUTES) {
    test(`${route} declares absolute URLs on the serving host`, async ({ page }) => {
      await page.goto(route);
      const m = await page.evaluate(() => ({
        canonical: document.querySelector("link[rel=canonical]")?.getAttribute("href") ?? null,
        ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? null,
        ld: document.querySelector('script[type="application/ld+json"]')?.textContent ?? null,
      }));

      expect(m.canonical, `${route} canonical`).toBe(
        route === "/" ? CANONICAL_ORIGIN : CANONICAL_ORIGIN + route,
      );
      expect(m.ogUrl, `${route} og:url`).toContain(CANONICAL_ORIGIN);
      // The bare apex must not survive anywhere in an absolute URL.
      expect(m.canonical).not.toMatch(/https:\/\/kaibresystems\.com/);
      expect(m.ogUrl).not.toMatch(/https:\/\/kaibresystems\.com/);
      expect(m.title).toContain("Kaibre");
      expect(m.description?.length ?? 0).toBeGreaterThan(40);
      if (m.ld) expect(JSON.parse(m.ld).url).toBe(CANONICAL_ORIGIN);
    });
  }

  test("sitemap and robots use the serving host", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    for (const route of ROUTES) {
      const expected = route === "/" ? CANONICAL_ORIGIN : CANONICAL_ORIGIN + route;
      expect(xml, `sitemap missing ${route}`).toContain(`<loc>${expected}</loc>`);
    }
    expect(xml).not.toMatch(/<loc>https:\/\/kaibresystems\.com/);

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const txt = await robots.text();
    expect(txt).toContain(`${CANONICAL_ORIGIN}/sitemap.xml`);
    expect(txt).toContain(`Host: ${CANONICAL_ORIGIN}`);
    expect(txt).not.toMatch(/https:\/\/kaibresystems\.com\/sitemap/);
  });
});

test.describe("runtime", () => {
  for (const route of ROUTES) {
    test(`${route} loads with no errors and no broken local assets`, async ({ page, baseURL }) => {
      const errors: string[] = [];
      const broken: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && !EXPECTED_404.test(m.text()) && errors.push(m.text()));
      page.on("response", (r) => {
        const url = r.url();
        if (r.status() >= 400 && url.startsWith(baseURL ?? "http") && !EXPECTED_404.test(url))
          broken.push(`${r.status()} ${url}`);
      });

      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route, { waitUntil: "networkidle" });

      // A hydration mismatch surfaces as a console error, so the filter above
      // is the check — it must not be widened to swallow one.
      expect(errors.filter((e) => !/404|Failed to load resource/.test(e))).toEqual([]);
      expect(broken).toEqual([]);
    });
  }
});

/* ==========================================================================
   5 — CTAs and forms
   ========================================================================== */

test.describe("calls to action", () => {
  test("the stacked pair matches, and the glow stays on the button", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const primary = (await cssBox(page, "main a", "Start a conversation"))!;
    const secondary = (await cssBox(page, "main a", "See what we've built"))!;
    expect(Math.abs(primary.w - secondary.w), "stacked CTAs are different widths").toBeLessThanOrEqual(2);

    /**
     * The invariant is that the aura wrapper hugs the action rather than the
     * column it is stacked in — that is what went wrong, and unlike the glow's
     * own width it does not depend on where the breathing keyframe happens to
     * be when the measurement is taken.
     */
    const aura = await page.evaluate(() => {
      const a = [...document.querySelectorAll("main a")].find(
        (el) => el.textContent?.trim() === "Start a conversation",
      )!;
      const wrap = a.parentElement!;
      const glow = wrap.querySelector("span[aria-hidden]")!;
      return {
        wrap: wrap.getBoundingClientRect().width,
        btn: a.getBoundingClientRect().width,
        glow: glow.getBoundingClientRect().width,
      };
    });
    expect(aura.wrap - aura.btn, "the aura wrapper is wider than the button it wraps").toBeLessThanOrEqual(1);
    // -inset-2 either side, times the keyframe's 1.06 peak scale.
    expect(aura.glow, "the CTA glow spreads past the button").toBeLessThanOrEqual((aura.btn + 16) * 1.07);
  });

  test("orange button text stays white and legible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const c = await page.evaluate(() => {
      const a = [...document.querySelectorAll("main a")].find(
        (el) => el.textContent?.trim() === "Start a conversation",
      )!;
      const cs = getComputedStyle(a);
      return { colour: cs.color, bg: cs.backgroundColor };
    });
    // Whatever colour space the engine reports, white has no chroma and full
    // lightness; the fill must not be transparent.
    expect(c.colour.replace(/\s+/g, "")).toMatch(/^(rgb\(255,255,255\)|lab\(1000 ?0\)|color\(srgb111\)|oklch\(1 ?0 ?0\)|lab\(10 ?0\))/i);
    expect(c.bg).not.toMatch(/rgba\(0, 0, 0, 0\)/);
  });

  test("contact: validation shows without shifting or clipping the layout", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/contact");
    await page.waitForTimeout(2600); // the form's minimum time-on-page guard

    const before = await page.evaluate(() => document.documentElement.scrollWidth);
    await page.locator('textarea[name="work"]').fill("too short");
    await page.getByRole("button", { name: /send it/i }).tap();
    await expect(page.locator('[id$="-error"]').first()).toBeVisible();

    const after = await page.evaluate(() => ({
      w: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      errors: document.querySelectorAll('[id$="-error"]').length,
    }));
    expect(after.errors).toBeGreaterThan(0);
    expect(after.w).toBe(before);
    expect(after.w).toBeLessThanOrEqual(after.clientW + 1);
  });

  test("contact: the result state does not leave a reserved hole under it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route("**/api/contact", (r) => r.fulfill({ status: 200, body: "{}" }));
    await page.goto("/contact");
    await page.waitForTimeout(2600);
    await page.locator('input[name="name"]').fill("A Person");
    await page.locator('input[name="email"]').fill("a@example.com");
    await page.locator('input[name="company"]').fill("Example Ltd");
    await page
      .locator('textarea[name="work"]')
      .fill("One workflow decides what we buy and at what price, and nothing on the market fits it.");
    await page.getByRole("button", { name: /send it/i }).tap();

    const card = page.locator('[role="status"]');
    await expect(card).toBeVisible();
    const m = await page.evaluate(() => {
      const el = document.querySelector('[role="status"]')!;
      return {
        card: el.getBoundingClientRect().height,
        holder: el.parentElement!.getBoundingClientRect().height,
      };
    });
    expect(m.holder - m.card, "empty column reserved under the result card").toBeLessThanOrEqual(8);
  });

  test("contact: the mailto fallback fires when delivery fails", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route("**/api/contact", (r) => r.abort());

    /**
     * A phone hands `mailto:` to the mail app and leaves the page where it is.
     * The engines disagree on what headless does with it — WebKit navigates to
     * the URL, Chromium with no protocol handler registered does nothing — so
     * the handoff is proven by either: the mailto navigation, or the panel the
     * page leaves behind when it is not navigated away from. One of the two
     * must happen, and the pre-filled address must be reachable either way.
     */
    let mailto = "";
    page.on("framenavigated", (f) => {
      if (f.url().startsWith("mailto:")) mailto = f.url();
    });

    await page.goto("/contact");
    await page.waitForTimeout(2600);
    await page.locator('input[name="name"]').fill("A Person");
    await page.locator('input[name="email"]').fill("a@example.com");
    await page.locator('input[name="company"]').fill("Example Ltd");
    await page
      .locator('textarea[name="work"]')
      .fill("One workflow decides what we buy and at what price, and nothing on the market fits it.");
    await page.getByRole("button", { name: /send it/i }).tap();

    await page.waitForTimeout(2000);
    if (page.url().startsWith("mailto:")) mailto = page.url();

    if (mailto) {
      const url = decodeURIComponent(mailto);
      expect(url).toContain("A Person");
      expect(url).toContain("a@example.com");
      expect(url).toContain("Example Ltd");
    } else {
      // Not navigated away: the panel explaining the handoff must be up, and
      // it must carry the address in text, because a mail app that does not
      // open is silent.
      await expect(page.locator('[role="status"]')).toBeVisible();
      await expect(page.locator('[role="status"] a[href^="mailto:"]')).toBeVisible();
    }
  });

  test("contact: the address is readable even if nothing opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/contact");
    // The footer carries it on every page, so a visitor is never left with
    // nothing to copy regardless of what the form does.
    await expect(page.locator('footer a[href^="mailto:"]')).toBeVisible();
  });

  test("a focused field is not covered by the header when the keyboard opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/contact");
    await page.locator('textarea[name="work"]').tap();
    // The software keyboard takes roughly this much of a phone screen.
    await page.setViewportSize({ width: 390, height: 340 });
    await page.evaluate(() => document.activeElement?.scrollIntoView({ block: "nearest" }));
    await page.waitForTimeout(200);
    const m = await page.evaluate(() => {
      const b = document.activeElement!.getBoundingClientRect();
      return {
        top: b.top,
        bottom: b.bottom,
        headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom,
        innerH: innerHeight,
      };
    });
    expect(m.top, "the focused field is behind the fixed header").toBeGreaterThanOrEqual(m.headerBottom);
    expect(m.top).toBeLessThan(m.innerH);
  });
});

/* ==========================================================================
   6 — Touch targets and reduced motion
   ========================================================================== */

test.describe("touch and motion", () => {
  for (const route of ROUTES) {
    test(`${route}: standalone controls are at least 44px tall`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      const small = await page.evaluate(`(() => {
        const out = [];
        for (const el of document.querySelectorAll('a[href], button, select, input:not([type=hidden]), textarea')) {
          const b = el.getBoundingClientRect();
          if (!b.width || !b.height) continue;
          if (el.closest("p")) continue;          // inline links are text
          if (el.className.toString().includes("sr-only")) continue;
          if (b.left < -1000) continue;           // the honeypot
          if (b.height < 44) out.push(((el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 30)) + " " + Math.round(b.width) + "x" + Math.round(b.height));
        }
        return out;
      })()`) as string[];
      expect(small).toEqual([]);
    });
  }

  test("nothing is left hidden when animation is suppressed", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const m = await page.evaluate(() => {
      const hidden: string[] = [];
      for (const el of document.querySelectorAll("main *")) {
        const cs = getComputedStyle(el);
        if (el.hasAttribute("aria-hidden")) continue;
        if (cs.opacity === "0" || cs.visibility === "hidden") hidden.push(el.tagName);
      }
      return { hidden, height: document.documentElement.scrollHeight };
    });
    expect(m.hidden).toEqual([]);
    expect(m.height).toBeGreaterThan(1000);
    await expect(page.getByRole("heading", { name: /Software for work/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Software we own and operate." })).toBeVisible();

    // The hero chart must still occupy its box rather than collapsing when the
    // trace animation is suppressed.
    const chart = await heroTransition(page);
    expect(chart.svgBoxHeight).toBeGreaterThan(40);
    expect(chart.deadPx).toBeLessThanOrEqual(72);
  });
});
