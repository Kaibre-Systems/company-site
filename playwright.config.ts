import { defineConfig, devices } from "@playwright/test";

/**
 * Mobile end-to-end suite.
 *
 * Two engines, deliberately. Chromium mobile emulation is emulation: it gets
 * the viewport, the touch flags and the user agent right, and the layout engine
 * wrong in exactly the places iOS bugs live. WebKit is the engine Safari is
 * built on, so a failure there is a failure on an iPhone. Anything reported as
 * "verified on Safari" has to have run under `mobile-safari` below.
 *
 * The suite runs against a production build, because the defect that prompted
 * it was a layout one and `next dev` is not what visitors get.
 */

const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "mobile-safari",
      use: {
        ...devices["iPhone 14 Pro"],
        // Real WebKit, not a UA string over Chromium.
        browserName: "webkit",
      },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"], browserName: "chromium" },
    },
  ],

  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
