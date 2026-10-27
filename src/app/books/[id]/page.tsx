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
import {
  IconHeart,
  IconShare,
  IconBookmark,
  IconCheck,
  IconStar,
  IconClose,
  IconZoomIn,
  IconArrowLeft,
  IconChevronDown,
  IconBag,
  IconShieldCheck,
  IconTruck,
  IconAudioPlay,
  IconAudioPause,
} from '../../../components/Icons';

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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

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

  const galleryList = book.galleryImages && book.galleryImages.length > 0
    ? [book.coverImage, ...book.galleryImages]
    : [book.coverImage];

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
            className="flex items-center gap-2 font-semibold hover:text-[var(--text-main)] cursor-pointer px-3 py-1.5 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
          >
            <IconArrowLeft size={14} />
            <span>Back to Feed</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-medium">{book.category}</span>
            <span>/</span>
            <span className="font-semibold text-[var(--text-main)] truncate max-w-xs">{book.title}</span>
          </div>
        </div>

        {/* 2-Column Pinterest Pin Detail Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Large Pinterest Pin Detail Card */}
          <div className="xl:col-span-7 bg-white dark:bg-[#1c1c21] rounded-2xl sm:rounded-3xl border border-[var(--border-subtle)] shadow-sm overflow-hidden p-6 sm:p-10 transition-all">
            
            {/* Pin Top Bar: Actions, Heart, Share, Board Selector & Save Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--border-subtle)]">
              
              <div className="flex items-center gap-2">
                {/* Back Button */}
                <button
                  onClick={() => router.back()}
                  className="w-9 h-9 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center cursor-pointer transition-colors"
                  title="Back"
                >
                  <IconArrowLeft size={16} />
                </button>

                {/* Like / Heart Button */}
                <button
                  onClick={() => toggleLikeBook(book.id)}
                  className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                    liked
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                      : 'hover:bg-[var(--bg-hover)] text-[var(--text-main)]'
                  }`}
                  title="Like Treatise"
                >
                  <IconHeart size={15} fill={liked} />
                  <span>{liked ? book.reviewsCount + 1 : book.reviewsCount}</span>
                </button>

                {/* Comment Anchor */}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="w-9 h-9 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-xs cursor-pointer transition-colors"
                  title="View Comments"
                >
                  <IconBookmark size={15} />
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Manuscript link copied to clipboard!');
                  }}
                  className="w-9 h-9 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center cursor-pointer transition-colors"
                  title="Share Treatise"
                >
                  <IconShare size={15} />
                </button>
              </div>

              {/* Right Side: Board Selector Dropdown & Red Save Pill */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setIsBoardDropdownOpen(!isBoardDropdownOpen)}
                    className="h-9 px-3 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="truncate max-w-[120px]">{boards[0].name}</span>
                    <IconChevronDown size={12} />
                  </button>

                  {isBoardDropdownOpen && (
                    <div className="absolute top-11 right-0 bg-[var(--bg-surface)] rounded-xl p-2 shadow-2xl border border-[var(--border-subtle)] min-w-[190px] z-30 animate-slide-up">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2.5 py-1">
                        Save to Collection:
                      </p>
                      {boards.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            saveToBoard(book.id, b.id);
                            setIsBoardDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{b.name}</span>
                          {b.bookIds.includes(book.id) && (
                            <span className="text-[#e60023]">
                              <IconCheck size={13} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => saveToBoard(book.id)}
                  className={`h-9 px-4 rounded-full text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                    saved
                      ? 'bg-neutral-900 text-white'
                      : 'bg-[#e60023] hover:bg-[#ad081b] text-white shadow-xs'
                  }`}
                >
                  {saved ? (
                    <>
                      <IconCheck size={13} />
                      <span>Saved</span>
                    </>
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              </div>

            </div>

            {/* Main Visual & Commerce Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-7">
              
              {/* Left Sub-Column: Photographic Book Cover Artwork & Gallery */}
              <div className="md:col-span-5 flex flex-col items-center">
                
                {/* Visual Cover Container with Zoom */}
                <div className="relative w-full max-w-[280px] shadow-md rounded-lg overflow-hidden group bg-neutral-100">
                  <div className={`transition-transform duration-300 ${isZoomed ? 'scale-125' : 'hover:scale-[1.01]'}`}>
                    <img
                      src={galleryList[activeGalleryIndex] || book.coverImage}
                      alt={book.title}
                      className="w-full aspect-[1/1.45] object-cover"
                    />
                  </div>

                  {/* Archival Preservation Badge */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <IconShieldCheck size={12} />
                    <span>Archival Edition</span>
                  </div>

                  {/* Zoom Toggle Button */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-md bg-black/75 backdrop-blur-xs text-white text-xs flex items-center justify-center hover:bg-black cursor-pointer"
                    title={isZoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {isZoomed ? <IconClose size={13} /> : <IconZoomIn size={13} />}
                  </button>
                </div>

                {/* Additional Archival Gallery Thumbnails */}
                {galleryList.length > 1 && (
                  <div className="flex items-center gap-2 mt-3">
                    {galleryList.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`w-12 h-14 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                          activeGalleryIndex === idx
                            ? 'border-[#e60023] ring-1 ring-[#e60023]'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={thumbUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Traditional Metrical Audio Chanting Player */}
                <div className="w-full mt-5 p-3.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsPlayingChant(!isPlayingChant);
                        showToast(isPlayingChant ? 'Recitation paused' : 'Playing sacred recitation in Pali & Sinhala meter...');
                      }}
                      className="w-9 h-9 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white flex items-center justify-center text-xs font-bold cursor-pointer shadow-xs transition-colors"
                    >
                      {isPlayingChant ? <IconAudioPause size={14} /> : <IconAudioPlay size={14} />}
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

                {/* Creator Attribution */}
                <div className="w-full mt-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#fdf6e8] text-[#a66523] border border-[#f5e8c8] font-sinhala font-bold text-sm flex items-center justify-center shrink-0">
                    {book.symbol}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-main)] leading-tight">{book.author}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{book.pages} Pages • {book.language}</p>
                  </div>
                </div>

              </div>

              {/* Right Sub-Column: E-commerce Details, Price, Binding Selector, CTAs */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                
                {/* Title & Sinhala Title */}
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#fdf6e8] text-[#a66523] border border-[#f5e8c8]">
                    {book.category}
                  </span>
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[var(--text-main)] leading-tight">
                    {book.title}
                  </h1>
                  {book.sinhalaTitle && (
                    <h2 className="font-sinhala font-semibold text-lg text-[#a66523] dark:text-amber-400 leading-none pt-0.5">
                      {book.sinhalaTitle}
                    </h2>
                  )}
                </div>

                {/* Price Station in LKR & Rating */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-[var(--text-main)]">
                      Rs. {book.price.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-[var(--text-muted)] font-normal">
                      Rs. {book.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1 font-semibold text-[var(--text-main)]">
                      <IconStar size={13} className="text-amber-500" />
                      <span>{book.rating}</span>
                    </span>
                    <span>•</span>
                    <span>{book.reviewsCount.toLocaleString()} Verified Readers</span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">In Stock (Colombo Archives)</span>
                  </div>
                </div>

                {/* Binding & Edition Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                    <span>Select Binding & Edition:</span>
                    <span className="text-[#a66523] dark:text-amber-400 font-semibold">{selectedBinding}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {bindingsOptions.map((binding) => (
                      <button
                        key={binding}
                        onClick={() => setSelectedBinding(binding)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border text-left transition-all cursor-pointer ${
                          selectedBinding === binding
                            ? 'border-[#222222] dark:border-neutral-200 bg-[#222222] text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-main)]'
                        }`}
                      >
                        <p className="leading-tight">{binding}</p>
                        <span className={`text-[10px] ${selectedBinding === binding ? 'opacity-80' : 'text-[var(--text-muted)]'}`}>
                          {binding.includes('Gold') ? '24K Gold Foil' : 'Archival Quality'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Action CTAs */}
                <div className="space-y-3 pt-1">
                  
                  <div className="flex items-center gap-3">
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-[var(--border-subtle)] rounded-full bg-[var(--bg-surface)] px-2 py-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-7 h-7 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Shopping Bag */}
                    <button
                      onClick={() => addToCart(book, selectedBinding, quantity)}
                      className="flex-1 py-3 px-5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-semibold text-xs sm:text-sm cursor-pointer transition-colors flex items-center justify-center gap-2 border border-[var(--border-subtle)]"
                    >
                      <IconBag size={16} />
                      <span>Add to Bag</span>
                    </button>
                  </div>

                  {/* Instant Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout (Buy Now)</span>
                  </button>

                  {/* Courier & Guarantee Assurances */}
                  <div className="flex items-center justify-center gap-4 text-xs text-[#595959] dark:text-neutral-400 font-medium pt-1">
                    <span className="flex items-center gap-1.5">
                      <IconTruck size={15} />
                      <span>Island-wide Delivery (COD)</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <IconShieldCheck size={15} />
                      <span>Certified National Classic</span>
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Content Tabs: Overview, Verses, Commentary & Reviews */}
            <div className="mt-8 pt-5 border-t border-[var(--border-subtle)]">
              
              <div className="flex border-b border-[var(--border-subtle)] gap-5 text-xs sm:text-sm font-semibold mb-5">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'overview'
                      ? 'border-[#e60023] text-[#e60023]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  Treatise Overview
                </button>
                <button
                  onClick={() => setActiveTab('verses')}
                  className={`pb-2.5 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'verses'
                      ? 'border-[#e60023] text-[#e60023]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  Original Verses & Gathas
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'border-[#e60023] text-[#e60023]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <span>Reader Reviews</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[11px] bg-[var(--bg-input)]">
                    {reviews.length}
                  </span>
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'overview' && (
                <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">
                  <p>{book.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--bg-input)] text-[var(--text-main)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'verses' && (
                <div className="p-4 rounded-xl bg-[#fdf6e8] dark:bg-[#201a14] border border-[#f5e8c8] dark:border-[#3a2e22] space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a66523] dark:text-amber-400 block mb-1">
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
                      Geiger & Classical Translation:
                    </span>
                    <p className="text-xs text-[var(--text-main)] leading-relaxed">
                      &ldquo;{book.versesSnippet.english}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  {/* Write a Review Form */}
                  <form onSubmit={handleAddReview} className="p-3.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-3">
                    <p className="text-xs font-semibold text-[var(--text-main)]">Add a Commentary or Scholarly Review</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name / Institution (e.g. Peradeniya Scholar)"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs outline-none"
                      />
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                        <span className="font-medium text-[var(--text-muted)]">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className={`cursor-pointer transition-colors ${newRating >= star ? 'text-amber-500' : 'text-gray-300'}`}
                          >
                            <IconStar size={14} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Add a comment to share your thought on this treatise..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs outline-none resize-none"
                      required
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-full bg-[#e60023] text-white text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Publish Commentary
                      </button>
                    </div>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-2.5">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[var(--text-main)]">{rev.user}</span>
                          <span className="text-[10px] text-[var(--text-muted)]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <IconStar key={i} size={12} />
                          ))}
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

          {/* RIGHT COLUMN: "More like this" Pinterest Recommendation Grid */}
          <div className="xl:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[var(--text-main)]">
                  More Like This
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Related manuscripts from {book.category}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#e60023]">
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
