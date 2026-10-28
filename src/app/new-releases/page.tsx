'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import { BOOKS } from '../../data/books';
import { Sparkles, Clock } from 'lucide-react';

export default function NewReleasesPage() {
  const newReleases = [...BOOKS].reverse();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Freshly Printed & Translated</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
            New Arrivals & Releases
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl">
            Discover newly released translations, deluxe bound editions, and fresh reprints of timeless Sri Lankan and Buddhist literary treasures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {newReleases.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
