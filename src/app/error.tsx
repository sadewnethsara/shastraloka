// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to your monitoring service
    console.error('Shastraloka Storefront Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-16 text-stone-800">
      <div className="max-w-lg w-full bg-white border border-stone-200/90 rounded-2xl shadow-sm p-8 sm:p-10 text-center space-y-6">
        {/* Literary Illustration Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-800 relative">
          <BookOpen className="w-8 h-8" />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-700">
            <AlertTriangle className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Customer-Friendly Copy */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            Unexpected Interruption
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900">
            We lost our bookmark on this page
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Something went wrong while loading this shelf. Your book bag is safe—you
            can try refreshing this page or head back to the main bookstore.
          </p>
        </div>

        {/* Recovery Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Storefront
          </Link>
        </div>

        {/* Subtle Technical Reference for Support */}
        {error.digest && (
          <div className="pt-4 border-t border-stone-100">
            <p className="text-xs text-stone-400 font-mono">
              Reference ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}