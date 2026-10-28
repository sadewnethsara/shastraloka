'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS } from '../../data/books';

type GiftFilter = 'all' | 'silkbound' | 'gold' | 'ola-leaf' | 'under-1000';

export default function GiftsPage() {
  const [filter, setFilter] = useState<GiftFilter>('all');

  const giftBooks = useMemo(() => {
    if (filter === 'silkbound') {
      return BOOKS.filter((b) => b.binding === 'Royal Silkbound Edition');
    }
    if (filter === 'gold') {
      return BOOKS.filter((b) => b.binding === 'Deluxe Gold Embossed');
    }
    if (filter === 'ola-leaf') {
      return BOOKS.filter((b) => b.binding === 'Ola Leaf Collector Box');
    }
    if (filter === 'under-1000') {
      return BOOKS.filter((b) => b.price <= 1000);
    }
    return BOOKS;
  }, [filter]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <header className="pb-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--text-main)] font-medium">Curated Gifts</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-main)] tracking-tight"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Collector Editions &amp; Literary Gifts
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Silkbound editions, gold-embossed volumes, and presentation boxes •{' '}
              <span className="font-sinhala">විශේෂ ත්‍යාග ග්‍රන්ථ එකතුව</span>
            </p>
          </div>
        </header>

        {/* Clean Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Gift Editions' },
            { id: 'silkbound', label: 'Royal Silkbound' },
            { id: 'gold', label: 'Gold Embossed' },
            { id: 'ola-leaf', label: 'Ola Leaf Collector Box' },
            { id: 'under-1000', label: 'Under LKR 1,000' },
          ].map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id as GiftFilter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Clean Uniform Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
            {giftBooks.map((book) => (
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
