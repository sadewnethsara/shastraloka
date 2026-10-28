'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  ChevronDown,
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
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, BOOKS } from '../data/books';
import { getAutocompleteSuggestions } from '../utils/searchEngine';
import { SearchField } from './ui/SearchField';
import VisualSearchModal from './VisualSearchModal';

export const NAV_LINKS = [
  { label: 'Gifts', hasIcon: true, query: 'Gifts' },
  { label: 'Ancient Chronicles', hasIcon: false, query: 'Chronicles' },
  { label: 'Buddhist Philosophy', hasIcon: false, query: 'Buddhist' },
  { label: 'Sinhala Poetry', hasIcon: false, query: 'Poetry' },
  { label: 'Ayurvedic Texts', hasIcon: false, query: 'Ayurveda' },
  { label: 'Palm Leaf Collections', hasIcon: false, query: 'Manuscript' },
  { label: 'Best Sellers', hasIcon: false, query: 'Mahavamsa' },
];

export interface RecentSearchData {
  id: string;
  label: string;
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
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=120&q=80',
  },
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
  } = useApp();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>(INITIAL_RECENT_SEARCHES);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalSearch(searchQuery || '');
  }

  const categoriesRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const totalFavorites = boards.reduce((acc, b) => acc + b.bookIds.length, 0);
  const autocompleteData = React.useMemo(
    () => getAutocompleteSuggestions(localSearch, BOOKS),
    [localSearch]
  );

  // Trigger navigation logic on route changes
  useEffect(() => {
    triggerNavigation();
  }, [pathname, triggerNavigation]);

  // Close categories and search suggestions dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
      const inDesktopSearch =
        desktopSearchRef.current &&
        desktopSearchRef.current.contains(event.target as Node);
      const inMobileSearch =
        mobileSearchRef.current &&
        mobileSearchRef.current.contains(event.target as Node);
      if (!inDesktopSearch && !inMobileSearch) {
        setSuggestionsOpen(false);
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
    setMobileMenuOpen(false);
    setLocalSearch(title);
    triggerNavigation();
    router.push(`/books/${bookId}`);
  };

  const handleSearchSubmit = (queryText: string) => {
    const q = queryText.trim();
    setSearchQuery(q);
    setLocalSearch(q);
    setSuggestionsOpen(false);
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
    triggerNavigation(); // Trigger navigation detection
    if (category === 'All Treatises') {
      router.push('/search');
    } else {
      router.push(`/search?category=${encodeURIComponent(category)}&q=${encodeURIComponent(category)}`);
    }
  };

  const renderAutocompleteDropdown = () => {
    if (!suggestionsOpen) return null;

    // STATE A: Empty Search Query -> Show Recent Searches & Trending Topics on Click
    if (!localSearch.trim()) {
      return (
        <div
          data-testid="search-autocomplete-dropdown"
          className="absolute left-0 right-0 top-full mt-2 bg-[var(--header-dropdown-bg)] text-[var(--header-text)] rounded-2xl shadow-2xl border border-[var(--header-dropdown-border)] overflow-hidden z-50 animate-fade-in max-h-[78vh] overflow-y-auto"
        >
          {/* Recent Searches */}
          <div className="p-3.5 sm:p-4 border-b border-[var(--header-border)]">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--header-text-muted)] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Recent Searches</span>
              </span>
              <div className="flex items-center gap-3">
                {recentSearches.length < INITIAL_RECENT_SEARCHES.length && (
                  <button
                    type="button"
                    onClick={() => setRecentSearches(INITIAL_RECENT_SEARCHES)}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                  >
                    Restore
                  </button>
                )}
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setRecentSearches([])}
                    className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSuggestionsOpen(false)}
                  className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {recentSearches.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-3 text-center">
                No recent searches. Type above or explore trending topics below.
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

          {/* Trending Treatises & Topics */}
          <div className="p-3.5 sm:p-4 bg-[var(--bg-wash)]/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--header-text-muted)] mb-2 px-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Trending Classical Treatises</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Mahavamsa Great Chronicle',
                'Gajaga Wannama',
                'Indigenous Ayurveda',
                'Visuddhimagga',
                'Ola Leaf Manuscripts',
                'Classical Sinhala Poetry',
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSearchSubmit(term)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] text-[var(--text-main)] hover:text-[var(--color-primary)] transition cursor-pointer shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // STATE B: Search Query Typed -> Show Dynamic Predictions, Categories & Book Matches
    return (
      <div
        data-testid="search-autocomplete-dropdown"
        className="absolute left-0 right-0 top-full mt-2 bg-[var(--header-dropdown-bg)] text-[var(--header-text)] rounded-2xl shadow-2xl border border-[var(--header-dropdown-border)] overflow-hidden z-50 animate-fade-in max-h-[78vh] overflow-y-auto"
      >
        {/* Keyword Search Suggestions */}
        <div className="p-2 border-b border-[var(--header-border)]">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--header-text-muted)] flex items-center justify-between">
            <span>Search Pinterest Book Feed</span>
            <span>Press Enter</span>
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
          <div className="p-2 border-b border-[var(--header-border)] bg-[var(--bg-wash)]/40">
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
        <div className="p-2">
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
                        {book.sinhalaTitle} • {book.author}
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

  return (
    <>
      <header
        className={`${
          isSticky
            ? 'sticky top-0 backdrop-blur-md bg-[var(--header-bg-glass)]'
            : 'relative bg-[var(--header-bg)]'
        } z-40 border-b border-[var(--header-border)] text-[var(--header-text)] transition-colors duration-200`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
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
                className="text-[var(--color-primary)] text-[34px] leading-none font-bold tracking-tight transition-transform group-hover:scale-102 font-serif"
              >
                Shastraloka
              </span>
              <span className="text-[10px] text-[var(--header-text-muted)] font-sinhala tracking-wider pl-0.5">
                ශාස්ත්‍රලෝක • Classical Bookstore
              </span>
            </Link>

            {/* Categories Dropdown Trigger */}
            <div className="relative" ref={categoriesRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
              >
                <Menu className="w-4 h-4 text-[var(--header-text)]" />
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[var(--header-text-muted)] transition-transform ${
                    categoriesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Categories Menu */}
              {categoriesOpen && (
                <div className="absolute left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-[var(--header-dropdown-bg)] text-[var(--header-text)] rounded-2xl shadow-xl border border-[var(--header-dropdown-border)] py-2 z-50 animate-fade-in">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--header-text-muted)]">
                    All Categories
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full text-left px-4 py-2 text-sm text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] flex items-center justify-between transition cursor-pointer"
                    >
                      <span className="truncate">{cat}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--header-text-muted)] shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input Bar with Orange Pill Button */}
            <div
              className="relative flex-1 max-w-2xl"
              ref={desktopSearchRef}
              onClick={handleSearchFocus}
              onFocusCapture={handleSearchFocus}
            >
              <SearchField
                value={localSearch}
                onChange={handleSearchInputChange}
                onSubmit={handleSearchSubmit}
                onClear={() => {
                  setLocalSearch('');
                  setSuggestionsOpen(true);
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
            <div className="flex items-center gap-2 shrink-0">
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

              {/* Sign in Button */}
              <Link
                href="/profile"
                className="px-3.5 py-2 rounded-full text-sm font-semibold text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition cursor-pointer"
              >
                Sign in
              </Link>

              {/* User Profile */}
              <Link
                href="/profile"
                aria-label="Profile"
                className="p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title="Profile"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Favorites (Heart) Icon with Badge */}
              <button
                type="button"
                onClick={() => setIsBoardsModalOpen(true)}
                aria-label="Favorites"
                className="relative p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title="Boards & Saved Books"
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-[var(--header-badge-fav-bg)] text-[var(--header-badge-text)] text-[10px] font-bold flex items-center justify-center leading-none">
                    {totalFavorites}
                  </span>
                )}
              </button>

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
          <nav className="hidden lg:flex items-center justify-center gap-7 pb-2.5 pt-0.5 text-[13px] font-medium text-[var(--header-text)]">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSearchSubmit(item.query)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
              >
                {item.hasIcon && (
                  <Gift className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* =====================================================================
              TABLET & MOBILE HEADER (< lg)
             ===================================================================== */}
          <div className="lg:hidden py-2.5 space-y-2">
            {/* Row 1: Logo on Left, Actions on Right */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => {
                  setSearchQuery('');
                  setLocalSearch('');
                }}
                className="text-[var(--color-primary)] text-[24px] sm:text-[26px] leading-none font-bold tracking-tight select-none font-serif shrink-0"
              >
                Shastraloka
              </Link>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-[var(--header-text)]" />
                  )}
                </button>

                <Link
                  href="/profile"
                  className="px-2 py-1 rounded-full text-xs font-semibold text-[var(--header-text)] hover:bg-[var(--header-hover-bg)]"
                >
                  Sign in
                </Link>

                <Link
                  href="/profile"
                  aria-label="Profile"
                  className="p-1.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]"
                  title="Profile"
                >
                  <User className="w-4.5 h-4.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsBoardsModalOpen(true)}
                  aria-label="Favorites"
                  className="relative p-2 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)]"
                >
                  <Heart className="w-4.5 h-4.5" />
                  {totalFavorites > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[var(--header-badge-fav-bg)] text-[var(--header-badge-text)] text-[9px] font-bold flex items-center justify-center leading-none">
                      {totalFavorites}
                    </span>
                  )}
                </button>

                {/* Highlighted Mobile Shopping Bag Button -> Go to Bag Page */}
                <Link
                  href="/bag"
                  aria-label="Shopping Bag"
                  className="h-9 px-2.5 sm:px-3 rounded-full flex items-center gap-1.5 bg-[var(--bag-btn-bg)] border-2 border-[var(--bag-btn-border)] text-[var(--bag-btn-text)] font-bold text-xs shadow-xs active:scale-95 transition cursor-pointer"
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
                </Link>
              </div>
            </div>

            {/* Row 2: Hamburger Menu Button + Rounded Search Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-2 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] shrink-0 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div
                className="relative flex-1"
                ref={mobileSearchRef}
                onClick={handleSearchFocus}
                onFocusCapture={handleSearchFocus}
              >
                <SearchField
                  value={localSearch}
                  onChange={handleSearchInputChange}
                  onSubmit={handleSearchSubmit}
                  onClear={() => {
                    setLocalSearch('');
                    setSuggestionsOpen(true);
                  }}
                  onFocus={handleSearchFocus}
                  onClick={handleSearchFocus}
                  onImageSearchClick={() => setIsVisualSearchOpen(true)}
                  placeholder="Search Gajaga, Mahavamsa, Ayurveda..."
                  accessibilityLabel="Search manuscripts"
                  submitButtonColor="orange"
                  size="sm"
                />
                {renderAutocompleteDropdown()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MOBILE DRAWER MENU (Etsy style slide-out)
         ===================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fade-in">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-[var(--header-mobile-drawer-bg)] text-[var(--header-text)] h-full z-10 flex flex-col shadow-2xl animate-slide-up border-r border-[var(--header-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--header-border)]">
              <span
                className="text-[var(--color-primary)] text-2xl font-bold font-serif"
              >
                Browse Shastraloka
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3">
              <div className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--header-text-muted)]">
                Featured Collections
              </div>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleSearchSubmit(link.query)}
                  className="w-full text-left px-5 py-2.5 text-sm font-medium text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] flex items-center gap-2.5 transition"
                >
                  {link.hasIcon && (
                    <Gift className="w-4 h-4 text-[var(--color-primary)]" />
                  )}
                  <span>{link.label}</span>
                </button>
              ))}

              <div className="px-5 pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-[var(--header-text-muted)]">
                All Sacred Categories
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className="w-full text-left px-5 py-2.5 text-sm text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] flex items-center justify-between transition"
                >
                  <span className="truncate">{cat}</span>
                  <ChevronRight className="w-4 h-4 text-[var(--header-text-muted)] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </>
  );
}
