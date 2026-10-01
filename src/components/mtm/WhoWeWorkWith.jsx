import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeWorkWith() {
  const headlineRef = useRef(null);
  const sectionRef = useRef(null);

  const industries = [
    { title: 'Coaches & Consultants', tag: 'High-Ticket Funnels' },
    { title: 'E-Commerce & DTC Brands', tag: 'ROAS & CPA Protection' },
    { title: 'Real Estate & Lead Generation', tag: 'High-Intent Pipelines' },
    { title: 'SaaS & AI Growth', tag: 'User Acquisition' },
    { title: 'Service-Based Businesses', tag: 'Booked Appointments' },
    { title: 'Health & Wellness', tag: 'LTV Scaling' },
    { title: 'High-Ticket B2B & Agencies', tag: 'Pipeline Automation' },
    { title: 'Info Products & Creators', tag: 'Backend Monetization' }
  ];

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
      onUpdate: (self) => {
        const opacity = 0.25 + self.progress * 0.75;
        if (el) el.style.opacity = opacity.toFixed(2);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-we-work-with"
      style={{
        padding: '120px 2.5rem',
        backgroundColor: '#12131A',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="container" style={{ maxWidth: '1380px', margin: '0 auto' }}>
        
        {/* Scroll-Linked Opacity Headline */}
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B08D57',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            TARGET MARKET EXPERTISE
          </span>
          
          <h2
            ref={headlineRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              opacity: 0.25,
              transition: 'opacity 0.1s linear',
              lineHeight: 1.1,
              margin: '0 auto',
              maxWidth: '900px'
            }}
          >
            Who do we work with?
          </h2>
        </div>

        {/* 8-Tile Grid (4 columns x 2 rows on desktop) */}
        <div
          className="who-work-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}
        >
          {industries.map((ind) => (
            <div
              key={ind.title}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '18px',
                padding: '2.8rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: '10px',
                transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
                e.currentTarget.style.borderColor = 'rgba(122, 35, 49, 0.6)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.3
                }}
              >
                {ind.title}
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#B08D57',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                {ind.tag}
              </span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .who-work-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .who-work-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
