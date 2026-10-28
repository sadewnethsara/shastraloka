'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import { BOOKS, CATEGORIES } from '../../data/books';
import { isBookMatchingCategory } from '../../utils/searchEngine';
import { BookOpen } from 'lucide-react';

export default function BooksPage() {
  const [selectedCat, setSelectedCat] = useState<string>('All Books');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filtered = BOOKS.filter((book) => {
    if (selectedCat === 'All Books') return true;
    return isBookMatchingCategory(book, selectedCat);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    if (sortOrder === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="pb-6 border-b border-[var(--border-subtle)] mb-6">
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)] flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[var(--color-primary)]" />
            <span>Complete Book Catalog</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl">
            Browse our full repertoire of Sri Lankan classical chronicles, novels, academic guides, and philosophical manuscripts.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pt-5 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                  selectedCat === cat
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--color-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar info */}
        <div className="flex items-center justify-between gap-4 mb-6 text-sm text-[var(--text-muted)]">
          <span>Showing {sorted.length} books</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {sorted.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
