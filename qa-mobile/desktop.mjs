/**
 * Desktop capture, for design review rather than assertion.
 *
 *   node qa-mobile/desktop.mjs <label>
 */

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3100";
const DIR = path.resolve(import.meta.dirname, process.argv[2] ?? "run", "desktop");
fs.mkdirSync(DIR, { recursive: true });

const ROUTES = ["/", "/securepulse", "/kai", "/work", "/contact"];
const SIZES = [
  { name: "1440x900", w: 1440, h: 900 },
  { name: "1920x1080", w: 1920, h: 1080 },
  { name: "768x1024", w: 768, h: 1024 },
];

const browser = await chromium.launch();
for (const s of SIZES) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const slug = route === "/" ? "home" : route.slice(1);
    await page.screenshot({ path: path.join(DIR, `${slug}__${s.name}__viewport.png`) });
    if (s.name === "1440x900")
      await page.screenshot({ path: path.join(DIR, `${slug}__${s.name}__full.png`), fullPage: true });
    await ctx.close();
  }
}

/* Section-level crops at desktop, where composition is judged. */
const CROPS = [
  ["/", "main > section:nth-of-type(1)", "home-hero"],
  ["/", "#products", "home-products"],
  ["/", "main > section:nth-of-type(2)", "home-thesis"],
  ["/", "main > section:nth-of-type(3)", "home-proof"],
  ["/securepulse", "main > section:nth-of-type(1)", "sp-hero"],
  ["/securepulse", 'div[role="img"][aria-label^="A draft finding"]', "sp-evidence"],
  ["/kai", "main > section:nth-of-type(1)", "kai-hero"],
  ["/kai", "main > section:nth-of-type(2)", "kai-value"],
  ["/work", "main > section:nth-of-type(1)", "work-hero"],
  ["/work", "main > section:nth-of-type(2)", "work-figures"],
];
for (const [route, sel, name] of CROPS) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const el = page.locator(sel).first();
  if (await el.count()) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await el.screenshot({ path: path.join(DIR, `crop__${name}.png`) }).catch(() => {});
  }
  await ctx.close();
}

await browser.close();
console.log("desktop captures in", DIR);
