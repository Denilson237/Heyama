import Link from "next/link";
import { Sparkles, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-purple-50/50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-purple-100 p-8 shadow-2xl shadow-purple-200/50 relative overflow-hidden">
        {/* Halo décoratif */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />

        <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Erreur 404
        </span>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
          Pépite introuvable !
        </h1>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Peu importe où tu te trouves, cette page ou ressource semble ne plus exister.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Retourner au flux principal</span>
        </Link>
      </div>
    </main>
  );
}