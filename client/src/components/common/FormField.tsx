"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function FormField({
  label,
  type = "text",
  placeholder,
  registration,
  error,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        step={type === "number" ? "0.01" : undefined}
        placeholder={placeholder}
        {...registration}
        className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
