'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import SearchGuides from '../../components/SearchGuides';
import Footer from '../../components/Footer';
import BookCard from '../../components/BookCard';
import BookCover from '../../components/BookCover';
import { useApp } from '../../context/AppContext';
import { BOOKS } from '../../data/books';
import { IconCheck, IconHeart, IconBookmark, IconBook, IconClose, IconShare } from '../../components/Icons';

export default function ProfilePage() {
  const {
    boards,
    createBoard,
    likedBookIds,
    orders,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'boards' | 'all-pins' | 'likes'>('boards');
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');

  // Collect all saved book IDs across all boards
  const allSavedBookIds = Array.from(new Set(boards.flatMap((b) => b.bookIds)));
  const allSavedBooks = BOOKS.filter((b) => allSavedBookIds.includes(b.id));
  const likedBooks = BOOKS.filter((b) => likedBookIds.includes(b.id));

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    createBoard(newBoardName.trim(), newBoardDesc.trim());
    setNewBoardName('');
    setNewBoardDesc('');
    setIsCreateBoardOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />
      <SearchGuides />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Profile Header Section */}
        <div className="max-w-2xl mx-auto text-center space-y-4 pb-10 border-b border-[var(--border-subtle)]">
          
          {/* Avatar with verified badge */}
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-neutral-900 text-white font-bold text-3xl flex items-center justify-center shadow-md mx-auto ring-4 ring-[var(--bg-surface)]">
              SB
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#e60023] text-white flex items-center justify-center shadow-xs">
              <IconCheck size={14} />
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-1">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[var(--text-main)]">
              Dr. Senaka Bandara
            </h1>
            <p className="font-sinhala text-xs sm:text-sm text-[#a66523] dark:text-amber-400 font-semibold">
              සම්මානිත ආචාර්ය සේනක බණ්ඩාර • ශ්‍රී ලංකා පුරාවිද්‍යා සංගමය
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto pt-1 leading-relaxed">
              Bibliophile & researcher of classical Theravada treatises, Mahavihara historical chronicles, and ancient palm-leaf ola manuscripts.
            </p>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold text-[var(--text-muted)] pt-1">
            <span>{boards.length} Boards</span>
            <span>•</span>
            <span>{allSavedBooks.length} Saved Treatises</span>
            <span>•</span>
            <span>{likedBooks.length} Favorites</span>
            <span>•</span>
            <span>{orders.length} Dispatches</span>
          </div>

          {/* Actions: Share & Create Board */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Profile link copied to clipboard!');
              }}
              className="px-4 py-2 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-semibold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <IconShare size={14} />
              <span>Share Profile</span>
            </button>

            <button
              onClick={() => setIsCreateBoardOpen(true)}
              className="px-5 py-2 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>+ Create Board</span>
            </button>
          </div>

        </div>

        {/* Profile Tabs (Saved Boards / All Pins / Likes) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-6 pb-8 border-b border-[var(--border-subtle)] text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('boards')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
              activeTab === 'boards'
                ? 'bg-[#222222] dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Saved Boards ({boards.length})
          </button>

          <button
            onClick={() => setActiveTab('all-pins')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
              activeTab === 'all-pins'
                ? 'bg-[#222222] dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            All Saved Treatises ({allSavedBooks.length})
          </button>

          <button
            onClick={() => setActiveTab('likes')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'likes'
                ? 'bg-[#222222] dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <IconHeart size={14} fill={activeTab === 'likes'} />
            <span>Liked ({likedBooks.length})</span>
          </button>
        </div>

        {/* Tab 1: Board Collage Cards */}
        {activeTab === 'boards' && (
          <div className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              
              {/* Create Board Prompt Card */}
              <div
                onClick={() => setIsCreateBoardOpen(true)}
                className="h-72 rounded-2xl border-2 border-dashed border-[var(--border-subtle)] hover:border-[#e60023] bg-[var(--bg-wash)] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--bg-input)] group-hover:bg-[#e60023] group-hover:text-white flex items-center justify-center text-xl font-bold transition-colors mb-3">
                  +
                </div>
                <h3 className="font-serif font-bold text-base text-[var(--text-main)]">
                  Create New Board
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Organize rare treatises into curated collections
                </p>
              </div>

              {/* Boards Grid */}
              {boards.map((board) => {
                const boardBooks = BOOKS.filter((b) => board.bookIds.includes(b.id));
                const mainBook = boardBooks[0];
                const subBook1 = boardBooks[1];
                const subBook2 = boardBooks[2];

                return (
                  <Link
                    key={board.id}
                    href={`/profile/boards/${board.id}`}
                    className="group block space-y-2 cursor-pointer"
                  >
                    {/* Pinterest Board Collage (1 large cover + 2 small covers) with real photographs */}
                    <div className="h-60 rounded-2xl overflow-hidden bg-[var(--bg-input)] border border-[var(--border-subtle)] p-1.5 grid grid-cols-3 gap-1.5 group-hover:shadow-md transition-shadow">
                      
                      {/* Main Cover (Span 2 cols) */}
                      <div className="col-span-2 h-full rounded-xl overflow-hidden bg-neutral-100 relative">
                        {mainBook ? (
                          <img src={mainBook.coverImage} alt={mainBook.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-[var(--bg-wash)] flex items-center justify-center text-[#a66523]">
                            <IconBook size={24} />
                          </div>
                        )}
                      </div>

                      {/* 2 Small Thumbnail Covers */}
                      <div className="col-span-1 h-full flex flex-col gap-1.5">
                        <div className="flex-1 rounded-lg overflow-hidden bg-neutral-100">
                          {subBook1 ? (
                            <img src={subBook1.coverImage} alt={subBook1.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-[var(--bg-surface)]" />
                          )}
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden bg-neutral-100">
                          {subBook2 ? (
                            <img src={subBook2.coverImage} alt={subBook2.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-[var(--bg-surface)]" />
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Board Info */}
                    <div className="px-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-sm text-[var(--text-main)] group-hover:text-[#e60023] transition-colors truncate">
                          {board.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                          {board.bookIds.length} Pins
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                        {board.description || 'Curated Sri Lankan collection'}
                      </p>
                    </div>

                  </Link>
                );
              })}

            </div>
          </div>
        )}

        {/* Tab 2: All Saved Pins Masonry Feed */}
        {activeTab === 'all-pins' && (
          <div className="pt-6">
            {allSavedBooks.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] text-[#a66523] flex items-center justify-center mx-auto">
                  <IconBookmark size={28} />
                </div>
                <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">
                  No Saved Pins Yet
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Click &ldquo;Save&rdquo; on any book card to store it here.
                </p>
              </div>
            ) : (
              <div className="book-masonry">
                {allSavedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Liked Treatises Feed */}
        {activeTab === 'likes' && (
          <div className="pt-6">
            {likedBooks.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] text-neutral-400 flex items-center justify-center mx-auto">
                  <IconHeart size={28} />
                </div>
                <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">
                  No Liked Treatises Yet
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Tap the heart on any book to save your favorite manuscripts.
                </p>
              </div>
            ) : (
              <div className="book-masonry">
                {likedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Board Modal */}
        {isCreateBoardOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setIsCreateBoardOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-[#1c1c21] rounded-2xl p-6 shadow-2xl border border-[var(--border-subtle)] space-y-4 animate-slide-up"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <h3 className="font-serif font-bold text-lg text-[var(--text-main)]">
                  Create Board
                </h3>
                <button
                  onClick={() => setIsCreateBoardOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center cursor-pointer"
                >
                  <IconClose size={14} />
                </button>
              </div>

              <form onSubmit={handleCreateBoard} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-muted)]">Board Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Inscriptions of Anuradhapura"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm outline-none focus:border-[#e60023]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-muted)]">Description (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="What is this collection about?"
                    value={newBoardDesc}
                    onChange={(e) => setNewBoardDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs sm:text-sm outline-none resize-none focus:border-[#e60023]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateBoardOpen(false)}
                    className="px-4 py-2 rounded-full bg-[var(--bg-input)] text-[var(--text-main)] text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
