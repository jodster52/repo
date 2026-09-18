import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Example page object built on BasePage's common method wrappers. */
export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.username = page.getByLabel(/username|email/i);
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: /log ?in|sign ?in/i });
    this.errorMessage = page.locator('form').getByText(/invalid/i);
  }

  async open(): Promise<void> {
    await this.goto('/'); // Adjust if your app doesn't show the login form on the root page.
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.submit);
  }
}
