"use client";

import { useState } from "react";
import DashboardTab from "@/components/dashboard/DashboardTab";
import ProfileTab from "@/components/dashboard/ProfileTab";

type Tab = "dashboard" | "profile";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-center gap-3 border-b border-card-border pb-4">
          <button
            onClick={() => setTab("dashboard")}
            className={`text-sm sm:text-base font-medium pb-1 border-b-2 transition-colors cursor-pointer ${
              tab === "dashboard"
                ? "border-primary text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`text-sm sm:text-base font-medium pb-1 border-b-2 transition-colors cursor-pointer ${
              tab === "profile"
                ? "border-primary text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            Mi perfil
          </button>
        </div>

        {tab === "dashboard" && <DashboardTab />}
        {tab === "profile" && <ProfileTab />}
      </div>
    </div>
  );
}
