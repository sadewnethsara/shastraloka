import type { MetadataRoute } from 'next';
import { SEO_BRAND } from '../utils/seoConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          '*',
          'Googlebot',
          'Googlebot-Image',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Applebot-Extended',
          'facebookexternalhit',
          'WhatsApp',
          'Twitterbot',
          'LinkedInBot',
        ],
        allow: '/',
      },
    ],
    host: SEO_BRAND.primaryUrl,
    sitemap: [
      `${SEO_BRAND.primaryUrl}/sitemap.xml`,
      `https://${SEO_BRAND.sinhalaDomainPunycode}/sitemap.xml`,
    ],
  };
}
