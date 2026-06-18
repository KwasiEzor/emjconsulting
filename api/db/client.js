import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from project root
const envPath = resolve(process.cwd(), '.env.local');
const envPathParent = resolve(process.cwd(), '..', '.env.local');
config({ path: envPath });
config({ path: envPathParent });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL not found in environment variables');
}

// Create postgres client
const client = postgres(connectionString, {
  max: 1,
  ssl: 'prefer',
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

// Create drizzle instance
export const db = drizzle(client, { schema });

export { schema };
