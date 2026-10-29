'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Clock,
  ShieldCheck,
  Truck,
  Handbag,
  Mail,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useApp } from '../../context/AppContext';

export default function MaintenancePage() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setIsSubscribed(true);
    showToast('We will notify you the moment the scriptorium reopens!');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans antialiased selection:bg-[var(--color-primary-subtle)] transition-colors duration-200">
      <Header />

      <main className="page-container pt-8 sm:pt-12 pb-20 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-[var(--hero-banner-bg,var(--bg-wash))] border border-[var(--hero-banner-border,var(--border-subtle))] p-6 sm:p-12 lg:p-16 overflow-hidden shadow-xs text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Scheduled Archival Upkeep &amp; Scriptorium Care</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--text-main)] leading-[1.15]">
              Preserving sacred wisdom for your library
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
              Our digital scriptorium is currently undergoing periodic conservation,
              catalog indexing, and climate-controlled warehouse replenishment.
              The storefront will reopen shortly.
            </p>
          </div>

          {/* Status Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs text-xs font-semibold">
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-primary)]" />
              </span>
              <span>Maintenance Status: Upgrading Databases</span>
            </div>
            <span className="text-[var(--text-dim)] hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <Clock className="w-3.5 h-3.5" />
              <span>Expected Reopening: ~45 Minutes</span>
            </div>
          </div>

          {/* Email Notification Subscription */}
          <div className="max-w-md mx-auto pt-2">
            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-primary-border)] text-xs font-semibold text-[var(--color-primary)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You&apos;re on the priority notification list! We&apos;ll email you immediately.</span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for opening alert..."
                    className="w-full pl-10 pr-4 py-3 rounded-full text-xs sm:text-sm bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--color-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[var(--color-primary)] hover:opacity-90 text-white font-semibold text-xs sm:text-sm shrink-0 transition-opacity shadow-xs cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3 Assurance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-heading font-bold text-[var(--text-main)]">
              Islandwide Dispatch Unaffected
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              All active orders continue to be bound, verified, and dispatched on
              schedule via our postal and registered courier partners across Sri Lanka.
            </p>
            <div className="pt-2">
              <Link
                href="/track-order"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                <span>Track an active order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center">
              <Handbag className="w-5 h-5" />
            </div>
            <h2 className="text-base font-heading font-bold text-[var(--text-main)]">
              Your Bag &amp; Boards Are Safe
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Books added to your shopping bag and saved reading lists are securely
              preserved in your session. Nothing will be removed upon reload.
            </p>
            <div className="pt-2">
              <Link
                href="/bag"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                <span>Review your shopping bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h2 className="text-base font-heading font-bold text-[var(--text-main)]">
              Curator Concierge On Duty
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Need to place an urgent scholarly order or inquire about rare manuscript
              bindings? Our curator concierge is available right now.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                <span>Inquire with Curators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Informative FAQ Shelf */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Scriptorium Inquiries
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-main)]">
              Frequently Asked During System Maintenance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--text-main)]">
                Will my existing order delivery date change?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                No. Our warehouse logistics and courier partners run independently of our
                web servers. Dispatches operate 6 days a week without interruption.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--text-main)]">
                Can I browse books while maintenance is completing?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                You can browse our static collections including Best Sellers, New Releases,
                and Publisher Guilds, or check our legal policies and shipping guides anytime.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--text-main)]">
                How often is archival maintenance conducted?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                We perform scheduled maintenance once monthly during off-peak hours to sync
                rare manuscript epigraphy scans and high-resolution plate databases.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--text-main)]">
                Can I redeem my Gift Card balance?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                All digital and physical LKR Gift Cards will remain ready to redeem at
                checkout as soon as the checkout gateway reopens.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
