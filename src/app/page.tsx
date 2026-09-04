import { fetchObjects } from "@/lib/api";
import { ObjectItem } from "@/types/object"; // 1. Importer le type
import { Navbar } from "@/components/ui/Navbar";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Radio } from "lucide-react";
import { RealtimeObjectsFeed } from "@/components/RealtimeObjectsFeed";

export default async function HomePage() {
  // 2. Typer explicitement le tableau : ObjectItem[]
  let initialItems: ObjectItem[] = [];
  
  try {
    initialItems = await fetchObjects();
  } catch (error) {
    console.error("Erreur de chargement serveur:", error);
  }

  return (
    <div className="min-h-screen bg-purple-50/40 relative text-slate-800 flex flex-col justify-between">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-200/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div>
        <Navbar />

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

          {/* Composant Client recevant les données typées */}
          <RealtimeObjectsFeed initialItems={initialItems} />

          <AboutSection />
        </main>
      </div>

      <Footer />
    </div>
  );
}