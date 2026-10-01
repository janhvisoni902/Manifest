import React from 'react';

export default function PositionStatement({ sectionRef, textRef }) {
  return (
    <section
      ref={sectionRef}
      id="position-statement"
      className="position-statement-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#181818',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 2.5rem',
        zIndex: 2,
        boxShadow: '0 -20px 50px rgba(0,0,0,0.5)'
      }}
    >
      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div ref={textRef} style={{ opacity: 0.2 }}>
          
          {/* Eyebrow Label */}
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B08D57',
              display: 'block',
              marginBottom: '1.2rem'
            }}
          >
            WHO WE ARE
          </span>

          {/* Main Statement Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              marginBottom: '2.5rem',
              color: '#FFFFFF'
            }}
          >
            Hello, we are <span style={{
              background: 'linear-gradient(110deg, #FFFFFF 0%, #B08D57 50%, #D9C9AE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>manifestTechmedia</span>, your portal to build a digital solution.
          </h2>

          {/* Subline */}
          <div
            style={{
              fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
              fontWeight: 500,
              color: '#D9C9AE',
              letterSpacing: '0.02em',
              marginBottom: '2rem',
              paddingLeft: '1.4rem',
              borderLeft: '3px solid #B08D57',
              lineHeight: 1.5
            }}
          >
            Every agency will run your ads. Almost none of them will build the system that actually turns those ads into compounding revenue.
          </div>

          {/* Short Paragraph */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: '920px',
              fontWeight: 400
            }}
          >
            Founded by Oshim Kher (ex-Google) and Aishwarya Soni (ex-Ogilvy), Forbes 30 Under 30 honorees. We're Revenue Architects building complete growth engines: paid traffic, funnel architecture, and backend systems working as one.
          </p>

        </div>
      </div>
    </section>
  );
}

