import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '..', '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'prefer' });

async function inspectSchema() {
  try {
    // Get columns for appointments table
    const columns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'appointments'
      ORDER BY ordinal_position;
    `;

    console.log('Appointments table structure:');
    console.log(columns);

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

inspectSchema();
