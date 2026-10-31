'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Book, BOOKS } from '../data/books';
import { CelebrationEvent, CELEBRATION_EVENTS } from '../data/celebrations';

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

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export type ThemeMode =
  | 'light'
  | 'sepia'
  | 'emerald'
  | 'womens-day'
  | 'childrens-day'
  | 'teachers-day'
  | 'avurudu'
  | 'vesak';

export type AuthModalMode = 'login' | 'register' | 'forgot-password' | null;

export interface ThemeOption {
  id: string;
  label: string;
  isDark?: boolean;
  isCelebration?: boolean;
  celebrationId?: string;
  badge?: string;
}

export const AVAILABLE_THEMES: ThemeOption[] = [
  { id: 'light', label: 'Classical Light', isDark: false },
  { id: 'sepia', label: 'Palm Leaf Sepia', isDark: false },
  { id: 'emerald', label: 'Royal Temple Emerald', isDark: false },
  {
    id: 'womens-day',
    label: "Women's Day Rose",
    isDark: false,
    isCelebration: true,
    celebrationId: 'womens-day',
    badge: 'Mar 8',
  },
  {
    id: 'childrens-day',
    label: "Children's Day Joy",
    isDark: false,
    isCelebration: true,
    celebrationId: 'childrens-day',
    badge: 'Nov 20',
  },
  {
    id: 'teachers-day',
    label: "Teachers' Day Scholar",
    isDark: false,
    isCelebration: true,
    celebrationId: 'teachers-day',
    badge: 'Oct 5',
  },
  {
    id: 'avurudu',
    label: 'Avurudu Harvest Gold',
    isDark: false,
    isCelebration: true,
    celebrationId: 'sinhala-tamil-new-year',
    badge: 'Apr 13–14',
  },
  {
    id: 'vesak',
    label: 'Sacred Vesak Lotus',
    isDark: false,
    isCelebration: true,
    celebrationId: 'vesak-festival',
    badge: 'May',
  },
];

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
}

interface AppContextType {
  // User Authentication
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;

  // Theme & Celebration Management
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: ThemeOption[];
  isDark: boolean;
  toggleTheme: () => void;
  activeCelebration: CelebrationEvent;
  setActiveCelebrationById: (celebrationId: string | null) => void;
  isCelebrationMode: boolean;

  // Auth Dialog / Bottom Sheet
  authModalMode: AuthModalMode;
  openAuthModal: (mode?: 'login' | 'register' | 'forgot-password') => void;
  closeAuthModal: () => void;

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
  removeFromBag: (bookId: string, skipConfirm?: boolean) => void;
  updateBagQuantity: (bookId: string, delta: number) => void;
  clearBag: (skipConfirm?: boolean) => void;
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
  removeFromCart: (bookId: string, skipConfirm?: boolean) => void;
  updateQuantity: (bookId: string, delta: number) => void;
  clearCart: (skipConfirm?: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;

  // Saved Collection Boards
  boards: Board[];
  saveToBoard: (bookId: string, boardId?: string) => void;
  isBookSaved: (bookId: string) => boolean;
  createBoard: (name: string, description?: string) => void;
  deleteBoard: (boardId: string) => void;
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

  // Global Delete / Action Confirmation Dialog
  confirmDialog: ConfirmDialogOptions | null;
  requestConfirmation: (options: ConfirmDialogOptions) => void;
  closeConfirmation: () => void;
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
      ...BOOKS[0],
      usdPrice: 4.15,
      originalUsdPrice: 6.39,
      urgencyText: 'In 24+ bags, 14 bought in the past 24 hours',
      sellerName: BOOKS[0].sellerName || 'Rasakatha Publications',
      sellerRating: 4.9,
      sellerReviews: '6.4k',
      isDigital: false,
    },
    quantity: 1,
    binding: BOOKS[0].binding,
  },
  {
    book: {
      ...BOOKS[1],
      usdPrice: 4.42,
      originalUsdPrice: 8.50,
      urgencyText: 'In 19 bags, 9 bought in the past 24 hours',
      sellerName: BOOKS[1].sellerName || 'Santhawa Publications',
      sellerRating: 4.9,
      sellerReviews: '3.2k',
      isDigital: false,
    },
    quantity: 1,
    binding: BOOKS[1].binding,
  },
  {
    book: {
      ...BOOKS[2],
      usdPrice: 3.85,
      originalUsdPrice: 5.50,
      urgencyText: 'In 15 bags, 7 bought in the past 24 hours',
      sellerName: BOOKS[2].sellerName || 'Vidyalankara Press',
      sellerRating: 4.9,
      sellerReviews: '4.1k',
      isDigital: false,
    },
    quantity: 1,
    binding: BOOKS[2].binding,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string>('light');
  const [isDark, setIsDark] = useState(false);
  const [activeCelebrationId, setActiveCelebrationId] = useState<string>('deepavali-halloween-season');
  const [isCelebrationMode, setIsCelebrationMode] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogOptions | null>(null);

  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Books');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const requestConfirmation = useCallback((options: ConfirmDialogOptions) => {
    setConfirmDialog(options);
  }, []);

  const closeConfirmation = useCallback(() => {
    setConfirmDialog(null);
  }, []);

  const openAuthModal = useCallback((mode: 'login' | 'register' | 'forgot-password' = 'login') => {
    setAuthModalMode(mode);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalMode(null);
  }, []);

  // User Authentication
  const [user, setUser] = useState<UserProfile | null>(null);
  const isLoggedIn = Boolean(user);

  const login = useCallback((email: string, name?: string) => {
    const rawName = name || email.split('@')[0] || 'Scholar';
    const capitalized = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const newUser: UserProfile = {
      email,
      name: capitalized,
      role: 'Scholar Reader',
    };
    setUser(newUser);
    try {
      localStorage.setItem('shastraloka-user', JSON.stringify(newUser));
    } catch { }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('shastraloka-user');
    } catch { }
  }, []);

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
    const resolvedTheme = targetTheme === 'dark' ? 'light' : targetTheme;
    setThemeState(resolvedTheme);
    setIsDark(false);

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('shastraloka-theme', resolvedTheme);
    } catch { }
  }, []);

  const setTheme = useCallback((targetTheme: string) => {
    const resolvedTheme = targetTheme === 'dark' ? 'light' : targetTheme;
    applyTheme(resolvedTheme);
    const matchedThemeOption = AVAILABLE_THEMES.find((t) => t.id === resolvedTheme);
    if (matchedThemeOption?.celebrationId) {
      setActiveCelebrationId(matchedThemeOption.celebrationId);
      setIsCelebrationMode(true);
      try {
        localStorage.setItem('shastraloka-celebration', matchedThemeOption.celebrationId);
        localStorage.setItem('shastraloka-celebration-mode', 'true');
      } catch { }
    } else if (['light', 'sepia', 'emerald'].includes(resolvedTheme)) {
      setIsCelebrationMode(false);
      try {
        localStorage.setItem('shastraloka-celebration-mode', 'false');
      } catch { }
    }
  }, [applyTheme]);

  const setActiveCelebrationById = useCallback((id: string | null) => {
    if (!id) {
      setIsCelebrationMode(false);
      applyTheme('light');
      try {
        localStorage.setItem('shastraloka-celebration-mode', 'false');
      } catch { }
      return;
    }
    const found = CELEBRATION_EVENTS.find((ev) => ev.id === id);
    if (found) {
      setActiveCelebrationId(found.id);
      setIsCelebrationMode(true);
      applyTheme(found.themeId);
      try {
        localStorage.setItem('shastraloka-celebration', found.id);
        localStorage.setItem('shastraloka-celebration-mode', 'true');
      } catch { }
    }
  }, [applyTheme]);

  const activeCelebration =
    CELEBRATION_EVENTS.find((ev) => ev.id === activeCelebrationId) || CELEBRATION_EVENTS[0];

  const toggleTheme = useCallback(() => {
    applyTheme('light');
  }, [applyTheme]);

  // Hydrate from LocalStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Theme & Celebration
      try {
        const savedCelebration = localStorage.getItem('shastraloka-celebration');
        const savedCelebMode = localStorage.getItem('shastraloka-celebration-mode');
        if (savedCelebration) {
          setActiveCelebrationId(savedCelebration);
        }
        if (savedCelebMode === 'true') {
          setIsCelebrationMode(true);
        }

        const savedTheme = localStorage.getItem('shastraloka-theme');
        if (savedTheme && savedTheme !== 'dark') {
          applyTheme(savedTheme);
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

      // User
      try {
        const savedUser = localStorage.getItem('shastraloka-user');
        if (savedUser) setUser(JSON.parse(savedUser));
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
    if (book.inStock === false) {
      showToast(`"${book.title}" is currently out of stock. We'll notify you when it returns!`);
      return;
    }
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
    setShowMiniBagRail(true);
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${book.title}" to Bag`);
  };

  const removeFromBag = (bookId: string, skipConfirm = false) => {
    const targetItem = bag.find((item) => item.book.id === bookId);
    if (!skipConfirm && targetItem) {
      requestConfirmation({
        title: 'Remove item from your bag?',
        message: `Are you sure you want to remove "${targetItem.book.title}" from your Shopping Bag?`,
        confirmLabel: 'Remove from bag',
        cancelLabel: 'Keep in bag',
        onConfirm: () => {
          setBag((prev) => prev.filter((item) => item.book.id !== bookId));
          showToast(`Removed "${targetItem.book.title}" from your bag`);
        },
      });
      return;
    }
    setBag((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const updateBagQuantity = (bookId: string, delta: number) => {
    const targetItem = bag.find((item) => item.book.id === bookId);
    if (targetItem && targetItem.quantity + delta <= 0) {
      removeFromBag(bookId, false);
      return;
    }
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

  const clearBag = (skipConfirm = false) => {
    if (!skipConfirm && bag.length > 0) {
      requestConfirmation({
        title: 'Clear your entire bag?',
        message: `Are you sure you want to remove all ${bag.length} treatises from your Shopping Bag?`,
        confirmLabel: 'Yes, clear bag',
        cancelLabel: 'Cancel',
        onConfirm: () => {
          setBag([]);
          showToast('Cleared all items from your Shopping Bag');
        },
      });
      return;
    }
    setBag([]);
  };

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

    if (isAlreadySaved) {
      const bookObj = BOOKS.find((b) => b.id === bookId);
      requestConfirmation({
        title: 'Remove from saved collection?',
        message: `Are you sure you want to remove "${bookObj?.title || 'this book'}" from "${targetBoard.name}"?`,
        confirmLabel: 'Remove',
        cancelLabel: 'Cancel',
        onConfirm: () => {
          setBoards((prev) =>
            prev.map((b) =>
              b.id === boardId ? { ...b, bookIds: b.bookIds.filter((id) => id !== bookId) } : b
            )
          );
          showToast(`Removed from "${targetBoard.name}"`);
        },
      });
      return;
    }

    setBoards((prev) =>
      prev.map((b) => {
        if (b.id === boardId) {
          return { ...b, bookIds: [...b.bookIds, bookId] };
        }
        return b;
      })
    );
    showToast(`Saved to "${targetBoard.name}"`);
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

  const deleteBoard = (boardId: string) => {
    const target = boards.find((b) => b.id === boardId);
    if (!target) return;
    requestConfirmation({
      title: 'Delete reading board?',
      message: `Are you sure you want to permanently delete the collection "${target.name}"?`,
      confirmLabel: 'Delete board',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        setBoards((prev) => prev.filter((b) => b.id !== boardId));
        if (activeBoardFilter === boardId) setActiveBoardFilter(null);
        showToast(`Deleted collection "${target.name}"`);
      },
    });
  };

  // Likes
  const toggleLikeBook = (bookId: string) => {
    const isLiked = likedBookIds.includes(bookId);
    if (isLiked) {
      const bookObj = BOOKS.find((b) => b.id === bookId);
      requestConfirmation({
        title: 'Remove from Favorites?',
        message: `Are you sure you want to remove "${bookObj?.title || 'this treatise'}" from your liked treatises?`,
        confirmLabel: 'Remove',
        cancelLabel: 'Keep',
        onConfirm: () => {
          setLikedBookIds((prev) => prev.filter((id) => id !== bookId));
          showToast('Removed from liked treatises');
        },
      });
      return;
    }
    setLikedBookIds((prev) => [...prev, bookId]);
    showToast('Saved to your liked treatises');
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
    clearBag(true);
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
        user,
        isLoggedIn,
        login,
        logout,
        theme,
        setTheme,
        availableThemes: AVAILABLE_THEMES,
        isDark,
        toggleTheme,
        activeCelebration,
        isCelebrationMode,
        setActiveCelebrationById,
        confirmDialog,
        requestConfirmation,
        closeConfirmation,
        authModalMode,
        openAuthModal,
        closeAuthModal,
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
        deleteBoard,
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
