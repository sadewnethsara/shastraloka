'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS } from '../../data/books';

export default function ArchivesPage() {
  const [bindingFilter, setBindingFilter] = useState<string>('All');

  const archivalBooks = useMemo(() => {
    if (bindingFilter === 'All') return BOOKS;
    return BOOKS.filter((b) => b.binding === bindingFilter);
  }, [bindingFilter]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <header className="pb-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
            <Link href="/" className="hover:text-[var(--text-main)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Archives</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-main)] tracking-tight"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Historical Archives &amp; Rare Editions
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Restored palm-leaf facsimiles, monastic records, and museum-grade bindings •{' '}
            <span className="font-sinhala">පුරාණ ලේඛනාගාරය</span>
          </p>
        </header>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            'All',
            'Ola Leaf Collector Box',
            'Royal Silkbound Edition',
            'Deluxe Gold Embossed',
            'Clothbound Hardcover',
          ].map((binding) => {
            const active = bindingFilter === binding;
            return (
              <button
                key={binding}
                type="button"
                onClick={() => setBindingFilter(binding)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {binding === 'All' ? 'All Archival Bindings' : binding}
              </button>
            );
          })}
        </div>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9">
            {archivalBooks.map((book) => (
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
