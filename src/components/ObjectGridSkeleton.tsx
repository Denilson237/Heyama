"use client";

interface ObjectGridSkeletonProps {
  count?: number;
}

export function ObjectGridSkeleton({ count = 6 }: ObjectGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-md rounded-4xl p-3 border border-purple-100/80 shadow-md flex flex-col justify-between overflow-hidden relative"
        >
          {/* Zone Image Skeleton avec Shimmer */}
          <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-slate-200/80">
            {/* Vague Shimmer */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Badge Date Fake */}
            <div className="absolute top-3 left-3 w-24 h-6 rounded-full bg-white/70" />

            {/* Title & Button Overlay Fake */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
              <div className="h-5 bg-white/70 rounded-xl w-1/2" />
              <div className="h-7 w-14 bg-white/70 rounded-full" />
            </div>
          </div>

          {/* Description & Action Button Skeleton */}
          <div className="p-3 pt-4 space-y-3">
            {/* Description (2 lignes) */}
            <div className="space-y-1.5">
              <div className="h-3.5 bg-slate-200/80 rounded-lg w-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
              <div className="h-3.5 bg-slate-200/80 rounded-lg w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            </div>

            {/* Bouton d'action Fake */}
            <div className="w-full h-9 rounded-2xl bg-purple-100/60 animate-pulse mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}