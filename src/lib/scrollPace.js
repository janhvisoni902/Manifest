export const PACE = 1.25; // 1 = original feel, higher = slower. 1.15 = a hint, 1.35 = clearly slower.

/**
 * scaleDuration(d) -> d * PACE, capped at 2.0 (smoother)
 */
export function scaleDuration(d) {
  if (typeof d !== 'number' || Number.isNaN(d)) return d;
  return Math.min(d * PACE, 2.0);
}

/**
 * scaleLerp(l) -> max(l / PACE, 0.06)
 */
export function scaleLerp(l) {
  if (typeof l !== 'number' || Number.isNaN(l)) return l;
  return Math.max(l / PACE, 0.06);
}

/**
 * scaleWheel(w) -> max(w / PACE, 0.7)
 */
export function scaleWheel(w) {
  if (typeof w !== 'number' || Number.isNaN(w)) return w;
  return Math.max(w / PACE, 0.7);
}

/**
 * sceneFactor() -> multiplier for pin distances
 * Avoid double slowdown:
 * Lowering wheelMultiplier already makes every scene take more wheel input on desktop with a smoother.
 * So on desktop with a smoother: multiplier = PACE / actualWheelFactor.
 * With w = 1.0, scaleWheel(1.0) = max(1.0 / 1.25, 0.7) = max(0.8, 0.7) = 0.8.
 * actualWheelFactor = originalW / scaledW = 1.0 / 0.8 = 1.25.
 * So PACE / actualWheelFactor = 1.25 / 1.25 = 1.0.
 * On coarse-pointer/touch devices (or if no smoother): multiplier = PACE.
 */
export function sceneFactor() {
  if (typeof window === 'undefined') return 1;
  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (isCoarse || !window.lenis) {
    return PACE;
  }
  // Desktop with smoother:
  // Original wheelMultiplier is 1.0.
  const originalW = 1.0;
  const scaledW = scaleWheel(originalW);
  const actualWheelFactor = originalW / scaledW; // e.g. 1.0 / 0.8 = 1.25
  return PACE / actualWheelFactor; // 1.25 / 1.25 = 1.0
}

/**
 * scaleScrub(s) -> true / 0-ish -> 1; a number -> clamp to 1 - 1.2
 */
export function scaleScrub(s) {
  if (s === true || s === 0 || s === '0' || !s) {
    return 1;
  }
  if (typeof s === 'number') {
    return Math.min(Math.max(s, 1), 1.2);
  }
  return 1;
}

/**
 * revealDuration(d) -> min(d * 1.2, 1.4)
 */
export function revealDuration(d) {
  if (typeof d !== 'number' || Number.isNaN(d)) return 0.84;
  return Math.min(d * 1.2, 1.4);
}

/**
 * revealStagger(s) -> s * 1.2
 */
export function revealStagger(s) {
  if (typeof s !== 'number' || Number.isNaN(s)) return 0.12;
  return s * 1.2;
}

/**
 * softerEase(name) -> one step softer (power1->power2, power2->power3; leave power3 and stronger as they are)
 */
export function softerEase(name) {
  if (!name || typeof name !== 'string') return name;

  // Handles 'power1.out' -> 'power2.out', 'power1.inOut' -> 'power2.inOut', 'power1' -> 'power2'
  if (name.startsWith('power1')) {
    return name.replace('power1', 'power2');
  }
  if (name.startsWith('power2')) {
    return name.replace('power2', 'power3');
  }
  // power3, power4, expo, circ, etc. remain unchanged
  return name;
}

/**
 * Helper to soften framer-motion easing bezier curves if applicable.
 * [0.25, 1, 0.5, 1] is cubic-bezier (ease-out-ish) - keeping or slightly softening.
 */

/**
 * anchorDuration(distancePx) -> clamp(1.2, distancePx / 1800, 2.4)
 */
export function anchorDuration(distancePx) {
  const dist = Math.abs(distancePx || 0);
  const calculated = dist / 1800;
  return Math.min(Math.max(calculated, 1.2), 2.4);
}

