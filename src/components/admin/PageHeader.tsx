
import { Plus, Search } from 'lucide-react';

export default function PageHeader({
  title,
  count,
  search,
  onSearch,
  onAdd,
  addLabel = 'Add New',
}: {
  title: string;
  count?: number;
  search?: string;
  onSearch?: (v: string) => void;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          {title}
          {count !== undefined && <span className="ml-2 text-white/30">({count})</span>}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              value={search || ''}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-xl border border-white/10 bg-navy-900 py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-gold-400/50 sm:w-56"
            />
          </div>
        )}
        {onAdd && (
          <button onClick={onAdd} className="flex shrink-0 items-center gap-2 rounded-xl bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-105">
            <Plus className="h-4 w-4" /> {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
