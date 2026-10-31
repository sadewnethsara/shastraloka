'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Handbag, Check, Bell } from 'lucide-react';
import { Book } from '../data/books';
import { useApp } from '../context/AppContext';
import { getOfferPercentage } from '../utils/searchEngine';
import OptimizedImage, { DEFAULT_FALLBACK_BOOK_COVER } from './ui/OptimizedImage';

export interface CleanBookCardProps {
  book: Book;
  rank?: number;
  badgeText?: string;
  priority?: boolean;
}

export default function CleanBookCard({ book, rank, badgeText, priority = false }: CleanBookCardProps) {
  const router = useRouter();
  const { addToBag, showToast } = useApp();
  const [justAdded, setJustAdded] = useState(false);

  const isOutOfStock = book.inStock === false;
  const discountPercent = getOfferPercentage(book.price, book.originalPrice);

  const handleCardClick = () => {
    router.push(`/books/${book.id}`);
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) {
      showToast(`We'll notify you as soon as "${book.title}" is back in stock!`);
      return;
    }
    addToBag(book, book.binding, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={handleCardClick}
      className="cv-card group cursor-pointer flex flex-col"
    >
      {/* Uniform 3:4 Book Cover Frame */}
      <div className="relative aspect-[3/4] w-full rounded-[var(--radius-card,0.75rem)] overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)] mb-2.5">
        <OptimizedImage
          src={book.coverImage || DEFAULT_FALLBACK_BOOK_COVER}
          fallbackSrc={DEFAULT_FALLBACK_BOOK_COVER}
          alt={book.title}
          priority={priority}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
            isOutOfStock ? 'grayscale-[45%] opacity-85' : ''
          }`}
        />

        {/* Subtle Rank, Out of Stock, or Single Badge (Top Left) */}
        {isOutOfStock ? (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[var(--color-danger)] text-white text-[10px] font-extrabold uppercase tracking-wide shadow-xs">
            Out of Stock
          </span>
        ) : rank !== undefined ? (
          <span className="absolute top-2.5 left-2.5 min-w-6 h-6 px-2 rounded-md bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-[11px] font-bold flex items-center justify-center tabular-nums shadow-xs">
            #{rank}
          </span>
        ) : badgeText ? (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[var(--bg-card)]/95 text-[var(--text-main)] border border-[var(--border-subtle)] text-[10px] font-semibold tracking-tight shadow-xs">
            {badgeText}
          </span>
        ) : discountPercent > 0 ? (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[var(--bg-card)]/95 text-[var(--color-primary)] border border-[var(--border-subtle)] text-[10px] font-bold tabular-nums shadow-xs">
            -{discountPercent}%
          </span>
        ) : null}

        {/* Desktop Hover: Clean "Add to Bag" or "Notify Me" Action */}
        <div className="hidden md:flex absolute inset-x-2.5 bottom-2.5 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            type="button"
            onClick={handleAddToBag}
            className={`w-full h-9 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer active:scale-[0.98] ${
              isOutOfStock
                ? 'bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-strong)] hover:bg-[var(--bg-hover)]'
                : justAdded
                ? 'bg-[var(--color-emerald)] text-white'
                : 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-95'
            }`}
          >
            {isOutOfStock ? (
              <>
                <Bell className="w-3.5 h-3.5 text-[var(--color-danger)]" />
                <span>Out of Stock • Notify</span>
              </>
            ) : justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Handbag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimal Essential Metadata: Title, Author, LKR Price */}
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[var(--text-main)] truncate group-hover:text-[var(--color-primary)] transition-colors">
          {book.title}
        </h3>

        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
          {book.author}
        </p>

        <div className="mt-1.5 flex items-baseline gap-1.5 tabular-nums">
          <span className="text-sm font-bold text-[var(--text-main)]">
            LKR {book.price.toLocaleString()}
          </span>
          {book.originalPrice > book.price && (
            <span className="text-[11px] text-[var(--text-muted)] line-through">
              LKR {book.originalPrice.toLocaleString()}
            </span>
          )}
          {isOutOfStock && (
            <span className="text-[10px] font-extrabold text-[var(--color-danger)] ml-auto">
              Sold out
            </span>
          )}
        </div>

        {/* Mobile Always-Visible Clean "Add to Bag" Button */}
        <button
          type="button"
          onClick={handleAddToBag}
          className={`md:hidden mt-2.5 w-full h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer active:scale-[0.98] ${
            isOutOfStock
              ? 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
              : justAdded
              ? 'bg-[var(--color-emerald)] text-white border-transparent'
              : 'bg-[var(--bg-card)] text-[var(--text-main)] border-[var(--border-strong)] hover:bg-[var(--bg-hover)]'
          }`}
        >
          {isOutOfStock ? (
            <>
              <Bell className="w-3.5 h-3.5" />
              <span>Notify Me</span>
            </>
          ) : justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Handbag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
