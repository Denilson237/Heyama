import Link from "next/link";
import { Sparkles, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-purple-50/40 text-slate-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-white/95 rounded-3xl border-2 border-purple-200/90 p-8 shadow-md relative overflow-hidden">
        {/* Glow décoratif */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />

        <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-700 border-2 border-purple-300 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-purple-300/80 text-purple-900 font-black text-xs mb-3 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Erreur 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
          Page introuvable !
        </h1>

        <p className="text-sm text-slate-600 font-semibold mb-8 leading-relaxed">
          Oups, l&apos;image ou la page que tu cherches n&apos;existe plus ou a été déplacée.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-black text-sm border-2 border-purple-800 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Retourner au flux principal</span>
        </Link>
      </div>
    </main>
  );
}