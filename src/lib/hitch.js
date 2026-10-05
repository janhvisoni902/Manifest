import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeHitchSection = null;

export const isDebugMode = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('debug=true') || window.location.search.includes('debug=1'));

/**
 * Creates a time-based hitch sequence on a section:
 * 1. Arrives: top of section reaches viewport (start: "top 85%")
 * 2. Settles: eases to top if within ~15% of viewport
 * 3. Pauses: holds still for holdDurationMs while content animates on timer
 * 4. Releases: resumes smooth scrolling automatically
 */
export function createHitchTrigger({
  sectionEl,
  sectionName,
  onAnimate,
  holdDurationMs = 800,
  skipHitch = false
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
    start: 'top 85%',
    end: 'bottom top',
    markers: DEBUG,
    invalidateOnRefresh: true,
    onEnter: (self) => {
      // 1. Check conditions
      if (skipHitch) {
        if (onAnimate) onAnimate();
        return;
      }
      if (hasHitched) return;
      if (activeHitchSection !== null) return;
      if (self.direction !== 1) return; // Downward scroll only

      // 2. Velocity check: active downward scroll only
      const velocity = window.lenis ? Math.abs(window.lenis.velocity) : Math.abs(self.getVelocity());
      if (velocity < 0.05 && Math.abs(self.getVelocity()) < 10) {
        if (onAnimate) onAnimate();
        return;
      }

      hasHitched = true;
      activeHitchSection = sectionName;

      if (DEBUG) console.log(`[Hitch START] ${sectionName}`);

      // 3. Pause Lenis / scroll
      if (window.lenis) {
        window.lenis.stop();
      } else {
        document.body.style.overflow = 'hidden';
      }

      // Failsafe timeout at 1.2s max
      const failsafe = setTimeout(unlock, 1200);

      // 4. Settle to section top if within 15% viewport
      const rect = sectionEl.getBoundingClientRect();
      if (Math.abs(rect.top) < window.innerHeight * 0.15) {
        if (window.lenis) {
          window.lenis.scrollTo(sectionEl, {
            duration: 0.35,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            force: true
          });
        }
      }

      // 5. Play inner content animation
      if (onAnimate) onAnimate();

      // 6. Hold & Release after holdDurationMs
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
