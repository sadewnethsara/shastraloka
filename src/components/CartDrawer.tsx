'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal, showToast } = useApp();
  
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!isCartOpen) return null;

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

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount;
  const freeShippingThreshold = 5000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - finalTotal);
  const standardShippingFee = 350;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-full bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl flex flex-col justify-between border-l border-[var(--border-subtle)] animate-slide-up"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e60023] text-white flex items-center justify-center font-bold text-sm">
              🛍
            </div>
            <h3 className="font-serif font-black text-xl text-[var(--text-main)]">
              Shopping Bag
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--bg-input)]">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] flex items-center justify-center text-sm font-bold pill-btn cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Empty Bag View */}
        {cart.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] flex items-center justify-center text-3xl">
              📖
            </div>
            <h4 className="font-serif font-bold text-lg text-[var(--text-main)]">
              Your bag is currently empty
            </h4>
            <p className="text-xs text-[var(--text-muted)] max-w-xs">
              Scroll through our visual catalog to collect rare Sri Lankan chronicles and classical literature.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-5 py-2.5 rounded-full bg-[#e60023] text-white font-bold text-xs pill-btn cursor-pointer"
            >
              Explore Feed
            </button>
          </div>
        ) : (
          /* Items List */
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Free Shipping Progress */}
            <div className="p-3.5 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] text-xs">
              {amountToFreeShipping === 0 ? (
                <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>✓</span> Free Island-wide Delivery Unlocked!
                </div>
              ) : (
                <div>
                  Add <span className="font-bold text-[#e60023]">Rs. {amountToFreeShipping.toLocaleString()}</span> more for free island-wide delivery.
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-[#e60023] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (finalTotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div 
                key={`${item.book.id}-${item.binding}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
              >
                {/* Book Mini Visual */}
                <div 
                  className="w-14 h-20 rounded-xl p-1.5 flex flex-col justify-between text-center text-white shrink-0 shadow-sm"
                  style={{ background: item.book.bgGradient }}
                >
                  <span className="text-[8px] font-bold text-amber-200">✦</span>
                  <span className="font-sinhala font-bold text-xs truncate text-amber-200">{item.book.sinhalaTitle}</span>
                  <span className="text-[8px] text-white/80">Rs.{item.book.price}</span>
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[var(--text-main)] truncate">
                    {item.book.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">
                    {item.binding}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-[var(--border-subtle)] rounded-full px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.book.id, -1)}
                        className="text-xs font-bold hover:text-[#e60023] cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, 1)}
                        className="text-xs font-bold hover:text-[#e60023] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[var(--text-main)]">
                        Rs. {(item.book.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.book.id)}
                  className="text-xs text-[var(--text-dim)] hover:text-[#e60023] p-1 cursor-pointer"
                  title="Remove from bag"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder='Promo code (try "LANKA20")'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-full bg-[var(--bg-input)] outline-none text-[var(--text-main)] uppercase font-semibold"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full text-xs font-bold bg-[var(--bg-badge)] text-[var(--bg-main)] pill-btn cursor-pointer"
              >
                Apply
              </button>
            </form>
          </div>
        )}

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-wash)] space-y-3">
            <div className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Island-wide Delivery</span>
                <span>{amountToFreeShipping === 0 ? 'FREE' : `Rs. ${standardShippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                <span>Total (LKR)</span>
                <span>Rs. {(finalTotal + (amountToFreeShipping === 0 ? 0 : standardShippingFee)).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-sm pill-btn shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Proceed to Checkout (COD / Card)</span>
              <span>→</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
