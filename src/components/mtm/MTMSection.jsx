import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playIntro } from '../../lib/animations';
import { Link, assetUrl } from '../../lib/router';
import { scaleScrub } from '../../lib/scrollPace';

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
            scrub: scaleScrub(0.5),
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

        <p
          className="animate-item"
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.78)',
            maxWidth: '780px',
            margin: '1.8rem auto 2.2rem auto',
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'transform, opacity'
          }}
        >
          We build and run revenue systems for US businesses: ads, funnels, CRM and AI follow-up, working as one engine that turns ad spend into booked sales calls.
        </p>

        <div
          className="animate-item"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'transform, opacity'
          }}
        >
          <Link
            href="/book"
            className="nav-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '1rem 2.5rem',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              color: '#0F1017',
              border: '1px solid #FFFFFF',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.88rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <span>Book a Strategy Call</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ width: '12px', height: '12px' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: '0.85rem 0 0 0',
              letterSpacing: '0.02em'
            }}
          >
            Free strategy call. We'll show you where your funnel is leaking.
          </p>
        </div>
      </div>
    </section>
  );
}
