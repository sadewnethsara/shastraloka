'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, Heart, Search, X, Sparkles } from 'lucide-react';
import { BOOKS } from '../data/books';
import { useApp } from '../context/AppContext';
import { Tooltip } from './ui/Tooltip';
import OptimizedImage from './ui/OptimizedImage';
import ViewportSection from './ui/ViewportSection';

const FALLBACK_BOOK_COVER =
  'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg';

const handleCoverError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_BOOK_COVER) {
    target.src = FALLBACK_BOOK_COVER;
  }
};

interface FeedCardItem {
  id: string;
  bookId: string;
  title: string;
  salePrice: string;
  originalPrice?: string;
  image: string;
}

interface FeedShelfConfig {
  id: string;
  title: string;
  showNotInterested: boolean;
  viewAllHref: string;
  items: FeedCardItem[];
}

const LOGGED_IN_SHELVES: FeedShelfConfig[] = [
  {
    id: 'shelf-royal-chronicles',
    title: 'Royal Court Chronicles & Wannama',
    showNotInterested: true,
    viewAllHref: '/search?q=gajaga',
    items: [
      {
        id: 'rc-1',
        bookId: 'gajaga-wannama-royal-chronicle',
        title: 'Gajaga Wannama: Royal Court Elephant Lore • Silkbound Edition',
        salePrice: 'LKR 950',
        originalPrice: 'LKR 1,350',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'rc-2',
        bookId: 'gajabahu-raja-puwatha',
        title: 'Manikkawatha — Mahinda Prasad Masimbula Collector Hardcover',
        salePrice: 'LKR 960',
        originalPrice: 'LKR 1,280',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'rc-3',
        bookId: 'gajaga-hasti-palana-shastraya',
        title: 'Senkottan • Sabaragamuwa Historical Novel & Folklore',
        salePrice: 'LKR 840',
        originalPrice: 'LKR 1,120',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
      },
      {
        id: 'rc-4',
        bookId: 'chaddanta-gajaga-jataka-illustrated',
        title: 'May Mara Prasangaya • Annotated Sinhala Literary Classic',
        salePrice: 'LKR 920',
        originalPrice: 'LKR 1,200',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
      },
      {
        id: 'rc-5',
        bookId: 'mahawamsa-great-chronicle',
        title: 'Amma — Dadigama V. Rodrigo Complete Unabridged Translation',
        salePrice: 'LKR 1,150',
        originalPrice: 'LKR 1,500',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
      },
      {
        id: 'rc-6',
        bookId: 'visuddhimagga-path-of-purification',
        title: 'Wassana Sihinaya — Upul Shantha Sannasgala First Print',
        salePrice: 'LKR 880',
        originalPrice: 'LKR 1,180',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
      },
    ],
  },
  {
    id: 'shelf-picks-inspired',
    title: 'Picks inspired by your shopping',
    showNotInterested: false,
    viewAllHref: '/bestsellers',
    items: [
      {
        id: 'pi-1',
        bookId: 'pansiya-panas-jataka-potha',
        title: 'Bala Muduwe Mithuru Vol. II • Epic Sinhala Collector Edition',
        salePrice: 'LKR 1,850',
        originalPrice: 'LKR 2,450',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
      },
      {
        id: 'pi-2',
        bookId: 'dhammapada-illustrated',
        title: 'Sanda & Dhammapada Twin Verses • Pali-English-Sinhala',
        salePrice: 'LKR 780',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
      },
      {
        id: 'pi-3',
        bookId: 'selalihini-sandeshaya',
        title: 'Nedamma & Selalihini Sandeshaya • Kotte Era Poetry',
        salePrice: 'LKR 790',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
      },
      {
        id: 'pi-4',
        bookId: 'sarartha-sangrahaya-ayurveda',
        title: 'Chemmani & Sarartha Sangrahaya • King Buddhadasa Compendium',
        salePrice: 'LKR 1,250',
        originalPrice: 'LKR 1,680',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
      },
      {
        id: 'pi-5',
        bookId: 'manjushri-vastu-vidya-shastra',
        title: 'Manjushri Vastu Vidya Shastra • Ancient Monastic Architecture',
        salePrice: 'LKR 1,420',
        originalPrice: 'LKR 1,900',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
      },
      {
        id: 'pi-6',
        bookId: 'gajaga-wannama-royal-chronicle',
        title: 'Gajaga Wannama • Royal Kandy Esala Perahera Folio',
        salePrice: 'LKR 950',
        originalPrice: 'LKR 1,350',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
    ],
  },
  {
    id: 'shelf-ancient-chronicles',
    title: 'Ancient Chronicles & Itihasa',
    showNotInterested: true,
    viewAllHref: '/search?q=Ancient+Chronicles',
    items: [
      {
        id: 'ac-1',
        bookId: 'mahawamsa-great-chronicle',
        title: 'The Mahavamsa Great Chronicle of Ceylon • Hardcover',
        salePrice: 'LKR 1,150',
        originalPrice: 'LKR 1,500',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
      },
      {
        id: 'ac-2',
        bookId: 'gajabahu-raja-puwatha',
        title: 'Gajabahu Raja Puwatha • Anuradhapura Royal Dynasty',
        salePrice: 'LKR 960',
        originalPrice: 'LKR 1,280',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'ac-3',
        bookId: 'gajaga-wannama-royal-chronicle',
        title: 'Kandyan Court Ceremonial Scrolls & Wannama Anthology',
        salePrice: 'LKR 950',
        originalPrice: 'LKR 1,350',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'ac-4',
        bookId: 'manjushri-vastu-vidya-shastra',
        title: 'Polonnaruwa & Sigiriya Archaeological Monograph Series',
        salePrice: 'LKR 1,420',
        originalPrice: 'LKR 1,900',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
      },
      {
        id: 'ac-5',
        bookId: 'gajaga-hasti-palana-shastraya',
        title: 'Sabaragamuwa & Ruhuna Historical Palm-Leaf Transcripts',
        salePrice: 'LKR 840',
        originalPrice: 'LKR 1,120',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
      },
      {
        id: 'ac-6',
        bookId: 'chaddanta-gajaga-jataka-illustrated',
        title: 'Chaddanta Jataka • Temple Mural Illustrated Edition',
        salePrice: 'LKR 920',
        originalPrice: 'LKR 1,200',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
      },
    ],
  },
  {
    id: 'shelf-personalized-gifts',
    title: 'Personalized Gifts for Scholars',
    showNotInterested: true,
    viewAllHref: '/gifts',
    items: [
      {
        id: 'pg-1',
        bookId: 'visuddhimagga-path-of-purification',
        title: 'Custom Brass-Clasped Visuddhimagga Presentation Box',
        salePrice: 'LKR 880',
        originalPrice: 'LKR 1,180',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
      },
      {
        id: 'pg-2',
        bookId: 'dhammapada-illustrated',
        title: 'Engraved Teakwood Dhammapada Gift Edition with Dedication',
        salePrice: 'LKR 780',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
      },
      {
        id: 'pg-3',
        bookId: 'pansiya-panas-jataka-potha',
        title: 'Collector Boxed Set • Complete Jataka Stories Gift Slipcase',
        salePrice: 'LKR 1,850',
        originalPrice: 'LKR 2,450',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
      },
      {
        id: 'pg-4',
        bookId: 'selalihini-sandeshaya',
        title: 'Gold-Foil Stamped Sandesha Kavya Poetry Keepsake',
        salePrice: 'LKR 790',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
      },
      {
        id: 'pg-5',
        bookId: 'sarartha-sangrahaya-ayurveda',
        title: 'Herbalist & Physician Gift Edition • Deshiya Wedakama',
        salePrice: 'LKR 1,250',
        originalPrice: 'LKR 1,680',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
      },
      {
        id: 'pg-6',
        bookId: 'gajabahu-raja-puwatha',
        title: 'Signed Author Edition • Manikkawatha Clothbound Gift',
        salePrice: 'LKR 960',
        originalPrice: 'LKR 1,280',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
    ],
  },
  {
    id: 'shelf-bookish-gifts',
    title: 'Bookish Reader Gifts & Collector Sets',
    showNotInterested: true,
    viewAllHref: '/books',
    items: [
      {
        id: 'bg-1',
        bookId: 'chaddanta-gajaga-jataka-illustrated',
        title: 'May Mara Prasangaya • Deluxe Ribbon-Marker Hardcover',
        salePrice: 'LKR 920',
        originalPrice: 'LKR 1,200',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
      },
      {
        id: 'bg-2',
        bookId: 'gajaga-hasti-palana-shastraya',
        title: 'Senkottan • Award-Winning Sinhala Literary Collector Print',
        salePrice: 'LKR 840',
        originalPrice: 'LKR 1,120',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
      },
      {
        id: 'bg-3',
        bookId: 'mahawamsa-great-chronicle',
        title: 'Amma • Classic World Literature in Sinhala Translation',
        salePrice: 'LKR 1,150',
        originalPrice: 'LKR 1,500',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
      },
      {
        id: 'bg-4',
        bookId: 'gajaga-wannama-royal-chronicle',
        title: 'Gajaga Wannama • Archival Linen-Bound Library Edition',
        salePrice: 'LKR 950',
        originalPrice: 'LKR 1,350',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'bg-5',
        bookId: 'pansiya-panas-jataka-potha',
        title: 'Bala Muduwe Mithuru • Complete Illustrated Fantasy Set',
        salePrice: 'LKR 1,850',
        originalPrice: 'LKR 2,450',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/b/a/bala-muduwe-mithuru-2-lord-of-the-rings-upekha-muses.jpg',
      },
      {
        id: 'bg-6',
        bookId: 'manjushri-vastu-vidya-shastra',
        title: 'Sacred Temple Murals & Vastu Shastra Reference Atlas',
        salePrice: 'LKR 1,420',
        originalPrice: 'LKR 1,900',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
      },
    ],
  },
  {
    id: 'shelf-palm-leaf-ayurveda',
    title: 'Palm-Leaf & Ayurvedic Treatises',
    showNotInterested: true,
    viewAllHref: '/search?q=Ayurveda',
    items: [
      {
        id: 'pa-1',
        bookId: 'sarartha-sangrahaya-ayurveda',
        title: 'Sarartha Sangrahaya • Ancient Lankan Botanical Medicine',
        salePrice: 'LKR 1,250',
        originalPrice: 'LKR 1,680',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/c/h/chemmani_front_cover_1.jpg',
      },
      {
        id: 'pa-2',
        bookId: 'visuddhimagga-path-of-purification',
        title: 'Visuddhimagga • Path of Purification Monastic Edition',
        salePrice: 'LKR 880',
        originalPrice: 'LKR 1,180',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
      },
      {
        id: 'pa-3',
        bookId: 'dhammapada-illustrated',
        title: 'Dhammapada • Illustrated Palm-Leaf Scriptorium Edition',
        salePrice: 'LKR 780',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
      },
      {
        id: 'pa-4',
        bookId: 'selalihini-sandeshaya',
        title: 'Selalihini Sandeshaya • Classical Prosody & Commentary',
        salePrice: 'LKR 790',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/n/e/nedamma_cover_final_print_1_.jpg',
      },
      {
        id: 'pa-5',
        bookId: 'gajabahu-raja-puwatha',
        title: 'Ola-Leaf Preservation & Stylus Calligraphy Manual',
        salePrice: 'LKR 960',
        originalPrice: 'LKR 1,280',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'pa-6',
        bookId: 'gajaga-wannama-royal-chronicle',
        title: 'Hasti Palana Shastraya • Royal Elephant Care Treatise',
        salePrice: 'LKR 950',
        originalPrice: 'LKR 1,350',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
    ],
  },
  {
    id: 'shelf-archival-folios',
    title: 'Rare Archival & Framed Folios',
    showNotInterested: true,
    viewAllHref: '/archives',
    items: [
      {
        id: 'af-1',
        bookId: 'manjushri-vastu-vidya-shastra',
        title: 'Framed Kandy Era Ola-Leaf Folio in Teakwood Conservation Glass',
        salePrice: 'LKR 1,420',
        originalPrice: 'LKR 1,900',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/f/r/front_15_1.jpg',
      },
      {
        id: 'af-2',
        bookId: 'gajaga-wannama-royal-chronicle',
        title: 'Archival Copper-Plate Sannasa Grant Facsimile Print',
        salePrice: 'LKR 950',
        originalPrice: 'LKR 1,350',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'af-3',
        bookId: 'gajabahu-raja-puwatha',
        title: '19th Century Colombo Museum Press First Edition Reprint',
        salePrice: 'LKR 960',
        originalPrice: 'LKR 1,280',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
      },
      {
        id: 'af-4',
        bookId: 'chaddanta-gajaga-jataka-illustrated',
        title: 'Degaldoruwa Temple Fresco Jataka Portfolio Plate',
        salePrice: 'LKR 920',
        originalPrice: 'LKR 1,200',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
      },
      {
        id: 'af-5',
        bookId: 'mahawamsa-great-chronicle',
        title: 'Wilhelm Geiger 1912 Pali Text Society Mahavamsa Facsimile',
        salePrice: 'LKR 1,150',
        originalPrice: 'LKR 1,500',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
      },
      {
        id: 'af-6',
        bookId: 'dhammapada-illustrated',
        title: 'Aluvihare Rock Temple Tripitaka Transcription Folio',
        salePrice: 'LKR 780',
        originalPrice: 'LKR 1,050',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
      },
    ],
  },
];

const SPECIAL_GIFT_SEARCH_CARDS = [
  {
    id: 'sg-1',
    label: 'Personalized Palm-Leaf Sets',
    query: 'gajaga',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'sg-2',
    label: 'Sinhala Literary Classics',
    query: 'Manikkawatha',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
  },
  {
    id: 'sg-3',
    label: 'Festival Reading Calendars',
    query: 'Mahavamsa',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
  },
  {
    id: 'sg-4',
    label: 'Host & Temple Offerings',
    query: 'Dhammapada',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/may-mara-prasangaya.jpg',
  },
  {
    id: 'sg-5',
    label: 'Calligraphy & Ola Kits',
    query: 'Ayurveda',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/a/m/amma-book-cover.jpg',
  },
  {
    id: 'sg-6',
    label: 'Collector Silkbound Boxes',
    query: 'Visuddhimagga',
    image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/w/a/wassana_sihinaya_front.jpg',
  },
];

function PersonalizedShelfSection({
  shelf,
  onNotInterested,
  onOpenBook,
  onToggleFavorite,
  isSaved,
}: {
  shelf: FeedShelfConfig;
  onNotInterested: (id: string, title: string) => void;
  onOpenBook: (bookId: string, title: string) => void;
  onToggleFavorite: (bookId: string, e: React.MouseEvent) => void;
  isSaved: (bookId: string) => boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollShelf = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: dir === 'left' ? -340 : 340,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="space-y-3.5 w-full max-w-full">
      {/* Row Header with "Not interested" & "View all" Pills (Matching Image 4) */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
          {shelf.title}
        </h2>

        <div className="flex items-center gap-2 shrink-0">
          {shelf.showNotInterested && (
            <button
              type="button"
              onClick={() => onNotInterested(shelf.id, shelf.title)}
              className="px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-xs font-semibold text-[var(--text-main)] transition cursor-pointer"
            >
              Not interested
            </button>
          )}
          <Link
            href={shelf.viewAllHref}
            className="px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-xs font-semibold text-[var(--text-main)] transition"
          >
            View all
          </Link>
        </div>
      </div>

      {/* Horizontal Scrollable Row with Right Peek & Dark Circular Arrow Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => scrollShelf('left')}
          aria-label={`Scroll ${shelf.title} left`}
          className="absolute left-2 top-[40%] -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--pill-active-bg)]/85 hover:bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-lg flex items-center justify-center transition active:scale-95 z-20 cursor-pointer opacity-80 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={rowRef}
          className="flex flex-nowrap gap-3.5 sm:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-1 no-scrollbar"
        >
          {shelf.items.map((item) => {
            const saved = isSaved(item.bookId);
            return (
              <div
                key={item.id}
                onClick={() => onOpenBook(item.bookId, item.title)}
                className="w-[175px] sm:w-[215px] md:w-[235px] lg:w-[248px] shrink-0 group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-[var(--radius-card,1rem)] overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)] mb-1.5">
                  <OptimizedImage
                    src={item.image}
                    fallbackSrc={FALLBACK_BOOK_COVER}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(item.bookId, e)}
                    aria-label="Save to favorites"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 text-[var(--text-main)] shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        saved ? 'fill-[var(--color-primary)] text-[var(--color-primary)]' : 'text-[var(--text-main)]'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-[var(--text-body)] truncate">
                  {item.title}
                </p>

                <div className="flex items-baseline gap-1.5 mt-0.5 tabular-nums">
                  <span className="text-xs sm:text-[13px] font-extrabold text-[var(--color-success)]">
                    {item.salePrice}
                  </span>
                  {item.originalPrice && (
                    <span className="text-[11px] text-[var(--text-muted)] line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollShelf('right')}
          aria-label={`Scroll ${shelf.title} right`}
          className="absolute right-2 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--pill-active-bg)]/85 hover:bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-lg flex items-center justify-center transition active:scale-95 z-20 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export interface LoggedInLandingFeedProps {
  timeLeft: number;
  formatCountdown: (seconds: number) => string;
  onOpenBook: (bookId: string, fallbackQuery: string) => void;
  onToggleFavorite: (bookId: string, e: React.MouseEvent) => void;
  isSaved: (bookId: string) => boolean;
}

export default function LoggedInLandingFeed({
  timeLeft,
  formatCountdown,
  onOpenBook,
  onToggleFavorite,
  isSaved,
}: LoggedInLandingFeedProps) {
  const router = useRouter();
  const { showToast, bag, activeCelebration, isCelebrationMode } = useApp();
  const [dismissedIds, setDismissedIds] = useState<Record<string, boolean>>({});
  const [isBagCardDismissed, setIsBagCardDismissed] = useState(false);

  const dealsRowRef = useRef<HTMLDivElement>(null);
  const specialGiftsRowRef = useRef<HTMLDivElement>(null);

  const handleNotInterested = (shelfId: string, title: string) => {
    setDismissedIds((prev) => ({ ...prev, [shelfId]: true }));
    showToast(`Hid "${title}" — we'll tune your scholarly feed.`);
  };

  const scrollHorizontal = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: 'left' | 'right'
  ) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: dir === 'left' ? -340 : 340,
        behavior: 'smooth',
      });
    }
  };

  const topTwoShelves = LOGGED_IN_SHELVES.slice(0, 2).filter(
    (s) => !dismissedIds[s.id]
  );
  const middleFourShelves = LOGGED_IN_SHELVES.slice(2, 6).filter(
    (s) => !dismissedIds[s.id]
  );
  const bottomShelf = LOGGED_IN_SHELVES.slice(6).filter(
    (s) => !dismissedIds[s.id]
  );

  const bagPreviewItems = bag.slice(0, 3);
  const heroFeaturedBook =
    BOOKS.find((b) => b.id === activeCelebration.heroFeaturedBookId) || BOOKS[1];

  return (
    <div className="relative space-y-10 sm:space-y-12">
      {/* Floating Logged-In Bag Reminder Card (Matching Screenshot 2026-10-30 183306.png) */}
      {bag.length > 0 && !isBagCardDismissed && (
        <aside
          aria-label="Don't miss out on what's in your bag"
          className="w-full sm:max-w-[355px] lg:w-[345px] lg:absolute lg:right-0 lg:top-0 lg:z-30 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 shadow-2xl animate-fade-in"
        >
          {/* Header Row: Sparkle Bag Icon + 3-line Title + Close (X) */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3.5">
              {/* Custom Basket/Bag with Blue 4-point Sparkles */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 48 48"
                  className="w-11 h-11 text-[var(--text-main)]"
                  fill="none"
                   aria-hidden="true"
                >
                  {/* Sparkle Top Right */}
                  <path
                    d="M37 5L38.6 9.4L43 11L38.6 12.6L37 17L35.4 12.6L31 11L35.4 9.4L37 5Z"
                    fill="#3B82F6"
                  />
                  {/* Sparkle Top Left */}
                  <path
                    d="M11 10L12 12.8L14.8 13.8L12 14.8L11 17.6L10 14.8L7.2 13.8L10 12.8L11 10Z"
                    fill="#3B82F6"
                  />
                  {/* Bag / Basket Handle & Body */}
                  <path
                    d="M18 20L21 11H27L30 20"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 20H39L35.5 38H12.5L9 20Z"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 20V38M24 20V38M30 20V38M10.8 29H37.2"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="text-base sm:text-[17px] font-extrabold font-heading text-[var(--text-main)] leading-[1.22]">
                Don&apos;t miss out on
                <br />
                what&apos;s in your
                <br />
                bag!
              </h2>
            </div>

            <Tooltip text="Dismiss reminder" idealDirection="left">
              <button
                type="button"
                onClick={() => setIsBagCardDismissed(true)}
                aria-label="Close bag reminder"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          {/* Bag Items List (Up to 3 Items) */}
          <div className="space-y-3.5 mb-5">
            {bagPreviewItems.map((item, idx) => {
              const showCouponLine = idx === bagPreviewItems.length - 1;
              return (
                <div
                  key={`${item.book.id}-${idx}`}
                  onClick={() => router.push(`/books/${item.book.id}`)}
                  className="flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)] shrink-0">
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      referrerPolicy="no-referrer"
                      onError={handleCoverError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-[13px] font-medium text-[var(--text-main)] leading-snug line-clamp-2 group-hover:underline">
                      {item.book.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                      {item.book.sellerName || 'Shastraloka Guild Press'}
                    </p>
                    {showCouponLine && (
                      <p className="text-xs font-extrabold text-[var(--color-success)] leading-tight mt-0.5">
                        45% off with code
                        <br />
                        ABCOUPON45
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Full-Width Dark Pill Button */}
          <Link
            href="/bag"
            className="w-full py-3 px-5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-bold flex items-center justify-center hover:opacity-90 transition shadow-sm"
          >
            Continue to bag
          </Link>
        </aside>
      )}

      {/* 1 & 2. First Two Personalized Rows ("Royal Court Chronicles" + "Picks inspired by your shopping") */}
      {topTwoShelves.map((shelf) => (
        <PersonalizedShelfSection
          key={shelf.id}
          shelf={shelf}
          onNotInterested={handleNotInterested}
          onOpenBook={onOpenBook}
          onToggleFavorite={onToggleFavorite}
          isSaved={isSaved}
        />
      ))}

      {/* 3. Split 2-Card Hero Banner (Dynamic with Celebration Theme) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 2/3 Card */}
        <div
          className="lg:col-span-8 rounded-2xl overflow-hidden bg-[var(--hero-banner-bg)] border border-[var(--hero-banner-border)] grid grid-cols-1 md:grid-cols-12 min-h-[250px] lg:min-h-[300px] shadow-xs"
          style={{ backgroundImage: 'var(--hero-banner-pattern)' }}
        >
          <div className="md:col-span-6 p-6 lg:p-10 flex flex-col items-center justify-center text-center">
            {isCelebrationMode && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[11px] font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {activeCelebration.dateLabel}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-[36px] leading-[1.15] font-heading font-bold text-[var(--text-main)] mb-5">
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
            <Link
              href={isCelebrationMode ? `/offers?celebration=${activeCelebration.id}` : '/gifts'}
              className="px-5 py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs sm:text-sm font-bold hover:opacity-90 transition shadow-xs"
            >
              {isCelebrationMode ? activeCelebration.heroButtonText : 'Shop unique gifts'}
            </Link>
          </div>

          <div className="md:col-span-6 relative min-h-[200px] md:min-h-full overflow-hidden">
            <img
              src={heroFeaturedBook.coverImage}
              alt={heroFeaturedBook.title}
              referrerPolicy="no-referrer"
              onError={handleCoverError}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right 1/3 Card: "Make your library unmistakably yours" */}
        <div
          onClick={() => router.push('/archives')}
          className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[250px] lg:min-h-[300px] group cursor-pointer shadow-xs"
        >
          <img
            src="https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg"
            alt="Make your library unmistakably yours"
            referrerPolicy="no-referrer"
            onError={handleCoverError}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xl sm:text-2xl font-bold font-heading leading-tight">
              Make your library
              <br />
              unmistakably yours
            </p>
            <span className="inline-block mt-2 text-xs font-bold underline group-hover:no-underline">
              Shop now
            </span>
          </div>
        </div>
      </section>

      {/* 4, 5, 6, 7. Middle Four Personalized Category Rows (Viewport-Gated on Scroll) */}
      {middleFourShelves.map((shelf) => (
        <ViewportSection key={shelf.id} minHeight={310} skeletonTitle={shelf.title}>
          <PersonalizedShelfSection
            shelf={shelf}
            onNotInterested={handleNotInterested}
            onOpenBook={onOpenBook}
            onToggleFavorite={onToggleFavorite}
            isSaved={isSaved}
          />
        </ViewportSection>
      ))}

      {/* 8. Today's big deals (Matching Image 4's row with live clock & dark arrow) */}
      <section className="space-y-3.5 w-full max-w-full">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            Today&apos;s big deals
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Clock className="w-4 h-4 text-[var(--text-muted)]" />
            <span>Fresh deals in {formatCountdown(timeLeft)}</span>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollHorizontal(dealsRowRef, 'left')}
            aria-label="Scroll deals left"
            className="absolute left-2 top-[40%] -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--pill-active-bg)]/85 hover:bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-lg flex items-center justify-center transition active:scale-95 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={dealsRowRef}
            className="flex flex-nowrap gap-3.5 sm:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-1 no-scrollbar"
          >
            {BOOKS.slice(0, 6).map((book) => (
              <div
                key={`logged-deal-${book.id}`}
                onClick={() => onOpenBook(book.id, book.title)}
                className="w-[175px] sm:w-[215px] md:w-[235px] lg:w-[248px] shrink-0 group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-[var(--radius-card,1rem)] overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)] mb-1.5">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(book.id, e)}
                    aria-label="Save deal"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--bg-card)]/95 text-[var(--text-main)] shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved(book.id)
                          ? 'fill-[var(--color-primary)] text-[var(--color-primary)]'
                          : 'text-[var(--text-main)]'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-[var(--text-body)] truncate">
                  {book.title}
                </p>

                <div className="flex items-baseline gap-1.5 mt-0.5 tabular-nums">
                  <span className="text-xs sm:text-[13px] font-extrabold text-[var(--color-success)]">
                    LKR {book.price.toLocaleString()}
                  </span>
                  {book.originalPrice > book.price && (
                    <span className="text-[11px] text-[var(--text-muted)] line-through">
                      LKR {book.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollHorizontal(dealsRowRef, 'right')}
            aria-label="Scroll deals right"
            className="absolute right-2 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--pill-active-bg)]/85 hover:bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-lg flex items-center justify-center transition active:scale-95 z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 9. "Gifts as special as they are" (Cards with bottom-left Search Pill, matching Image 4) */}
      <section className="space-y-3.5 w-full max-w-full">
        <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
          Gifts as special as they are
        </h2>

        <div className="relative">
          <div
            ref={specialGiftsRowRef}
            className="flex flex-nowrap gap-3.5 sm:gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-1 no-scrollbar"
          >
            {SPECIAL_GIFT_SEARCH_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() =>
                  router.push(`/search?q=${encodeURIComponent(card.query)}`)
                }
                className="w-[175px] sm:w-[215px] md:w-[235px] lg:w-[248px] shrink-0 group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-[var(--radius-card,1rem)] overflow-hidden bg-[var(--bg-wash)] border border-[var(--border-subtle)]">
                  <img
                    src={card.image}
                    alt={card.label}
                    referrerPolicy="no-referrer"
                    onError={handleCoverError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Bottom-Left Floating Search Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-btn,9999px)] bg-[var(--bg-card)] text-[var(--text-main)] text-xs font-bold shadow-md max-w-full">
                      <Search className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                      <span className="truncate">{card.label}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollHorizontal(specialGiftsRowRef, 'right')}
            aria-label="Scroll special gifts right"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--pill-active-bg)]/85 hover:bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] shadow-lg flex items-center justify-center transition active:scale-95 z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 10. Bottom Personalized Row ("Rare Archival & Framed Folios") */}
      {bottomShelf.map((shelf) => (
        <ViewportSection key={shelf.id} minHeight={310} skeletonTitle={shelf.title}>
          <PersonalizedShelfSection
            shelf={shelf}
            onNotInterested={handleNotInterested}
            onOpenBook={onOpenBook}
            onToggleFavorite={onToggleFavorite}
            isSaved={isSaved}
          />
        </ViewportSection>
      ))}
    </div>
  );
}
