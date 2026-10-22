import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, assetUrl } from '../lib/router';
import { contactInfo } from '../data/contact';
import { isDebugMode } from '../lib/hitch';
import { revealDuration, revealStagger, softerEase } from '../lib/scrollPace';
import VideoTestimonial from './VideoTestimonial';
import { testimonialsData } from '../data/testimonialsData';

gsap.registerPlugin(ScrollTrigger);

function CardImageSlot({ id }) {
  const [activeSrc, setActiveSrc] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const extensions = ['webp', 'jpg', 'png'];

    const checkCandidate = (index) => {
      if (index >= extensions.length) return;
      const ext = extensions[index];
      const src = assetUrl(`/section-images/${id}.${ext}`);
      const img = new Image();
      img.onload = () => {
        if (isMounted) setActiveSrc(src);
      };
      img.onerror = () => {
        checkCandidate(index + 1);
      };
      img.src = src;
    };

    checkCandidate(0);
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div
      style={{
        width: '100%',
        height: '260px',
        backgroundColor: '#16171E',
        background: 'linear-gradient(135deg, #14151B 0%, #1E202A 100%)',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '1.2rem',
        position: 'relative'
      }}
      aria-hidden="true"
    >
      {activeSrc ? (
        <img
          src={activeSrc}
          alt=""
          loading="lazy"
          width="100%"
          height="260"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="card-image-zoom"
        />
      ) : (
        /* Blank placeholder block in site's existing dark palette */
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#16171E',
            background: 'linear-gradient(135deg, #14151B 0%, #1E202A 100%)'
          }}
          alt=""
          aria-hidden="true"
          data-placeholder={`${id}-image-placeholder`}
        />
      )}
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  const cards = [
    {
      num: '01',
      id: 'revenue-system',
      title: 'REVENUE SYSTEM',
      desc: 'The system behind sustainable growth.',
      linkText: 'EXPLORE →',
      href: '/system',
      comment: 'Revenue System: abstract dashboard or growth chart'
    },
    {
      num: '02',
      id: 'testimonials',
      title: 'TESTIMONIALS',
      desc: 'What our clients say.',
      linkText: 'EXPLORE →',
      href: '/case-studies',
      comment: 'Testimonials: client portrait or quote graphic (only with permission)'
    },
    {
      num: '03',
      id: 'results',
      title: 'RESULTS',
      desc: 'Growth you can measure.',
      linkText: 'EXPLORE →',
      href: '/case-studies',
      comment: 'Results: charts or metrics'
    },
    {
      num: '04',
      id: 'why-us',
      title: 'WHY US',
      desc: 'Manifest Tech Media focuses on client relationships and results. We always deliver substance, not false promises, ensuring we maximize your budget, so you get the most return on investment (ROI).',
      linkText: 'EXPLORE →',
      href: '/founders',
      comment: 'Why Us: team or workspace'
    }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const DEBUG = isDebugMode();

    const animateContent = () => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.7),
            stagger: revealStagger(0.12),
            ease: softerEase('power3.out')
          }
        );
      }
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.7),
            stagger: revealStagger(0.1),
            ease: softerEase('power3.out')
          }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.7),
            stagger: revealStagger(0.1),
            ease: softerEase('power3.out')
          }
        );
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      markers: DEBUG,
      invalidateOnRefresh: true,
      onEnter: animateContent
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        backgroundColor: '#DEDEDE',
        color: '#181818',
        padding: '140px 2.5rem 160px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* HERO */}
        <div ref={heroRef} style={{ marginBottom: '5rem', willChange: 'transform, opacity' }}>
          <h2
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(3.2rem, 7vw, 6.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#181818',
              textTransform: 'uppercase',
              margin: '0 0 1.5rem 0',
              maxWidth: '900px'
            }}
          >
            WHY CLIENTS<br />
            CHOOSE US?
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              fontWeight: 400,
              color: 'rgba(24, 24, 24, 0.7)',
              margin: 0
            }}
          >
            "Because growth should be built to last."
          </p>
        </div>

        {/* FOUR CARDS GRID */}
        <div
          ref={cardsRef}
          className="why-choose-us-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.8rem',
            marginBottom: '7rem'
          }}
        >
          {cards.map((card) => (
            <div
              key={card.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid rgba(24, 24, 24, 0.2)',
                paddingTop: '1.2rem',
                willChange: 'transform, opacity'
              }}
            >
              {/* Card Image Slot */}
              {card.id === 'revenue-system' && (
                /* Revenue System: abstract dashboard or growth chart */
                <CardImageSlot id={card.id} />
              )}
              {card.id === 'testimonials' && (
                /* Testimonials: client portrait or quote graphic (only with permission) */
                <div style={{ marginBottom: '1.2rem' }}>
                  <VideoTestimonial testimonial={testimonialsData[0]} />
                </div>
              )}
              {card.id === 'results' && (
                /* Results: charts or metrics */
                <CardImageSlot id={card.id} />
              )}
              {card.id === 'why-us' && (
                /* Why Us: team or workspace */
                <CardImageSlot id={card.id} />
              )}

              {/* Card Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'rgba(24, 24, 24, 0.45)',
                    display: 'block'
                  }}
                >
                  [{card.num}]
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-intro)',
                    fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#181818',
                    margin: 0,
                    textTransform: 'uppercase'
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'rgba(24, 24, 24, 0.68)',
                    lineHeight: 1.45,
                    margin: '0 0 0.8rem 0'
                  }}
                >
                  {card.desc}
                </p>

                <div>
                  <Link
                    href={card.href}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#181818',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      display: 'inline-block'
                    }}
                  >
                    {card.linkText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div
          ref={ctaRef}
          style={{
            borderTop: '1px solid rgba(24, 24, 24, 0.2)',
            paddingTop: '4.5rem',
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto',
            willChange: 'transform, opacity'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#181818',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase'
            }}
          >
            READY<br />
            TO GROW?
          </h3>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
              color: 'rgba(24, 24, 24, 0.68)',
              margin: '0 0 2.2rem 0'
            }}
          >
            "Let's build what's next."
          </p>

          <Link
            href={`mailto:${contactInfo.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '1rem 2.4rem',
              backgroundColor: '#181818',
              color: '#FFFFFF',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            START A PROJECT →
          </Link>
        </div>
      </div>

      <style>{`
        .why-choose-us-grid > div:hover .card-image-zoom {
          transform: scale(1.05);
        }
        @media (max-width: 991px) {
          .why-choose-us-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          .why-choose-us-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
