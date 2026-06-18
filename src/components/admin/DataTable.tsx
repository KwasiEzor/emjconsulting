import { ReactNode } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export default function DataTable<T extends { id: number }>({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
}: {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-navy-900 py-16 text-center">
        <p className="text-white/40">No items found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((col) => (
                <th key={col.key} className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/40 ${col.className || ''}`}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-white/40">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/5"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-white/80 ${col.className || ''}`}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-gold-400" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
