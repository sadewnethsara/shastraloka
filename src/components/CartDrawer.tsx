'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/navigation';
import { IconBag, IconClose, IconBook, IconCheck } from './Icons';

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
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-full bg-white dark:bg-[#1c1c21] text-[var(--text-main)] shadow-2xl flex flex-col justify-between border-l border-[var(--border-subtle)] animate-slide-up"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e60023] text-white flex items-center justify-center">
              <IconBag size={16} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[var(--text-main)]">
              Shopping Bag
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-input)]">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] flex items-center justify-center cursor-pointer transition-colors"
          >
            <IconClose size={15} />
          </button>
        </div>

        {/* Empty Bag View */}
        {cart.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] text-[#a66523] flex items-center justify-center">
              <IconBook size={28} />
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--text-main)]">
              Your bag is currently empty
            </h4>
            <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
              Explore our collection of authentic Sri Lankan chronicles, classical poetry, and historical manuscripts.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-5 py-2 rounded-full bg-[#e60023] text-white font-semibold text-xs cursor-pointer hover:bg-[#ad081b] transition-colors"
            >
              Explore Feed
            </button>
          </div>
        ) : (
          /* Items List */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            
            {/* Free Shipping Progress */}
            <div className="p-3 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] text-xs">
              {amountToFreeShipping === 0 ? (
                <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <IconCheck size={14} />
                  <span>Free Island-wide Delivery Unlocked!</span>
                </div>
              ) : (
                <div>
                  Add <span className="font-bold text-[#e60023]">Rs. {amountToFreeShipping.toLocaleString()}</span> more for free delivery.
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-[#e60023] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (finalTotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items with Real Photographs */}
            {cart.map((item) => (
              <div 
                key={`${item.book.id}-${item.binding}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
              >
                {/* Book Mini Photo */}
                <div className="w-12 h-16 rounded-md overflow-hidden bg-neutral-100 shrink-0 shadow-2xs">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-main)] truncate">
                    {item.book.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                    {item.binding}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 border border-[var(--border-subtle)] rounded-full px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.book.id, -1)}
                        className="text-xs font-bold hover:text-[#e60023] cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xs font-semibold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, 1)}
                        className="text-xs font-bold hover:text-[#e60023] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                        Rs. {(item.book.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.book.id)}
                  className="text-xs text-[var(--text-dim)] hover:text-[#e60023] p-1 cursor-pointer transition-colors"
                  title="Remove from bag"
                >
                  <IconClose size={14} />
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
                className="flex-1 px-3.5 py-1.5 text-xs rounded-full bg-[var(--bg-input)] outline-none text-[var(--text-main)] uppercase font-semibold"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-badge)] text-[var(--bg-main)] cursor-pointer"
              >
                Apply
              </button>
            </form>
          </div>
        )}

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-wash)] space-y-3">
            <div className="space-y-1.5 text-xs text-[var(--text-muted)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
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
              className="w-full py-3.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
              <span>Proceed to Checkout (COD / Card)</span>
              <span>&rarr;</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
