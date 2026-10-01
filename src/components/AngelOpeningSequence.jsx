import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AngelOpeningSequence({ onSequenceComplete }) {
  const containerRef = useRef(null);
  const blackStageRef = useRef(null);
  const angelBoxRef = useRef(null);
  const angelImgRef = useRef(null);
  const beamRef = useRef(null);
  const flashRef = useRef(null);

  const videoStageRef = useRef(null);
  const videoRef = useRef(null);
  const textContainerRef = useRef(null);

  const [stage, setStage] = useState('opening'); // 'opening' | 'video' | 'complete'

  // Configurable Copy & Timing for Easy Editing
  const CONTENT_CONFIG = {
    badge: 'MANIFEST TECH MEDIA · REVENUE ARCHITECTURE',
    titleLine1: 'YOUR NEXT $10M',
    titleLine2: 'IS A SYSTEM PROBLEM.',
    titleLine3: 'NOT A YOU PROBLEM.',
    subtitle: 'We build compounding revenue machines for high-margin, high-growth platforms.',
    fallbackDurationMs: 6500
  };

  useEffect(() => {
    const blackStage = blackStageRef.current;
    const angelBox = angelBoxRef.current;
    const beam = beamRef.current;
    const flash = flashRef.current;

    if (!blackStage || !angelBox || !beam || !flash) return;

    // AUTOMATIC GSAP TIMELINE (Does not require scrolling)
    const mainTl = gsap.timeline({
      onComplete: () => {
        setStage('video');
      }
    });

    // 1. Initial State: Angel in darkness
    gsap.set(angelBox, { scale: 1 });
    gsap.set(beam, { opacity: 0, width: '40px', filter: 'blur(20px)' });
    gsap.set(flash, { opacity: 0 });

    // 2. Light beam emerges behind angel silhouette (0.4s)
    mainTl.to(
      beam,
      {
        opacity: 0.95,
        width: '260px',
        filter: 'blur(16px)',
        duration: 1.2,
        ease: 'power2.in'
      },
      0.4
    );

    // 3. Automatic camera zoom toward angel (0.8s -> 3.0s)
    mainTl.to(
      angelBox,
      {
        scale: 5.8,
        duration: 2.2,
        ease: 'power2.inOut'
      },
      0.8
    );

    // 4. Light beam blooms outward to full viewport width (2.2s -> 3.0s)
    mainTl.to(
      beam,
      {
        width: '100vw',
        opacity: 1,
        filter: 'blur(4px)',
        duration: 0.8,
        ease: 'power3.in'
      },
      2.2
    );

    // 5. Overexposing full-screen white light bloom flash (2.8s -> 3.3s)
    mainTl.to(
      flash,
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.in'
      },
      2.8
    );

    return () => {
      mainTl.kill();
    };
  }, []);

  // When stage shifts to 'video', play video & animate side text
  useEffect(() => {
    if (stage !== 'video') return;

    const video = videoRef.current;
    const textContainer = textContainerRef.current;
    let fallbackTimer = null;
    let completed = false;

    const finishSequence = () => {
      if (completed) return;
      completed = true;

      // Animate video stage transition out into HelloSection
      gsap.to(containerRef.current, {
        opacity: 0.9,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          setStage('complete');
          if (onSequenceComplete) onSequenceComplete();
        }
      });
    };

    // Play Video
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          fallbackTimer = setTimeout(finishSequence, CONTENT_CONFIG.fallbackDurationMs);
        });
      }
    }

    // Text Reveal Animation during video
    if (textContainer) {
      const textItems = textContainer.querySelectorAll('.animate-text-item');
      gsap.fromTo(
        textItems,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.25,
          ease: 'power3.out',
          delay: 0.4
        }
      );
    }

    // Handle native video ended event
    const handleEnded = () => {
      finishSequence();
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
    }

    // Failsafe timer (6.5s max)
    fallbackTimer = setTimeout(finishSequence, CONTENT_CONFIG.fallbackDurationMs);

    return () => {
      if (video) video.removeEventListener('ended', handleEnded);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [stage, onSequenceComplete]);

  return (
    <div
      ref={containerRef}
      id="angel-opening-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      {/* STAGE 1 & 2: BLACK ANGEL IMAGE & AUTOMATIC ZOOM + LIGHT BEAM */}
      {stage === 'opening' && (
        <div
          ref={blackStageRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Centered Uncropped Dark Angel Image Container */}
          <div
            ref={angelBoxRef}
            style={{
              position: 'relative',
              width: '28vw',
              height: '56vh',
              maxWidth: '480px',
              maxHeight: '620px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform'
            }}
          >
            <img
              ref={angelImgRef}
              src="/public/assets/images/hero-sequence/frame-001.jpg"
              alt="Dark Angel Silhouette Visual"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block'
              }}
            />

            {/* Moving Light Beam Overlay */}
            <div
              ref={beamRef}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0) 100%)',
                filter: 'blur(20px)',
                opacity: 0,
                pointerEvents: 'none',
                willChange: 'width, opacity, filter'
              }}
            />
          </div>

          {/* Full-Screen White Bloom Flash Overlay */}
          <div
            ref={flashRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#FFFFFF',
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 40,
              willChange: 'opacity'
            }}
          />
        </div>
      )}

      {/* STAGE 3: ANGEL VIDEO & EDITORIAL SIDE TEXT */}
      {(stage === 'video' || stage === 'complete') && (
        <div
          ref={videoStageRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Angel Video Element */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <video
              ref={videoRef}
              src="/videos/intro-reveal.mp4"
              muted
              playsInline
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'grayscale(100%) contrast(120%) brightness(0.88)',
                display: 'block'
              }}
            />
          </div>

          {/* Vignette Mask */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.92) 80%)',
              pointerEvents: 'none'
            }}
          />

          {/* Editorial Side & Central Text Reveal */}
          <div
            ref={textContainerRef}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '90%',
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
              gap: '3rem',
              alignItems: 'center',
              color: '#FFFFFF',
              pointerEvents: 'none'
            }}
            className="opening-video-text-grid"
          >
            {/* Left Headline */}
            <div>
              <span
                className="animate-text-item"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '1rem',
                  opacity: 0
                }}
              >
                [{CONTENT_CONFIG.badge}]
              </span>

              <h1
                className="animate-text-item"
                style={{
                  fontFamily: 'var(--font-intro, sans-serif)',
                  fontSize: 'clamp(2.8rem, 6vw, 5.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  margin: 0,
                  opacity: 0,
                  textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
                }}
              >
                {CONTENT_CONFIG.titleLine1}<br />
                {CONTENT_CONFIG.titleLine2}<br />
                <span style={{ color: 'rgba(255, 255, 255, 0.55)' }}>{CONTENT_CONFIG.titleLine3}</span>
              </h1>
            </div>

            {/* Right Subtitle Card */}
            <div
              className="animate-text-item"
              style={{
                backgroundColor: 'rgba(20, 20, 20, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '2.2rem 2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                opacity: 0,
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: 0,
                  fontWeight: 400
                }}
              >
                "{CONTENT_CONFIG.subtitle}"
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .opening-video-text-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
