'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
      <Header />
      <main className="page-container py-12 sm:py-16 flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)] mb-2">
            Order Confirmed!
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            Thank you for your order. We have received your purchase and our preservation team is preparing your sacred texts and books for safe dispatch.
          </p>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-left mb-6 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Order Reference</span>
              <span className="font-bold text-[var(--text-main)]">SLK-94821</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Estimated Delivery</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Within 24–48 Hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Courier Partner</span>
              <span className="font-semibold text-[var(--text-main)]">Pronto Express Courier</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              <Package className="w-4 h-4" />
              <span>View My Orders</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[var(--border-subtle)] text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
