import { defineConfig, devices } from "@playwright/test";
import { config } from "./e2e/config"

export default defineConfig({
  testDir: "./e2e",
  testMatch: '**/*.spec.ts',
  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["junit", { outputFile: "./playwright-report/results.xml" }],
    ["html", { outputFolder: "./playwright-report/html", open: "never" }],
  ],
  use: {
    baseURL: config.baseUrl,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }


  ],
});
