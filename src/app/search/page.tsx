'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  Star,
  Handbag,
  Heart,
  MoreHorizontal,
  Check,
  Sparkles,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  ArrowUpRight,
  BookOpen,
  Tag,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookModal from '../../components/BookModal';
import BoardsModal from '../../components/BoardsModal';
import Toast from '../../components/Toast';
import { BOOKS, CATEGORIES, Book } from '../../data/books';
import { useApp } from '../../context/AppContext';
import {
  searchAndRankBooks,
  RankedBook,
  SearchFilterOptions,
  getOfferPercentage,
} from '../../utils/searchEngine';

// ============================================================================
// PINTEREST VISUAL SEARCH GUIDE PILLS (Matching Screenshot 1)
// ============================================================================
const VISUAL_SEARCH_GUIDES = [
  {
    label: 'Gajaga Lore',
    query: 'gajaga',
    bg: '#8C583A',
    thumb: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Chronicles',
    query: 'Ancient Chronicles (Itihasa)',
    isCategory: true,
    bg: '#5B6349',
    thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Kavya Verse',
    query: 'Classical Sinhala Poetry (Kavya)',
    isCategory: true,
    bg: '#7A6855',
    thumb: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Ayurveda',
    query: 'Indigenous Ayurveda (Deshiya Wedakama)',
    isCategory: true,
    bg: '#3B5249',
    thumb: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Abhidhamma',
    query: 'Buddhist Philosophy (Abhidhamma)',
    isCategory: true,
    bg: '#4A5568',
    thumb: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Jataka Tales',
    query: 'Jataka Stories & Folk Wisdom',
    isCategory: true,
    bg: '#6E473B',
    thumb: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Temple Vastu',
    query: 'Temple Architecture & Vastu',
    isCategory: true,
    bg: '#7C5E3C',
    thumb: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Inscriptions',
    query: 'Ancient Inscriptions & Culture',
    isCategory: true,
    bg: '#4A4E54',
    thumb: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Mahavamsa',
    query: 'Mahavamsa',
    bg: '#6B4226',
    thumb: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=200&q=80',
  },
  {
    label: 'Sandesha',
    query: 'Sandesha',
    bg: '#2E5A44',
    thumb: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=200&q=80',
  },
];

// ============================================================================
// MOBILE UNDERLINE TABS (Matching Screenshot 2)
// ============================================================================
const MOBILE_SEARCH_TABS = [
  { label: 'All', query: '', category: 'All Treatises' },
  { label: 'Gajaga & Lore', query: 'gajaga', category: 'All Treatises' },
  { label: 'Chronicles', query: '', category: 'Ancient Chronicles (Itihasa)' },
  { label: 'Sinhala Kavya', query: '', category: 'Classical Sinhala Poetry (Kavya)' },
  { label: 'Ayurveda', query: '', category: 'Indigenous Ayurveda (Deshiya Wedakama)' },
  { label: 'Buddhist Texts', query: '', category: 'Buddhist Philosophy (Abhidhamma)' },
  { label: 'Jataka Stories', query: '', category: 'Jataka Stories & Folk Wisdom' },
  { label: 'Architecture', query: '', category: 'Temple Architecture & Vastu' },
];

// ============================================================================
// FEATURED BOARDS FOR PINTEREST MASONRY WIDGET (Matching Screenshot 1)
// ============================================================================
const FEATURED_BOARDS_WIDGET = [
  {
    id: 'royal-chronicles',
    title: 'Gajaga & Royal Court Chronicles',
    curator: 'Shastraloka Guild',
    pinsCount: 59,
    age: '1w',
    query: 'gajaga',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80',
    ],
  },
  {
    id: 'palm-leaf-archives',
    title: 'Ola Leaf & Classical Kavya',
    curator: 'Kandy Scriptorium',
    pinsCount: 84,
    age: '4d',
    query: 'Classical Sinhala Poetry (Kavya)',
    images: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
    ],
  },
];

// ============================================================================
// INDIVIDUAL PINTEREST + AMAZON BOOK PIN CARD
// ============================================================================
interface PinterestBookPinProps {
  item: RankedBook;
  index: number;
  activeQuery: string;
}

function PinterestBookPin({ item, index, activeQuery }: PinterestBookPinProps) {
  const router = useRouter();
  const { addToBag, saveToBoard, isBookSaved, boards, openBookModal } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [boardDropdownOpen, setBoardDropdownOpen] = useState(false);

  const { book, matchTier, matchLabel, discountPercent } = item;
  const saved = isBookSaved(book.id);
  const isFirstTopMatch = index === 0 && activeQuery.trim().length > 0;
  const isPrimaryMatch =
    matchTier === 'exact' || matchTier === 'name_contains' || matchTier === 'fuzzy_similar';

  // Varied aspect height for authentic Pinterest masonry feel
  const aspectPercent = Math.round((book.heightRatio || 1.42) * 92);

  return (
    <div
      data-testid={`pinterest-book-card-${book.id}`}
      className={`masonry-item break-inside-avoid mb-4 sm:mb-5 group relative select-none ${
        isFirstTopMatch
          ? 'ring-2 ring-[#F1641E] rounded-2xl p-1.5 bg-gradient-to-b from-[#F1641E]/8 to-transparent'
          : ''
      }`}
      onMouseLeave={() => {
        setMenuOpen(false);
        setBoardDropdownOpen(false);
      }}
    >
      {/* Top Match Callout Banner for Card #1 when user searches a specific or partial name */}
      {isFirstTopMatch && (
        <div className="flex items-center justify-between gap-1.5 px-2.5 py-1 mb-1.5 rounded-xl bg-[#F1641E] text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-xs">
          <span className="flex items-center gap-1 truncate">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>
              {matchTier === 'exact'
                ? `Top Book Match for "${activeQuery}"`
                : `Closest Similar Book for "${activeQuery}"`}
            </span>
          </span>
          <span className="shrink-0 underline">#{index + 1}</span>
        </div>
      )}

      {/* PINTEREST IMAGE CONTAINER */}
      <div
        onClick={() => router.push(`/books/${book.id}`)}
        style={{ paddingBottom: `${aspectPercent}%` }}
        className="relative w-full rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 cursor-pointer shadow-xs group-hover:shadow-md transition-all duration-200"
      >
        <img
          src={book.coverImage}
          alt={book.title}
          loading={index < 6 ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle bottom gradient for crisp LKR price tag legibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Top-Left Match / Similarity / Bestseller Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 max-w-[75%]">
          {activeQuery.trim() ? (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-sm backdrop-blur-md ${
                matchTier === 'exact'
                  ? 'bg-[#F1641E] text-white'
                  : isPrimaryMatch
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-black/65 text-white border border-white/15'
              }`}
            >
              {matchLabel}
            </span>
          ) : book.featured ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fdf6e8] text-[#a66523] border border-[#f5e8c8] shadow-sm">
              Bestseller
            </span>
          ) : null}
        </div>

        {/* Top-Right Save / Heart Button (Always accessible on mobile, full Save pill on desktop hover) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            saveToBoard(book.id);
          }}
          aria-label={saved ? 'Saved to board' : 'Save to board'}
          className={`absolute top-2.5 right-2.5 z-20 h-8 px-2.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer ${
            saved
              ? 'bg-neutral-900 text-white'
              : 'bg-[#e60023] hover:bg-[#ad081b] text-white sm:opacity-0 sm:group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
          <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
        </button>

        {/* Desktop Hover Board Selector (Top-Left overlay on hover) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="hidden sm:block absolute top-2.5 left-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button
            type="button"
            onClick={() => setBoardDropdownOpen(!boardDropdownOpen)}
            className="h-8 px-2.5 rounded-full bg-black/75 hover:bg-black/90 text-white text-[11px] font-semibold flex items-center gap-1 backdrop-blur-md border border-white/20 cursor-pointer"
          >
            <span className="truncate max-w-[90px]">{boards[0]?.name || 'Reading List'}</span>
          </button>
          {boardDropdownOpen && (
            <div className="absolute top-9 left-0 w-44 bg-white dark:bg-[#1e1e24] text-neutral-900 dark:text-neutral-100 rounded-xl p-1.5 shadow-2xl border border-neutral-200 dark:border-neutral-700 z-30">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1">
                Save to Board
              </p>
              {boards.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    saveToBoard(book.id, b.id);
                    setBoardDropdownOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{b.name}</span>
                  {b.bookIds.includes(book.id) && <Check className="w-3.5 h-3.5 text-[#e60023]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===================================================================
            SMALL LKR PRICE TAG + OFFER PERCENTAGE BADGE (Bottom-Left of Cover)
           =================================================================== */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-end justify-between gap-1.5 pointer-events-none">
          <div className="inline-flex flex-wrap items-center gap-1 px-2 py-1 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/15 shadow-sm">
            <span className="text-[11px] sm:text-xs font-extrabold tracking-tight text-white">
              LKR {book.price.toLocaleString()}
            </span>
            {discountPercent > 0 && (
              <span className="px-1.5 py-0.2 rounded-md bg-[#e60023] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Quick Add to Bag Floating Icon Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToBag(book);
            }}
            title="Add to Shopping Bag"
            aria-label={`Add ${book.title} to Bag`}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 hover:bg-[#F1641E] text-neutral-900 hover:text-white flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
          >
            <Handbag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================
          PINTEREST + AMAZON BOOKSTORE METADATA UNDERNEATH
         =================================================================== */}
      <div className="pt-2 px-1">
        {/* Title Row + Pinterest "..." Menu Button */}
        <div className="flex items-start justify-between gap-1.5">
          <Link
            href={`/books/${book.id}`}
            className="font-heading font-bold text-xs sm:text-[13px] text-[var(--text-main)] hover:text-[#F1641E] transition-colors line-clamp-2 leading-snug"
          >
            {book.title}
          </Link>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              aria-label="More book actions"
              className="p-1 rounded-full text-[var(--text-muted)] hover:bg-neutral-200/70 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 bottom-7 w-48 bg-white dark:bg-[#1e1e24] text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 py-1.5 z-30 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(`/books/${book.id}`);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 font-semibold cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F1641E]" />
                  <span>Open Product Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openBookModal(book);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Quick Look Inside</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    addToBag(book);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                >
                  <Handbag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Add to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    saveToBoard(book.id);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-[#e60023]" />
                  <span>{saved ? 'Remove from Board' : 'Save to Board'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sinhala Title & Author */}
        <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
          <span className="text-[#a66523] dark:text-amber-400 font-medium">
            {book.category}
          </span>{' '}
          • {book.author}
        </p>

        {/* Amazon-Inspired Rating + Binding Format + Small LKR Price & Offer Row */}
        <div className="flex flex-wrap items-center justify-between gap-1 mt-1.5">
          <div className="flex items-center gap-1 text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-bold text-[var(--text-main)]">{book.rating}</span>
            <span className="text-[10px] text-[var(--text-muted)]">
              ({book.reviewsCount.toLocaleString()})
            </span>
          </div>

          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[var(--text-muted)] truncate max-w-[125px]">
            {book.binding.replace(' Edition', '')}
          </span>
        </div>

        {/* Compact Amazon Bookstore Price & Offer Tag Row */}
        <div className="flex items-center justify-between gap-1.5 mt-1.5 pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/80">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xs font-extrabold text-[var(--text-main)]">
              LKR {book.price.toLocaleString()}
            </span>
            <span className="text-[10px] line-through text-[var(--text-dim)]">
              LKR {book.originalPrice.toLocaleString()}
            </span>
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-[#e60023] dark:text-rose-400">
                ({discountPercent}% off)
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToBag(book)}
            className="h-6 px-2.5 rounded-full text-[10px] font-bold bg-[var(--bg-input)] hover:bg-[#F1641E] hover:text-white text-[var(--text-main)] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Handbag className="w-3 h-3" />
            <span>+ Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN SEARCH CONTENT COMPONENT
// ============================================================================
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  // Filter States (Amazon Bookstore + Pinterest Filters)
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bindingFormat, setBindingFormat] = useState<string>('All');
  const [priceBracket, setPriceBracket] = useState<SearchFilterOptions['priceBracket']>('all');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SearchFilterOptions['sortBy']>('relevance');
  const [shopStripIndex, setShopStripIndex] = useState(0);

  // Determine effective query & category from URL params or global context
  const matchedCatFromUrl = CATEGORIES.find(
    (c) =>
      c !== 'All Books' &&
      (c.toLowerCase() === categoryParam.toLowerCase() ||
        c.toLowerCase() === queryParam.toLowerCase())
  );

  const effectiveCategory =
    matchedCatFromUrl ||
    (selectedCategory && selectedCategory !== 'All Books' && (selectedCategory as string) !== 'All Treatises' ? selectedCategory : 'All Books');

  const activeQuery =
    matchedCatFromUrl && queryParam.toLowerCase() === matchedCatFromUrl.toLowerCase()
      ? ''
      : queryParam || searchQuery;

  // Run Smart Search & Similarity Ranking Engine
  const searchResult = useMemo(() => {
    return searchAndRankBooks(
      {
        query: activeQuery,
        category: effectiveCategory,
        bindingFormat,
        priceBracket,
        minDiscount,
        minRating,
        sortBy,
      },
      BOOKS
    );
  }, [
    activeQuery,
    effectiveCategory,
    bindingFormat,
    priceBracket,
    minDiscount,
    minRating,
    sortBy,
  ]);

  const activeFilterCount =
    (bindingFormat !== 'All' ? 1 : 0) +
    (priceBracket !== 'all' ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (sortBy !== 'relevance' ? 1 : 0) +
    (effectiveCategory !== 'All Treatises' ? 1 : 0);

  const handleApplyQueryOrCategory = (newQuery: string, newCat = 'All Treatises') => {
    setSelectedCategory(newCat);
    setSearchQuery(newQuery);
    if (newCat !== 'All Treatises' && !newQuery) {
      router.push(`/search?category=${encodeURIComponent(newCat)}`);
    } else if (newQuery) {
      router.push(`/search?q=${encodeURIComponent(newQuery)}`);
    } else {
      router.push('/search');
    }
  };

  const handleResetAllFilters = () => {
    setBindingFormat('All');
    setPriceBracket('all');
    setMinDiscount(0);
    setMinRating(0);
    setSortBy('relevance');
    setSelectedCategory('All Treatises');
    setSearchQuery('');
    router.push('/search');
  };

  // Related search pills dynamically tailored to current query/category
  const relatedSearches = useMemo(() => {
    const qLower = activeQuery.toLowerCase();
    if (qLower.includes('gaj')) {
      return [
        {
          text: 'gajaga wannama verses',
          thumb: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=160&q=80',
        },
        {
          text: 'king gajabahu chronicle',
          thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=160&q=80',
        },
        {
          text: 'gajaga hasti shastraya',
          thumb: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=160&q=80',
        },
        {
          text: 'chaddanta jataka murals',
          thumb: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=160&q=80',
        },
      ];
    }
    return [
      {
        text: 'gajaga wannama',
        thumb: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=160&q=80',
      },
      {
        text: 'mahavamsa great chronicle',
        thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=160&q=80',
      },
      {
        text: 'sigiriya mirror wall poetry',
        thumb: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=160&q=80',
      },
      {
        text: 'king buddhadasa ayurveda',
        thumb: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=160&q=80',
      },
    ];
  }, [activeQuery]);

  const shopCarouselBooks = searchResult.allItems.slice(shopStripIndex, shopStripIndex + 3);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      {/* Global Header (Unchanged Design, with Autocomplete Dropdown) */}
      <Header />

      {/* =====================================================================
          1. MOBILE PINTEREST UNDERLINE TABS (< md, matching Screenshot 2)
         ===================================================================== */}
      <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-[var(--bg-main)] sticky top-0 z-20">
        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar px-4 pt-2.5">
          {MOBILE_SEARCH_TABS.map((tab) => {
            const isTabActive =
              (tab.query && activeQuery.toLowerCase() === tab.query.toLowerCase()) ||
              (tab.category !== 'All Treatises' && effectiveCategory === tab.category) ||
              (tab.label === 'All' && !activeQuery && effectiveCategory === 'All Treatises');

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => handleApplyQueryOrCategory(tab.query, tab.category)}
                className={`pb-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isTabActive
                    ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          2. PINTEREST SEARCH BODY CONTAINER
         ===================================================================== */}
      <main className="page-container flex-1 py-4 sm:py-5 space-y-4">
        {/* -------------------------------------------------------------------
            TOP FILTER BUTTON + COLORED THUMBNAIL GUIDE PILLS (Screenshot 1)
           ------------------------------------------------------------------- */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {/* Filter Toggle Button (Leftmost, matching Screenshot 1) */}
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-label="Toggle bookstore filters"
            className={`h-11 px-3.5 rounded-2xl flex items-center gap-2 font-bold text-xs shrink-0 border transition cursor-pointer ${
              filtersOpen || activeFilterCount > 0
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-800/90 text-[var(--text-main)] border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#F1641E] text-white text-[10px] font-extrabold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Horizontal Colored Thumbnail Search Guide Pills (Matching Screenshot 1) */}
          {VISUAL_SEARCH_GUIDES.map((guide) => {
            const isSelected =
              (guide.isCategory && effectiveCategory === guide.query) ||
              (!guide.isCategory && activeQuery.toLowerCase() === guide.query.toLowerCase());

            return (
              <button
                key={guide.label}
                type="button"
                onClick={() =>
                  guide.isCategory
                    ? handleApplyQueryOrCategory('', guide.query)
                    : handleApplyQueryOrCategory(guide.query, 'All Books')
                }
                style={{ backgroundColor: guide.bg }}
                className={`h-11 pl-1.5 pr-4 rounded-2xl flex items-center gap-2.5 text-white font-bold text-xs whitespace-nowrap shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs hover:brightness-110 ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#F1641E]' : ''
                }`}
              >
                <img
                  src={guide.thumb}
                  alt={guide.label}
                  className="w-8 h-8 rounded-xl object-cover shrink-0 border border-white/20"
                />
                <span>{guide.label}</span>
              </button>
            );
          })}
        </div>

        {/* -------------------------------------------------------------------
            EXPANDABLE AMAZON-INSPIRED BOOKSTORE FILTER DRAWER / PANEL
           ------------------------------------------------------------------- */}
        {filtersOpen && (
          <div
            data-testid="search-filter-panel"
            className="bg-white dark:bg-[#19191f] rounded-2xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-800 shadow-lg space-y-4 animate-fade-in"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#F1641E]" />
                <h2 className="text-sm font-bold">
                  Refine Sacred Treatises &amp; Bookstore Editions
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="text-xs font-semibold text-[#e60023] hover:underline cursor-pointer"
                >
                  Reset All Filters
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Pills inside Filter Panel */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Sacred Category Classification
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => {
                  const active = effectiveCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleApplyQueryOrCategory(activeQuery, cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                        active
                          ? 'bg-[#F1641E] text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-[var(--text-main)] hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4-Column Attribute Filters: Format, Price in LKR, Offer %, Sort By */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {/* Binding Format */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  Amazon Binding Format
                </label>
                <select
                  value={bindingFormat}
                  onChange={(e) => setBindingFormat(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 outline-hidden"
                >
                  <option value="All">All Collector Formats</option>
                  <option value="Royal Silkbound Edition">Royal Silkbound Edition</option>
                  <option value="Deluxe Gold Embossed">Deluxe Gold Embossed</option>
                  <option value="Ola Leaf Collector Box">Ola Leaf Collector Box</option>
                  <option value="Clothbound Hardcover">Clothbound Hardcover</option>
                </select>
              </div>

              {/* Price Bracket (LKR) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  Price Range (LKR)
                </label>
                <select
                  value={priceBracket}
                  onChange={(e) =>
                    setPriceBracket(e.target.value as SearchFilterOptions['priceBracket'])
                  }
                  className="w-full h-9 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 outline-hidden"
                >
                  <option value="all">All LKR Prices</option>
                  <option value="under-2000">Under LKR 2,000</option>
                  <option value="2000-3500">LKR 2,000 – LKR 3,500</option>
                  <option value="over-3500">Over LKR 3,500 (Collector Sets)</option>
                </select>
              </div>

              {/* Minimum Offer Percentage */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  Offer &amp; Savings %
                </label>
                <div className="flex items-center gap-1.5">
                  {[
                    { label: 'Any', val: 0 },
                    { label: '20%+ Off', val: 20 },
                    { label: '25%+ Off', val: 25 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setMinDiscount(opt.val)}
                      className={`flex-1 h-9 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        minDiscount === opt.val
                          ? 'bg-[#e60023] text-white border-transparent'
                          : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  Sort Bookstore Feed
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SearchFilterOptions['sortBy'])}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 outline-hidden"
                >
                  <option value="relevance">Best Match &amp; Similar First</option>
                  <option value="discount-desc">Biggest Offer % First</option>
                  <option value="price-asc">Price: Low to High (LKR)</option>
                  <option value="price-desc">Price: High to Low (LKR)</option>
                  <option value="rating-desc">Avg. Customer Review (★)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            SMART SEARCH / CATEGORY CONTEXT BAR
           ------------------------------------------------------------------- */}
        {(activeQuery.trim() || effectiveCategory !== 'All Treatises' || activeFilterCount > 0) && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {activeQuery.trim() ? (
                <>
                  <span className="font-semibold text-[var(--text-main)]">
                    Showing top similar matches for{' '}
                    <span className="font-bold text-[#F1641E]">&ldquo;{activeQuery}&rdquo;</span>
                  </span>
                  {searchResult.topMatchedBook && (
                    <Link
                      href={`/books/${searchResult.topMatchedBook.book.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F1641E]/15 text-[#F1641E] font-bold hover:underline"
                    >
                      <span>Top Match: {searchResult.topMatchedBook.book.title.split(':')[0]}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                  <span className="text-[var(--text-muted)] hidden sm:inline">
                    • {searchResult.primaryMatches.length} matching/similar +{' '}
                    {searchResult.suggestedBooks.length} suggested books
                  </span>
                </>
              ) : (
                <span className="font-semibold text-[var(--text-main)]">
                  Category:{' '}
                  <span className="font-bold text-[#F1641E]">{effectiveCategory}</span> (
                  {searchResult.primaryMatches.length} treatises in category +{' '}
                  {searchResult.suggestedBooks.length} suggested)
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetAllFilters}
              className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300 hover:text-[#e60023] flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}

        {/* ===================================================================
            3. PINTEREST MASONRY GRID (2 cols Mobile -> 6 cols Desktop)
           =================================================================== */}
        <div
          data-testid="pinterest-search-masonry"
          className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-3.5 sm:gap-4"
        >
          {searchResult.allItems.map((rankedItem, idx) => (
            <React.Fragment key={rankedItem.book.id}>
              {/* Render the Book Pin Card */}
              <PinterestBookPin
                item={rankedItem}
                index={idx}
                activeQuery={activeQuery}
              />

              {/* After Card #1: Inject "Explore featured boards" Pinterest Widget (Matching Screenshot 1) */}
              {idx === 0 && (
                <div className="masonry-item break-inside-avoid mb-4 sm:mb-5 p-3 rounded-2xl bg-neutral-100/80 dark:bg-[#1a1a20] border border-neutral-200/80 dark:border-neutral-800">
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] mb-2.5">
                    Explore featured boards
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FEATURED_BOARDS_WIDGET.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleApplyQueryOrCategory(b.query)}
                        className="group cursor-pointer bg-white dark:bg-[#23232b] rounded-xl p-1.5 border border-neutral-200/70 dark:border-neutral-700/70 hover:shadow-md transition"
                      >
                        <div className="grid grid-cols-3 gap-1 h-20 rounded-lg overflow-hidden">
                          <img
                            src={b.images[0]}
                            alt={b.title}
                            className="col-span-2 w-full h-full object-cover"
                          />
                          <div className="grid grid-rows-2 gap-1 h-full">
                            <img
                              src={b.images[1]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <img
                              src={b.images[2]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <p className="text-[11px] font-bold text-[var(--text-main)] group-hover:text-[#F1641E] line-clamp-1 mt-1.5">
                          {b.title}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 truncate">
                          <span>{b.curator}</span>
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#e60023] shrink-0" />
                        </p>
                        <p className="text-[9px] text-[var(--text-dim)] mt-0.5">
                          {b.pinsCount} Pins • {b.age}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* After Card #5: Inject "Shop [Query/Category] Editions" Inline Carousel Widget (Matching Screenshot 1) */}
              {idx === 4 && shopCarouselBooks.length > 0 && (
                <div className="masonry-item break-inside-avoid mb-4 sm:mb-5 p-3 rounded-2xl bg-neutral-100/90 dark:bg-[#1a1a20] border border-neutral-200/80 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-[10px] font-semibold text-[var(--text-muted)]">
                        Shop now
                      </p>
                      <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate max-w-[180px]">
                        Shop {activeQuery || 'Collector Editions'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setShopStripIndex((prev) => Math.max(0, prev - 1))
                        }
                        aria-label="Previous editions"
                        className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-xs cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setShopStripIndex((prev) =>
                            prev + 3 < searchResult.allItems.length ? prev + 1 : 0
                          )
                        }
                        aria-label="Next editions"
                        className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-xs cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {shopCarouselBooks.map(({ book, discountPercent }) => (
                      <Link
                        key={book.id}
                        href={`/books/${book.id}`}
                        className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-neutral-200 block"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1 text-center">
                          <p className="text-[9px] font-extrabold text-white truncate">
                            LKR {book.price.toLocaleString()}
                          </p>
                          {discountPercent > 0 && (
                            <p className="text-[8px] font-bold text-amber-300">
                              {discountPercent}% OFF
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Near Bottom of Grid: Inject "Related searches" Widget (Matching Screenshot 1) */}
              {idx === Math.min(9, searchResult.allItems.length - 1) && (
                <div className="masonry-item break-inside-avoid mb-4 sm:mb-5 p-3.5 rounded-2xl bg-neutral-100/90 dark:bg-[#1a1a20] border border-neutral-200/80 dark:border-neutral-800">
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] mb-2.5">
                    Related searches
                  </h3>
                  <div className="space-y-2">
                    {relatedSearches.map((rel) => (
                      <button
                        key={rel.text}
                        type="button"
                        onClick={() => handleApplyQueryOrCategory(rel.text)}
                        className="w-full p-1.5 rounded-xl bg-neutral-200/75 dark:bg-neutral-800 hover:bg-neutral-300/70 dark:hover:bg-neutral-700 flex items-center gap-2.5 text-left transition cursor-pointer"
                      >
                        <img
                          src={rel.thumb}
                          alt={rel.text}
                          className="w-9 h-9 rounded-lg object-cover shrink-0"
                        />
                        <span className="text-xs font-bold text-[var(--text-main)] line-clamp-2">
                          {rel.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>

      <BookModal />
      <BoardsModal />
      <Toast />
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F1641E]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
