"use client";

import { useState } from "react";

export default function ProfileTab() {
  const [name, setName] = useState("Jesus Alejandro");
  const [email, setEmail] = useState("jesus@example.com");
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="bg-card border border-card-border rounded-2xl p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl sm:text-5xl">
            👨‍💻
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
            <p className="text-muted text-sm">{email}</p>
            <p className="text-muted text-xs mt-1">Miembro desde julio 2026</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors"
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
              <button className="px-6 py-2.5 bg-primary cursor-pointer hover:bg-primary-light text-white rounded-xl text-sm font-medium transition-all">
                Guardar cambios
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-6 border-t border-card-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-card-border">
              <div>
                <p className="text-sm font-medium">Contraseña</p>
                <p className="text-muted text-xs">Ultimo cambio hace 30 dias</p>
              </div>
              <button className="text-primary text-sm hover:text-primary-light transition-colors cursor-pointer">
                Cambiar
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-card-border">
              <div>
                <p className="text-sm font-medium">Notificaciones</p>
                <p className="text-muted text-xs">
                  Recibe recordatorios por email
                </p>
              </div>
              <button className="text-primary text-sm hover:text-primary-light transition-colors cursor-pointer">
                Configurar
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3">
              <div>
                <p className="text-sm font-medium">Exportar datos</p>
                <p className="text-muted text-xs">
                  Descarga todas tus transacciones en CSV
                </p>
              </div>
              <button className="text-primary text-sm hover:text-primary-light transition-colors cursor-pointer">
                Exportar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border border-card-border rounded-2xl p-5 sm:p-8">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Estadisticas
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-background rounded-xl border border-card-border">
            <p className="text-2xl sm:text-3xl font-bold text-primary">127</p>
            <p className="text-muted text-xs mt-1">Transacciones</p>
          </div>
          <div className="p-4 bg-background rounded-xl border border-card-border">
            <p className="text-2xl sm:text-3xl font-bold text-primary">8</p>
            <p className="text-muted text-xs mt-1">Categorias</p>
          </div>
          <div className="p-4 bg-background rounded-xl border border-card-border">
            <p className="text-2xl sm:text-3xl font-bold text-green-400">6</p>
            <p className="text-muted text-xs mt-1">Meses activo</p>
          </div>
          <div className="p-4 bg-background rounded-xl border border-card-border">
            <p className="text-2xl sm:text-3xl font-bold text-primary">3</p>
            <p className="text-muted text-xs mt-1">Reportes generados</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-red-500/30 rounded-2xl p-5 sm:p-8">
        <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">
          Zona de peligro
        </h3>
        <p className="text-muted text-sm mb-4">
          Estas acciones son irreversibles. Ten cuidado.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className=" cursor-pointer px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors">
            Desactivar cuenta
          </button>
          <button className=" cursor-pointer  px-4 py-2 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </>
  );
}
