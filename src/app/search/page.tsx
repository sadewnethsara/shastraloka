'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import BookModal from '../../components/BookModal';
import BoardsModal from '../../components/BoardsModal';
import Toast from '../../components/Toast';
import { BOOKS, CATEGORIES } from '../../data/books';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useApp();

  const activeQuery = queryParam || searchQuery;

  const filteredBooks = useMemo(() => {
    let result = [...BOOKS];

    if (selectedCategory && selectedCategory !== 'All Treatises') {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (activeQuery.trim()) {
      const q = activeQuery.toLowerCase().trim();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          (book.sinhalaTitle && book.sinhalaTitle.includes(q)) ||
          book.author.toLowerCase().includes(q) ||
          book.description.toLowerCase().includes(q) ||
          book.tags.some((t) => t.toLowerCase().includes(q)) ||
          book.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeQuery, selectedCategory]);

  const quickTags = [
    'All Treatises',
    'Mahavamsa',
    'Visuddhimagga',
    'Dhammapada',
    'Ayurveda',
    'Selalihini',
    'Chulavamsa',
    'Jataka',
  ];

  const handleTagClick = (tag: string) => {
    if (tag === 'All Treatises') {
      setSelectedCategory('All Treatises');
      setSearchQuery('');
      router.push('/search');
    } else {
      setSearchQuery(tag);
      router.push(`/search?q=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Search Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {activeQuery ? (
                <>
                  Results for &ldquo;<span className="text-[#F1641E]">{activeQuery}</span>&rdquo;
                </>
              ) : selectedCategory !== 'All Treatises' ? (
                <>Category: <span className="text-[#F1641E]">{selectedCategory}</span></>
              ) : (
                'Explore All Sacred Treatises'
              )}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {filteredBooks.length} classical manuscripts & treatises found
            </p>
          </div>

          {/* Quick Filter Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {quickTags.map((tag) => {
              const isSelected = activeQuery.toLowerCase() === tag.toLowerCase() || (tag === 'All Treatises' && !activeQuery);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#222222] text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pinterest-Style Masonry Grid View */}
        {filteredBooks.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mx-auto">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              No Sacred Treatises Found
            </h2>
            <p className="text-xs text-neutral-500">
              We couldn&apos;t find manuscripts matching &ldquo;{activeQuery}&rdquo;. Try searching for &ldquo;Mahavamsa&rdquo;, &ldquo;Visuddhimagga&rdquo;, or &ldquo;Ayurveda&rdquo;.
            </p>
            <div className="pt-2">
              <Button
                variant="orange"
                size="sm"
                text="Clear Search"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Treatises');
                  router.push('/');
                }}
              />
            </div>
          </div>
        ) : (
          <div className="book-masonry">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BookModal />
      <BoardsModal />
      <Toast />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F1641E]" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
