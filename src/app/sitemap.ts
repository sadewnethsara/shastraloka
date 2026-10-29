import type { MetadataRoute } from 'next';
import { BOOKS, CATEGORIES } from '../data/books';
import { SEO_BRAND } from '../utils/seoConfig';

const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/books', priority: 0.95, changeFrequency: 'daily' as const },
  { path: '/bestsellers', priority: 0.95, changeFrequency: 'daily' as const },
  { path: '/new-releases', priority: 0.95, changeFrequency: 'daily' as const },
  { path: '/gifts', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/gift-cards', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/offers', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/archives', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/categories', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/authors', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/publishers', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/search', priority: 0.95, changeFrequency: 'daily' as const },
  { path: '/wishlist', priority: 0.75, changeFrequency: 'weekly' as const },
  { path: '/bag', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/orders', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/track-order', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/profile', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/help', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/terms', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/shipping-returns', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/scholars/submit-manuscript', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/scholars/grants', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/maintenance', priority: 0.3, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SEO_BRAND.primaryUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        'en-LK': `${SEO_BRAND.primaryUrl}${route.path}`,
        'si-LK': `${SEO_BRAND.sinhalaUrl}${route.path}`,
      },
    },
  }));

  const bookPages: MetadataRoute.Sitemap = BOOKS.map((book) => ({
    url: `${SEO_BRAND.primaryUrl}/books/${book.id}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.9,
    alternates: {
      languages: {
        'en-LK': `${SEO_BRAND.primaryUrl}/books/${book.id}`,
        'si-LK': `${SEO_BRAND.sinhalaUrl}/books/${book.id}`,
      },
    },
  }));

  const categorySearchPages: MetadataRoute.Sitemap = CATEGORIES.filter(
    (c) => c !== 'All Books'
  ).map((cat) => ({
    url: `${SEO_BRAND.primaryUrl}/search?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  return [...corePages, ...bookPages, ...categorySearchPages];
}
