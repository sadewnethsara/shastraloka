'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, BOOKS } from '../data/books';

export interface CartItem {
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
}

export interface Order {
  id: string; // e.g. "LK-847291"
  createdAt: string;
  items: CartItem[];
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

interface AppContextType {
  // Theme
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
  cart: CartItem[];
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Treatises');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Hydrate from LocalStorage on mount
  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem('shastraloka-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.removeAttribute('data-theme');
    }

    // Cart
    try {
      const savedCart = localStorage.getItem('shastraloka-cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {}

    // Boards
    try {
      const savedBoards = localStorage.getItem('shastraloka-boards');
      if (savedBoards) setBoards(JSON.parse(savedBoards));
    } catch {}

    // Likes
    try {
      const savedLikes = localStorage.getItem('shastraloka-likes');
      if (savedLikes) setLikedBookIds(JSON.parse(savedLikes));
    } catch {}

    // Orders
    try {
      const savedOrders = localStorage.getItem('shastraloka-orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {}

    // Reviews
    try {
      const savedReviews = localStorage.getItem('shastraloka-reviews');
      if (savedReviews) setBookReviews(JSON.parse(savedReviews));
    } catch {}
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-boards', JSON.stringify(boards));
    } catch {}
  }, [boards]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-likes', JSON.stringify(likedBookIds));
    } catch {}
  }, [likedBookIds]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('shastraloka-reviews', JSON.stringify(bookReviews));
    } catch {}
  }, [bookReviews]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('shastraloka-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('shastraloka-theme', 'light');
      }
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const openBookModal = (book: Book) => setSelectedBook(book);
  const closeBookModal = () => setSelectedBook(null);

  // Cart Handlers
  const addToCart = (book: Book, binding?: string, quantity = 1) => {
    const selectedBinding = binding || book.binding;
    setCart((prev) => {
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
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${book.title}" to Bag`);
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

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
        showToast('Saved to your liked treatises ❤️');
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
  }): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LK-${randomNum}`;
    const subtotal = cartTotal;
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
      items: [...cart],
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
    clearCart();
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
        isDark,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBook,
        openBookModal,
        closeBookModal,
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
