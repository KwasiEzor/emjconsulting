import { useState, useEffect } from 'react';
import { Mail, Phone, Globe, Trash2, MailOpen } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Modal from '../../components/admin/Modal';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { ContactMessage } from '../../hooks/useAdminCrud';

export default function ManageMessages() {
  const { items, loading, fetchAll, update, remove } = useAdminCrud<ContactMessage>('/api/messages');
  const [deleteItem, setDeleteItem] = useState<ContactMessage | null>(null);
  const [viewItem, setViewItem] = useState<ContactMessage | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openMessage = async (msg: ContactMessage) => {
    setViewItem(msg);
    if (msg.status === 'new') await update(msg.id, { status: 'read' });
  };

  return (
    <AdminLayout>
      <PageHeader title="Messages" count={items.length} />

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-white/5" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-navy-900 py-16 text-center text-white/40">No messages yet</div>
      ) : (
        <div className="space-y-2">
          {items.map((m) => (
            <div key={m.id} className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${m.status === 'new' ? 'border-gold-400/30 bg-gold-400/5' : 'border-white/10 bg-navy-900 hover:bg-white/5'}`}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${m.status === 'new' ? 'bg-gold-gradient text-navy-900' : 'bg-white/10 text-white/60'}`}>
                {m.name.charAt(0).toUpperCase()}
              </div>
              <button onClick={() => openMessage(m)} className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-white">{m.name}</span>
                  {m.status === 'new' && <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-400">New</span>}
                </div>
                <div className="truncate text-sm text-white/50">{m.email} • {m.message}</div>
              </button>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => openMessage(m)} className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-gold-400" title="View"><MailOpen className="h-4 w-4" /></button>
                <button onClick={() => setDeleteItem(m)} className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400" title="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Message Details" maxWidth="max-w-lg">
        {viewItem && (
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/40">From</div>
              <div className="font-display text-lg font-bold text-white">{viewItem.name}</div>
            </div>
            <div className="grid gap-3 rounded-xl bg-white/5 p-4 text-sm">
              <a href={`mailto:${viewItem.email}`} className="flex items-center gap-2 text-white/70 hover:text-gold-400"><Mail className="h-4 w-4 text-gold-400" /> {viewItem.email}</a>
              {viewItem.phone && <div className="flex items-center gap-2 text-white/70"><Phone className="h-4 w-4 text-gold-400" /> {viewItem.phone}</div>}
              {viewItem.country && <div className="flex items-center gap-2 text-white/70"><Globe className="h-4 w-4 text-gold-400" /> {viewItem.country}</div>}
            </div>
            <div>
              <div className="mb-1.5 text-xs uppercase tracking-wide text-white/40">Message</div>
              <p className="rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-white/80">{viewItem.message}</p>
            </div>
            <div className="text-xs text-white/30">Received: {new Date(viewItem.created_at).toLocaleString()}</div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Message"
        message="Delete this message permanently?"
      />
    </AdminLayout>
  );
}
