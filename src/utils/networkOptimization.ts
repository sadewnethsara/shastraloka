'use client';

export type DataSaverMode = 'auto' | 'on' | 'off';

export interface NetworkDeviceProfile {
  isSlowNetwork: boolean;
  saveDataEnabled: boolean;
  effectiveType: string;
  downlinkMbps: number | null;
  isLowEndDevice: boolean;
  cpuCores: number | null;
  deviceMemoryGb: number | null;
  prefersReducedMotion: boolean;
}

export interface ScrollLoadingConfig {
  initialBatchSize: number;
  batchIncrement: number;
  imageRootMargin: string;
  sectionRootMargin: string;
  autoInfiniteScroll: boolean;
}

interface NavigatorConnectionLike {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

interface ExtendedNavigator extends Navigator {
  connection?: NavigatorConnectionLike;
  mozConnection?: NavigatorConnectionLike;
  webkitConnection?: NavigatorConnectionLike;
  deviceMemory?: number;
}

export const DEFAULT_NETWORK_PROFILE: NetworkDeviceProfile = {
  isSlowNetwork: false,
  saveDataEnabled: false,
  effectiveType: '4g',
  downlinkMbps: null,
  isLowEndDevice: false,
  cpuCores: null,
  deviceMemoryGb: null,
  prefersReducedMotion: false,
};

export function getNavigatorConnection(): NavigatorConnectionLike | null {
  if (typeof navigator === 'undefined') return null;
  const nav = navigator as ExtendedNavigator;
  return nav.connection || nav.mozConnection || nav.webkitConnection || null;
}

/**
 * Safely detects network speed, browser Save-Data header, and low-end device hardware
 * across Chrome, Safari, Firefox, Edge, and older mobile browsers.
 */
export function detectNetworkAndDeviceProfile(): NetworkDeviceProfile {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return DEFAULT_NETWORK_PROFILE;
  }

  const nav = navigator as ExtendedNavigator;
  const conn = getNavigatorConnection();

  const saveDataEnabled = Boolean(conn?.saveData);
  const effectiveType = typeof conn?.effectiveType === 'string' ? conn.effectiveType : '4g';
  const downlinkMbps = typeof conn?.downlink === 'number' ? conn.downlink : null;

  const isSlowEffectiveType =
    effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g';
  const isSlowDownlink = downlinkMbps !== null && downlinkMbps > 0 && downlinkMbps < 1.5;
  const isSlowNetwork = saveDataEnabled || isSlowEffectiveType || isSlowDownlink;

  const cpuCores =
    typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency > 0
      ? nav.hardwareConcurrency
      : null;
  const deviceMemoryGb =
    typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 ? nav.deviceMemory : null;

  let prefersReducedMotion = false;
  try {
    if (typeof window.matchMedia === 'function') {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  } catch {
    prefersReducedMotion = false;
  }

  const isLowEndDevice =
    (cpuCores !== null && cpuCores <= 2) ||
    (deviceMemoryGb !== null && deviceMemoryGb <= 2) ||
    prefersReducedMotion;

  return {
    isSlowNetwork,
    saveDataEnabled,
    effectiveType,
    downlinkMbps,
    isLowEndDevice,
    cpuCores,
    deviceMemoryGb,
    prefersReducedMotion,
  };
}

export function validateDataSaverMode(input: unknown): DataSaverMode {
  if (input === 'on' || input === 'off' || input === 'auto') {
    return input;
  }
  return 'auto';
}

export function resolveIsLowDataActive(
  mode: DataSaverMode,
  profile: NetworkDeviceProfile
): boolean {
  if (mode === 'on') return true;
  if (mode === 'off') return false;
  return profile.isSlowNetwork;
}

/**
 * Returns adaptive scroll-loading parameters with generous lookahead margins:
 * - On Low Data / Slow Networks: streams 6-item batches 700px ahead of the scroll position.
 * - On Standard / Fast Networks: renders 12 items initially and streams 10-item batches 1000px ahead
 *   of scroll so the user never sees a loading delay while scrolling.
 */
export function getScrollLoadingConfig(
  isLowDataActive: boolean,
  isLowEndDevice: boolean
): ScrollLoadingConfig {
  if (isLowDataActive) {
    return {
      initialBatchSize: 8,
      batchIncrement: 6,
      imageRootMargin: '600px 0px',
      sectionRootMargin: '700px 0px',
      autoInfiniteScroll: true,
    };
  }

  if (isLowEndDevice) {
    return {
      initialBatchSize: 10,
      batchIncrement: 8,
      imageRootMargin: '800px 0px',
      sectionRootMargin: '900px 0px',
      autoInfiniteScroll: true,
    };
  }

  return {
    initialBatchSize: 12,
    batchIncrement: 10,
    imageRootMargin: '1000px 0px',
    sectionRootMargin: '1000px 0px',
    autoInfiniteScroll: true,
  };
}

export interface AdaptiveImageOptions {
  isLowDataActive?: boolean;
  isLowEndDevice?: boolean;
  targetWidth?: number;
}

/**
 * Preserves exact original CDN URLs on normal/fast connections so browser HTTP caches hit in 0ms,
 * and rewrites to lightweight compressed dimensions ONLY when Low Data / Data Saver is active.
 */
export function getAdaptiveImageUrl(
  rawUrl: string,
  options: AdaptiveImageOptions = {}
): string {
  if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
  if (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) return rawUrl;

  const { isLowDataActive = false, targetWidth } = options;

  // On normal/fast connections, keep the exact original URL so cached images never re-fetch
  if (!isLowDataActive) {
    return rawUrl;
  }

  try {
    if (rawUrl.includes('images.unsplash.com')) {
      const parsed = new URL(rawUrl);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      parsed.searchParams.set('w', String(targetWidth || 280));
      parsed.searchParams.set('q', '55');
      return parsed.toString();
    }
  } catch {
    // Fallback to original URL
  }

  return rawUrl;
}

const prefetchedUrlsCache = new Set<string>();

/**
 * Immediately warms the browser cache for the next scroll batch's cover URLs
 * so the user experiences zero visual delay as they scroll.
 */
export function prefetchImageUrlsIdle(
  urls: string[],
  isLowDataActive: boolean,
  isLowEndDevice: boolean
): () => void {
  if (typeof window === 'undefined' || urls.length === 0) {
    return () => {};
  }

  let cancelled = false;
  const maxToPrefetch = isLowDataActive ? 6 : isLowEndDevice ? 8 : 12;
  const candidateUrls = urls
    .filter((u) => Boolean(u) && !prefetchedUrlsCache.has(u))
    .slice(0, maxToPrefetch);

  if (candidateUrls.length === 0) {
    return () => {};
  }

  const runPrefetch = () => {
    if (cancelled) return;
    candidateUrls.forEach((rawUrl) => {
      const adaptedUrl = getAdaptiveImageUrl(rawUrl, {
        isLowDataActive,
        isLowEndDevice,
      });
      if (prefetchedUrlsCache.has(adaptedUrl)) return;
      prefetchedUrlsCache.add(adaptedUrl);
      prefetchedUrlsCache.add(rawUrl);

      const img = new window.Image();
      img.decoding = 'async';
      img.src = adaptedUrl;
    });
  };

  const timerId = window.setTimeout(runPrefetch, 16);
  return () => {
    cancelled = true;
    window.clearTimeout(timerId);
  };
}
