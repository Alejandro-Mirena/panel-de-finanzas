"use client";

import { UseFormRegister } from "react-hook-form";
import { TransactionFormData } from "@/lib/transaction";

interface Props {
  register: UseFormRegister<TransactionFormData>;
  value: "income" | "expense";
}

const types = [
  {
    value: "income" as const,
    label: "Ingreso",
    arrow: "↑",
    active: "bg-income border-income text-white shadow-lg shadow-income/25",
  },
  {
    value: "expense" as const,
    label: "Gasto",
    arrow: "↓",
    active: "bg-expense border-expense text-white shadow-lg shadow-expense/25",
  },
];

export default function TransactionTypeSelector({ register, value }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {types.map((t) => {
        const isActive = value === t.value;
        return (
          <label
            key={t.value}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
              isActive
                ? t.active
                : `bg-background border-card-border text-muted hover:text-foreground hover:border-card-border/80`
            }`}
          >
            <input
              type="radio"
              value={t.value}
              {...register("type")}
              className="sr-only"
            />
            <span>{t.arrow}</span>
            <span className="text-sm font-medium">{t.label}</span>
          </label>
        );
      })}
    </div>
  );
}
