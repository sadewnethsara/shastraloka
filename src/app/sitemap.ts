import type { MetadataRoute } from 'next';
import { BOOKS, CATEGORIES } from '../data/books';
import { SEO_BRAND } from '../utils/seoConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    {
      url: SEO_BRAND.primaryUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          'en-LK': SEO_BRAND.primaryUrl,
          'si-LK': SEO_BRAND.sinhalaUrl,
        },
      },
    },
    {
      url: `${SEO_BRAND.primaryUrl}/search`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SEO_BRAND.primaryUrl}/bag`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SEO_BRAND.primaryUrl}/orders`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${SEO_BRAND.primaryUrl}/profile`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

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
    (c) => c !== 'All Treatises'
  ).map((cat) => ({
    url: `${SEO_BRAND.primaryUrl}/search?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  return [...corePages, ...bookPages, ...categorySearchPages];
}
