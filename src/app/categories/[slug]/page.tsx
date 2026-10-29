'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { BOOKS_DATA, CATEGORIES } from '../../../data/books';
import CleanBookCard from '../../../components/CleanBookCard';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ');

  const matchedCategory =
    CATEGORIES.find((c) => c.toLowerCase() === decodedSlug.toLowerCase()) ||
    CATEGORIES.find((c) => c.toLowerCase().includes(decodedSlug.toLowerCase())) ||
    decodedSlug;

  const categoryBooks = BOOKS_DATA.filter(
    (b) =>
      b.category.toLowerCase() === matchedCategory.toLowerCase() ||
      b.tags?.some((t) => t.toLowerCase().includes(decodedSlug.toLowerCase()))
  );

  const displayBooks = categoryBooks.length > 0 ? categoryBooks : BOOKS_DATA;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Categories
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F1641E] block">
                Shastraloka Curated Subject
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text-main)] capitalize mt-1">
                {matchedCategory}
              </h1>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-main)]">
              <BookOpen className="w-3.5 h-3.5 text-[#F1641E]" /> {displayBooks.length} Editions Available
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-9">
          {displayBooks.map((book) => (
            <CleanBookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
