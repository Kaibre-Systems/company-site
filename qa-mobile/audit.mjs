/**
 * Mobile visual-QA sweep.
 *
 * Not the test suite — `tests/mobile.spec.ts` holds the assertions that gate a
 * commit. This walks every route at every phone size in both engines, writes
 * screenshots for human review, and prints every measurement the assertions are
 * derived from, so a regression can be read rather than inferred from a failure.
 *
 *   node qa-mobile/audit.mjs <label>          # both engines
 *   ENGINES=webkit node qa-mobile/audit.mjs x # one engine
 */

import { chromium, webkit } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3100";
const LABEL = process.argv[2] ?? "run";
const ROOT = path.resolve(import.meta.dirname, LABEL);

/** iOS 18 Safari. Only the UA string — the engine underneath is real WebKit. */
const IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 " +
  "(KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";

const PORTRAIT = [
  { name: "320x568", width: 320, height: 568, note: "iPhone SE 1" },
  { name: "360x800", width: 360, height: 800, note: "Android common" },
  { name: "375x667", width: 375, height: 667, note: "iPhone SE 2/3" },
  { name: "375x812", width: 375, height: 812, note: "iPhone X/11 Pro/13 mini" },
  { name: "390x844", width: 390, height: 844, note: "iPhone 12/13/14" },
  { name: "393x852", width: 393, height: 852, note: "iPhone 15/16 Pro" },
  { name: "430x932", width: 430, height: 932, note: "iPhone 15/16 Pro Max" },
];

const LANDSCAPE = [
  { name: "568x320", width: 568, height: 320, note: "small phone landscape" },
  { name: "932x430", width: 932, height: 430, note: "large phone landscape" },
];

const ROUTES = ["/", "/securepuls", "/kai", "/work", "/contact"];

/**
 * Safari's *small* viewport per device — the height actually visible with the
 * address bar and tab bar expanded, which is the state a page loads in. `vh`
 * on iOS is the large viewport, so the CSS viewport height is not what the
 * visitor can see, and a check against it would pass on content sitting under
 * the toolbar. These are the heights the fold checks below use.
 */
const SMALL_VIEWPORT = {
  "320x568": 460,
  "360x800": 674,
  "375x667": 553,
  "375x812": 635,
  "390x844": 659,
  "393x852": 667,
  "430x932": 747,
  "568x320": 320,
  "932x430": 430,
};

/* -------------------------------------------------------------------------
   Page probe. Runs in the page; returns everything the audit reports on.
   ------------------------------------------------------------------------- */

const PROBE = () => {
  const de = document.documentElement;
  const rect = (el) => {
    const b = el.getBoundingClientRect();
    return {
      top: Math.round((b.top + scrollY) * 100) / 100,
      bottom: Math.round((b.bottom + scrollY) * 100) / 100,
      left: Math.round(b.left * 100) / 100,
      right: Math.round(b.right * 100) / 100,
      w: Math.round(b.width * 100) / 100,
      h: Math.round(b.height * 100) / 100,
    };
  };

  /* --- horizontal overflow: which elements actually stick out ------------ */
  const vw = de.clientWidth;
  const overflowing = [];
  for (const el of document.querySelectorAll("body *")) {
    const b = el.getBoundingClientRect();
    if (b.width === 0 && b.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.position === "fixed") continue;
    if (b.right > vw + 1 || b.left < -1) {
      overflowing.push({
        sel:
          el.tagName.toLowerCase() +
          (el.id ? "#" + el.id : "") +
          "." + (el.className.baseVal ?? el.className ?? "").toString().split(/\s+/).slice(0, 3).join("."),
        left: Math.round(b.left),
        right: Math.round(b.right),
      });
    }
  }

  /* --- sections and the gaps between them -------------------------------- */
  const sections = [...document.querySelectorAll("main > section")].map((s, i) => ({
    i,
    id: s.id || null,
    surface: s.dataset.surface,
    heading: (s.querySelector("h1,h2,h3")?.textContent ?? "").trim().slice(0, 48),
    rect: rect(s),
  }));

  /**
   * Dead space between two blocks: the distance from the last *painted* pixel
   * above to the first painted pixel below. An empty box counts as empty, and
   * an SVG is measured by its artwork, not by the box it reserves.
   */
  const paintedBottom = (el) => {
    let max = -Infinity;
    const walk = (n) => {
      if (n.nodeType === 3) {
        if (n.textContent.trim()) {
          const r = document.createRange();
          r.selectNodeContents(n);
          for (const b of r.getClientRects()) max = Math.max(max, b.bottom + scrollY);
        }
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
            max = Math.max(max, box.top + scrollY + (bb.y + bb.height - vb.y) * scale);
            return;
          }
        } catch {}
      }
      const b = n.getBoundingClientRect();
      const painted =
        cs.backgroundColor !== "rgba(0, 0, 0, 0)" ||
        cs.backgroundImage !== "none" ||
        parseFloat(cs.borderBottomWidth) > 0 ||
        n.tagName === "IMG" ||
        n.tagName === "HR";
      if (painted && b.height > 0) max = Math.max(max, b.bottom + scrollY);
      for (const c of n.childNodes) walk(c);
    };
    walk(el);
    return max === -Infinity ? null : Math.round(max * 100) / 100;
  };

  const paintedTop = (el) => {
    let min = Infinity;
    const walk = (n) => {
      if (n.nodeType === 3) {
        if (n.textContent.trim()) {
          const r = document.createRange();
          r.selectNodeContents(n);
          for (const b of r.getClientRects()) min = Math.min(min, b.top + scrollY);
        }
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
            min = Math.min(min, box.top + scrollY + (bb.y - vb.y) * scale);
            return;
          }
        } catch {}
      }
      const b = n.getBoundingClientRect();
      const painted =
        cs.backgroundColor !== "rgba(0, 0, 0, 0)" ||
        cs.backgroundImage !== "none" ||
        parseFloat(cs.borderTopWidth) > 0 ||
        n.tagName === "IMG" ||
        n.tagName === "HR";
      if (painted && b.height > 0) min = Math.min(min, b.top + scrollY);
      for (const c of n.childNodes) walk(c);
    };
    walk(el);
    return min === Infinity ? null : Math.round(min * 100) / 100;
  };

  /* --- the hero transition, the defect under investigation --------------- */
  const svg = document.querySelector('main svg[role="img"]');
  const heroModes = document.querySelector("main > section:first-of-type dl");
  const nextBlock = svg
    ? (heroModes ?? document.querySelector("main > section:nth-of-type(2)"))
    : null;

  let heroGap = null;
  if (svg && nextBlock) {
    const inkBottom = paintedBottom(svg);
    const inkTop = paintedTop(nextBlock);
    heroGap = {
      svgBox: rect(svg),
      svgInkBottom: inkBottom,
      /** Box the SVG reserves beyond the artwork it draws. */
      svgSlackBelow: inkBottom == null ? null : Math.round((rect(svg).bottom - inkBottom) * 100) / 100,
      nextTop: rect(nextBlock).top,
      nextInkTop: inkTop,
      nextLabel: (nextBlock.textContent ?? "").trim().slice(0, 32),
      /** The number the user sees as blank. */
      deadPx: inkBottom == null || inkTop == null ? null : Math.round((inkTop - inkBottom) * 100) / 100,
    };
  }

  /* --- tap targets ------------------------------------------------------- */
  const small = [];
  for (const el of document.querySelectorAll(
    'a[href], button, [role="button"], select, input:not([type=hidden]), textarea',
  )) {
    const b = el.getBoundingClientRect();
    if (b.width === 0 || b.height === 0) continue;
    // Off-canvas by design: the form's honeypot, and anything inside it.
    if (b.left < -1000) continue;
    // The skip link is 1x1 until focused, at which point it is a real target.
    if (el.className.toString().includes("sr-only")) continue;
    // Inline links inside a paragraph are exempt — they are text, not controls.
    if (el.closest("p") && el.tagName === "A") continue;
    if (b.height < 44 || b.width < 24) {
      small.push({
        text: (el.textContent ?? el.getAttribute("aria-label") ?? el.tagName).trim().slice(0, 28),
        w: Math.round(b.width),
        h: Math.round(b.height),
      });
    }
  }

  /* --- the CTA pair: same width, and a glow that stays on the button -----
     Only the aura wrapper is compared, not whatever group the button sits in:
     a row of two content-width buttons inside a wide column is the intended
     desktop arrangement, and comparing against the group would call it a bug. */
  const ctas = [...document.querySelectorAll("main a")]
    .filter((a) => getComputedStyle(a).minHeight === "48px")
    .slice(0, 4)
    .map((a) => {
      const wrap = a.parentElement;
      const glow = wrap?.querySelector(":scope > span[aria-hidden]");
      return {
        text: a.textContent.trim().slice(0, 30),
        btn: rect(a),
        wrap: wrap && glow ? rect(wrap) : null,
        glow: glow ? rect(glow) : null,
        colour: getComputedStyle(a).color,
        bg: getComputedStyle(a).backgroundColor,
      };
    });

  return {
    docW: de.scrollWidth,
    docH: de.scrollHeight,
    clientW: de.clientWidth,
    innerW: innerWidth,
    innerH: innerHeight,
    hOverflow: de.scrollWidth > de.clientWidth + 1,
    overflowing: overflowing.slice(0, 12),
    sections,
    heroGap,
    smallTargets: small,
    ctas,
    headerH: rect(document.querySelector("header")).h,
    footerTop: rect(document.querySelector("footer")).top,
  };
};

/* -------------------------------------------------------------------------
   Driver
   ------------------------------------------------------------------------- */

const findings = [];
const note = (s) => {
  findings.push(s);
  console.log("  ! " + s);
};

async function sweep(engineName, browserType) {
  const browser = await browserType.launch();
  const dir = path.join(ROOT, engineName);
  fs.mkdirSync(dir, { recursive: true });

  for (const vp of [...PORTRAIT, ...LANDSCAPE]) {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: engineName === "webkit" ? IOS_UA : undefined,
        ...(engineName === "chromium"
          ? {
              userAgent:
                "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36",
            }
          : {}),
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
      const failed = [];
      page.on("requestfailed", (r) => failed.push(r.url()));
      page.on("response", (r) => {
        if (r.status() >= 400 && new URL(r.url()).origin === new URL(BASE).origin)
          failed.push(`${r.status()} ${r.url()}`);
      });

      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      const d = await page.evaluate(PROBE);

      const slug = route === "/" ? "home" : route.slice(1);
      const tag = `${engineName} ${vp.name} ${route}`;
      console.log(`\n--- ${tag} (${vp.note}) doc ${d.docW}x${d.docH}`);

      if (d.hOverflow)
        note(`${tag}: horizontal overflow ${d.docW} > ${d.clientW} :: ${JSON.stringify(d.overflowing.slice(0, 3))}`);
      if (failed.length) note(`${tag}: failed requests ${JSON.stringify(failed.slice(0, 3))}`);
      if (errors.length) note(`${tag}: console ${JSON.stringify(errors.slice(0, 2))}`);
      for (const s of d.sections)
        if (s.rect.h < 40) note(`${tag}: section ${s.id ?? s.i} has height ${s.rect.h}`);
      if (d.smallTargets.length)
        note(`${tag}: ${d.smallTargets.length} tap targets under 44px :: ${JSON.stringify(d.smallTargets.slice(0, 4))}`);

      if (d.heroGap) {
        const small = SMALL_VIEWPORT[vp.name] ?? vp.height;
        console.log(
          `    hero: svg box ${d.heroGap.svgBox.h}px, ink ends ${d.heroGap.svgInkBottom} ` +
            `(slack ${d.heroGap.svgSlackBelow}), next ink ${d.heroGap.nextInkTop} => DEAD ${d.heroGap.deadPx}px` +
            ` | Safari small viewport ${small}: ${d.heroGap.nextInkTop < small ? "divider visible" : "divider below the fold"}`,
        );
        if (d.heroGap.deadPx > 72)
          note(`${tag}: ${d.heroGap.deadPx}px dead space between hero visual and "${d.heroGap.nextLabel}"`);
        if (d.heroGap.svgSlackBelow > 8)
          note(`${tag}: hero SVG reserves ${d.heroGap.svgSlackBelow}px of box below its artwork`);
      }

      for (const c of d.ctas) {
        // The wrapper must hug the action. The glow itself is -inset-2 either
        // side times the breathing keyframe's 1.06 peak, so it is checked
        // proportionally — an absolute bound just measures the animation phase.
        if (c.wrap && c.wrap.w - c.btn.w > 1)
          note(`${tag}: CTA "${c.text}" is ${c.btn.w}px inside a ${c.wrap.w}px aura wrapper — the wrapper does not hug the button`);
        if (c.glow && c.glow.w > (c.btn.w + 16) * 1.07)
          note(`${tag}: CTA "${c.text}" is ${c.btn.w}px under a ${c.glow.w}px glow — the aura bleeds past the button`);
      }

      fs.writeFileSync(path.join(dir, `${slug}__${vp.name}.json`), JSON.stringify(d, null, 2));
      await page.screenshot({ path: path.join(dir, `${slug}__${vp.name}__full.png`), fullPage: true });
      await page.screenshot({ path: path.join(dir, `${slug}__${vp.name}__viewport.png`) });

      await ctx.close();
    }
  }
  await browser.close();
}

const engines = (process.env.ENGINES ?? "webkit,chromium").split(",");
for (const e of engines) await sweep(e, e === "webkit" ? webkit : chromium);

fs.mkdirSync(ROOT, { recursive: true });
fs.writeFileSync(path.join(ROOT, "_findings.txt"), findings.join("\n") + "\n");
console.log(`\n\n===== ${findings.length} findings — ${path.join(ROOT, "_findings.txt")} =====`);
