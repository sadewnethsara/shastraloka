'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import {
    Search,
    Heart,
    Handbag as ShoppingBag,
    Handbag,
    Menu,
    Star,
    MoreHorizontal,
    CloudDownload,
    Lock,
    Tag,
    Leaf,
    X,
    Check,
    ChevronDown,
    BookOpen,
    Sparkles,
    Bookmark,
    Globe,
    Info,
    ArrowRight,
    Eye,
    SlidersHorizontal
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

interface BagItem {
    id: string;
    shopName: string;
    shopRating: number;
    shopReviews: string;
    shopAvatarBg: string;
    shopAvatarIcon: 'minimal-book' | 'cute-ghost' | 'botanical' | 'ink';
    title: string;
    author: string;
    bookFormat: 'Hardcover' | 'Digital PDF & Kindle' | 'Paperback' | 'Collector Edition';
    isbn: string;
    note?: string;
    pills: { label: string; icon?: 'download' }[];
    saleEndsText?: string;
    urgencyRedText?: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    quantity: number;
    shippingCost: number;
    shippingEta?: string;
    isDigital: boolean;
    coverType: 'mirror-books-grid' | 'spooky-girl-main' | 'spooky-bold' | 'spooky-life' | 'floral-grimoire' | 'daisy-journal';
    selectedEdition?: string;
    customOption?: string;
}

interface RelatedBook {
    id: string;
    title: string;
    author: string;
    shopName: string;
    isAd: boolean;
    isStarSeller?: boolean;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    freeShipping?: boolean;
    isDigitalDownload?: boolean;
    bookFormat: 'Hardcover' | 'Kindle & PDF' | 'Paperback' | 'Collector Box';
    pinterestBoard: string;
    rating: number;
    reviewsCount: number;
    coverVariant:
    | 'botanical-1'
    | 'botanical-2'
    | 'botanical-3'
    | 'botanical-4'
    | 'botanical-5'
    | 'botanical-6'
    | 'botanical-7'
    | 'botanical-8'
    | 'botanical-9'
    | 'botanical-10'
    | 'spooky-1'
    | 'spooky-2'
    | 'spooky-3'
    | 'spooky-4'
    | 'spooky-5'
    | 'spooky-6'
    | 'spooky-7'
    | 'spooky-8'
    | 'spooky-9'
    | 'spooky-10';
    collectionGroup: 'screenshot-1' | 'screenshot-2';
}

// ---------------------------------------------------------------------------
// Initial Data Modeling Both Reference Screenshots
// ---------------------------------------------------------------------------

const INITIAL_BAG_SCREENSHOT_1: BagItem[] = [
    {
        id: 'bag-0',
        shopName: 'AirilGiftsShop',
        shopRating: 4.9,
        shopReviews: '6.4k',
        shopAvatarBg: '#fef3c7',
        shopAvatarIcon: 'botanical',
        title: 'Custom Beaded Keychain, Cute Pastel Flower Wristlet, Back to School or Bag Gift...',
        author: 'Airil Press & Crafts',
        bookFormat: 'Collector Edition',
        isbn: '978-1-954821-99-0',
        note: 'Check item details for disclaimers.',
        pills: [
            { label: 'Charm: Pastel Flower' },
            { label: 'Custom Initial: Included' }
        ],
        saleEndsText: 'Sale ends November 3',
        urgencyRedText: 'In 835 bags, 37 bought in the past 24 hours',
        price: 4.15,
        originalPrice: 6.39,
        discountPercent: 35,
        quantity: 1,
        shippingCost: 0,
        isDigital: false,
        coverType: 'daisy-journal',
        selectedEdition: 'Pastel Daisy',
        customOption: 'Yes + Gift Pouch'
    },
    {
        id: 'bag-1',
        shopName: 'AirilGiftsShop',
        shopRating: 4.7,
        shopReviews: '1.2k',
        shopAvatarBg: '#e7dcd3',
        shopAvatarIcon: 'minimal-book',
        title: 'Personalized square pocket hardcover book, botanical linen journal with custom foil spine...',
        author: 'Airil Press & Bookbindery',
        bookFormat: 'Hardcover',
        isbn: '978-1-954821-04-9',
        note: 'Check item details for disclaimers.',
        pills: [
            { label: 'Custom flowers and names: Yes + Gift book bag' },
            { label: 'Select edition: White Linen' }
        ],
        saleEndsText: 'Sale ends November 3',
        price: 4.42,
        originalPrice: 14.71,
        discountPercent: 70,
        quantity: 1,
        shippingCost: 4.99,
        shippingEta: 'Get it by Nov 7-14',
        isDigital: false,
        coverType: 'mirror-books-grid',
        selectedEdition: 'White Linen',
        customOption: 'Yes + Gift book bag'
    },
    {
        id: 'bag-2',
        shopName: 'CocoWyoColoring',
        shopRating: 4.9,
        shopReviews: '6.4k',
        shopAvatarBg: '#fce8ec',
        shopAvatarIcon: 'cute-ghost',
        title: 'Spooky Girl: Cute Quirky Characters in Cozy Moments f...',
        author: 'Coco Wyo Publishing',
        bookFormat: 'Digital PDF & Kindle',
        isbn: '978-0-998412-88-1',
        pills: [
            { label: 'Instant Download', icon: 'download' },
            { label: '1 PDF + eBook Included' }
        ],
        urgencyRedText: 'In 85 bags, 4 bought in the past 24 hours',
        price: 1.49,
        quantity: 1,
        shippingCost: 0,
        isDigital: true,
        coverType: 'spooky-girl-main'
    }
];

const RELATED_BOOKS: RelatedBook[] = [
    // Screenshot 1 Related Items (Botanical Pocket Editions & Pressed Flower Journals)
    {
        id: 'rel-b1',
        title: 'Custom Square Travel Pocket Hardcover Book with Birth Flower Spine',
        author: 'Elena Vance',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 1.75,
        originalPrice: 5.47,
        discountPercent: 68,
        freeShipping: true,
        bookFormat: 'Hardcover',
        pinterestBoard: 'Pastel Bookish Flatlays',
        rating: 4.8,
        reviewsCount: 842,
        coverVariant: 'botanical-1',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b2',
        title: 'Personalized Birth Flower Illuminated Reading Journal & Book Light Set',
        author: 'Meadow & Ink',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 4.95,
        originalPrice: 6.19,
        discountPercent: 20,
        bookFormat: 'Collector Box',
        pinterestBoard: 'Cozy Nightstand Reads',
        rating: 4.9,
        reviewsCount: 1205,
        coverVariant: 'botanical-2',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b3',
        title: 'Personalized square botanical poetry anthology, pocket edition with...',
        author: 'Clara Rossetti',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 1.50,
        originalPrice: 2.00,
        discountPercent: 25,
        bookFormat: 'Paperback',
        pinterestBoard: 'Dark & Light Academia',
        rating: 4.7,
        reviewsCount: 419,
        coverVariant: 'botanical-3',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b4',
        title: 'Personalized Pocket Compendium Bridesmaid Keepsake Book & Vow...',
        author: 'Aurelia Press',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        isStarSeller: true,
        price: 1.50,
        originalPrice: 3.00,
        discountPercent: 50,
        bookFormat: 'Hardcover',
        pinterestBoard: 'Heirloom Books',
        rating: 5.0,
        reviewsCount: 2310,
        coverVariant: 'botanical-4',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b5',
        title: 'Personalized wildflower field guide book, mini illustrated botanical...',
        author: 'Fern & Folio',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        isStarSeller: true,
        price: 0.27,
        originalPrice: 0.49,
        discountPercent: 45,
        bookFormat: 'Paperback',
        pinterestBoard: 'Cottagecore Library',
        rating: 4.9,
        reviewsCount: 930,
        coverVariant: 'botanical-5',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b6',
        title: 'Personalized Square Rose Pressed Collector Hardcover Book, Po...',
        author: 'TopDigiToolbox',
        shopName: 'TopDigiToolbox',
        isAd: false,
        isStarSeller: true,
        price: 4.05,
        originalPrice: 8.11,
        discountPercent: 50,
        bookFormat: 'Hardcover',
        pinterestBoard: 'Pink Bookstagram',
        rating: 4.8,
        reviewsCount: 650,
        coverVariant: 'botanical-6',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b7',
        title: 'Personalized square bouquet novel edition, pocket book with...',
        author: 'AirilGiftsShop',
        shopName: 'AirilGiftsShop',
        isAd: false,
        price: 0.96,
        originalPrice: 3.20,
        discountPercent: 70,
        bookFormat: 'Hardcover',
        pinterestBoard: 'Botanical Classics',
        rating: 4.7,
        reviewsCount: 1240,
        coverVariant: 'botanical-7',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b8',
        title: 'Personalized Bridesmaid Gift Square Mini Poetry Book, Custom...',
        author: 'Timemachine17',
        shopName: 'Timemachine17',
        isAd: false,
        price: 1.30,
        originalPrice: 2.60,
        discountPercent: 50,
        bookFormat: 'Hardcover',
        pinterestBoard: 'Gift Books & Poetry',
        rating: 4.8,
        reviewsCount: 512,
        coverVariant: 'botanical-8',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b9',
        title: 'Handmade Daisy Beaded Bookmarks & Spine Charms, Per...',
        author: 'AirilGiftsShop',
        shopName: 'AirilGiftsShop',
        isAd: false,
        price: 0.33,
        originalPrice: 0.51,
        discountPercent: 35,
        bookFormat: 'Collector Box',
        pinterestBoard: 'Bookish Accessories',
        rating: 4.9,
        reviewsCount: 1890,
        coverVariant: 'botanical-9',
        collectionGroup: 'screenshot-1'
    },
    {
        id: 'rel-b10',
        title: 'Custom Engraved Gilded Brass Bookish Ex-Libris Medallion, Birt...',
        author: 'zyhomes',
        shopName: 'zyhomes',
        isAd: false,
        price: 1.50,
        originalPrice: 3.00,
        discountPercent: 50,
        bookFormat: 'Collector Box',
        pinterestBoard: 'Dark Academia Library',
        rating: 4.8,
        reviewsCount: 740,
        coverVariant: 'botanical-10',
        collectionGroup: 'screenshot-1'
    },

    // Screenshot 2 Related Items (Spooky Girl & Cozy Coloring Books)
    {
        id: 'rel-s1',
        title: 'Spooky Girl Coloring Book, Bold Easy Halloween Art Book...',
        author: 'Coco Wyo & Indie Illustrators',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 0.75,
        originalPrice: 2.99,
        discountPercent: 75,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Spooky Cozy Reads',
        rating: 4.9,
        reviewsCount: 3120,
        coverVariant: 'spooky-1',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s2',
        title: 'Spooky Life Coloring Book - Kawaii Goth Witchy Cozy Book...',
        author: 'Daisy Squeak Press',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 4.66,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Witchy BookTok',
        rating: 4.9,
        reviewsCount: 1580,
        coverVariant: 'spooky-2',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s3',
        title: 'Spooky Girl Coloring Book, Cute Goth Autumn Illustrated Edition...',
        author: 'Lumina Art Books',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 2.39,
        originalPrice: 3.99,
        discountPercent: 40,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Cozy Coloring Club',
        rating: 4.8,
        reviewsCount: 940,
        coverVariant: 'spooky-3',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s4',
        title: 'Spooky Girl Coloring Book for Adults 35 Cozy Rainy Night Pages...',
        author: 'Midnight Cocoa Press',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        isStarSeller: true,
        price: 2.81,
        originalPrice: 9.35,
        discountPercent: 70,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Rainy Day Books',
        rating: 5.0,
        reviewsCount: 2890,
        coverVariant: 'spooky-4',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s5',
        title: 'Spooky Stained Glass Coloring Pages, 6 Digital Book Plates...',
        author: 'Glass & Quill Studio',
        shopName: 'Ad by Bookshop seller',
        isAd: true,
        price: 1.99,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Art Therapy Books',
        rating: 4.7,
        reviewsCount: 410,
        coverVariant: 'spooky-5',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s6',
        title: 'Spooky Cutie: Adorable Creepy Creatures 6 Coloring Pages PDF...',
        author: 'CocoWyoColoring',
        shopName: 'CocoWyoColoring',
        isAd: false,
        price: 1.49,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'CocoWyo Collection',
        rating: 4.9,
        reviewsCount: 6420,
        coverVariant: 'spooky-6',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s7',
        title: 'Girl Moments Vol. 3: Cozy Daily Activities Illustrated Book...',
        author: 'CocoWyoColoring',
        shopName: 'CocoWyoColoring',
        isAd: false,
        price: 1.49,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Cozy Girl Era',
        rating: 5.0,
        reviewsCount: 5190,
        coverVariant: 'spooky-7',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s8',
        title: 'Little Spooky: Cute Creepy Creatures in Cozy Corners Book...',
        author: 'CocoWyoColoring',
        shopName: 'CocoWyoColoring',
        isAd: false,
        price: 1.49,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Autumn Reading List',
        rating: 4.9,
        reviewsCount: 4320,
        coverVariant: 'spooky-8',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s9',
        title: 'Comfy Days: Super Cute Animal Characters Autumn Book...',
        author: 'CocoWyoColoring',
        shopName: 'CocoWyoColoring',
        isAd: false,
        price: 1.49,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Wholesome Illustrated',
        rating: 4.9,
        reviewsCount: 3890,
        coverVariant: 'spooky-9',
        collectionGroup: 'screenshot-2'
    },
    {
        id: 'rel-s10',
        title: 'Stress Relief: Simple and Relaxing Coloring Book Companion...',
        author: 'CocoWyoColoring',
        shopName: 'CocoWyoColoring',
        isAd: false,
        price: 1.49,
        isDigitalDownload: true,
        bookFormat: 'Kindle & PDF',
        pinterestBoard: 'Mindful Reading',
        rating: 4.9,
        reviewsCount: 4980,
        coverVariant: 'spooky-10',
        collectionGroup: 'screenshot-2'
    }
];

// ---------------------------------------------------------------------------
// Custom High-Precision Book Cover Artwork Component (SVG + Rich Styling)
// Replicates the exact look of Screenshot 1 & Screenshot 2 thumbnails
// ---------------------------------------------------------------------------

const BookCoverArtwork: React.FC<{
    variant: string;
    className?: string;
}> = ({ variant, className = '' }) => {
    // 1. Bag Item 1 Cover: 7 Pastel/Neutral Pocket Hardcover Books arranged at an angle with labels
    if (variant === 'mirror-books-grid') {
        const topRow = [
            { name: 'White', bg: '#f5f4f0', text: '#57534e', border: '#d6d3d1' },
            { name: 'Brown', bg: '#785238', text: '#fafaf9', border: '#5c3d28' },
            { name: 'Pink', bg: '#eab8b1', text: '#fff1f2', border: '#d99b93' }
        ];
        const bottomRow = [
            { name: 'Black', bg: '#1c1917', text: '#f5f5f4', border: '#0c0a09' },
            { name: 'Grey', bg: '#787b82', text: '#f5f5f4', border: '#575a61' },
            { name: 'Blue', bg: '#a3b8bd', text: '#f8fafc', border: '#869ea4' },
            { name: 'Yellow', bg: '#eab32e', text: '#fefce8', border: '#ca9316' }
        ];

        return (
            <div
                className={`relative w-full h-full bg-[#f7f5f2] overflow-hidden flex flex-col items-center justify-center p-2 select-none ${className}`}
            >
                {/* Soft linen texture backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5f2ed] to-[#ebe5dc]" />
                <div className="relative z-10 flex flex-col gap-1.5 -rotate-12 scale-95">
                    {/* Top row of 3 pocket hardcover books */}
                    <div className="flex items-center justify-center gap-1.5">
                        {topRow.map((b) => (
                            <div
                                key={b.name}
                                style={{ backgroundColor: b.bg, borderColor: b.border, color: b.text }}
                                className="w-9 h-12 rounded-[4px] border shadow-sm flex flex-col items-center justify-between py-1 px-0.5 relative"
                            >
                                <div className="w-full h-[1px] bg-current opacity-20" />
                                <span className="text-[7px] font-medium tracking-tight">{b.name}</span>
                                <div className="w-5 h-5 rounded-[2px] border border-current/25 flex items-center justify-center">
                                    <BookOpen className="w-2.5 h-2.5 opacity-40" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Bottom row of 4 pocket hardcover books */}
                    <div className="flex items-center justify-center gap-1.5">
                        {bottomRow.map((b) => (
                            <div
                                key={b.name}
                                style={{ backgroundColor: b.bg, borderColor: b.border, color: b.text }}
                                className="w-8 h-12 rounded-[4px] border shadow-sm flex flex-col items-center justify-between py-1 px-0.5 relative"
                            >
                                <div className="w-full h-[1px] bg-current opacity-20" />
                                <span className="text-[6.5px] font-medium tracking-tight">{b.name}</span>
                                <div className="w-4 h-4 rounded-[2px] border border-current/25 flex items-center justify-center">
                                    <Sparkles className="w-2 h-2 opacity-40" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 2. CocoWyo 6-Page PDF Collage Layout (Used by Bag Item 2 & bottom row of Screenshot 2)
    if (
        variant === 'spooky-girl-main' ||
        variant === 'spooky-6' ||
        variant === 'spooky-7' ||
        variant === 'spooky-8' ||
        variant === 'spooky-9' ||
        variant === 'spooky-10'
    ) {
        const configMap: Record<
            string,
            { header: string; accent: string; centerBg: string; emoji: string; sub: string }
        > = {
            'spooky-girl-main': {
                header: 'SPOOKY GIRL',
                accent: '#f43f5e',
                centerBg: '#312e81',
                emoji: '👻📚',
                sub: '6 COLORING PAGES PDF FILE'
            },
            'spooky-6': {
                header: 'SPOOKY CUTIE',
                accent: '#ec4899',
                centerBg: '#1e3a8a',
                emoji: '🐾🎃',
                sub: '6 COLORING PAGES PDF FILE'
            },
            'spooky-7': {
                header: 'GIRL MOMENTS Vol.3',
                accent: '#d97706',
                centerBg: '#7c2d12',
                emoji: '☕📖',
                sub: '6 COLORING PAGES PDF FILE'
            },
            'spooky-8': {
                header: 'LITTLE SPOOKY',
                accent: '#e11d48',
                centerBg: '#4c1d95',
                emoji: '🛁👻',
                sub: '6 COLORING PAGES PDF FILE'
            },
            'spooky-9': {
                header: 'COMFY DAYS',
                accent: '#16a34a',
                centerBg: '#14532d',
                emoji: '🧸🍂',
                sub: '6 COLORING PAGES PDF FILE'
            },
            'spooky-10': {
                header: 'STRESS RELIEF',
                accent: '#0284c7',
                centerBg: '#831843',
                emoji: '🌸🏡',
                sub: '6 COLORING PAGES PDF FILE'
            }
        };

        const cfg = configMap[variant] || configMap['spooky-girl-main'];

        return (
            <div
                className={`relative w-full h-full bg-[#fdfbf7] overflow-hidden flex flex-col justify-between p-2 select-none border border-stone-200/70 ${className}`}
            >
                {/* Top pink badge "NO COLORED VERSION" */}
                <div
                    style={{ backgroundColor: cfg.accent }}
                    className="absolute top-1.5 left-1.5 z-20 w-7 h-7 rounded-full text-white flex flex-col items-center justify-center text-[5px] font-extrabold leading-tight text-center shadow-sm -rotate-12"
                >
                    <span>NO</span>
                    <span>COLOR</span>
                    <span>PDF</span>
                </div>

                {/* Title Header */}
                <div className="text-center pt-0.5">
                    <div className="text-[10px] font-black tracking-tight text-stone-800 uppercase leading-none font-serif">
                        {cfg.header}
                    </div>
                    <div className="text-[6.5px] font-bold text-stone-600 tracking-tight mt-0.5">
                        {cfg.sub}
                    </div>
                </div>

                {/* Center 3-column mini coloring pages collage */}
                <div className="grid grid-cols-3 gap-1 my-1 flex-1 items-center">
                    {/* Colored Sample Card */}
                    <div
                        style={{ backgroundColor: cfg.centerBg }}
                        className="h-full rounded border border-stone-700 p-1 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner"
                    >
                        <div className="w-6 h-6 rounded-full bg-amber-300/20 absolute -top-1 -right-1" />
                        <span className="text-base leading-none">{cfg.emoji}</span>
                        <span className="text-[5.5px] text-amber-200 font-semibold mt-1 leading-tight">
                            Cozy Book Nook
                        </span>
                    </div>

                    {/* Line-art Sample Pages (2x2 grid on right 2 columns) */}
                    <div className="col-span-2 grid grid-cols-2 gap-1 h-full">
                        {[1, 2, 3, 4].map((page) => (
                            <div
                                key={page}
                                className="bg-white rounded border border-stone-400 p-1 flex flex-col justify-between items-center relative"
                            >
                                <div className="w-full flex justify-between items-center">
                                    <div className="w-2 h-2 rounded-full border border-stone-500" />
                                    <div className="w-4 h-1 border-b border-stone-400" />
                                </div>
                                <div className="w-5 h-4 rounded-sm border border-dashed border-stone-500 flex items-center justify-center text-[7px] text-stone-600">
                                    {page === 1 ? '☾' : page === 2 ? '☕' : page === 3 ? '📖' : '🕯️'}
                                </div>
                                <div className="w-full h-1 bg-stone-200 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom subtle footer */}
                <div className="flex items-center justify-between text-[6px] text-stone-500 font-medium px-0.5">
                    <span>CocoWyo Edition</span>
                    <span>Printable + Kindle</span>
                </div>
            </div>
        );
    }

    // 3. Top Row of Screenshot 2 (Bold Colorful Spooky Girl Book Covers)
    if (variant.startsWith('spooky-')) {
        const spookyConfigs: Record<
            string,
            {
                bg: string;
                title: string;
                sub: string;
                badge: string;
                hairColor: string;
                accent: string;
            }
        > = {
            'spooky-1': {
                bg: 'from-purple-900 via-fuchsia-900 to-amber-900',
                title: 'SPOOKY GIRL',
                sub: 'BOLD & EASY COLORING BOOK',
                badge: '30 PAGES',
                hairColor: '#581c87',
                accent: '#facc15'
            },
            'spooky-2': {
                bg: 'from-indigo-950 via-purple-900 to-orange-900',
                title: 'SPOOKY LIFE',
                sub: 'CUTE & COMFY COLORING BOOK',
                badge: '50 PAGES',
                hairColor: '#3b0764',
                accent: '#fb923c'
            },
            'spooky-3': {
                bg: 'from-stone-200 via-amber-100 to-stone-300',
                title: 'SPOOKY GIRL',
                sub: '40 BOLD & EASY COLORING PAGES',
                badge: '40 PAGES',
                hairColor: '#713f12',
                accent: '#a855f7'
            },
            'spooky-4': {
                bg: 'from-slate-900 via-teal-950 to-amber-950',
                title: 'SPOOKY GIRL',
                sub: 'COLORING BOOK',
                badge: '35 PAGES',
                hairColor: '#451a03',
                accent: '#fbbf24'
            },
            'spooky-5': {
                bg: 'from-amber-200 via-orange-100 to-amber-300',
                title: 'SPOOKY STAINED GLASS',
                sub: '6 Digital Coloring Pages',
                badge: 'PDF BOOK',
                hairColor: '#9a3412',
                accent: '#ec4899'
            }
        };

        const sc = spookyConfigs[variant] || spookyConfigs['spooky-1'];
        const isLight = variant === 'spooky-3' || variant === 'spooky-5';

        return (
            <div
                className={`relative w-full h-full bg-gradient-to-b ${sc.bg} overflow-hidden flex flex-col justify-between p-2.5 select-none ${className}`}
            >
                {/* Top Book Title Banner */}
                <div className="text-center z-10">
                    <div
                        className={`text-[11px] font-black tracking-tight leading-none uppercase drop-shadow ${isLight ? 'text-stone-900' : 'text-white'
                            }`}
                    >
                        {sc.title}
                    </div>
                    <div
                        className={`text-[6.5px] font-bold tracking-wider uppercase mt-0.5 ${isLight ? 'text-purple-900' : 'text-amber-300'
                            }`}
                    >
                        {sc.sub}
                    </div>
                </div>

                {/* Center Cozy Character Book Illustration */}
                <div className="relative my-auto mx-auto w-24 h-24 rounded-xl bg-black/25 border border-white/20 flex flex-col items-center justify-center p-2 shadow-inner">
                    {/* Moon & Stars */}
                    <div className="absolute top-1.5 left-2 text-[9px] text-amber-300">☾ ✦</div>
                    <div className="absolute top-1.5 right-2 text-[9px] text-pink-300">🕯️</div>
                    {/* Cute Spooky Girl Reading Avatar */}
                    <div
                        style={{ backgroundColor: sc.hairColor }}
                        className="w-12 h-12 rounded-full border-2 border-stone-900 flex flex-col items-center justify-center relative shadow"
                    >
                        <div className="w-9 h-7 bg-[#fde6d8] rounded-full flex items-center justify-around px-1 mt-1 border border-stone-800">
                            <div className="w-2.5 h-2.5 rounded-full bg-white border border-stone-900 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-stone-900" />
                            </div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white border border-stone-900 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-stone-900" />
                            </div>
                        </div>
                    </div>
                    {/* Open Book + Pumpkin in front */}
                    <div className="mt-1 flex items-center gap-1">
                        <span className="text-xs">🎃</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-stone-900 text-[6.5px] font-bold border border-stone-800">
                            GRIMOIRE
                        </span>
                        <span className="text-xs">🐈‍⬛</span>
                    </div>
                </div>

                {/* Bottom Corner Page Badge */}
                <div className="flex items-center justify-between z-10">
                    <span
                        className={`text-[6.5px] font-semibold ${isLight ? 'text-stone-700' : 'text-stone-200'
                            }`}
                    >
                        Amazon / Kindle Ready
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-pink-500 text-white text-[7px] font-extrabold shadow">
                        {sc.badge}
                    </span>
                </div>
            </div>
        );
    }

    // 4. Screenshot 1 Related Items (Botanical Pocket Books, Floral Editions & Bookish Keepsakes)
    const botanicalStyles: Record<
        string,
        {
            bg: string;
            card1: string;
            card2: string;
            name1: string;
            name2: string;
            flower: string;
            tag: string;
        }
    > = {
        'botanical-1': {
            bg: 'from-[#e9e3da] to-[#dcd3c6]',
            card1: '#a8c3d4',
            card2: '#f3d98b',
            name1: 'Madison',
            name2: 'Brynn',
            flower: '🌷',
            tag: 'Pocket Hardcover'
        },
        'botanical-2': {
            bg: 'from-[#f9ebe4] to-[#eed7cc]',
            card1: '#b7d7c8',
            card2: '#f4bbc9',
            name1: 'Laura',
            name2: 'Sophia',
            flower: '🌸',
            tag: 'Illuminated Book'
        },
        'botanical-3': {
            bg: 'from-[#f3f4f6] to-[#e5e7eb]',
            card1: '#1f2937',
            card2: '#f9a8d4',
            name1: 'Olivia',
            name2: 'Rose',
            flower: '🌿',
            tag: 'Poetry Edition'
        },
        'botanical-4': {
            bg: 'from-[#f5ebe1] to-[#e6d5c3]',
            card1: '#fdfbf7',
            card2: '#f3e8da',
            name1: 'Christian & Randy',
            name2: '08/10/2026',
            flower: '💐',
            tag: 'Vow Compendium'
        },
        'botanical-5': {
            bg: 'from-[#f6f5f0] to-[#e7e4db]',
            card1: '#faf8f5',
            card2: '#f0ece1',
            name1: 'Sophia',
            name2: 'Botanical Vol. I',
            flower: '🌼',
            tag: 'On The Go Read'
        },
        'botanical-6': {
            bg: 'from-[#f3e5d8] to-[#e2cbb7]',
            card1: '#f4c6cb',
            card2: '#fdf8f3',
            name1: 'Rachel',
            name2: 'Rose Press',
            flower: '🌹',
            tag: 'Collector Edition'
        },
        'botanical-7': {
            bg: 'from-[#ead7c3] to-[#d8be9f]',
            card1: '#f5dec9',
            card2: '#f5dec9',
            name1: 'Amanda',
            name2: 'Floral Folio',
            flower: '🌾',
            tag: 'Custom Spine'
        },
        'botanical-8': {
            bg: 'from-[#f2efe9] to-[#dfd9ce]',
            card1: '#bae6fd',
            card2: '#fecdd3',
            name1: 'Anna',
            name2: 'Jessica',
            flower: '🌺',
            tag: 'Bridal Book Set'
        },
        'botanical-9': {
            bg: 'from-[#f4f1ea] to-[#e5dfd3]',
            card1: '#d9f99d',
            card2: '#ddd6fe',
            name1: 'Daisy Tassel',
            name2: 'Book Charm',
            flower: '🌼',
            tag: 'Spine Bookmark'
        },
        'botanical-10': {
            bg: 'from-[#452c1e] to-[#291810]',
            card1: '#ebd59b',
            card2: '#d4b475',
            name1: 'Ex Libris',
            name2: 'Gilded Brass',
            flower: '⚜️',
            tag: 'Brass Book Seal'
        }
    };

    const bStyle = botanicalStyles[variant] || botanicalStyles['botanical-1'];
    const isDarkBg = variant === 'botanical-10';

    return (
        <div
            className={`relative w-full h-full bg-gradient-to-br ${bStyle.bg} overflow-hidden flex flex-col items-center justify-center p-3 select-none ${className}`}
        >
            {/* Decorative open book / dried flower aesthetic backdrop */}
            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-white/30 blur-md" />
            <div className="relative z-10 flex items-center justify-center gap-2">
                {/* Left mini hardcover */}
                <div
                    style={{ backgroundColor: bStyle.card1 }}
                    className="w-14 h-20 rounded-md shadow-md border border-black/10 flex flex-col items-center justify-between p-1.5 -rotate-6 transition-transform group-hover:rotate-0"
                >
                    <div className="w-full flex justify-between items-center opacity-40">
                        <span className="text-[6px] font-serif">FOLIO</span>
                        <span className="text-[6px]">I</span>
                    </div>
                    <div className="text-base leading-none">{bStyle.flower}</div>
                    <span className="text-[7px] font-serif italic text-stone-800 font-semibold text-center leading-tight line-clamp-1">
                        {bStyle.name1}
                    </span>
                </div>

                {/* Right mini hardcover */}
                <div
                    style={{ backgroundColor: bStyle.card2 }}
                    className="w-14 h-20 rounded-md shadow-md border border-black/10 flex flex-col items-center justify-between p-1.5 rotate-6 translate-y-1 transition-transform group-hover:rotate-0"
                >
                    <div className="w-full flex justify-between items-center opacity-40">
                        <span className="text-[6px] font-serif">EDITION</span>
                        <span className="text-[6px]">II</span>
                    </div>
                    <div className="text-base leading-none">{bStyle.flower}</div>
                    <span className="text-[7px] font-serif italic text-stone-800 font-semibold text-center leading-tight line-clamp-1">
                        {bStyle.name2}
                    </span>
                </div>
            </div>

            {/* Subtle bottom literary label */}
            <div
                className={`mt-2 text-[7px] font-medium tracking-wide uppercase ${isDarkBg ? 'text-amber-200/90' : 'text-stone-600'
                    }`}
            >
                {bStyle.tag}
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Main Application Component
// ---------------------------------------------------------------------------

export default function Bag() {
    const router = useRouter();
    const { bag, removeFromBag, updateBagQuantity, clearBag } = useApp();
    
    // Active preset view to let user inspect both uploaded screenshots or interact freely
    const [activePreset, setActivePreset] = useState<'screenshot-1' | 'screenshot-2'>('screenshot-1');

    // Bag Items State - Using global context bag when available, otherwise mock data
    const [bagItems, setBagItems] = useState<BagItem[]>(INITIAL_BAG_SCREENSHOT_1);
    const [prevBag, setPrevBag] = useState(bag);

    // Sync local bag items with global context during render
    if (bag !== prevBag) {
        setPrevBag(bag);
        if (bag.length > 0) {
            // Convert global bag items to local format for display
            const convertedItems = bag.map((item, index) => ({
                id: `bag-${index}`,
                shopName: item.book.sellerName || 'Shastraloka Books',
                shopRating: item.book.sellerRating || 4.9,
                shopReviews: item.book.sellerReviews || '1.2k',
                shopAvatarBg: '#fef3c7',
                shopAvatarIcon: 'botanical' as const,
                title: item.book.title,
                author: item.book.author,
                bookFormat: 'Hardcover' as const,
                isbn: '978-1-954821-99-0',
                pills: [
                    { label: item.book.binding || 'Standard Edition' }
                ],
                urgencyRedText: item.book.urgencyText || 'In 85 carts, 4 bought in the past 24 hours',
                price: item.book.usdPrice ?? (item.book.price / 300),
                originalPrice: item.book.originalUsdPrice ?? (item.book.originalPrice ? item.book.originalPrice / 300 : undefined),
                discountPercent: item.book.originalPrice ? Math.round((1 - item.book.price / item.book.originalPrice) * 100) : undefined,
                quantity: item.quantity,
                shippingCost: 0,
                isDigital: item.book.isDigital || false,
                coverType: 'daisy-journal' as const,
                selectedEdition: item.binding,
                customOption: undefined
            }));
            setBagItems(convertedItems);
        }
    }

    // Saved for Later Items State
    const [savedForLater, setSavedForLater] = useState<BagItem[]>([]);

    // Pinterest Saved Reading Pins (Wishlist)
    const [pinnedBookIds, setPinnedBookIds] = useState<string[]>(['rel-b2', 'rel-s1']);

    // Floating Top-Right Urgency Notification Banner State (matches screenshots)
    const [showFloatingUrgency, setShowFloatingUrgency] = useState<boolean>(true);

    // Search Bar & Amazon Book Category Filter
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedBookDept, setSelectedBookDept] = useState<string>('All Books');
    const [showCategoriesMenu, setShowCategoriesMenu] = useState<boolean>(false);

    // Related Books Filter Tab ('screenshot-1' | 'screenshot-2' | 'all')
    const [relatedTab, setRelatedTab] = useState<'screenshot-1' | 'screenshot-2' | 'all'>('screenshot-1');

    // Order Summary Interactive States
    const [isGiftOrder, setIsGiftOrder] = useState<boolean>(false);
    const [giftMessage, setGiftMessage] = useState<string>('');
    const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
    const [couponCode, setCouponCode] = useState<string>('');
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

    // Modals: "Edit Edition" (for Bag Item) & Amazon "Look Inside" Book Reader Preview & Checkout Modal
    const [editingItem, setEditingItem] = useState<BagItem | null>(null);
    const [previewBook, setPreviewBook] = useState<{
        title: string;
        author: string;
        format: string;
        price: number;
        coverVariant: string;
    } | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [checkoutSuccessModal, setCheckoutSuccessModal] = useState<boolean>(false);

    // Helper to trigger brief non-intrusive toast notification
    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage((prev) => (prev === msg ? null : prev));
        }, 3200);
    };

    // Switch between Screenshot 1 (2 items + Botanical books) and Screenshot 2 (1 item + Spooky Coloring books)
    const handleSwitchPreset = (preset: 'screenshot-1' | 'screenshot-2') => {
        setActivePreset(preset);
        setShowFloatingUrgency(true);
        if (preset === 'screenshot-1') {
            setBagItems(INITIAL_BAG_SCREENSHOT_1);
            setRelatedTab('screenshot-1');
            triggerToast('Loaded View 1: 2-Item Bag (Botanical Hardcover + Spooky Girl Digital Book)');
        } else {
            setBagItems([INITIAL_BAG_SCREENSHOT_1[1]]);
            setRelatedTab('screenshot-2');
            triggerToast('Loaded View 2: 1-Item Bag (Spooky Girl Digital Coloring Book)');
        }
    };

    // Quantity update handler
    const handleUpdateQuantity = (id: string, newQty: number) => {
        setBagItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
        );
        // Update global context
        const bookId = id.startsWith('bag-') ? id.replace('bag-', '') : id;
        const delta = newQty - (bagItems.find(i => i.id === id)?.quantity || 0);
        if (delta !== 0) {
            updateBagQuantity(bookId, delta);
        }
    };

    // Remove item from bag
    const handleRemoveFromBag = (id: string) => {
        const target = bagItems.find((i) => i.id === id);
        setBagItems((prev) => prev.filter((item) => item.id !== id));
        // Remove from global context using book ID
        const bookId = id.startsWith('bag-') ? id.replace('bag-', '') : id;
        removeFromBag(bookId);
        if (target) {
            triggerToast(`Removed "${target.title.slice(0, 32)}..." from your bag`);
        }
    };

    // Save item for later
    const handleSaveForLater = (id: string) => {
        const target = bagItems.find((i) => i.id === id);
        if (!target) return;
        setBagItems((prev) => prev.filter((item) => item.id !== id));
        setSavedForLater((prev) => [target, ...prev]);
        // Also remove from global context
        const bookId = id.startsWith('bag-') ? id.replace('bag-', '') : id;
        removeFromBag(bookId);
        triggerToast(`Saved "${target.title.slice(0, 28)}..." for later`);
    };

    // Move back to bag from Saved for Later
    const handleMoveToBag = (item: BagItem) => {
        setSavedForLater((prev) => prev.filter((i) => i.id !== item.id));
        setBagItems((prev) => [...prev, item]);
        triggerToast(`Moved "${item.title.slice(0, 28)}..." back to your bag`);
    };

    // Add related book to bag
    const handleAddRelatedToBag = (book: RelatedBook) => {
        const existing = bagItems.find((i) => i.id === book.id);
        if (existing) {
            handleUpdateQuantity(book.id, existing.quantity + 1);
            triggerToast(`Updated quantity of "${book.title.slice(0, 28)}..." in your bag`);
            return;
        }

        const newItem: BagItem = {
            id: book.id,
            shopName: book.shopName === 'Ad by Bookshop seller' ? 'FolioIndieBooks' : book.shopName,
            shopRating: book.rating,
            shopReviews: `${(book.reviewsCount / 1000).toFixed(1)}k`,
            shopAvatarBg: book.collectionGroup === 'screenshot-2' ? '#fce8ec' : '#e7dcd3',
            shopAvatarIcon: book.collectionGroup === 'screenshot-2' ? 'cute-ghost' : 'minimal-book',
            title: book.title,
            author: book.author,
            bookFormat: book.isDigitalDownload ? 'Digital PDF & Kindle' : 'Hardcover',
            isbn: '978-1-64937-412-7',
            pills: book.isDigitalDownload
                ? [
                    { label: 'Instant Download', icon: 'download' },
                    { label: '1 PDF + Kindle eBook Included' }
                ]
                : [
                    { label: `Format: ${book.bookFormat}` },
                    { label: `Board: ${book.pinterestBoard}` }
                ],
            urgencyRedText: book.isDigitalDownload
                ? 'In 42 bags, 9 bought in the past 24 hours'
                : undefined,
            saleEndsText: !book.isDigitalDownload ? 'Sale ends November 3' : undefined,
            price: book.price,
            originalPrice: book.originalPrice,
            discountPercent: book.discountPercent,
            quantity: 1,
            shippingCost: book.isDigitalDownload || book.freeShipping ? 0 : 4.99,
            shippingEta: book.isDigitalDownload ? undefined : 'Get it by Nov 7-14',
            isDigital: Boolean(book.isDigitalDownload),
            coverType: book.collectionGroup === 'screenshot-2' ? 'spooky-girl-main' : 'mirror-books-grid'
        };

        setBagItems((prev) => [...prev, newItem]);
        triggerToast(`Added "${book.title.slice(0, 32)}..." to your bag!`);
    };

    // Toggle Pinterest Pin on any book card
    const togglePinBook = (id: string, title: string) => {
        if (pinnedBookIds.includes(id)) {
            setPinnedBookIds((prev) => prev.filter((item) => item !== id));
            triggerToast(`Removed from your Pinterest Reading Board`);
        } else {
            setPinnedBookIds((prev) => [...prev, id]);
            triggerToast(`Pinned "${title.slice(0, 26)}..." to Cozy Reading Board 📌`);
        }
    };

    // Apply coupon code
    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        const cleaned = couponCode.trim().toUpperCase();
        if (!cleaned) return;
        if (cleaned === 'BOOKBAG15' || cleaned === 'READER10' || cleaned === 'PINBOOK') {
            setAppliedCoupon({ code: cleaned, discount: 1.5 });
            triggerToast(`Coupon ${cleaned} applied! Saved USD 1.50`);
        } else {
            setAppliedCoupon({ code: cleaned, discount: 1.0 });
            triggerToast(`Promo code ${cleaned} applied! Saved USD 1.00`);
        }
        setCouponCode('');
        setShowCouponInput(false);
    };

    // Financial Calculations matching Screenshot 1 & Screenshot 2 exact math
    const financials = useMemo(() => {
        const totalCount = bagItems.reduce((acc, item) => acc + item.quantity, 0);
        const rawItemsTotal = bagItems.reduce(
            (acc, item) => acc + (item.originalPrice ?? item.price) * item.quantity,
            0
        );
        const discountedSubtotal = bagItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const shopDiscount = Math.max(0, rawItemsTotal - discountedSubtotal);
        const shippingTotal = bagItems.reduce(
            (acc, item) => acc + (item.isDigital ? 0 : item.shippingCost),
            0
        );
        const couponSavings = appliedCoupon ? appliedCoupon.discount : 0;
        const grandTotal = Math.max(0, discountedSubtotal + shippingTotal - couponSavings);

        return {
            totalCount,
            rawItemsTotal,
            shopDiscount,
            discountedSubtotal,
            shippingTotal,
            couponSavings,
            grandTotal
        };
    }, [bagItems, appliedCoupon]);

    // Filtered Related Books
    const visibleRelatedBooks = useMemo(() => {
        return RELATED_BOOKS.filter((book) => {
            const matchesTab =
                relatedTab === 'all' ? true : book.collectionGroup === relatedTab;
            const matchesQuery =
                !searchQuery.trim() ||
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.pinterestBoard.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesQuery;
        });
    }, [relatedTab, searchQuery]);

    // Highlighted item for the top-right floating urgency popover (matches screenshot 1 & 2)
    const urgencyHighlight = bagItems[0] || INITIAL_BAG_SCREENSHOT_1[0];

    return (
        <div className="min-h-screen bg-white text-[#222222] font-sans antialiased selection:bg-[#f1641e]/15 selection:text-[#f1641e]">
            {/* ------------------------------------------------------------------- */}
            {/* TOP INTERACTIVE PRESET SWITCHER BAR (Amazon + Pinterest + Etsy Hybrid) */}
            {/* ------------------------------------------------------------------- */}
            <div className="bg-[#faf8f5] border-b border-stone-200/80 px-4 py-1.5 text-xs">
                <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-stone-600">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e60023]/10 text-[#e60023] font-semibold text-[11px]">
                            <Bookmark className="w-3 h-3 fill-current" /> Pinterest Book Aesthetic
                        </span>
                        <span className="hidden sm:inline text-stone-300">•</span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-stone-600 font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-[#f1641e]" /> Amazon Book Formats + Etsy Bag Layout
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-stone-500 font-medium mr-1">Reference Preset:</span>
                        <button
                            onClick={() => handleSwitchPreset('screenshot-1')}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${activePreset === 'screenshot-1'
                                ? 'bg-[#222222] text-white shadow-xs'
                                : 'bg-stone-200/75 text-stone-700 hover:bg-stone-300/70'
                                }`}
                        >
                            Screenshot 1 (2 Books in Bag • USD 10.90)
                        </button>
                        <button
                            onClick={() => handleSwitchPreset('screenshot-2')}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${activePreset === 'screenshot-2'
                                ? 'bg-[#222222] text-white shadow-xs'
                                : 'bg-stone-200/75 text-stone-700 hover:bg-stone-300/70'
                                }`}
                        >
                            Screenshot 2 (1 Digital Book • USD 1.49)
                        </button>
                    </div>
                </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* MAIN HEADER BAR (Cloned from Screenshots + Bookstore & Pin Touches) */}
            {/* ------------------------------------------------------------------- */}
            <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                    {/* Row 1: Brand + Desktop Search + Right Actions */}
                    <div className="h-[64px] md:h-[72px] flex items-center justify-between gap-2 sm:gap-5 relative">
                        {/* Left: Logo + Categories */}
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                            <Link
                                href="/"
                                className="flex flex-col shrink-0 select-none group focus:outline-none"
                            >
                                <span
                                    className="text-[#F1641E] text-[24px] sm:text-[32px] leading-none font-bold tracking-tight transition-transform group-hover:scale-102"
                                    style={{
                                        fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                                    }}
                                >
                                    Shastraloka
                                </span>
                                <span className="text-[9.5px] text-stone-500 font-sinhala tracking-wider pl-0.5">
                                    ශාස්ත්‍රලෝක • Classical Bookstore
                                </span>
                            </Link>

                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setShowCategoriesMenu((prev) => !prev)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full text-[13.5px] font-medium text-[#222222] hover:bg-stone-100 transition-colors"
                                >
                                    <Menu className="w-4 h-4 stroke-[2.2]" />
                                    <span>Categories</span>
                                </button>

                                {/* Amazon Bookstore + Pinterest Aesthetic Categories Dropdown */}
                                {showCategoriesMenu && (
                                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50">
                                        <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                                            Bookstore Departments
                                        </div>
                                        {[
                                            'All Books & Editions',
                                            'Collector Sprayed-Edge Hardcovers',
                                            'Instant Kindle & Printable Coloring Books',
                                            'Botanical & Pressed Flower Journals',
                                            'Cozy Mystery & Autumn BookTok',
                                            'Handmade Bookmarks & Ex-Libris Seals'
                                        ].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedBookDept(cat.split(' ')[0]);
                                                    setShowCategoriesMenu(false);
                                                    triggerToast(`Browsing category: ${cat}`);
                                                }}
                                                className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-100 flex items-center justify-between"
                                            >
                                                <span>{cat}</span>
                                                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Center: Desktop Pill Search Bar with Orange Circle Search Button */}
                        <div className="hidden md:block flex-1 max-w-[740px]">
                            <div className="relative flex items-center w-full h-[46px] rounded-full border-[1.5px] border-[#222222] bg-white hover:shadow-xs focus-within:ring-2 focus-within:ring-[#222222]/10 overflow-hidden transition-all">
                                {/* Subtle Amazon-style book format filter inside search pill */}
                                <div className="hidden lg:flex items-center pl-4 pr-2.5 h-full bg-stone-50 border-r border-stone-200 text-xs font-medium text-stone-700 shrink-0">
                                    <span>{selectedBookDept}</span>
                                    <ChevronDown className="w-3.5 h-3.5 ml-1 text-stone-500" />
                                </div>

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for books, authors, ISBNs, or cozy reading pins..."
                                    className="w-full h-full px-4 text-[14.5px] text-[#222222] placeholder-stone-500 bg-transparent focus:outline-none"
                                />

                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-1.5 mr-1 text-stone-400 hover:text-stone-700"
                                        title="Clear search"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        triggerToast(
                                            searchQuery
                                                ? `Searching bookstore for "${searchQuery}"`
                                                : 'Showing all curated books'
                                        )
                                    }
                                    aria-label="Search"
                                    className="mr-1.5 w-[36px] h-[36px] rounded-full bg-[#f1641e] hover:bg-[#d95616] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                                >
                                    <Search className="w-4 h-4 stroke-[2.5]" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Sign in, Heart (Saved Pins), and Bag Icon with Counter */}
                        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
                            <button
                                onClick={() => triggerToast('Signed in as Reader • Kindle & Print Sync Active')}
                                className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-[13.5px] font-medium text-[#222222] hover:bg-stone-100 transition-colors"
                            >
                                Sign in
                            </button>

                            <button
                                onClick={() =>
                                    triggerToast(`You have ${pinnedBookIds.length} books pinned to your Reading Board`)
                                }
                                className="relative p-2 rounded-full text-[#222222] hover:bg-stone-100 transition-colors"
                                title="Pinned Reading List"
                            >
                                <Heart className="w-5 h-5 fill-[#222222]" />
                                {pinnedBookIds.length > 0 && (
                                    <span className=" -top-0.5 -right-0.5 absolute w-4 h-4 rounded-full bg-[#e60023] text-white text-[9.5px] font-bold flex items-center justify-center">
                                        {pinnedBookIds.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() =>
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }
                                className="relative p-2 rounded-full text-[#222222] hover:bg-stone-100 transition-colors flex items-center"
                                title="Your Book Bag"
                            >
                                <Handbag className="w-5 h-5 stroke-[2.2]" />
                                <span className=" -top-0.5 -right-1 absolute min-w-[18px] h-[18px] px-1 rounded-full bg-[#f1641e] text-white text-[10.5px] font-bold flex items-center justify-center shadow-xs">
                                    {financials.totalCount}
                                </span>
                            </button>
                        </div>

                        {/* --------------------------------------------------------------- */}
                        {/* FLOATING TOP-RIGHT URGENCY NOTIFICATION POPOVER (From Screenshots) */}
                        {/* --------------------------------------------------------------- */}
                        {showFloatingUrgency && bagItems.length > 0 && (
                            <div className="hidden md:flex items-center gap-3.5 absolute right-4 top-[54px] z-40 w-[348px] bg-white rounded-2xl shadow-[0_10px_32px_rgba(0,0,0,0.16)] border border-stone-200/90 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Thumbnail with Blue Bag Badge */}
                                <div className="relative w-[74px] h-[74px] rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-50">
                                    <BookCoverArtwork
                                        variant={
                                            activePreset === 'screenshot-2'
                                                ? 'spooky-girl-main'
                                                : urgencyHighlight.coverType
                                        }
                                    />
                                    {/* Blue corner circle with bag icon matching screenshot */}
                                    <div className="absolute -bottom-1 -left-1 w-7 h-7 rounded-tr-xl bg-[#1e3a8a] text-white flex items-center justify-center shadow">
                                        <Handbag className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="text-[12.5px] font-bold text-[#222222] leading-snug">
                                        Hurry! Shop this one while it lasts!
                                    </p>
                                    <p className="text-[11.5px] font-bold text-[#a61a2e] mt-0.5">
                                        {activePreset === 'screenshot-1'
                                            ? '23 sold in the past 24 hours'
                                            : '4 sold in the past 24 hours'}
                                    </p>
                                    <button
                                        onClick={() => router.push('/checkout')}
                                        className="mt-2 w-full py-1.5 px-3 rounded-full bg-[#222222] hover:bg-stone-800 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                        <span>Proceed to checkout</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Close X button */}
                                <button
                                    onClick={() => setShowFloatingUrgency(false)}
                                    aria-label="Dismiss notification"
                                    className="absolute top-2.5 right-2.5 p-1 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Row 2: Mobile Categories + Search Bar (< md) */}
                    <div className="md:hidden pb-3 flex items-center gap-2 relative">
                        <button
                            onClick={() => setShowCategoriesMenu((prev) => !prev)}
                            className="flex items-center gap-1.5 px-3 h-[42px] rounded-full border border-stone-300 text-xs font-semibold text-[#222222] hover:bg-stone-100 transition-colors shrink-0"
                        >
                            <Menu className="w-4 h-4 stroke-[2.2]" />
                            <span>Categories</span>
                        </button>

                        {showCategoriesMenu && (
                            <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50">
                                <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                                    Bookstore Departments
                                </div>
                                {[
                                    'All Books & Editions',
                                    'Collector Sprayed-Edge Hardcovers',
                                    'Instant Kindle & Printable Coloring Books',
                                    'Botanical & Pressed Flower Journals',
                                    'Cozy Mystery & Autumn BookTok',
                                    'Handmade Bookmarks & Ex-Libris Seals'
                                ].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedBookDept(cat.split(' ')[0]);
                                            setShowCategoriesMenu(false);
                                            triggerToast(`Browsing category: ${cat}`);
                                        }}
                                        className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-100 flex items-center justify-between"
                                    >
                                        <span>{cat}</span>
                                        <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex-1 flex items-center h-[42px] rounded-full border-[1.5px] border-[#222222] bg-white overflow-hidden">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search books, authors..."
                                className="w-full h-full px-3.5 text-xs text-[#222222] placeholder-stone-500 bg-transparent focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 text-stone-400 hover:text-stone-700"
                                    title="Clear search"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <button
                                onClick={() =>
                                    triggerToast(
                                        searchQuery
                                            ? `Searching bookstore for "${searchQuery}"`
                                            : 'Showing all curated books'
                                    )
                                }
                                aria-label="Search"
                                className="mr-1 w-[32px] h-[32px] rounded-full bg-[#f1641e] hover:bg-[#d95616] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                            >
                                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ------------------------------------------------------------------- */}
            {/* MAIN BODY CONTAINER */}
            {/* ------------------------------------------------------------------- */}
            <main className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-6 pb-16">
                {/* Page Heading ("Your bag" replacing "Your cart") */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#222222] tracking-tight">
                            Your bag
                        </h1>
                        <span className="text-xs text-stone-500 font-medium">
                            ({financials.totalCount} {financials.totalCount === 1 ? 'book' : 'books'} curated)
                        </span>
                    </div>

                    {!showFloatingUrgency && (
                        <button
                            onClick={() => setShowFloatingUrgency(true)}
                            className="text-xs text-stone-500 hover:text-[#222222] underline cursor-pointer"
                        >
                            Show live demand alert
                        </button>
                    )}
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* TWO-COLUMN BAG LAYOUT (Left: Bag Items, Right: Order Summary)     */}
                {/* ----------------------------------------------------------------- */}
                {bagItems.length === 0 ? (
                    <div className="bg-[#faf8f5] border border-stone-200 rounded-2xl p-10 text-center my-4">
                        <ShoppingBag className="w-10 h-10 mx-auto text-stone-400 mb-3" />
                        <h2 className="text-lg font-semibold text-stone-800">Your book bag is currently empty</h2>
                        <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
                            Explore our Pinterest-curated indie books, botanical collector hardcovers, and cozy printable coloring editions below.
                        </p>
                        <div className="mt-4 flex justify-center gap-3">
                            <button
                                onClick={() => handleSwitchPreset('screenshot-1')}
                                className="px-4 py-2 rounded-full bg-[#222222] text-white text-xs font-semibold hover:bg-stone-800"
                            >
                                Restore 2-Book Bag (Screenshot 1)
                            </button>
                            <button
                                onClick={() => handleSwitchPreset('screenshot-2')}
                                className="px-4 py-2 rounded-full border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50"
                            >
                                Restore 1-Book Bag (Screenshot 2)
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                        {/* LEFT COLUMN: Bag Item Cards (8 Cols on lg) */}
                        <div className="lg:col-span-8 flex flex-col gap-5">
                            {bagItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl border border-stone-200/95 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden transition-shadow hover:shadow-md"
                                >
                                    {/* Card Inner Padding */}
                                    <div className="p-4 sm:p-5">
                                        {/* Shop Header Row */}
                                        <div className="flex items-center justify-between mb-3.5">
                                            <div className="flex items-center gap-2">
                                                {/* Shop Avatar */}
                                                <div
                                                    style={{ backgroundColor: item.shopAvatarBg }}
                                                    className="w-7 h-7 rounded-md flex items-center justify-center border border-black/10 text-xs font-bold shrink-0"
                                                >
                                                    {item.shopAvatarIcon === 'cute-ghost' ? '👻' : '📖'}
                                                </div>
                                                <span className="text-[13.5px] font-semibold text-[#222222] hover:underline cursor-pointer">
                                                    {item.shopName}
                                                </span>
                                                <div className="flex items-center gap-1 text-[12.5px] text-stone-600 ml-0.5">
                                                    <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                                                    <span className="font-semibold text-[#222222]">{item.shopRating}</span>
                                                    <span className="text-stone-500">({item.shopReviews})</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    triggerToast(`Bookshop options for ${item.shopName} • Verified Indie Publisher`)
                                                }
                                                className="p-1.5 rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                                                aria-label="More options"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Main Item Content Row */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Left: Square Book Thumbnail (with Pinterest Save & Amazon Look Inside) */}
                                            <div className="relative w-full sm:w-[144px] h-[144px] rounded-lg overflow-hidden border border-stone-200/80 shrink-0 group">
                                                <BookCoverArtwork variant={item.coverType} />

                                                {/* Pinterest-style top-right Pin button on hover */}
                                                <button
                                                    onClick={() => togglePinBook(item.id, item.title)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 px-2 py-1 rounded-full bg-[#e60023] text-white text-[10px] font-bold shadow flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Bookmark className="w-2.5 h-2.5 fill-current" /> Pin
                                                </button>

                                                {/* Amazon-style "Look Inside" bottom overlay button */}
                                                <button
                                                    onClick={() =>
                                                        setPreviewBook({
                                                            title: item.title,
                                                            author: item.author,
                                                            format: item.bookFormat,
                                                            price: item.price,
                                                            coverVariant: item.coverType
                                                        })
                                                    }
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1.5 inset-x-1.5 py-1 rounded bg-black/75 text-white text-[10px] font-medium flex items-center justify-center gap-1 cursor-pointer"
                                                >
                                                    <Eye className="w-3 h-3" /> Look Inside
                                                </button>
                                            </div>

                                            {/* Center: Book Details, Pills, Urgency, and Actions */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h2
                                                            onClick={() =>
                                                                setPreviewBook({
                                                                    title: item.title,
                                                                    author: item.author,
                                                                    format: item.bookFormat,
                                                                    price: item.price,
                                                                    coverVariant: item.coverType
                                                                })
                                                            }
                                                            className="text-[13.5px] font-normal text-[#222222] hover:underline cursor-pointer line-clamp-1 leading-snug"
                                                        >
                                                            {item.title}
                                                        </h2>

                                                        {/* Amazon-style subtle book author & format line */}
                                                        <p className="text-[11.5px] text-stone-500 mt-0.5">
                                                            by <span className="text-stone-700 font-medium">{item.author}</span> •{' '}
                                                            <span className="text-[#007185] font-medium">{item.bookFormat}</span>
                                                        </p>

                                                        {item.note && (
                                                            <p className="text-[12px] text-stone-600 mt-1">
                                                                Note: Check{' '}
                                                                <button
                                                                    onClick={() =>
                                                                        setPreviewBook({
                                                                            title: item.title,
                                                                            author: item.author,
                                                                            format: item.bookFormat,
                                                                            price: item.price,
                                                                            coverVariant: item.coverType
                                                                        })
                                                                    }
                                                                    className="underline hover:text-stone-900"
                                                                >
                                                                    item details
                                                                </button>{' '}
                                                                for disclaimers.
                                                            </p>
                                                        )}

                                                        {/* Gray Pill Badges (Exact match to screenshots) */}
                                                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                                            {item.pills.map((pill, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eaeaea] text-[#222222] text-[11px] font-semibold"
                                                                >
                                                                    {pill.icon === 'download' && (
                                                                        <CloudDownload className="w-3 h-3 text-stone-700" />
                                                                    )}
                                                                    {pill.label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Right: Price Column */}
                                                    <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0.5 mt-1 sm:mt-0">
                                                        {item.discountPercent && (
                                                            <span className="inline-block px-2 py-0.5 rounded-full bg-[#a2e8b9] text-[#114624] text-[11px] font-bold">
                                                                {item.discountPercent}% off
                                                            </span>
                                                        )}
                                                        <span
                                                            className={`text-[16px] font-bold leading-tight ${item.discountPercent ? 'text-[#0f743b]' : 'text-[#222222]'
                                                                }`}
                                                        >
                                                            USD {(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                        {item.originalPrice && (
                                                            <span className="text-[12px] text-stone-500 line-through">
                                                                USD {(item.originalPrice * item.quantity).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Urgency Text (Green "Sale ends November 3" or Red "In 85 bags, 4 bought in the past 24 hours") */}
                                                {item.saleEndsText && (
                                                    <p className="text-[12.5px] font-medium text-[#0f743b] mt-3">
                                                        {item.saleEndsText}
                                                    </p>
                                                )}
                                                {item.urgencyRedText && (
                                                    <p className="text-[12.5px] font-medium text-[#a61a2e] mt-3.5">
                                                        {item.urgencyRedText}
                                                    </p>
                                                )}

                                                {/* Interactive Bottom Action Row */}
                                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                                    {!item.isDigital && (
                                                        <div className="relative inline-flex items-center">
                                                            <select
                                                                aria-label="Select quantity"
                                                                value={item.quantity}
                                                                onChange={(e) =>
                                                                    handleUpdateQuantity(item.id, Number(e.target.value))
                                                                }
                                                                className="appearance-none h-[36px] pl-3.5 pr-8 rounded-lg border border-stone-300 bg-white text-[13px] font-medium text-[#222222] hover:border-stone-500 focus:outline-none cursor-pointer"
                                                            >
                                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                    <option key={num} value={num}>
                                                                        {num}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="w-3.5 h-3.5 text-stone-600 absolute right-2.5 pointer-events-none" />
                                                        </div>
                                                    )}

                                                    {!item.isDigital && (
                                                        <button
                                                            onClick={() => setEditingItem(item)}
                                                            className="text-[12.5px] font-semibold text-[#222222] hover:bg-stone-100 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleSaveForLater(item.id)}
                                                        className="text-[12.5px] font-semibold text-[#222222] hover:bg-stone-100 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
                                                    >
                                                        Save for later
                                                    </button>

                                                    <button
                                                        onClick={() => handleRemoveFromBag(item.id)}
                                                        className="text-[12.5px] font-semibold text-[#222222] hover:bg-stone-100 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer Bar for Physical Book Shipping (Matches Screenshot 1) */}
                                    {!item.isDigital && (
                                        <div className="px-4 sm:px-5 py-3 border-t border-stone-200 bg-white flex items-center justify-between text-[12.5px] text-[#222222]">
                                            <div>
                                                <span className="font-bold">Shipping:</span>{' '}
                                                {item.shippingCost === 0 ? 'FREE' : `USD ${item.shippingCost.toFixed(2)}`}{' '}
                                                <span className="text-stone-600">({item.shippingEta || 'Get it by Nov 7-14'})</span>
                                            </div>
                                            <span className="text-[11px] text-stone-500 hidden sm:inline">
                                                Amazon-grade protective book box included
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Saved For Later Section (if user clicks "Save for later") */}
                            {savedForLater.length > 0 && (
                                <div className="bg-[#faf8f5] rounded-xl border border-stone-200 p-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                                        Saved for later ({savedForLater.length})
                                    </h3>
                                    <div className="space-y-2.5">
                                        {savedForLater.map((saved) => (
                                            <div
                                                key={saved.id}
                                                className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-stone-200"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-10 h-10 rounded overflow-hidden shrink-0 border border-stone-200">
                                                        <BookCoverArtwork variant={saved.coverType} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-medium text-stone-800 truncate">
                                                            {saved.title}
                                                        </p>
                                                        <p className="text-[11px] text-stone-500">
                                                            USD {saved.price.toFixed(2)} • {saved.bookFormat}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleMoveToBag(saved)}
                                                    className="px-3 py-1 rounded-full border border-stone-800 text-xs font-semibold hover:bg-stone-900 hover:text-white transition-colors shrink-0"
                                                >
                                                    Move to bag
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Order Summary & Checkout Sidebar (4 Cols on lg) */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-xl p-1">
                                {/* Price Breakdown Rows */}
                                <div className="space-y-2.5 text-[13.5px] text-[#222222]">
                                    {financials.shopDiscount > 0 && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">Item(s) total</span>
                                                <span>USD {financials.rawItemsTotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">Shop discount</span>
                                                <span>-USD {financials.shopDiscount.toFixed(2)}</span>
                                            </div>
                                            <hr className="border-stone-200 my-2" />
                                        </>
                                    )}

                                    {financials.shopDiscount === 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">Item(s) total</span>
                                            <span>USD {financials.discountedSubtotal.toFixed(2)}</span>
                                        </div>
                                    )}

                                    {financials.shopDiscount > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-stone-700">Subtotal</span>
                                            <span>USD {financials.discountedSubtotal.toFixed(2)}</span>
                                        </div>
                                    )}

                                    {financials.shippingTotal > 0 && (
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-stone-700 block">Shipping</span>
                                                <span className="text-[11.5px] text-stone-500">
                                                    (To <span className="underline cursor-pointer">Sri Lanka</span>)
                                                </span>
                                            </div>
                                            <span>USD {financials.shippingTotal.toFixed(2)}</span>
                                        </div>
                                    )}

                                    {appliedCoupon && (
                                        <div className="flex items-center justify-between text-[#0f743b] font-medium">
                                            <span>Coupon ({appliedCoupon.code})</span>
                                            <span>-USD {appliedCoupon.discount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <hr className="border-stone-200 my-2.5" />

                                    <div className="flex items-center justify-between text-[15px] font-bold text-[#222222] pt-0.5">
                                        <span>
                                            Total ({financials.totalCount}{' '}
                                            {financials.totalCount === 1 ? 'item' : 'items'})
                                        </span>
                                        <span>USD {financials.grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Mark order as a gift checkbox */}
                                <div className="mt-4">
                                    <label className="flex items-center gap-2.5 text-[13px] text-[#222222] cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={isGiftOrder}
                                            onChange={(e) => setIsGiftOrder(e.target.checked)}
                                            className="w-4 h-4 rounded border-stone-400 text-[#222222] focus:ring-0 cursor-pointer"
                                        />
                                        <span>
                                            Mark order as a gift{' '}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    triggerToast(
                                                        'Gift orders hide prices on the book packing slip and include a custom bookplate note!'
                                                    )
                                                }
                                                className="underline font-medium hover:text-stone-600"
                                            >
                                                Learn more
                                            </button>
                                        </span>
                                    </label>

                                    {isGiftOrder && (
                                        <textarea
                                            value={giftMessage}
                                            onChange={(e) => setGiftMessage(e.target.value)}
                                            placeholder="Add a literary dedication or ex-libris gift note..."
                                            rows={2}
                                            className="mt-2 w-full rounded-lg border border-stone-300 p-2 text-xs focus:outline-none focus:border-stone-600"
                                        />
                                    )}
                                </div>

                                {/* Primary Checkout Button */}
                                <button
                                    onClick={() => router.push('/checkout')}
                                    className="mt-4 w-full h-[46px] rounded-full bg-[#222222] hover:bg-stone-800 text-white text-[14.5px] font-semibold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to checkout</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                {/* Apple Pay & PayPal Side-by-Side Pill Buttons */}
                                <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                                    <button
                                        onClick={() => router.push('/checkout')}
                                        className="h-[42px] rounded-full border border-stone-400 hover:border-stone-800 bg-white flex items-center justify-center gap-1 text-[#222222] font-semibold text-[15px] transition-colors cursor-pointer"
                                    >
                                        <span className="text-[17px] leading-none"></span>
                                        <span>Pay</span>
                                    </button>

                                    <button
                                        onClick={() => router.push('/checkout')}
                                        className="h-[42px] rounded-full border border-stone-400 hover:border-stone-800 bg-white flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <span className="font-sans font-extrabold italic text-[15px] tracking-tight">
                                            <span className="text-[#003087]">Pay</span>
                                            <span className="text-[#0079C1]">Pal</span>
                                        </span>
                                    </button>
                                </div>

                                {/* Fine print disclosures */}
                                <p className="mt-3.5 text-[11px] text-stone-500 leading-relaxed">
                                    By checking out, you agree to our{' '}
                                    <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#2563eb] underline">
                                        Terms
                                    </a>{' '}
                                    and{' '}
                                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#2563eb] underline">
                                        Privacy Policy
                                    </a>
                                    . Booksy may send you curated reading communications; you may unsubscribe at any time. Additional duties and fees{' '}
                                    <a href="#duties" onClick={(e) => e.preventDefault()} className="text-[#2563eb] underline">
                                        may apply
                                    </a>
                                    .
                                </p>

                                {/* Secure options in checkout + Payment Badges */}
                                <div className="mt-4">
                                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#222222]">
                                        <Lock className="w-3.5 h-3.5 text-[#222222]" />
                                        <span>Secure options in checkout</span>
                                    </div>

                                    {/* Payment Icons Row */}
                                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                        <span className="px-2 py-0.5 rounded border border-stone-300 bg-white text-[10px] font-black text-[#1a1f71] tracking-tighter">
                                            VISA
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded border border-stone-300 bg-white flex items-center">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] -ml-1 inline-block opacity-90" />
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded border border-stone-300 bg-[#006fcf] text-white text-[9px] font-bold">
                                            AMEX
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded border border-stone-300 bg-white text-[#004c97] text-[9px] font-bold">
                                            Diners
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded border border-stone-300 bg-white text-[#003087] text-[9px] font-extrabold italic">
                                            PayPal
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded border border-stone-300 bg-white text-stone-900 text-[9.5px] font-semibold">
                                            Pay
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded border border-stone-300 bg-white text-stone-800 text-[9.5px] font-semibold">
                                            G Pay
                                        </span>
                                    </div>
                                </div>

                                {/* Apply coupon code button */}
                                <div className="mt-4">
                                    {!showCouponInput ? (
                                        <button
                                            onClick={() => setShowCouponInput(true)}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-stone-100 text-[12.5px] font-semibold text-[#222222] transition-colors cursor-pointer"
                                        >
                                            <Tag className="w-4 h-4 fill-[#0f743b] text-[#0f743b]" />
                                            <span>Apply coupon code</span>
                                        </button>
                                    ) : (
                                        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 mt-1">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Try BOOKBAG15"
                                                className="flex-1 h-9 px-3 rounded-full border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                                            />
                                            <button
                                                type="submit"
                                                className="h-9 px-4 rounded-full bg-[#222222] text-white text-xs font-semibold hover:bg-stone-800"
                                            >
                                                Apply
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowCouponInput(false)}
                                                className="p-1.5 text-stone-400 hover:text-stone-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* CLIMATE SOLUTIONS BANNER (Matches Leaf Icon Line in Screenshots)   */}
                {/* ----------------------------------------------------------------- */}
                <div className="mt-8 mb-9 flex items-center gap-2.5 text-[12.5px] text-[#222222]">
                    <Leaf className="w-4 h-4 fill-[#222222] text-[#222222] shrink-0" />
                    <p>
                        Booksy invests in climate solutions like electric book-delivery trucks and FSC-certified recycled paper carbon offsets for every delivery.{' '}
                        <a
                            href="#climate"
                            onClick={(e) => {
                                e.preventDefault();
                                triggerToast('100% carbon-neutral book shipping & tree-planting program verified.');
                            }}
                            className="underline font-medium hover:text-stone-600"
                        >
                            See how
                        </a>
                    </p>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* RELATED ITEMS YOU MAY LIKE (5x2 Grid with "+ Add to bag")          */}
                {/* ----------------------------------------------------------------- */}
                <section aria-labelledby="related-heading">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-baseline gap-2">
                            <h2
                                id="related-heading"
                                className="text-[16.5px] font-semibold text-[#222222]"
                            >
                                Related items you may like
                            </h2>
                            <span className="inline-flex items-center gap-1 text-[11.5px] text-stone-500">
                                Including ads <Info className="w-3 h-3 inline" />
                            </span>
                        </div>

                        {/* Aesthetic Pinterest / Collection Filter Pills */}
                        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar max-w-full pb-1">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 mr-1 shrink-0" />
                            <button
                                onClick={() => setRelatedTab('screenshot-1')}
                                className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${relatedTab === 'screenshot-1'
                                    ? 'bg-[#222222] text-white'
                                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                    }`}
                            >
                                Botanical Pocket Books (Screenshot 1)
                            </button>
                            <button
                                onClick={() => setRelatedTab('screenshot-2')}
                                className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${relatedTab === 'screenshot-2'
                                    ? 'bg-[#222222] text-white'
                                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                    }`}
                            >
                                Spooky Cozy Coloring Books (Screenshot 2)
                            </button>
                            <button
                                onClick={() => setRelatedTab('all')}
                                className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${relatedTab === 'all'
                                    ? 'bg-[#222222] text-white'
                                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                    }`}
                            >
                                All 20 Books
                            </button>
                        </div>
                    </div>

                    {/* 5-Column Responsive Grid matching Screenshot 1 & 2 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-7">
                        {visibleRelatedBooks.map((book) => {
                            const isPinned = pinnedBookIds.includes(book.id);
                            return (
                                <div
                                    key={book.id}
                                    className="group flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Square Rounded Cover Image with Pinterest Pin & Amazon Format Pill */}
                                        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-stone-200/80 bg-stone-100 mb-2 shadow-2xs group-hover:shadow-md transition-all">
                                            <BookCoverArtwork variant={book.coverVariant} />

                                            {/* Top-Left Pinterest Board Tag on Hover */}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9.5px] font-medium backdrop-blur-xs">
                                                📌 {book.pinterestBoard}
                                            </span>

                                            {/* Top-Right Save/Pin Button */}
                                            <button
                                                onClick={() => togglePinBook(book.id, book.title)}
                                                aria-label="Pin to reading board"
                                                className={`
                          w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer
                          absolute top-2 right-2
                          ${isPinned
                                                        ? 'bg-[#e60023] text-white opacity-100'
                                                        : 'bg-white/90 text-stone-800 opacity-0 group-hover:opacity-100 hover:bg-white'
                                                    }
                        `}
                                            >
                                                <Heart className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                                            </button>

                                            {/* Bottom-Right Amazon Book Format Pill */}
                                            <button
                                                onClick={() =>
                                                    setPreviewBook({
                                                        title: book.title,
                                                        author: book.author,
                                                        format: book.bookFormat,
                                                        price: book.price,
                                                        coverVariant: book.coverVariant
                                                    })
                                                }
                                                className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-white/90 text-stone-800 text-[9.5px] font-semibold shadow-2xs hover:bg-white cursor-pointer"
                                            >
                                                {book.bookFormat}
                                            </button>
                                        </div>

                                        {/* Title (1 line truncated like screenshots) */}
                                        <h3
                                            onClick={() =>
                                                setPreviewBook({
                                                    title: book.title,
                                                    author: book.author,
                                                    format: book.bookFormat,
                                                    price: book.price,
                                                    coverVariant: book.coverVariant
                                                })
                                            }
                                            className="text-[12.5px] font-normal text-[#222222] truncate hover:underline cursor-pointer"
                                            title={book.title}
                                        >
                                            {book.title}
                                        </h3>

                                        {/* Seller / Star Seller Subline */}
                                        <div className="flex items-center gap-1 text-[11.5px] text-stone-500 mt-0.5 truncate">
                                            {book.isStarSeller && (
                                                <span
                                                    className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#6529b2] text-white text-[8px] shrink-0"
                                                    title="Star Bookshop Seller"
                                                >
                                                    ★
                                                </span>
                                            )}
                                            <span className="truncate">{book.shopName}</span>
                                        </div>

                                        {/* Price & Discount Block */}
                                        <div className="mt-1">
                                            <div
                                                className={`text-[13.5px] font-bold leading-tight ${book.discountPercent ? 'text-[#0f743b]' : 'text-[#222222]'
                                                    }`}
                                            >
                                                USD {book.price.toFixed(2)}
                                            </div>

                                            {book.originalPrice && book.discountPercent && (
                                                <div className="text-[11px] text-stone-500 mt-0.5">
                                                    <span className="line-through">
                                                        USD {book.originalPrice.toFixed(2)}
                                                    </span>{' '}
                                                    <span>({book.discountPercent}% off)</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Free shipping green pill OR Digital Download line */}
                                        {book.freeShipping && (
                                            <div className="mt-1">
                                                <span className="inline-block px-1.5 py-0.5 rounded bg-[#a2e8b9] text-[#114624] text-[10px] font-bold">
                                                    FREE shipping
                                                </span>
                                            </div>
                                        )}

                                        {book.isDigitalDownload && (
                                            <div className="flex items-center gap-1 text-[11px] text-stone-600 mt-1">
                                                <CloudDownload className="w-3 h-3 text-[#2563eb]" />
                                                <span>Digital Download</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* "+ Add to bag" Pill Button (Replaced "+ Add to cart") */}
                                    <div className="mt-2.5">
                                        <button
                                            onClick={() => handleAddRelatedToBag(book)}
                                            className="inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full border border-stone-400 hover:border-stone-900 hover:bg-stone-50 text-[12px] font-semibold text-[#222222] transition-all cursor-pointer"
                                        >
                                            <span>+ Add to bag</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* ------------------------------------------------------------------- */}
            {/* FOOTER (Exact Clone of Bottom Region, Links & Merchant Legal Text)  */}
            {/* ------------------------------------------------------------------- */}
            <footer className="border-t border-stone-200 bg-white text-[#222222] mt-8">
                <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]">
                    {/* Left: Location Selector */}
                    <button
                        onClick={() =>
                            triggerToast('Region set to Sri Lanka • Currency: USD ($) • Ships Worldwide')
                        }
                        className="flex items-center gap-2 font-semibold text-[#222222] hover:bg-stone-100 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                        <Globe className="w-4 h-4" />
                        <span>Sri Lanka</span>
                    </button>

                    {/* Right: Copyright & Policy Links */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-stone-600">
                        <span>© 2026 Booksy, Inc.</span>
                        <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
                            Terms of Use
                        </a>
                        <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
                            Privacy
                        </a>
                        <a href="#ads" onClick={(e) => e.preventDefault()} className="hover:underline">
                            Interest-based ads
                        </a>
                        <a href="#shops" onClick={(e) => e.preventDefault()} className="hover:underline">
                            Local Bookshops
                        </a>
                        <a href="#regions" onClick={(e) => e.preventDefault()} className="hover:underline">
                            Regions
                        </a>
                        <a href="#help" onClick={(e) => e.preventDefault()} className="hover:underline">
                            Help Center
                        </a>
                    </div>
                </div>

                {/* Bottom Merchant Legal Disclosure Block */}
                <div className="border-t border-stone-200/70 bg-[#faf9f7] py-6 px-4 text-center text-[11px] text-stone-500 space-y-2">
                    <p className="max-w-[960px] mx-auto">
                        Merchant is Booksy, Inc. (USA), Booksy Ireland UC (Ireland), Booksy UK Limited (United Kingdom), Booksy Canada Limited (Canada), or Booksy Australia Pty Limited (Australia) depending on the currency and location of the payment instrument issuance.
                    </p>
                    <p className="text-stone-500">
                        Booksy, Inc., USA 117 Adams Street Brooklyn, NY 11201 &nbsp;&nbsp;&nbsp;&nbsp; Booksy Ireland UC One Le Pole Square Ship Street Great Dublin 8
                    </p>
                </div>
            </footer>

            {/* ------------------------------------------------------------------- */}
            {/* MODAL 1: EDIT EDITION / CUSTOMIZATION MODAL (For Physical Book)     */}
            {/* ------------------------------------------------------------------- */}
            {editingItem && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                            <h3 className="text-base font-bold text-[#222222]">
                                Edit Book Edition & Personalization
                            </h3>
                            <button
                                onClick={() => setEditingItem(null)}
                                className="p-1 rounded-full hover:bg-stone-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="py-4 space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-stone-700 mb-1.5">
                                    Select Cloth Hardcover Color:
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {['White Linen', 'Chestnut Brown', 'Blush Pink', 'Midnight Black', 'Sage Grey', 'Mist Blue', 'Honey Yellow'].map(
                                        (col) => (
                                            <button
                                                key={col}
                                                type="button"
                                                onClick={() =>
                                                    setEditingItem({ ...editingItem, selectedEdition: col })
                                                }
                                                className={`px-2 py-1.5 rounded-lg border text-[11px] font-medium ${editingItem.selectedEdition === col
                                                    ? 'border-[#222222] bg-[#222222] text-white'
                                                    : 'border-stone-300 hover:border-stone-500'
                                                    }`}
                                            >
                                                {col}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-stone-700 mb-1">
                                    Amazon Book Format & Packaging:
                                </label>
                                <select
                                    value={editingItem.customOption}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, customOption: e.target.value })
                                    }
                                    className="w-full h-9 px-3 rounded-lg border border-stone-300 text-xs"
                                >
                                    <option value="Yes + Gift book bag">
                                        Yes + Velvet Book Bag & Botanical Bookmark
                                    </option>
                                    <option value="Hardcover + Sprayed Edges">
                                        Collector Hardcover + Gold Stenciled Edges
                                    </option>
                                    <option value="Standard Linen Edition">
                                        Standard Linen Hardcover Only
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                            <button
                                onClick={() => setEditingItem(null)}
                                className="px-4 py-2 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setBagItems((prev) =>
                                        prev.map((it) =>
                                            it.id === editingItem.id
                                                ? {
                                                    ...it,
                                                    selectedEdition: editingItem.selectedEdition,
                                                    customOption: editingItem.customOption,
                                                    pills: [
                                                        {
                                                            label: `Custom flowers and names: ${editingItem.customOption}`
                                                        },
                                                        {
                                                            label: `Select color: ${editingItem.selectedEdition}`
                                                        }
                                                    ]
                                                }
                                                : it
                                        )
                                    );
                                    setEditingItem(null);
                                    triggerToast('Updated book edition preferences in your bag');
                                }}
                                className="px-5 py-2 rounded-full bg-[#222222] text-white text-xs font-semibold hover:bg-stone-800"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* MODAL 2: AMAZON "LOOK INSIDE" & PINTEREST PIN PREVIEW               */}
            {/* ------------------------------------------------------------------- */}
            {previewBook && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#f1641e]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                                    Amazon Look Inside • Book Preview
                                </span>
                            </div>
                            <button
                                onClick={() => setPreviewBook(null)}
                                className="p-1 rounded-full hover:bg-stone-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                            <div className="aspect-square rounded-xl overflow-hidden border border-stone-200">
                                <BookCoverArtwork variant={previewBook.coverVariant} />
                            </div>
                            <div className="sm:col-span-2 flex flex-col justify-between">
                                <div>
                                    <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold mb-1">
                                        {previewBook.format}
                                    </span>
                                    <h4 className="text-sm font-bold text-[#222222] leading-snug">
                                        {previewBook.title}
                                    </h4>
                                    <p className="text-xs text-stone-500 mt-0.5">by {previewBook.author}</p>
                                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                                        Includes high-resolution printable book plates, collector binding specs, and instant Kindle / tablet compatibility. Curated from our top-pinned cozy reading boards.
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                                    <span className="text-base font-bold text-[#0f743b]">
                                        USD {previewBook.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => setPreviewBook(null)}
                                        className="px-4 py-1.5 rounded-full bg-[#222222] text-white text-xs font-semibold"
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* MODAL 3: CHECKOUT SUMMARY MODAL                                     */}
            {/* ------------------------------------------------------------------- */}
            {checkoutSuccessModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-[#a2e8b9] text-[#114624] flex items-center justify-center mx-auto mb-3">
                            <Check className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#222222]">
                            Ready to Complete Your Book Bag Order
                        </h3>
                        <p className="text-xs text-stone-600 mt-1">
                            You have <span className="font-semibold">{financials.totalCount} item(s)</span> totaling{' '}
                            <span className="font-bold text-[#222222]">
                                USD {financials.grandTotal.toFixed(2)}
                            </span>{' '}
                            (shipping to Sri Lanka + instant digital downloads).
                        </p>
                        <div className="mt-5 flex justify-center gap-2.5">
                            <button
                                onClick={() => setCheckoutSuccessModal(false)}
                                className="px-5 py-2 rounded-full bg-[#222222] text-white text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                            >
                                Continue Browsing Bag
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* FLOATING TOAST FEEDBACK                                             */}
            {/* ------------------------------------------------------------------- */}
            {toastMessage && (
                <div className="fixed bottom-5 right-5 z-50 bg-[#222222] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#f1641e]" />
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
}