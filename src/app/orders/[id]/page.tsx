'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useApp } from '../../../context/AppContext';
import {
  IconCheck,
  IconBook,
  IconTruck,
  IconBag,
  IconBuilding,
  IconPrinter,
  IconShare,
  IconPhone,
  IconMail,
  IconArrowLeft,
  IconShieldCheck,
} from '../../../components/Icons';

function OrderDetailContent() {
  const params = useParams();
  const { orders, showToast } = useApp();

  const orderId = (params?.id as string) || '';
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center p-6 text-center">
        <div>
          <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)] flex items-center justify-center mx-auto mb-3">
            <IconTruck size={28} />
          </div>
          <h2 className="font-heading font-bold text-2xl">Order Not Found</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Tracking identifier &ldquo;{orderId}&rdquo; was not found in our dispatch records.
          </p>
          <Link
            href="/orders"
            className="inline-block mt-4 px-5 py-2 rounded-[var(--radius-btn)] bg-[var(--color-primary)] text-white font-semibold text-xs"
          >
            View All Dispatches
          </Link>
        </div>
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
      icon: <IconCheck size={14} />,
    },
    {
      id: 'step-2',
      title: 'Manuscript Binding & Archival Inspection',
      desc: 'Embossing 24K gold filigree & applying acid-free protective seal',
      date: 'Completed at 09:30 AM',
      completed: true,
      icon: <IconBook size={14} />,
    },
    {
      id: 'step-3',
      title: 'Handed to Certified Courier',
      desc: `Waybill: ${order.trackingNumber} via Sri Lanka Express`,
      date: order.status === 'dispatched' || order.status === 'delivered' ? 'In Transit' : 'Scheduled',
      completed: order.status === 'dispatched' || order.status === 'delivered',
      icon: <IconTruck size={14} />,
    },
    {
      id: 'step-4',
      title: 'Out for Delivery',
      desc: `Courier dispatching to ${order.customer.city}, ${order.customer.district}`,
      date: `Estimated: ${order.estimatedDelivery}`,
      completed: order.status === 'delivered',
      icon: <IconBag size={14} />,
    },
    {
      id: 'step-5',
      title: 'Delivered to Doorstep',
      desc: 'Archival parcel safely signed & received',
      date: order.status === 'delivered' ? 'Delivered' : 'Pending Delivery',
      completed: order.status === 'delivered',
      icon: <IconBuilding size={14} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      <main className="page-container py-8 sm:py-12">
        
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/orders" className="text-xs text-[var(--text-muted)] hover:underline flex items-center gap-1">
                <IconArrowLeft size={13} />
                <span>All Orders</span>
              </Link>
              <span className="text-xs text-[var(--text-muted)]">/</span>
              <span className="text-xs font-semibold text-[var(--color-primary)]">Tracking #{order.id}</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--text-main)] mt-1 flex items-center gap-2.5">
              <span>Order Delivery Timeline</span>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[var(--bg-input)]">
                {order.trackingNumber}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-[var(--radius-btn)] bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-semibold text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <IconPrinter size={15} />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Tracking link copied to clipboard!');
              }}
              className="px-4 py-2 rounded-[var(--radius-btn)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-xs cursor-pointer shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <IconShare size={15} />
              <span>Share Tracking</span>
            </button>
          </div>
        </div>

        {/* Tracking Timeline Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center justify-center font-bold">
                <IconTruck size={20} />
              </div>
              <div>
                <p className="font-heading font-bold text-base sm:text-lg text-[var(--text-main)]">
                  Sri Lanka Certified Express Courier
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Carrier: Sri Lanka Post & Domestic Express Network
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-[var(--text-muted)]">Estimated Arrival:</span>
              <p className="font-bold text-sm text-[var(--color-primary)]">{order.estimatedDelivery}</p>
            </div>
          </div>

          {/* Stepper Timeline Visual */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--border-subtle)]">
            {steps.map((st) => (
              <div key={st.id} className="relative flex items-start gap-4">
                
                {/* Checkpoint Dot / Icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                    st.completed
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {st.icon}
                </div>

                {/* Milestone Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className={`text-xs sm:text-sm font-bold ${st.completed ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                      {st.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">{st.date}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{st.desc}</p>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* 2-Column: Recipient Details & Itemized Invoice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recipient and Payment details */}
          <div className="lg:col-span-5 space-y-6">
            
<div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-[var(--text-main)] border-b border-[var(--border-subtle)] pb-3">
                Recipient & Delivery
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Customer Name:</span>
                  <p className="font-bold text-sm text-[var(--text-main)]">{order.customer.fullName}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Contact Details:</span>
                  <p className="font-medium text-[var(--text-main)] flex items-center gap-1.5 pt-0.5">
                    <IconPhone size={13} />
                    <span>{order.customer.phone}</span>
                  </p>
                  <p className="text-[var(--text-muted)] flex items-center gap-1.5 pt-0.5">
                    <IconMail size={13} />
                    <span>{order.customer.email}</span>
                  </p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[11px]">Postal Address:</span>
                  <p className="font-medium text-[var(--text-main)]">{order.customer.address}</p>
                  <p className="text-[var(--text-muted)]">{order.customer.city}, {order.customer.district} District ({order.customer.postalCode})</p>
                </div>
                {order.customer.notes && (
                  <div>
                    <span className="text-[var(--text-muted)] block text-[11px]">Delivery Note:</span>
                    <p className="italic text-[var(--text-muted)]">&ldquo;{order.customer.notes}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>

<div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-[var(--text-main)] border-b border-[var(--border-subtle)] pb-3">
                Payment Verification
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Payment Mode:</span>
                  <span className="font-semibold uppercase text-[var(--text-main)]">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod === 'card' ? 'Visa / Mastercard' : 'Bank Deposit'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Payment Status:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <IconCheck size={13} />
                    <span>{order.paymentMethod === 'cod' ? 'Pay upon delivery' : 'Authorized'}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Archival Verification Seal:</span>
                  <span className="text-[var(--brand-brown)] font-semibold flex items-center gap-1">
                    <IconShieldCheck size={13} />
                    <span>Passed Inspection #LK-ARC</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Itemized Order Breakdown with Real Photographs */}
          <div className="lg:col-span-7 space-y-6">
            
<div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-[var(--text-main)] border-b border-[var(--border-subtle)] pb-3">
                Archival Invoice Manifest
              </h3>

              {/* Items Table */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {order.items.map((item, idx) => (
                  <div key={`${item.book.id}-${idx}`} className="py-3 flex items-start gap-4">
                    <div className="w-14 h-20 rounded-md overflow-hidden bg-neutral-100 shrink-0 shadow-2xs">
                      <img src={item.book.coverImage} alt={item.book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-heading font-bold text-sm text-[var(--text-main)]">{item.book.title}</h4>
                      {item.book.category && (
                        <p className="text-[var(--color-primary)] font-medium">{item.book.category}</p>
                      )}
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Edition: <strong>{item.binding}</strong>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[var(--text-muted)] font-medium">Quantity: {item.quantity}</span>
                        <span className="font-bold text-[var(--text-main)]">
                          Rs. {(item.book.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1.5 text-xs text-[var(--text-muted)]">
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span>{order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[var(--text-main)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Grand Total (LKR):</span>
                  <span className="text-[var(--color-primary)]">Rs. {order.total.toLocaleString()}</span>
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

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center font-bold">Loading Order Dispatch...</div>}>
      <OrderDetailContent />
    </Suspense>
  );
}
