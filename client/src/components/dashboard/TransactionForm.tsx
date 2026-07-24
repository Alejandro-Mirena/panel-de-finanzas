"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api";
import { useFinanceStore } from "@/lib/store";
import { Category, TransactionType } from "@/types";

const transactionSchema = z.object({
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
  type: z.enum(["income", "expense"]),
  description: z.string().min(1, "La descripcion es requerida"),
  date: z.string().min(1, "La fecha es requerida"),
  categoryId: z.string().min(1, "Selecciona una categoria"),
});

type TransactionForm = z.infer<typeof transactionSchema>;

interface Props {
  onClose: () => void;
}

export default function TransactionForm({ onClose }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addTransaction } = useFinanceStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    api.categories.getAll().then(setCategories).catch(console.error);
  }, []);

  const onSubmit = async (data: TransactionForm) => {
    setLoading(true);
    setError(null);
    try {
      const transaction = await api.transactions.create(data);
      const fullTransaction = {
        ...transaction,
        category: categories.find((c) => c.id === data.categoryId),
      };
      addTransaction(fullTransaction);
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al crear transaccion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-card border border-card-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Nueva transaccion</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Tipo</label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-center gap-2 p-2.5 bg-background border border-card-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <input type="radio" value="income" {...register("type")} className="sr-only" />
                <span className="text-green-400">↑</span>
                <span className="text-sm">Ingreso</span>
              </label>
              <label className="flex items-center justify-center gap-2 p-2.5 bg-background border border-card-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <input type="radio" value="expense" {...register("type")} className="sr-only" />
                <span className="text-red-400">↓</span>
                <span className="text-sm">Gasto</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Monto</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              placeholder="0.00"
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {errors.amount && (
              <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Descripcion</label>
            <input
              type="text"
              {...register("description")}
              placeholder="Ej: Supermercado"
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Fecha</label>
            <input
              type="date"
              {...register("date")}
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {errors.date && (
              <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Categoria</label>
            <select
              {...register("categoryId")}
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="">Seleccionar...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-400 text-xs mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-card-border rounded-xl text-sm font-medium hover:bg-background transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all cursor-pointer"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
