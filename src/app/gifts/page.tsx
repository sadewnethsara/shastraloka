'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import ProgressiveBookGrid from '../../components/ProgressiveBookGrid';
import OptimizedImage from '../../components/ui/OptimizedImage';
import ViewportSection from '../../components/ui/ViewportSection';
import { BOOKS } from '../../data/books';

interface GiftBubble {
  id: string;
  label: string;
  filterKey: string;
  image: string;
}

const GIFT_GUIDE_BUBBLES: GiftBubble[] = [
  {
    id: 'gb-1',
    label: 'Top 100 Literary Gifts',
    filterKey: 'all',
    image: BOOKS[0]?.coverImage,
  },
  {
    id: 'gb-2',
    label: 'Poya & Vesak Gifts',
    filterKey: 'buddhist',
    image: BOOKS[1]?.coverImage,
  },
  {
    id: 'gb-3',
    label: 'Gifts for Scholars',
    filterKey: 'chronicles',
    image: BOOKS[2]?.coverImage,
  },
  {
    id: 'gb-4',
    label: 'Birthday Book Boxes',
    filterKey: 'silkbound',
    image: BOOKS[3]?.coverImage,
  },
  {
    id: 'gb-5',
    label: 'Most Whimsical Finds',
    filterKey: 'poetry',
    image: BOOKS[4]?.coverImage,
  },
  {
    id: 'gb-6',
    label: 'Personalized Editions',
    filterKey: 'gold',
    image: BOOKS[5]?.coverImage,
  },
  {
    id: 'gb-7',
    label: 'Gifts for Her',
    filterKey: 'poetry',
    image: BOOKS[6]?.coverImage || BOOKS[0]?.coverImage,
  },
  {
    id: 'gb-8',
    label: 'Gifts for Him',
    filterKey: 'chronicles',
    image: BOOKS[7]?.coverImage || BOOKS[1]?.coverImage,
  },
  {
    id: 'gb-9',
    label: 'Gifts for Young Readers',
    filterKey: 'all',
    image: BOOKS[8]?.coverImage || BOOKS[2]?.coverImage,
  },
  {
    id: 'gb-10',
    label: 'Gifts for Monasteries',
    filterKey: 'ola-leaf',
    image: BOOKS[9]?.coverImage || BOOKS[3]?.coverImage,
  },
  {
    id: 'gb-11',
    label: 'Housewarming Chronicles',
    filterKey: 'silkbound',
    image: BOOKS[10]?.coverImage || BOOKS[4]?.coverImage,
  },
  {
    id: 'gb-12',
    label: 'Anniversary Silkbounds',
    filterKey: 'gold',
    image: BOOKS[11]?.coverImage || BOOKS[5]?.coverImage,
  },
  {
    id: 'gb-13',
    label: 'Graduation Treatises',
    filterKey: 'chronicles',
    image: BOOKS[0]?.coverImage,
  },
  {
    id: 'gb-14',
    label: 'Gifts for Teachers',
    filterKey: 'buddhist',
    image: BOOKS[2]?.coverImage,
  },
  {
    id: 'gb-15',
    label: 'Gifts for Grandparents',
    filterKey: 'ola-leaf',
    image: BOOKS[4]?.coverImage,
  },
];

export default function GiftsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredBooks = useMemo(() => {
    if (selectedFilter === 'silkbound') {
      return BOOKS.filter((b) => b.binding === 'Royal Silkbound Edition');
    }
    if (selectedFilter === 'gold') {
      return BOOKS.filter((b) => b.binding === 'Deluxe Gold Embossed');
    }
    if (selectedFilter === 'ola-leaf') {
      return BOOKS.filter((b) => b.binding === 'Ola Leaf Collector Box');
    }
    if (selectedFilter === 'buddhist') {
      return BOOKS.filter((b) => b.category.toLowerCase().includes('buddhist'));
    }
    if (selectedFilter === 'chronicles') {
      return BOOKS.filter((b) => b.category.toLowerCase().includes('chronicles'));
    }
    if (selectedFilter === 'poetry') {
      return BOOKS.filter((b) => b.category.toLowerCase().includes('poetry'));
    }
    return BOOKS;
  }, [selectedFilter]);

  const bestsellingGiftBooks = useMemo(
    () => [...BOOKS].sort((a, b) => b.reviewsCount - a.reviewsCount),
    []
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      {/* Top Hero & Circular Gift Guide Bubbles (Matching Image 7) */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[var(--text-main)] tracking-tight"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Shastraloka&apos;s Best Gift Guides
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[var(--text-body)] mt-2 max-w-xl mx-auto">
            Find meaningful literary gifts straight from extraordinary Sri Lankan scriptoriums and presses, for the readers who matter most.
          </p>

          {/* Row 1 & 2: 6 cols on desktop, Row 3: 3 centered bubbles */}
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4 justify-items-center">
            {GIFT_GUIDE_BUBBLES.slice(0, 12).map((bubble, idx) => {
              const active = selectedFilter === bubble.filterKey;
              return (
                <button
                  key={bubble.id}
                  type="button"
                  onClick={() => setSelectedFilter(bubble.filterKey)}
                  className="group flex flex-col items-center text-center cursor-pointer max-w-[140px]"
                >
                  <div
                    className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[var(--bg-wash)] border-2 transition-transform duration-300 group-hover:scale-105 shadow-xs mb-2.5 ${
                      active
                        ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30'
                        : 'border-[var(--border-subtle)]'
                    }`}
                  >
                    <OptimizedImage
                      src={bubble.image}
                      alt={bubble.label}
                      priority={idx < 6}
                      targetWidth={220}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)] leading-snug inline-flex items-center gap-1">
                    <span>{bubble.label}</span>
                    <span>&rarr;</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {GIFT_GUIDE_BUBBLES.slice(12, 15).map((bubble) => (
              <button
                key={bubble.id}
                type="button"
                onClick={() => setSelectedFilter(bubble.filterKey)}
                className="group flex flex-col items-center text-center cursor-pointer max-w-[140px]"
              >
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[var(--bg-wash)] border-2 border-[var(--border-subtle)] transition-transform duration-300 group-hover:scale-105 shadow-xs mb-2.5">
                  <OptimizedImage
                    src={bubble.image}
                    alt={bubble.label}
                    targetWidth={220}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)] leading-snug inline-flex items-center gap-1">
                  <span>{bubble.label}</span>
                  <span>&rarr;</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* SECTION 1: PRESENTS YOU CAN PERSONALIZE */}
        <section className="space-y-6">
          <h2
            className="text-2xl sm:text-3xl text-center text-[var(--text-main)]"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Editions you can personalize
          </h2>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'All Gift Editions' },
                { id: 'silkbound', label: 'Royal Silkbound' },
                { id: 'gold', label: 'Gold Embossed' },
                { id: 'ola-leaf', label: 'Ola Leaf Box' },
              ].map((pill) => {
                const active = selectedFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setSelectedFilter(pill.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] border-transparent'
                        : 'bg-[var(--bg-card)] text-[var(--text-main)] border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    {pill.id === 'all' && <SlidersHorizontal className="w-3.5 h-3.5" />}
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <ProgressiveBookGrid
            books={filteredBooks}
            gridClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8"
            getBadgeText={() => "Shastraloka's Pick"}
          />
        </section>

        {/* SECTION 2: BEST-SELLING GIFTS THEY'LL LOVE */}
        <ViewportSection minHeight={360} skeletonTitle="Best-selling gifts they'll love">
          <section className="space-y-6">
            <h2
              className="text-2xl sm:text-3xl text-center text-[var(--text-main)] font-heading font-bold"
            >
              Best-selling gifts they&apos;ll love
            </h2>

            <ProgressiveBookGrid
              books={bestsellingGiftBooks}
              gridClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8"
              getBadgeText={() => "Shastraloka's Pick"}
            />
          </section>
        </ViewportSection>

        {/* SECTION 3: 4 EDITORIAL GIFT GUIDE CARDS */}
        <ViewportSection minHeight={260} skeletonTitle="Editorial Gift Guides">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                title: 'Personalized Calligraphic Dedications',
                image: BOOKS[0]?.coverImage,
                href: '/bestsellers',
              },
              {
                title: 'The Royal Silk & Brass Wrap Guide',
                image: BOOKS[2]?.coverImage,
                href: '/archives',
              },
              {
                title: 'Gifts for Her',
                image: BOOKS[3]?.coverImage,
                href: '/new-releases',
              },
              {
                title: 'Gifts for Him',
                image: BOOKS[1]?.coverImage,
                href: '/books',
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs hover:shadow-md transition flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-wash)]">
                  <OptimizedImage
                    src={card.image}
                    alt={card.title}
                    targetWidth={360}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)]">
                    {card.title}
                  </h3>
                </div>
              </Link>
            ))}
          </section>
        </ViewportSection>

        {/* SECTION 4: SHOP SHSTRALOKA GIFT CARDS BANNER (Links to /gift-cards) */}
        <section className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 p-6 sm:p-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Shop Shastraloka gift cards
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Get them a one-of-a-kind Sri Lankan treatise or literary edition in minutes, no guesswork needed.
            </p>
            <div className="pt-2">
              <Link
                href="/gift-cards"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--text-main)] hover:text-[var(--color-primary)]"
              >
                <span>Pick a design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 h-48 sm:h-56 bg-[var(--hero-showcase-bg)] p-6 flex items-center justify-center gap-4 overflow-hidden">
            <Link
              href="/gift-cards"
              className="w-48 h-32 rounded-[var(--radius-card)] bg-[var(--color-primary)] text-white shadow-xl -rotate-6 flex flex-col items-center justify-center border border-white/25 hover:scale-105 transition"
            >
              <span className="font-heading font-bold text-2xl">Shastraloka</span>
              <span className="text-[11px] opacity-90">Literary Voucher • LKR</span>
            </Link>
            <Link
              href="/gift-cards"
              className="w-48 h-32 rounded-[var(--radius-card)] bg-[var(--bg-elevated)] text-[var(--text-main)] shadow-xl rotate-6 flex flex-col items-center justify-center border border-[var(--border-strong)] hover:scale-105 transition"
            >
              <span className="font-heading font-bold text-2xl">Shastraloka</span>
              <span className="text-[11px] text-[var(--text-muted)]">Collector Gift Card</span>
            </Link>
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
