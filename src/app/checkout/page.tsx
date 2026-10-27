'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCover from '../../components/BookCover';
import { useApp } from '../../context/AppContext';
import {
  IconBag,
  IconLock,
  IconMapPin,
  IconCreditCard,
  IconCheck,
  IconBuilding,
  IconShieldCheck,
  IconPhone,
  IconTruck,
  IconArrowLeft,
} from '../../components/Icons';

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
  const { bag, bagTotal, placeOrder, showToast } = useApp();

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
  const isFreeShipping = bagTotal >= 5000;
  const shippingFee = isFreeShipping ? 0 : selectedDistrictData.rate;
  const discountAmount = Math.round((bagTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, bagTotal - discountAmount) + shippingFee;

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
        deliveryNotes,
      },
      paymentMethod,
      shippingDistrict: district,
      shippingFee,
    });

    showToast(`Order confirmed! Tracking code: ${order.id}`);
    router.push(`/orders/${order.id}`);
  };

  if (bag.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <Header />
        <div className="max-w-md mx-auto py-24 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] flex items-center justify-center text-[#F1641E] mx-auto">
            <IconBag size={32} />
          </div>
          <h2 className="font-serif font-bold text-2xl">Your Bag is Empty</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Explore our catalog to add rare Sri Lankan chronicles before checking out.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs transition-colors"
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
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <IconLock size={13} />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </span>
                <span className="text-xs text-[var(--text-muted)]">• Sri Lanka Island-wide Delivery</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[var(--text-main)] mt-1">
                Order Delivery & Checkout
              </h1>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
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

              <span className="text-[var(--text-muted)]">&rarr;</span>

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

              <span className="text-[var(--text-muted)]">&rarr;</span>

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

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Multi-Step Forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: Delivery Address in Sri Lanka */}
            {step === 1 && (
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1c1c21] border border-[var(--border-subtle)] shadow-sm space-y-6 animate-slide-up">
                
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                      <IconMapPin size={18} className="text-[#a66523]" />
                      <span>Step 1: Delivery Destination (Sri Lanka)</span>
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Enter your address for courier dispatch with protective archival packaging.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[var(--text-main)] mb-1">Full Recipient Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[var(--text-main)] mb-1">Sri Lanka Phone Number *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+94 7X XXX XXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[var(--text-main)] mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[var(--text-main)] mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-[var(--text-main)] mb-1">City / Town *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[var(--text-main)] mb-1">District *</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none cursor-pointer"
                      >
                        {SRI_LANKA_DISTRICTS.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.name} ({d.province} - Rs. {d.rate})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[var(--text-main)] mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[var(--text-main)] mb-1">Delivery Instructions (Optional)</label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                    />
                  </div>
                </div>

                {/* District Shipping Badge */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[var(--text-main)]">
                      Courier to {selectedDistrictData.name} ({selectedDistrictData.province} Province)
                    </span>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      Estimated Delivery: {selectedDistrictData.time} via Domestic Express Courier
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[var(--text-main)]">
                      {isFreeShipping ? 'FREE' : `Rs. ${selectedDistrictData.rate}`}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      if (!fullName || !phone || !address) {
                        showToast('Please fill all required delivery details');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <span>&rarr;</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1c1c21] border border-[var(--border-subtle)] shadow-sm space-y-6 animate-slide-up">
                
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                      <IconCreditCard size={18} className="text-[#a66523]" />
                      <span>Step 2: Payment Method</span>
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Choose Cash on Delivery (COD), Card, or Bank Transfer.
                    </p>
                  </div>
                </div>

                {/* Payment Options Radio Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#e60023] bg-red-50/50 dark:bg-red-950/20'
                        : 'border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconTruck size={18} className="text-[#a66523]" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-[#e60023] bg-[#e60023]' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <h4 className="font-bold text-xs text-[var(--text-main)]">Cash on Delivery</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Pay in cash to courier</p>
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#e60023] bg-red-50/50 dark:bg-red-950/20'
                        : 'border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconCreditCard size={18} className="text-[#a66523]" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#e60023] bg-[#e60023]' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <h4 className="font-bold text-xs text-[var(--text-main)]">Debit / Credit Card</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Visa, Mastercard, Amex</p>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#e60023] bg-red-50/50 dark:bg-red-950/20'
                        : 'border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconBuilding size={18} className="text-[#a66523]" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'bank' ? 'border-[#e60023] bg-[#e60023]' : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'bank' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <h4 className="font-bold text-xs text-[var(--text-main)]">Bank Transfer</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">BOC, Commercial Bank</p>
                  </div>

                </div>

                {/* Card Fields Form if Card Selected */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-3.5 text-xs animate-slide-up">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-main)]">Cardholder Information</span>
                      <button
                        type="button"
                        onClick={handleFillDemoCard}
                        className="text-[11px] font-semibold text-[#e60023] hover:underline cursor-pointer"
                      >
                        Fill Demo Card
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] font-mono outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Details */}
                {paymentMethod === 'bank' && (
                  <div className="p-4 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-2 text-xs">
                    <p className="font-semibold text-[var(--text-main)]">Bank Account Details for Direct Deposit:</p>
                    <div className="space-y-1 font-mono text-[11px] text-[var(--text-muted)]">
                      <p>Bank: Commercial Bank of Ceylon PLC</p>
                      <p>Account Name: Shastraloka Classical Publications</p>
                      <p>Account Number: 1000 892 411</p>
                      <p>Branch: Colombo 07 Branch</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    &larr; Back to Delivery
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-2"
                  >
                    <span>Review Order</span>
                    <span>&rarr;</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Review & Confirm */}
            {step === 3 && (
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1c1c21] border border-[var(--border-subtle)] shadow-sm space-y-6 animate-slide-up">
                
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                      <IconCheck size={18} className="text-[#a66523]" />
                      <span>Step 3: Review & Place Order</span>
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Verify your delivery address, selected manuscripts, and total before confirming.
                    </p>
                  </div>
                </div>

                {/* Destination & Payment Summary Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-1">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      Delivery Destination
                    </span>
                    <p className="font-semibold text-[var(--text-main)]">{fullName}</p>
                    <p className="text-[var(--text-muted)]">{address}, {city}</p>
                    <p className="text-[var(--text-muted)]">{district} District ({postalCode})</p>
                    <p className="text-[var(--text-muted)] flex items-center gap-1.5 pt-1">
                      <IconPhone size={12} />
                      <span>{phone}</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-1">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      Payment Choice
                    </span>
                    <p className="font-semibold text-[var(--text-main)] capitalize">
                      {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Online Card Payment' : 'Direct Bank Deposit'}
                    </p>
                    <p className="text-[var(--text-muted)]">
                      {paymentMethod === 'cod' ? 'Pay upon courier arrival' : 'Verified payment'}
                    </p>
                    <div className="pt-2 flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      <IconShieldCheck size={13} />
                      <span>100% Certified Courier Guarantee</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    &larr; Back to Payment
                  </button>

                  <button
                    onClick={handleConfirmOrder}
                    className="px-7 py-3 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-colors"
                  >
                    Confirm & Place Order (Rs. {finalTotal.toLocaleString()})
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1c1c21] border border-[var(--border-subtle)] shadow-sm space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <h3 className="font-serif font-bold text-base text-[var(--text-main)]">
                  Bag Summary ({bag.reduce((a, b) => a + b.quantity, 0)} Items)
                </h3>
                <Link href="/" className="text-xs text-[#F1641E] font-semibold hover:underline">
                  + Add More Books
                </Link>
              </div>

              {/* Items List with Real Photographic Thumbnails */}
              <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border-subtle)] pr-1 space-y-3">
                {bag.map((item) => (
                  <div key={`${item.book.id}-${item.binding}`} className="pt-3 first:pt-0 flex items-start gap-3">
                    <div className="w-12 h-16 rounded-md overflow-hidden bg-neutral-100 shrink-0 shadow-2xs">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs min-w-0">
                      <h4 className="font-serif font-bold text-[var(--text-main)] line-clamp-1">{item.book.title}</h4>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">{item.binding}</p>
                      <div className="flex items-center justify-between mt-1 text-[var(--text-muted)]">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-semibold text-[var(--text-main)]">
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
                  className="flex-1 px-3.5 py-1.5 text-xs rounded-full bg-[var(--bg-input)] border border-[var(--border-subtle)] outline-none font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-badge)] text-[var(--bg-main)] cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[var(--text-main)]">Rs. {bagTotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>Promotional Discount (20%)</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Island-wide Courier ({district})</span>
                  <span className="font-medium text-[var(--text-main)]">
                    {isFreeShipping ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Total Amount (LKR)</span>
                  <span className="text-[#e60023]">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Archival Quality & Courier Assurance Card (Surface Cream Token) */}
            <div className="p-4 rounded-xl bg-[#fdf6e8] dark:bg-[#201a14] border border-[#f5e8c8] dark:border-[#3a2e22] space-y-2.5 text-xs">
              <h4 className="font-bold text-[#a66523] dark:text-amber-400 flex items-center gap-2">
                <IconShieldCheck size={16} />
                <span>Shastraloka Literary Guarantee</span>
              </h4>
              <ul className="space-y-1 text-[#3f3f3f] dark:text-neutral-300">
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
