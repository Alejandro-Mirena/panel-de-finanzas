"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-card-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">$</span>
          </div>
          <span className="font-semibold text-lg">Finanzas</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted hover:text-foreground transition-colors">
            Funciones
          </a>
          <a href="#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Precios
          </a>
          <a href="#testimonials" className="text-sm text-muted hover:text-foreground transition-colors">
            Opiniones
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors">
            Iniciar sesión
          </Link>
          <Link href="/register" className="text-sm bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors">
            Comenzar gratis
          </Link>
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
            <a href="#features" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
              Funciones
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
              Precios
            </a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
              Opiniones
            </a>
            <div className="pt-3 border-t border-card-border space-y-3">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-foreground transition-colors py-2">
                Iniciar sesión
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="block text-sm bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded-lg transition-colors text-center">
                Comenzar gratis
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
