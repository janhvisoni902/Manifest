import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * DoorTransition component:
 * Renders a pure black background (#000000) with a centered rectangular portal door.
 * As the user scrolls through Step 2:
 * The central portal door scales smoothly from 22vw x 48vh to 100vw x 100vh.
 * Upon completing portal expansion, the user enters the automatic Home opening sequence.
 */
export default function DoorTransition({ children }) {
  const containerRef = useRef(null);
  const doorRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const door = doorRef.current;
    if (!container || !door) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: '+=1200',
              pin: true,
              pinSpacing: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onRefresh: () => {
                if (window.lenis) window.lenis.resize();
              }
            }
          })
          .fromTo(
            door,
            {
              width: '22vw',
              height: '48vh',
              borderRadius: '6px'
            },
            {
              width: '100vw',
              height: '100vh',
              borderRadius: '0px',
              ease: 'power2.inOut'
            }
          );
        } else {
          gsap.set(door, {
            width: '100vw',
            height: '100vh',
            borderRadius: '0px'
          });
        }
      }
    );

    const handleResize = () => {
      if (window.lenis) window.lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="door-transition-section"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      }}
    >
      {/* Centered Rectangular Portal Door */}
      <div
        ref={doorRef}
        style={{
          position: 'relative',
          width: '22vw',
          height: '48vh',
          overflow: 'hidden',
          backgroundColor: '#000000',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95)',
          willChange: 'width, height',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Revealed Home Visual / Sequence inside Portal */}
        <div
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto'
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
