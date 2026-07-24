// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/* Smoke tests E2E du portfolio (PaulBrain OS + recherche + bot).
   Lancer : npm run test:e2e  (installe les navigateurs une fois : npx playwright install chromium)
   Réutilise le serveur dev s'il tourne déjà, sinon le démarre. */
module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3010",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3010",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
