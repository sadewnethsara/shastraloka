'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Package, Search, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-8 sm:py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-3">
              <Truck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)]">
              Track Your Courier Delivery
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1.5">
              Enter your Order Number (e.g. ORD-84729) or phone number to see live transit updates from our islandwide courier network.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleTrack} className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID or Mobile Number..."
                className="w-full px-4 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--color-primary)] text-sm text-[var(--text-main)] outline-none pl-11"
                required
              />
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition shrink-0 cursor-pointer"
            >
              Track Order
            </button>
          </form>

          {/* Live tracking simulated result */}
          {hasSearched ? (
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Order ID</span>
                  <p className="text-base font-heading font-bold text-[var(--text-main)]">{orderId.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Courier Partner</span>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Pronto / Certis Express</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-main)]">Order Placed & Confirmed</h3>
                    <p className="text-xs text-[var(--text-muted)]">Packaging classical treatise with protective padding</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-main)]">Dispatched from Colombo Hub</h3>
                    <p className="text-xs text-[var(--text-muted)]">Handed to regional dispatch courier</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-main)]">Out for Delivery Today</h3>
                    <p className="text-xs text-[var(--text-muted)]">Courier on route to destination address</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
              Delivery takes 24 hours within Western Province and 48–72 hours across all other islandwide districts.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
