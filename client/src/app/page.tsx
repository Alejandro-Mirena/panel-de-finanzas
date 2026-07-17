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

export default function Home() {
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
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-sm font-medium text-gray-500">Balance Actual</h3>
          <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${balance.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-sm font-medium text-gray-500">Ingresos</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ${income.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-sm font-medium text-gray-500">Gastos</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">
            ${expenses.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <h3 className="text-lg font-semibold mb-4">Últimas Transacciones</h3>
        <div className="space-y-4">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                  style={{ backgroundColor: t.category?.color || "#6366f1" }}
                >
                  {t.category?.icon || "💵"}
                </div>
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-gray-500">{t.category?.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    t.type === TransactionType.INCOME ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === TransactionType.INCOME ? "+" : "-"}${t.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
