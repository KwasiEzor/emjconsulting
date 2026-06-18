import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Field, TextArea } from '../../components/admin/FormFields';
import { FormActions } from './ManageServices';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Faq } from '../../hooks/useData';

export default function ManageFaqs() {
  const { items, loading, saving, fetchAll, create, update, remove } = useAdminCrud<Faq>('/api/faqs');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Faq | null>(null);
  const [deleteItem, setDeleteItem] = useState<Faq | null>(null);
  const [form, setForm] = useState<Partial<Faq>>({});

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openAdd = () => { setEditItem(null); setForm({}); setModalOpen(true); };
  const openEdit = (item: Faq) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = editItem ? await update(editItem.id, form) : await create(form);
    if (!error) setModalOpen(false);
  };

  const columns = [
    { key: 'question_fr', label: 'Question (FR)', render: (f: Faq) => <span className="font-medium text-white">{f.question_fr}</span> },
    { key: 'answer_fr', label: 'Answer (FR)', render: (f: Faq) => <span className="line-clamp-2 max-w-md text-white/50">{f.answer_fr}</span> },
  ];

  return (
    <AdminLayout>
      <PageHeader title="FAQs" count={items.length} onAdd={openAdd} addLabel="Add FAQ" />
      <DataTable columns={columns} data={items} loading={loading} onEdit={openEdit} onDelete={(f) => setDeleteItem(f)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit FAQ' : 'Add FAQ'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Question (FR)" required><TextArea rows={2} value={form.question_fr || ''} onChange={(e) => setForm({ ...form, question_fr: e.target.value })} required /></Field>
          <Field label="Question (EN)" required><TextArea rows={2} value={form.question_en || ''} onChange={(e) => setForm({ ...form, question_en: e.target.value })} required /></Field>
          <Field label="Answer (FR)" required><TextArea rows={4} value={form.answer_fr || ''} onChange={(e) => setForm({ ...form, answer_fr: e.target.value })} required /></Field>
          <Field label="Answer (EN)" required><TextArea rows={4} value={form.answer_en || ''} onChange={(e) => setForm({ ...form, answer_en: e.target.value })} required /></Field>
          <FormActions saving={saving} onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => { await remove(deleteItem!.id); setDeleteItem(null); }}
        title="Delete FAQ"
        message="Delete this FAQ? This cannot be undone."
      />
    </AdminLayout>
  );
}
