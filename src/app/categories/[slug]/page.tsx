'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookCard from '../../../components/BookCard';
import { BOOKS, CATEGORIES } from '../../../data/books';
import { isBookMatchingCategory } from '../../../utils/searchEngine';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategorySlugPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = decodeURIComponent(resolvedParams.slug || '');

  // Find category matching the slug or query
  const matchedCategory =
    CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase()) ||
    CATEGORIES.find((c) => c.toLowerCase().includes(slug.toLowerCase())) ||
    slug;

  const books = BOOKS.filter((b) => isBookMatchingCategory(b, matchedCategory));

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--text-main)]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/categories" className="hover:text-[var(--text-main)]">
            Categories
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--text-main)] font-semibold truncate">{matchedCategory}</span>
        </div>

        <div className="pb-6 border-b border-[var(--border-subtle)] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)]">
              {matchedCategory}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1.5">
              Showing {books.length} publications in this category
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <p className="text-sm text-[var(--text-muted)] mb-4">
              No direct matches found under this category filter.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold"
            >
              Browse Complete Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
