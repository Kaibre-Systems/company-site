import { defineConfig, devices } from "@playwright/test";

/**
 * Deployed-preview QA. Same two engines as the main config, pointed at a
 * protected Vercel preview via the automation-bypass header. Untracked,
 * invoked explicitly:
 *
 *   E2E_BASE_URL=<preview> VERCEL_AUTOMATION_BYPASS=<secret> \
 *     npx playwright test tests/indonesia.spec.ts --config playwright.preview.config.ts
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL,
    extraHTTPHeaders: {
      "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS ?? "",
    },
  },
  projects: [
    { name: "mobile-safari", use: { ...devices["iPhone 14 Pro"], browserName: "webkit" } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"], browserName: "chromium" } },
  ],
});
