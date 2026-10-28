'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Handbag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MiniBagRail() {
  const { bag, bagCount, bagTotal, usdBagTotal, setShowMiniBagRail } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRailScrolled, setIsRailScrolled] = useState(false);
  const [isActivelyScrolling, setIsActivelyScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect window scroll to hide the triangular notch on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
      setIsActivelyScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsActivelyScrolling(false);
      }, 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const totalInUSD = usdBagTotal ?? Number((bagTotal / 300).toFixed(2));
  const hideTriangle = isScrolled || isRailScrolled || isActivelyScrolling;

  return (
    <aside className="w-[140px] shrink-0 border-l border-stone-200 bg-white dark:bg-[#151518] dark:border-neutral-800 h-screen sticky top-0 z-40 flex flex-col transition-all duration-200">
      {/* Caret / Pointer Notch pointing at Header Bag Icon (hidden during and after scrolling) */}
      <div
        className={`w-3 h-3 bg-white dark:bg-[#151518] border-l border-b border-stone-200 dark:border-neutral-800 rotate-45 absolute -left-[7px] top-6 transition-all duration-300 ease-out ${
          hideTriangle ? 'opacity-0 -translate-x-1 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}
      />

      {/* Top Summary & View Bag CTA */}
      <div className="p-2.5 relative">
        <button
          type="button"
          onClick={() => setShowMiniBagRail(false)}
          className="absolute top-2 right-2 p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-neutral-800 transition cursor-pointer"
          aria-label="Close mini bag"
          title="Close mini bag"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="text-[11.5px] text-stone-500 dark:text-neutral-400 font-medium">Subtotal:</div>
        <div className="text-[14px] font-bold text-[#222222] dark:text-white mt-0.5">
          USD {totalInUSD.toFixed(2)}
        </div>
        <Link
          href="/bag"
          className="mt-2 w-full py-1.5 px-2 rounded-full bg-[#222222] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-[12px] font-bold text-center block transition cursor-pointer shadow-xs active:scale-98"
        >
          View bag
        </Link>
        <div className="mt-2.5 border-b border-stone-200 dark:border-neutral-800" />
      </div>

      {/* Scrollable Item Stack */}
      <div
        onScroll={(e) => setIsRailScrolled(e.currentTarget.scrollTop > 5)}
        className="flex-1 overflow-y-auto px-2.5 pb-5 space-y-4 [scrollbar-width:thin]"
      >
        {bag.length === 0 ? (
          <div className="py-6 text-center space-y-1.5">
            <Handbag className="w-6 h-6 text-stone-300 dark:text-neutral-600 mx-auto" />
            <p className="text-xs font-semibold text-stone-600 dark:text-neutral-400">
              Bag is empty
            </p>
          </div>
        ) : (
          bag.map((item, idx) => {
            const price =
              item.book.usdPrice ?? Number((item.book.price / 300).toFixed(2));
            const origPrice =
              item.book.originalUsdPrice ??
              (item.book.originalPrice
                ? Number((item.book.originalPrice / 300).toFixed(2))
                : undefined);
            const urgency =
              item.book.urgencyText || 'In 85 bags, 4 bought in past 24h';

            return (
              <div key={`${item.book.id}-${idx}`}>
                <Link
                  href={`/books/${item.book.id}`}
                  className="block group"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-full aspect-square rounded-lg object-cover group-hover:scale-103 transition-transform duration-200 border border-stone-100 dark:border-neutral-800"
                  />
                  <div className="mt-1.5 text-[13px] font-bold text-[#222222] dark:text-white leading-tight">
                    USD {price.toFixed(2)}
                  </div>
                  {origPrice && (
                    <div className="text-[11px] text-stone-400 dark:text-neutral-500 line-through">
                      USD {origPrice.toFixed(2)}
                    </div>
                  )}
                  <p className="mt-0.5 text-[11px] font-medium text-[#a61a2e] dark:text-[#FF6B4A] leading-tight line-clamp-2">
                    {urgency}
                  </p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
