import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../lib/router';
import { revealDuration, revealStagger, softerEase } from '../lib/scrollPace';

gsap.registerPlugin(ScrollTrigger);

export default function SystemPage() {
  const heroRef = useRef(null);

  const pillars = [
    {
      id: '01',
      title: 'Paid Acquisition',
      desc: "We don't just run ads — we build acquisition engines tuned to your actual unit economics, so every dollar spent is a dollar with a job to do.",
      subtitle: 'Meta · Google · TikTok Ads · Scale'
    },
    {
      id: '02',
      title: 'Funnel & Conversion Optimization',
      desc: 'Traffic means nothing if it leaks. We rebuild the path from click to customer so fewer people fall through the cracks at every step.',
      subtitle: 'High-Converting VSLs · CRO Engine'
    },
    {
      id: '03',
      title: 'Call Booking & Appointment Systems',
      desc: "Leads that don't show up aren't leads. We engineer booking and follow-up systems that turn interest into calendar time — automatically.",
      subtitle: 'Calendar Automation · Qualified Pipeline'
    },
    {
      id: '04',
      title: 'Revenue Optimization',
      desc: 'The system doesn\'t stop at the sale. We tighten pricing, retention, and lifecycle touchpoints so the same acquisition spend compounds into more revenue over time.',
      subtitle: 'CPA Protection · LTV Expansion'
    }
  ];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMotionAllowed: '(prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const { isMotionAllowed } = context.conditions;

        if (isMotionAllowed && heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll('.hero-animate'), {
            y: 30,
            opacity: 0,
            duration: revealDuration(0.8),
            stagger: revealStagger(0.15),
            ease: softerEase('power3.out')
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div style={{ backgroundColor: '#0F1017', color: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. Page Hero Section */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          padding: '160px 2.5rem 120px',
          backgroundColor: '#0F1017',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxSizing: 'border-box'
        }}
      >
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          {/* Main Heading */}
          <h1
            className="hero-animate"
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(3.8rem, 9vw, 8rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#FFFFFF',
              margin: '0 0 4rem 0',
              textTransform: 'uppercase'
            }}
          >
            WHAT WE DO
          </h1>

          {/* Sparse Opening Statement Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', maxWidth: '840px' }}>
            
            {/* Sub-block 1 */}
            <div className="hero-animate" style={{ borderLeft: '2px solid #B08D57', paddingLeft: '1.8rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  display: 'block',
                  marginBottom: '0.6rem'
                }}
              >
                — THE SYSTEM
              </span>
              <p
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  color: 'rgba(255, 255, 255, 0.95)',
                  margin: 0
                }}
              >
                We build the infrastructure behind growth.
              </p>
            </div>

            {/* Sub-block 2 */}
            <div className="hero-animate" style={{ borderLeft: '2px solid #7A2331', paddingLeft: '1.8rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B08D57',
                  display: 'block',
                  marginBottom: '0.6rem'
                }}
              >
                — THE REVENUE SYSTEM
              </span>
              <p
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  color: 'rgba(255, 255, 255, 0.95)',
                  margin: 0
                }}
              >
                We connect acquisition to revenue.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 2. The Four Pillars Section */}
      <section
        style={{
          padding: '120px 2.5rem',
          backgroundColor: '#0F1017',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxSizing: 'border-box'
        }}
      >
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B08D57',
                display: 'block',
                marginBottom: '0.8rem'
              }}
            >
              CORE CAPABILITIES
            </span>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                margin: 0
              }}
            >
              Four Pillars of Revenue Engineering
            </h2>
          </div>

          {/* 2x2 Grid Layout for Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="system-card"
                style={{
                  backgroundColor: '#161824',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.35s ease, border-color 0.35s ease'
                }}
              >
                {/* Index Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      color: '#B08D57',
                      letterSpacing: '0.15em',
                      padding: '0.4rem 0.9rem',
                      backgroundColor: 'rgba(15, 16, 23, 0.75)',
                      borderRadius: '9999px',
                      border: '1px solid rgba(176, 141, 87, 0.3)'
                    }}
                  >
                    [{pillar.id}]
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.45)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {pillar.subtitle}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.2,
                      marginBottom: '1.2rem',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: 1.65,
                      margin: 0
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Closing CTA Section */}
      <section
        style={{
          padding: '140px 2.5rem',
          backgroundColor: '#0F1017',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              marginBottom: '2.5rem',
              textTransform: 'uppercase'
            }}
          >
            Build the system.
          </h2>

          <Link
            href="/book"
            style={{
              display: 'inline-block',
              backgroundColor: '#7A2331',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '1.2rem 2.8rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(122, 35, 49, 0.35)',
              transition: 'transform 0.3s ease, backgroundColor 0.3s ease'
            }}
            className="cta-button-hover"
          >
            Book a Strategy Call
          </Link>

        </div>
      </section>

      <style>{`
        .system-card:hover {
          border-color: #7A2331 !important;
          transform: translateY(-6px);
        }
        .cta-button-hover:hover {
          background-color: #962c3e !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
