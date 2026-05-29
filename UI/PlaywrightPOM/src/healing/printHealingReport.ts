/* eslint-disable no-console */
import * as fs from 'fs';
import { env } from '../config/env';
import { HealingStoreShape } from './types';
import { describeStrategy } from './buildLocator';

/**
 * CLI helper: prints the persisted healing store so you can see which elements
 * have drifted from their declared primary strategy. Run with `npm run healing:report`.
 */
function main(): void {
  const file = env.healing.storePath;
  if (!fs.existsSync(file)) {
    console.log(`No healing store found at "${file}". Run the suite first.`);
    return;
  }

  const store = JSON.parse(fs.readFileSync(file, 'utf-8')) as HealingStoreShape;
  const entries = Object.entries(store.entries);

  if (!entries.length) {
    console.log('Healing store is empty — no elements recorded yet.');
    return;
  }

  console.log(`\nSelf-healing store (${file})`);
  console.log('='.repeat(60));
  for (const [name, entry] of entries) {
    const flag = entry.healCount > 0 ? '⚠ healed' : '✓ stable';
    console.log(`\n${name}  [${flag}, heals=${entry.healCount}]`);
    console.log(`  last-good : ${describeStrategy(entry.lastGood)}`);
    console.log(`  updated   : ${entry.lastUpdated}`);
  }
  console.log('\n' + '='.repeat(60));
  const drifted = entries.filter(([, e]) => e.healCount > 0);
  console.log(`${drifted.length}/${entries.length} element(s) have healed at least once.\n`);
}

main();
