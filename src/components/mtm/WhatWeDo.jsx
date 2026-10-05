import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../../lib/router';
import { createHitchTrigger, isDebugMode } from '../../lib/hitch';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const containerRef = useRef(null);
  const pointRefs = useRef([]);

  const pointsData = [
    {
      type: 'hero',
      id: 'wwd-point-0',
      imgSrc: '/images/what-we-do-hero.jpg',
      alt: 'WHAT WE DO — Manifest Tech Media'
    },
    {
      type: 'intro',
      id: 'wwd-point-1',
      badge: '— THE SYSTEM',
      title: 'WE TURN AD SPEND INTO REVENUE SYSTEMS.',
      desc: 'A continuous architecture engineered to align brand authority, media acquisition, and unit economics into scalable enterprise growth.'
    },
    {
      type: 'pillar',
      id: 'wwd-point-2',
      num: '01',
      total: '05',
      title: 'VISION',
      subtitle: 'MARKET AUTHORITY & BRAND POSITIONING',
      desc: 'Defining market dominance, high-status category positioning, and strategic growth opportunity identification.'
    },
    {
      type: 'pillar',
      id: 'wwd-point-3',
      num: '02',
      total: '05',
      title: 'STRATEGY',
      subtitle: 'UNIT ECONOMICS & CAPITAL ALLOCATION',
      desc: 'Algorithmic capital allocation models built around strict CPA targets, LTV expansion, and ROAS sustainability.'
    },
    {
      type: 'pillar',
      id: 'wwd-point-4',
      num: '03',
      total: '05',
      title: 'CREATIVE',
      subtitle: 'EDITORIAL MEDIA & HIGH-CONVERTING VSLS',
      desc: 'Cinematic fashion-film visual direction combined with high-impact VSL scriptwriting and ad creative iterations.'
    },
    {
      type: 'pillar',
      id: 'wwd-point-5',
      num: '04',
      total: '05',
      title: 'ACQUISITION',
      subtitle: 'MULTI-CHANNEL MEDIA BUYING AT SCALE',
      desc: 'High-scale ad buying infrastructure across Meta, Google, and TikTok to acquire qualified cold traffic.'
    },
    {
      type: 'pillar-last',
      id: 'wwd-point-6',
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

        pointRefs.current.forEach((pointEl, idx) => {
          if (!pointEl) return;
          const isLast = idx === pointRefs.current.length - 1;
          const isFullHeight = pointEl.offsetHeight >= window.innerHeight * 0.75;
          const shouldHitch = isDesktop && !isLast && isFullHeight && !isReduced;

          const animateEntrance = () => {
            gsap.fromTo(
              pointEl,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
          };

          if (shouldHitch) {
            createHitchTrigger({
              sectionEl: pointEl,
              sectionName: `WhatWeDo-Point-${idx}`,
              holdDurationMs: 500, // Short controlled 0.5s pause per point
              onAnimate: animateEntrance
            });
          } else {
            ScrollTrigger.create({
              trigger: pointEl,
              start: 'top 80%',
              markers: DEBUG,
              invalidateOnRefresh: true,
              onEnter: animateEntrance
            });
          }
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="what-we-do-section"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        margin: 0,
        padding: 0
      }}
    >
      <div className="wwd-points-container" style={{ width: '100%' }}>
        {/* POINT 0: WHAT WE DO HERO IMAGE */}
        <div
          ref={(el) => (pointRefs.current[0] = el)}
          id={pointsData[0].id}
          className="wwd-point"
          style={{
            width: '100vw',
            minHeight: '100svh',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#0F1017',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            opacity: 0,
            transform: 'translateY(40px)',
            willChange: 'transform, opacity'
          }}
        >
          <img
            src={pointsData[0].imgSrc}
            alt={pointsData[0].alt}
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

        {/* POINT 1: THE SYSTEM INTRO */}
        <div
          ref={(el) => (pointRefs.current[1] = el)}
          id={pointsData[1].id}
          className="wwd-point"
          style={{
            width: '100%',
            minHeight: '100svh',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '120px clamp(2rem, 8vw, 10rem)',
            boxSizing: 'border-box',
            opacity: 0,
            transform: 'translateY(40px)',
            willChange: 'transform, opacity'
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
            {pointsData[1].badge}
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
            {pointsData[1].title}
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
            {pointsData[1].desc}
          </p>
        </div>

        {/* POINTS 2-5: PILLARS 01-04 */}
        {pointsData.slice(2, 6).map((pillar, idx) => (
          <div
            key={pillar.id}
            ref={(el) => (pointRefs.current[idx + 2] = el)}
            id={pillar.id}
            className="wwd-point"
            style={{
              width: '100%',
              minHeight: '100svh',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '120px clamp(2rem, 10vw, 12rem)',
              boxSizing: 'border-box',
              position: 'relative',
              opacity: 0,
              transform: 'translateY(40px)',
              willChange: 'transform, opacity'
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

        {/* POINT 6: PILLAR 05 + REVENUE STAGES (LAST POINT - NO HITCH) */}
        <div
          ref={(el) => (pointRefs.current[6] = el)}
          id={pointsData[6].id}
          className="wwd-point"
          style={{
            width: '100%',
            minHeight: '100svh',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '120px clamp(2rem, 8vw, 10rem)',
            boxSizing: 'border-box',
            opacity: 0,
            transform: 'translateY(40px)',
            willChange: 'transform, opacity'
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
    </section>
  );
}
