import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import { getIndustryBySlug } from '../data/manifestIndustriesData';

export default function IndustryDetailPage({ slug }) {
  const industry = getIndustryBySlug(slug);

  useEffect(() => {
    document.title = `${industry.title} | Manifest Tech Media`;
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.resize();
    }
  }, [industry, slug]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#E9E9E9',
        color: '#181818',
        padding: '120px 2rem 140px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* TOP BAR / BACK NAVIGATION */}
        <div style={{ marginBottom: '4rem' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#181818',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(24, 24, 24, 0.3)',
              paddingBottom: '4px',
              transition: 'opacity 0.2s ease'
            }}
          >
            ← BACK TO HOME
          </Link>
        </div>

        {/* 01 — INDUSTRY NAME & HERO HEADER */}
        <div style={{ borderBottom: '1px solid rgba(24, 24, 24, 0.2)', paddingBottom: '3.5rem', marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'rgba(24, 24, 24, 0.45)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            [ INDUSTRY FIT / 0{industry.id === 'founders' ? '1' : industry.id === 'ecommerce' ? '2' : industry.id === 'saas-ai' ? '3' : industry.id === 'service-businesses' ? '4' : industry.id === 'coaches-consultants' ? '5' : '6'} ]
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(3rem, 7vw, 5.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#181818',
              textTransform: 'uppercase',
              margin: '0 0 1.5rem 0'
            }}
          >
            {industry.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)',
              fontWeight: 400,
              color: 'rgba(24, 24, 24, 0.75)',
              margin: 0,
              maxWidth: '780px',
              lineHeight: 1.4
            }}
          >
            "{industry.tagline}"
          </p>
        </div>

        {/* GRID LAYOUT FOR IMAGE & CONTENT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 420px) 1fr',
            gap: '4rem',
            marginBottom: '5rem',
            alignItems: 'start'
          }}
          className="industry-detail-grid"
        >
          {/* FEATURED IMAGE */}
          <div
            style={{
              width: '100%',
              height: '480px',
              backgroundColor: '#181818',
              overflow: 'hidden',
              borderRadius: '4px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
            }}
          >
            <img
              src={industry.imgSrc}
              alt={industry.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'grayscale(100%) contrast(108%)'
              }}
            />
          </div>

          {/* SECTIONS 02, 03, 04, 05 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

            {/* 02 — SHORT INTRODUCTION */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: 'rgba(24, 24, 24, 0.45)',
                  textTransform: 'uppercase',
                  marginBottom: '0.8rem'
                }}
              >
                02 — INTRODUCTION
              </h3>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#181818',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {industry.intro}
              </p>
            </div>

            {/* 03 — HOW WE HELP */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: 'rgba(24, 24, 24, 0.45)',
                  textTransform: 'uppercase',
                  marginBottom: '0.8rem'
                }}
              >
                03 — HOW WE HELP
              </h3>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'rgba(24, 24, 24, 0.8)',
                  lineHeight: 1.65,
                  margin: 0
                }}
              >
                {industry.howWeHelp}
              </p>
            </div>

            {/* 04 — THE GROWTH SYSTEM */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: 'rgba(24, 24, 24, 0.45)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                04 — THE GROWTH SYSTEM
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {industry.growthSystem.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '0.9rem 1.2rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(24, 24, 24, 0.1)',
                      borderRadius: '4px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: 'rgba(24, 24, 24, 0.5)'
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#181818'
                      }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 05 — WHAT WE FOCUS ON */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: 'rgba(24, 24, 24, 0.45)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                05 — WHAT WE FOCUS ON
              </h3>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {industry.whatWeFocusOn.map((focus, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.98rem',
                      color: 'rgba(24, 24, 24, 0.8)',
                      lineHeight: 1.5
                    }}
                  >
                    {focus}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 06 — CTA */}
        <div
          style={{
            borderTop: '1px solid rgba(24, 24, 24, 0.2)',
            paddingTop: '4.5rem',
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: 'rgba(24, 24, 24, 0.45)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            06 — NEXT STEP
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#181818',
              margin: '0 0 1.2rem 0',
              textTransform: 'uppercase'
            }}
          >
            READY TO SCALE<br />
            IN {industry.title}?
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
              color: 'rgba(24, 24, 24, 0.68)',
              margin: '0 0 2.2rem 0'
            }}
          >
            "Let's build a revenue system tailored to your market."
          </p>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '1rem 2.4rem',
              backgroundColor: '#181818',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            WORK WITH US →
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .industry-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
