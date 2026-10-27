'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../../components/Header';
import SearchGuides from '../../../../components/SearchGuides';
import Footer from '../../../../components/Footer';
import BookCard from '../../../../components/BookCard';
import { useApp } from '../../../../context/AppContext';
import { BOOKS } from '../../../../data/books';

function BoardDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { boards, addToCart, showToast } = useApp();

  const boardId = (params?.id as string) || '';
  const board = boards.find((b) => b.id === boardId) || boards[0];
  const boardBooks = BOOKS.filter((b) => board.bookIds.includes(b.id));

  const handleAddAllToCart = () => {
    boardBooks.forEach((book) => {
      addToCart(book);
    });
    showToast(`Added ${boardBooks.length} treatises from "${board.name}" to your bag!`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />
      <SearchGuides />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Board Header Section */}
        <div className="max-w-2xl mx-auto text-center space-y-3 pb-8 border-b border-[var(--border-subtle)]">
          
          <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <span>/</span>
            <span>Saved Boards</span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[var(--text-main)]">
            {board.name}
          </h1>

          {board.description && (
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {board.description}
            </p>
          )}

          <div className="text-xs font-bold text-[#e60023]">
            {boardBooks.length} Treatises in Collection
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Board collection link copied to clipboard!');
              }}
              className="px-5 py-2.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold text-xs pill-btn cursor-pointer transition-all hover:scale-105"
            >
              Share Board ↗
            </button>

            {boardBooks.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="px-6 py-2.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-xs pill-btn cursor-pointer shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>🛍️ Order All in Collection ({boardBooks.length})</span>
              </button>
            )}
          </div>

        </div>

        {/* Board Items Masonry Grid */}
        <section className="pt-8">
          {boardBooks.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="text-4xl">📚</div>
              <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">
                This Board is Empty
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Explore our catalog of Sri Lankan treatises and tap &ldquo;Save&rdquo; to add books to this collection.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-full bg-[#e60023] text-white font-bold text-sm pill-btn cursor-pointer shadow-md"
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
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center font-bold">Loading Collection...</div>}>
      <BoardDetailContent />
    </Suspense>
  );
}
