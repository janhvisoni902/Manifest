import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useRouter } from '../lib/router';
import { manifestIndustriesData } from '../data/manifestIndustriesData';
import { isDebugMode } from '../lib/hitch';
import { revealDuration, revealStagger, softerEase } from '../lib/scrollPace';

gsap.registerPlugin(ScrollTrigger);

const industryLines = {
  'founders': 'You built the offer. We build the engine that sells it.',
  'ecommerce': 'Ads and creative tied to profit, so growth stays profitable.',
  'saas-ai': 'Demand that turns into demos and trials.',
  'service-businesses': 'A steady flow of qualified calls, booked automatically.',
  'coaches-consultants': 'Content, VSLs and funnels that fill your calendar.',
  'dtc-brands': 'Creative and media buying that build a brand people buy again.'
};

export default function WhoWeWorkWith() {
  const { navigate } = useRouter();
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  const sectionRef = useRef(null);
  const centerRef = useRef(null);
  const floatingLayerRef = useRef(null);

  // Position presets for 6 desktop floating items around center
  const floatingPositions = {
    'founders': { top: '8%', left: '7%' },
    'ecommerce': { top: '6%', right: '8%' },
    'saas-ai': { top: '44%', left: '4%' },
    'service-businesses': { top: '46%', right: '5%' },
    'coaches-consultants': { bottom: '12%', left: '9%' },
    'dtc-brands': { bottom: '10%', right: '9%' }
  };

  const floatingParams = {
    'founders': { floatRange: [0, -12, 0, 8, 0], duration: 6.2, delay: 0 },
    'ecommerce': { floatRange: [0, 10, 0, -10, 0], duration: 7.0, delay: 0.4 },
    'saas-ai': { floatRange: [0, -10, 0, 12, 0], duration: 6.8, delay: 0.8 },
    'service-businesses': { floatRange: [0, 12, 0, -8, 0], duration: 7.4, delay: 0.2 },
    'coaches-consultants': { floatRange: [0, -8, 0, 10, 0], duration: 6.5, delay: 0.6 },
    'dtc-brands': { floatRange: [0, 10, 0, -12, 0], duration: 7.2, delay: 1.0 }
  };

  // Listen for Escape key to reset selected card
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndustryId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hitch setup using createHitchTrigger
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const DEBUG = isDebugMode();

    const animateContent = () => {
      const cards = floatingLayerRef.current
        ? Array.from(floatingLayerRef.current.children)
        : [];

      if (centerRef.current) {
        gsap.fromTo(
          centerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.7),
            ease: softerEase('power3.out')
          }
        );
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { scale: 0.85, opacity: 0, y: 25 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: revealDuration(0.7),
            stagger: revealStagger(0.12),
            ease: softerEase('power3.out')
          }
        );
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 70%',
      markers: DEBUG,
      invalidateOnRefresh: true,
      onEnter: animateContent
    });

    return () => trigger.kill();
  }, []);

  const handleCardClick = (e, ind) => {
    e.stopPropagation();
    if (selectedIndustryId === ind.id) {
      // Second click: Navigate to industry page
      navigate(`/industries/${ind.slug}`);
    } else {
      // First click: Focus / center card
      setSelectedIndustryId(ind.id);
    }
  };

  const handleBackdropClick = () => {
    if (selectedIndustryId) {
      setSelectedIndustryId(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="who-we-work-with"
      onClick={handleBackdropClick}
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        backgroundColor: '#E2E2E2',
        color: '#181818',
        padding: '140px 2rem 160px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        cursor: selectedIndustryId ? 'pointer' : 'default'
      }}
    >
      {/* Container with Floating Layout */}
      <div
        className="who-we-work-container"
        style={{
          position: 'relative',
          maxWidth: '1380px',
          minHeight: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Central Content */}
        <motion.div
          ref={centerRef}
          animate={{
            opacity: selectedIndustryId ? 0.22 : 1,
            scale: selectedIndustryId ? 0.95 : 1
          }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            maxWidth: '620px',
            padding: '2rem 1rem',
            pointerEvents: selectedIndustryId ? 'none' : 'auto',
            willChange: 'transform, opacity'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(3.2rem, 6.8vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#181818',
              textTransform: 'uppercase',
              margin: '0 0 1.4rem 0'
            }}
          >
            WHO DO<br />
            WE WORK<br />
            WITH?
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.35rem)',
              fontWeight: 400,
              color: 'rgba(24, 24, 24, 0.7)',
              margin: '0 0 2.4rem 0',
              lineHeight: 1.4
            }}
          >
            "Brands ready to turn attention into growth."
          </p>

          <Link
            href="/book"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.9rem 2.2rem',
              backgroundColor: '#181818',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Book a Strategy Call
          </Link>
        </motion.div>

        {/* Floating Industry Cards (Desktop Composition) */}
        <div ref={floatingLayerRef} className="desktop-floating-layer">
          {manifestIndustriesData.map((ind, index) => {
            const isHovered = hoveredId === ind.id;
            const isSelected = selectedIndustryId === ind.id;
            const isAnySelected = selectedIndustryId !== null;
            const numStr = String(index + 1).padStart(2, '0');

            // Z-Index hierarchy: Selected (200) > Hovered (100) > Base (5)
            const cardZIndex = isSelected ? 200 : isHovered ? 100 : 5;
            const pos = floatingPositions[ind.id] || { top: '20%', left: '20%' };
            const params = floatingParams[ind.id] || { floatRange: [0, -10, 0], duration: 6, delay: 0 };

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={
                  isSelected
                    ? {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        x: '-50%',
                        y: '-50%',
                        scale: 1.25,
                        opacity: 1
                      }
                    : {
                        top: pos.top,
                        left: pos.left,
                        right: pos.right,
                        bottom: pos.bottom,
                        x: 0,
                        opacity: isAnySelected ? 0.25 : 1,
                        scale: isHovered ? 1.05 : 1
                      }
                }
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => !isAnySelected && setHoveredId(ind.id)}
                onMouseLeave={() => !isAnySelected && setHoveredId(null)}
                onClick={(e) => handleCardClick(e, ind)}
                className={`floating-industry-card ${isSelected ? 'selected' : ''}`}
                style={{
                  position: 'absolute',
                  zIndex: cardZIndex,
                  width: '280px',
                  backgroundColor: '#181818',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '1.4rem',
                  boxSizing: 'border-box',
                  boxShadow: isSelected
                    ? '0 30px 90px rgba(0, 0, 0, 0.55)'
                    : isHovered
                    ? '0 20px 50px rgba(0, 0, 0, 0.35)'
                    : '0 10px 30px rgba(0, 0, 0, 0.18)',
                  cursor: 'pointer',
                  willChange: 'transform, opacity'
                }}
              >
                {/* Float Bounce Inner Wrapper */}
                <motion.div
                  animate={isSelected ? { y: 0 } : { y: params.floatRange }}
                  transition={
                    isSelected
                      ? { duration: 0.3 }
                      : {
                          duration: params.duration,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                          delay: params.delay
                        }
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.8rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        color: 'rgba(255, 255, 255, 0.45)'
                      }}
                    >
                      [{numStr}]
                    </span>
                    {ind.metric && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {ind.metric}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-intro, sans-serif)',
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      margin: '0 0 0.5rem 0',
                      textTransform: 'uppercase'
                    }}
                  >
                    {ind.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      lineHeight: 1.45,
                      color: 'rgba(255, 255, 255, 0.72)',
                      margin: 0
                    }}
                  >
                    {industryLines[ind.id] || ind.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .who-we-work-container {
            min-height: auto !important;
          }
          .desktop-floating-layer {
            position: relative !important;
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
            gap: 1.5rem !important;
            width: 100% !important;
            margin-top: 3rem !important;
          }
          .floating-industry-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
