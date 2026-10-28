'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Search,
  Heart,
  Handbag,
  BookOpen,
  Headphones,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  Sparkles,
  Truck,
  Gift,
  ShieldCheck,
  Bookmark,
  Home,
  Globe,
  Calendar,
  FileText,
  Ruler,
  Hash,
  Award,
  MessageCircle,
  Maximize2,
  Compass,
  Play,
  Pause,
  Volume2,
  X,
  Plus,
  Filter,
  Camera,
  CheckCircle2,
  MapPin,
  Layers,
  Eye,
  ArrowUpRight,
} from 'lucide-react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BoardsModal from '../../../components/BoardsModal';
import { BOOKS, Book } from '../../../data/books';
import { useApp } from '../../../context/AppContext';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { Accordion } from '../../../components/ui/Accordion';
import { Modal } from '../../../components/ui/Modal';
import { Toast } from '../../../components/ui/Toast';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type FormatKey = 'hardcover' | 'paperback' | 'ebook' | 'audiobook';

interface BookFormatOption {
  key: FormatKey;
  label: string;
  sublabel: string;
  price: number;
  originalPrice: number;
  stockText: string;
  deliveryText: string;
  badge?: string;
}

interface GalleryMedia {
  id: string;
  type: 'image' | 'spread' | 'video' | 'back';
  label: string;
  url: string;
  caption: string;
}

interface BundleBook {
  id: string;
  title: string;
  author: string;
  format: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
}

interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  formatPurchased: string;
  verified: boolean;
  tags: string[];
  comment: string;
  reviewImage?: string;
  sellerReply?: {
    shopName: string;
    date: string;
    text: string;
  };
  helpfulCount: number;
}

interface MasonryBookPin {
  id: string;
  title: string;
  author: string;
  curator: string;
  curatorAvatar: string;
  price: number;
  originalPrice?: number;
  rating: number;
  format: string;
  aspectClass: string;
  bgAccent: string;
  image: string;
  categoryTag: string;
  pinSaves: number;
  isSponsored?: boolean;
  badge?: string;
  description: string;
}

// ============================================================================
// MOCK DATA (Fusing Pinterest, Amazon & Etsy Book References)
// ============================================================================

const DEFAULT_BOOK_FORMATS: BookFormatOption[] = [
  {
    key: 'hardcover',
    label: 'Hardcover',
    sublabel: 'Linen Collector Edition',
    price: 3850,
    originalPrice: 4950,
    stockText: 'Only 7 Linen Collector copies left — in 24+ bags',
    deliveryText: 'FREE delivery Friday, Oct 30 on orders over LKR 3,500',
    badge: 'Most Popular',
  },
  {
    key: 'paperback',
    label: 'Paperback',
    sublabel: 'Deckle Edge Trade',
    price: 2500,
    originalPrice: 3200,
    stockText: 'In Stock — Ships from Shastraloka Colombo & Global Hub',
    deliveryText: 'FREE delivery Saturday, Oct 31',
  },
  {
    key: 'ebook',
    label: 'Shastraloka eBook',
    sublabel: 'Instant EPUB & PDF',
    price: 1500,
    originalPrice: 2200,
    stockText: 'Instant digital download via email & Shastraloka Reader',
    deliveryText: 'Available immediately after checkout',
    badge: 'Instant Read',
  },
  {
    key: 'audiobook',
    label: 'Audiobook',
    sublabel: 'Unabridged • 8h 42m',
    price: 2200,
    originalPrice: 3400,
    stockText: 'Narrated by Scholar Venerable K. + Bonus Commentary',
    deliveryText: 'Stream instantly in Shastraloka Audio App',
  },
];

const GALLERY_MEDIA: GalleryMedia[] = [
  {
    id: 'gm-1',
    type: 'image',
    label: 'Front Cover Pin',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=85',
    caption:
      'Embossed olive-sage linen cover with warm cream archival dust jacket & classical typography.',
  },
  {
    id: 'gm-2',
    type: 'spread',
    label: 'Interior Typography',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=85',
    caption:
      'Set in 11.5pt Garamond Premier on 100gsm acid-free Munken cream paper with classical chapter dividers.',
  },
  {
    id: 'gm-3',
    type: 'image',
    label: 'Botanical Edition',
    url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=1000&q=85',
    caption:
      'Includes 16 full-color botanical & contemplative plates inspired by classic manuscript art.',
  },
  {
    id: 'gm-4',
    type: 'image',
    label: 'Collector Flatlay',
    url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=85',
    caption:
      'Each physical order includes a pressed-flower brass bookmark and a hand-stamped Shastraloka ex-libris card.',
  },
  {
    id: 'gm-5',
    type: 'back',
    label: 'Spine & Binding',
    url: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1000&q=85',
    caption:
      'Smyth-sewn lay-flat binding with woven gold-thread headband and silk ribbon marker.',
  },
  {
    id: 'gm-6',
    type: 'video',
    label: 'Flip-Through Preview',
    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=85',
    caption:
      '30-second studio flip-through showing paper texture, ink density, and foil stamping.',
  },
];

const BOOK_METADATA = [
  { label: 'Print Length', value: '348 Pages', icon: FileText },
  { label: 'Language', value: 'Pali & English (w/ Sinhala Notes)', icon: Globe },
  { label: 'Publisher', value: 'Shastraloka Guild Press', icon: BookOpen },
  { label: 'Publication Date', value: 'Oct 14, 2026', icon: Calendar },
  { label: 'Dimensions', value: '5.75 × 1.1 × 8.5 in', icon: Ruler },
  { label: 'ISBN-13', value: '978-1250144019', icon: Hash },
  { label: 'Paper Grade', value: '100gsm Munken Cream', icon: Award },
];

const SAMPLE_PAGES = [
  {
    chapter: 'Chapter I • The Architecture of Silence',
    pageNumber: 14,
    content: `Before words were carved into palm leaves or pressed onto rag paper, there existed the quiet interval between two breaths. In the old monastic libraries of Anuradhapura and Polonnaruwa alike, scholars wrote not to fill the silence, but to give it a vessel.

"We speak most clearly," wrote the fifth-century chronicler, "when we no longer wish to win the argument, only to understand the weather of another human soul."

When the chronicler and scholar met on the granite terrace overlooking the sacred reservoir, neither carried a bound book. Yet the dialogue that began that late October afternoon would span fourteen centuries, preserving the memory of an entire civilization.`,
  },
  {
    chapter: 'Chapter I • The Architecture of Silence',
    pageNumber: 15,
    content: `To read a sacred treatise slowly in an era of relentless speed is a quiet act of rebellion. Notice how the margins of this page are intentionally wide—not out of extravagance, but as an invitation for your own pencil marks, reflections, and sudden recollections.

Three principles governed the ancient scriptorium:
1. Never hurry past a verse that makes the chest ache.
2. Treat every season of study as a sanctuary rather than an obligation.
3. Keep only those ideas—and treatises—that remain honest under the morning light.

As the coconut-oil lamp burned low, the elder turned to the final ola leaf of the folio and chanted aloud the stanza that would anchor generations...`,
  },
];

const BUNDLE_BOOKS: BundleBook[] = [
  {
    id: 'bb-1',
    title: 'The Mahavamsa: Great Chronicle of Sri Lanka',
    author: 'Ven. Mahanama Thero & Prof. Geiger',
    format: 'Clothbound Hardcover',
    price: 3850,
    originalPrice: 4950,
    rating: 4.9,
    reviewsCount: 1640,
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bb-2',
    title: 'Visuddhimagga: The Path of Purification',
    author: 'Bhadantacariya Buddhaghosa',
    format: 'Deluxe Hardcover',
    price: 4500,
    originalPrice: 5800,
    rating: 4.9,
    reviewsCount: 1420,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bb-3',
    title: 'Yogarnavaya: Classical Ayurvedic Treasury',
    author: 'Monastic Herbalists Guild',
    format: 'Illustrated Hardbound',
    price: 3400,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 942,
    image:
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80',
  },
];

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Suhasini Wijeratne',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'Oct 21, 2026',
    rating: 5,
    formatPurchased: 'Hardcover • Linen Collector Edition',
    verified: true,
    tags: ['Cover art', 'Paper quality', 'Gift edition'],
    comment:
      'I discovered this edition through Shastraloka’s visual board and ordered the Linen Hardcover immediately. The olive-green cloth texture and gold foil typography look like an art object in my study, and the translations are impeccably annotated.',
    reviewImage:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
    sellerReply: {
      shopName: 'Shastraloka Guild Press',
      date: 'Oct 22, 2026',
      text: 'Thank you so much, Suhasini! We spent months sourcing the 100gsm Munken cream stock so it feels warm in the hand. Wishing you many peaceful reading hours! 🌿📖',
    },
    helpfulCount: 38,
  },
  {
    id: 'rev-2',
    author: 'Dr. Marcus Vance',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'Oct 15, 2026',
    rating: 5,
    formatPurchased: 'Hardcover + Audiobook Bundle',
    verified: true,
    tags: ['Fast delivery', 'Philosophy', 'Paper quality'],
    comment:
      'What a brilliant hybrid experience! I used the "Look Inside" sample here first, fell in love with Chapter 1, and bought both the hardcover and the audio edition. Arrived wrapped in kraft paper with twine and a brass bookmark.',
    reviewImage:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    sellerReply: {
      shopName: 'Shastraloka Guild Press',
      date: 'Oct 16, 2026',
      text: 'Thrilled that our archival packaging arrived in pristine condition, Marcus!',
    },
    helpfulCount: 24,
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    date: 'Oct 08, 2026',
    rating: 5,
    formatPurchased: 'Shastraloka eBook (EPUB)',
    verified: true,
    tags: ['Cover art', 'Instant download'],
    comment:
      'Downloaded the EPUB instantly and saved the cover to my "Classical Literature" board. Even the digital edition preserves the custom serif drop-caps and historical plates.',
    helpfulCount: 19,
  },
];

const IDEAS_YOU_MIGHT_LOVE = [
  {
    id: 'idea-1',
    title: 'Ancient Chronicles & History',
    tag: 'Chronicles',
    bgImage:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
    tint: 'from-emerald-900/80 to-emerald-700/70',
  },
  {
    id: 'idea-2',
    title: 'Theravada Buddhist Philosophy',
    tag: 'Philosophy',
    bgImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    tint: 'from-rose-900/80 to-pink-700/70',
  },
  {
    id: 'idea-3',
    title: 'Ola Leaf Folios & Manuscripts',
    tag: 'Manuscripts',
    bgImage:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=500&q=80',
    tint: 'from-stone-900/80 to-emerald-950/75',
  },
  {
    id: 'idea-4',
    title: 'Classical Sinhala Poetry (Kavya)',
    tag: 'Poetry',
    bgImage:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80',
    tint: 'from-indigo-950/80 to-purple-800/70',
  },
  {
    id: 'idea-5',
    title: 'Indigenous Ayurvedic Wisdom',
    tag: 'Ayurveda',
    bgImage:
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=500&q=80',
    tint: 'from-amber-950/80 to-stone-800/75',
  },
];

const MASONRY_PINS: MasonryBookPin[] = [
  {
    id: 'mahawamsa-great-chronicle',
    title: 'The Mahavamsa: Great Chronicle of Sri Lanka',
    author: 'Ven. Mahanama Thero',
    curator: 'Shastraloka Zen Shelf',
    curatorAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    price: 3850,
    originalPrice: 4950,
    rating: 4.98,
    format: 'Clothbound Hardcover',
    aspectClass: 'aspect-[3/4]',
    bgAccent: '#E7E2D8',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    categoryTag: 'Chronicles',
    pinSaves: 1640,
    badge: 'Bestseller',
    description:
      'The foundational chronicle of ancient Sri Lanka spanning the arrival of Vijaya to King Mahasena.',
  },
  {
    id: 'visuddhimagga-path-purification',
    title: 'Visuddhimagga: The Path of Purification',
    author: 'Bhadantacariya Buddhaghosa',
    curator: 'Monastic Library',
    curatorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    price: 4500,
    originalPrice: 5800,
    rating: 4.96,
    format: 'Deluxe Hardcover',
    aspectClass: 'aspect-[4/5]',
    bgAccent: '#D8D4CC',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    categoryTag: 'Philosophy',
    pinSaves: 1420,
    badge: 'Essential',
    description:
      'The complete Theravada doctrine on virtue (sila), concentration (samadhi), and wisdom (panna).',
  },
  {
    id: 'dhammapada-verse-translation',
    title: 'The Dhammapada: Verses of Truth & Commentary',
    author: 'Ven. Narada Mahathera',
    curator: 'Sutta Study Guild',
    curatorAvatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    price: 1850,
    originalPrice: 2400,
    rating: 4.95,
    format: 'Pocket Clothbound',
    aspectClass: 'aspect-square',
    bgAccent: '#2B3A4A',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    categoryTag: 'Philosophy',
    pinSaves: 2180,
    badge: 'Pocket Classic',
    description:
      '423 ethical verses spoken by the Buddha, presented in Pali with original Sinhala commentary.',
  },
  {
    id: 'yogarnavaya-ayurveda-treasury',
    title: 'Yogarnavaya: Classical Ayurvedic Treasury',
    author: 'Mayurapada Thero',
    curator: 'Indigenous Medicine Board',
    curatorAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    price: 3400,
    originalPrice: 4200,
    rating: 4.89,
    format: 'Illustrated Hardbound',
    aspectClass: 'aspect-[3/4]',
    bgAccent: '#1D4D6B',
    image:
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=600&q=80',
    categoryTag: 'Ayurveda',
    pinSaves: 964,
    badge: 'Archival Pick',
    description:
      '13th-century comprehensive pharmacopoeia detailing Sri Lankan herbal formulas and diagnostic principles.',
  },
  {
    id: 'selalihini-sandeshaya-poem',
    title: 'Selalihini Sandeshaya: The Starling’s Messenger Poem',
    author: 'Ven. Sri Rahula of Totagamuwa',
    curator: 'Classical Poetry Hub',
    curatorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    price: 1850,
    rating: 4.92,
    format: 'Silkbound Gold Folio',
    aspectClass: 'aspect-[2/3]',
    bgAccent: '#1E555C',
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    categoryTag: 'Poetry',
    pinSaves: 850,
    description:
      'Celebrated 15th-century Kotte-era sandesha poem carrying prayers from Kotte to Kelaniya.',
  },
  {
    id: 'chulavamsa-lesser-chronicle',
    title: 'Chulavamsa: The Lesser Chronicle of Ceylon',
    author: 'Ven. Dhammakitti & Chroniclers',
    curator: 'Historical Archives',
    curatorAvatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    price: 3600,
    originalPrice: 4600,
    rating: 4.88,
    format: 'Clothbound Hardcover',
    aspectClass: 'aspect-[4/5]',
    bgAccent: '#F3A833',
    image:
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    categoryTag: 'Chronicles',
    pinSaves: 712,
    description:
      'Continuation of the Mahavamsa documenting the medieval kingdoms from Polonnaruwa to Kandy.',
  },
];

const BOARDS_LIST = [
  'Reading Sanctuary 2026',
  'Ancient Chronicles & History',
  'Buddhist Philosophy & Suttas',
  'Ayurvedic Herbals & Healing',
  'Classical Sinhala Kavya',
];

// ============================================================================
// MAIN PRODUCT DETAIL COMPONENT
// ============================================================================

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const {
    addToBag,
    saveToBoard,
    isBookSaved,
    boards,
    setIsBoardsModalOpen,
    setIsBagOpen,
    searchQuery: globalSearchQuery,
    setSearchQuery: setGlobalSearchQuery,
  } = useApp();

  const bookIdParam = (params?.id as string) || '';
  const matchedBook = useMemo(
    () => BOOKS.find((b) => b.id === bookIdParam) || BOOKS[0],
    [bookIdParam]
  );

  // Active product state initialized from matched book
  const [activeBook, setActiveBook] = useState({
    id: matchedBook.id,
    title: matchedBook.title,
    subtitle:
      matchedBook.description ||
      'An Illustrated Collector’s Edition on Sacred Wisdom, Epistolary Friendship & Classical Treatises',
    author: matchedBook.author,
    coAuthor: matchedBook.translator || 'Translated & Annotated with Scriptorium Notes',
    series: matchedBook.category || 'Shastraloka Classical Treasury',
    rating: matchedBook.rating || 4.95,
    reviewsCount: matchedBook.reviewsCount || 1428,
    price: matchedBook.price,
    originalPrice: matchedBook.originalPrice,
    coverImage: matchedBook.coverImage,
    categoryPath: [
      'Shastraloka Bookstore',
      matchedBook.category,
      matchedBook.binding || 'Collector Hardcover',
      matchedBook.title,
    ],
  });

  const [prevMatchedBookId, setPrevMatchedBookId] = useState(matchedBook.id);

  // Keep state updated if bookId param changes
  if (matchedBook.id !== prevMatchedBookId) {
    setPrevMatchedBookId(matchedBook.id);
    setActiveBook({
      id: matchedBook.id,
      title: matchedBook.title,
      subtitle: matchedBook.description,
      author: matchedBook.author,
      coAuthor: matchedBook.translator || 'Translated with Notes',
      series: matchedBook.category,
      rating: matchedBook.rating,
      reviewsCount: matchedBook.reviewsCount,
      price: matchedBook.price,
      originalPrice: matchedBook.originalPrice,
      coverImage: matchedBook.coverImage,
      categoryPath: [
        'Shastraloka Bookstore',
        matchedBook.category,
        matchedBook.binding || 'Collector Hardcover',
        matchedBook.title,
      ],
    });
  }

  // Format & Gallery States
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>('hardcover');
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Pinterest Pin States
  const [selectedBoard, setSelectedBoard] = useState<string>(BOARDS_LIST[0]);
  const [boardDropdownOpen, setBoardDropdownOpen] = useState<boolean>(false);
  const [isMainLiked, setIsMainLiked] = useState<boolean>(false);
  const [mainPinLikes, setMainPinLikes] = useState<number>(254);
  const [pinNoteText, setPinNoteText] = useState<string>('');
  const [pinNotes, setPinNotes] = useState<Array<{ user: string; note: string }>>([
    {
      user: 'Ven. Scriptorium',
      note: 'Preserved with acid-free Munken cream paper and foil-stamped lettering 🌿',
    },
  ]);

  // Saved pins & Bag notification toast
  const [savedPinIds, setSavedPinIds] = useState<Record<string, boolean>>({
    'mahawamsa-great-chronicle': true,
    'visuddhimagga-path-purification': true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Look Inside modal & Audio player
  const [isLookInsideOpen, setIsLookInsideOpen] = useState<boolean>(false);
  const [samplePageIndex, setSamplePageIndex] = useState<number>(0);
  const [readerTheme, setReaderTheme] = useState<'cream' | 'white' | 'night'>('cream');
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(28);

  // Frequently Bought Together Bundle Checkboxes
  const [selectedBundleIds, setSelectedBundleIds] = useState<Record<string, boolean>>({
    'bb-1': true,
    'bb-2': true,
    'bb-3': true,
  });

  // Accordions
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    highlights: true,
    shipping: true,
    bookstore: false,
  });

  // Filter States
  const [selectedReviewTag, setSelectedReviewTag] = useState<string>('All');
  const [authorFollowed, setAuthorFollowed] = useState<boolean>(false);
  const [selectedMasonryCategory, setSelectedMasonryCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(globalSearchQuery || '');
  const [prevGlobalSearch, setPrevGlobalSearch] = useState(globalSearchQuery);

  // Synchronize local searchQuery with global search guides / header
  if (globalSearchQuery !== prevGlobalSearch) {
    setPrevGlobalSearch(globalSearchQuery);
    if (globalSearchQuery !== undefined) {
      setSearchQuery(globalSearchQuery);
    }
  }

  // Audio timer
  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Formats customized with the active book's prices
  const bookFormats = useMemo(() => {
    return [
      {
        key: 'hardcover' as FormatKey,
        label: 'Hardcover',
        sublabel: 'Linen Collector Edition',
        price: activeBook.price,
        originalPrice: activeBook.originalPrice,
        stockText: 'Only 7 Linen Collector copies left — in 24+ bags',
        deliveryText: 'FREE delivery Friday on orders over LKR 3,500',
        badge: 'Most Popular',
      },
      {
        key: 'paperback' as FormatKey,
        label: 'Paperback',
        sublabel: 'Deckle Edge Trade',
        price: Math.round(activeBook.price * 0.65),
        originalPrice: Math.round(activeBook.originalPrice * 0.7),
        stockText: 'In Stock — Ships from Shastraloka Colombo Hub',
        deliveryText: 'FREE delivery Saturday',
      },
      {
        key: 'ebook' as FormatKey,
        label: 'Shastraloka eBook',
        sublabel: 'Instant EPUB & PDF',
        price: Math.round(activeBook.price * 0.4),
        originalPrice: Math.round(activeBook.originalPrice * 0.5),
        stockText: 'Instant digital download via email & Shastraloka Reader',
        deliveryText: 'Available immediately after checkout',
        badge: 'Instant Read',
      },
      {
        key: 'audiobook' as FormatKey,
        label: 'Audiobook',
        sublabel: 'Unabridged • 8h 42m',
        price: Math.round(activeBook.price * 0.55),
        originalPrice: Math.round(activeBook.originalPrice * 0.65),
        stockText: 'Narrated by Venerable Scholar + Audio Chant Notes',
        deliveryText: 'Stream instantly in Shastraloka Audio App',
      },
    ];
  }, [activeBook]);

  const currentFormatObj =
    bookFormats.find((f) => f.key === selectedFormat) || bookFormats[0];

  const savingsPercent = Math.round(
    ((currentFormatObj.originalPrice - currentFormatObj.price) /
      currentFormatObj.originalPrice) *
      100
  );

  // Bundle Total calculation
  const activeBundleBooks = BUNDLE_BOOKS.filter((b) => selectedBundleIds[b.id]);
  const rawBundleTotal = activeBundleBooks.reduce((sum, b) => sum + b.price, 0);
  const bundleDiscount = activeBundleBooks.length >= 2 ? rawBundleTotal * 0.12 : 0;
  const finalBundlePrice = Math.round(rawBundleTotal - bundleDiscount);

  // Handlers
  const handleAddToBag = (customTitle?: string, countToAdd = 1) => {
    // Find matching book in BOOKS or use matchedBook
    const target = BOOKS.find((b) => b.id === activeBook.id) || matchedBook;
    addToBag(target, currentFormatObj.label, countToAdd);
    triggerToast(
      `Added "${customTitle || activeBook.title}" (${currentFormatObj.label}) to your Bag`
    );
  };

  const handleTogglePinSave = (pinId: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    saveToBoard(pinId);
    const nextState = !savedPinIds[pinId];
    setSavedPinIds((prev) => ({ ...prev, [pinId]: nextState }));
    triggerToast(
      nextState
        ? `Saved "${title}" to "${selectedBoard}" Pinboard`
        : `Removed "${title}" from "${selectedBoard}"`
    );
  };

  const handleSelectPinAsProduct = (pin: MasonryBookPin) => {
    setActiveBook({
      id: pin.id,
      title: pin.title,
      subtitle: pin.description,
      author: pin.author,
      coAuthor: `Curated by ${pin.curator}`,
      series: `Shastraloka ${pin.categoryTag} Collection`,
      rating: pin.rating,
      reviewsCount: Math.floor(pin.pinSaves * 1.4),
      price: pin.price,
      originalPrice: pin.originalPrice || Math.round(pin.price * 1.25),
      coverImage: pin.image,
      categoryPath: [
        'Shastraloka Bookstore',
        pin.categoryTag,
        pin.format,
        pin.title,
      ],
    });
    setMainPinLikes(pin.pinSaves);
    setActiveMediaIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast(`Loaded "${pin.title}" into Book Showcase`);
  };

  const handleAddPinComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinNoteText.trim()) return;
    setPinNotes((prev) => [...prev, { user: 'You (Reader)', note: pinNoteText.trim() }]);
    setPinNoteText('');
    triggerToast('Added your reader note to this Book Pin');
  };

  const isMainPinSaved = isBookSaved(activeBook.id) || !!savedPinIds[activeBook.id];

  const filteredReviews =
    selectedReviewTag === 'All'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.tags.includes(selectedReviewTag));

  const filteredMasonryPins = MASONRY_PINS.filter((pin) => {
    const matchesCategory =
      selectedMasonryCategory === 'All' || pin.categoryTag === selectedMasonryCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121215] text-[#1E1E1C] dark:text-neutral-100 font-sans antialiased selection:bg-[#F1641E]/20 transition-colors duration-200">
      {/* 1. Global Announcement Bar */}
      <div className="bg-[#23382C] text-[#F5F2EB] text-xs py-2 px-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E8B059]" />
            <span>
              <strong>Shastraloka Classical Literary Guild:</strong> Free Islandwide Book-Post over LKR 3,500 + Complimentary Pressed Botanical Bookmark
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#D7E2DC]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Delivering Across Sri Lanka & Worldwide
            </span>
            <span>•</span>
            <a href="#masonry-discovery" className="underline hover:text-white">
              Explore Visual Book Pinboard
            </a>
          </div>
        </div>
      </div>

      {/* 2. Global Header */}
      <Header />



      {/* 3. Breadcrumb & Back Bar (Centered) */}
      <div className="page-container pt-4 pb-2">
        <div className="flex items-center justify-center text-xs text-neutral-500">
          <div className="flex items-center flex-wrap justify-center gap-1.5 text-center">
            <Link
              href="/"
              title="Home Bookstore"
              aria-label="Home Bookstore"
              className="inline-flex items-center justify-center p-1.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-[#F1641E] hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition"
            >
              <Home className="w-4 h-4" />
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            {activeBook.categoryPath.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 && <span className="text-neutral-300 dark:text-neutral-700">/</span>}
                <span
                  className={
                    idx === activeBook.categoryPath.length - 1
                      ? 'text-neutral-800 dark:text-neutral-200 font-medium truncate max-w-[260px]'
                      : 'hover:underline cursor-pointer'
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN PRODUCT DETAIL SECTION (3-Way Fusion: Pinterest + Etsy + Amazon)
         ===================================================================== */}
      <main className="page-container py-4 space-y-14">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* -----------------------------------------------------------------
              LEFT COLUMN TOP (lg:col-span-7): Gallery Card (1st on Mobile)
             ----------------------------------------------------------------- */}
          <div className="lg:col-span-7 lg:col-start-1">
            {/* PINTEREST + ETSY GALLERY CARD */}
            <div className="bg-white dark:bg-[#1a1a20] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs p-3 sm:p-5">
              {/* Top Pinterest Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMainLiked(!isMainLiked);
                      setMainPinLikes((prev) => (isMainLiked ? prev - 1 : prev + 1));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isMainLiked
                          ? 'fill-[#e60023] text-[#e60023]'
                          : 'text-neutral-800 dark:text-neutral-200'
                      }`}
                    />
                    <span>{mainPinLikes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('pin-comment-input');
                      el?.focus();
                    }}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    title="Comment on Book Pin"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast('Book Pin link copied to clipboard!')}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    title="Share Book"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    title="More options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Right: Board Selector Dropdown + Pinterest Red "Save" Pill */}
                <div className="flex items-center gap-2 relative">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setBoardDropdownOpen(!boardDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                    >
                      <span className="max-w-[130px] sm:max-w-[160px] truncate">
                        {selectedBoard}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {boardDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1f1f26] rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-30">
                        <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Save to Shastraloka Board
                        </div>
                        {BOARDS_LIST.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setSelectedBoard(b);
                              setBoardDropdownOpen(false);
                              triggerToast(`Selected board: "${b}"`);
                            }}
                            className="w-full text-left px-3.5 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between"
                          >
                            <span>{b}</span>
                            {selectedBoard === b && (
                              <Check className="w-3.5 h-3.5 text-[#e60023]" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    variant={isMainPinSaved ? 'dark' : 'red'}
                    size="sm"
                    text={isMainPinSaved ? 'Saved ✓' : 'Save Pin'}
                    onClick={() => {
                      saveToBoard(activeBook.id);
                      triggerToast(
                        !isMainPinSaved
                          ? `Saved "${activeBook.title}" to ${selectedBoard}`
                          : `Removed from ${selectedBoard}`
                      );
                    }}
                  />
                </div>
              </div>

              {/* ETSY VERTICAL THUMBNAIL STRIP + MAIN PINTEREST BOOK FRAME */}
              <div className="flex flex-col-reverse sm:flex-row gap-3.5">
                {/* Left Vertical Thumbnails */}
                <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible sm:w-20 shrink-0">
                  {GALLERY_MEDIA.map((media, index) => (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() => setActiveMediaIndex(index)}
                      className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                        activeMediaIndex === index
                          ? 'border-[#222222] dark:border-white ring-2 ring-[#222222]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={index === 0 && activeBook.coverImage ? activeBook.coverImage : media.url}
                        alt={media.label}
                        className="w-full h-full object-cover"
                      />
                      {media.type === 'video' && (
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Main Showcase Frame */}
                <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#919B78] min-h-[380px] sm:min-h-[480px] flex flex-col items-center justify-center p-6 sm:p-10 group">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge
                      variant="bestseller"
                      size="md"
                      text="Shastraloka Bestseller"
                    />
                  </div>

                  {activeMediaIndex === 0 ? (
                    <div className="relative w-[220px] sm:w-[265px] aspect-[2/3] bg-[#F3EFE6] rounded-r-md shadow-[16px_20px_35px_rgba(0,0,0,0.38)] border-l-8 border-[#636D4C] p-3.5 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="w-full h-[76%] bg-[#6C7753] rounded-xs p-5 flex flex-col items-center justify-between text-center text-[#EAE5D9] shadow-inner">
                        <span className="text-[9px] uppercase tracking-[0.25em] opacity-80">
                          Shastraloka Edition
                        </span>
                        <div className="my-auto space-y-1.5">
                          <h2
                            className="text-lg sm:text-xl tracking-[0.12em] uppercase font-normal leading-snug"
                            style={{
                              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                            }}
                          >
                            {activeBook.title.split(':')[0]}
                          </h2>
                          <div className="w-8 h-[1px] bg-[#EAE5D9]/50 mx-auto" />
                        </div>
                        <div className="text-[10px] tracking-widest opacity-90 italic font-heading">
                          — ❖ —
                        </div>
                      </div>

                      <div className="pt-2.5 flex items-end justify-between text-[#2D2C29] px-1">
                        <p className="text-[9px] leading-tight italic font-heading max-w-[65%] line-clamp-2">
                          {activeBook.subtitle}
                        </p>
                        <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-600 truncate max-w-[30%]">
                          {activeBook.author}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={GALLERY_MEDIA[activeMediaIndex].url}
                      alt={GALLERY_MEDIA[activeMediaIndex].label}
                      className="w-full h-[360px] sm:h-[430px] object-cover rounded-xl shadow-lg"
                    />
                  )}

                  {/* Left / Right Carousel Arrows */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMediaIndex((prev) =>
                        prev === 0 ? GALLERY_MEDIA.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveMediaIndex((prev) =>
                        prev === GALLERY_MEDIA.length - 1 ? 0 : prev + 1
                      )
                    }
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Expand & Visual Search Floating Icons */}
                  <div className="absolute bottom-3.5 right-3.5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setIsLookInsideOpen(true)}
                      title="Expand & Read Sample"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('masonry-discovery');
                        el?.scrollIntoView({ behavior: 'smooth' });
                        triggerToast('Showing visually similar book covers below');
                      }}
                      title="Shop visually similar covers"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Caption + Amazon Look Inside & Audio Excerpt Buttons */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                  {GALLERY_MEDIA[activeMediaIndex].caption}
                </p>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    iconStart={<BookOpen className="w-3.5 h-3.5" />}
                    text="Read Sample (Look Inside)"
                    onClick={() => setIsLookInsideOpen(true)}
                  />

                  <Button
                    variant={isPlayingAudio ? 'orange' : 'secondary'}
                    size="sm"
                    iconStart={isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                    text={isPlayingAudio ? `Playing (${audioProgress}%)` : 'Audio Sample (01:45)'}
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  />
                </div>
              </div>

              {/* Pinterest Curator Comments */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
                {pinNotes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#23382C] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      {item.user[0]}
                    </div>
                    <div>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200 mr-1.5">
                        {item.user}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400">{item.note}</span>
                    </div>
                  </div>
                ))}

                <form onSubmit={handleAddPinComment} className="flex items-center gap-2 pt-1">
                  <input
                    id="pin-comment-input"
                    type="text"
                    value={pinNoteText}
                    onChange={(e) => setPinNoteText(e.target.value)}
                    placeholder="Add a reader note or share why you love this cover..."
                    className="flex-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/70 focus:bg-white dark:focus:bg-[#121215] px-4 py-2 rounded-full text-xs border border-neutral-200 dark:border-neutral-700 focus:outline-hidden transition text-neutral-800 dark:text-neutral-100"
                  />
                  {pinNoteText.trim() && (
                    <Button variant="orange" size="sm" text="Post" type="submit" />
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              LEFT COLUMN BOTTOM (lg:col-span-7): Specs, Bundles, Reviews
              Ordered 3rd on Mobile (after Buy Box) & stacked under Gallery on Desktop
             ----------------------------------------------------------------- */}
          <div className="order-3 lg:order-none lg:col-span-7 lg:col-start-1 space-y-8">
            {/* ---------------------------------------------------------------
                AMAZON-STYLE BOOK METADATA SPECIFICATIONS
               --------------------------------------------------------------- */}
            <div className="bg-white dark:bg-[#1a1a20] rounded-2xl border border-neutral-200/90 dark:border-neutral-800 p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Bibliographic Specifications & Edition Details
                </h3>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  ISBN Verified • Archival Grade
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {BOOK_METADATA.map((meta) => {
                  const IconComponent = meta.icon;
                  return (
                    <div
                      key={meta.label}
                      className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800 flex flex-col items-center text-center"
                    >
                      <span className="text-[10px] text-neutral-500 mb-1">
                        {meta.label}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#23382C] dark:text-emerald-400 my-1" />
                      <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
                        {meta.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------------------
                AMAZON-STYLE "FREQUENTLY BOUGHT TOGETHER" BUNDLE
               --------------------------------------------------------------- */}
            <div className="bg-white dark:bg-[#1a1a20] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-6 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3
                    className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
                    style={{
                      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                    }}
                  >
                    Frequently bought together
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Pair this edition with companion reads & save 12% automatically
                  </p>
                </div>
                <Badge variant="bestseller" size="sm" text="Bundle & Save 12%" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* 3 Books with + signs */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                  {BUNDLE_BOOKS.map((book, idx) => (
                    <React.Fragment key={book.id}>
                      {idx > 0 && (
                        <span className="text-lg sm:text-xl font-bold text-neutral-400">+</span>
                      )}
                      <div
                        onClick={() =>
                          setSelectedBundleIds((prev) => ({
                            ...prev,
                            [book.id]: !prev[book.id],
                          }))
                        }
                        className={`relative w-20 sm:w-28 aspect-[3/4] rounded-xl overflow-hidden border-2 cursor-pointer transition ${
                          selectedBundleIds[book.id]
                            ? 'border-[#23382C] dark:border-emerald-500 shadow-md'
                            : 'border-neutral-200 dark:border-neutral-700 opacity-45'
                        }`}
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md bg-white shadow-xs flex items-center justify-center">
                          {selectedBundleIds[book.id] && (
                            <Check className="w-3.5 h-3.5 text-[#23382C] stroke-[3]" />
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Bundle Total & CTA */}
                <div className="flex-1 w-full md:w-auto border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-4 md:pt-0 md:pl-6 space-y-3">
                  <div className="space-y-1.5">
                    {BUNDLE_BOOKS.map((book, idx) => (
                      <label
                        key={book.id}
                        className="flex items-start gap-2 text-xs cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!selectedBundleIds[book.id]}
                          onChange={() =>
                            setSelectedBundleIds((prev) => ({
                              ...prev,
                              [book.id]: !prev[book.id],
                            }))
                          }
                          className="mt-0.5 rounded border-neutral-400 text-[#23382C] focus:ring-[#23382C]"
                        />
                        <span className="flex-1 text-neutral-700 dark:text-neutral-300 leading-snug">
                          {idx === 0 && (
                            <strong className="text-neutral-900 dark:text-white">This item: </strong>
                          )}
                          {book.title}{' '}
                          <span className="text-neutral-400">({book.format})</span>
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 shrink-0">
                          LKR {book.price.toLocaleString()}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div>
                      <span className="text-xs text-neutral-500 block">
                        Total price for {activeBundleBooks.length} selected:
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-neutral-900 dark:text-white">
                          LKR {finalBundlePrice.toLocaleString()}
                        </span>
                        {bundleDiscount > 0 && (
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                            (Saved LKR {Math.round(bundleDiscount).toLocaleString()})
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="orange"
                      size="sm"
                      disabled={activeBundleBooks.length === 0}
                      text={`Add all ${activeBundleBooks.length} to Bag`}
                      onClick={() =>
                        handleAddToBag(
                          `${activeBundleBooks.length}-Book Classical Bundle`,
                          activeBundleBooks.length
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                ETSY + AMAZON HYBRID REVIEWS SECTION
               --------------------------------------------------------------- */}
            <div className="bg-white dark:bg-[#1a1a20] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-7 shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                <div>
                  <h3
                    className="text-xl font-bold text-neutral-900 dark:text-neutral-100"
                    style={{
                      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                    }}
                  >
                    Reviews for this edition
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    All reviews are from verified Shastraloka readers
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  <div className="flex items-center gap-1.5 pr-3 border-r border-neutral-200 dark:border-neutral-800">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {activeBook.rating}
                    </span>
                    <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-xs text-neutral-500">
                      ({activeBook.reviewsCount})
                    </span>
                  </div>

                  {[
                    { score: '5/5', label: 'Print & paper' },
                    { score: '5/5', label: 'Packaging care' },
                    { score: '5/5', label: 'Translation accuracy' },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-full bg-[#FFF3D1] dark:bg-amber-950/60 border border-[#E8C56B] dark:border-amber-800 text-[#6B4C00] dark:text-amber-300 text-xs font-bold flex items-center justify-center">
                        {metric.score}
                      </span>
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter Keyword Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  'All',
                  'Cover art',
                  'Paper quality',
                  'Gift edition',
                  'Fast delivery',
                  'Philosophy',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedReviewTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition shrink-0 cursor-pointer ${
                      selectedReviewTag === tag
                        ? 'bg-[#222222] dark:bg-white text-white dark:text-neutral-900 border-[#222222]'
                        : 'bg-[#FAF8F5] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Reviews List */}
              <div className="divide-y divide-neutral-200/80 dark:divide-neutral-800 space-y-5">
                {filteredReviews.map((rev) => (
                  <div key={rev.id} className="pt-5 first:pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white">
                              {rev.author}
                            </span>
                            {rev.verified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Verified Reader
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-500">
                            {rev.formatPurchased}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
                        {rev.comment}
                      </p>
                      {rev.reviewImage && (
                        <img
                          src={rev.reviewImage}
                          alt="Reader photo"
                          className="w-20 h-20 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                        />
                      )}
                    </div>

                    {rev.sellerReply && (
                      <div className="ml-4 sm:ml-6 p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-neutral-900 border-l-4 border-[#23382C] space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-neutral-900 dark:text-white">
                            Response from {rev.sellerReply.shopName}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {rev.sellerReply.date}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {rev.sellerReply.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (lg:col-span-5): Buy Box, Formats, CTAs, Accordions
              Ordered 2nd on Mobile (immediately below Gallery Card)
             ----------------------------------------------------------------- */}
          <div className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 space-y-6">
            <div className="bg-white dark:bg-[#1a1a20] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-7 shadow-xs space-y-5">
              {/* Urgency Callout */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F1641E] bg-[#F1641E]/10 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> In 24+ readers&apos; bags right now
                </span>
                <span className="text-xs font-medium text-neutral-500">
                  {activeBook.series}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1
                  className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-snug"
                  style={{
                    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {activeBook.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  {activeBook.subtitle}
                </p>
              </div>

              {/* Author & Rating */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="text-neutral-500">by </span>
                  <a
                    href="#author-bio"
                    className="font-bold text-[#23382C] dark:text-emerald-400 hover:underline"
                  >
                    {activeBook.author}
                  </a>
                  <span className="text-neutral-400"> (Author), </span>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                    {activeBook.coAuthor}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-neutral-900 dark:text-white ml-1">
                    {activeBook.rating}
                  </span>
                  <span className="text-neutral-500">
                    ({activeBook.reviewsCount} ratings)
                  </span>
                </div>
              </div>

              {/* FORMAT SELECTOR GRID */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Select Edition Format
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLookInsideOpen(true)}
                    className="text-xs font-semibold text-[#F1641E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview interior typography
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {bookFormats.map((fmt) => {
                    const isSelected = selectedFormat === fmt.key;
                    return (
                      <button
                        key={fmt.key}
                        type="button"
                        onClick={() => setSelectedFormat(fmt.key)}
                        className={`relative text-left p-3 rounded-2xl border-2 transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#23382C] dark:border-emerald-500 bg-[#23382C]/5 dark:bg-emerald-950/20 shadow-2xs'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 bg-white dark:bg-[#1a1a20]'
                        }`}
                      >
                        {fmt.badge && (
                          <span className="absolute -top-2 right-2.5 px-2 py-0.5 rounded-full bg-[#23382C] text-white text-[9px] font-bold uppercase tracking-wider">
                            {fmt.badge}
                          </span>
                        )}
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">
                            {fmt.label}
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate">
                            {fmt.sublabel}
                          </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">
                            LKR {fmt.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-neutral-400 line-through">
                            LKR {fmt.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Quantity Box */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-[#0F743B] dark:text-[#76d691]">
                      LKR {(currentFormatObj.price * quantity).toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      LKR {(currentFormatObj.originalPrice * quantity).toLocaleString()}
                    </span>
                    <Badge variant="sale" size="sm" text={`Save ${savingsPercent}%`} />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <label htmlFor="qty" className="text-xs text-neutral-500">
                      Qty:
                    </label>
                    <select
                      id="qty"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-1 text-xs font-bold focus:outline-hidden text-neutral-800 dark:text-neutral-200"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentFormatObj.stockText}</span>
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 shrink-0" />
                  <span>{currentFormatObj.deliveryText}</span>
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2.5">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconStart={<Handbag className="w-4 h-4" />}
                  text={`Add ${currentFormatObj.label} to Bag — LKR ${(currentFormatObj.price * quantity).toLocaleString()}`}
                  onClick={() => handleAddToBag(undefined, quantity)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Button
                    variant="orange"
                    size="md"
                    text="Buy Now (1-Click)"
                    onClick={() => {
                      handleAddToBag(undefined, quantity);
                      router.push('/checkout');
                    }}
                  />

                  <Button
                    variant="outline"
                    size="md"
                    iconStart={
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isMainPinSaved ? 'fill-[#F1641E] text-[#F1641E]' : ''
                        }`}
                      />
                    }
                    text={isMainPinSaved ? 'Saved on Board' : 'Pin to Reading List'}
                    onClick={() => {
                      saveToBoard(activeBook.id);
                      triggerToast(
                        !isMainPinSaved
                          ? `Pinned to "${selectedBoard}"`
                          : `Removed from "${selectedBoard}"`
                      );
                    }}
                  />
                </div>
              </div>

              {/* Reader Protection */}
              <div className="flex items-start gap-3 pt-2 text-xs text-neutral-600 dark:text-neutral-400">
                <ShieldCheck className="w-5 h-5 text-[#23382C] dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Shastraloka Reader Protection:</strong> Get the exact collector’s edition you ordered, damage-free in archival kraft packaging, or receive a prompt replacement or refund.
                </p>
              </div>

              {/* Accordions */}
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800 pt-2">
                <Accordion
                  title="Item details & editorial synopsis"
                  isOpen={openAccordions.highlights}
                  onToggle={() =>
                    setOpenAccordions((prev) => ({
                      ...prev,
                      highlights: !prev.highlights,
                    }))
                  }
                >
                  <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <div className="space-y-1.5 font-medium text-neutral-800 dark:text-neutral-200">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#23382C] dark:text-emerald-400" />
                        <span>Curated by <strong>Shastraloka Scriptorium Guild</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#23382C] dark:text-emerald-400" />
                        <span>Smyth-sewn linen binding • 100gsm Munken cream acid-free paper</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#23382C] dark:text-emerald-400" />
                        <span>Includes complimentary digital companion & brass bookmark</span>
                      </div>
                    </div>
                    <p>
                      <em>{activeBook.title}</em> represents an enduring testament to Sri Lanka&apos;s classical heritage. Celebrated by scholars worldwide, this collector&apos;s edition preserves the original text along with critical commentary and historical plates.
                    </p>
                  </div>
                </Accordion>

                <Accordion
                  title="Delivery, packaging & instant eBook access"
                  isOpen={openAccordions.shipping}
                  onToggle={() =>
                    setOpenAccordions((prev) => ({
                      ...prev,
                      shipping: !prev.shipping,
                    }))
                  }
                >
                  <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <p>
                      <strong>Physical Editions:</strong> Wrapped in moisture-resistant archival kraft paper with reinforced corner guards so your books arrive in pristine collector condition.
                    </p>
                    <p>
                      <strong>Digital & Audio Editions:</strong> Delivered instantly via email and synced automatically to your Shastraloka profile library.
                    </p>
                  </div>
                </Accordion>

                <Accordion
                  title="Meet the author & Shastraloka Guild Press"
                  isOpen={openAccordions.bookstore}
                  onToggle={() =>
                    setOpenAccordions((prev) => ({
                      ...prev,
                      bookstore: !prev.bookstore,
                    }))
                  }
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FAF8F5] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#23382C] text-white flex items-center justify-center font-bold text-sm">
                          {activeBook.author[0]}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                            {activeBook.author}
                          </h4>
                          <p className="text-[11px] text-neutral-500">
                            Classical Scribe & Translator • 18.4k Followers
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={authorFollowed ? 'primary' : 'outline'}
                        size="sm"
                        text={authorFollowed ? 'Following ✓' : '+ Follow Author'}
                        onClick={() => {
                          setAuthorFollowed(!authorFollowed);
                          triggerToast(
                            !authorFollowed
                              ? `Following ${activeBook.author}`
                              : `Unfollowed ${activeBook.author}`
                          );
                        }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <strong>Shastraloka Guild Press</strong> partners with independent translators, monastic libraries, and traditional bookbinders to publish definitive classical editions.
                    </p>
                  </div>
                </Accordion>
              </div>
            </div>

            {/* 2. Guild Shipping, Care & Authenticity Card */}
            <div className="bg-white dark:bg-[#1a1a20] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F1641E]" />
                <span>Islandwide Delivery & Archival Care</span>
              </h3>

              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800">
                  <Truck className="w-4 h-4 text-[#23382C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                      Colombo & Suburbs: 1–2 Days • Islandwide: 2–3 Days
                    </span>
                    <span>Dispatched in moisture-resistant archival bubble mailers with corner guards.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-[#23382C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                      Cash on Delivery (COD) & Bank Transfer Available
                    </span>
                    <span>Pay at your doorstep anywhere in Sri Lanka, or checkout securely with cards.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800">
                  <Gift className="w-4 h-4 text-[#23382C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                      Complimentary Gift Wrapping & Botanical Bookmark
                    </span>
                    <span>Every classical book order includes a hand-pressed lotus petal bookmark.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Classical Excerpt & Scriptorium Epigraph */}
            <div className="bg-gradient-to-br from-[#23382C] to-[#16241C] text-[#F5F2EB] rounded-3xl p-6 shadow-sm border border-[#2D4537] space-y-3 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-10 text-white pointer-events-none">
                <BookOpen className="w-36 h-36" />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8B059]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Scriptorium Epigraph</span>
              </div>
              <blockquote
                className="text-base sm:text-lg font-heading italic leading-relaxed text-[#F5F2EB]"
                style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
              >
                &ldquo;Composed for the serene joy and spiritual elevation of the pious, tracing the deep springs of sacred wisdom through centuries of chronicle.&rdquo;
              </blockquote>
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-[#D7E2DC]">
                <span>From the Prologue of {activeBook.title}</span>
                <span className="text-[11px] opacity-80 uppercase tracking-wider font-semibold">Shastraloka Royal Collection</span>
              </div>
            </div>

            {/* 4. Monastic Edition Reader FAQ & Preservation */}
            <div className="bg-white dark:bg-[#1a1a20] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F1641E]" />
                <span>Edition FAQs & Preservation</span>
              </h3>

              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800 space-y-1">
                  <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                    Is this translation unabridged with original notes?
                  </h4>
                  <p className="leading-relaxed">
                    Yes. All Shastraloka editions preserve complete verses, scholarly cross-references, glossary terms, and historical footnotes compiled by venerable chroniclers.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800 space-y-1">
                  <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                    How should I care for Smyth-sewn linen bindings?
                  </h4>
                  <p className="leading-relaxed">
                    Keep away from direct sunlight in an airy bookshelf. The 100gsm acid-free Munken cream paper is formulated to resist yellowing for over a century.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#151518] border border-neutral-200/60 dark:border-neutral-800 space-y-1">
                  <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                    Can I read the digital companion on mobile & e-readers?
                  </h4>
                  <p className="leading-relaxed">
                    Instant downloads include standard DRM-free EPUB and PDF files compatible with Kindle, Apple Books, Kobo, and Android tablets.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span>Have more questions about this edition?</span>
                <button
                  type="button"
                  onClick={() => triggerToast('Connecting with Shastraloka Monastic Librarian via WhatsApp')}
                  className="font-bold text-[#F1641E] hover:underline cursor-pointer"
                >
                  Ask a Librarian →
                </button>
              </div>
            </div>

            {/* 5. Shastraloka Guarantee & Support */}
            <div className="p-5 rounded-3xl bg-[#FAF8F5] dark:bg-[#18181e] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-neutral-900 dark:text-white block">
                    100% Collector Satisfaction Guarantee
                  </span>
                  <span className="text-neutral-500">
                    30-day hassle-free replacements if damaged in transit
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                text="Details"
                onClick={() => triggerToast('Shastraloka 30-Day Collector Guarantee: Damage-free delivery or immediate replacement.')}
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            PINTEREST VISUAL BOOK DISCOVERY & MASONRY FEED
           =================================================================== */}
        <section id="masonry-discovery" className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F1641E] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pinterest-Style Visual Book Discovery</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white"
                style={{
                  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                Explore similar covers, editions & reading boards
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Click any Book Pin to load it into the main Shastraloka showcase above, or save it directly to your reading board.
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                'All',
                'Chronicles',
                'Philosophy',
                'Ayurveda',
                'Poetry',
                'Manuscripts',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedMasonryCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedMasonryCategory === cat
                      ? 'bg-[#222222] dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                      : 'bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active explore query indicator */}
          {searchQuery && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 rounded-2xl px-4 py-2.5 text-xs text-amber-950 dark:text-amber-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F1641E]" />
                <span>
                  Filtering visual discovery by explore query: <strong>&ldquo;{searchQuery}&rdquo;</strong> ({filteredMasonryPins.length} books found)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setGlobalSearchQuery('');
                  }}
                  className="font-bold underline hover:text-[#F1641E] cursor-pointer"
                >
                  Clear filter
                </button>
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="inline-flex items-center gap-1 font-bold text-[#F1641E] hover:underline"
                >
                  <span>Open Full Masonry Search</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Pinterest Columns */}
          <div className="columns-2 sm:columns-3 lg:columns-5 gap-4 space-y-4">
            {/* Visual Topic Cards */}
            <div className="break-inside-avoid bg-white dark:bg-[#1a1a20] rounded-3xl p-3.5 border border-neutral-200/90 dark:border-neutral-800 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  Ideas you might love
                </h3>
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
              </div>

              <div className="space-y-2">
                {IDEAS_YOU_MIGHT_LOVE.map((idea) => (
                  <button
                    key={idea.id}
                    type="button"
                    onClick={() => {
                      setSelectedMasonryCategory(idea.tag);
                      triggerToast(`Filtered Pinboard by "${idea.title}"`);
                    }}
                    className="relative w-full h-16 rounded-2xl overflow-hidden group text-left flex items-center justify-center p-3 shadow-2xs cursor-pointer"
                  >
                    <img
                      src={idea.bgImage}
                      alt={idea.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${idea.tint}`} />
                    <span className="relative z-10 text-white text-xs font-bold text-center leading-snug drop-shadow-xs">
                      {idea.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Staggered Pins */}
            {filteredMasonryPins.map((pin) => {
              const isSaved = isBookSaved(pin.id) || !!savedPinIds[pin.id];
              return (
                <div
                  key={pin.id}
                  onClick={() => handleSelectPinAsProduct(pin)}
                  className="break-inside-avoid group cursor-pointer bg-white dark:bg-[#1a1a20] rounded-3xl p-2.5 border border-neutral-200/70 dark:border-neutral-800 hover:border-neutral-300 hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`relative w-full ${pin.aspectClass} rounded-2xl overflow-hidden mb-2.5`}
                    style={{ backgroundColor: pin.bgAccent }}
                  >
                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {pin.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-white/95 text-neutral-900 text-[10px] font-bold shadow-xs">
                        {pin.badge}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => handleTogglePinSave(pin.id, pin.title, e)}
                      className={`absolute top-2.5 right-2.5 z-10 px-3 py-1.5 rounded-full text-xs font-bold shadow-md transition ${
                        isSaved
                          ? 'bg-[#222222] text-white opacity-100'
                          : 'bg-[#e60023] hover:bg-[#ad081b] text-white opacity-95 sm:opacity-0 sm:group-hover:opacity-100'
                      }`}
                    >
                      {isSaved ? 'Saved' : 'Save'}
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                      <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100">
                        LKR {pin.price.toLocaleString()}
                      </span>
                      {pin.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          LKR {pin.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToBag(pin.title, 1);
                      }}
                      title="Quick Add to Bag"
                      className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 dark:bg-neutral-800 hover:bg-[#23382C] text-neutral-900 dark:text-white hover:text-white shadow-md flex items-center justify-center opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  <div className="px-1 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#F1641E] transition-colors">
                        {pin.title}
                      </h4>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    <p className="text-[11px] text-neutral-500 truncate">
                      {pin.author} • <span className="text-neutral-400">{pin.format}</span>
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500">
                      <div className="flex items-center gap-1">
                        <img
                          src={pin.curatorAvatar}
                          alt={pin.curator}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span className="truncate max-w-[95px]">{pin.curator}</span>
                      </div>

                      <div className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                        <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                        <span>{pin.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredMasonryPins.length === 0 && (
              <div className="col-span-full py-12 px-4 text-center bg-white dark:bg-[#1a1a20] rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 space-y-3">
                <Compass className="w-8 h-8 text-neutral-400 mx-auto" />
                <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  No visual pins found matching &ldquo;{searchQuery}&rdquo;
                </h4>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Try selecting another explore topic from the bar above or view all classical treatises.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setGlobalSearchQuery('');
                    setSelectedMasonryCategory('All');
                  }}
                  className="px-4 py-2 rounded-full bg-[#222222] text-white text-xs font-bold hover:bg-neutral-800 transition cursor-pointer"
                >
                  Reset Explore Filter
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ===================================================================
            ETSY-STYLE RELATED SEARCH TAGS
           =================================================================== */}
        <section className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
            Explore related literary searches on Shastraloka
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Mahavamsa Clothbound Editions',
              'Visuddhimagga Complete Commentary',
              'Classical Sinhala Poetry Manuscripts',
              'Yogarnavaya Ayurvedic Formulas',
              'Ancient Ola Leaf Folios',
              'Smyth-Sewn Collector Editions',
              'Pali Canon English Translations',
              'Temple Inscriptions & Vastu',
              '100gsm Munken Cream Notebooks',
              'Rare Monastic Scriptorium Sets',
            ].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => router.push(`/search?q=${encodeURIComponent(term.split(' ')[0])}`)}
                className="px-3.5 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* =====================================================================
          AMAZON "LOOK INSIDE / READ SAMPLE" INTERACTIVE BOOK READER MODAL
         ===================================================================== */}
      {isLookInsideOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-3xl rounded-3xl shadow-2xl border overflow-hidden transition-colors ${
              readerTheme === 'cream'
                ? 'bg-[#F6F1E5] text-[#26231E] border-stone-300'
                : readerTheme === 'white'
                ? 'bg-white text-neutral-900 border-neutral-200'
                : 'bg-[#181816] text-[#E5E0D5] border-neutral-800'
            }`}
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[#F1641E] shrink-0" />
                <div>
                  <h3 className="text-sm font-bold leading-none">
                    Look Inside: {activeBook.title}
                  </h3>
                  <span className="text-[11px] opacity-70">
                    by {activeBook.author} • Sample Excerpt
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded-full border border-current/20 p-0.5 text-xs">
                  {(['cream', 'white', 'night'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setReaderTheme(t)}
                      className={`px-2.5 py-1 rounded-full capitalize font-semibold cursor-pointer ${
                        readerTheme === t
                          ? 'bg-[#F1641E] text-white'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center rounded-full border border-current/20 p-0.5 text-xs">
                  {(['sm', 'md', 'lg'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setReaderFontSize(sz)}
                      className={`px-2 py-1 rounded-full uppercase font-bold cursor-pointer ${
                        readerFontSize === sz
                          ? 'bg-[#23382C] text-white'
                          : 'opacity-70'
                      }`}
                    >
                      A{sz === 'lg' ? '+' : sz === 'sm' ? '-' : ''}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsLookInsideOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Page Body */}
            <div className="p-4 sm:p-10 max-h-[65vh] overflow-y-auto">
              <div className="max-w-xl mx-auto space-y-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-60 border-b border-current/15 pb-2">
                  <span>{SAMPLE_PAGES[samplePageIndex].chapter}</span>
                  <span>Page {SAMPLE_PAGES[samplePageIndex].pageNumber}</span>
                </div>

                <div
                  className={`font-heading leading-relaxed whitespace-pre-line ${
                    readerFontSize === 'sm'
                      ? 'text-sm'
                      : readerFontSize === 'md'
                      ? 'text-base sm:text-[17px]'
                      : 'text-lg sm:text-xl'
                  }`}
                  style={{
                    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {SAMPLE_PAGES[samplePageIndex].content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={samplePageIndex === 0}
                  iconStart={<ChevronLeft className="w-4 h-4" />}
                  text="Previous Page"
                  onClick={() => setSamplePageIndex(0)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={samplePageIndex === SAMPLE_PAGES.length - 1}
                  iconEnd={<ChevronRight className="w-4 h-4" />}
                  text="Next Page"
                  onClick={() => setSamplePageIndex(1)}
                />
              </div>

              <Button
                variant="orange"
                size="md"
                text={`Buy Full Edition — LKR ${currentFormatObj.price.toLocaleString()}`}
                onClick={() => {
                  setIsLookInsideOpen(false);
                  handleAddToBag();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <Toast
          text={toastMessage}
          onDismiss={() => setToastMessage(null)}
          duration={3200}
        />
      )}

      {/* Global Modals */}
      <Footer />
    </div>
  );
}

export default function BookDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F1641E]" />
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
