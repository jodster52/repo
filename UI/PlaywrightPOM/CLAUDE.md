# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npx playwright install                # download browsers (first-time setup)

npm test                               # run all tests, default ENV (dev)
npm run test:dev                       # ENV=dev
npm run test:qa                        # ENV=qa
npm run test:prod                      # ENV=prod
npm run test:headed                    # headed run
npm run test:ui                        # Playwright UI mode
npm run test:debug                     # Playwright debug mode
npm run report                         # open last HTML report

npm run typecheck                      # tsc --noEmit
npm run lint                           # eslint . --ext .ts (currently broken — see Known issues)

npm run healing:report                 # print which elements have drifted/healed
npm run healing:reset                  # clear healing/locator-store.json
```

Run a single test file / project:
```bash
npx cross-env ENV=qabrains playwright test tests/login.example.spec.ts --project=chromium
```

Run a single test by title:
```bash
npx cross-env ENV=dev playwright test -g "test name substring"
```

## Architecture

**Environment strategy (`src/config/env.ts`)** — `playwright.config.ts` imports `env` from
this module first, so its dotenv side effects (loading `.env` then `.env.<ENV>` with
`override: true`) run before config is built. `ENV` (falls back to `NODE_ENV`, then
`dev`) selects the active environment. Real `.env*` files are git-ignored; only
`.env.example` is committed — inject real credentials via CI secrets, not the files.

**Self-healing locators (`src/healing/`)** — the core differentiator of this framework.
Page objects declare each element as an `ElementDefinition`: a name plus an ordered list
of candidate `LocatorStrategy` objects (`testId`, `role`, `label`, `placeholder`, `text`,
`altText`, `title`, `css`, `xpath`). `SelfHealingLocator` tries strategies in order (with
any previously-remembered last-known-good strategy promoted to the front); the first one
that resolves wins. When a fallback (not the declared primary) succeeds, `HealingEngine`
records a healing event, attaches it to the test report, and persists the working
strategy to `healing/locator-store.json` (file-backed, shape defined in
`src/healing/types.ts`) so future runs try the working strategy first. Toggle via
`HEALING_ENABLED` / `HEALING_PERSIST` env vars. `buildLocator.ts` is the only place that
turns a `LocatorStrategy` into an actual Playwright `Locator` — string values shaped like
`/pattern/flags` are treated as regexes there.

**Fixtures (`src/fixtures/baseFixtures.ts`)** — extends Playwright's `test` with:
- `healingEngine` — one `HealingEngine` instance per test, finalized (report attachment)
  in teardown.
- `heal` — a factory bound to the test's `page` + `healingEngine` for building
  `SelfHealingLocator`s inline, without a page object.
- Page-object fixtures (e.g. `loginPage`) — each wraps a `BasePage` subclass with the
  same `page` + `healingEngine`.

Specs must import `test`/`expect` from `../src/fixtures/baseFixtures`, not directly from
`@playwright/test`, to get healing wired in.

**Page objects (`src/pages/`)** — subclass `BasePage`, which supplies `heal()` (scoped
`SelfHealingLocator` builder), `goto()` (relative to `env.baseURL`), and `baseURL`. New
page objects should be exposed as a fixture in `baseFixtures.ts` rather than
instantiated ad hoc in tests.

**Path aliases** — `tsconfig.json` defines `@config/*`, `@healing/*`, `@pages/*`,
`@fixtures/*` mapping into `src/*`, but note Playwright/ts-node do not resolve these
automatically at runtime; existing code uses relative imports throughout.

## Known issues

- `npm run lint` is currently broken: ESLint 9+ requires a flat `eslint.config.js`, but
  this repo only has the legacy `.eslintrc.json`. Needs a migration, not a version
  downgrade.
