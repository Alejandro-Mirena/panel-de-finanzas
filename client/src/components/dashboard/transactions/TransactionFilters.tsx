"use client";

import { Category } from "@/types";

export interface TransactionFiltersState {
  startDate: string;
  endDate: string;
  categoryId: string;
}

interface Props {
  filters: TransactionFiltersState;
  categories: Category[];
  onChange: (filters: TransactionFiltersState) => void;
}

export default function TransactionFilters({
  filters,
  categories,
  onChange,
}: Props) {
  const hasFilters =
    filters.startDate || filters.endDate || filters.categoryId;

  const update = (partial: Partial<TransactionFiltersState>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="bg-card border border-card-border rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-1 min-w-0">
          <label className="block text-xs font-medium text-muted mb-1">
            Desde
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => update({ startDate: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-xs font-medium text-muted mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => update({ endDate: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-xs font-medium text-muted mb-1">
            Categoria
          </label>
          <select
            value={filters.categoryId}
            onChange={(e) => update({ categoryId: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={() =>
              onChange({ startDate: "", endDate: "", categoryId: "" })
            }
            className="px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-background border border-card-border rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
