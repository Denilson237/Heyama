"use client";

export function ObjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="h-16 bg-white/80 border-b border-slate-200/60" />
      <main className="max-w-7xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-[60vh] bg-slate-200/70 rounded-3xl animate-pulse" />
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200/80 space-y-6">
            <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
            <div className="h-8 bg-slate-200 rounded w-4/5 animate-pulse" />
            <div className="h-12 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}