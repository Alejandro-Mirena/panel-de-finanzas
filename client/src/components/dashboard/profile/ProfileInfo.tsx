"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";

export default function ProfileInfo() {
  const { user, fetchUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      })
    : "julio 2026";

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await api.auth.updateProfile({ name, email });
      await fetchUser();
      setEditing(false);
      setMessage({ type: "success", text: "Perfil actualizado" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Error al guardar" });
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

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 mb-6 sm:mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl sm:text-5xl">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-lg sm:text-xl font-semibold">{user?.name || "Usuario"}</h2>
          <p className="text-muted text-sm">{user?.email || "email@example.com"}</p>
          <p className="text-muted text-xs mt-1">Miembro desde {createdDate}</p>
        </div>
        <button
          onClick={() => {
            setEditing(!editing);
            setMessage(null);
            if (!editing) {
              setName(user?.name || "");
              setEmail(user?.email || "");
            }
          }}
          className="px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors cursor-pointer"
        >
          {editing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {editing ? (
        <div className="space-y-5 pt-6 border-t border-card-border">
          <div>
            <label className="block text-sm font-medium mb-1.5">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-primary cursor-pointer hover:bg-primary-light disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-6 border-t border-card-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3">
            <div>
              <p className="text-sm font-medium">Contrasena</p>
              <p className="text-muted text-xs">Ultimo cambio hace 30 dias</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
