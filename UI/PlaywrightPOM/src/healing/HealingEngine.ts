import { TestInfo } from '@playwright/test';
import { LocatorStore } from './locatorStore';
import { describeStrategy, sameStrategy } from './buildLocator';
import { HealingEvent, LocatorStrategy } from './types';

export interface HealingEngineOptions {
  enabled: boolean;
  persist: boolean;
  storePath: string;
  env: string;
}

/**
 * Coordinates self-healing across a test:
 *  - decides the order strategies are attempted (last-known-good first),
 *  - records healing events when a fallback rescues a broken primary locator,
 *  - persists the working strategy, and
 *  - surfaces a summary on the Playwright report.
 */
export class HealingEngine {
  private readonly store: LocatorStore;
  private readonly events: HealingEvent[] = [];

  constructor(private readonly options: HealingEngineOptions) {
    this.store = new LocatorStore(options.storePath);
  }

  get enabled(): boolean {
    return this.options.enabled;
  }

  /**
   * Returns strategies ordered for attempts. When healing is enabled and we have
   * a remembered last-known-good strategy, it is promoted to the front so the
   * common "page drifted" case resolves on the first try.
   */
  order(name: string, strategies: LocatorStrategy[]): LocatorStrategy[] {
    if (!this.options.enabled) return strategies;
    const entry = this.store.get(name);
    if (!entry) return strategies;

    const remembered = entry.lastGood;
    const rest = strategies.filter((s) => !sameStrategy(s, remembered));
    // Only promote if it's actually one of the declared candidates.
    const isDeclared = strategies.some((s) => sameStrategy(s, remembered));
    return isDeclared ? [remembered, ...rest] : strategies;
  }

  /** Called when an element resolves. `healed` is true if it wasn't the declared primary. */
  recordSuccess(
    name: string,
    declaredPrimary: LocatorStrategy,
    used: LocatorStrategy,
    triedBefore: LocatorStrategy[],
    url: string,
  ): void {
    if (!this.options.enabled) return;

    const healed = !sameStrategy(used, declaredPrimary);
    this.store.remember(name, used, healed);

    if (healed) {
      const event: HealingEvent = {
        name,
        env: this.options.env,
        url,
        timestamp: new Date().toISOString(),
        failedStrategies: triedBefore,
        healedStrategy: used,
      };
      this.events.push(event);
      // eslint-disable-next-line no-console
      console.warn(
        `[self-healing] "${name}" healed: primary (${describeStrategy(declaredPrimary)}) ` +
          `failed, recovered with (${describeStrategy(used)}).`,
      );
    }
  }

  events_(): readonly HealingEvent[] {
    return this.events;
  }

  /** Persist the store and attach a healing summary to the test report. */
  async finalize(testInfo?: TestInfo): Promise<void> {
    if (this.options.persist) {
      this.store.flush();
    }
    if (this.events.length && testInfo) {
      await testInfo.attach('self-healing-events.json', {
        body: JSON.stringify(this.events, null, 2),
        contentType: 'application/json',
      });
      testInfo.annotations.push({
        type: 'self-healing',
        description: `${this.events.length} locator(s) healed: ${this.events
          .map((e) => e.name)
          .join(', ')}`,
      });
    }
  }
}
