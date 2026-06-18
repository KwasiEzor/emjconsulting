import { useState, useCallback } from 'react';
import { adminFetch } from '../lib/adminFetch';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface AppointmentFull {
  id: number;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

/** Generic admin CRUD hook for any resource */
export function useAdminCrud<T extends { id: number }>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminFetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const create = useCallback(async (payload: Partial<T>) => {
    setSaving(true);
    try {
      const res = await adminFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create');
      await fetchAll();
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setSaving(false);
    }
  }, [endpoint, fetchAll]);

  const update = useCallback(async (id: number, updates: Partial<T>) => {
    setSaving(true);
    try {
      const res = await adminFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify({ id, ...updates }),
      });
      if (!res.ok) throw new Error('Failed to update');
      await fetchAll();
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setSaving(false);
    }
  }, [endpoint, fetchAll]);

  const remove = useCallback(async (id: number) => {
    setSaving(true);
    try {
      const res = await adminFetch(endpoint, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchAll();
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setSaving(false);
    }
  }, [endpoint, fetchAll]);

  return { items, loading, error, saving, fetchAll, create, update, remove };
}
