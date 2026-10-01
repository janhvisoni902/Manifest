import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useRouter } from '../lib/router';
import { manifestIndustriesData } from '../data/manifestIndustriesData';

export default function WhoWeWorkWith() {
  const { navigate } = useRouter();
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

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
      id="who-we-work-with"
      onClick={handleBackdropClick}
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        backgroundColor: '#E9E9E9',
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
            pointerEvents: selectedIndustryId ? 'none' : 'auto'
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
            href="/contact"
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
            WORK WITH US →
          </Link>
        </motion.div>

        {/* Floating Industry Cards (Desktop Composition) */}
        <div className="desktop-floating-layer">
          {manifestIndustriesData.map((ind) => {
            const isHovered = hoveredId === ind.id;
            const isSelected = selectedIndustryId === ind.id;
            const isAnySelected = selectedIndustryId !== null;

            // Z-Index hierarchy: Selected (200) > Hovered (100) > Base (5)
            const cardZIndex = isSelected ? 200 : isHovered ? 100 : 5;
            const pos = floatingPositions[ind.id] || { top: '20%', left: '20%' };
            const params = floatingParams[ind.id] || { floatRange: [0, -10, 0], duration: 6, delay: 0 };

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                whileInView={{ opacity: 1, scale: isSelected ? 1.25 : 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                animate={
                  isSelected
                    ? {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        x: '-50%',
                        y: '-50%',
                        scale: 1.28,
                        opacity: 1,
                        filter: 'none'
                      }
                    : isAnySelected
                    ? {
                        opacity: 0.2,
                        scale: 0.9,
                        filter: 'grayscale(100%) blur(1px)'
                      }
                    : {
                        top: pos.top,
                        left: pos.left,
                        right: pos.right,
                        bottom: pos.bottom,
                        x: 0,
                        y: isHovered ? -8 : 0,
                        scale: isHovered ? 1.1 : 1,
                        opacity: 1,
                        filter: 'none'
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: isSelected ? 260 : 320,
                  damping: isSelected ? 24 : 28,
                  mass: 0.8
                }}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => handleCardClick(e, ind)}
                style={{
                  position: 'absolute',
                  ...(!isSelected ? pos : {}),
                  zIndex: cardZIndex,
                  width: '230px',
                  cursor: 'pointer',
                  pointerEvents: 'auto'
                }}
              >
                {/* Floating motion effect (only active when not selected) */}
                <motion.div
                  animate={isSelected ? { y: 0 } : { y: params.floatRange }}
                  transition={
                    isSelected
                      ? { duration: 0.3 }
                      : { duration: params.duration, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="floating-card-inner"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '12px',
                    border: isSelected
                      ? '1.5px solid #181818'
                      : isHovered
                      ? '1px solid rgba(24, 24, 24, 0.4)'
                      : '1px solid rgba(24, 24, 24, 0.12)',
                    borderRadius: '6px',
                    boxShadow: isSelected
                      ? '0 25px 50px rgba(0, 0, 0, 0.22), 0 0 35px rgba(255, 255, 255, 0.7)'
                      : isHovered
                      ? '0 18px 36px rgba(0, 0, 0, 0.14), 0 0 20px rgba(255, 255, 255, 0.45)'
                      : '0 8px 24px rgba(0, 0, 0, 0.05)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '145px',
                      backgroundColor: '#181818',
                      overflow: 'hidden',
                      borderRadius: '3px',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={ind.imgSrc}
                      alt={ind.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: isSelected ? 'none' : 'grayscale(100%) contrast(106%)',
                        transform: isHovered && !isSelected ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.5s ease, filter 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: isSelected ? '0.75rem' : '0.68rem',
                        fontWeight: isSelected ? 800 : 700,
                        letterSpacing: '0.14em',
                        color: '#181818',
                        textTransform: 'uppercase'
                      }}
                    >
                      [{ind.title}]
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.65rem',
                        color: isSelected ? '#181818' : 'rgba(24, 24, 24, 0.4)',
                        fontWeight: isSelected ? 800 : 400
                      }}
                    >
                      {isSelected ? 'VIEW →' : `0${manifestIndustriesData.indexOf(ind) + 1}`}
                    </span>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        marginTop: '4px',
                        paddingTop: '8px',
                        borderTop: '1px solid rgba(24, 24, 24, 0.15)',
                        textAlign: 'center'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.16em',
                          color: '#181818',
                          textTransform: 'uppercase'
                        }}
                      >
                        VIEW INDUSTRY DETAILS →
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Fallback Grid */}
        <div className="mobile-grid-layer">
          {manifestIndustriesData.map((ind) => {
            const isSelected = selectedIndustryId === ind.id;
            return (
              <div
                key={ind.id}
                onClick={(e) => handleCardClick(e, ind)}
                className="mobile-card-item"
                style={{
                  backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                  border: isSelected ? '1.5px solid #181818' : '1px solid rgba(24, 24, 24, 0.12)',
                  borderRadius: '6px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected ? '0 12px 30px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '160px',
                    backgroundColor: '#181818',
                    overflow: 'hidden',
                    borderRadius: '3px',
                    marginBottom: '0.8rem'
                  }}
                >
                  <img
                    src={ind.imgSrc}
                    alt={ind.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(100%) contrast(106%)'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#181818',
                      textTransform: 'uppercase'
                    }}
                  >
                    [{ind.title}]
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#181818'
                    }}
                  >
                    {isSelected ? 'TAP TO VIEW →' : 'SELECT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .desktop-floating-layer {
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .mobile-grid-layer {
          display: none;
          width: 100%;
          margin-top: 3.5rem;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 1023px) {
          .who-we-work-container {
            min-height: auto !important;
          }
          .desktop-floating-layer {
            display: none !important;
          }
          .mobile-grid-layer {
            display: grid !important;
          }
        }

        @media (max-width: 580px) {
          .mobile-grid-layer {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
