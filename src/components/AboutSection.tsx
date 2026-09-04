"use client";

import { Sparkles, Heart, ShieldCheck } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="pt-16 pb-8">
      <div className="bg-white/90 rounded-3xl p-8 sm:p-10 border-2 border-purple-200/90 shadow-sm space-y-6">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> À propos de Heyama
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Une plateforme simple pour capturer et partager vos moments
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Heyama est un espace d'inspiration visuelle interactif où chacun peut partager ses plus belles découvertes et échanger en temps réel avec la communauté.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Temps Réel</h3>
            <p className="text-xs text-slate-600 font-medium">
              Les nouvelles images et réactions apparaissent instantanément sans rafraîchir la page.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 text-purple-600 fill-purple-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Interactions</h3>
            <p className="text-xs text-slate-600 font-medium">
              Soutenez vos contenus préférés d'un simple clic et partagez-les autour de vous.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Épuré & Rapide</h3>
            <p className="text-xs text-slate-600 font-medium">
              Une expérience utilisateur fluide, centrée sur la beauté des visuels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}