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
      <body className="min-h-screen bg-[var(--bg-main,#FAF8F5)] flex items-center justify-center p-4 text-[var(--text-main,#1c1917)] font-sans antialiased">
        <div className="max-w-md w-full bg-[var(--bg-card,#ffffff)] border border-[var(--border-subtle,#e7e5e4)] rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-sm">
          {/* Emblem */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--color-primary-subtle,rgba(241,100,30,0.1))] border border-[var(--color-primary-border,rgba(241,100,30,0.4))] flex items-center justify-center text-[var(--color-primary,#F1641E)] font-heading font-black text-2xl shadow-inner">
            S
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-primary-subtle,rgba(241,100,30,0.1))] text-[var(--color-primary,#F1641E)]">
              Storefront Reconnection
            </span>
            <h1 className="text-2xl font-heading font-bold text-[var(--text-main,#1c1917)]">
              Shastraloka is momentarily paused
            </h1>
            <p className="text-sm text-[var(--text-muted,#78716c)] leading-relaxed">
              We encountered a connection interruption while syncing the scriptorium.
              Please refresh to resume browsing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-full bg-[var(--color-primary,#F1641E)] hover:opacity-90 text-white font-semibold text-sm transition-opacity cursor-pointer shadow-xs"
          >
            Reload Bookstore
          </button>

          {error?.digest && (
            <p className="text-[11px] text-[var(--text-dim,#a8a29e)] font-mono">
              Diagnostic Code: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
