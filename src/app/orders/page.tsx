'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useApp } from '../../context/AppContext';
import { IconTruck, IconArrowLeft } from '../../components/Icons';

export default function OrdersPage() {
  const { orders } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      <main className="page-container py-8 sm:py-12">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-0.5 rounded-full">
                Island-wide Courier
              </span>
              <span className="text-xs text-[var(--text-muted)]">• Shastraloka Dispatch</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[var(--text-main)] mt-1">
              My Orders & Dispatches
            </h1>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <IconArrowLeft size={13} />
            <span>Back to Feed</span>
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] text-[#a66523] flex items-center justify-center mx-auto">
              <IconTruck size={28} />
            </div>
            <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">
              No Orders Registered Yet
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
              Your registered manuscript orders will appear here with live tracking, delivery dates, and archival invoices.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Explore Treatises
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const totalItems = order.items.reduce((a, b) => a + b.quantity, 0);

              const statusColor =
                order.status === 'delivered'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : order.status === 'dispatched'
                  ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';

              const statusLabel =
                order.status === 'delivered'
                  ? 'Delivered to Doorstep'
                  : order.status === 'dispatched'
                  ? 'Dispatched via Courier'
                  : 'Confirmed & In Binding';

              return (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1c1c21] border border-[var(--border-subtle)] shadow-xs space-y-4 transition-all hover:border-[var(--text-muted)]"
                >
                  {/* Top Bar: Order ID, Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[var(--text-main)]">
                          Order #{order.id}
                        </span>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-4 py-2 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        Live Tracking & Invoice &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Body: Item Thumbnails and Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Item Previews with Real Photographs */}
                    <div className="md:col-span-8 flex items-center gap-3 overflow-x-auto py-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={`${item.book.id}-${idx}`}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] shrink-0 max-w-[240px]"
                        >
                          <div className="w-10 h-14 shrink-0 rounded-md overflow-hidden bg-neutral-100 shadow-2xs">
                            <img src={item.book.coverImage} alt={item.book.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-xs truncate">
                            <p className="font-serif font-bold text-[var(--text-main)] truncate">{item.book.title}</p>
                            <span className="text-[10px] text-[var(--text-muted)] block">
                              Qty: {item.quantity} • {item.binding}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total & Delivery Target */}
                    <div className="md:col-span-4 flex flex-col md:items-end text-xs space-y-1">
                      <div className="text-[var(--text-muted)]">
                        Total Amount ({totalItems} items):
                      </div>
                      <div className="font-serif font-bold text-lg sm:text-xl text-[var(--text-main)]">
                        Rs. {order.total.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                        Estimated: {order.estimatedDelivery} ({order.customer.district})
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
