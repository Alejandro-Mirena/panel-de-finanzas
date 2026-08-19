"use client";

import { useEffect, useRef, useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";
import { Transaction, TransactionType } from "@/types";
import TransactionForm from "./transactions/TransactionForm";
import BalanceCards from "./charts/BalanceCards";
import CategoryDonutChart from "./charts/CategoryDonutChart";
import MonthlyTrendChart from "./charts/MonthlyTrendChart";
import TransactionList from "./transactions/TransactionList";
import CategoryManager from "./categories/CategoryManager";

export default function DashboardTab() {
  const {
    transactions,
    setTransactions,
    stats,
    setStats,
    setCategories,
  } = useFinanceStore();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const [txns, statsData, cats] = await Promise.all([
          api.transactions.getAll(),
          api.transactions.getStats(),
          api.categories.getAll(),
        ]);
        setTransactions(txns);
        setStats(statsData);
        setCategories(cats);
        firstLoad.current = false;
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, setTransactions, setStats, setCategories]);

  useEffect(() => {
    if (!token || firstLoad.current) return;
    api.transactions
      .getStats()
      .then(setStats)
      .catch((err) => console.error("Error refreshing stats:", err));
  }, [transactions, token, setStats]);

  const balance = stats?.balance ?? 0;
  const income = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const donutData = stats
    ? Object.entries(stats.expensesByCategory).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const trendData = stats
    ? Object.entries(stats.monthlyTrend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, data]) => ({
          month: month.slice(5),
          ingresos: data.income,
          gastos: data.expense,
        }))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {(showForm || editing) && (
        <TransactionForm
          transaction={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <BalanceCards balance={balance} income={income} expenses={expenses} />

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-xl text-sm font-medium transition-all cursor-pointer"
        >
          + Nueva transaccion
        </button>
      </div>

      {donutData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <CategoryDonutChart data={donutData} />
          <MonthlyTrendChart data={trendData} />
        </div>
      )}

      <TransactionList transactions={transactions} onEdit={setEditing} />

      <CategoryManager />
    </>
  );
}
