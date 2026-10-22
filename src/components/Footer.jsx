import React from 'react';
import { Link, useRouter } from '../lib/router';
import { contactInfo } from '../data/contact';
import { anchorDuration } from '../lib/scrollPace';

export default function Footer() {
  const { pathname } = useRouter();

  const handleBackToTop = (e) => {
    e.preventDefault();
    const currentY = typeof window !== 'undefined' ? window.scrollY : 0;
    const dur = anchorDuration(currentY);
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: dur,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: false
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      className="site-footer"
      style={{
        position: 'relative',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5rem 2.5rem calc(2.5rem + env(safe-area-inset-bottom))',
        boxSizing: 'border-box'
      }}
    >
      {/* Footer Main Content */}
      <div
        className="footer-content"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <h3
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: '1.4rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              MANIFEST TECH MEDIA
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 400
              }}
            >
              Revenue Engineering, Funnel Architecture, and High-Scale Media Systems. Founded by Oshim Kher & Aishwarya Soni.
            </p>
          </div>

          {/* Column 1: Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.45)',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{
                    color: pathname === '/' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none'
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/system"
                  style={{
                    color: pathname === '/system' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none'
                  }}
                >
                  The System
                </Link>
              </li>
              <li>
                <Link
                  href="/founders"
                  style={{
                    color: pathname === '/founders' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none'
                  }}
                >
                  Founders
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  style={{
                    color: pathname === '/case-studies' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none'
                  }}
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Capabilities */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.45)',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700
              }}
            >
              Capabilities
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.75)',
                fontWeight: 500
              }}
            >
              <li>Paid Acquisition Engine</li>
              <li>Conversion Funnel Architecture</li>
              <li>Backend Revenue Systems</li>
              <li>Predictive Media Scaling</li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.45)',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700
              }}
            >
              Connect
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, marginBottom: '1rem', fontWeight: 400 }}>
              Ready to build your revenue engine?
            </p>
            <Link
              href={`mailto:${contactInfo.email}`}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0F1017',
                backgroundColor: '#FFFFFF',
                padding: '0.75rem 1.4rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                display: 'inline-block',
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}
            >
              GET IN TOUCH →
            </Link>
          </div>
        </div>

        {/* Back to Top & Copyright */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '2rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 500
          }}
        >
          <div>
            © 2026 Manifest Tech Media. All rights reserved.
          </div>
          <div>
            <a
              href="#"
              onClick={handleBackToTop}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#FFFFFF',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              BACK TO TOP ↑
            </a>
          </div>
        </div>

        {/* Credit line */}
        <p
          style={{
            margin: '1rem 0 0',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 500,
            overflowWrap: 'anywhere'
          }}
        >
          Created and designed by{' '}
          <a
            href="https://jaybuilds-peach.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            JayBuilds
            <span
              style={{
                position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px',
                overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0
              }}
            >
              {' '}(opens in a new tab)
            </span>
          </a>
          <style>{`.footer-credit-link:hover, .footer-credit-link:focus-visible { color: #FFFFFF !important; }`}</style>
        </p>
      </div>
    </footer>
  );
}

