'use client';

import React from 'react';
import Link from 'next/link';
import { Handbag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MiniBagRail() {
  const { bag, bagCount, bagTotal, usdBagTotal, setShowMiniBagRail } = useApp();

  const totalInUSD = usdBagTotal ?? Number((bagTotal / 300).toFixed(2));

  return (
    <aside className="hidden lg:flex w-[188px] shrink-0 border-l border-[var(--border-subtle)] bg-[var(--bg-surface)] h-screen sticky top-0 z-40 flex-col">
      {/* Caret / Pointer Notch pointing at Header Bag Icon */}
      <div className="w-3.5 h-3.5 bg-[var(--bg-surface)] border-l border-b border-[var(--border-subtle)] rotate-45 absolute -left-[8px] top-6" />

      {/* Top Summary & View Bag CTA */}
      <div className="p-3.5 relative">
        <button
          type="button"
          onClick={() => setShowMiniBagRail(false)}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition cursor-pointer"
          aria-label="Close mini bag"
          title="Close mini bag"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-[13px] text-[var(--text-muted)]">Subtotal:</div>
        <div className="text-[15.5px] font-bold text-[var(--text-main)] mt-0.5">
          USD {totalInUSD.toFixed(2)}
        </div>
        <Link
          href="/bag"
          className="mt-2.5 w-full py-2.5 rounded-full bg-[var(--pill-active-bg)] hover:opacity-90 text-[var(--pill-active-text)] text-[13px] font-bold text-center block transition cursor-pointer shadow-sm active:scale-98"
        >
          View bag
        </Link>
        <div className="mt-4 border-b border-[var(--border-subtle)]" />
      </div>

      {/* Scrollable Item Stack */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-6 space-y-5">
        {bag.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <Handbag className="w-8 h-8 text-[var(--text-dim)] mx-auto" />
            <p className="text-sm font-semibold text-[var(--text-muted)]">
              Your bag is empty
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
              item.book.urgencyText || 'In 85 bags, 4 bought in the past 24 hours';

            return (
              <div key={`${item.book.id}-${idx}`}>
                <Link
                  href={`/books/${item.book.id}`}
                  className="block group"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-full aspect-square rounded-xl object-cover group-hover:scale-104 transition-transform duration-200"
                  />
                  <div className="mt-2 text-[15px] font-bold text-[var(--text-main)]">
                    USD {price.toFixed(2)}
                  </div>
                  {origPrice && (
                    <div className="text-[12px] text-[var(--text-dim)] line-through">
                      USD {origPrice.toFixed(2)}
                    </div>
                  )}
                  <p className="mt-1 text-[12.5px] font-semibold text-[#a61a2e] dark:text-[#FF6B4A] leading-snug">
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
