'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  ChevronRight,
  User,
  Heart,
  Gift,
  Handbag,
  X,
  Search,
  Star,
  ArrowUpRight,
  RotateCcw,
  BookOpen,
  ScrollText,
  Landmark,
  Flower2,
  Feather,
  Leaf,
  Compass,
  Bell,
  ChevronDown,
  Tag,
  ClipboardList,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  Truck,
  CalendarHeart,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';
import { getAutocompleteSuggestions } from '../utils/searchEngine';
import { SearchField } from './ui/SearchField';
import { Tooltip } from './ui/Tooltip';

const VisualSearchModal = dynamic(() => import('./VisualSearchModal'), { ssr: false });
const CategoriesMegaMenu = dynamic(() => import('./CategoriesMegaMenu'), { ssr: false });

export interface RecentSearchData {
  id: string;
  label: string;
  thumbType?: string;
  image?: string;
}

export const INITIAL_RECENT_SEARCHES: RecentSearchData[] = [
  {
    id: 'rs-1',
    label: 'Mahavamsa Great Chronicle',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-2',
    label: 'Theravada Buddhist Philosophy',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-3',
    label: 'Indigenous Ayurvedic Herbs',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-4',
    label: 'Ola Leaf Manuscripts',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-5',
    label: 'Dhammapada Pali Verses',
    thumbType: 'dhammapada',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
  },
];

const FALLBACK_SEARCH_COVER =
  'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

function RecentSearchThumb({ image }: { type?: string; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt="Search thumbnail"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== FALLBACK_SEARCH_COVER) {
            target.src = FALLBACK_SEARCH_COVER;
          }
        }}
        className="w-full h-full object-cover"
      />
    );
  }
  return (
    <div className="w-full h-full bg-[var(--color-primary)]/15 flex items-center justify-center text-[var(--color-primary)]">
      <BookOpen className="w-5 h-5" />
    </div>
  );
}

export interface NavLinkItem {
  label: string;
  hasIcon: boolean;
  href: string;
  query?: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Gifts', hasIcon: true, href: '/gifts' },
  { label: 'Best Sellers', hasIcon: false, href: '/bestsellers' },
  { label: 'New Arrivals & Releases', hasIcon: false, href: '/new-releases' },
  { label: 'Books Store', hasIcon: false, href: '/books' },
  { label: 'Archival & Vintage', hasIcon: false, href: '/archives' },
  { label: 'Gift Cards', hasIcon: false, href: '/gift-cards' },
  { label: 'Special Offers', hasIcon: false, href: '/offers' },
];


export interface HeaderProps {
  isSticky?: boolean;
}

export default function Header({ isSticky = false }: HeaderProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    searchQuery,
    setSearchQuery,
    bag,
    bagCount,
    boards,
    setIsBoardsModalOpen,
    setSelectedCategory,
    triggerNavigation,
    showToast,
    openAuthModal,
    user,
    isLoggedIn,
    logout,
    addToBag,
    setShowMiniBagRail,
    activeCelebration,
    isCelebrationMode,
    setActiveCelebrationById,
    requestConfirmation,
  } = useApp();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>(INITIAL_RECENT_SEARCHES);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalSearch(searchQuery || '');
  }

  const categoriesRef = useRef<HTMLDivElement>(null);
  const tabletCategoriesRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const desktopNotificationsRef = useRef<HTMLDivElement>(null);
  const mobileNotificationsRef = useRef<HTMLDivElement>(null);
  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  const totalFavorites = boards.reduce((acc, b) => acc + b.bookIds.length, 0);
  const autocompleteData = React.useMemo(
    () => getAutocompleteSuggestions(localSearch, BOOKS),
    [localSearch]
  );

  // Trigger navigation logic on route changes
  useEffect(() => {
    triggerNavigation();
  }, [pathname, triggerNavigation]);

  // Close categories, notifications, profile menu and search suggestions dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const inDesktopCat =
        categoriesRef.current && categoriesRef.current.contains(target);
      const inTabletCat =
        tabletCategoriesRef.current && tabletCategoriesRef.current.contains(target);
      if (!inDesktopCat && !inTabletCat) {
        setCategoriesOpen(false);
      }

      const inDesktopSearch =
        desktopSearchRef.current && desktopSearchRef.current.contains(target);
      const inMobileSearch =
        mobileSearchRef.current && mobileSearchRef.current.contains(target);
      if (!inDesktopSearch && !inMobileSearch) {
        setSuggestionsOpen(false);
      }

      const inDesktopNotif =
        desktopNotificationsRef.current &&
        desktopNotificationsRef.current.contains(target);
      const inMobileNotif =
        mobileNotificationsRef.current &&
        mobileNotificationsRef.current.contains(target);
      if (!inDesktopNotif && !inMobileNotif) {
        setNotificationsOpen(false);
      }

      const inDesktopProfile =
        desktopProfileRef.current && desktopProfileRef.current.contains(target);
      const inMobileProfile =
        mobileProfileRef.current && mobileProfileRef.current.contains(target);
      if (!inDesktopProfile && !inMobileProfile) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setSuggestionsOpen(true);
    setNotificationsOpen(false);
    setProfileMenuOpen(false);
  };

  const handleSearchInputChange = (val: string) => {
    setLocalSearch(val);
    setSuggestionsOpen(true);
  };

  const handleRemoveRecent = (id: string) => {
    const target = recentSearches.find((r) => r.id === id);
    requestConfirmation({
      title: 'Remove recent search?',
      message: `Are you sure you want to remove "${target?.label || 'this search'}" from your recent searches?`,
      confirmLabel: 'Remove',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        setRecentSearches((prev) => prev.filter((r) => r.id !== id));
        showToast('Removed recent search');
      },
    });
  };

  const handleBookSuggestionClick = (bookId: string, title: string) => {
    setSuggestionsOpen(false);
    setIsCategorySheetOpen(false);
    setLocalSearch(title);
    triggerNavigation();
    router.push(`/books/${bookId}`);
  };

  const handleSearchSubmit = (queryText: string) => {
    const q = queryText.trim();
    setSearchQuery(q);
    setLocalSearch(q);
    setSuggestionsOpen(false);
    setIsCategorySheetOpen(false);
    triggerNavigation(); // Trigger navigation detection
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/');
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCategoriesOpen(false);
    setIsCategorySheetOpen(false);
    triggerNavigation(); // Trigger navigation detection
    if (category === 'All Treatises') {
      router.push('/search');
    } else {
      router.push(`/search?category=${encodeURIComponent(category)}&q=${encodeURIComponent(category)}`);
    }
  };

  const renderAutocompleteDropdown = () => {
    if (!suggestionsOpen) return null;

    // STATE A: Empty Search Query -> Show Recent Searches
    if (!localSearch.trim()) {
      return (
        <div
          data-testid="search-autocomplete-dropdown"
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 right-0 top-full mt-2 bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-50 animate-fade-in max-h-[78vh] overflow-y-auto overscroll-contain"
        >
          {/* Recent Searches */}
          <div className="px-3.5 sm:px-6 py-3.5 sm:py-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Recent Searches</span>
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {recentSearches.length < INITIAL_RECENT_SEARCHES.length && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setRecentSearches(INITIAL_RECENT_SEARCHES);
                    }}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  >
                    Restore
                  </button>
                )}
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      requestConfirmation({
                        title: 'Clear all recent searches?',
                        message: 'Are you sure you want to clear your entire recent search history?',
                        confirmLabel: 'Clear all',
                        cancelLabel: 'Cancel',
                        onConfirm: () => {
                          setRecentSearches([]);
                          showToast('Cleared recent search history');
                        },
                      });
                    }}
                    className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSuggestionsOpen(false);
                  }}
                  aria-label="Close search suggestions"
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] flex items-center gap-1 cursor-pointer transition"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {recentSearches.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-4 text-center">
                No recent searches. Type above to search manuscripts, authors & categories.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recentSearches.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSearchSubmit(item.label)}
                    className="group flex items-center justify-between p-1.5 pr-2 rounded-xl bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border-subtle)] transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-stone-200 dark:bg-stone-800">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--color-primary-subtle)] flex items-center justify-center text-[var(--color-primary)]">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[var(--text-main)] truncate">
                        {item.label}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveRecent(item.id);
                      }}
                      title="Remove"
                      aria-label={`Remove ${item.label}`}
                      className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] opacity-70 group-hover:opacity-100 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // STATE B: Search Query Typed -> Show Dynamic Predictions, Categories & Book Matches
    return (
      <div
        data-testid="search-autocomplete-dropdown"
        onClick={(e) => e.stopPropagation()}
        className="absolute left-0 right-0 top-full mt-2 bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden z-50 animate-fade-in max-h-[78vh] overflow-y-auto overscroll-contain"
      >
        {/* Keyword Search Suggestions */}
        <div className="px-3 sm:px-6 py-2.5 border-b border-[var(--border-subtle)]">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
            <span>Search Shastraloka Book Catalog</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSuggestionsOpen(false);
              }}
              aria-label="Close search suggestions"
              className="px-2 py-0.5 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] flex items-center gap-1 cursor-pointer transition"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {autocompleteData.querySuggestions.map((qText) => (
            <button
              key={qText}
              type="button"
              onClick={() => handleSearchSubmit(qText)}
              className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] flex items-center justify-between gap-2 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Search className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                <span className="truncate font-medium">{qText}</span>
              </div>
              <span className="text-[11px] text-[var(--text-muted)] shrink-0">
                Search all &rarr;
              </span>
            </button>
          ))}
        </div>

        {/* Category Matches */}
        {autocompleteData.categoryMatches.length > 0 && (
          <div className="px-3 sm:px-6 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-wash)]/40">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Categories
            </div>
            <div className="flex flex-wrap gap-1.5 p-1.5">
              {autocompleteData.categoryMatches.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className="px-2.5 py-1 rounded-full text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--text-main)] hover:text-[var(--color-primary)] transition cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Direct Book Matches */}
        <div className="px-3 sm:px-6 py-2.5">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
            <span>Books & Manuscripts ({autocompleteData.bookMatches.length})</span>
            {autocompleteData.bookMatches.length > 0 && (
              <button
                type="button"
                onClick={() => handleSearchSubmit(localSearch)}
                className="text-[var(--color-primary)] hover:underline normal-case text-[11px] font-semibold"
              >
                View all results
              </button>
            )}
          </div>

          {autocompleteData.bookMatches.length === 0 ? (
            <div className="p-4 text-center text-xs text-[var(--text-muted)]">
              No direct book matches found for &quot;{localSearch}&quot;. Press Enter to explore broad keyword results.
            </div>
          ) : (
            <div className="space-y-1">
              {autocompleteData.bookMatches.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookSuggestionClick(book.id, book.title)}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-[var(--bg-hover)] transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-9 h-12 object-cover rounded-md shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                        {book.title}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">
                        {book.category} • {book.author}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--text-muted)]">
                        <span className="inline-flex items-center text-amber-500 font-semibold">
                          <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                          {book.rating}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-[var(--text-main)]">
                          Rs. {book.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleApplyDealCoupon = (bookIndex: number, code: string, discountLabel: string) => {
    const targetBook = BOOKS[bookIndex] || BOOKS[0];
    addToBag(targetBook, targetBook.binding, 1);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setNotificationsOpen(false);
    showToast(`Applied ${code} (${discountLabel}) to your Shopping Bag!`);
    router.push('/bag');
  };

  const renderNotificationsDropdown = (isMobile = false) => {
    if (!notificationsOpen) return null;
    const offerBook1 = BOOKS[0];
    const offerBook2 = BOOKS[1] || BOOKS[0];
    const offerBook3 = BOOKS[2] || BOOKS[0];
    const outOfStockBook1 =
      BOOKS.find((b) => b.id === 'chaddanta-gajaga-jataka-illustrated') || BOOKS[3];
    const outOfStockBook2 =
      BOOKS.find((b) => b.id === 'guttila-kavyaya') || BOOKS[4];
    const celebCoupon = activeCelebration.coupons[0] || {
      code: 'DEEPAVALI35',
      discount: '35% OFF',
      title: activeCelebration.title,
    };

    return (
      <div
        role="dialog"
        aria-label="Deals and Notifications"
        onClick={(e) => e.stopPropagation()}
        className={
          isMobile
            ? 'absolute left-0 right-0 md:left-auto md:right-0 top-full mt-2.5 md:mt-3 w-full md:w-[368px] bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-[0_14px_44px_rgba(0,0,0,0.22)] border border-[var(--border-subtle)] z-50 animate-fade-in select-none'
            : 'absolute right-0 top-full mt-3 w-[368px] bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-[0_14px_44px_rgba(0,0,0,0.22)] border border-[var(--border-subtle)] z-50 animate-fade-in select-none'
        }
      >
        {/* Top Upward Diamond Caret Pointer (Desktop & Tablet) */}
        <div
          className={`${
            isMobile ? 'hidden md:block' : 'block'
          } absolute -top-2 right-6 w-4 h-4 rotate-45 bg-[var(--bg-card)] border-l border-t border-[var(--border-subtle)] pointer-events-none`}
        />

        {/* Centered "Deals" Title */}
        <div className="py-3.5 px-4 text-center bg-[var(--bg-card)] rounded-t-2xl flex items-center justify-between">
          <span className="text-[11px] font-bold text-[var(--text-muted)]">6 Updates</span>
          <h3 className="text-sm font-bold text-[var(--text-main)]">Deals</h3>
          <Link
            href={`/offers?celebration=${activeCelebration.id}`}
            onClick={() => setNotificationsOpen(false)}
            className="text-[11px] font-bold text-[var(--color-primary)] hover:underline"
          >
            All offers
          </Link>
        </div>

        {/* Outer wrapper so "Seen" pill is never clipped by overflow-y-auto */}
        <div className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-wash)]/75 rounded-b-2xl">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-main)] shadow-2xs">
            Seen
          </span>

          {/* Scrollable Inner Container */}
          <div className="max-h-[360px] sm:max-h-[410px] overflow-y-auto overscroll-contain pt-5 pb-4 px-4 space-y-4">
            {/* Deal 1: 45% off with code ABCOUPON45 (Matches Screenshot 1) */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center shrink-0 mt-0.5">
                <Tag className="w-3.5 h-3.5 fill-current" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                    Rasakatha Press sent an offer for an item you left in your bag.
                  </p>
                  <span className="text-xs text-[var(--text-muted)] shrink-0">1d</span>
                </div>

                <Link
                  href={`/books/${offerBook1.id}`}
                  onClick={() => setNotificationsOpen(false)}
                  className="block w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] my-2.5 shadow-2xs hover:opacity-95 transition"
                >
                  <img
                    src={offerBook1.coverImage}
                    alt={offerBook1.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <p className="text-xs sm:text-[13px] font-extrabold text-[var(--color-success)]">
                  45% off with code ABCOUPON45
                </p>

                <button
                  type="button"
                  onClick={() => handleApplyDealCoupon(0, 'ABCOUPON45', '45% off')}
                  className="mt-2 px-4 py-2 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer"
                >
                  Apply to bag
                </button>

                <p className="text-[11px] text-[var(--text-muted)] mt-2">
                  Terms may apply.{' '}
                  <Link
                    href="/offers"
                    onClick={() => setNotificationsOpen(false)}
                    className="underline hover:text-[var(--text-main)]"
                  >
                    Visit shop for details.
                  </Link>
                </p>
              </div>
            </div>

            {/* Deal 2: Out-of-Stock Book Deal Notification (May Mara Prasangaya) */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-danger-bg)] text-[var(--color-danger)] flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                    Flash deal on <strong>{outOfStockBook1.title}</strong> is currently sold out.
                  </p>
                  <span className="text-xs text-[var(--text-muted)] shrink-0">2d</span>
                </div>

                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] my-2.5 shadow-2xs">
                  <img
                    src={outOfStockBook1.coverImage}
                    alt={outOfStockBook1.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-75"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-[var(--color-danger)] text-white text-[9px] font-extrabold text-center py-0.5 uppercase">
                    Out of stock
                  </span>
                </div>

                <p className="text-xs text-[var(--text-muted)] line-through">
                  40% off with code JATAKA40
                </p>
                <p className="text-[11px] font-bold text-[var(--color-danger)] mt-0.5">
                  {outOfStockBook1.stockNote || 'Archival batch sold out — restocking soon'}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    showToast(`We'll notify you as soon as "${outOfStockBook1.title}" is back in stock with the 40% deal!`);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-main)] text-xs font-bold hover:bg-[var(--bg-hover)] transition cursor-pointer"
                >
                  Out of stock • Notify me
                </button>
              </div>
            </div>

            {/* Deal 3: Active Celebration Date Special Offer */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                <CalendarHeart className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                    <strong>{activeCelebration.title}</strong> ({activeCelebration.dateLabel}) special voucher unlocked!
                  </p>
                  <span className="text-xs text-[var(--text-muted)] shrink-0">New</span>
                </div>

                <p className="text-xs sm:text-[13px] font-extrabold text-[var(--color-success)] mt-1.5">
                  {celebCoupon.discount} with code {celebCoupon.code}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyDealCoupon(1, celebCoupon.code, celebCoupon.discount)}
                    className="px-4 py-1.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold hover:opacity-90 transition cursor-pointer"
                  >
                    Apply to bag
                  </button>
                  <Link
                    href={`/offers?celebration=${activeCelebration.id}`}
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-bold text-[var(--color-primary)] hover:underline"
                  >
                    View date offers &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Deal 4: 30% off with code SHASTRA30 */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center shrink-0 mt-0.5">
                <Tag className="w-3.5 h-3.5 fill-current" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                    Royal Kandy Scriptorium sent an offer for an item in your bag.
                  </p>
                  <span className="text-xs text-[var(--text-muted)] shrink-0">3d</span>
                </div>

                <Link
                  href={`/books/${offerBook2.id}`}
                  onClick={() => setNotificationsOpen(false)}
                  className="block w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] my-2.5 shadow-2xs hover:opacity-95 transition"
                >
                  <img
                    src={offerBook2.coverImage}
                    alt={offerBook2.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <p className="text-xs sm:text-[13px] font-extrabold text-[var(--color-success)]">
                  30% off with code SHASTRA30
                </p>

                <button
                  type="button"
                  onClick={() => handleApplyDealCoupon(1, 'SHASTRA30', '30% off')}
                  className="mt-2 px-4 py-2 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer"
                >
                  Apply to bag
                </button>
              </div>
            </div>

            {/* Deal 5: Second Out-of-Stock Book Deal Notification (Glasera & Guttila Kavyaya) */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-danger-bg)] text-[var(--color-danger)] flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                    Collector deal on <strong>{outOfStockBook2.title}</strong> is temporarily out of stock.
                  </p>
                  <span className="text-xs text-[var(--text-muted)] shrink-0">4d</span>
                </div>

                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] my-2.5 shadow-2xs">
                  <img
                    src={outOfStockBook2.coverImage}
                    alt={outOfStockBook2.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-75"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-[var(--color-danger)] text-white text-[9px] font-extrabold text-center py-0.5 uppercase">
                    Out of stock
                  </span>
                </div>

                <p className="text-xs text-[var(--text-muted)] line-through">
                  35% off with code KAVYA35
                </p>

                <button
                  type="button"
                  onClick={() => {
                    showToast(`Restock alert enabled for "${outOfStockBook2.title}"!`);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-main)] text-xs font-bold hover:bg-[var(--bg-hover)] transition cursor-pointer"
                >
                  Out of stock • Notify me
                </button>
              </div>
            </div>

            {/* Deal 6: 25% off with code PALMLEAF500 */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center shrink-0 mt-0.5">
                <Tag className="w-3.5 h-3.5 fill-current" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                    Sarasaviya &amp; Grantha Press sent a voucher for your saved favorites.
                  </p>
                  <span className="text-xs text-[var(--text-muted)] shrink-0">5d</span>
                </div>

                <Link
                  href={`/books/${offerBook3.id}`}
                  onClick={() => setNotificationsOpen(false)}
                  className="block w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] my-2.5 shadow-2xs hover:opacity-95 transition"
                >
                  <img
                    src={offerBook3.coverImage}
                    alt={offerBook3.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <p className="text-xs sm:text-[13px] font-extrabold text-[var(--color-success)]">
                  25% off with code PALMLEAF500
                </p>

                <button
                  type="button"
                  onClick={() => handleApplyDealCoupon(2, 'PALMLEAF500', '25% off')}
                  className="mt-2 px-4 py-2 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer"
                >
                  Apply to bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileDropdown = (isMobile = false) => {
    if (!profileMenuOpen) return null;
    const displayName = user?.name || 'Sadew Nethsara';
    const userInitial = displayName.charAt(0).toUpperCase();
    const mainCelebCoupon = activeCelebration.coupons[0];

    return (
      <div
        role="menu"
        aria-label="Account navigation"
        onClick={(e) => e.stopPropagation()}
        className={
          isMobile
            ? 'absolute left-0 right-0 md:left-auto md:right-0 top-full mt-2.5 md:mt-3 w-full md:w-[315px] bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-[0_14px_44px_rgba(0,0,0,0.22)] border border-[var(--border-subtle)] z-50 animate-fade-in select-none'
            : 'absolute right-0 top-full mt-3 w-[315px] bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-[0_14px_44px_rgba(0,0,0,0.22)] border border-[var(--border-subtle)] z-50 animate-fade-in select-none'
        }
      >
        {/* Top Upward Caret Pointer (Desktop & Tablet) */}
        <div
          className={`${
            isMobile ? 'hidden md:block' : 'block'
          } absolute -top-2 right-5 w-4 h-4 rotate-45 bg-[var(--bg-card)] border-l border-t border-[var(--border-subtle)] pointer-events-none`}
        />

        <div className="pt-2 pb-1.5 overflow-hidden rounded-2xl max-h-[82vh] overflow-y-auto overscroll-contain">
          {/* Profile Header Row with Blue Top/Bottom Accent Border */}
          <Link
            href="/profile"
            onClick={() => setProfileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 border-y-2 border-[var(--color-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] transition"
          >
            <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
              {userInitial}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--text-main)] truncate leading-tight">
                {displayName}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                View your profile
              </p>
            </div>
          </Link>

          {/* Celebration Date Special Page & Theme Button (Requested in Profile Dropdown) */}
          <div className="px-3 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/70">
            <Link
              href={`/offers?celebration=${activeCelebration.id}`}
              onClick={() => setProfileMenuOpen(false)}
              className="w-full p-2.5 rounded-xl bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] hover:opacity-95 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
                  <CalendarHeart className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[var(--text-main)] truncate">
                    {activeCelebration.title}
                  </p>
                  <p className="text-[11px] font-semibold text-[var(--color-primary)] truncate">
                    {activeCelebration.dateLabel} • {mainCelebCoupon ? mainCelebCoupon.discount : 'Date Offers'}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            </Link>

            {/* Quick Celebration Theme Switcher Pills inside Profile Dropdown */}
            <div className="mt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'womens-day', label: "Women's Day" },
                { id: 'childrens-day', label: "Children's Day" },
                { id: 'teachers-day', label: "Teachers' Day" },
                { id: 'deepavali-halloween-season', label: 'Oct 30 Festival' },
              ].map((item) => {
                const active = isCelebrationMode && activeCelebration.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveCelebrationById(item.id);
                      setProfileMenuOpen(false);
                      router.push(`/offers?celebration=${item.id}`);
                    }}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold shrink-0 transition cursor-pointer ${
                      active
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--bg-card)] text-[var(--text-body)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 1: Purchases, Track Order & Messages */}
          <div className="py-1.5 border-b border-[var(--border-subtle)]">
            <Link
              href="/orders"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <ClipboardList className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Purchases and reviews</span>
            </Link>

            <Link
              href="/track-order"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <Truck className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Track order</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <MessageSquare className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Messages</span>
            </Link>
          </div>

          {/* Group 2: Credit Balance, Special Offers, Gifts & Wishlist */}
          <div className="py-1.5 border-b border-[var(--border-subtle)]">
            <Link
              href="/gift-cards"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <CreditCard className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Credit balance: LKR 0.00</span>
            </Link>

            <Link
              href={`/offers?celebration=${activeCelebration.id}`}
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <div className="flex items-center gap-3.5">
                <Tag className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
                <span>Special offers</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-extrabold">
                {activeCelebration.dateLabel}
              </span>
            </Link>

            <Link
              href="/gifts"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <Gift className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Shastraloka Registry &amp; Gifts</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <Heart className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Wishlist &amp; saved boards</span>
            </Link>
          </div>

          {/* Group 3: Account Settings & Sign Out */}
          <div className="py-1.5">
            <Link
              href="/profile/settings"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <Settings className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Account settings</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen(false);
                setNotificationsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition cursor-pointer text-left"
            >
              <LogOut className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header
        className={`${isSticky
          ? 'sticky top-0 backdrop-blur-md bg-[var(--header-bg-glass)]'
          : 'relative bg-[var(--header-bg)]'
          } z-40 border-b border-[var(--header-border)] text-[var(--header-text)] transition-colors duration-200 w-full`}
      >
        <div className="page-container box-border">
          {/* =====================================================================
              DESKTOP HEADER ROW (lg and up)
             ===================================================================== */}
          <div className="hidden lg:flex items-center justify-between gap-5 py-3">
            {/* Shastraloka Serif Logo */}
            <Link
              href="/"
              onClick={() => {
                setSearchQuery('');
                setLocalSearch('');
              }}
              className="group flex flex-col shrink-0 pr-1 select-none"
            >
              <span
                className="text-[var(--header-logo-color,var(--color-primary))] text-[34px] leading-none font-bold tracking-tight transition-transform group-hover:scale-102 font-heading"
              >
                Shastraloka
              </span>
              <span className="text-[10px] text-[var(--header-text-muted)] font-medium tracking-wide pl-0.5">
                Classical Bookstore & Library
              </span>
            </Link>

            {/* Categories Dropdown Trigger */}
            <div className="relative" ref={categoriesRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
              >
                <Menu className="w-4 h-4 text-[var(--header-text)]" />
                <span>Categories</span>
              </button>

              {/* Categories 2-Column Visual Mega-Menu (Lazy-loaded on demand) */}
              {categoriesOpen && (
                <CategoriesMegaMenu
                  isOpen={categoriesOpen}
                  onClose={() => setCategoriesOpen(false)}
                />
              )}
            </div>

            {/* Search Input Bar with Orange Pill Button */}
            <div className="relative flex-1 max-w-2xl" ref={desktopSearchRef}>
              <SearchField
                value={localSearch}
                onChange={handleSearchInputChange}
                onSubmit={handleSearchSubmit}
                onClear={() => {
                  setLocalSearch('');
                  setSuggestionsOpen(false);
                }}
                onFocus={handleSearchFocus}
                onClick={handleSearchFocus}
                onImageSearchClick={() => setIsVisualSearchOpen(true)}
                placeholder="Search sacred manuscripts, Gajaga, Mahavamsa, Ayurveda..."
                accessibilityLabel="Search sacred manuscripts"
                submitButtonColor="orange"
                size="md"
              />
              {renderAutocompleteDropdown()}
            </div>

            {/* Right User Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Favorites / Saved Reading List */}
              <Tooltip text="Favorites & Saved Boards">
                <Link
                  href="/wishlist"
                  aria-label="Saved Favorites & Collections"
                  className="relative p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                >
                  <Heart className="w-5 h-5" />
                  {totalFavorites > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-[var(--header-badge-fav-bg)] text-[var(--header-badge-text)] text-[10px] font-bold flex items-center justify-center leading-none">
                      {totalFavorites}
                    </span>
                  )}
                </Link>
              </Tooltip>

              {/* Notifications / Deals Bell Dropdown (Signed-In Users Only) */}
              {isLoggedIn && (
                <div className="relative" ref={desktopNotificationsRef}>
                  <Tooltip text="Deals & Notifications">
                    <button
                      type="button"
                      onClick={() => {
                        setNotificationsOpen(!notificationsOpen);
                        setProfileMenuOpen(false);
                      }}
                      aria-label="Deals and Notifications"
                      aria-expanded={notificationsOpen}
                      className={`h-10 px-3 rounded-full flex items-center gap-1 transition cursor-pointer ${
                        notificationsOpen
                          ? 'bg-[var(--color-primary-subtle)] text-[var(--header-accent,var(--color-primary))] ring-2 ring-[var(--color-primary-border)]'
                          : 'hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]'
                      }`}
                    >
                      <div className="relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--header-badge-fav-bg)]" />
                      </div>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </Tooltip>
                  {renderNotificationsDropdown(false)}
                </div>
              )}

              {/* Signed-Out: Sign in Button | Signed-In: Profile Avatar Pill + Dropdown Box */}
              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="h-10 px-4 rounded-full text-sm font-bold text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
                >
                  Sign in
                </button>
              ) : (
                <div className="relative" ref={desktopProfileRef}>
                  <Tooltip text={user?.name || 'Your Profile & Celebration Offers'}>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(!profileMenuOpen);
                        setNotificationsOpen(false);
                      }}
                      aria-label="Your account menu"
                      aria-expanded={profileMenuOpen}
                      className={`h-10 px-2.5 rounded-full flex items-center gap-1.5 transition cursor-pointer ${
                        profileMenuOpen
                          ? 'bg-[var(--color-primary-subtle)] text-[var(--header-accent,var(--color-primary))] ring-2 ring-[var(--color-primary-border)]'
                          : 'hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {(user?.name || 'S').charAt(0).toUpperCase()}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </Tooltip>
                  {renderProfileDropdown(false)}
                </div>
              )}

              {/* Highlighted Shopping Bag Button -> Navigates to Bag Page */}
              <Tooltip text={`Shopping Bag (${bagCount} items)`}>
                <Link
                  href="/bag"
                  aria-label="Shopping Bag"
                  className="h-10 px-4 rounded-full flex items-center gap-2 bg-[var(--bag-btn-bg)] hover:bg-[var(--bag-btn-hover-bg)] border-2 border-[var(--bag-btn-border)] hover:border-[var(--bag-btn-hover-border)] transition-all cursor-pointer shadow-xs active:scale-95 group ml-1"
                >
                  <div className="relative flex items-center justify-center">
                    <Handbag className="w-4.5 h-4.5 transition-transform group-hover:scale-110 text-[var(--bag-btn-text)] group-hover:text-[var(--bag-btn-hover-text,var(--color-primary))]" />
                    {bagCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[var(--header-badge-bag-bg)] text-[var(--header-badge-bag-text,var(--header-badge-text))] text-[10px] font-bold flex items-center justify-center shadow-xs leading-none">
                        {bagCount}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-sm tracking-tight transition-colors text-[var(--bag-btn-text)] group-hover:text-[var(--bag-btn-hover-text,var(--color-primary))]">
                    Bag
                  </span>
                </Link>
              </Tooltip>
            </div>
          </div>

          {/* =====================================================================
              DESKTOP SUB-NAVIGATION ROW
             ===================================================================== */}
          <nav className="hidden lg:flex items-center justify-start xl:justify-center gap-2 xl:gap-4 pb-2.5 pt-0.5 text-[12px] xl:text-[13px] font-medium text-[var(--header-text)] overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer whitespace-nowrap shrink-0"
              >
                {item.hasIcon && (
                  <Gift className="w-3.5 h-3.5 text-[var(--header-accent,var(--color-primary))]" />
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* =====================================================================
              TABLET & MOBILE HEADER (< lg)
             ===================================================================== */}
          <div className="lg:hidden py-2.5 space-y-2">
            {/* Row 1: Logo on Left, Notifications, Auth/Profile & Bag Actions on Right */}
            <div className="relative flex items-center justify-between">
              <Link
                href="/"
                onClick={() => {
                  setSearchQuery('');
                  setLocalSearch('');
                }}
                className="text-[var(--header-logo-color,var(--color-primary))] text-[22px] sm:text-[24px] leading-none font-bold tracking-tight select-none font-heading shrink-0"
              >
                Shastraloka
              </Link>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Mobile/Tablet Notifications Bell Dropdown (Signed-In Users Only) */}
                {isLoggedIn && (
                  <div ref={mobileNotificationsRef} className="md:relative">
                    <button
                      type="button"
                      onClick={() => {
                        setNotificationsOpen(!notificationsOpen);
                        setProfileMenuOpen(false);
                        setSuggestionsOpen(false);
                      }}
                      aria-label="Deals and Notifications"
                      aria-expanded={notificationsOpen}
                      className={`h-9 px-2.5 rounded-full flex items-center gap-1 transition cursor-pointer ${
                        notificationsOpen
                          ? 'bg-[var(--color-primary-subtle)] text-[var(--header-accent,var(--color-primary))] ring-2 ring-[var(--color-primary-border)]'
                          : 'hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]'
                      }`}
                    >
                      <div className="relative">
                        <Bell className="w-4.5 h-4.5" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--header-badge-fav-bg)]" />
                      </div>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {renderNotificationsDropdown(true)}
                  </div>
                )}

                {/* If user is NOT signed in: show "Sign in" button matching Bag button height, shape and theme */}
                {!isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    aria-label="Sign in"
                    className="h-9 px-3.5 rounded-full flex items-center justify-center bg-[var(--bag-btn-bg)] border-2 border-[var(--bag-btn-border)] text-[var(--bag-btn-text)] hover:bg-[var(--bag-btn-hover-bg)] hover:border-[var(--bag-btn-hover-border)] font-bold text-xs shadow-xs active:scale-95 transition cursor-pointer"
                  >
                    Sign in
                  </button>
                ) : (
                  /* If user IS signed in: show Profile Avatar Pill + Desktop-style Popover on Tablet / Full-Width Dropdown on Mobile */
                  <div ref={mobileProfileRef} className="md:relative">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(!profileMenuOpen);
                        setNotificationsOpen(false);
                        setSuggestionsOpen(false);
                      }}
                      aria-label="Account menu"
                      aria-expanded={profileMenuOpen}
                      className={`h-9 px-2 rounded-full flex items-center gap-1 transition cursor-pointer ${
                        profileMenuOpen
                          ? 'bg-[var(--color-primary-subtle)] text-[var(--header-accent,var(--color-primary))] ring-2 ring-[var(--color-primary-border)]'
                          : 'bg-[var(--bag-btn-bg)] border-2 border-[var(--bag-btn-border)] text-[var(--bag-btn-text)]'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {(user?.name || 'S').charAt(0).toUpperCase()}
                      </span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {renderProfileDropdown(true)}
                  </div>
                )}

                {/* Highlighted Mobile Shopping Bag Button -> Opens Mini Bag Bottom Sheet on mobile */}
                <button
                  type="button"
                  onClick={() => {
                    if (pathname === '/bag') return;
                    setShowMiniBagRail(true);
                  }}
                  aria-label="Shopping Bag"
                  className="h-9 px-3 rounded-full flex items-center gap-1.5 bg-[var(--bag-btn-bg)] border-2 border-[var(--bag-btn-border)] text-[var(--bag-btn-text)] font-bold text-xs shadow-xs active:scale-95 transition cursor-pointer"
                  title="Shopping Bag"
                >
                  <div className="relative flex items-center justify-center">
                    <Handbag className="w-4 h-4" />
                    {bagCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[var(--header-badge-bag-bg)] text-[var(--header-badge-bag-text,var(--header-badge-text))] text-[9px] font-bold flex items-center justify-center leading-none">
                        {bagCount}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-xs">Bag</span>
                </button>
              </div>
            </div>

            {/* Row 2: Categories Trigger + Search Bar with Full-Width Floating Dropdown */}
            <div className="relative" ref={mobileSearchRef}>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0" ref={tabletCategoriesRef}>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                        setCategoriesOpen(!categoriesOpen);
                      } else {
                        setIsCategorySheetOpen(true);
                      }
                    }}
                    aria-label="Browse categories"
                    aria-expanded={categoriesOpen || isCategorySheetOpen}
                    className="h-9 px-2.5 sm:px-3 rounded-full flex items-center gap-1.5 bg-[var(--header-hover-bg)] text-[var(--header-text)] border border-[var(--border-subtle)] text-xs font-semibold shrink-0 cursor-pointer transition active:scale-95"
                    title="Browse Categories"
                  >
                    <Menu className="w-4 h-4 text-[var(--header-accent,var(--color-primary))]" />
                    <span className="text-xs font-medium">Categories</span>
                  </button>

                  {/* Tablet Categories 2-Column Visual Mega-Menu (md to lg, lazy-loaded on demand) */}
                  {categoriesOpen && (
                    <div className="hidden md:block">
                      <CategoriesMegaMenu
                        isOpen={categoriesOpen}
                        onClose={() => setCategoriesOpen(false)}
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <SearchField
                    value={localSearch}
                    onChange={handleSearchInputChange}
                    onSubmit={handleSearchSubmit}
                    onClear={() => {
                      setLocalSearch('');
                      setSuggestionsOpen(false);
                    }}
                    onFocus={handleSearchFocus}
                    onClick={handleSearchFocus}
                    onImageSearchClick={() => setIsVisualSearchOpen(true)}
                    placeholder="Search manuscripts, Ayurveda..."
                    accessibilityLabel="Search manuscripts"
                    submitButtonColor="orange"
                    size="sm"
                  />
                </div>
              </div>

              {/* Full width floating dropdown with left and right padding inside container */}
              {renderAutocompleteDropdown()}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          DESKTOP & TABLET CATEGORIES MEGA-MENU BACKDROP OVERLAY
          Dims page body, footer, and all elements below/outside the header
          without dimming or blurring the <header> (which sits at z-40).
         ===================================================================== */}
      {categoriesOpen && (
        <div
          aria-hidden="true"
          onClick={() => setCategoriesOpen(false)}
          className="hidden md:block fixed inset-0 z-30 bg-black/30 backdrop-blur-[1.5px] animate-fade-in"
        />
      )}

      {/* =====================================================================
          MOBILE CATEGORY BOTTOM SHEET (< md)
         ===================================================================== */}
      {isCategorySheetOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex items-end justify-center sm:px-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Browse Categories"
        >
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCategorySheetOpen(false)}
          />

          {/* Slide-Up Bottom Sheet */}
          <div className="relative z-10 w-full max-h-[85dvh] bg-[var(--bg-card)] text-[var(--text-main)] rounded-t-[28px] border-t border-[var(--border-subtle)] shadow-[0_-16px_48px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden animate-slide-up">
            {/* Mobile Drag Handle */}
            <div className="pt-3 pb-1 flex justify-center bg-[var(--bg-surface)] shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-[var(--border-strong)] opacity-60" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-subtle)] flex items-center justify-center text-[var(--color-primary)]">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-heading text-[var(--text-main)] leading-none">
                    Explore Categories
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Sacred Sri Lankan manuscripts & literature
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCategorySheetOpen(false)}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
                aria-label="Close categories"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Collections Chips */}
            <div className="px-5 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-wash)] shrink-0">
              <Link
                href="/bestsellers"
                onClick={() => setIsCategorySheetOpen(false)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] whitespace-nowrap shrink-0 transition"
              >
                Best Sellers
              </Link>
              <Link
                href="/new-releases"
                onClick={() => setIsCategorySheetOpen(false)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] whitespace-nowrap shrink-0 transition"
              >
                New Releases
              </Link>
              <Link
                href="/gifts"
                onClick={() => setIsCategorySheetOpen(false)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] whitespace-nowrap shrink-0 transition"
              >
                Gift Guides
              </Link>
              <Link
                href="/archives"
                onClick={() => setIsCategorySheetOpen(false)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] whitespace-nowrap shrink-0 transition"
              >
                Archival Finds
              </Link>
              <Link
                href="/offers"
                onClick={() => setIsCategorySheetOpen(false)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] whitespace-nowrap shrink-0 transition"
              >
                Special Offers
              </Link>
              <Link
                href="/authors"
                onClick={() => setIsCategorySheetOpen(false)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-main)] whitespace-nowrap shrink-0 transition"
              >
                Authors
              </Link>
            </div>

            {/* Categories List (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-[var(--border-subtle)] overscroll-contain">
              {[
                {
                  title: 'All Treatises & Manuscripts',
                  desc: 'Complete palm-leaf folios, royal chronicles & classics',
                  Icon: ScrollText,
                  href: '/categories',
                  count: '42+ Editions',
                },
                {
                  title: 'Sacred Palm-Leaf Chronicles',
                  desc: 'Mahavamsa, Chulavamsa, Dipavamsa historical lore',
                  Icon: Landmark,
                  href: '/categories/sacred-palm-leaf-chronicles',
                  count: '14 Works',
                },
                {
                  title: 'Buddhist Philosophy & Treatises',
                  desc: 'Visuddhimagga, Abhidhamma, Pali Canon translations',
                  Icon: Flower2,
                  href: '/categories/buddhist-philosophy',
                  count: '28 Works',
                },
                {
                  title: 'Classical Sinhala Poetry (Kavya)',
                  desc: 'Guttila, Selalihini, Sandesha & court verses',
                  Icon: Feather,
                  href: '/categories/classical-sinhala-poetry',
                  count: '19 Works',
                },
                {
                  title: 'Indigenous Ayurveda & Healing',
                  desc: 'King Buddhadasa treatises, Sarartha & botanical medicine',
                  Icon: Leaf,
                  href: '/categories/indigenous-ayurveda',
                  count: '16 Works',
                },
                {
                  title: 'Novels & Modern Literature',
                  desc: 'Martin Wickramasinghe, Sarachchandra & literary prose',
                  Icon: BookOpen,
                  href: '/categories/novels-literature',
                  count: '35 Works',
                },
                {
                  title: 'Inscriptions & Archaeology',
                  desc: 'Epigraphia Zeylanica, rock edicts & Brahmi scripts',
                  Icon: Compass,
                  href: '/categories/inscriptions-archaeology',
                  count: '11 Works',
                },
              ].map((cat) => {
                const IconComponent = cat.Icon;
                return (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    onClick={() => setIsCategorySheetOpen(false)}
                    className="flex items-center justify-between py-3.5 group transition"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-primary)] shrink-0 group-hover:scale-105 group-hover:bg-[var(--color-primary-subtle)] group-hover:border-[var(--color-primary)] transition-all">
                        <IconComponent className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                          {cat.title}
                        </div>
                        <div className="text-[11.5px] text-[var(--text-muted)] line-clamp-1">
                          {cat.desc}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] bg-[var(--bg-wash)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Footer */}
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
              <Link
                href="/categories"
                onClick={() => setIsCategorySheetOpen(false)}
                className="w-full py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold text-center block transition hover:opacity-95 shadow-xs"
              >
                View All Categories Directory
              </Link>
            </div>
          </div>
        </div>
      )}
      {isVisualSearchOpen && (
        <VisualSearchModal
          isOpen={isVisualSearchOpen}
          onClose={() => setIsVisualSearchOpen(false)}
        />
      )}
    </>
  );
}
