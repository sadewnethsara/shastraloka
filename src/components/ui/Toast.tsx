'use client';

import React, { useEffect } from 'react';

export interface ToastProps {
  text: string;
  type?: 'info' | 'success' | 'error';
  duration?: number;
  onDismiss?: () => void;
  action?: {
    text: string;
    onClick: () => void;
  };
}

export function Toast({
  text,
  type = 'info',
  duration = 3000,
  onDismiss,
  action,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const bgStyles = {
    info: 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)]',
    success: 'bg-[var(--color-success)] text-white',
    error: 'bg-[var(--color-danger)] text-white',
  }[type];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-[var(--radius-card,1rem)] shadow-xl font-medium text-xs sm:text-sm ${bgStyles}`}
      >
        <span>{text}</span>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="underline font-bold hover:opacity-80 ml-2"
          >
            {action.text}
          </button>
        )}
      </div>
    </div>
  );
}

export default Toast;
