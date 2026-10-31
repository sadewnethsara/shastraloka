'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { CheckCircle2, Truck, BookOpen, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { orders } = useApp();
  const latestOrder = orders[0];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Header isSticky />
      <main className="flex-1 flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-[600px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-7 sm:p-10 text-center shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Shastraloka • Archival Dispatch Confirmed
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl font-normal text-[var(--text-main)]">
            Thank you for your literary order!
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            Your manuscripts and print editions are being hand-wrapped in moisture-resistant archival kraft paper at our Colombo
            vault.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] text-left space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[var(--text-muted)]">Order Reference:</span>
            <span className="font-mono font-bold text-[var(--text-main)]">{latestOrder?.id || 'ORD-9042'}</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[var(--text-muted)]">Amount Paid (LKR):</span>
            <span className="font-bold text-[var(--text-main)]">
              LKR {(latestOrder?.total || 3650).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[var(--text-muted)]">Courier Service:</span>
            <span className="font-medium text-[var(--text-main)]">Islandwide Insured Book Post (1–3 Days)</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/track-order"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-semibold"
          >
            <Truck className="w-4 h-4" />
            Track Your Dispatch
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-semibold text-[var(--text-main)]"
          >
            <BookOpen className="w-4 h-4" />
            Continue Browsing Books
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
