import { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { AppointmentFull } from '../../hooks/useAdminCrud';

const STATUSES = ['pending', 'confirmed', 'done', 'cancelled'];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  done: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export default function ManageAppointments() {
  const { items, loading, fetchAll, update, remove } = useAdminCrud<AppointmentFull>('/api/appointments-admin');
  const [deleteItem, setDeleteItem] = useState<AppointmentFull | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = filter === 'all' ? items : items.filter((a) => a.status === filter);

  return (
    <AdminLayout>
      <PageHeader title="Appointments" count={items.length} />

      <div className="mb-4 flex flex-wrap gap-2">
        {['all', ...STATUSES].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${filter === s ? 'bg-gold-gradient text-navy-900' : 'border border-white/10 text-white/60 hover:bg-white/5'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-white/5" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-navy-900 py-16 text-center text-white/40">No appointments found</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => (
            <div key={a.id} className="rounded-xl border border-white/10 bg-navy-900 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{a.name}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[a.status] || statusColors.pending}`}>{a.status}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {a.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.time}</span>
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {a.email}</span>
                    {a.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {a.phone}</span>}
                  </div>
                  <div className="mt-1.5 text-sm text-white/60">Service: <span className="text-white/80">{a.service}</span></div>
                  {a.notes && <div className="mt-1 text-xs text-white/40">Note: {a.notes}</div>}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <select
                    value={a.status}
                    onChange={(e) => update(a.id, { status: e.target.value })}
                    className="rounded-lg border border-white/10 bg-navy-800 px-2.5 py-1.5 text-xs text-white outline-none focus:border-gold-400/50"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => setDeleteItem(a)} className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Appointment"
        message={`Delete appointment for "${deleteItem?.name}"?`}
      />
    </AdminLayout>
  );
}
