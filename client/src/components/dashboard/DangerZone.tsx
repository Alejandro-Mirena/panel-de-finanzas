"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";
import { api } from "@/lib/api";
import { useToastStore } from "@/lib/toast";

type DangerAction = "deactivate" | "delete" | null;

export default function DangerZone() {
  const { logout } = useAuthStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  const [confirmAction, setConfirmAction] = useState<DangerAction>(null);
  const [loading, setLoading] = useState(false);

  const finishAccountAction = async (
    action: "deactivate" | "delete",
    toastTitle: string,
    toastMessage: string,
    toastType: "warning" | "error"
  ) => {
    setLoading(true);
    try {
      if (action === "deactivate") {
        await api.auth.deactivate();
      } else {
        await api.auth.deleteAccount();
      }
      addToast({ type: toastType, title: toastTitle, message: toastMessage });
      logout();
      router.push("/");
    } catch (err: any) {
      addToast({
        type: "error",
        title: "error",
        message: err.message || "Error al procesar la cuenta",
      });
    } finally {
      setLoading(false);
      setConfirmAction(null);
    }
  };

  return (
    <div className="bg-card border border-red-500/30 rounded-2xl p-5 sm:p-8">
      <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">
        Zona de peligro
      </h3>
      <p className="text-muted text-sm mb-4">
        Estas acciones son irreversibles. Ten cuidado.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {confirmAction === "deactivate" ? (
          <>
            <button
              onClick={() =>
                finishAccountAction(
                  "deactivate",
                  "deactivate",
                  "Cuenta desactivada. Para recuperarla, contacta a soporte.",
                  "warning"
                )
              }
              disabled={loading}
              className="cursor-pointer px-4 py-2 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Desactivando..." : "Confirmar desactivacion"}
            </button>
            <button
              onClick={() => setConfirmAction(null)}
              disabled={loading}
              className="cursor-pointer px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setConfirmAction("deactivate")}
            className="cursor-pointer px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors"
          >
            Desactivar cuenta
          </button>
        )}

        {confirmAction === "delete" ? (
          <>
            <button
              onClick={() =>
                finishAccountAction(
                  "delete",
                  "delete",
                  "Cuenta eliminada definitivamente.",
                  "error"
                )
              }
              disabled={loading}
              className="cursor-pointer px-4 py-2 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Eliminando..." : "Confirmar eliminacion"}
            </button>
            <button
              onClick={() => setConfirmAction(null)}
              disabled={loading}
              className="cursor-pointer px-4 py-2 text-sm border border-card-border rounded-lg hover:bg-card transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setConfirmAction("delete")}
            className="cursor-pointer px-4 py-2 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            Eliminar cuenta
          </button>
        )}
      </div>
    </div>
  );
}
