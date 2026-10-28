'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS } from '../../data/books';

type FilterTab = 'all' | 'sinhala' | 'hardcover' | 'chronicles';
type SortOption = 'latest' | 'price-asc' | 'price-desc';

export default function NewReleasesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const newReleaseBooks = useMemo(() => {
    // Curate order showcasing newly released and freshly restored editions first
    let list = [...BOOKS].reverse();

    if (activeTab === 'sinhala') {
      list = list.filter((b) => b.language.toLowerCase().includes('sinhala'));
    } else if (activeTab === 'hardcover') {
      list = list.filter(
        (b) =>
          b.binding === 'Clothbound Hardcover' ||
          b.binding === 'Royal Silkbound Edition'
      );
    } else if (activeTab === 'chronicles') {
      list = list.filter(
        (b) =>
          b.category.includes('Chronicles') || b.category.includes('Poetry')
      );
    }

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeTab, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="page-container flex-1 py-8 sm:py-10 space-y-8">
        {/* Clean Editorial Page Header */}
        <header className="pb-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--text-main)] font-medium">
                New Arrivals &amp; Releases
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[var(--text-main)] tracking-tight"
            >
              New Arrivals &amp; Releases
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Newly published editions, bilingual translations, and restored Sri Lankan classics •{' '}
              
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/bestsellers"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors"
            >
              Best Sellers &rarr;
            </Link>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort new releases"
              className="h-9 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] focus:outline-none cursor-pointer"
            >
              <option value="latest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </header>

        {/* Clean Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All New Arrivals' },
            { id: 'sinhala', label: 'Sinhala & Bilingual Editions' },
            { id: 'hardcover', label: 'Collector Hardcovers' },
            { id: 'chronicles', label: 'Chronicles & Kavya' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Clean Uniform Bookstore Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
            {newReleaseBooks.map((book) => (
              <CleanBookCard key={book.id} book={book} badgeText="New" />
            ))}
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
