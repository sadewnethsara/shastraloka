'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import { BOOKS } from '../../data/books';
import { Landmark, Scroll, ShieldCheck } from 'lucide-react';

export default function ArchivesPage() {
  // Ancient & classical items
  const archiveBooks = BOOKS.filter(
    (b) => b.category.includes('Classical') || b.category.includes('Heritage') || b.category.includes('Buddhism')
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="rounded-3xl bg-linear-to-r from-stone-900/40 to-amber-950/30 border border-stone-800 p-6 sm:p-10 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-3">
              <Scroll className="w-3.5 h-3.5" />
              <span>National Heritage Archive</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)] mb-3">
              Digital Manuscript & Ola Leaf Archives
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Preserving thousands of ancient Pali, Sanskrit, and Classical Sinhala inscriptions. Explore authoritative diplomatic transcripts of the Mahavamsa, Culavamsa, Thupavamsa, and indigenous medical folios.
            </p>
          </div>
        </div>

        <div className="pb-4 border-b border-[var(--border-subtle)] mb-8">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-main)]">
            Archival & Critical Editions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Carefully curated critical recensions with full scholarly apparatus
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {archiveBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
