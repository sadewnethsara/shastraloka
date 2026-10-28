'use client';

import React, { useState } from 'react';
import { Book } from '../data/books';
import { useApp } from '../context/AppContext';
import BookCover from './BookCover';
import { IconHeart, IconStar, IconCheck, IconChevronDown, IconZoomIn } from './Icons';
import { Handbag } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { openBookModal, addToBag, saveToBoard, isBookSaved, boards } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState(false);

  const saved = isBookSaved(book.id);
  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div
      className="masonry-item group relative bg-white dark:bg-[#1c1c21] rounded-lg p-2 transition-shadow duration-200 hover:shadow-md border border-[var(--border-subtle)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsBoardDropdownOpen(false);
      }}
    >
      {/* Clickable Card Visual with Real Photographic Cover */}
      <div
        onClick={() => openBookModal(book)}
        className="relative rounded-lg overflow-hidden cursor-pointer book-card-container"
      >
        <BookCover book={book} />

        {/* Top-Right Favorite Heart Chip (Always accessible, Etsy & Pinterest standard) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            saveToBoard(book.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer ${
            saved
              ? 'bg-[#e60023] text-white'
              : 'bg-white/95 text-neutral-700 hover:text-[#e60023] hover:bg-white'
          }`}
          title={saved ? 'Saved to reading board' : 'Save to board'}
          aria-label="Save book"
        >
          <IconHeart size={16} fill={saved} />
        </button>

        {/* Top-Left Bestseller / Archival Tag (Etsy surface-cream token) */}
        {book.featured && (
          <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-[#fdf6e8] text-[#a66523] border border-[#f5e8c8] shadow-xs">
            Bestseller
          </div>
        )}

        {/* Small LKR Price Tag with Offer Percentage on Cover Bottom-Left */}
        <div className="absolute bottom-2 left-2 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-xs text-white border border-white/15 shadow-xs pointer-events-none">
          <span className="text-[11px] font-bold">LKR {book.price.toLocaleString()}</span>
          {discountPercent > 0 && (
            <span className="px-1 py-0.2 rounded bg-[#e60023] text-white text-[9px] font-extrabold">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div
          className={`absolute inset-0 bg-black/35 backdrop-blur-[1px] rounded-lg p-3 flex flex-col justify-between transition-opacity duration-200 pointer-events-none ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0'
          }`}
        >
          {/* Top Bar: Board Picker & Save CTA Pill */}
          <div className="flex items-center justify-between gap-2 z-20 pr-10">
            {/* Board Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBoardDropdownOpen(!isBoardDropdownOpen);
                }}
                className="h-7 px-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white text-[11px] font-medium flex items-center gap-1 backdrop-blur-md cursor-pointer border border-white/20"
              >
                <span className="truncate max-w-[85px]">{boards[0].name}</span>
                <IconChevronDown size={12} />
              </button>

              {isBoardDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-9 left-0 bg-[var(--bg-surface)] text-[var(--text-main)] rounded-xl p-1.5 shadow-2xl border border-[var(--border-subtle)] min-w-[170px] z-30 animate-slide-up"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2 py-1">
                    Save to Board:
                  </p>
                  {boards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => {
                        saveToBoard(book.id, board.id);
                        setIsBoardDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{board.name}</span>
                      {board.bookIds.includes(book.id) && (
                        <span className="text-[#e60023]">
                          <IconCheck size={13} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Red Save Pill */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                saveToBoard(book.id);
              }}
              className={`h-7 px-3 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer transition-transform ${
                saved
                  ? 'bg-neutral-900 text-white'
                  : 'bg-[#e60023] hover:bg-[#ad081b] text-white shadow-md'
              }`}
            >
              {saved ? (
                <>
                  <IconCheck size={12} />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>

          {/* Bottom Bar: Quick Inspect Button */}
          <div className="flex items-center justify-end z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openBookModal(book);
              }}
              className="h-8 px-3 rounded-full bg-white/95 hover:bg-white text-neutral-900 text-xs font-semibold flex items-center gap-1.5 shadow-lg cursor-pointer"
              title="Inspect inside"
            >
              <IconZoomIn size={14} />
              <span>Inspect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Book Metadata Underneath (Etsy Restraint) */}
      <div className="pt-2.5 pb-1 px-1">
        {/* Classical Sinhala Subtitle */}
        <p className="font-sinhala text-xs text-[#a66523] dark:text-amber-400 font-medium truncate mb-0.5">
          {book.sinhalaTitle}
        </p>

        {/* English Title in Disciplined Literary Serif */}
        <h4
          onClick={() => openBookModal(book)}
          className="font-serif font-bold text-sm sm:text-base text-[var(--text-main)] hover:text-[#e60023] transition-colors line-clamp-1 cursor-pointer leading-snug"
        >
          {book.title}
        </h4>

        {/* Author */}
        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5 font-normal">
          {book.author}
        </p>

        {/* Rating and Price row in LKR */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[var(--border-subtle)]">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
              LKR {book.price.toLocaleString()}
            </span>
            <span className="text-[10px] line-through text-[var(--text-dim)]">
              {book.originalPrice.toLocaleString()}
            </span>
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-[#e60023] dark:text-rose-400">
                ({discountPercent}% off)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] shrink-0">
            <IconStar size={13} className="text-amber-500" />
            <span className="text-[var(--text-main)] font-bold">{book.rating}</span>
            <span className="text-[10px]">({book.reviewsCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={() => addToBag(book)}
          className="w-full mt-2 py-1.5 px-3 rounded-full text-xs font-semibold bg-[var(--bg-input)] hover:bg-[#F1641E] hover:text-white text-[var(--text-main)] transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Handbag size={13} />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
