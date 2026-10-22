import React, { useEffect } from 'react';
import { Link } from '../lib/router';

export default function BookPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
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
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.78rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.55)',
            marginBottom: '1.2rem'
          }}
        >
          [ STRATEGY SESSION ]
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-intro, sans-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            margin: '0 0 1.5rem 0'
          }}
        >
          Book a Strategy Call
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.72)',
            margin: '0 0 2.5rem 0'
          }}
        >
          Free strategy call. We'll show you where your funnel is leaking.
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
