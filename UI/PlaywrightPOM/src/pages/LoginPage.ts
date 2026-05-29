import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HealingEngine } from '../healing/HealingEngine';
import { SelfHealingLocator } from '../healing/SelfHealingLocator';

/**
 * Example page object. Each element lists several locator strategies in priority
 * order. If the markup changes and the first strategy stops matching, the
 * self-healing locator transparently falls back to the next one and records the
 * heal — so a class rename or restructure doesn't immediately break the suite.
 */
export class LoginPage extends BasePage {
  readonly username: SelfHealingLocator;
  readonly password: SelfHealingLocator;
  readonly submit: SelfHealingLocator;
  readonly errorMessage: SelfHealingLocator;

  constructor(page: Page, engine: HealingEngine) {
    super(page, engine);

    this.username = this.heal({
      name: 'login.username',
      strategies: [
        { type: 'testId', value: 'username' },
        { type: 'label', value: 'Username' },
        { type: 'placeholder', value: 'Username' },
        { type: 'css', value: '#username' },
        { type: 'css', value: 'input[name="username"]' },
      ],
    });

    this.password = this.heal({
      name: 'login.password',
      strategies: [
        { type: 'testId', value: 'password' },
        { type: 'label', value: 'Password' },
        { type: 'placeholder', value: 'Password' },
        { type: 'css', value: '#password' },
        { type: 'css', value: 'input[type="password"]' },
      ],
    });

    this.submit = this.heal({
      name: 'login.submit',
      strategies: [
        { type: 'testId', value: 'login-submit' },
        { type: 'role', value: 'button', name: '/log ?in|sign ?in/i' },
        { type: 'css', value: 'button[type="submit"]' },
        { type: 'text', value: 'Login' },
      ],
    });

    this.errorMessage = this.heal({
      name: 'login.error',
      strategies: [
        { type: 'testId', value: 'login-error' },
        { type: 'role', value: 'alert' },
        { type: 'css', value: '.error, .alert-danger' },
      ],
    });
  }

  async open(): Promise<void> {
    await this.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
