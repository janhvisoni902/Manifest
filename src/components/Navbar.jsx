import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../lib/router';
import { useIntro } from '../lib/introContext';

export default function Navbar({ onScheduleCall }) {
  const { pathname } = useRouter();
  const { isIntroPlaying } = useIntro();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop) : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const delta = currentScrollY - lastScrollY;

      // Always visible at top of page (< 50px)
      if (currentScrollY < 50) {
        setNavVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Micro-scroll threshold (8px) to prevent flickering on minor jitters
      if (Math.abs(delta) < 8) return;

      if (delta > 0) {
        // Scrolling DOWN -> Navbar appears (as specified)
        setNavVisible(true);
      } else if (delta < 0) {
        // Scrolling UP -> Navbar disappears (as specified)
        setNavVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let lenisTimer = null;
    const bindLenis = () => {
      if (window.lenis) {
        window.lenis.on('scroll', handleScroll);
      } else {
        lenisTimer = setTimeout(bindLenis, 250);
      }
    };
    bindLenis();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenisTimer) clearTimeout(lenisTimer);
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  if (isIntroPlaying) {
    return null;
  }

  const navLinks = [
    { label: 'Home', target: '/' },
    { label: 'System', target: '/system' },
    { label: 'Founders', target: '/founders' },
    { label: 'Case Studies', target: '/case-studies' },
  ];

  const isLinkActive = (target) => pathname === target;

  return (
    <header>
      <nav
        id="main-nav"
        style={{
          position: 'fixed',
          top: '20px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '0 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          transform: navVisible ? 'translateY(0)' : 'translateY(-140%)',
          opacity: navVisible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
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
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#181818',
            fontFamily: 'var(--font-body)',
            backgroundColor: 'rgba(255, 255, 255, 0.90)',
            backdropFilter: 'blur(16px)',
            padding: '0.6rem 1.4rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <span>manifestTechmedia</span>
          <span style={{ color: '#7A2331', fontSize: '1.6rem', lineHeight: 1 }}>.</span>
        </Link>

        {/* Single Rounded White Pill Container (Right) */}
        <div
          className="nav-pill-container"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.8rem',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '0.5rem 0.6rem 0.5rem 1.4rem',
            borderRadius: '9999px',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* 1. Book a Strategy Call Button */}
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
              padding: '0.6rem 1.4rem',
              fontSize: '0.8rem',
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
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5c1a24')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7A2331')}
          >
            <span>Book a Strategy Call</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>

          {/* 2. Desktop Nav Links */}
          <ul
            className="desktop-nav-menu"
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

          {/* 3. Hamburger Menu Icon */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#181818',
              fontSize: '1.4rem',
              cursor: 'pointer',
              padding: '0.2rem 0.5rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '2.5rem',
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.08)',
            zIndex: 999,
            padding: '1.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.target);
            return (
              <Link
                key={link.label}
                href={link.target}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: active ? '#7A2331' : '#181818',
                  fontSize: '1.1rem',
                  fontWeight: active ? 800 : 600
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/book"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (onScheduleCall) {
                e.preventDefault();
                onScheduleCall();
              }
            }}
            style={{
              marginTop: '0.5rem',
              textAlign: 'center',
              textDecoration: 'none',
              backgroundColor: '#7A2331',
              color: '#ffffff',
              padding: '0.8rem 1.2rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            Book a Strategy Call
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-nav-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
