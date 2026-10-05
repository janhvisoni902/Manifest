import gsap from 'gsap';

/**
 * Shared entrance animation helper for MTM and Hello sections.
 * Animates opacity (0 -> 1) and y-translation (30px -> 0px) using power3.out.
 */
export function playIntro(el, options = {}) {
  if (!el) return null;
  const isReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = el.querySelectorAll
    ? el.querySelectorAll('.animate-item, h1, h2, p, span, button, a')
    : [el];
  const items = targets.length > 0 ? Array.from(targets) : [el];

  if (isReduced) {
    return gsap.fromTo(
      items,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        onComplete: options.onComplete
      }
    );
  }

  return gsap.fromTo(
    items,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: options.delay || 0,
      onComplete: options.onComplete
    }
  );
}
