import { test, expect } from '../src/fixtures/baseFixtures';

/**
 * Self-contained demonstration of the self-healing locator. No live server is
 * required — we serve markup with `page.setContent` and then "break" the DOM the
 * way a real UI change would, proving the locator falls back to an alternate
 * strategy and records the heal.
 */

test.describe('self-healing locator', () => {
  test('resolves via the primary strategy when markup is healthy', async ({ page, heal }) => {
    await page.setContent(`
      <form>
        <input data-testid="username" />
      </form>
    `);

    const username = heal({
      name: 'demo.username',
      strategies: [
        { type: 'testId', value: 'username' },
        { type: 'css', value: '#username' },
      ],
    });

    const locator = await username.resolve();
    await expect(locator).toBeVisible();
  });

  test('heals to a fallback when the primary selector no longer matches', async ({
    page,
    heal,
    healingEngine,
  }) => {
    // The data-testid is gone (simulating a UI refactor); only id + name remain.
    await page.setContent(`
      <form>
        <input id="username" name="username" placeholder="Username" />
      </form>
    `);

    const username = heal({
      name: 'demo.username.broken',
      strategies: [
        { type: 'testId', value: 'username' }, // primary — will fail
        { type: 'placeholder', value: 'Username' }, // fallback — should heal
        { type: 'css', value: '#username' },
      ],
    });

    const locator = await username.resolve({ timeout: 1_000 });
    await expect(locator).toBeVisible();

    // A heal should have been recorded for this element.
    const healed = healingEngine.events_().find((e) => e.name === 'demo.username.broken');
    expect(healed, 'expected a healing event to be recorded').toBeTruthy();
    expect(healed?.healedStrategy.type).toBe('placeholder');
  });

  test('throws a descriptive error when no strategy matches', async ({ page, heal }) => {
    await page.setContent('<div>nothing useful here</div>');

    const missing = heal({
      name: 'demo.missing',
      strategies: [
        { type: 'testId', value: 'does-not-exist' },
        { type: 'css', value: '#nope' },
      ],
    });

    await expect(missing.resolve({ timeout: 500 })).rejects.toThrow(/Self-healing failed for "demo.missing"/);
  });
});
