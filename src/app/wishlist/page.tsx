'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { useApp } from '../../context/AppContext';
import { BOOKS } from '../../data/books';

export default function WishlistPage() {
  const { boards, likedBookIds } = useApp();

  const savedBooks = useMemo(() => {
    const boardBookIds = boards.flatMap((b) => b.bookIds);
    const uniqueIds = Array.from(new Set([...boardBookIds, ...likedBookIds]));
    const matched = BOOKS.filter((b) => uniqueIds.includes(b.id));
    return matched.length > 0 ? matched : BOOKS.slice(0, 5);
  }, [boards, likedBookIds]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="page-container flex-1 py-8 sm:py-10 space-y-8">
        <header className="pb-6 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--text-main)] font-medium">Saved Reading List</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[var(--text-main)] tracking-tight"
            >
              Saved Treatises &amp; Reading List
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Quickly review and add your saved volumes to your Shopping Bag
            </p>
          </div>
          <Link
            href="/bestsellers"
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] self-start sm:self-auto"
          >
            Browse Best Sellers &rarr;
          </Link>
        </header>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
            {savedBooks.map((book) => (
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
