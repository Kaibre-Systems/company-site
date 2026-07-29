/**
 * Interaction probes the static sweep cannot see: the menu on a short screen,
 * anchor landing under the fixed header, the contact form's result states, the
 * software keyboard, and Safari's collapsing toolbars.
 *
 *   node qa-mobile/behaviour.mjs <label>
 */

import { webkit } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3100";
const LABEL = process.argv[2] ?? "run";
const DIR = path.resolve(import.meta.dirname, LABEL, "behaviour");
fs.mkdirSync(DIR, { recursive: true });

const IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 " +
  "(KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";

/**
 * Safari's *small* viewport — toolbars expanded, the state a page loads in.
 * Playwright cannot draw browser chrome, but shrinking the viewport to the same
 * height is layout-equivalent, which is what these checks are about.
 */
const SMALL_VIEWPORT = {
  "320x568": 460,
  "360x800": 674,
  "375x667": 553,
  "375x812": 635,
  "390x844": 659,
  "393x852": 667,
  "430x932": 747,
};

const out = [];
const say = (s) => {
  out.push(s);
  console.log(s);
};

const browser = await webkit.launch();

async function ctx(width, height, extra = {}) {
  const c = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: IOS_UA,
    ...extra,
  });
  return c;
}

/* -- 1. Mobile menu: opens, closes, fits, traps focus, restores focus ------ */
for (const [name, small] of Object.entries(SMALL_VIEWPORT)) {
  const [w] = name.split("x").map(Number);
  const c = await ctx(w, small);
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const toggle = page.getByRole("button", { name: /open menu/i });
  await toggle.tap();
  await page.waitForTimeout(200);

  /**
   * The question is not whether the last item is below the fold on open — it is
   * whether it can be *reached*, since page scrolling is locked while the panel
   * is up. So: scroll the panel to its end, then look.
   */
  const m = await page.evaluate(async () => {
    const header = document.querySelector("header");
    const panel = header.querySelector("[id]:not([hidden])");
    const cta = [...header.querySelectorAll("a")].pop();
    const before = Math.round(cta.getBoundingClientRect().bottom);
    panel.scrollTop = panel.scrollHeight;
    await new Promise((r) => requestAnimationFrame(r));
    return {
      headerBottom: Math.round(header.getBoundingClientRect().bottom),
      before,
      after: Math.round(cta.getBoundingClientRect().bottom),
      label: cta.textContent.trim(),
      scrollable: panel.scrollHeight > panel.clientHeight + 1,
      bodyOverflow: getComputedStyle(document.body).overflow,
      htmlOverflow: getComputedStyle(document.documentElement).overflow,
      innerH: innerHeight,
    };
  });
  const reachable = m.after <= m.innerH && m.after > 0;
  say(
    `menu ${name} (small ${small}): last item "${m.label}" ends ${m.before} on open, ${m.after} after scrolling the panel` +
      ` (scrollable=${m.scrollable}, viewport ${m.innerH}) — ${reachable ? "reachable" : "!! UNREACHABLE"}` +
      ` [lock html=${m.htmlOverflow} body=${m.bodyOverflow}]`,
  );
  await page.screenshot({ path: path.join(DIR, `menu-open__${name}__small${small}.png`) });

  /* Escape closes and returns focus to the trigger. */
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  const closed = await page.evaluate(() => ({
    expanded: document.querySelector("header button").getAttribute("aria-expanded"),
    focused: document.activeElement?.getAttribute("aria-controls") != null,
    bodyOverflow: document.body.style.overflow,
  }));
  say(
    `  escape: expanded=${closed.expanded} focusRestored=${closed.focused} scrollUnlocked=${closed.bodyOverflow === ""}`,
  );
  await c.close();
}

/* -- 2. Landscape ---------------------------------------------------------- */
for (const [w, h] of [[568, 320], [932, 430]]) {
  const c = await ctx(w, h);
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /open menu/i }).tap();
  await page.waitForTimeout(200);
  const m = await page.evaluate(async () => {
    const cta = [...document.querySelectorAll("header a")].pop();
    const panel = document.querySelector("header > div:last-child");
    const before = Math.round(cta.getBoundingClientRect().bottom);
    panel.scrollTop = panel.scrollHeight;
    await new Promise((r) => requestAnimationFrame(r));
    return {
      before,
      after: Math.round(cta.getBoundingClientRect().bottom),
      innerH: innerHeight,
      scrolls: panel.scrollHeight > panel.clientHeight + 1,
    };
  });
  say(
    `menu landscape ${w}x${h}: last item ends ${m.before} on open, ${m.after} after scrolling (scrollable=${m.scrolls}, viewport ${m.innerH})` +
      ` — ${m.after <= m.innerH && m.after > 0 ? "reachable" : "!! UNREACHABLE"}`,
  );
  await page.evaluate(() => {
    document.querySelector("header > div:last-child").scrollTop = 1e6;
  });
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(DIR, `menu-landscape__${w}x${h}.png`) });
  await c.close();
}

/* -- 3. Anchors must not land under the fixed header ----------------------- */
{
  const c = await ctx(390, 659);
  const page = await c.newPage();
  for (const hash of ["#company", "#how-we-work", "#products", "#commissioned"]) {
    await page.goto(BASE + "/" + hash, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const m = await page.evaluate((h) => {
      const el = document.querySelector(h);
      const header = document.querySelector("header").getBoundingClientRect();
      const b = el.getBoundingClientRect();
      const heading = el.querySelector("h1,h2,h3");
      return {
        sectionTop: Math.round(b.top),
        headerBottom: Math.round(header.bottom),
        headingTop: heading ? Math.round(heading.getBoundingClientRect().top) : null,
      };
    }, hash);
    const hidden = m.headingTop != null && m.headingTop < m.headerBottom;
    say(
      `anchor ${hash}: section top ${m.sectionTop}, heading top ${m.headingTop}, header ends ${m.headerBottom}` +
        ` — ${hidden ? "!! HEADING UNDER HEADER" : "clear"}`,
    );
  }
  await page.goto(BASE + "/#products", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DIR, "anchor-products__390x659.png") });
  await c.close();
}

/* -- 4. Contact: keyboard, validation, result states ----------------------- */
{
  const c = await ctx(390, 659);
  const page = await c.newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });

  const shell = await page.evaluate(() => {
    const holder = document.querySelector("form")?.parentElement;
    const form = document.querySelector("form");
    return {
      holderMinH: holder ? getComputedStyle(holder).minHeight : null,
      holderH: holder ? Math.round(holder.getBoundingClientRect().height) : null,
      formH: form ? Math.round(form.getBoundingClientRect().height) : null,
    };
  });
  say(`contact: form holder min-height ${shell.holderMinH}, holder ${shell.holderH}px, form ${shell.formH}px`);

  /* Validation, with the messages visible. */
  await page.waitForTimeout(2600);
  await page.locator('textarea[name="work"]').fill("too short");
  await page.getByRole("button", { name: /send it/i }).tap();
  await page.waitForTimeout(300);
  const v = await page.evaluate(() => {
    const errs = [...document.querySelectorAll('[id$="-error"]')].map((e) => e.textContent.trim().slice(0, 30));
    return { errs, docW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
  });
  say(`contact validation: ${v.errs.length} messages, overflow=${v.docW > v.clientW}`);
  await page.screenshot({ path: path.join(DIR, "contact-validation__390x659.png"), fullPage: true });

  /**
   * Software keyboard: the viewport collapses to ~340px and Safari scrolls the
   * focused field into view. What has to be true is that the field it lands on
   * is not then covered by the fixed header — which is what `scroll-padding-top`
   * governs, and is the part a site can get wrong.
   */
  await page.locator('textarea[name="work"]').tap();
  await page.setViewportSize({ width: 390, height: 340 });
  await page.evaluate(() => document.activeElement?.scrollIntoView({ block: "nearest" }));
  await page.waitForTimeout(250);
  const kb = await page.evaluate(() => {
    const el = document.activeElement;
    const b = el.getBoundingClientRect();
    const header = document.querySelector("header").getBoundingClientRect();
    return {
      tag: el.tagName,
      top: Math.round(b.top),
      bottom: Math.round(b.bottom),
      innerH: innerHeight,
      headerBottom: Math.round(header.bottom),
    };
  });
  const covered = kb.top < kb.headerBottom;
  const offscreen = kb.top > kb.innerH || kb.bottom < 0;
  say(
    `contact keyboard (390x340): focused ${kb.tag} spans ${kb.top}..${kb.bottom} of ${kb.innerH}, header ends ${kb.headerBottom}` +
      ` — ${offscreen ? "!! OFF SCREEN" : covered ? "!! UNDER THE HEADER" : "clear"}`,
  );
  await page.screenshot({ path: path.join(DIR, "contact-keyboard__390x340.png") });

  /* Result state: does the reserved height leave a hole? */
  await page.setViewportSize({ width: 390, height: 659 });
  await page.evaluate(() => {
    // Force the fallback panel by pointing the endpoint at nothing.
    const f = window.fetch;
    window.fetch = () => Promise.reject(new Error("offline"));
    void f;
  });
  await c.close();
}

/* -- 5. Contact result state, dead space under the reserved height --------- */
{
  const c = await ctx(390, 659);
  const page = await c.newPage();
  await page.route("**/api/contact", (r) => r.fulfill({ status: 200, body: "{}" }));
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.locator('input[name="name"]').fill("A Person");
  await page.locator('input[name="email"]').fill("a@example.com");
  await page.locator('input[name="company"]').fill("Example Ltd");
  await page
    .locator('textarea[name="work"]')
    .fill("We run one workflow that decides what we buy and at what price, and nothing fits it.");
  await page.getByRole("button", { name: /send it/i }).tap();
  await page.waitForSelector('[role="status"]');
  await page.waitForTimeout(200);
  const m = await page.evaluate(() => {
    const card = document.querySelector('[role="status"]');
    const holder = card.parentElement;
    return {
      cardH: Math.round(card.getBoundingClientRect().height),
      holderH: Math.round(holder.getBoundingClientRect().height),
      minH: getComputedStyle(holder).minHeight,
    };
  });
  say(
    `contact sent state: card ${m.cardH}px inside a ${m.holderH}px holder (min-height ${m.minH})` +
      ` — ${m.holderH - m.cardH > 80 ? "!! " + (m.holderH - m.cardH) + "px dead space" : "tight"}`,
  );
  await page.screenshot({ path: path.join(DIR, "contact-sent__390x659.png"), fullPage: true });
  await c.close();
}

/* -- 6. Toolbar collapse/expand: nothing may reflow badly ------------------ */
{
  const c = await ctx(390, 659);
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const small = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  const large = await page.evaluate(() => document.documentElement.scrollHeight);
  say(`toolbar collapse 659 -> 844: document ${small} -> ${large} (${large - small > 0 ? "+" : ""}${large - small}px reflow)`);
  await c.close();
}

/* -- 7. Reduced motion: everything must still be present ------------------- */
{
  const c = await ctx(390, 844, { reducedMotion: "reduce" });
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const m = await page.evaluate(() => {
    const invisible = [];
    for (const el of document.querySelectorAll("main *")) {
      const cs = getComputedStyle(el);
      if (cs.opacity === "0" && el.getAttribute("aria-hidden") == null) {
        invisible.push(el.tagName + "." + (el.className.baseVal ?? el.className).toString().slice(0, 40));
      }
    }
    return { invisible: invisible.slice(0, 6), h: document.documentElement.scrollHeight };
  });
  say(`reduced motion: doc ${m.h}px, ${m.invisible.length} non-decorative elements at opacity 0 ${JSON.stringify(m.invisible)}`);
  await page.screenshot({ path: path.join(DIR, "reduced-motion__390x844.png"), fullPage: true });
  await c.close();
}

/* -- 8. Keyboard focus ------------------------------------------------------
   Safari does not put links in the Tab order unless "Press Tab to highlight
   each item" is switched on, and Playwright's WebKit inherits that default. So
   the order is walked over the focusable set directly, and the CTA's ring is
   captured by focusing it — which is what a visitor with that setting on, or on
   any other browser, gets. --------------------------------------------------- */
{
  const c = await ctx(390, 844);
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const order = await page.evaluate(() =>
    [...document.querySelectorAll('a[href], button, input, select, textarea')]
      .filter((el) => el.tabIndex >= 0 && el.offsetParent !== null)
      .slice(0, 6)
      .map((el) => (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 26)),
  );
  say(`tab order (first 6): ${JSON.stringify(order)}`);

  const cta = page.getByRole("link", { name: "Start a conversation" }).first();
  await cta.focus();
  const f = await page.evaluate(() => {
    const el = document.activeElement;
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      label: el.textContent.trim().slice(0, 30),
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor} offset ${cs.outlineOffset}`,
      w: Math.round(b.width),
      h: Math.round(b.height),
    };
  });
  say(`CTA focus ring: "${f.label}" ${f.w}x${f.h}, outline ${f.outline}`);
  await cta.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(DIR, "cta-focus__390x844.png") });
  await c.close();
}

/* -- 9. Text zoom: 200% must not break the layout out of the column -------- */
for (const [w, h] of [[375, 812], [390, 844]]) {
  const c = await ctx(w, h);
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html { font-size: 200% }" });
  await page.waitForTimeout(300);
  const m = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    docW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  say(`text zoom 200% ${w}x${h}: horizontal overflow=${m.overflow} (${m.docW} vs ${m.clientW})`);
  await page.screenshot({ path: path.join(DIR, `text-zoom-200__${w}x${h}.png`) });
  await c.close();
}

/* -- 10. CTA pair: matched widths, glow on the button --------------------- */
{
  const c = await ctx(390, 844);
  const page = await c.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const m = await page.evaluate(() => {
    const group = document.querySelector("main .flex-col");
    const links = [...group.querySelectorAll("a")];
    return links.map((a) => {
      const b = a.getBoundingClientRect();
      const glow = a.parentElement?.querySelector("span[aria-hidden]");
      const g = glow?.getBoundingClientRect();
      return {
        text: a.textContent.trim().slice(0, 24),
        w: Math.round(b.width),
        h: Math.round(b.height),
        colour: getComputedStyle(a).color,
        glowW: g ? Math.round(g.width) : null,
      };
    });
  });
  say(`hero CTAs: ${JSON.stringify(m)}`);
  const widths = m.map((x) => x.w);
  say(
    `  widths ${widths.join(" vs ")} — ${Math.max(...widths) - Math.min(...widths) <= 2 ? "matched" : "!! MISMATCHED"}`,
  );
  await c.close();
}

await browser.close();
fs.writeFileSync(path.join(DIR, "_behaviour.txt"), out.join("\n") + "\n");
console.log("\nwrote " + path.join(DIR, "_behaviour.txt"));
