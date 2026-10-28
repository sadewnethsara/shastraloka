'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS, CATEGORIES } from '../../data/books';

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All Treatises');

  const displayedBooks = useMemo(() => {
    if (activeCategory === 'All Treatises') return BOOKS;
    return BOOKS.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="page-container flex-1 py-8 sm:py-10 space-y-8">
        <header className="pb-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
            <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Categories</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[var(--text-main)] tracking-tight"
          >
            Browse by Category
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Explore Sri Lankan classical genres, historical chronicles, and literary traditions •{' '}
            
          </p>
        </header>

        {/* Clean Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Clean Uniform Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
            {displayedBooks.map((book) => (
              <CleanBookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
