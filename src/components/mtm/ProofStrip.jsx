import React from 'react';

export default function ProofStrip() {
  const stats = [
    { label: 'CUMULATIVE AD SPEND', val: '$200M+', sub: 'MANAGED ACROSS META & GOOGLE' },
    { label: 'AVERAGE CAMPAIGN ROAS', val: '3.8X', sub: 'SUSTAINED COLD TRAFFIC PERFORMANCE' },
    { label: 'BRANDS SCALED', val: '400+', sub: 'HIGH-GROWTH ENTERPRISE CLIENTS' },
    { label: 'CLIENT RETENTION RATE', val: '98%', sub: 'LONG-TERM REVENUE PARTNERSHIPS' }
  ];

  return (
    <section
      id="results"
      style={{
        padding: '120px 2.5rem',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            — RESULTS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            VERIFIED METRICS
          </h2>
        </div>

        {/* 4 Performance Metric Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3vw',
            alignItems: 'start'
          }}
        >
          {stats.map((st) => (
            <div
              key={st.label}
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                paddingTop: '1.8rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '1rem',
                  display: 'block'
                }}
              >
                {st.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-intro)',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  marginBottom: '1rem'
                }}
              >
                {st.val}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase'
                }}
              >
                {st.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
