'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import BookModal from '../components/BookModal';
import BoardsModal from '../components/BoardsModal';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { BOOKS } from '../data/books';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const FALLBACK_BOOK_COVER =
  'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

const handleCoverError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_BOOK_COVER) {
    target.src = FALLBACK_BOOK_COVER;
  }
};

// --- DATA DEFINITIONS ---

interface SimpleCardItem {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  query?: string;
  bookId?: string;
}

interface ProductItem {
  id: string;
  bookId: string;
  title: string;
  price: string;
  image: string;
  desktopOnly?: boolean;
}

interface DealItem {
  id: string;
  bookId: string;
  title: string;
  salePrice: string;
  originalPrice: string;
  discount: string;
  image: string;
}

const FEATURED_INTERESTS: SimpleCardItem[] = [
  {
    id: 'fi-1',
    title: 'Gajaga Wannama & Royal Lore',
    image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
    query: 'gajaga',
  },
  {
    id: 'fi-2',
    title: 'Manikkawatha & Chronicles',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Ancient Chronicles (Itihasa)',
  },
  {
    id: 'fi-3',
    title: 'Senkottan & Sabaragamuwa',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
    query: 'Indigenous Ayurveda (Deshiya Wedakama)',
  },
  {
    id: 'fi-4',
    title: 'May Mara Prasangaya & Kavya',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
    query: 'Classical Sinhala Poetry (Kavya)',
  },
];

const BEST_COLLECTIONS: SimpleCardItem[] = [
  {
    id: 'bc-1',
    title: 'Amma & Sinhala Classics',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
    query: 'Mahavamsa',
  },
  {
    id: 'bc-2',
    title: 'Wassana Sihinaya & Novels',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
    query: 'Buddhist Philosophy (Abhidhamma)',
  },
  {
    id: 'bc-3',
    title: 'Bala Muduwe Mithuru Epic Sets',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
    query: 'Jataka Stories & Folk Wisdom',
  },
  {
    id: 'bc-4',
    title: 'Sanda & Dhammapada Wisdom',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
    query: 'Dhammapada',
  },
  {
    id: 'bc-5',
    title: 'Chemmani & Udupussallawa Editions',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
    query: 'Udupussallawa',
  },
];

const HERO_FEATURE_CARDS: SimpleCardItem[] = [
  {
    id: 'hfc-1',
    title: 'Manikkawatha — LKR 960',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Manikkawatha',
  },
  {
    id: 'hfc-2',
    title: 'Senkottan — LKR 840',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
    query: 'Senkottan',
  },
  {
    id: 'hfc-3',
    title: 'May Mara Prasangaya — LKR 920',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
    query: 'May Mara',
  },
];

const FEATURED_TREATISE_PRODUCTS: ProductItem[] = [
  {
    id: 'cp-1',
    bookId: 'gajaga-wannama-royal-chronicle',
    title: 'Gajaga Wannama: Royal Court Elephant Lore',
    price: 'LKR 950',
    image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
  },
  {
    id: 'cp-2',
    bookId: 'gajabahu-raja-puwatha',
    title: 'Manikkawatha & Gajabahu Puwatha',
    price: 'LKR 960',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'cp-3',
    bookId: 'gajaga-hasti-palana-shastraya',
    title: 'Senkottan: Sabaragamuwa Heritage',
    price: 'LKR 840',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
  },
  {
    id: 'cp-4',
    bookId: 'chaddanta-gajaga-jataka-illustrated',
    title: 'May Mara Prasangaya',
    price: 'LKR 920',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
  },
  {
    id: 'cp-5',
    bookId: 'mahawamsa-great-chronicle',
    title: 'Amma & Mahavamsa Chronicle',
    price: 'LKR 1,150',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
    desktopOnly: true,
  },
  {
    id: 'cp-6',
    bookId: 'pansiya-panas-jataka-potha',
    title: 'Bala Muduwe Mithuru Vol. II',
    price: 'LKR 1,850',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
    desktopOnly: true,
  },
];

const SPECIAL_TREATISE_PILLS: SimpleCardItem[] = [
  {
    id: 'stp-1',
    title: 'Gajaga & Royal Lore',
    image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
    query: 'gajaga',
  },
  {
    id: 'stp-2',
    title: 'Manikkawatha Novels',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Manikkawatha',
  },
  {
    id: 'stp-3',
    title: 'Wassana Sihinaya',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
    query: 'Wassana',
  },
  {
    id: 'stp-4',
    title: 'Nedamma & Sandesha',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
    query: 'Sandesha',
  },
  {
    id: 'stp-5',
    title: 'Muses Collector Sets',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
    query: 'Bala Muduwe',
  },
];

const MOST_LOVED_CATEGORIES: SimpleCardItem[] = [
  {
    id: 'mlc-1',
    title: 'Ancient Chronicles (Itihasa)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Ancient Chronicles (Itihasa)',
  },
  {
    id: 'mlc-2',
    title: 'Buddhist Philosophy (Abhidhamma)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
    query: 'Buddhist Philosophy (Abhidhamma)',
  },
  {
    id: 'mlc-3',
    title: 'Classical Sinhala Poetry (Kavya)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
    query: 'Classical Sinhala Poetry (Kavya)',
  },
  {
    id: 'mlc-4',
    title: 'Indigenous Ayurveda (Deshiya Wedakama)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
    query: 'Indigenous Ayurveda (Deshiya Wedakama)',
  },
  {
    id: 'mlc-5',
    title: 'Temple Architecture & Vastu',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
    query: 'Temple Architecture & Vastu',
  },
  {
    id: 'mlc-6',
    title: 'Jataka Stories & Folk Wisdom',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
    query: 'Jataka Stories & Folk Wisdom',
  },
];

const TODAY_DEALS: DealItem[] = [
  {
    id: 'td-1',
    bookId: 'gajaga-wannama-royal-chronicle',
    title: 'Gajaga Wannama: Royal Court Elephant Lore',
    salePrice: 'LKR 950',
    originalPrice: 'LKR 1,350',
    discount: '30% off',
    image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
  },
  {
    id: 'td-2',
    bookId: 'gajabahu-raja-puwatha',
    title: 'Manikkawatha — Mahinda Prasad Masimbula',
    salePrice: 'LKR 960',
    originalPrice: 'LKR 1,280',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'td-3',
    bookId: 'gajaga-hasti-palana-shastraya',
    title: 'Senkottan — Mahinda Prasad Masimbula',
    salePrice: 'LKR 840',
    originalPrice: 'LKR 1,120',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
  },
  {
    id: 'td-4',
    bookId: 'chaddanta-gajaga-jataka-illustrated',
    title: 'May Mara Prasangaya — Mahinda Prasad Masimbula',
    salePrice: 'LKR 920',
    originalPrice: 'LKR 1,200',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
  },
  {
    id: 'td-5',
    bookId: 'mahawamsa-great-chronicle',
    title: 'Amma — Maxim Gorky / Dadigama V. Rodrigo',
    salePrice: 'LKR 1,150',
    originalPrice: 'LKR 1,500',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
  },
];

const HOME_GUIDE_ITEMS: ProductItem[] = [
  {
    id: 'hgi-1',
    bookId: 'visuddhimagga-path-of-purification',
    title: 'Wassana Sihinaya',
    price: 'LKR 880',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
  },
  {
    id: 'hgi-2',
    bookId: 'dhammapada-illustrated',
    title: 'Sanda & Dhammapada',
    price: 'LKR 780',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
  },
  {
    id: 'hgi-3',
    bookId: 'guttila-kavyaya',
    title: 'Glasera & Guttila Kavya',
    price: 'LKR 1,050',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/g/l/glasera_front-cover.jpg',
  },
  {
    id: 'hgi-4',
    bookId: 'chulavamsa-chronicle',
    title: 'Udupussallawa',
    price: 'LKR 1,250',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/u/d/udupussallawa_front.jpeg',
  },
  {
    id: 'hgi-5',
    bookId: 'saddharma-ratnavaliya',
    title: 'Buro — Liyanage Amarakeerthi',
    price: 'LKR 890',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/u/buro_1.jpg',
  },
  {
    id: 'hgi-6',
    bookId: 'amavatura-gurulugomi',
    title: 'Gomara Nowe Sudu Kabara',
    price: 'LKR 940',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/g/o/gomar_nowe_sudu_kabara_front.jpg',
  },
];

const STANDOUT_STYLES: SimpleCardItem[] = [
  {
    id: 'ss-1',
    title: 'Gajaga Wannama & Royal Lore',
    subtitle: 'LKR 950 (30% off)',
    image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
    query: 'gajaga',
  },
  {
    id: 'ss-2',
    title: 'Subhashithaya & Mawwath Hadawath',
    subtitle: 'LKR 760 (24% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/mawwath_hadawath.jpg',
    query: 'Subhashithaya',
  },
  {
    id: 'ss-3',
    title: 'Kavyashekhara & Classical Verse',
    subtitle: 'LKR 980 (25% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_7.jpg',
    query: 'Kavyashekhara',
  },
  {
    id: 'ss-4',
    title: 'Sigiriya Kurutu Gee Poetry',
    subtitle: 'LKR 1,680 (24% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_8_29.jpg',
    query: 'Sigiriya',
  },
  {
    id: 'ss-5',
    title: 'Mayura Sandeshaya Classics',
    subtitle: 'LKR 720 (24% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/i/m/img_20261021_0005.jpg',
    query: 'Mayura Sandeshaya',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { openBookModal, saveToBoard, isBookSaved } = useApp();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(12 * 3600 + 25 * 60 + 17); // 12:25:17 countdown

  const dealsScrollRef = useRef<HTMLDivElement>(null);

  // Live countdown timer for Today's Deals
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 12 * 3600 + 25 * 60 + 17));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const toggleLocalFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    saveToBoard(id);
  };

  const scrollDealsRight = () => {
    if (dealsScrollRef.current) {
      dealsScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const navigateToSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleOpenBookById = (bookId: string, fallbackQuery: string) => {
    const found = BOOKS.find((b) => b.id === bookId);
    if (found) {
      router.push(`/books/${found.id}`);
    } else {
      navigateToSearch(fallbackQuery);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121215] text-[#222222] dark:text-neutral-100 font-sans antialiased selection:bg-[#F1641E]/20 transition-colors duration-200">
      {/* 1. Header & Navigation */}
      <Header />

      {/* Main Content Container */}
      <main className="page-container pt-4 sm:pt-6 pb-16 space-y-12 sm:space-y-16">

        {/* ===================================================================
            1. HERO SECTION (Desktop 2-col, Tablet horizontal, Mobile vertical)
           =================================================================== */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left / Main Banner Card ("Wonderfully Sacred Wisdom") */}
            <div className="lg:col-span-8 bg-[#D3E1F6] dark:bg-[#1a2638] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition">
              {/* Desktop & Tablet Horizontal Split */}
              <div className="hidden md:grid md:grid-cols-12 items-center min-h-[280px] lg:min-h-[360px]">
                <div className="md:col-span-6 p-6 lg:p-10 flex flex-col items-center text-center justify-center">
                  <h1
                    className="text-[28px] lg:text-[42px] leading-[1.14] text-[#222222] dark:text-white mb-5 font-heading font-bold"
                    style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                  >
                    Wonderfully
                    <br />
                    sacred wisdom
                  </h1>
                  <Button
                    variant="primary"
                    size="md"
                    text="Shop unique treatises"
                    onClick={() => navigateToSearch('gajaga')}
                  />
                </div>

                {/* Featured Sri Lankan Book Covers Showcase Grid */}
                <div className="md:col-span-6 h-full w-full flex items-center justify-center p-3 lg:p-4">
                  <div className="relative w-full h-[240px] lg:h-[330px] rounded-xl overflow-hidden bg-[#8CA12E] p-3 shadow-inner flex flex-col justify-between">
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-full">
                      {BOOKS.slice(0, 8).map((book) => (
                        <div
                          key={book.id}
                          onClick={() => router.push(`/books/${book.id}`)}
                          className="relative rounded-md overflow-hidden border border-white/25 transition-transform hover:scale-105 cursor-pointer bg-neutral-900"
                        >
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            onError={handleCoverError}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/75 px-1 py-0.5 text-center">
                            <span className="text-[9px] font-bold text-white">
                              LKR {book.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Stacked Layout (< md) */}
              <div className="md:hidden flex flex-col items-center pt-6 px-4 pb-4 text-center">
                <h1
                  className="text-[28px] leading-[1.15] text-[#222222] dark:text-white mb-4 font-heading font-bold"
                  style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  Wonderfully
                  <br />
                  sacred wisdom
                </h1>
                <div className="relative w-full max-w-[290px] h-[280px] rounded-xl overflow-hidden bg-[#8CA12E] p-2.5 shadow-md">
                  <div className="grid grid-cols-3 grid-rows-2 gap-1.5 w-full h-full">
                    {BOOKS.slice(0, 6).map((book) => (
                      <div
                        key={book.id}
                        onClick={() => router.push(`/books/${book.id}`)}
                        className="relative rounded overflow-hidden cursor-pointer bg-neutral-900"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          referrerPolicy="no-referrer"
                          onError={handleCoverError}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-3 flex justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      text="Shop unique treatises"
                      onClick={() => navigateToSearch('gajaga')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Desktop Only ("Gajaga Wannama & Manikkawatha Featured") */}
            <div
              onClick={() => router.push('/books/gajaga-wannama-royal-chronicle')}
              className="hidden lg:block lg:col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition min-h-[360px]"
            >
              <img
                src="https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp"
                alt="Gajaga Wannama & Sri Lankan Book Collection"
                referrerPolicy="no-referrer"
                onError={handleCoverError}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e60023] text-white text-[11px] font-extrabold mb-2">
                  LKR 950 • 30% OFF
                </span>
                <p className="text-xl font-bold leading-snug">
                  Gajaga Wannama &amp; Sinhala Classics
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 group-hover:translate-x-1 transition text-[#FEF08A]">
                  Explore edition &rarr;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. JUMP INTO FEATURED INTERESTS (4 cols desktop/tablet, 2x2 mobile)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-neutral-100 mb-4">
            Jump into featured interests
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {FEATURED_INTERESTS.map((item) => (
              <div
                key={item.id}
                onClick={() => item.query && navigateToSearch(item.query)}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-center text-[#222222] dark:text-neutral-200 group-hover:underline">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            3. DISCOVER OUR BEST COLLECTIONS (5 cols desktop/tablet, 2 cols mobile)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-neutral-100 mb-4">
            Discover our best classical collections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
            {BEST_COLLECTIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => item.query && navigateToSearch(item.query)}
                className="group cursor-pointer"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-xs sm:text-[13px] font-semibold text-[#222222] dark:text-neutral-200 leading-snug group-hover:underline">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            4. SHSTRALOKA-SPECIAL TREATISES
           =================================================================== */}
        <section className="space-y-4 sm:space-y-5">
          {/* Top Sub-Section: Desktop 4-col with title in Col 1 */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-center">
            <div className="pr-4">
              <h2 className="text-xl font-bold text-[#222222] dark:text-neutral-100 mb-3 leading-snug">
                Shastraloka-special treatises for scholars
              </h2>
              <Button
                variant="secondary"
                size="sm"
                text="Get inspired"
                onClick={() => navigateToSearch('gajaga')}
              />
            </div>
            {HERO_FEATURE_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => card.query && navigateToSearch(card.query)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-3.5 right-3.5 text-white text-xs sm:text-sm font-bold leading-snug">
                  {card.title}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Sub-Section */}
          <div className="lg:hidden space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#222222] dark:text-neutral-100">
                Shastraloka-special treatises
              </h2>
              <Button
                variant="secondary"
                size="sm"
                text="Get inspired"
                onClick={() => navigateToSearch('gajaga')}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {HERO_FEATURE_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => card.query && navigateToSearch(card.query)}
                  className="relative aspect-[16/9] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-xs font-bold leading-snug">
                    {card.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Sub-Section: 6 Product Cards with Price Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {FEATURED_TREATISE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  const matched = BOOKS.find((b) => b.id === prod.bookId);
                  if (matched) openBookModal(matched);
                  else navigateToSearch(prod.title);
                }}
                className={`${prod.desktopOnly ? 'hidden lg:block' : 'block'
                  } relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 group cursor-pointer`}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={(e) => toggleLocalFavorite(prod.bookId, e)}
                  aria-label="Save to favorites"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 dark:bg-neutral-900/90 hover:bg-white shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <svg
                    className={`w-4 h-4 ${favorites[prod.bookId] || isBookSaved(prod.bookId)
                        ? 'fill-[#F1641E] text-[#F1641E]'
                        : 'text-neutral-700 dark:text-neutral-200'
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>

                {/* Price Pill Badge */}
                <span className="absolute bottom-2.5 left-2.5">
                  <Badge variant="price" size="sm" text={prod.price} />
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Sub-Section: "Treatises as special as they are" compact pills */}
          <div className="pt-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#222222] dark:text-neutral-200 mb-3">
              Treatises as special as they are
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {SPECIAL_TREATISE_PILLS.map((pill, index) => {
                let responsiveVisibility = 'flex';
                if (index === 3) responsiveVisibility = 'flex md:hidden lg:flex';
                else if (index === 4) responsiveVisibility = 'hidden lg:flex';

                return (
                  <div
                    key={pill.id}
                    onClick={() => pill.query && navigateToSearch(pill.query)}
                    className={`${responsiveVisibility} items-center gap-3 p-1.5 pr-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a20] hover:shadow-md transition cursor-pointer`}
                  >
                    <img
                      src={pill.image}
                      alt={pill.title}
                      referrerPolicy="no-referrer"
                      onError={handleCoverError}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-xs font-bold text-[#222222] dark:text-neutral-100 leading-snug">
                      {pill.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. SHOP OUR MOST-LOVED CATEGORIES (Responsive Carousel)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-neutral-100 mb-4">
            Shop our most-loved categories
          </h2>
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {MOST_LOVED_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => cat.query && navigateToSearch(cat.query)}
                className="w-[140px] sm:w-[170px] md:w-auto shrink-0 group cursor-pointer"
              >
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-xs sm:text-[13px] font-bold text-[#222222] dark:text-neutral-200 leading-snug group-hover:underline">
                  {cat.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            6. TODAY'S BIG DEALS (With Live Countdown Timer & Smooth Carousel)
           =================================================================== */}
        <section className="relative">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-neutral-100">
              Today&apos;s big deals
            </h2>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Fresh deals in {formatCountdown(timeLeft)}</span>
            </div>
          </div>

          <div className="relative">
            <div
              ref={dealsScrollRef}
              className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scroll-smooth -mx-4 px-4 lg:mx-0 lg:px-0"
            >
              {TODAY_DEALS.map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => handleOpenBookById(deal.bookId, deal.title)}
                  className="w-[46%] sm:w-[47%] lg:w-auto shrink-0 group cursor-pointer"
                >
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      referrerPolicy="no-referrer"
                      onError={handleCoverError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <button
                      type="button"
                      onClick={(e) => toggleLocalFavorite(deal.bookId, e)}
                      aria-label="Save deal"
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 dark:bg-neutral-900/90 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
                    >
                      <svg
                        className={`w-4 h-4 ${favorites[deal.bookId] || isBookSaved(deal.bookId)
                            ? 'fill-[#F1641E] text-[#F1641E]'
                            : 'text-neutral-800 dark:text-neutral-200'
                          }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate mb-1">
                    {deal.title}
                  </p>
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-[#0F743B] dark:text-[#76d691]">
                      {deal.salePrice}
                    </span>
                    <span className="text-[11px] text-neutral-500 line-through">
                      {deal.originalPrice}
                    </span>
                    <Badge variant="sale" size="sm" text={deal.discount} />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Dark Circular Next Button matching screenshots */}
            <button
              type="button"
              onClick={scrollDealsRight}
              aria-label="Next deals"
              className="absolute right-1 lg:-right-4 top-[38%] -translate-y-1/2 w-10 h-10 rounded-full bg-[#222222] hover:bg-black text-white shadow-lg flex items-center justify-center transition z-20 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </section>

        {/* ===================================================================
            7. EDITORS' PICKS: SHSTRALOKA'S GUIDE TO CLASSICAL LITERATURE
           =================================================================== */}
        <section>
          {/* DESKTOP LAYOUT (lg and up) */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 flex flex-col justify-center pr-8 py-4">
              <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">
                Editors&apos; Picks
              </span>
              <h2 className="text-2xl font-bold text-[#222222] dark:text-white mb-2">
                Shastraloka&apos;s Guide to Heritage
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 max-w-md leading-relaxed">
                Elevate your library with bestselling Sinhala novels, Pali translations, Ayurveda treatises, and classical editions from Sri Lanka&apos;s leading publishers.
              </p>
              <div>
                <Button
                  variant="secondary"
                  size="md"
                  text="Shop these unique items"
                  onClick={() => navigateToSearch('gajaga')}
                />
              </div>
            </div>

            {HOME_GUIDE_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenBookById(item.bookId, item.title)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-2.5 left-2.5">
                  <Badge variant="price" size="sm" text={item.price} />
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleLocalFavorite(item.bookId, e)}
                  aria-label="Save item"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 dark:bg-neutral-900/90 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <svg
                    className={`w-4 h-4 ${favorites[item.bookId] || isBookSaved(item.bookId)
                        ? 'fill-[#F1641E] text-[#F1641E]'
                        : 'text-neutral-800 dark:text-neutral-200'
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* TABLET LAYOUT (md only) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 items-center">
            <div className="flex flex-col justify-center p-4">
              <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">
                Editors&apos; Picks
              </span>
              <h2 className="text-xl font-bold text-[#222222] dark:text-white mb-3">
                Shastraloka&apos;s Guide to Heritage
              </h2>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  text="Shop these unique items"
                  onClick={() => navigateToSearch('gajaga')}
                />
              </div>
            </div>

            {HOME_GUIDE_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenBookById(item.bookId, item.title)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-3 left-3">
                  <Badge variant="price" size="sm" text={item.price} />
                </span>
              </div>
            ))}
          </div>

          {/* MOBILE LAYOUT (< md) */}
          <div className="md:hidden space-y-3">
            <div>
              <span className="text-[11px] text-neutral-500 font-semibold uppercase block">
                Editors&apos; Picks
              </span>
              <h2 className="text-lg font-bold text-[#222222] dark:text-white">
                Shastraloka&apos;s Guide to Heritage
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HOME_GUIDE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenBookById(item.bookId, item.title)}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2">
                    <Badge variant="price" size="sm" text={item.price} />
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-1">
              <Button
                variant="secondary"
                size="sm"
                text="Shop these unique items"
                onClick={() => navigateToSearch('gajaga')}
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            8. SAVE NOW ON STANDOUT STYLES (5 cols desktop/tablet, 2 cols mobile)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-neutral-100 mb-4">
            Save now on standout treatises
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
            {STANDOUT_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => style.query && navigateToSearch(style.query)}
                className="group cursor-pointer"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                  <img
                    src={style.image}
                    alt={style.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-xs sm:text-[13px] font-bold text-[#222222] dark:text-neutral-200 leading-tight group-hover:underline">
                  {style.title}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">{style.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* =====================================================================
          9. "WHAT IS SHSTRALOKA?" BRAND STORY SECTION
         ===================================================================== */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1140px] mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl lg:text-[36px] font-heading font-bold text-[#222222] dark:text-white mb-1.5"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            What is Shastraloka?
          </h2>
          <Link
            href="/search?q=gajaga"
            className="inline-block text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 underline hover:text-black dark:hover:text-white mb-8 sm:mb-10"
          >
            Read our wonderfully sacred story
          </Link>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 text-center lg:text-left max-w-xl lg:max-w-none mx-auto mb-10">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#222222] dark:text-white mb-2">
                A community preserving heritage
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Shastraloka is a global marketplace dedicated to Sri Lanka&apos;s ancient manuscripts, Buddhist treatises, and classical Sinhala literature. We bring together monks, scholars, and avid readers to safeguard centuries of wisdom.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#222222] dark:text-white mb-2">
                Support independent scholars
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                There&apos;s no impersonal warehouse – every book supports the temples, monastic libraries, and master bookbinders who work tirelessly to restore and bind these precious texts.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#222222] dark:text-white mb-2">
                Authenticity & peace of mind
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                All chronicles and translations are cross-referenced with verified archaeological records and academic editions. Our team ensures secure insured delivery across Sri Lanka and worldwide.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-bold text-[#222222] dark:text-white mb-3">
              Have a question about our manuscripts? We&apos;ve got answers.
            </p>
            <Button
              variant="outline"
              size="sm"
              text="Go to Help Center"
              onClick={() => router.push('/help')}
            />
          </div>
        </div>
      </section>

      <BookModal />
      <BoardsModal />
      <Toast />

      {/* =====================================================================
          10. FOOTER (Shared Universal Component)
         ===================================================================== */}
      <Footer />
    </div>
  );
}
