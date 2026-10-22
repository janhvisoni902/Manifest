import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isDebugMode } from '../../lib/hitch';
import { sceneFactor, scaleScrub } from '../../lib/scrollPace';

gsap.registerPlugin(ScrollTrigger);

export default function HelloSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const headlineWordsGroup = [
    { text: 'HELLO,', breakAfter: true },
    { text: 'WE', breakAfter: false },
    { text: 'ARE', breakAfter: true },
    { text: 'MANIFEST', breakAfter: false },
    { text: 'TECH', breakAfter: false },
    { text: 'MEDIA.', breakAfter: false }
  ];

  const statementText =
    'We help global brands turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.';
  const statementWords = statementText.split(' ');

  useEffect(() => {
    const el = sectionRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const DEBUG = isDebugMode();
    const mm = gsap.matchMedia();

    mm.add(
      {
        isNormal: '(prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isReduced } = context.conditions;
        const words = gsap.utils.toArray(container.querySelectorAll('.hello-word'));

        if (isReduced) {
          gsap.set(words, { opacity: 1 });
          return;
        }

        const isMobile = window.innerWidth < 768;

        // Total added scroll distance: ~1.3 viewports on desktop, ~0.9 viewports on mobile
        const getEndDistance = () =>
          '+=' + Math.max(window.innerHeight * (isMobile ? 0.9 : 1.3), words.length * (isMobile ? 25 : 35)) * sceneFactor();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: getEndDistance,
            pin: true,
            pinSpacing: true,
            scrub: scaleScrub(0.5),
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: DEBUG
          }
        });

        // Words fill one by one from low-contrast opacity 0.2 to full opacity 1.0
        tl.to(words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1
        }).to({}, { duration: 0.3 }); // Short tail hold so last word is readable before releasing pin
      }
    );

    // Refresh ScrollTrigger when document fonts complete loading
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Debounced refresh for resize, orientationchange, fullscreenchange (~150ms)
    let resizeTimer;
    const handleResizeOrChange = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResizeOrChange);
    window.addEventListener('orientationchange', handleResizeOrChange);
    document.addEventListener('fullscreenchange', handleResizeOrChange);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResizeOrChange);
      window.removeEventListener('orientationchange', handleResizeOrChange);
      document.removeEventListener('fullscreenchange', handleResizeOrChange);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hello-section"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100vh',
        minHeight: '100svh',
        backgroundColor: '#E2E2E2',
        color: '#181818',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 6vh, 80px) 2.5rem',
        boxSizing: 'border-box'
      }}
    >
      <div
        ref={containerRef}
        className="hello-container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Editorial Headline */}
        <h2
          aria-label="HELLO, WE ARE MANIFEST TECH MEDIA."
          style={{
            fontFamily: 'var(--font-intro)',
            fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#181818',
            textTransform: 'uppercase',
            margin: '0 0 2.5rem 0',
            maxWidth: '1000px'
          }}
        >
          {headlineWordsGroup.map((item, idx) => (
            <React.Fragment key={idx}>
              <span
                className="hello-word"
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  opacity: 0.2,
                  willChange: 'opacity'
                }}
              >
                {item.text}
              </span>
              {item.breakAfter ? (
                <br aria-hidden="true" />
              ) : (
                idx < headlineWordsGroup.length - 1 && ' '
              )}
            </React.Fragment>
          ))}
        </h2>

        {/* Statement */}
        <p
          aria-label={statementText}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.35,
            color: '#181818',
            maxWidth: '860px',
            margin: 0
          }}
        >
          {statementWords.map((word, idx) => (
            <React.Fragment key={idx}>
              <span
                className="hello-word"
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  opacity: 0.2,
                  willChange: 'opacity'
                }}
              >
                {word}
              </span>
              {idx < statementWords.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </p>
      </div>

      <style>{`
        .hello-word {
          opacity: 0.2;
          will-change: opacity;
          transition: none;
        }
      `}</style>
    </section>
  );
}

