"use client";

import Link from "next/link";
import { Plus, Info, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenCreateModal?: () => void;
}

export function Navbar({ onOpenCreateModal }: NavbarProps) {
  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si on est sur la page d'accueil, scroll fluide vers la section #about
    if (window.location.pathname === "/") {
      e.preventDefault();
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-purple-200/90 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white shadow-md border-2 border-purple-300 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Heyama<span className="text-purple-600">.</span>
          </span>
        </Link>

        {/* Actions à droite */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Bouton À propos */}
          <a
            href="#about"
            onClick={scrollToAbout}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border-2 border-purple-200/90 transition-colors cursor-pointer"
            title="À propos"
          >
            <Info className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="hidden xs:inline sm:inline">À propos</span>
          </a>

          {/* Bouton Partager une image */}
          {onOpenCreateModal && (
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs border-2 border-purple-500 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 shrink-0 stroke-[3]" />
              <span className="hidden sm:inline">Partager une image</span>
              <span className="inline sm:hidden">Partager</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}