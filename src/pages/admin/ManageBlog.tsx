import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, FormGrid } from '../../components/admin/FormFields';
import { FormActions } from './ManageServices';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { BlogPost } from '../../hooks/useData';

export default function ManageBlog() {
  const { items, loading, saving, fetchAll, create, update, remove } = useAdminCrud<BlogPost>('/api/blog-posts');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);
  const [deleteItem, setDeleteItem] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => { setEditItem(null); setForm({ readingTime: 5, author: 'EMJ Team' }); setModalOpen(true); };
  const openEdit = (item: BlogPost) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, readingTime: Number(form.readingTime) };
    const { error } = editItem ? await update(editItem.id, payload) : await create(payload);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((p) => p.titleFr.toLowerCase().includes(search.toLowerCase()) || p.titleEn.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: 'imageUrl', label: 'Image', render: (p: BlogPost) => <img src={p.imageUrl} alt="" className="h-10 w-14 rounded object-cover" /> },
    { key: 'titleFr', label: 'Title (FR)', render: (p: BlogPost) => <span className="font-medium text-white">{p.titleFr}</span> },
    { key: 'categoryId', label: 'Category', render: (p: BlogPost) => <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{p.categoryId}</span> },
    { key: 'author', label: 'Author' },
    { key: 'readingTime', label: 'Read', render: (p: BlogPost) => <span>{p.readingTime} min</span> },
    { key: 'createdAt', label: 'Date', render: (p: BlogPost) => <span className="text-white/50">{new Date(p.createdAt).toLocaleDateString()}</span> },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Blog Posts" count={items.length} search={search} onSearch={setSearch} onAdd={openAdd} addLabel="Add Post" />
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={(p) => setDeleteItem(p)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Post' : 'Add Post'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid>
            <Field label="Title (FR)" required><TextInput value={form.titleFr || ''} onChange={(e) => setForm({ ...form, titleFr: e.target.value })} required /></Field>
            <Field label="Title (EN)" required><TextInput value={form.titleEn || ''} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Category ID" required><TextInput value={form.categoryId || ''} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} placeholder="UUID" required /></Field>
            <Field label="Author" required><TextInput value={form.author || ''} onChange={(e) => setForm({ ...form, author: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Image URL" required><TextInput value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/images/blog-1.jpg" required /></Field>
            <Field label="Read Time (min)" required><TextInput type="number" min="1" value={form.readingTime ?? ''} onChange={(e) => setForm({ ...form, readingTime: Number(e.target.value) })} required /></Field>
          </FormGrid>
          <Field label="Excerpt (FR)" required><TextArea rows={2} value={form.excerptFr || ''} onChange={(e) => setForm({ ...form, excerptFr: e.target.value })} required /></Field>
          <Field label="Excerpt (EN)" required><TextArea rows={2} value={form.excerptEn || ''} onChange={(e) => setForm({ ...form, excerptEn: e.target.value })} required /></Field>
          <Field label="Content (FR)" required><TextArea rows={5} value={form.contentFr || ''} onChange={(e) => setForm({ ...form, contentFr: e.target.value })} required /></Field>
          <Field label="Content (EN)" required><TextArea rows={5} value={form.contentEn || ''} onChange={(e) => setForm({ ...form, contentEn: e.target.value })} required /></Field>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Post"
        message={`Delete "${deleteItem?.titleFr}"? This cannot be undone.`}
      />
    </AdminLayout>
  );
}
