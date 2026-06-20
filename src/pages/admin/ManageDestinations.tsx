import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, FormGrid } from '../../components/admin/FormFields';
import { FormActions } from './ManageServices';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Destination } from '../../hooks/useData';

export default function ManageDestinations() {
  const { items, loading, saving, fetchAll, create, update, remove } = useAdminCrud<Destination>('/api/destinations');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Destination | null>(null);
  const [deleteItem, setDeleteItem] = useState<Destination | null>(null);
  const [form, setForm] = useState<Partial<Destination>>({});

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => { setEditItem(null); setForm({}); setModalOpen(true); };
  const openEdit = (item: Destination) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = editItem ? await update(editItem.id, form) : await create(form);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((d) => d.nameFr.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: 'flagEmoji', label: 'Flag', render: (d: Destination) => <span className="text-2xl">{d.flagEmoji}</span> },
    { key: 'nameFr', label: 'Name (FR)', render: (d: Destination) => <span className="font-medium text-white">{d.nameFr}</span> },
    { key: 'nameEn', label: 'Name (EN)' },
    { key: 'continent', label: 'Continent', render: (d: Destination) => <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{d.continent}</span> },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Destinations" count={items.length} search={search} onSearch={setSearch} onAdd={openAdd} addLabel="Add Destination" />
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={(d) => setDeleteItem(d)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Destination' : 'Add Destination'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid>
            <Field label="Name (FR)" required><TextInput value={form.nameFr || ''} onChange={(e) => setForm({ ...form, nameFr: e.target.value })} required /></Field>
            <Field label="Name (EN)" required><TextInput value={form.nameEn || ''} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Flag Emoji" required><TextInput value={form.flagEmoji || ''} onChange={(e) => setForm({ ...form, flagEmoji: e.target.value })} placeholder="🇨🇦" required /></Field>
            <Field label="Continent" required><TextInput value={form.continent || ''} onChange={(e) => setForm({ ...form, continent: e.target.value })} required /></Field>
          </FormGrid>
          <Field label="Image URL" required><TextInput value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/images/dest-xxx.jpg" required /></Field>
          <Field label="Description (FR)" required><TextArea rows={3} value={form.descriptionFr || ''} onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })} required /></Field>
          <Field label="Description (EN)" required><TextArea rows={3} value={form.descriptionEn || ''} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} required /></Field>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Destination"
        message={`Delete "${deleteItem?.nameFr}"? This cannot be undone.`}
      />
    </AdminLayout>
  );
}
