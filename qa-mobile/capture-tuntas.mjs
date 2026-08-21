/**
 * QA capture for the Tuntas rework.
 *
 * Renders the routes that changed at three widths against a running server
 * (`npx next start -p 3100` by default), and writes full-page PNGs into this
 * directory. Run it after `pnpm build`:
 *
 *   node qa-mobile/capture-tuntas.mjs
 *
 * `E2E_BASE_URL` overrides the target, so the same script can be pointed at a
 * preview deployment.
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3100";
const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "qa-screenshots",
  "tuntas-rework",
);

const ROUTES = [
  ["home", "/"],
  ["tuntas-en", "/tuntas"],
  ["tuntas-id", "/id/tuntas"],
  ["securepulse", "/securepulse"],
];

const WIDTHS = [
  ["1440", 1440, 1000],
  ["1280", 1280, 900],
  ["390", 390, 844],
];

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

for (const [wLabel, width, height] of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const [name, path] of ROUTES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    await page.screenshot({
      path: join(OUT, `${name}-${wLabel}.png`),
      fullPage: true,
    });
    // The fold is what a visitor actually meets first, so it is captured on
    // its own rather than inferred from the top of a 9000px strip.
    await page.screenshot({ path: join(OUT, `${name}-${wLabel}-fold.png`) });
    console.log(`${name} @ ${wLabel}`);
  }

  await context.close();
}

await browser.close();
console.log("→", OUT);
