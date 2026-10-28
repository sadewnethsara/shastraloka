'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CATEGORIES, BOOKS } from '../../data/books';
import { isBookMatchingCategory } from '../../utils/searchEngine';
import { FolderKanban, ArrowRight, BookOpen } from 'lucide-react';

export default function CategoriesPage() {
  const categoriesList = CATEGORIES.filter((c) => c !== 'All Books');

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="pb-6 border-b border-[var(--border-subtle)] mb-8">
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[var(--text-main)] flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-[var(--color-primary)]" />
            <span>Browse Categories</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl">
            Explore our curated departments ranging from Buddhist Philosophy and classical chronicles to contemporary novels and academic guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((category) => {
            const count = BOOKS.filter((b) => isBookMatchingCategory(b, category)).length;
            const sampleBooks = BOOKS.filter((b) => isBookMatchingCategory(b, category)).slice(0, 3);

            return (
              <Link
                key={category}
                href={`/search?category=${encodeURIComponent(category)}`}
                className="group block p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition">
                      {category}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {count} {count === 1 ? 'Volume' : 'Volumes'} Available
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Mini previews */}
                <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  {sampleBooks.map((sb) => (
                    <div
                      key={sb.id}
                      className="w-12 h-16 rounded overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0 border border-black/10"
                    >
                      <img src={sb.coverImage} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {sampleBooks.length === 0 && (
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] py-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Browse category archive</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
