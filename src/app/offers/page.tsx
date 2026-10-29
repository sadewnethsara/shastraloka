'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TicketPercent, Check, Copy } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS } from '../../data/books';
import { useApp } from '../../context/AppContext';

const PUBLISHER_COUPONS = [
  {
    code: 'SHASTRA30',
    discount: '30% OFF',
    title: 'Royal Court Chronicles & Kavya Festival Offer',
    minSpend: 'Valid on orders over LKR 1,800',
  },
  {
    code: 'PALMLEAF500',
    discount: 'LKR 500 OFF',
    title: 'Ola Leaf Collector Box & Silkbound Voucher',
    minSpend: 'Valid on collector bindings',
  },
  {
    code: 'FREEDELIVERYLK',
    discount: 'FREE COURIER',
    title: 'Islandwide Moisture-Sealed Delivery across all 25 Districts',
    minSpend: 'No minimum order required today',
  },
];

export default function SpecialOffersPage() {
  const { showToast } = useApp();
  const [showActiveCoupons, setShowActiveCoupons] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const popularGiftBooks = BOOKS.slice(0, 5);

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    showToast(`Copied voucher code ${code}! Apply at checkout.`);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      {/* Warm Peach/Parchment Hero Banner (Matching Image 3) */}
      <section className="bg-[var(--hero-banner-bg)] border-b border-[var(--hero-banner-border)] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          <div className="md:col-span-7 space-y-3">
            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-[var(--text-main)]"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Special offers created just for you
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed max-w-lg">
              Shastraloka publishers and monastic presses crafted these offers for readers like you. Whether you&apos;re a new reader or a longtime collector, they&apos;re grateful for your support! Terms may apply.{' '}
              <Link href="/terms" className="underline font-semibold hover:text-[var(--color-primary)]">
                Get more details.
              </Link>
            </p>
          </div>

          {/* Celebratory Illustration */}
          <div className="md:col-span-5 flex justify-center">
            <svg
              viewBox="0 0 260 180"
              className="w-56 sm:w-64 h-auto select-none"
              aria-hidden="true"
            >
              <circle cx="130" cy="90" r="72" fill="#F1641E" opacity="0.12" />
              {/* Left figure */}
              <path d="M95 52 L126 32 L118 46 Z" fill="#3B82F6" />
              <circle cx="88" cy="78" r="12" fill="#7C2D12" />
              <path d="M68 148 L78 96 L104 96 L112 148 Z" fill="#4338CA" />
              <path d="M98 98 L126 62" stroke="#4338CA" strokeWidth="9" strokeLinecap="round" />
              {/* Right figure */}
              <path d="M165 52 L134 32 L142 46 Z" fill="#F1641E" />
              <circle cx="172" cy="78" r="12" fill="#7C2D12" />
              <path d="M152 148 L160 96 L186 96 L194 148 Z" fill="#F1641E" />
              <path d="M162 98 L134 62" stroke="#F1641E" strokeWidth="9" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Center Ticket / Offers State (Matching Image 3) */}
        <section className="max-w-xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mx-auto flex items-center justify-center">
            <TicketPercent className="w-9 h-9 text-[var(--text-main)] -rotate-12" />
          </div>

          {!showActiveCoupons ? (
            <>
              <h2
                className="text-2xl sm:text-3xl text-[var(--text-main)]"
                style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
              >
                Looks like you don&apos;t have any active personal offers
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                Sometimes Sri Lankan publishers and scriptoriums send a discount directly to new or returning readers. When they do, you&apos;ll find the offer here!
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/books"
                  className="px-6 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-bold hover:opacity-90 transition"
                >
                  Start shopping
                </Link>
                <button
                  type="button"
                  onClick={() => setShowActiveCoupons(true)}
                  className="px-5 py-2.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] text-xs sm:text-sm font-semibold hover:bg-[var(--bg-hover)] transition cursor-pointer"
                >
                  Reveal Storewide Festival Vouchers (3)
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 text-left pt-2">
              <div className="text-center mb-4">
                <h2
                  className="text-2xl sm:text-3xl text-[var(--text-main)]"
                  style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  Active Storewide Literary Vouchers
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Click any voucher code below to copy and apply in your Shopping Bag
                </p>
              </div>
              {PUBLISHER_COUPONS.map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F1641E]/15 text-[#F1641E] text-[11px] font-extrabold mb-1">
                      {c.discount}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-main)]">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">{c.minSpend}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(c.code)}
                    className="px-4 py-2 rounded-xl bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {copiedCode === c.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{c.code}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Popular Gifts Right Now (Matching Bottom of Image 3) */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
              Popular gifts right now
            </h2>
            <Link
              href="/gifts"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
            >
              Explore Gift Guides &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 sm:gap-x-5 gap-y-7">
            {popularGiftBooks.map((book) => (
              <CleanBookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
