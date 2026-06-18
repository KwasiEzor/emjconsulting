import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Field, TextInput, TextArea, Select, FormGrid } from '../../components/admin/FormFields';
import { FormActions } from './ManageServices';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { BlogPost } from '../../hooks/useData';

const CATEGORIES = [
  { value: 'tips', label: 'Conseils voyage' },
  { value: 'student', label: 'Visa étudiant' },
  { value: 'immigration', label: 'Immigration' },
  { value: 'news', label: 'Actualités' },
];

export default function ManageBlog() {
  const { items, loading, saving, fetchAll, create, update, remove } = useAdminCrud<BlogPost>('/api/blog-posts');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);
  const [deleteItem, setDeleteItem] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => { setEditItem(null); setForm({ category: 'tips', read_time: 5, author: 'EMJ Team' }); setModalOpen(true); };
  const openEdit = (item: BlogPost) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, read_time: Number(form.read_time) };
    const { error } = editItem ? await update(editItem.id, payload) : await create(payload);
    if (!error) setModalOpen(false);
  };

  const filtered = items.filter((p) => p.title_fr.toLowerCase().includes(search.toLowerCase()) || p.title_en.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { key: 'image', label: 'Image', render: (p: BlogPost) => <img src={p.image} alt="" className="h-10 w-14 rounded object-cover" /> },
    { key: 'title_fr', label: 'Title (FR)', render: (p: BlogPost) => <span className="font-medium text-white">{p.title_fr}</span> },
    { key: 'category', label: 'Category', render: (p: BlogPost) => <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{p.category}</span> },
    { key: 'author', label: 'Author' },
    { key: 'read_time', label: 'Read', render: (p: BlogPost) => <span>{p.read_time} min</span> },
    { key: 'created_at', label: 'Date', render: (p: BlogPost) => <span className="text-white/50">{new Date(p.created_at).toLocaleDateString()}</span> },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Blog Posts" count={items.length} search={search} onSearch={setSearch} onAdd={openAdd} addLabel="Add Post" />
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={openEdit} onDelete={(p) => setDeleteItem(p)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Post' : 'Add Post'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid>
            <Field label="Title (FR)" required><TextInput value={form.title_fr || ''} onChange={(e) => setForm({ ...form, title_fr: e.target.value })} required /></Field>
            <Field label="Title (EN)" required><TextInput value={form.title_en || ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Category" required>
              <Select value={form.category || 'tips'} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </Select>
            </Field>
            <Field label="Author" required><TextInput value={form.author || ''} onChange={(e) => setForm({ ...form, author: e.target.value })} required /></Field>
          </FormGrid>
          <FormGrid>
            <Field label="Image Path" required><TextInput value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/blog-1.jpg" required /></Field>
            <Field label="Read Time (min)" required><TextInput type="number" min="1" value={form.read_time ?? ''} onChange={(e) => setForm({ ...form, read_time: Number(e.target.value) })} required /></Field>
          </FormGrid>
          <Field label="Excerpt (FR)" required><TextArea rows={2} value={form.excerpt_fr || ''} onChange={(e) => setForm({ ...form, excerpt_fr: e.target.value })} required /></Field>
          <Field label="Excerpt (EN)" required><TextArea rows={2} value={form.excerpt_en || ''} onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })} required /></Field>
          <Field label="Content (FR)" required><TextArea rows={5} value={form.content_fr || ''} onChange={(e) => setForm({ ...form, content_fr: e.target.value })} required /></Field>
          <Field label="Content (EN)" required><TextArea rows={5} value={form.content_en || ''} onChange={(e) => setForm({ ...form, content_en: e.target.value })} required /></Field>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete Post"
        message={`Delete "${deleteItem?.title_fr}"? This cannot be undone.`}
      />
    </AdminLayout>
  );
}
