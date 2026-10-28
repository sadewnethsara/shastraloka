'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import { BOOKS } from '../../data/books';
import { useApp } from '../../context/AppContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { likedBookIds } = useApp();
  const likedBooks = BOOKS.filter((b) => likedBookIds.includes(b.id));

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)]">
              My Wishlist
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Books and classical editions you have saved for later ({likedBooks.length} items)
            </p>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            <span>Explore All Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {likedBooks.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-heading font-bold text-[var(--text-main)] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
              Explore our collection of classical literature, translations, and past papers and click the heart icon on any book to save it here.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:opacity-90 transition"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {likedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
