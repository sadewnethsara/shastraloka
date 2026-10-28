'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import BookCard from '../../../../components/BookCard';
import { useApp } from '../../../../context/AppContext';
import { BOOKS } from '../../../../data/books';
import { IconArrowLeft, IconShare, IconBook } from '../../../../components/Icons';
import { Handbag } from 'lucide-react';

function BoardDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { boards, addToBag, showToast } = useApp();

  const boardId = (params?.id as string) || '';
  const board = boards.find((b) => b.id === boardId) || boards[0];

  const boardBooks = BOOKS.filter((book) => board.bookIds.includes(book.id));

  const handleAddAllToBag = () => {
    boardBooks.forEach((book) => {
      addToBag(book, book.binding, 1);
    });
    showToast(`Added ${boardBooks.length} treatises to your shopping bag!`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      <main className="page-container py-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 font-semibold hover:text-[var(--text-main)] cursor-pointer px-3 py-1.5 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
          >
            <IconArrowLeft size={13} />
            <span>Back to Profile & Boards</span>
          </Link>

          <div className="flex items-center gap-2">
            <span>Reading Board</span>
            <span>/</span>
            <span className="font-semibold text-[var(--text-main)]">{board.name}</span>
          </div>
        </div>

        {/* Board Header Section */}
        <div className="text-center max-w-xl mx-auto space-y-3 py-6">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[var(--text-main)]">
            {board.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {board.description || 'Custom collection of ancient Sri Lankan classical treatises and historical manuscripts.'}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[var(--text-muted)] pt-1">
            <span>{boardBooks.length} Treatises Saved</span>
            <span>•</span>
            <span>Private Collection</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Board collection link copied to clipboard!');
              }}
              className="px-4 py-2 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-semibold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <IconShare size={14} />
              <span>Share Board</span>
            </button>

            {boardBooks.length > 0 && (
              <button
                onClick={handleAddAllToBag}
                className="px-5 py-2 rounded-full bg-[#F1641E] hover:bg-[#d45314] text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Handbag size={14} />
                <span>Add All to Bag ({boardBooks.length})</span>
              </button>
            )}
          </div>

        </div>

        {/* Board Items Masonry Grid */}
        <section className="pt-6">
          {boardBooks.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] text-[#a66523] flex items-center justify-center mx-auto">
                <IconBook size={28} />
              </div>
              <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
                This Board is Empty
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Explore our catalog of Sri Lankan treatises and tap &ldquo;Save&rdquo; to add books to this collection.
              </p>
              <Link
                href="/"
                className="inline-block px-5 py-2 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Explore Treatises
              </Link>
            </div>
          ) : (
            <div className="book-masonry">
              {boardBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default function BoardDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center font-bold">Loading Board Collection...</div>}>
      <BoardDetailContent />
    </Suspense>
  );
}
