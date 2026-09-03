"use client";

import { useState } from "react";
import { createObject } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Sparkles, ImagePlus } from "lucide-react";

export function CreateObjectModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      await createObject(formData);

      setTitle("");
      setDescription("");
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Erreur de création:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm shadow-md shadow-purple-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Publier une pépite</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px] rounded-3xl border-0 p-0 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-amber-300" /> Partage ton coup de cœur
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-purple-100 mt-1">
            Présente un objet à la communauté Heyama et déclenche des rencontres passionnées.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-1.5 block">
              Nom de l&apos;objet
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Ma guitare vintage de collection"
              className="rounded-xl border-purple-100 focus:border-purple-400 focus:ring-purple-200"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-1.5 block">
              L&apos;histoire derrière cet objet
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Raconte pourquoi cet objet est unique pour toi..."
              className="rounded-xl border-purple-100 focus:border-purple-400 focus:ring-purple-200 min-h-[90px]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-900/60 mb-1.5 block">
              Photo
            </label>
            <div className="relative border-2 border-dashed border-purple-200 rounded-2xl p-4 text-center hover:bg-purple-50/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <ImagePlus className="w-8 h-8 text-purple-500 mx-auto mb-1" />
              <p className="text-xs text-slate-600 font-medium">
                {file ? file.name : "Sélectionne une belle photo"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Publication en cours...
              </>
            ) : (
              "Partager sur le flux"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}