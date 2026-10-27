import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Intro({ onComplete, onFinished, onSkip }) {
  const splashRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const perimeterRef = useRef(null);
  const tlRef = useRef(null);

  const handleFinish = onComplete || onFinished || (() => {});
  const handleFinishRef = useRef(handleFinish);
  handleFinishRef.current = handleFinish;

  const handleSkipClick = () => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    if (onSkip) {
      onSkip();
    } else if (handleFinishRef.current) {
      handleFinishRef.current();
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('intro:seen', '1');
        } catch {
          /* ignore storage error */
        }
        if (handleFinishRef.current) handleFinishRef.current();
      }
    });
    tlRef.current = tl;

    // 1. Initial perimeter tags fade in & line reveal
    tl.to(perimeterRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    });

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.inOut'
    }, '-=0.3');

    tl.to(counterRef.current, {
      opacity: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');

    // 2. Slow, elegant shimmery text reveal: MANIFEST
    tl.to(title1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out'
    }, '-=0.4');

    // 3. YOUR GROWTH reveal
    tl.to(title2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out'
    }, '-=0.6');

    // 4. Hold at shimmery intro state
    tl.to({}, { duration: 0.8 });

    // 5. Smooth exit curtain fade into video reveal
    tl.to(splashRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (splashRef.current) {
          splashRef.current.style.display = 'none';
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={splashRef}
      className="intro-splash-cinematic"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0A0B10',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Perimeter Editorial Tags */}
      <div ref={perimeterRef} className="editorial-perimeter" style={{ opacity: 0, pointerEvents: 'none' }}>
        <span className="perimeter-tag top-left" style={{ opacity: 0.6, top: '40px', left: '40px' }}>
          MANIFEST TECH MEDIA
        </span>
        <span className="perimeter-tag bottom-left" style={{ opacity: 0.6, bottom: '40px', left: '40px' }}>
          SYSTEM ARCHITECTURE
        </span>
      </div>

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={handleSkipClick}
        aria-label="Skip intro animation"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 100000,
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '9999px',
          color: 'rgba(255, 255, 255, 0.85)',
          padding: '0.45rem 1rem',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #BAE6FD';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        <span>Skip intro</span>
        <span aria-hidden="true">→</span>
      </button>

      {/* Giant Background Counter */}
      <div
        ref={counterRef}
        style={{
          position: 'absolute',
          bottom: '-2vw',
          right: '3vw',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(12rem, 28vw, 32rem)',
          fontWeight: 900,
          lineHeight: 0.8,
          color: 'rgba(255, 255, 255, 0.05)',
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        01
      </div>

      {/* Radial Backlight Silhouette Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(186, 230, 253, 0.12) 0%, rgba(167, 243, 208, 0.08) 40%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }}
      />

      {/* Central Fine Axis Line */}
      <div
        ref={lineRef}
        style={{
          width: '120px',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          marginBottom: '2.5rem',
          transform: 'scaleX(0)',
          transformOrigin: 'center'
        }}
      />

      {/* Shimmery Wordmark Editorial Typography */}
      <div style={{ textAlign: 'center', zIndex: 5, padding: '0 2rem' }}>
        <div ref={title1Ref} style={{ opacity: 0, transform: 'translateY(25px)' }}>
          <h1 className="intro-wordmark">
            MANIFEST
            <span className="wordmark-sparkle-dot-wrap">
              <svg className="wordmark-sparkle-dot" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                  fill="url(#sparkleGradient)"
                />
                <defs>
                  <linearGradient id="sparkleGradient" x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#BAE6FD" />
                    <stop offset="50%" stopColor="#A7F3D0" />
                    <stop offset="100%" stopColor="#FDE68A" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
        </div>

        <h2
          ref={title2Ref}
          style={{
            fontFamily: 'var(--font-intro)',
            fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            color: 'rgba(255, 255, 255, 0.88)',
            textTransform: 'uppercase',
            margin: '0.6rem 0 0 0',
            opacity: 0,
            transform: 'translateY(25px)'
          }}
        >
          YOUR GROWTH.
        </h2>
      </div>
    </div>
  );
}
