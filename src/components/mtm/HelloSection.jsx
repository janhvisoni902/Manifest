import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HelloSection({ immediate = false }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const statementRef = useRef(null);

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
          // `immediate`: section is rising over the angel video, so play on mount
          // instead of waiting for a scroll position.
          const tl = gsap.timeline(
            immediate
              ? { delay: 0.5 }
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                  }
                }
          );

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
        }
      }
    );

    return () => mm.revert();
  }, [immediate]);

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

        {/* 2. Statement */}
        <p
          ref={statementRef}
          style={{
            fontSize: 'clamp(1.3rem, 2.4vw, 2.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.35,
            color: 'rgba(24, 24, 24, 0.88)',
            maxWidth: '860px',
            margin: 0
          }}
        >
          We help global brands turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.
        </p>
      </div>
    </section>
  );
}
