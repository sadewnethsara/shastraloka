'use client';

import React from 'react';
import { AppProvider } from '../context/AppContext';
import BoardsModal from './BoardsModal';
import BookModal from './BookModal';
import Toast from './Toast';
import MiniBagRail from './MiniBagRail';
import { useApp } from '../context/AppContext';

function ProvidersContent({ children }: { children: React.ReactNode }) {
  const { showMiniBagRail } = useApp();

  return (
    <>
      <div className="min-h-screen flex bg-white dark:bg-[#0a0a0c]">
        {/* Left Column: Page Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* Right Mini Bag Rail - Conditionally rendered */}
        {showMiniBagRail && <MiniBagRail />}
      </div>
      <BookModal />
      <BoardsModal />
      <Toast />
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
