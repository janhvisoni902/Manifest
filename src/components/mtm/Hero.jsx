import React from 'react';
import { Link } from '../../lib/router';

export default function Hero({ onScheduleCall }) {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 2.5rem 60px',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {/* Soft Background Grid Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176, 141, 87, 0.12) 0%, rgba(15, 16, 23, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1280px' }}>
        
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            marginBottom: '2rem'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#B08D57',
              boxShadow: '0 0 10px #B08D57'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#D9C9AE'
            }}
          >
            FORBES 30 UNDER 30 · REVENUE ENGINEERING
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(3rem, 7.5vw, 6.8rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: '1.8rem',
            color: '#FFFFFF',
            maxWidth: '1100px'
          }}
        >
          Your next $10M is a systems problem.
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '780px',
            marginBottom: '2.5rem',
            fontWeight: 400
          }}
        >
          Stop treating ad spend as an expense. We turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.
        </p>

        {/* CTA Button */}
        <div style={{ marginBottom: '4.5rem' }}>
          <Link
            href="/book"
            onClick={(e) => {
              if (onScheduleCall) {
                e.preventDefault();
                onScheduleCall();
              }
            }}
            className="nav-cta-btn"
            style={{
              borderRadius: '9999px',
              padding: '1rem 2.5rem',
              fontSize: '0.92rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              backgroundColor: '#FFFFFF',
              color: '#0F1017',
              border: '1px solid #FFFFFF',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Book a Strategy Call</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ width: '12px', height: '12px' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>

        {/* Stat Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div>
            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              200M+
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              Total Ad Spend Managed
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              400+
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              US Businesses Transformed
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              8+
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              Industries Served
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 800, color: '#B08D57', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Forbes 30U30
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              Recognised Founders
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
