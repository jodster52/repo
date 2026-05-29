import * as fs from 'fs';
import * as path from 'path';
import { HealingStoreShape, LocatorStrategy, StoreEntry } from './types';

/**
 * A tiny file-backed key/value store that remembers which locator strategy last
 * worked for each named element. On the next run the engine tries that strategy
 * first, so a page that has "drifted" is resolved quickly instead of paying the
 * full fallback cost every time.
 */
export class LocatorStore {
  private data: HealingStoreShape = { version: 1, entries: {} };
  private dirty = false;

  constructor(private readonly filePath: string) {
    this.load();
  }

  private load(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw) as HealingStoreShape;
        if (parsed && parsed.version === 1 && parsed.entries) {
          this.data = parsed;
        }
      }
    } catch {
      // A corrupt store should never fail the suite — start fresh.
      this.data = { version: 1, entries: {} };
    }
  }

  get(name: string): StoreEntry | undefined {
    return this.data.entries[name];
  }

  /** Record the strategy that resolved an element. */
  remember(name: string, strategy: LocatorStrategy, healed: boolean): void {
    const existing = this.data.entries[name];
    this.data.entries[name] = {
      lastGood: strategy,
      healCount: (existing?.healCount ?? 0) + (healed ? 1 : 0),
      lastUpdated: new Date().toISOString(),
    };
    this.dirty = true;
  }

  /** Persist to disk if anything changed. */
  flush(): void {
    if (!this.dirty) return;
    const dir = path.dirname(this.filePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    this.dirty = false;
  }

  snapshot(): HealingStoreShape {
    return JSON.parse(JSON.stringify(this.data)) as HealingStoreShape;
  }
}
