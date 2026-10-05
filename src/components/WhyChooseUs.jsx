import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../lib/router';
import { contactInfo } from '../data/contact';
import { createHitchTrigger, isDebugMode } from '../lib/hitch';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  const cards = [
    {
      num: '01',
      title: 'REVENUE SYSTEM',
      desc: 'The system behind sustainable growth.',
      linkText: 'EXPLORE →',
      href: '/system',
      imgSrc: '/frames/frame_0001.jpg'
    },
    {
      num: '02',
      title: 'TESTIMONIALS',
      desc: 'What our clients say.',
      linkText: 'EXPLORE →',
      href: '/case-studies',
      imgSrc: '/frames/frame_0050.jpg'
    },
    {
      num: '03',
      title: 'RESULTS',
      desc: 'Growth you can measure.',
      linkText: 'EXPLORE →',
      href: '/case-studies',
      imgSrc: '/frames/frame_0100.jpg'
    },
    {
      num: '04',
      title: 'WHY US',
      desc: 'Strategy built around the whole business.',
      linkText: 'EXPLORE →',
      href: '/founders',
      imgSrc: '/frames/frame_0200.jpg'
    }
  ];

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

        const animateContent = () => {
          if (heroRef.current) {
            gsap.fromTo(
              heroRef.current.children,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
            );
          }
          if (cardsRef.current) {
            gsap.fromTo(
              cardsRef.current.children,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
            );
          }
          if (ctaRef.current) {
            gsap.fromTo(
              ctaRef.current.children,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
            );
          }
        };

        if (isReduced) {
          animateContent();
          return;
        }

        if (isDesktop) {
          createHitchTrigger({
            sectionEl: el,
            sectionName: 'WhyChooseUs',
            holdDurationMs: 800,
            onAnimate: animateContent
          });
        } else {
          // Mobile: ScrollTrigger entrance reveal only
          ScrollTrigger.create({
            trigger: el,
            start: 'top 75%',
            markers: DEBUG,
            invalidateOnRefresh: true,
            onEnter: animateContent
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        backgroundColor: '#E9E9E9',
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
              {/* Card Image Area */}
              <div
                style={{
                  width: '100%',
                  height: '260px',
                  backgroundColor: '#181818',
                  overflow: 'hidden',
                  marginBottom: '1.2rem',
                  position: 'relative'
                }}
              >
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'grayscale(100%) contrast(108%)',
                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className="card-image-zoom"
                />
              </div>

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
