'use client';

import React from 'react';
import Link from 'next/link';
import { Handbag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MiniBagRail() {
  const {
    bag,
    bagCount,
    bagTotal,
    usdBagTotal,
    updateBagQuantity,
    removeFromBag,
    setShowMiniBagRail,
  } = useApp();

  const totalInUSD = usdBagTotal ?? Number((bagTotal / 300).toFixed(2));

  return (
    <>
      {/* =====================================================================
          DESKTOP MINI BAG RAIL (lg and up)
         ===================================================================== */}
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
            onClick={() => setShowMiniBagRail(false)}
            className="mt-2.5 w-full py-2.5 rounded-full bg-[var(--pill-active-bg)] hover:opacity-90 text-[var(--pill-active-text)] text-[13px] font-bold text-center block transition cursor-pointer shadow-xs active:scale-98"
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
                    onClick={() => setShowMiniBagRail(false)}
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

      {/* =====================================================================
          MOBILE MINI BAG BOTTOM SHEET (< lg)
         ===================================================================== */}
      <div
        className="fixed inset-0 z-50 lg:hidden flex items-end animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag Preview"
      >
        {/* Dimmed Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setShowMiniBagRail(false)}
        />

        {/* Slide-Up Bottom Sheet */}
        <div className="relative z-10 w-full max-h-[85dvh] bg-[var(--bg-card)] text-[var(--text-main)] rounded-t-[28px] border-t border-[var(--border-subtle)] shadow-[0_-16px_48px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden animate-slide-up">
          {/* Mobile Drag Handle */}
          <div className="pt-3 pb-1 flex justify-center bg-[var(--bg-surface)] shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-[var(--border-strong)] opacity-60" />
          </div>

          {/* Bottom Sheet Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary-subtle)] flex items-center justify-center text-[var(--color-primary)]">
                <Handbag className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold font-heading text-[var(--text-main)] leading-none">
                  Shopping Bag
                </h2>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {bagCount} {bagCount === 1 ? 'treatise' : 'treatises'} reserved
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMiniBagRail(false)}
              className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
              aria-label="Close bag preview"
              title="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[var(--border-subtle)]">
            {bag.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-wash)] flex items-center justify-center mx-auto text-[var(--text-dim)]">
                  <Handbag className="w-7 h-7" />
                </div>
                <p className="text-base font-bold font-heading text-[var(--text-main)]">
                  Your bag is empty
                </p>
                <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                  Discover our palm-leaf chronicles, Ayurvedic treatises, and classical literature.
                </p>
                <button
                  type="button"
                  onClick={() => setShowMiniBagRail(false)}
                  className="mt-2 px-5 py-2 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold transition cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              bag.map((item) => (
                <div
                  key={`${item.book.id}-${item.binding}`}
                  className="py-3.5 first:pt-1 last:pb-1 flex gap-3.5 items-center"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-14 h-18 rounded-xl object-cover shrink-0 border border-[var(--border-subtle)]"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/books/${item.book.id}`}
                      onClick={() => setShowMiniBagRail(false)}
                      className="text-sm font-bold text-[var(--text-main)] hover:text-[var(--color-primary)] transition-colors line-clamp-1"
                    >
                      {item.book.title}
                    </Link>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      {item.binding || 'Standard Binding'}
                    </div>
                    <div className="text-xs font-bold text-[var(--text-main)] mt-1">
                      Rs. {(item.book.price * item.quantity).toLocaleString()}
                      <span className="text-[10px] text-[var(--text-dim)] font-normal ml-1">
                        (USD {((item.book.usdPrice ?? item.book.price / 300) * item.quantity).toFixed(2)})
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-1 shrink-0 bg-[var(--bg-wash)] p-1 rounded-full border border-[var(--border-subtle)]">
                    {item.quantity === 1 ? (
                      <button
                        type="button"
                        onClick={() => removeFromBag(item.book.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-[var(--text-muted)] transition cursor-pointer"
                        aria-label="Remove item"
                        title="Remove"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => updateBagQuantity(item.book.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--bg-card)] text-[var(--text-main)] transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-xs font-bold min-w-4 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateBagQuantity(item.book.id, 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--bg-card)] text-[var(--text-main)] transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & CTAs */}
          {bag.length > 0 && (
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] font-medium">Subtotal:</span>
                <div className="text-right">
                  <span className="text-base font-bold text-[var(--text-main)] font-heading">
                    Rs. {bagTotal.toLocaleString()}
                  </span>
                  <span className="text-xs text-[var(--text-dim)] ml-1.5 font-medium">
                    (USD {totalInUSD.toFixed(2)})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/bag"
                  onClick={() => setShowMiniBagRail(false)}
                  className="py-2.5 rounded-full border border-[var(--border-strong)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] text-xs font-bold text-center transition active:scale-98"
                >
                  View Full Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setShowMiniBagRail(false)}
                  className="py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-95 text-xs font-bold text-center transition active:scale-98 shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
