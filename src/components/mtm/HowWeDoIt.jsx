import React from 'react';
import { Link } from '../../lib/router';

export default function HowWeDoIt() {
  const steps = [
    {
      step: '01',
      title: 'Revenue Diagnosis & Audit',
      desc: 'Deep-dive telemetry & bottleneck discovery across historical ad accounts and funnel unit economics.'
    },
    {
      step: '02',
      title: 'Strategic Architecture',
      desc: 'Custom offer positioning, messaging architecture, and multi-touch appointment funnel engineering.'
    },
    {
      step: '03',
      title: 'Execution & Structured Testing',
      desc: 'Rapid creative iteration, audience testing velocity, and algorithmic ad campaign deployment.'
    },
    {
      step: '04',
      title: 'Optimization & Scaling',
      desc: 'Continuous CPA protection, ROAS safeguard controls, and automated lead nurture scaling.'
    },
    {
      step: '05',
      title: 'Reporting & Strategic Insight',
      desc: 'Real-time revenue telemetry dashboards and weekly executive growth alignment sessions.'
    }
  ];

  return (
    <section
      id="how-we-do-it"
      style={{
        padding: '120px 2.5rem',
        backgroundColor: '#e8e8e6',
        color: '#181818',
        borderTop: '1px solid rgba(0,0,0,0.06)'
      }}
    >
      <div className="container" style={{ maxWidth: '1380px', margin: '0 auto' }}>
        
        {/* Headline Left-Aligned */}
        <div style={{ marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#7A2331',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            OUR 5-STEP REVENUE SYSTEM
          </span>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '900px',
              color: '#181818'
            }}
          >
            Five layers. One machine.{' '}
            <span style={{ color: '#7A2331', display: 'inline-block' }}>Zero gaps.</span>
          </h2>
        </div>

        {/* 5-Step Sequential Flush Grid Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {steps.map((st) => (
            <div
              key={st.step}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '16px',
                padding: '2.5rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#7A2331';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(122, 35, 49, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    color: '#7A2331',
                    display: 'block',
                    marginBottom: '1.2rem'
                  }}
                >
                  {st.step}
                </span>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#181818',
                    marginBottom: '0.8rem',
                    lineHeight: 1.3
                  }}
                >
                  {st.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: '#555555',
                  lineHeight: 1.55,
                  margin: 0
                }}
              >
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Deep Dive Link to /system */}
        <div style={{ textAlign: 'right' }}>
          <Link
            href="/system"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#7A2331',
              textDecoration: 'none'
            }}
          >
            <span>Explore full system blueprint on /system</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
