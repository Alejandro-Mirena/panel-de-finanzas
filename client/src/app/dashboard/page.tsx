"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";
import DashboardTab from "@/components/dashboard/DashboardTab";
import ProfileTab from "@/components/dashboard/ProfileTab";

type Tab = "dashboard" | "profile";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { token, user } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!mounted || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between border-b border-card-border pb-4">
          <div className="flex items-center gap-3">
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
          {user && (
            <p className="text-sm text-muted hidden sm:block">
              Hola, <span className="text-foreground font-medium">{user.name}</span>
            </p>
          )}
        </div>

        {tab === "dashboard" && <DashboardTab />}
        {tab === "profile" && <ProfileTab />}
      </div>
    </div>
  );
}
