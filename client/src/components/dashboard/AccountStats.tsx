"use client";

import { useFinanceStore } from "@/lib/store";

export default function AccountStats() {
  const { transactions, categories } = useFinanceStore();

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 sm:p-8">
      <h3 className="text-base sm:text-lg font-semibold mb-4">Estadisticas</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-background rounded-xl border border-card-border">
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            {transactions.length}
          </p>
          <p className="text-muted text-xs mt-1">Transacciones</p>
        </div>
        <div className="p-4 bg-background rounded-xl border border-card-border">
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            {categories.length}
          </p>
          <p className="text-muted text-xs mt-1">Categorias</p>
        </div>
      </div>
    </div>
  );
}
