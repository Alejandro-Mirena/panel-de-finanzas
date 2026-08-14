"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { useFinanceStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast";
import { transactionSchema, TransactionFormData } from "@/lib/transaction";
import FormField from "@/components/common/FormField";
import TransactionTypeSelector from "./TransactionTypeSelector";
import CategoryGrid from "./CategoryGrid";

interface Props {
  onClose: () => void;
}

export default function TransactionForm({ onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const { categories, setCategories, addTransaction } = useFinanceStore();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const type = watch("type");
  const accent =
    type === "income"
      ? "border-income/40 focus-within:border-income/70"
      : "border-expense/40 focus-within:border-expense/70";
  const cta =
    type === "income"
      ? "bg-income hover:bg-income-soft shadow-income/25"
      : "bg-expense hover:bg-expense-soft shadow-expense/25";

  useEffect(() => {
    if (categories.length > 0) return;
    api.categories.getAll().then(setCategories).catch(console.error);
  }, [categories.length, setCategories]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const onSubmit = async (data: TransactionFormData) => {
    setLoading(true);
    try {
      const transaction = await api.transactions.create(data);
      const fullTransaction = {
        ...transaction,
        category: categories.find((c) => c.id === data.categoryId),
      };
      addTransaction(fullTransaction);
      addToast({
        type: data.type === "income" ? "success" : "error",
        title: data.type === "income" ? "income" : "expense",
        message:
          data.type === "income"
            ? `Ingreso de $${Number(data.amount).toLocaleString()} registrado`
            : `Gasto de $${Number(data.amount).toLocaleString()} registrado`,
      });
      onClose();
    } catch (err: any) {
      addToast({
        type: "error",
        title: "error",
        message: err.message || "Error al crear transaccion",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 sm:pt-8">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md max-h-[calc(100vh-3rem)] bg-card border border-card-border rounded-2xl flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div className="p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Nueva transaccion</h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TransactionTypeSelector register={register} value={type} />

            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border bg-background transition-colors ${accent}`}
            >
              <span className="text-2xl text-muted">
                {type === "income" ? "+" : "-"}
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                autoFocus
                inputMode="decimal"
                {...register("amount", { valueAsNumber: true })}
                className="w-full min-w-0 bg-transparent text-3xl sm:text-4xl font-bold outline-none placeholder:text-muted/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            {errors.amount?.message && (
              <p className="text-red-400 text-xs -mt-3">
                {errors.amount.message}
              </p>
            )}

            <FormField
              label="Descripcion"
              placeholder="Ej: Supermercado"
              registration={register("description")}
              error={errors.description?.message}
            />

            <FormField
              label="Fecha"
              type="date"
              registration={register("date")}
              error={errors.date?.message}
            />

            <CategoryGrid
              categories={categories}
              register={register}
              error={errors.categoryId?.message}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${cta}`}
            >
              {loading
                ? "Guardando..."
                : type === "income"
                  ? "Registrar ingreso"
                  : "Registrar gasto"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
