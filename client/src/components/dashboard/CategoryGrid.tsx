"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (direction: number) =>
    scrollRef.current?.scrollBy({ left: direction * 160, behavior: "smooth" });

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-card border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary/50 transition-all cursor-pointer shadow-lg";

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Categoria</label>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-8 pb-1"
        >
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

        {canLeft && (
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Desplazar categorias a la izquierda"
            className={`${arrowClass} left-0`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {canRight && (
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Desplazar categorias a la derecha"
            className={`${arrowClass} right-0`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
