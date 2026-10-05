import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playIntro } from '../../lib/animations';
import { createHitchTrigger, isDebugMode } from '../../lib/hitch';

gsap.registerPlugin(ScrollTrigger);

export default function HelloSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const DEBUG = isDebugMode();
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, isReduced } = context.conditions;

        if (isReduced) {
          playIntro(container);
          return;
        }

        if (isDesktop) {
          // Desktop: Hitch mechanism (arrive, settle, pause 0.8s, release)
          createHitchTrigger({
            sectionEl: el,
            sectionName: 'HelloSection',
            holdDurationMs: 800,
            onAnimate: () => {
              playIntro(container);
            }
          });
        } else {
          // Mobile / Tablet: Entrance reveal only without freeze
          ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            markers: DEBUG,
            invalidateOnRefresh: true,
            onEnter: () => {
              playIntro(container);
            }
          });
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
        minHeight: '100svh',
        height: '100vh',
        backgroundColor: '#E9E9E9',
        color: '#181818',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 2.5rem 140px',
        boxSizing: 'border-box'
      }}
    >
      <div
        ref={containerRef}
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          willChange: 'transform, opacity'
        }}
      >
        {/* Editorial Headline (h2 for accessibility compliance since MTM section holds the single h1) */}
        <h2
          className="animate-item"
          style={{
            fontFamily: 'var(--font-intro)',
            fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#181818',
            textTransform: 'uppercase',
            margin: '0 0 3rem 0',
            maxWidth: '1000px',
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'transform, opacity'
          }}
        >
          HELLO,<br />
          WE ARE<br />
          MANIFEST TECH MEDIA.
        </h2>

        {/* Statement */}
        <p
          className="animate-item"
          style={{
            fontSize: 'clamp(1.3rem, 2.4vw, 2.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.35,
            color: 'rgba(24, 24, 24, 0.88)',
            maxWidth: '860px',
            margin: 0,
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'transform, opacity'
          }}
        >
          We help global brands turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.
        </p>
      </div>
    </section>
  );
}
