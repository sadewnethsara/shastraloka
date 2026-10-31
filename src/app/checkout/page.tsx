'use client';

import React, { useState } from 'react';
import {
  Lock,
  ChevronRight,
  ChevronDown,
  CreditCard,
  HelpCircle,
  Check,
  BookOpen,
  Truck,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  X,
  Copy,
  ArrowLeft,
  MapPin,
  Upload,
  Building2,
  MessageSquare,
  Send,
  Smartphone,
  FileText,
  Loader2,
} from 'lucide-react';
import {
  isValidEmail,
  isValidPhone,
  isValidSriLankanMobile,
  sanitizeCouponCode,
  sanitizeEmail,
  sanitizePhone,
  sanitizePostalCode,
  sanitizeSingleLine,
  secureApiPost,
  SECURITY_LIMITS,
} from '../../utils/security';
import { uploadToR2 } from '@/lib/r2-upload';
import { createOrder, buildWhatsAppOrderUrl } from '@/services/orders';
import { OrderResponse } from '@/types/api';
import { useApp } from '@/context/AppContext';

// ============================================================================
// TYPES & SRI LANKA DISTRICTS DATA
// ============================================================================

type CheckoutView = 'address' | 'payment-select' | 'add-card' | 'review' | 'confirmed';
type PaymentMethodType = 'card' | 'cod' | 'bank-transfer' | 'google-pay';

interface DistrictOption {
  name: string;
  province: string;
  rate: number;
  eta: string;
  postal: string;
}

interface BagBookItem {
  id: string;
  title: string;
  author: string;
  binding: string;
  price: number;
  quantity: number;
  coverImage: string;
  pinBoard: string;
}

const SRI_LANKA_DISTRICTS: DistrictOption[] = [
  { name: 'Kandy', province: 'Central', rate: 350, eta: '2-3 Days', postal: '20566' },
  { name: 'Colombo', province: 'Western', rate: 250, eta: '1-2 Days', postal: '00700' },
  { name: 'Gampaha', province: 'Western', rate: 300, eta: '1-2 Days', postal: '11000' },
  { name: 'Kalutara', province: 'Western', rate: 300, eta: '2 Days', postal: '12000' },
  { name: 'Matale', province: 'Central', rate: 350, eta: '2-3 Days', postal: '21000' },
  { name: 'Nuwara Eliya', province: 'Central', rate: 380, eta: '2-3 Days', postal: '22200' },
  { name: 'Galle', province: 'Southern', rate: 350, eta: '2-3 Days', postal: '80000' },
  { name: 'Matara', province: 'Southern', rate: 350, eta: '2-3 Days', postal: '81000' },
  { name: 'Hambantota', province: 'Southern', rate: 380, eta: '3 Days', postal: '82000' },
  { name: 'Kurunegala', province: 'North Western', rate: 350, eta: '2-3 Days', postal: '60000' },
  { name: 'Puttalam', province: 'North Western', rate: 380, eta: '3 Days', postal: '61300' },
  { name: 'Anuradhapura', province: 'North Central', rate: 380, eta: '3 Days', postal: '50000' },
  { name: 'Polonnaruwa', province: 'North Central', rate: 380, eta: '3 Days', postal: '51000' },
  { name: 'Badulla', province: 'Uva', rate: 380, eta: '3 Days', postal: '90000' },
  { name: 'Monaragala', province: 'Uva', rate: 400, eta: '3 Days', postal: '91000' },
  { name: 'Ratnapura', province: 'Sabaragamuwa', rate: 350, eta: '2-3 Days', postal: '70000' },
  { name: 'Kegalle', province: 'Sabaragamuwa', rate: 350, eta: '2-3 Days', postal: '71000' },
  { name: 'Ampara', province: 'Eastern', rate: 400, eta: '3-4 Days', postal: '32000' },
  { name: 'Batticaloa', province: 'Eastern', rate: 420, eta: '3-4 Days', postal: '30000' },
  { name: 'Trincomalee', province: 'Eastern', rate: 420, eta: '3-4 Days', postal: '31000' },
  { name: 'Jaffna', province: 'Northern', rate: 420, eta: '3-4 Days', postal: '40000' },
  { name: 'Kilinochchi', province: 'Northern', rate: 420, eta: '3-4 Days', postal: '44000' },
  { name: 'Mannar', province: 'Northern', rate: 420, eta: '3-4 Days', postal: '41000' },
  { name: 'Mullaitivu', province: 'Northern', rate: 420, eta: '3-4 Days', postal: '42000' },
  { name: 'Vavuniya', province: 'Northern', rate: 400, eta: '3-4 Days', postal: '43000' },
];

const INITIAL_BAG_BOOKS: BagBookItem[] = [
  {
    id: 'bk-1',
    title: 'The Longest Talk: Letters, Silence & Shared Solitude',
    author: 'Avery Oliver & Vlada Tiuvetska',
    binding: 'Linen Collector Hardcover',
    price: 3450,
    quantity: 1,
    coverImage:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    pinBoard: 'Reading Sanctuary 2026',
  },
  {
    id: 'bk-2',
    title: 'Mahavamsa: The Great Chronicle of Ceylon (Annotated)',
    author: 'Wilhelm Geiger Translation',
    binding: 'Archival Sewn Hardbound',
    price: 2900,
    quantity: 1,
    coverImage:
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=400&q=80',
    pinBoard: 'Sri Lankan Classics',
  },
];

// ============================================================================
// MAIN CHECKOUT COMPONENT
// ============================================================================

export default function App() {
  // Navigation & Flow State (Matches all 3 Etsy Screenshots + Review)
  const [view, setView] = useState<CheckoutView>('address');
  const [bag, setBag] = useState<BagBookItem[]>(INITIAL_BAG_BOOKS);
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);
  const [cvvHelpOpen, setCvvHelpOpen] = useState<boolean>(false);
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Address State (Pre-populated with your screenshot's Sri Lanka address for instant testing)
  const [email, setEmail] = useState<string>('senaka.b@heritage.lk');
  const [country, setCountry] = useState<string>('Sri Lanka');
  const [fullName, setFullName] = useState<string>('Dr. Senaka Bandara');
  const [streetAddress, setStreetAddress] = useState<string>('Maswela, Gampola');
  const [aptSuite, setAptSuite] = useState<string>('');
  const [city, setCity] = useState<string>('KOTMALE');
  const [district, setDistrict] = useState<string>('Kandy');
  const [postalCode, setPostalCode] = useState<string>('20566');
  const [phone, setPhone] = useState<string>('0702454084');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('0702454084');

  // Step 2A: Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cod');
  const [slipUrl, setSlipUrl] = useState<string>('');
  const [isUploadingSlip, setIsUploadingSlip] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);

  // Step 2B: Add New Card State (Matches Screenshot 1)
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');

  // Step 3: Promo & Order Confirmation State
  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>('SH-2026-0001');

  const handleSlipUpload = async (file: File) => {
    setUploadError(null);
    setIsUploadingSlip(true);
    try {
      const url = await uploadToR2(file, 'slips');
      setSlipUrl(url);
      triggerToast('Bank slip uploaded securely to Cloudflare R2!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to upload slip';
      setUploadError(msg);
    } finally {
      setIsUploadingSlip(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Calculations
  const bagSubtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const currentDistrictObj =
    SRI_LANKA_DISTRICTS.find((d) => d.name === district) || SRI_LANKA_DISTRICTS[0];
  const isFreeShipping = bagSubtotal >= 5000;
  const shippingFee = isFreeShipping ? 0 : currentDistrictObj.rate;
  const discountAmount = Math.round((bagSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, bagSubtotal - discountAmount) + shippingFee;

  // Formatted Billing Address string matching Screenshot 1:
  // "Maswela, Gampola, KOTMALE, 20566, +94 70-245-4084"
  const formattedBillingLine = [
    streetAddress.trim(),
    aptSuite.trim(),
    city.trim(),
    postalCode.trim(),
    phone.trim(),
  ]
    .filter(Boolean)
    .join(', ');

  // Input Formatters
  const handleFormatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const grouped = digits.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(grouped);
  };

  const handleFormatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      setCardExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setCardExpiry(digits);
    }
  };

  const handleUpdateQty = (id: string, delta: number) => {
    const safeDelta = Math.round(Number(delta) || 0);
    setBag((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                SECURITY_LIMITS.MAX_BAG_ITEM_QUANTITY,
                Math.max(1, item.quantity + safeDelta)
              ),
            }
          : item
      )
    );
  };

  const handleFillDemoCard = () => {
    setCardNumber('4532 8910 4421 8842');
    setCardExpiry('09/29');
    setCardCvc('742');
    setCardName(sanitizeSingleLine(fullName, SECURITY_LIMITS.MAX_NAME_LENGTH) || 'Dr. Senaka Bandara');
    setErrorMessage(null);
    triggerToast('Filled demo Visa card details');
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = sanitizeCouponCode(couponInput);
    if (code === 'LANKA20' || code === 'SHASTRA20') {
      setDiscountPercent(20);
      setAppliedCoupon(code);
      setCouponInput('');
      triggerToast(`Promo ${code} applied: 20% off your books!`);
    } else {
      triggerToast('Try code "LANKA20" or "SHASTRA20" for 20% off');
    }
  };

  // Primary "Continue" Flow Logic
  const handleContinue = async () => {
    setErrorMessage(null);

    if (view === 'address') {
      const cleanEmail = sanitizeEmail(email);
      const cleanName = sanitizeSingleLine(fullName, SECURITY_LIMITS.MAX_NAME_LENGTH);
      const cleanStreet = sanitizeSingleLine(streetAddress, SECURITY_LIMITS.MAX_ADDRESS_LENGTH);
      const cleanApt = sanitizeSingleLine(aptSuite, 80);
      const cleanCity = sanitizeSingleLine(city, SECURITY_LIMITS.MAX_CITY_LENGTH);
      const cleanPostal = sanitizePostalCode(postalCode);
      const cleanPhone = sanitizePhone(phone);

      if (!isValidEmail(cleanEmail)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (!cleanName || cleanName.length < 2) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!cleanStreet || !cleanCity) {
        setErrorMessage('Please enter your street address and city.');
        return;
      }
      if (!isValidSriLankanMobile(cleanPhone) && !isValidPhone(cleanPhone)) {
        setErrorMessage('Please enter a valid Sri Lankan mobile number (e.g., 0771234567 or +94771234567) for SMS & WhatsApp order dispatch.');
        return;
      }

      setEmail(cleanEmail);
      setFullName(cleanName);
      setStreetAddress(cleanStreet);
      setAptSuite(cleanApt);
      setCity(cleanCity);
      setPostalCode(cleanPostal);
      setPhone(cleanPhone);
      setWhatsappNumber(cleanPhone);

      const validationRes = await secureApiPost('/api/security/validate-checkout', {
        items: bag.map((b) => ({ id: b.id, quantity: b.quantity, price: b.price })),
        district,
        couponCode: appliedCoupon || '',
        customer: {
          email: cleanEmail,
          fullName: cleanName,
          streetAddress: cleanStreet,
          city: cleanCity,
          postalCode: cleanPostal,
          phone: cleanPhone,
        },
      });

      if (!validationRes.ok && validationRes.error) {
        setErrorMessage(validationRes.error);
        return;
      }

      setView('payment-select');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'payment-select') {
      if (paymentMethod === 'bank-transfer' && !slipUrl) {
        setErrorMessage('Please upload your bank deposit slip or transfer screenshot before continuing.');
        return;
      }
      if (paymentMethod === 'card') {
        setView('add-card');
      } else {
        setView('review');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'add-card') {
      const rawCardDigits = cardNumber.replace(/\D/g, '');
      if (rawCardDigits.length < 15 || rawCardDigits.length > 16) {
        setErrorMessage('Please enter a valid 16-digit card number (or click "Fill demo card").');
        return;
      }
      const [expMonthStr, expYearStr] = cardExpiry.split('/');
      const expMonth = Number(expMonthStr);
      const expYear = Number(expYearStr);
      if (
        cardExpiry.length < 5 ||
        !Number.isInteger(expMonth) ||
        expMonth < 1 ||
        expMonth > 12 ||
        !Number.isInteger(expYear)
      ) {
        setErrorMessage('Please enter a valid expiration date in MM/YY format (month 01–12).');
        return;
      }
      const rawCvc = cardCvc.replace(/\D/g, '');
      if (rawCvc.length < 3 || rawCvc.length > 4) {
        setErrorMessage('Please enter the 3 or 4 digit security code.');
        return;
      }
      const cleanCardName = sanitizeSingleLine(cardName, SECURITY_LIMITS.MAX_NAME_LENGTH);
      if (!cleanCardName) {
        setErrorMessage('Please enter the name on your card.');
        return;
      }
      setCardName(cleanCardName);
      setView('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'review') {
      // Clear sensitive card CVC from memory immediately upon order confirmation
      setCardCvc('');
      setIsSubmittingOrder(true);
      try {
        const orderRes = await createOrder({
          customerName: fullName,
          customerEmail: email,
          customerPhone: phone,
          whatsappNumber: whatsappNumber || phone,
          shippingAddress: streetAddress + (aptSuite ? `, ${aptSuite}` : ''),
          city: city,
          postalCode: postalCode,
          paymentMethod: paymentMethod === 'cod' ? 'COD' : paymentMethod === 'bank-transfer' ? 'BANK_TRANSFER' : 'CARD',
          paymentSlipUrl: slipUrl || undefined,
          items: bag.map((b) => ({ bookId: b.id, quantity: b.quantity })),
        });
        setOrderResponse(orderRes);
        setOrderId(orderRes.order.orderNumber);
        setView('confirmed');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to submit order. Please check connection.';
        setErrorMessage(msg);
      } finally {
        setIsSubmittingOrder(false);
      }
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    if (view === 'payment-select') {
      setView('address');
    } else if (view === 'add-card') {
      setView('payment-select');
    } else if (view === 'review') {
      if (paymentMethod === 'card') {
        setView('add-card');
      } else {
        setView('payment-select');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine how many of the 3 bottom progress segments are dark (#222222)
  const activeSegmentsCount =
    view === 'address'
      ? 1
      : view === 'payment-select' || view === 'add-card'
        ? 2
        : 3;

  return (
    <div className="min-h-screen bg-[var(--bg-wash)] text-[var(--text-main)] font-sans antialiased flex flex-col justify-between selection:bg-[var(--color-primary-subtle)]">
      {/* =====================================================================
          TOAST NOTIFICATION
         ===================================================================== */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-bounce">
          <div className="w-5 h-5 rounded-full bg-[var(--color-accent-badge)] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{toast}</span>
        </div>
      )}

      {/* =====================================================================
          DISTRACTION-FREE SECURE CHECKOUT HEADER (Matches Etsy Screenshots)
         ===================================================================== */}
      <header className="pt-6 pb-4 px-4">
        <div className="max-w-[540px] mx-auto flex flex-col items-center justify-center relative">
          {/* Brand + Lock + "Secure checkout" */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setView('address')}
              className="text-[26px] sm:text-[28px] font-normal tracking-tight text-[var(--color-primary)] hover:opacity-90 transition cursor-pointer leading-none"
              style={{
              }}
            >
              Shastraloka
            </button>
            <div className="flex items-center gap-1.5 text-[var(--text-main)] mt-0.5">
              <Lock className="w-3.5 h-3.5 fill-current text-[var(--text-main)]" />
              <span className="text-[14px] font-semibold tracking-tight">
                Secure checkout
              </span>
            </div>
          </div>

          {/* Subtle Pinterest-style Order Summary Toggle Pill */}
          <button
            type="button"
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-xs font-medium text-[var(--text-main)] transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>
              {totalItemsCount} {totalItemsCount === 1 ? 'book' : 'books'} in bag •{' '}
              <strong className="font-semibold">
                Rs. {finalTotal.toLocaleString()}
              </strong>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${summaryOpen ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Collapsible Mini Book Bag Drawer (Keeps checkout 100% clean until clicked) */}
          {summaryOpen && (
            <div className="w-full mt-3 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-lg p-4 space-y-3 z-20">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider pb-2 border-b border-[var(--border-subtle)]">
                <span>Your Selected Books ({totalItemsCount})</span>
                <button
                  type="button"
                  onClick={() => setSummaryOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-[var(--border-subtle)] space-y-2.5">
                {bag.map((item) => (
                  <div
                    key={item.id}
                    className="pt-2.5 first:pt-0 flex items-center gap-3"
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-11 h-14 rounded-lg object-cover border border-[var(--border-subtle)] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[var(--text-main)] truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {item.binding} • Collection: {item.pinBoard}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="w-5 h-5 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="w-5 h-5 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[var(--text-main)] shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">
                  Courier ({district}) •{' '}
                  {isFreeShipping ? 'Free over Rs. 5,000' : `Rs. ${shippingFee}`}
                </span>
                <span className="font-bold text-sm text-[var(--text-main)]">
                  Total: Rs. {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================================
          MAIN CENTERED CARD CONTAINER (540px max width like Etsy)
         ===================================================================== */}
<main className="page-container flex-1 pb-16 pt-2 flex items-start justify-center">
        <div className="w-full max-w-[540px] bg-[var(--bg-card)] rounded-[24px] sm:rounded-[28px] shadow-[var(--card-shadow)] border border-[var(--border-subtle)] px-4 sm:px-10 py-6 sm:py-9 transition-all">
          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs font-medium flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="ml-2 text-[#9B1C1C]/70 hover:text-[#9B1C1C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* -----------------------------------------------------------------
              VIEW 1: "Enter an address" (Matches Screenshot 3)
             ----------------------------------------------------------------- */}
          {view === 'address' && (
            <div>
              <h1 className="text-[22px] font-bold text-[var(--text-main)] text-center mb-6 tracking-tight">
                Enter an address
              </h1>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Email<span className="text-[var(--color-danger)] ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                  />
                </div>

                {/* Warm Stone Sign-in Banner */}
                <div className="bg-[var(--bg-wash)] border border-[var(--border-subtle)] rounded-xl px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[13px] text-[var(--text-main)]">
                    Sign in for faster, easier purchasing
                  </span>
                  <button
                    type="button"
                    onClick={() => setSignInModalOpen(true)}
                    className="px-4 py-2 rounded-full border border-[var(--border-focus)] bg-transparent hover:bg-[var(--bg-hover)] text-[13px] font-semibold text-[var(--text-main)] transition cursor-pointer shrink-0"
                  >
                    Sign in or register
                  </button>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Country<span className="text-[var(--color-danger)] ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] appearance-none cursor-pointer transition"
                    >
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[var(--text-main)] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Full name */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Full name<span className="text-[var(--color-danger)] ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                  />
                </div>

                {/* Street address */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Street address<span className="text-[var(--color-danger)] ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                  />
                </div>

                {/* Apt / Suite / Other (optional) */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Apt / Suite / Other{' '}
                    <span className="font-normal text-[var(--text-muted)] text-[13px]">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={aptSuite}
                    onChange={(e) => setAptSuite(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                  />
                </div>

                {/* City & Sri Lanka District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                      City<span className="text-[var(--color-danger)] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                      District<span className="text-[var(--color-danger)] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={district}
                        onChange={(e) => {
                          const selected = e.target.value;
                          setDistrict(selected);
                          const found = SRI_LANKA_DISTRICTS.find(
                            (d) => d.name === selected
                          );
                          if (found) setPostalCode(found.postal);
                        }}
                        className="w-full h-12 pl-4 pr-9 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] appearance-none cursor-pointer transition"
                      >
                        {SRI_LANKA_DISTRICTS.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.name} ({d.province})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[var(--text-main)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Postal code & Phone number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                      Postal code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                      Phone number<span className="text-[var(--color-danger)] ml-0.5">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              VIEW 2A: "Choose a payment method" (Matches Screenshot 2)
             ----------------------------------------------------------------- */}
          {view === 'payment-select' && (
            <div>
              <h1 className="text-[22px] font-bold text-[var(--text-main)] text-center mb-6 tracking-tight">
                Choose a payment method
              </h1>

              {/* Unified Bordered Payment Method List */}
              <div className="border border-[var(--border-subtle)] rounded-2xl divide-y divide-[var(--border-subtle)] overflow-hidden mb-6">
                {/* Option 1: Cash on Delivery (Sri Lanka Bookstore Favorite) */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-[var(--bg-wash)] transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-7 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-input)] flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4 text-[var(--text-main)]" />
                    </div>
                    <div>
                      <span className="text-[15px] font-semibold text-[var(--text-main)] block leading-snug">
                        Cash on Delivery (LKR)
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        Pay courier upon package delivery at {city}, {district}
                      </span>
                    </div>
                  </div>
                  <RadioIndicator selected={paymentMethod === 'cod'} />
                </div>

                {/* Option 2: Bank Transfer (Direct Deposit with R2 Slip Upload) */}
                <div
                  onClick={() => setPaymentMethod('bank-transfer')}
                  className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-[var(--bg-wash)] transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-7 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-input)] flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-[var(--text-main)]" />
                    </div>
                    <div>
                      <span className="text-[15px] font-semibold text-[var(--text-main)] block leading-snug">
                        Bank Transfer (Commercial / Sampath Bank)
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        Direct online transfer or CDM deposit with slip proof
                      </span>
                    </div>
                  </div>
                  <RadioIndicator selected={paymentMethod === 'bank-transfer'} />
                </div>

                {/* Option 3: Add a card (VISA, Mastercard, Amex) */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-[var(--bg-wash)] transition"
                >
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <div className="w-11 h-7 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-input)] flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-[var(--text-main)]" />
                    </div>
                    <span className="text-[15px] font-semibold text-[var(--text-main)]">Debit / Credit Card</span>

                    {/* Card Network Mini Badges */}
                    <div className="flex items-center gap-2 ml-1">
                      <span className="text-[11px] font-black italic tracking-tighter text-[#1A1F71] dark:text-blue-400">
                        VISA
                      </span>
                      <span className="inline-flex items-center">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] -ml-1.5 inline-block opacity-90" />
                      </span>
                      <span className="px-1 py-0.5 rounded-[2px] bg-[#016FD0] text-white text-[8px] font-extrabold leading-none">
                        AMEX
                      </span>
                    </div>
                  </div>
                  <RadioIndicator selected={paymentMethod === 'card'} />
                </div>
              </div>

              {/* Bank Transfer Details & Cloudflare R2 Slip Dropzone */}
              {paymentMethod === 'bank-transfer' && (
                <div className="bg-[var(--bg-wash)] border border-[var(--border-subtle)] rounded-2xl p-5 mb-8 space-y-4">
                  <div className="border-b border-[var(--border-subtle)] pb-3">
                    <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[var(--color-primary)]" />
                      Bank Account Details for Direct Deposit
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Please deposit or transfer Rs. {finalTotal.toLocaleString()} to our verified Sri Lanka bank account:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                      <p className="font-bold text-[var(--text-main)]">Commercial Bank of Ceylon</p>
                      <p className="text-[var(--text-muted)]">Account: <span className="font-mono font-semibold text-[var(--text-main)]">1000 8472 9182</span></p>
                      <p className="text-[var(--text-muted)]">Name: Shastraloka Heritage Books (Pvt) Ltd</p>
                      <p className="text-[var(--text-muted)]">Branch: Colombo Fort</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                      <p className="font-bold text-[var(--text-main)]">Sampath Bank PLC</p>
                      <p className="text-[var(--text-muted)]">Account: <span className="font-mono font-semibold text-[var(--text-main)]">0192 1000 4821</span></p>
                      <p className="text-[var(--text-muted)]">Name: Shastraloka Heritage Books (Pvt) Ltd</p>
                      <p className="text-[var(--text-muted)]">Branch: Kandy City Centre</p>
                    </div>
                  </div>

                  {/* Cloudflare R2 Slip Upload Dropzone */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[var(--text-main)] mb-2">
                      Upload Deposit Slip / Transfer Screenshot (Encrypted R2 Storage)*
                    </label>
                    
                    <div className="border-2 border-dashed border-[var(--border-strong)] hover:border-[var(--color-primary)] rounded-xl p-4 text-center transition cursor-pointer relative bg-[var(--bg-card)]">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleSlipUpload(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        disabled={isUploadingSlip}
                      />
                      
                      {isUploadingSlip ? (
                        <div className="flex flex-col items-center justify-center py-3 text-xs text-[var(--color-primary)]">
                          <Loader2 className="w-6 h-6 animate-spin mb-2" />
                          <span>Encrypting and uploading slip directly to Cloudflare R2...</span>
                        </div>
                      ) : slipUrl ? (
                        <div className="flex flex-col items-center justify-center py-2 text-xs text-[var(--color-success)]">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-success-bg)] flex items-center justify-center mb-1">
                            <Check className="w-5 h-5 text-[var(--color-success)]" />
                          </div>
                          <span className="font-bold">Slip Uploaded to Cloudflare R2</span>
                          <span className="text-[10px] text-[var(--text-muted)] max-w-xs truncate mt-0.5">{slipUrl}</span>
                          <span className="text-[10px] text-[var(--color-primary)] underline mt-1">Click to replace file</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-3 text-xs">
                          <Upload className="w-6 h-6 text-[var(--text-muted)] mb-1.5" />
                          <span className="font-semibold text-[var(--text-main)]">
                            Drag & drop or click to upload bank slip
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                            JPG, PNG, WebP or PDF (Max 10MB)
                          </span>
                        </div>
                      )}
                    </div>

                    {uploadError && (
                      <p className="text-xs text-[var(--color-danger)] mt-1.5">{uploadError}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              VIEW 2B: "Add new card"
             ----------------------------------------------------------------- */}
          {view === 'add-card' && (
            <div>
              <div className="relative flex items-center justify-center mb-6">
                <h1 className="text-[22px] font-bold text-[var(--text-main)] text-center tracking-tight">
                  Add new card
                </h1>
                <button
                  type="button"
                  onClick={handleFillDemoCard}
                  className="absolute right-0 text-[11px] font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                >
                  Auto-fill demo
                </button>
              </div>

              <div className="space-y-5 mb-6">
                {/* Card number */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Card number
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
                      <div className="w-5 h-3.5 rounded-[3px] bg-[var(--pill-active-bg)] flex flex-col justify-between p-0.5">
                        <div className="w-full h-[2px] bg-[var(--pill-active-text)]/80" />
                        <div className="w-1.5 h-1 bg-[var(--pill-active-text)] rounded-[1px]" />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => handleFormatCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full h-12 pl-11 pr-11 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] font-mono transition placeholder:font-sans placeholder:text-[var(--text-dim)]"
                    />
                    <Lock className="w-4 h-4 fill-current text-[var(--text-main)] absolute right-4 pointer-events-none" />
                  </div>
                </div>

                {/* 2-Column Row: Expiration date & Security code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                      Expiration date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => handleFormatExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] placeholder:text-[var(--text-dim)] transition"
                    />
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <label className="text-[14px] font-bold text-[var(--text-main)]">
                        Security code
                      </label>
                      <button
                        type="button"
                        onClick={() => setCvvHelpOpen(!cvvHelpOpen)}
                        className="text-[var(--text-main)] hover:opacity-75 cursor-pointer"
                        title="What is a security code?"
                      >
                        <HelpCircle className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) =>
                        setCardCvc(e.target.value.replace(/\D/g, ''))
                      }
                      className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                    />

                    {cvvHelpOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-56 p-3 rounded-xl bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-[11px] shadow-xl z-20 leading-relaxed">
                        The 3-digit security code (CVV) is printed on the back of your Visa/Mastercard, or 4 digits on the front of Amex.
                      </div>
                    )}
                  </div>
                </div>

                {/* Name on card */}
                <div>
                  <label className="block text-[14px] font-bold text-[var(--text-main)] mb-1.5">
                    Name on card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] hover:border-[var(--border-focus)] focus:border-[var(--border-focus)] outline-none text-[15px] text-[var(--text-main)] transition"
                  />
                </div>

                {/* Billing address clickable box */}
                <div
                  onClick={() => setView('address')}
                  title="Click to edit billing/shipping address"
                  className="rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-focus)] px-4 py-3.5 flex items-center justify-between gap-3 cursor-pointer transition group"
                >
                  <div className="min-w-0">
                    <span className="block text-[13px] font-bold text-[var(--text-main)]">
                      Billing address
                    </span>
                    <span className="block text-[13px] text-[var(--text-body)] mt-0.5 truncate">
                      {formattedBillingLine ||
                        'Maswela, Gampola, KOTMALE, 20566, +94 70-245-4084'}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-main)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              VIEW 3: "Review your order"
             ----------------------------------------------------------------- */}
          {view === 'review' && (
            <div>
              <h1 className="text-[22px] font-bold text-[var(--text-main)] text-center mb-6 tracking-tight">
                Review your order
              </h1>

              <div className="space-y-4 mb-6">
                {/* Shipping & Payment Compact Cards */}
                <div className="border border-[var(--border-subtle)] rounded-2xl divide-y divide-[var(--border-subtle)] overflow-hidden">
                  <div
                    onClick={() => setView('address')}
                    className="px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-[var(--bg-wash)] cursor-pointer transition"
                  >
                    <div className="min-w-0">
                      <span className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                        Delivering to ({district} District)
                      </span>
                      <span className="text-[13px] font-semibold text-[var(--text-main)] block mt-0.5">
                        {fullName}
                      </span>
                      <span className="text-[13px] text-[var(--text-muted)] block truncate">
                        {formattedBillingLine}
                      </span>
                    </div>
                    <span className="text-xs font-semibold underline text-[var(--text-main)] shrink-0">
                      Change
                    </span>
                  </div>

                  <div
                    onClick={() => setView('payment-select')}
                    className="px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-[var(--bg-wash)] cursor-pointer transition"
                  >
                    <div>
                      <span className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                        Payment method
                      </span>
                      <span className="text-[13px] font-semibold text-[var(--text-main)] block mt-0.5">
                        {paymentMethod === 'card'
                          ? `Card ending in ${cardNumber.slice(-4) || '4242'} (${cardName || fullName})`
                          : paymentMethod === 'cod'
                            ? 'Cash on Delivery (Pay LKR cash to courier)'
                            : paymentMethod === 'bank-transfer'
                              ? `Bank Transfer (Commercial/Sampath — Slip Uploaded)`
                              : 'Online Payment'}
                      </span>
                    </div>
                    <span className="text-xs font-semibold underline text-[var(--text-main)] shrink-0">
                      Change
                    </span>
                  </div>
                </div>

                {/* Pinterest-Inspired Pinned Books Summary */}
                <div className="border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-main)]">
                      Shastraloka Archival Dispatch ({totalItemsCount}{' '}
                      {totalItemsCount === 1 ? 'Book' : 'Books'})
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2.5 py-0.5 rounded-full">
                      Est. {currentDistrictObj.eta}
                    </span>
                  </div>

                  <div className="divide-y divide-[var(--border-subtle)] space-y-3">
                    {bag.map((book) => (
                      <div
                        key={book.id}
                        className="pt-3 first:pt-0 flex items-start gap-3"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 rounded-lg object-cover border border-[var(--border-subtle)] shrink-0 shadow-2xs"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-[var(--text-main)] leading-snug line-clamp-1">
                            {book.title}
                          </h4>
                          <p className="text-[11px] text-[var(--text-muted)]">
                            {book.binding}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--pill-bg)] text-[var(--text-main)]">
                            Saved on: {book.pinBoard}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[13px] font-bold text-[var(--text-main)] block">
                            Rs. {(book.price * book.quantity).toLocaleString()}
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)]">
                            Qty: {book.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Apply promo code (try LANKA20)"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-xs uppercase font-mono outline-none focus:border-[var(--border-focus)] text-[var(--text-main)]"
                  />
                  <button
                    type="submit"
                    className="px-4 h-10 rounded-xl bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-xs font-semibold text-[var(--text-main)] transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Price Breakdown */}
                <div className="bg-[var(--bg-wash)] rounded-2xl p-4 space-y-2 text-[13px] border border-[var(--border-subtle)]">
                  <div className="flex justify-between text-[var(--text-muted)]">
                    <span>Item(s) total</span>
                    <span className="font-medium text-[var(--text-main)]">
                      Rs. {bagSubtotal.toLocaleString()}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[var(--color-success)] font-semibold">
                      <span>Promo discount ({appliedCoupon} • 20%)</span>
                      <span>-Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[var(--text-muted)]">
                    <span>Courier to {district}</span>
                    <span className="font-medium text-[var(--text-main)]">
                      {isFreeShipping ? 'FREE' : `Rs. ${shippingFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-between text-[15px] font-bold text-[var(--text-main)]">
                    <span>Order total (LKR)</span>
                    <span>Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              VIEW 4: ORDER CONFIRMED SCREEN
             ----------------------------------------------------------------- */}
          {view === 'confirmed' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  Shastraloka Dispatch Confirmed
                </span>
                <h1 className="text-2xl font-bold text-[var(--text-main)]">
                  Thank you, {fullName.split(' ')[0]}!
                </h1>
                <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                  We&apos;ve sent your archival receipt to <strong>{email}</strong> and SMS
                  tracking updates to <strong>{phone}</strong>.
                </p>
              </div>

              {/* Automatic User Account Notice */}
              <div className="p-3.5 bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)] rounded-2xl text-left text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-[var(--color-primary)]">
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>Shastraloka Account Automatically Created</span>
                </div>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  Your reading account has been securely provisioned using your phone number <strong>{phone}</strong>. You can sign in anytime using SMS OTP or password to view dispatch tracking.
                </p>
              </div>

              {/* Notification Dispatch Status Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] font-medium text-[11px]">
                  <Check className="w-3.5 h-3.5" /> SMS Queued (Text.lk)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] font-medium text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Email Queued (Resend)
                </span>
              </div>

              <div className="bg-[var(--bg-wash)] rounded-2xl p-4 border border-[var(--border-subtle)] text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Order Number</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(orderId);
                      triggerToast('Copied tracking ID!');
                    }}
                    className="font-mono font-bold text-[var(--text-main)] inline-flex items-center gap-1 hover:underline"
                  >
                    <span>{orderId}</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Delivery Address</span>
                  <span className="font-semibold text-[var(--text-main)] truncate max-w-[230px]">
                    {streetAddress}, {city} ({district})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Total Amount</span>
                  <span className="font-bold text-[var(--color-primary)]">
                    Rs. {finalTotal.toLocaleString()}
                  </span>
                </div>
                {slipUrl && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">Bank Slip Proof</span>
                    <a href={slipUrl} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] underline truncate max-w-[200px]">
                      View in Cloudflare R2
                    </a>
                  </div>
                )}
              </div>

              {/* WhatsApp Click-to-Chat Button */}
              <a
                href={orderResponse?.notifications?.whatsappRedirectUrl || buildWhatsAppOrderUrl(orderId, fullName, finalTotal, paymentMethod, slipUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Send Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setView('address')}
                className="w-full py-3 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-[var(--text-main)] text-sm font-semibold transition cursor-pointer"
              >
                Back to Checkout Start
              </button>
            </div>
          )}

          {/* =================================================================
              BOTTOM 3-SEGMENT PROGRESS BAR & NAVIGATION BUTTONS
             ================================================================= */}
          {view !== 'confirmed' && (
            <div className="pt-3">
              {/* 3-Segment Horizontal Progress Bar */}
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {[1, 2, 3].map((segment) => (
                  <div
                    key={segment}
                    className={`h-[3.5px] rounded-full transition-colors duration-300 ${segment <= activeSegmentsCount
                        ? 'bg-[var(--pill-active-bg)]'
                        : 'bg-[var(--border-subtle)]'
                      }`}
                  />
                ))}
              </div>

              {/* Back & Continue Pill Buttons */}
              <div className="flex items-center justify-between">
                {view !== 'address' ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-[var(--text-main)] text-[14px] font-semibold transition cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-7 py-3 rounded-full bg-[var(--pill-active-bg)] hover:opacity-90 text-[var(--pill-active-text)] text-[14px] font-semibold transition cursor-pointer shadow-xs"
                >
                  {view === 'review' ? 'Place your order' : 'Continue'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =====================================================================
          MINIMAL HIGH-TRUST FOOTER & STEP SWITCHER PILL FOR QUICK PREVIEWING
         ===================================================================== */}
      <footer className="pb-6 px-4 text-center space-y-3">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs text-[11px] max-w-full">
          <span className="px-2.5 py-1 text-[var(--text-muted)] font-semibold">
            Quick Screen Jump:
          </span>
          {[
            { id: 'address', label: '1. Enter an address' },
            { id: 'payment-select', label: '2. Choose payment' },
            { id: 'add-card', label: '3. Add new card' },
            { id: 'review', label: '4. Review order' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setView(tab.id as CheckoutView);
              }}
              className={`px-3 py-1 rounded-full font-semibold transition cursor-pointer ${view === tab.id
                  ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--pill-bg)]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> Shastraloka
            Purchase Protection
          </span>
          <span className="hidden sm:inline">•</span>
          <span>256-Bit SSL Encryption</span>
          <span className="hidden sm:inline">•</span>
          <span>Sri Lanka Island-wide Dispatch</span>
        </div>
      </footer>

      {/* =====================================================================
          SIGN IN MODAL (Triggered by "Sign in or register" button)
         ===================================================================== */}
      {signInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-main)]">
                Sign in to Shastraloka
              </h3>
              <button
                type="button"
                onClick={() => setSignInModalOpen(false)}
                className="p-1 rounded-full hover:bg-[var(--bg-hover)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Sync your saved Shastraloka reading boards and Sri Lankan delivery addresses automatically.
            </p>
            <button
              type="button"
              onClick={() => {
                setFullName('Dr. Senaka Bandara');
                setEmail('senaka.b@heritage.lk');
                setStreetAddress('Maswela, Gampola');
                setCity('KOTMALE');
                setPostalCode('20566');
                setPhone('+94 70-245-4084');
                setSignInModalOpen(false);
                triggerToast('Signed in as Dr. Senaka Bandara');
              }}
              className="w-full py-2.5 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-xs font-semibold hover:opacity-90 transition cursor-pointer"
            >
              Continue as Dr. Senaka Bandara
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CUSTOM RADIO INDICATOR (Matches Etsy Screenshot 2)
// ============================================================================

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center transition ${selected
          ? 'bg-[var(--pill-active-bg)] border-2 border-[var(--pill-active-bg)]'
          : 'bg-[var(--bg-input)] border-[1.5px] border-[var(--border-strong)]'
        }`}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-[var(--pill-active-text)]" />}
    </div>
  );
}