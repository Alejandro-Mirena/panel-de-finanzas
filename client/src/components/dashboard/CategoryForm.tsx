"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api";
import { useFinanceStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast";
import { Category } from "@/types";
import FormField from "@/components/common/FormField";

const iconOptions = [
  "🍔", "🚗", "🏠", "💡", "🎬", "🏥",
  "👕", "📚", "💼", "💻", "🎁", "✈️",
  "🛒", "💪", "🎓", "🐾", "☕", "🧾",
];

const colorOptions = [
  "#f97316", "#3b82f6", "#8b5cf6", "#eab308",
  "#ec4899", "#22c55e", "#06b6d4", "#14b8a6",
  "#6366f1", "#ef4444",
];

const categorySchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(1, "El nombre es requerido"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface Props {
  category?: Category | null;
  onClose: () => void;
}

export default function CategoryForm({ category, onClose }: Props) {
  const [icon, setIcon] = useState(category?.icon || "🏷️");
  const [color, setColor] = useState(category?.color || "#6366f1");
  const [loading, setLoading] = useState(false);
  const { addCategory, updateCategory } = useFinanceStore();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category?.name || "" },
  });

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      if (category) {
        const updated = await api.categories.update(category.id, {
          name: data.name,
          icon,
          color,
        });
        updateCategory(updated);
        addToast({
          type: "success",
          title: "updated",
          message: "Categoria actualizada",
        });
      } else {
        const created = await api.categories.create({
          name: data.name,
          icon,
          color,
        });
        addCategory(created);
        addToast({
          type: "success",
          title: "created",
          message: "Categoria creada",
        });
      }
      onClose();
    } catch (err: any) {
      addToast({
        type: "error",
        title: "error",
        message: err.message || "Error al guardar la categoria",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 sm:pt-8">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md max-h-[calc(100vh-3rem)] bg-card border border-card-border rounded-2xl flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div className="p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">
              {category ? "Editar categoria" : "Nueva categoria"}
            </h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Nombre"
              placeholder="Ej: Cafe"
              registration={register("name")}
              error={errors.name?.message}
            />

            <div>
              <label className="block text-sm font-medium mb-1.5">Icono</label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all cursor-pointer ${
                      icon === emoji
                        ? "bg-primary/20 ring-2 ring-primary scale-105"
                        : "bg-background border border-card-border hover:border-primary/40"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Color</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
                      color === c
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-semibold shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "Guardando..."
                : category
                  ? "Guardar cambios"
                  : "Crear categoria"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
