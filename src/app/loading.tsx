// app/loading.tsx
export default function Loading() {
  return (
    <div
      className="min-h-screen bg-[#FAF8F5] text-stone-800 animate-pulse"
      aria-busy="true"
      aria-label="Loading Shastraloka bookstore..."
    >
      {/* Top Promo / Utility Bar Skeleton */}
      <div className="h-9 bg-stone-200/80 w-full" />

      {/* Main Header Skeleton */}
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-900/15" />
            <div className="h-6 w-36 bg-stone-200 rounded-md" />
          </div>

          {/* Search Bar Placeholder */}
          <div className="hidden md:flex flex-1 max-w-xl h-11 bg-stone-100 border border-stone-200 rounded-full px-4 items-center justify-between">
            <div className="h-3.5 w-48 bg-stone-200 rounded" />
            <div className="h-7 w-7 rounded-full bg-stone-200" />
          </div>

          {/* Action Icons (Wishlist, Cart, Account) */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-stone-200" />
            <div className="w-9 h-9 rounded-full bg-stone-200" />
            <div className="h-10 w-24 rounded-full bg-stone-200 hidden sm:block" />
          </div>
        </div>

        {/* Category Pills Bar Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-hidden border-t border-stone-100">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-28 shrink-0 rounded-full bg-stone-200/70"
            />
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Banner Skeleton */}
        <section className="rounded-2xl bg-stone-200/70 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl w-full">
            <div className="h-6 w-32 rounded-full bg-amber-900/15" />
            <div className="h-10 sm:h-12 w-full bg-stone-300/80 rounded-lg" />
            <div className="h-10 sm:h-12 w-3/4 bg-stone-300/80 rounded-lg" />
            <div className="h-4 w-5/6 bg-stone-300/60 rounded pt-2" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 rounded-xl bg-amber-900/20" />
              <div className="h-12 w-36 rounded-xl bg-stone-300/70" />
            </div>
          </div>

          {/* Featured 2:3 Book Covers in Hero */}
          <div className="hidden sm:flex items-end gap-4">
            <div className="w-32 aspect-[2/3] rounded-lg bg-stone-300 shadow-sm" />
            <div className="w-40 aspect-[2/3] rounded-lg bg-stone-300 shadow-md -translate-y-2" />
            <div className="w-32 aspect-[2/3] rounded-lg bg-stone-300 shadow-sm" />
          </div>
        </section>

        {/* Book Shelf Section 1: Bestsellers / New Arrivals */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-stone-200 rounded-md" />
              <div className="h-4 w-64 bg-stone-200/70 rounded" />
            </div>
            <div className="h-9 w-24 bg-stone-200 rounded-lg" />
          </div>

          {/* 2:3 Aspect Ratio Book Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 border border-stone-200/60 shadow-xs flex flex-col space-y-3"
              >
                {/* 2:3 Book Cover Placeholder */}
                <div className="w-full aspect-[2/3] rounded-lg bg-stone-200/80" />

                {/* Book Title & Author */}
                <div className="space-y-2 pt-1">
                  <div className="h-4 w-11/12 bg-stone-200 rounded" />
                  <div className="h-3.5 w-2/3 bg-stone-200/60 rounded" />
                </div>

                {/* Rating & Price Row */}
                <div className="pt-2 mt-auto flex items-center justify-between">
                  <div className="h-5 w-20 bg-amber-900/15 rounded" />
                  <div className="h-8 w-8 rounded-lg bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}