import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Allowlist: What We Do horizontal scroll track only
export const PIN_SECTIONS = ['#system', '#what-we-do-section'];

export const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

/**
 * Entrance reveal trigger helper without any scroll pinning or input freezing.
 */
export function createHitchTrigger({
  sectionEl,
  onAnimate
}) {
  if (!sectionEl) return () => {};

  const DEBUG = isDebugMode();

  const trigger = ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top 75%',
    markers: DEBUG,
    invalidateOnRefresh: true,
    onEnter: () => {
      if (onAnimate) onAnimate();
    }
  });

  return () => {
    trigger.kill();
  };
}

