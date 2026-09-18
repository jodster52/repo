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
npm run lint                           # eslint . (flat config, eslint.config.js)
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

**Page objects (`src/pages/`)** — subclass `BasePage`, which supplies common method
wrappers over Playwright `Locator`s (`click`, `fill`, `type`, `getText`, `isVisible`,
`waitForVisible`, `waitForHidden`, `selectOption`, `check`, `uncheck`, `hover`), plus
`goto()` (relative to `env.baseURL`) and `baseURL`. Concrete pages (e.g. `LoginPage`)
declare their locators in the constructor and compose the wrappers into higher-level
actions (e.g. `login()`). New page objects should be exposed as a fixture in
`baseFixtures.ts` rather than instantiated ad hoc in tests.

**Fixtures (`src/fixtures/baseFixtures.ts`)** — extends Playwright's `test` with
page-object fixtures (e.g. `loginPage`) bound to the test's `page`. Specs must import
`test`/`expect` from `../src/fixtures/baseFixtures`, not directly from
`@playwright/test`, so new page-object fixtures stay in one place.

**Test data (`src/data/`)** — `@faker-js/faker`-backed factories (e.g.
`createFakeUser()` in `userFactory.ts`) generate realistic input data per test run
instead of hard-coded fixtures. Factories accept a `Partial<T>` overrides argument so
specific fields can be pinned when a test needs a deterministic value.

**Path aliases** — `tsconfig.json` defines `@config/*`, `@pages/*`, `@fixtures/*`,
`@data/*` mapping into `src/*`, but note Playwright/ts-node do not resolve these
automatically at runtime; existing code uses relative imports throughout.

## Linting

`eslint.config.js` is a flat config (ESLint 9+ requires this format; the legacy
`.eslintrc.json` no longer works and has been removed). It layers `@eslint/js`'s
recommended rules with `@typescript-eslint`'s recommended rules for `**/*.ts`, and
disables `no-undef` for TS files per typescript-eslint's guidance (the TS compiler
already catches undefined-variable errors, and `no-undef` false-positives on TS-only
constructs like ambient types). Node globals for both the `.ts` sources and the config
file itself are declared inline in `eslint.config.js` rather than pulling in the
`globals` package, since this project only ever runs under Node.
