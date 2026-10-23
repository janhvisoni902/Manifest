import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AngelVideo from '../components/AngelVideo';
import MTMSection from '../components/mtm/MTMSection';
import HelloSection from '../components/mtm/HelloSection';
import WhatWeDo from '../components/mtm/WhatWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import FoundersSection from '../components/FoundersSection';
import Footer from '../components/Footer';
import WelcomeModal from '../components/WelcomeModal';
import StrategyModal from '../components/mtm/StrategyModal';

gsap.registerPlugin(ScrollTrigger);

// The angel video + rise only plays once per page load (not on every return to "/").
let heroAlreadyPlayed = false;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Home sequence:
 *   Intro (App overlay) -> Angel video -> MTM Section (#mtm, rises over video)
 *   -> Hello Section (#hello-section) -> What We Do (#what-we-do-section)
 *   -> Why Clients Choose Us (#why-choose-us) -> Who Do We Work With (#who-we-work-with)
 *   -> Founders Section (#founders-section) -> Footer
 */
export default function Home({ sequenceState, onSkipAll }) {
  const [phase, setPhase] = useState(() => {
    const isReduced = prefersReducedMotion();
    const hasSeen = (() => {
      try {
        return sessionStorage.getItem('intro:seen') === '1';
      } catch {
        return false;
      }
    })();
    return heroAlreadyPlayed || isReduced || hasSeen ? 'done' : 'video';
  });
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  const layerRef = useRef(null);

  const skipToHero = useCallback(() => {
    try {
      sessionStorage.setItem('intro:seen', '1');
    } catch {
      /* ignore */
    }
    heroAlreadyPlayed = true;
    setPhase('done');
    if (onSkipAll) onSkipAll();
  }, [onSkipAll]);

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
        duration: 1.4,
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
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    unlockScroll();
    const t = setTimeout(() => {
      if (window.lenis) {
        if (!window.location.hash) {
          window.lenis.scrollTo(0, { immediate: true });
        }
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
      if (window.location.hash) {
        const targetEl = document.querySelector(window.location.hash);
        if (targetEl) {
          if (window.lenis) {
            window.lenis.scrollTo(targetEl, {
              duration: 1.2,
              easing: (t) => 1 - Math.pow(1 - t, 3),
              lock: false
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
      const pinnedTriggers = ScrollTrigger.getAll().filter((tr) => tr.pin);
      console.log('Pinned ScrollTriggers (Allowlist Validation):', pinnedTriggers);
    }, 150);
    return () => clearTimeout(t);
  }, [phase, unlockScroll]);

  const layerStyle =
    phase === 'done'
      ? { position: 'relative', zIndex: 2 }
      : { position: 'fixed', inset: 0, zIndex: 2, overflow: 'hidden' };

  return (
    <div
      id="home-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'clip',
        backgroundColor: '#DEDEDE'
      }}
    >
      {/* 01: Angel video (fixed behind the rising MTM layer until the rise completes) */}
      {phase !== 'done' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
          <AngelVideo play={sequenceState === 'completed'} onEnded={startRise} onSkip={skipToHero} />
        </div>
      )}

      {/* 02: MTM Section (rises over video on load, then becomes first page in normal flow) */}
      {phase !== 'video' && (
        <div ref={layerRef} style={layerStyle}>
          <MTMSection sequenceState={sequenceState} />
        </div>
      )}

      {phase === 'done' && (
        <>
          {/* 03: Hello Section */}
          <HelloSection />

          {/* 04: What We Do Section */}
          <WhatWeDo />

          {/* 05: Why Clients Choose Us */}
          <WhyChooseUs />

          {/* 06: Who Do We Work With */}
          <WhoWeWorkWith />

          {/* 07: Founders Section */}
          <FoundersSection />

          {/* 08: Footer */}
          <Footer />
        </>
      )}

      {/* Welcome / Sign-up Popup Modal (Triggers 2.5s after rise sequence settles) */}
      <WelcomeModal
        isSequenceFinished={phase === 'done'}
        onScheduleCall={() => setIsStrategyModalOpen(true)}
      />

      {/* Strategy Call Booking Modal */}
      <StrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}

