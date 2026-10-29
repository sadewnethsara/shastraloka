'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useApp, AuthModalMode } from '../context/AppContext';

interface AuthModalProps {
  /** Optional standalone mode when rendered directly on /login, /register, or /forgot-password */
  standaloneMode?: 'login' | 'register' | 'forgot-password';
  onStandaloneClose?: () => void;
}

export default function AuthModal({ standaloneMode, onStandaloneClose }: AuthModalProps = {}) {
  const router = useRouter();
  const { authModalMode, openAuthModal, closeAuthModal, showToast } = useApp();

  const activeMode: AuthModalMode = standaloneMode || authModalMode;

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [resetSent, setResetSent] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!activeMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (standaloneMode && onStandaloneClose) {
          onStandaloneClose();
        } else {
          closeAuthModal();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, standaloneMode, onStandaloneClose, closeAuthModal]);

  if (!activeMode) return null;

  const handleClose = () => {
    setResetSent(false);
    if (standaloneMode) {
      if (onStandaloneClose) {
        onStandaloneClose();
      } else {
        router.push('/');
      }
    } else {
      closeAuthModal();
    }
  };

  const switchMode = (nextMode: 'login' | 'register' | 'forgot-password') => {
    setResetSent(false);
    if (standaloneMode) {
      if (nextMode === 'login') router.push('/login');
      else if (nextMode === 'register') router.push('/register');
      else router.push('/forgot-password');
    } else {
      openAuthModal(nextMode);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your email address');
      return;
    }
    showToast(`Welcome back to Shastraloka, ${email.split('@')[0]}!`);
    closeAuthModal();
    if (standaloneMode) {
      router.push('/profile');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !firstName.trim() || !password.trim()) {
      showToast('Please fill in all required fields');
      return;
    }
    showToast(`Welcome to Shastraloka, ${firstName}! Your reader account is ready.`);
    closeAuthModal();
    if (standaloneMode) {
      router.push('/profile');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your email address');
      return;
    }
    setResetSent(true);
    showToast(`Password reset link dispatched to ${email}`);
  };

  const handleSocialAuth = (provider: string) => {
    showToast(`Signed in with ${provider}`);
    closeAuthModal();
    if (standaloneMode) {
      router.push('/profile');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={
        activeMode === 'login'
          ? 'Sign in to Shastraloka'
          : activeMode === 'register'
          ? 'Create your Shastraloka account'
          : 'Reset your password'
      }
    >
      {/* Dimmed Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] transition-opacity"
      />

      {/* Dialog on Desktop (sm:rounded-[28px] max-w-[392px]) / Bottom Sheet on Mobile (rounded-t-[28px] w-full) */}
      <div className="relative z-10 w-full sm:max-w-[392px] bg-[var(--bg-surface)] text-[var(--text-main)] rounded-t-[28px] sm:rounded-[28px] border-t sm:border border-[var(--border-subtle)] px-6 pt-3.5 pb-8 sm:p-8 shadow-[0_-14px_44px_rgba(0,0,0,0.3)] sm:shadow-[0_24px_64px_rgba(0,0,0,0.35)] max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto sm:overflow-visible animate-slide-up">
        {/* Mobile Bottom Sheet Drag Handle + Mobile Close Button */}
        <div className="sm:hidden flex items-center justify-between mb-2">
          <div className="w-8" />
          <div className="w-11 h-1.5 rounded-full bg-[var(--border-strong)] opacity-60" />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bottom sheet"
            className="w-8 h-8 rounded-full bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Floating Circular Close (X) Button Outside Top-Right Corner (Matches Screenshot 075847 & 075903) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="hidden sm:flex absolute -right-14 top-0 w-11 h-11 rounded-full bg-stone-500/55 hover:bg-stone-600/75 border-2 border-white/90 text-white items-center justify-center shadow-lg transition cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Top Orange Square Brand Icon [ශා] */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-10 h-10 rounded-md bg-[#F1641E] text-white flex items-center justify-center font-heading font-bold font-bold text-lg shadow-xs mb-3 select-none">
            ශා
          </div>

          {activeMode === 'login' && (
            <>
              <h2 className="font-heading font-bold text-[24px] sm:text-[26px] leading-tight font-normal text-[var(--text-main)]">
                Special starts on Shastraloka
              </h2>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] mt-1.5">
                New to Shastraloka?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="font-medium text-[var(--text-main)] underline underline-offset-4 hover:text-[#F1641E] cursor-pointer"
                >
                  Create an account
                </button>
              </p>
            </>
          )}

          {activeMode === 'register' && (
            <>
              <h2 className="font-heading font-bold text-[24px] sm:text-[26px] leading-tight font-normal text-[var(--text-main)]">
                Create your account
              </h2>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] mt-1">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-medium text-[var(--text-main)] underline underline-offset-4 hover:text-[#F1641E] cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {activeMode === 'forgot-password' && (
            <>
              <h2 className="font-heading font-bold text-[24px] sm:text-[26px] leading-tight font-normal text-[var(--text-main)]">
                Reset your password
              </h2>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] mt-1 max-w-[300px]">
                Enter the email linked to your Shastraloka account and we&apos;ll send a recovery link.
              </p>
            </>
          )}
        </div>

        {/* =========================================================
            MODE 1: SIGN IN FORM (Matches Screenshot 075847)
           ========================================================= */}
        {activeMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-[13px] font-semibold text-[var(--text-main)] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
              />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--text-main)]"
                />
                <span className="text-xs sm:text-[13px] text-[var(--text-main)]">Stay signed in</span>
              </label>

              <button
                type="button"
                onClick={() => switchMode('forgot-password')}
                className="text-xs text-[var(--text-muted)] underline hover:text-[var(--text-main)] cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full h-11 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                email.trim()
                  ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] hover:opacity-90'
                  : 'bg-stone-300/80 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-[var(--pill-active-bg)] hover:text-[var(--pill-active-text)]'
              }`}
            >
              Sign in
            </button>
          </form>
        )}

        {/* =========================================================
            MODE 2: CREATE YOUR ACCOUNT FORM (Matches Screenshot 075903)
           ========================================================= */}
        {activeMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs sm:text-[13px] font-semibold text-[var(--text-main)] mb-1">
                Email address<span className="text-[#e60023] ml-0.5">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-[13px] font-semibold text-[var(--text-main)] mb-1">
                First name<span className="text-[#e60023] ml-0.5">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-[13px] font-semibold text-[var(--text-main)] mb-1">
                Password<span className="text-[#e60023] ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer mt-2"
            >
              Continue
            </button>
          </form>
        )}

        {/* =========================================================
            MODE 3: FORGOT PASSWORD FORM
           ========================================================= */}
        {activeMode === 'forgot-password' && (
          <div className="space-y-4">
            {resetSent ? (
              <div className="text-center space-y-3 py-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[var(--text-main)]">
                  Recovery link sent to {email}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Check your inbox and follow the instructions to choose a new password.
                </p>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="w-full h-11 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold cursor-pointer"
                >
                  Back to Sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-[var(--text-main)] mb-1.5">
                    Email address<span className="text-[#e60023] ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reader@shastraloka.lk"
                    className="w-full h-11 px-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] text-sm text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-[var(--pill-active-bg)] text-[var(--pill-active-text)] text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Send reset link
                </button>

                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] py-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign in
                </button>
              </form>
            )}
          </div>
        )}

        {/* =========================================================
            HORIZONTAL "or" DIVIDER & 3 PILL SOCIAL BUTTONS
            (Matches Screenshot 075847 & 075903)
           ========================================================= */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-[var(--border-subtle)] w-full" />
          <span className="bg-[var(--bg-surface)] px-3 text-xs text-[var(--text-muted)]">or</span>
          <div className="border-t border-[var(--border-subtle)] w-full" />
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-[270px] mx-auto">
          <button
            type="button"
            onClick={() => handleSocialAuth('Google')}
            aria-label="Continue with Google"
            className="h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] flex items-center justify-center font-bold text-base transition cursor-pointer"
          >
            G
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth('Facebook')}
            aria-label="Continue with Facebook"
            className="h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] flex items-center justify-center font-bold text-base transition cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-[var(--text-main)] text-[var(--bg-surface)] text-xs font-bold flex items-center justify-center">
              f
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth('Apple')}
            aria-label="Continue with Apple"
            className="h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] flex items-center justify-center font-bold text-lg transition cursor-pointer"
          >
            
          </button>
        </div>

        {/* Terms & Privacy Caption */}
        <p className="text-[11px] text-[var(--text-muted)] leading-snug mt-5 text-center max-w-[280px] mx-auto">
          By continuing, you agree to our{' '}
          <Link
            href="/terms"
            onClick={() => closeAuthModal()}
            className="underline hover:text-[var(--text-main)]"
          >
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            onClick={() => closeAuthModal()}
            className="underline hover:text-[var(--text-main)]"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
