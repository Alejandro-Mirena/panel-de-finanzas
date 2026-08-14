"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast";
import { api } from "@/lib/api";
import { Category } from "@/types";
import CategoryForm from "./CategoryForm";

export default function CategoryManager() {
  const { categories, deleteCategory } = useFinanceStore();
  const { addToast } = useToastStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.categories.delete(id);
      deleteCategory(id);
      addToast({
        type: "success",
        title: "deleted",
        message: "Categoria eliminada",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "error",
        message: err.message || "Error al eliminar la categoria",
      });
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 sm:p-8">
      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <h3 className="text-base sm:text-lg font-semibold">Categorias</h3>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-xl text-sm font-medium transition-all cursor-pointer"
        >
          + Nueva categoria
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted text-sm text-center py-8">
          No hay categorias aun. Crea la primera.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-3 bg-background rounded-xl border border-card-border flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: `${cat.color}30` }}
                >
                  {cat.icon || "🏷️"}
                </div>
                <p className="text-sm font-medium truncate">{cat.name}</p>
              </div>

              <div className="flex items-center justify-end gap-1 border-t border-card-border pt-2">
                <button
                  onClick={() => {
                    setEditing(cat);
                    setShowForm(true);
                  }}
                  aria-label="Editar categoria"
                  className="p-1.5 text-muted hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-primary/10"
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

                {confirmId === cat.id ? (
                  <>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deletingId === cat.id}
                      className="px-2 py-1 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === cat.id ? "Eliminando..." : "Eliminar"}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="px-2 py-1 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmId(cat.id)}
                    aria-label="Eliminar categoria"
                    className="p-1.5 text-muted hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-red-500/10"
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
