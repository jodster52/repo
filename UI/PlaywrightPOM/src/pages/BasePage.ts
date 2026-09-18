import { Locator, Page } from '@playwright/test';
import { env } from '../config/env';

/**
 * Base for all page objects. Holds the page instance and a set of common
 * method wrappers so page objects can express actions/assertions without
 * repeating raw Playwright locator calls.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate relative to the configured baseURL. */
  async goto(pathname = '/'): Promise<void> {
    await this.page.goto(pathname);
  }

  get baseURL(): string {
    return env.baseURL;
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async type(locator: Locator, value: string): Promise<void> {
    await locator.pressSequentially(value);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }
}
