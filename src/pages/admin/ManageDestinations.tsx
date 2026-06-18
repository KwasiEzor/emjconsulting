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

  const openAdd = () => { setEditItem(null); setForm({ map_x: 50, map_y: 40 }); setModalOpen(true); };
  const openEdit = (item: Destination) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, map_x: Number(form.map_x), map_y: Number(form.map_y) };
    const { error } = editItem ? await update(editItem.id, payload) : await create(payload);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((d) => d.name_fr.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: 'flag', label: 'Flag', render: (d: Destination) => <span className="text-2xl">{d.flag}</span> },
    { key: 'name_fr', label: 'Name (FR)', render: (d: Destination) => <span className="font-medium text-white">{d.name_fr}</span> },
    { key: 'name_en', label: 'Name (EN)' },
    { key: 'region', label: 'Region', render: (d: Destination) => <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{d.region}</span> },
    { key: 'delay_days', label: 'Delay' },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Destinations" count={items.length} search={search} onSearch={setSearch} onAdd={openAdd} addLabel="Add Destination" />
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={(d) => setDeleteItem(d)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Destination' : 'Add Destination'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid>
            <Field label="Name (FR)" required><TextInput value={form.name_fr || ''} onChange={(e) => setForm({ ...form, name_fr: e.target.value })} required /></Field>
            <Field label="Name (EN)" required><TextInput value={form.name_en || ''} onChange={(e) => setForm({ ...form, name_en: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Flag Emoji" required><TextInput value={form.flag || ''} onChange={(e) => setForm({ ...form, flag: e.target.value })} placeholder="🇨🇦" required /></Field>
            <Field label="Region" required><TextInput value={form.region || ''} onChange={(e) => setForm({ ...form, region: e.target.value })} required /></Field>
          </FormGrid>
          <Field label="Image Path" required><TextInput value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/dest-xxx.jpg" required /></Field>
          <Field label="Description (FR)" required><TextArea rows={2} value={form.desc_fr || ''} onChange={(e) => setForm({ ...form, desc_fr: e.target.value })} required /></Field>
          <Field label="Description (EN)" required><TextArea rows={2} value={form.desc_en || ''} onChange={(e) => setForm({ ...form, desc_en: e.target.value })} required /></Field>
          <FormGrid>
            <Field label="Conditions (FR)" required><TextArea rows={3} value={form.conditions_fr || ''} onChange={(e) => setForm({ ...form, conditions_fr: e.target.value })} required /></Field>
            <Field label="Conditions (EN)" required><TextArea rows={3} value={form.conditions_en || ''} onChange={(e) => setForm({ ...form, conditions_en: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Documents (FR)" required><TextArea rows={3} value={form.documents_fr || ''} onChange={(e) => setForm({ ...form, documents_fr: e.target.value })} required /></Field>
            <Field label="Documents (EN)" required><TextArea rows={3} value={form.documents_en || ''} onChange={(e) => setForm({ ...form, documents_en: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Avg Delay" required><TextInput value={form.delay_days || ''} onChange={(e) => setForm({ ...form, delay_days: e.target.value })} placeholder="15 to 30 days" required /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Map X %"><TextInput type="number" min="0" max="100" value={form.map_x ?? ''} onChange={(e) => setForm({ ...form, map_x: Number(e.target.value) })} /></Field>
              <Field label="Map Y %"><TextInput type="number" min="0" max="100" value={form.map_y ?? ''} onChange={(e) => setForm({ ...form, map_y: Number(e.target.value) })} /></Field>
            </div>
          </FormGrid>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Destination"
        message={`Delete "${deleteItem?.name_fr}"? This cannot be undone.`}
      />
    </AdminLayout>
  );
}
