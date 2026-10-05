import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playEntrance } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

export default function HelloSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const DEBUG = isDebugMode();
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, isMobile, isReduced } = context.conditions;
        if (isReduced) {
          playEntrance(content);
          return;
        }

        // 1. Bottom-to-top Entrance triggered when Hello reaches viewport
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => playEntrance(content),
          markers: DEBUG
        });

        // 2. Short visual hold pin
        const holdEnd = isDesktop ? '+=40%' : isMobile ? '+=25%' : '+=25%';

        const holdTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: holdEnd,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            markers: DEBUG,
            invalidateOnRefresh: true
          }
        });

        holdTl.to(content, {
          scale: 0.98,
          opacity: 0.9,
          duration: 0.2,
          ease: 'power1.inOut'
        });
      }
    );

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

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
        padding: '140px 2.5rem 160px',
        boxSizing: 'border-box'
      }}
    >
      <div
        ref={contentRef}
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          willChange: 'transform, opacity'
        }}
      >
        {/* 1. Large Editorial Headline - h2 to ensure only single H1 on page */}
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
            transform: 'translateY(40px)'
          }}
        >
          HELLO,<br />
          WE ARE<br />
          MANIFEST TECH MEDIA.
        </h2>

        {/* 2. Statement */}
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
            transform: 'translateY(40px)'
          }}
        >
          We help global brands turn paid traffic into predictable, scalable revenue — aligning every dollar with real backend growth.
        </p>
      </div>
    </section>
  );
}
