"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, token, logout, fetchUser } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-card-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">$</span>
          </div>
          <span className="font-semibold text-lg">Panel Finanzas</span>
        </Link>

        {!user && (
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm text-muted hover:text-foreground transition-colors">
              Funciones
            </a>
            <a href="/#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
              Precios
            </a>
            <a href="/#testimonials" className="text-sm text-muted hover:text-foreground transition-colors">
              Opiniones
            </a>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors font-medium">
                Dashboard
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-card-border hover:bg-card transition-colors cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm text-foreground">{user.name}</span>
                  <svg className={`w-3.5 h-3.5 text-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-card-border rounded-xl shadow-xl py-1">
                    <div className="px-4 py-2 border-b border-card-border">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-background transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-background transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesion
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors">
                Iniciar sesion
              </Link>
              <Link href="/register" className="text-sm bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors">
                Comenzar gratis
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-card-border bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {!user && (
              <>
                <a href="/#features" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
                  Funciones
                </a>
                <a href="/#pricing" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
                  Precios
                </a>
                <a href="/#testimonials" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
                  Opiniones
                </a>
              </>
            )}
            <div className="pt-3 border-t border-card-border space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block text-sm bg-primary/10 text-primary px-4 py-2.5 rounded-lg transition-colors text-center font-medium">
                    Ir al Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors py-2 cursor-pointer"
                  >
                    Cerrar sesion
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
                    Iniciar sesion
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="block text-sm bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded-lg transition-colors text-center">
                    Comenzar gratis
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
