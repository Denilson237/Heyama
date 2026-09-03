"use client";

import { useState } from "react";
import { ObjectItem } from "@/types/object";
import { deleteObject, likeObject } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Heart, Calendar, Sparkles } from "lucide-react";

interface ObjectCardProps {
  item: ObjectItem;
}

export function ObjectCard({ item }: ObjectCardProps) {
  const [deleting, setDeleting] = useState(false);
  const [liking, setLiking] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteObject(item._id);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      setDeleting(false);
    }
  };

  const handleLike = async () => {
    if (liking) return;
    try {
      setLiking(true);
      await likeObject(item._id);
    } catch (error) {
      console.error("Erreur de like:", error);
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-purple-100/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div className="relative h-72 w-full overflow-hidden bg-purple-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90" />
        
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-purple-950 flex items-center gap-1 shadow-sm">
          <Calendar className="w-3 h-3 text-purple-600" />
          {new Date(item.createdAt).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/40 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          title="Supprimer la publication"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold truncate leading-snug drop-shadow-sm">
            {item.title}
          </h3>
          <button
            onClick={handleLike}
            disabled={liking}
            className="px-3 py-1 rounded-full bg-rose-500/90 text-white backdrop-blur-md hover:bg-rose-600 flex items-center gap-1.5 font-bold text-xs shadow-md transition-all active:scale-110 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>{item.likesCount || 0}</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed font-normal">
          {item.description}
        </p>

        <Dialog>
          <DialogTrigger className="w-full py-2.5 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Découvrir cette pépite</span>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[480px] rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
            <div className="relative h-80 w-full bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-white flex items-center justify-between">
                    <span>{item.title}</span>
                    <div className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-6 h-6 fill-rose-400" />
                      <span className="text-lg font-bold">{item.likesCount || 0}</span>
                    </div>
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>

            <div className="p-6 bg-white space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900/50 mb-1">
                  Histoire & Origine
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs text-slate-400">
                <span>Publié le {new Date(item.createdAt).toLocaleString("fr-FR")}</span>
                <span className="font-bold text-purple-600">Heyama Match Verified</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}