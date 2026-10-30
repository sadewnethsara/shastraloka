'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Handbag,
  Check,
  Star,
  Sparkles,
  Headphones,
  BookOpen,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import { BOOKS, Book, CATEGORIES } from '../../data/books';
import { useApp } from '../../context/AppContext';

const FALLBACK_BOOK_COVER =
  'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

type FormatFilter = 'all' | 'scriptorium-plus' | 'digital' | 'hardcover' | 'audio';

function StorefrontShelfCard({
  book,
  showDealTimer,
  showFirstReads,
}: {
  book: Book;
  showDealTimer?: boolean;
  showFirstReads?: boolean;
}) {
  const router = useRouter();
  const { addToBag } = useApp();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToBag(book, book.binding, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      onClick={() => router.push(`/books/${book.id}`)}
      className="group cursor-pointer flex flex-col w-[148px] sm:w-[168px] lg:w-auto shrink-0"
    >
      <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)] mb-2">
        <img
          src={book.coverImage || FALLBACK_BOOK_COVER}
          alt={book.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FALLBACK_BOOK_COVER) {
              target.src = FALLBACK_BOOK_COVER;
            }
          }}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Desktop Hover Add to Bag */}
        <div className="hidden md:flex absolute inset-x-2 bottom-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 z-10">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full h-8 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1 shadow-md transition cursor-pointer ${
              added
                ? 'bg-[var(--color-emerald)] text-white'
                : 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Handbag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rating Row */}
      <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
        <span className="font-semibold text-[var(--text-main)]">{book.rating.toFixed(1)}</span>
        <div className="flex items-center text-[#F1641E]">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-2.5 h-2.5 fill-current" />
          ))}
        </div>
        <span className="text-[10px] text-[var(--color-primary)]">
          {book.reviewsCount.toLocaleString()}
        </span>
      </div>

      {/* Special Tag (Scriptorium+ / First Reads / Deal Timer) */}
      {showDealTimer ? (
        <span className="mt-1 inline-block w-fit px-1.5 py-0.5 rounded-xs bg-[#CC0C39] text-white text-[10px] font-bold">
          Ends in 04:21:44
        </span>
      ) : showFirstReads ? (
        <span className="mt-0.5 text-[11px] font-bold text-[var(--text-main)]">
          first <span className="text-[#F1641E]">reads</span>
        </span>
      ) : (
        <span className="mt-0.5 text-[11px] font-semibold text-[#F1641E] flex items-center gap-1">
          <span>scriptorium+</span>
          <Headphones className="w-3 h-3 text-[var(--text-muted)]" />
        </span>
      )}

      {/* Binding Format */}
      <span className="text-[11px] text-[var(--text-muted)] truncate">
        {book.binding}
      </span>

      {/* Title (1 line) */}
      <h3 className="text-xs font-semibold text-[var(--text-main)] truncate mt-0.5 group-hover:text-[var(--color-primary)]">
        {book.title}
      </h3>

      {/* Price */}
      <div className="mt-0.5 flex items-baseline gap-1.5 tabular-nums">
        <span className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
          LKR {book.price.toLocaleString()}
        </span>
        {book.originalPrice > book.price && (
          <span className="text-[10px] text-[var(--text-muted)] line-through">
            LKR {book.originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Mobile Always-Visible Add to Bag */}
      <button
        type="button"
        onClick={handleAdd}
        className={`md:hidden mt-2 w-full h-7 rounded-md text-[11px] font-semibold flex items-center justify-center gap-1 border transition cursor-pointer ${
          added
            ? 'bg-[var(--color-emerald)] text-white border-transparent'
            : 'bg-[var(--bg-card)] text-[var(--text-main)] border-[var(--border-strong)]'
        }`}
      >
        {added ? (
          <>
            <Check className="w-3 h-3" />
            <span>Added</span>
          </>
        ) : (
          <>
            <Handbag className="w-3 h-3" />
            <span>Add to Bag</span>
          </>
        )}
      </button>
    </article>
  );
}

const POPULAR_AUTHORS = [
  { name: 'Mahinda Prasad Masimbula', style: 'font-heading font-bold font-extrabold tracking-tight uppercase' },
  { name: 'Martin Wickramasinghe', style: 'font-sans font-bold tracking-widest uppercase' },
  { name: 'Ven. Walpola Rahula', style: 'font-heading font-bold italic font-bold' },
  { name: 'Senarat Paranavitana', style: 'font-heading font-bold font-black tracking-wider uppercase' },
  { name: 'Ediriweera Sarachchandra', style: 'font-heading font-bold' },
  { name: 'K. Jayatillake', style: 'font-sans font-black tracking-tight uppercase' },
];

export default function BooksStorefrontPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('all');

  const filteredBooks = useMemo(() => {
    if (formatFilter === 'scriptorium-plus') {
      return BOOKS.filter((b) => b.featured || b.price <= 1200);
    }
    if (formatFilter === 'digital') {
      return BOOKS.filter((b) => b.language.includes('English') || b.isDigital);
    }
    if (formatFilter === 'hardcover') {
      return BOOKS.filter(
        (b) =>
          b.binding === 'Clothbound Hardcover' ||
          b.binding === 'Royal Silkbound Edition'
      );
    }
    if (formatFilter === 'audio') {
      return BOOKS.filter((b) => b.versesSnippet?.original);
    }
    return BOOKS;
  }, [formatFilter]);

  const shelfBooks = (offset: number) => {
    const pool = filteredBooks.length >= 7 ? filteredBooks : BOOKS;
    const rotated = [...pool.slice(offset % pool.length), ...pool.slice(0, offset % pool.length)];
    return rotated.slice(0, 7);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />

      {/* Bookstore Dedicated Sub-Navigation Bar (Matching Amazon Books Storefront) */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 h-12 overflow-x-auto no-scrollbar">
          <Link
            href="/books"
            className="text-2xl font-bold tracking-tight text-[var(--text-main)] shrink-0 pr-2 border-r border-[var(--border-subtle)]"
          >
            books
          </Link>
          <Link
            href="/books"
            className="text-xs font-semibold text-[var(--color-primary)] whitespace-nowrap"
          >
            Shop Books
          </Link>
          <Link
            href="/categories"
            className="text-xs font-medium text-[var(--text-body)] hover:text-[var(--text-main)] whitespace-nowrap"
          >
            Categories
          </Link>
          <Link
            href="/new-releases"
            className="text-xs font-medium text-[var(--text-body)] hover:text-[var(--text-main)] whitespace-nowrap"
          >
            New &amp; Trending
          </Link>
          <Link
            href="/offers"
            className="text-xs font-medium text-[var(--text-body)] hover:text-[var(--text-main)] whitespace-nowrap"
          >
            Deals
          </Link>
          <Link
            href="/bestsellers"
            className="text-xs font-medium text-[var(--text-body)] hover:text-[var(--text-main)] whitespace-nowrap"
          >
            Best Sellers &amp; More
          </Link>
          <Link
            href="/archives"
            className="text-xs font-medium text-[var(--text-body)] hover:text-[var(--text-main)] whitespace-nowrap"
          >
            Archival &amp; Vintage
          </Link>
          <Link
            href="/wishlist"
            className="text-xs font-medium text-[var(--text-body)] hover:text-[var(--text-main)] whitespace-nowrap"
          >
            Your Books
          </Link>
        </div>
      </div>

      {/* Filter By Format Bar */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-main)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-[var(--text-main)] shrink-0 mr-1">
            Filter by
          </span>
          {[
            { id: 'scriptorium-plus', label: 'scriptorium+', highlight: true },
            { id: 'digital', label: 'Digital Ola eBooks', highlight: false },
            { id: 'hardcover', label: 'Print Books', highlight: false },
            { id: 'audio', label: 'Chanting Audiobooks', highlight: false },
            { id: 'all', label: 'All Formats', highlight: false },
          ].map((pill) => {
            const active = formatFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setFormatFilter(pill.id as FormatFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition cursor-pointer ${
                  active
                    ? 'bg-[#FFF3EC] text-[#F1641E] border-[#F1641E]'
                    : pill.highlight
                      ? 'bg-[var(--bg-card)] text-[#F1641E] border-[#F1641E]/50 hover:border-[#F1641E]'
                      : 'bg-[var(--bg-card)] text-[var(--text-main)] border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        {/* 1. KEEP BROWSING */}
        <section className="space-y-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Keep browsing
            </h1>
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                Inspired by your browsing history
              </h2>
              <Link
                href="/bestsellers"
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
              >
                <span>See more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-4 overflow-x-auto lg:overflow-visible pb-2 no-scrollbar">
            {shelfBooks(0).map((book) => (
              <StorefrontShelfCard key={`keep-${book.id}`} book={book} />
            ))}
          </div>
        </section>

        {/* 2. SCRIPTORIUM+ SUBSCRIPTION BANNER (Matching Kindle+ Banner) */}
        <section className="rounded-2xl overflow-hidden bg-[var(--hero-banner-bg)] border border-[var(--hero-banner-border)] px-6 sm:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1 text-lg font-extrabold text-[#F1641E]">
              <Sparkles className="w-4 h-4" />
              <span>scriptorium+</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight">
              Shastraloka Unlimited is now Scriptorium+
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-body)]">
              One subscription. Hundreds of Sri Lankan chronicles, Sinhala novels &amp; Pali chants. Read, listen, discover.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  showToast('Welcome to Scriptorium+ 30-Day Free Trial!')
                }
                className="px-6 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-bold hover:opacity-90 transition cursor-pointer"
              >
                Get started
              </button>
            </div>
          </div>

          {/* Fanned 3 Book Covers */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 shrink-0">
            {BOOKS.slice(0, 3).map((b, i) => (
              <div
                key={b.id}
                onClick={() => router.push(`/books/${b.id}`)}
                className={`rounded-lg overflow-hidden shadow-lg border border-white/30 cursor-pointer transition-transform hover:-translate-y-1 ${
                  i === 1
                    ? 'w-28 sm:w-32 aspect-[2/3] z-10 -mx-2 scale-105'
                    : 'w-24 sm:w-28 aspect-[2/3] opacity-95'
                }`}
              >
                <img
                  src={b.coverImage}
                  alt={b.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. WHAT EVERYONE'S READING */}
        <section className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              What everyone&apos;s reading
            </h2>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                Buy 2 books, get 10% off
              </h3>
              <Link
                href="/offers"
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
              >
                <span>See more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-4 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-2 no-scrollbar">
            {shelfBooks(2).map((book) => (
              <StorefrontShelfCard key={`reading-${book.id}`} book={book} />
            ))}
          </div>
        </section>

        {/* 4. BEST SELLERS ON SHSTRALOKA */}
        <section className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
              Best sellers on Shastraloka
            </h2>
            <Link
              href="/bestsellers"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
            >
              <span>See more</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-4 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-2 no-scrollbar">
            {shelfBooks(4).map((book) => (
              <StorefrontShelfCard key={`bestseller-${book.id}`} book={book} />
            ))}
          </div>
        </section>

        {/* 5. NEW RELEASES IN PRINT */}
        <section className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
              New releases in print
            </h2>
            <Link
              href="/new-releases"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
            >
              <span>See more</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-4 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-2 no-scrollbar">
            {shelfBooks(6).map((book) => (
              <StorefrontShelfCard key={`print-${book.id}`} book={book} />
            ))}
          </div>
        </section>

        {/* 6. DAILY DEALS - TODAY ONLY */}
        <section className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
              Shastraloka Daily Deals - today only
            </h2>
            <Link
              href="/offers"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
            >
              <span>See all deals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-4 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-2 no-scrollbar">
            {shelfBooks(1).map((book) => (
              <StorefrontShelfCard
                key={`deal-${book.id}`}
                book={book}
                showDealTimer
              />
            ))}
          </div>
        </section>

        {/* 7. DISCOVER SOMETHING NEW — FIRST READS */}
        <section className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
              Discover something new
            </h2>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                First Reads: Get early access to editors&apos; picks
              </h3>
              <Link
                href="/new-releases"
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
              >
                <span>See more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex lg:grid lg:grid-cols-7 gap-4 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-2 no-scrollbar">
            {shelfBooks(3).map((book) => (
              <StorefrontShelfCard
                key={`first-${book.id}`}
                book={book}
                showFirstReads
              />
            ))}
          </div>
        </section>

        {/* 8. POPULAR AUTHORS & SERIES */}
        <section className="space-y-5 pt-4 border-t border-[var(--border-subtle)]">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
            Popular authors &amp; series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {POPULAR_AUTHORS.map((author) => (
              <Link
                key={author.name}
                href="/authors"
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-center transition flex items-center justify-center min-h-[76px]"
              >
                <span className={`text-xs sm:text-sm text-[var(--text-main)] leading-tight ${author.style}`}>
                  {author.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 9. EXPLORE TOP CATEGORIES */}
        <section className="space-y-4 pt-4 border-t border-[var(--border-subtle)] pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
            Explore top categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-12 max-w-3xl">
            {[
              { label: 'Ancient Chronicles (Itihasa)', href: '/categories' },
              { label: 'Children’s Jataka & Folk Wisdom', href: '/categories' },
              { label: 'Buddhist Philosophy & Abhidhamma', href: '/categories' },
              { label: 'Classical Sinhala Poetry (Kavya)', href: '/categories' },
              { label: 'Indigenous Ayurveda & Healing', href: '/categories' },
              { label: 'History & Archaeological Inscriptions', href: '/archives' },
              { label: 'Biographies & Royal Court Lore', href: '/bestsellers' },
              { label: 'Temple Architecture & Vastu', href: '/categories' },
              { label: 'Award-Winning Modern Sinhala Novels', href: '/new-releases' },
              { label: 'Collector Silkbound Gift Boxes', href: '/gifts' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="text-xs sm:text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}
