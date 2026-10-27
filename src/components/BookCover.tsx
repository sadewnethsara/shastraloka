'use client';

import React from 'react';
import { Book } from '../data/books';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BookCover({ book, size = 'md', className = '' }: BookCoverProps) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  // Compute aspect ratio: if large or small use preset, otherwise use book.heightRatio for Pinterest staggered masonry
  const aspectRatioStyle = isLarge 
    ? { aspectRatio: '1 / 1.48' }
    : isSmall 
    ? { aspectRatio: '1 / 1.4' }
    : { aspectRatio: `1 / ${book.heightRatio}` };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden select-none shadow-lg transition-transform duration-300 ${className}`}
      style={{
        ...aspectRatioStyle,
        background: book.bgGradient || book.themeColor,
      }}
    >
      {/* 1. Archival Leather/Cloth Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2) 0%, transparent 70%), 
            repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 4px)`
        }}
      />

      {/* 2. Book Spine Shadow & Crease Simulation (Left Edge) */}
      <div className="absolute left-0 top-0 bottom-0 w-3.5 sm:w-5 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-10 pointer-events-none" />
      <div className="absolute left-3.5 sm:left-5 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-10" />
      <div className="absolute left-4 sm:left-5.5 top-0 bottom-0 w-[1px] bg-black/40 pointer-events-none z-10" />

      {/* 3. Gold / Metallic Embossed Outer Filigree Border */}
      <div 
        className="absolute inset-2 sm:inset-3 rounded-xl border pointer-events-none z-10 flex flex-col justify-between"
        style={{ borderColor: `${book.accentColor}55` }}
      >
        {/* Inner concentric thin hairline */}
        <div 
          className="absolute inset-1 rounded-lg border pointer-events-none"
          style={{ borderColor: `${book.accentColor}25` }}
        />

        {/* Traditional Corner Ornaments */}
        <span 
          className="absolute top-1 left-1 text-[9px] sm:text-[11px] leading-none pointer-events-none"
          style={{ color: book.accentColor }}
        >
          ✦
        </span>
        <span 
          className="absolute top-1 right-1 text-[9px] sm:text-[11px] leading-none pointer-events-none"
          style={{ color: book.accentColor }}
        >
          ✦
        </span>
        <span 
          className="absolute bottom-1 left-1 text-[9px] sm:text-[11px] leading-none pointer-events-none"
          style={{ color: book.accentColor }}
        >
          ✦
        </span>
        <span 
          className="absolute bottom-1 right-1 text-[9px] sm:text-[11px] leading-none pointer-events-none"
          style={{ color: book.accentColor }}
        >
          ✦
        </span>
      </div>

      {/* 4. Subtle Background Cultural Motif / Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] overflow-hidden">
        <svg 
          viewBox="0 0 200 200" 
          className="w-[140%] h-[140%] text-white animate-spin-slow"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2"
        >
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="50" strokeDasharray="6 3" />
          <circle cx="100" cy="100" r="30" />
          <path d="M100 10 L100 190 M10 100 L190 100" />
          <path d="M36 36 L164 164 M36 164 L164 36" />
        </svg>
      </div>

      {/* 5. Gilded Light Shimmer Angle */}
      <div className="absolute inset-0 gold-shimmer pointer-events-none opacity-40 z-10" />

      {/* 6. Content Container */}
      <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between items-center text-center">
        
        {/* Top Header: Category Tag & Era */}
        <div className="pt-2 w-full flex flex-col items-center">
          <div 
            className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full backdrop-blur-sm border max-w-[85%] truncate"
            style={{ 
              color: book.accentColor, 
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderColor: `${book.accentColor}33` 
            }}
          >
            {book.category.split('(')[0].trim()}
          </div>
        </div>

        {/* Center: Medallion Seal & Sacred Titles */}
        <div className="my-auto w-full flex flex-col items-center px-2 py-2">
          {/* Emblem Medallion */}
          <div 
            className={`rounded-full flex items-center justify-center shadow-2xl relative mb-3 sm:mb-4 border backdrop-blur-sm ${
              isLarge ? 'w-20 h-20 text-4xl' : 'w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl'
            }`}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              borderColor: `${book.accentColor}77`,
              boxShadow: `0 0 25px ${book.accentColor}33`,
            }}
          >
            <span className="transform hover:scale-110 transition-transform">
              {book.symbol}
            </span>

            {/* Glowing ring accent */}
            <div 
              className="absolute inset-0 rounded-full border border-dashed animate-pulse opacity-40 pointer-events-none"
              style={{ borderColor: book.accentColor }}
            />
          </div>

          {/* Sinhala Classical Title */}
          <h3 
            className={`font-sinhala font-extrabold tracking-wide drop-shadow-md text-amber-100 ${
              isLarge 
                ? 'text-2xl sm:text-3xl mb-2' 
                : 'text-lg sm:text-xl line-clamp-2 mb-1.5'
            }`}
            style={{ 
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              color: '#fffef0' 
            }}
          >
            {book.sinhalaTitle}
          </h3>

          {/* Ornamental Divider */}
          <div className="flex items-center gap-2 my-1 opacity-70">
            <span className="w-4 h-[1px] bg-gradient-to-r from-transparent to-amber-300" />
            <span className="text-[9px]" style={{ color: book.accentColor }}>❖</span>
            <span className="w-4 h-[1px] bg-gradient-to-l from-transparent to-amber-300" />
          </div>

          {/* English Classical Title */}
          <h4 
            className={`font-serif font-bold text-white drop-shadow leading-snug px-1 ${
              isLarge 
                ? 'text-lg sm:text-xl mt-1' 
                : 'text-xs sm:text-sm line-clamp-2 mt-0.5'
            }`}
          >
            {book.title}
          </h4>

          {/* Author */}
          <p 
            className={`font-medium tracking-wide mt-1 text-white/75 italic ${
              isLarge ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px] line-clamp-1'
            }`}
          >
            {book.author}
          </p>
        </div>

        {/* Bottom Footer: Binding Badge */}
        <div className="pb-2 w-full flex flex-col items-center">
          <div 
            className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border flex items-center gap-1.5"
            style={{ 
              color: book.accentColor,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderColor: `${book.accentColor}44`
            }}
          >
            <span className="text-[7px]">★</span>
            <span className="truncate max-w-[140px]">{book.binding}</span>
            <span className="text-[7px]">★</span>
          </div>
        </div>

      </div>
    </div>
  );
}
