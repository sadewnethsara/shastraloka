import React from 'react';

/**
 * Shastraloka Storefront Loading Skeleton
 * Adheres to:
 * - Rule 1 & 2: Bag with Handbag representation
 * - Rule 7: Modern Outfit display typography + English labels
 * - Rule 8: Universal .page-container layout standard
 * - Rule 9: Theme architecture using semantic CSS variables (Light, Dark, Sepia, Emerald)
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans antialiased"
      aria-busy="true"
      aria-label="Loading Shastraloka bookstore..."
    >
      {/* Top Utility / Announcement Bar Skeleton */}
      <div className="h-9 w-full bg-[var(--bg-wash)] border-b border-[var(--border-subtle)] flex items-center justify-center px-4">
        <div className="h-3 w-72 max-w-full rounded-full bg-[var(--border-subtle)] animate-pulse" />
      </div>

      {/* Main Header Skeleton */}
      <header className="sticky top-0 z-40 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="page-container h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo Skeleton */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] flex items-center justify-center">
              <div className="w-5 h-5 rounded-md bg-[var(--color-primary)]/40 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="h-5 sm:h-6 w-28 sm:w-36 rounded-md bg-[var(--border-subtle)] animate-pulse" />
              <div className="h-2.5 w-20 rounded bg-[var(--border-subtle)]/70 animate-pulse hidden sm:block" />
            </div>
          </div>

          {/* Search Pill Skeleton (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="w-full h-11 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-wash)] px-4 flex items-center justify-between">
              <div className="h-3.5 w-44 rounded-full bg-[var(--border-subtle)] animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/30 animate-pulse" />
            </div>
          </div>

          {/* Quick Action Icons & Highlighted Bag Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] animate-pulse hidden sm:block" />
            <div className="w-9 h-9 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] animate-pulse hidden sm:block" />
            <div className="w-9 h-9 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] animate-pulse hidden sm:block" />
            {/* Bag Pill Skeleton */}
            <div className="h-10 px-4 rounded-full bg-[var(--bag-btn-bg)] border border-[var(--bag-btn-border)] flex items-center gap-2 animate-pulse">
              <div className="w-4 h-4 rounded bg-[var(--color-primary)]/40" />
              <div className="h-3.5 w-10 rounded bg-[var(--border-subtle)]" />
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent-badge)]/50" />
            </div>
          </div>
        </div>

        {/* Categories Bar Skeleton */}
        <div className="page-container py-2.5 flex items-center gap-2 overflow-x-auto border-t border-[var(--border-subtle)]/60 scrollbar-none">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 sm:w-28 shrink-0 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] animate-pulse"
            />
          ))}
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="page-container pt-4 sm:pt-6 pb-16 space-y-12 sm:space-y-16">
        {/* 1. Hero Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 rounded-2xl bg-[var(--hero-banner-bg,var(--bg-wash))] border border-[var(--hero-banner-border,var(--border-subtle))] p-6 sm:p-10 min-h-[280px] lg:min-h-[360px] flex flex-col justify-between">
            <div className="space-y-4 max-w-md">
              <div className="h-4 w-28 rounded-full bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] animate-pulse" />
              <div className="h-10 sm:h-12 w-full rounded-xl bg-[var(--border-subtle)] animate-pulse" />
              <div className="h-10 sm:h-12 w-3/4 rounded-xl bg-[var(--border-subtle)] animate-pulse" />
              <div className="h-4 w-5/6 rounded-lg bg-[var(--border-subtle)]/70 animate-pulse pt-2" />
            </div>
            <div className="flex gap-3 pt-6">
              <div className="h-11 w-44 rounded-full bg-[var(--color-primary)]/40 animate-pulse" />
              <div className="h-11 w-36 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] animate-pulse" />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] animate-pulse h-[360px]" />
        </section>

        {/* 2. Best Sellers Section Skeleton */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-6 w-36 rounded-md bg-[var(--border-subtle)] animate-pulse" />
              <div className="h-3.5 w-52 rounded bg-[var(--border-subtle)]/70 animate-pulse" />
            </div>
            <div className="h-4 w-20 rounded bg-[var(--color-primary-subtle)] animate-pulse" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 space-y-3 shadow-xs"
              >
                <div className="aspect-[3/4] w-full rounded-xl bg-[var(--bg-wash)] animate-pulse" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)] animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-[var(--border-subtle)]/60 animate-pulse" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="h-4 w-16 rounded bg-[var(--border-subtle)] animate-pulse" />
                  <div className="h-3 w-12 rounded bg-[var(--color-primary-subtle)] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. New Arrivals Shelf Skeleton */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-6 w-48 rounded-md bg-[var(--border-subtle)] animate-pulse" />
              <div className="h-3.5 w-60 rounded bg-[var(--border-subtle)]/70 animate-pulse" />
            </div>
            <div className="h-4 w-20 rounded bg-[var(--color-primary-subtle)] animate-pulse" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 space-y-3 shadow-xs"
              >
                <div className="aspect-[3/4] w-full rounded-xl bg-[var(--bg-wash)] animate-pulse" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)] animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-[var(--border-subtle)]/60 animate-pulse" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="h-4 w-16 rounded bg-[var(--border-subtle)] animate-pulse" />
                  <div className="h-3 w-12 rounded bg-[var(--color-primary-subtle)] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}