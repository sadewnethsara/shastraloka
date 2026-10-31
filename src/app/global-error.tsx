'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4 text-[var(--text-main)] font-sans antialiased">
        <div className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-sm">
          {/* Emblem */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] flex items-center justify-center text-[var(--color-primary)] font-heading font-black text-2xl shadow-inner">
            S
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
              Storefront Reconnection
            </span>
            <h1 className="text-2xl font-heading font-bold text-[var(--text-main)]">
              Shastraloka is momentarily paused
            </h1>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              We encountered a connection interruption while syncing the scriptorium.
              Please refresh to resume browsing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-[var(--radius-btn)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
          >
            Reload Bookstore
          </button>

          {error?.digest && (
            <p className="text-[11px] text-[var(--text-dim)] font-mono">
              Diagnostic Code: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
