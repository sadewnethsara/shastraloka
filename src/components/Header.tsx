'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/books';
import { SearchField } from './ui/SearchField';

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
  const {
    isDark,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    bagCount,
    setIsBagOpen,
    boards,
    setIsBoardsModalOpen,
    setSelectedCategory,
  } = useApp();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const categoriesRef = useRef<HTMLDivElement>(null);

  const totalFavorites = boards.reduce((acc, b) => acc + b.bookIds.length, 0);

  // Sync local search with global search
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

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
    setSearchQuery(q);
    setMobileMenuOpen(false);
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
    if (category === 'All Treatises') {
      router.push('/');
    } else {
      router.push(`/search?q=${encodeURIComponent(category)}`);
    }
  };

  return (
    <>
      <header
        className={`${isSticky
            ? 'sticky top-0 backdrop-blur-md bg-white/95 dark:bg-[#151518]/95'
            : 'relative bg-white dark:bg-[#151518]'
          } z-40 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200`}
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
                className="text-[#F1641E] text-[34px] leading-none font-bold tracking-tight transition-transform group-hover:scale-102"
                style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                Shastraloka
              </span>
              <span className="text-[10px] text-neutral-500 font-sinhala tracking-wider pl-0.5">
                ශාස්ත්‍රලෝක • Classical Bookstore
              </span>
            </Link>

            {/* Categories Dropdown Trigger */}
            <div className="relative" ref={categoriesRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <Menu className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${categoriesOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Categories Menu */}
              {categoriesOpen && (
                <div className="absolute left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white dark:bg-[#1a1a20] rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Sacred Classifications
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between transition cursor-pointer"
                    >
                      <span className="truncate">{cat}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input Bar with Orange Pill Button */}
            <div className="flex-1 max-w-2xl">
              <SearchField
                value={localSearch}
                onChange={setLocalSearch}
                onSubmit={handleSearchSubmit}
                placeholder="Search sacred manuscripts, Mahavamsa, Ayurveda..."
                accessibilityLabel="Search sacred manuscripts"
                submitButtonColor="orange"
                size="md"
              />
            </div>

            {/* Right User Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-300" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>

              {/* Sign in link */}
              <Link
                href="/profile"
                className="px-3 py-1.5 rounded-full text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Sign in
              </Link>

              {/* Profile Icon Link */}
              <Link
                href="/profile"
                aria-label="User Profile"
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                title="Account & Profile"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Favorites / Saved Boards */}
              <button
                type="button"
                onClick={() => setIsBoardsModalOpen(true)}
                aria-label="Saved Boards & Favorites"
                className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                title="Saved Treatises"
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#F1641E] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {totalFavorites}
                  </span>
                )}
              </button>

              {/* Gifts Icon Link */}
              <Link
                href="/search?q=Gifts"
                aria-label="Gift Collections"
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition"
                title="Gift Sets"
              >
                <Gift className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
              </Link>

              {/* Highlighted Shopping Bag Button with "Bag" Text */}
              <button
                type="button"
                onClick={() => setIsBagOpen(true)}
                aria-label="Shopping Bag"
                className="relative flex items-center gap-2 h-10 px-3.5 sm:px-4 rounded-full font-bold text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-[#F1641E]/10 border-2 border-[#F1641E]/40 hover:border-[#F1641E] text-neutral-900 dark:text-neutral-100 transition-all duration-150 cursor-pointer shadow-xs active:scale-95 group"
                title="View Shopping Bag"
              >
                <div className="relative flex items-center justify-center">
                  <Handbag className="w-5 h-5 text-neutral-900 dark:text-neutral-100 group-hover:text-[#F1641E] transition-colors" />
                  {bagCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#e60023] text-white text-[10px] font-bold flex items-center justify-center shadow-xs leading-none">
                      {bagCount}
                    </span>
                  )}
                </div>
                <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-[#F1641E] transition-colors">
                  Bag
                </span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              DESKTOP SUB-NAVIGATION ROW
             ===================================================================== */}
          <nav className="hidden lg:flex items-center justify-center gap-7 pb-2.5 pt-0.5 text-[13px] font-medium text-neutral-800 dark:text-neutral-200">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSearchSubmit(item.query)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                {item.hasIcon && (
                  <Gift className="w-3.5 h-3.5 text-[#F1641E]" />
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
                className="text-[#F1641E] text-[26px] leading-none font-bold tracking-tight select-none"
                style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                Shastraloka
              </Link>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  )}
                </button>

                <Link
                  href="/profile"
                  className="px-2 py-1 rounded-full text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Sign in
                </Link>

                <Link
                  href="/profile"
                  aria-label="Profile"
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  title="Profile"
                >
                  <User className="w-4.5 h-4.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsBoardsModalOpen(true)}
                  aria-label="Favorites"
                  className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  <Heart className="w-4.5 h-4.5" />
                  {totalFavorites > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#F1641E] text-white text-[9px] font-bold flex items-center justify-center">
                      {totalFavorites}
                    </span>
                  )}
                </button>

                {/* Highlighted Mobile Shopping Bag Button with "Bag" Text */}
                <button
                  type="button"
                  onClick={() => setIsBagOpen(true)}
                  aria-label="Shopping Bag"
                  className="h-9 px-2.5 sm:px-3 rounded-full flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 border-2 border-[#F1641E]/40 text-neutral-900 dark:text-neutral-100 font-bold text-xs shadow-xs active:scale-95 transition cursor-pointer"
                  title="Shopping Bag"
                >
                  <div className="relative flex items-center justify-center">
                    <Handbag className="w-4 h-4" />
                    {bagCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#e60023] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                        {bagCount}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-xs">Bag</span>
                </button>
              </div>
            </div>

            {/* Row 2: Hamburger Menu Button + Rounded Search Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shrink-0 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <SearchField
                  value={localSearch}
                  onChange={setLocalSearch}
                  onSubmit={handleSearchSubmit}
                  placeholder="Search sacred manuscripts..."
                  accessibilityLabel="Search manuscripts"
                  submitButtonColor="orange"
                  size="sm"
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
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-[#1a1a20] h-full z-10 flex flex-col shadow-2xl animate-slideRight">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <span
                className="text-[#F1641E] text-2xl font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Browse Shastraloka
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3">
              <div className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Featured Collections
              </div>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleSearchSubmit(link.query)}
                  className="w-full text-left px-5 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition"
                >
                  {link.hasIcon && (
                    <Gift className="w-4 h-4 text-[#F1641E]" />
                  )}
                  <span>{link.label}</span>
                </button>
              ))}

              <div className="px-5 pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                All Sacred Categories
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className="w-full text-left px-5 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between transition"
                >
                  <span className="truncate">{cat}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
