'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Book } from '../data/books';
import CleanBookCard from './CleanBookCard';
import { useApp } from '../context/AppContext';
import {
  getScrollLoadingConfig,
  prefetchImageUrlsIdle,
} from '../utils/networkOptimization';
import { ChevronDown, Wifi } from 'lucide-react';

export interface ProgressiveBookGridProps {
  books: Book[];
  showRank?: boolean;
  getBadgeText?: (book: Book, index: number) => string | undefined;
  gridClassName?: string;
  initialBatchOverride?: number;
}

/**
 * Scroll-based progressive catalog grid for CleanBookCard collections.
 * - Renders only the initial visible batch on mount so all images and cards are NOT downloaded at once.
 * - Seamlessly auto-scrolls on BOTH fast and slow networks:
 *   - On slow/low-data networks: streams lightweight 4-item micro-batches 360px ahead of the scroll position.
 *   - On fast networks: streams 10-item batches 480px ahead of the scroll position.
 * - Prefetches the next batch's cover URLs during idle frames slightly ahead of the viewport.
 */
export default function ProgressiveBookGrid({
  books,
  showRank = false,
  getBadgeText,
  gridClassName = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9',
  initialBatchOverride,
}: ProgressiveBookGridProps) {
  const { isLowDataActive, isLowEndDevice } = useApp();
  const config = getScrollLoadingConfig(isLowDataActive, isLowEndDevice);

  const initialCount = initialBatchOverride || config.initialBatchSize;
  const [visibleCount, setVisibleCount] = useState<number>(initialCount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset batch count when the underlying filtered/sorted list changes
  const booksSignature = `${books.length}:${books[0]?.id || ''}:${books[books.length - 1]?.id || ''}`;
  const [prevSignature, setPrevSignature] = useState<string>(booksSignature);

  if (booksSignature !== prevSignature) {
    setPrevSignature(booksSignature);
    setVisibleCount(initialCount);
  }

  const hasMore = visibleCount < books.length;
  const remainingCount = Math.max(0, books.length - visibleCount);

  // Ahead-of-viewport idle prefetching for the next batch of covers
  useEffect(() => {
    if (!hasMore) return;
    const nextBatch = books.slice(visibleCount, visibleCount + config.batchIncrement);
    const nextCoverUrls = nextBatch.map((b) => b.coverImage).filter(Boolean);
    return prefetchImageUrlsIdle(nextCoverUrls, isLowDataActive, isLowEndDevice);
  }, [hasMore, visibleCount, config.batchIncrement, books, isLowDataActive, isLowEndDevice]);

  // Seamless automatic infinite scroll observer (active on both fast and low-data connections)
  useEffect(() => {
    if (!hasMore || !config.autoInfiniteScroll) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleCount((prev) => Math.min(books.length, prev + config.batchIncrement));
            break;
          }
        }
      },
      {
        rootMargin: config.sectionRootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, config.autoInfiniteScroll, config.batchIncrement, config.sectionRootMargin, books.length]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(books.length, prev + config.batchIncrement));
  };

  const visibleBooks = books.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      <div className={gridClassName}>
        {visibleBooks.map((book, index) => (
          <CleanBookCard
            key={`${book.id}-${index}`}
            book={book}
            rank={showRank ? index + 1 : undefined}
            badgeText={getBadgeText ? getBadgeText(book, index) : undefined}
            priority={index < 4}
          />
        ))}
      </div>

      {/* Scroll Sentinel + Instant Jump Button */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="pt-2 pb-4 flex flex-col items-center justify-center gap-2.5 text-center"
        >
          {isLowDataActive && (
            <p className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Wifi className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>Data Saver active • Streaming lightweight micro-batches</span>
            </p>
          )}

          <button
            type="button"
            onClick={handleLoadMore}
            className="px-6 py-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-semibold text-[var(--text-main)] inline-flex items-center gap-2 transition cursor-pointer shadow-2xs"
          >
            <span>
              Show More Editions ({remainingCount} remaining)
            </span>
            <ChevronDown className="w-4 h-4 text-[var(--color-primary)]" />
          </button>

          <p className="text-[11px] text-[var(--text-muted)] tabular-nums">
            Showing {visibleBooks.length} of {books.length} editions
          </p>
        </div>
      )}
    </div>
  );
}
