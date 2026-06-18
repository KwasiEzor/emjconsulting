import { db, schema } from './db/client.js';
import { asc } from 'drizzle-orm';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const data = await db
        .select({
          date: schema.appointments.date,
          time: schema.appointments.time,
        })
        .from(schema.appointments)
        .orderBy(asc(schema.appointments.date));
      return res.status(200).json(data || []);
    }
    if (req.method === 'POST') {
      const { service, date, time, name, email, phone, notes } = req.body || {};
      if (!date || !time || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const data = await db
        .insert(schema.appointments)
        .values({
          serviceId: service || null, // Map service to serviceId (can be null)
          date,
          time,
          name,
          email,
          phone: phone || null,
          notes: notes || null,
          status: 'pending',
        })
        .returning();
      return res.status(201).json(data[0]);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('appointments error:', err);
    return res.status(500).json({ error: err.message });
  }
}