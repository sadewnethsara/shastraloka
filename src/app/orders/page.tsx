'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookCover from '../../components/BookCover';
import { useApp } from '../../context/AppContext';

export default function OrdersPage() {
  const { orders } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                Island-wide Courier
              </span>
              <span className="text-xs text-[var(--text-muted)]">• Shastraloka Dispatch</span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[var(--text-main)] mt-1">
              My Orders & Dispatches
            </h1>
          </div>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] font-bold text-xs pill-btn"
          >
            ← Back to Feed
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] flex items-center justify-center text-3xl mx-auto">
              📦
            </div>
            <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">
              No Orders Registered Yet
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Your registered manuscript orders will appear here with live tracking, delivery dates, and archival invoices.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-[#e60023] text-white font-bold text-sm pill-btn cursor-pointer shadow-md"
            >
              Explore Treatises
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const totalItems = order.items.reduce((a, b) => a + b.quantity, 0);

              const statusColor =
                order.status === 'delivered'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  : order.status === 'dispatched'
                  ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                  : 'bg-amber-500/10 text-amber-600 border-amber-500/20';

              const statusLabel =
                order.status === 'delivered'
                  ? 'Delivered to Doorstep'
                  : order.status === 'dispatched'
                  ? 'Dispatched via Courier'
                  : 'Confirmed & In Binding';

              return (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl space-y-5 transition-all hover:border-[var(--text-muted)]"
                >
                  {/* Top Bar: Order ID, Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[var(--text-main)]">
                          Order #{order.id}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-4 py-2 rounded-full bg-[#e60023] hover:bg-[#ad081b] text-white font-bold text-xs pill-btn shadow-md transition-all"
                      >
                        Live Tracking & Invoice →
                      </Link>
                    </div>
                  </div>

                  {/* Body: Item Thumbnails and Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Item Previews */}
                    <div className="md:col-span-8 flex items-center gap-3 overflow-x-auto py-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={`${item.book.id}-${idx}`}
                          className="flex items-center gap-2.5 p-2 rounded-2xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] shrink-0 max-w-[240px]"
                        >
                          <div className="w-10 shrink-0 rounded overflow-hidden shadow-xs">
                            <BookCover book={item.book} size="sm" />
                          </div>
                          <div className="text-xs truncate">
                            <p className="font-bold text-[var(--text-main)] truncate">{item.book.title}</p>
                            <span className="text-[10px] text-[var(--text-muted)]">
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
                      <div className="font-serif font-black text-xl text-[var(--text-main)]">
                        Rs. {order.total.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold">
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
