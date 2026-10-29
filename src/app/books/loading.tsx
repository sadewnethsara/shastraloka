// src/app/books/loading.tsx
import React from 'react';

export default function BooksLoading() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] animate-pulse"
      aria-busy="true"
      aria-label="Loading books..."
    >
      {/* Top Banner Skeleton */}
      <div className="h-8 bg-[var(--bg-wash)] border-b border-[var(--border-subtle)] w-full" />

      {/* Header Skeleton */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="page-container h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="h-7 w-32 bg-[var(--bg-wash)] rounded-lg" />
          <div className="hidden sm:block flex-1 max-w-lg h-10 bg-[var(--bg-input)] rounded-full border border-[var(--border-subtle)]" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-wash)]" />
            <div className="w-9 h-9 rounded-full bg-[var(--bg-wash)]" />
            <div className="h-9 w-24 rounded-full bg-[var(--bg-wash)]" />
          </div>
        </div>
      </div>

      {/* Main Content Area: Responsive Hybrid Skeleton (serves both /books catalog & /books/[id] detail) */}
      <main className="page-container py-8 sm:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-16 bg-[var(--bg-wash)] rounded" />
          <div className="h-4 w-4 bg-[var(--bg-wash)] rounded" />
          <div className="h-4 w-28 bg-[var(--bg-wash)] rounded" />
        </div>

        {/* Dual Layout: Book Detail Hero Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Book Cover (3:4 Ratio) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[380px] aspect-[3/4] rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] shadow-sm" />
          </div>

          {/* Right Column: Title, Metadata, Formats, Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="h-4 w-36 bg-[var(--bg-wash)] rounded-full" />
              <div className="h-8 sm:h-10 w-4/5 bg-[var(--bg-wash)] rounded-xl" />
              <div className="h-4 w-48 bg-[var(--bg-wash)] rounded" />
            </div>

            {/* Ratings & Badge Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-5 w-24 bg-[var(--bg-wash)] rounded-full" />
              <div className="h-5 w-32 bg-[var(--bg-wash)] rounded-full" />
            </div>

            {/* Price Box Skeleton */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <div className="h-7 w-32 bg-[var(--bg-wash)] rounded" />
              <div className="h-3 w-48 bg-[var(--bg-wash)] rounded" />
            </div>

            {/* Format Selection Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-10 w-28 rounded-xl bg-[var(--bg-wash)]" />
              <div className="h-10 w-32 rounded-xl bg-[var(--bg-wash)]" />
              <div className="h-10 w-36 rounded-xl bg-[var(--bg-wash)]" />
            </div>

            {/* Action Buttons: Add to Bag & Save */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="h-12 flex-1 rounded-full bg-[var(--color-primary)]/20" />
              <div className="h-12 w-12 rounded-full bg-[var(--bg-wash)]" />
            </div>

            {/* Description Lines */}
            <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
              <div className="h-3.5 w-full bg-[var(--bg-wash)] rounded" />
              <div className="h-3.5 w-5/6 bg-[var(--bg-wash)] rounded" />
              <div className="h-3.5 w-4/6 bg-[var(--bg-wash)] rounded" />
            </div>
          </div>
        </div>

        {/* Catalog Grid Skeleton */}
        <div className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
          <div className="h-6 w-48 bg-[var(--bg-wash)] rounded mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] w-full rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)]" />
                <div className="h-4 w-3/4 bg-[var(--bg-wash)] rounded" />
                <div className="h-3 w-1/2 bg-[var(--bg-wash)] rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

