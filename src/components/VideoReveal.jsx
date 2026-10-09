import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * VideoReveal Component
 * Automatic (non-scroll) cinematic transition between Intro and Home:
 * 1. Black background (#000000)
 * 2. Small centered portal window displaying angel video (/videos/intro-reveal.mp4)
 * 3. Automatic GSAP window expansion (24vw x 50vh -> 100vw x 100vh)
 * 4. Intensifying white light beam & full-screen white bloom flash (#E9E9E9)
 * 5. Instant handoff at peak white bloom to the working Home section (CanvasHero 300-frame white angel sequence)
 */
export default function VideoReveal({ isActive, onFinished }) {
  const overlayRef = useRef(null);
  const windowRef = useRef(null);
  const videoRef = useRef(null);
  const beamGlowRef = useRef(null);
  const whiteBloomRef = useRef(null);

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const windowEl = windowRef.current;
    const video = videoRef.current;
    const beamGlow = beamGlowRef.current;
    const whiteBloom = whiteBloomRef.current;

    if (!overlay || !windowEl || !video || !beamGlow || !whiteBloom) return;

    if (!isActive) return;

    let hasEnded = false;

    const finishReveal = () => {
      if (hasEnded) return;
      hasEnded = true;

      // Immediately hide overlay while whiteBloom is at opacity 1.0 (#E9E9E9)
      // to prevent fading whiteBloom down and exposing the dark video frame underneath.
      if (overlay) overlay.style.display = 'none';
      if (onFinished) onFinished();
      setIsFinished(true);
    };

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      finishReveal();
      return;
    }

    // 1. Play Angel Video inside window
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // 2. Set initial GSAP state
    gsap.set(windowEl, {
      width: '24vw',
      height: '50vh',
      maxWidth: '420px',
      maxHeight: '580px',
      borderRadius: '8px'
    });
    gsap.set(beamGlow, { opacity: 0.15, scale: 0.8, filter: 'blur(20px)' });
    gsap.set(whiteBloom, { opacity: 0 });

    // 3. Automatic GSAP Timeline (No scroll required)
    const tl = gsap.timeline({ delay: 0.1 });

    // Window expands smoothly from small portal to 100vw x 100vh full screen (0.4s -> 2.6s)
    tl.to(
      windowEl,
      {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        borderRadius: '0px',
        duration: 2.2,
        ease: 'power2.inOut'
      },
      0.4
    );

    // Layered white beam glow intensifies behind/around angel video (0.4s -> 2.6s)
    tl.to(
      beamGlow,
      {
        opacity: 0.95,
        scale: 4.5,
        filter: 'blur(40px)',
        duration: 2.2,
        ease: 'power2.inOut'
      },
      0.4
    );

    // White light beam blooms into full-screen studio light grey (#E9E9E9) (2.2s -> 3.0s)
    tl.to(
      beamGlow,
      {
        opacity: 1.0,
        scale: 12.0,
        filter: 'blur(60px)',
        duration: 0.8,
        ease: 'power3.in'
      },
      2.2
    );

    tl.to(
      whiteBloom,
      {
        opacity: 1.0,
        duration: 0.8,
        ease: 'power3.inOut'
      },
      2.2
    );

    // Hold white screen briefly (3.0s -> 3.2s)
    tl.to({}, { duration: 0.2 });

    // Handoff to Home immediately at peak white bloom
    tl.add(() => {
      finishReveal();
    });

    const handleEnded = () => {
      finishReveal();
    };

    video.addEventListener('ended', handleEnded);

    const safeguardTimer = setTimeout(() => {
      if (!hasEnded) finishReveal();
    }, 4500);

    return () => {
      if (video) video.removeEventListener('ended', handleEnded);
      clearTimeout(safeguardTimer);
      tl.kill();
    };
  }, [isActive, onFinished]);

  if (!isActive || isFinished) return null;

  return (
    <div
      ref={overlayRef}
      className="video-reveal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Centered Expanding Portal Window */}
      <div
        ref={windowRef}
        style={{
          position: 'relative',
          width: '24vw',
          height: '50vh',
          maxWidth: '420px',
          maxHeight: '580px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#000000',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'width, height, borderRadius'
        }}
      >
        {/* Angel Video Asset inside Expanding Portal Window */}
        <video
          ref={videoRef}
          src="/videos/intro-reveal.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'grayscale(100%) contrast(125%) brightness(0.95)',
            display: 'block'
          }}
        />

        {/* Enhanced Radial Beam Glow */}
        <div
          ref={beamGlowRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30vw',
            height: '70vh',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 35%, rgba(255, 255, 255, 0.25) 65%, rgba(0, 0, 0, 0) 100%)',
            filter: 'blur(25px)',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform, opacity, filter',
            zIndex: 10
          }}
        />
      </div>

      {/* Full-Screen Blinding White Bloom Flash Overlay (Matches CanvasHero #E9E9E9) */}
      <div
        ref={whiteBloomRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#E9E9E9',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 20,
          willChange: 'opacity'
        }}
      />
    </div>
  );
}
