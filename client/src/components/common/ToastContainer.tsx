"use client";

import { useToastStore } from "@/lib/toast";

const icons: Record<string, string> = {
  login: "🔑",
  register: "🎉",
  income: "📈",
  expense: "📉",
  error: "⚠️",
  delete: "🗑️",
  deactivate: "⏸️",
};

const borders: Record<string, string> = {
  success: "border-l-green-500",
  error: "border-l-red-500",
  warning: "border-l-yellow-500",
  info: "border-l-blue-500",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-100 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`bg-card border border-card-border border-l-4 ${borders[t.type]} rounded-xl p-4 shadow-xl animate-slide-up flex items-start gap-3`}
        >
          <span className="text-lg">{t.icon || icons[t.title] || "✅"}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{t.title}</p>
            {t.message && (
              <p className="text-xs text-muted mt-0.5">{t.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-muted hover:text-foreground cursor-pointer shrink-0"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
