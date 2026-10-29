'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppProvider, useApp } from '../context/AppContext';
import BoardsModal from './BoardsModal';
import BookModal from './BookModal';
import Toast from './Toast';
import MiniBagRail from './MiniBagRail';
import HurryUrgencyCard from './HurryUrgencyCard';
import AuthModal from './AuthModal';

function MiniBagRailWrapper() {
  const { showMiniBagRail } = useApp();
  const pathname = usePathname();

  // Hide mini bag rail on landing page ('/'), dedicated bag page, and checkout flow
  const isLandingPage = !pathname || pathname === '/';
  const isHiddenPage = isLandingPage || pathname === '/bag' || pathname.startsWith('/checkout');

  if (!showMiniBagRail || isHiddenPage) return null;

  return <MiniBagRail />;
}

function ProvidersContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex bg-[var(--bg-main)] text-[var(--text-main)]">
        {/* Left Column: Page Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* Right Mini Bag Rail - Hidden on landing page */}
        <React.Suspense fallback={null}>
          <MiniBagRailWrapper />
        </React.Suspense>
      </div>
      <BookModal />
      <BoardsModal />
      <AuthModal />
      <Toast />
      <HurryUrgencyCard />
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ProvidersContent>{children}</ProvidersContent>
    </AppProvider>
  );
}
