'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS, CATEGORIES } from '../../data/books';

type SortOption = 'popular' | 'rating' | 'price-asc' | 'price-desc';

export default function BestSellersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Treatises');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredBooks = useMemo(() => {
    const base =
      selectedCategory === 'All Treatises'
        ? [...BOOKS]
        : BOOKS.filter((b) => b.category === selectedCategory);

    return base.sort((a, b) => {
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Clean Editorial Page Header */}
        <header className="pb-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--text-main)] font-medium">Best Sellers</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-main)] tracking-tight"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Best Sellers
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Most-read Sri Lankan chronicles, classical Sinhala literature, and scholarly editions •{' '}
              <span className="font-sinhala">වැඩිම අලෙවියක් ඇති ග්‍රන්ථ</span>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/new-releases"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors"
            >
              New Arrivals &rarr;
            </Link>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort best sellers"
              className="h-9 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </header>

        {/* Clean Category Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {category === 'All Treatises' ? 'All Categories' : category.split(' (')[0]}
              </button>
            );
          })}
        </div>

        {/* Clean Uniform Bookstore Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
            {filteredBooks.map((book, index) => (
              <CleanBookCard key={book.id} book={book} rank={index + 1} />
            ))}
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
