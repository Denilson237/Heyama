"use client";

import { useState } from "react";
import { createObject } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Image as ImageIcon, UploadCloud, Loader2, Plus, X, AlertCircle } from "lucide-react";

interface CreateObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateObjectModal({ isOpen, onClose }: CreateObjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setErrorMessage(null);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file) return;

    try {
      setLoading(true);
      setErrorMessage(null);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file); // Clef 'file' requise par le backend GitHub

      await createObject(formData);

      setTitle("");
      setDescription("");
      setFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (error: any) {
      console.error("Erreur de création:", error);
      setErrorMessage(error.message || "Erreur lors de la création de l'objet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] rounded-3xl p-6 bg-white border-2 border-purple-200/90 shadow-2xl">
        <DialogHeader className="text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 font-black text-[11px] w-fit mb-1">
            <ImageIcon className="w-3.5 h-3.5 text-purple-600" /> Nouvelle publication
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
            Partager une image
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            Remplis les détails ci-dessous pour publier ton image sur Heyama.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Titre */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 tracking-wide">
              Titre de l'image
            </label>
            <input
              type="text"
              placeholder="Ex: Ma guitare vintage de collection"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-purple-50/40 border-2 border-purple-200 focus:border-purple-600 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 outline-none transition-all font-semibold"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 tracking-wide">
              Petite histoire / Description
            </label>
            <textarea
              placeholder="Raconte pourquoi cet objet est unique pour toi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl bg-purple-50/40 border-2 border-purple-200 focus:border-purple-600 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 outline-none transition-all font-semibold resize-none"
            />
          </div>

          {/* Upload Image */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 tracking-wide">
              Fichier image
            </label>

            {previewUrl ? (
              <div className="relative h-44 w-full rounded-2xl overflow-hidden border-2 border-purple-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Aperçu" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center border border-white/20 hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-36 rounded-2xl bg-purple-50/40 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50/80 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-purple-200 flex items-center justify-center text-purple-600 shadow-xs group-hover:scale-105 transition-transform mb-2">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800">Glisse une image ou clique ici</span>
                <span className="text-[10px] text-slate-400 font-semibold">PNG, JPG ou WEBP jusqu'à 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Bouton Soumettre */}
          <button
            type="submit"
            disabled={loading || !title || !description || !file}
            className="w-full py-3.5 px-6 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-sm border-2 border-purple-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publication en cours...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Publier l'image</span>
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}