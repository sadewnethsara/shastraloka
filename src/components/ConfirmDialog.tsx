'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ConfirmDialog() {
  const { confirmDialog, closeConfirmation } = useApp();

  useEffect(() => {
    if (!confirmDialog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeConfirmation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmDialog, closeConfirmation]);

  if (!confirmDialog) return null;

  const handleConfirm = () => {
    const callback = confirmDialog.onConfirm;
    closeConfirmation();
    callback();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fade-in"
      onClick={closeConfirmation}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div
        className="relative w-full max-w-[400px] rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 shadow-2xl animate-slide-up text-[var(--text-main)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right Close Button */}
        <button
          type="button"
          onClick={closeConfirmation}
          aria-label="Close confirmation dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-[var(--color-danger-bg)] text-[var(--color-danger)] flex items-center justify-center shrink-0 border border-[var(--color-danger)]/20">
            {confirmDialog.variant === 'warning' ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <h3
              id="confirm-dialog-title"
              className="text-base sm:text-lg font-bold font-heading text-[var(--text-main)] leading-snug"
            >
              {confirmDialog.title || 'Are you sure?'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 leading-relaxed">
              {confirmDialog.message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeConfirmation}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[var(--text-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] transition cursor-pointer"
          >
            {confirmDialog.cancelLabel || 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#e60023] hover:bg-[#ad081b] shadow-sm transition cursor-pointer"
          >
            {confirmDialog.confirmLabel || 'Yes, delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
