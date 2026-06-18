import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, FormGrid } from '../../components/admin/FormFields';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Service } from '../../hooks/useData';

const ICON_OPTIONS = ['Plane', 'GraduationCap', 'Briefcase', 'Users', 'FileText', 'Hotel', 'Ticket', 'ShieldCheck', 'Compass', 'Globe', 'Heart', 'Star', 'Award', 'Building2'];

export default function ManageServices() {
  const { items, loading, saving, fetchAll, create, update, remove } = useAdminCrud<Service>('/api/services');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Service | null>(null);
  const [deleteItem, setDeleteItem] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => { setEditItem(null); setForm({}); setModalOpen(true); };
  const openEdit = (item: Service) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = editItem ? await update(editItem.id, form) : await create(form);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((s) =>
    s.title_fr.toLowerCase().includes(search.toLowerCase()) ||
    s.title_en.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'icon', label: 'Icon', render: (s: Service) => { const Icon = (Icons as any)[s.icon] || Icons.FileText; return <Icon className="h-5 w-5 text-gold-400" />; } },
    { key: 'title_fr', label: 'Title (FR)', render: (s: Service) => <span className="font-medium text-white">{s.title_fr}</span> },
    { key: 'title_en', label: 'Title (EN)' },
    { key: 'desc_fr', label: 'Description', render: (s: Service) => <span className="line-clamp-1 max-w-xs text-white/50">{s.desc_fr}</span> },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Services" count={items.length} search={search} onSearch={setSearch} onAdd={openAdd} addLabel="Add Service" />
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={(s) => setDeleteItem(s)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid>
            <Field label="Icon" required>
              <Select value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} required>
                <option value="">Select icon...</option>
                {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </Select>
            </Field>
            <div />
            <Field label="Title (FR)" required><TextInput value={form.title_fr || ''} onChange={(e) => setForm({ ...form, title_fr: e.target.value })} required /></Field>
            <Field label="Title (EN)" required><TextInput value={form.title_en || ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required /></Field>
          </FormGrid>
          <Field label="Description (FR)" required><TextArea rows={2} value={form.desc_fr || ''} onChange={(e) => setForm({ ...form, desc_fr: e.target.value })} required /></Field>
          <Field label="Description (EN)" required><TextArea rows={2} value={form.desc_en || ''} onChange={(e) => setForm({ ...form, desc_en: e.target.value })} required /></Field>
          <FormGrid>
            <Field label="Benefits (FR) — one per line" required><TextArea rows={4} value={form.benefits_fr || ''} onChange={(e) => setForm({ ...form, benefits_fr: e.target.value })} required /></Field>
            <Field label="Benefits (EN) — one per line" required><TextArea rows={4} value={form.benefits_en || ''} onChange={(e) => setForm({ ...form, benefits_en: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Process (FR) — one per line" required><TextArea rows={4} value={form.process_fr || ''} onChange={(e) => setForm({ ...form, process_fr: e.target.value })} required /></Field>
            <Field label="Process (EN) — one per line" required><TextArea rows={4} value={form.process_en || ''} onChange={(e) => setForm({ ...form, process_en: e.target.value })} required /></Field>
          </FormGrid>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteItem?.title_fr}"? This cannot be undone.`}
      />
    </AdminLayout>
  );
}

export function FormActions({ saving, onCancel, isEdit }: { saving: boolean; onCancel: () => void; isEdit: boolean }) {
  return (
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5">Cancel</button>
      <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-gold-gradient px-4 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60">
        {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
      </button>
    </div>
  );
}
