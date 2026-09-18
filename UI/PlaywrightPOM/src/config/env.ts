import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Environment strategy
 * ---------------------
 * 1. The active environment is chosen with the `ENV` variable
 *    (falls back to `NODE_ENV`, then `dev`).
 * 2. The base `.env` file is loaded first to provide shared defaults.
 * 3. The environment-specific file `.env.<ENV>` is loaded with `override: true`
 *    so its values win over the shared defaults.
 *
 * Example:
 *   cross-env ENV=qa playwright test
 *   -> loads `.env` then `.env.qa`
 */

const ENV = (process.env.ENV || process.env.NODE_ENV || 'dev').toLowerCase();

const root = process.cwd();

// 1. Shared defaults.
dotenv.config({ path: path.resolve(root, '.env') });

// 2. Environment-specific overrides.
const envFile = path.resolve(root, `.env.${ENV}`);
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile, override: true });
} else {
  console.warn(
    `[env] No environment file found for "${ENV}" at ${envFile}. ` +
      `Falling back to base .env / process defaults.`,
  );
}

const bool = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
};

const num = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export interface AppEnv {
  /** Active environment name (dev | qa | prod | ...). */
  name: string;
  baseURL: string;
  apiURL: string;
  credentials: {
    username: string;
    password: string;
  };
  headless: boolean;
  timeout: number;
  retries: number;
  workers: number | undefined;
}

export const env: AppEnv = {
  name: ENV,
  baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
  apiURL: process.env.API_URL ?? '',
  credentials: {
    username: process.env.APP_USERNAME ?? '',
    password: process.env.APP_PASSWORD ?? '',
  },
  headless: bool(process.env.HEADLESS, true),
  timeout: num(process.env.TIMEOUT, 30_000),
  retries: num(process.env.RETRIES, 0),
  workers: process.env.WORKERS ? num(process.env.WORKERS, 1) : undefined,
};

console.log(
  `[env] ENV=${env.name} — loaded .env${fs.existsSync(envFile) ? ` + .env.${ENV}` : ' (no .env.' + ENV + ' found)'} → baseURL=${env.baseURL}`,
);

export default env;
