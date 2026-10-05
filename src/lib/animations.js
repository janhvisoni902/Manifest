import gsap from 'gsap';

/**
 * Shared entrance animation function for MTM and Hello sections.
 * Animates opacity 0 -> 1, y: 40 -> 0, duration: 0.7s, ease: power3.out, stagger: 0.15s.
 * For reduced motion, performs opacity-only fade without vertical movement.
 */
export function playEntrance(containerEl, options = {}) {
  if (!containerEl) return null;

  const isReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = containerEl.querySelectorAll('.animate-item, h1, h2, h3, p, button, .stat-item');
  const items = targets && targets.length > 0 ? Array.from(targets) : [containerEl];

  const tl = gsap.timeline(options);

  if (isReduced) {
    tl.fromTo(
      items,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  } else {
    tl.fromTo(
      items,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }
    );
  }

  return tl;
}
