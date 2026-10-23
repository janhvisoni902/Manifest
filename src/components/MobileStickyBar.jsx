import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../lib/router';
import { useIntro } from '../lib/introContext';

export default function MobileStickyBar({ onScheduleCall }) {
  const { pathname } = useRouter();
  const { isIntroPlaying } = useIntro();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  // Monitor scroll position to show bar after hero scrolls past
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const evaluateScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // After hero scrolls past: threshold ~400px or 60% of viewport height
      const threshold = Math.min(window.innerHeight * 0.65, 450);
      setScrolledPastHero(scrollY > threshold);
    };

    evaluateScroll();
    window.addEventListener('scroll', evaluateScroll, { passive: true });

    let lenisTimer = null;
    const bindLenis = () => {
      if (window.lenis) {
        window.lenis.on('scroll', evaluateScroll);
      } else {
        lenisTimer = setTimeout(bindLenis, 250);
      }
    };
    bindLenis();

    return () => {
      window.removeEventListener('scroll', evaluateScroll);
      if (lenisTimer) clearTimeout(lenisTimer);
      if (window.lenis) {
        window.lenis.off('scroll', evaluateScroll);
      }
    };
  }, [pathname]);

  // Observer to hide bar when footer is in view (prevents covering footer text)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let observer = null;
    const findAndObserveFooter = () => {
      const footer = document.querySelector('footer') || document.getElementById('footer');
      if (footer && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            setFooterInView(entry.isIntersecting);
          },
          { threshold: 0.05 }
        );
        observer.observe(footer);
      }
    };

    findAndObserveFooter();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  // Hidden during intro or on /book
  if (isIntroPlaying || pathname === '/book') {
    return null;
  }

  const isVisible = scrolledPastHero && !footerInView;

  return (
    <aside
      className="mobile-sticky-bar"
      aria-label="Mobile booking action"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 998,
        padding: '0.75rem 1.25rem calc(0.75rem + env(safe-area-inset-bottom, 0px))',
        backgroundColor: 'rgba(15, 16, 23, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        boxSizing: 'border-box',
        transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
      }}
    >
      <Link
        href="/book"
        onClick={(e) => {
          if (onScheduleCall) {
            e.preventDefault();
            onScheduleCall();
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '0.85rem 1.5rem',
          backgroundColor: '#7A2331',
          color: '#FFFFFF',
          textDecoration: 'none',
          borderRadius: '9999px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.82rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(122, 35, 49, 0.35)',
          boxSizing: 'border-box',
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

      <style>{`
        @media (min-width: 768px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}

