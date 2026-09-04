"use client";

import { useState } from "react";
import { ObjectItem } from "@/types/object";
import { useSocket } from "@/hooks/useSocket";
import { ObjectCard } from "@/components/ObjectCard";
import { CreateObjectModal } from "@/components/CreateObjectModal";
import { Layers } from "lucide-react";

interface Props {
  initialItems: ObjectItem[];
}

export function RealtimeObjectsFeed({ initialItems }: Props) {
  const [items, setItems] = useState<ObjectItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useSocket(
    (newObject) => setItems((prev) => [newObject, ...prev]),
    (deletedId) => setItems((prev) => prev.filter((item) => item._id !== deletedId)),
    ({ id, likesCount }) =>
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, likesCount } : item))
      )
  );

  return (
    <section className="mb-16">
      {items.length === 0 ? (
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

      <CreateObjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}