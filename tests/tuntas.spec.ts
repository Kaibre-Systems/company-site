import { expect, test, type Page } from "@playwright/test";

/* ==========================================================================
   Tuntas — the bilingual pair
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

const EN_PATH = "/tuntas";
const ID_PATH = "/id/tuntas";

const EN_H1 = "A new regulation arrives. Tuntas works out what it changes here.";
const ID_H1 =
  "Regulasi baru terbit. Tuntas menghitung apa yang berubah di perusahaan Anda.";

/**
 * English terms approved for use inside Indonesian copy: the product and
 * company names, product-interface vocabulary, and loanwords a professional
 * Indonesian audience uses in English. Stripped before the leak scan.
 */
const APPROVED_IN_ID = [
  "Tuntas",
  "Kaibre",
  "Bahasa Indonesia",
  "Read in English", // the language link is deliberately in its own language
  "English",
  "PDF",
  "Word",
  "AI",
  "fintech",
  "multifinance",
  "Human Capital", // the unit's own name in an Indonesian institution
  "email",
  "status",
  "Website", // hidden honeypot label
];

/** English function words that professional Indonesian never contains. */
const ENGLISH_MARKERS =
  /\b(the|and|with|for|from|your|our|this|that|every|into|are|of|by)\b/gi;

/** Indonesian function words that must not surface on the English route. */
const INDONESIAN_MARKERS = /\b(dan|yang|untuk|dengan|kami|adalah|setiap)\b/gi;

/**
 * What must never appear, in either language: approval or endorsement by a
 * regulator, certification of the customer, guarantees, coverage claimed as
 * complete, a claim that Tuntas makes anyone compliant, legal advice,
 * percentages, or any promise about how long an analysis takes.
 *
 * Two rules changed when Tuntas became its own product, and both are
 * deliberate:
 *
 *  - Instrument names (POJK/SEOJK numbers) were forbidden outright, because
 *    the page then claimed a curated corpus and naming an instrument implied
 *    coverage of it. Tuntas makes the opposite claim — the customer names the
 *    regulation — and its own public demo runs on a named, real regulation.
 *    An instrument may therefore be named *inside illustrative material*, and
 *    `illustrated instruments only` below is the check that keeps it there.
 *  - The 30-minute clause is gone with the claim it guarded. Timing claims of
 *    any kind are now forbidden outright rather than merely qualified.
 */
const FORBIDDEN = [
  /\b(Kominfo)\b/,
  /\b(UU\s?PDP|PDP Law)\b/i,
  /\b(?:OJK|Bank Indonesia|PPATK)[- ]approved\b/i,
  /\b(?:approved|endorsed|licensed)\s+by\s+(?:OJK|Bank Indonesia|PPATK|the regulator)\b/i,
  /\bdisetujui\s+(?:oleh\s+)?(?:OJK|Bank Indonesia|PPATK|regulator)\b/i,
  /\b(?:complete|full)\s+coverage\b/i,
  /\bcakupan\s+(?:penuh|lengkap|menyeluruh)\b/i,
  /\b(certified|accredited|regulator[- ]approved|guaranteed)\b/i,
  /\b(tersertifikasi|terakreditasi|kepatuhan otomatis)\b/i,
  /\bmenjamin\s+kepatuhan\b/i,
  /\b(?:makes|keeps)\s+you\s+compliant\b/i,
  /\bsudah\s+patuh\b/i,
  // The disclaimer says "does not give legal advice"; the affirmative is
  // what is forbidden, so the lookbehind excludes the negated form.
  /(?<!not\s)(?:gives?|provides?|offers?)\s+legal\s+advice/i,
  /(?<!tidak\s)memberikan\s+nasihat\s+hukum/i,
  /\bin\s+(?:about\s+)?\d+\s+minutes?\b/i,
  /\bdalam\s+(?:sekitar\s+)?\d+\s+menit\b/i,
  /\b\d{1,3}\s?%/,
];

/**
 * The one illustrative panel on each page names a real regulation. It is
 * allowed to, and only there: this asserts that every *numbered* instrument
 * on the page sits inside something the page has marked as illustrative, so
 * a later rewrite cannot promote an example into a claim.
 *
 * Numbered, deliberately. "Satu POJK baru" is a category — the Indonesian for
 * "a new OJK regulation" — and the page is entitled to describe the kind of
 * thing it reads. "POJK 40/2024" is an instrument, and naming one outside an
 * illustration would read as coverage of it.
 */
const INSTRUMENT = /\b(?:POJK|SEOJK)\s*[\d.]/g;

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

  /**
   * The English route's *copy* carries no stray Indonesian. Its reproduced
   * screens are a different matter and are excluded: the product is Bahasa
   * Indonesia end to end, the regulation and the company documents it quotes
   * are Indonesian, and translating a screen for this page would be showing
   * something that does not exist. They are marked `role="img"` and carry an
   * English accessible description, which is what a reader who cannot read
   * them gets instead.
   */
  test("the English route's own copy carries no stray Indonesian", async ({
    page,
  }) => {
    await page.goto(EN_PATH);
    await settle(page);
    let text = await page.evaluate(() => {
      const clone = document.body.cloneNode(true) as HTMLElement;
      for (const el of clone.querySelectorAll('[role="img"], script, style, template')) {
        el.remove();
      }
      return (clone.textContent || "").replace(/\s+/g, " ");
    });
    // The language link is deliberately in Indonesian; strip it too.
    text = text.split("Baca dalam Bahasa Indonesia").join(" ");
    const leaks = [...new Set(text.match(INDONESIAN_MARKERS) ?? [])];
    expect(leaks, `Indonesian function words in the English copy`).toEqual([]);
  });

  /**
   * And the screens really are the Indonesian ones, on both routes. If a
   * later edit "helpfully" translates a panel for the English page, this is
   * what catches it.
   */
  test("the reproduced screens are in Bahasa on both routes", async ({ page }) => {
    for (const path of [EN_PATH, ID_PATH]) {
      await page.goto(path);
      await settle(page);
      const panels = await page.evaluate(() =>
        [...document.querySelectorAll('[role="img"]')]
          .map((el) => (el as HTMLElement).textContent ?? "")
          .join(" ")
          .replace(/\s+/g, " "),
      );
      expect(panels, `${path} renders no screens`).not.toHaveLength(0);
      expect(panels, `${path} screens are not in Bahasa`).toMatch(/\bkewajiban\b/i);
      expect(panels).toMatch(/\bPasal\b|\bPs\./);
    }
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
      // Illustrative material must be labelled as illustrative — and the
      // company in it stated to be fictional. The screens carry the product's
      // own Bahasa tag on both routes, so the English page says "fictional"
      // in the caption beside them rather than inside them.
      const label = path.startsWith("/id/")
        ? /ilustra|fiktif/i
        : /illustrative|ilustrasi/i;
      expect(text).toMatch(label);
      const fiction = path.startsWith("/id/") ? /fiktif/i : /fictional/i;
      expect(text, `${path} does not say the company is fictional`).toMatch(
        fiction,
      );
      // The scope claim must never travel without its qualification.
      const qualifier = path.startsWith("/id/")
        ? /Cakupan dan beban kerjanya bergantung/
        : /Scope and effort vary/;
      expect(text).toMatch(qualifier);
      // The product's own standing, stated on the page rather than implied.
      const standing = path.startsWith("/id/")
        ? /alat bantu analisis/i
        : /an analysis tool/i;
      expect(text).toMatch(standing);
    });

    test(`${path} names an instrument only inside illustrative material`, async ({
      page,
    }) => {
      await page.goto(path);
      const outside = await page.evaluate(() => {
        // Everything the page has marked illustrative — the register panel and
        // the action centre — removed, leaving the page's own assertions.
        const clone = document.body.cloneNode(true) as HTMLElement;
        for (const el of clone.querySelectorAll(
          '[role="img"], figure, [data-illustrative], script, style, template',
        )) {
          el.remove();
        }
        // A detached node has no layout, so `innerText` falls back to
        // `textContent` — which is why the scripts have to go first: the RSC
        // flight payload contains the whole dictionary, illustrations
        // included, and every one of these scans would read it.
        return (clone.textContent || "").replace(/\s+/g, " ");
      });
      const hits = [...new Set(outside.match(INSTRUMENT) ?? [])];
      expect(hits, `${path} names an instrument outside an illustration`).toEqual(
        [],
      );
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
          /obligation/i,
          /deadline/i,
          /revok/i, // the revoked regulation is named as revoked
          /partly met/i,
          /cannot be assessed yet/i,
          /Board of Commissioners/,
          /analysis tool/i,
          /OJK/,
        ],
      ],
      [
        ID_PATH,
        [
          /kewajiban/i,
          /tenggat/i,
          /dicabut/i,
          /terpenuhi sebagian/i,
          /belum dapat dinilai/i,
          /Dewan Komisaris/,
          /alat bantu analisis/i,
          /OJK/,
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
      topic: "tuntas",
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
    expect(posted!).toMatchObject({ topic: "tuntas", locale: "en", orgType: "insurer" });
  });

  test("the header CTA lands on the form, clear of the sticky header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(EN_PATH);
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Walk through an example" })
      .click();
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
