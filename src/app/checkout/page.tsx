'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCover from '../../components/BookCover';
import { useApp } from '../../context/AppContext';

const SRI_LANKA_DISTRICTS = [
  { name: 'Colombo', province: 'Western', rate: 250, time: '1-2 Days' },
  { name: 'Gampaha', province: 'Western', rate: 300, time: '2 Days' },
  { name: 'Kalutara', province: 'Western', rate: 300, time: '2 Days' },
  { name: 'Kandy', province: 'Central', rate: 350, time: '2-3 Days' },
  { name: 'Matale', province: 'Central', rate: 350, time: '2-3 Days' },
  { name: 'Nuwara Eliya', province: 'Central', rate: 380, time: '2-3 Days' },
  { name: 'Galle', province: 'Southern', rate: 350, time: '2-3 Days' },
  { name: 'Matara', province: 'Southern', rate: 350, time: '2-3 Days' },
  { name: 'Hambantota', province: 'Southern', rate: 380, time: '3 Days' },
  { name: 'Kurunegala', province: 'North Western', rate: 350, time: '2-3 Days' },
  { name: 'Puttalam', province: 'North Western', rate: 380, time: '3 Days' },
  { name: 'Anuradhapura', province: 'North Central', rate: 380, time: '3 Days' },
  { name: 'Polonnaruwa', province: 'North Central', rate: 380, time: '3 Days' },
  { name: 'Badulla', province: 'Uva', rate: 380, time: '3 Days' },
  { name: 'Ratnapura', province: 'Sabaragamuwa', rate: 350, time: '2-3 Days' },
  { name: 'Kegalle', province: 'Sabaragamuwa', rate: 350, time: '2-3 Days' },
  { name: 'Jaffna', province: 'Northern', rate: 420, time: '3-4 Days' },
  { name: 'Batticaloa', province: 'Eastern', rate: 420, time: '3-4 Days' },
  { name: 'Trincomalee', province: 'Eastern', rate: 420, time: '3-4 Days' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, placeOrder, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Customer & Shipping Form State
  const [fullName, setFullName] = useState('Dr. Senaka Bandara');
  const [email, setEmail] = useState('senaka.b@heritage.lk');
  const [phone, setPhone] = useState('+94 77 123 4567');
  const [address, setAddress] = useState('No. 45, Dharmapala Mawatha');
  const [city, setCity] = useState('Colombo 07');
  const [district, setDistrict] = useState('Colombo');
  const [postalCode, setPostalCode] = useState('00700');
  const [deliveryNotes, setDeliveryNotes] = useState('Handle with care: Rare Archival Edition');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bank'>('cod');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('SENAKA BANDARA');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Calculate Shipping & Discount
  const selectedDistrictData = SRI_LANKA_DISTRICTS.find((d) => d.name === district) || SRI_LANKA_DISTRICTS[0];
  const isFreeShipping = cartTotal >= 5000;
  const shippingFee = isFreeShipping ? 0 : selectedDistrictData.rate;
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount) + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SHASTRA20' || code === 'LANKA20') {
      setDiscountPercent(20);
      showToast('Special Promo Applied: 20% Discount!');
    } else {
      showToast('Invalid promo code. Try "LANKA20"');
    }
  };

  const handleFillDemoCard = () => {
    setCardNumber('4111 2222 3333 4444');
    setCardExpiry('08/29');
    setCardCvc('321');
    setCardName(fullName.toUpperCase());
    showToast('Demo payment card loaded');
  };

  const handleConfirmOrder = () => {
    if (!fullName || !phone || !address) {
      showToast('Please complete your name, phone, and delivery address.');
      setStep(1);
      return;
    }

    const order = placeOrder({
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        district,
        postalCode,
        notes: deliveryNotes,
      },
      paymentMethod,
      discount: discountAmount,
      shippingFee,
    });

    router.push(`/orders/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <Header />
        <div className="max-w-md mx-auto py-24 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] flex items-center justify-center text-3xl mx-auto">
            🛍️
          </div>
          <h2 className="font-serif font-black text-2xl">Your Bag is Empty</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Explore our visual catalog to add rare Sri Lankan chronicles before checking out.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-[#e60023] text-white font-bold text-sm pill-btn cursor-pointer shadow-md"
          >
            Explore Treatises
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Checkout Header & Steps Indicator */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span>🔒</span> 256-Bit SSL Encrypted Checkout
                </span>
                <span className="text-xs text-[var(--text-muted)]">• Sri Lanka Island-wide Delivery</span>
              </div>
              <h1 className="font-serif font-black text-2xl sm:text-3xl text-[var(--text-main)] mt-1">
                Order Delivery & Checkout
              </h1>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-bold">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                  step === 1
                    ? 'bg-[#e60023] text-white'
                    : 'bg-[var(--bg-input)] text-[var(--text-main)]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
                <span>Delivery</span>
              </button>

              <span className="text-[var(--text-muted)]">→</span>

              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                  step === 2
                    ? 'bg-[#e60023] text-white'
                    : 'bg-[var(--bg-input)] text-[var(--text-main)]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
                <span>Payment</span>
              </button>

              <span className="text-[var(--text-muted)]">→</span>

              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                  step === 3
                    ? 'bg-[#e60023] text-white'
                    : 'bg-[var(--bg-input)] text-[var(--text-main)]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
                <span>Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Step Panels */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: Delivery Address */}
            {step === 1 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-5 animate-slide-up">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif font-black text-xl text-[var(--text-main)] flex items-center gap-2">
                    <span>📍</span> Step 1: Delivery Destination (Sri Lanka)
                  </h2>
                  <span className="text-xs text-[var(--text-muted)]">Island-wide Courier</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text-muted)]">Full Recipient Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                      placeholder="e.g. Dr. Senaka Bandara"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text-muted)]">WhatsApp / Mobile Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                      placeholder="+94 77 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-muted)]">Email Address (for Receipt & Tracking)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                    placeholder="name@domain.lk"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-muted)]">Street Address & Landmark *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                    placeholder="House / Apartment / Street Name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-xs font-bold text-[var(--text-muted)]">District *</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023] font-semibold cursor-pointer"
                    >
                      {SRI_LANKA_DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} (Rs. {d.rate})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-xs font-bold text-[var(--text-muted)]">City / Suburb *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                      placeholder="e.g. Colombo 07"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-xs font-bold text-[var(--text-muted)]">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                      placeholder="00700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-muted)]">Delivery Instructions</label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm outline-none focus:border-[#e60023]"
                    placeholder="e.g. Leave with security / Call before delivery"
                  />
                </div>

                {/* Delivery Fee Notice Card */}
                <div className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[var(--text-main)] block">
                      Certified Courier to {district} ({selectedDistrictData.time})
                    </span>
                    <span className="text-[var(--text-muted)]">
                      {isFreeShipping ? '🎉 Free delivery applied (orders over Rs. 5,000)' : `Standard island-wide rate: Rs. ${selectedDistrictData.rate}`}
                    </span>
                  </div>
                  <span className="font-bold text-sm text-[#e60023]">
                    {isFreeShipping ? 'FREE' : `Rs. ${selectedDistrictData.rate}`}
                  </span>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-sm pill-btn cursor-pointer shadow-md flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <span>Proceed to Payment</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-5 animate-slide-up">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif font-black text-xl text-[var(--text-main)] flex items-center gap-2">
                    <span>💳</span> Step 2: Payment Method
                  </h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#e60023] font-bold hover:underline cursor-pointer"
                  >
                    ← Edit Address
                  </button>
                </div>

                {/* Payment Option Radios */}
                <div className="space-y-3">
                  
                  {/* Option 1: Cash on Delivery (COD) */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#e60023] bg-[#e60023]/5 ring-1 ring-[#e60023]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#e60023]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[var(--text-main)]">
                          Cash on Delivery (COD) Island-wide
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                          Most Popular
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Pay with cash or LankaQR directly to the courier agent when your sacred manuscripts arrive.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Visa / Mastercard */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#e60023] bg-[#e60023]/5 ring-1 ring-[#e60023]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-[#e60023]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[var(--text-main)]">
                          Credit / Debit Card (Visa, Mastercard, Amex)
                        </span>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span>💳</span>
                          <span>🔒 256-Bit</span>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Instant encrypted card payment with local Sri Lankan banks.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Direct Bank Deposit */}
                  <label
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#e60023] bg-[#e60023]/5 ring-1 ring-[#e60023]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="mt-1 accent-[#e60023]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[var(--text-main)]">
                          Direct Bank Transfer (Commercial / Sampath)
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">Manual Verification</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Transfer to Shastraloka Trust Account. Upload slip via WhatsApp or email.
                      </p>
                    </div>
                  </label>

                </div>

                {/* Card Input Drawer if Card chosen */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-muted)]">Card Information</span>
                      <button
                        type="button"
                        onClick={handleFillDemoCard}
                        className="text-[11px] font-bold text-[#e60023] hover:underline cursor-pointer"
                      >
                        ⚡ Fill Demo Card
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono outline-none"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVC / CVV"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full bg-[var(--bg-input)] text-[var(--text-main)] font-bold text-xs pill-btn cursor-pointer"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-sm pill-btn cursor-pointer shadow-md flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <span>Review Order</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Final Review */}
            {step === 3 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-6 animate-slide-up">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <h2 className="font-serif font-black text-xl text-[var(--text-main)] flex items-center gap-2">
                    <span>📋</span> Step 3: Review & Place Order
                  </h2>
                  <span className="text-xs text-emerald-600 font-bold">Ready to dispatch</span>
                </div>

                {/* Recipient & Payment recap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-[var(--text-muted)]">Delivery To:</span>
                      <button onClick={() => setStep(1)} className="text-[#e60023] font-bold">Edit</button>
                    </div>
                    <p className="font-bold text-sm text-[var(--text-main)]">{fullName}</p>
                    <p className="text-[var(--text-muted)]">{address}, {city}</p>
                    <p className="text-[var(--text-muted)]">{district} District • {postalCode}</p>
                    <p className="text-[var(--text-muted)]">📞 {phone}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-[var(--text-muted)]">Payment Mode:</span>
                      <button onClick={() => setStep(2)} className="text-[#e60023] font-bold">Edit</button>
                    </div>
                    <p className="font-bold text-sm text-[var(--text-main)] uppercase">
                      {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Visa / Mastercard' : 'Bank Deposit'}
                    </p>
                    <p className="text-[var(--text-muted)]">
                      {paymentMethod === 'cod' ? 'Pay upon courier arrival' : 'Payment authorized'}
                    </p>
                    <div className="mt-2 text-emerald-600 font-bold flex items-center gap-1">
                      <span>✓</span> 100% Certified Courier Guarantee
                    </div>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full py-4 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-black text-base pill-btn cursor-pointer shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <span>✓ Confirm & Place Order (Rs. {finalTotal.toLocaleString()})</span>
                  </button>

                  <p className="text-[11px] text-center text-[var(--text-muted)]">
                    By clicking Confirm Order, your books will be dispatched with archival verification seals from Colombo Archives.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <h3 className="font-serif font-black text-lg text-[var(--text-main)]">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
                </h3>
                <Link href="/" className="text-xs text-[#e60023] font-bold hover:underline">
                  + Add More Books
                </Link>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border-subtle)] pr-1 space-y-3">
                {cart.map((item) => (
                  <div key={`${item.book.id}-${item.binding}`} className="pt-3 first:pt-0 flex items-start gap-3">
                    <div className="w-14 shrink-0 shadow-sm rounded-lg overflow-hidden">
                      <BookCover book={item.book} size="sm" />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold text-[var(--text-main)] line-clamp-1">{item.book.title}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">{item.binding}</p>
                      <div className="flex items-center justify-between mt-1 text-[var(--text-muted)]">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-bold text-[var(--text-main)]">
                          Rs. {(item.book.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. LANKA20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] outline-none font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full text-xs font-bold bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] pill-btn cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[var(--text-main)]">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promotional Discount (20%)</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Island-wide Courier ({district})</span>
                  <span className="font-semibold text-[var(--text-main)]">
                    {isFreeShipping ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Total Amount (LKR)</span>
                  <span className="text-[#e60023]">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Archival Quality & Courier Assurance Card */}
            <div className="p-5 rounded-3xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-3 text-xs">
              <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                <span>🛡️</span> Shastraloka Literary Guarantee
              </h4>
              <ul className="space-y-1.5 text-[var(--text-muted)]">
                <li>• Archival acid-free paper preservation guarantee</li>
                <li>• Free returns within 7 days if defective binding</li>
                <li>• Verified Sri Lanka Post & Domestic Express couriers</li>
              </ul>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
