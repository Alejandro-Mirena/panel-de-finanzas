"use client";

import { TransactionType } from "@/types";

interface Props {
  balance: number;
  income: number;
  expenses: number;
}

export default function BalanceCards({ balance, income, expenses }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
      <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
        <h3 className="text-xs sm:text-sm font-medium text-muted">
          Balance Actual
        </h3>
        <p
          className={`text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 ${balance >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          ${balance.toLocaleString()}
        </p>
      </div>
      <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
        <h3 className="text-xs sm:text-sm font-medium text-muted">
          Ingresos
        </h3>
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
  );
}
