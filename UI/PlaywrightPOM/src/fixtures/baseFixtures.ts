import { test as base, expect, Page } from '@playwright/test';
import { env } from '../config/env';
import { HealingEngine } from '../healing/HealingEngine';
import { SelfHealingLocator } from '../healing/SelfHealingLocator';
import { ElementDefinition } from '../healing/types';
import { LoginPage } from '../pages/LoginPage';

/** Factory bound to a page + engine for building self-healing locators inline. */
export type HealFactory = (definition: ElementDefinition) => SelfHealingLocator;

export interface Fixtures {
  healingEngine: HealingEngine;
  heal: HealFactory;
  loginPage: LoginPage;
}

export const test = base.extend<Fixtures>({
  // One engine per test; persists the shared store and reports healing events.
  healingEngine: async ({}, use, testInfo) => {
    const engine = new HealingEngine({
      enabled: env.healing.enabled,
      persist: env.healing.persist,
      storePath: env.healing.storePath,
      env: env.name,
    });
    await use(engine);
    await engine.finalize(testInfo);
  },

  heal: async ({ page, healingEngine }, use) => {
    const factory: HealFactory = (definition) =>
      new SelfHealingLocator(page as Page, definition, healingEngine);
    await use(factory);
  },

  loginPage: async ({ page, healingEngine }, use) => {
    await use(new LoginPage(page as Page, healingEngine));
  },
});

export { expect };
