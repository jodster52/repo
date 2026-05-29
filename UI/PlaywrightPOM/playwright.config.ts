import { defineConfig, devices } from '@playwright/test';
// Importing env first runs the dotenv loading side-effects (base .env + .env.<ENV>).
import { env } from './src/config/env';

/**
 * Playwright config driven entirely by the dotenv-based environment strategy in
 * `src/config/env.ts`. Switch environments with the `ENV` variable, e.g.:
 *   cross-env ENV=qa playwright test
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: env.timeout,
  fullyParallel: true,
  forbidOnly: env.name === 'prod' || process.env.CI === 'true',
  retries: env.retries,
  workers: env.workers,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: env.baseURL,
    headless: env.headless,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  outputDir: 'test-results',
});
