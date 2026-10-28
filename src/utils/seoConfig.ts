import { BOOKS, CATEGORIES, Book } from '../data/books';
import { getOfferPercentage } from './searchEngine';

export const SEO_BRAND = {
  nameEn: 'Shastraloka',
  nameSi: 'ශාස්ත්රාලෝක',
  nameSiAlt: 'ශාස්ත්‍රලෝක',
  primaryDomain: 'shastraloka.lk',
  sinhalaDomain: 'ශාස්ත්රාලෝක.ලංකා',
  sinhalaDomainPunycode: 'xn--j1b1a4b2a9d2a.xn--fzc2c9e2c',
  primaryUrl: 'https://shastraloka.lk',
  sinhalaUrl: 'https://ශාස්ත්රාලෝක.ලංකා',
  title:
    'Shastraloka (ශාස්ත්රාලෝක) | Sri Lanka’s #1 Online Bookstore — shastraloka.lk & ශාස්ත්රාලෝක.ලංකා',
  shortTitle: 'Shastraloka (ශාස්ත්රාලෝක) | Online Bookstore Sri Lanka',
  description:
    'Shop Sri Lanka’s #1 online bookstore at shastraloka.lk (ශාස්ත්රාලෝක.ලංකා). Discover Sinhala & English books, Mahavamsa, Gajaga Wannama, Buddhist treatises, Ayurveda & literary classics with up to 28% OFF in LKR and islandwide courier delivery.',
} as const;

/**
 * Comprehensive SEO keyword bank covering:
 * - Bilingual brand names & domains (shastraloka.lk, ශාස්ත්රාලෝක.ලංකා)
 * - Competitive Sri Lankan online bookstore search intents (Sarasavi, Gunasena, Grantha, Books.lk, Rasakatha, Vijitha Yapa, etc.)
 * - High-volume Sinhala & English book queries
 */
export const SEO_KEYWORDS: string[] = [
  // Core Brand & Domains
  'Shastraloka',
  'ශාස්ත්රාලෝක',
  'ශාස්ත්‍රලෝක',
  'shastraloka.lk',
  'ශාස්ත්රාලෝක.ලංකා',
  'Shastraloka online bookstore',
  'Shastraloka bookshop Sri Lanka',
  'ශාස්ත්රාලෝක පොත්හල',
  'ශාස්ත්‍රලෝක පොත්',

  // Competitive Sri Lankan Bookstores & Search Discovery Terms
  'online book store Sri Lanka',
  'buy books online Sri Lanka',
  'Sinhala books online',
  'Sarasavi bookshop online',
  'sarasavi.lk',
  'Sarasavi books',
  'M.D. Gunasena',
  'gunasena.lk',
  'Gunasena bookshop Sri Lanka',
  'Grantha.lk',
  'grantha sinhala books',
  'Books.lk',
  'books.lk online bookstore',
  'Rasakatha',
  'rasakatha books',
  'rasakatha sinhala novels',
  'Vijitha Yapa bookshop',
  'Makeen Books Sri Lanka',
  'Godage bookshop',
  'Samudra bookshop',
  'Sooriya publishers',
  'Sanhinda books',
  'Colombo International Book Fair online',
  'BMICH book fair offers LKR',

  // Featured Treatises & Literary Categories
  'Gajaga Wannama book',
  'ගජගා වන්නම',
  'Gajabahu chronicle',
  'Mahavamsa Great Chronicle buy online',
  'මහාවංසය',
  'Visuddhimagga Path of Purification',
  'Dhammapada Sinhala English',
  'Selalihini Sandeshaya',
  'Pansiya Panas Jataka Potha',
  'පන්සිය පනස් ජාතක පොත් වහන්සේ',
  'Deshiya Wedakama Ayurveda books Sri Lanka',
  'Sigiriya Kurutu Gee Mirror Wall',
  'Ancient Ceylon manuscripts',
  'Ola leaf palm manuscripts Sri Lanka',
  'Buddhist philosophy books Sri Lanka',
  'Discount books LKR Sri Lanka',
];

/**
 * Generates the comprehensive Schema.org @graph JSON-LD for the root application
 * so Google, Bing, WhatsApp, Facebook, ChatGPT, Gemini, Claude, and Perplexity
 * index Shastraloka (ශාස්ත්රාලෝක) and all its books with LKR pricing and ratings.
 */
export function buildGlobalSchemaGraph(books: Book[] = BOOKS) {
  const bookProductEntities = books.slice(0, 12).map((book) => {
    const discountPercent = getOfferPercentage(book.price, book.originalPrice);
    return {
      '@type': ['Book', 'Product'],
      '@id': `${SEO_BRAND.primaryUrl}/books/${book.id}#book`,
      name: book.title,
      alternateName: book.sinhalaTitle,
      url: `${SEO_BRAND.primaryUrl}/books/${book.id}`,
      image: book.coverImage,
      description: book.description,
      author: {
        '@type': 'Person',
        name: book.author,
      },
      bookFormat: 'https://schema.org/Hardcover',
      numberOfPages: book.pages,
      inLanguage: ['si-LK', 'en-LK'],
      genre: book.category,
      keywords: [...book.tags, SEO_BRAND.nameEn, SEO_BRAND.nameSi].join(', '),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: book.rating,
        reviewCount: book.reviewsCount,
        bestRating: 5,
        worstRating: 1,
      },
      offers: {
        '@type': 'Offer',
        url: `${SEO_BRAND.primaryUrl}/books/${book.id}`,
        priceCurrency: 'LKR',
        price: book.price,
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'BookStore',
          name: `${SEO_BRAND.nameEn} (${SEO_BRAND.nameSi})`,
          url: SEO_BRAND.primaryUrl,
        },
        ...(discountPercent > 0
          ? {
              description: `${discountPercent}% OFF (Original price LKR ${book.originalPrice})`,
            }
          : {}),
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['BookStore', 'OnlineStore', 'Organization'],
        '@id': `${SEO_BRAND.primaryUrl}/#organization`,
        name: `${SEO_BRAND.nameEn} (${SEO_BRAND.nameSi})`,
        legalName: 'Shastraloka Classical Bookstore & Heritage Library (ශාස්ත්රාලෝක)',
        alternateName: [
          'ශාස්ත්රාලෝක',
          'ශාස්ත්‍රලෝක',
          'Shastraloka',
          'shastraloka.lk',
          'ශාස්ත්රාලෝක.ලංකා',
          'Shastraloka Online Bookstore Sri Lanka',
        ],
        url: SEO_BRAND.primaryUrl,
        sameAs: [
          SEO_BRAND.sinhalaUrl,
          `https://${SEO_BRAND.sinhalaDomainPunycode}`,
          'https://shastraloka.lk',
        ],
        logo: `${SEO_BRAND.primaryUrl}/logo.png`,
        image: `${SEO_BRAND.primaryUrl}/logo.png`,
        description: SEO_BRAND.description,
        currenciesAccepted: 'LKR, USD',
        paymentAccepted: 'Cash on Delivery, Visa, Mastercard, LankaQR, Bank Transfer',
        priceRange: 'LKR 1,450 - LKR 7,200',
        areaServed: {
          '@type': 'Country',
          name: 'Sri Lanka',
        },
        knowsAbout: [
          ...CATEGORIES,
          'Sinhala Literature',
          'Sri Lankan Bookstores',
          'Gajaga Wannama',
          'Mahavamsa',
          'Buddhist Philosophy',
          'Indigenous Ayurveda',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SEO_BRAND.primaryUrl}/#website`,
        url: SEO_BRAND.primaryUrl,
        name: `${SEO_BRAND.nameEn} (${SEO_BRAND.nameSi})`,
        alternateName: ['ශාස්ත්රාලෝක.ලංකා', 'shastraloka.lk', 'ශාස්ත්රාලෝක'],
        publisher: {
          '@id': `${SEO_BRAND.primaryUrl}/#organization`,
        },
        inLanguage: ['en-LK', 'si-LK'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SEO_BRAND.primaryUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SEO_BRAND.primaryUrl}/#catalog`,
        name: 'Shastraloka (ශාස්ත්රාලෝක) Bestselling Sri Lankan Books & Classical Treatises',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: bookProductEntities.length,
        itemListElement: bookProductEntities.map((entity, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: entity,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SEO_BRAND.primaryUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where can I buy Sinhala and Sri Lankan books online with islandwide LKR delivery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Shastraloka (ශාස්ත්රාලෝක) at shastraloka.lk and ශාස්ත්රාලෝක.ලංකා is Sri Lanka’s premier online bookstore offering up to 28% OFF in LKR on classical Sinhala books, Mahavamsa, Gajaga Wannama, Buddhist treatises, Jataka tales, and Ayurveda texts with fast courier delivery across all 25 districts of Sri Lanka. Readers searching for Sarasavi, Gunasena, Grantha.lk, Books.lk, Rasakatha, or Vijitha Yapa editions can browse and compare collector bindings directly on Shastraloka.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the official domains for Shastraloka (ශාස්ත්රාලෝක)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The official domains are https://shastraloka.lk (English .lk domain) and https://ශාස්ත්රාලෝක.ලංකා (Sinhala .ලංකා IDN domain).',
            },
          },
        ],
      },
    ],
  };
}
