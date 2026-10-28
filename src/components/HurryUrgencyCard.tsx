'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Handbag, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

function HurryUrgencyCardContent() {
  const pathname = usePathname();
  const { bag } = useApp();

  const [isClosing, setIsClosing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastBagCount, setLastBagCount] = useState(bag.length);

  // If a new item is added to the bag, un-dismiss so user sees updated card
  if (bag.length > lastBagCount) {
    setLastBagCount(bag.length);
    setIsDismissed(false);
    setIsClosing(false);
  } else if (bag.length < lastBagCount) {
    setLastBagCount(bag.length);
  }

  // Don't show on landing page ('/') or if dismissed or if bag is empty
  const isLandingPage = !pathname || pathname === '/';
  if (isLandingPage || isDismissed || bag.length === 0) {
    return null;
  }

  const latestItem = bag[bag.length - 1] || bag[0];
  const book = latestItem?.book;
  if (!book) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDismissed(true);
      setIsClosing(false);
    }, 350);
  };

  const urgency = book.urgencyText || '4 sold in the past 24 hours';

  return (
    <aside
      aria-label="Demand notification"
className={`hidden md:flex fixed top-24 right-4 sm:right-6 z-40 w-[356px] bg-[var(--bg-card)] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] border border-[var(--border-subtle)] p-4 items-center gap-3.5 transition-all duration-350 ease-in-out ${
        isClosing
          ? 'translate-x-[140%] opacity-0 pointer-events-none'
          : 'translate-x-0 opacity-100 animate-slide-up'
      }`}
    >
      {/* Thumbnail with Blue Bag Badge */}
      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 border border-[var(--border-subtle)] bg-[var(--bg-wash)]">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        {/* Blue corner badge with Handbag icon */}
        <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 rounded-tr-xl bg-[#1e3a8a] text-white flex items-center justify-center shadow-xs">
          <Handbag className="w-3 h-3" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="pr-6">
          <p className="text-[12.5px] font-bold text-[var(--text-main)] leading-snug">
            Hurry! Shop this one while it lasts!
          </p>
          <p className="text-[11.5px] font-bold text-[#a61a2e] dark:text-[#ff6b6b] mt-0.5 truncate">
            {urgency}
          </p>
        </div>
        <Link
          href="/checkout"
          className="mt-2.5 w-full py-1.5 px-3 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <span>Proceed to checkout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Close button with right-exit slide animation */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="absolute top-3 right-3 p-1 text-[var(--text-dim)] hover:text-[var(--text-main)] rounded-full hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
        title="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}

export default function HurryUrgencyCard() {
  return (
    <React.Suspense fallback={null}>
      <HurryUrgencyCardContent />
    </React.Suspense>
  );
}
