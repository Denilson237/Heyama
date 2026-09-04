"use client";

import Link from "next/link";
import { Plus, Info } from "lucide-react";

interface NavbarProps {
  onOpenCreateModal?: () => void;
}

export function Navbar({ onOpenCreateModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-purple-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo Clean */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-lg shadow-sm group-hover:bg-purple-700 transition-colors">
            H
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Heyama
          </span>
        </Link>

        {/* Liens & Actions */}
        <div className="flex items-center gap-3">
          {/* Bouton À Propos Stylisé (Redirige vers l'accueil + défilement) */}
          <Link
            href="/#about"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-xs border-2 border-purple-200/80 transition-all cursor-pointer shadow-xs"
          >
            <Info className="w-3.5 h-3.5 text-purple-600" />
            <span>À propos</span>
          </Link>

          {/* Action Principale */}
          {onOpenCreateModal && (
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs tracking-wide shadow-sm active:scale-95 border-2 border-purple-500 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Partager une image</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}