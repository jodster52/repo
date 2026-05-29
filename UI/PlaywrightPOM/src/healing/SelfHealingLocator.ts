import { Page, Locator } from '@playwright/test';
import { HealingEngine } from './HealingEngine';
import { buildLocator, describeStrategy } from './buildLocator';
import { ElementDefinition, LocatorStrategy } from './types';

export interface ResolveOptions {
  /** Per-strategy wait budget in ms. Total worst-case ≈ timeout × strategy count. */
  timeout?: number;
  /** State each candidate must reach before it's accepted. */
  state?: 'attached' | 'visible';
}

/**
 * Wraps a set of candidate locator strategies for one logical element and
 * resolves to the first that matches. If the declared primary fails but a
 * fallback succeeds, the engine records a healing event and remembers the
 * working strategy for next time.
 */
export class SelfHealingLocator {
  readonly name: string;
  private readonly strategies: LocatorStrategy[];

  constructor(
    private readonly page: Page,
    definition: ElementDefinition,
    private readonly engine: HealingEngine,
  ) {
    this.name = definition.name;
    this.strategies = definition.strategies;
    if (!this.strategies.length) {
      throw new Error(`Element "${this.name}" was defined with no locator strategies.`);
    }
  }

  /** Resolve to a concrete Locator, healing if necessary. */
  async resolve(options: ResolveOptions = {}): Promise<Locator> {
    const perStrategyTimeout = options.timeout ?? 5_000;
    const state = options.state ?? 'visible';

    const declaredPrimary = this.strategies[0];
    const ordered = this.engine.order(this.name, this.strategies);

    const tried: LocatorStrategy[] = [];
    const failures: string[] = [];

    for (const strategy of ordered) {
      const locator = buildLocator(this.page, strategy).first();
      try {
        await locator.waitFor({ state, timeout: perStrategyTimeout });
        this.engine.recordSuccess(this.name, declaredPrimary, strategy, tried, this.page.url());
        return locator;
      } catch (err) {
        tried.push(strategy);
        failures.push(`  - ${describeStrategy(strategy)} → ${(err as Error).message.split('\n')[0]}`);
      }
    }

    throw new Error(
      `Self-healing failed for "${this.name}": none of ${ordered.length} strategies matched ` +
        `(state="${state}", timeout=${perStrategyTimeout}ms each).\n${failures.join('\n')}`,
    );
  }

  // ---- Convenience actions (resolve then act) ----

  async click(options?: ResolveOptions): Promise<void> {
    await (await this.resolve(options)).click();
  }

  async fill(value: string, options?: ResolveOptions): Promise<void> {
    await (await this.resolve(options)).fill(value);
  }

  async type(value: string, options?: ResolveOptions): Promise<void> {
    await (await this.resolve(options)).pressSequentially(value);
  }

  async textContent(options?: ResolveOptions): Promise<string | null> {
    return (await this.resolve(options)).textContent();
  }

  async isVisible(options?: ResolveOptions): Promise<boolean> {
    try {
      await this.resolve(options);
      return true;
    } catch {
      return false;
    }
  }
}
