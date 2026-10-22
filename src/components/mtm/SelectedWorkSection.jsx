import React from 'react';
import { Link } from '../../lib/router';

export default function SelectedWorkSection() {
  const caseStudies = [
    {
      id: '01',
      category: 'E-COMMERCE & DIRECT-TO-CONSUMER',
      title: 'Scaling Cold Traffic Media to $4.2M / Month',
      metric: '+340% ROAS Expansion',
      desc: 'Engineered high-velocity video ad iteration pipeline combined with algorithmic bid management across Meta and Google Ads.'
    },
    {
      id: '02',
      category: 'HIGH-TICKET B2B & CONSULTING',
      title: 'Automated Lead & Calendar Booking Architecture',
      metric: '1,200+ Qualified Calls / Mo',
      desc: 'Implemented high-converting VSL sales page, instant SMS booking triggers, and automated lead qualification routing.'
    },
    {
      id: '03',
      category: 'ENTERPRISE SAAS & REVENUE SYSTEMS',
      title: 'Full Funnel Conversion & Retention Overhaul',
      metric: '2.8x LTV Multiplication',
      desc: 'Redesigned landing page UX, frictionless checkout flows, and backend retention loops to decrease churn and scale MRR.'
    }
  ];

  return (
    <section
      id="selected-work"
      style={{
        padding: '120px 2.5rem',
        backgroundColor: '#E2E2E2',
        color: '#000000',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(0, 0, 0, 0.6)',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            — SELECTED WORK
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#000000',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            PROVEN CASE STUDIES
          </h2>
        </div>

        {/* Case Studies Vertical Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.2)',
                paddingTop: '2rem',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '2rem',
                alignItems: 'start'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'rgba(0, 0, 0, 0.4)',
                  letterSpacing: '0.15em'
                }}
              >
                [{cs.id}]
              </span>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'rgba(0, 0, 0, 0.5)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.6rem'
                  }}
                >
                  {cs.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-intro)',
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#000000',
                    margin: '0 0 0.8rem 0',
                    lineHeight: 1.1
                  }}
                >
                  {cs.title}
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'rgba(0, 0, 0, 0.7)',
                    lineHeight: 1.6,
                    maxWidth: '700px',
                    margin: 0
                  }}
                >
                  {cs.desc}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                    fontWeight: 800,
                    color: '#000000',
                    display: 'block',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {cs.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Case Studies Link */}
        <div>
          <Link
            href="/case-studies"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.9rem 2rem',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            VIEW ALL CASE STUDIES →
          </Link>
        </div>
      </div>
    </section>
  );
}
