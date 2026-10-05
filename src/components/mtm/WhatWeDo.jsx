import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../../lib/router';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const triggerRef = useRef(null);
  const trackRef = useRef(null);

  const pillars = [
    {
      num: '01',
      total: '05',
      title: 'VISION',
      subtitle: 'MARKET AUTHORITY & BRAND POSITIONING',
      desc: 'Defining market dominance, high-status category positioning, and strategic growth opportunity identification.'
    },
    {
      num: '02',
      total: '05',
      title: 'STRATEGY',
      subtitle: 'UNIT ECONOMICS & CAPITAL ALLOCATION',
      desc: 'Algorithmic capital allocation models built around strict CPA targets, LTV expansion, and ROAS sustainability.'
    },
    {
      num: '03',
      total: '05',
      title: 'CREATIVE',
      subtitle: 'EDITORIAL MEDIA & HIGH-CONVERTING VSLS',
      desc: 'Cinematic fashion-film visual direction combined with high-impact VSL scriptwriting and ad creative iterations.'
    },
    {
      num: '04',
      total: '05',
      title: 'ACQUISITION',
      subtitle: 'MULTI-CHANNEL MEDIA BUYING AT SCALE',
      desc: 'High-scale ad buying infrastructure across Meta, Google, and TikTok to acquire qualified cold traffic.'
    },
    {
      num: '05',
      total: '05',
      title: 'CONVERSION',
      subtitle: 'FUNNEL DYNAMICS & RETENTION ENGINE',
      desc: 'Custom high-converting funnel architectures, automated appointment pipelines, and backend retention loops.'
    }
  ];

  const revenueStages = [
    { num: 'STAGE 01', title: 'ATTENTION', desc: 'High-status creative media and strategic market positioning.' },
    { num: 'STAGE 02', title: 'ACQUISITION', desc: 'High-scale media buying infrastructure across cold ad networks.' },
    { num: 'STAGE 03', title: 'CONVERSION', desc: 'High-converting VSLs, custom sales pages, and CRO engines.' },
    { num: 'STAGE 04', title: 'REVENUE', desc: 'Automated calendar booking pipelines and qualified lead flow.' },
    { num: 'STAGE 05', title: 'SCALE', desc: 'CPA protection, LTV expansion, and recurring backend yield.' }
  ];

  useEffect(() => {
    const triggerEl = triggerRef.current;
    const trackEl = trackRef.current;
    if (!triggerEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 767px), (prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          const getScrollDistance = () => {
            const trackWidth = trackEl.scrollWidth;
            const viewportWidth = window.innerWidth;
            return Math.max(0, trackWidth - viewportWidth);
          };

          gsap.to(trackEl, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top top',
              end: () => `+=${getScrollDistance()}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
              onRefresh: () => {
                if (window.lenis) {
                  window.lenis.resize();
                }
              }
            }
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      id="what-we-do-section"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        margin: 0,
        padding: 0
      }}
    >
      <div
        ref={trackRef}
        className="horizontal-scroll-track"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: '100vh',
          alignItems: 'center',
          willChange: 'transform',
          width: 'max-content',
          margin: 0
        }}
      >
        {/* PANEL 01: WHAT WE DO HERO IMAGE */}
        <div
          className="system-scene-panel"
          style={{
            flex: '0 0 100vw',
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#0F1017',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}
        >
          <img
            src="/images/what-we-do-hero.jpg"
            alt="WHAT WE DO — Manifest Tech Media"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'grayscale(100%) contrast(105%)',
              display: 'block'
            }}
          />
        </div>

        {/* PANEL 02: THE SYSTEM INTRO */}
        <div
          className="system-scene-panel"
          style={{
            flex: '0 0 100vw',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 clamp(2rem, 8vw, 10rem)',
            boxSizing: 'border-box'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'block',
              marginBottom: '1.5rem'
            }}
          >
            — THE SYSTEM
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              maxWidth: '1100px',
              margin: '0 0 2rem 0'
            }}
          >
            WE TURN AD SPEND INTO REVENUE SYSTEMS.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '780px',
              margin: 0
            }}
          >
            A continuous architecture engineered to align brand authority, media acquisition, and unit economics into scalable enterprise growth.
          </p>
        </div>

        {/* PANELS 03-07: THE 5 PILLARS */}
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="system-scene-panel"
            style={{
              flex: '0 0 100vw',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 clamp(2rem, 10vw, 12rem)',
              boxSizing: 'border-box',
              position: 'relative'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  display: 'block'
                }}
              >
                [{pillar.num} / {pillar.total}]
              </span>
              <span
                style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase'
                }}
              >
                {pillar.subtitle}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-intro)',
                fontSize: 'clamp(3.5rem, 8.5vw, 8rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: '#FFFFFF',
                margin: '0 0 1.8rem 0',
                textTransform: 'uppercase'
              }}
            >
              {pillar.title}
            </h3>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '680px',
                margin: 0
              }}
            >
              {pillar.desc}
            </p>
          </div>
        ))}

        {/* PANEL 08: THE REVENUE SYSTEM PROGRESSIVE FLOW + CTA */}
        <div
          className="system-scene-panel"
          style={{
            flex: '0 0 100vw',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 clamp(2rem, 8vw, 10rem)',
            boxSizing: 'border-box'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'block',
              marginBottom: '1.2rem'
            }}
          >
            — THE REVENUE SYSTEM
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 2rem 0',
              textTransform: 'uppercase'
            }}
          >
            THE FIVE-STAGE ENGINE
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              maxWidth: '900px',
              marginBottom: '2.5rem'
            }}
          >
            {revenueStages.map((stage) => (
              <div
                key={stage.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 180px 1fr',
                  alignItems: 'center',
                  gap: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingBottom: '0.8rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.4)'
                  }}
                >
                  {stage.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-intro)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '0.04em'
                  }}
                >
                  {stage.title}
                </span>
                <span
                  style={{
                    fontSize: '0.92rem',
                    color: 'rgba(255, 255, 255, 0.65)'
                  }}
                >
                  {stage.desc}
                </span>
              </div>
            ))}
          </div>

          <div>
            <Link
              href="/system"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '1rem 2.2rem',
                backgroundColor: '#FFFFFF',
                color: '#000000',
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
              EXPLORE THE REVENUE SYSTEM →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #what-we-do-section {
            height: auto !important;
            overflow: visible !important;
          }
          .horizontal-scroll-track {
            flex-direction: column !important;
            width: 100% !important;
            height: auto !important;
            transform: none !important;
          }
          .system-scene-panel {
            width: 100% !important;
            height: auto !important;
            min-height: 80vh !important;
            padding: 5rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
