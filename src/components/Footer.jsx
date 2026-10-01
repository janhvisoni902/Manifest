import React from 'react';
import { Link, useRouter } from '../lib/router';

export default function Footer() {
  const { pathname } = useRouter();

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        padding: '5rem 2.5rem 2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
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
                fontFamily: 'var(--font-intro)',
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
            <p style={{ opacity: 0.7, fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Revenue Engineering, Funnel Architecture, and High-Scale Media Systems. Founded by Oshim Kher & Aishwarya Soni.
            </p>
          </div>

          {/* Column 1: Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link href="/" style={{ color: pathname === '/' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Home</Link>
              </li>
              <li>
                <Link href="/system" style={{ color: pathname === '/system' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>The System</Link>
              </li>
              <li>
                <Link href="/founders" style={{ color: pathname === '/founders' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Founders</Link>
              </li>
              <li>
                <Link href="/case-studies" style={{ color: pathname === '/case-studies' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Case Studies</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Capabilities */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Capabilities
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              <li>Paid Acquisition Engine</li>
              <li>Conversion Funnel Architecture</li>
              <li>Backend Revenue Systems</li>
              <li>Predictive Media Scaling</li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Connect
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Ready to build your revenue engine?
            </p>
            <Link
              href="/contact"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          <div>
            © 2026 Manifest Tech Media. All rights reserved.
          </div>
          <div>
            <a
              href="#"
              onClick={handleBackToTop}
              style={{
                fontFamily: 'var(--font-mono)',
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

      </div>
    </footer>
  );
}
