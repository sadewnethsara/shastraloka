'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { BOOKS } from '../../data/books';
import CleanBookCard from '../../components/CleanBookCard';
import ProgressiveBookGrid from '../../components/ProgressiveBookGrid';
import OptimizedImage from '../../components/ui/OptimizedImage';
import ViewportSection from '../../components/ui/ViewportSection';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Lock,
  Pencil,
  Clock,
  SlidersHorizontal,
  Plus,
  Search,
  Heart,
  Share2,
  FolderHeart,
  Sparkles,
  BookOpen,
} from 'lucide-react';

const SUGGESTED_SEARCHES = [
  { label: 'Palm-leaf Ola Folios', query: 'Ola Manuscripts', image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp' },
  { label: 'Mahavamsa Editions', query: 'Mahavamsa', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80' },
  { label: 'Sandesha Kavya', query: 'Sandesha', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80' },
  { label: 'Hela Veda Treatises', query: 'Ayurveda', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&q=80' },
  { label: 'Collector Slipcases', query: 'Royal Chronicles', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80' },
  { label: 'Pali Chanting Guides', query: 'Sanskrit Poetics', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80' },
];

export default function WishlistPage() {
  const { likedBookIds, boards, createBoard, showToast, toggleLikeBook, openAuthModal } = useApp();
  const [searchWithin, setSearchWithin] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'auto' | 'guest-empty' | 'collection'>('auto');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Determine saved books
  const savedBooks = useMemo(() => {
    let ids = likedBookIds;
    if (selectedBoardId !== 'all') {
      const board = boards.find((b) => b.id === selectedBoardId);
      ids = board ? board.bookIds : [];
    }
    return BOOKS.filter((book) => {
      const inList = ids.includes(book.id);
      if (!inList) return false;
      if (searchWithin.trim()) {
        const q = searchWithin.toLowerCase();
        return (
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [likedBookIds, boards, selectedBoardId, searchWithin]);

  const showEmptyGuestState =
    viewMode === 'guest-empty' || (viewMode === 'auto' && likedBookIds.length === 0 && selectedBoardId === 'all');

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    createBoard(newCollectionName.trim(), 'Curated reading list on Shastraloka');
    setNewCollectionName('');
    setIsCreatingCollection(false);
  };

  const handleLoadSampleFavorites = () => {
    BOOKS.slice(0, 4).forEach((b) => {
      if (!likedBookIds.includes(b.id)) {
        toggleLikeBook(b.id);
      }
    });
    setViewMode('collection');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="flex-1 page-container pt-8 pb-20">
        {/* Top Mode Switcher bar for previewing Guest Empty vs Populated Collection */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl font-normal text-[var(--text-main)]">
              {showEmptyGuestState ? 'Favorite items' : "Scholar's Favorites"}
            </h1>
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="px-4 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-semibold text-[var(--text-main)] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setViewMode((prev) => (prev === 'guest-empty' ? 'collection' : 'guest-empty'))
              }
              className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-wash)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              {showEmptyGuestState ? 'Preview populated collection' : 'Preview guest empty state'}
            </button>
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--text-main)]">
              <Lock className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Private</span>
            </div>
            <button
              onClick={() => showToast('Collection privacy & title settings updated')}
              aria-label="Edit favorites settings"
              className="w-9 h-9 rounded-full bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-main)] transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showEmptyGuestState ? (
          /* ================= IMAGE 2: GUEST FAVORITES EMPTY STATE ================= */
          <div>
            {/* Don't lose your faves notice */}
            <div className="max-w-md mb-14">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[var(--text-main)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                    Don&apos;t lose your faves! Sign in or create an account.
                  </p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-1">
                    Guest favorites are only saved to your device for 7 days, or until you clear your cache.{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="underline font-medium text-[var(--text-main)] hover:text-[var(--color-primary)] cursor-pointer"
                    >
                      Sign in
                    </button>{' '}
                    or{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('register')}
                      className="underline font-medium text-[var(--text-main)] hover:text-[var(--color-primary)] cursor-pointer"
                    >
                      create an account
                    </button>{' '}
                    to hang on to your literary picks.
                  </p>
                </div>
              </div>
            </div>

            {/* Centered Shield / Emblem Empty Illustration */}
            <div className="py-16 sm:py-24 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-center mb-5 shadow-inner">
                <BookOpen className="w-11 h-11 text-[var(--text-main)] stroke-[1.5]" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-1.5">
                Nothing here... yet.
              </h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                These are a few of your favorite treatises... or they will be, once you favorite a book or palm-leaf manuscript.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/bestsellers"
                  className="px-6 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Explore Best Sellers
                </Link>
                <button
                  onClick={handleLoadSampleFavorites}
                  className="px-5 py-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-semibold text-[var(--text-main)] transition-colors"
                >
                  Load sample reading list
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= IMAGE 5: POPULATED USER FAVORITES & COLLECTIONS VIEW ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar: Items & Collections */}
            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-2">
                <button
                  onClick={() => setSelectedBoardId('all')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    selectedBoardId === 'all'
                      ? 'bg-[var(--bg-wash)] text-[var(--text-main)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
                    All Favorite Books
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)]">
                    {likedBookIds.length || 4}
                  </span>
                </button>

                <div className="pt-3 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Collections
                    </span>
                    <button
                      onClick={() => setIsCreatingCollection(!isCreatingCollection)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Create
                    </button>
                  </div>

                  {isCreatingCollection && (
                    <form onSubmit={handleCreateCollection} className="mb-3 p-2.5 rounded-xl bg-[var(--bg-wash)] space-y-2">
                      <input
                        type="text"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        placeholder="Collection name..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] focus:outline-none"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setIsCreatingCollection(false)}
                          className="px-2.5 py-1 text-xs text-[var(--text-muted)]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-lg bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-1">
                    {boards.map((board) => (
                      <button
                        key={board.id}
                        onClick={() => setSelectedBoardId(board.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                          selectedBoardId === board.id
                            ? 'bg-[var(--bg-wash)] text-[var(--text-main)] font-semibold'
                            : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <FolderHeart className="w-4 h-4 shrink-0 text-[var(--text-muted)]" />
                          <span className="truncate">{board.name}</span>
                        </span>
                        <span className="text-[11px] text-[var(--text-dim)]">{board.bookIds.length}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Column: Collection Header + Saved Books + Discover Similar + Suggested Searches */}
            <div className="lg:col-span-9 space-y-12">
              {/* Top Collection Controls & Search Within Collection */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-wash)] text-xs font-medium text-[var(--text-main)]">
                    <Lock className="w-3.5 h-3.5" /> Private Collection • {(savedBooks.length || 4)} treatises
                  </span>
                  <button
                    onClick={() => showToast('Collection share link copied to clipboard')}
                    className="p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-main)]"
                    aria-label="Share collection"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSearchWithin('')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-main)]"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
                  </button>
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      value={searchWithin}
                      onChange={(e) => setSearchWithin(e.target.value)}
                      placeholder="Search within this collection"
                      className="w-full pl-4 pr-9 py-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-input)] text-xs sm:text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Saved Books Grid */}
              <ProgressiveBookGrid
                books={savedBooks.length > 0 ? savedBooks : BOOKS.slice(0, 4)}
                gridClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
              />

              {/* Discover similar items section (Matches Image 5) */}
              <ViewportSection minHeight={280} skeletonTitle="Discover similar editions">
                <div className="pt-8 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-heading font-bold text-xl sm:text-2xl font-normal text-[var(--text-main)] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
                        Discover similar editions
                      </h2>
                      <p className="text-xs text-[var(--text-muted)]">
                        Based on the chronicles and palm-leaf manuscripts in your collection
                      </p>
                    </div>
                    <Link
                      href="/books"
                      className="text-xs sm:text-sm font-semibold text-[var(--text-main)] hover:text-[var(--color-primary)] underline underline-offset-4"
                    >
                      See more
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {BOOKS.slice(2, 6).map((book, idx) => (
                      <CleanBookCard key={`sim-${book.id}-${idx}`} book={book} />
                    ))}
                  </div>
                </div>
              </ViewportSection>

              {/* Suggested searches circular pills (Matches bottom of Image 5) */}
              <ViewportSection minHeight={200} skeletonTitle="Suggested searches">
                <div className="pt-8 border-t border-[var(--border-subtle)]">
                  <h3 className="font-heading font-bold text-lg sm:text-xl font-normal text-[var(--text-main)] mb-5">
                    Suggested searches
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {SUGGESTED_SEARCHES.map((item) => (
                      <Link
                        key={item.label}
                        href={`/search?q=${encodeURIComponent(item.query)}`}
                        className="group flex flex-col items-center text-center"
                      >
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-wash)] mb-2.5 group-hover:scale-105 group-hover:border-[var(--color-primary)] transition-all">
                          <OptimizedImage
                            src={item.image}
                            alt={item.label}
                            targetWidth={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </ViewportSection>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
