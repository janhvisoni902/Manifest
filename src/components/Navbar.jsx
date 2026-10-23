import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../lib/router';
import { useIntro } from '../lib/introContext';

const SHOW_CASE_STUDIES = false;

export default function Navbar({ onScheduleCall }) {
  const { pathname } = useRouter();
  const { isIntroPlaying } = useIntro();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock / restore scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [mobileMenuOpen]);

  if (isIntroPlaying) {
    return null;
  }

  const navLinks = [
    { label: 'Services', target: '/services' },
    ...(SHOW_CASE_STUDIES ? [{ label: 'Case Studies', target: '/case-studies' }] : []),
    { label: 'About', target: '/about' }
  ];

  const isLinkActive = (target) => pathname === target;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header>
      <nav
        id="main-nav"
        aria-label="Main Navigation"
        style={{
          position: 'fixed',
          top: '20px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Logo Far Left */}
        <Link
          href="/"
          className="navbar-brand-link"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#181818',
            fontFamily: 'var(--font-body)',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '0.55rem 1.25rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <span>manifestTechmedia</span>
          <span style={{ color: '#7A2331', fontSize: '1.5rem', lineHeight: 1 }}>.</span>
        </Link>

        {/* Desktop Nav Group: Links + Booking Button (hidden on mobile) */}
        <div
          className="desktop-nav-group"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '0.45rem 0.5rem 0.45rem 1.4rem',
            borderRadius: '9999px',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '1.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              margin: 0,
              padding: 0,
              alignItems: 'center'
            }}
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.target);
              return (
                <li key={link.label}>
                  <Link
                    href={link.target}
                    style={{
                      textDecoration: 'none',
                      color: active ? '#7A2331' : '#333333',
                      transition: 'color 0.2s ease',
                      fontWeight: active ? '800' : '600'
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = '#7A2331';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = '#333333';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/book"
            onClick={(e) => {
              if (onScheduleCall) {
                e.preventDefault();
                onScheduleCall();
              }
            }}
            style={{
              borderRadius: '9999px',
              padding: '0.6rem 1.3rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              backgroundColor: '#7A2331',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5c1a24')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7A2331')}
          >
            <span>Book a Strategy Call</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile: "Menu" button only (No booking button in mobile header) */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          style={{
            pointerEvents: 'auto',
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '0.55rem 1.1rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#181818',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: 'rgba(15, 16, 23, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 1.5rem calc(2rem + env(safe-area-inset-bottom, 0px))',
            boxSizing: 'border-box'
          }}
        >
          {/* Close button inside overlay */}
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>

          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.8rem',
              width: '100%',
              maxWidth: '320px',
              textAlign: 'center'
            }}
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.target);
              return (
                <Link
                  key={link.label}
                  href={link.target}
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    color: active ? '#7A2331' : '#FFFFFF',
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-intro, sans-serif)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    padding: '0.4rem 1rem'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Booking button in mobile menu list */}
            <Link
              href="/book"
              onClick={(e) => {
                closeMenu();
                if (onScheduleCall) {
                  e.preventDefault();
                  onScheduleCall();
                }
              }}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                textAlign: 'center',
                textDecoration: 'none',
                backgroundColor: '#7A2331',
                color: '#ffffff',
                padding: '0.9rem 1.5rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(122, 35, 49, 0.4)',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Book a Strategy Call</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 1 h5 v5 M7 1 L1 7" />
              </svg>
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav-group {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
