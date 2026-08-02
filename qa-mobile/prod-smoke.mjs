/**
 * Production smoke test, run against the live domain rather than a build.
 *
 *   node qa-mobile/prod-smoke.mjs [origin]
 */

import { chromium, webkit } from "@playwright/test";

const BASE = process.argv[2] ?? "https://www.kaibresystems.com";
const ROUTES = ["/", "/securepuls", "/kai", "/work", "/contact"];

const fail = [];
const bad = (s) => {
  fail.push(s);
  console.log("  ✗ " + s);
};
const ok = (s) => console.log("  ✓ " + s);

/**
 * Claims this site must never make. Kaibre holds no certifications, and kAI's
 * page must not carry performance figures — both were removed in the redesign
 * and this is the check that they stayed removed.
 */
const FORBIDDEN_CLAIMS = [
  { re: /\b(ISO\s?\d{4,5}|SOC\s?2|GDPR[- ]certified|PCI[- ]DSS)\b/i, why: "named certification" },
  { re: /\b(certified|accredited|regulator[- ]approved|government[- ]approved)\b/i, why: "certification claim" },
  { re: /\b(endorsed by|approved by|licensed by|in partnership with)\b/i, why: "endorsement claim" },
  { re: /\b\d{1,3}\s?%/, why: "percentage metric" },
  { re: /\b\d+x\s+(more|faster|better|higher|increase)/i, why: "multiplier claim" },
  { re: /\b(trusted by|used by)\s+\d+/i, why: "customer count" },
];

async function run(engineName, browserType, viewport, isMobile) {
  const browser = await browserType.launch();
  const ctx = await browser.newContext({
    viewport,
    isMobile,
    hasTouch: isMobile,
    deviceScaleFactor: 2,
  });
  console.log(`\n===== ${engineName} @ ${viewport.width}x${viewport.height} =====`);

  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    const broken = [];
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("response", (r) => {
      if (r.status() >= 400) broken.push(`${r.status()} ${r.url()}`);
    });
    page.on("requestfailed", (r) => broken.push(`failed ${r.url()}`));

    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    if (res.status() !== 200) bad(`${route}: HTTP ${res.status()}`);

    const m = await page.evaluate(`(() => {
      const de = document.documentElement;
      const box = (s) => { const e = document.querySelector(s); if (!e) return null;
        const b = e.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height) }; };
      return {
        docW: de.scrollWidth, vw: de.clientWidth,
        title: document.title,
        canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
        ogUrl: document.querySelector('meta[property="og:url"]')?.content ?? null,
        h1: document.querySelector("h1")?.textContent?.trim().slice(0, 46) ?? null,
        h1count: document.querySelectorAll("h1").length,
        logo: box("header svg"),
        toggle: box("header button"),
        mainCta: [...document.querySelectorAll("main a")]
          .filter((a) => getComputedStyle(a).minHeight === "48px")
          .map((a) => ({ t: a.textContent.trim().slice(0, 26), w: Math.round(a.getBoundingClientRect().width),
                         colour: getComputedStyle(a).color })).slice(0, 3),
        mailto: !!document.querySelector('footer a[href^="mailto:"]'),
        text: (document.body.innerText || "").replace(/\\s+/g, " "),
        images: document.images.length,
      };
    })()`);

    /* Layout */
    if (m.docW > m.vw + 1) bad(`${route}: horizontal overflow ${m.docW} > ${m.vw}`);
    if (m.h1count !== 1) bad(`${route}: ${m.h1count} h1 elements`);
    if (!m.logo || m.logo.w < 80) bad(`${route}: wordmark missing or tiny ${JSON.stringify(m.logo)}`);
    if (isMobile && (!m.toggle || m.toggle.w < 44 || m.toggle.h < 44))
      bad(`${route}: hamburger under 44px ${JSON.stringify(m.toggle)}`);

    /* Metadata */
    if (!m.canonical?.startsWith("https://www.kaibresystems.com"))
      bad(`${route}: canonical is ${m.canonical}`);
    if (!m.ogUrl?.startsWith("https://www.kaibresystems.com")) bad(`${route}: og:url is ${m.ogUrl}`);
    if (!m.title?.includes("Kaibre")) bad(`${route}: title "${m.title}"`);

    /* Contact fallback: the address must be reachable in plain text. */
    if (!m.mailto) bad(`${route}: no mailto in the footer`);

    /* Claim discipline */
    for (const c of FORBIDDEN_CLAIMS) {
      const hit = c.re.exec(m.text);
      if (hit) bad(`${route}: ${c.why} — "${hit[0]}" in visible copy`);
    }

    /* Runtime */
    const realErrors = errors.filter((e) => !/_vercel\/(insights|speed-insights)/.test(e));
    if (realErrors.length) bad(`${route}: console ${JSON.stringify(realErrors.slice(0, 2))}`);
    const realBroken = broken.filter((b) => !/_vercel\/(insights|speed-insights)/.test(b));
    if (realBroken.length) bad(`${route}: broken requests ${JSON.stringify(realBroken.slice(0, 3))}`);

    ok(
      `${route.padEnd(13)} h1="${m.h1}" canonical=${m.canonical?.replace("https://www.kaibresystems.com", "")||"/"} ` +
        `logo=${m.logo?.w}x${m.logo?.h} imgs=${m.images} ctas=${m.mainCta.length} doc=${m.docW}`,
    );
    await page.close();
  }

  /* Navigation: the mobile menu must open, reach its CTA, and close. */
  if (isMobile) {
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /open menu/i }).tap();
    const opened = await page.getByRole("button", { name: /close menu/i }).isVisible();
    const reach = await page.evaluate(`(async () => {
      const header = document.querySelector("header");
      const panel = header.querySelector("[id]:not([hidden])");
      const last = [...header.querySelectorAll("a")].pop();
      panel.scrollTop = panel.scrollHeight;
      await new Promise((r) => requestAnimationFrame(r));
      const b = last.getBoundingClientRect();
      return { bottom: b.bottom, innerH: innerHeight, label: last.textContent.trim(),
               lock: document.body.style.overflow };
    })()`);
    await page.keyboard.press("Escape");
    const closed = await page.getByRole("button", { name: /open menu/i }).isVisible();
    const unlocked = await page.evaluate(() => document.body.style.overflow === "");
    if (!opened) bad("mobile menu did not open");
    if (reach.bottom > reach.innerH + 1) bad(`mobile menu CTA unreachable (${reach.bottom} > ${reach.innerH})`);
    if (!closed) bad("mobile menu did not close on Escape");
    if (!unlocked) bad("scroll lock not released");
    ok(`mobile menu opens, "${reach.label}" reachable at ${Math.round(reach.bottom)}/${reach.innerH}, Escape closes, scroll released`);

    /* Desktop nav links resolve. */
    await page.close();
  } else {
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    for (const label of ["SecurePuls", "kAI", "Work"]) {
      const link = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label, exact: true }).first();
      const href = await link.getAttribute("href");
      const r = await page.request.get(BASE + href);
      if (r.status() !== 200) bad(`nav "${label}" -> ${href} is ${r.status()}`);
    }
    ok("desktop nav links all resolve 200");
    await page.close();
  }

  await ctx.close();
  await browser.close();
}

/**
 * The apex must keep redirecting to the host the canonicals name, and the
 * legacy URLs must keep landing where the redesign sent them — both are edge
 * configuration rather than application code, so only a live request proves it.
 */
async function routing() {
  console.log("\n===== routing =====");
  const canonicalHost = new URL(BASE).host;

  const apex = await fetch("https://kaibresystems.com/", { redirect: "manual" });
  const to = apex.headers.get("location") ?? "";
  if (![301, 302, 307, 308].includes(apex.status) || !to.includes(canonicalHost))
    bad(`apex did not redirect to ${canonicalHost}: ${apex.status} -> ${to}`);
  else ok(`apex redirects ${apex.status} -> ${to}`);

  for (const [from, expect] of [
    ["/services", "/work"],
    ["/services/deep/path", "/work"],
    ["/projects", "/work"],
    ["/team", "/"],
    ["/careers", "/contact"],
    // The product is spelled SecurePuls; the route was corrected to match.
    ["/securepulse", "/securepuls"],
  ]) {
    const r = await fetch(BASE + from, { redirect: "manual" });
    const loc = r.headers.get("location") ?? "";
    const landed = new URL(loc, BASE).pathname;
    if (![301, 308].includes(r.status) || landed !== expect)
      bad(`${from}: ${r.status} -> ${landed} (expected 308 -> ${expect})`);
    else ok(`${from.padEnd(20)} ${r.status} -> ${landed}`);
  }

  const missing = await fetch(BASE + "/this-route-does-not-exist");
  if (missing.status !== 404) bad(`unknown route returned ${missing.status}, expected 404`);
  else ok("unknown route returns 404");
}

await run("webkit", webkit, { width: 390, height: 844 }, true);
await run("chromium", chromium, { width: 1440, height: 900 }, false);
await routing();

console.log(`\n===== ${fail.length ? fail.length + " FAILURES" : "ALL PRODUCTION CHECKS PASSED"} =====`);
if (fail.length) process.exitCode = 1;
