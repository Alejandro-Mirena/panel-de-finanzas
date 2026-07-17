"use client";

import { useEffect } from "react";
import { useFinanceStore } from "@/lib/store";
import { TransactionType } from "@/types";

const mockTransactions = [
  {
    id: "1",
    amount: 350000,
    type: TransactionType.INCOME,
    description: "Salario mensual",
    date: "2026-07-01",
    categoryId: "1",
    category: { id: "1", name: "Salario", color: "#22c55e", icon: "💰" },
    userId: "1",
    createdAt: "2026-07-01",
    updatedAt: "2026-07-01",
  },
  {
    id: "2",
    amount: 15000,
    type: TransactionType.EXPENSE,
    description: "Supermercado",
    date: "2026-07-05",
    categoryId: "2",
    category: { id: "2", name: "Comida", color: "#f97316", icon: "🍔" },
    userId: "1",
    createdAt: "2026-07-05",
    updatedAt: "2026-07-05",
  },
  {
    id: "3",
    amount: 5000,
    type: TransactionType.EXPENSE,
    description: "Uber",
    date: "2026-07-10",
    categoryId: "3",
    category: { id: "3", name: "Transporte", color: "#3b82f6", icon: "🚗" },
    userId: "1",
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
  },
];

export default function Dashboard() {
  const { transactions, setTransactions } = useFinanceStore();

  useEffect(() => {
    setTransactions(mockTransactions);
  }, [setTransactions]);

  const balance = transactions.reduce((acc, t) => {
    return t.type === TransactionType.INCOME ? acc + t.amount : acc - t.amount;
  }, 0);

  const income = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
            <h3 className="text-xs sm:text-sm font-medium text-muted">Balance Actual</h3>
            <p className={`text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>
              ${balance.toLocaleString()}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
            <h3 className="text-xs sm:text-sm font-medium text-muted">Ingresos</h3>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-green-400">
              ${income.toLocaleString()}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
            <h3 className="text-xs sm:text-sm font-medium text-muted">Gastos</h3>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-red-400">
              ${expenses.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Últimas Transacciones</h3>
          <div className="space-y-3 sm:space-y-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 sm:p-4 bg-background rounded-lg border border-card-border"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg"
                    style={{ backgroundColor: t.category?.color || "#6366f1" }}
                  >
                    {t.category?.icon || "💵"}
                  </div>
                  <div>
                    <p className="text-sm sm:font-medium">{t.description}</p>
                    <p className="text-xs sm:text-sm text-muted">{t.category?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm sm:font-semibold ${
                      t.type === TransactionType.INCOME ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type === TransactionType.INCOME ? "+" : "-"}${t.amount.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-muted">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
