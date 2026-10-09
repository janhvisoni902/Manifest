import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playIntro } from '../../lib/animations';
import { assetUrl } from '../../lib/router';

gsap.registerPlugin(ScrollTrigger);

const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

export default function MTMSection({ sequenceState }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // 1. Entrance animation on page load (starts when sequenceState === 'completed')
  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    if (sequenceState !== 'completed') return;

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fallbackTimer = null;
    let hardTimeout = null;

    const unlock = () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    };

    // Apply scroll lock during load entrance (max ~1.5s, hard timeout 2s) if motion allowed
    if (!isReduced) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();

      fallbackTimer = setTimeout(unlock, 1500);
      hardTimeout = setTimeout(unlock, 2000);

      const handleVisibilityChange = () => {
        if (document.hidden) unlock();
      };
      window.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('error', unlock);

      document.fonts.ready.then(() => {
        playIntro(content, {
          onComplete: () => {
            clearTimeout(fallbackTimer);
            clearTimeout(hardTimeout);
            unlock();
          }
        });
      });

      return () => {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        if (hardTimeout) clearTimeout(hardTimeout);
        window.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('error', unlock);
        unlock();
      };
    } else {
      document.fonts.ready.then(() => {
        playIntro(content);
      });
    }
  }, [sequenceState]);

  // 2. MTM Exit Scrub Animation as user scrolls from MTM to Hello
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
      id="mtm"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100svh',
        height: '100vh',
        backgroundColor: '#0F1017',
        backgroundImage: `url("${assetUrl('/images/mtm-bg-2.jpg')}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Subtle dark backdrop overlay to guarantee text legibility over bg image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 16, 23, 0.45)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div
        ref={contentRef}
        className="mtm-content-container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          willChange: 'transform, opacity'
        }}
      >
        {/* Single Page H1 for Accessibility & SEO */}
        <h1
          ref={titleRef}
          className="animate-item"
          style={{
            fontFamily: 'var(--font-intro, sans-serif)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: '0 0 1.5rem 0',
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'transform, opacity'
          }}
        >
          MANIFEST<br />
          TECH MEDIA
        </h1>

        <p
          ref={subtitleRef}
          className="animate-item"
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: 'rgba(255, 255, 255, 0.88)',
            textTransform: 'uppercase',
            margin: 0,
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'transform, opacity'
          }}
        >
          REVENUE ARCHITECTURE · ENTERPRISE GROWTH ENGINES
        </p>
      </div>
    </section>
  );
}
