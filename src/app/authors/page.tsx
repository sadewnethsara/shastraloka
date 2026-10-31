'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import ProgressiveBookGrid from '../../components/ProgressiveBookGrid';
import { BOOKS } from '../../data/books';

export default function AuthorsPage() {
  const authors = useMemo(() => {
    const list = Array.from(new Set(BOOKS.map((b) => b.author)));
    return ['All Authors', ...list];
  }, []);

  const [selectedAuthor, setSelectedAuthor] = useState<string>('All Authors');

  const displayedBooks = useMemo(() => {
    if (selectedAuthor === 'All Authors') return BOOKS;
    return BOOKS.filter((b) => b.author === selectedAuthor);
  }, [selectedAuthor]);

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
            <span className="text-[var(--text-main)] font-medium">Authors &amp; Scholars</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[var(--text-main)] tracking-tight"
          >
            Authors, Monks &amp; Literary Scholars
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Classical and modern Sri Lankan authors represented in the Shastraloka catalog
          </p>
        </header>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {authors.map((author) => {
            const active = selectedAuthor === author;
            return (
              <button
                key={author}
                type="button"
                onClick={() => setSelectedAuthor(author)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {author}
              </button>
            );
          })}
        </div>

        <section>
          <ProgressiveBookGrid books={displayedBooks} />
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
