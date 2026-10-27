'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookCover from '../../../components/BookCover';
import { useApp } from '../../../context/AppContext';

function OrderTrackingContent() {
  const params = useParams();
  const { getOrder, showToast } = useApp();

  const orderId = (params?.id as string) || '';
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <Header />
        <div className="max-w-md mx-auto py-24 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] flex items-center justify-center text-3xl mx-auto">
            🔍
          </div>
          <h2 className="font-serif font-black text-2xl">Order #{orderId} Not Found</h2>
          <p className="text-xs text-[var(--text-muted)]">
            We could not locate this order ID in your session. Please check your tracking number.
          </p>
          <Link
            href="/orders"
            className="inline-block px-6 py-3 rounded-full bg-[#e60023] text-white font-bold text-sm pill-btn cursor-pointer shadow-md"
          >
            View All Orders
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Tracking Milestones
  const steps = [
    {
      id: 'step-1',
      title: 'Order Placed & Confirmed',
      desc: 'Order registered in Colombo Archival Repository',
      date: new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      completed: true,
      icon: '✓',
    },
    {
      id: 'step-2',
      title: 'Manuscript Binding & Archival Inspection',
      desc: 'Embossing 24K gold filigree & applying acid-free protective seal',
      date: 'Completed at 09:30 AM',
      completed: true,
      icon: '📖',
    },
    {
      id: 'step-3',
      title: 'Handed to Certified Courier',
      desc: `Waybill: ${order.trackingNumber} via Sri Lanka Express`,
      date: order.status === 'dispatched' || order.status === 'delivered' ? 'In Transit' : 'Scheduled',
      completed: order.status === 'dispatched' || order.status === 'delivered',
      icon: '🚚',
    },
    {
      id: 'step-4',
      title: 'Out for Delivery',
      desc: `Courier dispatching to ${order.customer.city}, ${order.customer.district}`,
      date: `Estimated: ${order.estimatedDelivery}`,
      completed: order.status === 'delivered',
      icon: '📦',
    },
    {
      id: 'step-5',
      title: 'Delivered to Doorstep',
      desc: 'Archival parcel safely signed & received',
      date: order.status === 'delivered' ? 'Delivered' : 'Pending Delivery',
      completed: order.status === 'delivered',
      icon: '🏡',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/orders" className="text-xs text-[var(--text-muted)] hover:underline">
                ← All Orders
              </Link>
              <span className="text-xs text-[var(--text-muted)]">/</span>
              <span className="text-xs font-bold text-[#e60023]">Tracking #{order.id}</span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[var(--text-main)] mt-1 flex items-center gap-2">
              <span>Order Delivery Timeline</span>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--bg-input)]">
                {order.trackingNumber}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold text-xs pill-btn cursor-pointer flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Print Invoice</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Tracking link copied to clipboard!');
              }}
              className="px-4 py-2.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-xs pill-btn cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>↗</span>
              <span>Share Tracking</span>
            </button>
          </div>
        </div>

        {/* Tracking Timeline Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-xl">
                🚚
              </div>
              <div>
                <p className="font-serif font-black text-lg text-[var(--text-main)]">
                  Dispatch in Progress
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Carrier: <strong>Sri Lanka Certified Express</strong> • Tracking ID: <code className="font-mono text-emerald-600 font-bold">{order.trackingNumber}</code>
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-[var(--text-muted)] block">Estimated Arrival:</span>
              <span className="font-bold text-sm text-[var(--text-main)]">{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Stepper Timeline Visual */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-subtle)]">
            {steps.map((st) => (
              <div key={st.id} className="relative flex items-start gap-4">
                
                {/* Milestone Node */}
                <div
                  className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-colors ${
                    st.completed
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                      : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
                  }`}
                >
                  {st.icon}
                </div>

                {/* Milestone Details */}
                <div className="flex-1 space-y-0.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className={`font-bold text-sm ${st.completed ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                      {st.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-[var(--text-dim)]">{st.date}</span>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed">{st.desc}</p>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* 2-Column: Recipient Details & Itemized Invoice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recipient and Payment details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-4">
              <h3 className="font-serif font-black text-lg text-[var(--text-main)] border-b border-[var(--border-subtle)] pb-3">
                Recipient & Delivery
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[var(--text-muted)] block">Customer Name:</span>
                  <p className="font-bold text-sm text-[var(--text-main)]">{order.customer.fullName}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block">Contact Details:</span>
                  <p className="font-bold text-[var(--text-main)]">📞 {order.customer.phone}</p>
                  <p className="text-[var(--text-muted)]">✉️ {order.customer.email}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block">Postal Address:</span>
                  <p className="font-semibold text-[var(--text-main)]">{order.customer.address}</p>
                  <p className="text-[var(--text-muted)]">{order.customer.city}, {order.customer.district} District ({order.customer.postalCode})</p>
                </div>
                {order.customer.notes && (
                  <div>
                    <span className="text-[var(--text-muted)] block">Delivery Note:</span>
                    <p className="italic text-[var(--text-muted)]">&ldquo;{order.customer.notes}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-4">
              <h3 className="font-serif font-black text-lg text-[var(--text-main)] border-b border-[var(--border-subtle)] pb-3">
                Payment Verification
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Payment Mode:</span>
                  <span className="font-bold uppercase text-[var(--text-main)]">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod === 'card' ? 'Visa / Mastercard' : 'Bank Deposit'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Payment Status:</span>
                  <span className="text-emerald-600 font-bold">
                    {order.paymentMethod === 'cod' ? 'Pay upon delivery' : 'Authorized ✓'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Archival Verification Seal:</span>
                  <span className="text-amber-500 font-bold">Passed Inspection #LK-ARC</span>
                </div>
              </div>
            </div>

          </div>

          {/* Itemized Order Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-5">
              <h3 className="font-serif font-black text-lg text-[var(--text-main)] border-b border-[var(--border-subtle)] pb-3">
                Archival Invoice Manifest
              </h3>

              {/* Items Table */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {order.items.map((item, idx) => (
                  <div key={`${item.book.id}-${idx}`} className="py-3 flex items-start gap-4">
                    <div className="w-16 shrink-0 shadow-sm rounded-lg overflow-hidden">
                      <BookCover book={item.book} size="sm" />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold text-sm text-[var(--text-main)]">{item.book.title}</h4>
                      {item.book.sinhalaTitle && (
                        <p className="font-sinhala text-[#e60023]">{item.book.sinhalaTitle}</p>
                      )}
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Edition: <strong>{item.binding}</strong>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[var(--text-muted)] font-semibold">Quantity: {item.quantity}</span>
                        <span className="font-bold text-[var(--text-main)]">
                          Rs. {(item.book.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Subtotal</span>
                  <span>Rs. {order.subtotal.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promotional Discount (LANKA20)</span>
                    <span>-Rs. {order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Courier Delivery ({order.customer.district})</span>
                  <span>{order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Grand Total (LKR)</span>
                  <span className="text-[#e60023]">Rs. {order.total.toLocaleString()}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center font-bold">Loading Order Dispatch...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
