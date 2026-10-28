'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookCard from '../../../components/BookCard';
import { BOOKS } from '../../../data/books';
import { User, ChevronRight, ArrowLeft } from 'lucide-react';

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export default function AuthorDetailPage({ params }: AuthorPageProps) {
  const resolvedParams = use(params);
  const authorName = decodeURIComponent(resolvedParams.id || '').replace(/-/g, ' ');

  const authorBooks = BOOKS.filter(
    (b) =>
      b.author.toLowerCase().includes(authorName.toLowerCase()) ||
      authorName.toLowerCase().includes(b.author.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--text-main)]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/authors" className="hover:text-[var(--text-main)]">
            Authors
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--text-main)] font-semibold truncate">{authorName}</span>
        </div>

        <div className="pb-6 border-b border-[var(--border-subtle)] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-heading font-bold text-xl flex items-center justify-center">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)]">
                {authorName}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                {authorBooks.length} Published Treatises & Volumes
              </p>
            </div>
          </div>
          <Link
            href="/authors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Authors</span>
          </Link>
        </div>

        {authorBooks.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <p className="text-sm text-[var(--text-muted)] mb-4">No books currently indexed under this author.</p>
            <Link
              href="/books"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold"
            >
              Browse Complete Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {authorBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
