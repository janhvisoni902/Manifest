import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../../lib/router';

gsap.registerPlugin(ScrollTrigger);

export default function HelloSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const statementRef = useRef(null);
  const foundersRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMotionAllowed: '(prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isMotionAllowed } = context.conditions;

        if (isMotionAllowed) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          });

          if (headlineRef.current) {
            tl.fromTo(
              headlineRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
            );
          }

          if (statementRef.current) {
            tl.fromTo(
              statementRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
              '-=0.5'
            );
          }

          if (foundersRef.current) {
            tl.fromTo(
              foundersRef.current.children,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
              '-=0.4'
            );
          }

          if (buttonRef.current) {
            tl.fromTo(
              buttonRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
              '-=0.4'
            );
          }
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hello-section"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#E9E9E9',
        color: '#181818',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 2.5rem 160px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* 1. Large Editorial Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-intro)',
            fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#181818',
            textTransform: 'uppercase',
            margin: '0 0 3rem 0',
            maxWidth: '1000px'
          }}
        >
          HELLO,<br />
          WE ARE<br />
          MANIFEST TECH MEDIA.
        </h1>

        {/* 2. Exact Required Statement */}
        <p
          ref={statementRef}
          style={{
            fontSize: 'clamp(1.3rem, 2.4vw, 2.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.35,
            color: 'rgba(24, 24, 24, 0.88)',
            maxWidth: '860px',
            margin: '0 0 5rem 0'
          }}
        >
          We help global brands turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.
        </p>

        {/* 3. Founders Brief Introduction */}
        <div ref={foundersRef} style={{ marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(24, 24, 24, 0.5)',
              display: 'block',
              marginBottom: '1.8rem'
            }}
          >
            THE FOUNDERS
          </span>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              maxWidth: '860px'
            }}
          >
            {/* Oshim Kher */}
            <div
              style={{
                borderTop: '1px solid rgba(24, 24, 24, 0.2)',
                paddingTop: '1.2rem'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-intro)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#181818',
                  margin: '0 0 0.4rem 0',
                  textTransform: 'uppercase'
                }}
              >
                OSHIM KHER
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(24, 24, 24, 0.65)',
                  textTransform: 'uppercase',
                  display: 'block'
                }}
              >
                Performance · Growth · AI
              </span>
            </div>

            {/* Aishwarya Soni */}
            <div
              style={{
                borderTop: '1px solid rgba(24, 24, 24, 0.2)',
                paddingTop: '1.2rem'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-intro)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#181818',
                  margin: '0 0 0.4rem 0',
                  textTransform: 'uppercase'
                }}
              >
                AISHWARYA SONI
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(24, 24, 24, 0.65)',
                  textTransform: 'uppercase',
                  display: 'block'
                }}
              >
                Strategy · Creative · Brand
              </span>
            </div>
          </div>
        </div>

        {/* 4. "MORE ABOUT US →" Button */}
        <div ref={buttonRef}>
          <Link
            href="/founders"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.95rem 2.2rem',
              backgroundColor: '#181818',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            MORE ABOUT US →
          </Link>
        </div>
      </div>
    </section>
  );
}
