import { NextRequest, NextResponse } from 'next/server';
import { BOOKS } from '../../../data/books';
import { enforceRateLimit } from '../../../lib/serverSecurity';
import { sanitizeSearchQuery, sanitizeSingleLine } from '../../../utils/security';

/**
 * GET /api/books
 * Paginated, cache-friendly book catalog endpoint for scroll-based loading and low-data clients.
 * Supports:
 * - offset (default 0)
 * - limit (default 10, max 40)
 * - category
 * - q (search query)
 * - sort ('popular' | 'rating' | 'price-asc' | 'price-desc' | 'latest')
 * - lite ('1' or 'true' to strip heavy descriptions/excerpts for grid views)
 */
export async function GET(req: NextRequest) {
  const rateLimitError = enforceRateLimit(req, 'books-catalog', 120, 60_000);
  if (rateLimitError) return rateLimitError;

  const { searchParams } = new URL(req.url);
  const rawOffset = Number(searchParams.get('offset') || '0');
  const rawLimit = Number(searchParams.get('limit') || '10');
  const category = sanitizeSingleLine(searchParams.get('category') || '', 80);
  const query = sanitizeSearchQuery(searchParams.get('q') || '');
  const sort = sanitizeSingleLine(searchParams.get('sort') || 'popular', 30);
  const isLite = searchParams.get('lite') === '1' || searchParams.get('lite') === 'true';

  const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? Math.floor(rawOffset) : 0;
  const limit =
    Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(40, Math.floor(rawLimit)) : 10;

  let filtered = [...BOOKS];

  if (category && category !== 'All Books' && category !== 'All Treatises') {
    filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const qLower = query.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(qLower) ||
        b.author.toLowerCase().includes(qLower) ||
        b.category.toLowerCase().includes(qLower) ||
        b.tags.some((t) => t.toLowerCase().includes(qLower))
    );
  }

  if (sort === 'popular') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'latest') {
    filtered.reverse();
  }

  const total = filtered.length;
  const slice = filtered.slice(offset, offset + limit);

  const items = isLite
    ? slice.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        price: book.price,
        originalPrice: book.originalPrice,
        rating: book.rating,
        reviewsCount: book.reviewsCount,
        coverImage: book.coverImage,
        binding: book.binding,
        inStock: book.inStock,
        featured: book.featured,
        heightRatio: book.heightRatio,
      }))
    : slice;

  return NextResponse.json(
    {
      items,
      total,
      offset,
      limit,
      hasMore: offset + limit < total,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    }
  );
}
