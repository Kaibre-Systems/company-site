import { expect, test } from "@playwright/test";

/* ==========================================================================
   Scroll position across navigations
   --------------------------------------------------------------------------
   Guards a production defect: `scroll-behavior: smooth` on `html` without
   `data-scroll-behavior="smooth"` on the element. Next only disables smooth
   scrolling during a route transition when that attribute is present, so the
   scroll-to-top it performs after navigation ran as an animation racing the
   new page's layout and parked partway down it. /kai to /securepulse opened
   at 1010px; a hash visit first made the next page open at 316px.

   Both cases are below. They fail if the attribute is removed, or if anything
   else reintroduces an animated scroll on navigation.
   ========================================================================== */

/** Long enough for an animated scroll to have finished landing wrongly. */
const SETTLE = 900;

/** The fixed header is 4rem and `scroll-padding-top` is 5rem, so "the top" is
 *  not always exactly 0. Anything inside the first screenful of the hero is. */
const TOP = 100;

async function scrollToBottom(page: import("@playwright/test").Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
}

test("html carries the attribute Next needs to defeat smooth scrolling", async ({
  page,
}) => {
  await page.goto("/");
  const attr = await page.evaluate(
    () => document.documentElement.dataset.scrollBehavior,
  );
  const css = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(
    css === "smooth" ? attr : "smooth",
    "`scroll-behavior: smooth` on <html> requires data-scroll-behavior=\"smooth\"",
  ).toBe("smooth");
});

test("a deep page opens the next one at its top", async ({ page }) => {
  for (const [from, to, name] of [
    ["/kai", "/securepulse", /SecurePulse/i],
    ["/securepulse", "/commissioned-systems", /Commissioned systems/i],
    ["/commissioned-systems", "/work", /Selected work/i],
  ] as const) {
    await page.goto(from);
    await scrollToBottom(page);

    await page.locator("footer").getByRole("link", { name }).first().click();
    await page.waitForURL(`**${to}`);
    await page.waitForTimeout(SETTLE);

    const y = await page.evaluate(() => window.scrollY);
    expect(y, `${from} -> ${to} opened at ${y}px`).toBeLessThan(TOP);
  }
});

test("an in-page hash does not follow you to the next page", async ({ page }) => {
  await page.goto("/commissioned-systems");
  await page
    .getByRole("link", { name: /describe your workflow/i })
    .first()
    .click();
  await page.waitForTimeout(SETTLE);

  await page.locator("footer").getByRole("link", { name: /^kAI$/ }).first().click();
  await page.waitForURL("**/kai");
  await page.waitForTimeout(SETTLE);

  const y = await page.evaluate(() => window.scrollY);
  expect(y, `/kai opened at ${y}px after a #start hash`).toBeLessThan(TOP);
});
