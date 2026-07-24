"use client";

import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import PasswordForm from "./PasswordForm";
import AccountStats from "./AccountStats";
import DangerZone from "./DangerZone";

export default function ProfileTab() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <>
      <ProfileInfo />

      {showPasswordForm ? (
        <div>
          <PasswordForm />
          <div className="flex justify-end mt-3">
            <button
              onClick={() => setShowPasswordForm(false)}
              className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Volver al perfil
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-card-border rounded-2xl p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3">
            <div>
              <p className="text-sm font-medium">Contrasena</p>
              <p className="text-muted text-xs">Ultimo cambio hace 30 dias</p>
            </div>
            <button
              onClick={() => setShowPasswordForm(true)}
              className="text-primary text-sm hover:text-primary-light transition-colors cursor-pointer"
            >
              Cambiar
            </button>
          </div>
        </div>
      )}

      <AccountStats />
      <DangerZone />
    </>
  );
}
