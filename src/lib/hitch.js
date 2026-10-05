import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Strict Allowlist: ONLY these 3 sections may be pinned or hitched (plus WhatWeDo horizontal scroll)
export const PIN_SECTIONS = ['#hello-section', '#why-choose-us', '#who-we-work-with'];

let activeHitchSection = null;

export const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

/**
 * Creates a time-based hitch trigger for an allowlisted section:
 * - start: "top top", end: "+=12%", pin: true, pinSpacing: true, anticipatePin: 1
 * - onEnter (downward scroll): freezes scroll for 800ms while content animates on timer, then releases automatically
 */
export function createHitchTrigger({
  sectionEl,
  sectionName,
  onAnimate,
  holdDurationMs = 800
}) {
  if (!sectionEl) return () => {};

  const DEBUG = isDebugMode();
  let hasHitched = false;

  const unlock = () => {
    if (activeHitchSection === sectionName) {
      activeHitchSection = null;
    }
    if (window.lenis) {
      window.lenis.start();
    } else {
      document.body.style.overflow = '';
    }
    if (DEBUG) console.log(`[Hitch END] ${sectionName}`);
  };

  const handleGlobalUnlock = () => unlock();
  window.addEventListener('visibilitychange', handleGlobalUnlock);
  window.addEventListener('blur', handleGlobalUnlock);
  window.addEventListener('error', handleGlobalUnlock);

  const trigger = ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top top',
    end: '+=12%',
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    markers: DEBUG,
    invalidateOnRefresh: true,
    onEnter: (self) => {
      if (hasHitched) return;
      if (activeHitchSection !== null) return;
      if (self.direction !== 1) return; // Downward scroll only

      // Velocity check: skip freeze if scrolling too slowly or stopped
      const velocity = window.lenis ? Math.abs(window.lenis.velocity) : Math.abs(self.getVelocity());
      if (velocity < 0.05 && Math.abs(self.getVelocity()) < 10) {
        if (onAnimate) onAnimate();
        return;
      }

      hasHitched = true;
      activeHitchSection = sectionName;

      if (DEBUG) console.log(`[Hitch START] ${sectionName}`);

      // 1. Pause Lenis / scroll
      if (window.lenis) {
        window.lenis.stop();
      } else {
        document.body.style.overflow = 'hidden';
      }

      // Hard fallback unlock at 1.2s max
      const failsafe = setTimeout(unlock, 1200);

      // 2. Play inner content animation on timer
      if (onAnimate) onAnimate();

      // 3. Release after holdDurationMs
      setTimeout(() => {
        clearTimeout(failsafe);
        unlock();
      }, holdDurationMs);
    },
    onLeaveBack: () => {
      hasHitched = false;
    },
    onLeave: () => {
      hasHitched = false;
    }
  });

  return () => {
    window.removeEventListener('visibilitychange', handleGlobalUnlock);
    window.removeEventListener('blur', handleGlobalUnlock);
    window.removeEventListener('error', handleGlobalUnlock);
    unlock();
    trigger.kill();
  };
}
