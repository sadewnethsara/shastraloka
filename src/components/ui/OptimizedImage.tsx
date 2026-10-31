'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { getAdaptiveImageUrl } from '../../utils/networkOptimization';

export const DEFAULT_FALLBACK_BOOK_COVER =
  'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  targetWidth?: number;
  wrapperClassName?: string;
  shimmerClassName?: string;
  rootMargin?: string;
}

/**
 * Instant, zero-waterfall progressive image component:
 * - Passes the real `src` directly to the browser with native `loading="lazy"` (or `"eager"` for priority)
 *   so the browser's C++ preload scanner and native lazy-loader fetch images ~1500px ahead of scroll
 *   without waiting for a React useEffect -> IntersectionObserver -> setState waterfall.
 * - Immediately checks `imgRef.current.complete` on mount so cached images render in 0ms with zero flicker.
 * - Never downgrades `fetchPriority` to `"low"`, allowing visible and approaching images to download at full speed.
 * - Compresses image URLs only when `isLowDataActive` (slow 2G/3G or Data Saver ON) is active.
 */
export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_BOOK_COVER,
  priority = false,
  targetWidth,
  className = '',
  wrapperClassName = '',
  shimmerClassName = '',
  onError,
  onLoad,
  ...rest
}: OptimizedImageProps) {
  const { isLowDataActive } = useApp();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const resolvedSrc = getAdaptiveImageUrl(src || fallbackSrc, {
    isLowDataActive,
    targetWidth,
  });

  const [currentSrc, setCurrentSrc] = useState<string>(resolvedSrc);
  const [prevPropSrc, setPrevPropSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  if (src !== prevPropSrc) {
    setPrevPropSrc(src);
    setCurrentSrc(
      getAdaptiveImageUrl(src || fallbackSrc, {
        isLowDataActive,
        targetWidth,
      })
    );
  }

  // If the image is already in browser cache on mount, mark loaded immediately
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    setIsLoaded(true);
    if (onError) onError(e);
  };

  return (
    <>
      {!isLoaded && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none image-skeleton-shimmer ${shimmerClassName}`}
        />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`${className} ${wrapperClassName}`}
        {...rest}
      />
    </>
  );
}
