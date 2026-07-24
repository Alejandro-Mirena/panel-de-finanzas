"use client";

import { Transaction, TransactionType } from "@/types";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Transacciones recientes
      </h3>
      {transactions.length === 0 ? (
        <p className="text-muted text-sm text-center py-8">
          No hay transacciones aun. Agrega una para empezar.
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {transactions.slice(0, 10).map((t) => (
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
                  <p className="text-xs sm:text-sm text-muted">
                    {t.category?.name}
                  </p>
                </div>
              </div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
