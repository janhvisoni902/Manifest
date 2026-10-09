import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '../lib/router';
import { contactInfo } from '../data/contact';

/**
 * GOOGLE APPS SCRIPT WEB APP ENDPOINT URL
 * Paste your deployed Google Apps Script Web App URL below.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 */
const SHEET_ENDPOINT = "PASTE_URL_HERE";

// Headline Options for selection:
// Option 1 (Default): "Scale Your Revenue Engine"
// Option 2: "Predictable Media & Funnel Scaling"
const HEADLINE_TEXT = "Scale Your Revenue Engine";
const SUBHEAD_TEXT = "We engineer predictable paid acquisition engines and backend funnel architecture for fast-scaling brands.";

// Storage keys
const SESSION_KEY = 'manifest_welcome_modal_seen';
const DISMISSED_KEY = 'manifest_welcome_modal_dismissed_until';
const SUBMITTED_KEY = 'manifest_welcome_modal_submitted';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function WelcomeModal({ isSequenceFinished, onScheduleCall }) {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('initial'); // 'initial' | 'form' | 'success'
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '', server: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const nameInputRef = useRef(null);

  // Check if modal display is suppressed
  const isSuppressed = useCallback(() => {
    if (typeof window === 'undefined') return true;

    // 1. Must be on homepage route ('/')
    const currentPath = window.location.pathname || pathname;
    if (currentPath !== '/') return true;

    // 2. Session check (shown once per session)
    if (sessionStorage.getItem(SESSION_KEY) === 'true') return true;

    // 3. Permanent suppression after successful signup
    if (localStorage.getItem(SUBMITTED_KEY) === 'true') return true;

    // 4. 7-day dismissal window check
    const dismissedUntil = localStorage.getItem(DISMISSED_KEY);
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return true;

    return false;
  }, [pathname]);

  // Hook into sequence completion signal + 2.5s delay
  useEffect(() => {
    if (!isSequenceFinished) return;
    if (isSuppressed()) return;

    const timer = setTimeout(() => {
      if (!isSuppressed()) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsOpen(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isSequenceFinished, isSuppressed]);

  // Dismiss handler (sets 7-day suppression in localStorage)
  const handleDismiss = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DISMISSED_KEY, String(Date.now() + SEVEN_DAYS_MS));
    }
    setIsOpen(false);
  }, []);

  // Permanent submission suppression handler
  const handlePermanentSuppression = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SUBMITTED_KEY, 'true');
    }
  }, []);

  // Keyboard accessibility: Escape key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleDismiss();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const focusTimer = setTimeout(() => {
      if (viewMode === 'form' && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, viewMode, handleDismiss]);

  // Focus name input when switching to form view
  useEffect(() => {
    if (viewMode === 'form') {
      const timer = setTimeout(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  if (!isOpen) return null;

  // Sign-Up Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ name: '', email: '', server: '' });

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      submittedAt: new Date().toISOString()
    };

    let fetchFailed = false;

    // Fire-and-forget POST to Google Apps Script Endpoint
    if (SHEET_ENDPOINT && SHEET_ENDPOINT !== "PASTE_URL_HERE") {
      fetch(SHEET_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain' // text/plain prevents CORS preflight OPTIONS request on Apps Script
        },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      }).catch((err) => {
        console.warn('Network error posting sign-up:', err);
        fetchFailed = true;
        setIsSubmitting(false);
        setErrors({ server: 'Connection error. Please try again.' });
      });
    }

    if (!fetchFailed) {
      // Optimistic confirmation state & permanent suppression
      handlePermanentSuppression();
      setViewMode('success');
      setIsSubmitting(false);

      // Automatically close modal after 2.5 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }
  };

  const handleScheduleCallClick = () => {
    handleDismiss();
    if (onScheduleCall) {
      onScheduleCall();
    } else if (typeof window !== 'undefined') {
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className="welcome-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: isReducedMotion ? 'none' : 'fadeInOverlay 0.35s ease-out'
      }}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        ref={modalRef}
        className="welcome-modal-card"
        style={{
          backgroundColor: '#0F1017',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '24px',
          padding: '2.5rem 2.2rem',
          maxWidth: '460px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.85)',
          animation: isReducedMotion ? 'none' : 'slideUpModal 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '1.3rem',
            right: '1.3rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'rgba(255, 255, 255, 0.7)',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close modal"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          ✕
        </button>

        {/* Eyebrow Tag */}
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '0.8rem'
          }}
        >
          MANIFEST TECH MEDIA
        </span>

        {/* Initial View */}
        {viewMode === 'initial' && (
          <>
            <h2
              id="welcome-modal-title"
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '0.9rem',
                textTransform: 'uppercase'
              }}
            >
              {HEADLINE_TEXT}
            </h2>

            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '1.8rem',
                fontWeight: 400
              }}
            >
              {SUBHEAD_TEXT}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Schedule a Call CTA */}
              <div>
                <button
                  onClick={handleScheduleCallClick}
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.4rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F1017',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'backgroundColor 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  Schedule a Call →
                </button>
                <p
                  style={{
                    fontSize: '0.73rem',
                    color: 'rgba(255, 255, 255, 0.45)',
                    textAlign: 'center',
                    marginTop: '0.45rem',
                    marginBottom: '0.2rem',
                    fontFamily: 'var(--font-mono, monospace)'
                  }}
                >
                  We won't bug you with email marketing.
                </p>
              </div>

              {/* Sign Up CTA (Reveals inline form) */}
              <button
                onClick={() => setViewMode('form')}
                style={{
                  width: '100%',
                  padding: '0.9rem 1.4rem',
                  borderRadius: '9999px',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, backgroundColor 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Sign Up
              </button>

              {/* Dismiss Link */}
              <button
                onClick={handleDismiss}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.45)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '0.4rem',
                  marginTop: '0.2rem',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}
              >
                No, not right now
              </button>
            </div>
          </>
        )}

        {/* Inline Form View */}
        {viewMode === 'form' && (
          <>
            <h2
              id="welcome-modal-title"
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}
            >
              Get Growth Insights
            </h2>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.65)',
                marginBottom: '1.4rem',
                lineHeight: 1.5
              }}
            >
              Enter your details below to join our private growth updates.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '1.1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '0.4rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  Full Name *
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: errors.name ? '1px solid #FF6B6B' : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.name && (
                  <span style={{ fontSize: '0.78rem', color: '#FF6B6B', marginTop: '0.3rem', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '0.4rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: errors.email ? '1px solid #FF6B6B' : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.email && (
                  <span style={{ fontSize: '0.78rem', color: '#FF6B6B', marginTop: '0.3rem', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {errors.server && (
                <div style={{ padding: '0.6rem 0.8rem', backgroundColor: 'rgba(255, 107, 107, 0.15)', border: '1px solid #FF6B6B', borderRadius: '8px', color: '#FF6B6B', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  {errors.server}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F1017',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('initial')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '0.4rem'
                  }}
                >
                  ← Back
                </button>
              </div>
            </form>
          </>
        )}

        {/* Confirmation Success View */}
        {viewMode === 'success' && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.2rem',
                fontSize: '1.4rem'
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '0.6rem',
                textTransform: 'uppercase'
              }}
            >
              Thanks — we'll be in touch.
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              Your details have been registered successfully.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
