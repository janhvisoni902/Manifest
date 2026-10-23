import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import Footer from '../components/Footer';

export default function ServicesPage({ onScheduleCall }) {
  useEffect(() => {
    document.title = 'Services | manifestTechmedia';
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      num: '01',
      total: '05',
      title: 'VISION',
      subtitle: 'MARKET AUTHORITY & BRAND POSITIONING',
      points: [
        'Defining market dominance and category leadership',
        'Identifying untapped high-margin growth vectors',
        'Structuring competitive moats and distinct positioning',
        'Establishing authority that commands premium pricing'
      ]
    },
    {
      num: '02',
      total: '05',
      title: 'STRATEGY',
      subtitle: 'UNIT ECONOMICS & CAPITAL ALLOCATION',
      points: [
        'Algorithmic capital allocation models built around strict CPA targets',
        'Sustainable LTV expansion and ROAS predictability',
        'Cohort economics and customer payback period modeling',
        'Spend-to-revenue synchronization across channels'
      ]
    },
    {
      num: '03',
      total: '05',
      title: 'CREATIVE',
      subtitle: 'EDITORIAL MEDIA & HIGH-CONVERTING VSLS',
      points: [
        'Cinematic visual direction paired with psychological triggers',
        'High-impact Video Sales Letter (VSL) scripting and production',
        'Continuous creative iteration and rapid multi-hook variant testing',
        'Ad asset production engineered for high-velocity networks'
      ]
    },
    {
      num: '04',
      total: '05',
      title: 'ACQUISITION',
      subtitle: 'MULTI-CHANNEL MEDIA BUYING AT SCALE',
      points: [
        'High-scale ad buying infrastructure across Meta, Google, and TikTok',
        'Algorithmic audience targeting to acquire qualified cold prospects',
        'Rapid scaling protocols preserving margins as spend scales',
        'Real-time attribution and programmatic bid optimization'
      ]
    },
    {
      num: '05',
      total: '05',
      title: 'CONVERSION',
      subtitle: 'FUNNEL DYNAMICS & RETENTION ENGINE',
      points: [
        'Custom high-converting funnel architectures and landing pages',
        'Automated appointment pipelines with qualification filters',
        'Multi-channel SMS and email retention loops that stop leaks',
        'Checkout, consultation, and booking rate optimization'
      ]
    }
  ];

  const revenueStages = [
    { num: 'STAGE 01', title: 'ATTENTION', desc: 'High-status creative media and strategic market positioning.' },
    { num: 'STAGE 02', title: 'ACQUISITION', desc: 'High-scale media buying infrastructure across cold ad networks.' },
    { num: 'STAGE 03', title: 'CONVERSION', desc: 'High-converting VSLs, custom sales pages, and CRO engines.' },
    { num: 'STAGE 04', title: 'REVENUE', desc: 'Automated calendar booking pipelines and qualified lead flow.' },
    { num: 'STAGE 05', title: 'SCALE', desc: 'CPA protection, LTV expansion, and recurring backend yield.' }
  ];

  return (
    <div style={{ backgroundColor: '#0F1017', color: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. Services Hero */}
      <section
        style={{
          position: 'relative',
          padding: '160px 2.5rem 80px',
          backgroundColor: '#0F1017',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
              marginBottom: '1.5rem'
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
              SERVICES & REVENUE ARCHITECTURE
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#FFFFFF',
              margin: '0 0 2rem 0',
              textTransform: 'uppercase',
              maxWidth: '1050px'
            }}
          >
            WE TURN AD SPEND INTO REVENUE SYSTEMS.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.72)',
              maxWidth: '820px',
              margin: 0
            }}
          >
            A continuous architecture engineered to align brand authority, media acquisition, and unit economics into scalable enterprise growth.
          </p>
        </div>
      </section>

      {/* 2. The 5 Pillars */}
      <section
        style={{
          padding: '100px 2.5rem',
          backgroundColor: '#0F1017',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.55)',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              — THE FIVE PILLARS
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              FULL-CYCLE EXECUTION
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
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
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '1rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        color: 'rgba(255, 255, 255, 0.45)'
                      }}
                    >
                      [{pillar.num} / {pillar.total}]
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {pillar.subtitle}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-intro, sans-serif)',
                      fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      margin: '0 0 1.5rem 0',
                      textTransform: 'uppercase'
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    {pillar.points.map((pt, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.94rem',
                          lineHeight: 1.55,
                          color: 'rgba(255, 255, 255, 0.72)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem'
                        }}
                      >
                        <span style={{ color: '#7A2331', fontWeight: 700, lineHeight: 1.4 }}>—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Five-Stage Engine */}
      <section
        style={{
          padding: '100px 2.5rem 120px',
          backgroundColor: '#0F1017',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            — THE REVENUE SYSTEM
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 3rem 0',
              textTransform: 'uppercase'
            }}
          >
            THE FIVE-STAGE ENGINE
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              marginBottom: '4rem'
            }}
          >
            {revenueStages.map((stage) => (
              <div
                key={stage.num}
                className="services-stage-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 180px 1fr',
                  alignItems: 'center',
                  gap: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingBottom: '1.2rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.4)'
                  }}
                >
                  {stage.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-intro, sans-serif)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '0.04em'
                  }}
                >
                  {stage.title}
                </span>
                <span
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.68)'
                  }}
                >
                  {stage.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Ending with "Book a Strategy Call" button */}
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
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
        @media (max-width: 767px) {
          .services-stage-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

