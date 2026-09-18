# DRIVES Playwright Framework

A Playwright + TypeScript test framework built on a **Page Object Model**, a
**dotenv-based environment strategy**, and **faker.js** for generated test data.

## Highlights

- **Page Object Model** — `BasePage` supplies common method wrappers (`click`,
  `fill`, `getText`, `isVisible`, `waitForVisible`, `selectOption`, `check`, …)
  so page objects stay declarative; concrete pages (e.g. `LoginPage`) extend it.
- **dotenv environment strategy** — a shared `.env` plus per-environment
  `.env.<name>` overrides, selected with the `ENV` variable.
- **faker.js test data** — `src/data/` generates realistic fake users/inputs on
  demand instead of hard-coded fixtures.
- Fixtures wire page objects into every test (`src/fixtures/baseFixtures.ts`).
- Multi-browser projects, HTML/JSON reporting, traces, and screenshots on failure.

## Quick start

```bash
npm install
npx playwright install        # download browsers

npm test                      # default ENV (dev)
npm run test:qa               # ENV=qa
npm run test:headed           # headed run
npm run test:ui               # Playwright UI mode
npm run report                # open last HTML report
```

## Running Tests
```
A single test file and a single browser:
npx cross-env ENV=qabrains playwright test tests/login.example.spec.ts --project=chromium
```

## Project layout

```
.
├── playwright.config.ts          # config driven by the dotenv env strategy
├── .env / .env.example           # shared defaults
├── .env.dev / .env.qa / .env.prod# per-environment overrides
├── src/
│   ├── config/env.ts             # dotenv loader + typed env object
│   ├── pages/                    # Page Object Model
│   │   ├── BasePage.ts           # common method wrappers used by every page
│   │   └── LoginPage.ts          # example page object
│   ├── fixtures/baseFixtures.ts  # page-object fixtures
│   └── data/
│       └── userFactory.ts        # faker.js-backed fake data generators
└── tests/                        # specs
```

## Environment strategy (dotenv)

The active environment is chosen with `ENV` (falls back to `NODE_ENV`, then `dev`):

1. `.env` is loaded first for **shared defaults**.
2. `.env.<ENV>` is loaded with `override: true`, so its values win.

```bash
cross-env ENV=qa playwright test     # loads .env then .env.qa
```

Real files (`.env`, `.env.*`) are git-ignored; commit only `.env.example`. Inject
real credentials via your CI secret store rather than committing them.

Supported keys: `BASE_URL`, `API_URL`, `APP_USERNAME`, `APP_PASSWORD`, `HEADLESS`,
`TIMEOUT`, `RETRIES`, `WORKERS`.

## Page Object Model

Page objects extend `BasePage`, which exposes reusable action wrappers over
Playwright `Locator`s:

```ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';

export class DashboardPage extends BasePage {
  readonly greeting: Locator;

  constructor(page: Page) {
    super(page);
    this.greeting = page.getByRole('heading', { name: /welcome/i });
  }
}
```

Expose it as a fixture in `src/fixtures/baseFixtures.ts` to use it directly in tests:

```ts
import { test, expect } from '../src/fixtures/baseFixtures';
```

## Generating test data with faker.js

```ts
import { createFakeUser } from '../src/data/userFactory';

const user = createFakeUser();               // random first/last name, email, username, password
const pinned = createFakeUser({ email: 'fixed@example.com' }); // override specific fields
```
