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

  // Hide mini bag rail only on dedicated bag page and checkout flow
  const isHiddenPage = pathname === '/bag' || pathname.startsWith('/checkout');

  if (!showMiniBagRail || isHiddenPage) return null;

  return <MiniBagRail />;
}

function ProvidersContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg-main)] text-[var(--text-main)] w-full max-w-full overflow-x-clip">
        {/* Left Column: Page Content */}
        <div className="flex-1 min-w-0 w-full max-w-full overflow-x-clip">
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
