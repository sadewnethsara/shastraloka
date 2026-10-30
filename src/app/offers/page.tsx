'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  TicketPercent,
  Check,
  Copy,
  CalendarHeart,
  Sparkles,
  Bell,
  Clock,
  Palette,
  ArrowUpRight,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toast from '../../components/Toast';
import CleanBookCard from '../../components/CleanBookCard';
import { BOOKS } from '../../data/books';
import {
  CELEBRATION_EVENTS,
  CELEBRATION_CATEGORIES,
  CelebrationCategory,
  getSortedUpcomingCelebrations,
} from '../../data/celebrations';
import { useApp } from '../../context/AppContext';

function SpecialOffersContent() {
  const searchParams = useSearchParams();
  const {
    showToast,
    activeCelebration,
    isCelebrationMode,
    setActiveCelebrationById,
  } = useApp();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [remindedIds, setRemindedIds] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<CelebrationCategory | 'all'>('all');

  // Sync URL ?celebration=... parameter on mount or change
  useEffect(() => {
    const paramId = searchParams.get('celebration');
    if (paramId && CELEBRATION_EVENTS.some((ev) => ev.id === paramId)) {
      setActiveCelebrationById(paramId);
    }
  }, [searchParams, setActiveCelebrationById]);

  const handleCopyCode = (code: string, title?: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    showToast(
      `Copied ${title ? `${title} ` : ''}code ${code}! Ready to apply in your Shopping Bag.`
    );
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleReminder = (eventId: string, eventTitle: string, dateLabel: string) => {
    setRemindedIds((prev) => {
      const next = !prev[eventId];
      showToast(
        next
          ? `Reminder set for ${eventTitle} (${dateLabel}) offers!`
          : `Removed reminder for ${eventTitle}.`
      );
      return { ...prev, [eventId]: next };
    });
  };

  // Books matched strictly to the active celebration date
  const matchedCelebrationBooks = React.useMemo(() => {
    const list = activeCelebration.matchingBookIds
      .map((id) => BOOKS.find((b) => b.id === id))
      .filter((b): b is (typeof BOOKS)[number] => Boolean(b));
    return list.length > 0 ? list : BOOKS.slice(0, 5);
  }, [activeCelebration]);

  // Sorted upcoming celebration dates (chronological from Oct 30)
  const sortedUpcoming = React.useMemo(() => {
    const all = getSortedUpcomingCelebrations(10, 30);
    if (selectedCategory === 'all') return all;
    return all.filter((ev) => ev.categories.includes(selectedCategory));
  }, [selectedCategory]);

  const featuredCelebrations = CELEBRATION_EVENTS.filter((ev) => ev.featuredInQuickSwitch);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col transition-colors duration-200">
      <Header isSticky />

      {/* Celebration Theme Hero Banner */}
      <section
        className="bg-[var(--hero-banner-bg)] border-b border-[var(--hero-banner-border)] py-8 sm:py-12 transition-colors duration-300"
        style={{ backgroundImage: 'var(--hero-banner-pattern)' }}
      >
        <div className="page-container">
          {/* Quick Celebration Theme & Date Switcher */}
          <div className="mb-7 pb-5 border-b border-[var(--border-subtle)]/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
                <Palette className="w-4 h-4" />
                <span>Select Celebration Date &amp; Live Theme</span>
              </span>
              {isCelebrationMode && (
                <button
                  type="button"
                  onClick={() => setActiveCelebrationById(null)}
                  className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] underline cursor-pointer"
                >
                  Reset to Classic Sanctuary Theme
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {featuredCelebrations.map((ev) => {
                const isSelected = activeCelebration.id === ev.id;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setActiveCelebrationById(ev.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                        : 'bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    <CalendarHeart className="w-3.5 h-3.5" />
                    <span>{ev.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                      }`}
                    >
                      {ev.dateLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
            <div className="md:col-span-7 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] text-[var(--color-primary)] text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeCelebration.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-heading font-bold text-[var(--text-main)]">
                {activeCelebration.title} Special Offers
              </h1>

              <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed max-w-xl">
                {activeCelebration.heroSubtitle} All vouchers below are curated specifically for{' '}
                <strong className="font-bold text-[var(--text-main)]">
                  {activeCelebration.title} ({activeCelebration.dateLabel})
                </strong>
                .{' '}
                <Link
                  href="/terms"
                  className="underline font-semibold hover:text-[var(--color-primary)]"
                >
                  Terms &amp; details.
                </Link>
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Link
                  href="/bag"
                  className="px-5 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-bold hover:opacity-90 transition shadow-xs"
                >
                  Apply Vouchers in Bag
                </Link>
                <a
                  href="#upcoming-calendar-offers"
                  className="px-4 py-2.5 rounded-full bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] text-xs sm:text-sm font-bold hover:bg-[var(--bg-hover)] transition"
                >
                  View Upcoming Date Offers ({CELEBRATION_EVENTS.length})
                </a>
              </div>
            </div>

            {/* Celebration Book Stack Showcase */}
            <div className="md:col-span-5 flex justify-center">
              <div
                className="w-full max-w-[380px] rounded-2xl p-4 shadow-lg border border-[var(--hero-showcase-border)]"
                style={{ background: 'var(--hero-showcase-bg)' }}
              >
                <div className="flex items-center justify-between text-white mb-2.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-90">
                    {activeCelebration.dateLabel} Curated Picks
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/35 text-[10px] font-bold">
                    {activeCelebration.coupons[0]?.discount || '30% OFF'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {matchedCelebrationBooks.slice(0, 4).map((b) => (
                    <Link
                      key={b.id}
                      href={`/books/${b.id}`}
                      className="aspect-[3/4] rounded-lg overflow-hidden bg-[var(--bg-card)] border border-white/25 hover:scale-105 transition"
                    >
                      <img
                        src={b.coverImage}
                        alt={b.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 page-container py-10 sm:py-14 space-y-14">
        {/* 1. ACTIVE CELEBRATION DATE EXCLUSIVE VOUCHERS */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--color-primary)] mb-1">
                <TicketPercent className="w-4 h-4" />
                <span>DATE-MATCHED VOUCHERS • {activeCelebration.dateLabel.toUpperCase()}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-main)]">
                Active Vouchers for {activeCelebration.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                Exclusive promotional codes tailored strictly for {activeCelebration.title} editions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeCelebration.coupons.map((c) => (
              <div
                key={c.code}
                className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary-border)] flex flex-col justify-between gap-4 shadow-xs transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-extrabold">
                      {c.discount}
                    </span>
                    {c.badgeText && (
                      <span className="text-[11px] font-bold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2.5 py-0.5 rounded-full">
                        {c.badgeText}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-heading text-[var(--text-main)] leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5">{c.minSpend}</p>
                </div>

                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                  <div className="text-xs font-mono font-extrabold text-[var(--text-main)] bg-[var(--bg-surface)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                    {c.code}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(c.code, activeCelebration.title)}
                    className="px-4 py-2 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-bold flex items-center gap-1.5 shrink-0 hover:opacity-90 transition cursor-pointer"
                  >
                    {copiedCode === c.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BOOKS MATCHING THIS CELEBRATION DATE */}
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-[var(--text-main)]">
                Curated Treatises for {activeCelebration.title} ({activeCelebration.dateLabel})
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Handpicked Sri Lankan editions with special {activeCelebration.title} savings
              </p>
            </div>
            <Link
              href={`/search?q=${encodeURIComponent(activeCelebration.heroSearchQuery)}`}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline shrink-0"
            >
              Explore all {activeCelebration.title} books &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-5 gap-y-7">
            {matchedCelebrationBooks.slice(0, 5).map((book, idx) => (
              <CleanBookCard
                key={book.id}
                book={book}
                badgeText={idx === 0 ? activeCelebration.dateLabel : undefined}
              />
            ))}
          </div>
        </section>

        {/* 3. UPCOMING OFFERS FOR FUTURE CELEBRATION DATES */}
        <section id="upcoming-calendar-offers" className="space-y-6 pt-4 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--color-primary)] mb-1">
                <Clock className="w-4 h-4" />
                <span>CULTURAL &amp; GLOBAL CALENDAR ROADMAP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-main)]">
                Upcoming Offers for Future Celebration Dates
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                Preview and activate themes or pre-claim vouchers for Sri Lankan festivals, Women&apos;s Day, Children&apos;s Day, Teachers&apos; Day, and global literary dates
              </p>
            </div>
          </div>

          {/* 6 Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CELEBRATION_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                    active
                      ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-xs'
                      : 'bg-[var(--bg-surface)] text-[var(--text-body)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Upcoming Celebration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {sortedUpcoming.map((ev) => {
              const isCurrentActive = activeCelebration.id === ev.id;
              const mainCoupon = ev.coupons[0];
              const isReminded = !!remindedIds[ev.id];
              const previewBooks = ev.matchingBookIds
                .slice(0, 3)
                .map((id) => BOOKS.find((b) => b.id === id))
                .filter((b): b is (typeof BOOKS)[number] => Boolean(b));

              return (
                <div
                  key={ev.id}
                  className={`rounded-2xl p-5 flex flex-col justify-between gap-4 border transition ${
                    isCurrentActive
                      ? 'bg-[var(--bg-surface)] border-[var(--color-primary)] ring-2 ring-[var(--color-primary-subtle)] shadow-md'
                      : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Date + Countdown Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-main)] text-xs font-extrabold">
                        <CalendarHeart className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        <span>{ev.dateLabel}</span>
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          ev.daysUntil === 0
                            ? 'bg-[var(--color-success-bg)] text-[var(--color-success)]'
                            : ev.daysUntil <= 30
                            ? 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]'
                            : 'bg-[var(--bg-wash)] text-[var(--text-muted)]'
                        }`}
                      >
                        {ev.daysUntil === 0
                          ? 'Live Today!'
                          : ev.daysUntil === 1
                          ? 'Starts Tomorrow'
                          : `In ${ev.daysUntil} days`}
                      </span>
                    </div>

                    {/* Celebration Title & Subtitle */}
                    <div>
                      <h3 className="text-base font-bold font-heading text-[var(--text-main)] leading-snug">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
                        {ev.heroSubtitle}
                      </p>
                    </div>

                    {/* Mini Book Thumbnails + Upcoming Voucher Preview */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center -space-x-2">
                        {previewBooks.map((b) => (
                          <img
                            key={b.id}
                            src={b.coverImage}
                            alt={b.title}
                            referrerPolicy="no-referrer"
                            className="w-9 h-12 rounded-md object-cover border-2 border-[var(--bg-card)] shadow-2xs"
                          />
                        ))}
                      </div>

                      {mainCoupon && (
                        <div className="text-right">
                          <span className="block text-xs font-extrabold text-[var(--color-success)]">
                            {mainCoupon.discount}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)]">
                            Code: {mainCoupon.code}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCelebrationById(ev.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        showToast(`Activated "${ev.title}" theme & offers!`);
                      }}
                      className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        isCurrentActive
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-90'
                      }`}
                    >
                      <span>{isCurrentActive ? 'Active Theme & Offers' : 'Preview Theme & Offers'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleReminder(ev.id, ev.title, ev.dateLabel)}
                      className={`px-3 py-2 rounded-full text-xs font-bold border flex items-center gap-1 transition cursor-pointer shrink-0 ${
                        isReminded
                          ? 'bg-[var(--color-success-bg)] text-[var(--color-success)] border-[var(--color-success)]/30'
                          : 'bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{isReminded ? 'Notified' : 'Remind'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}

export default function SpecialOffersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
      <SpecialOffersContent />
    </Suspense>
  );
}
