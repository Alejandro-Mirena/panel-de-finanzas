import { create } from "zustand";
import { Transaction, Category, Stats, TransactionType } from "@/types";

interface FinanceState {
  transactions: Transaction[];
  categories: Category[];
  stats: Stats | null;
  filters: {
    startDate: string | null;
    endDate: string | null;
    categoryId: string | null;
  };
  setTransactions: (transactions: Transaction[]) => void;
  setCategories: (categories: Category[]) => void;
  setStats: (stats: Stats) => void;
  setFilters: (filters: Partial<FinanceState["filters"]>) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],
  categories: [],
  stats: null,
  filters: {
    startDate: null,
    endDate: null,
    categoryId: null,
  },
  setTransactions: (transactions) => set({ transactions }),
  setCategories: (categories) => set({ categories }),
  setStats: (stats) => set({ stats }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  updateTransaction: (transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
