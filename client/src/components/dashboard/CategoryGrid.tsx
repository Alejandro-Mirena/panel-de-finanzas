"use client";

import { UseFormRegister } from "react-hook-form";
import { Category } from "@/types";
import { TransactionFormData } from "@/lib/transaction";

interface Props {
  categories: Category[];
  register: UseFormRegister<TransactionFormData>;
  error?: string;
}

export default function CategoryGrid({
  categories,
  register,
  error,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Categoria</label>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
          >
            <input
              type="radio"
              value={cat.id}
              {...register("categoryId")}
              className="peer sr-only"
            />
            <span
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg transition-all peer-checked:ring-2 peer-checked:ring-primary peer-checked:scale-110 group-hover:scale-105"
              style={{ backgroundColor: `${cat.color}30` }}
            >
              {cat.icon}
            </span>
            <span className="text-[10px] text-muted text-center leading-tight peer-checked:text-foreground peer-checked:font-medium">
              {cat.name}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
