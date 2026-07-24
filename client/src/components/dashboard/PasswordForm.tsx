"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await api.auth.changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setMessage({ type: "success", text: "Contrasena actualizada" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Error al cambiar contrasena" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 sm:p-8">
      {message && (
        <div
          className={`mb-4 p-3 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-2 hover:opacity-70 cursor-pointer">x</button>
        </div>
      )}

      <h3 className="text-base sm:text-lg font-semibold mb-4">Cambiar contrasena</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Contrasena actual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Nueva contrasena</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleChange}
            disabled={saving}
            className="px-6 py-2.5 bg-primary cursor-pointer hover:bg-primary-light disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all"
          >
            {saving ? "Cambiando..." : "Cambiar contrasena"}
          </button>
        </div>
      </div>
    </div>
  );
}
