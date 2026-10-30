'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export interface CategoryPreviewCard {
  title: string;
  image: string;
  href: string;
}

export interface MegaCategoryItem {
  id: string;
  label: string;
  isRecommended?: boolean;
  cards: CategoryPreviewCard[];
  href: string;
}

export const MEGA_MENU_CATEGORIES: MegaCategoryItem[] = [
  {
    id: 'recommended',
    label: 'Recommended categories',
    isRecommended: true,
    href: '/categories',
    cards: [
      {
        title: 'Keychains & Lanyards',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Makeup & Cosmetics',
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Books',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
        href: '/books',
      },
    ],
  },
  {
    id: 'art-collectibles',
    label: 'Art & Collectibles',
    href: '/categories',
    cards: [
      {
        title: 'Embekke Woodcarvings',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Mediaeval Sinhalese Art',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/i/m/img_20261021_0001.jpg',
        href: '/categories',
      },
      {
        title: 'Kandyan Brass & Copper',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
    ],
  },
  {
    id: 'home-living',
    label: 'Home & Living',
    href: '/categories',
    cards: [
      {
        title: 'Handloom & Linen',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Clay & Ceramic Ware',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Wooden Bookstands',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
    ],
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
    href: '/gifts',
    cards: [
      {
        title: 'Pendant & Lockets',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Filigree Silver Charms',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Beaded Book Jewelry',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    href: '/categories',
    cards: [
      {
        title: 'Batik & Heritage Tunics',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Organic Cotton Shawls',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Traditional Sarongs',
        image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
    ],
  },
  {
    id: 'craft-supplies',
    label: 'Craft Supplies & Tools',
    href: '/categories',
    cards: [
      {
        title: 'Palm Leaf Stylus & Ink',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Acid-Free Book Binding',
        image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
        href: '/archives',
      },
      {
        title: 'Handmade Paper Sets',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    href: '/gifts',
    cards: [
      {
        title: 'Keychains & Lanyards',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Embroidered Book Sleeves',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Ex-Libris Seal Stamps',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
    ],
  },
  {
    id: 'novels-fiction',
    label: 'Novels & Fiction',
    href: '/books',
    cards: [
      {
        title: 'Bestselling Sinhala Prose',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
        href: '/books',
      },
      {
        title: 'Historical Novels',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/e/senkottan_front_1.jpg',
        href: '/books',
      },
      {
        title: 'Contemporary Fiction',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/i/m/img_20261021_0007.jpg',
        href: '/books',
      },
    ],
  },
  {
    id: 'ancient-chronicles',
    label: 'Ancient Chronicles (Itihasa)',
    href: '/categories',
    cards: [
      {
        title: 'The Great Mahavamsa',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
        href: '/books/gajabahu-raja-puwatha',
      },
      {
        title: 'Thupavamsa Stupa Lore',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/i/m/img_20261021_0007.jpg',
        href: '/books/thupavamsa-chronicle-great-stupa',
      },
      {
        title: 'Gajabahu Puwatha',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
        href: '/books/gajabahu-raja-puwatha',
      },
    ],
  },
  {
    id: 'classical-poetry',
    label: 'Classical Sinhala Poetry (Kavya)',
    href: '/categories',
    cards: [
      {
        title: 'Gajaga Wannama Elephant Lore',
        image: 'https://rasakatha.lk/media/covers/book-1793105930903-342489ab87-opt.webp',
        href: '/books/gajaga-wannama-royal-chronicle',
      },
      {
        title: 'Mayura Sandeshaya Peacock',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/i/m/img_20261021_0005.jpg',
        href: '/books/mayura-sandeshaya-peacock-message',
      },
      {
        title: 'Guttila Kavya Royal Vina',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
        href: '/categories',
      },
    ],
  },
  {
    id: 'buddhism-philosophy',
    label: 'Buddhism & Philosophy',
    href: '/categories',
    cards: [
      {
        title: 'Visuddhimagga Treatise',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Dhammapada Pali Verses',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
        href: '/categories',
      },
      {
        title: 'Tripitaka Critical Exegesis',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
    ],
  },
  {
    id: 'ayurveda-healing',
    label: 'Indigenous Medicine & Ayurveda',
    href: '/categories',
    cards: [
      {
        title: 'Sarartha Samgrahaya',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Herbal Pharmacopoeia',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
      {
        title: 'Hela Veda Transcripts',
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
    ],
  },
  {
    id: 'paper-party-supplies',
    label: 'Paper & Party Supplies',
    href: '/gifts',
    cards: [
      {
        title: 'Wax Seals & Sealing Sets',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Calligraphy Envelopes',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
      {
        title: 'Gift Wrap & Ribbons',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
        href: '/gifts',
      },
    ],
  },
  {
    id: 'books-films-music',
    label: 'Books, Films & Music',
    href: '/books',
    cards: [
      {
        title: 'Collector Hardcovers',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/m/a/manikkawatha_1.jpg',
        href: '/books',
      },
      {
        title: 'Pirith & Chanting Audio',
        image: 'https://grantha.lk/media/catalog/product/cache/5fa2393eb818a642e720faf99039a3de/s/a/sanda_1.jpg',
        href: '/categories',
      },
      {
        title: 'Cultural Documentaries',
        image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
        href: '/categories',
      },
    ],
  },
];

interface CategoriesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoriesMegaMenu({ isOpen, onClose }: CategoriesMegaMenuProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>('recommended');

  if (!isOpen) return null;

  const currentCategory =
    MEGA_MENU_CATEGORIES.find((c) => c.id === selectedId) || MEGA_MENU_CATEGORIES[0];

  const handleCategoryNavigate = (item: MegaCategoryItem) => {
    onClose();
    router.push(item.href);
  };

  return (
    <>
      {/* Background Page Backdrop Overlay (dims the body content like Etsy) */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] animate-in fade-in duration-150"
      />

      {/* Mega Menu Popup Box */}
      <div
        role="menu"
        aria-label="Category Navigation"
        className="absolute left-0 top-full mt-2.5 w-[calc(100vw-3rem)] lg:w-[765px] max-w-[765px] bg-white dark:bg-[#121215] rounded-b-xl rounded-tr-xl shadow-[0_10px_36px_rgba(0,0,0,0.16)] border border-stone-200/80 dark:border-stone-800 z-50 animate-in fade-in duration-150 flex select-none"
      >
        {/* Top Blue Indicator Bar + Upward Caret correctly aligned under Categories button */}
        <div className="absolute -top-[1px] left-0 w-[230px] lg:w-[254px] h-[2.5px] bg-[#2563eb] z-30 pointer-events-none">
          <div className="absolute -top-[5px] left-[52px] w-2.5 h-2.5 bg-[#2563eb] rotate-45 transform" />
        </div>

        {/* Left Column: Vertical Category List */}
        <div className="w-[230px] lg:w-[254px] shrink-0 bg-white dark:bg-[#18181b] h-[520px] lg:h-[548px] overflow-y-scroll rounded-bl-xl border-r border-stone-200 dark:border-stone-800">
          {MEGA_MENU_CATEGORIES.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setSelectedId(item.id)}
                onClick={() => handleCategoryNavigate(item)}
                className={`w-full text-left px-4 py-[11px] text-[13.5px] leading-snug flex items-center justify-between transition-colors cursor-pointer ${item.isRecommended
                    ? 'border-b border-stone-300 dark:border-stone-700'
                    : ''
                  } ${isSelected
                    ? 'bg-[#eff1f5] dark:bg-stone-800 text-[#222222] dark:text-white'
                    : 'bg-white dark:bg-[#18181b] text-[#222222] dark:text-stone-200 hover:bg-[#f4f5f7] dark:hover:bg-stone-800/60'
                  }`}
              >
                <span className="flex items-center gap-2 truncate">
                  {item.isRecommended && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-[#F1641E] shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M14.5 4.5c0 4.14 3.36 7.5 7.5 7.5-4.14 0-7.5 3.36-7.5 7.5 0-4.14-3.36-7.5-7.5-7.5 4.14 0 7.5-3.36 7.5-7.5zm-9-2.5c.83 0 1.5.67 1.5 1.5v1h1c.83 0 1.5.67 1.5 1.5S8.83 7.5 8 7.5H7v1c0 .83-.67 1.5-1.5 1.5S4 9.33 4 8.5v-1H3c-.83 0-1.5-.67-1.5-1.5S2.17 4.5 3 4.5h1v-1C4 2.67 4.67 2 5.5 2z" />
                    </svg>
                  )}
                  <span className="truncate font-normal">{item.label}</span>
                </span>
                <ChevronRight
                  strokeWidth={2}
                  className="w-3.5 h-3.5 shrink-0 ml-2 text-[#222222] dark:text-stone-300"
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: 3 Square Cards at Top + Clean White Canvas */}
        <div className="flex-1 p-5 lg:p-7 bg-white dark:bg-[#121215] h-[520px] lg:h-[548px] rounded-r-xl">
          <div className="grid grid-cols-3 gap-4">
            {currentCategory.cards.map((card, idx) => (
              <Link
                key={idx}
                href={card.href}
                onClick={onClose}
                className="group block text-center"
              >
                <div className="aspect-square w-full rounded-[14px] overflow-hidden bg-[#f5f5f5] dark:bg-stone-800/80 transition-shadow duration-200 group-hover:shadow-md">
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-bold text-[13px] text-[#222222] dark:text-stone-100 mt-2.5 line-clamp-1 group-hover:underline">
                  {card.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}