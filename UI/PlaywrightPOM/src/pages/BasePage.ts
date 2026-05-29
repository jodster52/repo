import { Page } from '@playwright/test';
import { HealingEngine } from '../healing/HealingEngine';
import { SelfHealingLocator } from '../healing/SelfHealingLocator';
import { ElementDefinition } from '../healing/types';
import { env } from '../config/env';

/**
 * Base for all page objects. Provides a `heal()` helper so page objects declare
 * elements with multiple candidate strategies instead of a single brittle
 * selector.
 */
export abstract class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly engine: HealingEngine,
  ) {}

  /** Build a self-healing locator scoped to this page object. */
  protected heal(definition: ElementDefinition): SelfHealingLocator {
    return new SelfHealingLocator(this.page, definition, this.engine);
  }

  /** Navigate relative to the configured baseURL. */
  async goto(pathname = '/'): Promise<void> {
    await this.page.goto(pathname);
  }

  get baseURL(): string {
    return env.baseURL;
  }
}
