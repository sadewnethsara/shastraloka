import { Book, BOOKS, CATEGORIES } from '../data/books';

export type MatchTier = 'exact' | 'name_contains' | 'fuzzy_similar' | 'category_match' | 'suggested';

export interface RankedBook {
  book: Book;
  matchTier: MatchTier;
  matchLabel: string;
  score: number;
  discountPercent: number;
}

export interface AutocompleteBookSuggestion {
  book: Book;
  matchType: 'Exact Match' | 'Similar Name' | 'Related Treatise';
  discountPercent: number;
}

export interface AutocompleteResult {
  bookSuggestions: AutocompleteBookSuggestion[];
  querySuggestions: string[];
}

export interface SearchFilterOptions {
  query?: string;
  category?: string;
  bindingFormat?: string; // 'All' | Book['binding']
  priceBracket?: 'all' | 'under-2000' | '2000-3500' | 'over-3500';
  minDiscount?: number; // 0 | 20 | 25
  minRating?: number; // 0 | 4.9 | 4.95
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'discount-desc' | 'rating-desc';
}

export interface SearchEngineOutput {
  allItems: RankedBook[];
  primaryMatches: RankedBook[];
  suggestedBooks: RankedBook[];
  hasExactMatch: boolean;
  topMatchedBook: RankedBook | null;
}

export function getOfferPercentage(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Computes character bigram Dice similarity between two strings (0..1)
 * Useful when user types a misspelled or approximate book name.
 */
export function getBigramSimilarity(a: string, b: string): number {
  const s1 = a.toLowerCase().replace(/[^a-z0-9\u0D80-\u0DFF]/g, '');
  const s2 = b.toLowerCase().replace(/[^a-z0-9\u0D80-\u0DFF]/g, '');
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  if (s1.length < 2 || s2.length < 2) {
    return s2.includes(s1) || s1.includes(s2) ? 0.7 : 0;
  }

  const bigrams1 = new Map<string, number>();
  for (let i = 0; i < s1.length - 1; i++) {
    const bg = s1.slice(i, i + 2);
    bigrams1.set(bg, (bigrams1.get(bg) || 0) + 1);
  }

  let intersection = 0;
  for (let i = 0; i < s2.length - 1; i++) {
    const bg = s2.slice(i, i + 2);
    const count = bigrams1.get(bg) || 0;
    if (count > 0) {
      bigrams1.set(bg, count - 1);
      intersection++;
    }
  }

  return (2 * intersection) / (s1.length - 1 + (s2.length - 1));
}

/**
 *Scores a single book against a search query.
 */
export function scoreBookAgainstQuery(book: Book, rawQuery: string): {
  score: number;
  matchTier: MatchTier;
  matchLabel: string;
} {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return {
      score: book.featured ? 50 : 30,
      matchTier: 'category_match',
      matchLabel: book.featured ? 'Bestseller' : 'Featured Edition',
    };
  }

  const titleLower = book.title.toLowerCase();
  const titleWords = titleLower.split(/[\s:,\-–&()']+/).filter(Boolean);
  const sinhalaLower = (book.sinhalaTitle || '').toLowerCase();
  const authorLower = book.author.toLowerCase();
  const descLower = book.description.toLowerCase();
  const categoryLower = book.category.toLowerCase();
  const tagsLower = book.tags.map((t) => t.toLowerCase());

  const bookstoreQueries = [
    'shastraloka',
    'ශාස්ත්රාලෝක',
    'ශාස්ත්‍රලෝක',
    'sarasavi',
    'gunasena',
    'grantha',
    'books.lk',
    'rasakatha',
    'vijitha yapa',
    'makeen',
    'godage',
    'samudra',
  ];

  if (bookstoreQueries.some((bq) => q.includes(bq))) {
    return {
      score: book.featured ? 98 : 78,
      matchTier: book.featured ? 'exact' : 'name_contains',
      matchLabel: book.featured ? 'Shastraloka #1 Choice' : 'Shastraloka Edition',
    };
  }

  // 1. Exact or Primary Title Prefix Match (e.g., "gajaga" or "gaj" matching "Gajaga Wannama...")
  if (
    titleLower === q ||
    titleLower.startsWith(q) ||
    titleWords[0]?.startsWith(q) ||
    tagsLower.some((t) => t === q)
  ) {
    return {
      score: 100 + (titleLower.startsWith(q) ? 15 : 0),
      matchTier: 'exact',
      matchLabel: 'Best Match',
    };
  }

  // 2. Book Name / Title / Sinhala Title / Tag Contains Query or Query Stem
  const stem = q.length >= 4 ? q.slice(0, Math.max(3, q.length - 1)) : q;
  if (
    titleLower.includes(q) ||
    titleWords.some((w) => w.startsWith(q)) ||
    sinhalaLower.includes(q) ||
    tagsLower.some((t) => t.includes(q))
  ) {
    return {
      score: 85,
      matchTier: 'name_contains',
      matchLabel: 'Similar Book Match',
    };
  }

  // 3. Stem or Author/Category/Description Match or Fuzzy Bigram Match (for non-exact / similar names)
  const bestWordSimilarity = Math.max(
    ...titleWords.map((w) => getBigramSimilarity(q, w)),
    ...tagsLower.map((t) => getBigramSimilarity(q, t)),
    getBigramSimilarity(q, titleLower.slice(0, Math.max(q.length + 4, 12)))
  );

  if (
    (stem.length >= 3 && (titleLower.includes(stem) || tagsLower.some((t) => t.includes(stem)))) ||
    authorLower.includes(q) ||
    categoryLower.includes(q) ||
    descLower.includes(q) ||
    bestWordSimilarity >= 0.42
  ) {
    return {
      score: Math.round(55 + bestWordSimilarity * 25),
      matchTier: 'fuzzy_similar',
      matchLabel: 'Similar Title Suggestion',
    };
  }

  // 4. Suggested / Recommended Book (always populate the Pinterest feed after similar matches)
  return {
    score: Math.round(15 + bestWordSimilarity * 20 + (book.featured ? 8 : 0) + book.rating),
    matchTier: 'suggested',
    matchLabel: 'Suggested for You',
  };
}

/**
 * Generates live autocomplete suggestions for the Header Search Bar.
 * Clicking a book suggestion routes straight to `/books/[id]`.
 * Pressing Enter or clicking a query suggestion routes to `/search?q=...`.
 */
export function getAutocompleteSuggestions(
  rawQuery: string,
  books: Book[] = BOOKS
): AutocompleteResult {
  const q = rawQuery.trim();
  if (!q) {
    const featured = books.slice(0, 5).map((book) => ({
      book,
      matchType: 'Exact Match' as const,
      discountPercent: getOfferPercentage(book.price, book.originalPrice),
    }));
    return {
      bookSuggestions: featured,
      querySuggestions: [
        'gajaga',
        'gajaga wannama',
        'mahavamsa chronicle',
        'ancient ayurveda',
        'selalihini sandeshaya',
      ],
    };
  }

  const scored = books
    .map((book) => {
      const { score, matchTier } = scoreBookAgainstQuery(book, q);
      return {
        book,
        score,
        matchTier,
        discountPercent: getOfferPercentage(book.price, book.originalPrice),
      };
    })
    .sort((a, b) => b.score - a.score);

  const bookSuggestions: AutocompleteBookSuggestion[] = scored.slice(0, 6).map((item) => ({
    book: item.book,
    matchType:
      item.matchTier === 'exact'
        ? 'Exact Match'
        : item.matchTier === 'name_contains' || item.matchTier === 'fuzzy_similar'
        ? 'Similar Name'
        : 'Related Treatise',
    discountPercent: item.discountPercent,
  }));

  const qLower = q.toLowerCase();
  const dynamicQueries = new Set<string>();
  dynamicQueries.add(qLower);

  scored.slice(0, 5).forEach(({ book }) => {
    const shortTitle = book.title.split(':')[0].trim().toLowerCase();
    if (shortTitle) dynamicQueries.add(shortTitle);
    book.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(qLower.slice(0, 3))) {
        dynamicQueries.add(tag.toLowerCase());
      }
    });
  });

  if (qLower.startsWith('gaj')) {
    dynamicQueries.add('gajaga');
    dynamicQueries.add('gajaga wannama');
    dynamicQueries.add('gajabahu chronicle');
    dynamicQueries.add('gajaga hasti shastraya');
  }

  return {
    bookSuggestions,
    querySuggestions: Array.from(dynamicQueries).slice(0, 5),
  };
}

/**
 * Searches, filters, and ranks books for the Pinterest Search & Category Discovery body.
 * - First card(s) are the closest / similar matching books.
 * - Remaining cards are suggested books so the masonry grid is always rich and complete.
 */
export function searchAndRankBooks(
  options: SearchFilterOptions,
  books: Book[] = BOOKS
): SearchEngineOutput {
  const {
    query = '',
    category = 'All Treatises',
    bindingFormat = 'All',
    priceBracket = 'all',
    minDiscount = 0,
    minRating = 0,
    sortBy = 'relevance',
  } = options;

  const trimmedQuery = query.trim();

  // Check if the query itself matches one of our category names
  const matchedCategoryFromQuery = CATEGORIES.find(
    (c) =>
      c !== 'All Treatises' &&
      (c.toLowerCase() === trimmedQuery.toLowerCase() ||
        c.toLowerCase().includes(trimmedQuery.toLowerCase()))
  );

  const effectiveCategory =
    category && category !== 'All Treatises'
      ? category
      : matchedCategoryFromQuery && trimmedQuery.length > 5
      ? matchedCategoryFromQuery
      : 'All Treatises';

  // Step 1: Apply hard attribute filters (Binding, Price Bracket, Discount, Rating)
  const attributeFiltered = books.filter((book) => {
    if (bindingFormat && bindingFormat !== 'All' && book.binding !== bindingFormat) {
      return false;
    }
    if (priceBracket === 'under-2000' && book.price >= 2000) return false;
    if (priceBracket === '2000-3500' && (book.price < 2000 || book.price > 3500)) return false;
    if (priceBracket === 'over-3500' && book.price <= 3500) return false;

    const discount = getOfferPercentage(book.price, book.originalPrice);
    if (minDiscount > 0 && discount < minDiscount) return false;
    if (minRating > 0 && book.rating < minRating) return false;

    return true;
  });

  // Step 2: Score against query and category
  const ranked: RankedBook[] = attributeFiltered.map((book) => {
    const discountPercent = getOfferPercentage(book.price, book.originalPrice);

    // If user selected a category without a specific non-category keyword query
    if (
      effectiveCategory !== 'All Treatises' &&
      (!trimmedQuery ||
        effectiveCategory.toLowerCase().includes(trimmedQuery.toLowerCase()))
    ) {
      const inCategory = book.category === effectiveCategory;
      return {
        book,
        matchTier: inCategory ? 'category_match' : 'suggested',
        matchLabel: inCategory ? effectiveCategory.split(' (')[0] : 'Suggested Treatise',
        score: inCategory ? 90 + (book.featured ? 5 : 0) : 25 + (book.featured ? 5 : 0),
        discountPercent,
      };
    }

    // Otherwise score against the search query
    const scored = scoreBookAgainstQuery(book, trimmedQuery);
    const categoryBonus =
      effectiveCategory !== 'All Treatises' && book.category === effectiveCategory ? 20 : 0;

    return {
      book,
      matchTier: scored.matchTier,
      matchLabel: scored.matchLabel,
      score: scored.score + categoryBonus,
      discountPercent,
    };
  });

  // Separate into primary matches (exact, name_contains, fuzzy_similar, category_match) and suggested books
  let primaryMatches = ranked.filter((item) => item.matchTier !== 'suggested');
  let suggestedBooks = ranked.filter((item) => item.matchTier === 'suggested');

  // If the user typed a completely unknown book name that didn't hit even fuzzy_similar,
  // promote the highest-scoring book(s) as 'fuzzy_similar' ("Closest Similar Book") so the first card is always the closest match!
  if (trimmedQuery && primaryMatches.length === 0 && suggestedBooks.length > 0) {
    suggestedBooks.sort((a, b) => b.score - a.score);
    const closest = suggestedBooks.slice(0, 2).map((item, idx) => ({
      ...item,
      matchTier: 'fuzzy_similar' as MatchTier,
      matchLabel: idx === 0 ? 'Closest Similar Book' : 'Similar Treatise',
      score: item.score + 30,
    }));
    primaryMatches = closest;
    suggestedBooks = suggestedBooks.slice(2);
  }

  // Sort function respecting user's sortBy choice while keeping primary matches ahead of suggestions in 'relevance' mode
  const sortFn = (a: RankedBook, b: RankedBook) => {
    if (sortBy === 'price-asc') return a.book.price - b.book.price;
    if (sortBy === 'price-desc') return b.book.price - a.book.price;
    if (sortBy === 'discount-desc') return b.discountPercent - a.discountPercent;
    if (sortBy === 'rating-desc') return b.book.rating - a.book.rating;
    return b.score - a.score;
  };

  primaryMatches.sort(sortFn);
  suggestedBooks.sort(sortFn);

  // If user selected a specific category and no search query, show category matches first, plus suggested books if needed
  const allItems =
    sortBy === 'relevance'
      ? [...primaryMatches, ...suggestedBooks]
      : [...primaryMatches, ...suggestedBooks].sort(sortFn);

  const hasExactMatch = primaryMatches.some((m) => m.matchTier === 'exact');
  const topMatchedBook = primaryMatches[0] || allItems[0] || null;

  return {
    allItems,
    primaryMatches,
    suggestedBooks,
    hasExactMatch,
    topMatchedBook,
  };
}
