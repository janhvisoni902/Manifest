import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

export default function HelloSection({ immediate = false }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const statementRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
        if (isReduced) return;

        if (isDesktop && !immediate) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: '+=40%',
              pin: true,
              pinSpacing: true,
              scrub: 0.5,
              markers: DEBUG,
              invalidateOnRefresh: true
            }
          });

          if (headlineRef.current) {
            tl.fromTo(
              headlineRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
          }

          if (statementRef.current) {
            tl.fromTo(
              statementRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
              '-=0.2'
            );
          }

          tl.to(el, {
            scale: 0.98,
            opacity: 0.9,
            duration: 0.2,
            ease: 'power1.inOut'
          });
        } else {
          const tl = gsap.timeline(
            immediate
              ? { delay: 0.3 }
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                    markers: DEBUG
                  }
                }
          );

          if (headlineRef.current) {
            tl.fromTo(
              headlineRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
            );
          }

          if (statementRef.current) {
            tl.fromTo(
              statementRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
              '-=0.4'
            );
          }
        }
      }
    );

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

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
            maxWidth: '1000px',
            willChange: 'transform, opacity'
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
            margin: 0,
            willChange: 'transform, opacity'
          }}
        >
          We help global brands turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.
        </p>
      </div>
    </section>
  );
}
