'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Book, BOOKS } from '../data/books';

export interface BagItem {
  book: Book;
  quantity: number;
  binding: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  bookIds: string[];
  isDefault?: boolean;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  notes?: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string; // e.g. "LK-847291"
  createdAt: string;
  items: BagItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'confirmed' | 'bound' | 'dispatched' | 'delivered';
  customer: OrderCustomer;
  paymentMethod: 'cod' | 'card' | 'bank';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

export interface ThemeOption {
  id: string;
  label: string;
  isDark?: boolean;
}

export const AVAILABLE_THEMES: ThemeOption[] = [
  { id: 'light', label: 'Classical Light', isDark: false },
  { id: 'dark', label: 'Sacred Dark', isDark: true },
  { id: 'sepia', label: 'Palm Leaf Sepia', isDark: false },
  { id: 'emerald', label: 'Royal Temple Emerald', isDark: false },
];

interface AppContextType {
  // Theme Management
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: ThemeOption[];
  isDark: boolean;
  toggleTheme: () => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Active Pin / Modal
  selectedBook: Book | null;
  openBookModal: (book: Book) => void;
  closeBookModal: () => void;

  // Shopping Bag
  bag: BagItem[];
  addToBag: (book: Book, binding?: string, quantity?: number) => void;
  removeFromBag: (bookId: string) => void;
  updateBagQuantity: (bookId: string, delta: number) => void;
  clearBag: () => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  bagCount: number;
  bagTotal: number;
  usdBagTotal: number;
  showMiniBagRail: boolean;
  setShowMiniBagRail: (show: boolean) => void;
  triggerNavigation: () => void;

  // Compatibility Cart Aliases
  cart: BagItem[];
  addToCart: (book: Book, binding?: string, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;

  // Saved Collection Boards
  boards: Board[];
  saveToBoard: (bookId: string, boardId?: string) => void;
  isBookSaved: (bookId: string) => boolean;
  createBoard: (name: string, description?: string) => void;
  isBoardsModalOpen: boolean;
  setIsBoardsModalOpen: (open: boolean) => void;
  activeBoardFilter: string | null;
  setActiveBoardFilter: (boardId: string | null) => void;

  // Likes & Favorites
  likedBookIds: string[];
  toggleLikeBook: (bookId: string) => void;
  isBookLiked: (bookId: string) => boolean;

  // Orders & Checkout
  orders: Order[];
  placeOrder: (data: {
    customer: OrderCustomer;
    paymentMethod: 'cod' | 'card' | 'bank';
    discount?: number;
    shippingFee?: number;
    shippingDistrict?: string;
  }) => Order;
  getOrder: (id: string) => Order | undefined;

  // Book Reviews
  bookReviews: Record<string, Review[]>;
  addBookReview: (bookId: string, review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsForBook: (bookId: string) => Review[];

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_BOARDS: Board[] = [
  {
    id: 'sacred-chronicles',
    name: 'Historical Chronicles',
    description: 'Ancient chronicles of Sri Lanka and royal genealogies',
    bookIds: ['mahawamsa-great-chronicle', 'chulavamsa-chronicle'],
    isDefault: true,
  },
  {
    id: 'buddhist-philosophy',
    name: 'Buddhist Philosophy',
    description: 'Theravada treatises, Abhidhamma, and sacred verses',
    bookIds: ['visuddhimagga-path-of-purification', 'dhammapada-verses-wisdom'],
    isDefault: true,
  },
  {
    id: 'ayurveda-heritage',
    name: 'Ayurveda & Healing',
    description: 'Indigenous Sri Lankan traditional medicine and botanical treatises',
    bookIds: ['deshiya-cikitsa-samgrahaya', 'sarartha-samgrahaya'],
    isDefault: true,
  },
  {
    id: 'sinhala-poetry',
    name: 'Classical Poetry (Kavya)',
    description: 'Ancient Sandesha poems and lyrical Sinhala literature',
    bookIds: ['selalihini-sandeshaya', 'guttila-kavyaya'],
    isDefault: true,
  },
];

const INITIAL_REVIEWS: Record<string, Review[]> = {
  'mahawamsa-great-chronicle': [
    {
      id: 'rev-1',
      user: 'Ven. Medhananda Thero',
      date: '2 days ago',
      rating: 5,
      comment: 'The preservation of original Pali gathas alongside precise Sinhala etymological notes makes this edition an indispensable national treasure.',
    },
    {
      id: 'rev-2',
      user: 'Dr. S. Jayawardena (Peradeniya)',
      date: '5 days ago',
      rating: 5,
      comment: 'Breathtaking binding quality. The archival paper and gold foil embossing resemble ancient Royal Court manuscripts.',
    },
    {
      id: 'rev-3',
      user: 'Kasun Perera (Colombo)',
      date: '1 week ago',
      rating: 5,
      comment: 'Arrived via courier within 2 days in Colombo. Packaging was pristine with archival protective seals.',
    },
  ],
  'visuddhimagga-path-of-purification': [
    {
      id: 'rev-v1',
      user: 'Prof. Ananda Guruge',
      date: '3 days ago',
      rating: 5,
      comment: 'Essential masterwork of Theravada meditation methodology. Beautifully indexed and bound.',
    },
  ],
};

const DEFAULT_SAMPLE_ORDER: Order = {
  id: 'LK-789412',
  createdAt: '2026-10-24T14:30:00.000Z',
  items: [
    {
      book: BOOKS[0], // Mahavamsa
      quantity: 1,
      binding: 'Deluxe Gold Embossed',
    },
  ],
  subtotal: 3850,
  discount: 770,
  shipping: 350,
  total: 3430,
  status: 'dispatched',
  customer: {
    fullName: 'Dr. Senaka Bandara',
    email: 'senaka.b@heritage.lk',
    phone: '+94 77 123 4567',
    address: 'No. 45, Dharmapala Mawatha',
    city: 'Colombo 07',
    district: 'Colombo',
    postalCode: '00700',
    notes: 'Please hand over to library reception',
  },
  paymentMethod: 'cod',
  trackingNumber: 'DOM-COL-994821',
  estimatedDelivery: 'Oct 28, 2026',
};

export const INITIAL_SAMPLE_BAG: BagItem[] = [
  {
    book: {
      id: 'custom-beaded-keychain',
      title: 'Custom Beaded Keychain, Pastel Flower Wristlet, Cute Gift',
      sinhalaTitle: 'Handcrafted Keychain',
      author: 'AirilGiftsShop',
      category: 'Gifts & Accessories',
      price: 1250,
      originalPrice: 1950,
      usdPrice: 4.15,
      originalUsdPrice: 6.39,
      urgencyText: 'In 835 bags, 37 bought in the past 24 hours',
      sellerName: 'AirilGiftsShop',
      sellerAvatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=120&q=80',
      sellerRating: 4.9,
      sellerReviews: '6.4k',
      rating: 4.9,
      reviewsCount: 6400,
      heightRatio: 1.2,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      themeColor: '#d4af37',
      accentColor: '#F1641E',
      bgGradient: 'linear-gradient(145deg, #fdfbf7 0%, #f7f1e5 100%)',
      embossPattern: 'flower',
      symbol: 'K',
      description: 'Handmade customized beaded flower keychain and phone wristlet strap.',
      versesSnippet: {
        original: 'Mal mālāvak men sundarayi',
        transliteration: 'mal mālāvak men sundarayi',
        english: 'As delicate and vibrant as a hand-strung garland of jasmine flowers.',
      },
      pages: 1,
      language: 'English',
      binding: 'Deluxe Gold Embossed',
      tags: ['Keychain', 'Gifts', 'Handmade'],
      isDigital: false,
    },
    quantity: 1,
    binding: 'Custom Pastel Flower Wristlet',
  },
  {
    book: {
      id: 'slim-leather-wallet',
      title: 'Minimalist Slim Cardholder & Travel Wallet',
      sinhalaTitle: 'Slim Cardholder',
      author: 'LeatherCraftLK',
      category: 'Leather Crafts',
      price: 1350,
      originalPrice: 2550,
      usdPrice: 4.42,
      originalUsdPrice: 8.50,
      urgencyText: 'In 267 bags, 23 bought in the past 24 hours',
      sellerName: 'LeatherCraftLK',
      sellerAvatar: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=120&q=80',
      sellerRating: 4.8,
      sellerReviews: '1.2k',
      rating: 4.8,
      reviewsCount: 1200,
      heightRatio: 1.2,
      coverImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80',
      themeColor: '#8B5A2B',
      accentColor: '#D2691E',
      bgGradient: 'linear-gradient(145deg, #f8f6f0 0%, #ece5d8 100%)',
      embossPattern: 'leather-grain',
      symbol: 'W',
      description: 'Hand-stitched full-grain leather pocket wallet and RFID-blocking cardholder.',
      versesSnippet: {
        original: 'Dhanaya ārakṣā karana nirmāṇaya',
        transliteration: 'dhanaya ārakṣā karana suviśēṣī nirmāṇaya',
        english: 'Crafted with timeless precision to carry your treasured daily essentials.',
      },
      pages: 1,
      language: 'English',
      binding: 'Clothbound Hardcover',
      tags: ['Wallet', 'Leather', 'Cardholder'],
      isDigital: false,
    },
    quantity: 1,
    binding: 'Multicolor Cardholder',
  },
  {
    book: {
      id: 'spooky-flora-coloring',
      title: 'Cozy Flora & Spooky Moments: 6 Coloring Pages PDF',
      sinhalaTitle: 'Cozy Flora Folios',
      author: 'CocoWyo Archive',
      category: 'Coloring Folios',
      price: 450,
      originalPrice: 1200,
      usdPrice: 1.49,
      originalUsdPrice: 3.99,
      urgencyText: 'In 85 bags, 4 bought in the past 24 hours',
      sellerName: 'CocoWyoColoring',
      sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      sellerRating: 4.8,
      sellerReviews: '5.1k',
      rating: 4.9,
      reviewsCount: 5100,
      heightRatio: 1.2,
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
      themeColor: '#4A5568',
      accentColor: '#E2E8F0',
      bgGradient: 'linear-gradient(145deg, #f7fafc 0%, #edf2f7 100%)',
      embossPattern: 'botanical',
      symbol: 'F',
      description: 'Therapeutic and soothing printable line-art coloring folios featuring cozy flora.',
      versesSnippet: {
        original: 'Sita nivana varṇa raṭā',
        transliteration: 'sita nivana nirmāṇaśīlī varṇa raṭā',
        english: 'Mindful coloring pages designed for serene creative meditation and relaxation.',
      },
      pages: 6,
      language: 'English & Sinhala',
      binding: 'Royal Silkbound Edition',
      tags: ['Coloring', 'Digital', 'Flora'],
      isDigital: true,
    },
    quantity: 1,
    binding: 'Instant PDF Download',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string>('emerald');
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Treatises');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Bag
  const [bag, setBag] = useState<BagItem[]>(INITIAL_SAMPLE_BAG);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Boards
  const [boards, setBoards] = useState<Board[]>(DEFAULT_BOARDS);
  const [isBoardsModalOpen, setIsBoardsModalOpen] = useState(false);
  const [activeBoardFilter, setActiveBoardFilter] = useState<string | null>(null);

  // Likes
  const [likedBookIds, setLikedBookIds] = useState<string[]>(['mahawamsa-great-chronicle', 'selalihini-sandeshaya']);

  // Orders
  const [orders, setOrders] = useState<Order[]>([DEFAULT_SAMPLE_ORDER]);

  // Reviews
  const [bookReviews, setBookReviews] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mini Bag Rail
  const [showMiniBagRail, setShowMiniBagRail] = useState(false);

  const applyTheme = useCallback((targetTheme: string) => {
    setThemeState(targetTheme);
    const darkActive = targetTheme === 'dark';
    setIsDark(darkActive);

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', targetTheme);
      if (darkActive) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    try {
      localStorage.setItem('shastraloka-theme', targetTheme);
    } catch { }
  }, []);

  const setTheme = useCallback((targetTheme: string) => {
    applyTheme(targetTheme);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    applyTheme(isDark ? 'light' : 'dark');
  }, [isDark, applyTheme]);

  // Hydrate from LocalStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Theme
      try {
        const savedTheme = localStorage.getItem('shastraloka-theme');
        if (savedTheme) {
          applyTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          applyTheme('dark');
        } else {
          applyTheme('light');
        }
      } catch {
        applyTheme('light');
      }

      // Bag
      try {
        const savedBag = localStorage.getItem('shastraloka-bag') || localStorage.getItem('shastraloka-cart');
        if (savedBag) setBag(JSON.parse(savedBag));
      } catch { }

      // Boards
      try {
        const savedBoards = localStorage.getItem('shastraloka-boards');
        if (savedBoards) setBoards(JSON.parse(savedBoards));
      } catch { }

      // Likes
      try {
        const savedLikes = localStorage.getItem('shastraloka-likes');
        if (savedLikes) setLikedBookIds(JSON.parse(savedLikes));
      } catch { }

      // Orders
      try {
        const savedOrders = localStorage.getItem('shastraloka-orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      } catch { }

      // Reviews
      try {
        const savedReviews = localStorage.getItem('shastraloka-reviews');
        if (savedReviews) setBookReviews(JSON.parse(savedReviews));
      } catch { }
    }, 0);

    return () => clearTimeout(timer);
  }, [applyTheme]);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-bag', JSON.stringify(bag));
      localStorage.setItem('shastraloka-cart', JSON.stringify(bag));
    } catch { }
  }, [bag]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-boards', JSON.stringify(boards));
    } catch { }
  }, [boards]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-likes', JSON.stringify(likedBookIds));
    } catch { }
  }, [likedBookIds]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-orders', JSON.stringify(orders));
    } catch { }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-reviews', JSON.stringify(bookReviews));
    } catch { }
  }, [bookReviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const openBookModal = (book: Book) => setSelectedBook(book);
  const closeBookModal = () => setSelectedBook(null);

  // Bag Handlers
  const addToBag = (book: Book, binding?: string, quantity = 1) => {
    const selectedBinding = binding || book.binding;
    setBag((prev) => {
      const existing = prev.find((item) => item.book.id === book.id && item.binding === selectedBinding);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id && item.binding === selectedBinding
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity, binding: selectedBinding }];
    });
    setShowMiniBagRail(true); // Show rail when item is added
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${book.title}" to Bag`);
  };

  const removeFromBag = (bookId: string) => {
    setBag((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const updateBagQuantity = (bookId: string, delta: number) => {
    setBag((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  const clearBag = () => setBag([]);

  // Auto-hide rail when bag is empty and navigation happens
  // Auto-hide rail when bag is empty and navigation happens
  const triggerNavigation = useCallback(() => {
    if (bag.length === 0) {
      setShowMiniBagRail(false);
    }
  }, [bag.length]);

  const bagCount = bag.reduce((acc, item) => acc + item.quantity, 0);
  const bagTotal = bag.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const usdBagTotal = bag.reduce(
    (acc, item) =>
      acc +
      (item.book.usdPrice ?? Number((item.book.price / 300).toFixed(2))) *
      item.quantity,
    0
  );

  // Backward-compatible Cart Aliases
  const addToCart = addToBag;
  const removeFromCart = removeFromBag;
  const updateQuantity = updateBagQuantity;
  const clearCart = clearBag;
  const cart = bag;
  const cartCount = bagCount;
  const cartTotal = bagTotal;
  const isCartOpen = isBagOpen;
  const setIsCartOpen = setIsBagOpen;

  // Boards Handlers
  const saveToBoard = (bookId: string, targetBoardId?: string) => {
    const boardId = targetBoardId || boards[0].id;
    const targetBoard = boards.find((b) => b.id === boardId) || boards[0];

    const isAlreadySaved = targetBoard.bookIds.includes(bookId);

    setBoards((prev) =>
      prev.map((b) => {
        if (b.id === boardId) {
          if (isAlreadySaved) {
            return { ...b, bookIds: b.bookIds.filter((id) => id !== bookId) };
          } else {
            return { ...b, bookIds: [...b.bookIds, bookId] };
          }
        }
        return b;
      })
    );

    if (isAlreadySaved) {
      showToast(`Removed from "${targetBoard.name}"`);
    } else {
      showToast(`Saved to "${targetBoard.name}"`);
    }
  };

  const isBookSaved = (bookId: string) => {
    return boards.some((b) => b.bookIds.includes(bookId));
  };

  const createBoard = (name: string, description = '') => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name,
      description,
      bookIds: [],
    };
    setBoards((prev) => [...prev, newBoard]);
    showToast(`Created collection: "${name}"`);
  };

  // Likes
  const toggleLikeBook = (bookId: string) => {
    setLikedBookIds((prev) => {
      const isLiked = prev.includes(bookId);
      if (isLiked) {
        showToast('Removed from liked treatises');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast('Saved to your liked treatises');
        return [...prev, bookId];
      }
    });
  };

  const isBookLiked = (bookId: string) => likedBookIds.includes(bookId);

  // Orders
  const placeOrder = ({
    customer,
    paymentMethod,
    discount = 0,
    shippingFee = 350,
  }: {
    customer: OrderCustomer;
    paymentMethod: 'cod' | 'card' | 'bank';
    discount?: number;
    shippingFee?: number;
    shippingDistrict?: string;
  }): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LK-${randomNum}`;
    const subtotal = bagTotal;
    const finalTotal = subtotal - discount + shippingFee;

    const estimatedDays = customer.district.toLowerCase() === 'colombo' ? 2 : 3;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
    const dateFormatted = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...bag],
      subtotal,
      discount,
      shipping: shippingFee,
      total: finalTotal,
      status: 'confirmed',
      customer,
      paymentMethod,
      trackingNumber: `SLP-${customer.district.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: dateFormatted,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearBag();
    showToast(`Order #${orderId} confirmed successfully!`);
    return newOrder;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  // Reviews
  const addBookReview = (bookId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      user: reviewData.user || 'Reader',
      date: 'Just now',
      rating: reviewData.rating,
      comment: reviewData.comment,
    };

    setBookReviews((prev) => ({
      ...prev,
      [bookId]: [newRev, ...(prev[bookId] || [])],
    }));

    showToast('Your commentary has been published on this treatise!');
  };

  const getReviewsForBook = (bookId: string): Review[] => {
    return bookReviews[bookId] || INITIAL_REVIEWS[bookId] || [];
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes: AVAILABLE_THEMES,
        isDark,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBook,
        openBookModal,
        closeBookModal,
        bag,
        addToBag,
        removeFromBag,
        updateBagQuantity,
        clearBag,
        isBagOpen,
        setIsBagOpen,
        bagCount,
        bagTotal,
        usdBagTotal,
        showMiniBagRail,
        setShowMiniBagRail,
        triggerNavigation,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        boards,
        saveToBoard,
        isBookSaved,
        createBoard,
        isBoardsModalOpen,
        setIsBoardsModalOpen,
        activeBoardFilter,
        setActiveBoardFilter,
        likedBookIds,
        toggleLikeBook,
        isBookLiked,
        orders,
        placeOrder,
        getOrder,
        bookReviews,
        addBookReview,
        getReviewsForBook,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
