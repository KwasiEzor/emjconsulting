import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Subscriber } from '../../hooks/useAdminCrud';

export default function ManageSubscribers() {
  const { items, loading, fetchAll, remove } = useAdminCrud<Subscriber>('/api/subscribers');
  const [deleteItem, setDeleteItem] = useState<Subscriber | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const exportCsv = () => {
    const csv = ['email,subscribed_at', ...items.map((s) => `${s.email},${new Date(s.created_at).toISOString()}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <PageHeader title="Subscribers" count={items.length} onAdd={items.length > 0 ? exportCsv : undefined} addLabel="Export CSV" />

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-navy-900 py-16 text-center text-white/40">No subscribers yet</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
          {items.map((s, i) => (
            <div key={s.id} className={`flex items-center justify-between px-4 py-3 ${i !== items.length - 1 ? 'border-b border-white/5' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/60">@</div>
                <div>
                  <div className="text-sm font-medium text-white">{s.email}</div>
                  <div className="text-xs text-white/40">Subscribed {new Date(s.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <button onClick={() => setDeleteItem(s)} className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Remove Subscriber"
        message={`Remove ${deleteItem?.email} from the newsletter?`}
      />
    </AdminLayout>
  );
}
