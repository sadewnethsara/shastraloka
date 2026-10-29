'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BOOKS } from '../../data/books';
import CleanBookCard from '../../components/CleanBookCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Check, ChevronDown } from 'lucide-react';

const ARCHIVE_SUBCATEGORIES = [
  {
    id: 'all',
    label: '19th Century Ceylon Prints',
    sinhala: '19 වන සියවසේ මුද්‍රණ',
    image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
    categoryFilter: 'Ancient Chronicles (Itihasa)',
  },
  {
    id: 'new',
    label: 'Archival New Arrivals',
    sinhala: 'නව පුරාවිද්‍යා එකතු',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Palm-Leaf Manuscripts (Ola)',
  },
  {
    id: 'royal',
    label: 'Royal Court Chronicles',
    sinhala: 'රාජකීය වංශකථා',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Ancient Chronicles (Itihasa)',
  },
  {
    id: 'ayurveda',
    label: 'Ayurvedic Herbals',
    sinhala: 'හෙළ වෙද පුස්කොළ',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Indigenous Medicine (Hela Wedakama)',
  },
  {
    id: 'era',
    label: 'Palm-Leaf Folios by Era',
    sinhala: 'යුග අනුව පුස්කොළ පොත්',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Classical Poetry (Sandesha Kavya)',
  },
];

const RELATED_ARCHIVAL_SEARCHES = [
  { label: 'anuradhapura inscriptions', image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp' },
  { label: 'polonnaruwa stone edicts', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80' },
  { label: 'kandyan period ola folios', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80' },
  { label: 'sandesha kavya first print', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&q=80' },
  { label: 'pali tripitaka commentary', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80' },
  { label: 'sri lanka temple murals book', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80' },
  { label: 'ancient ceylon maps & atlas', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=300&q=80' },
  { label: 'royal physician sarartha', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80' },
];

export default function ArchivesPage() {
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [picksOnly, setPicksOnly] = useState(false);
  const [under2500, setUnder2500] = useState(false);
  const [sortBy, setSortBy] = useState<'relevancy' | 'price-asc' | 'price-desc' | 'rating'>('relevancy');
  const [visibleCount, setVisibleCount] = useState(12);

  // Repeat/combine BOOKS so the archival catalog looks rich like the reference screenshot
  const archivalCatalog = useMemo(() => {
    const base = [...BOOKS];
    let list = base.filter((book) => {
      if (selectedSubcat !== 'all') {
        const sub = ARCHIVE_SUBCATEGORIES.find((s) => s.id === selectedSubcat);
        if (sub && book.category !== sub.categoryFilter) return false;
      }
      if (onSaleOnly && (!book.originalPrice || book.originalPrice <= book.price)) return false;
      if (picksOnly && book.rating < 4.8) return false;
      if (under2500 && book.price > 2500) return false;
      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [selectedSubcat, onSaleOnly, picksOnly, under2500, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      <main className="flex-1 pb-20">
        {/* Centered Archival Header (Matches Etsy's Best Vintage Finds screenshot) */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[var(--text-main)] mb-2">
            Shastraloka&apos;s Best Archival &amp; Vintage Finds
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto mb-8">
            Our most-loved rare palm-leaf facsimiles, monastic treatises, and early Ceylon press editions
          </p>

          {/* 5 Rounded Square Visual Sub-Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
            {ARCHIVE_SUBCATEGORIES.map((sub) => {
              const active = selectedSubcat === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcat(active ? 'all' : sub.id)}
                  className="group flex flex-col items-center text-center focus:outline-none"
                >
                  <div
                    className={`w-full aspect-square rounded-2xl overflow-hidden mb-2.5 border-2 transition-all bg-[var(--bg-wash)] ${
                      active
                        ? 'border-[var(--text-main)] shadow-md scale-[1.02]'
                        : 'border-transparent group-hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <img
                      src={sub.image}
                      alt={sub.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                      active ? 'text-[#F1641E] underline underline-offset-4' : 'text-[var(--text-main)] group-hover:text-[#F1641E]'
                    }`}
                  >
                    {sub.label}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-sinhala mt-0.5">{sub.sinhala}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Filter Bar & Sort Row */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-[var(--border-subtle)]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setSelectedSubcat('all');
                  setOnSaleOnly(false);
                  setPicksOnly(false);
                  setUnder2500(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-medium text-[var(--text-main)] transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                All Filters
              </button>

              <button
                onClick={() => setUnder2500(!under2500)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-colors ${
                  under2500
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] border-[var(--pill-active-bg)]'
                    : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {under2500 && <Check className="w-3.5 h-3.5" />}
                Under LKR 2,500
              </button>

              <button
                onClick={() => setOnSaleOnly(!onSaleOnly)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-colors ${
                  onSaleOnly
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] border-[var(--pill-active-bg)]'
                    : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {onSaleOnly && <Check className="w-3.5 h-3.5" />}
                On sale
              </button>

              <button
                onClick={() => setPicksOnly(!picksOnly)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-colors ${
                  picksOnly
                    ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] border-[var(--pill-active-bg)]'
                    : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F1641E]" />
                Shastraloka&apos;s Picks
              </button>

              <span className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-wash)] text-xs font-medium text-[var(--text-muted)]">
                Dispatches from Sri Lanka
              </span>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                {archivalCatalog.length} archival editions
              </span>
              <div className="relative inline-flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort archival books"
                  className="pl-9 pr-8 py-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs sm:text-sm font-medium text-[var(--text-main)] appearance-none cursor-pointer focus:outline-none"
                >
                  <option value="relevancy">Sort by: Relevancy</option>
                  <option value="rating">Sort by: Top Scholar Rating</option>
                  <option value="price-asc">Sort by: Lowest Price (LKR)</option>
                  <option value="price-desc">Sort by: Highest Price (LKR)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Main Clean 4-Column Catalog Grid */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 mb-14">
          {archivalCatalog.length === 0 ? (
            <div className="text-center py-16 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)]">
              <p className="font-serif text-xl text-[var(--text-main)] mb-2">No archival volumes match your active filters</p>
              <p className="text-sm text-[var(--text-muted)] mb-6">Try resetting your price or category filter to view all rare editions.</p>
              <button
                onClick={() => {
                  setSelectedSubcat('all');
                  setOnSaleOnly(false);
                  setPicksOnly(false);
                  setUnder2500(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-9">
                {archivalCatalog.slice(0, visibleCount).map((book, idx) => (
                  <CleanBookCard
                    key={`${book.id}-${idx}`}
                    book={book}
                    badgeText={idx % 3 === 0 ? "Shastraloka's Pick" : idx % 4 === 0 ? 'Rare Facsimile' : undefined}
                  />
                ))}
              </div>

              {visibleCount < archivalCatalog.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="px-7 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-sm font-semibold text-[var(--text-main)] transition-colors"
                  >
                    Show more archival editions
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Explore related searches (2x4 visual pill cards matching Etsy Vintage screenshot) */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-8 border-t border-[var(--border-subtle)]">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--text-main)] mb-5">
            Explore related searches
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {RELATED_ARCHIVAL_SEARCHES.map((item) => (
              <Link
                key={item.label}
                href={`/search?q=${encodeURIComponent(item.label)}`}
                className="flex items-center gap-3.5 p-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:shadow-sm transition-all group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[var(--bg-wash)]">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[#F1641E] transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
