import { expect, test, type Page } from "@playwright/test";

/* ==========================================================================
   SecurePulse Indonesia — the bilingual pair
   --------------------------------------------------------------------------
   What only these tests hold:
     - the language toggle works both ways and preserves the visitor's place;
     - each locale is linguistically clean — the Indonesian route carries no
       stray English UI copy beyond the approved terms, and vice versa;
     - locale metadata is correct: html lang, hreflang alternates, og:locale;
     - the localised contact form validates, submits with its market fields,
       and reports in its own language;
     - neither page makes a claim the regulatory guardrails forbid — including
       naming any Indonesian regulator or framework.
   Layout, overflow, touch targets and runtime health for these routes are
   covered by the general suites, which include them in their route lists.
   ========================================================================== */

const EN_PATH = "/securepulse/indonesia";
const ID_PATH = "/id/securepulse/indonesia";

const EN_H1 = "Compliance assessment drafts in about 30 minutes, not weeks.";
const ID_H1 =
  "Draf asesmen kepatuhan dalam sekitar 30 menit, bukan berminggu-minggu.";

/**
 * English terms approved for use inside Indonesian copy: the product and
 * company names, product-interface vocabulary, and loanwords a professional
 * Indonesian audience uses in English. Stripped before the leak scan.
 */
const APPROVED_IN_ID = [
  "SecurePulse",
  "Kaibre",
  "Bahasa Indonesia",
  "Read in English", // the language link is deliberately in its own language
  "English",
  "VERIFIED",
  "PARTIAL",
  "INFERRED",
  "GAP",
  "PDF",
  "Word",
  "OpenAI",
  "AI",
  "fintech",
  "deployment",
  "Deployment",
  "endpoint",
  "Endpoint",
  "spreadsheet",
  "Spreadsheet",
  "email",
  "folder",
  "gap analysis", // accepted alongside "analisis kesenjangan"
  "gap",
  "Gap",
  "status",
  "Website", // hidden honeypot label
];

/** English function words that professional Indonesian never contains. */
const ENGLISH_MARKERS =
  /\b(the|and|with|for|from|your|our|this|that|every|into|are|of|by)\b/gi;

/** Indonesian function words that must not surface on the English route. */
const INDONESIAN_MARKERS = /\b(dan|yang|untuk|dengan|kami|adalah|setiap)\b/gi;

/**
 * OJK, Bank Indonesia and insurance-sector requirements may be named as
 * target corpus categories configured per engagement — that framing is
 * founder-approved. What must never appear, in either language: approval or
 * endorsement by a regulator, certifications, guarantees, coverage claimed
 * as complete, specific instruments (POJK/SEOJK numbers, UU PDP), other
 * regulators the corpus does not target, percentages, or an unqualified
 * timing promise.
 */
const FORBIDDEN = [
  /\b(POJK|SEOJK|Kominfo)\b/,
  /\b(UU\s?PDP|PDP Law)\b/i,
  /\b(?:OJK|Bank Indonesia|PPATK)[- ]approved\b/i,
  /\b(?:approved|endorsed|licensed)\s+by\s+(?:OJK|Bank Indonesia|PPATK|the regulator)\b/i,
  /\bdisetujui\s+(?:oleh\s+)?(?:OJK|Bank Indonesia|PPATK|regulator)\b/i,
  /\b(?:complete|full)\s+coverage\b/i,
  /\bcakupan\s+(?:penuh|lengkap|menyeluruh)\b/i,
  /\b(certified|accredited|regulator[- ]approved|guaranteed)\b/i,
  /\b(tersertifikasi|terakreditasi|kepatuhan otomatis)\b/i,
  /\bmenjamin\s+kepatuhan\b/i,
  /\b(?:guaranteed|always|every assessment)\s+(?:in|within)\s+30\b/i,
  /\bselalu\s+30\s+menit\b/i,
  /\b\d{1,3}\s?%/,
];

async function visibleText(page: Page) {
  return page.evaluate(() => (document.body.innerText || "").replace(/\s+/g, " "));
}

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
}

/* --------------------------------------------------------------------------
   Locale switching
   -------------------------------------------------------------------------- */

test.describe("language toggle", () => {
  test("EN → ID → EN, and the html lang follows", async ({ page }) => {
    // Scoped to the header: the footer offers the counterpart page too, and
    // role-name matching is substring-based.
    const toggle = (name: string) =>
      page.locator("header nav").getByRole("link", { name });
    // On a soft navigation the lang correction runs from an effect, which can
    // flush a tick after the new heading paints — poll rather than snapshot.
    const lang = () =>
      expect.poll(() => page.evaluate(() => document.documentElement.lang));

    await page.goto(EN_PATH);
    await expect(page.getByRole("heading", { name: EN_H1 })).toBeVisible();
    await lang().toBe("en");

    await toggle("Bahasa Indonesia").click();
    await expect(page).toHaveURL(new RegExp(`${ID_PATH}$`));
    await expect(page.getByRole("heading", { name: ID_H1 })).toBeVisible();
    await lang().toBe("id");

    await toggle("English").click();
    await expect(page).toHaveURL(new RegExp(`${EN_PATH}$`));
    await expect(page.getByRole("heading", { name: EN_H1 })).toBeVisible();
    await lang().toBe("en");
  });

  test("switching keeps the visitor's section", async ({ page }) => {
    await page.goto(EN_PATH + "#contact");
    await page.waitForTimeout(400);
    await page.locator("header nav").getByRole("link", { name: "Bahasa Indonesia" }).click();
    await expect(page).toHaveURL(new RegExp(`${ID_PATH}#contact$`));
    // The anchored section ends up in view, clear of the sticky header. The
    // anchor scroll runs under `scroll-behavior: smooth`, so poll until the
    // animation lands rather than measuring mid-flight.
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const s = document.querySelector("#contact")!.getBoundingClientRect();
            return s.top >= 0 && s.top < innerHeight;
          }),
        { timeout: 8000 },
      )
      .toBe(true);
  });

  test("the toggle marks the active locale and links only the other", async ({ page }) => {
    for (const [path, activeShort, otherName] of [
      [EN_PATH, "EN", "Bahasa Indonesia"],
      [ID_PATH, "ID", "English"],
    ] as const) {
      await page.goto(path);
      const nav = page.locator("header nav");
      await expect(nav.locator(`span[aria-current="true"]`)).toHaveText(activeShort);
      await expect(nav.getByRole("link", { name: otherName })).toBeVisible();
      expect(await nav.getByRole("link").count()).toBe(1);
    }
  });

  test("each page names both languages in its hreflang alternates", async ({ page }) => {
    for (const path of [EN_PATH, ID_PATH]) {
      await page.goto(path);
      const alternates = await page.evaluate(() =>
        [...document.querySelectorAll("link[rel=alternate][hreflang]")].map((l) => ({
          lang: l.getAttribute("hreflang"),
          href: l.getAttribute("href"),
        })),
      );
      const en = alternates.find((a) => a.lang === "en");
      const id = alternates.find((a) => a.lang === "id");
      expect(en?.href, `${path} hreflang en`).toContain(EN_PATH);
      expect(id?.href, `${path} hreflang id`).toContain(ID_PATH);
    }
  });

  test("og:locale matches the page language", async ({ page }) => {
    for (const [path, locale] of [
      [EN_PATH, "en_GB"],
      [ID_PATH, "id_ID"],
    ] as const) {
      await page.goto(path);
      const og = await page.evaluate(
        () =>
          document
            .querySelector('meta[property="og:locale"]')
            ?.getAttribute("content") ?? null,
      );
      expect(og, `${path} og:locale`).toBe(locale);
    }
  });
});

/* --------------------------------------------------------------------------
   Linguistic purity
   -------------------------------------------------------------------------- */

test.describe("no language leaks", () => {
  test("the Indonesian route carries no stray English", async ({ page }) => {
    await page.goto(ID_PATH);
    await settle(page);
    let text = await visibleText(page);
    for (const term of APPROVED_IN_ID) {
      text = text.split(term).join(" ");
    }
    const leaks = [...new Set(text.match(ENGLISH_MARKERS) ?? [])];
    expect(leaks, `English function words on the Indonesian route`).toEqual([]);
  });

  test("the English route carries no stray Indonesian", async ({ page }) => {
    await page.goto(EN_PATH);
    await settle(page);
    // The language link is deliberately in Indonesian; strip it first.
    let text = await visibleText(page);
    text = text.split("Baca dalam Bahasa Indonesia").join(" ");
    const leaks = [...new Set(text.match(INDONESIAN_MARKERS) ?? [])];
    expect(leaks, `Indonesian function words on the English route`).toEqual([]);
  });

  test("one h1 per page, in the page's own language", async ({ page }) => {
    for (const [path, h1] of [
      [EN_PATH, EN_H1],
      [ID_PATH, ID_H1],
    ] as const) {
      await page.goto(path);
      expect(await page.locator("h1").count(), `${path} h1 count`).toBe(1);
      await expect(page.locator("h1")).toHaveText(h1);
    }
  });
});

/* --------------------------------------------------------------------------
   Claim discipline
   -------------------------------------------------------------------------- */

test.describe("regulatory guardrails", () => {
  for (const path of [EN_PATH, ID_PATH]) {
    test(`${path} makes no forbidden claim`, async ({ page }) => {
      await page.goto(path);
      const text = await visibleText(page);
      for (const re of FORBIDDEN) {
        const hit = re.exec(text);
        expect(hit, `"${hit?.[0]}" appears on ${path}`).toBeNull();
      }
      // Illustrative material must be labelled as illustrative.
      const label = path.startsWith("/id/") ? /ilustratif/i : /illustrative/i;
      expect(text).toMatch(label);
      // The timing claim must never travel without its qualification.
      const qualifier = path.startsWith("/id/")
        ? /Durasi bervariasi/
        : /Timing varies/;
      expect(text).toMatch(qualifier);
    });
  }

  /**
   * The executive scan: a visitor reading only headings, bold terms and
   * numbers must still meet the load-bearing concepts. These are the words
   * that carry the page — if a rewrite drops one, this fails.
   */
  test("scan-level concepts are present in both locales", async ({ page }) => {
    const expectations: [string, RegExp[]][] = [
      [
        EN_PATH,
        [
          /about 30 minutes/i,
          /SecurePulse AI/,
          /gap analysis/i,
          /remediation plan/i,
          /severity/i,
          /reviewer/i,
          /regulatory corpus/i,
          /OJK/,
          /Bank Indonesia/,
          /PPATK/,
        ],
      ],
      [
        ID_PATH,
        [
          /sekitar 30 menit/i,
          /SecurePulse AI/,
          /analisis kesenjangan/i,
          /rencana remediasi/i,
          /keparahan/i,
          /penelaah/i,
          /korpus regulasi/i,
          /OJK/,
          /Bank Indonesia/,
          /PPATK/,
        ],
      ],
    ];
    for (const [path, terms] of expectations) {
      await page.goto(path);
      const text = await visibleText(page);
      for (const term of terms) {
        expect(text, `${path} is missing ${term}`).toMatch(term);
      }
    }
  });
});

/* --------------------------------------------------------------------------
   The localised contact form
   -------------------------------------------------------------------------- */

test.describe("contact form", () => {
  test("validates in Indonesian on the Indonesian route", async ({ page }) => {
    await page.goto(ID_PATH + "#contact");
    await page.waitForTimeout(2600); // minimum time-on-form guard
    await page.locator('textarea[name="work"]').fill("terlalu singkat");
    await page.getByRole("button", { name: "Kirim" }).click();
    await expect(page.locator('[id$="-error"]').first()).toBeVisible();
    const errors = await page.locator('[id$="-error"]').allTextContents();
    expect(errors.join(" ")).toContain("Mohon isi nama Anda.");
    expect(errors.join(" ")).not.toMatch(/Please/);
  });

  test("submits the market fields and reports success in Indonesian", async ({ page }) => {
    let posted: Record<string, unknown> | null = null;
    await page.route("**/api/contact", async (route) => {
      posted = route.request().postDataJSON();
      await route.fulfill({ status: 200, body: "{}" });
    });

    await page.goto(ID_PATH + "#contact");
    await page.waitForTimeout(2600);
    await page.locator('input[name="name"]').fill("Seseorang");
    await page.locator('input[name="email"]').fill("a@example.co.id");
    await page.locator('input[name="company"]').fill("PT Contoh");
    await page.locator('input[name="role"]').fill("Kepala Kepatuhan");
    await page.locator('select[name="orgType"]').selectOption("bank");
    await page
      .locator('textarea[name="work"]')
      .fill(
        "Kami menjalankan asesmen pengendalian internal secara berkala di beberapa entitas dan merakit laporannya secara manual.",
      );
    await page.getByRole("button", { name: "Kirim" }).click();

    await expect(page.locator('[role="status"]')).toBeVisible();
    await expect(page.locator('[role="status"]')).toContainText("Terima kasih");

    expect(posted).not.toBeNull();
    expect(posted!).toMatchObject({
      topic: "securepulse-id",
      locale: "id",
      orgType: "bank",
      role: "Kepala Kepatuhan",
    });
  });

  test("submits with locale en from the English route", async ({ page }) => {
    let posted: Record<string, unknown> | null = null;
    await page.route("**/api/contact", async (route) => {
      posted = route.request().postDataJSON();
      await route.fulfill({ status: 200, body: "{}" });
    });

    await page.goto(EN_PATH + "#contact");
    await page.waitForTimeout(2600);
    await page.locator('input[name="name"]').fill("A Person");
    await page.locator('input[name="email"]').fill("a@example.com");
    await page.locator('input[name="company"]').fill("Example Ltd");
    await page.locator('select[name="orgType"]').selectOption("insurer");
    await page
      .locator('textarea[name="work"]')
      .fill(
        "We run recurring internal control assessments across several entities and assemble the report by hand.",
      );
    await page.getByRole("button", { name: "Send it" }).click();

    await expect(page.locator('[role="status"]')).toBeVisible();
    await expect(page.locator('[role="status"]')).toContainText("Thanks");
    expect(posted!).toMatchObject({ topic: "securepulse-id", locale: "en", orgType: "insurer" });
  });

  test("the header CTA lands on the form, clear of the sticky header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(EN_PATH);
    await page.getByRole("banner").getByRole("link", { name: "Show us a workflow" }).click();
    await page.waitForTimeout(400);
    const m = await page.evaluate(() => {
      const heading = document.querySelector("#contact h2")!;
      return {
        top: heading.getBoundingClientRect().top,
        headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom,
      };
    });
    expect(m.top).toBeGreaterThan(m.headerBottom);
  });
});
