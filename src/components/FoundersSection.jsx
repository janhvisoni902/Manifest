import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../lib/router';
import { isDebugMode } from '../lib/hitch';
import { revealDuration, revealStagger, softerEase } from '../lib/scrollPace';

gsap.registerPlugin(ScrollTrigger);

export default function FoundersSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const DEBUG = isDebugMode();

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      markers: DEBUG,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.fromTo(
          content.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.7),
            stagger: revealStagger(0.12),
            ease: softerEase('power3.out')
          }
        );
      }
    });

    return () => trigger.kill();
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
    <section
      ref={sectionRef}
      id="founders-section"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        padding: '140px 2.5rem 160px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {/* HEADER BADGE & TITLE */}
        <div style={{ marginBottom: '4.5rem', willChange: 'transform, opacity' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '1.5rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'uppercase'
              }}
            >
              FORBES 30 UNDER 30 · LEADERSHIP & OPERATORS
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(3.2rem, 7vw, 6.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: '0 0 1.5rem 0',
              maxWidth: '1050px'
            }}
          >
            BUILT BY OPERATORS FROM GOOGLE & OGILVY.
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.55rem)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '820px',
              margin: 0
            }}
          >
            We don't sell agency retainer fluff. We build high-yield backend architectures engineered around strict unit economics and verified market dominance.
          </p>
        </div>

        {/* FOUNDERS GRID */}
        <div
          className="founders-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            marginBottom: '6rem'
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
                willChange: 'transform, opacity'
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
                      fontWeight: 900
                    }}
                    alt=""
                    aria-hidden="true"
                    data-placeholder={f.name === 'Oshim Kher' ? 'oshim-kher-portrait.jpg' : 'aishwarya-soni-portrait.jpg'}
                  >
                    {f.initials}
                  </div>
                  <div>
                    <h3
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
                    </h3>
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

        {/* BOTTOM STRATEGY CALL BANNER */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '4.5rem',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto',
            willChange: 'transform, opacity'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#FFFFFF',
              margin: '0 0 1.2rem 0',
              textTransform: 'uppercase'
            }}
          >
            PARTNER WITH SENIOR OPERATORS
          </h3>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              color: 'rgba(255, 255, 255, 0.68)',
              margin: '0 0 2.4rem 0',
              lineHeight: 1.5
            }}
          >
            Direct 1-on-1 strategy sessions with Forbes 30U30 honorees to analyze your capital allocation and scale backend margins.
          </p>

          <Link
            href="/book"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '1.05rem 2.6rem',
              backgroundColor: '#FFFFFF',
              color: '#0F1017',
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
            Book a Strategy Call
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founders-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
