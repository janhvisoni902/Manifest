import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playEntrance } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

export default function MTMSection({ sequenceState }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // 1. Entrance animation on page load (triggered when sequenceState === 'completed')
  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    if (sequenceState !== 'completed') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fallbackTimer = null;

    const unlock = () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    };

    // Apply scroll lock during load entrance (max 1.5s) if motion allowed
    if (!isReduced) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();

      fallbackTimer = setTimeout(unlock, 1500);

      const handleVisibilityChange = () => {
        if (document.hidden) unlock();
      };
      window.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('error', unlock);

      document.fonts.ready.then(() => {
        playEntrance(content, {
          onComplete: () => {
            clearTimeout(fallbackTimer);
            unlock();
          }
        });
      });

      return () => {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        window.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('error', unlock);
        unlock();
      };
    } else {
      document.fonts.ready.then(() => {
        playEntrance(content);
      });
    }
  }, [sequenceState]);

  // 2. MTM Exit Animation as user scrolls from MTM to Hello
  // y: 0 -> -40, opacity: 1 -> 0.3, scrub: 0.5, trigger: top top -> bottom top
  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const DEBUG = isDebugMode();
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMotionAllowed: '(prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isMotionAllowed } = context.conditions;
        if (!isMotionAllowed) return;

        gsap.to(content, {
          y: -40,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            markers: DEBUG,
            invalidateOnRefresh: true
          }
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mtm-hero-section"
      style={{
        position: 'relative',
        minHeight: '100svh',
        height: '100vh',
        width: '100%',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 2.5rem 60px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {/* Background Subtle Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.05) 0%, rgba(15, 16, 23, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div
        ref={contentRef}
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          willChange: 'transform, opacity'
        }}
      >
        {/* Eyebrow Badge */}
        <div
          className="animate-item"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            marginBottom: '2rem',
            opacity: 0,
            transform: 'translateY(40px)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            MANIFEST TECH MEDIA · REVENUE ENGINEERING
          </span>
        </div>

        {/* Sole H1 on Page */}
        <h1
          className="animate-item"
          style={{
            fontFamily: 'var(--font-intro, sans-serif)',
            fontSize: 'clamp(3rem, 7.5vw, 6.8rem)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: '1.8rem',
            color: '#FFFFFF',
            maxWidth: '1100px',
            textTransform: 'uppercase',
            opacity: 0,
            transform: 'translateY(40px)'
          }}
        >
          YOUR NEXT $10M IS A SYSTEM PROBLEM.
        </h1>

        {/* Subhead */}
        <p
          className="animate-item"
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '780px',
            marginBottom: '2.5rem',
            fontWeight: 400,
            opacity: 0,
            transform: 'translateY(40px)'
          }}
        >
          We turn paid traffic into predictable, scalable revenue — aligning every ad dollar with real backend growth.
        </p>

        {/* Stat Row */}
        <div
          className="animate-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            opacity: 0,
            transform: 'translateY(40px)'
          }}
        >
          <div>
            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              $200M+
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              Total Ad Spend Managed
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              400+
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              US Businesses Transformed
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              8+
            </div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              Industries Scaled
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
