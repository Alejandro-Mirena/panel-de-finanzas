"use client";

import { useState } from "react";
import { Transaction, TransactionType } from "@/types";
import { api } from "@/lib/api";
import { useFinanceStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast";

interface Props {
  transactions: Transaction[];
  hasActiveFilters: boolean;
  onEdit: (transaction: Transaction) => void;
}

export default function TransactionList({ transactions, hasActiveFilters, onEdit }: Props) {
  const { deleteTransaction } = useFinanceStore();
  const { addToast } = useToastStore();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.transactions.delete(id);
      deleteTransaction(id);
      addToast({
        type: "success",
        title: "delete",
        message: "Transaccion eliminada",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "error",
        message: err.message || "Error al eliminar la transaccion",
      });
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Transacciones recientes
      </h3>
      {transactions.length === 0 ? (
        <p className="text-muted text-sm text-center py-8">
          {hasActiveFilters
            ? "No se encontraron transacciones con estos filtros."
            : "No hay transacciones aun. Agrega una para empezar."}
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-3 sm:p-4 bg-background rounded-lg border border-card-border"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg shrink-0"
                  style={{ backgroundColor: t.category?.color || "#6366f1" }}
                >
                  {t.category?.icon || "💵"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:font-medium truncate">
                    {t.description}
                  </p>
                  <p className="text-xs sm:text-sm text-muted">
                    {t.category?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="text-right">
                  <p
                    className={`text-sm sm:font-semibold ${
                      t.type === TransactionType.INCOME
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {t.type === TransactionType.INCOME ? "+" : "-"}$
                    {Number(t.amount).toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-muted">
                    {new Date(t.date).toLocaleDateString("es-ES")}
                  </p>
                </div>
                {confirmId === t.id ? (
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={deletingId === t.id}
                      className="px-2 py-1 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === t.id ? "Eliminando..." : "Eliminar"}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="px-2 py-1 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onEdit(t)}
                      aria-label="Editar transaccion"
                      className="p-2 text-muted hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-primary/10"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setConfirmId(t.id)}
                      aria-label="Eliminar transaccion"
                      className="p-2 text-muted hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-red-500/10"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
