export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  userId: string;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  balance: number;
  expensesByCategory: Record<string, number>;
  monthlyTrend: Record<string, { income: number; expense: number }>;
  totalTransactions: number;
}
