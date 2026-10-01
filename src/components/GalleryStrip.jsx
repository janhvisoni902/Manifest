import React, { useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

const galleryItems = [
  { id: '1', title: 'Tecno Mobile Launch', alt: 'Tecno Mobile Brand Activation', image: '/images/frame1-2026.png', type: 'tecno' },
  { id: '2', title: 'Ceat Tyres Campaign', alt: 'Ceat Brand Activation Stage', image: '/images/frame2-2026.png', type: 'ceat' },
  { id: '3', title: 'Tissot Luxury Showcase', alt: 'Tissot Store & Exhibition Activation', image: '/images/frame3-2026.png', type: 'tissot' },
  { id: '4', title: 'Wockhardt Experiential', alt: 'Wockhardt Themed Event & Stage', image: '/images/frame4-2026.png', type: 'wockhardt' },
  { id: '5', title: 'Paragon Flagship Event', alt: 'Paragon Brand Launch Spectacle', image: '/images/frame5-2026.png', type: 'paragon' },
  { id: '6', title: 'CEAT Retail Showcase', alt: 'CEAT Interactive Activation', image: '/images/frame6-2026.png', type: 'ceat' },
  { id: '7', title: 'Prestige Brand Launch', alt: 'Prestige Consumer Activation', image: '/images/frame7-2026.png', type: 'prestige' },
  { id: '8', title: 'Prestige Retail Setup', alt: 'Prestige Experiential Retail Display', image: '/images/frame8-2026.png', type: 'prestige' },
];

export default function GalleryStrip() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Column fraction state tracker for GSAP interpolation
  const colFractions = useRef({
    c0: 1, c1: 1, c2: 1, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1
  });

  // 1. Entrance scroll reveal sequences
  useGSAP(() => {
    gsap.fromTo(
      '.gallery-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: containerRef });

  // 2. Buttery smooth GSAP accordion column & corner transitions
  useGSAP(() => {
    const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
    if (!isDesktop) return;

    // Define column fractions target mapping
    const target = {
      c0: hoveredIndex === 0 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c1: hoveredIndex === 1 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c2: hoveredIndex === 2 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c3: hoveredIndex === 3 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c4: hoveredIndex === 4 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c5: hoveredIndex === 5 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c6: hoveredIndex === 6 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
      c7: hoveredIndex === 7 ? 3.6 : (hoveredIndex === null ? 1 : 0.6),
    };

    // Animate fraction values smoothly with GSAP
    gsap.to(colFractions.current, {
      ...target,
      duration: 0.9,
      ease: 'power4.out',
      onUpdate: () => {
        if (trackRef.current) {
          const c = colFractions.current;
          trackRef.current.style.gridTemplateColumns = `${c.c0}fr ${c.c1}fr ${c.c2}fr ${c.c3}fr ${c.c4}fr ${c.c5}fr ${c.c6}fr ${c.c7}fr`;
        }
      },
      overwrite: 'auto'
    });

    // Morph card border radius using the same GSAP curve
    galleryItems.forEach((_, idx) => {
      const card = cardRefs.current[idx];
      if (card) {
        gsap.to(card, {
          borderRadius: idx === hoveredIndex ? '16px' : '9999px',
          duration: 0.9,
          ease: 'power4.out',
          overwrite: 'auto'
        });
      }
    });

  }, [hoveredIndex]);

  return (
    <section
      id="explore-gallery"
      ref={containerRef}
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-small)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            Explore By Medium
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              color: 'var(--color-text)',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            Worlds built frame by frame.
          </h2>
        </div>

        {/* Gallery Grid Wrapper */}
        <div
          role="region"
          aria-label="Project gallery"
          className="gallery-container"
        >
          <div
            ref={trackRef}
            className="gallery-track"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '12px',
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            {galleryItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <a
                  href={`#work?category=${item.type}`}
                  key={item.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  tabIndex={0}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`gallery-card ${isHovered ? 'expanded' : ''}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    outline: 'none',
                    zIndex: isHovered ? 10 : 1,
                    opacity: 1,
                  }}
                >
                  {/* Real cover-fit image */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      transition: 'transform 0.4s ease'
                    }}
                    className="card-image"
                  />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Desktop styles: fits perfectly in a single frame */
        @media (min-width: 1025px) {
          .gallery-container {
            max-width: 1600px;
            width: 100%;
            margin: 0 auto;
          }
          
          .gallery-card {
            height: clamp(480px, 60vh, 680px);
            aspect-ratio: 1 / 3.2; /* Make the oval frames narrower and more vertical */
            border-radius: 9999px;
            border: none;
            /* Handled entirely by GSAP on desktop */
          }
        }

        /* Tablet Layout: wrap to 4 columns per row */
        @media (max-width: 1024px) and (min-width: 769px) {
          .gallery-container {
            width: 90%;
            margin: 0 auto;
          }
          .gallery-track {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 14px;
          }
          .gallery-card {
            aspect-ratio: 1 / 1 !important;
            border-radius: 16px !important;
            height: auto !important;
            margin: 0 auto;
            width: 100%;
            transition: transform 0.3s ease;
          }
        }

        /* Mobile Layout: wrap to 2 columns per row */
        @media (max-width: 768px) {
          .gallery-container {
            width: 95%;
            margin: 0 auto;
          }
          .gallery-track {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px;
          }
          .gallery-card {
            aspect-ratio: 1 / 1 !important;
            border-radius: 16px !important;
            height: auto !important;
            margin: 0 auto;
            width: 100%;
            transition: transform 0.3s ease;
          }
        }

        .gallery-card:focus-visible {
          outline: 2px solid var(--color-accent-burgundy) !important;
          outline-offset: 4px;
          border-radius: 20px;
        }

        .gallery-card:hover .card-image {
          transform: scale(1.04);
        }
      `}} />
    </section>
  );
}
