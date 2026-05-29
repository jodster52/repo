/**
 * A single locator strategy. Strategies are intentionally plain, JSON-friendly
 * objects so the healing store can persist the last-known-good strategy for an
 * element across runs.
 *
 * String values that look like `/pattern/flags` are treated as regular
 * expressions when applied (see `buildLocator`). This keeps strategies
 * serializable while still supporting Playwright's RegExp-based matchers.
 */
export type StrategyType =
  | 'testId'
  | 'role'
  | 'label'
  | 'placeholder'
  | 'text'
  | 'altText'
  | 'title'
  | 'css'
  | 'xpath';

export interface LocatorStrategy {
  type: StrategyType;
  /** Selector / accessible name target depending on `type`. */
  value: string;
  /** Accessible name, only used when `type === 'role'`. */
  name?: string;
  /** Require an exact match for name-based matchers. */
  exact?: boolean;
}

export interface ElementDefinition {
  /** Stable, human-readable key used by the healing store and logs. */
  name: string;
  /** Candidate strategies in priority order (most-preferred first). */
  strategies: LocatorStrategy[];
}

export interface HealingEvent {
  name: string;
  env: string;
  url: string;
  timestamp: string;
  failedStrategies: LocatorStrategy[];
  healedStrategy: LocatorStrategy;
}

export interface StoreEntry {
  /** Last strategy that successfully resolved this element. */
  lastGood: LocatorStrategy;
  healCount: number;
  lastUpdated: string;
}

export interface HealingStoreShape {
  version: 1;
  entries: Record<string, StoreEntry>;
}
