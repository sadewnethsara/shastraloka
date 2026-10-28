'use client';

import React, { useState } from 'react';
import { Book } from '../data/books';

const FALLBACK_BOOK_COVER =
  'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showOverlayTitle?: boolean;
}

export default function BookCover({
  book,
  size = 'md',
  className = '',
  showOverlayTitle = false,
}: BookCoverProps) {
  const [imgSrc, setImgSrc] = useState<string>(book.coverImage || FALLBACK_BOOK_COVER);
  const [imgError, setImgError] = useState(false);
  const [prevCover, setPrevCover] = useState(book.coverImage);

  if (book.coverImage !== prevCover) {
    setPrevCover(book.coverImage);
    setImgSrc(book.coverImage || FALLBACK_BOOK_COVER);
    setImgError(false);
  }

  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  // Compute aspect ratio: large, small, or Pinterest staggered masonry ratio
  const aspectRatioStyle = isLarge
    ? { aspectRatio: '1 / 1.48' }
    : isSmall
    ? { aspectRatio: '1 / 1.4' }
    : { aspectRatio: `1 / ${book.heightRatio}` };

  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden select-none bg-neutral-900 shadow-sm group-hover:shadow-md transition-shadow duration-300 ${className}`}
      style={aspectRatioStyle}
    >
      {/* 1. Real Photographic Sri Lankan Book Cover Image */}
      {!imgError && imgSrc ? (
        <img
          src={imgSrc}
          alt={book.title}
          referrerPolicy="no-referrer"
          onError={() => {
            if (imgSrc !== FALLBACK_BOOK_COVER) {
              setImgSrc(FALLBACK_BOOK_COVER);
            } else {
              setImgError(true);
            }
          }}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        /* Fallback: Museum Clothbound Texture with Sinhala Calligraphy */
        <div
          className="w-full h-full flex flex-col justify-between p-4 text-center items-center"
          style={{ background: book.bgGradient || book.themeColor }}
        >
          <div className="w-10 h-10 rounded-full border border-amber-300/40 bg-black/40 flex items-center justify-center font-heading font-bold text-amber-200 text-sm mt-3">
            SL
          </div>
          <div>
            <p className="font-heading font-bold text-amber-100 text-sm leading-snug">
              {book.category}
            </p>
            <p className="font-heading font-bold text-white/90 text-xs mt-1 line-clamp-2">
              {book.title}
            </p>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-amber-300/80 font-bold mb-2">
            {book.binding}
          </span>
        </div>
      )}

      {/* 2. Realistic Physical Book Spine Crease on Left Edge */}
      <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none z-10" />
      <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[1px] bg-white/15 pointer-events-none z-10" />

      {/* 3. Subtle Vignette & Depth Lighting */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/15 rounded-lg pointer-events-none z-10" />

      {/* 4. Optional Top / Bottom Badge */}
      {showOverlayTitle && (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 text-white pointer-events-none">
          <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider truncate">
            {book.category}
          </p>
          <p className="font-heading font-semibold text-xs text-white truncate">
            {book.title}
          </p>
        </div>
      )}
    </div>
  );
}
