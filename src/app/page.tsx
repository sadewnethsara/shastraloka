'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import BookModal from '../components/BookModal';
import BoardsModal from '../components/BoardsModal';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import CleanBookCard from '../components/CleanBookCard';
import LoggedInLandingFeed from '../components/LoggedInLandingFeed';
import { BOOKS } from '../data/books';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ChevronLeft, ChevronRight, Handbag, Check, Flame, Star, Clock, Sparkles } from 'lucide-react';

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
  salePrice?: string;
  originalPrice?: string;
  discount?: string;
  query?: string;
  bookId?: string;
}

interface ProductItem {
  id: string;
  bookId: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  desktopOnly?: boolean;
}

interface DealItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  salePrice: string;
  originalPrice: string;
  savedAmount: string;
  discount: string;
  rating: number;
  reviewsCount: number;
  claimedPercent: number;
  image: string;
}

const FEATURED_INTERESTS: SimpleCardItem[] = [
  {
    id: 'fi-1',
    title: 'Gajaga Wannama & Royal Lore',
    salePrice: 'LKR 950',
    originalPrice: 'LKR 1,350',
    discount: '30% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'gajaga',
  },
  {
    id: 'fi-2',
    title: 'Manikkawatha & Chronicles',
    salePrice: 'LKR 960',
    originalPrice: 'LKR 1,280',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Ancient Chronicles (Itihasa)',
  },
  {
    id: 'fi-3',
    title: 'Senkottan & Sabaragamuwa',
    salePrice: 'LKR 840',
    originalPrice: 'LKR 1,120',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
    query: 'Indigenous Ayurveda (Deshiya Wedakama)',
  },
  {
    id: 'fi-4',
    title: 'May Mara Prasangaya & Kavya',
    salePrice: 'LKR 920',
    originalPrice: 'LKR 1,200',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
    query: 'Classical Sinhala Poetry (Kavya)',
  },
];

const BEST_COLLECTIONS: SimpleCardItem[] = [
  {
    id: 'bc-1',
    title: 'Amma & Sinhala Classics',
    salePrice: 'LKR 1,150',
    originalPrice: 'LKR 1,500',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
    query: 'Mahavamsa',
  },
  {
    id: 'bc-2',
    title: 'Wassana Sihinaya & Novels',
    salePrice: 'LKR 880',
    originalPrice: 'LKR 1,180',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
    query: 'Buddhist Philosophy (Abhidhamma)',
  },
  {
    id: 'bc-3',
    title: 'Bala Muduwe Mithuru Epic Sets',
    salePrice: 'LKR 1,850',
    originalPrice: 'LKR 2,450',
    discount: '24% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
    query: 'Jataka Stories & Folk Wisdom',
  },
  {
    id: 'bc-4',
    title: 'Sanda & Dhammapada Wisdom',
    salePrice: 'LKR 780',
    originalPrice: 'LKR 1,050',
    discount: '26% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
    query: 'Dhammapada',
  },
  {
    id: 'bc-5',
    title: 'Chemmani & Udupussallawa Editions',
    salePrice: 'LKR 1,250',
    originalPrice: 'LKR 1,680',
    discount: '26% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
    query: 'Udupussallawa',
  },
  {
    id: 'bc-6',
    title: 'Visuddhimagga & Sacred Lore',
    salePrice: 'LKR 1,420',
    originalPrice: 'LKR 1,900',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
    query: 'Visuddhimagga',
  },
];

const HERO_FEATURE_CARDS: SimpleCardItem[] = [
  {
    id: 'hfc-1',
    title: 'Manikkawatha',
    salePrice: 'LKR 960',
    originalPrice: 'LKR 1,280',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Manikkawatha',
  },
  {
    id: 'hfc-2',
    title: 'Senkottan',
    salePrice: 'LKR 840',
    originalPrice: 'LKR 1,120',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
    query: 'Senkottan',
  },
  {
    id: 'hfc-3',
    title: 'May Mara Prasangaya',
    salePrice: 'LKR 920',
    originalPrice: 'LKR 1,200',
    discount: '23% off',
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
    originalPrice: 'LKR 1,350',
    discount: '30% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'cp-2',
    bookId: 'gajabahu-raja-puwatha',
    title: 'Manikkawatha & Gajabahu Puwatha',
    price: 'LKR 960',
    originalPrice: 'LKR 1,280',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'cp-3',
    bookId: 'gajaga-hasti-palana-shastraya',
    title: 'Senkottan: Sabaragamuwa Heritage',
    price: 'LKR 840',
    originalPrice: 'LKR 1,120',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
  },
  {
    id: 'cp-4',
    bookId: 'chaddanta-gajaga-jataka-illustrated',
    title: 'May Mara Prasangaya',
    price: 'LKR 920',
    originalPrice: 'LKR 1,200',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
  },
  {
    id: 'cp-5',
    bookId: 'mahawamsa-great-chronicle',
    title: 'Amma & Mahavamsa Chronicle',
    price: 'LKR 1,150',
    originalPrice: 'LKR 1,500',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
    desktopOnly: true,
  },
  {
    id: 'cp-6',
    bookId: 'pansiya-panas-jataka-potha',
    title: 'Bala Muduwe Mithuru Vol. II',
    price: 'LKR 1,850',
    originalPrice: 'LKR 2,450',
    discount: '24% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
    desktopOnly: true,
  },
];

const SPECIAL_TREATISE_PILLS: SimpleCardItem[] = [
  {
    id: 'stp-1',
    title: 'Gajaga & Royal Lore',
    salePrice: 'LKR 950',
    originalPrice: 'LKR 1,350',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'gajaga',
  },
  {
    id: 'stp-2',
    title: 'Manikkawatha Novels',
    salePrice: 'LKR 960',
    originalPrice: 'LKR 1,280',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Manikkawatha',
  },
  {
    id: 'stp-3',
    title: 'Wassana Sihinaya',
    salePrice: 'LKR 880',
    originalPrice: 'LKR 1,180',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
    query: 'Wassana',
  },
  {
    id: 'stp-4',
    title: 'Nedamma & Sandesha',
    salePrice: 'LKR 790',
    originalPrice: 'LKR 1,050',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
    query: 'Sandesha',
  },
  {
    id: 'stp-5',
    title: 'Muses Collector Sets',
    salePrice: 'LKR 1,850',
    originalPrice: 'LKR 2,450',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
    query: 'Bala Muduwe',
  },
];

const MOST_LOVED_CATEGORIES: SimpleCardItem[] = [
  {
    id: 'mlc-1',
    title: 'Ancient Chronicles (Itihasa)',
    salePrice: 'LKR 960',
    originalPrice: 'LKR 1,280',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'Ancient Chronicles (Itihasa)',
  },
  {
    id: 'mlc-2',
    title: 'Buddhist Philosophy (Abhidhamma)',
    salePrice: 'LKR 880',
    originalPrice: 'LKR 1,180',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
    query: 'Buddhist Philosophy (Abhidhamma)',
  },
  {
    id: 'mlc-3',
    title: 'Classical Sinhala Poetry (Kavya)',
    salePrice: 'LKR 790',
    originalPrice: 'LKR 1,050',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
    query: 'Classical Sinhala Poetry (Kavya)',
  },
  {
    id: 'mlc-4',
    title: 'Indigenous Ayurveda (Deshiya Wedakama)',
    salePrice: 'LKR 840',
    originalPrice: 'LKR 1,120',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
    query: 'Indigenous Ayurveda (Deshiya Wedakama)',
  },
  {
    id: 'mlc-5',
    title: 'Temple Architecture & Vastu',
    salePrice: 'LKR 1,420',
    originalPrice: 'LKR 1,900',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
    query: 'Temple Architecture & Vastu',
  },
  {
    id: 'mlc-6',
    title: 'Jataka Stories & Folk Wisdom',
    salePrice: 'LKR 920',
    originalPrice: 'LKR 1,200',
    discount: '23% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
    query: 'Jataka Stories & Folk Wisdom',
  },
];

const TODAY_DEALS: DealItem[] = [
  {
    id: 'td-1',
    bookId: 'gajaga-wannama-royal-chronicle',
    title: 'Gajaga Wannama: Royal Court Elephant Lore',
    author: 'Royal Kandy Scriptorium',
    salePrice: 'LKR 950',
    originalPrice: 'LKR 1,350',
    savedAmount: 'Save LKR 400',
    discount: '30% OFF',
    rating: 4.9,
    reviewsCount: 184,
    claimedPercent: 82,
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'td-2',
    bookId: 'gajabahu-raja-puwatha',
    title: 'Manikkawatha — Illustrated Edition',
    author: 'Mahinda Prasad Masimbula',
    salePrice: 'LKR 960',
    originalPrice: 'LKR 1,280',
    savedAmount: 'Save LKR 320',
    discount: '25% OFF',
    rating: 4.9,
    reviewsCount: 312,
    claimedPercent: 76,
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'td-3',
    bookId: 'gajaga-hasti-palana-shastraya',
    title: 'Senkottan — Collector Hardcover',
    author: 'Mahinda Prasad Masimbula',
    salePrice: 'LKR 840',
    originalPrice: 'LKR 1,120',
    savedAmount: 'Save LKR 280',
    discount: '25% OFF',
    rating: 4.8,
    reviewsCount: 245,
    claimedPercent: 88,
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
  },
  {
    id: 'td-4',
    bookId: 'chaddanta-gajaga-jataka-illustrated',
    title: 'May Mara Prasangaya — Literary Edition',
    author: 'Mahinda Prasad Masimbula',
    salePrice: 'LKR 920',
    originalPrice: 'LKR 1,200',
    savedAmount: 'Save LKR 280',
    discount: '23% OFF',
    rating: 4.9,
    reviewsCount: 198,
    claimedPercent: 69,
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
  },
  {
    id: 'td-5',
    bookId: 'mahawamsa-great-chronicle',
    title: 'Amma — Sinhala Classic Translation',
    author: 'Dadigama V. Rodrigo',
    salePrice: 'LKR 1,150',
    originalPrice: 'LKR 1,500',
    savedAmount: 'Save LKR 350',
    discount: '23% OFF',
    rating: 4.9,
    reviewsCount: 276,
    claimedPercent: 74,
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
  },
];

const HOME_GUIDE_ITEMS: ProductItem[] = [
  {
    id: 'hgi-1',
    bookId: 'visuddhimagga-path-of-purification',
    title: 'Wassana Sihinaya',
    price: 'LKR 880',
    originalPrice: 'LKR 1,180',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
  },
  {
    id: 'hgi-2',
    bookId: 'dhammapada-illustrated',
    title: 'Sanda & Dhammapada',
    price: 'LKR 780',
    originalPrice: 'LKR 1,050',
    discount: '26% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
  },
  {
    id: 'hgi-3',
    bookId: 'guttila-kavyaya',
    title: 'Glasera & Guttila Kavya',
    price: 'LKR 1,050',
    originalPrice: 'LKR 1,400',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/g/l/glasera_front-cover.jpg',
  },
  {
    id: 'hgi-4',
    bookId: 'chulavamsa-chronicle',
    title: 'Udupussallawa',
    price: 'LKR 1,250',
    originalPrice: 'LKR 1,680',
    discount: '26% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/u/d/udupussallawa_front.jpeg',
  },
  {
    id: 'hgi-5',
    bookId: 'saddharma-ratnavaliya',
    title: 'Buro — Liyanage Amarakeerthi',
    price: 'LKR 890',
    originalPrice: 'LKR 1,200',
    discount: '26% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/u/buro_1.jpg',
  },
  {
    id: 'hgi-6',
    bookId: 'amavatura-gurulugomi',
    title: 'Gomara Nowe Sudu Kabara',
    price: 'LKR 940',
    originalPrice: 'LKR 1,250',
    discount: '25% off',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/g/o/gomar_nowe_sudu_kabara_front.jpg',
  },
];

const STANDOUT_STYLES: SimpleCardItem[] = [
  {
    id: 'ss-1',
    title: 'Gajaga Wannama & Royal Lore',
    salePrice: 'LKR 950',
    originalPrice: 'LKR 1,350',
    discount: '30% off',
    subtitle: 'LKR 950 (30% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
    query: 'gajaga',
  },
  {
    id: 'ss-2',
    title: 'Subhashithaya & Mawwath Hadawath',
    salePrice: 'LKR 760',
    originalPrice: 'LKR 1,000',
    discount: '24% off',
    subtitle: 'LKR 760 (24% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/mawwath_hadawath.jpg',
    query: 'Subhashithaya',
  },
  {
    id: 'ss-3',
    title: 'Kavyashekhara & Classical Verse',
    salePrice: 'LKR 980',
    originalPrice: 'LKR 1,300',
    discount: '25% off',
    subtitle: 'LKR 980 (25% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_7.jpg',
    query: 'Kavyashekhara',
  },
  {
    id: 'ss-4',
    title: 'Sigiriya Kurutu Gee Poetry',
    salePrice: 'LKR 1,680',
    originalPrice: 'LKR 2,200',
    discount: '24% off',
    subtitle: 'LKR 1,680 (24% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_8_29.jpg',
    query: 'Sigiriya',
  },
  {
    id: 'ss-5',
    title: 'Mayura Sandeshaya Classics',
    salePrice: 'LKR 720',
    originalPrice: 'LKR 950',
    discount: '24% off',
    subtitle: 'LKR 720 (24% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/i/m/img_20261021_0005.jpg',
    query: 'Mayura Sandeshaya',
  },
  {
    id: 'ss-6',
    title: 'Amavatura & Ancient Prose',
    salePrice: 'LKR 840',
    originalPrice: 'LKR 1,140',
    discount: '26% off',
    subtitle: 'LKR 840 (26% off)',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/g/o/gomar_nowe_sudu_kabara_front.jpg',
    query: 'Amavatura',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const {
    isLoggedIn,
    openBookModal,
    addToBag,
    saveToBoard,
    isBookSaved,
    activeCelebration,
    isCelebrationMode,
  } = useApp();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedDeals, setAddedDeals] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(12 * 3600 + 25 * 60 + 17); // 12:25:17 countdown

  const dealsScrollRef = useRef<HTMLDivElement>(null);
  const bestSellersScrollRef = useRef<HTMLDivElement>(null);
  const newReleasesScrollRef = useRef<HTMLDivElement>(null);
  const mostLovedScrollRef = useRef<HTMLDivElement>(null);

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -260 : 260,
        behavior: 'smooth',
      });
    }
  };

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

  const handleAddDealToBag = (deal: DealItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const matchedBook = BOOKS.find((b) => b.id === deal.bookId) || BOOKS[0];
    addToBag(matchedBook, matchedBook.binding, 1);
    setAddedDeals((prev) => ({ ...prev, [deal.id]: true }));
    setTimeout(() => {
      setAddedDeals((prev) => ({ ...prev, [deal.id]: false }));
    }, 1400);
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

  // Resolve date-matched books for the Hero showcase & right featured card
  const heroShowcaseBooks = React.useMemo(() => {
    if (!isCelebrationMode) return BOOKS.slice(0, 8);
    const matched = activeCelebration.matchingBookIds
      .map((id) => BOOKS.find((b) => b.id === id))
      .filter((b): b is (typeof BOOKS)[number] => Boolean(b));
    if (matched.length >= 8) return matched.slice(0, 8);
    const remaining = BOOKS.filter((b) => !matched.some((m) => m.id === b.id));
    return [...matched, ...remaining].slice(0, 8);
  }, [isCelebrationMode, activeCelebration]);

  const heroFeaturedBook = React.useMemo(() => {
    if (!isCelebrationMode) return BOOKS[0];
    return BOOKS.find((b) => b.id === activeCelebration.heroFeaturedBookId) || BOOKS[0];
  }, [isCelebrationMode, activeCelebration]);

  const heroDiscountPct = Math.max(
    15,
    Math.round(((heroFeaturedBook.originalPrice - heroFeaturedBook.price) / heroFeaturedBook.originalPrice) * 100)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans antialiased selection:bg-[var(--color-primary-subtle)] transition-colors duration-200">
      {/* 1. Header & Navigation */}
      <Header />

      {/* Main Content Container */}
      <main className="page-container pt-4 sm:pt-6 pb-16 space-y-10 sm:space-y-14">
        {isLoggedIn ? (
          <LoggedInLandingFeed
            timeLeft={timeLeft}
            formatCountdown={formatCountdown}
            onOpenBook={handleOpenBookById}
            onToggleFavorite={toggleLocalFavorite}
            isSaved={(bookId) => !!favorites[bookId] || isBookSaved(bookId)}
          />
        ) : (
          <>
        {/* ===================================================================
            1. HERO SECTION (Desktop 2-col, Tablet horizontal, Mobile vertical)
           =================================================================== */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left / Main Banner Card ("Wonderfully Sacred Wisdom" / Celebration Matched) */}
            <div
              className="lg:col-span-8 bg-[var(--hero-banner-bg)] border border-[var(--hero-banner-border)] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition"
              style={{ backgroundImage: 'var(--hero-banner-pattern)' }}
            >
              {/* Desktop & Tablet Horizontal Split */}
              <div className="hidden md:grid md:grid-cols-12 items-center min-h-[280px] lg:min-h-[360px]">
                <div className="md:col-span-6 p-6 lg:p-9 flex flex-col items-center text-center justify-center">
                  <button
                    type="button"
                    onClick={() => router.push(`/offers?celebration=${activeCelebration.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] text-[var(--color-primary)] text-[11px] font-extrabold mb-3 hover:opacity-90 transition cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isCelebrationMode ? activeCelebration.heroBadge : `${activeCelebration.dateLabel} • ${activeCelebration.title}`}</span>
                  </button>

                  <h1 className="text-[28px] lg:text-[40px] leading-[1.12] text-[var(--text-main)] mb-2.5 font-heading font-bold">
                    {isCelebrationMode ? (
                      <>
                        {activeCelebration.heroHeadlineTop}
                        <br />
                        {activeCelebration.heroHeadlineBottom}
                      </>
                    ) : (
                      <>
                        Wonderfully
                        <br />
                        sacred wisdom
                      </>
                    )}
                  </h1>

                  <p className="text-xs text-[var(--text-body)] max-w-[290px] mb-4 line-clamp-2">
                    {activeCelebration.heroSubtitle}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button
                      variant="primary"
                      size="md"
                      text={isCelebrationMode ? activeCelebration.heroButtonText : 'Shop unique treatises'}
                      onClick={() =>
                        isCelebrationMode
                          ? router.push(`/offers?celebration=${activeCelebration.id}`)
                          : navigateToSearch(activeCelebration.heroSearchQuery || 'gajaga')
                      }
                    />
                    {activeCelebration.coupons[0] && (
                      <Link
                        href={`/offers?celebration=${activeCelebration.id}`}
                        className="px-3 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[11px] font-extrabold text-[var(--color-success)] hover:bg-[var(--bg-hover)] transition"
                      >
                        {activeCelebration.coupons[0].discount}: {activeCelebration.coupons[0].code}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Featured Sri Lankan Book Covers Showcase Grid (Bound to CSS Theme Tokens & Date-Matched Books) */}
                <div className="md:col-span-6 h-full w-full flex items-center justify-center p-3 lg:p-4">
                  <div
                    className="relative w-full h-[240px] lg:h-[330px] rounded-xl overflow-hidden p-3 shadow-inner flex flex-col justify-between transition-colors duration-300"
                    style={{ background: 'var(--hero-showcase-bg)' }}
                  >
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-full min-h-0">
                      {heroShowcaseBooks.map((book) => (
                        <div
                          key={book.id}
                          onClick={() => router.push(`/books/${book.id}`)}
                          className="relative w-full h-full min-h-0 min-w-0 rounded-md overflow-hidden border border-[var(--hero-showcase-border)] transition-transform hover:scale-105 cursor-pointer bg-[var(--bg-card)] group/thumb"
                        >
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            onError={handleCoverError}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-center z-10 pointer-events-none">
                            <span className="text-[9px] font-bold text-white block truncate">
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
              <div className="md:hidden flex flex-col items-center pt-5 px-4 pb-4 text-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-bold mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeCelebration.dateLabel} • {activeCelebration.title}</span>
                </span>
                <h1 className="text-[26px] leading-[1.15] text-[var(--text-main)] mb-3 font-heading font-bold">
                  {isCelebrationMode ? (
                    <>
                      {activeCelebration.heroHeadlineTop}
                      <br />
                      {activeCelebration.heroHeadlineBottom}
                    </>
                  ) : (
                    <>
                      Wonderfully
                      <br />
                      sacred wisdom
                    </>
                  )}
                </h1>
                <div
                  className="relative w-full max-w-[290px] h-[280px] rounded-xl overflow-hidden border border-[var(--banner-guild-border)] p-2.5 shadow-md"
                  style={{ background: 'var(--hero-showcase-bg)' }}
                >
                  <div className="grid grid-cols-3 grid-rows-2 gap-1.5 w-full h-full min-h-0">
                    {heroShowcaseBooks.slice(0, 6).map((book) => (
                      <div
                        key={book.id}
                        onClick={() => router.push(`/books/${book.id}`)}
                        className="relative w-full h-full min-h-0 min-w-0 rounded overflow-hidden cursor-pointer bg-[var(--bg-card)]"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          referrerPolicy="no-referrer"
                          onError={handleCoverError}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-3 flex justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      text={isCelebrationMode ? activeCelebration.heroButtonText : 'Shop unique treatises'}
                      onClick={() =>
                        isCelebrationMode
                          ? router.push(`/offers?celebration=${activeCelebration.id}`)
                          : navigateToSearch(activeCelebration.heroSearchQuery || 'gajaga')
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Desktop Only (Dynamic Featured Celebration Book) */}
            <div
              onClick={() => router.push(`/books/${heroFeaturedBook.id}`)}
              className="hidden lg:block lg:col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition h-[360px] max-h-[360px]"
            >
              <img
                src={heroFeaturedBook.coverImage}
                alt={heroFeaturedBook.title}
                referrerPolicy="no-referrer"
                onError={handleCoverError}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-accent-badge)] text-white text-[11px] font-extrabold mb-2">
                  LKR {heroFeaturedBook.price.toLocaleString()} • {heroDiscountPct}% OFF
                </span>
                <p className="text-xl font-bold leading-snug line-clamp-2">
                  {isCelebrationMode
                    ? activeCelebration.heroFeaturedLabel
                    : 'Gajaga Wannama & Sinhala Classics'}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 group-hover:translate-x-1 transition text-[#FEF08A]">
                  Explore {activeCelebration.dateLabel} edition &rarr;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            1B. CLEAN BEST SELLERS & NEW ARRIVALS SECTIONS
           =================================================================== */}
        <section className="space-y-4 w-full max-w-full">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
                Best Sellers
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Most-read Sri Lankan chronicles &amp; literary editions
              </p>
            </div>
            <Link
              href="/bestsellers"
              className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:underline shrink-0"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="relative">
            {/* Floating Left Arrow Button */}
            <button
              type="button"
              onClick={() => scrollRow(bestSellersScrollRef, 'left')}
              aria-label="Scroll left"
              className="absolute left-1 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer lg:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* One line on responsive screens with horizontal scroll */}
            <div
              ref={bestSellersScrollRef}
              className="flex flex-nowrap overflow-x-auto overflow-y-hidden lg:overflow-visible scroll-smooth gap-3.5 sm:gap-5 pb-3 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 no-scrollbar"
            >
              {BOOKS.slice(0, 5).map((book, idx) => (
                <div key={book.id} className="w-[165px] sm:w-[195px] md:w-[215px] lg:w-auto shrink-0 lg:shrink">
                  <CleanBookCard book={book} rank={idx + 1} />
                </div>
              ))}
            </div>

            {/* Floating Right Arrow Button */}
            <button
              type="button"
              onClick={() => scrollRow(bestSellersScrollRef, 'right')}
              aria-label="Scroll right"
              className="absolute right-1 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer lg:hidden"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        <section className="space-y-4 w-full max-w-full">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
                New Arrivals &amp; Releases
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Newly published editions &amp; restored manuscripts
              </p>
            </div>
            <Link
              href="/new-releases"
              className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:underline shrink-0"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="relative">
            {/* Floating Left Arrow Button */}
            <button
              type="button"
              onClick={() => scrollRow(newReleasesScrollRef, 'left')}
              aria-label="Scroll left"
              className="absolute left-1 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer lg:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* One line on responsive screens with horizontal scroll */}
            <div
              ref={newReleasesScrollRef}
              className="flex flex-nowrap overflow-x-auto overflow-y-hidden lg:overflow-visible scroll-smooth gap-3.5 sm:gap-5 pb-3 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 no-scrollbar"
            >
              {[...BOOKS].reverse().slice(0, 5).map((book) => (
                <div key={book.id} className="w-[165px] sm:w-[195px] md:w-[215px] lg:w-auto shrink-0 lg:shrink">
                  <CleanBookCard book={book} badgeText="New" />
                </div>
              ))}
            </div>

            {/* Floating Right Arrow Button */}
            <button
              type="button"
              onClick={() => scrollRow(newReleasesScrollRef, 'right')}
              aria-label="Scroll right"
              className="absolute right-1 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer lg:hidden"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            2. JUMP INTO FEATURED INTERESTS (4 cols desktop/tablet, 2x2 mobile)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">
            Jump into featured interests
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {FEATURED_INTERESTS.map((item) => (
              <div
                key={item.id}
                onClick={() => item.query && navigateToSearch(item.query)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[var(--bg-wash)] mb-2.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.discount && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs">
                      {item.discount}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-center text-[var(--text-main)] group-hover:underline">
                  {item.title}
                </p>
                {item.salePrice && (
                  <div className="mt-1 flex items-center justify-center flex-wrap gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-[var(--color-emerald)]">
                      {item.salePrice}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-[var(--text-muted)] line-through">
                        {item.originalPrice}
                      </span>
                    )}
                    {item.discount && (
                      <Badge variant="sale" size="sm" text={item.discount} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            3. DISCOVER OUR BEST COLLECTIONS (6 cols desktop, 3 tablet, 2 mobile)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">
            Discover our best classical collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
            {BEST_COLLECTIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => item.query && navigateToSearch(item.query)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[var(--bg-wash)] mb-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.discount && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs">
                      {item.discount}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-[13px] font-semibold text-[var(--text-main)] leading-snug group-hover:underline line-clamp-1">
                  {item.title}
                </p>
                {item.salePrice && (
                  <div className="mt-1 flex items-center flex-wrap gap-1.5">
                    <span className="text-xs sm:text-[13px] font-bold text-[var(--color-emerald)]">
                      {item.salePrice}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-[var(--text-muted)] line-through">
                        {item.originalPrice}
                      </span>
                    )}
                    {item.discount && (
                      <Badge variant="sale" size="sm" text={item.discount} />
                    )}
                  </div>
                )}
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
              <h2 className="text-xl font-bold text-[var(--text-main)] mb-3 leading-snug">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {card.discount && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs">
                    {card.discount}
                  </span>
                )}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <p className="text-xs sm:text-sm font-bold leading-snug">
                    {card.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs sm:text-sm font-extrabold text-[#FEF08A]">
                      {card.salePrice}
                    </span>
                    {card.originalPrice && (
                      <span className="text-[11px] text-white/75 line-through">
                        {card.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Sub-Section */}
          <div className="lg:hidden space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  {card.discount && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs">
                      {card.discount}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold leading-snug">
                      {card.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-extrabold text-[#FEF08A]">
                        {card.salePrice}
                      </span>
                      {card.originalPrice && (
                        <span className="text-[11px] text-white/75 line-through">
                          {card.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Sub-Section: 6 Product Cards with Price & Discount Badges */}
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
                  } relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-wash)] group cursor-pointer`}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {prod.discount && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs z-10">
                    {prod.discount}
                  </span>
                )}

                {/* Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={(e) => toggleLocalFavorite(prod.bookId, e)}
                  aria-label="Save to favorites"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 hover:bg-[var(--bg-card)] shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <svg
                    className={`w-4 h-4 ${favorites[prod.bookId] || isBookSaved(prod.bookId)
                        ? 'fill-[#F1641E] text-[#F1641E]'
                        : 'text-[var(--text-main)]'
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>

                {/* Price + Real Price Pill Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-card)]/95 backdrop-blur-xs border border-[var(--border-subtle)] shadow-sm">
                    <span className="text-xs font-extrabold text-[var(--text-main)]">
                      {prod.price}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[10px] text-[var(--text-muted)] line-through">
                        {prod.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Sub-Section: "Treatises as special as they are" compact pills */}
          <div className="pt-1">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] mb-3">
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
                    className={`${responsiveVisibility} items-center gap-3 p-1.5 pr-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:shadow-md transition cursor-pointer`}
                  >
                    <img
                      src={pill.image}
                      alt={pill.title}
                      referrerPolicy="no-referrer"
                      onError={handleCoverError}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[var(--text-main)] leading-snug block truncate">
                        {pill.title}
                      </span>
                      {pill.salePrice && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] font-bold text-[var(--color-emerald)]">
                            {pill.salePrice}
                          </span>
                          {pill.originalPrice && (
                            <span className="text-[10px] text-[var(--text-muted)] line-through">
                              {pill.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. SHOP OUR MOST-LOVED CATEGORIES (Responsive Carousel)
           =================================================================== */}
        <section className="w-full max-w-full">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">
            Shop our most-loved categories
          </h2>
          <div className="relative">
            {/* Floating Left Arrow Button (Mobile) */}
            <button
              type="button"
              onClick={() => scrollRow(mostLovedScrollRef, 'left')}
              aria-label="Scroll categories left"
              className="absolute left-1 top-[38%] -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer md:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={mostLovedScrollRef}
              className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto overflow-y-hidden md:overflow-visible pb-2 md:pb-0 scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 no-scrollbar"
            >
              {MOST_LOVED_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => cat.query && navigateToSearch(cat.query)}
                  className="w-[140px] sm:w-[170px] md:w-auto shrink-0 group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[var(--bg-wash)] mb-2">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      onError={handleCoverError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {cat.discount && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs">
                        {cat.discount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-[13px] font-bold text-[var(--text-main)] leading-snug group-hover:underline line-clamp-1">
                    {cat.title}
                  </p>
                  {cat.salePrice && (
                    <div className="mt-0.5 flex items-center flex-wrap gap-1.5">
                      <span className="text-xs font-bold text-[var(--color-emerald)]">
                        {cat.salePrice}
                      </span>
                      {cat.originalPrice && (
                        <span className="text-[10px] text-[var(--text-muted)] line-through">
                          {cat.originalPrice}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Floating Right Arrow Button (Mobile) */}
            <button
              type="button"
              onClick={() => scrollRow(mostLovedScrollRef, 'right')}
              aria-label="Scroll categories right"
              className="absolute right-1 top-[38%] -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer md:hidden"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            6. TODAY'S BIG DEALS (Flash Deal Section with Live Countdown & Add to Bag)
           =================================================================== */}
        <section className="relative w-full max-w-full rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-6">
          {/* Deal Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3.5 border-b border-[var(--border-subtle)]">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#e60023] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Flame className="w-4.5 h-4.5 fill-current" />
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] leading-none">
                    Today&apos;s big deals
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Limited-time flash savings on bestselling Sri Lankan editions
                  </p>
                </div>
              </div>

              {/* High-Contrast Live Countdown Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e60023]/10 dark:bg-[#e60023]/20 border border-[#e60023]/25 text-[#e60023] dark:text-[#ff5c77] text-xs font-extrabold tabular-nums">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Ends in {formatCountdown(timeLeft)}</span>
              </div>
            </div>

            <Link
              href="/offers"
              className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:underline shrink-0"
            >
              See all deals &rarr;
            </Link>
          </div>

          <div className="relative">
            {/* Floating Left Arrow Button (Responsive < lg) */}
            <button
              type="button"
              onClick={() => scrollRow(dealsScrollRef, 'left')}
              aria-label="Previous deals"
              className="absolute left-1 top-[36%] -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer lg:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={dealsScrollRef}
              className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-2 lg:pb-0 scroll-smooth -mx-2 px-2 sm:mx-0 sm:px-0 no-scrollbar"
            >
              {TODAY_DEALS.map((deal) => {
                const isAdded = !!addedDeals[deal.id];
                return (
                  <article
                    key={deal.id}
                    onClick={() => handleOpenBookById(deal.bookId, deal.title)}
                    className="w-[210px] sm:w-[235px] lg:w-auto shrink-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-[#e60023]/40 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Book Cover Frame with Discount Ribbon & Flash Tag */}
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)] mb-2.5">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          referrerPolicy="no-referrer"
                          onError={handleCoverError}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />

                        {/* Top-Left Bold Red Discount Badge */}
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-[#e60023] text-white text-[11px] font-extrabold tracking-tight shadow-sm">
                          {deal.discount}
                        </span>

                        {/* Top-Right Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleLocalFavorite(deal.bookId, e)}
                          aria-label="Save deal"
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10 cursor-pointer"
                        >
                          <svg
                            className={`w-4 h-4 ${
                              favorites[deal.bookId] || isBookSaved(deal.bookId)
                                ? 'fill-[#F1641E] text-[#F1641E]'
                                : 'text-[var(--text-main)]'
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </button>

                        {/* Bottom-Left Flash Deal Pill */}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold backdrop-blur-xs">
                          Flash Deal
                        </span>
                      </div>

                      {/* Rating + Author */}
                      <div className="flex items-center justify-between gap-1 text-[11px] text-[var(--text-muted)] mb-1">
                        <span className="truncate">{deal.author}</span>
                        <span className="inline-flex items-center gap-0.5 font-bold text-[var(--text-main)] shrink-0">
                          <Star className="w-3 h-3 fill-[#F1641E] text-[#F1641E]" />
                          {deal.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                        {deal.title}
                      </h3>

                      {/* Deal Price Block */}
                      <div className="mt-2 flex items-baseline flex-wrap gap-1.5 tabular-nums">
                        <span className="text-sm sm:text-base font-extrabold text-[#e60023] dark:text-[#ff5c77]">
                          {deal.salePrice}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] line-through">
                          {deal.originalPrice}
                        </span>
                      </div>

                      {/* Savings Pill */}
                      <div className="mt-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[var(--color-emerald)]/12 text-[var(--color-emerald)] text-[10px] font-extrabold">
                          {deal.savedAmount}
                        </span>
                      </div>
                    </div>

                    {/* Claimed Progress Bar & Add to Bag CTA */}
                    <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] space-y-2.5">
                      <div>
                        <div className="h-1.5 w-full rounded-full bg-[var(--bg-wash)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#F1641E] to-[#e60023]"
                            style={{ width: `${deal.claimedPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--text-muted)] mt-1">
                          <span className="text-[#e60023] dark:text-[#ff5c77] font-bold">
                            {deal.claimedPercent}% claimed
                          </span>
                          <span>Selling fast</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddDealToBag(deal, e)}
                        className={`w-full h-8.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-[0.98] ${
                          isAdded
                            ? 'bg-[var(--color-emerald)] text-white'
                            : 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <Handbag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Floating Right Arrow Button (Responsive < lg) */}
            <button
              type="button"
              onClick={() => scrollRow(dealsScrollRef, 'right')}
              aria-label="Next deals"
              className="absolute right-1 top-[36%] -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] shadow-md flex items-center justify-center transition active:scale-90 z-20 cursor-pointer lg:hidden"
            >
              <ChevronRight className="w-4 h-4" />
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
              <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1">
                Editors&apos; Picks
              </span>
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                Shastraloka&apos;s Guide to Heritage
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-5 max-w-md leading-relaxed">
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
                className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-wash)] group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {item.discount && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs z-10">
                    {item.discount}
                  </span>
                )}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-card)]/95 backdrop-blur-xs border border-[var(--border-subtle)] shadow-sm">
                    <span className="text-xs font-extrabold text-[var(--color-emerald)]">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[10px] text-[var(--text-muted)] line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => toggleLocalFavorite(item.bookId, e)}
                  aria-label="Save item"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <svg
                    className={`w-4 h-4 ${favorites[item.bookId] || isBookSaved(item.bookId)
                        ? 'fill-[#F1641E] text-[#F1641E]'
                        : 'text-[var(--text-main)]'
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
              <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1">
                Editors&apos; Picks
              </span>
              <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">
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
                className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-wash)] group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={handleCoverError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {item.discount && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs z-10">
                    {item.discount}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-card)]/95 backdrop-blur-xs border border-[var(--border-subtle)] shadow-sm">
                    <span className="text-xs font-extrabold text-[var(--color-emerald)]">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[10px] text-[var(--text-muted)] line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE LAYOUT (< md) */}
          <div className="md:hidden space-y-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)] font-semibold uppercase block">
                Editors&apos; Picks
              </span>
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Shastraloka&apos;s Guide to Heritage
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HOME_GUIDE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenBookById(item.bookId, item.title)}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-wash)] cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover"
                  />
                  {item.discount && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-[#e60023] text-white text-[9px] font-extrabold shadow-xs z-10">
                      {item.discount}
                    </span>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--bg-card)]/95 backdrop-blur-xs border border-[var(--border-subtle)] shadow-sm">
                      <span className="text-[11px] font-extrabold text-[var(--color-emerald)]">
                        {item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[9.5px] text-[var(--text-muted)] line-through">
                          {item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
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
            8. SAVE NOW ON STANDOUT STYLES (6 cols desktop, 3 tablet, 2 mobile)
           =================================================================== */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">
            Save now on standout treatises
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
            {STANDOUT_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => style.query && navigateToSearch(style.query)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[var(--bg-wash)] mb-2">
                  <img
                    src={style.image}
                    alt={style.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {style.discount && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#e60023] text-white text-[10px] font-extrabold shadow-xs">
                      {style.discount}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-[13px] font-bold text-[var(--text-main)] leading-tight group-hover:underline line-clamp-1">
                  {style.title}
                </p>
                <div className="mt-1 flex items-center flex-wrap gap-1.5">
                  <span className="text-xs sm:text-[13px] font-bold text-[var(--color-emerald)]">
                    {style.salePrice || style.subtitle}
                  </span>
                  {style.originalPrice && (
                    <span className="text-[11px] text-[var(--text-muted)] line-through">
                      {style.originalPrice}
                    </span>
                  )}
                  {style.discount && (
                    <Badge variant="sale" size="sm" text={style.discount} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
          </>
        )}
      </main>

      {/* =====================================================================
          9. "WHAT IS SHSTRALOKA?" BRAND STORY SECTION
         ===================================================================== */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-12 sm:py-16">
        <div className="page-container text-center">
          <h2
className="text-2xl sm:text-3xl lg:text-[36px] font-heading font-bold text-[var(--text-main)] mb-1.5"
          >
            What is Shastraloka?
          </h2>
          <Link
            href="/search?q=gajaga"
            className="inline-block text-xs sm:text-sm text-[var(--text-body)] underline hover:text-[var(--text-main)] mb-8 sm:mb-10"
          >
            Read our wonderfully sacred story
          </Link>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 text-center lg:text-left max-w-xl lg:max-w-none mx-auto mb-10">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">
                A community preserving heritage
              </h3>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
                Shastraloka is a global marketplace dedicated to Sri Lanka&apos;s ancient manuscripts, Buddhist treatises, and classical Sinhala literature. We bring together monks, scholars, and avid readers to safeguard centuries of wisdom.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">
                Support independent scholars
              </h3>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
                There&apos;s no impersonal warehouse – every book supports the temples, monastic libraries, and master bookbinders who work tirelessly to restore and bind these precious texts.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">
                Authenticity & peace of mind
              </h3>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
                All chronicles and translations are cross-referenced with verified archaeological records and academic editions. Our team ensures secure insured delivery across Sri Lanka and worldwide.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-bold text-[var(--text-main)] mb-3">
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
