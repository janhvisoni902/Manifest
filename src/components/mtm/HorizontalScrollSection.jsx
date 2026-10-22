import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneFactor, scaleScrub } from '../../lib/scrollPace';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection({ children }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.max(1200, track.scrollWidth - window.innerWidth) * sceneFactor()}`,
          pin: true,
          pinSpacing: true,
          scrub: scaleScrub(1.2),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: () => {
            if (window.lenis) {
              window.lenis.resize();
            }
          }
        }
      });
    }, container);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(track);
    }

    // Refresh GSAP ScrollTrigger after dynamic layout renders
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="horizontal-scroll-container"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0F1017'
      }}
    >
      <div
        ref={trackRef}
        className="horizontal-scroll-track"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: '100vh',
          width: 'max-content',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}
