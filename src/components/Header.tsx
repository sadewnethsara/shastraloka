'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function Header() {
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
    activeBoardFilter,
    setActiveBoardFilter,
    orders,
    showToast,
  } = useApp();

  // Dropdown states
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [notificationsTab, setNotificationsTab] = useState<'pins' | 'updates'>('pins');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const totalSavedPins = boards.reduce((acc, b) => acc + b.bookIds.length, 0);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (megaMenuRef.current && !megaMenuRef.current.contains(target)) {
        setIsMegaMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(target)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickSearchTags = [
    'Mahavamsa',
    'Visuddhimagga',
    'Dhammapada',
    'Jataka Potha',
    'Ayurveda',
    'Selalihini',
    'Ruwanwelisaya',
    'Chulavamsa',
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand Logo & Navigation Hub */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Shastraloka Logo Link */}
          <Link
            href="/"
            onClick={() => {
              setActiveBoardFilter(null);
              setSearchQuery('');
            }}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#e60023] flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
              <span className="font-sinhala font-bold text-xl leading-none">ශ</span>
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="font-serif font-black text-lg sm:text-xl tracking-tight leading-none text-[var(--text-main)] group-hover:text-[#e60023] transition-colors">
                Shastraloka
              </span>
              <span className="font-sinhala text-[11px] font-semibold tracking-wide text-[#e60023] mt-0.5">
                ශාස්ත්‍රලෝක • shastraloka.lk
              </span>
            </div>
          </Link>

          {/* Pinterest MegaMenu Switcher Dropdown (Screenshot 1) */}
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs sm:text-sm pill-btn cursor-pointer border transition-colors ${
                isMegaMenuOpen
                  ? 'bg-[var(--text-main)] text-[var(--bg-main)] border-[var(--text-main)]'
                  : 'bg-[var(--bg-input)] text-[var(--text-main)] border-transparent hover:bg-[var(--bg-hover)]'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#e60023] flex items-center justify-center text-[10px] text-white font-bold">
                📖
              </div>
              <span className="font-bold">Heritage Hub</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Pinterest MegaMenu Dropdown Content (Screenshot 1) */}
            {isMegaMenuOpen && (
              <div className="absolute top-14 left-0 w-[92vw] max-w-4xl bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-subtle)] p-6 sm:p-8 animate-slide-up z-50 text-[var(--text-main)]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* Column 1: Shortcuts */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                      <h4 className="font-black text-sm uppercase tracking-wider text-[var(--text-main)]">
                        Shortcuts
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Feed</span>
                    </div>
                    <ul className="space-y-2 text-sm font-semibold">
                      <li>
                        <Link
                          href="/"
                          onClick={() => {
                            setActiveBoardFilter(null);
                            setSearchQuery('');
                            setIsMegaMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors"
                        >
                          <span className="text-base">🏛️</span>
                          <span>Explore All Treatises</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors"
                        >
                          <span className="text-base">📌</span>
                          <span>My Saved Boards ({boards.length})</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/orders"
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors"
                        >
                          <span className="text-base">📦</span>
                          <span>Track Courier Orders</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setSearchQuery('Ola Leaf');
                            setIsMegaMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors cursor-pointer"
                        >
                          <span className="text-base">🪶</span>
                          <span>Rare Ola Leaf Replicas</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Sacred Disciplines */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                      <h4 className="font-black text-sm uppercase tracking-wider text-[var(--text-main)]">
                        Disciplines
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Genres</span>
                    </div>
                    <ul className="space-y-2 text-sm font-semibold">
                      <li>
                        <button
                          onClick={() => {
                            setSearchQuery('Mahavamsa');
                            setIsMegaMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors cursor-pointer"
                        >
                          <span>🦁</span>
                          <div>
                            <p className="leading-tight">Historical Chronicles</p>
                            <span className="font-sinhala text-[11px] text-[var(--text-muted)]">මහාවංසය / දීපවංසය</span>
                          </div>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setSearchQuery('Buddhist');
                            setIsMegaMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors cursor-pointer"
                        >
                          <span>☸️</span>
                          <div>
                            <p className="leading-tight">Buddhist Philosophy</p>
                            <span className="font-sinhala text-[11px] text-[var(--text-muted)]">විසුද්ධිමග්ග / ධම්මපදය</span>
                          </div>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setSearchQuery('Ayurveda');
                            setIsMegaMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors cursor-pointer"
                        >
                          <span>🌿</span>
                          <div>
                            <p className="leading-tight">Ayurvedic Medicine</p>
                            <span className="font-sinhala text-[11px] text-[var(--text-muted)]">දේශීය චිකිත්සා</span>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Editions & Craftsmanship */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                      <h4 className="font-black text-sm uppercase tracking-wider text-[var(--text-main)]">
                        Editions
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Binding</span>
                    </div>
                    <ul className="space-y-2 text-sm font-semibold">
                      <li className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)]">
                        <span className="text-amber-500 font-bold">👑 Deluxe Gold Embossed</span>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">24K Gold foil on archival cloth</p>
                      </li>
                      <li className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)]">
                        <span className="text-emerald-500 font-bold">🪶 Ola Leaf Box Sets</span>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Kalu-wara ebony wood collector boxes</p>
                      </li>
                      <li className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)]">
                        <span className="text-indigo-500 font-bold">📜 Royal Silkbound</span>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Hand-stitched Kandyan royal silks</p>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Reading & Delivery Info */}
                  <div className="space-y-4 bg-[var(--bg-wash)] p-4 rounded-2xl border border-[var(--border-subtle)]">
                    <h4 className="font-black text-sm uppercase tracking-wider text-[var(--text-main)]">
                      Island-wide Service
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Hand-bound manuscripts delivered to your doorstep in Sri Lanka within 2-3 business days via certified courier.
                    </p>
                    <div className="space-y-1.5 text-xs font-semibold">
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <span>✓</span>
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <span>✓</span>
                        <span>Archival Seal Guarantee</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <span>✓</span>
                        <span>Audio Chanting Accompanying</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="w-full py-2 rounded-full bg-[#e60023] text-white text-xs font-bold pill-btn cursor-pointer shadow-md"
                    >
                      View Shopping Bag
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Feed & Saved Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-1">
            <Link
              href="/"
              onClick={() => {
                setActiveBoardFilter(null);
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-full text-sm font-bold pill-btn cursor-pointer ${
                activeBoardFilter === null && searchQuery === ''
                  ? 'bg-[var(--bg-badge)] text-[var(--bg-main)]'
                  : 'text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              Explore Feed
            </Link>
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-full text-sm font-bold pill-btn text-[var(--text-main)] hover:bg-[var(--bg-hover)] cursor-pointer flex items-center gap-1.5"
            >
              <span>Saved Boards</span>
              {totalSavedPins > 0 && (
                <span className="px-2 py-0.5 text-xs bg-[#e60023] text-white rounded-full font-bold">
                  {totalSavedPins}
                </span>
              )}
            </Link>
          </nav>

        </div>

        {/* Center: Pinterest Search Bar (Screenshot 5) */}
        <div className="relative flex-1 max-w-2xl">
          <div 
            className={`relative flex items-center w-full h-11 sm:h-12 px-4 rounded-full transition-all duration-200 ${
              isSearchFocused 
                ? 'bg-[var(--bg-surface)] ring-2 ring-[var(--text-main)] shadow-lg' 
                : 'bg-[var(--bg-input)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            <svg 
              className="w-5 h-5 text-[var(--text-muted)] shrink-0 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Mahavamsa, Jataka stories, Ayurveda, Sinhala poetry or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-transparent text-sm sm:text-base outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-6 h-6 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] text-sm font-bold cursor-pointer mr-1"
                title="Clear search"
              >
                ✕
              </button>
            )}

            {/* Visual Search Camera Icon (Screenshot 5) */}
            <button
              onClick={() => showToast('Visual cover recognition active: matching book art')}
              className="w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] text-sm cursor-pointer"
              title="Search with image or book cover"
            >
              📷
            </button>
          </div>

          {/* Quick Search Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-14 left-0 right-0 bg-[var(--bg-surface)] rounded-2xl p-4 shadow-2xl border border-[var(--border-subtle)] animate-slide-up z-50">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                Popular Sri Lankan Treatises:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-input)] hover:bg-[#e60023] hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions (Notifications, Messages, Bag, Account) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-hover)] pill-btn cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Pinterest Notifications Flyout (Screenshot 3) */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full relative flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-hover)] pill-btn cursor-pointer"
              title="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e60023] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* Notifications Panel (Screenshot 3) */}
            {isNotificationsOpen && (
              <div className="absolute top-14 right-0 w-80 sm:w-96 bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden animate-slide-up z-50 text-[var(--text-main)]">
                
                {/* Header */}
                <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                  <h4 className="font-serif font-black text-lg text-[var(--text-main)]">
                    Notifications
                  </h4>
                  <button
                    onClick={() => setIsNotificationsOpen(false)}
                    className="w-7 h-7 rounded-full hover:bg-[var(--bg-hover)] flex items-center justify-center text-sm font-bold text-[var(--text-muted)] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Tabs: Pins & Updates (Screenshot 3) */}
                <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-wash)] p-1.5 gap-1">
                  <button
                    onClick={() => setNotificationsTab('pins')}
                    className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      notificationsTab === 'pins'
                        ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    Treatise Pins
                  </button>
                  <button
                    onClick={() => setNotificationsTab('updates')}
                    className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      notificationsTab === 'updates'
                        ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <span>Courier & Updates</span>
                    <span className="w-2 h-2 rounded-full bg-[#e60023]" />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto divide-y divide-[var(--border-subtle)] p-2">
                  {notificationsTab === 'pins' ? (
                    <>
                      <div className="p-3 hover:bg-[var(--bg-hover)] rounded-2xl transition-colors flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                          ශ
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="text-[var(--text-main)]">
                            <span className="font-bold">Ven. Medhananda Thero</span> saved your treatise <strong>The Mahavamsa</strong> to board <em>Royal Court Archives</em>.
                          </p>
                          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">3 hours ago</span>
                        </div>
                      </div>

                      <div className="p-3 hover:bg-[var(--bg-hover)] rounded-2xl transition-colors flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#e60023] text-white font-bold flex items-center justify-center shrink-0">
                          SJ
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="text-[var(--text-main)]">
                            <span className="font-bold">Dr. S. Jayawardena</span> published a 5-star commentary on <strong>Visuddhimagga</strong>.
                          </p>
                          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">Yesterday</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 hover:bg-[var(--bg-hover)] rounded-2xl transition-colors flex items-start gap-3 bg-emerald-500/5">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0">
                          📦
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="font-bold text-emerald-600">Dispatched via Sri Lanka Courier</p>
                          <p className="text-[var(--text-main)] mt-0.5">
                            Order <strong>#LK-789412</strong> is out for delivery in Colombo 07.
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Link
                              href="/orders/LK-789412"
                              onClick={() => setIsNotificationsOpen(false)}
                              className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] pill-btn"
                            >
                              Track Delivery
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 hover:bg-[var(--bg-hover)] rounded-2xl transition-colors flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0">
                          🏷️
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="text-[var(--text-main)]">
                            <strong>Special Promotion:</strong> Use code <code className="bg-[var(--bg-input)] px-1.5 py-0.5 rounded font-mono font-bold">LANKA20</code> for 20% off all historical chronicles!
                          </p>
                          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">2 days ago</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Footer link */}
                <div className="p-3 bg-[var(--bg-wash)] text-center border-t border-[var(--border-subtle)]">
                  <Link
                    href="/orders"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-xs font-bold text-[#e60023] hover:underline"
                  >
                    View All Orders & Deliveries &rarr;
                  </Link>
                </div>

              </div>
            )}
          </div>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-10 sm:h-11 px-3 sm:px-4 rounded-full flex items-center gap-2 bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold text-sm pill-btn cursor-pointer"
            title="View Shopping Bag"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-[#e60023] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Bag</span>
          </button>

          {/* Pinterest Account & Profile Dropdown (Screenshot 4) */}
          <div className="relative" ref={accountMenuRef}>
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[var(--bg-hover)] pill-btn cursor-pointer"
              title="Account Menu"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-600 to-[#e60023] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                SB
              </div>
              <svg
                className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isAccountMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Pinterest Account Dropdown Content (Screenshot 4) */}
            {isAccountMenuOpen && (
              <div className="absolute top-14 right-0 w-72 bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-subtle)] p-3 animate-slide-up z-50 text-[var(--text-main)]">
                
                {/* Active Profile Card (Screenshot 4: Currently in) */}
                <div className="p-3 bg-[var(--bg-wash)] rounded-2xl border border-[var(--border-subtle)] mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Currently In
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-[#e60023] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                      SB
                    </div>
                    <div>
                      <h5 className="font-serif font-black text-sm text-[var(--text-main)] leading-tight">
                        Dr. Senaka Bandara
                      </h5>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        Scholar & Bibliophile
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Navigation Links */}
                <div className="space-y-1 text-sm font-semibold">
                  <Link
                    href="/profile"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span>📌</span>
                      <span>My Profile & Boards</span>
                    </div>
                    <span className="text-xs bg-[var(--bg-input)] px-2 py-0.5 rounded-full font-bold">
                      {boards.length}
                    </span>
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span>📦</span>
                      <span>Orders & Deliveries</span>
                    </div>
                    <span className="text-xs bg-emerald-500/15 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                      {orders.length}
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      setIsBoardsModalOpen(true);
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors cursor-pointer"
                  >
                    <span>📚</span>
                    <span>Manage Reading Lists</span>
                  </button>

                  <div className="border-t border-[var(--border-subtle)] my-1 pt-1" />

                  <div className="px-3 py-1.5 flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                    <span>Appearance</span>
                    <button
                      onClick={toggleTheme}
                      className="px-2.5 py-1 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold cursor-pointer"
                    >
                      {isDark ? '🌙 Dark' : '☀️ Light'}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      showToast('Island-wide delivery available via Sri Lanka Post & certified couriers');
                      setIsAccountMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-xs cursor-pointer"
                  >
                    <span>🇱🇰</span>
                    <span>Sri Lanka Courier Policy</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('Logged out of session. Session restored as Scholar guest.');
                      setIsAccountMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-500/10 text-rose-500 font-bold transition-colors text-xs cursor-pointer"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
