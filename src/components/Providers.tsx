'use client';

import React from 'react';
import { AppProvider } from '../context/AppContext';
import BoardsModal from './BoardsModal';
import BookModal from './BookModal';
import Toast from './Toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <BookModal />
      <BoardsModal />
      <Toast />
    </AppProvider>
  );
}
