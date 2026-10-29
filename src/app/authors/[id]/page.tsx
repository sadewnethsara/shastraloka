'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { BOOKS_DATA } from '../../../data/books';
import CleanBookCard from '../../../components/CleanBookCard';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { ArrowLeft, Award, BookOpen, CheckCircle2 } from 'lucide-react';

export default function AuthorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const decodedAuthor = decodeURIComponent(id).replace(/-/g, ' ');

  const authorBooks = BOOKS_DATA.filter(
    (b) =>
      b.author.toLowerCase().includes(decodedAuthor.toLowerCase()) ||
      b.id.toLowerCase() === id.toLowerCase()
  );

  const primaryAuthorName = authorBooks[0]?.author || decodedAuthor;
  const displayBooks = authorBooks.length > 0 ? authorBooks : BOOKS_DATA.slice(0, 5);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 pb-20">
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--border-subtle)] py-12">
        <div className="page-container">
          <Link
            href="/authors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Authors &amp; Scholars
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[var(--bg-surface)] border-2 border-[#F1641E] flex items-center justify-center font-heading font-bold text-2xl font-bold text-[var(--text-main)] shrink-0">
              {primaryAuthorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1641E]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Shastraloka Scholar &amp; Lineage Author
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl font-normal text-[var(--text-main)] capitalize mt-0.5">
                {primaryAuthorName}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl mt-1">
                Critical editions, palm-leaf transcriptions, and annotated commentaries preserved in the Shastraloka Archive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container pt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[var(--text-main)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#F1641E]" /> Published Treatises &amp; Editions ({displayBooks.length})
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Award className="w-4 h-4 text-[#F1641E]" /> Archival Seal Editions
          </span>
        </div>

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
