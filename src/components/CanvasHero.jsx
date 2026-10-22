import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '../lib/router';
import { sceneFactor, scaleScrub } from '../lib/scrollPace';

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  framesFolder: '/frames/',
  frameNamePrefix: 'frame_',
  frameNamePadding: 4,
  frameExtension: '.jpg',

  // Full 295-frame white angel sequence
  frameCount: 295,
  frameStartIndex: 1
};

export default function CanvasHero({ sequenceState }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const spacerRef = useRef(null);
  const canvasRef = useRef(null);

  const manifestRef = useRef(null);
  const growthRef = useRef(null);

  const [loadPercent, setLoadPercent] = useState(0);
  const [activeFrame, setActiveFrame] = useState(1);

  const stateRef = useRef({
    images: [],
    loadedCount: 0,
    currentFrameIndex: 0,
    isLoaded: false,
    hasValidImages: false,
  });

  function getPrimaryFrameUrl(index) {
    const paddedIndex = String(index).padStart(CONFIG.frameNamePadding, '0');
    return assetUrl(`${CONFIG.framesFolder}${CONFIG.frameNamePrefix}${paddedIndex}${CONFIG.frameExtension}`);
  }

  function renderFrame(index) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const containerWidth = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    const containerHeight = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;

    if (containerWidth <= 0 || containerHeight <= 0) return;

    if (canvas.width !== Math.floor(containerWidth * dpr) || canvas.height !== Math.floor(containerHeight * dpr)) {
      canvas.width = Math.floor(containerWidth * dpr);
      canvas.height = Math.floor(containerHeight * dpr);
    }

    // Light grey studio background
    ctx.fillStyle = '#E2E2E2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle ambient lighting behind angel silhouette
    const glowRadius = Math.max(canvas.width, canvas.height) * 0.6;
    const ambientGlow = ctx.createRadialGradient(
      canvas.width / 2, canvas.height * 0.42, 0,
      canvas.width / 2, canvas.height * 0.42, glowRadius
    );
    ambientGlow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    ambientGlow.addColorStop(0.5, 'rgba(240, 240, 240, 0.25)');
    ambientGlow.addColorStop(1, 'rgba(226, 226, 226, 0)');

    ctx.fillStyle = ambientGlow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let img = state.images[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded white angel frame
      for (let offset = 1; offset < CONFIG.frameCount; offset++) {
        const prevIndex = index - offset;
        if (prevIndex >= 0 && state.images[prevIndex] && state.images[prevIndex].complete && state.images[prevIndex].naturalWidth > 0) {
          img = state.images[prevIndex];
          break;
        }
        const nextIndex = index + offset;
        if (nextIndex < CONFIG.frameCount && state.images[nextIndex] && state.images[nextIndex].complete && state.images[nextIndex].naturalWidth > 0) {
          img = state.images[nextIndex];
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      state.currentFrameIndex = index;

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const isMobile = window.innerWidth < 768;
      const paddingFactor = isMobile ? 0.98 : 1;

      const scale = Math.min(canvas.width / imgWidth, canvas.height / imgHeight) * paddingFactor;
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }
  }

  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Immediately preload Frame 0 first so it's ready instantaneously on mount
    const firstImg = new Image();
    firstImg.onload = () => {
      if (isCancelled) return;
      stateRef.current.images[0] = firstImg;
      stateRef.current.hasValidImages = true;
      renderFrame(0);
    };
    firstImg.src = getPrimaryFrameUrl(1);

    const handleImageLoaded = () => {
      if (isCancelled) return;
      loadedCount++;
      setLoadPercent(Math.min(100, Math.round((loadedCount / CONFIG.frameCount) * 100)));
      stateRef.current.hasValidImages = true;
      renderFrame(stateRef.current.currentFrameIndex);
    };

    for (let i = 0; i < CONFIG.frameCount; i++) {
      const fileNumber = CONFIG.frameStartIndex + i;
      const primaryUrl = getPrimaryFrameUrl(fileNumber);
      const img = new Image();

      img.onload = handleImageLoaded;
      img.onerror = () => {
        if (isCancelled) return;
        // If an individual frame load encounters network glitch, retry once with frame 1 as fallback
        const retryImg = new Image();
        retryImg.onload = handleImageLoaded;
        retryImg.src = getPrimaryFrameUrl(1);
        stateRef.current.images[i] = retryImg;
      };

      img.src = primaryUrl;
      stateRef.current.images[i] = img;
    }

    function initScrollAnimation() {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isFallback: '(max-width: 767px), (prefers-reduced-motion: reduce)',
      }, (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          const trigger = ScrollTrigger.create({
            trigger: containerRef.current || sectionRef.current,
            pin: sectionRef.current,
            pinSpacing: true,
            start: 'top top',
            end: () => `+=${350 * sceneFactor()}vh`,
            scrub: scaleScrub(1.2),
            onRefresh: (self) => {
              const progress = Math.min(1.0, Math.max(0.0, self.progress || 0));
              const frameIndex = Math.min(CONFIG.frameCount - 1, Math.floor(progress * (CONFIG.frameCount - 1)));
              console.log(`[CanvasHero] ScrollTrigger refresh -> scrollY: ${window.scrollY}, progress: ${progress.toFixed(3)}, initial frameIndex: ${frameIndex}`);
              renderFrame(frameIndex);
            },
            onUpdate: (self) => {
              const scrubProgress = Math.min(1.0, Math.max(0.0, self.progress));
              const frameIndex = Math.min(CONFIG.frameCount - 1, Math.floor(scrubProgress * (CONFIG.frameCount - 1)));
              renderFrame(frameIndex);
              setActiveFrame(frameIndex + 1);

              // Phase 2: MANIFEST Typography Overlay (Frames 60–120)
              let manifestOpacity = 0;
              if (frameIndex >= 60 && frameIndex <= 80) {
                manifestOpacity = (frameIndex - 60) / 20;
              } else if (frameIndex > 80 && frameIndex <= 105) {
                manifestOpacity = 1;
              } else if (frameIndex > 105 && frameIndex <= 125) {
                manifestOpacity = (125 - frameIndex) / 20;
              }

              // Phase 3, 4, 5: MANIFEST YOUR GROWTH. Typography Overlay (Frames 125–295)
              let growthOpacity = 0;
              if (frameIndex >= 125 && frameIndex <= 145) {
                growthOpacity = (frameIndex - 125) / 20;
              } else if (frameIndex > 145) {
                growthOpacity = 1;
              }

              if (manifestRef.current) {
                manifestRef.current.style.opacity = manifestOpacity;
                manifestRef.current.style.transform = `translate(-50%, -50%) scale(${0.95 + manifestOpacity * 0.05})`;
              }

              if (growthRef.current) {
                growthRef.current.style.opacity = growthOpacity;
                growthRef.current.style.transform = `translate(-50%, -50%) translateY(${(1 - growthOpacity) * 12}px)`;
              }
            }
          });

          renderFrame(0);
          setActiveFrame(1);

          return () => {
            trigger.kill();
          };
        }

        renderFrame(0);
        setActiveFrame(1);
      });

      ScrollTrigger.refresh();
    }

    initScrollAnimation();

    let resizeObserver = null;
    if (canvasRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        renderFrame(stateRef.current.currentFrameIndex || 0);
      });
      resizeObserver.observe(canvasRef.current);
    }

    renderFrame(0);
    requestAnimationFrame(() => renderFrame(0));

    const timer = setTimeout(() => {
      renderFrame(0);
    }, 50);

    const handleResize = () => {
      renderFrame(stateRef.current.currentFrameIndex);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const triggerRefreshAndRedraw = () => {
      renderFrame(stateRef.current.currentFrameIndex || 0);
      ScrollTrigger.refresh();
    };

    triggerRefreshAndRedraw();
    const t1 = setTimeout(triggerRefreshAndRedraw, 50);
    const t2 = setTimeout(triggerRefreshAndRedraw, 250);
    const t3 = setTimeout(triggerRefreshAndRedraw, 650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sequenceState]);

  return (
    <div ref={containerRef} className="canvas-hero-container" style={{ position: 'relative', width: '100%' }}>
      <section
        ref={sectionRef}
        id="canvas-section"
        className="canvas-section"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundColor: '#E2E2E2',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <div className="canvas-wrapper" style={{ position: 'absolute', inset: 0, backgroundColor: '#E2E2E2' }}>
          <canvas ref={canvasRef} id="frame-canvas" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />

          {/* Phase 2: MANIFEST Typography Overlay */}
          <div
            ref={manifestRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              pointerEvents: 'none',
              opacity: 0,
              textAlign: 'center',
              width: '90%',
              maxWidth: '1200px'
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: 'clamp(4.5rem, 14vw, 13rem)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                color: '#181818',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              MANIFEST
            </h1>
          </div>

          {/* Phase 3, 4, 5: MANIFEST YOUR GROWTH. Supporting Phrase Overlay */}
          <div
            ref={growthRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 12,
              pointerEvents: 'none',
              opacity: 0,
              textAlign: 'center',
              width: '90%',
              maxWidth: '900px'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-intro, sans-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 4.8rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#181818',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              MANIFEST YOUR GROWTH.
            </h2>
          </div>

          {/* Frame & Loading Progress Overlay */}
          <div className="hero-sequence-card" style={{ opacity: loadPercent < 100 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <div className="sequence-card-header">
              <div className="sequence-card-title">
                <span className="sequence-status-dot" />
                <span>MODEL SEQUENCE</span>
              </div>
              <div className="sequence-card-percent">
                {loadPercent}%
              </div>
            </div>

            <div className="sequence-progress-track">
              <div
                className="sequence-progress-bar"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
