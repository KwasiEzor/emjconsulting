import { db, schema } from './db/client.js';

async function testConnection() {
  try {
    console.log('Testing Drizzle + Supabase connection...');

    // Test query - fetch all appointments
    const appointments = await db
      .select()
      .from(schema.appointments)
      .limit(5);

    console.log('✓ Connection successful!');
    console.log(`Found ${appointments.length} appointments`);
    console.log('Sample data:', appointments[0] || 'No appointments yet');

    process.exit(0);
  } catch (error) {
    console.error('✗ Connection failed:', error);
    process.exit(1);
  }
}

testConnection();
