'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BOOKS } from '../../data/books';
import { Users, BookOpen, ArrowRight } from 'lucide-react';

export default function AuthorsPage() {
  // Extract unique authors
  const authorsMap = new Map<string, typeof BOOKS>();
  BOOKS.forEach((book) => {
    const a = book.author || 'Classical Sage';
    if (!authorsMap.has(a)) authorsMap.set(a, []);
    authorsMap.get(a)!.push(book);
  });

  const authorsList = Array.from(authorsMap.entries());

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="pb-6 border-b border-[var(--border-subtle)] mb-8">
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)] flex items-center gap-3">
            <Users className="w-8 h-8 text-[var(--color-primary)]" />
            <span>Classical Scholars & Renowned Authors</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl">
            From the venerable chroniclers of Anuradhapura and Polonnaruwa to modern literary luminaries of Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorsList.map(([author, books]) => (
            <Link
              key={author}
              href={`/search?q=${encodeURIComponent(author)}`}
              className="group p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-heading font-bold flex items-center justify-center text-sm">
                    {author.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    {books.length} {books.length === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>
                <h2 className="text-lg font-heading font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition">
                  {author}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">
                  Famous work: {books[0]?.title}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                <span>View Author Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
