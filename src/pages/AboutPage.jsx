import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import Footer from '../components/Footer';

export default function AboutPage({ onScheduleCall }) {
  useEffect(() => {
    document.title = 'About | manifestTechmedia';
    window.scrollTo(0, 0);
  }, []);

  const founders = [
    {
      initials: 'OK',
      name: 'Oshim Kher',
      title: 'Co-founder & Chairman',
      role: 'EX-GOOGLE · PERFORMANCE MARKETING · FORBES 30U30',
      bio: "Oshim spent over half a decade inside Google's core ad algorithms team, engineering programmatic bidding protocols and AI attribution models. Having managed $200M+ in ad spend for 400+ businesses, he turns ad spend into predictable revenue systems.",
      stat1: { value: '$200M+', label: 'AD SPEND MANAGED' },
      stat2: { value: '400+', label: 'BUSINESSES SERVED' }
    },
    {
      initials: 'AS',
      name: 'Aishwarya Soni',
      title: 'Co-founder & CEO',
      role: 'EX-OGILVY · BRAND STRATEGY · FORBES 30U30',
      bio: 'Aishwarya began her career at Ogilvy shaping global brand narratives and campaign positioning. At MTM, she bridges cinematic brand direction with direct-response psychological triggers — crafting high-converting VSLs and brand authority.',
      stat1: { value: 'OGILVY', label: 'BRAND LEGACY' },
      stat2: { value: 'FORBES 30U30', label: 'HONOREE' }
    }
  ];

  return (
    <div style={{ backgroundColor: '#0F1017', color: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. Page Header & Single Line Statement */}
      <section
        style={{
          position: 'relative',
          padding: '160px 2.5rem 80px',
          backgroundColor: '#0F1017',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '2rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              ABOUT US
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: 0,
              maxWidth: '960px'
            }}
          >
            Founded in 2019 by Oshim Kher and Aishwarya Soni.
          </h1>
        </div>
      </section>

      {/* 2. The Two Founder Cards */}
      <section
        style={{
          padding: '20px 2.5rem 120px',
          backgroundColor: '#0F1017',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="about-founder-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2.5rem',
              marginBottom: '5rem'
            }}
          >
            {founders.map((f) => (
              <div
                key={f.name}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem',
                      marginBottom: '1.8rem'
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        color: '#0F1017',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        flexShrink: 0
                      }}
                      aria-hidden="true"
                    >
                      {f.initials}
                    </div>
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-intro, sans-serif)',
                          fontSize: '1.9rem',
                          fontWeight: 900,
                          color: '#FFFFFF',
                          margin: '0 0 0.3rem 0',
                          textTransform: 'uppercase',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {f.name}
                      </h2>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: '#FFFFFF',
                          marginBottom: '0.35rem'
                        }}
                      >
                        {f.title}
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.14em',
                          color: 'rgba(255, 255, 255, 0.5)',
                          textTransform: 'uppercase',
                          display: 'block'
                        }}
                      >
                        {f.role}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '0.98rem',
                      lineHeight: 1.65,
                      color: 'rgba(255, 255, 255, 0.72)',
                      margin: '0 0 2rem 0'
                    }}
                  >
                    {f.bio}
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '1.5rem'
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-intro, sans-serif)',
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {f.stat1.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: 'rgba(255, 255, 255, 0.45)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {f.stat1.label}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-intro, sans-serif)',
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {f.stat2.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: 'rgba(255, 255, 255, 0.45)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {f.stat2.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ending with "Book a Strategy Call" button */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/book"
              onClick={(e) => {
                if (onScheduleCall) {
                  e.preventDefault();
                  onScheduleCall();
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                backgroundColor: '#7A2331',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 6px 25px rgba(122, 35, 49, 0.4)',
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
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 868px) {
          .about-founder-grid {
            grid-template-columns: 1fr !important;
            gap: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}

