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
    bag,
    bagCount,
    bagTotal,
    usdBagTotal,
    boards,
    setIsBoardsModalOpen,
    setSelectedCategory,
  } = useApp();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bagDropdownOpen, setBagDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const categoriesRef = useRef<HTMLDivElement>(null);
  const bagDropdownRef = useRef<HTMLDivElement>(null);

  const totalFavorites = boards.reduce((acc, b) => acc + b.bookIds.length, 0);

  // Sync local search with global search
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  // Close categories and bag dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
      if (
        bagDropdownRef.current &&
        !bagDropdownRef.current.contains(event.target as Node)
      ) {
        setBagDropdownOpen(false);
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

              {/* Highlighted Shopping Bag Button with Etsy Dropdown Popover */}
              <div className="relative" ref={bagDropdownRef}>
                <button
                  type="button"
                  onClick={() => setBagDropdownOpen((prev) => !prev)}
                  onMouseEnter={() => setBagDropdownOpen(true)}
                  aria-label="Shopping Bag"
                  className={`relative flex items-center gap-2 h-10 px-3.5 sm:px-4 rounded-full font-bold text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-95 group ${
                    bagDropdownOpen
                      ? 'bg-[#222222] text-white border-2 border-[#222222]'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-[#F1641E]/10 border-2 border-[#F1641E]/40 hover:border-[#F1641E] text-neutral-900 dark:text-neutral-100'
                  }`}
                  title="View Shopping Bag"
                >
                  <div className="relative flex items-center justify-center">
                    <Handbag
                      className={`w-5 h-5 transition-colors ${
                        bagDropdownOpen
                          ? 'text-white'
                          : 'text-neutral-900 dark:text-neutral-100 group-hover:text-[#F1641E]'
                      }`}
                    />
                    {bagCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#e60023] text-white text-[10px] font-bold flex items-center justify-center shadow-xs leading-none">
                        {bagCount}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-bold text-sm tracking-tight transition-colors ${
                      bagDropdownOpen
                        ? 'text-white'
                        : 'text-neutral-900 dark:text-neutral-100 group-hover:text-[#F1641E]'
                    }`}
                  >
                    Bag
                  </span>
                </button>

                {/* Etsy-Style Bag Flyout Menu (Anchored under Bag icon) */}
                {bagDropdownOpen && (
                  <div
                    onMouseLeave={() => setBagDropdownOpen(false)}
                    className="absolute right-0 top-full mt-2.5 w-76 sm:w-80 bg-white dark:bg-[#1E1E22] border border-[#E6E6E2] dark:border-neutral-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    {/* Caret arrow pointing to Bag button */}
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white dark:bg-[#1E1E22] border-t border-l border-[#E6E6E2] dark:border-neutral-700 rotate-45 z-10" />

                    {/* Popover Header with Subtotal & View bag button */}
                    <div className="p-4 pb-3">
                      <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        Subtotal:
                      </div>
                      <div className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                        USD {usdBagTotal ? usdBagTotal.toFixed(2) : (bagTotal / 300).toFixed(2)}
                      </div>

                      {/* Prominent dark pill button: View bag */}
                      <Link
                        href="/bag"
                        onClick={() => setBagDropdownOpen(false)}
                        className="w-full mt-3 py-2.5 px-4 rounded-full bg-[#222222] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-sm text-center block transition cursor-pointer shadow-sm active:scale-98"
                      >
                        View bag
                      </Link>
                    </div>

                    {/* Thin divider */}
                    <div className="border-t border-[#E6E6E2] dark:border-neutral-800" />

                    {/* Scrollable list of preview items */}
                    <div className="max-h-[380px] overflow-y-auto px-4 py-3 space-y-4 divide-y divide-[#F0F0EE] dark:divide-neutral-800/80">
                      {bag.length === 0 ? (
                        <div className="py-8 text-center space-y-2">
                          <Handbag className="w-8 h-8 text-neutral-300 dark:text-neutral-600 mx-auto" />
                          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            Your bag is empty
                          </p>
                        </div>
                      ) : (
                        bag.map((item, idx) => {
                          const price =
                            item.book.usdPrice ?? Number((item.book.price / 300).toFixed(2));
                          const origPrice =
                            item.book.originalUsdPrice ??
                            (item.book.originalPrice
                              ? Number((item.book.originalPrice / 300).toFixed(2))
                              : undefined);
                          const urgency =
                            item.book.urgencyText || 'In 85 carts, 4 bought in the past 24 hours';

                          return (
                            <div key={`${item.book.id}-${idx}`} className={idx > 0 ? 'pt-4' : ''}>
                              <Link
                                href={`/books/${item.book.id}`}
                                onClick={() => setBagDropdownOpen(false)}
                                className="block group"
                              >
                                <div className="w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative mb-2 shadow-2xs">
                                  <img
                                    src={item.book.coverImage}
                                    alt={item.book.title}
                                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-200"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                                      USD {price.toFixed(2)}
                                    </span>
                                    {origPrice && (
                                      <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
                                        USD {origPrice.toFixed(2)}
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-xs font-bold text-[#C83500] dark:text-[#FF6B4A] leading-snug">
                                    {urgency}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
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

                {/* Highlighted Mobile Shopping Bag Button -> Go to Bag Page */}
                <Link
                  href="/bag"
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
                </Link>
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
