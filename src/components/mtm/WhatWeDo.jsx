import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { Link, assetUrl } from '../../lib/router';

gsap.registerPlugin(ScrollTrigger, Observer);

/* ==========================================================================
 * TUNABLE SETTINGS: horizontal scroll "hitch" (hold at each panel)
 * --------------------------------------------------------------------------
 * HOLD_MIN / HOLD_MAX  Hold length per panel, in "slides" (1 = the scroll
 *                      distance of one slide movement). Longer text = longer
 *                      hold. Override any panel with data-hold="0.8".
 *                      Rule: (HOLD_MAX / 2 + 0.5) * UNIT must stay below
 *                      ~0.8 * viewport height so one Page Down advances.
 * UNIT                 Scroll distance (px) for one slide movement.
 * SNAP_DELAY_MS        How long scrolling must be idle before settling.
 * SNAP_DURATION        Settle animation length in seconds [min, max].
 * MOVE_EASE            Ease of the sideways move between panels.
 * STRICT_PAGING        Off by default. When true, one wheel/swipe gesture
 *                      inside the section moves exactly one panel.
 * ========================================================================== */
const HOLD_MIN = 0.4;
const HOLD_MAX = 0.65;
const UNIT = () => window.innerHeight * 0.95;
const SNAP_DELAY_MS = 140;
const SNAP_DURATION = [0.25, 0.7];
const MOVE_EASE = 'power1.inOut';
const STRICT_PAGING = false;

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
        // Mobile and reduced motion: panels stack vertically via CSS. No pin, holds or snap.
        if (!isDesktop) return;

        const panels = gsap.utils.toArray(trackEl.querySelectorAll('.system-scene-panel'));
        const holdFor = (panel) => {
          const override = parseFloat(panel.dataset.hold);
          if (!Number.isNaN(override)) return override;
          const words = (panel.innerText || '').trim().split(/\s+/).filter(Boolean).length;
          return gsap.utils.clamp(HOLD_MIN, HOLD_MAX, 0.35 + words / 150);
        };

        // One timeline of alternating hold / move segments.
        const tl = gsap.timeline({ defaults: { ease: 'none' } });
        const centers = []; // timeline time of each hold centre
        const moveStarts = []; // timeline time where each move (into panel i+1) starts
        let t = 0;
        panels.forEach((panel, i) => {
          if (i > 0) {
            moveStarts.push(t);
            tl.to(trackEl, { x: () => -panel.offsetLeft, duration: 1, ease: MOVE_EASE }, t);
            t += 1;
          }
          const hold = holdFor(panel);
          centers.push(t + hold / 2);
          tl.to({}, { duration: hold }, t); // hold: nothing moves, scroll distance still passes
          t += hold;
        });

        const st = ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top top',
          end: () => '+=' + tl.duration() * UNIT(),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          animation: tl,
          invalidateOnRefresh: true,
          onRefresh: () => {
            if (window.lenis) window.lenis.resize();
          }
        });

        const centerPx = (i) => st.start + (centers[i] / tl.duration()) * (st.end - st.start);
        // Panel that owns a timeline time: the boundary is halfway through each move.
        const panelAt = (time) => moveStarts.filter((s) => time >= s + 0.5).length;

        const scrollToPx = (px, duration = 0.6) => {
          if (window.lenis) {
            window.lenis.scrollTo(px, { duration, easing: (x) => 1 - Math.pow(1 - x, 2) });
          } else {
            window.scrollTo({ top: px, behavior: 'smooth' });
          }
        };

        // Snap: debounced "scroll ended" handler (ScrollTrigger's built-in snap fights Lenis).
        let snapTimer = null;
        let snapping = false;
        const settle = () => {
          if (snapping || !st.isActive) return;
          if (document.body.style.overflow === 'hidden') return; // intro / restore still running
          const time = st.progress * tl.duration();
          // The first and last panels release freely in their outer half (hand-off zones).
          if (time <= centers[0] || time >= centers[centers.length - 1]) return;
          const i = panelAt(time);
          const target = centerPx(i);
          const dist = Math.abs(window.scrollY - target);
          if (dist < 2) return;
          const unitPx = UNIT();
          const dur = gsap.utils.clamp(SNAP_DURATION[0], SNAP_DURATION[1], (dist / unitPx) * SNAP_DURATION[1]);
          snapping = true;
          scrollToPx(target, dur);
          setTimeout(() => { snapping = false; }, dur * 1000 + 60);
        };
        const onScroll = () => {
          if (snapping) return;
          clearTimeout(snapTimer);
          snapTimer = setTimeout(settle, SNAP_DELAY_MS);
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // Keyboard focus inside an off-screen panel: bring that panel to its hold centre.
        const onFocusIn = (e) => {
          const panel = e.target.closest && e.target.closest('.system-scene-panel');
          if (!panel) return;
          triggerEl.scrollLeft = 0; // undo the browser's own scroll-into-view inside the clipped section
          const i = panels.indexOf(panel);
          if (i >= 0) scrollToPx(centerPx(i), 0.5);
        };
        triggerEl.addEventListener('focusin', onFocusIn);

        // Optional strict paging (off by default): one gesture = one panel.
        let observer = null;
        if (STRICT_PAGING) {
          let busy = false;
          const page = (dir) => {
            if (!st.isActive || busy) return;
            const i = panelAt(st.progress * tl.duration());
            const next = i + dir;
            if (next < 0 || next >= panels.length) return; // let the page scroll out of the section
            busy = true;
            if (window.lenis) {
              window.lenis.scrollTo(centerPx(next), { duration: 0.8, lock: true, onComplete: () => { busy = false; } });
            } else {
              window.scrollTo({ top: centerPx(next), behavior: 'smooth' });
              setTimeout(() => { busy = false; }, 800);
            }
          };
          observer = Observer.create({
            target: window,
            type: 'wheel,touch',
            tolerance: 10,
            onDown: () => page(1),
            onUp: () => page(-1)
          });
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          clearTimeout(snapTimer);
          window.removeEventListener('scroll', onScroll);
          triggerEl.removeEventListener('focusin', onFocusIn);
          if (observer) observer.kill();
          st.kill();
          tl.kill();
        };
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
        height: '100svh',
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
          height: '100svh',
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
            height: '100svh',
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
            src={assetUrl('/images/what-we-do-hero.jpg')}
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
            height: '100svh',
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
              height: '100svh',
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
                fontSize: 'clamp(3rem, min(8.5vw, 14svh), 8rem)',
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
            height: '100svh',
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
              marginBottom: 'clamp(0.6rem, 2svh, 1.2rem)'
            }}
          >
            — THE REVENUE SYSTEM
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2rem, min(5.5vw, 9svh), 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 clamp(0.8rem, 3svh, 2rem) 0',
              textTransform: 'uppercase'
            }}
          >
            THE FIVE-STAGE ENGINE
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.5rem, 1.8svh, 1.2rem)',
              maxWidth: '900px',
              marginBottom: 'clamp(1rem, 4svh, 2.5rem)'
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
                  paddingBottom: 'clamp(0.4rem, 1.2svh, 0.8rem)'
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
        @media (max-width: 767px), (prefers-reduced-motion: reduce) {
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


