'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, RefreshCw, Home, AlertCircle, Handbag, ArrowRight } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for observability
    console.error('Shastraloka Storefront Error:', error);
  }, [error]);

  return (
    <div className="min-h-[82vh] bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center px-4 py-12 sm:py-16 transition-colors duration-200">
      <div className="max-w-xl w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-sm p-6 sm:p-10 text-center space-y-6">
        {/* Literary Illustration Emblem */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] flex items-center justify-center text-[var(--color-primary)] relative shadow-inner">
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--color-accent-badge,#e60023)] text-white flex items-center justify-center shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Customer-Facing Notice */}
        <div className="space-y-2.5">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-primary-subtle)] text-[var(--color-primary)] border border-[var(--color-primary-border)]">
            Manuscript In Transit
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-main)] leading-tight">
            We lost our bookmark on this page
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
            Something unexpected interrupted the retrieval of this volume. Your
            shopping bag and saved reading lists are completely safe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] hover:opacity-90 text-white font-semibold text-sm transition-opacity shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Reloading
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] border border-[var(--border-subtle)] font-medium text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Storefront
          </Link>
        </div>

        {/* Quick Fallback Links */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center gap-4 text-xs">
          <Link
            href="/bag"
            className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:underline"
          >
            <Handbag className="w-4 h-4" />
            <span>Check Your Bag</span>
          </Link>
          <span className="text-[var(--text-dim)]">•</span>
          <Link
            href="/bestsellers"
            className="font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            Browse Best Sellers
          </Link>
          <span className="text-[var(--text-dim)]">•</span>
          <Link
            href="/contact"
            className="font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            Contact Scriptorium Care
          </Link>
        </div>

        {/* Technical Reference Code */}
        {error.digest && (
          <div className="pt-2">
            <p className="text-[11px] text-[var(--text-dim)] font-mono">
              Diagnostic Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}