'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/books';
import { SearchField } from './ui/SearchField';
import {
  IconSearch,
  IconHeart,
  IconBag,
  IconSun,
  IconMoon,
  IconUser,
} from './Icons';

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
    cartCount,
    setIsCartOpen,
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
        className={`${
          isSticky
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
                <svg
                  className="w-4 h-4 text-neutral-800 dark:text-neutral-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span>Categories</span>
                <svg
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${
                    categoriesOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
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
                      <svg
                        className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
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
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? <IconSun size={19} /> : <IconMoon size={19} />}
              </button>

              {/* Sign in link */}
              <Link
                href="/profile"
                className="px-3.5 py-2 rounded-full text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
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
                <IconUser size={20} />
              </Link>

              {/* Favorites / Saved Boards */}
              <button
                type="button"
                onClick={() => setIsBoardsModalOpen(true)}
                aria-label="Saved Boards & Favorites"
                className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                title="Saved Treatises"
              >
                <IconHeart size={20} />
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
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Bag"
                className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                title="Shopping Bag"
              >
                <IconBag size={21} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#F1641E] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
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
                  <svg
                    className="w-3.5 h-3.5 text-[#F1641E]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
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

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  {isDark ? <IconSun size={17} /> : <IconMoon size={17} />}
                </button>

                <Link
                  href="/profile"
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Sign in
                </Link>

                <Link
                  href="/profile"
                  aria-label="Profile"
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  title="Profile"
                >
                  <IconUser size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsBoardsModalOpen(true)}
                  aria-label="Favorites"
                  className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  <IconHeart size={18} />
                  {totalFavorites > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#F1641E] text-white text-[9px] font-bold flex items-center justify-center">
                      {totalFavorites}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Shopping Bag"
                  className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  title="Shopping Bag"
                >
                  <IconBag size={19} />
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#F1641E] text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
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
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
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
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
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
                    <svg
                      className="w-4 h-4 text-[#F1641E]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                    </svg>
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
                  <svg
                    className="w-4 h-4 text-neutral-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
