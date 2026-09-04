import { fetchObjects } from "@/lib/api";
import { ObjectItem } from "@/types/object";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { RealtimeObjectsFeed } from "@/components/RealtimeObjectsFeed";

export default async function HomePage() {
  let initialItems: ObjectItem[] = [];

  try {
    initialItems = await fetchObjects();
  } catch (error) {
    console.error("Erreur de chargement serveur:", error);
  }

  return (
    <div className="min-h-screen bg-purple-50/40 relative text-slate-800 flex flex-col justify-between">
      {/* Reflet de fond */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-200/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Contenu principal géré côté client pour inclure la Navbar interactive */}
      <RealtimeObjectsFeed initialItems={initialItems} />

      {/* Footer */}
      <Footer />
    </div>
  );
}