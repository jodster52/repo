import { Page, Locator } from '@playwright/test';
import { LocatorStrategy } from './types';

/**
 * Detects strings of the form `/pattern/flags` and converts them to a RegExp so
 * persisted, JSON-safe strategies can still drive Playwright's RegExp matchers.
 */
function asMatcher(value: string): string | RegExp {
  const regexLike = /^\/(.+)\/([gimsuy]*)$/.exec(value);
  if (regexLike) {
    return new RegExp(regexLike[1], regexLike[2]);
  }
  return value;
}

/** Turn a declarative strategy into a concrete Playwright Locator. */
export function buildLocator(page: Page, strategy: LocatorStrategy): Locator {
  const { type, value, name, exact } = strategy;

  switch (type) {
    case 'testId':
      return page.getByTestId(value);
    case 'role':
      return page.getByRole(value as Parameters<Page['getByRole']>[0], {
        ...(name !== undefined ? { name: asMatcher(name) } : {}),
        ...(exact !== undefined ? { exact } : {}),
      });
    case 'label':
      return page.getByLabel(asMatcher(value), exact !== undefined ? { exact } : undefined);
    case 'placeholder':
      return page.getByPlaceholder(asMatcher(value), exact !== undefined ? { exact } : undefined);
    case 'text':
      return page.getByText(asMatcher(value), exact !== undefined ? { exact } : undefined);
    case 'altText':
      return page.getByAltText(asMatcher(value), exact !== undefined ? { exact } : undefined);
    case 'title':
      return page.getByTitle(asMatcher(value), exact !== undefined ? { exact } : undefined);
    case 'css':
      return page.locator(value);
    case 'xpath':
      return page.locator(value.startsWith('xpath=') ? value : `xpath=${value}`);
    default: {
      // Exhaustiveness guard.
      const _never: never = type;
      throw new Error(`Unsupported locator strategy type: ${String(_never)}`);
    }
  }
}

/** Human-readable description used in logs and error messages. */
export function describeStrategy(strategy: LocatorStrategy): string {
  const parts = [`${strategy.type}=${JSON.stringify(strategy.value)}`];
  if (strategy.name !== undefined) parts.push(`name=${JSON.stringify(strategy.name)}`);
  if (strategy.exact) parts.push('exact');
  return parts.join(' ');
}

export function sameStrategy(a: LocatorStrategy, b: LocatorStrategy): boolean {
  return a.type === b.type && a.value === b.value && a.name === b.name && !!a.exact === !!b.exact;
}
