import { ScrollTrigger } from 'gsap/ScrollTrigger';

let debouncedTimer = null;

export function debouncedRefresh(delayMs = 150) {
  if (debouncedTimer) clearTimeout(debouncedTimer);
  debouncedTimer = setTimeout(() => {
    if (window.lenis) window.lenis.resize();
    ScrollTrigger.refresh();
  }, delayMs);
}

export function initGlobalRefreshListeners() {
  if (typeof window === 'undefined') return () => {};

  const handleRefresh = () => debouncedRefresh(150);

  window.addEventListener('resize', handleRefresh);
  window.addEventListener('orientationchange', handleRefresh);
  window.addEventListener('fullscreenchange', handleRefresh);

  if (document.fonts) {
    document.fonts.ready.then(() => debouncedRefresh(150));
  }

  return () => {
    window.removeEventListener('resize', handleRefresh);
    window.removeEventListener('orientationchange', handleRefresh);
    window.removeEventListener('fullscreenchange', handleRefresh);
  };
}
