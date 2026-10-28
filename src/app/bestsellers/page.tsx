'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import { BOOKS } from '../../data/books';
import { Flame, Sparkles } from 'lucide-react';

export default function BestSellersPage() {
  const bestSellers = [...BOOKS].sort((a, b) => b.rating - a.rating || (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Most Popular in Sri Lanka</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
            Best Sellers
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl">
            The most sought-after classical texts, Buddhist philosophy chronicles, fiction novels, and academic past papers ordered by readers this month.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestSellers.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
