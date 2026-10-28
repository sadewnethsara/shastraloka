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
  BookOpen,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/books';
import { SearchBar } from './SearchBar';
import VisualSearchModal from './VisualSearchModal';

export interface RecentSearchData {
  id: string;
  label: string;
  thumbType?: 'mahavamsa' | 'visuddhimagga' | 'dhammapada' | 'ayurveda' | 'default';
  image?: string;
}

export const INITIAL_RECENT_SEARCHES: RecentSearchData[] = [
  {
    id: 'rs-1',
    label: 'Mahavamsa Great Chronicle',
    thumbType: 'mahavamsa',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-2',
    label: 'Theravada Buddhist Philosophy',
    thumbType: 'visuddhimagga',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-3',
    label: 'Indigenous Ayurvedic Herbs',
    thumbType: 'ayurveda',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-4',
    label: 'Ola Leaf Manuscripts',
    thumbType: 'default',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rs-5',
    label: 'Dhammapada Pali Verses',
    thumbType: 'dhammapada',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=120&q=80',
  },
];

function RecentSearchThumb({ image }: { type?: string; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt="Search thumbnail"
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

export const NAV_LINKS = [
  { label: 'Gifts', hasIcon: true, query: 'Gifts' },
  { label: 'Ancient Chronicles', hasIcon: false, query: 'Chronicles' },
  { label: 'Buddhist Philosophy', hasIcon: false, query: 'Buddhist' },
  { label: 'Sinhala Poetry', hasIcon: false, query: 'Poetry' },
  { label: 'Ayurvedic Texts', hasIcon: false, query: 'Ayurveda' },
  { label: 'Palm Leaf Collections', hasIcon: false, query: 'Manuscript' },
  { label: 'Best Sellers', hasIcon: false, query: 'Mahavamsa' },
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
    bag,
    bagCount,
    boards,
    setIsBoardsModalOpen,
    setSelectedCategory,
    triggerNavigation,
    searchQuery,
    setSearchQuery,
    showToast,
  } = useApp();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>(INITIAL_RECENT_SEARCHES);

  const categoriesRef = useRef<HTMLDivElement>(null);

  const totalFavorites = boards.reduce((acc, b) => acc + b.bookIds.length, 0);

  // Sync localSearch when global search query changes
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  // Trigger navigation logic on route changes
  useEffect(() => {
    triggerNavigation();
  }, [pathname, triggerNavigation]);

  // Close categories dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (queryText: string) => {
    const q = queryText.trim();
    setLocalSearch(q);
    setSearchQuery(q);
    setMobileMenuOpen(false);
    triggerNavigation();
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
    triggerNavigation();
    if (category === 'All Treatises') {
      router.push('/');
    } else {
      router.push(`/search?q=${encodeURIComponent(category)}`);
    }
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

            {/* Search Input Bar with Modern SearchBar & Recent Searches */}
            <div className="flex-1 max-w-2xl">
              <SearchBar
                value={localSearch}
                onChange={setLocalSearch}
                onSubmit={handleSearchSubmit}
                placeholder="Search sacred manuscripts, Mahavamsa, Ayurveda..."
                recentSearches={recentSearches.map((r: RecentSearchData) => ({
                  id: r.id,
                  label: r.label,
                  thumbnail: <RecentSearchThumb type={r.thumbType} image={r.image} />,
                }))}
                onRemoveRecent={(id: string) =>
                  setRecentSearches((prev: RecentSearchData[]) => prev.filter((r: RecentSearchData) => r.id !== id))
                }
                onRestoreRecent={() => setRecentSearches(INITIAL_RECENT_SEARCHES)}
                onImageSearchClick={() => setIsVisualSearchOpen(true)}
              />
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

              {/* Sign in link */}
              <Link
                href="/profile"
                className="px-3 py-1.5 rounded-full text-sm font-medium text-[var(--header-text)] hover:bg-[var(--header-hover-bg)] transition"
              >
                Sign in
              </Link>

              {/* Profile Icon Link */}
              <Link
                href="/profile"
                aria-label="User Profile"
                className="p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title="Account & Profile"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Favorites / Saved Boards */}
              <button
                type="button"
                onClick={() => setIsBoardsModalOpen(true)}
                aria-label="Saved Boards & Favorites"
                className="relative p-2.5 rounded-full hover:bg-[var(--header-hover-bg)] text-[var(--header-text)] transition cursor-pointer"
                title="Saved Treatises"
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[var(--header-badge-fav-bg)] text-[var(--header-badge-text)] text-[10px] font-bold flex items-center justify-center leading-none shadow-xs">
                    {totalFavorites}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button - Simple link to /bag */}
              <Link
                href="/bag"
                aria-label="Shopping Bag"
                className="relative flex items-center gap-2 h-10 px-3.5 sm:px-4 rounded-full font-bold text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-95 group bg-[var(--bag-btn-bg)] hover:bg-[var(--bag-btn-hover-bg)] border-2 border-[var(--bag-btn-border)] hover:border-[var(--bag-btn-hover-border)] text-[var(--bag-btn-text)]"
                title="View Shopping Bag"
              >
                <div className="relative flex items-center justify-center">
                  <Handbag className="w-5 h-5 transition-colors text-[var(--bag-btn-text)] group-hover:text-[var(--color-primary)]" />
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
                className="text-[var(--color-primary)] text-[26px] leading-none font-bold tracking-tight select-none font-serif"
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

              <div className="order-3 sm:order-2 w-full sm:w-auto sm:flex-1 min-w-0">
                <SearchBar
                  value={localSearch}
                  onChange={setLocalSearch}
                  onSubmit={handleSearchSubmit}
                  placeholder="Search sacred manuscripts..."
                  recentSearches={recentSearches.map((r: RecentSearchData) => ({
                    id: r.id,
                    label: r.label,
                    thumbnail: <RecentSearchThumb type={r.thumbType} image={r.image} />,
                  }))}
                  onRemoveRecent={(id: string) =>
                    setRecentSearches((prev: RecentSearchData[]) => prev.filter((r: RecentSearchData) => r.id !== id))
                  }
                  onRestoreRecent={() => setRecentSearches(INITIAL_RECENT_SEARCHES)}
                  onImageSearchClick={() => setIsVisualSearchOpen(true)}
                />
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
