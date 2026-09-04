"use client";

import { useEffect, useState } from "react";
import { ObjectItem } from "@/types/object";
import { fetchObjects } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";
import { ObjectCard } from "@/components/ObjectCard";
import { CreateObjectModal } from "@/components/CreateObjectModal";
import { ObjectGridSkeleton } from "@/components/ObjectGridSkeleton";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Radio, Layers } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";

export default function HomePage() {
  const [items, setItems] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchObjects()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useSocket(
    (newObject) => setItems((prev) => [newObject, ...prev]),
    (deletedId) => setItems((prev) => prev.filter((item) => item._id !== deletedId)),
    ({ id, likesCount }) =>
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, likesCount } : item))
      )
  );

  return (
    <div className="min-h-screen bg-purple-50/40 relative text-slate-800 flex flex-col justify-between">
      {/* Reflet de fond rosé/violet */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-200/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div>
        {/* Navigation */}
        <Navbar onOpenCreateModal={() => setIsModalOpen(true)} />

        {/* Contenu Principal */}
        <main className="max-w-5xl mx-auto px-4 pt-10 pb-16 relative z-10">
          {/* Banner Hero */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/90 border-2 border-purple-300/80 text-purple-900 text-xs font-black tracking-wide shadow-xs">
              <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Flux en temps réel
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Partagez vos moments & images favoris
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Découvrez les images partagées par la communauté Heyama et réagissez en direct.
            </p>
          </div>

          {/* Section Grille d'images */}
          <section className="mb-16">
            {loading ? (
              <ObjectGridSkeleton count={6} />
            ) : items.length === 0 ? (
              <div className="bg-white/90 rounded-3xl p-12 text-center border-2 border-purple-200/90 max-w-md mx-auto shadow-md space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-700 border-2 border-purple-300">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Aucune image pour le moment</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Soyez le premier à partager une image avec la communauté.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ObjectCard key={item._id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* Section À Propos */}
          <AboutSection />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal de création */}
      <CreateObjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}