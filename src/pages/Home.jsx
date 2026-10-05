import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AngelVideo from '../components/AngelVideo';
import HelloSection from '../components/mtm/HelloSection';
import WhatWeDo from '../components/mtm/WhatWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import LeadersSection from '../components/LeadersSection';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// The angel video + rise only plays once per page load (not on every return to "/").
let heroAlreadyPlayed = false;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Home flow:
 *   Intro (App overlay) -> Angel video -> MTM page rises bottom-to-top over the video
 *   -> normal scroll: Hello -> What We Do -> Why Clients Choose Us -> Who We Work With
 *   -> Leaders -> Footer.
 *
 * phase: 'video'  = angel video is playing, scroll locked
 *        'rising' = Hello (MTM) layer is sliding up over the video
 *        'done'   = everything is in normal document flow
 */
export default function Home({ sequenceState }) {
  const [phase, setPhase] = useState(() =>
    heroAlreadyPlayed || prefersReducedMotion() ? 'done' : 'video'
  );
  // Text of the Hello section auto-plays during the rise instead of waiting on scroll.
  const helloImmediateRef = useRef(phase !== 'done');
  const layerRef = useRef(null);

  const startRise = useCallback(() => {
    setPhase((p) => (p === 'video' ? 'rising' : p));
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    const lenis = window.lenis;
    if (lenis) {
      lenis.start();
      lenis.resize();
    }
  }, []);

  // Keep scroll locked while the video plays and the layer rises.
  // rAF so this runs after App's own scroll-unlock effect for the same commit.
  useEffect(() => {
    if (phase === 'done') return;
    const raf = requestAnimationFrame(() => {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    });
    return () => cancelAnimationFrame(raf);
  }, [phase, sequenceState]);

  // Never leave the page locked if Home unmounts mid-sequence.
  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  // Rise animation: MTM layer slides up from below the viewport over the video.
  useLayoutEffect(() => {
    if (phase !== 'rising') return;
    const layer = layerRef.current;
    if (!layer) return;

    const tween = gsap.fromTo(
      layer,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.5,
        ease: 'power3.inOut',
        clearProps: 'transform',
        onComplete: () => {
          heroAlreadyPlayed = true;
          setPhase('done');
        }
      }
    );
    return () => tween.kill();
  }, [phase]);

  // Once everything is back in document flow, re-measure scroll positions.
  useEffect(() => {
    if (phase !== 'done') return;
    heroAlreadyPlayed = true;
    window.scrollTo(0, 0);
    unlockScroll();
    const t = setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(t);
  }, [phase, unlockScroll]);

  const layerStyle =
    phase === 'done'
      ? { position: 'relative', zIndex: 2 }
      : { position: 'fixed', inset: 0, zIndex: 2, overflow: 'hidden' };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        backgroundColor: '#E9E9E9'
      }}
    >
      {/* 01: Angel video (fixed behind the rising MTM layer until the rise completes) */}
      {phase !== 'done' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
          <AngelVideo play={sequenceState === 'completed'} onEnded={startRise} />
        </div>
      )}

      {/* 02: MTM page, "HELLO, WE ARE MANIFEST TECH MEDIA" (rises over the video) */}
      {phase !== 'video' && (
        <div ref={layerRef} style={layerStyle}>
          <HelloSection immediate={helloImmediateRef.current} />
        </div>
      )}

      {phase === 'done' && (
        <>
          {/* 03: What We Do */}
          <WhatWeDo />

          {/* 04: Why Clients Choose Us */}
          <WhyChooseUs />

          {/* 05: Who We Work With */}
          <WhoWeWorkWith />

          {/* 06: Leaders */}
          <LeadersSection />

          {/* 07: Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
