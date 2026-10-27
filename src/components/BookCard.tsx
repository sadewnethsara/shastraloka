'use client';

import React, { useState } from 'react';
import { Book } from '../data/books';
import { useApp } from '../context/AppContext';
import BookCover from './BookCover';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { openBookModal, addToCart, saveToBoard, isBookSaved, boards } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState(false);

  const saved = isBookSaved(book.id);
  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div 
      className="masonry-item group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsBoardDropdownOpen(false);
      }}
    >
      {/* Clickable Card Visual */}
      <div 
        onClick={() => openBookModal(book)}
        className="relative rounded-2xl overflow-hidden cursor-pointer book-card-container"
      >
        <BookCover book={book} />

        {/* Hover Overlay with Save Button & Price Badge */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-2xl p-3.5 flex flex-col justify-between transition-opacity duration-200 pointer-events-none ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0'
          }`}
        >
          {/* Top Bar: Board Picker & Red Save Button */}
          <div className="flex items-center justify-between gap-2 z-20">
            {/* Board Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBoardDropdownOpen(!isBoardDropdownOpen);
                }}
                className="h-8 px-3 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold flex items-center gap-1.5 pill-btn backdrop-blur-md cursor-pointer border border-white/20"
              >
                <span className="truncate max-w-[90px]">{boards[0].name}</span>
                <span className="text-[10px]">▼</span>
              </button>

              {isBoardDropdownOpen && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-10 left-0 bg-[var(--bg-surface)] text-[var(--text-main)] rounded-2xl p-2 shadow-2xl border border-[var(--border-subtle)] min-w-[180px] z-30 animate-slide-up"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2.5 py-1">
                    Save to Board:
                  </p>
                  {boards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => {
                        saveToBoard(book.id, board.id);
                        setIsBoardDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{board.name}</span>
                      {board.bookIds.includes(book.id) && (
                        <span className="text-[#e60023] text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Red Save Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                saveToBoard(book.id);
              }}
              className={`h-9 px-4 rounded-full text-xs font-bold pill-btn flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform ${
                saved
                  ? 'bg-neutral-900 text-white border border-white/20'
                  : 'save-pill-btn'
              }`}
            >
              {saved ? (
                <>
                  <span>✓</span>
                  <span>Saved</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>

          {/* Bottom Bar: Price in LKR & Quick Inspect */}
          <div className="flex items-center justify-between gap-2 z-20">
            <div className="px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-1.5">
              <span>Rs. {book.price.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-400 font-extrabold">{discountPercent}% OFF</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openBookModal(book);
              }}
              className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-black flex items-center justify-center shadow-lg pill-btn cursor-pointer"
              title="Quick Look Inside"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Book Information Underneath */}
      <div className="pt-3 pb-1 px-1">
        {/* Sinhala Subtitle */}
        <p className="font-sinhala text-[13px] font-semibold text-amber-700 dark:text-amber-400 truncate mb-0.5">
          {book.sinhalaTitle}
        </p>

        {/* English Title in Refined Literary Serif */}
        <h4 
          onClick={() => openBookModal(book)}
          className="font-serif font-bold text-base text-[var(--text-main)] hover:text-[#e60023] transition-colors line-clamp-1 cursor-pointer leading-snug"
        >
          {book.title}
        </h4>

        {/* Author / Translator */}
        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5 font-medium">
          {book.author}
        </p>

        {/* Rating and Price row in LKR */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[var(--border-subtle)]">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm sm:text-base text-[var(--text-main)]">
              Rs. {book.price.toLocaleString()}
            </span>
            <span className="text-[11px] line-through text-[var(--text-dim)]">
              Rs. {book.originalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
            <span>★</span>
            <span className="text-[var(--text-main)]">{book.rating}</span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={() => addToCart(book)}
          className="w-full mt-2.5 py-2 px-3 rounded-full text-xs font-bold bg-[var(--bg-input)] hover:bg-[#e60023] hover:text-white text-[var(--text-main)] transition-colors duration-150 pill-btn cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>+ Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
