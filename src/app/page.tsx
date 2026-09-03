"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ObjectItem } from "@/types/object";
import { fetchObjects } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";
import { CreateObjectModal } from "@/components/CreateObjectModal";
import { ObjectCard } from "@/components/ObjectCard";
import { Sparkles, Loader2, Radio, Search, Layers } from "lucide-react";

export default function Home() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchObjects()
      .then(setObjects)
      .catch((err) => console.error("Erreur de chargement:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleObjectCreated = useCallback((newObject: ObjectItem) => {
    setObjects((prev) => [newObject, ...prev.filter((o) => o._id !== newObject._id)]);
  }, []);

  const handleObjectDeleted = useCallback((deletedId: string) => {
    setObjects((prev) => prev.filter((o) => o._id !== deletedId));
  }, []);

  const handleObjectLiked = useCallback(({ id, likesCount }: { id: string; likesCount: number }) => {
    setObjects((prev) =>
      prev.map((o) => (o._id === id ? { ...o, likesCount } : o))
    );
  }, []);

  useSocket(handleObjectCreated, handleObjectDeleted, handleObjectLiked);

  // Filtrage dynamiques selon la barre de recherche
  const filteredObjects = useMemo(() => {
    return objects.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [objects, searchQuery]);

  return (
    <main className="min-h-screen pb-20">
      {/* Header Premium Style App Sociale */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-purple-100/80">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-purple-200">
              H
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Heyama <span className="text-purple-600">Social</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-500">Live Sync & Matches</span>
              </div>
            </div>
          </div>

          <CreateObjectModal />
        </div>
      </header>

      {/* Hero Banner Rencontre & Partage */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-purple-200/60 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Flux d&apos;Objets Passion
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Liez-vous d&apos;amitié grâce à vos objets précieux
            </h2>
            <p className="mt-2 text-purple-100 text-sm leading-relaxed">
              Partagez ce que vous aimez en temps réel et découvrez les pépites publiées par les membres de la communauté Heyama.
            </p>
          </div>

          {/* Formes décoratives en arrière-plan */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Barre de Recherche & Compteur Live */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-purple-100/80 shadow-sm">
          {/* Recherche */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une pépite..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-purple-50/50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Badge Compteur Live */}
          <div className="flex items-center gap-2 text-xs font-bold text-purple-900 bg-purple-50 px-4 py-2 rounded-xl border border-purple-100 self-end sm:self-auto">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>{filteredObjects.length} pépite(s) en ligne</span>
          </div>
        </div>
      </section>

      {/* Galerie des Publications */}
      <section className="max-w-6xl mx-auto px-6 pt-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-purple-500">
            <Loader2 className="w-10 h-10 animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-500">Mise à jour du flux en temps réel...</p>
          </div>
        ) : filteredObjects.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-purple-100/80 shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Aucune pépite trouvée</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Soyez le premier à publier dans cette catégorie !
            </p>
            <CreateObjectModal />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredObjects.map((item) => (
              <ObjectCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.tsx
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
