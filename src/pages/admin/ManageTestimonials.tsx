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

  const openAdd = () => { setEditItem(null); setForm({ rating: '5' }); setModalOpen(true); };
  const openEdit = (item: Testimonial) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = editItem ? await update(editItem.id, form) : await create(form);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: 'imageUrl', label: 'Avatar', render: (t: Testimonial) => t.imageUrl ? <img src={t.imageUrl} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="h-9 w-9 rounded-full bg-white/10" /> },
    { key: 'name', label: 'Name', render: (t: Testimonial) => <span className="font-medium text-white">{t.name}</span> },
    { key: 'role', label: 'Role' },
    { key: 'rating', label: 'Rating', render: (t: Testimonial) => <span className="text-gold-400">{'★'.repeat(Number(t.rating || 5))}</span> },
    { key: 'content', label: 'Text', render: (t: Testimonial) => <span className="line-clamp-1 max-w-xs text-white/50">{t.content}</span> },
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
              <Select value={form.rating || '5'} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                {['5', '4', '3', '2', '1'].map((r) => <option key={r} value={r}>{'★'.repeat(Number(r))}</option>)}
              </Select>
            </Field>
          </FormGrid>
          <Field label="Role"><TextInput value={form.role || ''} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Client role or title" /></Field>
          <Field label="Image URL"><TextInput value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/images/avatar-1.jpg" /></Field>
          <Field label="Testimonial Text" required><TextArea rows={4} value={form.content || ''} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></Field>
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
