"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white/80 border-t-2 border-purple-200/80 mt-20 text-slate-600 text-xs font-medium">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black flex items-center justify-center text-xs">
            H
          </div>
          <span className="font-extrabold text-slate-900 text-sm">Heyama</span>
          <span className="text-slate-400">• Tous droits réservés © {new Date().getFullYear()}</span>
        </div>

        {/* Liens rapides */}
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-purple-600 transition-colors">
            À propos
          </a>
          <Link href="/" className="hover:text-purple-600 transition-colors">
            Accueil
          </Link>
        </div>
      </div>
    </footer>
  );
}