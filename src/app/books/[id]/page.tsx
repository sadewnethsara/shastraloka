'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import SearchGuides from '../../../components/SearchGuides';
import BookCover from '../../../components/BookCover';
import BookCard from '../../../components/BookCard';
import Footer from '../../../components/Footer';
import { BOOKS } from '../../../data/books';
import { useApp } from '../../../context/AppContext';

function BookDetailContent() {
  const params = useParams();
  const router = useRouter();
  const {
    addToCart,
    saveToBoard,
    isBookSaved,
    boards,
    showToast,
    isBookLiked,
    toggleLikeBook,
    getReviewsForBook,
    addBookReview,
  } = useApp();

  const bookId = (params?.id as string) || '';
  const book = BOOKS.find((b) => b.id === bookId) || BOOKS[0];

  const [selectedBinding, setSelectedBinding] = useState<string>(book.binding || 'Deluxe Gold Embossed');
  const [quantity, setQuantity] = useState<number>(1);
  const [isPlayingChant, setIsPlayingChant] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'verses' | 'reviews'>('overview');
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const saved = isBookSaved(book.id);
  const liked = isBookLiked(book.id);
  const reviews = getReviewsForBook(book.id);
  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  // Related books for the "More like this" right column
  const relatedBooks = BOOKS.filter((b) => b.id !== book.id && (b.category === book.category || b.tags.some((t) => book.tags.includes(t))));

  const bindingsOptions = [
    'Clothbound Hardcover',
    'Deluxe Gold Embossed',
    'Ola Leaf Collector Box',
    'Royal Silkbound Edition',
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addBookReview(book.id, {
      user: reviewerName.trim() || 'Reader (Sri Lanka)',
      rating: newRating,
      comment: newComment.trim(),
    });
    setNewComment('');
  };

  const handleBuyNow = () => {
    addToCart(book, selectedBinding, quantity);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />
      <SearchGuides />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Breadcrumbs & Back Navigation */}
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 font-bold hover:text-[var(--text-main)] cursor-pointer pill-btn px-3 py-1.5 rounded-full hover:bg-[var(--bg-hover)]"
          >
            <span>←</span>
            <span>Back to Feed</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-semibold">{book.category}</span>
            <span>/</span>
            <span className="font-bold text-[var(--text-main)] truncate max-w-xs">{book.title}</span>
          </div>
        </div>

        {/* 2-Column Pinterest Pin Detail Layout (Screenshot 2) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Large Pinterest Pin Detail Card */}
          <div className="xl:col-span-7 bg-[var(--bg-card)] rounded-3xl sm:rounded-[36px] border border-[var(--border-subtle)] shadow-xl overflow-hidden p-6 sm:p-10 transition-all">
            
            {/* Pin Top Bar: Actions, Heart, Share, Board Selector & Save Button (Screenshot 2) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--border-subtle)]">
              
              <div className="flex items-center gap-2">
                {/* Back Button */}
                <button
                  onClick={() => router.back()}
                  className="w-10 h-10 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-lg font-bold pill-btn cursor-pointer"
                  title="Back"
                >
                  ←
                </button>

                {/* Like / Heart Button */}
                <button
                  onClick={() => toggleLikeBook(book.id)}
                  className={`h-10 px-3.5 rounded-full flex items-center gap-1.5 text-xs font-bold pill-btn cursor-pointer transition-colors ${
                    liked
                      ? 'bg-rose-500/15 text-rose-600 border border-rose-500/30'
                      : 'hover:bg-[var(--bg-hover)] text-[var(--text-main)]'
                  }`}
                  title="Like Treatise"
                >
                  <span className="text-sm">{liked ? '❤️' : '🤍'}</span>
                  <span>{liked ? book.reviewsCount + 1 : book.reviewsCount}</span>
                </button>

                {/* Comment Anchor */}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="w-10 h-10 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-sm pill-btn cursor-pointer"
                  title="View Comments"
                >
                  💬
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Manuscript link copied to clipboard!');
                  }}
                  className="w-10 h-10 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-sm pill-btn cursor-pointer"
                  title="Share Treatise"
                >
                  ↗️
                </button>
              </div>

              {/* Right Side: Board Selector Dropdown & Red Save Pill (Screenshot 2) */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setIsBoardDropdownOpen(!isBoardDropdownOpen)}
                    className="h-10 px-3.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] text-xs font-bold flex items-center gap-1.5 pill-btn cursor-pointer"
                  >
                    <span className="truncate max-w-[120px]">{boards[0].name}</span>
                    <span className="text-[10px]">▼</span>
                  </button>

                  {isBoardDropdownOpen && (
                    <div className="absolute top-12 right-0 bg-[var(--bg-surface)] rounded-2xl p-2 shadow-2xl border border-[var(--border-subtle)] min-w-[200px] z-30 animate-slide-up">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-3 py-1">
                        Save to Collection:
                      </p>
                      {boards.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            saveToBoard(book.id, b.id);
                            setIsBoardDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{b.name}</span>
                          {b.bookIds.includes(book.id) && (
                            <span className="text-[#e60023] font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => saveToBoard(book.id)}
                  className={`h-10 px-5 rounded-full text-xs font-bold pill-btn cursor-pointer shadow-md transition-all ${
                    saved
                      ? 'bg-[var(--bg-badge)] text-[var(--bg-main)]'
                      : 'save-pill-btn'
                  }`}
                >
                  {saved ? 'Saved ✓' : 'Save'}
                </button>
              </div>

            </div>

            {/* Main Visual & Commerce Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
              
              {/* Left Sub-Column: Book Cover Artwork & Audio Recitation (Screenshot 2) */}
              <div className="md:col-span-5 flex flex-col items-center">
                
                {/* Visual Cover Container with Zoom & Image Badge */}
                <div className="relative w-full max-w-[280px] shadow-2xl rounded-2xl overflow-hidden group">
                  <div className={`transition-transform duration-300 ${isZoomed ? 'scale-125' : 'hover:scale-[1.02]'}`}>
                    <BookCover book={book} size="lg" />
                  </div>

                  {/* AI / Archival Preservation Badge (Screenshot 2) */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    🏛️ Archival Edition
                  </div>

                  {/* Zoom Toggle Button (Screenshot 2) */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md text-white text-xs flex items-center justify-center hover:bg-black cursor-pointer border border-white/20"
                    title={isZoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {isZoomed ? '✕' : '⤢'}
                  </button>
                </div>

                {/* Traditional Metrical Audio Chanting Player */}
                <div className="w-full mt-6 p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsPlayingChant(!isPlayingChant);
                        showToast(isPlayingChant ? 'Recitation paused' : 'Playing sacred chanting recitation in Pali & Sinhala meter...');
                      }}
                      className="w-10 h-10 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white flex items-center justify-center text-sm font-bold pill-btn cursor-pointer shadow-md"
                    >
                      {isPlayingChant ? '❚❚' : '▶'}
                    </button>
                    <div>
                      <span className="text-xs font-bold text-[var(--text-main)] block leading-tight">
                        {isPlayingChant ? 'Recitation Live' : 'Listen to Classical Recitation'}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        Ancient Pali & Sinhala Gatha Meter
                      </span>
                    </div>
                  </div>
                </div>

                {/* Creator Attribution (Screenshot 2: Avatar & Author) */}
                <div className="w-full mt-4 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e60023] text-white font-bold flex items-center justify-center shrink-0">
                    {book.symbol}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-main)] leading-tight">{book.author}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{book.pages} Pages • {book.language}</p>
                  </div>
                </div>

              </div>

              {/* Right Sub-Column: E-commerce Details, Price, Binding Selector, CTAs */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* Title & Sinhala Title */}
                <div className="space-y-1.5">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#e60023]/10 text-[#e60023]">
                    {book.category}
                  </span>
                  <h1 className="font-serif font-black text-2xl sm:text-3xl text-[var(--text-main)] leading-tight">
                    {book.title}
                  </h1>
                  {book.sinhalaTitle && (
                    <h2 className="font-sinhala font-bold text-lg text-[#e60023] leading-none pt-0.5">
                      {book.sinhalaTitle}
                    </h2>
                  )}
                </div>

                {/* Price Station in LKR & Rating */}
                <div className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif font-black text-2xl sm:text-3xl text-[var(--text-main)]">
                      Rs. {book.price.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-[var(--text-muted)] font-semibold">
                      Rs. {book.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span className="text-amber-500 font-bold">★ {book.rating}</span>
                    <span>•</span>
                    <span>{book.reviewsCount.toLocaleString()} Verified Scholars</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">● In Stock (Colombo Archives)</span>
                  </div>
                </div>

                {/* Binding & Edition Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                    <span>Select Binding & Edition:</span>
                    <span className="text-[#e60023] lowercase font-normal">{selectedBinding}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {bindingsOptions.map((binding) => (
                      <button
                        key={binding}
                        onClick={() => setSelectedBinding(binding)}
                        className={`px-3 py-2.5 rounded-2xl text-xs font-bold border text-left transition-all cursor-pointer ${
                          selectedBinding === binding
                            ? 'border-[#e60023] bg-[#e60023]/10 text-[#e60023] ring-1 ring-[#e60023]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-main)]'
                        }`}
                      >
                        <p className="leading-tight">{binding}</p>
                        <span className="text-[10px] text-[var(--text-muted)] font-normal">
                          {binding.includes('Gold') ? '+ 24K Gold Foil' : 'Archival Quality'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Action CTAs */}
                <div className="space-y-3 pt-2">
                  
                  <div className="flex items-center gap-3">
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-[var(--border-subtle)] rounded-full bg-[var(--bg-surface)] px-2 py-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Shopping Bag */}
                    <button
                      onClick={() => addToCart(book, selectedBinding, quantity)}
                      className="flex-1 py-3.5 px-6 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold text-sm pill-btn cursor-pointer shadow-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>🛍️</span>
                      <span>Add to Bag</span>
                    </button>
                  </div>

                  {/* Instant Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-black text-sm pill-btn cursor-pointer shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>⚡ Instant Checkout (Buy Now)</span>
                  </button>

                  {/* Courier & Guarantee badges */}
                  <div className="flex items-center justify-center gap-4 text-[11px] text-[var(--text-muted)] font-semibold pt-1">
                    <span>🇱🇰 Cash on Delivery Island-wide</span>
                    <span>•</span>
                    <span>2-3 Days Courier</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Content Tabs: Overview, Verses, Commentary & Reviews */}
            <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]">
              
              <div className="flex border-b border-[var(--border-subtle)] gap-4 text-sm font-bold mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'overview'
                      ? 'border-[#e60023] text-[#e60023]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  Treatise Overview
                </button>
                <button
                  onClick={() => setActiveTab('verses')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'verses'
                      ? 'border-[#e60023] text-[#e60023]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  Original Verses & Gathas
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'border-[#e60023] text-[#e60023]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <span>Reader Reviews</span>
                  <span className="px-1.5 py-0.5 rounded-full text-xs bg-[var(--bg-input)]">
                    {reviews.length}
                  </span>
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'overview' && (
                <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  <p>{book.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-input)] text-[var(--text-main)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'verses' && (
                <div className="p-5 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Original Pali / Sinhala Verse:
                    </span>
                    <p className="font-sinhala font-bold text-base text-[var(--text-main)] leading-relaxed">
                      {book.versesSnippet.original}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Metrical Romanized Transliteration:
                    </span>
                    <p className="font-mono text-xs text-[var(--text-muted)] italic">
                      {book.versesSnippet.transliteration}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Geiger & Royal Translation:
                    </span>
                    <p className="text-xs text-[var(--text-main)] leading-relaxed">
                      &ldquo;{book.versesSnippet.english}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  {/* Write a Review Input (Screenshot 2: Add a comment) */}
                  <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-3">
                    <p className="text-xs font-bold text-[var(--text-main)]">Add a Commentary or Scholarly Review</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name / Institution (e.g. Peradeniya Scholar)"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs outline-none"
                      />
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                        <span className="font-bold">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className={`cursor-pointer ${newRating >= star ? 'text-amber-500' : 'text-gray-300'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Add a comment to share your thought on this treatise..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs outline-none resize-none"
                      required
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-[#e60023] text-white text-xs font-bold pill-btn cursor-pointer shadow-md"
                      >
                        Publish Commentary
                      </button>
                    </div>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[var(--text-main)]">{rev.user}</span>
                          <span className="text-[10px] text-[var(--text-muted)]">{rev.date}</span>
                        </div>
                        <div className="text-amber-500 text-xs">
                          {'★'.repeat(rev.rating)}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: "More like this" Pinterest Recommendation Grid (Screenshot 2) */}
          <div className="xl:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="font-serif font-black text-xl text-[var(--text-main)]">
                  More Like This
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Related manuscripts from {book.category}
                </p>
              </div>
              <span className="text-xs font-bold text-[#e60023]">
                {relatedBooks.length} Treatises
              </span>
            </div>

            {/* Masonry Recommendation Feed */}
            <div className="book-masonry" style={{ columnCount: 2 }}>
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function BookDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center font-bold">Loading Sacred Treatise...</div>}>
      <BookDetailContent />
    </Suspense>
  );
}
