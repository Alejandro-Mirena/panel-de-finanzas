"use client";

export default function DangerZone() {
  return (
    <div className="bg-card border border-red-500/30 rounded-2xl p-5 sm:p-8">
      <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">
        Zona de peligro
      </h3>
      <p className="text-muted text-sm mb-4">
        Estas acciones son irreversibles. Ten cuidado.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="cursor-pointer px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors">
          Desactivar cuenta
        </button>
        <button className="cursor-pointer px-4 py-2 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}
