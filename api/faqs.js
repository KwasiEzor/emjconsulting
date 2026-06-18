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
 const { data, error } = await supabase.from('faqs').select('*').order('id', { ascending: true });
 if (error) throw error;
 return res.status(200).json(data || []);
 }

 const user = await verifyAdmin(req);
 if (!user) return res.status(401).json({ error: 'Unauthorized' });

 if (req.method === 'POST') {
 const { data, error } = await supabase.from('faqs').insert(req.body).select().single();
 if (error) throw error;
 return res.status(201).json(data);
 }
 if (req.method === 'PUT') {
 const { id, ...updates } = req.body;
 const { data, error } = await supabase.from('faqs').update(updates).eq('id', id).select().single();
 if (error) throw error;
 return res.status(200).json(data);
 }
 if (req.method === 'DELETE') {
 const { id } = req.body;
 const { error } = await supabase.from('faqs').delete().eq('id', id);
 if (error) throw error;
 return res.status(200).json({ ok: true });
 }
 res.status(405).json({ error: 'Method not allowed' });
 } catch (err) {
 console.error('faqs error:', err);
 return res.status(500).json({ error: err.message });
 }
}
