import { test, expect } from '../src/fixtures/baseFixtures';
import { env } from '../src/config/env';

/**
 * Template for a real end-to-end test against the application under test using
 * the LoginPage page object. It is skipped unless a non-localhost BASE_URL and
 * credentials are configured for the active environment, so the suite stays
 * green out of the box. Point `.env.<env>` at your app and remove the guard.
 */

const configured =
  !!env.credentials.username && !!env.credentials.password && !env.baseURL.includes('localhost');

test.describe('login (page object + self-healing)', () => {
  test.skip(!configured, 'Set BASE_URL + APP_USERNAME/APP_PASSWORD for the active ENV to enable.');

  test('user can sign in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(env.credentials.username, env.credentials.password);

    // Adjust this assertion to your app's post-login signal.
    await expect(page).not.toHaveURL(/login/i);
  });

  test('shows an error with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('invalid-user', 'wrong-password');

    expect(await loginPage.errorMessage.isVisible({ timeout: 5_000 })).toBe(true);
  });
});
