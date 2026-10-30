'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  ChevronRight,
  Sun,
  Moon,
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
  Store,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';
import { getAutocompleteSuggestions } from '../utils/searchEngine';
import { SearchField } from './ui/SearchField';
import VisualSearchModal from './VisualSearchModal';
import CategoriesMegaMenu from './CategoriesMegaMenu';

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
    isDark,
    toggleTheme,
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
  };

  const handleSearchInputChange = (val: string) => {
    setLocalSearch(val);
    setSuggestionsOpen(true);
  };

  const handleRemoveRecent = (id: string) => {
    setRecentSearches((prev) => prev.filter((r) => r.id !== id));
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
          className="absolute left-0 right-0 top-full mt-2 bg-[var(--header-dropdown-bg)] text-[var(--header-text)] rounded-2xl shadow-2xl border border-[var(--header-dropdown-border)] overflow-hidden z-50 animate-fade-in max-h-[78vh] overflow-y-auto overscroll-contain"
        >
          {/* Recent Searches */}
          <div className="px-3.5 sm:px-6 py-3.5 sm:py-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--header-text-muted)] flex items-center gap-1.5">
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
                      setRecentSearches([]);
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
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] flex items-center gap-1 cursor-pointer transition"
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
                    className="group flex items-center justify-between p-1.5 pr-2 rounded-xl bg-[var(--bg-wash)] hover:bg-[var(--header-hover-bg)] border border-transparent hover:border-[var(--header-dropdown-border)] transition cursor-pointer"
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
                      className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] opacity-70 group-hover:opacity-100 transition cursor-pointer"
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
        className="absolute left-0 right-0 top-full mt-2 bg-[var(--header-dropdown-bg)] text-[var(--header-text)] rounded-2xl shadow-2xl border border-[var(--header-dropdown-border)] overflow-hidden z-50 animate-fade-in max-h-[78vh] overflow-y-auto overscroll-contain"
      >
        {/* Keyword Search Suggestions */}
        <div className="px-3 sm:px-6 py-2.5 border-b border-[var(--header-border)]">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--header-text-muted)] flex items-center justify-between">
            <span>Search Pinterest Book Feed</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSuggestionsOpen(false);
              }}
              aria-label="Close search suggestions"
              className="px-2 py-0.5 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--header-hover-bg)] flex items-center gap-1 cursor-pointer transition"
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
              className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] flex items-center justify-between gap-2 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Search className="w-3.5 h-3.5 text-[#F1641E] shrink-0" />
                <span className="truncate font-medium">{qText}</span>
              </div>
              <span className="text-[11px] text-[var(--header-text-muted)] shrink-0">
                Search all &rarr;
              </span>
            </button>
          ))}
        </div>

        {/* Category Matches */}
        {autocompleteData.categoryMatches.length > 0 && (
          <div className="px-3 sm:px-6 py-2.5 border-b border-[var(--header-border)] bg-[var(--bg-wash)]/40">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--header-text-muted)]">
              Categories
            </div>
            <div className="flex flex-wrap gap-1.5 p-1.5">
              {autocompleteData.categoryMatches.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className="px-2.5 py-1 rounded-full text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#F1641E] text-[var(--text-main)] hover:text-[#F1641E] transition cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Direct Book Matches */}
        <div className="px-3 sm:px-6 py-2.5">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--header-text-muted)] flex items-center justify-between">
            <span>Books & Manuscripts ({autocompleteData.bookMatches.length})</span>
            {autocompleteData.bookMatches.length > 0 && (
              <button
                type="button"
                onClick={() => handleSearchSubmit(localSearch)}
                className="text-[#F1641E] hover:underline normal-case text-[11px] font-semibold"
              >
                View all results
              </button>
            )}
          </div>

          {autocompleteData.bookMatches.length === 0 ? (
            <div className="p-4 text-center text-xs text-[var(--header-text-muted)]">
              No direct book matches found for &quot;{localSearch}&quot;. Press Enter to explore broad keyword results.
            </div>
          ) : (
            <div className="space-y-1">
              {autocompleteData.bookMatches.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookSuggestionClick(book.id, book.title)}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-9 h-12 object-cover rounded-md shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-[var(--header-text)] truncate group-hover:text-[#F1641E] transition-colors">
                        {book.title}
                      </p>
                      <p className="text-[11px] text-[var(--header-text-muted)] truncate">
                        {book.category} • {book.author}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--header-text-muted)]">
                        <span className="inline-flex items-center text-amber-500 font-semibold">
                          <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                          {book.rating}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-[var(--header-text)]">
                          Rs. {book.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[var(--header-text-muted)] group-hover:text-[#F1641E] shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
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

  const renderNotificationsDropdown = () => {
    if (!notificationsOpen) return null;
    const offerBook1 = BOOKS[0];
    const offerBook2 = BOOKS[1] || BOOKS[0];

    return (
      <div
        role="dialog"
        aria-label="Deals and Notifications"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-full mt-3 w-[310px] sm:w-[356px] bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-[0_14px_44px_rgba(0,0,0,0.22)] border border-[var(--border-subtle)] z-50 animate-fade-in select-none"
      >
        {/* Top Upward Diamond Caret Pointer */}
        <div className="absolute -top-2 right-6 w-4 h-4 rotate-45 bg-[var(--bg-card)] border-l border-t border-[var(--border-subtle)] pointer-events-none" />

        {/* Centered "Deals" Title */}
        <div className="py-3.5 px-4 text-center bg-[var(--bg-card)] rounded-t-2xl">
          <h3 className="text-sm font-bold text-[var(--text-main)]">Deals</h3>
        </div>

        {/* "Seen" Divider Pill + Notification Items */}
        <div className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-wash)]/75 rounded-b-2xl pt-5 pb-4 px-4 space-y-5 max-h-[72vh] overflow-y-auto">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-main)] shadow-2xs">
            Seen
          </span>

          {/* Deal Notification 1 */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5">
              <Tag className="w-3.5 h-3.5 fill-current" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs sm:text-[13px] text-[var(--text-main)] leading-snug">
                  Royal Kandy Scriptorium sent an offer for an item you left in your bag.
                </p>
                <span className="text-xs text-[var(--text-muted)] shrink-0">3d</span>
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

              <p className="text-xs sm:text-[13px] font-extrabold text-[#15803d] dark:text-emerald-400">
                30% off with code SHASTRA30
              </p>

              <button
                type="button"
                onClick={() => handleApplyDealCoupon(0, 'SHASTRA30', '30% off')}
                className="mt-2 px-4 py-2 rounded-full bg-[#222222] dark:bg-white text-white dark:text-[#222222] text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer"
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

          {/* Deal Notification 2 */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5">
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

              <p className="text-xs sm:text-[13px] font-extrabold text-[#15803d] dark:text-emerald-400">
                25% off with code PALMLEAF500
              </p>

              <button
                type="button"
                onClick={() => handleApplyDealCoupon(1, 'PALMLEAF500', '25% off')}
                className="mt-2 px-4 py-2 rounded-full bg-[#222222] dark:bg-white text-white dark:text-[#222222] text-xs font-bold hover:opacity-90 active:scale-95 transition cursor-pointer"
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
        </div>
      </div>
    );
  };

  const renderProfileDropdown = () => {
    if (!profileMenuOpen) return null;
    const displayName = user?.name || 'Sadew Nethsara';
    const userInitial = displayName.charAt(0).toUpperCase();

    return (
      <div
        role="menu"
        aria-label="Account navigation"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-full mt-3 w-[275px] sm:w-[295px] bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl shadow-[0_14px_44px_rgba(0,0,0,0.22)] border border-[var(--border-subtle)] z-50 animate-fade-in select-none"
      >
        {/* Top Upward Caret Pointer */}
        <div className="absolute -top-2 right-5 w-4 h-4 rotate-45 bg-[var(--bg-card)] border-l border-t border-[var(--border-subtle)] pointer-events-none" />

        <div className="pt-2 pb-1.5 overflow-hidden rounded-2xl">
          {/* Profile Header Row with Blue Top/Bottom Accent Border (Matching Reference Screenshot) */}
          <Link
            href="/profile"
            onClick={() => setProfileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 border-y-2 border-[#3b82f6] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] transition"
          >
            <span className="w-8 h-8 rounded-full bg-[#606c38] text-white text-xs font-bold flex items-center justify-center shrink-0">
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
              href="/offers"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition"
            >
              <Tag className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0" />
              <span>Special offers</span>
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
          } z-40 border-b border-[var(--header-border)] text-[var(--header-text)] transition-colors duration-200 w-full max-w-full`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full box-border">
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
                className="text-[var(--color-primary)] text-[34px] leading-none font-bold tracking-tight transition-transform group-hover:scale-102 font-heading"
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

              {/* Categories 2-Column Visual Mega-Menu (Matching Etsy Reference) */}
              <CategoriesMegaMenu
                isOpen={categoriesOpen}
                onClose={() => setCategoriesOpen(false)}
              />
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
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-300" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--header-text)]" />
                )}
              </button>

              {/* Favorites / Saved Reading List */}
              <Link
                href="/wishlist"
                aria-label="Saved Favorites & Collections"
                className="relative p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title="Favorite Treatises"
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-[var(--header-badge-fav-bg)] text-[var(--header-badge-text)] text-[10px] font-bold flex items-center justify-center leading-none">
                    {totalFavorites}
                  </span>
                )}
              </Link>

              {/* Notifications / Deals Bell Dropdown */}
              <div className="relative" ref={desktopNotificationsRef}>
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
                      ? 'bg-[#dbeafe] dark:bg-blue-950/60 text-[#1e3a8a] dark:text-blue-200 ring-2 ring-[#3b82f6]/60'
                      : 'hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]'
                  }`}
                  title="Deals & Notifications"
                >
                  <div className="relative">
                    <Bell className="w-5 h-5 fill-current" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#e60023]" />
                  </div>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {renderNotificationsDropdown()}
              </div>

              {/* Publishers / Scriptorium Icon (Matching Storefront Icon in Reference) */}
              <Link
                href="/publishers"
                aria-label="Publishers & Scriptoriums"
                className="p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title="Publishers & Scriptoriums"
              >
                <Store className="w-5 h-5" />
              </Link>

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
                        ? 'bg-[#dbeafe] dark:bg-blue-950/60 text-[#1e3a8a] dark:text-blue-200 ring-2 ring-[#3b82f6]/60'
                        : 'hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]'
                    }`}
                    title={user?.name || 'Your Profile'}
                  >
                    <span className="w-7 h-7 rounded-full bg-[#606c38] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {(user?.name || 'S').charAt(0).toUpperCase()}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {renderProfileDropdown()}
                </div>
              )}

              {/* Highlighted Shopping Bag Button -> Navigates to Bag Page */}
              <Link
                href="/bag"
                aria-label="Shopping Bag"
                className="h-10 px-4 rounded-full flex items-center gap-2 bg-[var(--bag-btn-bg)] hover:bg-[var(--bag-btn-hover-bg)] border-2 border-[var(--bag-btn-border)] hover:border-[var(--bag-btn-hover-border)] transition-all cursor-pointer shadow-xs active:scale-95 group ml-1"
                title="Shopping Bag"
              >
                <div className="relative flex items-center justify-center">
                  <Handbag className="w-4.5 h-4.5 transition-transform group-hover:scale-110 text-[var(--bag-btn-text)] group-hover:text-[var(--color-primary)]" />
                  {bagCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[var(--header-badge-bag-bg)] text-[var(--header-badge-text)] text-[10px] font-bold flex items-center justify-center shadow-xs leading-none">
                      {bagCount}
                    </span>
                  )}
                </div>
                <span className="font-bold text-sm tracking-tight transition-colors text-[var(--bag-btn-text)] group-hover:text-[var(--color-primary)]">
                  Bag
                </span>
              </Link>
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
                  <Gift className="w-3.5 h-3.5 text-[var(--color-primary)]" />
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
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => {
                  setSearchQuery('');
                  setLocalSearch('');
                }}
                className="text-[var(--color-primary)] text-[22px] sm:text-[24px] leading-none font-bold tracking-tight select-none font-heading shrink-0"
              >
                Shastraloka
              </Link>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Mobile/Tablet Notifications Bell Dropdown */}
                <div className="relative" ref={mobileNotificationsRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setProfileMenuOpen(false);
                    }}
                    aria-label="Deals and Notifications"
                    aria-expanded={notificationsOpen}
                    className={`h-9 px-2.5 rounded-full flex items-center gap-1 transition cursor-pointer ${
                      notificationsOpen
                        ? 'bg-[#dbeafe] dark:bg-blue-950/60 text-[#1e3a8a] dark:text-blue-200 ring-2 ring-[#3b82f6]/60'
                        : 'hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]'
                    }`}
                  >
                    <div className="relative">
                      <Bell className="w-4.5 h-4.5 fill-current" />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#e60023]" />
                    </div>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {renderNotificationsDropdown()}
                </div>

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
                  /* If user IS signed in: show Profile Avatar Pill + Dropdown Box */
                  <div className="relative" ref={mobileProfileRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(!profileMenuOpen);
                        setNotificationsOpen(false);
                      }}
                      aria-label="Account menu"
                      aria-expanded={profileMenuOpen}
                      className={`h-9 px-2 rounded-full flex items-center gap-1 transition cursor-pointer ${
                        profileMenuOpen
                          ? 'bg-[#dbeafe] dark:bg-blue-950/60 text-[#1e3a8a] dark:text-blue-200 ring-2 ring-[#3b82f6]/60'
                          : 'bg-[var(--bag-btn-bg)] border-2 border-[var(--bag-btn-border)] text-[var(--bag-btn-text)]'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-[#606c38] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {(user?.name || 'S').charAt(0).toUpperCase()}
                      </span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {renderProfileDropdown()}
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
                      <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[var(--header-badge-bag-bg)] text-[var(--header-badge-text)] text-[9px] font-bold flex items-center justify-center leading-none">
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
                    <Menu className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-xs font-medium">Categories</span>
                  </button>

                  {/* Tablet Categories 2-Column Visual Mega-Menu (md to lg) */}
                  <div className="hidden md:block">
                    <CategoriesMegaMenu
                      isOpen={categoriesOpen}
                      onClose={() => setCategoriesOpen(false)}
                    />
                  </div>
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
      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </>
  );
}
