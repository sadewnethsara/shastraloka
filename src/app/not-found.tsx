import React from 'react';
import Link from 'next/link';
import { BookMarked, Search, ArrowLeft, Sparkles, Handbag, Compass } from 'lucide-react';

export default function NotFound() {
  const curatedShelves = [
    { name: 'Best Sellers', href: '/bestsellers' },
    { name: 'New Releases', href: '/new-releases' },
    { name: 'Best Gift Guides', href: '/gifts' },
    { name: 'Archival & Vintage', href: '/archives' },
    { name: 'Browse Categories', href: '/categories' },
    { name: 'Gajaga Wannama', href: '/books/gajaga-wannama-royal-chronicle' },
  ];

  return (
    <div className="min-h-[82vh] bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center px-4 py-12 sm:py-16 transition-colors duration-200">
      <div className="max-w-xl w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-sm p-6 sm:p-12 text-center space-y-6">
        {/* Emblem */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] flex items-center justify-center text-[var(--color-primary)] shadow-inner">
          <BookMarked className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        {/* Heading & Notice */}
        <div className="space-y-2.5">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-primary-subtle)] text-[var(--color-primary)] border border-[var(--color-primary-border)]">
            Error 404 — Volume Not Located
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)] leading-tight">
            This treatise isn&apos;t on our shelf
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
            The page, manuscript, or edition you requested may have been archived,
            relocated, or is awaiting replenishment.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] hover:opacity-90 text-white font-semibold text-sm transition-opacity shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Storefront
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] border border-[var(--border-subtle)] font-medium text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Catalog
          </Link>

          <Link
            href="/bag"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] border border-[var(--border-subtle)] font-medium text-sm transition-colors"
          >
            <Handbag className="w-4 h-4" />
            Shopping Bag
          </Link>
        </div>

        {/* Curated Shelves to Retain Shoppers */}
        <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Discover active shelves &amp; curations:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {curatedShelves.map((shelf) => (
              <Link
                key={shelf.name}
                href={shelf.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-wash)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary-border)] text-[var(--text-main)] border border-[var(--border-subtle)] transition-colors"
              >
                {shelf.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}