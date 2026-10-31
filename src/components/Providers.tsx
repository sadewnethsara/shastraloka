'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { AppProvider, useApp } from '../context/AppContext';
import Toast from './Toast';

// On-demand lazy-loaded modals & drawers so their JS and assets are NOT downloaded upfront
const BookModal = dynamic(() => import('./BookModal'), { ssr: false });
const BoardsModal = dynamic(() => import('./BoardsModal'), { ssr: false });
const AuthModal = dynamic(() => import('./AuthModal'), { ssr: false });
const ConfirmDialog = dynamic(() => import('./ConfirmDialog'), { ssr: false });
const MiniBagRail = dynamic(() => import('./MiniBagRail'), { ssr: false });
const HurryUrgencyCard = dynamic(() => import('./HurryUrgencyCard'), { ssr: false });

function MiniBagRailWrapper() {
  const { showMiniBagRail } = useApp();
  const pathname = usePathname();

  // Hide mini bag rail only on dedicated bag page and checkout flow
  const isHiddenPage = pathname === '/bag' || pathname.startsWith('/checkout');

  if (!showMiniBagRail || isHiddenPage) return null;

  return <MiniBagRail />;
}

function ProvidersContent({ children }: { children: React.ReactNode }) {
  const {
    selectedBook,
    isBoardsModalOpen,
    authModalMode,
    confirmDialog,
    bagCount,
  } = useApp();

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg-main)] text-[var(--text-main)] w-full max-w-full overflow-x-clip">
        {/* Left Column: Page Content */}
        <div className="flex-1 min-w-0 w-full max-w-full overflow-x-clip">
          {children}
        </div>

        {/* Right Mini Bag Rail - Lazy-loaded only when opened */}
        <MiniBagRailWrapper />
      </div>

      {/* Heavy Modals & Overlays mounted and downloaded strictly on demand */}
      {selectedBook && <BookModal />}
      {isBoardsModalOpen && <BoardsModal />}
      {authModalMode && <AuthModal />}
      {confirmDialog && <ConfirmDialog />}
      <Toast />
      {bagCount > 0 && <HurryUrgencyCard />}
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
