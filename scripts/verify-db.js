import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function verify() {
  try {
    const { default: supabase } = await import('../api/db-client.js');
    const { error } = await supabase.from('messages').select('id').limit(1);
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      process.exit(1);
    }
    console.log('✅ Database connection verified successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed with error:', err.message);
    process.exit(1);
  }
}

verify();
