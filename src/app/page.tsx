'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import HeroBanner from '../components/HeroBanner';
import BookCard from '../components/BookCard';
import SearchGuides from '../components/SearchGuides';
import Footer from '../components/Footer';

function MainFeed() {
  const { searchQuery, selectedCategory, activeBoardFilter, boards } = useApp();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter books based on search, category, and active board
  const filteredBooks = useMemo(() => {
    let result = [...BOOKS];

    // Board filter
    if (activeBoardFilter) {
      const targetBoard = boards.find((b) => b.id === activeBoardFilter);
      if (targetBoard) {
        result = result.filter((book) => targetBoard.bookIds.includes(book.id));
      }
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Treatises') {
      result = result.filter((book) => book.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          (book.sinhalaTitle && book.sinhalaTitle.includes(q)) ||
          book.author.toLowerCase().includes(q) ||
          book.description.toLowerCase().includes(q) ||
          book.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, activeBoardFilter, boards, sortBy]);

  const displayedBooks = filteredBooks.slice(0, visibleCount);

  return (
    <main className="min-h-screen">
      <Header />
      <SearchGuides />
      <CategoryFilter />
      <HeroBanner />

      {/* Main Feed Container */}
      <section id="feed" className="max-w-[1720px] mx-auto px-4 sm:px-6 pt-2 pb-16">
        
        {/* Results Bar & Sort Control */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <div className="font-semibold flex items-center gap-2">
            <span className="text-[var(--text-main)] font-bold text-sm">
              {filteredBooks.length} Treatises Found
            </span>
            {searchQuery && <span>matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-full bg-[var(--bg-input)] text-[var(--text-main)] font-semibold border-none outline-none cursor-pointer"
            >
              <option value="featured">Featured Treatises</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★ 4.9+)</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">
              No Sacred Treatises Found
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
              We couldn&apos;t find manuscripts matching your search terms. Try searching for &ldquo;Mahavamsa&rdquo;, &ldquo;Dhammapada&rdquo;, or &ldquo;Ayurveda&rdquo;.
            </p>
          </div>
        ) : (
          /* Visual Masonry Feed Layout */
          <div className="book-masonry">
            {displayedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {/* Load More Button (Simulating Infinite Scroll Feed) */}
        {visibleCount < filteredBooks.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold text-sm pill-btn cursor-pointer shadow-md transition-all hover:scale-105"
            >
              Load More Treatises ({filteredBooks.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}

export default function Home() {
  return <MainFeed />;
}
