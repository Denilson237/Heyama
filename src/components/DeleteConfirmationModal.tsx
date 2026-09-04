"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  itemTitle?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemTitle = "cet élément",
}: DeleteConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !loading && onClose()}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl p-6 bg-white border-2 border-rose-200/90 shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-900 font-black text-[11px] w-fit">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Action irréversible
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
            Supprimer la publication ?
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium leading-relaxed">
            Êtes-vous sûr de vouloir supprimer <strong className="text-slate-800 font-bold">"{itemTitle}"</strong> ? Cette action est définitive et le fichier sera retiré de Heyama.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 my-1 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-rose-800 leading-snug">
            Le fichier et toutes les données associées seront définitivement effacés du serveur.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-200 transition-all cursor-pointer disabled:opacity-50"
          >
            Annuler
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs border-2 border-rose-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Suppression...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Confirmer</span>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}