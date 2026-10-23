import React, { useEffect } from 'react';
import { Link } from '../lib/router';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 2rem 80px',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '640px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-intro, sans-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            margin: '0 0 1.2rem 0'
          }}
        >
          Terms of Service
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.72)',
            margin: '0 0 2.5rem 0'
          }}
        >
          Coming soon
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 2rem',
            borderRadius: '9999px',
            backgroundColor: '#FFFFFF',
            color: '#0F1017',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none'
          }}
        >
          ← Return Home
        </Link>
      </div>
    </div>
  );
}
