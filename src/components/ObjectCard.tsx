"use client";

import Link from "next/link";
import { ObjectItem } from "@/types/object";
import { Heart, Calendar, ArrowUpRight } from "lucide-react";

interface ObjectCardProps {
  item: ObjectItem;
}

export function ObjectCard({ item }: ObjectCardProps) {
  return (
    <Link
      href={`/objects/${item._id}`}
      className="bg-white/95 rounded-3xl p-3.5 border-2 border-purple-200/90 hover:border-purple-400/90 shadow-md shadow-purple-950/5 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
    >
      {/* Zone Image avec bordure subtile */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900/5 border-2 border-purple-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Date */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-purple-100 text-[10px] font-bold flex items-center gap-1.5 border border-purple-300/30 shadow-xs">
          <Calendar className="w-3 h-3 text-purple-300" />
          <span>
            {new Date(item.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        {/* Overlay Title & Likes */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 pt-10 flex items-end justify-between gap-2">
          <h3 className="font-black text-white text-base truncate drop-shadow-sm tracking-tight">
            {item.title}
          </h3>
          <div className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{item.likesCount || 0}</span>
          </div>
        </div>
      </div>

      {/* Description & CTA */}
      <div className="p-1 pt-3.5 space-y-3 flex-1 flex flex-col justify-between">
        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-semibold">
          {item.description}
        </p>

        <div className="w-full py-2.5 px-4 rounded-xl bg-purple-50/80 group-hover:bg-purple-700 text-purple-800 group-hover:text-white font-black text-xs flex items-center justify-center gap-1.5 border-2 border-purple-200/80 group-hover:border-purple-600 transition-all shadow-xs">
          <span>Découvrir l'image</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}