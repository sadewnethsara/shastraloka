'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export interface ViewportSectionProps {
  children: React.ReactNode;
  minHeight?: number;
  className?: string;
  rootMargin?: string;
  eager?: boolean;
  skeletonTitle?: string;
}

/**
 * Viewport-gated section container with generous 1200px lookahead margin:
 * - On fast/standard connections, mounts below-the-fold sections 1200px (~1.5 screen heights)
 *   BEFORE the user scrolls to them, so images inside are already loaded by the time they enter view.
 * - On low-data connections, mounts 700px ahead of scroll so scrolling still feels completely instant.
 */
export default function ViewportSection({
  children,
  minHeight = 280,
  className = '',
  rootMargin,
  eager = false,
  skeletonTitle,
}: ViewportSectionProps) {
  const { isLowDataActive } = useApp();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(eager);

  const effectiveMargin =
    rootMargin || (isLowDataActive ? '700px 0px' : '1200px 0px');

  useEffect(() => {
    if (isMounted) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const fallbackTimer = setTimeout(() => setIsMounted(true), 0);
      return () => clearTimeout(fallbackTimer);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsMounted(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        rootMargin: effectiveMargin,
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMounted, effectiveMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isMounted ? (
        children
      ) : (
        <div
          style={{ minHeight: `${minHeight}px` }}
          className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
          aria-busy="true"
        >
          <div className="space-y-2.5">
            {skeletonTitle ? (
              <p className="text-sm font-bold text-[var(--text-muted)]">{skeletonTitle}</p>
            ) : (
              <div className="h-5 w-48 rounded-lg image-skeleton-shimmer" />
            )}
            <div className="h-3.5 w-64 max-w-full rounded-md image-skeleton-shimmer" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 mt-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`${i >= 2 ? 'hidden sm:block' : ''} ${
                  i >= 3 ? 'sm:hidden md:block' : ''
                } space-y-2`}
              >
                <div className="aspect-[3/4] w-full rounded-xl image-skeleton-shimmer" />
                <div className="h-3.5 w-3/4 rounded image-skeleton-shimmer" />
                <div className="h-3 w-1/2 rounded image-skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
