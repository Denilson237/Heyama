"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ObjectItem } from "@/types/object";
import { fetchObjectById, deleteObject, likeObject } from "@/lib/api";
import { ObjectDetailSkeleton } from "@/components/ObjectDetailSkeleton";
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal";
import { 
  ArrowLeft, 
  Heart, 
  Calendar, 
  ImageIcon, 
  Trash2, 
  Share2, 
  Check,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/Footer";

export default function ObjectDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [item, setItem] = useState<ObjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addedLikes, setAddedLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchObjectById(id)
      .then((data) => {
        setItem(data);
        // Vérifier si l'utilisateur a déjà liké cet objet
        const likedItems = JSON.parse(localStorage.getItem("heyama_liked_items") || "[]");
        if (likedItems.includes(data._id)) {
          setHasLiked(true);
        }
      })
      .catch((err: unknown) => {
        console.error("Objet non trouvé:", err);
        router.push("/404");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  useEffect(() => {
    if (item) setAddedLikes(0);
  }, [item?.likesCount]);

  if (loading) return <ObjectDetailSkeleton />;
  if (!item) return null;

  const displayLikes = (item.likesCount || 0) + addedLikes;

  const handleLike = async () => {
    if (hasLiked) return; // Empêcher le double-clic

    // 1. Mise à jour visuelle immédiate
    setHasLiked(true);
    setAddedLikes((prev) => prev + 1);

    // 2. Sauvegarde dans le localStorage
    const likedItems = JSON.parse(localStorage.getItem("heyama_liked_items") || "[]");
    localStorage.setItem("heyama_liked_items", JSON.stringify([...likedItems, item._id]));

    // 3. Appel de l'API backend
    try {
      await likeObject(item._id);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du like:", error);
      // Annuler en cas d'erreur réseau
      setHasLiked(false);
      setAddedLikes((prev) => Math.max(0, prev - 1));
      const updatedLikedItems = likedItems.filter((likedId: string) => likedId !== item._id);
      localStorage.setItem("heyama_liked_items", JSON.stringify(updatedLikedItems));
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteObject(item._id);
      router.push("/");
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-purple-50/40 text-slate-800 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Appbar secondaire */}
        <div className="sticky top-16 z-20 bg-white/90 backdrop-blur-md border-b-2 border-purple-200/80 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border-2 border-purple-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour</span>
              </button>
              <div className="h-4 w-px bg-purple-200 hidden sm:block" />
              <nav className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Link href="/" className="hover:text-purple-700 transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-3 h-3 text-purple-300" />
                <span className="text-slate-900 font-extrabold truncate max-w-[200px]">
                  {item.title}
                </span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs border-2 border-purple-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Copié !" : "Partager"}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border-2 border-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <main className="max-w-5xl mx-auto px-4 pt-14 pb-12 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Zone Image */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="relative w-full rounded-3xl overflow-hidden bg-white/90 border-2 border-purple-200/90 shadow-md p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto max-h-[78vh] object-contain mx-auto rounded-2xl"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 px-2 font-semibold">
                <span className="flex items-center gap-1 text-purple-900">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-600" /> Haute résolution
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" /> Publié le {new Date(item.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Panneau latéral */}
            <div className="lg:col-span-4 bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-purple-200/90 shadow-md space-y-6 lg:sticky lg:top-36">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-purple-300/80 text-purple-900 text-[11px] font-black tracking-wide">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-600" /> Image Heyama
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {item.title}
                </h1>
              </div>

              {/* Bouton J'aime avec blocage localStorage */}
              <button
                type="button"
                onClick={handleLike}
                disabled={hasLiked}
                className={`w-full py-3.5 rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2.5 select-none ${
                  hasLiked
                    ? "bg-rose-50 text-rose-700 border-2 border-rose-200 cursor-not-allowed opacity-90"
                    : "bg-purple-900 hover:bg-purple-950 text-white border-2 border-purple-800 active:scale-[0.98] cursor-pointer"
                }`}
              >
                {hasLiked ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    <span>Aimé ({displayLikes})</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{displayLikes} J'aime</span>
                  </>
                )}
              </button>

              <hr className="border-purple-100" />

              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-purple-900/60">
                  À propos de l'image
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {item.description}
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Confirmation de suppression */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemTitle={item.title}
      />
    </div>
  );
}