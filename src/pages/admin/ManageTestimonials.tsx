import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, FormGrid } from '../../components/admin/FormFields';
import { FormActions } from './ManageServices';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Testimonial } from '../../hooks/useData';

export default function ManageTestimonials() {
  const { items, loading, saving, fetchAll, create, update, remove } = useAdminCrud<Testimonial>('/api/testimonials');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [deleteItem, setDeleteItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => { setEditItem(null); setForm({ rating: 5 }); setModalOpen(true); };
  const openEdit = (item: Testimonial) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, rating: Number(form.rating) };
    const { error } = editItem ? await update(editItem.id, payload) : await create(payload);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: 'avatar', label: 'Avatar', render: (t: Testimonial) => <img src={t.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> },
    { key: 'name', label: 'Name', render: (t: Testimonial) => <span className="font-medium text-white">{t.name}</span> },
    { key: 'role_fr', label: 'Role' },
    { key: 'rating', label: 'Rating', render: (t: Testimonial) => <span className="text-gold-400">{'★'.repeat(t.rating)}</span> },
    { key: 'text_fr', label: 'Text', render: (t: Testimonial) => <span className="line-clamp-1 max-w-xs text-white/50">{t.text_fr}</span> },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Testimonials" count={items.length} search={search} onSearch={setSearch} onAdd={openAdd} addLabel="Add Testimonial" />
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={(t) => setDeleteItem(t)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid>
            <Field label="Name" required><TextInput value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
            <Field label="Rating" required>
              <Select value={form.rating || 5} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{'★'.repeat(r)}</option>)}
              </Select>
            </Field>
          </FormGrid>
          <FormGrid>
            <Field label="Role (FR)" required><TextInput value={form.role_fr || ''} onChange={(e) => setForm({ ...form, role_fr: e.target.value })} required /></Field>
            <Field label="Role (EN)" required><TextInput value={form.role_en || ''} onChange={(e) => setForm({ ...form, role_en: e.target.value })} required /></Field>
          </FormGrid>
          <Field label="Avatar Path" required><TextInput value={form.avatar || ''} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="/images/avatar-1.jpg" required /></Field>
          <Field label="Text (FR)" required><TextArea rows={3} value={form.text_fr || ''} onChange={(e) => setForm({ ...form, text_fr: e.target.value })} required /></Field>
          <Field label="Text (EN)" required><TextArea rows={3} value={form.text_en || ''} onChange={(e) => setForm({ ...form, text_en: e.target.value })} required /></Field>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Testimonial"
        message={`Delete "${deleteItem?.name}"? This cannot be undone.`}
      />
    </AdminLayout>
  );
}
