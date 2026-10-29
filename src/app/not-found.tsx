// app/not-found.tsx
import Link from 'next/link';
import { BookMarked, Search, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  const popularCategories = [
    { name: 'New Arrivals', href: '/?category=new-arrivals' },
    { name: 'Bestsellers', href: '/?category=bestsellers' },
    { name: ' Sinhala Literature', href: '/?category=sinhala' },
    { name: 'Academic & Reference', href: '/?category=academic' },
  ];

  return (
    <div className="min-h-[80vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-16 text-stone-800">
      <div className="max-w-xl w-full bg-white border border-stone-200/90 rounded-2xl shadow-sm p-8 sm:p-12 text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-amber-900">
          <BookMarked className="w-8 h-8" />
        </div>

        {/* Heading & Explanation */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            Error 404 — Page Not Found
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            This book isn&apos;t on our shelf
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            The page or book you are looking for may have been moved, sold out,
            or had its title updated.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-medium text-sm transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Storefront
          </Link>

          <Link
            href="/?search=true"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Catalog
          </Link>
        </div>

        {/* Quick Category Chips to Retain Shoppers */}
        <div className="pt-6 border-t border-stone-100 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Or browse popular shelves:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {popularCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-100 hover:bg-amber-50 hover:text-amber-900 text-stone-700 border border-stone-200/70 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}