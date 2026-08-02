/** Targeted crops for the parts a full-page capture makes too small to judge. */
import { webkit } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const DIR = path.resolve(import.meta.dirname, process.argv[2] ?? "after", "crops");
fs.mkdirSync(DIR, { recursive: true });
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";
const b = await webkit.launch();
const shots = [
  ["/", "h1", "home-hero", 375, 812],
  ["/", "#products", "home-products", 390, 844],
  ["/securepuls", 'div[role="img"][aria-label^="A draft finding"]', "sp-evidence", 375, 812],
  ["/securepuls", "h1", "sp-hero", 375, 812],
  ["/work", "h1", "work-hero", 375, 812],
  ["/work", "dl", "work-figures", 375, 812],
  ["/", "footer", "footer", 390, 844],
  ["/contact", "form", "contact-form", 375, 812],
];
for (const [route, sel, name, w, h] of shots) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA });
  const p = await c.newPage();
  await p.goto("http://localhost:3100" + route, { waitUntil: "networkidle" });
  await p.waitForTimeout(300);
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(250);
  await p.screenshot({ path: path.join(DIR, `${name}__${w}x${h}.png`) });
  await c.close();
}
// Landscape + reduced motion + focus
for (const [w, h, name] of [[568, 320, "home-landscape-small"], [932, 430, "home-landscape-large"]]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA });
  const p = await c.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(DIR, `${name}__${w}x${h}.png`) });
  await c.close();
}
await b.close();
console.log("crops in", DIR);
