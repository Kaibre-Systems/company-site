/**
 * Text-resize diagnosis and evidence.
 *
 * A visitor who raises their browser's default font size scales every `rem` in
 * the sheet, not just type — so padding, gaps, icon boxes and the logo grow with
 * the words. This walks each route at 100/150/200% and reports, for every
 * element that widens the document, the declaration responsible.
 *
 *   node qa-mobile/resize.mjs <label>
 */

import { chromium, webkit } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3100";
const LABEL = process.argv[2] ?? "resize";
const ROOT = path.resolve(import.meta.dirname, LABEL, "resize");
fs.mkdirSync(ROOT, { recursive: true });

const IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 " +
  "(KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";

const ROUTES = ["/", "/securepuls", "/kai", "/work", "/contact"];

/** The matrix the brief requires. */
const CASES = [
  { w: 320, h: 568, zoom: 100 },
  { w: 320, h: 568, zoom: 150 },
  { w: 320, h: 568, zoom: 200 },
  { w: 375, h: 812, zoom: 200 },
  { w: 390, h: 844, zoom: 200 },
  { w: 430, h: 932, zoom: 200 },
];

/**
 * Which elements widen the document, and why.
 *
 * Reports the deepest offenders only — an ancestor is wide *because* of its
 * child, and listing both buries the cause. Anything a clipping ancestor cuts
 * off, anything inside an <svg> (geometry, not paint) and anything positioned
 * off-canvas to the left cannot scroll an LTR page, so none of it counts.
 */
const PROBE = () => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const offenders = [];
  const clipped = (el) => {
    for (let a = el.parentElement; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
    }
    return false;
  };

  for (const el of document.querySelectorAll("body *")) {
    const b = el.getBoundingClientRect();
    if (!b.width || b.right <= vw + 1) continue;
    if (el.ownerSVGElement) continue;
    if (getComputedStyle(el).position === "fixed" && el.tagName !== "HEADER") continue;
    if (clipped(el)) continue;
    // sr-only text is 1px and clip-path-ed; it cannot scroll anything.
    if (el.className.toString().includes("sr-only") || el.closest(".sr-only")) continue;
    if ([...el.children].some((c) => c.getBoundingClientRect().right > vw + 1)) continue;

    const cs = getComputedStyle(el);
    offenders.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.className.baseVal ?? el.className ?? "").toString().slice(0, 76),
      text: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 34),
      right: Math.round(b.right),
      width: Math.round(b.width),
      why: {
        width: cs.width,
        minWidth: cs.minWidth,
        padding: `${cs.paddingLeft} ${cs.paddingRight}`,
        fontSize: cs.fontSize,
        whiteSpace: cs.whiteSpace,
        flexShrink: cs.flexShrink,
        display: cs.display,
      },
      /** The nearest ancestor that is a flex or grid container, and its tracks. */
      container: (() => {
        for (let a = el.parentElement; a; a = a.parentElement) {
          const cs2 = getComputedStyle(a);
          if (/flex|grid/.test(cs2.display))
            return {
              display: cs2.display,
              tracks: cs2.gridTemplateColumns,
              gap: cs2.columnGap,
              cls: (a.className ?? "").toString().slice(0, 50),
            };
        }
        return null;
      })(),
    });
  }

  const header = document.querySelector("header");
  const bar = header.querySelector("div");
  const logo = header.querySelector("svg");
  const toggle = header.querySelector("button");
  const r = (el) => {
    const b = el.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height) };
  };

  return {
    vw,
    docW: de.scrollWidth,
    overflow: de.scrollWidth - vw,
    rootFontSize: getComputedStyle(de).fontSize,
    header: {
      logo: r(logo),
      toggle: r(toggle),
      barPadding: getComputedStyle(bar).paddingLeft,
      gap: getComputedStyle(bar).columnGap,
      /** What the bar needs versus what it has. */
      needed: Math.round(
        r(logo).w + r(toggle).w + parseFloat(getComputedStyle(bar).paddingLeft) * 2,
      ),
    },
    offenders: offenders.slice(0, 8),
  };
};

/* --- operability, not just geometry -------------------------------------- */
const OPERABLE = () => {
  const q = (s) => document.querySelector(s);
  const de = document.documentElement;
  const vw = de.clientWidth;
  const box = (el) => {
    const b = el.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height), right: Math.round(b.right), top: Math.round(b.top) };
  };
  const toggle = q("header button");
  const logo = q("header svg");
  const h1 = q("h1");
  const clipping = [];

  // Text that is cut off by its own box rather than wrapped.
  for (const el of document.querySelectorAll("h1, h2, h3, p, a, button, dt, dd, li, label, span")) {
    if (el.children.length) continue;
    if (el.className.toString().includes("sr-only") || el.closest(".sr-only")) continue;
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "visible")
      clipping.push(el.tagName + ": " + (el.textContent ?? "").trim().slice(0, 30));
  }

  // Diagrams must stay inside the column that holds them.
  const diagrams = [...document.querySelectorAll('svg[role="img"], [role="img"]')].map((d) => {
    const b = d.getBoundingClientRect();
    const p = d.parentElement.getBoundingClientRect();
    return { over: Math.round(b.right - p.right), w: Math.round(b.width), parent: Math.round(p.width) };
  });

  return {
    toggle: box(toggle),
    toggleOperable: box(toggle).w >= 44 && box(toggle).h >= 44 && box(toggle).right <= vw + 1,
    logo: box(logo),
    logoVisible: box(logo).w > 40 && box(logo).right <= vw + 1,
    h1: h1 ? { ...box(h1), fontSize: getComputedStyle(h1).fontSize } : null,
    clipping: clipping.slice(0, 6),
    diagramsOutsideParent: diagrams.filter((d) => d.over > 1),
  };
};

const findings = [];
const note = (s) => {
  findings.push(s);
  console.log("  ! " + s);
};

async function run(engineName, browserType) {
  const browser = await browserType.launch();
  const dir = path.join(ROOT, engineName);
  fs.mkdirSync(dir, { recursive: true });

  for (const c of CASES) {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({
        viewport: { width: c.w, height: c.h },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: engineName === "webkit" ? IOS_UA : undefined,
      });
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      if (c.zoom !== 100)
        await page.addStyleTag({ content: `html { font-size: ${c.zoom}% }` });
      await page.waitForTimeout(300);

      const d = await page.evaluate(PROBE);
      const op = await page.evaluate(OPERABLE);
      const tag = `${engineName} ${c.w}x${c.h}@${c.zoom}% ${route}`;
      const slug = `${route === "/" ? "home" : route.slice(1)}__${c.w}x${c.h}__${c.zoom}`;

      console.log(
        `\n--- ${tag}: doc ${d.docW} vs ${d.vw} (${d.overflow > 1 ? "+" + d.overflow : "fits"})` +
          `  root ${d.rootFontSize}  logo ${d.header.logo.w}x${d.header.logo.h}  toggle ${d.header.toggle.w}x${d.header.toggle.h}` +
          `  bar needs ${d.header.needed}`,
      );

      if (d.overflow > 1) {
        note(`${tag}: document overflows by ${d.overflow}px`);
        for (const o of d.offenders)
          console.log(
            `      ${o.tag}.${o.cls}\n        "${o.text}" w=${o.width} right=${o.right} ` +
              `| ${JSON.stringify(o.why)}\n        in ${JSON.stringify(o.container)}`,
          );
      }
      if (!op.toggleOperable) note(`${tag}: menu toggle not operable ${JSON.stringify(op.toggle)}`);
      if (!op.logoVisible) note(`${tag}: wordmark not fully visible ${JSON.stringify(op.logo)}`);
      if (op.clipping.length) note(`${tag}: clipped text ${JSON.stringify(op.clipping)}`);
      if (op.diagramsOutsideParent.length)
        note(`${tag}: diagram past its container ${JSON.stringify(op.diagramsOutsideParent)}`);

      fs.writeFileSync(path.join(dir, `${slug}.json`), JSON.stringify({ ...d, op }, null, 2));
      // Full-page at 200% can exceed the engine's screenshot limit; the
      // viewport is where a horizontal-overflow problem is visible anyway.
      await page.screenshot({ path: path.join(dir, `${slug}.png`) });

      await ctx.close();
    }
  }
  await browser.close();
}

for (const e of (process.env.ENGINES ?? "webkit,chromium").split(","))
  await run(e, e === "webkit" ? webkit : chromium);

fs.writeFileSync(path.join(ROOT, "_findings.txt"), findings.join("\n") + "\n");
console.log(`\n\n===== ${findings.length} findings — ${path.join(ROOT, "_findings.txt")} =====`);
