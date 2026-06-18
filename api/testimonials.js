import { db, schema } from './db/client.js';
import { asc, eq } from 'drizzle-orm';
import supabase from './db-client.js';

async function verifyAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const data = await db
        .select()
        .from(schema.testimonials)
        .orderBy(asc(schema.testimonials.order));
      return res.status(200).json(data || []);
    }

    // All mutations require admin auth
    const user = await verifyAdmin(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'POST') {
      const data = await db
        .insert(schema.testimonials)
        .values(req.body)
        .returning();
      return res.status(201).json(data[0]);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const data = await db
        .update(schema.testimonials)
        .set(updates)
        .where(eq(schema.testimonials.id, id))
        .returning();
      return res.status(200).json(data[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await db
        .delete(schema.testimonials)
        .where(eq(schema.testimonials.id, id));
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('testimonials error:', err);
    return res.status(500).json({ error: err.message });
  }
}
