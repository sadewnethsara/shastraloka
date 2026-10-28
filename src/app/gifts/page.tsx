'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import { BOOKS } from '../../data/books';
import { Gift, Sparkles, CheckCircle2 } from 'lucide-react';

export default function GiftsPage() {
  // Gift-worthy items: hardcover, leather, deluxe, featured
  const giftBooks = BOOKS.filter(
    (b) =>
      b.binding === 'Deluxe Gold Embossed' ||
      b.binding === 'Ola Leaf Collector Box' ||
      b.featured ||
      b.price >= 2500
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        {/* Hero Section */}
        <div className="rounded-3xl bg-linear-to-r from-amber-950/20 to-orange-950/20 border border-amber-500/20 p-6 sm:p-10 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>Curated Literary Gifts</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)] leading-tight mb-3">
              Timeless Literary & Heritage Gifts
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
              Give the gift of wisdom. Present deluxe bound chronicles, gold-foil classics, and heirloom manuscripts wrapped in premium packaging with custom calligraphy gift cards.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[var(--text-main)]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Complimentary Gift Wrapping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Custom Calligraphy Inscription</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Express Islandwide Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gift Collection Grid */}
        <div className="pb-4 border-b border-[var(--border-subtle)] mb-8">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-main)]">
            Collector & Deluxe Editions for Gifting
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Handpicked heirloom editions suited for graduation, corporate gifts, and esteemed scholars
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {giftBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
