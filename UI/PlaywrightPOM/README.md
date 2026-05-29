# DRIVES Playwright Framework

A Playwright + TypeScript test framework featuring **self-healing locators** and a
**dotenv-based environment strategy**.

## Highlights

- **Self-healing locators** — each element declares several candidate strategies in
  priority order. If the primary selector stops matching (e.g. a UI refactor), the
  locator transparently falls back to the next candidate, records the heal, and
  remembers the working strategy for next time.
- **dotenv environment strategy** — a shared `.env` plus per-environment
  `.env.<name>` overrides, selected with the `ENV` variable.
- **Page Object Model** with fixtures wiring the healing engine into every test.
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

## Project layout

```
.
├── playwright.config.ts          # config driven by the dotenv env strategy
├── .env / .env.example           # shared defaults
├── .env.dev / .env.qa / .env.prod# per-environment overrides
├── src/
│   ├── config/env.ts             # dotenv loader + typed env object
│   ├── healing/                  # self-healing engine
│   │   ├── SelfHealingLocator.ts # tries candidate strategies, heals, acts
│   │   ├── HealingEngine.ts      # ordering, event recording, persistence
│   │   ├── locatorStore.ts       # file-backed last-known-good store
│   │   ├── buildLocator.ts       # strategy -> Playwright Locator
│   │   └── types.ts
│   ├── fixtures/baseFixtures.ts  # `heal`, `healingEngine`, page-object fixtures
│   └── pages/                    # Page Object Model (BasePage, LoginPage)
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
`TIMEOUT`, `RETRIES`, `WORKERS`, `HEALING_ENABLED`, `HEALING_PERSIST`, `HEALING_STORE`.

## Self-healing locators

Declare an element with multiple strategies, most-preferred first:

```ts
const username = heal({
  name: 'login.username',
  strategies: [
    { type: 'testId', value: 'username' },     // tried first
    { type: 'label', value: 'Username' },      // fallback
    { type: 'css', value: '#username' },        // fallback
  ],
});

await username.fill('alice');   // resolves + heals as needed
```

Supported strategy `type`s: `testId`, `role` (with optional `name`), `label`,
`placeholder`, `text`, `altText`, `title`, `css`, `xpath`. String values shaped
like `/pattern/flags` are applied as regular expressions.

### How healing works

1. Strategies are attempted in order. If a remembered last-known-good strategy
   exists for the element, it is promoted to the front first.
2. The first strategy whose element reaches the required state (`visible` by
   default) wins.
3. If a fallback (not the declared primary) succeeds, a **healing event** is
   recorded, logged to the console, attached to the test report, and the working
   strategy is persisted to `healing/locator-store.json`.
4. If no strategy matches, a descriptive error lists every attempt.

Toggle with `HEALING_ENABLED` / `HEALING_PERSIST`.

### Inspecting heals

```bash
npm run healing:report   # show which elements have drifted
npm run healing:reset    # clear the persisted store
```

## Adding a page object

```ts
import { Page } from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { HealingEngine } from '../src/healing/HealingEngine';

export class DashboardPage extends BasePage {
  readonly greeting = this.heal({
    name: 'dashboard.greeting',
    strategies: [
      { type: 'testId', value: 'greeting' },
      { type: 'role', value: 'heading', name: '/welcome/i' },
    ],
  });

  constructor(page: Page, engine: HealingEngine) {
    super(page, engine);
  }
}
```

Expose it as a fixture in `src/fixtures/baseFixtures.ts` to use it directly in tests.
```ts
import { test, expect } from '../src/fixtures/baseFixtures';
```
