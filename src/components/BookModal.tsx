'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import BookCover from './BookCover';

export default function BookModal() {
  const router = useRouter();
  const { selectedBook, closeBookModal, addToCart, saveToBoard, isBookSaved, boards, showToast } = useApp();

  const [selectedBinding, setSelectedBinding] = useState<string>('Deluxe Gold Embossed');
  const [isPlayingChant, setIsPlayingChant] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'verses' | 'reviews'>('overview');

  // Interactive reviews in Sri Lankan literary context
  const [reviews, setReviews] = useState([
    { id: '1', user: 'Ven. Medhananda Thero', date: 'Yesterday', rating: 5, comment: 'The preservation of original Pali gathas alongside precise Sinhala etymological notes makes this edition an indispensable national treasure.' },
    { id: '2', user: 'Dr. S. Jayawardena (Peradeniya)', date: '3 days ago', rating: 5, comment: 'Breathtaking binding quality. The archival paper and gold foil embossing resemble ancient Royal Court manuscripts.' },
    { id: '3', user: 'Kasun Perera (Colombo)', date: '1 week ago', rating: 5, comment: 'Arrived via courier within 2 days in Colombo. Packaging was pristine with archival protective seals.' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  if (!selectedBook) return null;

  const saved = isBookSaved(selectedBook.id);
  const discountPercent = Math.round(((selectedBook.originalPrice - selectedBook.price) / selectedBook.originalPrice) * 100);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setReviews([
      {
        id: `rev-${Date.now()}`,
        user: 'You (Reader)',
        date: 'Just now',
        rating: newRating,
        comment: newComment.trim(),
      },
      ...reviews,
    ]);
    setNewComment('');
    showToast('Your commentary has been published on this treatise!');
  };

  const bindingsOptions = [
    'Clothbound Hardcover',
    'Deluxe Gold Embossed',
    'Ola Leaf Collector Box',
    'Royal Silkbound Edition',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={closeBookModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[var(--bg-card)] text-[var(--text-main)] rounded-3xl sm:rounded-[36px] shadow-2xl border border-[var(--border-subtle)] overflow-hidden my-auto animate-slide-up"
      >
        {/* Floating Close Button */}
        <button
          onClick={closeBookModal}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] flex items-center justify-center text-lg font-bold pill-btn cursor-pointer shadow-md"
          title="Close inspection"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">

          {/* Left Column: Visual Cover & Recitation Audio */}
          <div className="lg:col-span-5 bg-[var(--bg-wash)] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <BookCover book={selectedBook} size="lg" />
              </div>

              {/* Chanting Audio Recitation */}
              <div className="w-full mt-6 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsPlayingChant(!isPlayingChant);
                      showToast(isPlayingChant ? 'Recitation paused' : 'Playing sacred chanting...');
                    }}
                    className="w-10 h-10 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white flex items-center justify-center text-sm font-bold pill-btn cursor-pointer shadow-md"
                  >
                    {isPlayingChant ? '❚❚' : '▶'}
                  </button>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--text-main)]">
                      {isPlayingChant ? 'Recitation Live' : 'Listen to Classical Recitation'}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      Traditional Sinhala & Pali Meter
                    </span>
                  </div>
                </div>

                {isPlayingChant && (
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-4 bg-[#e60023] animate-pulse" />
                    <span className="w-1 h-6 bg-[#e60023] animate-pulse delay-75" />
                    <span className="w-1 h-3 bg-[#e60023] animate-pulse delay-150" />
                    <span className="w-1 h-5 bg-[#e60023] animate-pulse delay-100" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-[var(--text-muted)]">
              <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Pages</div>
                <div className="font-bold text-[var(--text-main)] text-sm">{selectedBook.pages} Archival Pages</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Language</div>
                <div className="font-bold text-[var(--text-main)] text-sm">{selectedBook.language}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header: Board info & Red "Save" button */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-muted)]">Board:</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--bg-input)] text-[var(--text-main)]">
                    {boards[0].name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveToBoard(selectedBook.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold pill-btn cursor-pointer shadow-md flex items-center gap-1.5 ${saved ? 'bg-neutral-800 text-white' : 'save-pill-btn'
                      }`}
                  >
                    <span>{saved ? '✓ Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Title & Author Info */}
              <div className="pt-5 pb-3">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2 border border-amber-500/20">
                  {selectedBook.category}
                </div>

                {/* Sinhala Title */}
                <h2 className="font-sinhala font-bold text-3xl sm:text-4xl text-[var(--text-main)] leading-tight">
                  {selectedBook.sinhalaTitle}
                </h2>

                {/* English Title in Classic Literary Serif */}
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--text-muted)] mt-1.5 leading-snug">
                  {selectedBook.title}
                </h3>

                <p className="text-sm text-[var(--text-muted)] mt-2">
                  Authored by <span className="font-bold text-[var(--text-main)]">{selectedBook.author}</span>
                  {selectedBook.translator && (
                    <> • Translated by <span className="font-semibold text-[var(--text-main)]">{selectedBook.translator}</span></>
                  )}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <span>★★★★★</span>
                    <span className="text-[var(--text-main)] ml-1">{selectedBook.rating}</span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    ({selectedBook.reviewsCount} verified readers in Sri Lanka)
                  </span>
                </div>
              </div>

              {/* Price & Discount Bar in LKR */}
              <div className="flex items-baseline gap-3 my-4 p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)]">
                <span className="text-3xl font-black text-[var(--text-main)]">
                  Rs. {selectedBook.price.toLocaleString()}
                </span>
                <span className="text-base line-through text-[var(--text-dim)]">
                  Rs. {selectedBook.originalPrice.toLocaleString()}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  Save {discountPercent}% Today
                </span>
                <span className="ml-auto text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>✓</span> Island-wide Stock Available
                </span>
              </div>

              {/* Edition Selector */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Select Edition Binding:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {bindingsOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBinding(b)}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${selectedBinding === b
                          ? 'border-[#e60023] bg-red-500/10 text-[var(--text-main)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)]'
                        }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs: Overview, Verses, Reviews */}
              <div className="flex border-b border-[var(--border-subtle)] gap-6 mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 text-sm font-bold transition-colors cursor-pointer relative ${activeTab === 'overview'
                      ? 'text-[#e60023]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                >
                  Treatise Overview
                  {activeTab === 'overview' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e60023]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('verses')}
                  className={`pb-2.5 text-sm font-bold transition-colors cursor-pointer relative ${activeTab === 'verses'
                      ? 'text-[#e60023]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                >
                  Sacred Verses (ගාථා / කාව්‍ය)
                  {activeTab === 'verses' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e60023]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 text-sm font-bold transition-colors cursor-pointer relative ${activeTab === 'reviews'
                      ? 'text-[#e60023]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                >
                  Discussion ({reviews.length})
                  {activeTab === 'reviews' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e60023]" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-[var(--text-main)] font-normal">
                    {selectedBook.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedBook.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--bg-input)] text-[var(--text-muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'verses' && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2.5">
                  <div className="font-sinhala font-bold text-xl text-amber-700 dark:text-amber-300 leading-relaxed">
                    {selectedBook.versesSnippet.original}
                  </div>
                  <div className="text-xs font-mono text-[var(--text-muted)] italic">
                    {selectedBook.versesSnippet.transliteration}
                  </div>
                  <div className="text-sm text-[var(--text-main)] font-medium pt-2 border-t border-amber-500/20">
                    &ldquo;{selectedBook.versesSnippet.english}&rdquo;
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                    {reviews.map((r) => (
                      <div key={r.id} className="p-3 rounded-xl bg-[var(--bg-wash)] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[var(--text-main)]">{r.user}</span>
                          <span className="text-[var(--text-dim)]">{r.date}</span>
                        </div>
                        <p className="text-[var(--text-muted)]">{r.comment}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddReview} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Share your commentary or thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-4 py-2 text-xs rounded-full bg-[var(--bg-input)] outline-none text-[var(--text-main)]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full text-xs font-bold bg-[#e60023] text-white hover:bg-[#ad081b] pill-btn cursor-pointer"
                    >
                      Post
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center gap-3">
              <Link
                href={`/books/${selectedBook.id}`}
                onClick={closeBookModal}
                className="py-3.5 px-4 rounded-full text-xs font-bold bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] pill-btn flex items-center justify-center gap-1.5"
                title="Open full Pinterest Pin page"
              >
                <span>↗ Full Page</span>
              </Link>

              <button
                onClick={() => {
                  addToCart(selectedBook, selectedBinding);
                  closeBookModal();
                }}
                className="flex-1 py-3.5 px-5 rounded-full text-sm font-bold bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] pill-btn cursor-pointer flex items-center justify-center gap-2 border border-[var(--border-subtle)]"
              >
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => {
                  addToCart(selectedBook, selectedBinding);
                  closeBookModal();
                  router.push('/checkout');
                }}
                className="flex-1 py-3.5 px-5 rounded-full text-sm font-bold bg-[#e60023] hover:bg-[#ad081b] text-white pill-btn cursor-pointer shadow-xl flex items-center justify-center gap-2"
              >
                <span>⚡ Buy Now (Rs. {selectedBook.price.toLocaleString()})</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
